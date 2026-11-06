import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { INSTITUTION_INFO } from '@/lib/data';

export default function TermsConditionsPage() {
  return (
    <div>
      <PageHeader
        title="Terms & Institutional Regulations"
        subtitle="Statutory Codes of Conduct"
        crumbs={[{ label: 'Terms & Conditions' }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-6 text-xs sm:text-sm text-[#342B25]/85 font-light leading-relaxed">
          <h2 className="font-serif text-2xl font-bold text-[#173D32]">1. Institutional Code of Conduct</h2>
          <p>
            Enrolled scholars of {INSTITUTION_INFO.name} must uphold the highest standards of professional ethics, respect for clinical mentors, Gurukul decorum, and compassionate patient care.
          </p>

          <h2 className="font-serif text-2xl font-bold text-[#173D32]">2. 75% Mandatory Attendance Rule</h2>
          <p>
            In accordance with NCISM regulations, scholars must maintain a minimum of 75% attendance in theoretical lectures and 80% in practical/clinical hospital bed-side postings to be eligible for university professional examinations.
          </p>

          <h2 className="font-serif text-2xl font-bold text-[#173D32]">3. Anti-Ragging Mandate</h2>
          <p>
            Zero tolerance is observed regarding any form of ragging, harassment, or intimidation. Disciplinary violations result in immediate expulsion and statutory legal prosecution under state anti-ragging legislation.
          </p>
        </div>
      </div>
    </div>
  );
}
