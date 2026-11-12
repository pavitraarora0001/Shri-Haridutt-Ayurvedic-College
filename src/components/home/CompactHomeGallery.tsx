'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Play, Maximize2, Video, Image as ImageIcon, ArrowRight, Eye, X, ChevronLeft, ChevronRight, Sparkles 
} from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  title: string;
  category: string;
  url: string;
  youtubeId?: string;
  caption: string;
}

const FEATURED_MEDIA: MediaItem[] = [
  // Video 1: Main Campus Documentary
  {
    id: 'vid-doc',
    type: 'video',
    title: 'Shri Haridutt Campus & Technology Park Documentary',
    category: 'Video Film',
    url: 'https://img.youtube.com/vi/N4w1a5PSjCg/hqdefault.jpg',
    youtubeId: 'N4w1a5PSjCg',
    caption: 'Official institutional documentary showcasing the academic blocks, hospital, and infrastructure at Technology Park, Sewar, Bharatpur.',
  },
  // Photo 1: Main Academic Facade
  {
    id: 'pho-1',
    type: 'photo',
    title: 'Technology Park Campus & Main Academic Block',
    category: 'Campus & Architecture',
    url: '/images/campus-real/colleg_photo1.jpg',
    caption: 'Front facade of the multi-storey collegiate complex accommodating lecture theaters and laboratories.',
  },
  // Photo 2: Hospital Inpatient Ward
  {
    id: 'pho-2',
    type: 'photo',
    title: 'Attached Hospital Clinical Inpatient Ward',
    category: 'Hospital & Clinical',
    url: '/images/campus-real/img_20241019_160610.jpg',
    caption: 'Round-the-clock IPD clinical facility providing authentic bedside Ayurvedic care.',
  },
  // Video 2: Infrastructure & Green Campus Tour
  {
    id: 'vid-tour',
    type: 'video',
    title: 'Academic Infrastructure & Green Campus Tour',
    category: 'Video Film',
    url: 'https://img.youtube.com/vi/YxR2E7TWGJM/hqdefault.jpg',
    youtubeId: 'YxR2E7TWGJM',
    caption: 'Architectural walkthrough of herbal gardens, lecture halls, and collegiate facilities.',
  },
  // Photo 3: Smart ICT Computer Lab
  {
    id: 'pho-3',
    type: 'photo',
    title: 'Modern High-Speed Computer & ICT Laboratory',
    category: 'Laboratories & Academics',
    url: '/images/campus-real/whatsapp_image_2025-09-01_at_13_36_30_9c58320d.jpg',
    caption: 'Digital research lab with DELNET e-library access and computing workstations for scholars.',
  },
  // Photo 4: Dravyaguna Laboratory
  {
    id: 'pho-4',
    type: 'photo',
    title: 'Dravyaguna & Pharmacognosy Science Laboratory',
    category: 'Laboratories & Academics',
    url: '/images/campus-real/gallery_(4).jpg',
    caption: 'Standardization and microscopic analysis of Ayurvedic raw herbs and botanical specimens.',
  },
  // Video 3: Classical Yoga & Asanas
  {
    id: 'vid-yoga',
    type: 'video',
    title: 'Classical Swasthavritta & Yogic Asanas Demonstration',
    category: 'Video Film',
    url: 'https://img.youtube.com/vi/wcF1hI1VQtU/hqdefault.jpg',
    youtubeId: 'wcF1hI1VQtU',
    caption: 'Scholars demonstrating classical Surya Namaskar and Pranayama on the campus greens.',
  },
  // Photo 5: Traditional Kabaddi Championship
  {
    id: 'pho-5',
    type: 'photo',
    title: 'Traditional Kabaddi Tournament Championship',
    category: 'Student Life & Sports',
    url: '/images/campus-real/gallery_(10).jpg',
    caption: 'Inter-institutional sports meet fostering physical agility, team vigor, and traditional athletics.',
  },
  // Photo 6: Medical Camp & Pulse Diagnosis
  {
    id: 'pho-6',
    type: 'photo',
    title: 'Free Ayurvedic Diagnosis & Community Health Camp',
    category: 'Hospital & Clinical',
    url: '/images/campus-real/img-20171201-wa0087_gfgfg.jpg',
    caption: 'Senior Vaidyas and scholars conducting rural community pulse examinations and medicine distribution.',
  },
  // Video 4: Cultural Drama Performance
  {
    id: 'vid-drama',
    type: 'video',
    title: 'Vedic Cultural & Social Drama in Central Auditorium',
    category: 'Video Film',
    url: 'https://img.youtube.com/vi/7x2wowT4PNc/hqdefault.jpg',
    youtubeId: '7x2wowT4PNc',
    caption: 'Annual cultural theatrical performance staged by collegiate students in the main auditorium.',
  },
  // Photo 7: Governor Campus Visit
  {
    id: 'pho-7',
    type: 'photo',
    title: 'Hon’ble Governor of Rajasthan Campus Visit',
    category: 'Events & Dignitaries',
    url: '/images/campus-real/haribhauBagde.jpg',
    caption: 'His Excellency Governor Shri Haribhau Bagde inspecting the healthcare facilities and blessing the students.',
  },
  // Photo 8: Central Academic Quadrangle
  {
    id: 'pho-8',
    type: 'photo',
    title: 'Central Academic Quadrangle & Landscaped Gardens',
    category: 'Campus & Architecture',
    url: '/images/campus-real/banner2(1).jpg',
    caption: 'Botanical landscaping and serene open courtyards designed for contemplative learning.',
  },
];

