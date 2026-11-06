import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { COURSES } from '@/lib/data';
import { Clock, Users, GraduationCap, CheckCircle2 } from 'lucide-react';

export default function PanchakarmaCertificatePage() {
  const course = COURSES[2];

  return (
    <div>
      <PageHeader
        title="Certificate in Panchakarma & Ayurvedic Nursing"
        subtitle="Vocational Clinical Training • 1 Year"
        crumbs={[{ label: 'Academics', href: '/academics/programmes' }, { label: 'Panchakarma Certificate' }]}
        bgImage="/images/ayurveda/courses/panchakarma-therapy-nursing.webp"
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <Clock className="w-6 h-6 text-[#173D32] mx-auto mb-2" />
              <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Duration</span>
              <span className="font-serif text-xl font-bold text-[#173D32]">1 Year</span>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <Users className="w-6 h-6 text-[#173D32] mx-auto mb-2" />
              <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Intake</span>
              <span className="font-serif text-xl font-bold text-[#173D32]">30 Seats</span>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <GraduationCap className="w-6 h-6 text-[#173D32] mx-auto mb-2" />
              <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Tuition</span>
              <span className="font-serif text-xl font-bold text-[#173D32]">₹65,000</span>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <span className="text-xl mb-2 block">🌿</span>
              <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Eligibility</span>
              <span className="font-serif text-lg font-bold text-[#173D32]">10+2 Passed</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-6">
            <h2 className="font-serif text-3xl font-bold text-[#173D32]">
              Practical Vocational Mastery of Detoxification Therapies
            </h2>
            <p className="text-sm text-[#342B25]/85 leading-relaxed font-light">
              Designed for healthcare professionals, nurses, and wellness therapists who wish to master the practical execution of authentic Panchakarma procedures: Abhyanga (medicated oil massage), Swedana (herbal steam), Shirodhara, Janu Basti, Kati Basti, Netra Tarpana, and assisting Vaidyas during classical Vamana, Virechana and Basti karmas.
            </p>

            <div className="pt-4 border-t border-[#C5A46D]/20">
              <h3 className="font-serif text-xl font-bold text-[#173D32] mb-3">Key Training Modules</h3>
              <ul className="space-y-2 text-xs text-[#342B25]/85 font-light">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#173D32] shrink-0 mt-0.5" />
                  <span>Preparation of medicated decoctions (Kashaya), medicated milks (Ksheerapaka), and oils.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#173D32] shrink-0 mt-0.5" />
                  <span>Step-by-step theatre protocol, patient posture management, temperature calibration for Shirodhara.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#173D32] shrink-0 mt-0.5" />
                  <span>Samsarjana Krama dietary rehabilitation management in inpatient wards.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <Link
                href="/admissions/apply"
                className="px-6 py-3 rounded bg-[#173D32] hover:bg-[#0F2821] text-white text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Apply for Panchakarma Certificate 2026 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
