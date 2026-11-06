import React from 'react';
import dynamic from 'next/dynamic';
import CompactHero from '@/components/home/CompactHero';
import QuickAccess from '@/components/home/QuickAccess';
import CompactAbout from '@/components/home/CompactAbout';
import CompactCourses from '@/components/home/CompactCourses';

// Code-split below-the-fold compact sections for high Core Web Vitals & FCP performance
const CompactHospital = dynamic(() => import('@/components/home/CompactHospital'), { ssr: true });
const CompactCampus = dynamic(() => import('@/components/home/CompactCampus'), { ssr: true });
const CompactNewsNotices = dynamic(() => import('@/components/home/CompactNewsNotices'), { ssr: true });
const CompactCTA = dynamic(() => import('@/components/home/CompactCTA'), { ssr: true });

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#F6F2E9]">
      {/* SECTION 2 — Compact Hero Banner (480–520px) */}
      <CompactHero />

      {/* SECTION 3 — Quick Access (6 Compact Shortcuts) */}
      <QuickAccess />

      {/* SECTION 4 — About the College (2 Concise Paragraphs & 1 Image) */}
      <CompactAbout />

      {/* SECTION 5 — Courses (Verified Compact Cards) */}
      <CompactCourses />

      {/* SECTION 6 — Hospital & Clinical Services (Verified Services Grid) */}
      <CompactHospital />

      {/* SECTION 7 — Campus & Facilities (Compact 4-Item Grid) */}
      <CompactCampus />

      {/* SECTION 8 — Notifications & News (Compact 2-Column Desktop Layout) */}
      <CompactNewsNotices />

      {/* SECTION 9 — Final Call to Action (Compact Admissions Banner) */}
      <CompactCTA />
    </div>
  );
}
