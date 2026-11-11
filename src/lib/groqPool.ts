import fs from 'fs';
import path from 'path';
import { readJsonSafe, atomicWriteJson } from './storage';
import { recordApiUsage } from './rateLimiter';
import { GroqKeyRecord, ModelConfig } from './types';

const CONFIG_PATH = path.join(process.cwd(), 'config', 'models.json');
const KEYS_FILE = 'keys.json';
const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

// Default Model Configuration
const DEFAULT_CONFIG: ModelConfig = {
  modelPriority: ['openai/gpt-oss-120b', 'openai/gpt-oss-20b'],
  defaultLimits: {
    rpm: 30,
    rpd: 1000,
    tpm: 8000,
    tpd: 200000
  },
  maxConcurrentRequests: 6,
  queueTimeoutMs: 60000,
  dailyStudentCap: 30,
  gradingPaused: false
};

// Global in-memory state across requests in Node server process
class GroqPoolManager {
  private config: ModelConfig;
  private keys: GroqKeyRecord[] = [];
  private activeConcurrency = 0;
  private lastFlush = Date.now();
  private isInitialized = false;

  constructor() {
    this.config = this.loadConfig();
    this.initializeKeys();
    this.setupAutoFlush();
  }

  public getConfig(): ModelConfig {
    return { ...this.config };
  }

