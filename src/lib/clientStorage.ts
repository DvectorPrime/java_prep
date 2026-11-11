'use client';

import { GradingResponse } from './types';

export interface QuestionLocalRecord {
  status: 'graded' | 'self-checked' | 'unattempted';
  score?: number;
  maxPoints?: number;
  evaluation?: GradingResponse;
  savedAnswer?: string;
  updatedAt?: number;
}

export interface MockExamRecord {
  mockId: number;
  completedAt: number;
  timeSpentSeconds: number;
  totalScore: number;
  maxScore: number;
  percentage: number;
  questionResults: Record<string, {
    answer: string;
    score: number;
    maxPoints: number;
    evaluation?: GradingResponse;
    selfChecked?: boolean;
  }>;
}

const STORAGE_KEYS = {
  CLIENT_ID: 'cos202_client_id',
  STUDENT_NAME: 'cos202_student_name',
  QUESTIONS: 'cos202_question_records',
  MOCK_EXAMS: 'cos202_mock_records',
  DRAFT_PREFIX: 'cos202_draft_',
  MOCK_TIMER_PREFIX: 'cos202_mock_timer_'
};

export function getOrCreateClientId(): string {
  if (typeof window === 'undefined') return 'server-temp-id';
  let id = localStorage.getItem(STORAGE_KEYS.CLIENT_ID);
  if (!id) {
    id = 'ui_' + Math.random().toString(36).slice(2, 10) + '_' + Date.now().toString(36);
    localStorage.setItem(STORAGE_KEYS.CLIENT_ID, id);
  }
  return id;
}

export function getStudentName(): string {
  if (typeof window === 'undefined') return 'COS 202 Student';
  return localStorage.getItem(STORAGE_KEYS.STUDENT_NAME) || 'COS 202 Student';
}

export function setStudentName(name: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.STUDENT_NAME, name.trim() || 'COS 202 Student');
}

export function getAllQuestionRecords(): Record<string, QuestionLocalRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getQuestionRecord(qId: string): QuestionLocalRecord | null {
  const all = getAllQuestionRecords();
  return all[qId] || null;
}

export function saveQuestionRecord(qId: string, record: Partial<QuestionLocalRecord>): void {
  if (typeof window === 'undefined') return;
  const all = getAllQuestionRecords();
  all[qId] = {
    ...all[qId],
    ...record,
    status: record.status || all[qId]?.status || 'unattempted',
    updatedAt: Date.now()
  };
  localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(all));
}

export function getQuestionDraft(qId: string): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(`${STORAGE_KEYS.DRAFT_PREFIX}${qId}`) || '';
}

export function saveQuestionDraft(qId: string, answer: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`${STORAGE_KEYS.DRAFT_PREFIX}${qId}`, answer);
}

export function clearQuestionDraft(qId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(`${STORAGE_KEYS.DRAFT_PREFIX}${qId}`);
}

export function getMockExamRecords(): Record<number, MockExamRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MOCK_EXAMS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveMockExamRecord(mockId: number, record: MockExamRecord): void {
  if (typeof window === 'undefined') return;
  const all = getMockExamRecords();
  all[mockId] = record;
  localStorage.setItem(STORAGE_KEYS.MOCK_EXAMS, JSON.stringify(all));
}

export function getMockTimer(mockId: number, targetMinutes: number): { remainingSeconds: number; paused: boolean } {
  if (typeof window === 'undefined') return { remainingSeconds: targetMinutes * 60, paused: false };
  const key = `${STORAGE_KEYS.MOCK_TIMER_PREFIX}${mockId}`;
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      const data = JSON.parse(raw);
      if (data.paused && typeof data.remainingSeconds === 'number') {
        return { remainingSeconds: data.remainingSeconds, paused: true };
      }
      const elapsed = Math.floor((Date.now() - data.startedAt) / 1000);
      const remaining = Math.max(0, data.totalSeconds - elapsed);
      return { remainingSeconds: remaining, paused: false };
    } catch {
      // Fallback
    }
  }
  const totalSeconds = targetMinutes * 60;
  const initData = { startedAt: Date.now(), totalSeconds, paused: false, remainingSeconds: totalSeconds };
  localStorage.setItem(key, JSON.stringify(initData));
  return { remainingSeconds: totalSeconds, paused: false };
}

