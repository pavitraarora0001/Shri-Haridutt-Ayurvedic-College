'use client';

import React from 'react';
import Link from 'next/link';
import { INSTITUTION_INFO } from '@/lib/data';
import SectionTitle from '@/components/common/SectionTitle';
import { MapPin, Phone, Mail, Clock, ShieldAlert, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { BotanicalSprig } from '@/components/motion/BotanicalGraphics';

export default function ContactStrip() {
  return (
    <section className="py-24 bg-[#F6F2E9] relative border-t border-[#C5A46D]/20 overflow-hidden">
      {/* Decorative Botanical Leaf in Corner */}
      <div className="absolute -top-12 -right-12 pointer-events-none opacity-25">
        <BotanicalSprig className="w-52 h-52 rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionTitle
            subtitle="Connect With Us"
            title="Campus Visit & Contact Directorate"
            description="We welcome prospective scholars, parents, researchers, and patients to visit our serene campus and 100-bedded hospital."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details (5 Cols) */}
          <ScrollReveal direction="left" className="lg:col-span-5 bg-[#173D32] text-white p-8 rounded-lg border-2 border-[#C5A46D]/50 shadow-luxury flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                Institutional Headquarters
              </span>
              <h3 className="font-serif text-2xl font-bold mt-1 text-white">
                {INSTITUTION_INFO.shortName} Campus & Hospital
              </h3>

              <div className="mt-6 space-y-4 text-xs text-[#F6F2E9]/90">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-serif">Campus Address:</strong>
                    <span>{INSTITUTION_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-serif">Helplines:</strong>
                    <span>Admissions: {INSTITUTION_INFO.admissionsHelpline}</span>
                    <span className="block mt-0.5 text-[#81917A]">General EPABX: {INSTITUTION_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <ShieldAlert className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-serif">Hospital 24x7 Emergency:</strong>
                    <span className="text-[#DFCA9E] font-medium">{INSTITUTION_INFO.hospitalEmergency}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-serif">Electronic Mail:</strong>
                    <span>Admissions: {INSTITUTION_INFO.email}</span>
                    <span className="block text-[#81917A]">Administration: {INSTITUTION_INFO.infoEmail}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-serif">Office Timings:</strong>
                    <span>Monday to Saturday: 9:00 AM – 5:00 PM (Hospital OPD: 8:00 AM – 2:00 PM)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#C5A46D]/30 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="w-full text-center py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#173D32] bg-gradient-to-r from-[#DFCA9E] to-[#C5A46D] rounded shadow hover:shadow-gold active:scale-[0.98] transition-all"
              >
                Detailed Contact Directory →
              </Link>
            </div>
          </ScrollReveal>

          {/* Interactive Map & Route Visualizer (7 Cols) */}
          <ScrollReveal direction="right" className="lg:col-span-7 bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#173D32]">
                    How to Reach Our Campus
                  </h4>
                  <p className="text-xs text-[#342B25]/70">
                    Located on NH-11B corridor with direct connectivity to Jaipur, Bharatpur and Kota.
                  </p>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-[#173D32] text-[#C5A46D]">
                  Rajasthan, India
                </span>
              </div>

              {/* Embedded Interactive Map Frame */}
              <div className="w-full h-80 rounded border border-[#C5A46D]/30 overflow-hidden relative shadow-inner">
                <iframe
                  title="Shri Haridutt Ayurvedic College Location"
                  src="https://maps.google.com/maps?q=Karauli,Rajasthan,India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs">
                <div className="p-2.5 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                  <span className="font-semibold text-[#173D32] block">By Railway:</span>
                  <span className="text-[#342B25]/75 text-[11px]">Gangapur City Junction (32 km) / Hindaun City (28 km)</span>
                </div>
                <div className="p-2.5 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                  <span className="font-semibold text-[#173D32] block">By Air:</span>
                  <span className="text-[#342B25]/75 text-[11px]">Jaipur International Airport (JAI) — 150 km via NH-21</span>
                </div>
                <div className="p-2.5 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                  <span className="font-semibold text-[#173D32] block">By Road:</span>
                  <span className="text-[#342B25]/75 text-[11px]">Direct state transport buses on NH-11B highway</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#C5A46D]/20 flex items-center justify-between text-xs">
              <span className="text-[#81917A]">Plan an in-person campus visit with our admissions team.</span>
              <Link href="/contact" className="font-semibold text-[#173D32] hover:text-[#C5A46D] flex items-center group">
                <span>Send Direct Message</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
