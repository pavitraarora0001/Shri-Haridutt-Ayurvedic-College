'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { VedicMandalaWatermark } from '@/components/motion/BotanicalGraphics';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  crumbs?: { label: string; href?: string }[];
  bgImage?: string;
}

export default function PageHeader({
  title,
  subtitle,
  crumbs = [],
  bgImage = '/images/ayurveda/backgrounds/hero-botanical-garden.webp',
}: PageHeaderProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative bg-[#0F2821] text-white py-16 sm:py-20 overflow-hidden border-b-2 border-[#C5A46D]/40">
      {/* Background with Slow Ambient Movement */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url('${bgImage}')` }}
        initial={{ scale: 1 }}
        animate={prefersReduced ? {} : { scale: 1.06 }}
        transition={{ duration: 18, ease: 'easeOut', repeat: Infinity, repeatType: 'reverse' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2821] via-[#173D32]/85 to-[#0F2821]" />

      {/* Subtle Vedic Mandala Watermark */}
      <div className="absolute -right-20 -bottom-24 pointer-events-none opacity-20">
        <VedicMandalaWatermark className="w-80 h-80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center z-10">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 text-xs text-[#C5A46D] mb-4 uppercase tracking-widest font-medium"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          {crumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-[#C5A46D]/60" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#F6F2E9]">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </motion.nav>

        {/* Subtitle */}
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-block px-3.5 py-1 rounded bg-[#173D32]/90 border border-[#C5A46D]/50 text-[#C5A46D] text-[11px] font-semibold tracking-wider uppercase mb-3 shadow-sm"
        >
          {subtitle}
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight"
        >
          {title}
        </motion.h1>

        {/* Decorative Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center mt-4"
        >
          <div className="w-10 h-[1px] bg-[#C5A46D]/60" />
          <span className="mx-2 text-[#C5A46D] text-xs">✤</span>
          <div className="w-10 h-[1px] bg-[#C5A46D]/60" />
        </motion.div>
      </div>
    </div>
  );
}
