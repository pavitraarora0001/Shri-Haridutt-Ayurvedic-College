'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PageHeader from '@/components/common/PageHeader';
import { 
  Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon,
  Sparkles, Download, Layers, Eye, Video, Play, ExternalLink, Calendar, Tag, CheckCircle2,
  AlertCircle, RotateCcw
} from 'lucide-react';

interface GalleryItem {
  id: number | string;
  title: string;
  category: string;
  url: string;
  caption: string;
}

interface VideoItem {
  id: string;
  title: string;
  youtubeId?: string;
  embedUrl: string;
  category: string;
  duration?: string;
  caption: string;
  sourceType?: 'youtube' | 'self-hosted';
  videoUrl?: string;
  thumbnailUrl?: string;
}

function parseVideoSource(url: string, title?: string): {
  sourceType: 'youtube' | 'self-hosted';
  youtubeId?: string;
  embedUrl: string;
  videoUrl?: string;
  thumbnailUrl: string;
} {
  const cleanUrl = (url || '').trim();

  // Check if self-hosted MP4, WebM or Vercel Blob URL
  if (
    cleanUrl.endsWith('.mp4') ||
    cleanUrl.endsWith('.webm') ||
    cleanUrl.includes('.blob.vercel-storage.com') ||
    cleanUrl.startsWith('/uploads/')
  ) {
    return {
      sourceType: 'self-hosted',
      videoUrl: cleanUrl,
      embedUrl: cleanUrl,
      thumbnailUrl: '/images/campus-real/banner2(1).jpg',
    };
  }

  // YouTube URL parsing:
  let youtubeId = '';
  const ytMatch = cleanUrl.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|youtube-nocookie\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    youtubeId = ytMatch[1];
  } else if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
    youtubeId = cleanUrl;
  }

  if (youtubeId) {
    return {
      sourceType: 'youtube',
      youtubeId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
      thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    };
  }

  return {
    sourceType: 'self-hosted',
    videoUrl: cleanUrl,
    embedUrl: cleanUrl,
    thumbnailUrl: '/images/campus-real/banner2(1).jpg',
  };
}

