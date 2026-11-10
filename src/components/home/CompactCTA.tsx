import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, FileText } from 'lucide-react';
import { getInstitutionalSettings } from '@/lib/settings';

export default async function CompactCTA() {
  const settings = await getInstitutionalSettings();

  return (
    <section className="bg-gradient-to-r from-[#0F2821] via-[#173D32] to-[#0F2821] text-white py-12 md:py-14 border-t-2 border-[#C5A46D]/30 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#C5A46D]/20 text-[#DFCA9E] text-xs font-semibold uppercase tracking-wider border border-[#C5A46D]/30">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
          <span>NEET-UG Admissions 2026–27 Active</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
          Begin Your Sacred Journey in Ayurvedic Medicine
        </h2>

        <p className="text-xs sm:text-sm text-[#F6F2E9]/80 max-w-2xl mx-auto font-light leading-relaxed">
          Join our 100-seat B.A.M.S. medical fraternity under Dr. S.R. Rajasthan Ayurved University. Experience authentic classical Samhita wisdom backed by extensive clinical hospital training.
        </p>

        {/* Primary Clear CTA */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            prefetch={true}
            href="/admissions/apply"
            className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-md bg-[#C5A46D] text-[#173D32] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-gold hover:bg-[#DFCA9E] transition-all duration-200"
          >
            <span>Apply for Admissions 2026</span>
            <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
          </Link>

          <a
            href="/api/download?file=/documents/misc/institutional-prospectus-information-brochure-2026-27.pdf&name=Institutional-Prospectus-2026-27"
            download="Institutional-Prospectus-2026-27.pdf"
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 sm:py-3 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm uppercase tracking-wider border border-white/20 transition-all duration-200"
          >
            <FileText className="w-4 h-4 mr-2 text-[#C5A46D] shrink-0" />
            <span>Download Prospectus</span>
          </a>
        </div>

        {/* Admissions Contact Footer Note */}
        <p className="text-[10.5px] sm:text-[11px] text-[#81917A] pt-2 break-words">
          Admissions Helpline: <span className="text-[#DFCA9E] font-medium">{settings.admissionsHelpline}</span> · Email: <span className="text-[#DFCA9E] font-medium">{settings.contactEmail}</span>
        </p>
      </div>
    </section>
  );
}
