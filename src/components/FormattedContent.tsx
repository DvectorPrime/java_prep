'use client';

import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface FormattedContentProps {
  content: string;
  className?: string;
}

// Parses inline `code` and **bold**
function renderInlineText(text: string): React.ReactNode[] {
  if (!text) return [];

  // Match `code` and **bold**
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const codeVal = part.slice(1, -1);
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-900 border border-slate-700/80 font-mono text-emerald-400 text-[11px] break-all inline-block align-baseline"
        >
          {codeVal}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const boldVal = part.slice(2, -2);
      return (
        <strong key={idx} className="font-bold text-slate-100">
          {boldVal}
        </strong>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

function parseMarkdownTable(tableBlock: string) {
  const rawLines = tableBlock.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (rawLines.length < 2) return null;

  const splitCols = (line: string) => {
    return line
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map(c => c.trim());
  };

  const headers = splitCols(rawLines[0]);
  // rawLines[1] is separator |---|---|...
  const dataRows = rawLines.slice(2).map(splitCols);

  return { headers, dataRows };
}

export function FormattedContent({ content, className = '' }: FormattedContentProps) {
  if (!content) return null;

  const trimmed = content.trim();

  // Check if content is or contains a Markdown table
  if (trimmed.includes('|') && trimmed.includes('---')) {
    const tableData = parseMarkdownTable(trimmed);
    if (tableData && tableData.dataRows.length > 0) {
      const { headers, dataRows } = tableData;

      return (
        <div className={`overflow-x-auto rounded-xl border border-slate-700/80 bg-slate-950/80 shadow-md ${className}`}>
          <table className="w-full border-collapse text-left text-xs min-w-[600px]">
            <thead>
              <tr className="bg-slate-800/90 text-slate-300 border-b border-slate-700 text-[11px] font-bold uppercase tracking-wider">
                {headers.map((h, i) => (
                  <th key={i} className="py-2.5 px-3 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-900/60 transition-colors">
                  {row.map((cell, cIdx) => {
                    const headerName = (headers[cIdx] || '').toLowerCase();
                    const isType = headerName.includes('type');
                    const isLine = headerName === 'line' || headerName === '#';
                    const isOriginal = headerName.includes('original');
                    const isCorrected = headerName.includes('corrected') || headerName.includes('fix');

                    let cellContent: React.ReactNode = renderInlineText(cell);

                    if (isType) {
                      const lower = cell.toLowerCase();
                      if (lower.includes('syntax')) {
                        cellContent = (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 uppercase tracking-wider whitespace-nowrap">
                            syntax
                          </span>
                        );
                      } else if (lower.includes('semantic')) {
                        cellContent = (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider whitespace-nowrap">
                            semantic
                          </span>
                        );
                      }
                    } else if (isLine && !isNaN(Number(cell))) {
                      cellContent = (
                        <span className="font-mono font-bold text-slate-300 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px]">
                          {headerName === 'line' ? `L${cell}` : cell}
                        </span>
                      );
                    } else if (isCorrected) {
                      cellContent = (
                        <div className="font-mono text-emerald-400 bg-emerald-950/20 px-2.5 py-1.5 rounded-lg border border-emerald-500/20 text-[11px] leading-relaxed">
                          {renderInlineText(cell)}
                        </div>
                      );
                    } else if (isOriginal) {
                      cellContent = (
                        <div className="font-mono text-slate-400 bg-slate-900/60 px-2 py-1 rounded border border-slate-800 text-[11px] leading-relaxed">
                          {renderInlineText(cell)}
                        </div>
                      );
                    }

                    return (
                      <td key={cIdx} className="py-3 px-3 text-slate-300 align-top">
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  // Check if content is code fence (```text ... ``` or ```java ... ```)
  const codeBlockMatch = trimmed.match(/^```([a-zA-Z0-9_-]*)\r?\n([\s\S]*?)```$/);
  if (codeBlockMatch) {
    const code = codeBlockMatch[2].trim();
    return (
      <div className={`rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-200 overflow-x-auto whitespace-pre ${className}`}>
        {code}
      </div>
    );
  }

  // Check if content is bulleted list
  const lines = trimmed.split(/\r?\n/);
  const isList = lines.every(l => !l.trim() || l.trim().startsWith('-') || l.trim().startsWith('*'));

  if (isList) {
    return (
      <ul className={`space-y-2 text-xs text-slate-300 ${className}`}>
        {lines.filter(l => l.trim()).map((line, idx) => {
          const text = line.trim().replace(/^[-*]\s*/, '');
          return (
            <li key={idx} className="flex items-start gap-2.5 leading-relaxed bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              <div className="flex-1">{renderInlineText(text)}</div>
            </li>
          );
        })}
      </ul>
    );
  }

  // Fallback: standard paragraphs with inline rendering
  return (
    <div className={`space-y-2 text-xs text-slate-300 leading-relaxed ${className}`}>
      {lines.map((l, i) => (
        <p key={i}>{renderInlineText(l)}</p>
      ))}
    </div>
  );
}
