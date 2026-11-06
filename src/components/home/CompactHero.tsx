'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Sparkles, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { INSTITUTION_INFO } from '@/lib/data';

export default function CompactHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[440px] sm:min-h-[480px] lg:h-[520px] py-10 sm:py-14 flex items-center justify-center overflow-hidden bg-[#0F2821] text-white w-full">
      {/* Background Cinematic Visual */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/ayurveda/backgrounds/hero-botanical-garden.webp')`,
        }}
        initial={{ scale: 1.03 }}
        animate={shouldReduceMotion ? { scale: 1.03 } : { scale: 1.08 }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        {/* Layered Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2821]/95 via-[#173D32]/85 to-[#0F2821]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2821] via-transparent to-black/30" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3.5 sm:space-y-5 w-full">
        {/* Sanskrit Motto Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C5A46D]/15 border border-[#C5A46D]/40 text-[#DFCA9E] text-[11px] sm:text-xs font-serif tracking-widest uppercase">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C5A46D]" />
          <span>{INSTITUTION_INFO.sanskritMotto}</span>
        </div>

        {/* Responsive Heading */}
        <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-[44px] font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-sm">
          Where Ancient Ayurvedic Wisdom Meets Modern Healthcare
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-[#F6F2E9]/85 max-w-2xl mx-auto font-light leading-relaxed">
          Affiliated to Dr. S.R. Rajasthan Ayurved University, Jodhpur · NCISM Approved B.A.M.S. (100 Seats) with 100-Bed Clinical Teaching Hospital &amp; 5-Acre Charak Vatika Herbarium.
        </p>

        {/* Two Primary CTAs */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            prefetch={true}
            href="/courses/bams"
            className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 rounded bg-[#C5A46D] text-[#173D32] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-gold hover:bg-[#DFCA9E] transition-all duration-200"
          >
            <BookOpen className="w-4 h-4 mr-1.5 sm:mr-2" />
            <span>Explore Courses</span>
          </Link>

          <Link
            prefetch={true}
            href="/admissions/apply"
            className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 rounded bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider border border-white/25 backdrop-blur-sm transition-all duration-200"
          >
            <span>Admission Enquiry</span>
            <ArrowRight className="w-4 h-4 ml-1.5 sm:ml-2" />
          </Link>
        </div>

        {/* Regulatory Badges (Responsive Wrap on Mobile) */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] sm:text-[11px] text-[#DFCA9E]/85">
          <span className="flex items-center whitespace-nowrap">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#C5A46D]" />
            NCISM Recognised
          </span>
          <span className="hidden xs:inline">•</span>
          <span className="flex items-center whitespace-nowrap">
            <HeartHandshake className="w-3.5 h-3.5 mr-1 text-[#C5A46D]" />
            100-Bed Teaching Hospital
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="whitespace-nowrap">NEET-UG Code: Rajasthan AYUSH</span>
        </div>
      </div>
    </section>
  );
}
