'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';
import { COURSES } from '@/lib/data';

export default function CompactCourses() {
  return (
    <section className="bg-white py-12 md:py-16 border-b border-[#C5A46D]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#C5A46D]/20 pb-4">
          <div>
            <span className="text-[#C5A46D] text-xs font-bold uppercase tracking-widest block mb-1">
              Academic Curricula
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32]">
              Undergraduate &amp; Postgraduate Programmes
            </h2>
          </div>
          <Link
            prefetch={true}
            href="/academics"
            className="inline-flex items-center text-xs font-semibold text-[#173D32] hover:text-[#C5A46D] transition-colors group self-start md:self-auto"
          >
            <span>View All Academic Programmes</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Compact Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="group bg-[#FAF7F0] rounded-xl overflow-hidden border border-[#C5A46D]/30 shadow-card hover:shadow-luxury hover:border-[#C5A46D] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Course Image */}
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={course.image || '/images/ayurveda/courses/bams-ayurvedic-medicine.webp'}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 bg-[#173D32]/90 text-[#DFCA9E] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border border-[#C5A46D]/30 backdrop-blur-sm">
                    {course.code}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 space-y-3">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#173D32] leading-snug group-hover:text-[#C5A46D] transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="flex items-center space-x-3 text-[11px] text-[#81917A]">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-[#C5A46D]" />
                      {course.duration.split('(')[0].trim()}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1 text-[#C5A46D]" />
                      {course.intake} Seats
                    </span>
                  </div>

                  <p className="text-xs text-[#342B25]/80 line-clamp-2 leading-relaxed font-light">
                    {course.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-[#C5A46D]/15 flex items-center justify-between">
                <span className="text-[10px] text-[#81917A] font-mono">
                  {course.code === 'BAMS' ? 'NEET-UG' : course.code === 'MD-KAYACHIKITSA' ? 'AIAPGET' : 'Direct Merit'}
                </span>
                <Link
                  prefetch={true}
                  href={
                    course.code === 'BAMS'
                      ? '/courses/bams'
                      : course.code === 'MD-KAYACHIKITSA'
                      ? '/courses/md-ayurveda'
                      : '/courses/panchakarma-certificate'
                  }
                  className="text-xs font-bold text-[#173D32] group-hover:text-[#C5A46D] inline-flex items-center"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
