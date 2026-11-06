import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { INSTITUTION_INFO } from '@/lib/data';

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PageHeader
        title="Privacy Policy & Candidate Data Protection"
        subtitle="Institutional Data Governance Standards"
        crumbs={[{ label: 'Privacy Policy' }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-6 text-xs sm:text-sm text-[#342B25]/85 font-light leading-relaxed">
          <h2 className="font-serif text-2xl font-bold text-[#173D32]">1. Commitment to Data Confidentiality</h2>
          <p>
            {INSTITUTION_INFO.name} is dedicated to safeguarding the personal, academic, and contact information submitted by prospective students, parents, faculty, and patients through our digital admissions portal and online counseling systems.
          </p>

          <h2 className="font-serif text-2xl font-bold text-[#173D32]">2. Collection & Purpose of Information</h2>
          <p>
            Information collected via admission application forms (including NEET roll number, category, qualifying marks, and residential addresses) is utilized exclusively for verification, counseling communication, and statutory NCISM reporting.
          </p>

          <h2 className="font-serif text-2xl font-bold text-[#173D32]">3. Third-Party Sharing Prohibitions</h2>
          <p>
            Candidate records and patient medical files are never leased, sold, or shared with commercial marketing entities. Data is disclosed only to competent regulatory bodies (such as NCISM, State AYUSH Counseling Directorate, and University authorities) as required by statute.
          </p>

          <h2 className="font-serif text-2xl font-bold text-[#173D32]">4. Security Protocols</h2>
          <p>
            Our infrastructure incorporates modern encryption, secure session tokens, and strict role-based access control (RBAC) ensuring unauthorized entities cannot access student dossiers.
          </p>
        </div>
      </div>
    </div>
  );
}
