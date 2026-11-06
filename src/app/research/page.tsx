import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { RESEARCH_PUBLICATIONS } from '@/lib/data';
import { Microscope, FileText, ExternalLink, Award, Sparkles } from 'lucide-react';

export default function ResearchPage() {
  return (
    <div>
      <PageHeader
        title="Research & Scientific Publications"
        subtitle="Evidence-Based Ayurvedic Medicine"
        crumbs={[{ label: 'Research' }]}
        bgImage="/images/ayurveda/research/botanical-herbarium-specimen.webp"
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="bg-white p-8 rounded-lg border border-[#C5A46D]/40 shadow-card space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
              Institutional Research Cell
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#173D32]">
              Advancing Ayurveda Through Contemporary Scientific Inquiry
            </h2>
            <p className="text-sm text-[#342B25]/85 leading-relaxed font-light">
              The Research and Ethical Committee of Shri Haridutt Ayurvedic Medical College actively pursues interdisciplinary investigations into classical mineral formulations (Rasa Shastra Bhasmas), standardization of poly-herbal decoctions, randomized clinical trials in arthritis and diabetes, and phytochemical screening.
            </p>
          </div>

          {/* Publications List */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#173D32]">
              Peer-Reviewed Journal Articles
            </h3>

            <div className="space-y-4">
              {RESEARCH_PUBLICATIONS.map((pub) => (
                <div
                  key={pub.id}
                  className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card hover:shadow-luxury transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-[#173D32] text-[#C5A46D] text-[10px] uppercase font-bold tracking-wider">
                      {pub.category}
                    </span>
                    <span className="text-xs text-[#81917A] font-medium">{pub.year}</span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-[#173D32] leading-snug">
                    {pub.title}
                  </h4>

                  <p className="text-xs text-[#173D32] font-semibold">
                    Authors: <span className="font-normal text-[#342B25]/80">{pub.authors}</span>
                  </p>

                  <p className="text-xs text-[#81917A]">
                    Journal: <span className="text-[#342B25] font-medium">{pub.journal}</span> • {pub.volume}
                  </p>

                  <p className="text-xs text-[#342B25]/80 leading-relaxed font-light pt-2 border-t border-[#C5A46D]/20">
                    <strong>Abstract:</strong> {pub.abstract}
                  </p>

                  {pub.doi && (
                    <div className="pt-2 flex items-center text-[11px] text-[#C5A46D] font-medium">
                      <span>DOI: {pub.doi}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
