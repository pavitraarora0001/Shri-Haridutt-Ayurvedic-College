import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Award, Bed, Stethoscope, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clinical Bedside Postings & Hospital Practical Training | SHAMC',
  description: 'Hands-on clinical hospital rotations, Panchakarma therapy postings, and mandatory rotatory internship at Shri Haridutt Ayurvedic Hospital.',
};

export default function PracticalTrainingPage() {
  const ROTATIONS = [
    { department: 'Kayachikitsa (Internal Medicine)', duration: '6 Months', focus: 'Bedside case documentation, metabolic and neuro-muscular disease protocol management.' },
    { department: 'Panchakarma Sanctum', duration: '3 Months', focus: 'Administering Snehana, Swedana, Shirodhara, Vamana, Virechana, and specialized Basti therapies.' },
    { department: 'Shalya Tantra (Surgery & Anorectal)', duration: '2 Months', focus: 'Aseptic wound dressing, surgical instrumentation, and Kshara Sutra ligation in Fistula-in-Ano.' },
    { department: 'Shalakya Tantra (ENT & Ophthalmology)', duration: '2 Months', focus: 'Kriyakalpa procedures (Tarpana, Nasya, Aschyotana, Karnapoorana) and slit-lamp examinations.' },
    { department: 'Prasuti & Stri Roga', duration: '2 Months', focus: 'Antenatal care checkups, labor room observation, and female reproductive healthcare.' },
    { department: 'Casualty, ICU & Emergency Rotation', duration: '1 Month', focus: 'First-aid triage, vital monitoring, acute pain alleviation, and hospital casualty protocols.' },
  ];

  return (
    <div className="bg-[#F6F2E9] min-h-screen text-[#342B25]">
      <PageHeader
        title="Clinical Bedside &amp; Hospital Practical Training"
        subtitle="100-Bed Attached Teaching Hospital · High Clinical Patient Footfall · Rotatory Internship"
        crumbs={[{ label: 'Academics', href: '/academics' }, { label: 'Practical Training' }]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#C5A46D] text-xs font-bold uppercase tracking-widest block">Hands-on Vaidya Formation</span>
          <h2 className="font-serif text-3xl font-bold text-[#173D32]">Clinical Hospital Postings &amp; Internships</h2>
          <p className="text-xs text-[#342B25]/80 font-light">
            Scholars rotate through indoor wards, specialized Panchakarma suites, and outpatient chambers under the personal supervision of senior clinical professors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROTATIONS.map((rot, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-[#C5A46D]/30 shadow-card space-y-3">
              <span className="bg-[#173D32] text-[#DFCA9E] text-[10px] font-bold px-2 py-0.5 rounded uppercase inline-block">
                {rot.duration}
              </span>
              <h3 className="font-serif text-lg font-bold text-[#173D32]">{rot.department}</h3>
              <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">{rot.focus}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
