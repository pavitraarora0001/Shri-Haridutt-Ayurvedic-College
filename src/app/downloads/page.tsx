'use client';

import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Download, FileText, CheckCircle2 } from 'lucide-react';
import { triggerPdfDownload } from '@/lib/download';

export default function DownloadsPage() {
  const files = [
    {
      name: 'BAMS Information Brochure & Prospectus 2026–27',
      size: '4.2 MB',
      category: 'Prospectus',
      fileUrl: '/documents/misc/institutional-prospectus-information-brochure-2026-27.pdf',
    },
    {
      name: 'NCISM BAMS 5.5-Year Competency-Based Syllabus (ER-2022)',
      size: '2.8 MB',
      category: 'Academic Curriculum',
      fileUrl: '/documents/ncism/transitional-curriculum-ug-bams-2026.pdf',
    },
    {
      name: 'Admissions Document Verification Checklist & Undertaking',
      size: '540 KB',
      category: 'Admissions',
      fileUrl: '/documents/misc/neet-ug-admissions-notification-guidelines-2026.pdf',
    },
    {
      name: 'Institutional Anti-Ragging Affidavit Formats (Annexure I & II)',
      size: '320 KB',
      category: 'Statutory',
      fileUrl: '/documents/misc/anti-ragging-statutory-affidavit-format.pdf',
    },
    {
      name: 'Student Leave & Hospital Clinical Internship Logbook Format',
      size: '1.1 MB',
      category: 'Internship',
      fileUrl: '/documents/misc/student-code-of-conduct-handbook.pdf',
    },
    {
      name: 'Charak Vatika Medicinal Flora Monograph (Botanical Index)',
      size: '3.5 MB',
      category: 'Research',
      fileUrl: '/documents/ncism/transitional-curriculum-ug-bams-2026.pdf',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Institutional Downloads &amp; Forms"
        subtitle="Prospectus, Syllabus &amp; Statutory Affidavits"
        crumbs={[{ label: 'Downloads' }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/40 shadow-card">
            <h2 className="font-serif text-xl font-bold text-[#173D32]">
              Official Documents &amp; Downloadable Publications
            </h2>
            <p className="text-xs text-[#342B25]/75 mt-1 font-light">
              All documents are in standard PDF format. Click any document below to trigger immediate download to your device.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {files.map((file, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#173D32] text-[#C5A46D]">
                      {file.category}
                    </span>
                    <span className="text-xs text-[#81917A]">{file.size}</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#173D32] leading-snug">
                    {file.name}
                  </h3>
                </div>

                <div className="pt-3 border-t border-[#C5A46D]/20">
                  <a
                    href={`/api/download?file=${encodeURIComponent(file.fileUrl)}&name=${encodeURIComponent(file.name)}`}
                    download={`${file.name.replace(/[^a-zA-Z0-9-_\s]/g, '').trim().replace(/\s+/g, '-')}.pdf`}
                    onClick={(e) => {
                      e.preventDefault();
                      triggerPdfDownload(file.fileUrl, file.name);
                    }}
                    className="w-full inline-flex items-center justify-center py-2 text-xs uppercase tracking-wider font-semibold rounded bg-[#F6F2E9] hover:bg-[#173D32] text-[#173D32] hover:text-white border border-[#C5A46D]/30 transition-colors cursor-pointer select-none"
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5 text-[#C5A46D]" />
                    <span>Download PDF Document</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
