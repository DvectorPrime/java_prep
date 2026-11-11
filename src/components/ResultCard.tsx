'use client';

import React from 'react';
import { CheckCircle2, XCircle, Award, Sparkles, ArrowRight, RotateCw, BookOpen } from 'lucide-react';
import { GradingResponse } from '@/lib/types';

interface ResultCardProps {
  evaluation: GradingResponse;
  onTryAgain?: () => void;
  onViewSolution?: () => void;
}

export function ResultCard({ evaluation, onTryAgain, onViewSolution }: ResultCardProps) {
  const { score, max, items, summary, next_step, model, cached } = evaluation;
  const percentage = max > 0 ? Math.round((score / max) * 100) : 0;

  const getScoreColor = () => {
    if (percentage >= 75) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (percentage >= 50) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/90 shadow-2xl p-6 my-6 overflow-hidden">
      {/* Header with Score */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Examiner Evaluation</h3>
            <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <span>Model: <strong className="text-slate-300">{model}</strong></span>
              {cached && (
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 text-[10px] border border-cyan-500/30">
                  Instant Cached Evaluation
                </span>
              )}
            </p>
          </div>
        </div>

        <div className={`flex items-baseline gap-2 px-4 py-2 rounded-xl border ${getScoreColor()}`}>
          <span className="text-2xl font-black font-mono">{score}</span>
          <span className="text-sm font-semibold opacity-75">/ {max} pts</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-black/30 ml-2">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Itemized Breakdown */}
      {items && items.length > 0 && (
        <div className="mt-5 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Rubric Criteria Breakdown
          </h4>
          <div className="grid gap-2.5">
            {items.map((item, idx) => {
              const isFull = item.earned >= item.max;
              const isZero = item.earned === 0;
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${
                    isFull
                      ? 'border-emerald-500/20 bg-emerald-500/5'
                      : isZero
                      ? 'border-rose-500/20 bg-rose-500/5'
                      : 'border-amber-500/20 bg-amber-500/5'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isFull ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isZero ? (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-amber-400 flex items-center justify-center text-[9px] font-bold text-amber-400">
                        ½
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-200 font-semibold">{item.label}</span>
                      <span className="font-mono text-slate-300">
                        {item.earned} / {item.max} pt
                      </span>
                    </div>
                    {item.comment && (
                      <p className="text-xs text-slate-400 mt-1 leading-normal">{item.comment}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Summary */}
      {summary && (
        <div className="mt-5 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs">
          <span className="font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Examiner Assessment:
          </span>
          <p className="text-slate-300 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Next Step / Actionable Advice */}
      {next_step && (
        <div className="mt-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
          <span className="font-semibold text-emerald-300 flex items-center gap-1.5 mb-1">
            <ArrowRight className="w-3.5 h-3.5" /> Recommended Next Step:
          </span>
          <p className="text-emerald-200/90 leading-relaxed">{next_step}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
        {onTryAgain && (
          <button
            onClick={onTryAgain}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Try Again (Re-attempt)</span>
          </button>
        )}
        {onViewSolution && (
          <button
            onClick={onViewSolution}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-lg shadow-indigo-600/20 ml-auto"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>View Official Solution</span>
          </button>
        )}
      </div>
    </div>
  );
}
