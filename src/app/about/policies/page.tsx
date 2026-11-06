import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { ShieldCheck, BookOpen, AlertTriangle, FileText, CheckCircle2, Download } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Institutional Policies, Disciplinary Charters & Regulations | SHAMC',
  description: 'Official codes of conduct, gender sensitization, anti-ragging, and clinical policies of Shri Haridutt Ayurvedic Medical College.',
};

const POLICIES = [
  {
    title: 'Zero-Tolerance Anti-Ragging Policy & Legal Framework',
    statute: 'NCISM Regulations & Supreme Court of India Directives',
    summary: 'Strict prohibition of ragging in any form across campus, lecture halls, herbal gardens, and residential hostels. Enforced by 24x7 flying squads.',
    download: '/documents/misc/anti-ragging-statutory-affidavit-format.pdf',
  },
  {
    title: 'POSH & Gender Sensitization Charter (ICC Cell)',
    statute: 'Sexual Harassment of Women at Workplace Act, 2013',
    summary: 'Institutional committee providing confidential, time-bound redressal for all female scholars, faculty, hospital staff, and patients.',
    download: '/documents/misc/icc-posh-policy-dossier.pdf',
  },
  {
    title: 'Mandatory Clinical & Lecture Attendance Policy',
    statute: 'NCISM Minimum Standards of Education (MSE 2022)',
    summary: 'Requires minimum 75% attendance in theoretical didactic lectures and 80% attendance in hospital clinical ward postings to sit for annual exams.',
    download: '/documents/misc/student-code-of-conduct-handbook.pdf',
  },
  {
    title: 'Bio-Medical Waste Management & Environmental Sanitation',
    statute: 'Bio-Medical Waste Management Rules 2016 (Ministry of Environment)',
    summary: 'Color-coded segregation, autoclaving, and safe authorized disposal of hospital sharp, anatomical, and pathological waste.',
    download: '/documents/misc/biomedical-waste-authorization.pdf',
  },
  {
    title: 'Research Ethics & Animal Welfare Charter (IEC / IAEC)',
    statute: 'ICMR Guidelines 2017 & NCISM Clinical Protocols',
    summary: 'Ethical review of all postgraduate dissertations, informed patient consent mandates, and drug standardization protocols.',
    download: '/documents/misc/iec-ethics-committee-charter.pdf',
  },
  {
    title: 'Hostel Sanctuary & Anti-Substance Regulations',
    statute: 'Institutional Discipline Directorate Regulations',
    summary: '100% smoke-free, tobacco-free, and alcohol-free herbal campus with 9:00 PM biometric evening curfew and visitor authorization.',
    download: '/documents/misc/hostel-admission-rules-undertaking.pdf',
  },
];

export default function InstitutionalPoliciesPage() {
  return (
    <div className="bg-[#F6F2E9] min-h-screen text-[#342B25]">
      <PageHeader
        title="Institutional Policies &amp; Regulations"
        subtitle="Vedic Ethics · Disciplinary Codes · Safety &amp; Environmental Compliance Framework"
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Institutional Policies' }]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#C5A46D] text-xs font-bold uppercase tracking-widest block">Governance Standards</span>
          <h2 className="font-serif text-3xl font-bold text-[#173D32]">Statutory Institutional Charters</h2>
          <p className="text-xs text-[#342B25]/80 font-light">
            Binding upon all admitted scholars, teaching faculty, clinical hospital staff, and administrative personnel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {POLICIES.map((policy, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-[#C5A46D]/30 shadow-card hover:border-[#C5A46D] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold text-[#C5A46D] bg-[#0F2821] px-2.5 py-0.5 rounded inline-block">
                  {policy.statute}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#173D32] leading-tight">
                  {policy.title}
                </h3>
                <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
                  {policy.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#C5A46D]/15 flex items-center justify-between">
                <span className="text-[11px] text-[#81917A]">Official Policy Dossier</span>
                <a
                  href={`/api/download?file=${encodeURIComponent(policy.download)}&name=${encodeURIComponent(policy.title)}`}
                  download={`${policy.title.replace(/[^a-zA-Z0-9-_\s]/g, '').trim().replace(/\s+/g, '-')}.pdf`}
                  className="inline-flex items-center text-xs font-semibold text-[#173D32] hover:text-[#C5A46D] transition-colors"
                >
                  <Download className="w-3.5 h-3.5 mr-1" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
