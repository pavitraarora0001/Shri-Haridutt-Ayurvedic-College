import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { Sparkles, HeartHandshake, Compass, Trophy, Video, ArrowRight, ShieldCheck, Sun } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Life & Campus Culture | Shri Haridutt Ayurvedic Medical College',
  description: 'Vibrant student life at Shri Haridutt Ayurvedic Medical College: daily Swasthavritta Yoga, inter-collegiate sports, traditional Kabaddi, cricket tournaments, cultural drama, and community medical camps.',
};

export default function StudentLifePage() {
  const highlights = [
    {
      title: 'Daily Swasthavritta & Yoga Sanctum',
      desc: 'Scholars engage in daily morning Surya Namaskar, Pranayama, and Shatkriya bio-purification techniques on our open green campus lawns under expert Ayurvedic yoga masters.',
      image: '/images/campus-real/gallery_(1).jpg',
      tag: 'Wellness & Mindfulness'
    },
    {
      title: 'Annual Sports Meet & Traditional Kabaddi',
      desc: 'Annual sports festival featuring vigorous traditional Kabaddi matches, track-and-field athletics, volleyball, and badminton promoting physical stamina and team agility.',
      image: '/images/campus-real/gallery_(10).jpg',
      tag: 'Athletics & Agility'
    },
    {
      title: 'Campus Cricket Tournament & Championships',
      desc: 'The annual inter-batch institutional Cricket Cup brings together undergraduate scholars, interns, and faculty in an energetic celebration of sportsmanship.',
      image: '/images/campus-real/gallery_(11).jpg',
      tag: 'Sports Championship'
    },
    {
      title: 'Charak Vatika Tree Plantation & Herbal Greenery',
      desc: 'Scholars actively participate in environmental conservation by cultivating and adopting indigenous medicinal plant species in our 5-acre herbal botanical sanctuary.',
      image: '/images/campus-real/gallery_(2).jpg',
      tag: 'Environmental Seva'
    },
    {
      title: 'Cultural Drama & Theatrical Arts',
      desc: 'Annual collegiate cultural fest featuring poignant theatrical plays such as "Khaandaan", classical Sanskrit drama recitations, music, and dance performances.',
      image: '/images/campus-real/img-20250121-wa0018.jpg',
      tag: 'Cultural Heritage'
    },
    {
      title: 'Free Community Health Diagnosis Camps',
      desc: 'Weekend diagnostic camps in surrounding rural tehsils where scholars shadow experienced clinical Vaidyas in Nadi Pariksha, Prakriti analysis, and free medicine distribution.',
      image: '/images/campus-real/img-20171201-wa0087_gfgfg.jpg',
      tag: 'Community Healthcare'
    },
  ];

  return (
    <div className="bg-[#F6F2E9] min-h-screen">
      <PageHeader
        title="Student Life & Campus Culture"
        subtitle="Vedic Discipline · Athletics · Cultural Vibrancy · Social Seva"
        crumbs={[{ label: 'Student Life' }]}
        bgImage="/images/campus-real/banner2(1).jpg"
      />

      <div className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Intro Card */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border-2 border-[#C5A46D]/30 shadow-luxury space-y-4">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#173D32]/10 text-[#173D32] text-xs font-semibold uppercase tracking-wider">
              <Sun className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Holistic Scholar Development</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#173D32]">
              Living the Classical Vaidya Ideal in Modern Times
            </h2>
            <p className="text-xs sm:text-sm text-[#342B25]/85 leading-relaxed font-light">
              Student life at <strong>Shri Haridutt Ayurvedic Medical College &amp; Hospital</strong> is structured to harmonize intellectual rigour with spiritual tranquility. Through daily Yoga on the Technology Park green lawns, competitive traditional athletics (Kabaddi, Cricket, Taekwondo), theatrical drama performances, and regular rural health camps, our students build life-long character, resilience, and compassion.
            </p>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden border border-[#C5A46D]/30 shadow-card hover:shadow-luxury transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-[#173D32] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#0F2821]/80 text-[#DFCA9E] text-[10px] uppercase font-bold tracking-wider border border-[#C5A46D]/30 backdrop-blur-sm">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-lg font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Video Spotlight Callout */}
          <div className="bg-gradient-to-r from-[#0F2821] via-[#173D32] to-[#0F2821] text-white p-8 rounded-2xl border-2 border-[#C5A46D]/40 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-bold block">
                Audio-Visual Campus Archives
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#DFCA9E]">
                Watch Our Students in Action: Campus Tours &amp; Activities
              </h3>
              <p className="text-xs text-[#F6F2E9]/80 font-light max-w-2xl">
                Experience the authentic vibrant atmosphere of Technology Park campus through our official institutional video gallery featuring Yoga demonstrations, Kabaddi matches, campus documentary tours, and drama performances.
              </p>
            </div>
            <Link
              href="/gallery?tab=videos"
              className="px-5 py-3 rounded-lg bg-[#C5A46D] text-[#173D32] font-bold text-xs uppercase tracking-wider hover:bg-[#DFCA9E] transition-colors whitespace-nowrap flex items-center space-x-2 shrink-0 shadow-gold"
            >
              <Video className="w-4 h-4" />
              <span>Explore Video Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
