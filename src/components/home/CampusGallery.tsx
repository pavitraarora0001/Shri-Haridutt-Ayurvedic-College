'use client';

import React from 'react';
import Link from 'next/link';
import { FACILITIES } from '@/lib/data';
import SectionTitle from '@/components/common/SectionTitle';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion/ScrollReveal';
import { BotanicalSprig } from '@/components/motion/BotanicalGraphics';

export default function CampusGallery() {
  return (
    <section className="py-24 bg-[#F6F2E9] relative overflow-hidden">
      {/* Background Subtle Watermark Decoration */}
      <div className="absolute -top-16 -right-16 pointer-events-none opacity-40">
        <BotanicalSprig className="w-56 h-56 rotate-45" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionTitle
            subtitle="World-Class Environment"
            title="Campus Infrastructure & Clinical Facilities"
            description="Spanning acres of lush herbal landscaping, traditional Rajasthani architectural arches, and modern clinical diagnostic suites."
          />
        </ScrollReveal>

        {/* Editorial Grid */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {FACILITIES.map((facility) => (
            <StaggerItem key={facility.id} className="h-full">
              <div
                className="group bg-white rounded-lg border border-[#C5A46D]/30 overflow-hidden shadow-card hover:shadow-luxury hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={facility.imageUrl}
                      alt={facility.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#173D32]/90 via-[#173D32]/20 to-transparent" />
                    
                    <div className="absolute top-4 left-4 bg-[#173D32]/90 border border-[#C5A46D]/40 text-[#C5A46D] px-2.5 py-0.5 rounded text-[11px] font-medium tracking-wide uppercase shadow-sm">
                      {facility.category}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <p className="text-[11px] text-[#C5A46D] font-medium">{facility.capacity}</p>
                      <h3 className="font-serif text-lg font-bold leading-snug">
                        {facility.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs text-[#342B25]/80 leading-relaxed font-light mb-3">
                      {facility.description}
                    </p>
                    <p className="text-[11px] font-medium text-[#173D32] bg-[#F6F2E9] p-2.5 rounded border border-[#C5A46D]/20">
                      <span className="font-semibold text-[#C5A46D]">Key Highlight: </span>
                      {facility.highlights}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href="/infrastructure"
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#173D32] group-hover:text-[#C5A46D] transition-colors"
                  >
                    <span>Explore Facility Details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#C5A46D] transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.2} className="mt-12 text-center">
          <Link
            href="/infrastructure"
            className="inline-flex items-center justify-center px-8 py-3.5 text-xs uppercase tracking-wider font-semibold text-white bg-[#173D32] hover:bg-[#0F2821] rounded shadow-luxury border border-[#C5A46D]/40 hover:border-[#C5A46D] hover:shadow-gold transition-all duration-300 group"
          >
            <span>View All Campus Infrastructure Details</span>
            <ArrowRight className="w-4 h-4 ml-2 text-[#C5A46D] transform group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
