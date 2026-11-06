'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, ChevronDown, ShieldCheck, HeartPulse } from 'lucide-react';
import { INSTITUTION_INFO } from '@/lib/data';
import { FloatingLeaf, BotanicalSprig } from '@/components/motion/BotanicalGraphics';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0F2821]">
      {/* Background Cinematic Image with Slow Zoom & Pan Animation */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/ayurveda/backgrounds/hero-botanical-garden.webp')`,
        }}
        initial={{ scale: 1.05 }}
        animate={shouldReduceMotion ? { scale: 1.05 } : { scale: 1.14 }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        {/* Layered Gradient Overlays for Readability & Vedic Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2821]/95 via-[#173D32]/85 to-[#0F2821]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#0F2821]/40 to-[#0F2821]" />
      </motion.div>

      {/* Subtle Botanical / Yantra Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C5A46D_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Floating Organic Botanical Leaves */}
      <FloatingLeaf className="top-24 left-8 text-[#C5A46D] opacity-40 hidden md:block" size={44} duration={7} delay={0.5} />
      <FloatingLeaf className="top-1/3 right-12 text-[#C5A46D] opacity-35 hidden md:block" size={36} duration={8} delay={1.5} />
      <FloatingLeaf className="bottom-28 left-16 text-[#C5A46D] opacity-30 hidden lg:block" size={40} duration={6.5} delay={2} />
      <BotanicalSprig className="absolute bottom-6 right-6 opacity-25 hidden xl:block" width={140} height={90} />

      {/* Hero Content Container */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Admissions Notification Pill */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#173D32]/90 border border-[#C5A46D]/60 text-[#C5A46D] text-xs font-semibold tracking-wider uppercase shadow-gold mb-6 backdrop-blur-md hover:border-[#C5A46D] transition-colors">
            <Sparkles className="w-4 h-4 text-[#C5A46D] animate-pulse" />
            <span>NEET-UG 2026 Admissions Open • 100 Approved BAMS Seats</span>
          </div>
        </motion.div>

        {/* Sanskrit Inscription */}
        <motion.p
          variants={itemVariants}
          className="font-devanagari text-sm sm:text-base text-[#C5A46D]/90 tracking-widest uppercase mb-3"
        >
          ॥ श्रीहरिदत्त आयुर्वेद महाविद्यालय एवं चिकित्सालय ॥
        </motion.p>

        {/* Cinematic Headline with Smooth Upward Reveal */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.15] max-w-4xl"
        >
          Where <span className="gold-gradient-text italic font-normal">Ancient Wisdom</span> Meets Modern Healthcare.
        </motion.h1>

        {/* Supporting Editorial Paragraph */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-base sm:text-xl text-[#F6F2E9]/85 max-w-2xl font-light leading-relaxed"
        >
          {INSTITUTION_INFO.subTagline}
        </motion.p>

        {/* Action Buttons with Micro-interactions */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/academics/programmes"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-xs sm:text-sm uppercase tracking-wider font-semibold text-[#173D32] bg-gradient-to-r from-[#DFCA9E] via-[#C5A46D] to-[#9A7E4F] rounded shadow-gold hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border border-[#DFCA9E] overflow-hidden"
          >
            {/* Subtle Gold Shimmer Sweep */}
            <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] transform -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
            <BookOpen className="w-4 h-4 mr-2" />
            <span>Explore Academic Programmes</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-xs sm:text-sm uppercase tracking-wider font-medium text-[#F6F2E9] bg-[#173D32]/60 hover:bg-[#173D32] rounded border border-[#C5A46D]/40 hover:border-[#C5A46D] transition-all duration-300 backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Discover Our Institution</span>
          </Link>
        </motion.div>

        {/* Trust Badges Strip with Subtle Hover Animation */}
        <motion.div
          variants={itemVariants}
          className="mt-14 pt-8 border-t border-[#C5A46D]/20 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-4xl text-left"
        >
          <div className="flex items-center space-x-3 group cursor-default">
            <div className="w-10 h-10 rounded-full bg-[#173D32] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D] shrink-0 group-hover:border-[#C5A46D] group-hover:scale-105 transition-all">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-serif font-bold text-lg sm:text-xl leading-none">NCISM</p>
              <p className="text-[11px] text-[#81917A] mt-1">Govt. of India Approved</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 group cursor-default">
            <div className="w-10 h-10 rounded-full bg-[#173D32] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D] shrink-0 group-hover:border-[#C5A46D] group-hover:scale-105 transition-all">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-serif font-bold text-lg sm:text-xl leading-none">100 Beds</p>
              <p className="text-[11px] text-[#81917A] mt-1">Ayurvedic Hospital</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 group cursor-default">
            <div className="w-10 h-10 rounded-full bg-[#173D32] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D] shrink-0 group-hover:border-[#C5A46D] group-hover:scale-105 transition-all">
              <span className="font-serif font-bold text-sm text-[#C5A46D]">🌿</span>
            </div>
            <div>
              <p className="text-white font-serif font-bold text-lg sm:text-xl leading-none">350+ Herbs</p>
              <p className="text-[11px] text-[#81917A] mt-1">Charak Vatika Garden</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 group cursor-default">
            <div className="w-10 h-10 rounded-full bg-[#173D32] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D] shrink-0 group-hover:border-[#C5A46D] group-hover:scale-105 transition-all">
              <span className="font-serif font-bold text-sm text-[#C5A46D]">18+</span>
            </div>
            <div>
              <p className="text-white font-serif font-bold text-lg sm:text-xl leading-none">18+ Years</p>
              <p className="text-[11px] text-[#81917A] mt-1">Institutional Heritage</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-[#C5A46D]/70 flex flex-col items-center text-[10px] tracking-widest uppercase cursor-pointer"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="mb-1">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
