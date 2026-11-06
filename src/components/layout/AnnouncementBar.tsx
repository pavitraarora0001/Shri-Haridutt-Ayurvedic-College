'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, Phone, Sparkles, User, GraduationCap } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#0B1E19] text-[#F6F2E9] text-xs border-b border-[#C5A46D]/20 py-1.5 px-3 sm:px-6 lg:px-8 transition-all duration-300 select-none">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
        {/* Left: Sanskrit Motto & Live Announcement */}
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 overflow-hidden w-full md:w-auto justify-center md:justify-start">
          {/* Admissions Badge */}
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#C5A46D]/15 text-[#C5A46D] border border-[#C5A46D]/40 tracking-wider uppercase whitespace-nowrap shrink-0">
            <Sparkles className="w-3 h-3 mr-1 text-[#C5A46D] shrink-0" />
            <span>Admissions 2026–27</span>
          </span>

          {/* Sacred Sanskrit Shloka - Shown on wider viewports */}
          <span className="hidden xl:inline-flex items-center text-[#C5A46D]/90 italic font-serif text-[11px] whitespace-nowrap shrink-0 border-l border-[#C5A46D]/30 pl-3">
            सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः
          </span>

          {/* Announcement Ticker with Pulsing Icon */}
          <span className="text-[#F6F2E9]/90 truncate flex items-center text-[11px] font-light min-w-0">
            <Bell className="w-3 h-3 mr-1.5 text-[#C5A46D] shrink-0 inline animate-pulse" />
            <span className="truncate">NEET-UG 2026 AYUSH State &amp; All-India Counseling Registration Active</span>
          </span>
        </div>

        {/* Right: Helplines and Quick Portal Access */}
        <div className="flex items-center justify-center md:justify-end space-x-2 sm:space-x-3 text-xs font-medium shrink-0 whitespace-nowrap">
          <a
            href="tel:+919829044120"
            className="flex items-center text-[#C5A46D] hover:text-white transition-colors whitespace-nowrap shrink-0"
            title="Admissions Helpline"
          >
            <Phone className="w-3.5 h-3.5 mr-1 text-[#C5A46D] shrink-0" />
            <span className="hidden sm:inline text-[#C5A46D]/80 mr-1 text-[11px] font-sans whitespace-nowrap">Admissions:</span>
            <span className="font-mono text-[11px] tracking-tight whitespace-nowrap font-medium">+91 98290 44120</span>
          </a>

          <span className="text-[#C5A46D]/30 shrink-0">•</span>

          <Link
            href="/student/login"
            prefetch={true}
            className="flex items-center text-[#F6F2E9]/85 hover:text-[#C5A46D] transition-colors whitespace-nowrap shrink-0 text-[11px]"
          >
            <GraduationCap className="w-3.5 h-3.5 mr-1 text-[#C5A46D] shrink-0" />
            <span className="whitespace-nowrap">Student Portal</span>
          </Link>

          <span className="text-[#C5A46D]/30 shrink-0">•</span>

          <Link
            href="/faculty-portal/login"
            prefetch={true}
            className="flex items-center text-[#F6F2E9]/85 hover:text-[#C5A46D] transition-colors whitespace-nowrap shrink-0 text-[11px]"
          >
            <User className="w-3.5 h-3.5 mr-1 text-[#C5A46D] shrink-0" />
            <span className="whitespace-nowrap">Faculty Login</span>
          </Link>

          <span className="text-[#C5A46D]/30 shrink-0">•</span>

          <Link
            href="/admin/login"
            prefetch={true}
            className="text-[#C5A46D]/75 hover:text-[#C5A46D] transition-colors font-semibold uppercase text-[10px] tracking-wider whitespace-nowrap shrink-0 px-1 py-0.5 rounded hover:bg-[#C5A46D]/10"
          >
            CMS
          </Link>
        </div>
      </div>
    </div>
  );
}
