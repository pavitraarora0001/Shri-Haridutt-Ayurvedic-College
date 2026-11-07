'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, Phone, Sparkles, User, GraduationCap } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#0B1E19] text-[#F6F2E9] text-xs border-b border-[#C5A46D]/20 py-1.5 transition-all duration-300 select-none overflow-hidden w-full">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-6 2xl:px-8 flex items-center justify-between gap-2 sm:gap-3">
        {/* Left: Admissions Badge, Sacred Shloka & Live Announcement Ticker */}
        <div className="flex items-center space-x-2 min-w-0 overflow-hidden flex-1">
          {/* Admissions Badge */}
          <Link
            href="/admissions/apply"
            prefetch={true}
            className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-[9.5px] sm:text-[10px] font-semibold bg-[#C5A46D]/20 text-[#DFCA9E] border border-[#C5A46D]/50 tracking-wide uppercase whitespace-nowrap shrink-0 hover:bg-[#C5A46D]/30 transition-colors"
          >
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 text-[#DFCA9E] shrink-0" />
            <span className="hidden sm:inline">Admissions 2026</span>
            <span className="sm:hidden">2026</span>
          </Link>

          {/* Sacred Sanskrit Shloka - Shown on wider viewports */}
          <span className="hidden xl:inline-flex items-center text-[#DFCA9E] font-devanagari not-italic text-xs font-normal whitespace-nowrap shrink-0 border-l border-r border-[#C5A46D]/30 px-3 mx-1">
            सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः
          </span>

          {/* Announcement Ticker with Pulsing Icon */}
          <div className="text-[#F6F2E9] truncate flex items-center text-[10.5px] sm:text-[11px] font-normal min-w-0 pl-0.5">
            <Bell className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 text-[#C5A46D] shrink-0 inline animate-pulse" />
            <span className="truncate">NEET-UG 2026 AYUSH State &amp; All-India Counseling Active</span>
          </div>
        </div>

        {/* Right: Helplines and Quick Portal Access (Responsive on Mobile) */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5 text-xs font-medium shrink-0 whitespace-nowrap">
          <a
            href="tel:+919829044120"
            className="flex items-center text-[#DFCA9E] hover:text-white transition-colors whitespace-nowrap shrink-0"
            title="Admissions Helpline"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 text-[#C5A46D] shrink-0" />
            <span className="hidden sm:inline text-[#C5A46D]/90 mr-1 text-[11px] font-sans whitespace-nowrap">Admissions:</span>
            <span className="font-sans text-[10.5px] sm:text-[11px] tracking-normal whitespace-nowrap font-semibold text-white">+91 98290 44120</span>
          </a>

          <span className="hidden md:inline text-[#C5A46D]/40 shrink-0">•</span>

          <Link
            href="/student/login"
            prefetch={true}
            className="hidden md:flex items-center text-[#F6F2E9]/90 hover:text-[#DFCA9E] transition-colors whitespace-nowrap shrink-0 text-[11px]"
          >
            <GraduationCap className="w-3.5 h-3.5 mr-1 text-[#C5A46D] shrink-0" />
            <span className="whitespace-nowrap font-medium">Student Portal</span>
          </Link>

          <span className="hidden lg:inline text-[#C5A46D]/40 shrink-0">•</span>

          <Link
            href="/faculty-portal/login"
            prefetch={true}
            className="hidden lg:flex items-center text-[#F6F2E9]/90 hover:text-[#DFCA9E] transition-colors whitespace-nowrap shrink-0 text-[11px]"
          >
            <User className="w-3.5 h-3.5 mr-1 text-[#C5A46D] shrink-0" />
            <span className="whitespace-nowrap font-medium">Faculty Login</span>
          </Link>

          <span className="hidden sm:inline text-[#C5A46D]/40 shrink-0">•</span>

          <Link
            href="/admin/login"
            prefetch={true}
            className="hidden sm:inline-flex text-[#DFCA9E] hover:text-white hover:bg-[#C5A46D]/20 transition-colors font-semibold uppercase text-[9.5px] sm:text-[10px] tracking-wider whitespace-nowrap shrink-0 px-1.5 py-0.5 rounded border border-[#C5A46D]/30"
          >
            CMS
          </Link>
        </div>
      </div>
    </div>
  );
}
