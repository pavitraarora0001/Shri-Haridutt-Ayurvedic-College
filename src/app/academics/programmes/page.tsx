import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { COURSES } from '@/lib/data';
import { ArrowRight, Clock, GraduationCap, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ProgrammesPage() {
  const images = [
    '/images/ayurveda/courses/bams-ayurvedic-medicine.webp',
    '/images/ayurveda/courses/md-kayachikitsa-internal-medicine.webp',
    '/images/ayurveda/courses/panchakarma-therapy-nursing.webp',
  ];

  const links = ['/courses/bams', '/courses/md-ayurveda', '/courses/panchakarma-certificate'];

  return (
    <div>
      <PageHeader
        title="Academic Programmes"
        subtitle="NCISM Approved Medical Curricula"
        crumbs={[{ label: 'Academics' }, { label: 'Programmes' }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
              Medical Credentials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173D32] mt-2">
              Undergraduate, Postgraduate & Paramedical Disciplines
            </h2>
            <p className="text-xs sm:text-sm text-[#342B25]/80 mt-3 font-light leading-relaxed">
              Every course conducted at Shri Haridutt Ayurvedic Medical College adheres strictly to statutory curriculum mandates established by NCISM and the Ministry of AYUSH, Govt. of India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COURSES.map((course, idx) => (
              <div
                key={course.id}
                className="bg-white rounded-lg border border-[#C5A46D]/40 shadow-card hover:shadow-luxury transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={course.image || images[idx] || images[0]}
                      alt={course.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#173D32]/90 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 bg-[#173D32]/90 text-[#C5A46D] border border-[#C5A46D]/50 px-3 py-1 rounded text-xs font-semibold">
                      {course.intake} Seats • {course.degree.split(' ')[0]}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-xl font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-[#342B25]/80 leading-relaxed font-light line-clamp-3">
                      {course.description}
                    </p>

                    <div className="pt-3 border-t border-[#C5A46D]/20 space-y-2 text-xs">
                      <div>
                        <span className="font-semibold text-[#173D32]">Duration: </span>
                        <span className="text-[#342B25]/80">{course.duration}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#173D32]">Annual Tuition: </span>
                        <span className="text-[#173D32] font-semibold">{course.feePerYear}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#173D32]">Affiliation: </span>
                        <span className="text-[#81917A] text-[11px] block">{course.approvalBody}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={links[idx] || '/academics/programmes'}
                    className="w-full inline-flex items-center justify-center py-2.5 rounded bg-[#173D32] hover:bg-[#0F2821] text-white text-xs uppercase tracking-wider font-semibold transition-colors border border-[#C5A46D]/40"
                  >
                    <span>View Curriculum & Details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-[#C5A46D]" />
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
