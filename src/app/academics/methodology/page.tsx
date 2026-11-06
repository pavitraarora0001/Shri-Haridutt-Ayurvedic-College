import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { BookOpen, Video, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teaching Methodology & Pedagogical Philosophy | SHAMC',
  description: 'Ancient Gurukula didactic tradition integrated with modern audiovisual technology and clinical bedside pedagogy at Shri Haridutt Ayurvedic Medical College.',
};

export default function TeachingMethodologyPage() {
  const PILLARS = [
    {
      title: 'Sanskrit Samhita Recitation & Shloka Adhyayana',
      desc: 'Traditional memorization and analytical breakdown of core aphorisms from Charaka Samhita, Sushruta Samhita, and Ashtanga Hridaya under learned Sanskrit scholars.',
    },
    {
      title: 'Smart Audiovisual Lecture Theatres',
      desc: 'High-definition projection, interactive anatomical 3D modeling, and recorded clinical procedures complementing classical didactic classroom lectures.',
    },
    {
      title: 'Bedside Clinical Case History & Rogi Pariksha',
      desc: 'Daily OPD and IPD rounds where scholars perform Ashtavidha Pariksha (Nadi, Mutra, Mala, Jihva, Shabda, Sparsha, Drik, Akriti) and Dashavidha Pariksha on live patients.',
    },
    {
      title: 'Botanical Herbarium Excursions & Field Identification',
      desc: 'Guided botanical field trips to our 5-acre Charak Vatika and regional forest biomes for living identification of authentic medicinal roots, leaves, and barks.',
    },
    {
      title: 'Rasa Shastra & Bhaishajya Practical Drug Preparation',
      desc: 'Hands-on formulation compounding using traditional granite Khalva Yantras and pilot-scale pharmaceutical processing units.',
    },
    {
      title: 'Integrated Seminars & Clinical Grand Rounds',
      desc: 'Weekly interdepartmental CMEs where scholars present complex case studies, comparative modern diagnostics, and classical Ayurvedic treatment outcomes.',
    },
  ];

  return (
    <div className="bg-[#F6F2E9] min-h-screen text-[#342B25]">
      <PageHeader
        title="Teaching Methodology &amp; Pedagogy"
        subtitle="Gurukula Shloka Tradition × Contemporary Clinical Medical Pedagogy"
        crumbs={[{ label: 'Academics', href: '/academics' }, { label: 'Teaching Methodology' }]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#C5A46D] text-xs font-bold uppercase tracking-widest block">Pedagogical Philosophy</span>
          <h2 className="font-serif text-3xl font-bold text-[#173D32]">Ancient Wisdom × Modern Scientific Rigour</h2>
          <p className="text-xs text-[#342B25]/80 font-light">
            Our educational framework adheres strictly to the NCISM Competency-Based Dynamic Curriculum (MSE-2022).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-[#C5A46D]/30 shadow-card space-y-3">
              <span className="text-xs font-bold text-[#C5A46D] block">0{idx + 1}.</span>
              <h3 className="font-serif text-lg font-bold text-[#173D32] leading-tight">{item.title}</h3>
              <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
