import React from 'react';
import Link from 'next/link';
import { INSTITUTION_INFO } from '@/lib/data';
import { MapPin, Phone, Mail, ShieldCheck, HeartHandshake, ExternalLink } from 'lucide-react';
import { BotanicalSprig } from '@/components/motion/BotanicalGraphics';

export default function Footer() {
  return (
    <footer className="bg-[#0F2821] text-[#F6F2E9] border-t-2 border-[#C5A46D]/40 pt-16 pb-0 relative overflow-hidden">
      {/* Decorative Botanical Leaf in Footer Background */}
      <div className="absolute -bottom-16 -right-16 pointer-events-none opacity-15">
        <BotanicalSprig className="w-80 h-80 -rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#C5A46D]/20">
          {/* Column 1: Institutional Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full border border-[#C5A46D] bg-[#173D32] flex items-center justify-center p-1">
                <div className="w-full h-full rounded-full border border-[#C5A46D]/40 flex flex-col items-center justify-center text-center">
                  <span className="text-[#C5A46D] text-xs font-serif font-bold">ॐ</span>
                  <span className="text-[7px] font-serif text-[#C5A46D] uppercase tracking-wider">SHAMC</span>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white leading-tight">
                  Shri Haridutt Ayurvedic
                </h3>
                <p className="text-xs text-[#C5A46D] font-medium tracking-wide uppercase">
                  Medical College & Hospital
                </p>
              </div>
            </div>

            <p className="text-xs text-[#F6F2E9]/80 leading-relaxed font-light">
              An institution of Vedic academic excellence, dedicated to authentic Ayurvedic medical education, classical research, and compassionate healthcare through our 100-bed hospital and Charak Vatika herbarium.
            </p>

            <div className="p-3 bg-[#173D32]/60 rounded border border-[#C5A46D]/30">
              <p className="text-[11px] font-serif text-[#C5A46D] italic">
                "{INSTITUTION_INFO.sanskritMotto}"
              </p>
              <p className="text-[10px] text-[#81917A] mt-0.5">
                {INSTITUTION_INFO.mottoMeaning}
              </p>
            </div>

            <div className="pt-1 flex items-center space-x-2 text-[11px] text-[#81917A]">
              <ShieldCheck className="w-4 h-4 text-[#C5A46D] shrink-0" />
              <span>Recognised by NCISM & Ministry of AYUSH, Govt. of India</span>
            </div>
          </div>

          {/* Column 2: Quick Institutional Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#C5A46D] uppercase tracking-wider mb-4 border-b border-[#C5A46D]/30 pb-2">
              The Institution
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link prefetch={true} href="/about" className="hover:text-[#C5A46D] transition-colors flex items-center">
                  <span className="text-[#C5A46D] mr-1.5 font-bold">›</span> About the College
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="/about/organization-structure" className="hover:text-[#C5A46D] transition-colors flex items-center">
                  <span className="text-[#C5A46D] mr-1.5 font-bold">›</span> Organization Structure
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="/documents" className="hover:text-[#C5A46D] transition-colors flex items-center font-medium text-[#DFCA9E]">
                  <span className="text-[#C5A46D] mr-1.5 font-bold">›</span> Document Vault
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="/examination" className="hover:text-[#C5A46D] transition-colors flex items-center font-medium text-[#DFCA9E]">
                  <span className="text-[#C5A46D] mr-1.5 font-bold">›</span> Examination Centre
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="/hospital" className="hover:text-[#C5A46D] transition-colors flex items-center">
                  <span className="text-[#C5A46D] mr-1.5 font-bold">›</span> 100-Bed Teaching Hospital
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="/research" className="hover:text-[#C5A46D] transition-colors flex items-center">
                  <span className="text-[#C5A46D] mr-1.5 font-bold">›</span> Research &amp; Publications
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="/gallery" className="hover:text-[#C5A46D] transition-colors flex items-center">
                  <span className="text-[#C5A46D] mr-1.5 font-bold">›</span> Campus Photo Gallery
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="/miscellaneous" className="hover:text-[#C5A46D] transition-colors flex items-center">
                  <span className="text-[#C5A46D] mr-1.5 font-bold">›</span> Statutory &amp; Miscellaneous
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="/mandatory-disclosures" className="hover:text-[#C5A46D] transition-colors flex items-center font-semibold text-[#C5A46D]">
                  <span className="text-[#C5A46D] mr-1.5 font-bold">›</span> NCISM Mandatory Disclosures
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academics & Admissions */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#C5A46D] uppercase tracking-wider mb-4 border-b border-[#C5A46D]/30 pb-2">
              Academics & Admissions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link prefetch={true} href="/academics" className="hover:text-[#C5A46D] transition-colors flex items-center font-medium text-[#DFCA9E]">
                  <span className="text-[#C5A46D] mr-1.5 font-bold">›</span> Academic Programmes Hub
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="/courses/bams" className="hover:text-[#C5A46D] transition-colors flex items-center font-medium">
                  <span className="text-[#C5A46D] mr-1.5 font-bold">›</span> B.A.M.S. (100 Seats)
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="/courses/md-ayurveda" className="hover:text-[#C5A46D] transition-colors flex items-center">
                  <span className="text-[#C5A46D] mr-1.5 font-bold">›</span> M.D. (Ayurveda - Kayachikitsa)
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="/courses/panchakarma-certificate" className="hover:text-[#C5A46D] transition-colors flex items-center">
                  <span className="text-[#C5A46D] mr-1.5 font-bold">›</span> Panchakarma Certificate
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="/departments" className="hover:text-[#C5A46D] transition-colors flex items-center">
                  <span className="text-[#C5A46D] mr-1.5 font-bold">›</span> 14 Classical Departments
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="/academics/calendar" className="hover:text-[#C5A46D] transition-colors flex items-center">
                  <span className="text-[#C5A46D] mr-1.5 font-bold">›</span> Academic Calendar 2026–27
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="/admissions/fee-structure" className="hover:text-[#C5A46D] transition-colors flex items-center">
                  <span className="text-[#C5A46D] mr-1.5 font-bold">›</span> Annual Fee Structure
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="/admissions/apply" className="hover:text-[#C5A46D] transition-colors flex items-center text-[#C5A46D] font-semibold">
                  <span className="text-[#C5A46D] mr-1.5 font-bold">›</span> Online Application 2026–27
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="/notices" className="hover:text-[#C5A46D] transition-colors flex items-center">
                  <span className="text-[#C5A46D] mr-1.5 font-bold">›</span> Official Circulars & Notices
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Clinical Services */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#C5A46D] uppercase tracking-wider mb-4 border-b border-[#C5A46D]/30 pb-2">
              Campus & Hospital
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                <span className="text-[#F6F2E9]/80 leading-relaxed">
                  {INSTITUTION_INFO.address}
                </span>
              </div>

              <div className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#C5A46D] font-medium">Admissions Helpline:</p>
                  <p className="text-[#F6F2E9]/90">{INSTITUTION_INFO.admissionsHelpline}</p>
                  <p className="text-[#81917A] text-[10px] mt-0.5">Mon–Sat: 9:00 AM – 5:00 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <HeartHandshake className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#C5A46D] font-medium">Hospital 24x7 Casualty & OPD:</p>
                  <p className="text-[#F6F2E9]/90">{INSTITUTION_INFO.hospitalEmergency}</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#F6F2E9]/90">{INSTITUTION_INFO.email}</p>
                  <p className="text-[#81917A] text-[10px]">{INSTITUTION_INFO.infoEmail}</p>
                </div>
              </div>

              <div className="pt-2">
                <Link prefetch={true} href="/contact"
                  className="inline-flex items-center text-xs text-[#C5A46D] hover:underline"
                >
                  View Interactive Location & Route Map <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Statutory Links & Copyright */}
        <div className="pt-8 pb-6 flex flex-col items-center justify-center gap-3 text-xs text-[#81917A]">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
            <Link prefetch={true} href="/mandatory-disclosures" className="hover:text-[#C5A46D] transition-colors font-semibold text-[#DFCA9E]">
              NCISM Mandatory Disclosures
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link prefetch={true} href="/documents" className="hover:text-[#C5A46D] transition-colors text-[#DFCA9E]">
              Documents Vault
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link prefetch={true} href="/examination" className="hover:text-[#C5A46D] transition-colors text-[#DFCA9E]">
              Examination
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link prefetch={true} href="/miscellaneous" className="hover:text-[#C5A46D] transition-colors">
              Statutory &amp; Miscellaneous
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link prefetch={true} href="/gallery" className="hover:text-[#C5A46D] transition-colors">
              Photo Gallery
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link prefetch={true} href="/privacy-policy" className="hover:text-[#C5A46D] transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link prefetch={true} href="/terms-conditions" className="hover:text-[#C5A46D] transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link prefetch={true} href="/admin/login" className="hover:text-[#C5A46D] transition-colors">
              Admin CMS
            </Link>
          </div>

          <p className="text-center text-xs text-[#81917A] pt-2">
            © {new Date().getFullYear()} {INSTITUTION_INFO.name}. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Developer Credit Bottom Strip */}
      <div className="border-t border-[#C5A46D]/20 bg-[#0A1D17] py-3.5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center text-xs text-[#81917A] tracking-wide">
          <p>
            Designed &amp; Developed by{' '}
            <a
              href="https://royalbusinessmachine.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#C5A46D] hover:text-[#DFCA9E] hover:underline transition-colors duration-200 tracking-wider inline-flex items-center ml-0.5"
            >
              ROYAL BUSINESS MACHINE
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
