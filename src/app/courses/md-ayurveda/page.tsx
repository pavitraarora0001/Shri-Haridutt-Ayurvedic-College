import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { COURSES } from '@/lib/data';
import { Clock, Users, GraduationCap, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function MDAyurvedaPage() {
  const course = COURSES[1];

  return (
    <div>
      <PageHeader
        title="M.D. (Ayurveda) in Kayachikitsa"
        subtitle="Ayurveda Vachaspati • Clinical Postgraduate Residency"
        crumbs={[{ label: 'Academics', href: '/academics/programmes' }, { label: 'MD Kayachikitsa' }]}
        bgImage="/images/ayurveda/courses/md-kayachikitsa-internal-medicine.webp"
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Statutory Regulatory Advisory Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start space-x-3 text-xs text-amber-900 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950">Statutory Regulatory Status &amp; Annual Intake Notification</p>
              <p className="mt-0.5 text-amber-800 leading-relaxed font-light">
                Postgraduate degree programs (MD/MS Ayurveda) are subject to annual statutory inspection, regulatory Letter of Permission (LOP) from the National Commission for Indian System of Medicine (NCISM), New Delhi, and official seat matrix notifications released by the State AYUSH PG Counseling Board. Candidates must qualify AIAPGET for consideration.
              </p>
            </div>
          </div>

          {/* Top Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <Clock className="w-6 h-6 text-[#173D32] mx-auto mb-2" />
              <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Duration</span>
              <span className="font-serif text-xl font-bold text-[#173D32]">3 Years</span>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <Users className="w-6 h-6 text-[#173D32] mx-auto mb-2" />
              <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Intake</span>
              <span className="font-serif text-xl font-bold text-[#173D32]">12 Seats</span>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <GraduationCap className="w-6 h-6 text-[#173D32] mx-auto mb-2" />
              <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Tuition</span>
              <span className="font-serif text-xl font-bold text-[#173D32]">₹3,50,000 / Yr</span>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <ShieldCheck className="w-6 h-6 text-[#173D32] mx-auto mb-2" />
              <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Entrance</span>
              <span className="font-serif text-xl font-bold text-[#173D32]">AIAPGET</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-6">
            <h2 className="font-serif text-3xl font-bold text-[#173D32]">
              Advanced Residency in Systemic Internal Medicine
            </h2>
            <p className="text-sm text-[#342B25]/85 leading-relaxed font-light">
              The <strong>M.D. (Ayurveda) in Kayachikitsa</strong> offers specialized clinical residency in the diagnosis and management of chronic non-communicable diseases, metabolic syndromes (Prameha / Madhumeha), rheumatoid ailments (Amavata), neuro-degenerative disorders (Vatavyadhi), and oncology supportive therapy.
            </p>
            <p className="text-sm text-[#342B25]/85 leading-relaxed font-light">
              Residents conduct independent bedside patient rounds, master classical Shamana and Shodhana therapeutics, and complete a rigorous scientific dissertation in collaboration with modern pathology and imaging departments.
            </p>

            <div className="pt-4 border-t border-[#C5A46D]/20">
              <h3 className="font-serif text-xl font-bold text-[#173D32] mb-3">Eligibility & Admission Process</h3>
              <ul className="space-y-2 text-xs text-[#342B25]/85 font-light">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#173D32] shrink-0 mt-0.5" />
                  <span>Must possess a recognised BAMS degree from an NCISM/CCIM approved Ayurvedic medical college.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#173D32] shrink-0 mt-0.5" />
                  <span>Must have completed the 1-year rotatory clinical internship before the counseling cutoff date.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#173D32] shrink-0 mt-0.5" />
                  <span>Qualified in AIAPGET (All India AYUSH Post Graduate Entrance Test) conducted by NTA.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 flex items-center space-x-4">
              <Link
                href="/admissions/apply"
                className="px-6 py-3 rounded bg-[#173D32] hover:bg-[#0F2821] text-white text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Inquire for PG Seat Allocation →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
