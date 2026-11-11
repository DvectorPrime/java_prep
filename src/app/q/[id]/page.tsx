'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  BookOpen,
  AlertCircle,
  HelpCircle,
  Loader2,
  CheckCircle2,
  Award
} from 'lucide-react';
import { CodeViewer } from '@/components/CodeViewer';
import { CodeEditor } from '@/components/CodeEditor';
import { ResultCard } from '@/components/ResultCard';
import { SolutionViewer } from '@/components/SolutionViewer';
import { CountdownTimer } from '@/components/CountdownTimer';
import {
  getOrCreateClientId,
  getQuestionDraft,
  saveQuestionDraft,
  getQuestionRecord,
  saveQuestionRecord,
  resetQuestionTimer
} from '@/lib/clientStorage';
import { QuestionPublic, GradingResponse } from '@/lib/types';

export default function QuestionPage() {
  const params = useParams();
  const router = useRouter();
  const qId = (params.id as string)?.toUpperCase();

  const [question, setQuestion] = useState<QuestionPublic | null>(null);
  const [allQuestions, setAllQuestions] = useState<QuestionPublic[]>([]);
  const [answerText, setAnswerText] = useState('');
  const [loading, setLoading] = useState(true);
  const [isGrading, setIsGrading] = useState(false);
  const [gradingError, setGradingError] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<GradingResponse | null>(null);
  const [isSolutionOpen, setIsSolutionOpen] = useState(false);

  // Load question and draft/record
  useEffect(() => {
    if (!qId) return;

    fetch('/api/questions')
      .then(r => r.json())
      .then((qs: QuestionPublic[]) => {
        setAllQuestions(qs);
        const match = qs.find(q => q.id === qId);
        if (match) {
          setQuestion(match);

          // Check if there is an existing record or draft
          const existingRecord = getQuestionRecord(match.id);
          const savedDraft = getQuestionDraft(match.id);

          if (existingRecord?.evaluation) {
            setEvaluation(existingRecord.evaluation);
            setAnswerText(existingRecord.savedAnswer || savedDraft || '');
          } else {
            setAnswerText(savedDraft || '');
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load questions:', err);
        setLoading(false);
      });
  }, [qId]);

  // Autosave draft
  const handleAnswerChange = (val: string) => {
    setAnswerText(val);
    if (question) {
      saveQuestionDraft(question.id, val);
    }
  };

  // Submit for AI grading
  const handleSubmitGrading = async () => {
    if (!question) return;
    if (!answerText.trim()) {
      alert('Please type your solution or spotted errors before submitting.');
      return;
    }

    setIsGrading(true);
    setGradingError(null);

    const clientId = getOrCreateClientId();

    try {
      const res = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          questionId: question.id,
          answer: answerText
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Server responded with status ${res.status}`);
      }

      setEvaluation(data);
      saveQuestionRecord(question.id, {
        status: 'graded',
        score: data.score,
        maxPoints: data.max,
        evaluation: data,
        savedAnswer: answerText
      });
    } catch (err: unknown) {
      const error = err as Error;
      setGradingError(error.message || 'Failed to grade submission.');
    } finally {
      setIsGrading(false);
    }
  };

  // Self-Check handler
  const handleSelfCheck = () => {
    if (!question) return;
    setIsSolutionOpen(true);
    const existing = getQuestionRecord(question.id);
    if (!existing || existing.status === 'unattempted') {
      saveQuestionRecord(question.id, {
        status: 'self-checked',
        savedAnswer: answerText
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
        <span>Loading question {qId}...</span>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-rose-400">Question Not Found</h2>
        <p className="text-sm text-slate-400">
          The requested question ({qId}) does not exist in the COS 202 Question Bank.
        </p>
        <Link
          href="/"
          className="inline-block px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Prev / Next Navigation within section or sequence
  const currentIndex = allQuestions.findIndex(q => q.id === question.id);
  const prevQuestion = currentIndex > 0 ? allQuestions[currentIndex - 1] : null;
  const nextQuestion = currentIndex < allQuestions.length - 1 ? allQuestions[currentIndex + 1] : null;

  const difficultyColors = {
    easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    hard: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-slate-200 transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <Link
            href={`/section/${question.section}`}
            className="hover:text-slate-200 transition-colors font-medium text-slate-300"
          >
            Section {question.section}
          </Link>
          <span>/</span>
          <span className="font-mono text-emerald-400 font-bold">{question.id}</span>
        </div>

        <div className="flex items-center gap-2">
          {prevQuestion ? (
            <Link
              href={`/q/${prevQuestion.id}`}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{prevQuestion.id}</span>
            </Link>
          ) : (
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/40 text-slate-600 border border-slate-850 cursor-not-allowed">
              Prev
            </span>
          )}

          {nextQuestion ? (
            <Link
              href={`/q/${nextQuestion.id}`}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors"
            >
              <span>{nextQuestion.id}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/40 text-slate-600 border border-slate-850 cursor-not-allowed">
              Next
            </span>
          )}
        </div>
      </div>

      {/* Question Header Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-xl font-mono text-sm font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              {question.id}
            </span>
            <span
              className={`px-2.5 py-1 rounded-xl text-xs font-bold border uppercase tracking-wider ${
                difficultyColors[question.difficulty]
              }`}
            >
              {question.difficulty}
            </span>
            <span className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 capitalize">
              {question.type.replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <CountdownTimer
              questionId={question.id}
              targetMinutes={question.difficulty === 'easy' ? 15 : 30}
              isRunning={!isGrading && !evaluation && !isSolutionOpen}
              size="sm"
            />
            <span className="font-bold text-slate-200">
              {question.points} pts
            </span>
          </div>
        </div>

        {/* Error Header Callout (for spot-error and debug-extend) */}
        {question.error_header && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Target Error Count: {question.error_header}</span>
          </div>
        )}

        {/* Task description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Task Instruction</h3>
          <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line bg-slate-950/40 p-4 rounded-xl border border-slate-850">
            {question.task}
          </div>
        </div>

        {/* Provided Code Snippet */}
        {question.code && (
          <div className="space-y-2">
            <CodeViewer code={question.code} title={`Source Code for ${question.id}`} />
          </div>
        )}
      </div>

      {/* Answer Input Area */}
      <div className="space-y-4">
        <CodeEditor
          questionId={question.id}
          value={answerText}
          onChange={handleAnswerChange}
          placeholder={
            question.type === 'spot-error'
              ? "Identify each error:\nLine #: [Line number]\nType: [syntax / semantic]\nOriginal: [line code]\nFix: [corrected Java code]\n\n(Repeat for each error)"
              : question.type === 'predict-output'
              ? "State the exact terminal output line by line, followed by your step-by-step trace."
              : "Write your complete Java class and method implementation here..."
          }
          disabled={isGrading}
        />

        {/* Grading Error Alert */}
        {gradingError && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Grading Error</p>
              <p className="mt-0.5 leading-relaxed">{gradingError}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={handleSelfCheck}
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Self-Check (Reveal Solution • Free)</span>
          </button>

          <button
            onClick={handleSubmitGrading}
            disabled={isGrading || !answerText.trim()}
            type="button"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/20 ml-auto"
          >
            {isGrading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Evaluating syntax & semantics...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Submit for AI Grading</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result Card if evaluated */}
      {evaluation && (
        <ResultCard
          evaluation={evaluation}
          onTryAgain={() => {
            if (question) {
              const liveMins = question.difficulty === 'easy' ? 15 : 30;
              resetQuestionTimer(question.id, liveMins);
            }
            setEvaluation(null);
          }}
          onViewSolution={() => setIsSolutionOpen(true)}
        />
      )}

      {/* Solution Viewer Modal */}
      <SolutionViewer
        questionId={question.id}
        isOpen={isSolutionOpen}
        onClose={() => setIsSolutionOpen(false)}
      />
    </div>
  );
}
