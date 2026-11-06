import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { NEWS_EVENTS } from '@/lib/data';
import { Calendar, MapPin, Tag } from 'lucide-react';

export default function NewsEventsPage() {
  return (
    <div>
      <PageHeader
        title="Institutional News & Campus Events"
        subtitle="Symposia, Camps & Academic Milestones"
        crumbs={[{ label: 'News & Events' }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {NEWS_EVENTS.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg border border-[#C5A46D]/30 shadow-card hover:shadow-luxury transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#173D32]/85 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-[#173D32]/90 border border-[#C5A46D]/40 text-[#C5A46D] px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">
                      {event.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-3 text-xs text-[#81917A]">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-[#C5A46D]" /> {event.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-[#C5A46D]" /> {event.location}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors leading-snug">
                      {event.title}
                    </h3>

                    <p className="text-xs text-[#342B25]/80 leading-relaxed font-light">
                      {event.summary}
                    </p>

                    <p className="text-xs text-[#342B25]/80 leading-relaxed font-light pt-2 border-t border-[#C5A46D]/20">
                      {event.content}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <span className="text-[11px] font-semibold text-[#173D32] uppercase tracking-wider">
                    Official College Event Dispatch
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
