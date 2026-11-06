'use client';

import React from 'react';
import Link from 'next/link';
import { INSTITUTION_INFO } from '@/lib/data';
import SectionTitle from '@/components/common/SectionTitle';
import { ScrollReveal, ClipRevealImage } from '@/components/motion/ScrollReveal';
import { BotanicalSprig, FloatingLeaf } from '@/components/motion/BotanicalGraphics';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function IntroSection() {
  return (
    <section className="py-24 bg-[#F6F2E9] relative overflow-hidden">
      {/* Botanical Background Accents */}
      <BotanicalSprig className="absolute -top-6 -right-6 opacity-30 hidden lg:block" width={180} height={120} />
      <FloatingLeaf className="bottom-12 right-20 text-[#C5A46D] opacity-25 hidden xl:block" size={42} duration={7} delay={1} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Campus Imagery with Clip-Path Reveal */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="left">
              <div className="relative rounded-lg overflow-hidden border-2 border-[#C5A46D]/50 shadow-luxury h-[480px]">
                <ClipRevealImage
                  src="/images/ayurveda/ancient-heritage/vedic-courtyard-colonnade.webp"
                  alt="Shri Haridutt Ayurvedic Medical College Heritage Courtyard"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#173D32]/90 via-transparent to-transparent pointer-events-none" />
                
                {/* Bottom Inscription Box */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-[#0F2821]/80 backdrop-blur-md border border-[#C5A46D]/40">
                  <p className="font-serif text-white text-base font-semibold">
                    A Center of Authentic Ayurvedic Scholarship
                  </p>
                  <p className="text-xs text-[#C5A46D] mt-1">
                    Rooted in Gurukul values, equipped for 21st-century medicine.
                  </p>
                </div>
              </div>

              {/* Floating Heritage Badge */}
              <div className="absolute -top-6 -left-6 bg-[#173D32] border-2 border-[#C5A46D] text-white p-4 rounded-lg shadow-gold hidden sm:flex flex-col items-center justify-center text-center hover:scale-105 transition-transform">
                <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-medium">Established</span>
                <span className="font-serif text-2xl font-bold">{INSTITUTION_INFO.establishedYear}</span>
                <span className="text-[10px] text-[#81917A]">Rajasthan, India</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Institutional Narrative & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="right">
              <SectionTitle
                align="left"
                subtitle="The Institutional Legacy"
                title="Preserving Vedic Medical Wisdom for Global Healthcare"
              />

              <p className="text-sm sm:text-base text-[#342B25]/90 leading-relaxed font-light">
                Founded under the auspicious inspiration of Vedic sages and philanthropic visionaries, 
                <strong> {INSTITUTION_INFO.name}</strong> stands as a benchmark in Indian medical education. 
                Our institution harmoniously bridges thousands of years of classical Ayurveda—represented by the revered Brihat Trayi treatises (Charaka Samhita, Sushruta Samhita, and Ashtanga Hridaya)—with contemporary clinical diagnostics and surgical sciences.
              </p>

              <p className="text-sm sm:text-base text-[#342B25]/90 leading-relaxed font-light">
                With an attached 100-bedded multi-specialty Ayurvedic Hospital, a 5-acre medicinal botanical garden housing over 350 authenticated species, and 14 specialized academic departments, we nurture aspiring Vaidyas to become compassionate, clinically sharp healers.
              </p>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-3 p-3.5 rounded bg-white border border-[#C5A46D]/30 shadow-card hover:border-[#C5A46D] transition-all">
                  <CheckCircle2 className="w-5 h-5 text-[#173D32] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#173D32]">NCISM & AYUSH Compliant</h4>
                    <p className="text-xs text-[#342B25]/70 mt-0.5">Statutory approval adhering to National Commission standards.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 rounded bg-white border border-[#C5A46D]/30 shadow-card hover:border-[#C5A46D] transition-all">
                  <CheckCircle2 className="w-5 h-5 text-[#173D32] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#173D32]">Bedside Clinical Rigour</h4>
                    <p className="text-xs text-[#342B25]/70 mt-0.5">Hands-on patient management in 100-bed hospital & OPD.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 rounded bg-white border border-[#C5A46D]/30 shadow-card hover:border-[#C5A46D] transition-all">
                  <CheckCircle2 className="w-5 h-5 text-[#173D32] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#173D32]">Classical Rasa Pharmacy</h4>
                    <p className="text-xs text-[#342B25]/70 mt-0.5">GMP certified pilot plant for mineral and herbal formulations.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 rounded bg-white border border-[#C5A46D]/30 shadow-card hover:border-[#C5A46D] transition-all">
                  <CheckCircle2 className="w-5 h-5 text-[#173D32] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#173D32]">Scholarly Faculty Body</h4>
                    <p className="text-xs text-[#342B25]/70 mt-0.5">Eminent Professors, Acharyas and registered Vaidyas.</p>
                  </div>
                </div>
              </div>

              {/* CTA Link */}
              <div className="pt-4 flex items-center space-x-4">
                <Link
                  href="/about"
                  className="group inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-wider font-semibold text-white bg-[#173D32] hover:bg-[#0F2821] rounded shadow-luxury transition-all border border-[#C5A46D]/40"
                >
                  <span>Read Full Institutional Legacy</span>
                  <ArrowRight className="w-4 h-4 ml-2 text-[#C5A46D] group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about/principals-message"
                  className="text-xs font-semibold uppercase tracking-wider text-[#173D32] hover:text-[#C5A46D] transition-colors"
                >
                  Principal's Message →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
