import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/common/PageHeader';
import { DEPARTMENTS, LEADERSHIP } from '@/lib/data';
import { FlaskConical, Users, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export function generateStaticParams() {
  return DEPARTMENTS.map((dept) => ({
    code: dept.code,
  }));
}

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const dept = DEPARTMENTS.find((d) => d.code.toLowerCase() === code.toLowerCase());

  if (!dept) {
    notFound();
  }

  // Related faculty
  const faculty = LEADERSHIP.filter(
    (f) => f.departmentCode?.toLowerCase() === dept.code.toLowerCase()
  );

  return (
    <div>
      <PageHeader
        title={dept.name}
        subtitle={dept.sanskritName}
        crumbs={[{ label: 'Departments', href: '/departments' }, { label: dept.code }]}
        bgImage={dept.image}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="bg-white p-8 rounded-lg border border-[#C5A46D]/40 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#C5A46D]/20 gap-2">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                  Department Code: {dept.code}
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#173D32] mt-1">{dept.name}</h2>
                <p className="font-devanagari text-lg text-[#C5A46D]">{dept.sanskritName}</p>
              </div>
              <div className="bg-[#173D32] text-[#C5A46D] px-4 py-2 rounded text-xs font-semibold text-center border border-[#C5A46D]/40">
                {dept.facultyCount} Sanctioned Faculty Posts
              </div>
            </div>

            <p className="text-sm text-[#342B25]/85 leading-relaxed font-light">
              {dept.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#C5A46D]/20 text-xs">
              <div className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                <span className="font-semibold text-[#173D32] block text-sm font-serif mb-1">
                  Head of Department (HOD)
                </span>
                <p className="text-[#342B25]/90">{dept.headOfDepartment}</p>
              </div>

              <div className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                <span className="font-semibold text-[#173D32] block text-sm font-serif mb-1">
                  Laboratories & Practical Units
                </span>
                <p className="text-[#342B25]/90">{dept.labs}</p>
              </div>
            </div>
          </div>

          {/* Department Faculty Members */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#173D32]">
              Department Faculty & Clinicians
            </h3>
            {faculty.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {faculty.map((f) => (
                  <div key={f.id} className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card flex items-center space-x-4">
                    <img src={f.image} alt={f.name} className="w-16 h-16 rounded-full object-cover border border-[#C5A46D]" />
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#173D32]">{f.name}</h4>
                      <p className="text-xs text-[#C5A46D] font-medium">{f.designation}</p>
                      <p className="text-[11px] text-[#81917A]">{f.qualification}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-white rounded-lg border border-[#C5A46D]/20 text-xs text-[#342B25]/80">
                Faculty profiles for this department are verified according to NCISM roster records. Visit the Faculty Directory to view all 48+ faculty members.
              </div>
            )}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/departments"
              className="inline-flex items-center text-xs uppercase tracking-wider font-semibold text-[#173D32] hover:text-[#C5A46D]"
            >
              ← Back to All 14 Ayurvedic Departments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
