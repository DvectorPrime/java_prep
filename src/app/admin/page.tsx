'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield,
  Key,
  Server,
  Activity,
  Trash2,
  Power,
  RefreshCw,
  Plus,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Layers,
  Sliders,
  Database
} from 'lucide-react';
import { GroqKeyRecord, ModelConfig, UsageStats } from '@/lib/types';

export default function AdminConsole() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Admin Data
  const [keys, setKeys] = useState<Partial<GroqKeyRecord>[]>([]);
  const [config, setConfig] = useState<ModelConfig | null>(null);
  const [cacheStats, setCacheStats] = useState<{ totalEntries: number }>({ totalEntries: 0 });
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);

  // Form states
  const [bulkInput, setBulkInput] = useState('');
  const [singleKey, setSingleKey] = useState('');
  const [singleLabel, setSingleLabel] = useState('');
  const [testResults, setTestResults] = useState<Record<string, { success: boolean; message: string; latencyMs?: number }>>({});
  const [isTesting, setIsTesting] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/admin/status');
      if (res.ok) {
        const data = await res.json();
        setKeys(data.keys || []);
        setConfig(data.config || null);
        setCacheStats(data.cacheStats || { totalEntries: 0 });
        setUsageStats(data.usageStats || null);
        setIsAuthenticated(true);
      } else if (res.status === 401) {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });

      if (res.ok) {
        setIsAuthenticated(true);
        fetchStatus();
      } else {
        setAuthError('Incorrect passcode. Access denied.');
      }
    } catch {
      setAuthError('Network error connecting to auth endpoint.');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkAdd = async () => {
    if (!bulkInput.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'bulk-add', text: bulkInput })
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMessage(`Successfully imported ${data.addedCount} key(s).`);
        setBulkInput('');
        fetchStatus();
      } else {
        alert(data.error);
      }
    } catch (err: unknown) {
      const error = err as Error;
      alert(error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMessage(null), 3500);
    }
  };

  const handleAddSingleKey = async () => {
    if (!singleKey.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', key: singleKey, label: singleLabel })
      });
      if (res.ok) {
        setSingleKey('');
        setSingleLabel('');
        fetchStatus();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleKey = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'disabled' ? 'active' : 'disabled';
    await fetch('/api/admin/keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'toggle', id, status: nextStatus })
    });
    fetchStatus();
  };

  const handleRemoveKey = async (id: string) => {
    if (!confirm('Remove this key permanently from the pool?')) return;
    await fetch('/api/admin/keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'remove', id })
    });
    fetchStatus();
  };

  const handleTestKey = async (id: string) => {
    setIsTesting(id);
    try {
      const res = await fetch('/api/admin/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test', id })
      });
      const data = await res.json();
      setTestResults(prev => ({ ...prev, [id]: data }));
    } catch (err: unknown) {
      const error = err as Error;
      setTestResults(prev => ({ ...prev, [id]: { success: false, message: error.message } }));
    } finally {
      setIsTesting(null);
    }
  };

  const handleTogglePause = async () => {
    if (!config) return;
    const nextPaused = !config.gradingPaused;
    await fetch('/api/admin/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ configUpdates: { gradingPaused: nextPaused } })
    });
    fetchStatus();
  };

  const handleClearCache = async () => {
    if (!confirm('Clear all cached evaluation answers? Students with identical submissions will trigger fresh AI evaluations.')) return;
    await fetch('/api/admin/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'clear-cache' })
    });
    fetchStatus();
  };

  const handleUpdateLimits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;
    await fetch('/api/admin/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        configUpdates: {
          defaultLimits: config.defaultLimits,
          dailyStudentCap: config.dailyStudentCap,
          maxConcurrentRequests: config.maxConcurrentRequests
        }
      })
    });
    setStatusMessage('Configuration limits updated successfully.');
    fetchStatus();
    setTimeout(() => setStatusMessage(null), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Authentication</h1>
          <p className="text-xs text-slate-400">
            Protected area for managing Groq key pool and system rate limits.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Admin Passcode
            </label>
            <input
              type="password"
              value={passcode}
              onChange={e => setPasscode(e.target.value)}
              placeholder="Enter admin passcode"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          {authError && (
            <p className="text-xs font-medium text-rose-400">{authError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors shadow-lg shadow-indigo-600/20"
          >
            {loading ? 'Verifying...' : 'Unlock Console'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24">
      {/* Admin Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Groq Engine & Key Pool Management</h1>
            <p className="text-xs text-slate-400">
              COS 202 Faculty Server Controller • Live Key Balancing & Health Lifecycle
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchStatus}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold transition-colors border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleTogglePause}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              config?.gradingPaused
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{config?.gradingPaused ? 'Grading Paused (Resume)' : 'Grading Active (Pause)'}</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Key Pool</span>
          <div className="text-2xl font-black text-white">
            {keys.filter(k => k.status === 'active').length} <span className="text-sm font-normal text-slate-400">/ {keys.length} Keys</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Today Total Requests</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {usageStats?.totalRequests.toLocaleString() || 0}
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Today Total Tokens</span>
          <div className="text-2xl font-black text-indigo-400 font-mono">
            {usageStats?.totalTokens.toLocaleString() || 0}
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-1">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Evaluation Cache Entries</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-amber-400 font-mono">
              {cacheStats.totalEntries}
            </span>
            <button
              onClick={handleClearCache}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 text-xs transition-colors border border-slate-700"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Live Key Pool Table */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-emerald-400" />
              <span>Registered Groq API Keys ({keys.length})</span>
            </h2>
            <p className="text-xs text-slate-400">
              Rotates across active keys, auto-cools down on 429, and handles model fallback.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Label</th>
                <th className="py-3 px-3">Masked Key</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Today Usage (120B / 20B)</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {keys.map(k => {
                const u120b = k.usageToday?.['openai/gpt-oss-120b']?.requests || 0;
                const u20b = k.usageToday?.['openai/gpt-oss-20b']?.requests || 0;
                const testRes = k.id ? testResults[k.id] : undefined;

                return (
                  <tr key={k.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-3 font-semibold text-slate-200">
                      {k.label || 'Unnamed'}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-400">
                      {k.key}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize ${
                          k.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : k.status === 'cooldown'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : k.status === 'invalid'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {k.status}
                      </span>
                      {k.lastError && (
                        <p className="text-[10px] text-rose-400 mt-1 max-w-[180px] truncate" title={k.lastError}>
                          {k.lastError}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-300">
                      {u120b} reqs / {u20b} reqs
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Test button */}
                        <button
                          onClick={() => k.id && handleTestKey(k.id)}
                          disabled={isTesting === k.id}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors border border-slate-700"
                        >
                          {isTesting === k.id ? 'Pinging...' : 'Test'}
                        </button>

                        {/* Toggle active/disabled */}
                        <button
                          onClick={() => k.id && handleToggleKey(k.id, k.status || 'active')}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors border border-slate-700"
                        >
                          {k.status === 'disabled' ? 'Enable' : 'Disable'}
                        </button>

                        {/* Remove */}
                        <button
                          onClick={() => k.id && handleRemoveKey(k.id)}
                          className="p-1 rounded hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition-colors"
                          title="Delete Key"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {testRes && (
                        <p
                          className={`text-[10px] mt-1 ${
                            testRes.success ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {testRes.success
                            ? `Ping OK (${testRes.latencyMs}ms)`
                            : `Ping failed: ${testRes.message}`}
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Key Ingestion Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Bulk Key Ingestion</span>
          </h3>
          <p className="text-xs text-slate-400">
            Paste multiple Groq API keys below, one per line. Formats accepted:
            <br />
            <code className="text-slate-300">[label] - [api_key]</code> or bare <code className="text-slate-300">gsk_...</code>
          </p>
          <textarea
            value={bulkInput}
            onChange={e => setBulkInput(e.target.value)}
            rows={5}
            placeholder={`key_label_1 - gsk_exampleKeyOne...\nkey_label_2 - gsk_exampleKeyTwo...`}
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleBulkAdd}
            disabled={loading || !bulkInput.trim()}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
          >
            Import Keys
          </button>
        </div>

        {/* System Limits & Settings */}
        {config && (
          <form onSubmit={handleUpdateLimits} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <span>Engine Limits & Student Caps</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Max TPM per Key</label>
                <input
                  type="number"
                  value={config.defaultLimits.tpm}
                  onChange={e =>
                    setConfig({
                      ...config,
                      defaultLimits: { ...config.defaultLimits, tpm: parseInt(e.target.value, 10) || 8000 }
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Max RPM per Key</label>
                <input
                  type="number"
                  value={config.defaultLimits.rpm}
                  onChange={e =>
                    setConfig({
                      ...config,
                      defaultLimits: { ...config.defaultLimits, rpm: parseInt(e.target.value, 10) || 30 }
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Daily Cap per Student</label>
                <input
                  type="number"
                  value={config.dailyStudentCap}
                  onChange={e =>
                    setConfig({
                      ...config,
                      dailyStudentCap: parseInt(e.target.value, 10) || 30
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Max Concurrency</label>
                <input
                  type="number"
                  value={config.maxConcurrentRequests}
                  onChange={e =>
                    setConfig({
                      ...config,
                      maxConcurrentRequests: parseInt(e.target.value, 10) || 6
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-slate-400 block mb-1">Model Priority Order:</span>
              <div className="flex gap-2">
                {config.modelPriority.map((m, i) => (
                  <span
                    key={m}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 font-mono text-[10px] text-slate-300 border border-slate-700"
                  >
                    #{i + 1} {m}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
            >
              Save Configuration
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
