'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, AlertTriangle, X, Loader2 } from 'lucide-react';
import { CodeViewer } from './CodeViewer';
import { FormattedContent } from './FormattedContent';

interface SolutionViewerProps {
  questionId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface SolutionData {
  id: string;
  answer_key: string;
  reference_solution: string;
  rubric: string;
  common_mistakes: string;
}

export function SolutionViewer({ questionId, isOpen, onClose }: SolutionViewerProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SolutionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !questionId) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(`/api/solution/${questionId}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then(resData => {
        if (isMounted) {
          setData(resData);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message || 'Failed to load official solution');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [questionId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">
                Official Answer Key & Reference Solution
              </h3>
              <p className="text-xs text-slate-400">
                Question <span className="font-mono text-emerald-400 font-bold">{questionId}</span> (Free Self-Check)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
              <span>Fetching verified solution...</span>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
              {error}
            </div>
          )}

          {data && !loading && (
            <>
              {/* Answer Key */}
              {data.answer_key && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2.5 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> Answer Key / Marking Criteria
                  </h4>
                  <FormattedContent content={data.answer_key} />
                </div>
              )}

              {/* Reference Solution */}
              {data.reference_solution && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> Official Reference Solution
                  </h4>
                  <CodeViewer
                    code={data.reference_solution.replace(/^```(?:java)?\r?\n/, '').replace(/\r?\n```$/, '')}
                    title="Model Answer (University of Ibadan COS 202 Standard)"
                  />
                </div>
              )}

              {/* Rubric */}
              {data.rubric && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> Official Marking Rubric
                  </h4>
                  <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-slate-300 text-xs">
                    <FormattedContent content={data.rubric} />
                  </div>
                </div>
              )}

              {/* Common Mistakes */}
              {data.common_mistakes && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Common Student Pitfalls & Mistakes
                  </h4>
                  <FormattedContent content={data.common_mistakes} />
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-850 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
