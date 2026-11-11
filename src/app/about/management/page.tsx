import React from 'react';
import Image from 'next/image';
import PageHeader from '@/components/common/PageHeader';
import { ShieldCheck, UserCheck, Award, Building, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Governing Council & Management | Shri Haridutt Ayurvedic Medical College',
  description: 'Leadership, Board of Trustees, and Academic Senate of Shri Haridutt Ayurvedic Medical College & Hospital, run by Saraswati Shiksha Samiti, Bharatpur.',
};

export default function ManagementPage() {
  const leadership = [
    {
      name: 'Shri Hari Dutt Sharma',
      role: 'Founder & Chairman',
      body: 'Saraswati Shiksha Samiti',
      qualification: 'Visionary Educationist & Philanthropist',
      image: '/images/campus-real/chairman.jpg',
      highlight: true
    },
    {
      name: 'Shri Madan Singh',
      role: 'Patron & Senior Trustee',
      body: 'Governing Council',
      qualification: 'Eminent Social Leader & Public Administrator',
      image: '/images/campus-real/madansingh.jpeg',
      highlight: false
    },
    {
      name: 'Prof. (Dr.) Devendra Nath Tripathi',
      role: 'Principal & Medical Superintendent',
      body: 'Institutional Directorate',
      qualification: 'BAMS, MD (Ayurveda), Ph.D.',
      image: null,
      highlight: false
    },
    {
      name: 'Dr. Alok Nath Upadhyay',
      role: 'Vice Principal & Academic Dean',
      body: 'Academic Council',
      qualification: 'BAMS, MD (Ayurveda - Samhita & Siddhant)',
      image: null,
      highlight: false
    },
    {
      name: 'Dr. Vaidya Kripashankar Vyas',
      role: 'Hospital Superintendent & Clinical Head',
      body: 'Hospital Clinical Directorate',
      qualification: 'BAMS, MD (Ayurveda - Panchakarma)',
      image: null,
      highlight: false
    },
    {
      name: 'Shri B. M. Agrawal',
      role: 'Finance & Accounts Administrator',
      body: 'Fiduciary Board',
      qualification: 'FCA, Senior Financial Advisor',
      image: null,
      highlight: false
    },
  ];

  return (
    <div className="bg-[#F6F2E9] min-h-screen">
      <PageHeader
        title="Governing Council & Management"
        subtitle="Institutional Governance & Sponsoring Society"
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Governing Council' }]}
      />

      <div className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Sponsoring Society Overview */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#C5A46D]/30 shadow-luxury grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#173D32]/10 text-[#173D32] text-xs font-semibold uppercase tracking-wider">
                <Building className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>Registered Sponsoring Body</span>
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32]">
                Saraswati Shiksha Samiti, Bharatpur
              </h2>
              <p className="text-xs sm:text-sm text-[#342B25]/85 font-light leading-relaxed">
                Shri Haridutt Ayurvedic Medical College &amp; Hospital is established and administered under the aegis of <strong>Saraswati Shiksha Samiti</strong>, a distinguished non-profit educational society headquartered at Technology Park, Sewar, Bharatpur (Rajasthan). With over a decade of dedicated commitment to quality higher education, healthcare, and rural empowerment, the Samiti oversees the governance and strategic growth of the institution.
              </p>
            </div>
            <div className="md:col-span-4 bg-[#173D32] p-5 rounded-xl border border-[#C5A46D] text-white text-center space-y-2">
              <span className="text-[10px] text-[#C5A46D] uppercase tracking-widest font-bold block">Institutional Campus</span>
              <p className="font-serif text-base font-bold text-[#DFCA9E]">Technology Park</p>
              <p className="text-xs text-[#F6F2E9]/80 font-light">Agra–Jaipur Highway (NH-11), Sewar, Bharatpur – 321001</p>
            </div>
          </div>

          {/* Leadership Cards */}
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                Governance Hierarchy
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32] mt-1">
                Board of Trustees &amp; Institutional Academic Senate
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leadership.map((member, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-xl border p-5 shadow-card hover:shadow-luxury transition-all flex flex-col justify-between ${
                    member.highlight ? 'border-[#C5A46D] ring-2 ring-[#C5A46D]/20' : 'border-[#C5A46D]/30'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {member.image ? (
                      <div className="w-16 h-20 rounded-lg overflow-hidden border border-[#C5A46D]/50 relative shrink-0 shadow-sm bg-gray-100">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-[#173D32] text-[#C5A46D] flex items-center justify-center shrink-0">
                        <UserCheck className="w-6 h-6" />
                      </div>
                    )}

                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#81917A] block">
                        {member.body}
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#173D32] leading-snug">
                        {member.name}
                      </h4>
                      <p className="text-xs text-[#C5A46D] font-medium leading-tight">
                        {member.role}
                      </p>
                      <p className="text-[11px] text-[#342B25]/75 pt-1">
                        {member.qualification}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statutory Compliance Footer */}
          <div className="p-6 bg-white rounded-xl border border-[#C5A46D]/30 flex items-start sm:items-center space-x-3 text-xs text-[#342B25]">
            <ShieldCheck className="w-5 h-5 text-[#173D32] shrink-0 mt-0.5 sm:mt-0" />
            <span>
              All resolutions, financial budgets, and developmental charters of Shri Haridutt Ayurvedic Medical College &amp; Hospital are approved in accordance with statutory guidelines stipulated by NCISM, Ministry of AYUSH, Govt. of India, and affiliated State University regulations.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
