'use client';

import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, BookOpen, Users, HeartPulse, 
  FileCheck, Bell, ChevronRight 
} from 'lucide-react';

const SHORTCUTS = [
  {
    title: 'Admissions 2026',
    subtitle: 'NEET-UG & State Quotas',
    href: '/admissions/apply',
    icon: GraduationCap,
  },
  {
    title: 'Degree Courses',
    subtitle: 'BAMS & Post-Graduate',
    href: '/courses/bams',
    icon: BookOpen,
  },
  {
    title: 'Faculty Cadre',
    subtitle: 'Experienced Vaidyas',
    href: '/faculty',
    icon: Users,
  },
  {
    title: '100-Bed Hospital',
    subtitle: '8 Specialty OPDs',
    href: '/hospital',
    icon: HeartPulse,
  },
  {
    title: 'Mandatory Disclosure',
    subtitle: 'NCISM MSR Compliance',
    href: '/mandatory-disclosures',
    icon: FileCheck,
  },
  {
    title: 'Notices & Circulars',
    subtitle: 'Datesheets & Exams',
    href: '/examination',
    icon: Bell,
  },
];

export default function QuickAccess() {
  return (
    <section className="bg-[#FAF7F0] border-b border-[#C5A46D]/25 py-5 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SHORTCUTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                prefetch={true}
                href={item.href}
                className="group bg-white rounded-lg p-3.5 sm:p-4 border border-[#C5A46D]/30 shadow-sm hover:shadow-md hover:border-[#C5A46D] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-md bg-[#173D32]/10 group-hover:bg-[#173D32] flex items-center justify-center transition-colors">
                    <Icon className="w-4 h-4 text-[#173D32] group-hover:text-[#C5A46D] transition-colors" />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#81917A] opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div>
                  <h3 className="font-serif text-xs sm:text-sm font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-[#81917A] mt-0.5 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
