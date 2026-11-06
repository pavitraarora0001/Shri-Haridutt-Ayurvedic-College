import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { INSTITUTION_INFO } from '@/lib/data';

export default function HistoryPage() {
  const timeline = [
    {
      year: '2008',
      title: 'Institutional Foundation',
      desc: 'Conceived and registered by the Shri Haridutt Educational Trust with the noble vision of bringing collegiate Ayurvedic medical education to the region.',
    },
    {
      year: '2012',
      title: 'NCISM & AYUSH Inspection & Affiliation',
      desc: 'Awarded formal Letter of Permission (LoP) by the Ministry of AYUSH & CCIM (now NCISM) to admit our initial batch of 60 BAMS scholars.',
    },
    {
      year: '2016',
      title: '100-Bedded Hospital Expansion',
      desc: 'Inauguration of the multi-specialty clinical block, Panchakarma inpatient wing, and full-fledged Ayurvedic casualty service.',
    },
    {
      year: '2020',
      title: 'Charak Vatika & Rasa Pharmacy Modernization',
      desc: 'Extension of the medicinal botanical conservatory to 5 acres holding 350+ identified species and commissioning of the GMP pilot pharmacy.',
    },
    {
      year: '2024',
      title: 'Intake Enhancement to 100 Seats & PG Sanction',
      desc: 'NCISM granted approval for 100 undergraduate BAMS seats and post-graduate residency programs in Kayachikitsa.',
    },
    {
      year: '2026',
      title: 'Vedic Heritage Digital Era',
      desc: 'Launching digital herbarium databases, telemedicine consultation wings, and integrative clinical trial corridors.',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Heritage, Evolution & Milestones"
        subtitle="Vedic Roots Across The Decades"
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'History' }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
              The Journey of Knowledge
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173D32] mt-2">
              From an Inspired Vedic Vision to an Academic Powerhouse
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 sm:before:left-1/2 before:w-0.5 before:bg-[#C5A46D]/40">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between group"
              >
                {/* Center Badge */}
                <div className="absolute left-5 sm:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#173D32] border-2 border-[#C5A46D] flex items-center justify-center text-xs font-serif font-bold text-[#C5A46D] z-10 shadow-gold">
                  {idx + 1}
                </div>

                {/* Left or Right Card */}
                <div
                  className={`w-full sm:w-[45%] pl-14 sm:pl-0 ${
                    idx % 2 === 0 ? 'sm:text-right sm:pr-8' : 'sm:ml-auto sm:text-left sm:pl-8'
                  }`}
                >
                  <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card hover:shadow-luxury transition-all">
                    <span className="text-sm font-bold text-[#C5A46D] uppercase tracking-wider">
                      {item.year}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#173D32] mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#342B25]/80 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
