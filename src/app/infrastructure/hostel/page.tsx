import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Home, ShieldCheck, Utensils, Wifi, Moon, Sparkles } from 'lucide-react';

export default function HostelPage() {
  return (
    <div>
      <PageHeader
        title="Residential Hostels & Campus Life"
        subtitle="Secure Living • Satvik Nutrition"
        crumbs={[{ label: 'Infrastructure', href: '/infrastructure' }, { label: 'Hostel' }]}
        bgImage="/images/ayurveda/ancient-heritage/vedic-courtyard-colonnade.webp"
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                Home Away from Home
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#173D32]">
                Serene Residential Living for Male & Female Scholars
              </h2>
              <p className="text-sm text-[#342B25]/85 leading-relaxed font-light">
                Located within our gated, peaceful, and green campus perimeter, Shri Haridutt provides separate residential hostel blocks for boys and girls. Designed to foster scholarly focus, companionship, and Ayurvedic discipline, each hostel is managed by full-time resident wardens.
              </p>
              <p className="text-sm text-[#342B25]/85 leading-relaxed font-light">
                The attached dining mess serves hygienic, freshly cooked Satvik vegetarian meals planned in harmony with Ayurvedic nutritional tenets—emphasizing balanced Shad-Rasa (six tastes) and digestive wellness.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg overflow-hidden border-2 border-[#C5A46D]/50 shadow-luxury">
                <img
                  src="/images/ayurveda/ancient-heritage/vedic-courtyard-colonnade.webp"
                  alt="Ayurvedic Heritage Residential Quarters and Courtyard"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card">
              <ShieldCheck className="w-6 h-6 text-[#173D32] mb-3" />
              <h4 className="font-serif text-base font-bold text-[#173D32] mb-1">24x7 Security</h4>
              <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
                Round-the-clock security personnel, biometric entry verification, and CCTV monitoring.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card">
              <Utensils className="w-6 h-6 text-[#173D32] mb-3" />
              <h4 className="font-serif text-base font-bold text-[#173D32] mb-1">Satvik Vegetarian Mess</h4>
              <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
                Wholesome four-course vegetarian dining planned in alignment with seasonal Ayurvedic Ritucharya.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card">
              <Wifi className="w-6 h-6 text-[#173D32] mb-3" />
              <h4 className="font-serif text-base font-bold text-[#173D32] mb-1">Wi-Fi & Study Rooms</h4>
              <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
                Dedicated late-night reading halls with high-speed internet connectivity for research and exam prep.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card">
              <Moon className="w-6 h-6 text-[#173D32] mb-3" />
              <h4 className="font-serif text-base font-bold text-[#173D32] mb-1">Peaceful Ambiance</h4>
              <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
                Pollution-free natural campus surroundings with adjacent badminton courts, yoga hall, and herbal lawn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