  public updateConfig(newConfig: Partial<ModelConfig>): ModelConfig {
    this.config = { ...this.config, ...newConfig };
    try {
      const configDir = path.dirname(CONFIG_PATH);
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }
      fs.writeFileSync(CONFIG_PATH, JSON.stringify(this.config, null, 2), 'utf-8');
    } catch (err) {
      console.warn('[groqPool] Failed to persist config:', err);
    }
    return this.config;
  }

  private loadConfig(): ModelConfig {
    try {
      if (fs.existsSync(CONFIG_PATH)) {
        const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
        return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
      }
    } catch (err) {
      console.warn('[groqPool] Failed to load models.json, using defaults:', err);
    }
    return DEFAULT_CONFIG;
  }

  private initializeKeys(): void {
    if (this.isInitialized) return;

    let savedKeys = readJsonSafe<GroqKeyRecord[]>(KEYS_FILE, []);

    // Check GROQ_API_KEYS environment variable
    const envKeys = process.env.GROQ_API_KEYS;

    if (savedKeys.length === 0 && envKeys) {
      const rawList = envKeys.split(/[\r\n,]+/).map(k => k.trim()).filter(Boolean);
      savedKeys = rawList.map((entry, idx) => {
        let key = entry;
        let label = `Key ${idx + 1}`;
        if (entry.includes('-')) {
          const parts = entry.split('-').map(s => s.trim());
          label = parts[0] || label;
          key = parts[1] || parts[0];
        } else if (entry.includes('=')) {
          const parts = entry.split('=').map(s => s.trim());
          label = parts[0] || label;
          key = parts[1] || parts[0];
        }
        return {
          id: `key_${label.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
          key,
          label,
          status: 'active' as const,
          usageToday: {},
          slidingWindowTokens: []
        };
      });

      if (savedKeys.length > 0) {
        atomicWriteJson(KEYS_FILE, savedKeys);
      }
    } else if (savedKeys.length === 0) {
      const txtPath = path.join(process.cwd(), 'GROQ API KEYS.txt');
      if (fs.existsSync(txtPath)) {
        const raw = fs.readFileSync(txtPath, 'utf-8');
        const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        savedKeys = lines.map(line => {
          const parts = line.split('-').map(s => s.trim());
          const label = parts[0] || 'Key';
          const key = parts[1] || parts[0];
          return {
            id: `key_${label.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
            key,
            label,
            status: 'active' as const,
            usageToday: {},
            slidingWindowTokens: []
          };
        });
        if (savedKeys.length > 0) {
          atomicWriteJson(KEYS_FILE, savedKeys);
        }
      }
    }

    this.keys = savedKeys;
    this.isInitialized = true;
  }

  public getKeys(mask = true): Partial<GroqKeyRecord>[] {
    this.checkCooldowns();
    return this.keys.map(k => ({
      id: k.id,
      label: k.label,
      key: mask ? `${k.key.slice(0, 8)}...${k.key.slice(-4)}` : k.key,
      status: k.status,
      cooldownUntil: k.cooldownUntil,
      lastError: k.lastError,
      usageToday: k.usageToday
    }));
  }

  public addKey(apiKey: string, label?: string): GroqKeyRecord {
    const trimmed = apiKey.trim();
    const id = `key_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const newRecord: GroqKeyRecord = {
      id,
      key: trimmed,
      label: label || `Key ${this.keys.length + 1}`,
      status: 'active',
      usageToday: {},
      slidingWindowTokens: []
    };
    this.keys.push(newRecord);
    this.persistKeys();
    return newRecord;
  }

  public removeKey(id: string): boolean {
    const idx = this.keys.findIndex(k => k.id === id);
    if (idx !== -1) {
      this.keys.splice(idx, 1);
      this.persistKeys();
      return true;
    }
    return false;
  }

  public updateKeyStatus(id: string, status: 'active' | 'disabled'): boolean {
    const target = this.keys.find(k => k.id === id);
    if (target) {
      target.status = status;
      if (status === 'active') {
        target.cooldownUntil = undefined;
        target.lastError = undefined;
      }
      this.persistKeys();
      return true;
    }
    return false;
  }

  private persistKeys(): void {
    atomicWriteJson(KEYS_FILE, this.keys);
  }

  private setupAutoFlush(): void {
    setInterval(() => {
      this.pruneSlidingWindows();
      if (Date.now() - this.lastFlush > 10000) {
        this.persistKeys();
        this.lastFlush = Date.now();
      }
    }, 10000);

    if (typeof process !== 'undefined') {
      process.on('SIGINT', () => {
        this.persistKeys();
      });
    }
  }

  private pruneSlidingWindows(): void {
    const now = Date.now();
    const oneMinAgo = now - 60000;
    for (const k of this.keys) {
      k.slidingWindowTokens = (k.slidingWindowTokens || []).filter(item => item.timestamp > oneMinAgo);
    }
  }

  private checkCooldowns(): void {
    const now = Date.now();
    for (const k of this.keys) {
      if (k.status === 'cooldown' && k.cooldownUntil && k.cooldownUntil <= now) {
        k.status = 'active';
        k.cooldownUntil = undefined;
        k.lastError = undefined;
      }
    }
  }

  private selectBestKey(model: string): GroqKeyRecord | null {
    this.checkCooldowns();
    this.pruneSlidingWindows();

    const activeKeys = this.keys.filter(k => k.status === 'active');
    if (activeKeys.length === 0) return null;

    const tpmLimit = this.config.defaultLimits.tpm;
    const rpmLimit = this.config.defaultLimits.rpm;
    const maxSafeTpm = tpmLimit * 0.8;
    const maxSafeRpm = rpmLimit * 0.8;

    const candidates = activeKeys.map(k => {
      const window = k.slidingWindowTokens || [];
      const currentTokens = window.reduce((sum, item) => sum + item.tokens, 0);
      const currentRequests = window.length;
      return {
        record: k,
        tokens: currentTokens,
        requests: currentRequests,
        isOverLimit: currentTokens >= maxSafeTpm || currentRequests >= maxSafeRpm
      };
    });

    // Filter out keys exceeding safe limit
    const safeCandidates = candidates.filter(c => !c.isOverLimit);
    const pool = safeCandidates.length > 0 ? safeCandidates : candidates;

    // Pick candidate with lowest token usage in sliding window
    pool.sort((a, b) => a.tokens - b.tokens);
    return pool[0].record;
  }

  private recordKeySuccess(key: GroqKeyRecord, model: string, tokens: number): void {
    const now = Date.now();
    if (!key.slidingWindowTokens) key.slidingWindowTokens = [];
    key.slidingWindowTokens.push({ timestamp: now, tokens });

    if (!key.usageToday) key.usageToday = {};
    if (!key.usageToday[model]) key.usageToday[model] = { requests: 0, tokens: 0 };
    key.usageToday[model].requests += 1;
    key.usageToday[model].tokens += tokens;

    recordApiUsage(model, key.id, tokens);
  }

  public async executeChatCompletion(messages: { role: string; content: string }[]): Promise<{
    content: string;
    model: string;
    tokensUsed: number;
  }> {
    if (this.config.gradingPaused) {
      throw new Error('Grading is currently paused by the administrator.');
    }

    if (this.activeConcurrency >= this.config.maxConcurrentRequests) {
      // Small delay if at max concurrency
      await new Promise(res => setTimeout(res, 1000));
    }

    this.activeConcurrency++;
    const startTime = Date.now();
    const timeoutMs = 45000; // 45s hard deadline

    try {
      const modelsToTry = [...this.config.modelPriority];

      for (const model of modelsToTry) {
        // Try up to number of active keys
        const attemptedKeyIds = new Set<string>();

        while (Date.now() - startTime < timeoutMs) {
          const availableKey = this.selectBestKey(model);
          if (!availableKey || attemptedKeyIds.has(availableKey.id)) {
            // No more available keys for this model, fallback to next model
            break;
          }

          attemptedKeyIds.add(availableKey.id);

          try {
            // First attempt with reasoning_effort: "low"
            let useReasoningEffort = true;
            let response = await this.callGroqApi(availableKey.key, model, messages, useReasoningEffort);

            // If 400 Bad Request, retry immediately without reasoning_effort
            if (response.status === 400) {
              const errBody = await response.text();
              if (errBody.includes('reasoning_effort')) {
                useReasoningEffort = false;
                response = await this.callGroqApi(availableKey.key, model, messages, useReasoningEffort);
              } else {
                // Other 400 error (e.g. prompt issue)
                throw new Error(`Groq API 400 Error: ${errBody}`);
              }
            }

            if (response.ok) {
              const data = await response.json();
              const choice = data.choices?.[0];
              const reply = choice?.message?.content || '';
              const tokens = data.usage?.total_tokens || 500;

              this.recordKeySuccess(availableKey, model, tokens);
              return {
                content: reply,
                model,
                tokensUsed: tokens
              };
            }

            // Handle 429 Rate Limit
            if (response.status === 429) {
              const retryAfterHeader = response.headers.get('retry-after');
              let retryAfterSec = retryAfterHeader ? parseInt(retryAfterHeader, 10) : 60;
              if (isNaN(retryAfterSec) || retryAfterSec <= 0) retryAfterSec = 60;

              if (retryAfterSec > 900) {
                // Daily quota reached: cool down until midnight UTC
                const now = new Date();
                const midnightUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
                availableKey.status = 'cooldown';
                availableKey.cooldownUntil = midnightUtc.getTime();
                availableKey.lastError = 'Daily quota limit reached (RPD/TPD)';
              } else {
                availableKey.status = 'cooldown';
                availableKey.cooldownUntil = Date.now() + retryAfterSec * 1000;
                availableKey.lastError = `Rate limited: cooldown for ${retryAfterSec}s`;
              }

              this.persistKeys();
              continue; // try next key
            }

            // Handle 401 / 403 Invalid Auth
            if (response.status === 401 || response.status === 403) {
              availableKey.status = 'invalid';
              availableKey.lastError = `Authentication failed (${response.status})`;
              this.persistKeys();
              continue; // try next key
            }

            // 5xx / other errors: retry once with next key
            if (response.status >= 500) {
              availableKey.lastError = `Server error ${response.status}`;
              continue;
            }

            const errorText = await response.text();
            throw new Error(`Groq API error (${response.status}): ${errorText}`);
          } catch (err: unknown) {
            const error = err as Error;
            availableKey.lastError = error.message;
            // Cycle to next key
            continue;
          }
        }
      }

      // If we reach here, no key/model succeeded within deadline
      throw new Error('Grader busy. Please try again in a few moments or use Self-Check.');
    } finally {
      this.activeConcurrency = Math.max(0, this.activeConcurrency - 1);
    }
  }

  private async callGroqApi(
    apiKey: string,
    model: string,
    messages: { role: string; content: string }[],
    includeReasoningEffort: boolean
  ): Promise<Response> {
    const bodyPayload: Record<string, unknown> = {
      model,
      messages,
      temperature: 0,
      max_tokens: 1000,
      response_format: { type: 'json_object' }
    };

    if (includeReasoningEffort) {
      bodyPayload.reasoning_effort = 'low';
    }

    return fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyPayload)
    });
  }

  public async testSingleKey(keyString: string): Promise<{ success: boolean; message: string; latencyMs: number }> {
    const start = Date.now();
    try {
      const response = await fetch(GROQ_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${keyString}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b',
          messages: [{ role: 'user', content: 'Respond with JSON: {"status":"ok"}' }],
          response_format: { type: 'json_object' },
          max_tokens: 200,
          reasoning_effort: 'low'
        })
      });

      const latency = Date.now() - start;
      if (response.ok) {
        return { success: true, message: 'Key validated successfully!', latencyMs: latency };
      } else {
        const text = await response.text();
        return { success: false, message: `Status ${response.status}: ${text.slice(0, 120)}`, latencyMs: latency };
      }
    } catch (err: unknown) {
      const error = err as Error;
      return { success: false, message: error.message, latencyMs: Date.now() - start };
    }
  }
}

// Singleton instance
declare global {
  // eslint-disable-next-line no-var
  var __groqPoolInstance: GroqPoolManager | undefined;
}

export function getGroqPool(): GroqPoolManager {
  if (!global.__groqPoolInstance) {
    global.__groqPoolInstance = new GroqPoolManager();
  }
  return global.__groqPoolInstance;
}
