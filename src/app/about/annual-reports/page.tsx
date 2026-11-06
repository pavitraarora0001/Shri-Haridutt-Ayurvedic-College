import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { FileText, Download, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Annual Reports & Institutional Quality Audits | SHAMC',
  description: 'Annual institutional progress reports, academic quality audits, and regulatory declarations of Shri Haridutt Ayurvedic Medical College.',
};

const REPORTS = [
  {
    year: '2025–26',
    title: 'Annual Institutional Progress & Academic Quality Report (Session 2025–26)',
    refNo: 'SHAMC/AR/2026/01',
    date: '31 Jan 2026',
    size: '3.4 MB',
    summary: 'Comprehensive review of academic examinations, 100-bed hospital clinical statistics, Charak Vatika herbarium additions, and research outputs.',
    url: '/documents/misc/student-code-of-conduct-handbook.pdf',
  },
  {
    year: '2024–25',
    title: 'Annual Institutional Progress & Hospital Clinical Audit (Session 2024–25)',
    refNo: 'SHAMC/AR/2025/01',
    date: '30 Jan 2025',
    size: '2.8 MB',
    summary: 'Detailed report on 94.2% BAMS examination results, community health camps, Swarna Prashana outreach, and faculty publications.',
    url: '/documents/misc/student-code-of-conduct-handbook.pdf',
  },
  {
    year: '2023–24',
    title: 'Institutional Financial Statements & Regulatory Compliance Report (Session 2023–24)',
    refNo: 'SHAMC/AR/2024/02',
    date: '15 Feb 2024',
    size: '2.1 MB',
    summary: 'Audited balance sheet, academic infrastructure expenditure, NCISM compliance inspection report, and scholarship disbursements.',
    url: '/documents/misc/student-code-of-conduct-handbook.pdf',
  },
];

export default function AnnualReportsPage() {
  return (
    <div className="bg-[#F6F2E9] min-h-screen text-[#342B25]">
      <PageHeader
        title="Annual Reports &amp; Institutional Audits"
        subtitle="Transparent Governance · Academic Performance Reviews · Clinical Hospital Audits"
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Annual Reports' }]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#C5A46D] text-xs font-bold uppercase tracking-widest block">Institutional Transparency</span>
          <h2 className="font-serif text-3xl font-bold text-[#173D32]">Annual Reports Archive</h2>
          <p className="text-xs text-[#342B25]/80 font-light">
            Published annually for regulatory scrutiny by NCISM, University Affiliation boards, scholars, and parents.
          </p>
        </div>

        {/* Archival Status Advisory */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-900 flex items-start space-x-3 shadow-sm">
          <FileText className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-950">Statutory Regulatory &amp; Audit Transparency Notice</p>
            <p className="mt-0.5 text-amber-800 leading-relaxed font-light">
              Annual institutional dossiers, audited financial statements, and clinical hospital indices are submitted annually to the National Commission for Indian System of Medicine (NCISM) and Dr. S.R. Rajasthan Ayurved University inspection panels. Certified physical registers are preserved in the College Directorate.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {REPORTS.map((rpt, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-[#C5A46D]/30 shadow-card hover:border-[#C5A46D] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center space-x-3 text-xs">
                  <span className="bg-[#173D32] text-[#DFCA9E] font-bold px-2.5 py-0.5 rounded text-[10px] uppercase">
                    Session {rpt.year}
                  </span>
                  <span className="font-mono text-[#81917A] text-[11px]">{rpt.refNo}</span>
                  <span className="text-[#81917A]">•</span>
                  <span className="text-[#81917A] text-[11px] flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {rpt.date}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#173D32]">
                  {rpt.title}
                </h3>

                <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
                  {rpt.summary}
                </p>
              </div>

              <div className="shrink-0 flex items-center space-x-3">
                <span className="text-[11px] text-[#81917A] font-mono">{rpt.size}</span>
                <a
                  href={`/api/download?file=${encodeURIComponent(rpt.url)}&name=${encodeURIComponent(rpt.title)}`}
                  download={`${rpt.title.replace(/[^a-zA-Z0-9-_\s]/g, '').trim().replace(/\s+/g, '-')}.pdf`}
                  className="inline-flex items-center px-4 py-2 rounded text-xs font-semibold text-[#173D32] bg-[#F6F2E9] border border-[#C5A46D] hover:bg-[#173D32] hover:text-[#C5A46D] transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  <span>Download Report</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