const STATIC_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Shri Haridutt College & Technology Park Campus Documentary',
    youtubeId: 'N4w1a5PSjCg',
    embedUrl: 'https://www.youtube-nocookie.com/embed/N4w1a5PSjCg?autoplay=1&rel=0&modestbranding=1&playsinline=1',
    category: 'Campus Tour',
    duration: 'Full Tour',
    caption: 'Official institutional documentary highlighting the modern academic complex, green campus, analytical laboratories, and facilities situated at Technology Park, Sewar, Bharatpur.',
    sourceType: 'youtube',
    thumbnailUrl: 'https://img.youtube.com/vi/N4w1a5PSjCg/hqdefault.jpg',
  },
  {
    id: 'vid-2',
    title: 'Technology Park Academic Infrastructure & Green Campus Tour',
    youtubeId: 'YxR2E7TWGJM',
    embedUrl: 'https://www.youtube-nocookie.com/embed/YxR2E7TWGJM?autoplay=1&rel=0&modestbranding=1&playsinline=1',
    category: 'Infrastructure',
    duration: 'Campus Overview',
    caption: 'Panoramic walkthrough of lecture halls, herbal gardens, administrative directorate, and student facilities.',
    sourceType: 'youtube',
    thumbnailUrl: 'https://img.youtube.com/vi/YxR2E7TWGJM/hqdefault.jpg',
  },
  {
    id: 'vid-3',
    title: 'Classical Yoga & Asana Demonstration at Technology Park',
    youtubeId: 'wcF1hI1VQtU',
    embedUrl: 'https://www.youtube-nocookie.com/embed/wcF1hI1VQtU?autoplay=1&rel=0&modestbranding=1&playsinline=1',
    category: 'Swasthavritta & Yoga',
    duration: 'Yoga Practical',
    caption: 'Demonstration of classical Surya Namaskar, Pranayama, and Yogasanas reflecting the Ayurvedic principles of Swasthavritta and preventive health.',
    sourceType: 'youtube',
    thumbnailUrl: 'https://img.youtube.com/vi/wcF1hI1VQtU/hqdefault.jpg',
  },
  {
    id: 'vid-4',
    title: 'Road Safety Awareness & Community Outreach Initiative',
    youtubeId: 'AjNZvDV9fAs',
    embedUrl: 'https://www.youtube-nocookie.com/embed/AjNZvDV9fAs?autoplay=1&rel=0&modestbranding=1&playsinline=1',
    category: 'Community Seva',
    duration: 'Outreach Camp',
    caption: 'Public health awareness and community civic campaign organized by the college scholars and faculty.',
    sourceType: 'youtube',
    thumbnailUrl: 'https://img.youtube.com/vi/AjNZvDV9fAs/hqdefault.jpg',
  },
  {
    id: 'vid-5',
    title: 'Annual Inter-Institutional Sports Meet & Traditional Kabaddi Match',
    youtubeId: 'DhJuZiKfxP4',
    embedUrl: 'https://www.youtube-nocookie.com/embed/DhJuZiKfxP4?autoplay=1&rel=0&modestbranding=1&playsinline=1',
    category: 'Sports & Athletics',
    duration: 'Championship',
    caption: 'High-energy traditional Kabaddi tournament match displaying vigor, physical stamina, and team spirit.',
    sourceType: 'youtube',
    thumbnailUrl: 'https://img.youtube.com/vi/DhJuZiKfxP4/hqdefault.jpg',
  },
  {
    id: 'vid-6',
    title: 'Annual Institutional Cricket Cup at Campus Grounds',
    youtubeId: 'fHWpWOMDg8c',
    embedUrl: 'https://www.youtube-nocookie.com/embed/fHWpWOMDg8c?autoplay=1&rel=0&modestbranding=1&playsinline=1',
    category: 'Sports & Athletics',
    duration: 'Tournament Match',
    caption: 'Inter-batch cricket championship organized at the campus sports grounds.',
    sourceType: 'youtube',
    thumbnailUrl: 'https://img.youtube.com/vi/fHWpWOMDg8c/hqdefault.jpg',
  },
  {
    id: 'vid-7',
    title: 'Vedic Cultural & Social Drama Performance at Campus Auditorium',
    youtubeId: '7x2wowT4PNc',
    embedUrl: 'https://www.youtube-nocookie.com/embed/7x2wowT4PNc?autoplay=1&rel=0&modestbranding=1&playsinline=1',
    category: 'Cultural Arts',
    duration: 'Theatrical Drama',
    caption: 'Poignant annual day cultural drama "Khaandaan" performed by students in the campus central auditorium.',
    sourceType: 'youtube',
    thumbnailUrl: 'https://img.youtube.com/vi/7x2wowT4PNc/hqdefault.jpg',
  },
  {
    id: 'vid-8',
    title: 'Educational Evaluation & Academic Orientation Lecture',
    youtubeId: 'PTtttnJV6mk',
    embedUrl: 'https://www.youtube-nocookie.com/embed/PTtttnJV6mk?autoplay=1&rel=0&modestbranding=1&playsinline=1',
    category: 'Academic Pedagogy',
    duration: 'Academic Lecture',
    caption: 'Comprehensive faculty and student development seminar on curriculum pedagogy, instructional evaluation, and classical teaching methodology.',
    sourceType: 'youtube',
    thumbnailUrl: 'https://img.youtube.com/vi/PTtttnJV6mk/hqdefault.jpg',
  },
];

