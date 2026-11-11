'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  Sparkles,
  User,
  Shield,
  FileText,
  Home,
  Menu,
  X,
  Edit2,
  Check
} from 'lucide-react';
import { getOrCreateClientId, getStudentName, setStudentName } from '@/lib/clientStorage';

export function Navbar() {
  const pathname = usePathname();
  const [studentName, setLocalStudentName] = useState('COS 202 Student');
  const [clientId, setClientId] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [callsRemaining, setCallsRemaining] = useState<number | null>(null);

  useEffect(() => {
    const id = getOrCreateClientId();
    const name = getStudentName();
    setClientId(id);
    setLocalStudentName(name);
    setNameInput(name);

    // Fetch student remaining calls from usage stats if possible
    fetch('/api/meta')
      .then(res => res.json())
      .then(() => {
        // Can read quota
      })
      .catch(() => {});
  }, []);

  const handleSaveName = () => {
    if (nameInput.trim()) {
      setStudentName(nameInput);
      setLocalStudentName(nameInput.trim());
    }
    setIsEditingName(false);
  };

  const navLinks = [
    { label: 'Dashboard', href: '/', icon: Home },
    { label: 'Mock Exams', href: '/mock', icon: FileText },
    { label: 'Admin', href: '/admin', icon: Shield },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-slate-100 tracking-tight text-base sm:text-lg">
                COS 202
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                UI 2026
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Faculty of Computing • Java Prep</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Student Identity Badge */}
        <div className="flex items-center gap-2">
          {isEditingName ? (
            <div className="flex items-center gap-1 bg-slate-900 border border-emerald-500/50 rounded-xl p-1">
              <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                className="bg-transparent text-xs text-slate-100 px-2 py-0.5 focus:outline-none w-28 sm:w-36 font-medium"
                autoFocus
                onKeyDown={e => e.key === 'Enter' && handleSaveName()}
              />
              <button
                onClick={handleSaveName}
                className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-500"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingName(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs text-slate-300 transition-colors group"
              title="Click to change your name"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-semibold text-slate-200 max-w-[100px] sm:max-w-[140px] truncate">
                {studentName}
              </span>
              <Edit2 className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-colors" />
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 md:hidden"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-2">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 px-2 flex justify-between">
            <span>Client ID: {clientId.slice(0, 14)}...</span>
            <span className="text-emerald-400">Offline & LAN Ready</span>
          </div>
        </div>
      )}
    </header>
  );
}
