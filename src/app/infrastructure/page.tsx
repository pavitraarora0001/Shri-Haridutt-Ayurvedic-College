import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { FACILITIES } from '@/lib/data';
import { ArrowRight, Building, BookOpen, Stethoscope, FlaskConical, Flower2, Home } from 'lucide-react';

export default function InfrastructurePage() {
  const facilityLinks: Record<string, string> = {
    'FAC-HOSPITAL': '/infrastructure/hospital',
    'FAC-GARDEN': '/infrastructure/herbal-garden',
    'FAC-LIBRARY': '/infrastructure/library',
    'FAC-PHARMACY': '/infrastructure/laboratories',
    'FAC-AUDITORIUM': '/infrastructure',
    'FAC-HOSTEL': '/infrastructure/hostel',
  };

  return (
    <div>
      <PageHeader
        title="Campus Infrastructure & Facilities"
        subtitle="Vedic Architecture × Modern Academic Living"
        crumbs={[{ label: 'Infrastructure' }]}
        bgImage="/images/ayurveda/ancient-heritage/heritage-stone-architecture.webp"
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
              Statutory MSR Infrastructure
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173D32] mt-2">
              A Complete Ecosystem for Classical Healing & Study
            </h2>
            <p className="text-xs sm:text-sm text-[#342B25]/80 mt-3 font-light leading-relaxed">
              Constructed in accordance with the Minimum Standard Requirements (MSR) of NCISM, featuring an attached 100-bedded hospital, 5-acre herbal garden, classical manuscript library, and advanced laboratories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FACILITIES.map((facility) => (
              <div
                key={facility.id}
                className="bg-white rounded-lg border border-[#C5A46D]/30 shadow-card hover:shadow-luxury transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={facility.imageUrl}
                      alt={facility.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#173D32]/85 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-[#173D32]/90 border border-[#C5A46D]/40 text-[#C5A46D] px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase">
                      {facility.category}
                    </div>
                    <div className="absolute bottom-2 left-4 right-4 text-white">
                      <p className="text-[11px] text-[#C5A46D]">{facility.capacity}</p>
                      <h3 className="font-serif text-lg font-bold leading-snug">{facility.title}</h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <p className="text-xs text-[#342B25]/80 leading-relaxed font-light">
                      {facility.description}
                    </p>
                    <div className="p-2.5 rounded bg-[#F6F2E9] border border-[#C5A46D]/20 text-[11px] text-[#173D32]">
                      <span className="font-bold text-[#C5A46D]">Key Facility: </span>
                      {facility.highlights}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={facilityLinks[facility.facilityId] || '/infrastructure'}
                    className="w-full inline-flex items-center justify-center py-2 text-xs uppercase tracking-wider font-semibold rounded bg-[#F6F2E9] hover:bg-[#173D32] text-[#173D32] hover:text-white border border-[#C5A46D]/40 transition-colors"
                  >
                    <span>Inspect Facility Details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#C5A46D]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
