'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PageHeader from '@/components/common/PageHeader';
import { Search, CheckCircle2, Clock, XCircle, AlertCircle, ShieldCheck } from 'lucide-react';

function StatusContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/admissions/status?q=${encodeURIComponent(q.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'No matching record found.');
      }
      setResult(data.application);
    } catch (err: any) {
      setError(err.message || 'Error retrieving status.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      fetchStatus(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStatus(query);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Search Box Card */}
      <div className="bg-white p-8 rounded-lg border border-[#C5A46D]/40 shadow-card">
        <h2 className="font-serif text-xl font-bold text-[#173D32] mb-2">
          Track Your Admission Application
        </h2>
        <p className="text-xs text-[#342B25]/75 mb-6 font-light">
          Enter your Application Number (e.g. <code>HC-AYUR-2026-0182</code>), registered Mobile Number, or Email Address.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter HC-AYUR-2026-XXXX / Mobile / Email"
            className="flex-grow border border-gray-300 rounded px-4 py-3 text-xs focus:outline-none focus:border-[#C5A46D]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded bg-[#173D32] text-white hover:bg-[#0F2821] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center shrink-0"
          >
            {loading ? <Clock className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4 mr-1.5" />}
            <span>Inspect Status</span>
          </button>
        </form>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Results Dossier */}
      {result && (
        <div className="bg-white rounded-lg border-2 border-[#C5A46D]/60 shadow-luxury overflow-hidden">
          <div className="bg-[#173D32] text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A46D] font-semibold">
                Application Reference
              </span>
              <h3 className="font-serif text-2xl font-bold mt-0.5">{result.applicationNumber}</h3>
            </div>

            <div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                  result.status === 'APPROVED'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-400'
                    : result.status === 'UNDER_REVIEW'
                    ? 'bg-amber-100 text-amber-900 border border-amber-400'
                    : result.status === 'REJECTED'
                    ? 'bg-rose-100 text-rose-900 border border-rose-400'
                    : 'bg-blue-100 text-blue-900 border border-blue-400'
                }`}
              >
                Status: {result.status}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-4 text-xs text-[#342B25]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F6F2E9] p-4 rounded border border-[#C5A46D]/20">
              <div>
                <span className="text-[#81917A] block">Candidate Name:</span>
                <strong className="text-sm font-serif text-[#173D32]">{result.fullName}</strong>
              </div>
              <div>
                <span className="text-[#81917A] block">Course Programme:</span>
                <strong className="text-sm font-serif text-[#173D32]">{result.courseCode}</strong>
              </div>
              <div>
                <span className="text-[#81917A] block">Category:</span>
                <span className="font-medium text-[#173D32]">{result.category}</span>
              </div>
              <div>
                <span className="text-[#81917A] block">NEET-UG Score:</span>
                <span className="font-medium text-[#173D32]">{result.neetScore ? `${result.neetScore} / 720` : 'Under Review'}</span>
              </div>
            </div>

            {result.adminNotes && (
              <div className="p-4 rounded bg-amber-50 border border-amber-200">
                <span className="font-semibold text-amber-900 block mb-1">
                  Admissions Committee Note:
                </span>
                <p className="text-amber-800 leading-relaxed font-light">
                  {result.adminNotes}
                </p>
              </div>
            )}

            {result.documents && result.documents.length > 0 && (
              <div className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/30 space-y-2">
                <span className="font-semibold text-[#173D32] block">
                  Encrypted Dossier Attachments ({result.documents.length}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {result.documents.map((doc: any) => (
                    <div key={doc.id} className="flex items-center text-[11px] bg-white p-2 rounded border border-[#C5A46D]/20 text-[#173D32]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5 shrink-0" />
                      <span className="truncate font-mono">{doc.originalName}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 text-[11px] text-[#81917A] flex items-center justify-between">
              <span>Registered: {new Date(result.submittedAt).toLocaleDateString()}</span>
              <span>Shri Haridutt Admissions Directorate</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ApplicationStatusPage() {
  return (
    <div>
      <PageHeader
        title="Check Application Status"
        subtitle="Live Admissions Dossier Tracker"
        crumbs={[{ label: 'Admissions', href: '/admissions' }, { label: 'Track Status' }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <Suspense fallback={<div className="text-center py-12 text-xs">Loading application tracker...</div>}>
          <StatusContent />
        </Suspense>
      </div>
    </div>
  );
}
