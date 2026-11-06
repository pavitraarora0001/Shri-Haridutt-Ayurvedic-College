import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { INSTITUTION_INFO } from '@/lib/data';
import { Compass, Target, ShieldCheck, HeartPulse, Sparkles, CheckCircle2 } from 'lucide-react';

export default function VisionMissionPage() {
  return (
    <div>
      <PageHeader
        title="Vision, Mission & Quality Policy"
        subtitle="Institutional Philosophy"
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Vision & Mission' }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Vision Card */}
            <div className="bg-[#173D32] text-white p-10 rounded-lg border-2 border-[#C5A46D] shadow-luxury flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-full bg-[#0F2821] border border-[#C5A46D]/60 flex items-center justify-center text-[#C5A46D] mb-6">
                  <Compass className="w-7 h-7" />
                </div>
                <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                  Our Sacred Vision
                </span>
                <h2 className="font-serif text-3xl font-bold mt-2 mb-4 leading-tight">
                  To Stand as a World-Class Epicenter of Ayurvedic Medical Scholarship
                </h2>
                <p className="text-sm text-[#F6F2E9]/85 leading-relaxed font-light">
                  To be nationally and globally recognized as an eminent seat of learning where authentic Vedic medical philosophy and contemporary healthcare converge — producing visionary Vaidyas of unimpeachable integrity, profound diagnostic intuition, and profound clinical empathy.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#C5A46D]/30 text-xs text-[#C5A46D] italic font-serif">
                "ज्ञानं लब्ध्वा परां शान्तिमचिरेणाधिगच्छति"
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white p-10 rounded-lg border-2 border-[#C5A46D]/40 shadow-card flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-full bg-[#F6F2E9] border border-[#C5A46D]/60 flex items-center justify-center text-[#173D32] mb-6">
                  <Target className="w-7 h-7" />
                </div>
                <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                  Our Academic Mission
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#173D32] mt-2 mb-4 leading-tight">
                  Holistic Education, Clinical Mastery & Community Welfare
                </h2>

                <ul className="space-y-3 text-xs text-[#342B25]/85">
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#173D32] shrink-0 mt-0.5" />
                    <span>Deliver rigorous undergraduate and postgraduate education based strictly on the NCISM curriculum and authentic classical treatises.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#173D32] shrink-0 mt-0.5" />
                    <span>Provide affordable, evidence-informed inpatient and outpatient clinical healthcare through our 100-bed hospital and Panchakarma facilities.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#173D32] shrink-0 mt-0.5" />
                    <span>Foster multidisciplinary scientific inquiry into classical formulations, Dravyaguna conservation, and Ayurvedic clinical trials.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[#C5A46D]/20 text-xs text-[#81917A]">
                Committed to UN Sustainable Development Goal 3: Good Health & Well-being.
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-white p-8 rounded-lg border border-[#C5A46D]/30 shadow-card">
            <h3 className="font-serif text-2xl font-bold text-[#173D32] mb-6 text-center">
              Institutional Core Values
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-[#342B25]">
              <div className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                <span className="font-serif text-base font-bold text-[#173D32] block mb-1">1. Satya (Truth)</span>
                <p className="text-[#342B25]/80 font-light">Academic truthfulness in clinical trials, examination evaluations, and diagnostic assessments.</p>
              </div>
              <div className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                <span className="font-serif text-base font-bold text-[#173D32] block mb-1">2. Karuna (Compassion)</span>
                <p className="text-[#342B25]/80 font-light">Empathic patient care treating the soul and doshas rather than just the symptoms.</p>
              </div>
              <div className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                <span className="font-serif text-base font-bold text-[#173D32] block mb-1">3. Shrama (Diligence)</span>
                <p className="text-[#342B25]/80 font-light">Enduring commitment to clinical rounds, classical Samhita study, and herbal preparation.</p>
              </div>
              <div className="p-4 rounded bg-[#F6F2E9] border border-[#C5A46D]/20">
                <span className="font-serif text-base font-bold text-[#173D32] block mb-1">4. Samanvaya (Synthesis)</span>
                <p className="text-[#342B25]/80 font-light">Harmonious synthesis of ancient Ayurvedic philosophy with 21st-century diagnostic technologies.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
