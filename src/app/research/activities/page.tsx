import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Activity, BookOpen, Award, CheckCircle2, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research Activities & Ongoing Clinical Trials | SHAMC',
  description: 'Ongoing botanical, phytochemical, and clinical Ayurvedic research projects at Shri Haridutt Ayurvedic Medical College.',
};

const ACTIVITIES = [
  {
    title: 'Clinical Evaluation of Classical Shirodhara in Stress-Induced Insomnia (Anidra)',
    department: 'Department of Panchakarma',
    lead: 'Dr. Vaidya Kripashankar Vyas',
    status: 'Ongoing Phase-II Clinical Trial',
    summary: 'Assessing sleep latency, REM efficiency, and serum cortisol biomarkers in patients treated with medicated Brahmi-Ashwagandha Taila.',
  },
  {
    title: 'Standardization and Fingerprinting of Authentic Dravyaguna Raw Drugs',
    department: 'Department of Dravyaguna & Research Lab',
    lead: 'Dr. Alok Nath Upadhyay',
    status: 'Phytochemical Screening Active',
    summary: 'High-Performance Thin Layer Chromatography (HPTLC) profiling of wild-harvested and Charak Vatika cultivated medicinal roots.',
  },
  {
    title: 'Therapeutic Efficacy of Guggulu Formulations in Hyperlipidemia (Medoroga)',
    department: 'Department of Kayachikitsa',
    lead: 'Prof. Dr. D. N. Tripathi',
    status: 'Clinical Trial Completed · Monograph in Press',
    summary: 'Comparative multi-arm study demonstrating statistically significant reductions in LDL and triglyceride lipid profiles.',
  },
  {
    title: 'Kshara Sutra Chemical Coating Refinement & Painless Anorectal Healing',
    department: 'Department of Shalya Tantra',
    lead: 'Dr. K. L. Meena',
    status: 'Clinical Surgical Study',
    summary: 'Evaluating curcumin and Snuhi latex ratios for accelerated cut-through rate and minimal post-procedural discomfort in Bhagandara.',
  },
];

export default function ResearchActivitiesPage() {
  return (
    <div className="bg-[#F6F2E9] min-h-screen text-[#342B25]">
      <PageHeader
        title="Research Activities &amp; Ongoing Projects"
        subtitle="Botanical Standardization · Phytochemical Profiling · Evidence-Based Clinical Ayurveda"
        crumbs={[{ label: 'Research', href: '/research' }, { label: 'Activities & Projects' }]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#C5A46D] text-xs font-bold uppercase tracking-widest block">Scientific Inquiry</span>
          <h2 className="font-serif text-3xl font-bold text-[#173D32]">Active Research Endeavours</h2>
          <p className="text-xs text-[#342B25]/80 font-light">
            Bridging classical Ayurvedic Samhita principles with validated modern clinical and analytical methodologies.
          </p>
        </div>

        {/* Ethical Oversight & Research Protocol Statement */}
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg p-4 text-xs text-amber-900 flex items-start space-x-3 shadow-sm">
          <FileText className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="font-light leading-relaxed">
            <strong className="font-semibold text-amber-950">Ethical Oversight &amp; Trial Protocols:</strong> All clinical observational studies, drug evaluations, and scholar dissertations are conducted in conformity with the Institutional Ethics Committee (IEC) charter and Good Clinical Practice (GCP) norms. Departmental protocols are cataloged under institutional academic research archives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACTIVITIES.map((act, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-[#C5A46D]/30 shadow-card space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="bg-[#173D32] text-[#DFCA9E] font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                  {act.status}
                </span>
                <span className="text-[#81917A] text-[11px] font-mono">{act.department}</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#173D32] leading-tight">{act.title}</h3>
              <p className="text-xs text-[#C5A46D] font-medium">Principal Investigator: {act.lead}</p>
              <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">{act.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
