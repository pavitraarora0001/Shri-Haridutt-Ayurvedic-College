'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import { HERBAL_PLANTS } from '@/lib/data';
import { Leaf, Search, AlertTriangle, ShieldCheck, Filter } from 'lucide-react';

export default function KnowledgeHubPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'Rasayana & Medhya', 'Jwarahara & Rasayana', 'Medhya (Brain Tonic)', 'Stree Rogahara & Balya', 'Rasayana & Chakshushya', 'Swasahara & Krimighna'];

  const filteredHerbs = HERBAL_PLANTS.filter((h) => {
    const matchesSearch =
      h.sanskritName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.botanicalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.therapeuticUses.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || h.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <PageHeader
        title="Digital Ayurveda Knowledge Hub"
        subtitle="Dravyaguna Materia Medica & Plant Herbarium"
        crumbs={[{ label: 'Knowledge Hub' }]}
        bgImage="/images/ayurveda/medicine-preparation/dried-roots-wooden-bowls.webp"
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Introductory & Disclaimer Note */}
          <div className="bg-white p-8 rounded-lg border border-[#C5A46D]/40 shadow-card space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
              Botanical Taxonomy & Classical Pharmacodynamics
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32]">
              Charak Vatika Living Herbarium Directory
            </h2>
            <p className="text-xs sm:text-sm text-[#342B25]/85 leading-relaxed font-light">
              Welcome to the digital herbarium curated by the scholars and professors of the <strong>Department of Dravyaguna Vijnana</strong>. Each botanical entry contains authenticated taxonomic parameters, classical Rasa-Panchaka profiles, and therapeutic correlations cited in the Charaka Samhita, Sushruta Samhita, and Bhavaprakasha Nighantu.
            </p>

            <div className="p-4 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Academic Disclaimer:</strong> The botanical and therapeutic descriptions presented here are strictly for educational and academic instruction for undergraduate and postgraduate scholars. They do not constitute medicinal advice or self-medication recommendations.
              </span>
            </div>
          </div>

          {/* Interactive Search & Filter Controls */}
          <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#81917A] absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search herb (Ashwagandha, Tulsi, Withania...)"
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C5A46D]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs text-[#173D32] font-semibold flex items-center mr-1">
                <Filter className="w-3.5 h-3.5 mr-1 text-[#C5A46D]" /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded text-[11px] font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#173D32] text-white border border-[#C5A46D]'
                      : 'bg-[#F6F2E9] text-[#342B25] hover:bg-[#173D32] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Herbs Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredHerbs.map((herb) => (
              <div
                key={herb.id}
                className="bg-white rounded-lg border border-[#C5A46D]/30 overflow-hidden shadow-card hover:shadow-luxury hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={herb.imageUrl}
                      alt={herb.sanskritName}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#173D32]/90 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-[#173D32]/90 border border-[#C5A46D]/40 text-[#C5A46D] px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">
                      {herb.category}
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <p className="text-xs text-[#C5A46D] italic font-serif">
                        {herb.botanicalName} ({herb.family})
                      </p>
                      <h3 className="font-serif text-xl font-bold leading-tight">
                        {herb.sanskritName}
                      </h3>
                      <p className="text-[11px] text-[#F6F2E9]/80">{herb.commonName}</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Rasa Panchaka Metric Table */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#F6F2E9] p-3 rounded border border-[#C5A46D]/20">
                      <div>
                        <span className="font-semibold text-[#173D32] block">Rasa (Taste):</span>
                        <span className="text-[#342B25]/80">{herb.rasa}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#173D32] block">Virya (Potency):</span>
                        <span className="text-[#342B25]/80">{herb.virya}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#173D32] block">Guna (Qualities):</span>
                        <span className="text-[#342B25]/80">{herb.guna}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#173D32] block">Vipaka (Post-Digestive):</span>
                        <span className="text-[#342B25]/80">{herb.vipaka}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#173D32] uppercase tracking-wider mb-1">
                        Therapeutic Properties:
                      </h4>
                      <p className="text-xs text-[#342B25]/80 leading-relaxed font-light">
                        {herb.therapeuticUses}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#C5A46D]/20 text-[11px] text-[#81917A]">
                      <strong>Habitat in Vatika:</strong> {herb.habitat}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="w-full text-center py-2 rounded bg-[#F6F2E9] text-[10px] text-[#173D32] font-semibold uppercase tracking-wider border border-[#C5A46D]/20">
                    Authenticated Taxonomic Record
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
