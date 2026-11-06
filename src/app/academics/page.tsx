'use client';

import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { 
  BookOpen, Award, Users, GraduationCap, Building, 
  Calendar, Clock, CheckCircle2, FileText, ArrowRight, Sparkles, Leaf
} from 'lucide-react';
import Link from 'next/link';

export default function AcademicsOverviewPage() {
  const COURSES = [
    {
      code: 'BAMS',
      name: 'Bachelor of Ayurvedic Medicine & Surgery (BAMS)',
      duration: '5.5 Years (4.5 Academic + 1 Year Internship)',
      intake: '100 Seats',
      eligibility: '10+2 with PCB (min 50%) & NEET-UG Qualified',
      href: '/courses/bams',
      featured: true,
      description: 'Our flagship degree program integrating Vedic Samhitas (Charaka, Sushruta, Ashtanga Hridaya) with contemporary clinical diagnosis, pathology, pharmacology, and surgical techniques.',
    },
    {
      code: 'MD-KAYA',
      name: 'M.D. (Ayurveda) in Kayachikitsa — Internal Medicine',
      duration: '3 Years Full-Time Residency',
      intake: 'Postgraduate AYUSH PG-NEET',
      eligibility: 'B.A.M.S. Degree from a recognized University / NCISM',
      href: '/courses/md-ayurveda',
      featured: false,
      description: 'Specialized clinical research, chronic metabolic disease management, Panchakarma therapeutics, and advanced clinical hospital residency.',
    },
    {
      code: 'CERT-PANC',
      name: 'Certificate Course in Panchakarma & Ayurvedic Nursing',
      duration: '1 Year Clinical Hands-on',
      intake: '30 Candidates',
      eligibility: '10+2 Any Stream / Equivalent',
      href: '/courses/panchakarma-certificate',
      featured: false,
      description: 'Hands-on practical training in classical therapeutic procedures including Abhyanga, Swedana, Shirodhara, Vamana, Virechana, and Basti preparation.',
    },
  ];

  const ACADEMIC_PILLARS = [
    {
      title: 'Teaching Methodology',
      desc: 'Gurukula shloka recitation combined with digital audio-visual multimedia smart lecture halls and case bedside discussions.',
      href: '/academics/methodology',
      icon: BookOpen,
    },
    {
      title: '14 Classical Departments',
      desc: 'Fourteen full statutory academic departments with dedicated museums, charts, specimens, and departmental libraries.',
      href: '/departments',
      icon: Building,
    },
    {
      title: 'Teaching Faculty Directory',
      desc: 'Distinguished Ayurvedic scholars, clinicians, and researchers with national and international publications.',
      href: '/faculty',
      icon: Users,
    },
    {
      title: 'Academic Calendar 2026–27',
      desc: 'Annual term dates, internal examinations, university vacations, and clinical rotation rosters.',
      href: '/academics/calendar',
      icon: Calendar,
    },
    {
      title: 'Clinical & Hospital Training',
      desc: 'Bedside diagnostic rounds and OPD postings in our 100-bed attached hospital with high clinical footfall.',
      href: '/academics/practical-training',
      icon: Award,
    },
    {
      title: 'Charak Vatika 5-Acre Herbarium',
      desc: 'Over 350 authenticated species of rare medicinal flora for live Dravyaguna identification and botanical study.',
      href: '/knowledge-hub',
      icon: Leaf,
    },
  ];

  return (
    <div className="bg-[#F6F2E9] min-h-screen text-[#342B25]">
      <PageHeader
        title="Academic Division & Programmes"
        subtitle="Vedic Heritage × Modern Medical Rigour · NCISM Approved B.A.M.S. (100 Seats) & Postgraduate Studies"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Academics' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Intro Mission Banner */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-[#173D32] to-[#0F2821] rounded-xl text-white shadow-card border border-[#C5A46D]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C5A46D]/20 text-[#DFCA9E] text-xs font-semibold tracking-wider uppercase border border-[#C5A46D]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Affiliated with Dr. S.R. Rajasthan Ayurved University, Jodhpur</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
              Cultivating the Next Generation of Compassionate Vaidyas
            </h2>
            <p className="text-xs sm:text-sm text-[#F6F2E9]/80 font-light leading-relaxed">
              At Shri Haridutt Ayurvedic Medical College, our academic curriculum follows the competency-based medical standards of the National Commission for Indian System of Medicine (NCISM), uniting foundational Sanskrit treatises with modern clinical hospital diagnostics.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
            <Link
              href="/admissions/apply"
              className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-[#C5A46D] text-[#173D32] font-bold text-xs uppercase tracking-wider shadow-gold hover:bg-[#DFCA9E] transition-all"
            >
              <span>Apply Online 2026–27</span>
            </Link>
            <a
              href="/api/download?file=/documents/ncism/transitional-curriculum-ug-bams-2026.pdf&name=NCISM-BAMS-Curriculum-Syllabus-2026"
              download="NCISM-BAMS-Curriculum-Syllabus-2026.pdf"
              className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white/10 text-white font-medium text-xs uppercase tracking-wider border border-white/20 hover:bg-white/20 transition-all"
            >
              <span>Download BAMS Syllabus</span>
            </a>
          </div>
        </div>

        {/* Featured Courses Section */}
        <section className="space-y-8">
          <div className="border-b-2 border-[#C5A46D]/40 pb-4">
            <span className="text-[#C5A46D] text-xs uppercase tracking-widest font-bold block mb-1">
              Curricular Offerings
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#173D32]">
              Academic Degree &amp; Certificate Programmes
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {COURSES.map((course) => (
              <div
                key={course.code}
                className={`bg-white rounded-xl p-6 border shadow-card flex flex-col justify-between group transition-all duration-300 hover:shadow-xl ${
                  course.featured ? 'border-2 border-[#C5A46D] ring-2 ring-[#C5A46D]/20' : 'border-[#C5A46D]/30'
                }`}
              >
                <div className="space-y-4">
                  {course.featured && (
                    <span className="inline-block bg-[#173D32] text-[#DFCA9E] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-[#C5A46D]/40">
                      Flagship NCISM Approved
                    </span>
                  )}

                  <h3 className="font-serif text-xl font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors leading-tight">
                    {course.name}
                  </h3>

                  <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
                    {course.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#C5A46D]/20 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#81917A]">Duration:</span>
                      <span className="font-semibold text-[#173D32]">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#81917A]">Intake:</span>
                      <span className="font-semibold text-[#173D32]">{course.intake}</span>
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[#81917A] shrink-0">Eligibility:</span>
                      <span className="font-semibold text-[#173D32] text-right text-[11px]">{course.eligibility}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#C5A46D]/15">
                  <Link
                    href={course.href}
                    className="inline-flex items-center justify-center w-full py-2.5 rounded text-xs font-bold uppercase tracking-wider text-[#173D32] bg-[#F6F2E9] border border-[#C5A46D] group-hover:bg-[#173D32] group-hover:text-[#C5A46D] transition-all shadow-sm"
                  >
                    <span>View Curriculum &amp; Faculty</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Academic Pillars Grid */}
        <section className="space-y-8">
          <div className="border-b-2 border-[#C5A46D]/40 pb-4">
            <span className="text-[#C5A46D] text-xs uppercase tracking-widest font-bold block mb-1">
              Institutional Framework
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#173D32]">
              Academic Pillars &amp; Educational Infrastructure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMIC_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Link
                  key={idx}
                  href={pillar.href}
                  className="bg-white p-6 rounded-xl border border-[#C5A46D]/30 shadow-card hover:border-[#C5A46D] hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-[#173D32] text-[#C5A46D] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#C5A46D]/15 flex items-center text-xs font-semibold text-[#173D32] group-hover:text-[#C5A46D]">
                    <span>Explore Section</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
