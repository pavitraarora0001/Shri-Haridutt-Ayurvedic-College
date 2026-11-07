'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PageHeader from '@/components/common/PageHeader';
import { Search, CheckCircle2, Clock, XCircle, AlertCircle, ShieldCheck } from 'lucide-react';

function StatusContent() {
  const searchParams = useSearchParams();
  const initialAppNo = searchParams.get('appNo') || searchParams.get('q') || '';
  const initialVerify = searchParams.get('verify') || searchParams.get('phone') || searchParams.get('email') || '';

  const [appNo, setAppNo] = useState(initialAppNo);
  const [verifier, setVerifier] = useState(initialVerify);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async (targetAppNo: string, targetVerify: string) => {
    if (!targetAppNo.trim() || !targetVerify.trim()) {
      setError('Please provide both your Application Reference Number and registered Mobile or Email.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const url = `/api/admissions/status?appNo=${encodeURIComponent(targetAppNo.trim())}&verify=${encodeURIComponent(targetVerify.trim())}`;
      const res = await fetch(url);
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
    if (initialAppNo && initialVerify) {
      fetchStatus(initialAppNo, initialVerify);
    }
  }, [initialAppNo, initialVerify]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStatus(appNo, verifier);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Search Box Card */}
      <div className="bg-white p-8 rounded-lg border border-[#C5A46D]/40 shadow-card">
        <h2 className="font-serif text-xl font-bold text-[#173D32] mb-2 flex items-center">
          <ShieldCheck className="w-5 h-5 mr-2 text-[#C5A46D]" />
          <span>Track Your Admission Application</span>
        </h2>
        <p className="text-xs text-[#342B25]/75 mb-6 font-light">
          For candidate data privacy and statutory security, enter both your Application Number and registered Mobile Number or Email.
        </p>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#173D32] uppercase tracking-wider mb-1">
                Application Number *
              </label>
              <input
                type="text"
                required
                value={appNo}
                onChange={(e) => setAppNo(e.target.value)}
                placeholder="e.g. HC-AYUR-2026-0001"
                className="w-full border border-gray-300 rounded px-4 py-2.5 text-xs focus:outline-none focus:border-[#C5A46D]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#173D32] uppercase tracking-wider mb-1">
                Registered Mobile or Email *
              </label>
              <input
                type="text"
                required
                value={verifier}
                onChange={(e) => setVerifier(e.target.value)}
                placeholder="Mobile (+91) or Email Address"
                className="w-full border border-gray-300 rounded px-4 py-2.5 text-xs focus:outline-none focus:border-[#C5A46D]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded bg-[#173D32] text-white hover:bg-[#0F2821] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center shrink-0 cursor-pointer shadow-gold"
            >
              {loading ? <Clock className="w-4 h-4 animate-spin mr-1.5" /> : <Search className="w-4 h-4 mr-1.5" />}
              <span>Inspect Status</span>
            </button>
          </div>
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
                <span className="text-[#81917A] block">Opted Programme:</span>
                <span className="font-semibold text-[#173D32]">{result.courseCode}</span>
              </div>
              <div>
                <span className="text-[#81917A] block">Submission Date:</span>
                <span>{new Date(result.submittedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
              <div>
                <span className="text-[#81917A] block">Statutory Verification:</span>
                <span className="text-emerald-700 font-semibold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Candidate Ownership Confirmed
                </span>
              </div>
            </div>

            {/* Document Checklist */}
            <div className="pt-2">
              <h4 className="font-serif font-bold text-[#173D32] mb-3">
                Submitted Verification Documents
              </h4>
              <div className="divide-y divide-gray-100 border rounded border-gray-200">
                {result.documents && result.documents.length > 0 ? (
                  result.documents.map((doc: any, idx: number) => (
                    <div key={idx} className="p-3 flex items-center justify-between text-xs">
                      <span className="font-medium text-[#173D32]">{doc.documentType}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        doc.status === 'VERIFIED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-xs text-gray-500 italic">No document records found.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdmissionsStatusPage() {
  return (
    <div className="bg-[#F6F2E9] min-h-screen text-[#342B25] pb-24">
      <PageHeader
        title="Application Status & Dossier Verification"
        subtitle="Track the official admissions evaluation, scrutiny status, and statutory clearance for AYUSH Batch 2026–27."
        crumbs={[
          { label: 'Admissions 2026', href: '/admissions' },
          { label: 'Application Status' },
        ]}
      />
      <Suspense fallback={<div className="text-center py-12 text-xs text-[#81917A]">Loading verification engine...</div>}>
        <StatusContent />
      </Suspense>
    </div>
  );
}
