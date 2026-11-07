import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { LEADERSHIP } from '@/lib/data';
import { prisma } from '@/lib/prisma';
import { GraduationCap, Award, ArrowRight, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function FacultyDirectoryPage() {
  let displayFaculty = LEADERSHIP;

  try {
    const dbFaculty = await prisma.faculty.findMany({
      where: { isActive: true },
      orderBy: [{ order: 'asc' }, { experienceYears: 'desc' }],
    });

    if (dbFaculty && dbFaculty.length > 0) {
      displayFaculty = dbFaculty.map((f) => ({
        id: f.id,
        facultyId: f.facultyId,
        name: f.name,
        designation: f.designation,
        qualification: f.qualification,
        experienceYears: f.experienceYears,
        specialization: f.specialization,
        email: f.email,
        phone: f.phone || undefined,
        bio: f.bio,
        image: f.image || 'https://images.unsplash.com/photo-1582750433449-648ed127bb54',
        isHOD: f.isHOD,
        isLeadership: f.isLeadership,
        order: f.order,
      }));
    }
  } catch (err) {
    console.error('Error fetching faculty from DB:', err);
  }

  return (
    <div>
      <PageHeader
        title="Faculty & Teaching Vaidyas"
        subtitle="Scholarly Leadership • NCISM Approved Cadre"
        crumbs={[{ label: 'Faculty' }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
              Eminent Academic Mentors
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173D32] mt-2">
              Teaching Faculty & Senior Clinical Consultants
            </h2>
            <p className="text-xs sm:text-sm text-[#342B25]/80 mt-3 font-light leading-relaxed">
              Every faculty member at Shri Haridutt Ayurvedic Medical College is appointed in full compliance with NCISM qualification guidelines, possessing post-graduate M.D. / M.S. (Ayurveda) degrees and deep clinical experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayFaculty.map((faculty) => (
              <div
                key={faculty.id}
                className="bg-white rounded-lg border border-[#C5A46D]/30 shadow-card hover:shadow-luxury hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-[#173D32]">
                    <img
                      src={faculty.image}
                      alt={faculty.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2821]/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 right-3 bg-[#173D32]/90 border border-[#C5A46D]/50 text-[#C5A46D] px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider">
                      {faculty.experienceYears}+ Yrs Exp
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <p className="text-[11px] text-[#C5A46D] font-medium uppercase tracking-wider">
                        {faculty.designation}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-xl font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors leading-snug">
                      {faculty.name}
                    </h3>

                    <div className="text-xs text-[#342B25]/85 flex items-start space-x-1.5">
                      <GraduationCap className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                      <span className="font-medium">{faculty.qualification}</span>
                    </div>

                    <div className="text-xs text-[#342B25]/80 flex items-start space-x-1.5">
                      <Award className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                      <span>Specialization: {faculty.specialization}</span>
                    </div>

                    <p className="text-xs text-[#342B25]/75 line-clamp-3 leading-relaxed pt-2 border-t border-[#C5A46D]/20 font-light">
                      {faculty.bio}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/faculty/${faculty.id}`}
                    className="w-full inline-flex items-center justify-center py-2 text-xs uppercase tracking-wider font-semibold rounded bg-[#F6F2E9] hover:bg-[#173D32] text-[#173D32] hover:text-white border border-[#C5A46D]/40 transition-colors"
                  >
                    <span>View Dossier & Research</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#C5A46D]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-white border border-[#C5A46D]/30 flex items-center space-x-3 text-xs text-[#342B25]">
            <ShieldCheck className="w-5 h-5 text-[#173D32] shrink-0" />
            <span>
              All faculty appointments, bio-metric attendance records and teacher code verifications conform to NCISM MSR directives. Teacher Code database is updated annually.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
