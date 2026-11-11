import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Building, Users, ShieldCheck, Award, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Organization Structure & Governance Organogram | SHAMC',
  description: 'Administrative organogram and governance hierarchy of Shri Haridutt Ayurvedic Medical College & Hospital.',
};

export default function OrganizationStructurePage() {
  return (
    <div className="bg-[#F6F2E9] min-h-screen text-[#342B25]">
      <PageHeader
        title="Institutional Organization Structure"
        subtitle="Governance Hierarchy · Academic Administration · Hospital Management Directorate"
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Organization Structure' }]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[#C5A46D] text-xs font-bold uppercase tracking-widest block">Governance Organogram</span>
          <h2 className="font-serif text-3xl font-bold text-[#173D32]">Administrative &amp; Clinical Leadership Hierarchy</h2>
          <p className="text-xs sm:text-sm text-[#342B25]/80 font-light leading-relaxed">
            The institution operates under a transparent, unified governance framework approved by the Academic Governing Trust, aligning collegiate academics with full-scale hospital clinical healthcare.
          </p>
        </div>

        {/* Visual Organogram Tree */}
        <div className="space-y-6">
          {/* Level 1: Governing Trust & Council */}
          <div className="max-w-md mx-auto bg-gradient-to-r from-[#173D32] to-[#0F2821] text-white p-5 rounded-xl border border-[#C5A46D] shadow-card text-center space-y-1">
            <span className="text-[10px] text-[#C5A46D] uppercase tracking-wider font-bold">Apex Governing Authority</span>
            <h3 className="font-serif text-lg font-bold">Academic Governing Council &amp; Trust</h3>
            <p className="text-xs text-[#F6F2E9]/80 font-light">Chairman &amp; Board of Trustees</p>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-[#C5A46D]" />
          </div>

          {/* Level 2: Principal & Medical Superintendent */}
          <div className="max-w-lg mx-auto bg-white p-6 rounded-xl border-2 border-[#C5A46D] shadow-gold text-center space-y-2">
            <span className="inline-block bg-[#173D32] text-[#DFCA9E] text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded">
              Institutional Head
            </span>
            <h3 className="font-serif text-xl font-bold text-[#173D32]">Prof. (Dr.) Devendra Nath Tripathi</h3>
            <p className="text-xs text-[#C5A46D] font-semibold">Principal &amp; Medical Superintendent</p>
            <p className="text-[11px] text-[#81917A] max-w-md mx-auto">
              Oversees College Academic Standards, NCISM Regulatory Affiliations, Hospital Administration, and Medical Care.
            </p>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-[#C5A46D]" />
          </div>

          {/* Level 3: Dual Pillar Directorate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Academic Division */}
            <div className="bg-white p-6 rounded-xl border border-[#C5A46D]/40 shadow-card space-y-4">
              <div className="border-b border-[#C5A46D]/20 pb-3">
                <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-wider block">Academic Division</span>
                <h4 className="font-serif text-base font-bold text-[#173D32]">Vice Principal (Academic Affairs)</h4>
                <p className="text-xs text-[#81917A]">Dr. Alok Nath Upadhyay</p>
              </div>
              <ul className="text-xs text-[#342B25]/85 space-y-2 list-disc pl-4 font-light">
                <li>14 Classical Ayurvedic Academic Departments (Samhita, Dravyaguna, etc.)</li>
                <li>Undergraduate (BAMS) &amp; Postgraduate (MD) Curriculum Committees</li>
                <li>Central Saraswati Library &amp; Herbal Garden In-Charges</li>
                <li>Internal Examination &amp; Attendance Scrutiny Cell</li>
              </ul>
            </div>

            {/* Hospital Division */}
            <div className="bg-white p-6 rounded-xl border border-[#C5A46D]/40 shadow-card space-y-4">
              <div className="border-b border-[#C5A46D]/20 pb-3">
                <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-wider block">Clinical Division</span>
                <h4 className="font-serif text-base font-bold text-[#173D32]">Deputy Medical Superintendent</h4>
                <p className="text-xs text-[#81917A]">Dr. Vaidya Kripashankar Vyas</p>
              </div>
              <ul className="text-xs text-[#342B25]/85 space-y-2 list-disc pl-4 font-light">
                <li>100-Bed Attached Teaching Hospital &amp; 8 Clinical OPD Chambers</li>
                <li>Panchakarma &amp; Bio-Purification Specialty Sanctum</li>
                <li>Casualty 24x7 Medical Officers &amp; Nursing Staff Administration</li>
                <li>Clinical Pathology, Pharmacy &amp; Bio-Medical Waste Cell</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-[#C5A46D]" />
          </div>

          {/* Level 4: Statutory Committees & Student Welfare */}
          <div className="bg-[#173D32]/5 p-6 rounded-xl border border-[#C5A46D]/30 max-w-4xl mx-auto space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#173D32] text-center uppercase tracking-wider">
              Statutory Regulatory Committees &amp; Quality Cells
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs text-[#342B25]/90">
              <div className="p-2.5 bg-white rounded border border-[#C5A46D]/20">Anti-Ragging Squad</div>
              <div className="p-2.5 bg-white rounded border border-[#C5A46D]/20">ICC / POSH Cell</div>
              <div className="p-2.5 bg-white rounded border border-[#C5A46D]/20">Institutional Ethics (IEC)</div>
              <div className="p-2.5 bg-white rounded border border-[#C5A46D]/20">Student Grievance (SGRC)</div>
            </div>
          </div>

          {/* Official Institutional Organogram Document Chart */}
          <div className="bg-white rounded-xl border-2 border-[#C5A46D]/40 p-6 sm:p-8 max-w-4xl mx-auto shadow-luxury space-y-4">
            <div className="border-b border-[#C5A46D]/20 pb-3">
              <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-wider block">Verified Document</span>
              <h3 className="font-serif text-xl font-bold text-[#173D32]">Official Administrative Governance Organogram</h3>
              <p className="text-xs text-[#81917A]">Approved by Saraswati Shiksha Samiti &amp; Institutional Governing Council</p>
            </div>
            <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 aspect-[16/9] w-full">
              <img
                src="/images/campus-real/Organogram.jpg"
                alt="Shri Haridutt Ayurvedic College Official Administrative Organogram"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-[11px] text-gray-500 text-center italic">
              Formal institutional organogram establishing reporting channels between Board of Trustees, Principal, Academic HODs, Hospital Superintendent, and Student Support Wings.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
