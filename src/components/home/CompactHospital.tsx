'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeartPulse, ArrowRight, Activity, ShieldCheck, Stethoscope } from 'lucide-react';

const SERVICES = [
  { name: 'Kayachikitsa', desc: 'Internal medicine & chronic metabolic disorders' },
  { name: 'Panchakarma Sanctum', desc: 'Authentic 5 bio-purification detox therapies' },
  { name: 'Shalya Tantra', desc: 'Ayurvedic surgery & Kshara Sutra anorectal care' },
  { name: 'Shalakya Tantra', desc: 'Ophthalmology & ENT Netra/Karna therapies' },
  { name: 'Prasuti & Stri Roga', desc: 'Maternal health, Garbha Sanskar & gynecology' },
  { name: 'Kaumarbhritya', desc: 'Pediatric Ayurveda & Swarna Prashana drops' },
];

export default function CompactHospital() {
  return (
    <section className="bg-[#FAF7F0] py-12 md:py-16 border-b border-[#C5A46D]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Image */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-xl overflow-hidden border-2 border-[#C5A46D]/40 shadow-luxury aspect-[4/3] w-full">
              <Image
                src="/images/ayurveda/panchakarma/shirodhara-authentic-treatment.webp"
                alt="Panchakarma Shirodhara Therapy Suite"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2821]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-widest block">
                  Clinical Healing Sanctum
                </span>
                <p className="text-xs font-serif font-semibold text-[#F6F2E9]">
                  Teaching Hospital &amp; Panchakarma Centre
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hospital Content & Grid */}
          <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#C5A46D] uppercase tracking-widest mb-1">
                <HeartPulse className="w-4 h-4 text-[#C5A46D]" />
                <span>Teaching Hospital &amp; Clinical Services</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32]">
                100-Bed Attached Ayurvedic Teaching Hospital
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#342B25]/85 leading-relaxed font-light">
              Conforming to NCISM Minimum Standard Requirements (MSR) Regulations, our attached hospital provides compassionate inpatient and outpatient healthcare. The facility features 8 specialty clinical departments, Panchakarma therapy suites, a diagnostic pathology laboratory, and round-the-clock emergency casualty.
            </p>

            {/* Compact Clinical Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {SERVICES.map((srv, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-[#C5A46D]/25 shadow-sm">
                  <h4 className="font-serif text-xs font-bold text-[#173D32]">
                    {srv.name}
                  </h4>
                  <p className="text-[11px] text-[#81917A] mt-0.5 leading-snug">
                    {srv.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                prefetch={true}
                href="/hospital"
                className="inline-flex items-center text-xs sm:text-sm font-semibold text-[#173D32] hover:text-[#C5A46D] transition-colors group"
              >
                <span>Explore Hospital Facilities &amp; OPD Timings</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