const INITIAL_PHOTOS: GalleryItem[] = [
  // Campus & Architecture
  {
    id: 1,
    title: 'Technology Park Campus & Main Academic Block',
    category: 'Campus & Architecture',
    url: '/images/campus-real/colleg_photo1.jpg',
    caption: 'Front facade of the multi-storey academic and administrative complex situated at Technology Park, Sewar, Bharatpur.',
  },
  {
    id: 2,
    title: 'Instructional Wing & Campus Facade',
    category: 'Campus & Architecture',
    url: '/images/campus-real/shddhomepage.jpg',
    caption: 'Modern collegiate architecture accommodating lecture theaters, analytical laboratories, and seminar halls.',
  },
  {
    id: 3,
    title: 'Central Academic Quadrangle & Gardens',
    category: 'Campus & Architecture',
    url: '/images/campus-real/banner2(1).jpg',
    caption: 'Lush botanical landscaping and landscaped open grounds designed according to Vastu Vidya principles.',
  },
  {
    id: 4,
    title: 'Institutional Entrance Gate & Grand Driveway',
    category: 'Campus & Architecture',
    url: '/images/campus-real/img-20250121-wa0023.jpg',
    caption: 'Main campus portal accessible from the Agra-Jaipur Highway (NH-11 / NH-21).',
  },
  {
    id: 5,
    title: 'Academic Block & Lecture Complex',
    category: 'Campus & Architecture',
    url: '/images/campus-real/img-20250121-wa00281.jpg',
    caption: 'Well-ventilated academic wings providing a focused and disciplined pedagogical learning environment.',
  },
  {
    id: 6,
    title: 'Administrative Directorate & Entrance Plaza',
    category: 'Campus & Architecture',
    url: '/images/campus-real/img_20241019_130606.jpg',
    caption: 'Administrative reception, dean chambers, and admissions facilitation center.',
  },
  {
    id: 7,
    title: 'Campus Green Boulevard & Academic Pavilion',
    category: 'Campus & Architecture',
    url: '/images/campus-real/whatsapp_image_2025-02-07_at_11_33_02_pm.jpeg',
    caption: 'Tree-lined central campus boulevard providing a calm, eco-friendly environment for study and reflection.',
  },
  {
    id: 8,
    title: 'Collegiate Courtyard & Assembly Ground',
    category: 'Campus & Architecture',
    url: '/images/campus-real/whatsapp_image_2025-01-27_at_1_54_17_pm.jpeg',
    caption: 'Spacious central assembly quadrangle where institutional assemblies, yoga sessions, and cultural events take place.',
  },

  // Hospital & Clinical
  {
    id: 9,
    title: 'Free Ayurvedic Diagnosis & Medical Camp',
    category: 'Hospital & Clinical',
    url: '/images/campus-real/img-20171201-wa0087_gfgfg.jpg',
    caption: 'Faculty Vaidyas and intern scholars conducting community health outreach and pulse diagnosis.',
  },
  {
    id: 10,
    title: 'Community Health Outreach & Medicine Distribution',
    category: 'Hospital & Clinical',
    url: '/images/campus-real/whatsapp_image_2022-04-01_at_10_45_06_jpeg.jpg',
    caption: 'Providing free authentic Ayurvedic remedies and geriatric consultation to rural populations.',
  },
  {
    id: 11,
    title: 'Attached Hospital Clinical Inpatient Ward',
    category: 'Hospital & Clinical',
    url: '/images/campus-real/img_20241019_160610.jpg',
    caption: 'Specialized IPD patient ward supporting round-the-clock clinical bedside care.',
  },
  {
    id: 12,
    title: 'Specialty Clinical Consultation Gathering',
    category: 'Hospital & Clinical',
    url: '/images/campus-real/img_20241115_170818.jpg',
    caption: 'Senior clinical professors supervising patient examinations across Kayachikitsa and Shalya Tantra.',
  },
  {
    id: 13,
    title: 'Hospital Outpatient Department (OPD) Reception',
    category: 'Hospital & Clinical',
    url: '/images/campus-real/img_4546.jpg',
    caption: 'Welcoming patients for specialized Kayachikitsa, Shalya Tantra, Shalakya, Kaumarbhritya, and Prasuti Tantra consultations.',
  },

  // Laboratories & Academics
  {
    id: 14,
    title: 'ICT Smart Classroom & Digital Recording Studio',
    category: 'Laboratories & Academics',
    url: '/images/campus-real/whatsapp_image_2025-09-01_at_15_01_46_95afe1d9.jpg',
    caption: 'Smart interactive classrooms equipped with audiovisual lecture capture systems.',
  },
  {
    id: 15,
    title: 'Modern High-Speed Computer & ICT Laboratory',
    category: 'Laboratories & Academics',
    url: '/images/campus-real/whatsapp_image_2025-09-01_at_13_36_30_9c58320d.jpg',
    caption: 'Digital computing facility with high-speed internet and DELNET library access for research.',
  },
  {
    id: 16,
    title: 'Digital Computing Workstations & E-Learning',
    category: 'Laboratories & Academics',
    url: '/images/campus-real/whatsapp_image_2025-09-01_at_13_36_29_955b5c94.jpg',
    caption: 'Providing computer literacy, biostatistics processing, and digital manuscript exploration.',
  },
  {
    id: 17,
    title: 'Dravyaguna & Pharmacognosy Science Laboratory',
    category: 'Laboratories & Academics',
    url: '/images/campus-real/gallery_(4).jpg',
    caption: 'Equipped with binocular compound microscopes, botanical specimens, and chemical reagents.',
  },
  {
    id: 18,
    title: 'Analytical Herbarium & Pharmacognostical Lab',
    category: 'Laboratories & Academics',
    url: '/images/campus-real/gallery_(5).jpg',
    caption: 'Practical analysis of crude raw drugs, barks, seeds, and classical formulation standardization.',
  },
  {
    id: 19,
    title: 'Central Library Reference & Reading Wing',
    category: 'Laboratories & Academics',
    url: '/images/campus-real/img-20250121-wa0017.jpg',
    caption: 'Spacious reading hall stocked with Samhitas, classical commentaries, reference textbooks, and modern medical journals.',
  },
  {
    id: 20,
    title: 'Advanced Anatomy Dissection & Osteology Hall',
    category: 'Laboratories & Academics',
    url: '/images/campus-real/img-20250121-wa0026.jpg',
    caption: 'Rachana Sharir dissection hall with anatomical models, bone sets, organ specimens, and charts for hands-on medical training.',
  },
  {
    id: 21,
    title: 'Physiology & Clinical Practical Laboratory',
    category: 'Laboratories & Academics',
    url: '/images/campus-real/img-20250121-wa0029.jpg',
    caption: 'Kriya Sharir laboratory for diagnostic hematology, urinalysis, and biochemical assessment.',
  },
  {
    id: 22,
    title: 'Pharmaceutical Preparation Unit (Rasa Shastra)',
    category: 'Laboratories & Academics',
    url: '/images/campus-real/img-20250121-wa0034.jpg',
    caption: 'Dedicated pharmacy training unit with heating hearths, pulverizers, pill-making machines, and purification apparatus.',
  },

  // Charak Vatika Herbarium
  {
    id: 23,
    title: 'Charak Vatika Medicinal Tree Plantation Drive',
    category: 'Charak Vatika Herbarium',
    url: '/images/campus-real/gallery_(2).jpg',
    caption: 'Students cultivating sacred and rare medicinal trees including Neem, Ashoka, Haritaki, and Amalaki.',
  },

  // Student Life & Sports
  {
    id: 24,
    title: 'Classical Swasthavritta & Yoga Morning Session',
    category: 'Student Life & Sports',
    url: '/images/campus-real/gallery_(1).jpg',
    caption: 'Scholars performing daily Pranayama, Surya Namaskar, and therapeutic asanas on the campus lawns.',
  },
  {
    id: 25,
    title: 'Annual Campus Sports Meet & Athletic Championship',
    category: 'Student Life & Sports',
    url: '/images/campus-real/gallery_(6).jpg',
    caption: 'Fostering physical vitality, coordination, and team sportsmanship among students.',
  },
  {
    id: 26,
    title: 'Traditional Kabaddi Tournament Championship',
    category: 'Student Life & Sports',
    url: '/images/campus-real/gallery_(10).jpg',
    caption: 'Competitive rural and traditional sports meet highlighting stamina and agile team play.',
  },
  {
    id: 27,
    title: 'Annual Institutional Cricket Tournament',
    category: 'Student Life & Sports',
    url: '/images/campus-real/gallery_(11).jpg',
    caption: 'Inter-batch cricket tournament held at the campus main sports ground.',
  },

  // Events & Dignitaries
  {
    id: 28,
    title: 'Hon’ble Governor of Rajasthan Shri Haribhau Bagde Campus Visit',
    category: 'Events & Dignitaries',
    url: '/images/campus-real/haribhauBagde.jpg',
    caption: 'Hon’ble Governor addressing the faculty and blessing the institutional healthcare mission.',
  },
  {
    id: 29,
    title: 'Chairman Shri Hari Dutt Sharma Presiding at Annual Function',
    category: 'Events & Dignitaries',
    url: '/images/campus-real/chairman.jpg',
    caption: 'Founder & Chairman delivering institutional address on value-based education and Ayurvedic excellence.',
  },
  {
    id: 30,
    title: 'Institutional Faculty & Academic Directorate Group',
    category: 'Events & Dignitaries',
    url: '/images/campus-real/group_photo.jpg',
    caption: 'Eminent professors, Ayurvedic clinicians, and senior department heads.',
  },
  {
    id: 31,
    title: 'Executive Leadership & Managing Committee Meeting',
    category: 'Events & Dignitaries',
    url: '/images/campus-real/madansingh.jpeg',
    caption: 'Members of the governing trust and managing committee reviewing academic standards and institutional expansion.',
  },
  {
    id: 32,
    title: 'Academic Mentorship & Student Welfare Directorate',
    category: 'Events & Dignitaries',
    url: '/images/campus-real/sanju_mam(1).jpeg',
    caption: 'Senior faculty mentor providing student counseling, welfare orientation, and academic guidance.',
  },
  {
    id: 33,
    title: 'State-Level Ayurveda Seminar & Academic Publication',
    category: 'Events & Dignitaries',
    url: '/images/campus-real/news-cover.jpg',
    caption: 'Special publication release and scientific proceedings from the annual state-level Ayurvedic symposium.',
  },
  {
    id: 34,
    title: 'Campus Central Auditorium & Scientific Seminar',
    category: 'Events & Dignitaries',
    url: '/images/campus-real/img-20250121-wa0018.jpg',
    caption: 'Gathering of scholars and delegates during state-level scientific seminar.',
  },
];

