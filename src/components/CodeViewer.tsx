'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeViewerProps {
  code: string;
  title?: string;
  highlightLine?: number;
}

export function CodeViewer({ code, title = 'Java Code Snippet', highlightLine }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  if (!code) return null;

  const lines = code.split(/\r?\n/);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-700/80 bg-slate-900 shadow-xl overflow-hidden my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/90 border-b border-slate-700 text-xs font-mono text-slate-300">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-400 font-medium pl-1">{title}</span>
        </div>
        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-700/70 hover:bg-slate-700 text-slate-200 transition-colors text-xs"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto text-sm font-mono leading-relaxed p-4 select-text">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, index) => {
              const lineNum = index + 1;
              const isHighlighted = highlightLine === lineNum;
              return (
                <tr
                  key={index}
                  className={`group transition-colors ${
                    isHighlighted ? 'bg-amber-500/15' : 'hover:bg-slate-800/50'
                  }`}
                >
                  <td className="w-10 pr-4 text-right select-none text-slate-500 group-hover:text-slate-300 font-mono text-xs align-top">
                    {lineNum}
                  </td>
                  <td className="text-slate-200 whitespace-pre font-mono">
                    {line || ' '}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
