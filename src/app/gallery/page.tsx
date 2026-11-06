'use client';

import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from '@/components/common/PageHeader';
import { 
  Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon,
  Sparkles, Download, Layers, Eye
} from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  url: string;
  caption: string;
}

const GALLERY_DATA: GalleryItem[] = [
  // Campus & Architecture
  {
    id: 1,
    title: 'Monolithic Heritage Stone Colonnade',
    category: 'Campus & Architecture',
    url: '/images/ayurveda/ancient-heritage/heritage-stone-architecture.webp',
    caption: 'Classical stone arches inspired by ancient Taxila and Nalanda architectural treatises, housing our academic halls.',
  },
  {
    id: 2,
    title: 'Vedic Central Courtyard & Cloister Grounds',
    category: 'Campus & Architecture',
    url: '/images/ayurveda/ancient-heritage/vedic-courtyard-colonnade.webp',
    caption: 'Serene academic courtyard bathed in morning sunlight, designed according to Vastu Vidya principles.',
  },
  {
    id: 3,
    title: 'Carved Sandstone Pillars & Sanctum Portico',
    category: 'Campus & Architecture',
    url: '/images/ayurveda/ancient-heritage/carved-stone-pillars.webp',
    caption: 'Hand-carved ornate sandstone pillars representing Indian medicinal flora and Vedic iconography.',
  },
  {
    id: 4,
    title: 'Traditional Wooden Archway & Scholar Portal',
    category: 'Campus & Architecture',
    url: '/images/ayurveda/ancient-heritage/heritage-wooden-archway.webp',
    caption: 'Teakwood architectural gateway leading into the Saraswati Central Library and Research wing.',
  },

  // Hospital & Panchakarma
  {
    id: 5,
    title: 'Traditional Panchakarma Therapy Suite',
    category: 'Hospital & Panchakarma',
    url: '/images/ayurveda/panchakarma/traditional-panchakarma-suite.webp',
    caption: 'Specialized therapy chamber fitted with carved teakwood Droni and copper vessels for classical shodhana therapies.',
  },
  {
    id: 6,
    title: 'Authentic Shirodhara Bronze Vessel Sanctum',
    category: 'Hospital & Panchakarma',
    url: '/images/ayurveda/panchakarma/shirodhara-bronze-vessel.webp',
    caption: 'Continuous rhythmic stream of medicated oil for psychosomatic balance and neurological rejuvenation.',
  },
  {
    id: 7,
    title: 'Carved Teakwood Panchakarma Droni Bed',
    category: 'Hospital & Panchakarma',
    url: '/images/ayurveda/panchakarma/panchakarma-droni-suite.webp',
    caption: 'Specially seasoned wooden table configured for Sarvanga Abhyanga, Pizhichil, and Parisheka treatments.',
  },
  {
    id: 8,
    title: 'Classical Medicated Taila & Herbal Formulation Bar',
    category: 'Hospital & Panchakarma',
    url: '/images/ayurveda/panchakarma/ayurvedic-medicated-oils.webp',
    caption: 'Pure virgin sesame oil infusions with Bala, Ashwagandha, and Dashamula tailored for clinical patients.',
  },
  {
    id: 9,
    title: 'Abhyanga Herbal Synchronized Massage Sanctum',
    category: 'Hospital & Panchakarma',
    url: '/images/ayurveda/panchakarma/abhyanga-therapy-herbs.webp',
    caption: 'Synchronized full-body therapeutic oleation administered by trained Ayurvedic nursing personnel.',
  },
  {
    id: 10,
    title: 'Clinical Shirodhara Neuro-Rejuvenation Procedure',
    category: 'Hospital & Panchakarma',
    url: '/images/ayurveda/panchakarma/shirodhara-authentic-treatment.webp',
    caption: 'Clinical demonstration and treatment of chronic migraines and stress disorders under expert guidance.',
  },

  // Charak Vatika Herbarium
  {
    id: 11,
    title: 'Charak Vatika 5-Acre Botanical Garden Sanctuary',
    category: 'Charak Vatika Herbarium',
    url: '/images/ayurveda/botanical-gardens/charak-vatika-botanical.webp',
    caption: 'Over 350 authenticated species of rare medicinal plants cultivated for teaching, herbarium study, and research.',
  },
  {
    id: 12,
    title: 'Sunlit Botanical Canopy & Dravyaguna Walking Trail',
    category: 'Charak Vatika Herbarium',
    url: '/images/ayurveda/botanical-gardens/sunlit-herbal-canopy.webp',
    caption: 'Shaded arboretum trails with mature Arjuna, Neem, Amalaki, and Haritaki trees for field identification.',
  },
  {
    id: 13,
    title: 'Dew-Covered Medicinal Foliage & Living Herbarium',
    category: 'Charak Vatika Herbarium',
    url: '/images/ayurveda/botanical-gardens/dewy-ayurvedic-foliage.webp',
    caption: 'Macro view of pristine therapeutic leaves harvested at dawn according to classical collection rules (Ritu Charya).',
  },
  {
    id: 14,
    title: 'Medicinal Plant Conservation Sanctuary & Nursery',
    category: 'Charak Vatika Herbarium',
    url: '/images/ayurveda/botanical-gardens/medicinal-plant-sanctuary.webp',
    caption: 'Greenhouse beds preserving endangered Himalayan and arid-zone medicinal flora under controlled microclimates.',
  },
  {
    id: 15,
    title: 'Herbal Garden Landscape & Irrigation Network',
    category: 'Charak Vatika Herbarium',
    url: '/images/ayurveda/botanical-gardens/herbal-garden-landscape.webp',
    caption: 'Panoramic view of the demonstration botanical garden attached to the Department of Dravyaguna.',
  },

  // Pharmacy & Research Labs
  {
    id: 16,
    title: 'Rasa Shastra Mortar & Traditional Khalva Yantra',
    category: 'Pharmacy & Research Labs',
    url: '/images/ayurveda/medicine-preparation/stone-mortar-pestle-leaves.webp',
    caption: 'Granite Khalva Yantra utilized for micro-trituration (Bhavana) of herbomineral formulations and Bhasmas.',
  },
  {
    id: 17,
    title: 'Ayurvedic Pharmacognosy & Phytochemical Testing Lab',
    category: 'Pharmacy & Research Labs',
    url: '/images/ayurveda/research/ayurvedic-pharmacognosy-lab.webp',
    caption: 'Modern spectrophotometers, HPTLC units, and microscopes ensuring quality control of raw medicinal drugs.',
  },
  {
    id: 18,
    title: 'Dried Roots & Herbal Raw Drug Repository',
    category: 'Pharmacy & Research Labs',
    url: '/images/ayurveda/medicine-preparation/dried-roots-wooden-bowls.webp',
    caption: 'Systematic classification of genuine roots, barks, and seeds in the Dravyaguna raw drug museum.',
  },
  {
    id: 19,
    title: 'Copper Vessel Decoction (Kwatha) Preparation',
    category: 'Pharmacy & Research Labs',
    url: '/images/ayurveda/medicine-preparation/copper-vessel-ayurvedic-decoction.webp',
    caption: 'Controlled slow-heat reduction of aqueous herbal decoctions following classical Sharangadhara Samhita standards.',
  },
  {
    id: 20,
    title: 'Herbal Oil Infusion & Sneha Kalpana Unit',
    category: 'Pharmacy & Research Labs',
    url: '/images/ayurveda/medicine-preparation/herbal-oil-infusion.webp',
    caption: 'Large-scale pharmaceutical manufacturing of Taila and Ghrita for the in-house hospital indoor wards.',
  },
  {
    id: 21,
    title: 'Phytochemical Extract Chromatographic Analysis',
    category: 'Pharmacy & Research Labs',
    url: '/images/ayurveda/research/phytochemical-extract-analysis.webp',
    caption: 'Standardization and active biomarker profiling of classical Ayurvedic polyherbal formulations.',
  },

  // Classical Scriptures & Heritage
  {
    id: 22,
    title: 'Palm-Leaf Ayurvedic Medical Scripture (Tala-Patra)',
    category: 'Classical Scriptures & Heritage',
    url: '/images/ayurveda/manuscripts/palm-leaf-ayurveda-scripture.webp',
    caption: 'Centuries-old Palm-leaf manuscript preserving classical Sanskrit shlokas and clinical diagnoses.',
  },
  {
    id: 23,
    title: 'Sanskrit Charaka Samhita Classical Treatise',
    category: 'Classical Scriptures & Heritage',
    url: '/images/ayurveda/manuscripts/sanskrit-charaka-treatise.webp',
    caption: 'Manuscript preservation corner in the Central Saraswati Library containing rare Samhita commentaries.',
  },
  {
    id: 24,
    title: 'Sushruta Samhita Shalya Surgical Instruments Chart',
    category: 'Classical Scriptures & Heritage',
    url: '/images/ayurveda/manuscripts/sushruta-shalya-surgical-instruments.webp',
    caption: 'Comparative display of ancient surgical Yantras and Shastras alongside modern Shalya Tantra equipment.',
  },
];

