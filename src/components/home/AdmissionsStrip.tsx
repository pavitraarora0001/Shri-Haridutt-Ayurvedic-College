'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SectionTitle from '@/components/common/SectionTitle';
import { Sparkles, CheckCircle2, Send, FileText, HelpCircle, PhoneCall, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { FloatingLeaf } from '@/components/motion/BotanicalGraphics';
import { INSTITUTION_INFO } from '@/lib/data';

export default function AdmissionsStrip() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    mobile: '',
    email: '',
    programme: 'BAMS (100 Seats)',
    previousQualification: '10+2 (PCB Appearing/Passed)',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSuccess(`Your enquiry (Ref #${data.enquiryNumber}) has been registered with our Admissions Directorate. Our counseling team will reach out within 24 working hours.`);
      setFormData({
        studentName: '',
        parentName: '',
        mobile: '',
        email: '',
        programme: 'BAMS (100 Seats)',
        previousQualification: '10+2 (PCB Appearing/Passed)',
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-[#173D32] text-[#F6F2E9] relative border-y-2 border-[#C5A46D]/40 overflow-hidden">
      {/* Background Decorative Motif */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C5A46D_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Subtle Floating Leaves */}
      <FloatingLeaf className="top-12 left-10 w-8 h-8 opacity-20" duration={14} delay={0} />
      <FloatingLeaf className="bottom-12 right-12 w-10 h-10 opacity-25" duration={18} delay={3} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionTitle
            light
            subtitle="Admissions Open 2026–27"
            title="Begin Your Journey in Classical Ayurvedic Medicine"
            description="Approved by NCISM, Ministry of AYUSH, Govt. of India. Merit-based counseling through NEET-UG 2026."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Admission Roadmap & Requirements */}
          <ScrollReveal direction="left" className="lg:col-span-5 space-y-6">
            <div className="bg-[#0F2821] p-6 rounded-lg border border-[#C5A46D]/40 shadow-luxury space-y-4 hover:border-[#C5A46D]/80 transition-colors duration-300">
              <div className="flex items-center space-x-2 text-[#C5A46D]">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <h3 className="font-serif text-lg font-bold">Key Admission Highlights</h3>
              </div>

              <ul className="space-y-3 text-xs text-[#F6F2E9]/85">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                  <span><strong>Approved Intake:</strong> 100 Seats for B.A.M.S. Degree.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                  <span><strong>Eligibility:</strong> 10+2 with 50% in Physics, Chemistry, Biology + NEET-UG 2026 Qualification.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                  <span><strong>Counseling:</strong> 85% State AYUSH Quota + 15% All India Quota (AACCC).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                  <span><strong>Annual Tuition:</strong> ₹2,25,000 / Year (State Regulatory Approved).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                  <span><strong>Scholarships:</strong> Post-matric assistance for SC/ST/OBC/EWS candidates.</span>
                </li>
              </ul>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/admissions/apply"
                  className="w-full text-center py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#173D32] bg-gradient-to-r from-[#DFCA9E] to-[#C5A46D] rounded shadow-gold hover:shadow-luxury hover:brightness-105 active:scale-[0.98] transition-all"
                >
                  Direct Application Form →
                </Link>
                <Link
                  href="/admissions/status"
                  className="w-full text-center py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#F6F2E9] border border-[#C5A46D]/40 hover:bg-[#173D32] hover:border-[#C5A46D] rounded active:scale-[0.98] transition-all"
                >
                  Check Application Status
                </Link>
              </div>
            </div>

            {/* Counseling Helpline Card */}
            <div className="p-5 rounded-lg bg-[#173D32]/80 border border-[#C5A46D]/30 flex items-center space-x-4 hover:border-[#C5A46D]/60 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#0F2821] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D] shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="text-[#C5A46D] font-semibold uppercase tracking-wider">Admissions Directorate</p>
                <p className="text-white text-base font-serif font-bold mt-0.5">{INSTITUTION_INFO.admissionsHelpline} / {INSTITUTION_INFO.phone.split(',')[0]}</p>
                <p className="text-[#81917A] text-[11px]">Free one-on-one pre-counseling guidance available.</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Secure Online Admission Enquiry Form */}
          <ScrollReveal direction="right" className="lg:col-span-7 bg-[#0F2821] p-8 rounded-lg border-2 border-[#C5A46D]/60 shadow-2xl">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                Official Counseling Portal
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                Admissions Enquiry & Prospectus Request 2026–27
              </h3>
              <p className="text-xs text-[#F6F2E9]/75 mt-1 font-light">
                Submit your credentials to connect directly with our academic admissions committee.
              </p>
            </div>

            {success && (
              <div className="mb-6 p-4 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs leading-relaxed flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 rounded bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#C5A46D] mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="Candidate's full name"
                    className="w-full bg-[#173D32] border border-[#C5A46D]/40 rounded px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A46D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#C5A46D] mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Father/Mother/Guardian"
                    className="w-full bg-[#173D32] border border-[#C5A46D]/40 rounded px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A46D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#C5A46D] mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9+ -]{10,14}"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#173D32] border border-[#C5A46D]/40 rounded px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A46D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#C5A46D] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full bg-[#173D32] border border-[#C5A46D]/40 rounded px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A46D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#C5A46D] mb-1">
                    Programme of Interest *
                  </label>
                  <select
                    value={formData.programme}
                    onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                    className="w-full bg-[#173D32] border border-[#C5A46D]/40 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A46D]"
                  >
                    <option value="BAMS (100 Seats)">B.A.M.S. (100 Seats — 5.5 Years)</option>
                    <option value="MD (Ayurveda - Kayachikitsa)">M.D. (Ayurveda - Kayachikitsa 3 Years)</option>
                    <option value="Certificate in Panchakarma">Certificate Course in Panchakarma (1 Year)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#C5A46D] mb-1">
                    Current Qualification *
                  </label>
                  <select
                    value={formData.previousQualification}
                    onChange={(e) => setFormData({ ...formData, previousQualification: e.target.value })}
                    className="w-full bg-[#173D32] border border-[#C5A46D]/40 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A46D]"
                  >
                    <option value="10+2 (PCB Appearing/Passed)">10+2 (PCB with min 50%)</option>
                    <option value="NEET-UG 2026 Qualified">NEET-UG 2026 Qualified</option>
                    <option value="BAMS Completed (for MD)">BAMS Completed (Applying for MD)</option>
                    <option value="Graduate / Other">Graduate / Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C5A46D] mb-1">
                  Enquiry Message or Specific Questions (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ask about hostel accommodation, NEET cutoff predictions, fee payment installments..."
                  className="w-full bg-[#173D32] border border-[#C5A46D]/40 rounded px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A46D]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#173D32] bg-gradient-to-r from-[#DFCA9E] via-[#C5A46D] to-[#9A7E4F] rounded shadow-gold hover:shadow-luxury transition-all flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span>Registering Enquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Official Admission Enquiry</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-[#81917A] text-center leading-normal">
                * Note: Submission of this form constitutes an official enquiry for academic guidance and does not guarantee confirmed admission, which is subject to NEET merit and statutory counseling.
              </p>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
