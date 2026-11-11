'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  Send,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  BookOpen,
  Loader2,
  FileCheck
} from 'lucide-react';
import { CodeViewer } from '@/components/CodeViewer';
import { CodeEditor } from '@/components/CodeEditor';
import { CountdownTimer } from '@/components/CountdownTimer';
import { SolutionViewer } from '@/components/SolutionViewer';
import {
  getOrCreateClientId,
  getQuestionDraft,
  saveQuestionDraft,
  getMockExamRecords,
  saveMockExamRecord,
  saveQuestionRecord,
  getMockTimer,
  resetMockTimer,
  MockExamRecord
} from '@/lib/clientStorage';
import { QuestionPublic, MetaData, MockPaper, GradingResponse } from '@/lib/types';

// Batch grader with concurrency limiter (max 2 parallel requests in flight)
async function evaluateMockBatch(
  clientId: string,
  items: { qId: string; answer: string; points: number }[],
  onProgress: (current: number, total: number) => void
): Promise<Record<string, GradingResponse>> {
  const results: Record<string, GradingResponse> = {};
  const total = items.length;
  let completed = 0;
  const concurrencyLimit = 2;
  let activeIndex = 0;

  async function worker() {
    while (activeIndex < total) {
      const idx = activeIndex++;
      const item = items[idx];

      if (!item.answer.trim()) {
        results[item.qId] = {
          score: 0,
          max: item.points,
          items: [],
          summary: 'No answer submitted for this question.',
          model: 'none',
          cached: false
        };
        completed++;
        onProgress(completed, total);
        continue;
      }

      try {
        const res = await fetch('/api/grade', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientId,
            questionId: item.qId,
            answer: item.answer
          })
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || `HTTP ${res.status}`);
        }

        const data: GradingResponse = await res.json();
        results[item.qId] = data;
      } catch (err: unknown) {
        const error = err as Error;
        results[item.qId] = {
          score: 0,
          max: item.points,
          items: [],
          summary: `Grading error: ${error.message}`,
          model: 'error',
          cached: false,
          error: error.message
        };
      }

      completed++;
      onProgress(completed, total);
    }
  }

  const workers = Array.from({ length: Math.min(concurrencyLimit, total) }, () => worker());
  await Promise.all(workers);
  return results;
}

