'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Clock,
  Award,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Loader2
} from 'lucide-react';
import { getMockExamRecords, resetMockTimer, MockExamRecord } from '@/lib/clientStorage';
import { MetaData, MockPaper } from '@/lib/types';

export default function MockExamsPortal() {
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [mockRecords, setMockRecords] = useState<Record<number, MockExamRecord>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMockRecords(getMockExamRecords());
    fetch('/api/meta')
      .then(r => r.json())
      .then((m: MetaData) => {
        setMeta(m);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load mock meta:', err);
        setLoading(false);
      });
  }, []);

  const handleRetake = (mock: MockPaper) => {
    if (confirm(`Reset timer and retake ${mock.title}? Previous answers will be preserved for editing.`)) {
      resetMockTimer(mock.id, mock.targetMinutes);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
        <span>Loading Mock Examination Schedule...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 p-6 sm:p-8 shadow-2xl">
        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> University of Ibadan COS 202 Standard
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Practical Mock Examinations
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Strictly replicates the 05 October 2026 UI COS 202 practical paper structure: 5 Spot-Error (Student Records), 4 Spot-Error (Payment & Swing), and 1 Comprehensive Written Program.
          </p>
        </div>
      </div>

      {/* Mock Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {meta?.mock_papers.map(mock => {
          const record = mockRecords[mock.id];

          return (
            <div
              key={mock.id}
              className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl flex flex-col justify-between space-y-6 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                    Mock {mock.id}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{mock.targetMinutes} minutes</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-100">{mock.title}</h2>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{mock.description}</p>
                </div>

                {/* Parts Breakdown */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  {mock.parts.map(p => (
                    <div
                      key={p.part}
                      className="p-3 rounded-xl bg-slate-950/50 border border-slate-850 text-xs"
                    >
                      <div className="font-semibold text-slate-300">{p.title}</div>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {p.questionIds.map(qid => (
                          <span
                            key={qid}
                            className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-800 text-emerald-400 border border-slate-700"
                          >
                            {qid}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status & CTA */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Marks:</span>
                  <span className="font-mono font-bold text-slate-200">
                    {mock.totalPoints} points (10 questions)
                  </span>
                </div>

                {record ? (
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
                      <span className="text-emerald-300 font-semibold">Previous Attempt:</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {record.totalScore} / {record.maxScore} ({record.percentage}%)
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/mock/${mock.id}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-lg"
                      >
                        <span>Review & Edit</span>
                      </Link>
                      <button
                        onClick={() => handleRetake(mock)}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs transition-colors border border-slate-700"
                        title="Reset Timer"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={`/mock/${mock.id}`}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/20"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Begin Timed Mock Exam</span>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
