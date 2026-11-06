'use client';

import React from 'react';
import Link from 'next/link';
import { LEADERSHIP } from '@/lib/data';
import SectionTitle from '@/components/common/SectionTitle';
import { ArrowRight, Mail, GraduationCap, Award } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion/ScrollReveal';

export default function FacultyHighlights() {
  return (
    <section className="py-24 bg-white relative border-t border-[#C5A46D]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionTitle
            subtitle="Scholarly Mentorship"
            title="Distinguished Faculty & Academic Leadership"
            description="Guided by revered Vaidyas, seasoned clinicians, and Sanskrit scholars dedicated to preserving the purest oral and practical traditions of Ayurveda."
          />
        </ScrollReveal>

        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {LEADERSHIP.map((faculty) => (
            <StaggerItem key={faculty.id} className="h-full">
              <div
                className="bg-[#F6F2E9] rounded-lg border border-[#C5A46D]/30 overflow-hidden shadow-card hover:shadow-luxury hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Faculty Photo */}
                  <div className="relative h-64 overflow-hidden bg-[#173D32]">
                    <img
                      src={faculty.image}
                      alt={faculty.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2821]/85 via-transparent to-transparent" />
                    
                    {/* Experience Badge */}
                    <div className="absolute top-3 right-3 bg-[#173D32]/90 border border-[#C5A46D]/50 text-[#C5A46D] px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider shadow-sm">
                      {faculty.experienceYears}+ Yrs Exp
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <p className="text-[11px] text-[#C5A46D] font-medium uppercase tracking-wider">
                        {faculty.designation}
                      </p>
                    </div>
                  </div>

                  {/* Faculty Details */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-xl font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors leading-snug">
                      {faculty.name}
                    </h3>

                    <div className="text-xs text-[#342B25]/85 flex items-start space-x-1.5">
                      <GraduationCap className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                      <span className="font-medium">{faculty.qualification}</span>
                    </div>

                    <div className="text-xs text-[#342B25]/80 flex items-start space-x-1.5">
                      <Award className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                      <span>Specialization: {faculty.specialization}</span>
                    </div>

                    <p className="text-xs text-[#342B25]/75 line-clamp-3 leading-relaxed pt-2 border-t border-[#C5A46D]/20 font-light">
                      {faculty.bio}
                    </p>
                  </div>
                </div>

                {/* Action Link */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/faculty/${faculty.id}`}
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded bg-white hover:bg-[#173D32] text-[#173D32] hover:text-white border border-[#C5A46D]/40 hover:border-[#173D32] transition-all duration-300 shadow-sm group/btn"
                  >
                    <span>View Full Academic Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-[#C5A46D] transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.2} className="mt-12 text-center">
          <Link
            href="/faculty"
            className="inline-flex items-center text-xs uppercase tracking-wider font-semibold text-[#173D32] hover:text-[#C5A46D] transition-colors group"
          >
            <span>Browse Complete Faculty Directory (48+ Members)</span>
            <ArrowRight className="w-4 h-4 ml-1.5 text-[#C5A46D] transform group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