const CATEGORIES = [
  'ALL',
  'Videos',
  'Campus & Architecture',
  'Hospital & Clinical',
  'Laboratories & Academics',
  'Student Life & Sports',
];

export default function CompactHomeGallery() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedPhoto, setSelectedPhoto] = useState<MediaItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);

  const filtered = activeCategory === 'ALL'
    ? FEATURED_MEDIA
    : activeCategory === 'Videos'
    ? FEATURED_MEDIA.filter((m) => m.type === 'video')
    : FEATURED_MEDIA.filter((m) => m.category === activeCategory);

  return (
    <section id="campus-gallery" className="bg-[#FAF7F2] py-14 sm:py-20 border-b border-[#C5A46D]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#C5A46D]/20 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A46D] animate-pulse" />
              <span className="text-[#C5A46D] text-xs font-bold uppercase tracking-widest">
                Campus Visual Archives &amp; Multimedia Gallery
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#173D32]">
              Real Glimpses of Shri Haridutt Campus
            </h2>
            <p className="text-xs sm:text-sm text-[#342B25]/80 font-light max-w-2xl">
              Authentic photographs and official documentary videos from our campus situated at Technology Park, Sewar, Bharatpur.
            </p>
          </div>
          
          <Link
            prefetch={true}
            href="/gallery"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#173D32] hover:bg-[#1f4e41] text-[#DFCA9E] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-gold group self-start md:self-auto"
          >
            <ImageIcon className="w-4 h-4 text-[#C5A46D]" />
            <span>Explore Full Gallery (34+ Photos &amp; 8 Films)</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#C5A46D] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#173D32] text-[#DFCA9E] border-[#C5A46D] shadow-gold'
                    : 'bg-white text-[#342B25] border-[#C5A46D]/30 hover:bg-[#173D32]/10 hover:border-[#C5A46D]'
                }`}
              >
                {cat === 'Videos' ? '🎥 Official Video Films' : cat}
              </button>
            );
          })}
        </div>

        {/* Interactive Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filtered.map((item) => {
            const isVideo = item.type === 'video';

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (isVideo) {
                    setSelectedVideo(item);
                  } else {
                    setSelectedPhoto(item);
                  }
                }}
                className="group relative bg-white rounded-xl overflow-hidden border border-[#C5A46D]/30 shadow-card hover:shadow-2xl hover:border-[#C5A46D] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#173D32]">
                  <img
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2821]/90 via-transparent to-transparent opacity-70 group-hover:opacity-95 transition-opacity" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-[#0F2821]/85 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#C5A46D] border border-[#C5A46D]/40 shadow-sm flex items-center space-x-1">
                      {isVideo ? <Video className="w-3 h-3 mr-1 text-[#C5A46D]" /> : null}
                      <span>{item.category}</span>
                    </span>
                  </div>

                  {/* Play Button for Video or Zoom for Photo */}
                  {isVideo ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#C5A46D] text-[#173D32] flex items-center justify-center shadow-luxury transform group-hover:scale-115 transition-transform duration-300">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#173D32]/85 text-[#C5A46D] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  )}

                  {/* Action label badge */}
                  <div className="absolute bottom-3 right-3 text-white text-[11px] font-medium flex items-center bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    {isVideo ? (
                      <>
                        <Play className="w-3 h-3 mr-1 text-[#C5A46D] fill-current" />
                        <span>Watch Film</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3 mr-1 text-[#C5A46D]" />
                        <span>View Photo</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Content description */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-1.5">
                  <h3 className="font-serif text-sm font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#342B25]/75 font-light leading-relaxed line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Fast Access Banner */}
        <div className="bg-[#173D32] rounded-2xl p-6 sm:p-8 border border-[#C5A46D]/40 text-[#F6F2E9] flex flex-col md:flex-row items-center justify-between gap-6 shadow-luxury">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-[#DFCA9E]">
              Looking for High-Resolution Institutional Archives?
            </h4>
            <p className="text-xs sm:text-sm text-[#F6F2E9]/80 font-light max-w-xl">
              Browse our complete library of 34+ verified campus photographs and 8 official YouTube documentary films covering classrooms, Panchakarma hospital, herbal garden, and state-level sports events.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              prefetch={true}
              href="/gallery"
              className="px-6 py-2.5 rounded-full bg-[#C5A46D] hover:bg-[#b08e56] text-[#173D32] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-gold flex items-center space-x-2"
            >
              <ImageIcon className="w-4 h-4" />
              <span>All 34+ Photos</span>
            </Link>
            <Link
              prefetch={true}
              href="/gallery?tab=videos"
              className="px-6 py-2.5 rounded-full border border-[#C5A46D] hover:bg-[#C5A46D]/20 text-[#DFCA9E] text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center space-x-2"
            >
              <Video className="w-4 h-4 text-[#C5A46D]" />
              <span>All 8 Video Films</span>
            </Link>
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* VIDEO MODAL LIGHTBOX                                         */}
      {/* ============================================================ */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-[#173D32] border border-[#C5A46D]/50 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#C5A46D]/30 bg-[#0F2821]">
              <div className="flex items-center space-x-2">
                <Video className="w-4 h-4 text-[#C5A46D]" />
                <span className="text-xs font-bold text-[#DFCA9E] uppercase tracking-wider">
                  Official Institutional Film
                </span>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="p-4 sm:p-5 bg-[#173D32] space-y-1">
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#DFCA9E]">
                {selectedVideo.title}
              </h3>
              <p className="text-xs text-[#F6F2E9]/80 font-light">
                {selectedVideo.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* PHOTO LIGHTBOX                                               */}
      {/* ============================================================ */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#173D32] border border-[#C5A46D]/50 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#C5A46D]/30 bg-[#0F2821]">
              <span className="text-xs font-bold text-[#C5A46D] uppercase tracking-wider">
                {selectedPhoto.category}
              </span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close photo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative max-h-[70vh] bg-black flex items-center justify-center p-2">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-h-[68vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>

            <div className="p-4 sm:p-5 bg-[#173D32] space-y-1">
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#DFCA9E]">
                {selectedPhoto.title}
              </h3>
              <p className="text-xs text-[#F6F2E9]/80 font-light">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
