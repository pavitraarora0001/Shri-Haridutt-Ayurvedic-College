import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Award, Building, HeartHandshake, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academic MoUs & Research Collaborations | SHAMC',
  description: 'Institutional partnerships, hospital affiliations, and botanical research MoUs of Shri Haridutt Ayurvedic Medical College.',
};

const COLLABORATIONS = [
  {
    institution: 'Dr. Sarvepalli Radhakrishnan Rajasthan Ayurved University, Jodhpur',
    type: 'Academic Affiliation & Joint Research',
    scope: 'Curricular alignment, university examinations, joint CME programs, and faculty development exchanges.',
    status: 'Active · Long-Term Statutory Partnership',
  },
  {
    institution: 'Regional Ayurvedic Drug Testing & Analytical Laboratory',
    type: 'Analytical Quality Testing MoU',
    scope: 'HPTLC botanical fingerprinting, heavy metal testing, and pesticide residue screening for raw herbs.',
    status: 'Active MoU',
  },
  {
    institution: 'State Forest & Botanical Conservation Directorate',
    type: 'Medicinal Flora Conservation Accord',
    scope: 'Ex-situ germplasm preservation, rare arid-zone herb propagation in Charak Vatika, and scholar botanical surveys.',
    status: 'Active Collaboration',
  },
  {
    institution: 'District Health Society & National AYUSH Mission (NAM)',
    type: 'Rural Healthcare & Community Outreach',
    scope: 'Swarna Prashana camps, free geriatric health clinics, and rural lifestyle disorder management.',
    status: 'Active Public Health Partnership',
  },
];

export default function ResearchCollaborationsPage() {
  return (
    <div className="bg-[#F6F2E9] min-h-screen text-[#342B25]">
      <PageHeader
        title="Institutional Collaborations &amp; MoUs"
        subtitle="Academic Alliances · Research Tie-ups · Community Healthcare Partnerships"
        crumbs={[{ label: 'Research', href: '/research' }, { label: 'Collaborations' }]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#C5A46D] text-xs font-bold uppercase tracking-widest block">Strategic Alliances</span>
          <h2 className="font-serif text-3xl font-bold text-[#173D32]">Collaborative Network</h2>
          <p className="text-xs text-[#342B25]/80 font-light">
            Working hand-in-hand with premier academic, clinical, and regulatory bodies to advance the frontiers of Ayurveda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COLLABORATIONS.map((col, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-[#C5A46D]/30 shadow-card space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="bg-[#173D32] text-[#DFCA9E] font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                  {col.type}
                </span>
                <span className="text-emerald-700 font-semibold text-[11px]">{col.status}</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#173D32] leading-tight">{col.institution}</h3>
              <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">{col.scope}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
