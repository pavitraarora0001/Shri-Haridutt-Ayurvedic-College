import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { ShieldCheck, UserCheck } from 'lucide-react';

export default function ManagementPage() {
  const council = [
    { name: 'Dr. R. K. Sharma', role: 'Chairman & Managing Trustee', qualification: 'Ph.D., Philanthropist & Academician' },
    { name: 'Prof. (Dr.) Devendra Nath Tripathi', role: 'Member Secretary & Principal', qualification: 'BAMS, MD (Ayur), Ph.D.' },
    { name: 'Shri B. M. Agrawal', role: 'Trustee & Finance Administrator', qualification: 'FCA, Financial Advisor' },
    { name: 'Prof. (Dr.) Acharya Vachaspati Shastri', role: 'Academic Dean & Sanskrit Chair', qualification: 'Acharya, MD (Ayur), D.Litt' },
    { name: 'Dr. Vaidya Kripashankar Vyas', role: 'Hospital Superintendent & Clinical Member', qualification: 'BAMS, MD (Ayur - Panchakarma)' },
    { name: 'Smt. Sarojini Devi', role: 'Trustee & Social Welfare In-charge', qualification: 'Social Worker & Public Health Advocate' },
  ];

  return (
    <div>
      <PageHeader
        title="Governing Council & Management"
        subtitle="Institutional Governance"
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Governing Council' }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
              Statutory Governance
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#173D32] mt-2">
              Board of Trustees & Institutional Academic Senate
            </h2>
            <p className="text-xs sm:text-sm text-[#342B25]/80 mt-3 font-light">
              Ensuring fiduciary transparency, academic compliance with NCISM statutory guidelines, and continuous infrastructural modernization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {council.map((member, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-[#173D32] text-[#C5A46D] flex items-center justify-center shrink-0">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#173D32]">{member.name}</h4>
                  <p className="text-xs text-[#C5A46D] font-medium">{member.role}</p>
                  <p className="text-[11px] text-[#81917A] mt-1">{member.qualification}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-white rounded-lg border border-[#C5A46D]/30 flex items-center space-x-3 text-xs text-[#342B25]">
            <ShieldCheck className="w-5 h-5 text-[#173D32] shrink-0" />
            <span>
              All meetings of the College Council and Hospital Advisory Committee are minuted and archived in accordance with NCISM MSR (Minimum Standard Requirements) norms.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
