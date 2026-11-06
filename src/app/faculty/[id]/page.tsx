import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/common/PageHeader';
import { LEADERSHIP } from '@/lib/data';
import { GraduationCap, Award, Mail, Phone, BookOpen, Clock, ArrowRight } from 'lucide-react';

export function generateStaticParams() {
  return LEADERSHIP.map((f) => ({
    id: f.id,
  }));
}

export default async function FacultyProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faculty = LEADERSHIP.find((f) => f.id === id);

  if (!faculty) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title={faculty.name}
        subtitle={faculty.designation}
        crumbs={[{ label: 'Faculty', href: '/faculty' }, { label: faculty.name }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="bg-white rounded-lg border border-[#C5A46D]/40 shadow-card overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 bg-[#173D32] text-white">
              <div className="md:col-span-4 flex flex-col items-center text-center">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#C5A46D] shadow-gold mb-3">
                  <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover" />
                </div>
                <h2 className="font-serif text-xl font-bold">{faculty.name}</h2>
                <p className="text-xs text-[#C5A46D] mt-0.5">{faculty.designation}</p>
              </div>

              <div className="md:col-span-8 space-y-3 text-xs sm:text-sm">
                <div className="flex items-center space-x-2 text-[#C5A46D]">
                  <GraduationCap className="w-5 h-5 shrink-0" />
                  <span className="font-semibold text-white">{faculty.qualification}</span>
                </div>
                <div className="flex items-center space-x-2 text-[#F6F2E9]/90">
                  <Clock className="w-4 h-4 text-[#C5A46D] shrink-0" />
                  <span>Clinical & Academic Experience: {faculty.experienceYears}+ Years</span>
                </div>
                <div className="flex items-center space-x-2 text-[#F6F2E9]/90">
                  <Award className="w-4 h-4 text-[#C5A46D] shrink-0" />
                  <span>Field of Expertise: {faculty.specialization}</span>
                </div>
                <div className="flex items-center space-x-2 text-[#F6F2E9]/90">
                  <Mail className="w-4 h-4 text-[#C5A46D] shrink-0" />
                  <span>{faculty.email}</span>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6 text-sm text-[#342B25]/85 font-light leading-relaxed">
              <h3 className="font-serif text-2xl font-bold text-[#173D32]">
                Academic Dossier & Biographical Summary
              </h3>
              <p>{faculty.bio}</p>
              <p>
                Heads regular clinical bed-side rounds, conducts specialized patient consultations at our OPD, and mentors undergraduate BAMS scholars through both Sanskrit textual commentary and practical patient diagnosis.
              </p>

              <div className="pt-6 border-t border-[#C5A46D]/20 flex items-center justify-between">
                <Link
                  href="/faculty"
                  className="text-xs font-semibold uppercase tracking-wider text-[#173D32] hover:text-[#C5A46D]"
                >
                  ← Back to Faculty Directory
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#173D32] rounded hover:bg-[#0F2821] transition-colors"
                >
                  Schedule Academic Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
