'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import {
  getMockTimer,
  pauseMockTimer,
  getQuestionTimer,
  pauseQuestionTimer
} from '@/lib/clientStorage';

interface CountdownTimerProps {
  mockId?: number;
  questionId?: string;
  targetMinutes: number;
  onTimeUp?: () => void;
  isRunning?: boolean;
  size?: 'sm' | 'md';
}

export function CountdownTimer({
  mockId,
  questionId,
  targetMinutes,
  onTimeUp,
  isRunning = true,
  size = 'md'
}: CountdownTimerProps) {
  const getInitialSeconds = () => {
    if (questionId) {
      return getQuestionTimer(questionId, targetMinutes).remainingSeconds;
    }
    if (mockId) {
      return getMockTimer(mockId, targetMinutes).remainingSeconds;
    }
    return targetMinutes * 60;
  };

  const [secondsRemaining, setSecondsRemaining] = useState<number>(getInitialSeconds);
  const wasRunning = useRef(isRunning);

  // When timer transitions from running -> stopped (e.g. submit clicked), persist the pause
  useEffect(() => {
    if (wasRunning.current && !isRunning) {
      if (questionId) {
        pauseQuestionTimer(questionId, secondsRemaining);
      } else if (mockId) {
        pauseMockTimer(mockId, secondsRemaining);
      }
    }
    wasRunning.current = isRunning;
  }, [isRunning, questionId, mockId, secondsRemaining]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      let remaining = 0;
      if (questionId) {
        remaining = getQuestionTimer(questionId, targetMinutes).remainingSeconds;
      } else if (mockId) {
        remaining = getMockTimer(mockId, targetMinutes).remainingSeconds;
      }

      setSecondsRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        if (onTimeUp) onTimeUp();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [mockId, questionId, targetMinutes, onTimeUp, isRunning]);

  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  const isLowTime = isRunning && secondsRemaining > 0 && secondsRemaining <= 300; // <= 5 mins
  const isExpired = secondsRemaining === 0;

  const pad = (n: number) => String(n).padStart(2, '0');
  const formattedTime = `${hours > 0 ? `${pad(hours)}:` : ''}${pad(minutes)}:${pad(seconds)}`;

  if (size === 'sm') {
    return (
      <div
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono text-xs transition-colors ${
          !isRunning
            ? 'bg-slate-800/80 border-slate-700 text-slate-300'
            : isExpired
            ? 'bg-rose-500/20 border-rose-500/30 text-rose-300'
            : isLowTime
            ? 'bg-amber-500/20 border-amber-500/30 text-amber-300 animate-pulse'
            : 'bg-slate-900 border-slate-850 text-slate-300'
        }`}
        title={!isRunning ? 'Timer stopped on submission' : 'Active question timer'}
      >
        <Clock className={`w-3.5 h-3.5 ${!isRunning ? 'text-slate-400' : 'text-emerald-400'}`} />
        <span className="font-bold">{formattedTime}</span>
        {!isRunning && <span className="text-[10px] text-slate-400 font-sans">(stopped)</span>}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border font-mono font-bold text-sm shadow-lg transition-all ${
        !isRunning
          ? 'bg-slate-850 border-slate-750 text-slate-300'
          : isExpired
          ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
          : isLowTime
          ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 animate-pulse'
          : 'bg-slate-800/90 border-slate-700 text-slate-200'
      }`}
    >
      {isExpired ? (
        <AlertCircle className="w-4 h-4 text-rose-400" />
      ) : !isRunning ? (
        <Clock className="w-4 h-4 text-slate-400" />
      ) : isLowTime ? (
        <AlertCircle className="w-4 h-4 text-amber-400" />
      ) : (
        <Clock className="w-4 h-4 text-emerald-400" />
      )}
      <span>{formattedTime}</span>
      {!isRunning && <span className="text-xs font-sans font-normal text-slate-400">(Timer Stopped)</span>}
      {isRunning && isExpired && <span className="text-xs font-sans font-normal text-rose-300">(Time&apos;s Up)</span>}
    </div>
  );
}
