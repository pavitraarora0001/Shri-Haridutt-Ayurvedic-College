import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Users, ShieldCheck, CheckCircle2, Download } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research Committees & Ethics Boards (IEC / IRC) | SHAMC',
  description: 'Institutional Ethics Committee (IEC), Institutional Research Committee (IRC), and ethical research oversight at Shri Haridutt Ayurvedic Medical College.',
};

export default function ResearchCommitteesPage() {
  const COMMITTEES = [
    {
      name: 'Institutional Ethics Committee (IEC - Human Research)',
      mandate: 'Registered under ICMR Guidelines 2017 & CDSCO (DHR)',
      chair: 'Dr. Ramesh Chandra Pandey (Senior Clinical Scholar)',
      secretary: 'Dr. Vivek Sharma (Professor, Kayachikitsa)',
      members: 'Pharmacologist, Clinician, Legal Expert, Social Scientist, Community Representative',
      scope: 'Rigorous review of human clinical trial protocols, safety parameters, and patient informed consent dossiers.',
      charterUrl: '/documents/misc/iec-ethics-committee-charter.pdf',
    },
    {
      name: 'Institutional Research Committee (IRC)',
      mandate: 'Academic Council Research & Dissertation Scrutiny Cell',
      chair: 'Prof. (Dr.) Devendra Nath Tripathi (Principal)',
      secretary: 'Dr. Alok Nath Upadhyay (Vice Principal)',
      members: 'Heads of all 14 Academic Departments & Research Guides',
      scope: 'Evaluation of postgraduate M.D. research synopses, methodological feasibility, and publication standards.',
      charterUrl: '/documents/misc/iec-ethics-committee-charter.pdf',
    },
    {
      name: 'Departmental Research Committee (DRC)',
      mandate: 'Specialty Level Protocol Review Board',
      chair: 'Respective Department Head (HOD)',
      secretary: 'Senior Associate Professor',
      members: 'Subject Experts & Co-Guides',
      scope: 'Pre-submission review of scholar monographs, data verification, and statistical integrity.',
      charterUrl: '/documents/misc/iec-ethics-committee-charter.pdf',
    },
  ];

  return (
    <div className="bg-[#F6F2E9] min-h-screen text-[#342B25]">
      <PageHeader
        title="Research Oversight Committees"
        subtitle="Institutional Ethics Committee (IEC) · ICMR Compliant Research Governance"
        crumbs={[{ label: 'Research', href: '/research' }, { label: 'Committees' }]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#C5A46D] text-xs font-bold uppercase tracking-widest block">Ethics &amp; Governance</span>
          <h2 className="font-serif text-3xl font-bold text-[#173D32]">Statutory Research Oversight Boards</h2>
          <p className="text-xs text-[#342B25]/80 font-light">
            Ensuring every clinical trial and academic dissertation adheres to highest national standards of patient safety and scientific integrity.
          </p>
        </div>

        <div className="space-y-6">
          {COMMITTEES.map((comm, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-[#C5A46D]/30 shadow-card space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-[#C5A46D]/20 gap-2">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#173D32]">{comm.name}</h3>
                  <p className="text-xs text-[#C5A46D] font-medium">{comm.mandate}</p>
                </div>
                <a
                  href={`/api/download?file=${encodeURIComponent(comm.charterUrl)}&name=${encodeURIComponent(comm.name)}`}
                  download={`${comm.name.replace(/[^a-zA-Z0-9-_\s]/g, '').trim().replace(/\s+/g, '-')}.pdf`}
                  className="inline-flex items-center text-xs font-semibold text-[#173D32] hover:text-[#C5A46D] transition-colors"
                >
                  <Download className="w-3.5 h-3.5 mr-1" />
                  <span>Download Charter (PDF)</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-[#81917A] uppercase font-bold block mb-1">Chairperson</span>
                  <p className="font-semibold text-[#173D32]">{comm.chair}</p>
                </div>
                <div>
                  <span className="text-[10px] text-[#81917A] uppercase font-bold block mb-1">Member Secretary</span>
                  <p className="font-semibold text-[#173D32]">{comm.secretary}</p>
                </div>
                <div>
                  <span className="text-[10px] text-[#81917A] uppercase font-bold block mb-1">Constitution</span>
                  <p className="text-[#342B25]/80">{comm.members}</p>
                </div>
              </div>

              <p className="text-xs text-[#342B25]/80 font-light pt-2 border-t border-[#C5A46D]/15">
                <strong>Mandate:</strong> {comm.scope}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
