'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Play,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Loader2,
  FileText,
  X,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  getOrCreateClientId,
  getStudentName,
  getAllQuestionRecords,
  getMockExamRecords,
  exportProgressJson,
  importProgressJson,
  resetAllProgress,
  QuestionLocalRecord
} from '@/lib/clientStorage';
import { QuestionPublic, MetaData, SectionMeta } from '@/lib/types';

export default function MinimalStudentDashboard() {
  const [questions, setQuestions] = useState<QuestionPublic[]>([]);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [records, setRecords] = useState<Record<string, QuestionLocalRecord>>({});
  const [loading, setLoading] = useState(true);

  // HCI Section Index Dialog (always opens on load as requested)
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(true);

  // Filters
  const [activeSection, setActiveSection] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unsolved' | 'solved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  useEffect(() => {
    setRecords(getAllQuestionRecords());

    Promise.all([
      fetch('/api/questions').then(r => r.json()),
      fetch('/api/meta').then(r => r.json())
    ])
      .then(([qData, mData]: [QuestionPublic[], MetaData]) => {
        setQuestions(qData);
        setMeta(mData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load questions:', err);
        setLoading(false);
      });
  }, []);

  const refreshRecords = () => {
    setRecords(getAllQuestionRecords());
  };

  // Metrics
  const totalCount = questions.length || 100;
  const completedCount = useMemo(() => {
    return Object.values(records).filter(
      r => r.status === 'graded' || r.status === 'self-checked'
    ).length;
  }, [records]);

  const earnedPoints = useMemo(() => {
    return Object.values(records).reduce((sum, r) => sum + (r.score || 0), 0);
  }, [records]);

  const totalPossiblePoints = useMemo(() => {
    return questions.reduce((sum, q) => sum + q.points, 0) || 500;
  }, [questions]);

  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Filtered Questions by Section
  const sectionsData = useMemo(() => {
    if (!meta?.sections) return [];

    return meta.sections.map(sec => {
      const secQuestions = questions.filter(q => q.section === sec.code);

      const matchingQuestions = secQuestions.filter(q => {
        if (activeSection !== 'all' && activeSection !== sec.code) return false;
        if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;

        const isSolved = records[q.id]?.status === 'graded' || records[q.id]?.status === 'self-checked';
        if (statusFilter === 'solved' && !isSolved) return false;
        if (statusFilter === 'unsolved' && isSolved) return false;

        if (searchQuery.trim()) {
          const qText = `${q.id} ${q.topic} ${q.task} ${q.type}`.toLowerCase();
          if (!qText.includes(searchQuery.toLowerCase())) return false;
        }

        return true;
      });

      const secSolvedCount = secQuestions.filter(
        q => records[q.id]?.status === 'graded' || records[q.id]?.status === 'self-checked'
      ).length;

      return {
        ...sec,
        totalInSec: secQuestions.length,
        solvedInSec: secSolvedCount,
        questions: matchingQuestions
      };
    });
  }, [meta, questions, records, activeSection, selectedDifficulty, statusFilter, searchQuery]);

  const visibleSections = sectionsData.filter(s => s.questions.length > 0);

  // Jump smoothly to a section
  const handleJumpToSection = (secCode: string) => {
    setIsSectionModalOpen(false);
    setActiveSection('all'); // Ensure all sections are rendered so the DOM target exists
    setTimeout(() => {
      const el = document.getElementById(`section-${secCode}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  // Next recommended question
  const nextRecommended = useMemo(() => {
    return questions.find(q => !records[q.id] || records[q.id].status === 'unattempted');
  }, [questions, records]);

  // Data management
  const handleExport = () => {
    const jsonStr = exportProgressJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cos202_progress.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const content = evt.target?.result as string;
      if (content && importProgressJson(content)) {
        setImportStatus('Progress imported successfully!');
        refreshRecords();
        setTimeout(() => setImportStatus(null), 3000);
      } else {
        setImportStatus('Invalid JSON file.');
        setTimeout(() => setImportStatus(null), 3000);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Reset all progress and answers? This action cannot be undone.')) {
      resetAllProgress();
      refreshRecords();
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
        <span className="text-sm">Loading 100 questions...</span>
      </div>
    );
  }

  const difficultyBadgeClasses: Record<string, string> = {
    easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    hard: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* 1. TOP NOTICE & LOCAL STORAGE BACKUP BAR (Directly visible at top of dashboard) */}
      <section className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-medium">
            Progress is saved locally on this device.
          </span>
          {importStatus && (
            <span className="text-emerald-400 font-semibold ml-2">✓ {importStatus}</span>
          )}
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 transition-colors border border-slate-700 font-medium"
            title="Download your answers & scores backup file"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Progress</span>
          </button>

          <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 transition-colors border border-slate-700 cursor-pointer font-medium">
            <Upload className="w-3.5 h-3.5 text-indigo-400" />
            <span>Import JSON</span>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition-colors"
            title="Reset All Local Data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 2. Minimal Header & Simple Completion Chart */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>COS 202 Java Exam Practice</span>
            </h1>
            <p className="text-xs text-slate-400">
              100 preset questions across all 9 sections with instant AI error-checking.
            </p>
          </div>

          {/* Simple Clean Progress Chart */}
          <div className="flex items-center gap-5 bg-slate-950/70 border border-slate-800/80 px-5 py-4 rounded-xl min-w-[280px]">
            {/* Minimal Circular Progress Ring */}
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 transition-all duration-700"
                  strokeDasharray={`${completionPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-mono text-xs font-bold text-slate-100">
                {completionPercent}%
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Completed
              </span>
              <div className="text-sm font-bold text-slate-100">
                {completedCount} of {totalCount} Solved
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                {earnedPoints} / {totalPossiblePoints} points
              </div>
            </div>

            {nextRecommended && (
              <Link
                href={`/q/${nextRecommended.id}`}
                className="ml-auto p-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                title={`Continue to ${nextRecommended.id}`}
              >
                <Play className="w-4 h-4 fill-current" />
              </Link>
            )}
          </div>
        </div>

        {/* Minimal Mock Exam Shortcuts */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Simulated Mock Papers:</span>
          </span>

          <div className="flex flex-wrap gap-2">
            {meta?.mock_papers.map(m => (
              <Link
                key={m.id}
                href={`/mock/${m.id}`}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-slate-100 transition-colors flex items-center gap-1.5"
              >
                <span className="font-semibold">Mock {m.id}</span>
                <span className="text-[10px] text-slate-500 font-mono">({m.targetMinutes}m)</span>
              </Link>
            ))}
            <Link
              href="/mock"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium transition-colors"
            >
              All Mocks →
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Filter, Search & Directory Bar */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search problem, ID (e.g. Q001), topic or keyword..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-slate-700"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* HCI Section Index Modal Opener */}
            <button
              onClick={() => setIsSectionModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/30 text-indigo-300 font-semibold transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>9 Syllabus Sections Index</span>
            </button>

            {/* Status */}
            <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-0.5">
              {(['all', 'unsolved', 'solved'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                    statusFilter === s
                      ? 'bg-slate-800 text-slate-100'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Difficulty */}
            <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-0.5">
              {(['all', 'easy', 'medium', 'hard'] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                    selectedDifficulty === d
                      ? 'bg-slate-800 text-slate-100'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section Quick Jump Filter Horizontal Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-3 py-1.5 rounded-lg shrink-0 font-medium transition-colors ${
              activeSection === 'all'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All Sections
          </button>
          {meta?.sections.map(sec => {
            const isActive = activeSection === sec.code;
            return (
              <button
                key={sec.code}
                onClick={() => {
                  setActiveSection(sec.code);
                  setTimeout(() => {
                    const el = document.getElementById(`section-${sec.code}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 50);
                }}
                className={`px-3 py-1.5 rounded-lg shrink-0 font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span>Section {sec.code}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Main Content: All Sections and their Problems at once */}
      <section className="space-y-8">
        {visibleSections.length === 0 ? (
          <div className="p-12 text-center border border-slate-800 rounded-2xl bg-slate-900/40 text-slate-400 text-sm">
            No questions match your current search or filters.
          </div>
        ) : (
          visibleSections.map(sec => (
            <div
              key={sec.code}
              id={`section-${sec.code}`}
              className="space-y-3 scroll-mt-20"
            >
              {/* Section Header */}
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold font-mono flex items-center justify-center">
                    {sec.code}
                  </span>
                  <h2 className="text-base font-bold text-slate-100">
                    Section {sec.code}: {sec.title}
                  </h2>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {sec.solvedInSec} / {sec.totalInSec} completed
                </span>
              </div>

              {/* Questions List for this section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {sec.questions.map(q => {
                  const rec = records[q.id];
                  const isGraded = rec?.status === 'graded';
                  const isSelfChecked = rec?.status === 'self-checked';
                  const isDone = isGraded || isSelfChecked;

                  return (
                    <Link
                      key={q.id}
                      href={`/q/${q.id}`}
                      className={`p-4 rounded-xl border transition-all text-xs group flex flex-col justify-between ${
                        isDone
                          ? 'bg-slate-900/80 border-slate-700/80 hover:border-emerald-500/50'
                          : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                      }`}
                    >
                      <div className="space-y-2">
                        {/* Top: ID, Difficulty, Type */}
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                            {q.id}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${
                                difficultyBadgeClasses[q.difficulty] || 'text-slate-400'
                              }`}
                            >
                              {q.difficulty}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {q.points}p
                            </span>
                          </div>
                        </div>

                        {/* Topic & Task Preview */}
                        <div>
                          <div className="font-semibold text-slate-300 capitalize text-xs">
                            {q.topic.replace(/-/g, ' ')}
                          </div>
                          <p className="text-slate-400 line-clamp-2 text-[11px] mt-1 leading-relaxed">
                            {q.task}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Footer: Type badge & Status */}
                      <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-mono capitalize">
                          {q.type.replace('-', ' ')}
                        </span>

                        <div>
                          {isGraded ? (
                            <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{rec.score}/{rec.maxPoints} pts</span>
                            </span>
                          ) : isSelfChecked ? (
                            <span className="text-slate-300 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                              <span>Reviewed</span>
                            </span>
                          ) : (
                            <span className="text-slate-500 group-hover:text-emerald-400 flex items-center gap-0.5">
                              <span>Solve</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </section>

      {/* 5. CLOSABLE SECTIONS DIRECTORY DIALOG (Always opens on dashboard load as requested) */}
      {isSectionModalOpen && meta?.sections && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-base">
                    COS 202 Syllabus Sections Directory
                  </h3>
                  <p className="text-xs text-slate-400">
                    Jump straight to any of the 9 exam sections without searching:
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsSectionModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                title="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sections List Cards */}
            <div className="p-6 overflow-y-auto space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {meta.sections.map(sec => {
                  const secQuestions = questions.filter(q => q.section === sec.code);
                  const solvedCount = secQuestions.filter(
                    q => records[q.id]?.status === 'graded' || records[q.id]?.status === 'self-checked'
                  ).length;
                  const totalPts = secQuestions.reduce((s, q) => s + q.points, 0);

                  return (
                    <button
                      key={sec.code}
                      onClick={() => handleJumpToSection(sec.code)}
                      className="p-3.5 rounded-2xl border border-slate-800 bg-slate-950/60 hover:bg-slate-800/80 hover:border-emerald-500/40 text-left transition-all group flex flex-col justify-between space-y-2.5"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                          {sec.code}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {solvedCount}/{secQuestions.length} done
                        </span>
                      </div>

                      <div>
                        <div className="font-bold text-slate-200 text-xs group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                          {sec.title}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {sec.scope || `${secQuestions.length} problems • ${totalPts} points`}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-[11px] font-medium text-emerald-400 w-full">
                        <span>{secQuestions.length} Questions</span>
                        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>Jump</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">
                Tip: You can re-open this directory anytime via the top button.
              </span>
              <button
                onClick={() => setIsSectionModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors border border-slate-700"
              >
                Close & Browse Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
