'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { NOTICES, NEWS_EVENTS } from '@/lib/data';

export default function CompactNewsNotices() {
  const latestNotices = NOTICES.slice(0, 4);
  const latestNews = NEWS_EVENTS.slice(0, 2);

  return (
    <section className="bg-[#FAF7F0] py-12 md:py-16 border-b border-[#C5A46D]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Column 1: Notifications & Circulars */}
          <div className="bg-white rounded-xl p-6 border border-[#C5A46D]/30 shadow-card flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#C5A46D]/20 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-md bg-[#173D32] flex items-center justify-center">
                    <Bell className="w-4 h-4 text-[#C5A46D]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#173D32] leading-tight">
                      Institutional Circulars
                    </h3>
                    <p className="text-[10px] text-[#81917A]">Admissions, Exams &amp; Regulatory Notices</p>
                  </div>
                </div>
                <Link
                  prefetch={true}
                  href="/notices"
                  className="text-xs font-semibold text-[#173D32] hover:text-[#C5A46D] transition-colors inline-flex items-center"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>

              {/* Notices List */}
              <div className="divide-y divide-[#C5A46D]/15">
                {latestNotices.map((notice) => (
                  <div key={notice.id} className="py-3 first:pt-1 last:pb-1 group">
                    <div className="flex items-center space-x-2 text-[10px] text-[#81917A] mb-1">
                      <span className="font-mono bg-[#173D32]/10 text-[#173D32] px-1.5 py-0.2 rounded font-semibold">
                        {notice.category}
                      </span>
                      <span>•</span>
                      <span>{notice.date}</span>
                    </div>
                    <Link
                      prefetch={true}
                      href="/examination"
                      className="text-xs font-medium text-[#342B25] group-hover:text-[#C5A46D] transition-colors leading-snug line-clamp-2"
                    >
                      {notice.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#C5A46D]/15 mt-3">
              <Link
                prefetch={true}
                href="/examination"
                className="text-xs font-semibold text-[#173D32] hover:text-[#C5A46D] inline-flex items-center"
              >
                <span>Check University Examination Datesheets &amp; Results →</span>
              </Link>
            </div>
          </div>

          {/* Column 2: News & Events */}
          <div className="bg-white rounded-xl p-6 border border-[#C5A46D]/30 shadow-card flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#C5A46D]/20 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-md bg-[#173D32] flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-[#C5A46D]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#173D32] leading-tight">
                      News &amp; Events
                    </h3>
                    <p className="text-[10px] text-[#81917A]">Seminars, CMEs &amp; Health Camps</p>
                  </div>
                </div>
                <Link
                  prefetch={true}
                  href="/news-events"
                  className="text-xs font-semibold text-[#173D32] hover:text-[#C5A46D] transition-colors inline-flex items-center"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>

              {/* News Cards */}
              <div className="space-y-4">
                {latestNews.map((event) => (
                  <div key={event.id} className="flex gap-3.5 group items-start">
                    {event.imageUrl && (
                      <div className="relative w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-[#C5A46D]/20">
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          sizes="96px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center space-x-2 text-[10px] text-[#81917A]">
                        <span className="font-semibold text-[#C5A46D]">{event.category}</span>
                        <span>•</span>
                        <span>{event.date}</span>
                      </div>
                      <Link
                        prefetch={true}
                        href="/news-events"
                        className="text-xs font-serif font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors line-clamp-2 leading-snug block"
                      >
                        {event.title}
                      </Link>
                      <p className="text-[11px] text-[#342B25]/75 line-clamp-2 font-light">
                        {event.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#C5A46D]/15 mt-3">
              <Link
                prefetch={true}
                href="/news-events"
                className="text-xs font-semibold text-[#173D32] hover:text-[#C5A46D] inline-flex items-center"
              >
                <span>Read Institutional Press Releases &amp; Media Archives →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
