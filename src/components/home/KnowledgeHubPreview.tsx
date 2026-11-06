'use client';

import React from 'react';
import Link from 'next/link';
import { HERBAL_PLANTS } from '@/lib/data';
import SectionTitle from '@/components/common/SectionTitle';
import { Leaf, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion/ScrollReveal';
import { FloatingLeaf, BotanicalSprig } from '@/components/motion/BotanicalGraphics';

export default function KnowledgeHubPreview() {
  return (
    <section className="py-24 bg-white relative border-b border-[#C5A46D]/20 overflow-hidden">
      {/* Decorative Botanical Leaf in Corner */}
      <div className="absolute -bottom-10 -left-10 pointer-events-none opacity-30">
        <BotanicalSprig className="w-52 h-52 -rotate-45" />
      </div>
      <FloatingLeaf className="top-16 right-16 w-8 h-8 opacity-25" duration={15} delay={1} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionTitle
            subtitle="Dravyaguna Herbarium"
            title="Digital Ayurveda Knowledge Hub"
            description="Curated by our Dravyaguna Vijnana scholars from our 5-acre Charak Vatika botanical conservatory. Explore classical Ayurvedic pharmacodynamics (Rasa-Panchaka) and medicinal properties."
          />
        </ScrollReveal>

        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {HERBAL_PLANTS.slice(0, 3).map((herb) => (
            <StaggerItem key={herb.id} className="h-full">
              <div
                className="bg-[#F6F2E9] rounded-lg border border-[#C5A46D]/30 overflow-hidden shadow-card hover:shadow-luxury hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-[#173D32]">
                    <img
                      src={herb.imageUrl}
                      alt={herb.sanskritName}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#173D32]/85 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 bg-[#173D32]/90 border border-[#C5A46D]/40 text-[#C5A46D] px-2.5 py-0.5 rounded text-[10px] font-medium tracking-wide uppercase shadow-sm">
                      {herb.category}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <p className="text-xs text-[#C5A46D] italic font-serif">
                        {herb.botanicalName} ({herb.family})
                      </p>
                      <h3 className="font-serif text-lg font-bold leading-tight">
                        {herb.sanskritName}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3 rounded border border-[#C5A46D]/20 shadow-xs">
                      <div>
                        <span className="font-semibold text-[#173D32]">Rasa (Taste): </span>
                        <span className="text-[#342B25]/80">{herb.rasa}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#173D32]">Virya (Potency): </span>
                        <span className="text-[#342B25]/80">{herb.virya}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#173D32]">Guna (Property): </span>
                        <span className="text-[#342B25]/80">{herb.guna}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#173D32]">Vipaka: </span>
                        <span className="text-[#342B25]/80">{herb.vipaka}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#342B25]/80 leading-relaxed font-light">
                      {herb.therapeuticUses}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href="/knowledge-hub"
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded bg-white hover:bg-[#173D32] text-[#173D32] hover:text-white border border-[#C5A46D]/40 hover:border-[#173D32] transition-all duration-300 shadow-sm group/btn"
                  >
                    <Leaf className="w-3.5 h-3.5 mr-1.5 text-[#C5A46D] transform group-hover/btn:rotate-12 transition-transform duration-300" />
                    <span>View Herbarium Dossier</span>
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Disclaimer Strip */}
        <ScrollReveal delay={0.15}>
          <div className="mt-10 p-4 rounded-lg bg-[#F6F2E9] border border-[#C5A46D]/30 flex items-start space-x-3 text-xs text-[#342B25]/80">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              <strong>Academic Disclaimer:</strong> The botanical and therapeutic descriptions presented in this knowledge repository are strictly intended for educational, academic, and research purposes for undergraduate scholars. They do not constitute medical prescriptions. Patients must consult certified registered Vaidyas at our OPD for diagnosis and personalized treatment regimens.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-8 text-center">
          <Link
            href="/knowledge-hub"
            className="inline-flex items-center text-xs uppercase tracking-wider font-semibold text-[#173D32] hover:text-[#C5A46D] transition-colors group"
          >
            <span>Explore Complete Charak Vatika Herbarium Directory (350+ Species)</span>
            <ArrowRight className="w-4 h-4 ml-1.5 text-[#C5A46D] transform group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
