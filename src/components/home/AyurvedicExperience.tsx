'use client';

import React from 'react';
import Link from 'next/link';
import SectionTitle from '@/components/common/SectionTitle';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion/ScrollReveal';
import { FloatingLeaf, BotanicalSprig } from '@/components/motion/BotanicalGraphics';
import { Leaf, FlaskConical, Stethoscope, BookOpen, Microscope, ArrowRight } from 'lucide-react';

export default function AyurvedicExperience() {
  const experiences = [
    {
      icon: Leaf,
      title: 'Charak Vatika Medicinal Garden',
      tag: 'Botany & Dravyaguna',
      description: 'A 5-acre living herbarium nurturing 350+ authenticated medicinal herbs, rare Western Ghats taxa, and aromatic shrubs for in-situ pharmacognostic study.',
      image: '/images/ayurveda/botanical-gardens/herbal-garden-landscape.webp',
      link: '/infrastructure/herbal-garden',
    },
    {
      icon: FlaskConical,
      title: 'Rasa Shastra Pilot Pharmacy',
      tag: 'Alchemy & Pharmaceutics',
      description: 'GMP-compliant practical laboratory where students master classical calcination (Marana), purification (Shodhana), and authentic oil extractions.',
      image: '/images/ayurveda/medicine-preparation/stone-mortar-pestle-leaves.webp',
      link: '/infrastructure/laboratories',
    },
    {
      icon: Stethoscope,
      title: '100-Bed Multi-Specialty Hospital',
      tag: 'Clinical Bedside Rigour',
      description: 'Serving over 45,000 OPD patients annually with specialized units in Panchakarma, Kshara Sutra surgery, Garbhini care, and Netra Kriyakalpa.',
      image: '/images/ayurveda/panchakarma/traditional-panchakarma-suite.webp',
      link: '/infrastructure/hospital',
    },
    {
      icon: BookOpen,
      title: 'Vedic Samhita Scholarly Tradition',
      tag: 'Ancient Epistemology',
      description: 'Deep line-by-line recitation and conceptual dissection of Charaka and Sushruta Samhitas under revered Sanskrit scholars and veteran Vaidyas.',
      image: '/images/ayurveda/manuscripts/ancient-ayurveda-manuscript.webp',
      link: '/departments',
    },
    {
      icon: Microscope,
      title: 'Evidence-Based Research Cell',
      tag: 'Innovation & Trials',
      description: 'Active investigations into herb-mineral nano-particles, antimicrobial phytochemicals, and clinical trials published in peer-reviewed AYUSH journals.',
      image: '/images/ayurveda/research/botanical-herbarium-specimen.webp',
      link: '/research',
    },
  ];

  return (
    <section className="py-24 bg-[#F6F2E9] relative overflow-hidden">
      {/* Decorative Botanical Accents */}
      <FloatingLeaf className="top-12 left-10 text-[#C5A46D] opacity-25 hidden lg:block" size={40} duration={8} delay={0.8} />
      <BotanicalSprig className="absolute bottom-4 left-4 opacity-20 hidden xl:block" width={160} height={100} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionTitle
            subtitle="The Living Tradition"
            title="The Ayurvedic Academic Experience"
            description="Education at Shri Haridutt is not confined to lecture halls. It is an immersive intellectual and spiritual journey through herbal sanctuaries, alchemical pharmacies, and patient healing sanctums."
          />
        </ScrollReveal>

        {/* Feature Grid with Staggered Entrance */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <StaggerItem key={index}>
                <div className="bg-white rounded-lg border border-[#C5A46D]/30 shadow-card overflow-hidden hover:shadow-luxury hover:border-[#C5A46D] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group h-full">
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#173D32]/80 via-transparent to-transparent pointer-events-none" />
                      
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                        <span className="inline-flex items-center text-[#C5A46D] font-medium bg-[#0F2821]/80 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider backdrop-blur-sm">
                          {exp.tag}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#C5A46D] text-[#173D32] flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-serif text-lg font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-[#342B25]/80 leading-relaxed font-light">
                        {exp.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={exp.link}
                      className="group/link inline-flex items-center text-xs font-semibold text-[#173D32] hover:text-[#C5A46D] transition-colors"
                    >
                      <span>Explore Component</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#C5A46D] group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            );
          })}

          {/* Special Experience Epigraph Card */}
          <StaggerItem>
            <div className="bg-[#173D32] rounded-lg border-2 border-[#C5A46D] p-8 flex flex-col justify-between text-white shadow-gold h-full relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D]">
                  Ayurveda Sanskrit Epigraph
                </span>
                <h3 className="font-serif text-2xl font-bold leading-tight text-white group-hover:text-[#DFCA9E] transition-colors">
                  "हिताहितं सुखं दुःखमायुस्तस्य हिताहितम्। मानं च तच्च यत्रोक्तमायुर्वेदः स उच्यते॥"
                </h3>
                <p className="text-xs text-[#F6F2E9]/80 font-light leading-relaxed">
                  Ayurveda is the sacred science describing the beneficial and unbeneficial, the happy and sorrowful states of life, together with what is wholesome and unwholesome for longevity.
                  <br /><span className="text-[#C5A46D] font-serif italic mt-1 block">— Charaka Samhita, Sutrasthana 1.41</span>
                </p>
              </div>

              <div className="pt-6 border-t border-[#C5A46D]/30 relative z-10">
                <Link
                  href="/knowledge-hub"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded bg-gradient-to-r from-[#DFCA9E] to-[#C5A46D] text-[#173D32] text-xs uppercase tracking-wider font-semibold hover:shadow-gold hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Browse Digital Herbarium</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
