'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Phone,
  BookOpen,
  Building,
  HeartPulse,
  Leaf,
  FileCheck,
  Award,
  GraduationCap,
  FileText,
  Activity,
  Layers,
  ShieldCheck,
  Stethoscope,
  Calendar,
  ExternalLink,
  Users,
  User
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Close dropdown on click outside or Escape key press
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isHome = pathname === '/';

  const isGalleryActive =
    pathname === '/gallery' || pathname === '/video-gallery';

  const toggleMobileAccordion = (section: string) => {
    setMobileExpanded(mobileExpanded === section ? null : section);
  };

  const getNavItemClass = (isActive: boolean) =>
    `h-9 px-1.5 xl:px-1.5 2xl:px-2 rounded text-[10.5px] xl:text-[10.5px] 2xl:text-[12px] font-medium tracking-normal transition-all duration-200 flex items-center space-x-0.5 xl:space-x-0.5 2xl:space-x-1 whitespace-nowrap shrink-0 select-none ${isActive
      ? 'text-[#DFCA9E] bg-[#C5A46D]/15 font-semibold border-b-2 border-[#C5A46D]'
      : 'text-[#F6F2E9] hover:text-[#DFCA9E] hover:bg-white/5'
    }`;

  const dropdownVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    exit: { opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.15 } },
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-[#173D32] shadow-luxury border-b border-[#C5A46D]/30 py-2'
          : isHome
            ? 'bg-[#173D32]/95 backdrop-blur-md border-b border-[#C5A46D]/20 py-2.5'
            : 'bg-[#173D32] border-b border-[#C5A46D]/30 py-2.5'
        }`}
    >
      <div className="w-full max-w-[1920px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-3 2xl:px-8">
        <div className="flex items-center justify-between gap-2 xl:gap-2 2xl:gap-4 w-full">
          {/* Logo & College Identity - Fluid & responsive across all screens */}
          <Link prefetch={true} href="/"
            className="flex items-center space-x-2 sm:space-x-2.5 group shrink-0 py-0.5 select-none min-w-0"
          >
            {/* Vedic Emblem Crest */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 xl:w-9 xl:h-9 2xl:w-11 2xl:h-11 rounded-full border-2 border-[#C5A46D] bg-[#0F2821] flex items-center justify-center p-0.5 shadow-gold group-hover:scale-105 transition-transform duration-300 shrink-0">
              <div className="w-full h-full rounded-full border border-[#C5A46D]/40 flex flex-col items-center justify-center text-center">
                <span className="text-[#C5A46D] text-[10px] sm:text-xs font-serif font-bold leading-none">ॐ</span>
                <span className="text-[6px] sm:text-[7px] font-serif text-[#C5A46D]/90 uppercase tracking-widest leading-none mt-0.5">SHAMC</span>
              </div>
            </div>

            {/* Typography */}
            <div className="flex flex-col justify-center whitespace-nowrap min-w-0">
              <span className="font-serif text-xs sm:text-sm xl:text-[13.5px] 2xl:text-lg font-bold tracking-tight text-white group-hover:text-[#DFCA9E] transition-colors leading-tight truncate">
                Shri Haridutt Ayurvedic
              </span>
              <span className="text-[7.5px] sm:text-[9px] xl:text-[9px] 2xl:text-[10px] font-sans tracking-[0.06em] sm:tracking-[0.12em] text-[#C5A46D] uppercase font-semibold leading-tight mt-0.5 truncate">
                Medical College &amp; Hospital
              </span>
              <span className="hidden 2xl:block text-[8px] text-[#81917A] tracking-wider leading-none mt-0.5 whitespace-nowrap">
                Affiliated to Dr. S.R. Rajasthan Ayurved University · NCISM Approved
              </span>
            </div>
          </Link>

          {/* RAU-Inspired Master 11-Pillar Desktop Navigation (Title Case & Exact Baseline Harmony) */}
          <nav
            ref={navRef}
            aria-label="Main Navigation"
            className="hidden xl:flex items-center justify-center flex-1 min-w-0 space-x-0.5 xl:space-x-0.5 2xl:space-x-1"
          >
            {/* 1. HOME */}
            <Link prefetch={true} href="/"
              className={getNavItemClass(pathname === '/')}
            >
              <span>Home</span>
            </Link>

            {/* 2. ABOUT US (Multi-Column Dropdown) */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                aria-expanded={activeDropdown === 'about'}
                aria-haspopup="true"
                onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
                className={getNavItemClass(pathname.startsWith('/about'))}
              >
                <span>About Us</span>
                <ChevronDown className="w-3 h-3 text-[#C5A46D]/80 group-hover:text-[#DFCA9E] group-hover:rotate-180 transition-transform duration-200 shrink-0" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'about' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 w-[520px] bg-[#0F2821] border border-[#C5A46D]/40 rounded-lg shadow-2xl p-4 mt-1 z-50 backdrop-blur-md grid grid-cols-2 gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-widest block border-b border-[#C5A46D]/20 pb-1 mb-2">
                        Institutional Profile
                      </span>
                      <Link prefetch={true} href="/about" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        About the College
                      </Link>
                      <Link prefetch={true} href="/about/history" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        History &amp; Heritage
                      </Link>
                      <Link prefetch={true} href="/about/vision-mission" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Vision &amp; Mission
                      </Link>
                      <Link prefetch={true} href="/about/management" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Governing Council &amp; Management
                      </Link>
                      <Link prefetch={true} href="/about/chairmans-message" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Chairman's Message
                      </Link>
                      <Link prefetch={true} href="/about/principals-message" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Principal's Desk
                      </Link>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-widest block border-b border-[#C5A46D]/20 pb-1 mb-2">
                        Governance &amp; Charters
                      </span>
                      <Link prefetch={true} href="/about/organization-structure" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Organization Structure &amp; Organogram
                      </Link>
                      <Link prefetch={true} href="/about/organization-structure#administration" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Administration &amp; Key Officers
                      </Link>
                      <Link prefetch={true} href="/miscellaneous#statutory-committees" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Institutional Statutory Committees
                      </Link>
                      <Link prefetch={true} href="/about/annual-reports" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Annual Reports &amp; Audits
                      </Link>
                      <Link prefetch={true} href="/about/policies" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Institutional Policies &amp; Regulations
                      </Link>
                      <Link prefetch={true} href="/about/policies#code-of-conduct" className="block py-1 text-[#DFCA9E] font-medium hover:text-white transition-colors">
                        Scholar Code of Conduct &amp; Vaidya Oath
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. DOCUMENTS (Multi-Column Dropdown) */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('documents')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                aria-expanded={activeDropdown === 'documents'}
                aria-haspopup="true"
                onClick={() => setActiveDropdown(activeDropdown === 'documents' ? null : 'documents')}
                className={getNavItemClass(pathname.startsWith('/documents') || pathname.startsWith('/mandatory-disclosures'))}
              >
                <span>Documents</span>
                <ChevronDown className="w-3 h-3 text-[#C5A46D]/80 group-hover:text-[#DFCA9E] group-hover:rotate-180 transition-transform duration-200 shrink-0" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'documents' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 w-[520px] bg-[#0F2821] border border-[#C5A46D]/40 rounded-lg shadow-2xl p-4 mt-1 z-50 backdrop-blur-md grid grid-cols-2 gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-widest block border-b border-[#C5A46D]/20 pb-1 mb-2">
                        Statutory Disclosures
                      </span>
                      <Link prefetch={true} href="/mandatory-disclosures" className="block py-1 text-[#DFCA9E] font-bold hover:text-white transition-colors">
                        Public Disclosures Portal (NCISM)
                      </Link>
                      <Link prefetch={true} href="/mandatory-disclosures#council-permissions" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        NCISM &amp; Ministry LOP Orders
                      </Link>
                      <Link prefetch={true} href="/mandatory-disclosures#university-affiliation" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        University Affiliation Letters (RAU)
                      </Link>
                      <Link prefetch={true} href="/mandatory-disclosures#hospital-data" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Hospital Clinical Data &amp; Bed Census
                      </Link>
                      <Link prefetch={true} href="/mandatory-disclosures#financials" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Balance Sheet &amp; Audit Reports
                      </Link>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-widest block border-b border-[#C5A46D]/20 pb-1 mb-2">
                        Institutional Archives
                      </span>
                      <Link prefetch={true} href="/documents" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        All Institutional Documents
                      </Link>
                      <Link prefetch={true} href="/documents?category=affiliations" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Government Approvals &amp; Gazette
                      </Link>
                      <Link prefetch={true} href="/documents?category=academic" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Curriculum &amp; Syllabus Documents
                      </Link>
                      <Link prefetch={true} href="/documents?category=accreditations" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Accreditations &amp; ISO Certificates
                      </Link>
                      <Link prefetch={true} href="/downloads" className="block py-1 text-[#C5A46D] font-semibold hover:underline transition-colors pt-1">
                        Download Centre &amp; Forms →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. ACADEMICS (Multi-Column Dropdown) */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('academics')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                aria-expanded={activeDropdown === 'academics'}
                aria-haspopup="true"
                onClick={() => setActiveDropdown(activeDropdown === 'academics' ? null : 'academics')}
                className={getNavItemClass(pathname.startsWith('/academics') || pathname.startsWith('/courses') || pathname.startsWith('/departments') || pathname.startsWith('/faculty'))}
              >
                <span>Academics</span>
                <ChevronDown className="w-3 h-3 text-[#C5A46D]/80 group-hover:text-[#DFCA9E] group-hover:rotate-180 transition-transform duration-200 shrink-0" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'academics' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 w-[560px] bg-[#0F2821] border border-[#C5A46D]/40 rounded-lg shadow-2xl p-4 mt-1 z-50 backdrop-blur-md grid grid-cols-2 gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-widest block border-b border-[#C5A46D]/20 pb-1 mb-2">
                        Courses &amp; Departments
                      </span>
                      <Link prefetch={true} href="/academics/programmes" className="block py-1 text-[#DFCA9E] font-bold hover:text-white transition-colors">
                        All Academic Programmes
                      </Link>
                      <Link prefetch={true} href="/courses/bams" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        B.A.M.S. (Bachelor of Ayurvedic Medicine &amp; Surgery)
                      </Link>
                      <Link prefetch={true} href="/courses/md-ayurveda" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Postgraduate M.D. (Kayachikitsa)
                      </Link>
                      <Link prefetch={true} href="/courses/panchakarma-certificate" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Certificate in Panchakarma Therapy
                      </Link>
                      <Link prefetch={true} href="/departments" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        14 Classical Academic Departments
                      </Link>
                      <Link prefetch={true} href="/faculty" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Faculty &amp; Teaching Staff Directory
                      </Link>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-widest block border-b border-[#C5A46D]/20 pb-1 mb-2">
                        Pedagogy &amp; Infrastructure
                      </span>
                      <Link prefetch={true} href="/academics/methodology" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Teaching Methodology &amp; Smart Classrooms
                      </Link>
                      <Link prefetch={true} href="/academics/calendar" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Academic Calendar 2026–27
                      </Link>
                      <Link prefetch={true} href="/infrastructure/laboratories" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Ayurvedic Laboratories &amp; Dissection
                      </Link>
                      <Link prefetch={true} href="/academics/practical-training" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Clinical Bedside Practical Training
                      </Link>
                      <Link prefetch={true} href="/knowledge-hub" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors flex items-center justify-between">
                        <span>Charak Vatika Herbarium</span>
                        <Leaf className="w-3 h-3 text-[#C5A46D]" />
                      </Link>
                      <Link prefetch={true} href="/downloads" className="block py-1 text-[#C5A46D] font-semibold hover:underline transition-colors pt-1">
                        Academic Resources &amp; Downloads →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 5. RESEARCH (Multi-Column Dropdown) */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('research')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                aria-expanded={activeDropdown === 'research'}
                aria-haspopup="true"
                onClick={() => setActiveDropdown(activeDropdown === 'research' ? null : 'research')}
                className={getNavItemClass(pathname.startsWith('/research'))}
              >
                <span>Research</span>
                <ChevronDown className="w-3 h-3 text-[#C5A46D]/80 group-hover:text-[#DFCA9E] group-hover:rotate-180 transition-transform duration-200 shrink-0" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'research' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 w-[500px] bg-[#0F2821] border border-[#C5A46D]/40 rounded-lg shadow-2xl p-4 mt-1 z-50 backdrop-blur-md grid grid-cols-2 gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-widest block border-b border-[#C5A46D]/20 pb-1 mb-2">
                        Scientific Endeavours
                      </span>
                      <Link prefetch={true} href="/research" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Research Overview
                      </Link>
                      <Link prefetch={true} href="/research/activities" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Research Activities &amp; Clinical Trials
                      </Link>
                      <Link prefetch={true} href="/research/activities#projects" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Research Projects &amp; Extramural Grants
                      </Link>
                      <Link prefetch={true} href="/research#publications" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Faculty &amp; Scholar Publications
                      </Link>
                      <Link prefetch={true} href="/research/committees" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Research Committees (IEC / IRC / DRC)
                      </Link>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-widest block border-b border-[#C5A46D]/20 pb-1 mb-2">
                        Conferences &amp; MoUs
                      </span>
                      <Link prefetch={true} href="/research/committees#iec" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Institutional Ethics Committee (IEC)
                      </Link>
                      <Link prefetch={true} href="/research#conferences" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        National Conferences &amp; CMEs
                      </Link>
                      <Link prefetch={true} href="/news-events#workshops" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Seminars &amp; Workshops
                      </Link>
                      <Link prefetch={true} href="/research/collaborations" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Collaborations &amp; MoUs
                      </Link>
                      <Link prefetch={true} href="/documents" className="block py-1 text-[#C5A46D] font-semibold hover:underline transition-colors pt-1">
                        Research Document Repository →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 6. HOSPITAL (Multi-Column Dropdown) */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('hospital')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                aria-expanded={activeDropdown === 'hospital'}
                aria-haspopup="true"
                onClick={() => setActiveDropdown(activeDropdown === 'hospital' ? null : 'hospital')}
                className={getNavItemClass(pathname.startsWith('/hospital') || pathname.startsWith('/infrastructure/hospital'))}
              >
                <span>Hospital</span>
                <ChevronDown className="w-3 h-3 text-[#C5A46D]/80 group-hover:text-[#DFCA9E] group-hover:rotate-180 transition-transform duration-200 shrink-0" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'hospital' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 w-[520px] bg-[#0F2821] border border-[#C5A46D]/40 rounded-lg shadow-2xl p-4 mt-1 z-50 backdrop-blur-md grid grid-cols-2 gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-widest block border-b border-[#C5A46D]/20 pb-1 mb-2">
                        Clinical Specialties
                      </span>
                      <Link prefetch={true} href="/hospital" className="block py-1 text-[#DFCA9E] font-bold hover:text-white transition-colors">
                        100-Bed Teaching Hospital Overview
                      </Link>
                      <Link prefetch={true} href="/hospital#departments" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        8 Clinical OPD Departments
                      </Link>
                      <Link prefetch={true} href="/hospital#opd" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        OPD Services &amp; Daily Timings
                      </Link>
                      <Link prefetch={true} href="/hospital#ipd" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        IPD Services &amp; In-Patient Wards
                      </Link>
                      <Link prefetch={true} href="/courses/panchakarma-certificate" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Specialized Panchakarma Department
                      </Link>
                      <Link prefetch={true} href="/hospital#diagnostics" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Diagnostic Pathology, Biochemistry &amp; X-Ray
                      </Link>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-widest block border-b border-[#C5A46D]/20 pb-1 mb-2">
                        Patient Welfare &amp; Staff
                      </span>
                      <Link prefetch={true} href="/faculty" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Clinical Doctors &amp; Hospital Staff
                      </Link>
                      <Link prefetch={true} href="/infrastructure/hospital" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Hospital Infrastructure &amp; Wards
                      </Link>
                      <Link prefetch={true} href="/hospital#patient-guide" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Patient Guide &amp; Subsidized Charges
                      </Link>
                      <Link prefetch={true} href="/hospital#outreach" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Outreach Health Camps &amp; Swarna Prashana
                      </Link>
                      <Link prefetch={true} href="/mandatory-disclosures#hospital-data" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Hospital Bed Occupancy &amp; Statistics
                      </Link>
                      <Link prefetch={true} href="/contact" className="block py-1 text-[#C5A46D] font-semibold hover:underline transition-colors pt-1">
                        Patient Helpline &amp; Emergency 24x7 →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 7. NEWS & EVENTS (Dropdown) */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('news')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                aria-expanded={activeDropdown === 'news'}
                aria-haspopup="true"
                onClick={() => setActiveDropdown(activeDropdown === 'news' ? null : 'news')}
                className={getNavItemClass(pathname.startsWith('/news-events') || pathname === '/notices' || pathname === '/achievements')}
              >
                <span>News &amp; Events</span>
                <ChevronDown className="w-3 h-3 text-[#C5A46D]/80 group-hover:text-[#DFCA9E] group-hover:rotate-180 transition-transform duration-200 shrink-0" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'news' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 w-64 bg-[#0F2821] border border-[#C5A46D]/40 rounded-lg shadow-2xl py-2 mt-1 z-50 backdrop-blur-md text-xs space-y-1"
                  >
                    <Link prefetch={true} href="/news-events" className="block px-4 py-1.5 text-[#F6F2E9] hover:bg-[#173D32] hover:text-[#C5A46D] transition-colors">
                      Latest Institutional News
                    </Link>
                    <Link prefetch={true} href="/notices" className="block px-4 py-1.5 text-[#DFCA9E] font-semibold hover:bg-[#173D32] transition-colors">
                      College Circulars &amp; Notices
                    </Link>
                    <Link prefetch={true} href="/news-events#events" className="block px-4 py-1.5 text-[#F6F2E9] hover:bg-[#173D32] hover:text-[#C5A46D] transition-colors">
                      Conferences, CMEs &amp; Workshops
                    </Link>
                    <Link prefetch={true} href="/student-life" className="block px-4 py-1.5 text-[#F6F2E9] hover:bg-[#173D32] hover:text-[#C5A46D] transition-colors">
                      Cultural &amp; Sports Activities
                    </Link>
                    <Link prefetch={true} href="/achievements" className="block px-4 py-1.5 text-[#F6F2E9] hover:bg-[#173D32] hover:text-[#C5A46D] transition-colors">
                      Student &amp; Faculty Achievements
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 8. GALLERY (Unified Direct Top-Level Link) */}
            <Link prefetch={true} href="/gallery"
              className={getNavItemClass(isGalleryActive)}
            >
              <span>Gallery</span>
            </Link>

            {/* 10. EXAMINATION (Dropdown - Positioned right-0) */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('examination')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                aria-expanded={activeDropdown === 'examination'}
                aria-haspopup="true"
                onClick={() => setActiveDropdown(activeDropdown === 'examination' ? null : 'examination')}
                className={getNavItemClass(pathname.startsWith('/examination'))}
              >
                <span>Examination</span>
                <ChevronDown className="w-3 h-3 text-[#C5A46D]/80 group-hover:text-[#DFCA9E] group-hover:rotate-180 transition-transform duration-200 shrink-0" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'examination' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full right-0 w-[300px] bg-[#0F2821] border border-[#C5A46D]/40 rounded-lg shadow-2xl py-2 mt-1 z-50 backdrop-blur-md text-xs space-y-1"
                  >
                    <Link prefetch={true} href="/examination" className="block px-4 py-1.5 text-[#DFCA9E] font-bold hover:bg-[#173D32] transition-colors">
                      Examination Cell Overview
                    </Link>
                    <Link prefetch={true} href="/examination#schedule" className="block px-4 py-1.5 text-[#F6F2E9] hover:bg-[#173D32] hover:text-[#C5A46D] transition-colors">
                      University Annual Timetable &amp; Datesheets
                    </Link>
                    <Link prefetch={true} href="/examination#rules" className="block px-4 py-1.5 text-[#F6F2E9] hover:bg-[#173D32] hover:text-[#C5A46D] transition-colors">
                      NCISM &amp; RAU Academic Regulations
                    </Link>
                    <Link prefetch={true} href="/examination#notices" className="block px-4 py-1.5 text-[#F6F2E9] hover:bg-[#173D32] hover:text-[#C5A46D] transition-colors">
                      Admit Cards &amp; Enrollment Circulars
                    </Link>
                    <a href="https://education.rajasthan.gov.in/content/raj/education/dr--sarvepalli-radhakrishnan-rajasthan-ayurved-university--jodhpur/en/home.html" target="_blank" rel="noopener noreferrer" className="block px-4 py-1.5 text-[#C5A46D] hover:bg-[#173D32] hover:text-[#DFCA9E] transition-colors flex items-center justify-between">
                      <span>DSRRAU Jodhpur Results Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <div className="border-t border-[#C5A46D]/20 my-1" />
                    <Link prefetch={true} href="/downloads" className="block px-4 py-1.5 text-[#81917A] hover:bg-[#173D32] hover:text-[#C5A46D] transition-colors">
                      Previous Question Archives &amp; Papers
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 11. MISCELLANEOUS (Multi-Column Dropdown - Positioned right-0) */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('miscellaneous')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                aria-expanded={activeDropdown === 'miscellaneous'}
                aria-haspopup="true"
                onClick={() => setActiveDropdown(activeDropdown === 'miscellaneous' ? null : 'miscellaneous')}
                className={getNavItemClass(pathname.startsWith('/miscellaneous') || pathname === '/contact')}
              >
                <span>Miscellaneous</span>
                <ChevronDown className="w-3 h-3 text-[#C5A46D]/80 group-hover:text-[#DFCA9E] group-hover:rotate-180 transition-transform duration-200 shrink-0" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'miscellaneous' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full right-0 w-[500px] bg-[#0F2821] border border-[#C5A46D]/40 rounded-lg shadow-2xl p-4 mt-1 z-50 backdrop-blur-md grid grid-cols-2 gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-widest block border-b border-[#C5A46D]/20 pb-1 mb-2">
                        Statutory &amp; Student Welfare
                      </span>
                      <Link prefetch={true} href="/miscellaneous" className="block py-1 text-[#DFCA9E] font-bold hover:text-white transition-colors">
                        Statutory Disclosures Portal
                      </Link>
                      <Link prefetch={true} href="/miscellaneous#iqac" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Internal Quality Assurance (IQAC)
                      </Link>
                      <Link prefetch={true} href="/miscellaneous#statutory-committees" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Anti-Ragging &amp; Student Grievance Cell
                      </Link>
                      <Link prefetch={true} href="/miscellaneous#statutory-committees" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        UGC E-Samadhan &amp; Complaints
                      </Link>
                      <Link prefetch={true} href="/miscellaneous#scholarships" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        National &amp; State Scholarship Portals
                      </Link>
                      <Link prefetch={true} href="/miscellaneous#rti-cell" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        RTI Act 2005 Cell &amp; Public Officers
                      </Link>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-widest block border-b border-[#C5A46D]/20 pb-1 mb-2">
                        Institutional Directory
                      </span>
                      <Link prefetch={true} href="/miscellaneous#alumni" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Vaidya Alumni Association &amp; Network
                      </Link>
                      <Link prefetch={true} href="/student-life" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Sports, Yoga &amp; Best Practices
                      </Link>
                      <Link prefetch={true} href="/academics/calendar" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        College Academic Calendar
                      </Link>
                      <Link prefetch={true} href="/contact" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Telephone Directory &amp; Key Contacts
                      </Link>
                      <Link prefetch={true} href="/contact" className="block py-1 text-[#C5A46D] font-bold hover:underline transition-colors pt-1">
                        Contact Directorate &amp; Route Map →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Action: Apply Now & Mobile Hamburger */}
          <div className="flex items-center justify-end space-x-1.5 sm:space-x-2 shrink-0">
            <Link prefetch={true} href="/admissions/apply"
              className="h-9 px-2.5 sm:px-3 xl:px-3 2xl:px-3.5 inline-flex items-center justify-center shrink-0 text-[11px] 2xl:text-xs uppercase tracking-wider font-bold text-[#173D32] bg-gradient-to-r from-[#DFCA9E] via-[#C5A46D] to-[#9A7E4F] rounded shadow-gold hover:shadow-luxury hover:brightness-105 active:scale-95 transition-all duration-300 border border-[#DFCA9E] whitespace-nowrap select-none"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-[#173D32] shrink-0" />
              <span className="whitespace-nowrap font-bold hidden sm:inline">Apply 2026</span>
              <span className="whitespace-nowrap font-bold sm:hidden">Apply</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden h-9 w-9 inline-flex items-center justify-center shrink-0 rounded text-white hover:text-[#DFCA9E] hover:bg-white/5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A46D]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* RAU-Inspired Mobile Accordion Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="xl:hidden bg-[#0A1D17] border-b border-[#C5A46D]/30 px-5 py-6 space-y-3 max-h-[82vh] overflow-y-auto divide-y divide-[#C5A46D]/15 text-xs"
          >
            {/* 1. Home */}
            <div className="pt-2">
              <Link
                prefetch={true}
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-bold transition-colors py-1 ${isHome ? 'text-[#DFCA9E]' : 'text-white hover:text-[#C5A46D]'
                  }`}
              >
                1. Home
              </Link>
            </div>

            {/* 2. About Us */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => toggleMobileAccordion('about')}
                className="w-full flex items-center justify-between text-sm font-bold text-white hover:text-[#C5A46D] py-1"
                aria-expanded={mobileExpanded === 'about'}
              >
                <span>2. About Us</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'about' ? 'rotate-180 text-[#C5A46D]' : ''}`} />
              </button>
              {mobileExpanded === 'about' && (
                <div className="pl-3 py-2 space-y-1.5 border-l-2 border-[#C5A46D]/30 mt-1">
                  <Link prefetch={true} href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">About the College</Link>
                  <Link prefetch={true} href="/about/history" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">History &amp; Heritage</Link>
                  <Link prefetch={true} href="/about/vision-mission" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Vision &amp; Mission</Link>
                  <Link prefetch={true} href="/about/management" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Governing Council</Link>
                  <Link prefetch={true} href="/about/principals-message" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Principal's Desk</Link>
                  <Link prefetch={true} href="/about/organization-structure" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Organization Structure</Link>
                  <Link prefetch={true} href="/about/annual-reports" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Annual Reports</Link>
                  <Link prefetch={true} href="/about/policies" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#DFCA9E] font-semibold">Policies &amp; Code of Conduct</Link>
                </div>
              )}
            </div>

            {/* 3. Documents */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => toggleMobileAccordion('documents')}
                className="w-full flex items-center justify-between text-sm font-bold text-white hover:text-[#C5A46D] py-1"
                aria-expanded={mobileExpanded === 'documents'}
              >
                <span>3. Documents</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'documents' ? 'rotate-180 text-[#C5A46D]' : ''}`} />
              </button>
              {mobileExpanded === 'documents' && (
                <div className="pl-3 py-2 space-y-1.5 border-l-2 border-[#C5A46D]/30 mt-1">
                  <Link prefetch={true} href="/mandatory-disclosures" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#DFCA9E] font-bold">Mandatory Disclosures (NCISM)</Link>
                  <Link prefetch={true} href="/mandatory-disclosures#council-permissions" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">NCISM Approvals</Link>
                  <Link prefetch={true} href="/mandatory-disclosures#university-affiliation" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">University Affiliation</Link>
                  <Link prefetch={true} href="/mandatory-disclosures#hospital-data" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Hospital Bed Data</Link>
                  <Link prefetch={true} href="/documents" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Institutional Documents</Link>
                  <Link prefetch={true} href="/documents?category=academic" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Curriculum &amp; Syllabus</Link>
                  <Link prefetch={true} href="/downloads" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#C5A46D]">Download Centre</Link>
                </div>
              )}
            </div>

            {/* 4. Academics */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => toggleMobileAccordion('academics')}
                className="w-full flex items-center justify-between text-sm font-bold text-white hover:text-[#C5A46D] py-1"
                aria-expanded={mobileExpanded === 'academics'}
              >
                <span>4. Academics</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'academics' ? 'rotate-180 text-[#C5A46D]' : ''}`} />
              </button>
              {mobileExpanded === 'academics' && (
                <div className="pl-3 py-2 space-y-1.5 border-l-2 border-[#C5A46D]/30 mt-1">
                  <Link prefetch={true} href="/courses/bams" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#DFCA9E] font-bold">B.A.M.S. (100 Seats)</Link>
                  <Link prefetch={true} href="/courses/md-ayurveda" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">M.D. Ayurveda</Link>
                  <Link prefetch={true} href="/courses/panchakarma-certificate" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Panchakarma Certificate</Link>
                  <Link prefetch={true} href="/departments" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">14 Academic Departments</Link>
                  <Link prefetch={true} href="/faculty" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Faculty Directory</Link>
                  <Link prefetch={true} href="/academics/calendar" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Academic Calendar</Link>
                  <Link prefetch={true} href="/academics/methodology" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Teaching Methodology</Link>
                  <Link prefetch={true} href="/infrastructure/laboratories" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Ayurvedic Laboratories</Link>
                  <Link prefetch={true} href="/infrastructure/library" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Central Library</Link>
                  <Link prefetch={true} href="/infrastructure/herbal-garden" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Dravyaguna Herbal Garden</Link>
                  <Link prefetch={true} href="/knowledge-hub" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#C5A46D]">Knowledge Hub &amp; Herbarium</Link>
                </div>
              )}
            </div>

            {/* 5. Research */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => toggleMobileAccordion('research')}
                className="w-full flex items-center justify-between text-sm font-bold text-white hover:text-[#C5A46D] py-1"
                aria-expanded={mobileExpanded === 'research'}
              >
                <span>5. Research</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'research' ? 'rotate-180 text-[#C5A46D]' : ''}`} />
              </button>
              {mobileExpanded === 'research' && (
                <div className="pl-3 py-2 space-y-1.5 border-l-2 border-[#C5A46D]/30 mt-1">
                  <Link prefetch={true} href="/research" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#DFCA9E] font-bold">Research Directorate</Link>
                  <Link prefetch={true} href="/research/activities" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Research Activities &amp; Trials</Link>
                  <Link prefetch={true} href="/research#publications" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Faculty Publications</Link>
                  <Link prefetch={true} href="/research/committees" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Research Committees</Link>
                  <Link prefetch={true} href="/research/committees#iec" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Ethics Committee (IEC)</Link>
                  <Link prefetch={true} href="/research#conferences" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Conferences &amp; CMEs</Link>
                  <Link prefetch={true} href="/research/collaborations" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Collaborations &amp; MoUs</Link>
                  <Link prefetch={true} href="/documents" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#C5A46D]">Research Repository</Link>
                </div>
              )}
            </div>

            {/* 6. Hospital */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => toggleMobileAccordion('hospital')}
                className="w-full flex items-center justify-between text-sm font-bold text-white hover:text-[#C5A46D] py-1"
                aria-expanded={mobileExpanded === 'hospital'}
              >
                <span>6. Hospital</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'hospital' ? 'rotate-180 text-[#C5A46D]' : ''}`} />
              </button>
              {mobileExpanded === 'hospital' && (
                <div className="pl-3 py-2 space-y-1.5 border-l-2 border-[#C5A46D]/30 mt-1">
                  <Link prefetch={true} href="/hospital" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#DFCA9E] font-bold">100-Bed Teaching Hospital</Link>
                  <Link prefetch={true} href="/hospital#departments" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">8 Clinical OPDs</Link>
                  <Link prefetch={true} href="/hospital#opd" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">OPD Timings &amp; Doctors</Link>
                  <Link prefetch={true} href="/hospital#ipd" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">IPD Inpatient Wards</Link>
                  <Link prefetch={true} href="/courses/panchakarma-certificate" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Panchakarma Center</Link>
                  <Link prefetch={true} href="/hospital#diagnostics" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Pathology &amp; Diagnostics</Link>
                  <Link prefetch={true} href="/infrastructure/hospital" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Hospital Infrastructure</Link>
                  <Link prefetch={true} href="/hospital#patient-guide" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Patient Services &amp; Tariffs</Link>
                  <Link prefetch={true} href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#C5A46D]">Hospital Emergency 24x7</Link>
                </div>
              )}
            </div>

            {/* 7. News & Events */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => toggleMobileAccordion('news')}
                className="w-full flex items-center justify-between text-sm font-bold text-white hover:text-[#C5A46D] py-1"
                aria-expanded={mobileExpanded === 'news'}
              >
                <span>7. News &amp; Events</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'news' ? 'rotate-180 text-[#C5A46D]' : ''}`} />
              </button>
              {mobileExpanded === 'news' && (
                <div className="pl-3 py-2 space-y-1.5 border-l-2 border-[#C5A46D]/30 mt-1">
                  <Link prefetch={true} href="/news-events" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Latest College News</Link>
                  <Link prefetch={true} href="/notices" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#DFCA9E] font-semibold">Official Notices &amp; Circulars</Link>
                  <Link prefetch={true} href="/student-life" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Cultural &amp; Sports</Link>
                  <Link prefetch={true} href="/achievements" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Achievements &amp; Medals</Link>
                </div>
              )}
            </div>

            {/* 8. Gallery (Unified Direct Mobile Top-Level Link) */}
            <div className="pt-2">
              <Link
                prefetch={true}
                href="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-1 text-sm font-bold transition-colors ${isGalleryActive ? 'text-[#DFCA9E]' : 'text-white hover:text-[#C5A46D]'
                  }`}
              >
                <span>8. Gallery</span>
              </Link>
            </div>

            {/* 9. Examination */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => toggleMobileAccordion('examination')}
                className="w-full flex items-center justify-between text-sm font-bold text-white hover:text-[#C5A46D] py-1"
                aria-expanded={mobileExpanded === 'examination'}
              >
                <span>9. Examination</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'examination' ? 'rotate-180 text-[#C5A46D]' : ''}`} />
              </button>
              {mobileExpanded === 'examination' && (
                <div className="pl-3 py-2 space-y-1.5 border-l-2 border-[#C5A46D]/30 mt-1">
                  <Link prefetch={true} href="/examination" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#DFCA9E] font-bold">Examination Centre</Link>
                  <Link prefetch={true} href="/examination#schedule" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Annual Datesheets</Link>
                  <Link prefetch={true} href="/examination#notices" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Examination Notices</Link>
                  <a href="https://education.rajasthan.gov.in/content/raj/education/dr--sarvepalli-radhakrishnan-rajasthan-ayurved-university--jodhpur/en/home.html" target="_blank" rel="noopener noreferrer" className="block py-0.5 text-[#C5A46D] flex items-center">
                    <span>University Results Portal</span> <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                  <Link prefetch={true} href="/downloads" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#81917A]">Previous Question Papers</Link>
                </div>
              )}
            </div>

            {/* 10. Miscellaneous */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => toggleMobileAccordion('misc')}
                className="w-full flex items-center justify-between text-sm font-bold text-white hover:text-[#C5A46D] py-1"
                aria-expanded={mobileExpanded === 'misc'}
              >
                <span>10. Miscellaneous</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'misc' ? 'rotate-180 text-[#C5A46D]' : ''}`} />
              </button>
              {mobileExpanded === 'misc' && (
                <div className="pl-3 py-2 space-y-1.5 border-l-2 border-[#C5A46D]/30 mt-1">
                  <Link prefetch={true} href="/miscellaneous" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#DFCA9E] font-bold">Statutory Portal</Link>
                  <Link prefetch={true} href="/miscellaneous#iqac" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">IQAC Cell</Link>
                  <Link prefetch={true} href="/miscellaneous#statutory-committees" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Anti-Ragging &amp; POSH</Link>
                  <Link prefetch={true} href="/miscellaneous#scholarships" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">National &amp; State Scholarships</Link>
                  <Link prefetch={true} href="/miscellaneous#alumni" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Vaidya Alumni Association</Link>
                  <Link prefetch={true} href="/miscellaneous#rti-cell" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">RTI Act 2005 Cell</Link>
                  <Link prefetch={true} href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-0.5 text-[#C5A46D]">Contact Directorate</Link>
                </div>
              )}
            </div>

            {/* Quick Portals & Helplines */}
            <div className="pt-4 flex flex-col gap-2">
              <Link prefetch={true} href="/admissions/apply"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs uppercase tracking-wider font-semibold text-[#173D32] bg-gradient-to-r from-[#DFCA9E] to-[#C5A46D] rounded shadow-gold font-bold"
              >
                Apply Online 2026–27
              </Link>
              <div className="flex items-center justify-center space-x-4 text-xs pt-2 text-[#81917A]">
                <Link prefetch={true} href="/admin/login" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C5A46D] flex items-center gap-1.5 font-medium text-[#DFCA9E]">
                  <User className="w-3.5 h-3.5 text-[#C5A46D]" />
                  <span>Admin Panel</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
