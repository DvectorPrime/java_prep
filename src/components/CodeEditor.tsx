'use client';

import React, { useRef, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

interface CodeEditorProps {
  questionId: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const MAX_CHARS = 8000;

export function CodeEditor({
  questionId,
  value,
  onChange,
  placeholder = 'Type your answer or Java code here... (Tab key inserts 4 spaces)',
  disabled = false
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle Tab key insertion (4 spaces)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const insert = '    ';

      const nextVal = value.substring(0, start) + insert + value.substring(end);
      if (nextVal.length <= MAX_CHARS) {
        onChange(nextVal);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + insert.length;
        }, 0);
      }
    }
  };

  const handleClear = () => {
    if (confirm('Clear your current answer draft?')) {
      onChange('');
    }
  };

  const charCount = value.length;
  const isNearLimit = charCount > MAX_CHARS * 0.85;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 shadow-xl overflow-hidden my-4 focus-within:border-emerald-500/80 transition-colors">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700 text-xs text-slate-400">
        <span className="font-medium text-slate-300">Your Solution / Errors Identification</span>
        <div className="flex items-center gap-3">
          <span
            className={`font-mono text-xs ${
              isOverLimit ? 'text-rose-400 font-bold' : isNearLimit ? 'text-amber-400' : 'text-slate-400'
            }`}
          >
            {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()} chars
          </span>
          {value.length > 0 && !disabled && (
            <button
              onClick={handleClear}
              type="button"
              className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors text-xs"
              title="Clear draft"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        rows={10}
        spellCheck={false}
        className="w-full bg-slate-950/60 p-4 font-mono text-sm leading-relaxed text-slate-100 placeholder:text-slate-600 focus:outline-none resize-y min-h-[200px]"
      />
    </div>
  );
}
