import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { BookOpen, Search, Laptop, ShieldCheck, Sparkles } from 'lucide-react';

export default function LibraryPage() {
  return (
    <div>
      <PageHeader
        title="Saraswati Central Library"
        subtitle="Classical Treatise Archive & Digital Manuscript Vault"
        crumbs={[{ label: 'Infrastructure', href: '/infrastructure' }, { label: 'Library' }]}
        bgImage="/images/ayurveda/manuscripts/palm-leaf-ayurveda-scripture.webp"
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <span className="font-serif text-3xl font-bold text-[#173D32] block">12,500+</span>
              <span className="text-xs text-[#81917A] uppercase tracking-wider mt-1 block">Volumes & Texts</span>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <span className="font-serif text-3xl font-bold text-[#173D32] block">25+</span>
              <span className="text-xs text-[#81917A] uppercase tracking-wider mt-1 block">National & Int'l Journals</span>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <span className="font-serif text-3xl font-bold text-[#173D32] block">150+</span>
              <span className="text-xs text-[#81917A] uppercase tracking-wider mt-1 block">Reading Seating</span>
            </div>
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card text-center">
              <span className="font-serif text-3xl font-bold text-[#173D32] block">20+</span>
              <span className="text-xs text-[#81917A] uppercase tracking-wider mt-1 block">Digital Terminals</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                Scholarly Haven
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#173D32]">
                Home to Sacred Treatises, Modern Medical Literature & Delnet Databases
              </h2>
              <p className="text-sm text-[#342B25]/85 leading-relaxed font-light">
                The <strong>Saraswati Central Library</strong> is the intellectual sanctuary of the college. Spanning an expansive, climate-controlled reading hall, it houses extensive rare editions of Charaka Samhita with Chakrapanidatta commentary, Sushruta Samhita with Dalhana commentary, Ashtanga Hridaya, and the complete Ayurvedic Pharmacopoeia of India.
              </p>
              <p className="text-sm text-[#342B25]/85 leading-relaxed font-light">
                In addition to classical Sanskrit works, scholars enjoy seamless access to modern textbooks in Anatomy (Gray's, BD Chaurasia), Physiology (Guyton, Ganong), Pharmacology (K.D. Tripathi), Pathology (Robbins), and Surgery (Bailey & Love).
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg overflow-hidden border-2 border-[#C5A46D]/50 shadow-luxury">
                <img
                  src="/images/ayurveda/manuscripts/palm-leaf-ayurveda-scripture.webp"
                  alt="Saraswati Central Library Classical Scripture Archive"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
