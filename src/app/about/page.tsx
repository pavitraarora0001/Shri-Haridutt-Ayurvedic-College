import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { INSTITUTION_INFO } from '@/lib/data';
import { ShieldCheck, HeartHandshake, BookOpen, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="About Shri Haridutt Ayurvedic Medical College"
        subtitle="Vedic Heritage × Modern Academic Rigour"
        crumbs={[{ label: 'About Us' }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Section 1: Legacy Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                Historical Benchmark
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173D32] leading-tight">
                An Educational Sanctuary for Classical Ayurvedic Science
              </h2>
              <p className="text-sm sm:text-base text-[#342B25]/85 leading-relaxed font-light">
                Established with a sacred mandate to resurrect and systematize India's ancient healing heritage, <strong>{INSTITUTION_INFO.name}</strong> is one of Northern India's premier academic centers for Ayurvedic medical education. 
              </p>
              <p className="text-sm sm:text-base text-[#342B25]/85 leading-relaxed font-light">
                Recognised by the National Commission for Indian System of Medicine (NCISM), Ministry of AYUSH, Govt. of India, our college provides an immersive Gurukul-inspired academic campus alongside modern clinical wards, digital diagnostics, and pharmacological testing equipment.
              </p>

              <div className="p-4 bg-white rounded-lg border-l-4 border-[#C5A46D] shadow-sm">
                <p className="font-serif text-sm italic text-[#173D32]">
                  "{INSTITUTION_INFO.sanskritMotto}"
                </p>
                <p className="text-xs text-[#81917A] mt-1">
                  Our guiding mantra — Dedicating every diagnostic step, herbal decoction, and therapeutic procedure toward the universal alleviation of human suffering.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-lg overflow-hidden border-2 border-[#C5A46D]/50 shadow-luxury">
                <img
                  src="/images/ayurveda/ancient-heritage/vedic-courtyard-colonnade.webp"
                  alt="Shri Haridutt Ayurvedic College Heritage Courtyard and Colonnade"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Core Institutional Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-[#C5A46D]/30 shadow-card">
              <div className="w-12 h-12 rounded-lg bg-[#173D32] text-[#C5A46D] flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#173D32] mb-3">Authentic Samhita Mastery</h3>
              <p className="text-xs text-[#342B25]/80 leading-relaxed font-light">
                Uncompromising textual study of Charaka, Sushruta and Vagbhata in their original Sanskrit, coupled with clinical relevance to modern physiology and pathology.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-[#C5A46D]/30 shadow-card">
              <div className="w-12 h-12 rounded-lg bg-[#173D32] text-[#C5A46D] flex items-center justify-center mb-6">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#173D32] mb-3">Clinical Compassion</h3>
              <p className="text-xs text-[#342B25]/80 leading-relaxed font-light">
                Bedside learning in our attached 100-bed hospital treating rural and regional patients with holistic Panchakarma therapies and compassionate bedside care.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-[#C5A46D]/30 shadow-card">
              <div className="w-12 h-12 rounded-lg bg-[#173D32] text-[#C5A46D] flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#173D32] mb-3">Scientific Innovation</h3>
              <p className="text-xs text-[#342B25]/80 leading-relaxed font-light">
                Active pharmacognostic standardization, herb-mineral analysis, and peer-reviewed research advancing global acceptance of Ayurvedic protocols.
              </p>
            </div>
          </div>

          {/* Section 3: Subpage Links */}
          <div className="bg-[#173D32] text-white p-8 rounded-lg border-2 border-[#C5A46D]/50 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Explore Leadership & Academic Structure
              </h3>
              <p className="text-xs text-[#F6F2E9]/80 mt-1">
                Meet our governing body, read messages from the Chairman and Principal, or trace our historical milestones.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/about/vision-mission"
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#173D32] bg-[#C5A46D] hover:bg-[#DFCA9E] rounded transition-colors"
              >
                Vision & Mission
              </Link>
              <Link
                href="/about/principals-message"
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white border border-[#C5A46D]/50 hover:bg-[#0F2821] rounded transition-colors"
              >
                Principal's Desk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
