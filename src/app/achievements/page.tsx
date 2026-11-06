import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Trophy, Award, CheckCircle2, Star } from 'lucide-react';

export default function AchievementsPage() {
  const achievements = [
    {
      year: '2025',
      title: 'Top Ayurvedic Medical College in Eastern Rajasthan',
      organization: 'State AYUSH Education Excellence Awards',
      desc: 'Conferred for outstanding bedside hospital clinical exposure, high patient satisfaction index, and 100% university pass percentage.',
    },
    {
      year: '2024',
      title: 'National CCRAS Best Research Paper Citation',
      organization: 'Central Council for Research in Ayurvedic Sciences',
      desc: 'Awarded to our Dravyaguna research team for standardizing micro-chemical identification of indigenous desert flora.',
    },
    {
      year: '2023',
      title: 'Excellence in Rural Free Healthcare Outreach',
      organization: 'Ministry of AYUSH Regional Directorate',
      desc: 'Recognizing over 50,000 complimentary consultations and herbal dispensations to rural agricultural communities.',
    },
    {
      year: '2022',
      title: 'Best Herbal Conservatory & Green Campus Award',
      organization: 'State Botanical Conservation Forum',
      desc: 'Honoring the 5-acre Charak Vatika for cultivating and propagating 350+ rare, endangered, and medicinal taxa.',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Institutional Achievements & Accolades"
        subtitle="Benchmarks of Excellence"
        crumbs={[{ label: 'Achievements' }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {achievements.map((ach, i) => (
              <div key={i} className="bg-white p-8 rounded-lg border border-[#C5A46D]/30 shadow-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-bold text-[#C5A46D]">{ach.year}</span>
                    <Trophy className="w-5 h-5 text-[#173D32]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#173D32] mb-1">{ach.title}</h3>
                  <p className="text-[11px] text-[#81917A] font-semibold mb-3">{ach.organization}</p>
                  <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">{ach.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
