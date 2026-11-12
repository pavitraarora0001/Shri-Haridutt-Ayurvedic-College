import React from 'react';
import nextDynamic from 'next/dynamic';
import CompactHero from '@/components/home/CompactHero';
import QuickAccess from '@/components/home/QuickAccess';
import CompactAbout from '@/components/home/CompactAbout';
import CompactCourses from '@/components/home/CompactCourses';
import CompactNewsNotices from '@/components/home/CompactNewsNotices';
import CompactCTA from '@/components/home/CompactCTA';

// Code-split below-the-fold static sections
const CompactHospital = nextDynamic(() => import('@/components/home/CompactHospital'), { ssr: true });
const CompactCampus = nextDynamic(() => import('@/components/home/CompactCampus'), { ssr: true });
const CompactHomeGallery = nextDynamic(() => import('@/components/home/CompactHomeGallery'), { ssr: true });

export const dynamic = 'force-dynamic';

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

      {/* SECTION 7.5 — Separate Campus Multimedia Gallery (Photos & Videos from shddcbpr.org) */}
      <CompactHomeGallery />

      {/* SECTION 8 — Notifications & News (Compact 2-Column Desktop Layout) */}
      <CompactNewsNotices />

      {/* SECTION 9 — Final Call to Action (Compact Admissions Banner) */}
      <CompactCTA />
    </div>
  );
}