const PHOTO_CATEGORIES = [
  'ALL',
  'Campus & Architecture',
  'Hospital & Clinical',
  'Laboratories & Academics',
  'Charak Vatika Herbarium',
  'Student Life & Sports',
  'Events & Dignitaries',
];

function GalleryContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialTab = tabParam === 'videos' ? 'videos' : tabParam === 'all' ? 'all' : 'photos';
  
  const [activeTab, setActiveTab] = useState<'all' | 'photos' | 'videos'>(initialTab);
  const [photos, setPhotos] = useState<GalleryItem[]>(INITIAL_PHOTOS);
  const [videos, setVideos] = useState<VideoItem[]>(STATIC_VIDEOS);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoKey, setVideoKey] = useState(1);

  // Sync tab with URL search parameter
  useEffect(() => {
    if (tabParam === 'videos') {
      setActiveTab('videos');
    } else if (tabParam === 'all') {
      setActiveTab('all');
    } else {
      setActiveTab('photos');
    }
  }, [tabParam]);

  // Dynamic fetch from Database
  useEffect(() => {
    fetch('/api/v1/gallery')
      .then((res) => res.json())
      .then((json) => {
        if (json.data && json.data.length > 0) {
          const photoItems: GalleryItem[] = [];
          const videoItems: VideoItem[] = [];

          json.data.forEach((d: any, idx: number) => {
            const isVideo =
              d.category === 'Video' ||
              d.imageUrl?.includes('youtube') ||
              d.imageUrl?.includes('youtu.be') ||
              d.imageUrl?.endsWith('.mp4') ||
              d.imageUrl?.endsWith('.webm');

            if (isVideo) {
              const parsed = parseVideoSource(d.imageUrl, d.title);
              videoItems.push({
                id: d.id || `db-vid-${idx}`,
                title: d.title,
                category: d.caption?.includes('·') ? d.caption.split('·')[0].trim() : 'Institutional Film',
                caption: d.caption || '',
                duration: 'Official Film',
                ...parsed,
              });
            } else {
              let catName = d.category;
              if (catName === 'Campus') catName = 'Campus & Architecture';
              if (catName === 'Hospital') catName = 'Hospital & Clinical';
              if (catName === 'Academics') catName = 'Laboratories & Academics';
              if (catName === 'Herbal Garden') catName = 'Charak Vatika Herbarium';
              if (catName === 'Events') catName = 'Events & Dignitaries';
              photoItems.push({
                id: d.id || 1000 + idx,
                title: d.title,
                category: catName,
                url: d.imageUrl,
                caption: d.caption || '',
              });
            }
          });

          if (photoItems.length > 0) {
            // Deduplicate by URL
            const urlSet = new Set<string>();
            const merged: GalleryItem[] = [];
            for (const item of [...photoItems, ...INITIAL_PHOTOS]) {
              if (!urlSet.has(item.url)) {
                urlSet.add(item.url);
                merged.push(item);
              }
            }
            setPhotos(merged);
          }

          if (videoItems.length > 0) {
            // Deduplicate by YouTube ID or URL
            const keySet = new Set<string>();
            const mergedVideos: VideoItem[] = [];
            for (const item of [...videoItems, ...STATIC_VIDEOS]) {
              const key = item.youtubeId || item.videoUrl || item.embedUrl;
              if (!keySet.has(key)) {
                keySet.add(key);
                mergedVideos.push(item);
              }
            }
            setVideos(mergedVideos);
          }
        }
      })
      .catch(() => {});
  }, []);

  const filteredPhotos = selectedCategory === 'ALL'
    ? photos
    : photos.filter((item) => item.category === selectedCategory);

  // Unified stream for "All Media"
  const allMediaItems = [
    ...videos.map((v) => ({ ...v, mediaType: 'video' as const })),
    ...photos.map((p) => ({ ...p, mediaType: 'photo' as const })),
  ];

  const filteredAllMedia = selectedCategory === 'ALL'
    ? allMediaItems
    : allMediaItems.filter((item) => {
        if (selectedCategory === 'Campus & Architecture') {
          return item.category === 'Campus & Architecture' || item.category === 'Campus Tour' || item.category === 'Infrastructure';
        }
        if (selectedCategory === 'Hospital & Clinical') {
          return item.category === 'Hospital & Clinical' || item.category === 'Community Seva';
        }
        if (selectedCategory === 'Laboratories & Academics') {
          return item.category === 'Laboratories & Academics' || item.category === 'Academic Pedagogy';
        }
        if (selectedCategory === 'Student Life & Sports') {
          return item.category === 'Student Life & Sports' || item.category === 'Sports & Athletics' || item.category === 'Swasthavritta & Yoga';
        }
        if (selectedCategory === 'Events & Dignitaries') {
          return item.category === 'Events & Dignitaries' || item.category === 'Cultural Arts';
        }
        return item.category === selectedCategory;
      });

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setCurrentIndex(null);
  };

  const showPrev = useCallback(() => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) => (prev! > 0 ? prev! - 1 : filteredPhotos.length - 1));
  }, [currentIndex, filteredPhotos.length]);

  const showNext = useCallback(() => {
    if (currentIndex === null) return;
    setCurrentIndex((prev) => (prev! < filteredPhotos.length - 1 ? prev! + 1 : 0));
  }, [currentIndex, filteredPhotos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex !== null) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
      }
      if (activeVideo !== null && e.key === 'Escape') {
        setActiveVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, showPrev, showNext, activeVideo]);

  return (
    <div className="bg-[#F6F2E9] min-h-screen">
      <PageHeader
        title="Institutional Media &amp; Visual Archives"
        subtitle="Technology Park Campus · Academic Complex · 100-Bed Hospital · Student Life"
        crumbs={[{ label: 'Media & Archives', href: '/gallery' }, { label: activeTab === 'all' ? 'All Media Archives' : activeTab === 'photos' ? 'Photo Gallery' : 'Video Gallery' }]}
        bgImage="/images/campus-real/banner2(1).jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
        
        {/* Main Tab Switcher: All Media vs Photos vs Videos */}
        <div className="flex justify-center">
          <div className="bg-white p-1.5 rounded-full border-2 border-[#C5A46D]/40 shadow-luxury flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'all'
                  ? 'bg-[#173D32] text-[#DFCA9E] shadow-gold'
                  : 'text-[#342B25] hover:text-[#173D32] hover:bg-gray-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#C5A46D]" />
              <span>All Media ({photos.length + videos.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'photos'
                  ? 'bg-[#173D32] text-[#DFCA9E] shadow-gold'
                  : 'text-[#342B25] hover:text-[#173D32] hover:bg-gray-100'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-[#C5A46D]" />
              <span>Photo Gallery ({photos.length} Photos)</span>
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'videos'
                  ? 'bg-[#173D32] text-[#DFCA9E] shadow-gold'
                  : 'text-[#342B25] hover:text-[#173D32] hover:bg-gray-100'
              }`}
            >
              <Video className="w-4 h-4 text-[#C5A46D]" />
              <span>Video Gallery ({videos.length} Films)</span>
            </button>
          </div>
        </div>

        {/* Category Filters (Common for All & Photos) */}
        {(activeTab === 'all' || activeTab === 'photos') && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {PHOTO_CATEGORIES.map((cat) => {
              const count = activeTab === 'all'
                ? (cat === 'ALL' ? allMediaItems.length : filteredAllMedia.length)
                : (cat === 'ALL' ? photos.length : photos.filter((i) => i.category === cat).length);
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
        )}

        {/* ============================================================ */}
        {/* TAB 1: ALL MEDIA (UNIFIED STREAM)                            */}
        {/* ============================================================ */}
        {activeTab === 'all' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredAllMedia.map((item, idx) => {
                if (item.mediaType === 'video') {
                  const vid = item as VideoItem & { mediaType: 'video' };
                  return (
                    <div
                      key={`all-vid-${vid.id}`}
                      className="group bg-white rounded-xl overflow-hidden border-2 border-[#C5A46D]/40 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div
                        onClick={() => {
                          setVideoError(false);
                          setActiveVideo(vid);
                        }}
                        className="relative aspect-[4/3] bg-black overflow-hidden cursor-pointer"
                      >
                        <img
                          src={vid.thumbnailUrl || (vid.youtubeId ? `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg` : '/images/campus-real/banner2(1).jpg')}
                          alt={vid.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                        {/* Video Badge */}
                        <div className="absolute top-3 left-3 flex items-center space-x-1 px-2.5 py-1 rounded bg-[#0F2821]/90 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#DFCA9E] border border-[#C5A46D]/50 shadow-sm">
                          <Video className="w-3 h-3 text-[#C5A46D]" />
                          <span>Video Film · {vid.category}</span>
                        </div>

                        {/* Central Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-[#C5A46D] text-[#173D32] flex items-center justify-center shadow-luxury group-hover:scale-115 group-hover:bg-[#DFCA9E] transition-all">
                            <Play className="w-6 h-6 fill-current translate-x-0.5" />
                          </div>
                        </div>

                        <div className="absolute bottom-3 right-3 text-white text-[11px] font-medium flex items-center bg-black/70 px-2.5 py-1 rounded-full border border-[#C5A46D]/40 shadow-sm">
                          <Play className="w-3 h-3 mr-1 text-[#C5A46D] fill-current" />
                          <span>Watch Video</span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                        <div>
                          <h3
                            onClick={() => {
                              setVideoError(false);
                              setActiveVideo(vid);
                            }}
                            className="font-serif text-base font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors leading-tight cursor-pointer"
                          >
                            {vid.title}
                          </h3>
                          <p className="text-xs text-[#342B25]/80 font-light leading-relaxed mt-1.5 line-clamp-3">
                            {vid.caption}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Photo Card in All Media
                const pho = item as GalleryItem & { mediaType: 'photo' };
                const photoIdx = filteredPhotos.findIndex((p) => p.url === pho.url);

                return (
                  <div
                    key={`all-pho-${pho.id}`}
                    onClick={() => {
                      if (photoIdx !== -1) openLightbox(photoIdx);
                    }}
                    className="group bg-white rounded-xl overflow-hidden border border-[#C5A46D]/30 shadow-card hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#173D32]">
                      <img
                        src={pho.url}
                        alt={pho.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2821]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                      <div className="absolute top-3 left-3 flex items-center space-x-1 px-2.5 py-1 rounded bg-[#0F2821]/85 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#C5A46D] border border-[#C5A46D]/40 shadow-sm">
                        <ImageIcon className="w-3 h-3 text-[#C5A46D]" />
                        <span>{pho.category}</span>
                      </div>

                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#173D32]/85 text-[#C5A46D] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                        <Maximize2 className="w-4 h-4" />
                      </div>

                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-white text-[11px] font-medium flex items-center bg-black/60 px-2 py-0.5 rounded">
                        <Eye className="w-3 h-3 mr-1 text-[#C5A46D]" />
                        <span>Enlarge Photo</span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <h3 className="font-serif text-base font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors leading-tight">
                          {pho.title}
                        </h3>
                        <p className="text-xs text-[#342B25]/80 leading-relaxed font-light mt-1.5 line-clamp-3">
                          {pho.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: PHOTO GALLERY ONLY                                    */}
        {/* ============================================================ */}
        {activeTab === 'photos' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPhotos.map((item, index) => (
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
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2821]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded bg-[#0F2821]/85 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#C5A46D] border border-[#C5A46D]/40 shadow-sm flex items-center space-x-1">
                        <ImageIcon className="w-3 h-3 text-[#C5A46D]" />
                        <span>{item.category}</span>
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#173D32]/85 text-[#C5A46D] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-white text-[11px] font-medium flex items-center bg-black/60 px-2 py-0.5 rounded">
                      <Eye className="w-3 h-3 mr-1 text-[#C5A46D]" />
                      <span>Enlarge</span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#342B25]/80 leading-relaxed font-light mt-1.5 line-clamp-3">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: VIDEO GALLERY ONLY                                    */}
        {/* ============================================================ */}
        {activeTab === 'videos' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header intro */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-bold block">
                Official YouTube Video Directorate
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32]">
                Campus Tours, Academic Life &amp; Institutional Events
              </h2>
              <p className="text-xs sm:text-sm text-[#342B25]/80 font-light">
                Explore real footage of Shri Haridutt College &amp; Hospital at Technology Park, Sewar, Bharatpur. Click any video to play instantly.
              </p>
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {videos.map((vid) => (
                <div
                  key={vid.id}
                  className="bg-white rounded-xl overflow-hidden border-2 border-[#C5A46D]/30 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Thumbnail with Play Overlay */}
                  <div
                    onClick={() => {
                      setVideoError(false);
                      setActiveVideo(vid);
                    }}
                    className="relative aspect-video bg-black overflow-hidden cursor-pointer"
                  >
                    <img
                      src={vid.thumbnailUrl || (vid.youtubeId ? `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg` : '/images/campus-real/banner2(1).jpg')}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                    {/* Category Pill */}
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#0F2821]/85 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#C5A46D] border border-[#C5A46D]/40">
                      {vid.category}
                    </span>

                    {/* Central Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#C5A46D] text-[#173D32] flex items-center justify-center shadow-luxury group-hover:scale-110 group-hover:bg-[#DFCA9E] transition-all">
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <h3
                        onClick={() => {
                          setVideoError(false);
                          setActiveVideo(vid);
                        }}
                        className="font-serif text-base font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors leading-tight cursor-pointer"
                      >
                        {vid.title}
                      </h3>
                      <p className="text-xs text-[#342B25]/80 font-light leading-relaxed line-clamp-3">
                        {vid.caption}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setVideoError(false);
                          setActiveVideo(vid);
                        }}
                        className="w-full py-2.5 px-4 rounded-lg bg-[#173D32] hover:bg-[#1f4e40] text-[#DFCA9E] font-medium text-xs flex items-center justify-center space-x-2 transition-all shadow-sm hover:shadow-md cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current text-[#C5A46D]" />
                        <span>Watch Video Inside Website</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Player Modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-50 bg-[#0A1612]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
            onClick={() => {
              setActiveVideo(null);
              setVideoError(false);
            }}
          >
            <div
              className="relative max-w-4xl w-full bg-[#0F2821] rounded-2xl border-2 border-[#C5A46D] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header */}
              <div className="p-3 sm:p-4 bg-[#173D32] text-white flex items-center justify-between border-b border-[#C5A46D]/30">
                <div className="flex items-center space-x-2 truncate pr-4">
                  <Video className="w-4 h-4 text-[#C5A46D] shrink-0" />
                  <span className="font-serif font-bold text-xs sm:text-sm text-[#DFCA9E] truncate">
                    {activeVideo.title}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setActiveVideo(null);
                    setVideoError(false);
                  }}
                  className="p-1.5 rounded-full bg-white/10 text-white hover:bg-rose-600 transition-colors shrink-0"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Responsive Video Frame */}
              <div className="relative aspect-video w-full bg-black">
                {videoError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[#0A1612]">
                    <AlertCircle className="w-12 h-12 text-[#C5A46D]" />
                    <p className="text-white text-sm font-medium">Unable to load the video player stream.</p>
                    <button
                      onClick={() => {
                        setVideoError(false);
                        setVideoKey((k) => k + 1);
                      }}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-[#C5A46D] text-[#173D32] rounded-lg font-bold text-xs hover:bg-[#DFCA9E] transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Retry Playback</span>
                    </button>
                  </div>
                ) : activeVideo.sourceType === 'self-hosted' ? (
                  <video
                    key={`${activeVideo.id}-${videoKey}`}
                    src={activeVideo.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                    onError={() => setVideoError(true)}
                  />
                ) : (
                  <iframe
                    key={`${activeVideo.id}-${videoKey}`}
                    src={activeVideo.embedUrl}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="w-full h-full border-0"
                    onError={() => setVideoError(true)}
                  />
                )}
              </div>

              {/* Modal Footer Caption */}
              <div className="p-3 sm:p-5 text-white space-y-2 bg-[#0F2821]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C5A46D]/20 text-[#DFCA9E] text-[10px] uppercase font-bold tracking-wider border border-[#C5A46D]/40">
                      {activeVideo.category}
                    </span>
                    <span className="text-[11px] text-[#A3B899] font-medium flex items-center">
                      <CheckCircle2 className="w-3 h-3 text-[#C5A46D] mr-1" />
                      In-Website Embed Player
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveVideo(null);
                      setVideoError(false);
                    }}
                    className="text-xs text-[#DFCA9E] hover:text-white underline font-medium cursor-pointer"
                  >
                    Close Player
                  </button>
                </div>
                {activeVideo.caption && (
                  <p className="text-xs text-[#F6F2E9]/80 font-light leading-relaxed">
                    {activeVideo.caption}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Photo Lightbox Modal */}
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
                    {currentIndex + 1} / {filteredPhotos.length}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-white/80 hidden sm:inline">
                    {filteredPhotos[currentIndex].category}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <a
                    href={filteredPhotos[currentIndex].url}
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
                  src={filteredPhotos[currentIndex].url}
                  alt={filteredPhotos[currentIndex].title}
                  className="max-h-[68vh] max-w-full rounded-lg object-contain shadow-2xl border border-[#C5A46D]/40"
                />

                <button
                  onClick={showPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-[#C5A46D] hover:text-[#173D32] transition-colors border border-white/20"
                  title="Previous (Left Arrow)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

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
                    {filteredPhotos[currentIndex].title}
                  </h4>
                  <p className="text-xs text-[#F6F2E9]/80 font-light mt-0.5 max-w-3xl">
                    {filteredPhotos[currentIndex].caption}
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

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F6F2E9] flex items-center justify-center text-xs text-[#173D32]">Loading Media Archives...</div>}>
      <GalleryContent />
    </Suspense>
  );
}
