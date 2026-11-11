import React from 'react';
import Image from 'next/image';
import PageHeader from '@/components/common/PageHeader';
import { Quote, Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Chairman's Message | Shri Haridutt Ayurvedic Medical College & Hospital",
  description: "Message from Founder & Chairman Shri Hari Dutt Sharma, Saraswati Shiksha Samiti, on Vedic academic excellence, compassionate healthcare, and holistic education.",
};

export default function ChairmansMessagePage() {
  return (
    <div className="bg-[#F6F2E9] min-h-screen">
      <PageHeader
        title="Chairman's Message"
        subtitle="Foundational Inspiration & Institutional Vision"
        crumbs={[{ label: 'About Us', href: '/about' }, { label: "Chairman's Message" }]}
      />

      <div className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Main Card */}
          <div className="bg-white rounded-2xl border-2 border-[#C5A46D]/40 shadow-luxury overflow-hidden">
            {/* Header Strip */}
            <div className="p-8 sm:p-12 border-b border-[#C5A46D]/30 bg-gradient-to-r from-[#0F2821] via-[#173D32] to-[#0F2821] text-white relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
                {/* Chairman Portrait */}
                <div className="relative w-36 h-44 sm:w-44 sm:h-52 rounded-xl overflow-hidden border-2 border-[#C5A46D] shadow-2xl shrink-0 bg-[#0A1612]">
                  <Image
                    src="/images/campus-real/chairman.jpg"
                    alt="Chairman Shri Hari Dutt Sharma"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>

                <div className="text-center md:text-left space-y-2">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#C5A46D]/20 text-[#DFCA9E] text-xs font-semibold uppercase tracking-wider border border-[#C5A46D]/40">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
                    <span>Founder &amp; Chairman's Desk</span>
                  </span>
                  <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    Shri Hari Dutt Sharma
                  </h1>
                  <p className="text-xs sm:text-sm text-[#DFCA9E] font-medium">
                    Founder &amp; Chairman, Saraswati Shiksha Samiti
                  </p>
                  <p className="text-[11px] text-[#81917A] max-w-xl">
                    Technology Park Campus, Agra-Jaipur Highway (NH-11), Sewar, Bharatpur, Rajasthan
                  </p>
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div className="p-8 sm:p-12 space-y-6 text-sm text-[#342B25]/90 font-light leading-relaxed">
              <div className="p-4 rounded-lg bg-[#173D32]/5 border-l-4 border-[#C5A46D] italic font-serif text-[#173D32] text-base">
                "ज्ञानस्य पंखाः स्वप्नानां उड्डयनम् — Education gives wings to your dreams. Our sacred mission is to revive the purity of ancient Ayurvedic wisdom, blend it with modern clinical diagnostics, and nurture Vaidyas who personify compassionate service."
              </div>

              <p className="font-medium text-[#173D32]">
                Cordial Greetings and Blessings to all students, parents, faculty members, and well-wishers,
              </p>

              <p>
                It is a matter of profound pride and gratitude that our institutional initiatives run by <strong>Saraswati Shiksha Samiti</strong> at Technology Park, Sewar, Bharatpur, have established an indelible reputation across Rajasthan in high-standard professional education, healthcare, social service, and moral discipline.
              </p>

              <p>
                When we established <strong>Shri Haridutt Ayurvedic Medical College &amp; Hospital</strong>, our foremost objective was to create an educational sanctuary where the classical Vaidya parampara (tradition) is practiced with scientific rigor. Ayurveda is not merely a system of medicine; it is an eternal science of longevity, holistic health, and spiritual harmony.
              </p>

              <p>
                At our sprawling Technology Park campus, we have instituted state-of-the-art facilities:
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs font-normal">
                <li className="flex items-start space-x-2 bg-gray-50 p-3 rounded border border-gray-200">
                  <ShieldCheck className="w-4 h-4 text-[#173D32] shrink-0 mt-0.5" />
                  <span><strong>100-Bed Attached Hospital:</strong> Providing subsidized and free outpatient &amp; inpatient clinical treatment to thousands of patients.</span>
                </li>
                <li className="flex items-start space-x-2 bg-gray-50 p-3 rounded border border-gray-200">
                  <ShieldCheck className="w-4 h-4 text-[#173D32] shrink-0 mt-0.5" />
                  <span><strong>5-Acre Charak Vatika Herbarium:</strong> Cultivating 350+ authenticated medicinal herbs for experiential botanical study.</span>
                </li>
                <li className="flex items-start space-x-2 bg-gray-50 p-3 rounded border border-gray-200">
                  <ShieldCheck className="w-4 h-4 text-[#173D32] shrink-0 mt-0.5" />
                  <span><strong>ICT Smart Classrooms &amp; Labs:</strong> 14 specialized academic departments with modern audiovisual and microscopy aids.</span>
                </li>
                <li className="flex items-start space-x-2 bg-gray-50 p-3 rounded border border-gray-200">
                  <ShieldCheck className="w-4 h-4 text-[#173D32] shrink-0 mt-0.5" />
                  <span><strong>Holistic Development:</strong> Integrated Swasthavritta Yoga sessions, sports grounds, and community medical relief camps.</span>
                </li>
              </ul>

              <p>
                Our aim is to bring such an enriching transformation in each admitted student that they emerge not only as accomplished Ayurvedic clinicians and researchers, but as ethically upright citizens committed to the welfare of society.
              </p>

              <p>
                I extend my heartfelt gratitude to our academic mentors, clinical doctors, administrative fraternity, and the community of Bharatpur. We welcome aspiring scholars to embark on this noble journey with us.
              </p>

              <div className="pt-8 border-t border-[#C5A46D]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-serif text-lg font-bold text-[#173D32]">
                    Shri Hari Dutt Sharma
                  </p>
                  <p className="text-xs text-[#C5A46D] font-semibold">
                    Chairman &amp; Managing Trustee
                  </p>
                  <p className="text-[11px] text-[#81917A]">
                    Saraswati Shiksha Samiti · Technology Park Campus, Bharatpur
                  </p>
                </div>
                <div className="p-3 bg-[#173D32]/5 rounded-lg border border-[#C5A46D]/20 text-center sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-[#173D32] block">Vedic Motto</span>
                  <span className="text-xs font-serif text-[#C5A46D] font-bold">सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
