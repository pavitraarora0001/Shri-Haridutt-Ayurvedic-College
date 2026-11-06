'use client';

import React from 'react';
import { TESTIMONIALS } from '@/lib/data';
import SectionTitle from '@/components/common/SectionTitle';
import { Quote, Star } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion/ScrollReveal';

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white relative border-t border-[#C5A46D]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionTitle
            subtitle="Voices of Experience"
            title="Scholars, Vaidyas & Patient Testimonials"
            description="Reflections on academic rigour, hospital clinical mentorship, and authentic Ayurvedic wellness transformations."
          />
        </ScrollReveal>

        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.id} className="h-full">
              <div
                className="bg-[#F6F2E9] rounded-lg border border-[#C5A46D]/30 p-8 shadow-card flex flex-col justify-between relative group hover:shadow-luxury hover:border-[#C5A46D] hover:-translate-y-1.5 transition-all duration-500 h-full"
              >
                <div>
                  {/* Gold Quote Icon */}
                  <div className="text-[#C5A46D] mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Quote className="w-8 h-8 opacity-60" />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 text-amber-500 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="text-xs sm:text-sm text-[#342B25]/90 italic leading-relaxed font-light mb-6">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#C5A46D]/25 flex items-center space-x-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.authorName}
                    loading="lazy"
                    className="w-11 h-11 rounded-full object-cover border border-[#C5A46D]/60 group-hover:border-[#C5A46D] transition-colors"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors">
                      {t.authorName}
                    </h4>
                    <p className="text-[11px] text-[#81917A] leading-tight mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
