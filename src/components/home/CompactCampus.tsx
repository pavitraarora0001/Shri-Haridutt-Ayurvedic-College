'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, ArrowRight } from 'lucide-react';

const FACILITIES = [
  {
    title: 'Charak Vatika Herbarium',
    subtitle: '5-Acre Botanical Garden with 350+ medicinal species',
    image: '/images/ayurveda/botanical-gardens/charak-vatika-botanical.webp',
    href: '/infrastructure/herbal-garden',
  },
  {
    title: 'Rasa Shastra Pharmacy',
    subtitle: 'Pilot drug manufacturing, pulverizers & quality units',
    image: '/images/ayurveda/medicine-preparation/ayurvedic-medicine-roots-herbs.webp',
    href: '/departments/RASA-SHASTRA',
  },
  {
    title: 'Anatomy Dissection Hall',
    subtitle: 'Sharir Rachana cadaveric museum & osteology lab',
    image: '/images/ayurveda/research/botanical-herbarium-specimen.webp',
    href: '/departments/RACHANA',
  },
  {
    title: 'Central Classical Library',
    subtitle: 'Ancient Sanskrit manuscripts, Samhitas & e-journals',
    image: '/images/ayurveda/manuscripts/classical-ayurvedic-scroll.webp',
    href: '/infrastructure/library',
  },
];

export default function CompactCampus() {
  return (
    <section className="bg-white py-12 md:py-16 border-b border-[#C5A46D]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#C5A46D]/20 pb-4">
          <div>
            <span className="text-[#C5A46D] text-xs font-bold uppercase tracking-widest block mb-1">
              Campus Infrastructure
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32]">
              Academic &amp; Clinical Facilities
            </h2>
          </div>
          <Link
            prefetch={true}
            href="/gallery"
            className="inline-flex items-center text-xs font-semibold text-[#173D32] hover:text-[#C5A46D] transition-colors group self-start md:self-auto"
          >
            <span>View Campus Gallery</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Item Compact Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FACILITIES.map((fac, idx) => (
            <Link
              key={idx}
              prefetch={true}
              href={fac.href}
              className="group relative rounded-xl overflow-hidden border border-[#C5A46D]/30 shadow-card hover:shadow-luxury hover:border-[#C5A46D] transition-all duration-300 block"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={fac.image}
                  alt={fac.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2821]/90 via-[#0F2821]/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif text-sm font-bold text-white group-hover:text-[#C5A46D] transition-colors leading-snug">
                    {fac.title}
                  </h3>
                  <p className="text-[11px] text-[#F6F2E9]/75 mt-0.5 line-clamp-1 font-light">
                    {fac.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