export default function MockExamRunner() {
  const params = useParams();
  const router = useRouter();
  const mockId = parseInt(params.n as string, 10);

  const [meta, setMeta] = useState<MetaData | null>(null);
  const [mockPaper, setMockPaper] = useState<MockPaper | null>(null);
  const [questions, setQuestions] = useState<QuestionPublic[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // Batch grading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gradingProgress, setGradingProgress] = useState({ current: 0, total: 10 });
  const [examResult, setExamResult] = useState<MockExamRecord | null>(null);
  const [activeSolutionQId, setActiveSolutionQId] = useState<string | null>(null);

  useEffect(() => {
    if (!mockId) return;

    Promise.all([
      fetch('/api/meta').then(r => r.json()),
      fetch('/api/questions').then(r => r.json())
    ])
      .then(([metaData, qList]: [MetaData, QuestionPublic[]]) => {
        setMeta(metaData);
        const paper = metaData.mock_papers.find(m => m.id === mockId);
        setMockPaper(paper || null);

        if (paper) {
          // Flatten mock questions in order (Part 1 -> Part 2 -> Part 3)
          const qIds: string[] = [];
          paper.parts.forEach(p => qIds.push(...p.questionIds));
          const orderedQuestions = qIds
            .map(id => qList.find(q => q.id === id))
            .filter(Boolean) as QuestionPublic[];
          setQuestions(orderedQuestions);

          // Preload answers from drafts or existing records
          const initialAnswers: Record<string, string> = {};
          const pastRecord = getMockExamRecords()[paper.id];

          orderedQuestions.forEach(q => {
            const draft = getQuestionDraft(q.id);
            if (pastRecord?.questionResults[q.id]?.answer) {
              initialAnswers[q.id] = pastRecord.questionResults[q.id].answer;
            } else {
              initialAnswers[q.id] = draft;
            }
          });

          setAnswers(initialAnswers);
          if (pastRecord) {
            setExamResult(pastRecord);
          }
        }

        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load mock exam data:', err);
        setLoading(false);
      });
  }, [mockId]);

  const handleAnswerChange = (qId: string, val: string) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
    saveQuestionDraft(qId, val);
  };

  const handleFinalSubmit = async () => {
    if (!mockPaper || questions.length === 0) return;

    const unansweredCount = questions.filter(q => !(answers[q.id] || '').trim()).length;
    if (unansweredCount > 0) {
      const confirmSubmit = confirm(
        `You have ${unansweredCount} unanswered questions. Are you sure you want to finish and submit the exam?`
      );
      if (!confirmSubmit) return;
    }

    setIsSubmitting(true);
    setGradingProgress({ current: 0, total: questions.length });

    const clientId = getOrCreateClientId();
    const items = questions.map(q => ({
      qId: q.id,
      answer: answers[q.id] || '',
      points: q.points
    }));

    try {
      const gradingMap = await evaluateMockBatch(clientId, items, (curr, tot) => {
        setGradingProgress({ current: curr, total: tot });
      });

      let totalScore = 0;
      let maxScore = mockPaper.totalPoints;
      const questionResults: MockExamRecord['questionResults'] = {};

      questions.forEach(q => {
        const evalResult = gradingMap[q.id];
        const score = evalResult ? evalResult.score : 0;
        totalScore += score;
        questionResults[q.id] = {
          answer: answers[q.id] || '',
          score,
          maxPoints: q.points,
          evaluation: evalResult
        };

        // Also save to individual question record
        saveQuestionRecord(q.id, {
          status: 'graded',
          score,
          maxPoints: q.points,
          evaluation: evalResult,
          savedAnswer: answers[q.id] || ''
        });
      });

      const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
      const timerInfo = getMockTimer(mockPaper.id, mockPaper.targetMinutes);
      const timeSpent = Math.max(0, mockPaper.targetMinutes * 60 - timerInfo.remainingSeconds);

      const record: MockExamRecord = {
        mockId: mockPaper.id,
        completedAt: Date.now(),
        timeSpentSeconds: timeSpent,
        totalScore,
        maxScore,
        percentage,
        questionResults
      };

      saveMockExamRecord(mockPaper.id, record);
      setExamResult(record);
    } catch (err: unknown) {
      const error = err as Error;
      alert(`Submission error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
        <span>Loading Mock Paper {mockId}...</span>
      </div>
    );
  }

  if (!mockPaper || questions.length === 0) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-rose-400">Mock Exam Not Found</h2>
        <Link href="/mock" className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold">
          Return to Mock Schedule
        </Link>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];
  const answeredCount = questions.filter(q => (answers[q.id] || '').trim().length > 0).length;

  return (
    <div className="space-y-6 pb-24">
      {/* Top Fixed Header with Persistent Timer & Submit Button */}
      <div className="sticky top-16 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/mock"
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>{mockPaper.title}</span>
            </h1>
            <p className="text-[11px] text-slate-400">
              Answered {answeredCount} / {questions.length} Questions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CountdownTimer
            mockId={mockPaper.id}
            targetMinutes={mockPaper.targetMinutes}
            isRunning={!isSubmitting && !examResult}
            onTimeUp={() => {
              // Auto notify time is up
            }}
          />

          <button
            onClick={handleFinalSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/20"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Grading ({gradingProgress.current}/{gradingProgress.total})...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Submit Exam</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Batch Grading Progress Bar Banner */}
      {isSubmitting && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-emerald-300">
            <span>Evaluating Questions with Concurrency Limiter (Max 2 Parallel)...</span>
            <span className="font-mono">
              {gradingProgress.current} / {gradingProgress.total} Complete
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{
                width: `${(gradingProgress.current / gradingProgress.total) * 100}%`
              }}
            />
          </div>
        </div>
      )}

      {/* Final Exam Report Sheet (if submitted) */}
      {examResult && !isSubmitting && (
        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <FileCheck className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Official Mock Examination Report</h2>
                <p className="text-xs text-slate-400">
                  Completed in {Math.round(examResult.timeSpentSeconds / 60)} minutes • Evaluated against Dr. Ayinla&apos;s COS 202 Rubric
                </p>
              </div>
            </div>

            <div className="flex items-baseline gap-2 px-5 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="text-3xl font-black font-mono">{examResult.totalScore}</span>
              <span className="text-sm font-semibold opacity-75">/ {examResult.maxScore} pts</span>
              <span className="text-sm font-black px-2.5 py-0.5 rounded-lg bg-emerald-500/20 ml-2">
                {examResult.percentage}%
              </span>
            </div>
          </div>

          {/* Breakdown by Parts */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Sectional Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockPaper.parts.map(part => {
                const partQuestions = questions.filter(q => part.questionIds.includes(q.id));
                const partEarned = partQuestions.reduce(
                  (sum, q) => sum + (examResult.questionResults[q.id]?.score || 0),
                  0
                );
                const partMax = partQuestions.reduce((sum, q) => sum + q.points, 0);
                const partPercent = partMax > 0 ? Math.round((partEarned / partMax) * 100) : 0;

                return (
                  <div
                    key={part.part}
                    className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-300">Part {part.part}</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        {partEarned} / {partMax} pts ({partPercent}%)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{part.title}</p>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                      <div
                        className="bg-emerald-500 h-full"
                        style={{ width: `${partPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question-by-Question Result Table */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Individual Question Performance
            </h3>
            <div className="divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden text-xs">
              {questions.map((q, idx) => {
                const qRes = examResult.questionResults[q.id];
                const earned = qRes?.score || 0;
                const isPass = earned >= q.points * 0.7;

                return (
                  <div
                    key={q.id}
                    className="p-4 flex flex-wrap items-center justify-between gap-3 hover:bg-slate-900/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-200">{q.id}</span>
                          <span className="text-slate-400 font-medium capitalize">({q.topic})</span>
                        </div>
                        {qRes?.evaluation?.summary && (
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                            {qRes.evaluation.summary}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 font-mono">
                      <span
                        className={`font-bold px-2 py-0.5 rounded text-xs ${
                          isPass
                            ? 'text-emerald-400 bg-emerald-500/10'
                            : 'text-amber-400 bg-amber-500/10'
                        }`}
                      >
                        {earned} / {q.points} pts
                      </span>

                      <button
                        onClick={() => setActiveSolutionQId(q.id)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] transition-colors"
                      >
                        View Solution
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Question Number Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {questions.map((q, idx) => {
          const isActive = idx === currentQuestionIndex;
          const isAnswered = (answers[q.id] || '').trim().length > 0;
          const qScore = examResult?.questionResults[q.id]?.score;

          return (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(idx)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105'
                  : isAnswered
                  ? 'bg-slate-800 text-slate-200 border border-slate-700'
                  : 'bg-slate-900 text-slate-500 border border-slate-850'
              }`}
            >
              <span>{idx + 1}.</span>
              <span>{q.id}</span>
              {examResult && typeof qScore === 'number' && (
                <span className="text-[10px] opacity-80">({qScore}p)</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Current Question View */}
      {currentQ && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-xl font-mono text-sm font-black bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                  Question {currentQuestionIndex + 1} of {questions.length} ({currentQ.id})
                </span>
                <span className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 capitalize">
                  {currentQ.type.replace('-', ' ')}
                </span>
              </div>

              <div className="text-xs font-mono font-bold text-slate-300">
                {currentQ.points} points
              </div>
            </div>

            {currentQ.error_header && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Error Count: {currentQ.error_header}</span>
              </div>
            )}

            <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line bg-slate-950/40 p-4 rounded-xl border border-slate-850">
              {currentQ.task}
            </div>

            {currentQ.code && (
              <CodeViewer code={currentQ.code} title={`Source Code: ${currentQ.id}`} />
            )}
          </div>

          {/* Code Editor for Current Question */}
          <div className="space-y-3">
            <CodeEditor
              questionId={currentQ.id}
              value={answers[currentQ.id] || ''}
              onChange={val => handleAnswerChange(currentQ.id, val)}
              placeholder="Write your answer or code for this question here..."
              disabled={isSubmitting}
            />

            {/* Bottom Nav Between Questions */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 text-xs font-semibold transition-colors border border-slate-800"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Question</span>
              </button>

              <button
                onClick={() =>
                  setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))
                }
                disabled={currentQuestionIndex === questions.length - 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 text-xs font-semibold transition-colors border border-slate-800"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Solution Viewer Modal for Mock review */}
      {activeSolutionQId && (
        <SolutionViewer
          questionId={activeSolutionQId}
          isOpen={!!activeSolutionQId}
          onClose={() => setActiveSolutionQId(null)}
        />
      )}
    </div>
  );
}
