import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { COURSES, INSTITUTION_INFO } from '@/lib/data';
import {
  Clock,
  GraduationCap,
  Users,
  CheckCircle2,
  FileText,
  Stethoscope,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';

export default function BAMSPage() {
  const course = COURSES[0];

  const phases = [
    {
      phase: 'Phase I (18 Months)',
      title: 'Foundations of Ayurveda & Basic Sciences',
      subjects: [
        'Padartha Vijnana & Ayurveda Itihasa (Philosophical Foundations & History)',
        'Sanskrit (Linguistic grammar and translation of classical medical texts)',
        'Kriya Sharir (Human Physiology from Tridosha, Dhatu, Mala & Modern perspectives)',
        'Rachana Sharir (Human Anatomy with cadaveric dissection and Marma Sharir)',
        'Samhita Adhyayan - 1 (Charaka Samhita Sutrasthana chapters)',
      ],
    },
    {
      phase: 'Phase II (18 Months)',
      title: 'Pharmacology, Pharmaceutics & Diagnostics',
      subjects: [
        'Dravyaguna Vijnana (Ayurvedic Pharmacology, Materia Medica & Plant Identification)',
        'Rasa Shastra & Bhaishajya Kalpana (Alchemy, Mineral Processing & Ayurvedic Pharmacy)',
        'Roga Nidan & Vikriti Vijnana (Clinical Diagnostics, Nadi Pariksha & Modern Pathology)',
        'Charaka Samhita Purvardha (Indriya, Chikitsa Sthana portions)',
      ],
    },
    {
      phase: 'Phase III (18 Months)',
      title: 'Specialized Clinical Disciplines',
      subjects: [
        'Agada Tantra, Vyavahara Ayurveda & Vidhi Vaidyaka (Toxicology & Medical Jurisprudence)',
        'Swasthavritta & Yoga (Preventive Medicine, Dinacharya, Ritucharya & Yogasanas)',
        'Prasuti Tantra & Stri Roga (Obstetrics, Antenatal Care & Gynecological Disorders)',
        'Kaumarbhritya / Bala Roga (Ayurvedic Pediatrics, Neonatal Care & Suvarnaprashana)',
        'Charaka Samhita Uttarardha (Kalpa & Siddhi Sthana)',
      ],
    },
    {
      phase: 'Phase IV (Final Professional)',
      title: 'Advanced Medicine, Surgery & Panchakarma',
      subjects: [
        'Kayachikitsa (Internal Medicine, Metabolic & Neuromuscular Management)',
        'Panchakarma (Principles and clinical administration of the 5 bio-purifications)',
        'Shalya Tantra (General Surgery, Sushruta principles, Kshara Sutra & Wound Healing)',
        'Shalakya Tantra (Diseases of Eye, ENT, Oral Cavity & Cranium with Kriyakalpa)',
        'Research Methodology & Medical Statistics',
      ],
    },
  ];

  return (
    <div>
      <PageHeader
        title="Bachelor of Ayurvedic Medicine & Surgery (BAMS)"
        subtitle="Ayurvedacharya • NCISM Approved 100 Seats"
        crumbs={[{ label: 'Academics', href: '/academics/programmes' }, { label: 'BAMS' }]}
        bgImage="/images/ayurveda/courses/bams-ayurvedic-medicine.webp"
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Top Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <Clock className="w-6 h-6 text-[#173D32] mx-auto mb-2" />
              <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Duration</span>
              <span className="font-serif text-xl font-bold text-[#173D32]">5.5 Years</span>
              <span className="text-[10px] text-[#342B25]/70 block mt-0.5">(Includes 1 Yr Internship)</span>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <Users className="w-6 h-6 text-[#173D32] mx-auto mb-2" />
              <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Approved Intake</span>
              <span className="font-serif text-xl font-bold text-[#173D32]">100 Seats</span>
              <span className="text-[10px] text-[#342B25]/70 block mt-0.5">NCISM Sanctioned</span>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <GraduationCap className="w-6 h-6 text-[#173D32] mx-auto mb-2" />
              <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Annual Fee</span>
              <span className="font-serif text-xl font-bold text-[#173D32]">₹2,25,000</span>
              <span className="text-[10px] text-[#342B25]/70 block mt-0.5">Regulated State Norm</span>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <ShieldCheck className="w-6 h-6 text-[#173D32] mx-auto mb-2" />
              <span className="text-[11px] uppercase tracking-wider text-[#81917A] block">Admission Channel</span>
              <span className="font-serif text-xl font-bold text-[#173D32]">NEET-UG</span>
              <span className="text-[10px] text-[#342B25]/70 block mt-0.5">State & All-India AACCC</span>
            </div>
          </div>

          {/* Program Overview & Two-Column Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white p-8 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                  Program Vision
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#173D32]">
                  The Premier Medical Degree in Classical Ayurveda
                </h2>
                <p className="text-sm text-[#342B25]/85 leading-relaxed font-light">
                  The <strong>Bachelor of Ayurvedic Medicine and Surgery (BAMS)</strong> is a recognized undergraduate professional medical degree that empowers graduates with the title of <em>Ayurvedacharya</em>.
                </p>
                <p className="text-sm text-[#342B25]/85 leading-relaxed font-light">
                  At Shri Haridutt Ayurvedic Medical College, the curriculum harmonizes deep textual exploration of ancient Sanskrit Samhitas with standard medical diagnostics, physiology, biochemistry, pathology, pharmacology, and surgical procedures. Scholars gain clinical bedside expertise through continuous clinical postings at our 100-bedded hospital.
                </p>
              </div>

              {/* Comprehensive Phase-wise Syllabus */}
              <div className="space-y-6">
                <h3 className="font-serif text-2xl font-bold text-[#173D32]">
                  Curricular Phases & Subject Matrix
                </h3>

                <div className="space-y-4">
                  {phases.map((p, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#C5A46D]/20 gap-1">
                        <span className="font-serif text-lg font-bold text-[#173D32]">{p.phase}</span>
                        <span className="text-xs text-[#C5A46D] font-medium uppercase tracking-wider">{p.title}</span>
                      </div>
                      <ul className="space-y-2 text-xs text-[#342B25]/85">
                        {p.subjects.map((s, sIdx) => (
                          <li key={sIdx} className="flex items-start space-x-2">
                            <span className="text-[#C5A46D] font-bold mt-0.5">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compulsory Rotatory Clinical Internship */}
              <div className="bg-[#173D32] text-white p-8 rounded-lg border-2 border-[#C5A46D] shadow-luxury space-y-4">
                <div className="flex items-center space-x-3 text-[#C5A46D]">
                  <Stethoscope className="w-6 h-6" />
                  <h3 className="font-serif text-2xl font-bold">1-Year Compulsory Rotatory Internship</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#F6F2E9]/85 leading-relaxed font-light">
                  Following the successful completion of the four professional examinations, scholars undertake 12 months of intensive rotatory clinical postings across:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#F6F2E9]/90 pt-2">
                  <div className="p-3 rounded bg-[#0F2821] border border-[#C5A46D]/30">
                    <strong>Kayachikitsa (Internal Med):</strong> 6 Months
                  </div>
                  <div className="p-3 rounded bg-[#0F2821] border border-[#C5A46D]/30">
                    <strong>Panchakarma Unit:</strong> 2 Months
                  </div>
                  <div className="p-3 rounded bg-[#0F2821] border border-[#C5A46D]/30">
                    <strong>Shalya Tantra (Surgery):</strong> 2 Months
                  </div>
                  <div className="p-3 rounded bg-[#0F2821] border border-[#C5A46D]/30">
                    <strong>Prasuti & Shalakya:</strong> 1 Month
                  </div>
                  <div className="p-3 rounded bg-[#0F2821] border border-[#C5A46D]/30 col-span-1 sm:col-span-2">
                    <strong>Primary Health Center (Rural Health Post):</strong> 1 Month
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Admission Card & Career Opportunities */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-lg border-2 border-[#C5A46D]/50 shadow-luxury space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                  Admissions 2026–27
                </span>
                <h3 className="font-serif text-xl font-bold text-[#173D32]">
                  Enroll in BAMS 2026 Batch
                </h3>
                <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
                  Admissions are administered through State AYUSH Counseling and AACCC based on valid NEET-UG 2026 percentiles.
                </p>

                <div className="pt-2 flex flex-col gap-2">
                  <Link
                    href="/admissions/apply"
                    className="w-full text-center py-3 text-xs font-semibold uppercase tracking-wider text-[#173D32] bg-gradient-to-r from-[#DFCA9E] to-[#C5A46D] rounded shadow-gold hover:shadow-luxury transition-all"
                  >
                    Apply for Admission 2026 →
                  </Link>
                  <Link
                    href="/downloads"
                    className="w-full text-center py-2.5 text-xs font-semibold uppercase tracking-wider text-[#173D32] border border-[#C5A46D]/40 hover:bg-[#F6F2E9] rounded transition-all"
                  >
                    Download BAMS Prospectus (PDF)
                  </Link>
                </div>
              </div>

              {/* Career Opportunities */}
              <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-3">
                <h4 className="font-serif text-lg font-bold text-[#173D32] flex items-center">
                  <Sparkles className="w-4 h-4 text-[#C5A46D] mr-2" />
                  Career Horizons for BAMS
                </h4>
                <ul className="space-y-2 text-xs text-[#342B25]/80 font-light">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#173D32] shrink-0 mt-0.5" />
                    <span><strong>Government AYUSH Medical Officer (AMO):</strong> Gazetted state and central service roles.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#173D32] shrink-0 mt-0.5" />
                    <span><strong>Clinical Consultant Vaidya:</strong> Independent clinical practice and Panchakarma hospital management.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#173D32] shrink-0 mt-0.5" />
                    <span><strong>Higher Studies (MD / MS Ayurveda):</strong> Clinical specialization via AIAPGET.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#173D32] shrink-0 mt-0.5" />
                    <span><strong>Pharmaceutical R&D:</strong> Formulation scientist with Dabur, Himalaya, Patanjali, Baidyanath.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#173D32] shrink-0 mt-0.5" />
                    <span><strong>Global Wellness:</strong> Ayurvedic medical consultants across Europe, US, Australia, and Middle East.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