export function pauseMockTimer(mockId: number, currentRemainingSeconds: number): void {
  if (typeof window === 'undefined') return;
  const key = `${STORAGE_KEYS.MOCK_TIMER_PREFIX}${mockId}`;
  let totalSeconds = 3600;
  try {
    const raw = localStorage.getItem(key);
    if (raw) totalSeconds = JSON.parse(raw).totalSeconds || 3600;
  } catch {}
  localStorage.setItem(key, JSON.stringify({
    startedAt: Date.now(),
    totalSeconds,
    paused: true,
    remainingSeconds: currentRemainingSeconds
  }));
}

export function resetMockTimer(mockId: number, targetMinutes: number): void {
  if (typeof window === 'undefined') return;
  const key = `${STORAGE_KEYS.MOCK_TIMER_PREFIX}${mockId}`;
  const totalSeconds = targetMinutes * 60;
  const initData = { startedAt: Date.now(), totalSeconds, paused: false, remainingSeconds: totalSeconds };
  localStorage.setItem(key, JSON.stringify(initData));
}

export function getQuestionTimer(qId: string, targetMinutes: number): { remainingSeconds: number; paused: boolean } {
  if (typeof window === 'undefined') return { remainingSeconds: targetMinutes * 60, paused: false };
  const key = `cos202_q_timer_${qId}`;
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      const data = JSON.parse(raw);
      if (data.totalSeconds !== targetMinutes * 60) {
        // Target minutes configuration changed (e.g. 15m easy, 30m medium/hard)
        const totalSeconds = targetMinutes * 60;
        const initData = { startedAt: Date.now(), totalSeconds, paused: false, remainingSeconds: totalSeconds };
        localStorage.setItem(key, JSON.stringify(initData));
        return { remainingSeconds: totalSeconds, paused: false };
      }
      if (data.paused && typeof data.remainingSeconds === 'number') {
        return { remainingSeconds: data.remainingSeconds, paused: true };
      }
      const elapsed = Math.floor((Date.now() - data.startedAt) / 1000);
      const remaining = Math.max(0, data.totalSeconds - elapsed);
      return { remainingSeconds: remaining, paused: false };
    } catch {
      // Fallback
    }
  }
  const totalSeconds = targetMinutes * 60;
  const initData = { startedAt: Date.now(), totalSeconds, paused: false, remainingSeconds: totalSeconds };
  localStorage.setItem(key, JSON.stringify(initData));
  return { remainingSeconds: totalSeconds, paused: false };
}

export function pauseQuestionTimer(qId: string, currentRemainingSeconds: number): void {
  if (typeof window === 'undefined') return;
  const key = `cos202_q_timer_${qId}`;
  let totalSeconds = 300;
  try {
    const raw = localStorage.getItem(key);
    if (raw) totalSeconds = JSON.parse(raw).totalSeconds || 300;
  } catch {}
  localStorage.setItem(key, JSON.stringify({
    startedAt: Date.now(),
    totalSeconds,
    paused: true,
    remainingSeconds: currentRemainingSeconds
  }));
}

export function resetQuestionTimer(qId: string, targetMinutes: number): void {
  if (typeof window === 'undefined') return;
  const key = `cos202_q_timer_${qId}`;
  const totalSeconds = targetMinutes * 60;
  const initData = { startedAt: Date.now(), totalSeconds, paused: false, remainingSeconds: totalSeconds };
  localStorage.setItem(key, JSON.stringify(initData));
}

export function exportProgressJson(): string {
  if (typeof window === 'undefined') return '{}';
  const data = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    studentName: getStudentName(),
    clientId: getOrCreateClientId(),
    questions: getAllQuestionRecords(),
    mockExams: getMockExamRecords()
  };
  return JSON.stringify(data, null, 2);
}

export function importProgressJson(jsonStr: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const data = JSON.parse(jsonStr);
    if (data.studentName) setStudentName(data.studentName);
    if (data.questions) localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(data.questions));
    if (data.mockExams) localStorage.setItem(STORAGE_KEYS.MOCK_EXAMS, JSON.stringify(data.mockExams));
    return true;
  } catch (err) {
    console.error('Import error:', err);
    return false;
  }
}

export function resetAllProgress(): void {
  if (typeof window === 'undefined') return;
  const clientId = getOrCreateClientId();
  const studentName = getStudentName();
  localStorage.clear();
  localStorage.setItem(STORAGE_KEYS.CLIENT_ID, clientId);
  localStorage.setItem(STORAGE_KEYS.STUDENT_NAME, studentName);
}
