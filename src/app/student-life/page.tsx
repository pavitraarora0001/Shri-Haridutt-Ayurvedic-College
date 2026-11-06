import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Sparkles, HeartHandshake, Compass, Trophy } from 'lucide-react';

export default function StudentLifePage() {
  const activities = [
    {
      title: 'Dhanwantari Jayanti & National Ayurveda Day',
      desc: 'The college’s signature cultural and spiritual festival celebrating Bhagwan Dhanwantari with Homa rituals, classical debates, and free regional health camps.',
    },
    {
      title: 'Charaka & Sushruta Chanting Contests',
      desc: 'Annual Sanskrit Shloka recitation and Samhita debate competitions sharpening scholars’ classical oratory and memory retention.',
    },
    {
      title: 'Rural Ayurvedic Medical Outreaches',
      desc: 'Weekend diagnostic camps in surrounding villages where undergraduate students shadow senior Vaidyas in pulse reading and community hygiene.',
    },
    {
      title: 'Annual Sports & Yoga Olympiad',
      desc: 'Cricket tournaments, badminton championships, and state-level Yogasana demonstration contests fostering physical vigor.',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Student Life & Campus Culture"
        subtitle="Vedic Discipline • Cultural Vibrancy"
        crumbs={[{ label: 'Student Life' }]}
        bgImage="/images/ayurveda/ancient-heritage/vedic-courtyard-colonnade.webp"
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="bg-white p-8 rounded-lg border border-[#C5A46D]/40 shadow-card space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
              Holistic Scholar Development
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#173D32]">
              Living the Classical Vaidya Ideal in Modern Times
            </h2>
            <p className="text-sm text-[#342B25]/85 leading-relaxed font-light">
              Student life at Shri Haridutt Ayurvedic Medical College is structured to harmonize intellectual rigour with spiritual tranquility, physical wellness through daily Yoga, and deep camaraderie among scholars hailing from across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {activities.map((act, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-2">
                <span className="text-xs font-serif font-bold text-[#C5A46D]">0{i + 1}</span>
                <h3 className="font-serif text-xl font-bold text-[#173D32]">{act.title}</h3>
                <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">{act.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
