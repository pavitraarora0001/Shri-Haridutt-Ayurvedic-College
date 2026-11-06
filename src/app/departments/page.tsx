import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { DEPARTMENTS } from '@/lib/data';
import { ArrowRight, FlaskConical, Users, BookOpen } from 'lucide-react';

export default function DepartmentsPage() {
  return (
    <div>
      <PageHeader
        title="14 Ayurvedic Academic Departments"
        subtitle="Classical Specializations & Laboratories"
        crumbs={[{ label: 'Departments' }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
              NCISM Compliant Structure
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173D32] mt-2">
              Comprehensive Ayurvedic Medical Faculty
            </h2>
            <p className="text-xs sm:text-sm text-[#342B25]/80 mt-3 font-light leading-relaxed">
              Every department features its own specialized museum, diagnostic demonstration room, and clinical ward postings under experienced professors and registered Vaidyas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEPARTMENTS.map((dept, idx) => (
              <div
                key={dept.id}
                className="bg-white rounded-lg border border-[#C5A46D]/30 shadow-card hover:shadow-luxury hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={dept.image}
                      alt={dept.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#173D32]/90 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 bg-[#173D32]/90 border border-[#C5A46D]/40 text-[#C5A46D] px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase">
                      Dept #{String(idx + 1).padStart(2, '0')}
                    </div>

                    <div className="absolute bottom-2 left-4 right-4 text-white">
                      <p className="font-devanagari text-xs text-[#C5A46D]">
                        {dept.sanskritName}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-lg font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors leading-snug">
                      {dept.name}
                    </h3>
                    <p className="text-xs text-[#342B25]/80 leading-relaxed font-light line-clamp-3">
                      {dept.description}
                    </p>

                    <div className="pt-2 border-t border-[#C5A46D]/20 text-[11px] space-y-1.5">
                      <p className="text-[#173D32]">
                        <strong>Head of Department:</strong> {dept.headOfDepartment}
                      </p>
                      <p className="text-[#81917A]">
                        <strong>Specialized Lab:</strong> {dept.labs}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/departments/${dept.code.toLowerCase()}`}
                    className="w-full inline-flex items-center justify-center py-2 text-xs uppercase tracking-wider font-semibold rounded bg-[#F6F2E9] hover:bg-[#173D32] text-[#173D32] hover:text-white border border-[#C5A46D]/40 transition-colors"
                  >
                    <span>Department Profile & Labs</span>
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