const CATEGORIES = [
  'ALL',
  'Campus & Architecture',
  'Hospital & Panchakarma',
  'Charak Vatika Herbarium',
  'Pharmacy & Research Labs',
  'Classical Scriptures & Heritage',
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const filteredItems = selectedCategory === 'ALL'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setCurrentIndex(null);
  };

  const showPrev = useCallback(() => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
  }, [currentIndex, filteredItems.length]);

  const showNext = useCallback(() => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
  }, [currentIndex, filteredItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, showPrev, showNext]);

  return (
    <div className="bg-[#F6F2E9] min-h-screen text-[#342B25]">
      <PageHeader
        title="Campus Visual Archive"
        subtitle="A Photographic Tour Through Ancient Vedic Splendour, Botanical Sanctuaries & Clinical Excellence"
        crumbs={[{ label: 'Faculty & Campus', href: '/faculty' }, { label: 'Photo Gallery' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Intro Overview Banner */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-[#173D32] to-[#0F2821] rounded-xl text-white shadow-card border border-[#C5A46D]/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C5A46D]/20 text-[#DFCA9E] text-xs font-semibold tracking-wider uppercase border border-[#C5A46D]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Authentic Photographic Dossier</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
              Vedic Heritage × Modern Medical Sanctums
            </h2>
            <p className="text-xs sm:text-sm text-[#F6F2E9]/80 max-w-2xl font-light leading-relaxed">
              Explore the sprawling academic campus, 100-bed attached hospital, Dravyaguna Charak Vatika herbal forest, high-tech pharmacognosy research laboratories, and rare Sanskrit manuscript collections.
            </p>
          </div>

          <div className="shrink-0 flex items-center space-x-3 bg-white/10 px-5 py-3 rounded-lg border border-white/15 text-center">
            <Layers className="w-5 h-5 text-[#C5A46D]" />
            <div className="text-left">
              <span className="block font-serif text-lg font-bold text-white leading-none">24 Frames</span>
              <span className="text-[10px] text-[#C5A46D] uppercase tracking-wider">5 Specialized Sanctuaries</span>
            </div>
          </div>
        </div>

        {/* Filter Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {CATEGORIES.map((cat) => {
            const count = cat === 'ALL'
              ? GALLERY_DATA.length
              : GALLERY_DATA.filter((i) => i.category === cat).length;

            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentIndex(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 flex items-center space-x-2 border shadow-sm ${
                  isSelected
                    ? 'bg-[#173D32] text-[#DFCA9E] border-[#C5A46D] shadow-gold'
                    : 'bg-white text-[#342B25] border-[#C5A46D]/30 hover:bg-[#173D32]/10 hover:border-[#C5A46D]'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-[#C5A46D] text-[#173D32]' : 'bg-[#173D32]/10 text-[#173D32]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group bg-white rounded-xl overflow-hidden border border-[#C5A46D]/30 shadow-card hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#173D32]">
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2821]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-[#0F2821]/85 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#C5A46D] border border-[#C5A46D]/40 shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Expand Overlay Button */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#173D32]/85 text-[#C5A46D] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-white text-[11px] font-medium flex items-center bg-black/60 px-2 py-0.5 rounded">
                  <Eye className="w-3 h-3 mr-1 text-[#C5A46D]" />
                  <span>Enlarge</span>
                </div>
              </div>

              {/* Title & Caption */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-serif text-base font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#342B25]/80 leading-relaxed font-light mt-1.5">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal Dialog */}
        {currentIndex !== null && (
          <div 
            className="fixed inset-0 z-50 bg-[#0A1612]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={closeLightbox}
          >
            <div 
              className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Controls Top Bar */}
              <div className="w-full flex items-center justify-between pb-3 text-white border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono font-bold text-[#C5A46D] bg-[#173D32] px-2.5 py-1 rounded border border-[#C5A46D]/40">
                    {currentIndex + 1} / {filteredItems.length}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-white/80 hidden sm:inline">
                    {filteredItems[currentIndex].category}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <a
                    href={filteredItems[currentIndex].url}
                    download
                    className="p-2 rounded-full bg-white/10 text-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#173D32] transition-colors"
                    title="Download Original High-Res Image"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <button
                    onClick={closeLightbox}
                    className="p-2 rounded-full bg-white/10 text-white hover:bg-rose-600 transition-colors"
                    title="Close (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image Container */}
              <div className="relative w-full flex items-center justify-center py-4 my-auto overflow-hidden">
                <img
                  src={filteredItems[currentIndex].url}
                  alt={filteredItems[currentIndex].title}
                  className="max-h-[68vh] max-w-full rounded-lg object-contain shadow-2xl border border-[#C5A46D]/40"
                />

                {/* Left Arrow */}
                <button
                  onClick={showPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-[#C5A46D] hover:text-[#173D32] transition-colors border border-white/20"
                  title="Previous (Left Arrow)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={showNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-[#C5A46D] hover:text-[#173D32] transition-colors border border-white/20"
                  title="Next (Right Arrow)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Image Footer Caption */}
              <div className="w-full bg-[#0F2821] p-4 rounded-b-lg border-t border-[#C5A46D]/30 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#DFCA9E]">
                    {filteredItems[currentIndex].title}
                  </h4>
                  <p className="text-xs text-[#F6F2E9]/80 font-light mt-0.5 max-w-3xl">
                    {filteredItems[currentIndex].caption}
                  </p>
                </div>
                <div className="text-[11px] text-[#81917A] shrink-0 font-sans">
                  Use ← and → keys to navigate · Esc to close
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
