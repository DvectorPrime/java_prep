import { readJsonSafe, atomicWriteJson } from './storage';
import { UsageStats } from './types';

const USAGE_FILE = 'usage.json';

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function getUsageStats(): UsageStats {
  const defaultStats: UsageStats = {
    totalRequests: 0,
    totalTokens: 0,
    byModel: {
      'openai/gpt-oss-120b': { requests: 0, tokens: 0 },
      'openai/gpt-oss-20b': { requests: 0, tokens: 0 }
    },
    byKey: {},
    studentUsageToday: {},
    lastResetDate: getTodayString()
  };

  const stats = readJsonSafe<UsageStats>(USAGE_FILE, defaultStats);
  const today = getTodayString();

  if (stats.lastResetDate !== today) {
    stats.studentUsageToday = {};
    stats.lastResetDate = today;
    atomicWriteJson(USAGE_FILE, stats);
  }

  return stats;
}

export function checkStudentDailyQuota(clientId: string, cap: number): {
  allowed: boolean;
  used: number;
  cap: number;
  remaining: number;
} {
  if (!clientId) {
    return { allowed: false, used: 0, cap, remaining: 0 };
  }

  const stats = getUsageStats();
  const used = stats.studentUsageToday[clientId] || 0;
  const remaining = Math.max(0, cap - used);

  return {
    allowed: used < cap,
    used,
    cap,
    remaining
  };
}

export function recordStudentUsage(clientId: string): number {
  if (!clientId) return 0;
  const stats = getUsageStats();
  const current = stats.studentUsageToday[clientId] || 0;
  const next = current + 1;
  stats.studentUsageToday[clientId] = next;
  atomicWriteJson(USAGE_FILE, stats);
  return next;
}

export function getFullUsageStats(): UsageStats {
  return getUsageStats();
}

export function recordApiUsage(model: string, keyId: string, tokens: number): void {
  const stats = getUsageStats();
  stats.totalRequests += 1;
  stats.totalTokens += tokens;

  if (!stats.byModel[model]) {
    stats.byModel[model] = { requests: 0, tokens: 0 };
  }
  stats.byModel[model].requests += 1;
  stats.byModel[model].tokens += tokens;

  if (!stats.byKey[keyId]) {
    stats.byKey[keyId] = { requests: 0, tokens: 0 };
  }
  stats.byKey[keyId].requests += 1;
  stats.byKey[keyId].tokens += tokens;

  atomicWriteJson(USAGE_FILE, stats);
}
