import crypto from 'crypto';
import { readJsonSafe, atomicWriteJson } from './storage';
import { GradingResponse } from './types';

const CACHE_FILE = 'grade-cache.json';

export function normalizeAnswer(answer: string): string {
  if (!answer) return '';
  return answer
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .join('\n')
    .replace(/[ \t]+/g, ' ');
}

export function computeGradeHash(questionId: string, answer: string): string {
  const norm = normalizeAnswer(answer);
  return crypto.createHash('sha256').update(`${questionId}::${norm}`).digest('hex');
}

export function getCachedGrading(questionId: string, answer: string): GradingResponse | null {
  const hash = computeGradeHash(questionId, answer);
  const cache = readJsonSafe<Record<string, GradingResponse>>(CACHE_FILE, {});
  const entry = cache[hash];
  if (entry) {
    return {
      ...entry,
      cached: true
    };
  }
  return null;
}

export function setCachedGrading(questionId: string, answer: string, result: GradingResponse): void {
  const hash = computeGradeHash(questionId, answer);
  const cache = readJsonSafe<Record<string, GradingResponse>>(CACHE_FILE, {});
  cache[hash] = {
    ...result,
    cached: true
  };
  atomicWriteJson(CACHE_FILE, cache);
}

export function getCacheStats(): { totalEntries: number } {
  const cache = readJsonSafe<Record<string, GradingResponse>>(CACHE_FILE, {});
  return {
    totalEntries: Object.keys(cache).length
  };
}

export function clearGradingCache(): void {
  atomicWriteJson(CACHE_FILE, {});
}
