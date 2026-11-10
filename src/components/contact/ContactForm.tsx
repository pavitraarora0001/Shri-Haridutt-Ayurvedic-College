'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit message');

      setSuccess(true);
      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Error sending message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-lg border-2 border-[#C5A46D]/50 shadow-card space-y-6">
      <div>
        <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
          Send Direct Inquiry
        </span>
        <h3 className="font-serif text-2xl font-bold text-[#173D32] mt-1">
          Connect with Academic &amp; Administrative Offices
        </h3>
        <p className="text-xs text-[#342B25]/75 mt-1 font-light">
          Have inquiries regarding counseling cutoffs, hospital OPD treatments, or campus tours? Send us a direct dispatch.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Thank you. Your message has been safely logged in our administrative correspondence register. We will respond promptly.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded bg-rose-50 border border-rose-300 text-rose-800 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#173D32] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Your full name"
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#173D32] mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@example.com"
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#173D32] mb-1">
              Contact Phone *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#173D32] mb-1">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Admissions / Hospital Consultation / Verification"
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#173D32] mb-1">
            Your Message *
          </label>
          <textarea
            rows={4}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Please write your detailed inquiry here..."
            className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#C5A46D]"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-[#173D32] bg-gradient-to-r from-[#DFCA9E] to-[#C5A46D] rounded shadow-gold hover:shadow-luxury transition-all flex items-center justify-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>{loading ? 'Transmitting Message...' : 'Submit Institutional Message'}</span>
        </button>
      </form>
    </div>
  );
}
