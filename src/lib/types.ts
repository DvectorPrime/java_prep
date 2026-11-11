export type QuestionType = 'spot-error' | 'write-code' | 'predict-output' | 'debug-extend';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuestionPublic {
  id: string;
  section: string;
  type: QuestionType;
  difficulty: Difficulty;
  topic: string;
  points: number;
  time_minutes: number;
  source: string;
  error_header: string | null;
  task: string;
  code: string;
}

export interface QuestionPrivate {
  answer_key: string;
  reference_solution: string;
  rubric: string;
  common_mistakes: string;
}

export interface SectionMeta {
  code: string;
  title: string;
  scope: string;
  count: number;
  totalPoints: number;
  questions: string[];
}

export interface MockPart {
  part: number;
  title: string;
  questionIds: string[];
}

export interface MockPaper {
  id: number;
  title: string;
  targetMinutes: number;
  totalPoints: number;
  description: string;
  parts: MockPart[];
}

export interface StudyBlock {
  block: number;
  time: string;
  section: string;
  topic: string;
  focus: string;
}

export interface StudyDay {
  title: string;
  blocks: StudyBlock[];
}

export interface StudyOrder {
  title: string;
  day1: StudyDay;
  day2: StudyDay;
  lastHourReview: string[];
  emergency4Hour: { hour: number; action: string }[];
}

export interface MetaData {
  sections: SectionMeta[];
  manifest: {
    id: string;
    section: string;
    type: string;
    difficulty: string;
    points: number;
    topic: string;
    source: string;
  }[];
  study_order: StudyOrder;
  mock_papers: MockPaper[];
}

export interface RubricItemEvaluation {
  label: string;
  earned: number;
  max: number;
  comment: string;
}

export interface GradingResponse {
  score: number;
  max: number;
  items: RubricItemEvaluation[];
  summary: string;
  next_step?: string;
  model: string;
  cached: boolean;
  error?: string;
  retryAfterSeconds?: number;
}

export interface GroqKeyRecord {
  id: string;
  key: string;
  label?: string;
  status: 'active' | 'cooldown' | 'invalid' | 'disabled';
  cooldownUntil?: number;
  lastError?: string;
  usageToday: {
    [model: string]: { requests: number; tokens: number };
  };
  slidingWindowTokens: { timestamp: number; tokens: number }[];
}

export interface ModelConfig {
  modelPriority: string[];
  defaultLimits: {
    rpm: number;
    rpd: number;
    tpm: number;
    tpd: number;
  };
  maxConcurrentRequests: number;
  queueTimeoutMs: number;
  dailyStudentCap: number;
  gradingPaused: boolean;
}

export interface UsageStats {
  totalRequests: number;
  totalTokens: number;
  byModel: {
    [model: string]: { requests: number; tokens: number };
  };
  byKey: {
    [keyId: string]: { requests: number; tokens: number };
  };
  studentUsageToday: {
    [clientId: string]: number;
  };
  lastResetDate: string;
}

export interface QuestionSubmissionState {
  questionId: string;
  status: 'unattempted' | 'graded' | 'self-checked';
  score?: number;
  maxPoints?: number;
  lastGradedAt?: number;
  evaluation?: GradingResponse;
  savedAnswer?: string;
}
