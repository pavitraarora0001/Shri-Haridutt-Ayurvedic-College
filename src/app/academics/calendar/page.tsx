import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Calendar, Clock, Download, CheckCircle2, Award } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academic Calendar 2026–27 | Term Dates & Schedules | SHAMC',
  description: 'Official academic calendar for BAMS and MD Ayurveda sessions 2026-27 at Shri Haridutt Ayurvedic Medical College.',
};

const CALENDAR_EVENTS = [
  { term: 'First Term', dates: '01 Aug 2026 – 31 Dec 2026', title: 'Commencement of Classes & Shishyopanayaneeya Samskara', type: 'ACADEMIC' },
  { term: 'Terminal Exam', dates: '10 Nov 2026 – 20 Nov 2026', title: 'First Terminal Internal Assessment Examinations', type: 'EXAMINATION' },
  { term: 'Dhanwantari Jayanti', dates: '29 Oct 2026', title: 'National Ayurveda Day Celebrations & CME Conference', type: 'CULTURAL' },
  { term: 'Winter Vacation', dates: '25 Dec 2026 – 05 Jan 2027', title: 'Institutional Winter Recess for Scholars', type: 'VACATION' },
  { term: 'Second Term', dates: '06 Jan 2027 – 15 May 2027', title: 'Resumption of Lectures & Hospital Clinical Postings', type: 'ACADEMIC' },
  { term: 'Second Terminal Exam', dates: '15 Mar 2027 – 25 Mar 2027', title: 'Second Terminal Internal Assessment & Viva-Voce', type: 'EXAMINATION' },
  { term: 'Model Pre-University Exam', dates: '01 May 2027 – 10 May 2027', title: 'University Pattern Model Written & Bedside Clinical Exams', type: 'EXAMINATION' },
  { term: 'Summer Vacation', dates: '16 May 2027 – 30 Jun 2027', title: 'Summer Recess (Except Clinical Interns & Hospital Residents)', type: 'VACATION' },
  { term: 'University Annual Exams', dates: '01 Jul 2027 – 25 Jul 2027', title: 'Dr. S.R. Rajasthan Ayurved University Annual Examinations', type: 'UNIVERSITY' },
];

export default function AcademicCalendarPage() {
  return (
    <div className="bg-[#F6F2E9] min-h-screen text-[#342B25]">
      <PageHeader
        title="Institutional Academic Calendar 2026–27"
        subtitle="Approved by Academic Council · Term Schedules · Internal Assessments · University Examinations"
        crumbs={[{ label: 'Academics', href: '/academics' }, { label: 'Academic Calendar' }]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#C5A46D]/40 pb-4">
          <div>
            <span className="text-[#C5A46D] text-xs font-bold uppercase tracking-widest block mb-1">Session 2026–27</span>
            <h2 className="font-serif text-3xl font-bold text-[#173D32]">Annual Academic Schedule</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-semibold bg-amber-100 text-amber-900 px-3 py-1.5 rounded border border-amber-300">
              Provisional Schedule (Affiliating University Pattern)
            </span>
          </div>
        </div>

        {/* Affiliating University Advisory */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-900 flex items-start space-x-3 shadow-sm">
          <Calendar className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-950">Statutory University Schedule Advisory</p>
            <p className="mt-0.5 text-amber-800 leading-relaxed font-light">
              This academic calendar represents the institutional roadmap aligned with NCISM Minimum Standard Requirements. Exact dates for final university annual examinations, online portal enrollment windows, and university vacations are gazetted periodically by Dr. S.R. Rajasthan Ayurved University, Jodhpur.
            </p>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="bg-white rounded-xl border border-[#C5A46D]/30 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#173D32] text-white border-b border-[#C5A46D]">
                  <th className="py-3 px-4 font-serif font-bold uppercase tracking-wider text-[11px] text-[#DFCA9E]">Term / Event</th>
                  <th className="py-3 px-4 font-serif font-bold uppercase tracking-wider text-[11px] text-[#DFCA9E]">Timeline / Dates</th>
                  <th className="py-3 px-4 font-serif font-bold uppercase tracking-wider text-[11px] text-[#DFCA9E]">Details &amp; Description</th>
                  <th className="py-3 px-4 font-serif font-bold uppercase tracking-wider text-[11px] text-[#DFCA9E] text-right">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C5A46D]/15">
                {CALENDAR_EVENTS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#173D32]/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#173D32] whitespace-nowrap">{item.term}</td>
                    <td className="py-3.5 px-4 font-mono text-[#81917A] whitespace-nowrap">{item.dates}</td>
                    <td className="py-3.5 px-4 font-medium text-[#342B25]">{item.title}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.type === 'EXAMINATION' || item.type === 'UNIVERSITY'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : item.type === 'VACATION'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
