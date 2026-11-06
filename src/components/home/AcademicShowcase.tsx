'use client';

import React from 'react';
import Link from 'next/link';
import { COURSES } from '@/lib/data';
import SectionTitle from '@/components/common/SectionTitle';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion/ScrollReveal';
import { Clock, GraduationCap, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AcademicShowcase() {
  const images = [
    '/images/ayurveda/courses/bams-ayurvedic-medicine.webp',
    '/images/ayurveda/courses/md-kayachikitsa-internal-medicine.webp',
    '/images/ayurveda/courses/panchakarma-therapy-nursing.webp',
  ];

  const links = ['/courses/bams', '/courses/md-ayurveda', '/courses/panchakarma-certificate'];

  return (
    <section className="py-24 bg-white relative border-y border-[#C5A46D]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionTitle
            subtitle="Academic Excellence"
            title="Approved Professional Programmes"
            description="Curated by the National Commission for Indian System of Medicine (NCISM), our clinical curriculum balances deep Sanskrit scriptural mastery with modern diagnostic competencies."
          />
        </ScrollReveal>

        {/* Staggered Course Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COURSES.map((course, idx) => (
            <StaggerItem key={course.id}>
              <div className="bg-[#F6F2E9] rounded-lg overflow-hidden border border-[#C5A46D]/40 shadow-card hover:shadow-luxury hover:border-[#C5A46D] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group h-full">
                <div>
                  {/* Course Image with Smooth Zoom on Card Hover */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={course.image || images[idx] || images[0]}
                      alt={course.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#173D32]/90 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Intake & Approval Badge */}
                    <div className="absolute top-4 left-4 bg-[#173D32]/90 backdrop-blur-sm border border-[#C5A46D]/50 text-[#C5A46D] px-3 py-1 rounded text-[11px] font-semibold tracking-wide uppercase">
                      {course.intake} Seats • {course.degree.split(' ')[0]}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-[#C5A46D]" />
                        {course.duration.split('(')[0]}
                      </span>
                      <span className="text-[#C5A46D] font-medium text-[11px]">
                        {course.code}
                      </span>
                    </div>
                  </div>

                  {/* Course Card Details */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-serif text-xl font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-[#342B25]/80 line-clamp-3 leading-relaxed font-light">
                      {course.description}
                    </p>

                    <div className="pt-2 border-t border-[#C5A46D]/20 space-y-2 text-xs">
                      <div>
                        <span className="font-semibold text-[#173D32]">Eligibility: </span>
                        <span className="text-[#342B25]/80 text-[11px] leading-tight block mt-0.5">
                          {course.eligibility}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#173D32]">Tuition: </span>
                        <span className="text-[#173D32] font-semibold">{course.feePerYear}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Link Footer with Micro-interaction */}
                <div className="p-6 pt-0">
                  <Link
                    href={links[idx] || '/academics/programmes'}
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded bg-[#173D32] group-hover:bg-[#0F2821] text-white text-xs uppercase tracking-wider font-semibold transition-all border border-[#C5A46D]/40 shadow-sm"
                  >
                    <span>View Complete Course Details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-[#C5A46D] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* NCISM Regulatory Notice */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 p-4 rounded-lg bg-[#173D32]/5 border border-[#C5A46D]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#342B25]">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-[#173D32] shrink-0" />
              <span>
                All admissions are conducted strictly as per NCISM, Ministry of AYUSH norms and State AYUSH Counseling guidelines. No unauthorized courses are conducted.
              </span>
            </div>
            <Link
              href="/mandatory-disclosures"
              className="text-xs font-semibold text-[#173D32] hover:text-[#C5A46D] whitespace-nowrap underline"
            >
              Review NCISM Approvals →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
