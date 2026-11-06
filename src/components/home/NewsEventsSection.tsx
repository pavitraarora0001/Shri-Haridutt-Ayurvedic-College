'use client';

import React from 'react';
import Link from 'next/link';
import { NOTICES, NEWS_EVENTS } from '@/lib/data';
import SectionTitle from '@/components/common/SectionTitle';
import { Calendar, Bell, ArrowRight, FileText, Pin } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export default function NewsEventsSection() {
  return (
    <section className="py-24 bg-[#F6F2E9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionTitle
            subtitle="Campus Happenings"
            title="Institutional News, Events & Circulars"
            description="Stay updated with university examinations, NCISM notifications, clinical conferences, and hospital outreach camps."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Featured News Spotlight (7 Cols) */}
          <ScrollReveal direction="left" className="lg:col-span-7 space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#173D32] flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-[#C5A46D]" />
              Latest Academic & Clinical News
            </h3>

            {NEWS_EVENTS.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg border border-[#C5A46D]/30 overflow-hidden shadow-card hover:shadow-luxury hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row group"
              >
                <div className="sm:w-2/5 relative h-48 sm:h-auto overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-[#173D32]/90 border border-[#C5A46D]/40 text-[#C5A46D] px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider shadow-sm">
                    {event.category}
                  </div>
                </div>

                <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-[#81917A] font-medium">
                      {event.date} • {event.location}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors mt-1 mb-2 leading-snug">
                      {event.title}
                    </h4>
                    <p className="text-xs text-[#342B25]/80 line-clamp-3 leading-relaxed font-light">
                      {event.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-[#C5A46D]/20">
                    <Link
                      href="/news-events"
                      className="inline-flex items-center text-xs font-semibold text-[#173D32] group-hover:text-[#C5A46D] transition-colors"
                    >
                      <span>Read Event Dispatch</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#C5A46D] transform group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </ScrollReveal>

          {/* Right Column: Official Circulars & Notice Board (5 Cols) */}
          <ScrollReveal direction="right" className="lg:col-span-5 bg-white p-6 rounded-lg border border-[#C5A46D]/40 shadow-card flex flex-col justify-between hover:border-[#C5A46D]/80 transition-colors duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#C5A46D]/30 mb-4">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-[#C5A46D]" />
                  <h3 className="font-serif text-lg font-bold text-[#173D32]">
                    Official Circulars & Notices
                  </h3>
                </div>
                <Link
                  href="/notices"
                  className="text-[11px] font-semibold text-[#173D32] hover:text-[#C5A46D] uppercase tracking-wider transition-colors"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {NOTICES.map((notice) => (
                  <div
                    key={notice.id}
                    className="p-3.5 rounded bg-[#F6F2E9] border border-[#C5A46D]/30 hover:border-[#C5A46D] hover:shadow-xs transition-all duration-300 group/notice"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#173D32] text-[#C5A46D]">
                        {notice.category}
                      </span>
                      <span className="text-[11px] text-[#81917A]">{notice.date}</span>
                    </div>

                    <h5 className="font-serif text-xs font-semibold text-[#173D32] group-hover/notice:text-[#C5A46D] transition-colors leading-snug">
                      <Link href="/notices">{notice.title}</Link>
                    </h5>

                    {notice.fileUrl && (
                      <div className="mt-2 pt-2 border-t border-[#C5A46D]/20 flex items-center justify-between text-[11px] text-[#173D32]">
                        <span className="flex items-center text-[10px] text-[#81917A]">
                          <FileText className="w-3.5 h-3.5 mr-1 text-[#C5A46D]" />
                          PDF Circular Attached
                        </span>
                        <Link
                          href="/downloads"
                          className="text-[10px] font-semibold text-[#C5A46D] hover:underline"
                        >
                          Download
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#C5A46D]/20">
              <Link
                href="/notices"
                className="w-full inline-flex items-center justify-center py-2.5 text-xs uppercase tracking-wider font-semibold rounded bg-[#173D32] text-white hover:bg-[#0F2821] hover:shadow-gold transition-all duration-300 group/btn"
              >
                <span>Browse All Official Circulars</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#C5A46D] transform group-hover/btn:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
