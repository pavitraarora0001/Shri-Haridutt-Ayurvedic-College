import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { LEADERSHIP } from '@/lib/data';
import { Quote, Mail, Phone, Award, GraduationCap } from 'lucide-react';

export default function PrincipalsMessagePage() {
  const principal = LEADERSHIP[0];

  return (
    <div>
      <PageHeader
        title="Principal's Desk"
        subtitle="Academic Leadership & Vision"
        crumbs={[{ label: 'About Us', href: '/about' }, { label: "Principal's Message" }]}
      />

      <div className="py-20 bg-[#F6F2E9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-[#C5A46D]/40 shadow-luxury overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 sm:p-12 border-b border-[#C5A46D]/20 bg-[#173D32] text-white">
              <div className="md:col-span-4 flex flex-col items-center text-center">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#C5A46D] shadow-gold mb-4">
                  <img
                    src={principal.image}
                    alt={principal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold">{principal.name}</h3>
                <p className="text-xs text-[#C5A46D] mt-1 uppercase tracking-wider">{principal.designation}</p>
                <p className="text-[11px] text-[#81917A] mt-0.5">{principal.qualification}</p>
              </div>

              <div className="md:col-span-8 space-y-3">
                <div className="text-[#C5A46D]">
                  <Quote className="w-10 h-10 opacity-70" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-snug text-white">
                  "Ayurveda is not a static relic of antiquity; it is a dynamic, eternal medical science designed for modern human well-being."
                </h2>
                <p className="text-xs text-[#F6F2E9]/80 font-light leading-relaxed">
                  24+ Years of Dedicated Clinical Practice, Samhita Research, and Academic Guidance.
                </p>
              </div>
            </div>

            <div className="p-8 sm:p-12 space-y-6 text-sm text-[#342B25]/90 font-light leading-relaxed">
              <p>
                <strong>Respected Scholars, Parents, and Patrons of Ayurveda,</strong>
              </p>
              <p>
                It brings me immense joy to welcome you to <strong>Shri Haridutt Ayurvedic Medical College & Hospital</strong>. 
                We stand at a critical juncture in human healthcare where global medicine is actively turning its gaze towards the holistic, individualized, and preventive paradigms that our Rishis codified thousands of years ago in the Brihat Trayi treatises.
              </p>
              <p>
                At Shri Haridutt, our commitment to undergraduate BAMS scholars is twofold: First, to instill an absolute, unshakeable mastery of the core philosophical principles—Tridosha, Dhatu Samya, Prakriti Pariksha, and Agni. Second, to furnish our scholars with cutting-edge clinical competencies, enabling them to interpret modern hematological profiles, CT scans, and biochemical assays with equal proficiency.
              </p>
              <p>
                Our attached 100-bed hospital provides an exceptional, rich volume of bedside exposure. Here, scholars participate directly in the miracle of Ayurvedic healing—watching chronic cases of rheumatoid arthritis, stroke rehabilitation, skin dermatoses, and metabolic syndromes achieve long-lasting remission under authentic Panchakarma and herbal therapies.
              </p>
              <p>
                I invite every young medical aspirant who enters our gates to embrace this noble journey with dedication, reverence, and scientific rigour. May you emerge as a shining Vaidya who brings pride to the nation and healing to humanity.
              </p>

              <div className="pt-8 border-t border-[#C5A46D]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-serif text-base font-bold text-[#173D32]">
                    Prof. (Dr.) Devendra Nath Tripathi
                  </p>
                  <p className="text-xs text-[#81917A]">
                    Principal & Medical Director, Shri Haridutt Ayurvedic Medical College & Hospital
                  </p>
                  <p className="text-xs text-[#C5A46D] mt-0.5">
                    Email: principal@hariduttayurveda.edu.in
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-serif italic text-sm text-[#173D32]">
                    ॥ ॐ धन्वन्तरये नमः ॥
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
