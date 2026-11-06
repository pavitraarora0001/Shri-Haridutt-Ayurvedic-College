import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { CheckCircle2, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

export default function EligibilityPage() {
  const documents = [
    'NEET-UG 2026 Admit Card and Official Score Card / Rank Letter',
    'Class 10th Certificate & Mark Sheet (Date of Birth verification)',
    'Class 12th (10+2) Mark Sheet and Passing Certificate',
    'State AYUSH Counseling Provisional Seat Allotment Letter',
    'Character / Conduct Certificate from previous institution',
    'Transfer Certificate (TC) & Migration Certificate (Original)',
    'Category / Caste Certificate (OBC-NCL / SC / ST / EWS) where applicable',
    'Domicile / Residence Certificate',
    'Medical Fitness Certificate signed by a Registered Medical Practitioner',
    'Recent Passport Size Color Photographs (8 Copies)',
  ];

  return (
    <div>
      <PageHeader
        title="Eligibility Criteria & Mandatory Documents"
        subtitle="BAMS Admissions 2026–27"
        crumbs={[{ label: 'Admissions', href: '/admissions' }, { label: 'Eligibility' }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Eligibility Criteria Cards */}
          <div className="bg-white p-8 rounded-lg border border-[#C5A46D]/40 shadow-card space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
              Statutory NCISM Norms
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#173D32]">
              Academic Eligibility for BAMS (100 Seats)
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#342B25]/85 font-light leading-relaxed">
              <div className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/30 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#173D32] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#173D32] block font-serif text-base mb-1">
                    1. Qualifying Examination (10+2 / Intermediate)
                  </strong>
                  <span>
                    The candidate must have passed the intermediate (10+2) examination or its equivalent from a recognized State/Central Board (CBSE, ICSE, RBSE, etc.) with Physics, Chemistry, Biology (or Biotechnology) and English as core subjects.
                  </span>
                </div>
              </div>

              <div className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/30 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#173D32] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#173D32] block font-serif text-base mb-1">
                    2. Minimum Aggregate Marks in Science
                  </strong>
                  <span>
                    <strong>General / EWS Category:</strong> Minimum 50% aggregate marks in Physics, Chemistry, and Biology combined.<br />
                    <strong>OBC / SC / ST Category:</strong> Minimum 40% aggregate marks in Physics, Chemistry, and Biology combined.<br />
                    <strong>PwD Category:</strong> Minimum 45% aggregate marks for General-PwD.
                  </span>
                </div>
              </div>

              <div className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/30 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#173D32] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#173D32] block font-serif text-base mb-1">
                    3. Mandatory National Entrance Test (NEET-UG 2026)
                  </strong>
                  <span>
                    Candidate must have qualified in NEET-UG 2026 with the cutoff percentile prescribed by the Ministry of AYUSH & NCISM (50th percentile for UR, 40th percentile for SC/ST/OBC). Non-NEET candidates are not eligible under statutory regulations.
                  </span>
                </div>
              </div>

              <div className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/30 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#173D32] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#173D32] block font-serif text-base mb-1">
                    4. Minimum Age Criteria
                  </strong>
                  <span>
                    The candidate must have attained the age of 17 years on or before the 31st of December of the year of admission.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Checklist of Required Documents */}
          <div className="bg-white p-8 rounded-lg border border-[#C5A46D]/40 shadow-card space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#173D32]">
              Checklist of Documents Required at Physical Reporting
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#342B25]/85">
              {documents.map((doc, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 p-3 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                  <span className="text-[#173D32] font-serif font-bold text-sm">{idx + 1}.</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              href="/admissions/apply"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded bg-[#173D32] text-white hover:bg-[#0F2821] text-xs uppercase tracking-wider font-semibold transition-colors border border-[#C5A46D]/40"
            >
              <span>Proceed to Online Application Form</span>
              <ArrowRight className="w-4 h-4 ml-2 text-[#C5A46D]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
