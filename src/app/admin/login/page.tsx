'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
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
        body: JSON.stringify({ identifier, password, portalType: 'ADMIN' }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid administrator credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 bg-[#0F2821]">
      <div className="max-w-md w-full bg-[#173D32] rounded-lg border-2 border-[#C5A46D] shadow-2xl p-8 space-y-6 text-white">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-[#0F2821] border border-[#C5A46D] text-[#C5A46D] flex items-center justify-center mx-auto shadow-gold">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A46D] block">
            Institutional Administration
          </span>
          <h1 className="font-serif text-2xl font-bold">
            Administrative CMS Login
          </h1>
          <p className="text-xs text-[#F6F2E9]/70 font-light">
            Secure control panel for Admissions, Enquiries, Notices & Content Management.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded bg-rose-950/80 border border-rose-500/60 text-rose-200 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#C5A46D] mb-1">
              Admin Electronic Mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#81917A] absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-[#0F2821] border border-[#C5A46D]/40 rounded pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A46D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#C5A46D] mb-1">
              Secret Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#81917A] absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0F2821] border border-[#C5A46D]/40 rounded pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A46D]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#173D32] bg-gradient-to-r from-[#DFCA9E] to-[#C5A46D] rounded shadow-gold hover:shadow-luxury transition-all flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Authorizing Session...' : 'Authenticate & Enter CMS'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#C5A46D]/20 text-xs">
          <Link href="/" className="text-[#81917A] hover:text-[#C5A46D] transition-colors">
            ← Return to Institutional Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
