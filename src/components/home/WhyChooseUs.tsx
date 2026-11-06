'use client';

import React from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import { INSTITUTION_INFO } from '@/lib/data';
import AnimatedCounter from '@/components/motion/AnimatedCounter';
import { StaggerContainer, StaggerItem, ScrollReveal } from '@/components/motion/ScrollReveal';
import { VedicMandalaWatermark } from '@/components/motion/BotanicalGraphics';
import { Award, Users, BedDouble, Flower2, GraduationCap, Stethoscope } from 'lucide-react';

export default function WhyChooseUs() {
  const stats = [
    {
      label: 'Years of Vedic Excellence',
      value: INSTITUTION_INFO.stats.yearsOfExcellence,
      icon: Award,
      desc: 'Sustained institutional repute in medical education and healthcare.',
    },
    {
      label: 'Qualified Teaching Faculty',
      value: INSTITUTION_INFO.stats.qualifiedFaculty,
      icon: Users,
      desc: 'Distinguished Professors, MD (Ayur) specialists, and Sanskrit scholars.',
    },
    {
      label: 'Hospital In-Patient Beds',
      value: INSTITUTION_INFO.stats.hospitalBeds,
      icon: BedDouble,
      desc: 'Attached multi-specialty clinical facility with 24x7 casualty services.',
    },
    {
      label: 'Medicinal Plant Species',
      value: INSTITUTION_INFO.stats.herbalGardenSpecies,
      icon: Flower2,
      desc: 'Thriving across 5-acre Charak Vatika botanical conservatory.',
    },
    {
      label: 'Annual OPD Consultations',
      value: INSTITUTION_INFO.stats.annualOpdPatients,
      icon: Stethoscope,
      desc: 'Unmatched volume of bedside patient exposure for undergraduate scholars.',
    },
    {
      label: 'Alumni Vaidyas Practicing',
      value: INSTITUTION_INFO.stats.graduatedVaidyas,
      icon: GraduationCap,
      desc: 'Serving across state government AYUSH hospitals and global wellness centers.',
    },
  ];

  return (
    <section className="py-24 bg-[#173D32] text-white relative border-y-2 border-[#C5A46D]/40 overflow-hidden">
      {/* Background Subtle Jaali Pattern & Slow Ambient Rotating Mandala */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C5A46D_1px,transparent_1px)] [background-size:24px_24px]" />
      <VedicMandalaWatermark className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" size={620} opacity={0.035} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionTitle
            light
            subtitle="Institutional Benchmarks"
            title="Why Choose Shri Haridutt Ayurvedic Medical College?"
            description="Built upon a heritage of discipline, academic rigor, and compassionate medicine, we provide our scholars with verified clinical infrastructure that sets them apart in modern healthcare."
          />
        </ScrollReveal>

        {/* Staggered 6 Stats Grid with Animated Counters */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={idx}>
                <div className="bg-[#0F2821]/80 rounded-lg border border-[#C5A46D]/30 p-8 hover:border-[#C5A46D] hover:scale-[1.02] transition-all duration-300 shadow-luxury group flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-[#173D32] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D] group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs uppercase font-serif tracking-widest text-[#81917A]">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Animated Number Counter */}
                    <div className="font-serif text-4xl sm:text-5xl font-bold gold-gradient-text tracking-tight mb-2">
                      <AnimatedCounter value={s.value} duration={2} />
                    </div>

                    {/* Label */}
                    <h4 className="text-base font-semibold text-white group-hover:text-[#C5A46D] transition-colors mb-2">
                      {s.label}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-[#F6F2E9]/70 leading-relaxed font-light">
                      {s.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#C5A46D]/15 flex items-center justify-between text-[11px] text-[#C5A46D]/80">
                    <span>Verified Institutional Record</span>
                    <span>✓</span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
