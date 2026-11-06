'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserCheck, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export default function FacultyLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('faculty@hariduttayurveda.edu.in');
  const [password, setPassword] = useState('Faculty@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password, portalType: 'FACULTY' }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');

      router.push('/faculty-portal/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid faculty credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-[#F6F2E9]">
      <div className="max-w-md w-full bg-white rounded-lg border-2 border-[#C5A46D]/60 shadow-luxury p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-[#173D32] border border-[#C5A46D] text-[#C5A46D] flex items-center justify-center mx-auto shadow-gold">
            <UserCheck className="w-7 h-7" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A46D] block">
            Academic & Clinical Staff
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#173D32]">
            Faculty & Vaidya Login
          </h1>
          <p className="text-xs text-[#342B25]/70 font-light">
            Manage your daily lecture rosters, OPD clinical schedules, and student attendance logs.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <div className="p-3 rounded bg-[#F6F2E9] border border-[#C5A46D]/30 text-[11px] text-[#173D32] space-y-1">
          <p className="font-semibold text-[#C5A46D]">Demo Faculty Account:</p>
          <p>Email: <code>faculty@hariduttayurveda.edu.in</code></p>
          <p>Password: <code>Faculty@123</code></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#173D32] mb-1">
              Official Institutional Email
            </label>
            <input
              type="email"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#173D32] mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#173D32] bg-gradient-to-r from-[#DFCA9E] to-[#C5A46D] rounded shadow-gold hover:shadow-luxury transition-all flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Verifying Faculty Credentials...' : 'Access Faculty Dashboard'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#C5A46D]/20 text-xs">
          <Link href="/" className="text-[#81917A] hover:text-[#173D32] transition-colors">
            ← Return to Institutional Website
          </Link>
        </div>
      </div>
    </div>
  );
}
