'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { INSTITUTION_INFO } from '@/lib/data';

export default function CompactAbout() {
  return (
    <section className="bg-[#F6F2E9] py-12 md:py-16 border-b border-[#C5A46D]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#C5A46D] uppercase tracking-widest">
              <Award className="w-4 h-4 text-[#C5A46D]" />
              <span>Institutional Profile &amp; Heritage</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#173D32] leading-tight">
              Rooted in Vedic Tradition, Dedicated to Compassionate Medicine
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-[#342B25]/85 leading-relaxed font-light">
              <p>
                <strong>Shri Haridutt Ayurvedic Medical College &amp; Hospital</strong> is an esteemed institution of higher learning affiliated to Dr. S.R. Rajasthan Ayurved University, Jodhpur, and approved by the National Commission for Indian System of Medicine (NCISM), Ministry of AYUSH, Government of India.
              </p>
              <p>
                Our 15-acre heritage campus unites classical Sanskrit pedagogy with modern diagnostic medical sciences. With an attached 100-bed hospital, 14 academic departments, advanced analytical laboratories, and the 5-acre Charak Vatika medicinal garden, we train competent Vaidyas equipped to serve society with clinical excellence.
              </p>
            </div>

            {/* Key Institutional Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#173D32] shrink-0" />
                <span className="font-medium text-[#342B25]">100 BAMS Seats</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#173D32] shrink-0" />
                <span className="font-medium text-[#342B25]">100-Bed Hospital</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#173D32] shrink-0" />
                <span className="font-medium text-[#342B25]">350+ Herb Species</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                prefetch={true}
                href="/about"
                className="inline-flex items-center text-xs sm:text-sm font-semibold text-[#173D32] hover:text-[#C5A46D] transition-colors group"
              >
                <span>Read More About Our Leadership &amp; History</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: One Supporting Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border-2 border-[#C5A46D]/40 shadow-luxury aspect-[4/3] w-full">
              <Image
                src="/images/ayurveda/ancient-heritage/heritage-wooden-archway.webp"
                alt="Shri Haridutt Ayurvedic Medical College Campus Heritage"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2821]/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-widest block">
                  Heritage Campus
                </span>
                <p className="text-xs font-serif font-semibold text-[#F6F2E9]">
                  Shri Haridutt Ayurvedic Medical College &amp; Hospital
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
