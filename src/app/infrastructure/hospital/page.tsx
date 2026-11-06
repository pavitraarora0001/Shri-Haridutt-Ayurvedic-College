import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { INSTITUTION_INFO } from '@/lib/data';
import { HeartPulse, Stethoscope, BedDouble, ShieldCheck, Clock, Phone, CheckCircle2 } from 'lucide-react';

export default function HospitalPage() {
  const wards = [
    { name: 'Kayachikitsa (General Medicine Ward)', beds: '30 Beds', desc: 'Managing chronic arthritis, diabetes complications, GI disorders and paralysis.' },
    { name: 'Panchakarma Special Inpatient Wing', beds: '25 Beds', desc: 'Equipped with individual Shirodhara suites, steam chambers and detoxification recovery units.' },
    { name: 'Shalya Tantra (Surgical & Kshara Sutra Ward)', beds: '15 Beds', desc: 'Pre-op and post-op care for anorectal conditions treated with Sushruta Kshara Sutra ligature.' },
    { name: 'Prasuti & Stri Roga (Maternity & Gynae Ward)', beds: '15 Beds', desc: 'Antenatal care, Ayurvedic Garbh Sanskar, and natural labor observation ward.' },
    { name: 'Kaumarbhritya (Pediatric Clinical Ward)', beds: '10 Beds', desc: 'Dedicated child care ward, phototherapy, and Suvarnaprashana immune camps.' },
    { name: 'Emergency Casualty & ICU Recovery', beds: '5 Beds', desc: '24x7 emergency resuscitation, cardiac monitors, oxygen lines, and emergency Ayurvedic medical officer.' },
  ];

  return (
    <div>
      <PageHeader
        title="100-Bedded Attached Teaching Hospital"
        subtitle="Clinical Sanctum • 24x7 Patient Care"
        crumbs={[{ label: 'Infrastructure', href: '/infrastructure' }, { label: 'Hospital' }]}
        bgImage="/images/ayurveda/panchakarma/traditional-panchakarma-suite.webp"
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <BedDouble className="w-6 h-6 text-[#173D32] mx-auto mb-2" />
              <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Capacity</span>
              <span className="font-serif text-2xl font-bold text-[#173D32]">100 Beds</span>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <Stethoscope className="w-6 h-6 text-[#173D32] mx-auto mb-2" />
              <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Annual OPD</span>
              <span className="font-serif text-2xl font-bold text-[#173D32]">45,000+</span>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <Clock className="w-6 h-6 text-[#173D32] mx-auto mb-2" />
              <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Casualty</span>
              <span className="font-serif text-2xl font-bold text-[#173D32]">24x7 Care</span>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <ShieldCheck className="w-6 h-6 text-[#173D32] mx-auto mb-2" />
              <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Approval</span>
              <span className="font-serif text-2xl font-bold text-[#173D32]">NCISM MSR</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                Clinical Rigour
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#173D32]">
                Comprehensive Outpatient & Inpatient Ayurvedic Healing
              </h2>
              <p className="text-sm text-[#342B25]/85 leading-relaxed font-light">
                The attached teaching hospital of <strong>{INSTITUTION_INFO.name}</strong> serves as the nerve center for bedside clinical training. Under the direct supervision of experienced professors and registered Vaidyas, students observe, diagnose, and treat real patients suffering from diverse ailments.
              </p>
              <p className="text-sm text-[#342B25]/85 leading-relaxed font-light">
                The clinical complex encompasses 12 daily specialty OPDs, computerized registration, diagnostic pathology lab, X-ray unit, ECG, ultra-sonography, labour room, and a modern operation theatre integrated with classical Kshara Sutra ligation.
              </p>

              <div className="p-4 rounded-lg bg-[#173D32] text-white border border-[#C5A46D]/40 space-y-2">
                <div className="flex items-center space-x-2 text-[#C5A46D]">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider font-semibold">Hospital 24x7 Helpline</span>
                </div>
                <p className="text-sm font-serif font-bold">{INSTITUTION_INFO.hospitalEmergency}</p>
                <p className="text-[11px] text-[#81917A]">OPD Hours: Monday to Saturday, 8:00 AM – 2:00 PM</p>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-lg overflow-hidden border-2 border-[#C5A46D]/50 shadow-luxury">
                <img
                  src="/images/ayurveda/panchakarma/traditional-panchakarma-suite.webp"
                  alt="Attached Teaching Hospital & Traditional Panchakarma Suite"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Wards Distribution */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#173D32]">
              Inpatient Wards & Specialty Clinical Units
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wards.map((ward, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-[#C5A46D]">{ward.beds}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#173D32] leading-snug">{ward.name}</h4>
                  <p className="text-xs text-[#342B25]/80 leading-relaxed font-light">{ward.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
