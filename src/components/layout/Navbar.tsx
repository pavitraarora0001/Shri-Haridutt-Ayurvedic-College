'use client';

import React, { useState, useEffect } from 'react';
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
  Users
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

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

  const isHome = pathname === '/';

  const toggleMobileAccordion = (section: string) => {
    setMobileExpanded(mobileExpanded === section ? null : section);
  };

  const linkUnderlineClass =
    'relative after:absolute after:bottom-0.5 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C5A46D] hover:after:w-full after:transition-all after:duration-300';

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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#173D32] shadow-luxury border-b border-[#C5A46D]/30 py-2'
          : isHome
          ? 'bg-[#173D32]/95 backdrop-blur-md border-b border-[#C5A46D]/20 py-2.5'
          : 'bg-[#173D32] border-b border-[#C5A46D]/30 py-2.5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-7">
        <div className="flex items-center justify-between gap-2 lg:gap-3 w-full">
          {/* Logo & College Identity */}
          <Link prefetch={true} href="/"
            className="flex items-center space-x-2.5 sm:space-x-3 group shrink-0 min-w-max py-0.5 select-none"
          >
            {/* Vedic Emblem Crest */}
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-[#C5A46D] bg-[#0F2821] flex items-center justify-center p-0.5 shadow-gold group-hover:scale-105 transition-transform duration-300 shrink-0">
              <div className="w-full h-full rounded-full border border-[#C5A46D]/40 flex flex-col items-center justify-center text-center">
                <span className="text-[#C5A46D] text-xs font-serif font-bold leading-none">ॐ</span>
                <span className="text-[7px] font-serif text-[#C5A46D]/90 uppercase tracking-widest leading-none mt-0.5">SHAMC</span>
              </div>
            </div>

            {/* Non-wrapping typography */}
            <div className="flex flex-col justify-center whitespace-nowrap shrink-0 min-w-max">
              <span className="font-serif text-sm sm:text-base md:text-lg font-bold tracking-tight text-white group-hover:text-[#C5A46D] transition-colors leading-tight whitespace-nowrap block">
                Shri Haridutt Ayurvedic
              </span>
              <span className="text-[9.5px] sm:text-[10.5px] font-sans tracking-[0.15em] text-[#C5A46D] uppercase font-semibold leading-tight mt-0.5 whitespace-nowrap block">
                Medical College &amp; Hospital
              </span>
              <span className="hidden 2xl:block text-[8.5px] text-[#81917A] tracking-wider leading-none mt-0.5 whitespace-nowrap">
                Affiliated to Dr. S.R. Rajasthan Ayurved University · NCISM Approved
              </span>
            </div>
          </Link>

          {/* RAU-Inspired Master 9-Pillar Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-0.5 2xl:space-x-1 shrink-0">
            {/* 1. HOME */}
            <Link prefetch={true} href="/"
              className={`px-1.5 2xl:px-2 py-1.5 text-[11px] 2xl:text-[11.5px] font-medium tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 ${linkUnderlineClass} ${
                pathname === '/' ? 'text-[#C5A46D] font-bold' : 'text-[#F6F2E9]/90 hover:text-[#C5A46D]'
              }`}
            >
              Home
            </Link>

            {/* 2. ABOUT US (Multi-Column Dropdown) */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`px-1.5 2xl:px-2 py-1.5 text-[11px] 2xl:text-[11.5px] font-medium tracking-wider uppercase transition-colors flex items-center space-x-1 whitespace-nowrap shrink-0 ${linkUnderlineClass} ${
                  pathname.startsWith('/about') ? 'text-[#C5A46D] font-bold' : 'text-[#F6F2E9]/90 hover:text-[#C5A46D]'
                }`}
              >
                <span>About Us</span>
                <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
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
                className={`px-1.5 2xl:px-2 py-1.5 text-[11px] 2xl:text-[11.5px] font-medium tracking-wider uppercase transition-colors flex items-center space-x-1 whitespace-nowrap shrink-0 ${linkUnderlineClass} ${
                  pathname.startsWith('/documents') || pathname === '/mandatory-disclosures'
                    ? 'text-[#C5A46D] font-bold'
                    : 'text-[#F6F2E9]/90 hover:text-[#C5A46D]'
                }`}
              >
                <span>Documents</span>
                <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'documents' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 w-[540px] bg-[#0F2821] border border-[#C5A46D]/40 rounded-lg shadow-2xl p-4 mt-1 z-50 backdrop-blur-md grid grid-cols-2 gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-widest block border-b border-[#C5A46D]/20 pb-1 mb-2">
                        Academic &amp; Admissions
                      </span>
                      <Link prefetch={true} href="/documents?cat=Fee+Structure" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Approved Fee Structure (BAMS / MD)
                      </Link>
                      <Link prefetch={true} href="/documents?cat=Syllabus+%26+Curriculum" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Syllabus &amp; Curriculum (NCISM MSE)
                      </Link>
                      <Link prefetch={true} href="/documents?cat=Admission+Notifications" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Admission Notifications &amp; NEET Quotas
                      </Link>
                      <Link prefetch={true} href="/documents?cat=Approvals+%26+Affiliations" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Recognition of Courses &amp; AYUSH Orders
                      </Link>
                      <Link prefetch={true} href="/documents?cat=Prospectus" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        College Prospectus &amp; Brochure
                      </Link>
                      <Link prefetch={true} href="/about" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        College Information &amp; Factsheet
                      </Link>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-widest block border-b border-[#C5A46D]/20 pb-1 mb-2">
                        Statutory &amp; Regulatory
                      </span>
                      <Link prefetch={true} href="/mandatory-disclosures" className="block py-1 text-[#DFCA9E] font-bold hover:text-white transition-colors flex items-center justify-between">
                        <span>NCISM Mandatory Disclosures</span>
                        <span className="text-[9px] bg-[#C5A46D] text-[#173D32] px-1.5 py-0.2 rounded font-mono">16 MSR</span>
                      </Link>
                      <Link prefetch={true} href="/documents?cat=Approvals+%26+Affiliations" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Approval &amp; Affiliation Orders (Dr. S.R. RAU)
                      </Link>
                      <Link prefetch={true} href="/about/annual-reports" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Annual Reports &amp; Financial Statements
                      </Link>
                      <Link prefetch={true} href="/about/policies" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Policies &amp; Institutional Regulations
                      </Link>
                      <Link prefetch={true} href="/documents?cat=Tenders+%26+Notices" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Government Circulars, Tenders &amp; Notices
                      </Link>
                      <Link prefetch={true} href="/documents" className="block py-1 text-[#C5A46D] font-semibold hover:underline transition-colors pt-1">
                        View Complete Document Vault →
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
                className={`px-1.5 2xl:px-2 py-1.5 text-[11px] 2xl:text-[11.5px] font-medium tracking-wider uppercase transition-colors flex items-center space-x-1 whitespace-nowrap shrink-0 ${linkUnderlineClass} ${
                  pathname.startsWith('/academics') || pathname.startsWith('/courses') || pathname.startsWith('/departments') || pathname.startsWith('/faculty')
                    ? 'text-[#C5A46D] font-bold'
                    : 'text-[#F6F2E9]/90 hover:text-[#C5A46D]'
                }`}
              >
                <span>Academics</span>
                <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'academics' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 w-[540px] bg-[#0F2821] border border-[#C5A46D]/40 rounded-lg shadow-2xl p-4 mt-1 z-50 backdrop-blur-md grid grid-cols-2 gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#C5A46D] tracking-widest block border-b border-[#C5A46D]/20 pb-1 mb-2">
                        Programmes Offered
                      </span>
                      <Link prefetch={true} href="/academics" className="block py-1 text-[#F6F2E9] hover:text-[#C5A46D] transition-colors">
                        Academic Overview
                      </Link>
                      <Link prefetch={true} href="/courses/bams" className="block py-1 text-[#DFCA9E] font-bold hover:text-white transition-colors">
                        Undergraduate B.A.M.S. (100 Seats)
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
                className={`px-1.5 2xl:px-2 py-1.5 text-[11px] 2xl:text-[11.5px] font-medium tracking-wider uppercase transition-colors flex items-center space-x-1 whitespace-nowrap shrink-0 ${linkUnderlineClass} ${
                  pathname.startsWith('/research') ? 'text-[#C5A46D] font-bold' : 'text-[#F6F2E9]/90 hover:text-[#C5A46D]'
                }`}
              >
                <span>Research</span>
                <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
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
                className={`px-1.5 2xl:px-2 py-1.5 text-[11px] 2xl:text-[11.5px] font-medium tracking-wider uppercase transition-colors flex items-center space-x-1 whitespace-nowrap shrink-0 ${linkUnderlineClass} ${
                  pathname.startsWith('/hospital') || pathname.startsWith('/infrastructure/hospital')
                    ? 'text-[#C5A46D] font-bold'
                    : 'text-[#F6F2E9]/90 hover:text-[#C5A46D]'
                }`}
              >
                <span>Hospital</span>
                <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
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
                className={`px-1.5 2xl:px-2 py-1.5 text-[11px] 2xl:text-[11.5px] font-medium tracking-wider uppercase transition-colors flex items-center space-x-1 whitespace-nowrap shrink-0 ${linkUnderlineClass} ${
                  pathname.startsWith('/news-events') || pathname === '/notices' || pathname === '/gallery' || pathname === '/achievements'
                    ? 'text-[#C5A46D] font-bold'
                    : 'text-[#F6F2E9]/90 hover:text-[#C5A46D]'
                }`}
              >
                <span>News &amp; Events</span>
                <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
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
                    <div className="border-t border-[#C5A46D]/20 my-1" />
                    <Link prefetch={true} href="/gallery" className="block px-4 py-1.5 text-[#C5A46D] font-bold hover:bg-[#173D32] transition-colors flex items-center justify-between">
                      <span>Photo Gallery Archive</span>
                      <span className="text-[10px] bg-[#C5A46D] text-[#173D32] px-1.5 rounded">24 Frames</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 8. EXAMINATION (Dropdown - Positioned right-0) */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('examination')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`px-1.5 2xl:px-2 py-1.5 text-[11px] 2xl:text-[11.5px] font-medium tracking-wider uppercase transition-colors flex items-center space-x-1 whitespace-nowrap shrink-0 ${linkUnderlineClass} ${
                  pathname.startsWith('/examination') ? 'text-[#C5A46D] font-bold' : 'text-[#F6F2E9]/90 hover:text-[#C5A46D]'
                }`}
              >
                <span>Examination</span>
                <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'examination' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full right-0 w-72 bg-[#0F2821] border border-[#C5A46D]/40 rounded-lg shadow-2xl py-2 mt-1 z-50 backdrop-blur-md text-xs space-y-1"
                  >
                    <Link prefetch={true} href="/examination" className="block px-4 py-1.5 text-[#DFCA9E] font-bold hover:bg-[#173D32] transition-colors">
                      Examination Centre Overview
                    </Link>
                    <Link prefetch={true} href="/examination#schedule" className="block px-4 py-1.5 text-[#F6F2E9] hover:bg-[#173D32] hover:text-[#C5A46D] transition-colors">
                      Annual &amp; Term Datesheets
                    </Link>
                    <Link prefetch={true} href="/examination#notices" className="block px-4 py-1.5 text-[#F6F2E9] hover:bg-[#173D32] hover:text-[#C5A46D] transition-colors">
                      Examination Related Notices &amp; Forms
                    </Link>
                    <a
                      href="https://education.rajasthan.gov.in/content/raj/education/dr--sarvepalli-radhakrishnan-rajasthan-ayurved-university--jodhpur/en/home.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-1.5 text-[#C5A46D] font-semibold hover:bg-[#173D32] transition-colors flex items-center justify-between"
                    >
                      <span>University Examination Results</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                    <Link prefetch={true} href="/examination#practical" className="block px-4 py-1.5 text-[#F6F2E9] hover:bg-[#173D32] hover:text-[#C5A46D] transition-colors">
                      Practical Clinical Viva Information
                    </Link>
                    <div className="border-t border-[#C5A46D]/20 my-1" />
                    <Link prefetch={true} href="/downloads" className="block px-4 py-1.5 text-[#81917A] hover:bg-[#173D32] hover:text-[#C5A46D] transition-colors">
                      Previous Question Archives &amp; Papers
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 9. MISCELLANEOUS (Multi-Column Dropdown - Positioned right-0) */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('miscellaneous')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`px-1.5 2xl:px-2 py-1.5 text-[11px] 2xl:text-[11.5px] font-medium tracking-wider uppercase transition-colors flex items-center space-x-1 whitespace-nowrap shrink-0 ${linkUnderlineClass} ${
                  pathname.startsWith('/miscellaneous') || pathname === '/contact'
                    ? 'text-[#C5A46D] font-bold'
                    : 'text-[#F6F2E9]/90 hover:text-[#C5A46D]'
                }`}
              >
                <span>Miscellaneous</span>
                <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
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
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0 min-w-max">
            <Link prefetch={true} href="/admissions/apply"
              className="relative inline-flex items-center justify-center px-3 xl:px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold text-[#173D32] bg-gradient-to-r from-[#DFCA9E] via-[#C5A46D] to-[#9A7E4F] rounded shadow-gold hover:shadow-luxury hover:brightness-105 active:scale-95 transition-all duration-300 border border-[#DFCA9E] whitespace-nowrap shrink-0 select-none"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-[#173D32] shrink-0" />
              <span className="whitespace-nowrap font-bold text-[11px] xl:text-xs">Apply 2026</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-white hover:text-[#C5A46D] focus:outline-none shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              <Link prefetch={true} href="/" className="block text-sm font-bold text-white hover:text-[#C5A46D] py-1">
                1. Home
              </Link>
            </div>

            {/* 2. About Us */}
            <div className="pt-2">
              <button
                onClick={() => toggleMobileAccordion('about')}
                className="w-full flex items-center justify-between text-sm font-bold text-white hover:text-[#C5A46D] py-1"
              >
                <span>2. About Us</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'about' ? 'rotate-180 text-[#C5A46D]' : ''}`} />
              </button>
              {mobileExpanded === 'about' && (
                <div className="pl-3 py-2 space-y-1.5 border-l-2 border-[#C5A46D]/30 mt-1">
                  <Link prefetch={true} href="/about" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">About the College</Link>
                  <Link prefetch={true} href="/about/history" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">History &amp; Heritage</Link>
                  <Link prefetch={true} href="/about/vision-mission" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Vision &amp; Mission</Link>
                  <Link prefetch={true} href="/about/management" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Governing Council</Link>
                  <Link prefetch={true} href="/about/principals-message" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Principal's Desk</Link>
                  <Link prefetch={true} href="/about/organization-structure" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Organization Structure</Link>
                  <Link prefetch={true} href="/about/annual-reports" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Annual Reports</Link>
                  <Link prefetch={true} href="/about/policies" className="block py-0.5 text-[#DFCA9E] font-semibold">Policies &amp; Code of Conduct</Link>
                </div>
              )}
            </div>

            {/* 3. Documents */}
            <div className="pt-2">
              <button
                onClick={() => toggleMobileAccordion('documents')}
                className="w-full flex items-center justify-between text-sm font-bold text-white hover:text-[#C5A46D] py-1"
              >
                <span>3. Documents</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'documents' ? 'rotate-180 text-[#C5A46D]' : ''}`} />
              </button>
              {mobileExpanded === 'documents' && (
                <div className="pl-3 py-2 space-y-1.5 border-l-2 border-[#C5A46D]/30 mt-1">
                  <Link prefetch={true} href="/documents" className="block py-0.5 text-[#DFCA9E] font-bold">Document Vault Master</Link>
                  <Link prefetch={true} href="/documents?cat=Fee+Structure" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Fee Structure (BAMS/MD)</Link>
                  <Link prefetch={true} href="/documents?cat=Syllabus+%26+Curriculum" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Syllabus / Curriculum</Link>
                  <Link prefetch={true} href="/documents?cat=Admission+Notifications" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Admission Notifications</Link>
                  <Link prefetch={true} href="/documents?cat=Prospectus" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Prospectus 2026–27</Link>
                  <Link prefetch={true} href="/mandatory-disclosures" className="block py-0.5 text-[#DFCA9E] font-bold">NCISM Mandatory Disclosures</Link>
                  <Link prefetch={true} href="/documents?cat=Approvals+%26+Affiliations" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Approval &amp; Affiliation Orders</Link>
                </div>
              )}
            </div>

            {/* 4. Academics */}
            <div className="pt-2">
              <button
                onClick={() => toggleMobileAccordion('academics')}
                className="w-full flex items-center justify-between text-sm font-bold text-white hover:text-[#C5A46D] py-1"
              >
                <span>4. Academics</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'academics' ? 'rotate-180 text-[#C5A46D]' : ''}`} />
              </button>
              {mobileExpanded === 'academics' && (
                <div className="pl-3 py-2 space-y-1.5 border-l-2 border-[#C5A46D]/30 mt-1">
                  <Link prefetch={true} href="/academics" className="block py-0.5 text-[#DFCA9E] font-bold">Academic Overview</Link>
                  <Link prefetch={true} href="/courses/bams" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">B.A.M.S. (100 Seats)</Link>
                  <Link prefetch={true} href="/courses/md-ayurveda" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">M.D. (Kayachikitsa)</Link>
                  <Link prefetch={true} href="/departments" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">14 Classical Departments</Link>
                  <Link prefetch={true} href="/faculty" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Teaching Faculty Directory</Link>
                  <Link prefetch={true} href="/academics/methodology" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Teaching Methodology</Link>
                  <Link prefetch={true} href="/academics/calendar" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Academic Calendar 2026–27</Link>
                  <Link prefetch={true} href="/knowledge-hub" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Charak Vatika Herbarium</Link>
                </div>
              )}
            </div>

            {/* 5. Research */}
            <div className="pt-2">
              <button
                onClick={() => toggleMobileAccordion('research')}
                className="w-full flex items-center justify-between text-sm font-bold text-white hover:text-[#C5A46D] py-1"
              >
                <span>5. Research</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'research' ? 'rotate-180 text-[#C5A46D]' : ''}`} />
              </button>
              {mobileExpanded === 'research' && (
                <div className="pl-3 py-2 space-y-1.5 border-l-2 border-[#C5A46D]/30 mt-1">
                  <Link prefetch={true} href="/research" className="block py-0.5 text-[#DFCA9E] font-bold">Research Overview</Link>
                  <Link prefetch={true} href="/research/activities" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Activities &amp; Clinical Trials</Link>
                  <Link prefetch={true} href="/research#publications" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Faculty Publications</Link>
                  <Link prefetch={true} href="/research/committees" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Ethics Committee (IEC)</Link>
                  <Link prefetch={true} href="/research/collaborations" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Collaborations &amp; MoUs</Link>
                </div>
              )}
            </div>

            {/* 6. Hospital */}
            <div className="pt-2">
              <button
                onClick={() => toggleMobileAccordion('hospital')}
                className="w-full flex items-center justify-between text-sm font-bold text-white hover:text-[#C5A46D] py-1"
              >
                <span>6. Hospital</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'hospital' ? 'rotate-180 text-[#C5A46D]' : ''}`} />
              </button>
              {mobileExpanded === 'hospital' && (
                <div className="pl-3 py-2 space-y-1.5 border-l-2 border-[#C5A46D]/30 mt-1">
                  <Link prefetch={true} href="/hospital" className="block py-0.5 text-[#DFCA9E] font-bold">100-Bed Hospital Overview</Link>
                  <Link prefetch={true} href="/hospital#departments" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">8 Clinical OPD Wards</Link>
                  <Link prefetch={true} href="/courses/panchakarma-certificate" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Panchakarma Department</Link>
                  <Link prefetch={true} href="/hospital#diagnostics" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Diagnostic Pathology &amp; ECG</Link>
                  <Link prefetch={true} href="/hospital#outreach" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Outreach Medical Camps</Link>
                  <Link prefetch={true} href="/contact" className="block py-0.5 text-[#DFCA9E]">24x7 Casualty Helpline</Link>
                </div>
              )}
            </div>

            {/* 7. News & Events */}
            <div className="pt-2">
              <button
                onClick={() => toggleMobileAccordion('news')}
                className="w-full flex items-center justify-between text-sm font-bold text-white hover:text-[#C5A46D] py-1"
              >
                <span>7. News &amp; Events</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'news' ? 'rotate-180 text-[#C5A46D]' : ''}`} />
              </button>
              {mobileExpanded === 'news' && (
                <div className="pl-3 py-2 space-y-1.5 border-l-2 border-[#C5A46D]/30 mt-1">
                  <Link prefetch={true} href="/news-events" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Latest News</Link>
                  <Link prefetch={true} href="/notices" className="block py-0.5 text-[#DFCA9E] font-semibold">Official Notices &amp; Circulars</Link>
                  <Link prefetch={true} href="/student-life" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Cultural &amp; Sports</Link>
                  <Link prefetch={true} href="/achievements" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Achievements &amp; Medals</Link>
                  <Link prefetch={true} href="/gallery" className="block py-0.5 text-[#C5A46D] font-bold">Photo Gallery (24 Frames)</Link>
                </div>
              )}
            </div>

            {/* 8. Examination */}
            <div className="pt-2">
              <button
                onClick={() => toggleMobileAccordion('examination')}
                className="w-full flex items-center justify-between text-sm font-bold text-white hover:text-[#C5A46D] py-1"
              >
                <span>8. Examination</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'examination' ? 'rotate-180 text-[#C5A46D]' : ''}`} />
              </button>
              {mobileExpanded === 'examination' && (
                <div className="pl-3 py-2 space-y-1.5 border-l-2 border-[#C5A46D]/30 mt-1">
                  <Link prefetch={true} href="/examination" className="block py-0.5 text-[#DFCA9E] font-bold">Examination Centre</Link>
                  <Link prefetch={true} href="/examination#schedule" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Annual Datesheets</Link>
                  <Link prefetch={true} href="/examination#notices" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Examination Notices</Link>
                  <a href="https://education.rajasthan.gov.in/content/raj/education/dr--sarvepalli-radhakrishnan-rajasthan-ayurved-university--jodhpur/en/home.html" target="_blank" rel="noopener noreferrer" className="block py-0.5 text-[#C5A46D] flex items-center">
                    <span>University Results Portal</span> <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                  <Link prefetch={true} href="/downloads" className="block py-0.5 text-[#81917A]">Previous Question Papers</Link>
                </div>
              )}
            </div>

            {/* 9. Miscellaneous */}
            <div className="pt-2">
              <button
                onClick={() => toggleMobileAccordion('misc')}
                className="w-full flex items-center justify-between text-sm font-bold text-white hover:text-[#C5A46D] py-1"
              >
                <span>9. Miscellaneous</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'misc' ? 'rotate-180 text-[#C5A46D]' : ''}`} />
              </button>
              {mobileExpanded === 'misc' && (
                <div className="pl-3 py-2 space-y-1.5 border-l-2 border-[#C5A46D]/30 mt-1">
                  <Link prefetch={true} href="/miscellaneous" className="block py-0.5 text-[#DFCA9E] font-bold">Statutory Portal</Link>
                  <Link prefetch={true} href="/miscellaneous#iqac" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">IQAC Cell</Link>
                  <Link prefetch={true} href="/miscellaneous#statutory-committees" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Anti-Ragging &amp; POSH</Link>
                  <Link prefetch={true} href="/miscellaneous#scholarships" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">National &amp; State Scholarships</Link>
                  <Link prefetch={true} href="/miscellaneous#alumni" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">Vaidya Alumni Association</Link>
                  <Link prefetch={true} href="/miscellaneous#rti-cell" className="block py-0.5 text-[#F6F2E9]/90 hover:text-[#C5A46D]">RTI Act 2005 Cell</Link>
                  <Link prefetch={true} href="/contact" className="block py-0.5 text-[#C5A46D]">Contact Directorate</Link>
                </div>
              )}
            </div>

            {/* Quick Portals & Helplines */}
            <div className="pt-4 flex flex-col gap-2">
              <Link prefetch={true} href="/admissions/apply"
                className="w-full text-center py-2.5 text-xs uppercase tracking-wider font-semibold text-[#173D32] bg-gradient-to-r from-[#DFCA9E] to-[#C5A46D] rounded shadow-gold font-bold"
              >
                Apply Online 2026–27
              </Link>
              <div className="flex items-center justify-between text-xs pt-2 text-[#81917A]">
                <Link prefetch={true} href="/student/login" className="hover:text-[#C5A46D]">Scholar Portal</Link>
                <span>•</span>
                <Link prefetch={true} href="/faculty-portal/login" className="hover:text-[#C5A46D]">Faculty Login</Link>
                <span>•</span>
                <Link prefetch={true} href="/admin/login" className="hover:text-[#C5A46D]">Admin CMS</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
