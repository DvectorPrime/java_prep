'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronLeft,
  CheckCircle2,
  Clock,
  Award,
  Layers,
  Play,
  Loader2,
  Filter
} from 'lucide-react';
import { getAllQuestionRecords, QuestionLocalRecord } from '@/lib/clientStorage';
import { QuestionPublic, MetaData, SectionMeta } from '@/lib/types';

export default function SectionPage() {
  const params = useParams();
  const code = (params.code as string)?.toUpperCase();

  const [sectionMeta, setSectionMeta] = useState<SectionMeta | null>(null);
  const [questions, setQuestions] = useState<QuestionPublic[]>([]);
  const [records, setRecords] = useState<Record<string, QuestionLocalRecord>>({});
  const [loading, setLoading] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  useEffect(() => {
    if (!code) return;

    setRecords(getAllQuestionRecords());

    Promise.all([
      fetch('/api/questions').then(r => r.json()),
      fetch('/api/meta').then(r => r.json())
    ])
      .then(([qList, meta]: [QuestionPublic[], MetaData]) => {
        const secMeta = meta.sections.find(s => s.code === code);
        const secQuestions = qList.filter(q => q.section === code);
        setSectionMeta(secMeta || null);
        setQuestions(secQuestions);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load section:', err);
        setLoading(false);
      });
  }, [code]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
        <span>Loading Section {code}...</span>
      </div>
    );
  }

  if (!sectionMeta) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-rose-400">Section Not Found</h2>
        <p className="text-sm text-slate-400">Section {code} is not a valid syllabus section.</p>
        <Link href="/" className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const filteredQuestions = questions.filter(q => {
    if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;
    return true;
  });

  const attemptedCount = questions.filter(q => {
    const rec = records[q.id];
    return rec && (rec.status === 'graded' || rec.status === 'self-checked');
  }).length;

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const earnedPoints = questions.reduce((sum, q) => sum + (records[q.id]?.score || 0), 0);

  const difficultyColors = {
    easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    hard: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-slate-200 transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <span className="font-semibold text-slate-200">Section {code}</span>
      </div>

      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black font-mono text-xl">
              {code}
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                {sectionMeta.title}
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {questions.length} questions • {totalPoints} total points
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300">
              <span className="text-slate-500 block text-[10px]">Attempted</span>
              <span className="font-bold text-emerald-400 text-sm">
                {attemptedCount} / {questions.length}
              </span>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300">
              <span className="text-slate-500 block text-[10px]">Points</span>
              <span className="font-bold text-amber-400 text-sm">
                {earnedPoints} / {totalPoints}
              </span>
            </div>
          </div>
        </div>

        {sectionMeta.scope && (
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-850 text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-slate-400 block mb-1 uppercase tracking-wider text-[10px]">
              Syllabus Scope & Topics
            </span>
            {sectionMeta.scope}
          </div>
        )}

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5" /> Difficulty:
          </span>
          {(['all', 'easy', 'medium', 'hard'] as const).map(d => (
            <button
              key={d}
              onClick={() => setDifficultyFilter(d)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-colors ${
                difficultyFilter === d
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuestions.map(q => {
          const rec = records[q.id];
          const isGraded = rec?.status === 'graded';
          const isSelfChecked = rec?.status === 'self-checked';

          return (
            <Link
              key={q.id}
              href={`/q/${q.id}`}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 hover:bg-slate-850 hover:border-slate-700 transition-all p-5 shadow-lg group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-emerald-400 group-hover:underline">
                    {q.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${
                      difficultyColors[q.difficulty]
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-200 capitalize">
                    {q.topic.replace(/-/g, ' ')}
                  </span>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {q.task}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-400 font-mono">
                  <span>{q.points} pts</span>
                  <span>•</span>
                  <span>{q.time_minutes}m</span>
                </div>

                <div>
                  {isGraded ? (
                    <span className="px-2 py-0.5 rounded-lg font-mono text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {rec.score}/{rec.maxPoints} pts
                    </span>
                  ) : isSelfChecked ? (
                    <span className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      Self-Checked
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-lg text-[11px] text-slate-500 bg-slate-900/60 border border-slate-800 flex items-center gap-1 group-hover:text-emerald-400">
                      <span>Solve</span>
                      <Play className="w-2.5 h-2.5 fill-current" />
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
