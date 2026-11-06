import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { Flower2, Leaf, Droplets, Sun, Compass, ArrowRight } from 'lucide-react';

export default function HerbalGardenPage() {
  return (
    <div>
      <PageHeader
        title="Charak Vatika — 5-Acre Herbal Sanctuary"
        subtitle="Botanical Conservatory • 350+ Identified Species"
        crumbs={[{ label: 'Infrastructure', href: '/infrastructure' }, { label: 'Herbal Garden' }]}
        bgImage="/images/ayurveda/botanical-gardens/herbal-garden-landscape.webp"
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                Living Herbarium
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#173D32]">
                Conservation, Cultivation & Pharmacognostic Field Study
              </h2>
              <p className="text-sm text-[#342B25]/85 leading-relaxed font-light">
                Spread across 5 lush, ecologically curated acres on campus, <strong>Charak Vatika</strong> is a living repository of classical Ayurvedic medicinal flora. Over 350 authenticated species—ranging from sacred trees (Vata, Ashvattha, Bilva, Ashoka) to delicate climbing shrubs and rare alpine/desert cultivars—thrive here.
              </p>
              <p className="text-sm text-[#342B25]/85 leading-relaxed font-light">
                Scholars of the Dravyaguna Vijnana department utilize the garden daily to observe morphological plant characteristics, seasonal variations (Ritucharya), flowering cycles, and collection procedures (Sangrahana Vidhi) mandated by the Ayurvedic Pharmacopoeia of India (API).
              </p>

              <div className="pt-2">
                <Link
                  href="/knowledge-hub"
                  className="inline-flex items-center px-6 py-3 text-xs uppercase tracking-wider font-semibold rounded bg-[#173D32] hover:bg-[#0F2821] text-white border border-[#C5A46D]/40 transition-colors"
                >
                  <Leaf className="w-4 h-4 mr-2 text-[#C5A46D]" />
                  <span>Explore Online Plant Herbarium Directory</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg overflow-hidden border-2 border-[#C5A46D]/50 shadow-luxury">
                <img
                  src="/images/ayurveda/botanical-gardens/charak-vatika-botanical.webp"
                  alt="Charak Vatika 5-Acre Botanical Sanctuary"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Specialized Quadrants */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card">
              <Sun className="w-6 h-6 text-[#173D32] mb-3" />
              <h4 className="font-serif text-base font-bold text-[#173D32] mb-1">Nakshatra Vana</h4>
              <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
                27 astronomical tree species correlated with celestial constellations for astrological and bio-dynamic study.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card">
              <Droplets className="w-6 h-6 text-[#173D32] mb-3" />
              <h4 className="font-serif text-base font-bold text-[#173D32] mb-1">Drip Irrigation Grid</h4>
              <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
                Water conservation network with automated drip misting preserving soil micro-nutrients without chemical fertilizers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card">
              <Flower2 className="w-6 h-6 text-[#173D32] mb-3" />
              <h4 className="font-serif text-base font-bold text-[#173D32] mb-1">Poly-House Nursery</h4>
              <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
                Temperature and humidity-controlled nursery nurturing endangered red-listed species like Sarpagandha and Guggulu.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card">
              <Compass className="w-6 h-6 text-[#173D32] mb-3" />
              <h4 className="font-serif text-base font-bold text-[#173D32] mb-1">Navagraha Quadrant</h4>
              <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
                Sacred plants associated with planetary energetics (Arka, Palash, Khadira, Apamarga, Ashvattha, Shami).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
