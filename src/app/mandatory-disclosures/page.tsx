'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { INSTITUTION_INFO } from '@/lib/data';
import { NCISM_DISCLOSURES, DisclosureCategoryData, DisclosureDocumentData } from '@/lib/disclosure-data';
import { triggerPdfDownload } from '@/lib/download';
import {
  ShieldCheck,
  FileText,
  Download,
  Eye,
  CheckCircle2,
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  Printer,
  X,
  Maximize2,
  Calendar,
  Building,
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Activity,
  AlertCircle,
  Building2,
  FileCheck,
  CheckSquare,
  Sparkles,
  Clock,
  BookMarked,
  UserCheck,
  Phone,
  Mail,
  MapPin,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export default function MandatoryDisclosurePortal() {
  const [categoriesData, setCategoriesData] = useState<DisclosureCategoryData[]>(NCISM_DISCLOSURES);
  const [activeCategoryNum, setActiveCategoryNum] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [activeDocModal, setActiveDocModal] = useState<DisclosureDocumentData | null>(null);
  const [viewMode, setViewMode] = useState<'PANEL' | 'ALL'>('PANEL');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    fetch('/api/disclosures')
      .then((res) => res.json())
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setCategoriesData((prev) => {
            return prev.map((cat) => {
              const dbCat = res.data.find((c: any) => c.categoryNumber === cat.categoryNumber);
              if (dbCat && dbCat.documents && dbCat.documents.length > 0) {
                const existingUrls = new Set(cat.documents.map((d) => d.fileUrl));
                const newDocs = dbCat.documents.filter((d: any) => !existingUrls.has(d.fileUrl));
                return {
                  ...cat,
                  documents: [...newDocs, ...cat.documents],
                };
              }
              return cat;
            });
          });
        }
      })
      .catch(() => {});
  }, []);

  // Icon mapper
  const getIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'UserCheck': return <UserCheck className={className} />;
      case 'Award': return <Award className={className} />;
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'Building2': return <Building2 className={className} />;
      case 'Users': return <Users className={className} />;
      case 'CheckSquare': return <CheckSquare className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      case 'FileCheck': return <FileCheck className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'Bell': return <AlertCircle className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'ExternalLink': return <ExternalLink className={className} />;
      case 'Clock': return <Clock className={className} />;
      case 'BookMarked': return <BookMarked className={className} />;
      default: return <FileText className={className} />;
    }
  };

  // Filter categories based on search & academic session
  const filteredCategories = useMemo(() => {
    return categoriesData.filter((cat) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        cat.title.toLowerCase().includes(q) ||
        cat.description.toLowerCase().includes(q) ||
        cat.regulatoryReference.toLowerCase().includes(q) ||
        cat.records.some(r => r.title.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q) || (r.referenceCode && r.referenceCode.toLowerCase().includes(q))) ||
        cat.documents.some(d => d.title.toLowerCase().includes(q) || d.documentCode.toLowerCase().includes(q));

      const matchYear =
        selectedYear === 'ALL' ||
        cat.records.some(r => r.academicYear === selectedYear) ||
        cat.documents.some(d => d.academicYear === selectedYear);

      return matchSearch && matchYear;
    });
  }, [searchQuery, selectedYear]);

  const activeCategory = useMemo(() => {
    return (
      filteredCategories.find(c => c.categoryNumber === activeCategoryNum) ||
      filteredCategories[0] ||
      categoriesData[0]
    );
  }, [filteredCategories, activeCategoryNum, categoriesData]);

  // Statistics counters
  const totalDocsCount = useMemo(() => {
    return categoriesData.reduce((acc, curr) => acc + curr.documents.length, 0);
  }, [categoriesData]);

  return (
    <div className="bg-[#F6F2E9] min-h-screen text-[#342B25] selection:bg-[#C5A46D] selection:text-[#173D32]">
      {/* Institutional Hero Banner */}
      <PageHeader
        title="NCISM Mandatory Disclosures"
        subtitle="National Commission for Indian System of Medicine Statutory Transparency Portal"
        crumbs={[
          { label: 'Mandatory Disclosure' }
        ]}
      />

      {/* Statutory Header Notification Strip */}
      <div className="bg-[#173D32] border-b border-[#C5A46D]/30 py-3 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2.5">
            <span className="p-1 rounded bg-[#C5A46D]/20 text-[#DFCA9E] border border-[#C5A46D]/40">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="font-sans font-medium text-[#F6F2E9]">
              Published in strict compliance with <strong>Section 28 of NCISM Act, 2020</strong> &amp; Minimum Standard Requirements (MSR) Regulations.
            </span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-[#DFCA9E] whitespace-nowrap">
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              <span>Current Session: <strong>2026–27</strong></span>
            </span>
            <span>•</span>
            <span className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              <span>Status: <strong>Approved for 100 Seats BAMS</strong></span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Compliance Key Figures Card */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-lg border border-[#C5A46D]/30 shadow-card flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#173D32]/10 text-[#173D32] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#173D32]" />
            </div>
            <div>
              <p className="text-2xl font-bold font-serif text-[#173D32]">16 / 16</p>
              <p className="text-[11px] text-[#81917A] uppercase tracking-wider font-semibold">MSR Categories Compliant</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#C5A46D]/30 shadow-card flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#173D32]/10 text-[#173D32] flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-[#173D32]" />
            </div>
            <div>
              <p className="text-2xl font-bold font-serif text-[#173D32]">100 Seats</p>
              <p className="text-[11px] text-[#81917A] uppercase tracking-wider font-semibold">NCISM Sanctioned BAMS</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#C5A46D]/30 shadow-card flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#173D32]/10 text-[#173D32] flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-[#173D32]" />
            </div>
            <div>
              <p className="text-2xl font-bold font-serif text-[#173D32]">48+ Faculty</p>
              <p className="text-[11px] text-[#81917A] uppercase tracking-wider font-semibold">Across 14 Departments</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#C5A46D]/30 shadow-card flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#173D32]/10 text-[#173D32] flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-[#173D32]" />
            </div>
            <div>
              <p className="text-2xl font-bold font-serif text-[#173D32]">100 Beds</p>
              <p className="text-[11px] text-[#81917A] uppercase tracking-wider font-semibold">Teaching Hospital (IPD)</p>
            </div>
          </div>
        </div>

        {/* Search, Filter & View Controls */}
        <div className="bg-white p-4 sm:p-6 rounded-lg border border-[#C5A46D]/30 shadow-card flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#81917A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search across 16 disclosure categories, faculty, reports, document codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded border border-[#C5A46D]/40 bg-[#F6F2E9]/40 focus:outline-none focus:border-[#173D32] focus:bg-white transition-all text-[#342B25] placeholder:text-[#81917A]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#81917A] hover:text-[#173D32]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Academic Session Filter */}
          <div className="flex items-center space-x-2 shrink-0">
            <Filter className="w-4 h-4 text-[#C5A46D] shrink-0" />
            <span className="text-xs font-semibold text-[#173D32] uppercase tracking-wider">Session:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="text-xs py-2 px-3 rounded border border-[#C5A46D]/40 bg-white font-medium text-[#173D32] focus:outline-none focus:border-[#173D32]"
            >
              <option value="ALL">All Academic Sessions</option>
              <option value="2026-27">Academic Session 2026–27</option>
              <option value="2025-26">Academic Session 2025–26</option>
              <option value="2024-25">Academic Session 2024–25</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#F6F2E9] rounded p-1 border border-[#C5A46D]/30 shrink-0">
            <button
              onClick={() => setViewMode('PANEL')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                viewMode === 'PANEL'
                  ? 'bg-[#173D32] text-white shadow-sm'
                  : 'text-[#342B25]/80 hover:text-[#173D32]'
              }`}
            >
              Interactive Explorer
            </button>
            <button
              onClick={() => setViewMode('ALL')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                viewMode === 'ALL'
                  ? 'bg-[#173D32] text-white shadow-sm'
                  : 'text-[#342B25]/80 hover:text-[#173D32]'
              }`}
            >
              Complete Index (All 16)
            </button>
          </div>
        </div>

        {/* Mobile Category Select Dropdown */}
        <div className="lg:hidden bg-white p-3 rounded-lg border border-[#C5A46D]/30 shadow-card">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between text-xs font-bold text-[#173D32] py-1"
          >
            <span>
              {activeCategory
                ? `${String(activeCategory.categoryNumber).padStart(2, '0')}. ${activeCategory.title}`
                : 'Select Disclosure Category'}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {mobileMenuOpen && (
            <div className="mt-3 pt-3 border-t border-[#C5A46D]/20 space-y-1 max-h-60 overflow-y-auto">
              {filteredCategories.map((cat) => (
                <button
                  key={cat.categoryNumber}
                  onClick={() => {
                    setActiveCategoryNum(cat.categoryNumber);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded transition-colors ${
                    activeCategoryNum === cat.categoryNumber
                      ? 'bg-[#173D32] text-white font-semibold'
                      : 'text-[#342B25] hover:bg-[#F6F2E9]'
                  }`}
                >
                  <span className="font-mono text-[#C5A46D] mr-2">
                    {String(cat.categoryNumber).padStart(2, '0')}.
                  </span>
                  <span>{cat.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Area based on View Mode */}
        {viewMode === 'PANEL' ? (
          /* Dual-Pane Master Detail Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Sidebar Navigation (16 Categories) */}
            <div className="hidden lg:block lg:col-span-4 xl:col-span-4 bg-white rounded-lg border border-[#C5A46D]/30 shadow-card overflow-hidden sticky top-24 max-h-[calc(100vh-120px)] flex flex-col">
              <div className="p-4 bg-[#173D32] text-white border-b border-[#C5A46D]/30">
                <h3 className="font-serif text-sm font-bold tracking-wide">
                  NCISM Statutory Modules
                </h3>
                <p className="text-[10px] text-[#DFCA9E] font-light mt-0.5">
                  16 MSR Disclosure Categories as per Regulation Norms
                </p>
              </div>

              <div className="overflow-y-auto divide-y divide-[#C5A46D]/15 flex-1 p-1">
                {filteredCategories.map((cat) => {
                  const isActive = activeCategoryNum === cat.categoryNumber;
                  return (
                    <button
                      key={cat.categoryNumber}
                      onClick={() => setActiveCategoryNum(cat.categoryNumber)}
                      className={`w-full text-left p-3 rounded transition-all flex items-start space-x-3 group ${
                        isActive
                          ? 'bg-[#173D32] text-white shadow-md'
                          : 'hover:bg-[#F6F2E9]/60 text-[#342B25]'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                          isActive
                            ? 'bg-[#C5A46D] text-[#173D32]'
                            : 'bg-[#F6F2E9] text-[#173D32] border border-[#C5A46D]/30 group-hover:border-[#C5A46D]'
                        }`}
                      >
                        {String(cat.categoryNumber).padStart(2, '0')}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-xs font-semibold leading-snug truncate ${
                            isActive ? 'text-white' : 'text-[#173D32] group-hover:text-[#C5A46D]'
                          }`}
                        >
                          {cat.title}
                        </p>
                        <p
                          className={`text-[10px] truncate mt-0.5 ${
                            isActive ? 'text-[#DFCA9E]' : 'text-[#81917A]'
                          }`}
                        >
                          {cat.documents.length} verified PDF{cat.documents.length > 1 ? 's' : ''}
                        </p>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive ? 'text-[#C5A46D] translate-x-1' : 'text-[#81917A]/40'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Main Detail Content Panel */}
            <div className="lg:col-span-8 xl:col-span-8 space-y-6">
              {activeCategory ? (
                <CategoryDetailCard
                  category={activeCategory}
                  onViewDoc={(doc) => setActiveDocModal(doc)}
                  getIcon={getIcon}
                />
              ) : (
                <div className="bg-white p-12 rounded-lg border border-[#C5A46D]/30 text-center space-y-3">
                  <AlertCircle className="w-8 h-8 text-[#C5A46D] mx-auto" />
                  <p className="font-serif text-lg font-bold text-[#173D32]">No matching disclosures found</p>
                  <p className="text-xs text-[#81917A]">Try clearing your search query or choosing another session.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Full Page Comprehensive List View (All 16 Categories) */
          <div className="space-y-8">
            {filteredCategories.map((cat) => (
              <CategoryDetailCard
                key={cat.categoryNumber}
                category={cat}
                onViewDoc={(doc) => setActiveDocModal(doc)}
                getIcon={getIcon}
              />
            ))}
          </div>
        )}

        {/* Section 3: Supporting Institutional Information Links */}
        <div className="bg-white rounded-lg border border-[#C5A46D]/30 shadow-card p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#C5A46D]/20 pb-4">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#C5A46D] block">
              Official Institutional Navigation
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#173D32] mt-1">
              Supporting Institutional &amp; Regulatory Pages
            </h3>
            <p className="text-xs text-[#342B25]/80 font-light mt-1">
              Direct access to relevant institutional archives, departments, clinical hospital facilities, and admission dossiers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
            <Link
              href="/about"
              className="p-3.5 rounded bg-[#F6F2E9]/50 hover:bg-[#173D32] hover:text-white border border-[#C5A46D]/20 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#173D32] group-hover:text-white">College Overview</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A46D]" />
              </div>
              <p className="text-[11px] text-[#81917A] group-hover:text-[#DFCA9E] mt-1">History, Governance &amp; Legacy</p>
            </Link>

            <Link
              href="/about/principals-message"
              className="p-3.5 rounded bg-[#F6F2E9]/50 hover:bg-[#173D32] hover:text-white border border-[#C5A46D]/20 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#173D32] group-hover:text-white">Principal's Desk</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A46D]" />
              </div>
              <p className="text-[11px] text-[#81917A] group-hover:text-[#DFCA9E] mt-1">Prof. Dr. D. N. Tripathi</p>
            </Link>

            <Link
              href="/departments"
              className="p-3.5 rounded bg-[#F6F2E9]/50 hover:bg-[#173D32] hover:text-white border border-[#C5A46D]/20 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#173D32] group-hover:text-white">14 Ayurvedic Depts</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A46D]" />
              </div>
              <p className="text-[11px] text-[#81917A] group-hover:text-[#DFCA9E] mt-1">MSR Classical Disciplines</p>
            </Link>

            <Link
              href="/faculty"
              className="p-3.5 rounded bg-[#F6F2E9]/50 hover:bg-[#173D32] hover:text-white border border-[#C5A46D]/20 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#173D32] group-hover:text-white">Teaching Faculty</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A46D]" />
              </div>
              <p className="text-[11px] text-[#81917A] group-hover:text-[#DFCA9E] mt-1">Full Directory with Codes</p>
            </Link>

            <Link
              href="/infrastructure/hospital"
              className="p-3.5 rounded bg-[#F6F2E9]/50 hover:bg-[#173D32] hover:text-white border border-[#C5A46D]/20 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#173D32] group-hover:text-white">100-Bed Hospital</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A46D]" />
              </div>
              <p className="text-[11px] text-[#81917A] group-hover:text-[#DFCA9E] mt-1">IPD, OPD &amp; Panchakarma</p>
            </Link>

            <Link
              href="/knowledge-hub"
              className="p-3.5 rounded bg-[#F6F2E9]/50 hover:bg-[#173D32] hover:text-white border border-[#C5A46D]/20 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#173D32] group-hover:text-white">Charak Herbarium</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A46D]" />
              </div>
              <p className="text-[11px] text-[#81917A] group-hover:text-[#DFCA9E] mt-1">350+ Authenticated Species</p>
            </Link>

            <Link
              href="/admissions"
              className="p-3.5 rounded bg-[#F6F2E9]/50 hover:bg-[#173D32] hover:text-white border border-[#C5A46D]/20 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#173D32] group-hover:text-white">Admissions 2026–27</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A46D]" />
              </div>
              <p className="text-[11px] text-[#81917A] group-hover:text-[#DFCA9E] mt-1">NEET Cutoffs &amp; Eligibility</p>
            </Link>

            <Link
              href="/admissions/fee-structure"
              className="p-3.5 rounded bg-[#F6F2E9]/50 hover:bg-[#173D32] hover:text-white border border-[#C5A46D]/20 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#173D32] group-hover:text-white">Fee Structure</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C5A46D]" />
              </div>
              <p className="text-[11px] text-[#81917A] group-hover:text-[#DFCA9E] mt-1">Government Approved Norms</p>
            </Link>
          </div>
        </div>

        {/* Official Apex Statutory Links Card */}
        <div className="bg-[#0F2821] text-white rounded-lg p-6 sm:p-8 border border-[#C5A46D]/40 space-y-4">
          <div className="flex items-center space-x-2 text-[#C5A46D]">
            <ExternalLink className="w-5 h-5" />
            <h4 className="font-serif text-lg font-bold">Official Apex Regulatory Verification Portals</h4>
          </div>
          <p className="text-xs text-[#F6F2E9]/80 leading-relaxed font-light">
            Visitors, regulatory inspectors, parents, and scholars may verify the institutional approval status and regulatory notifications directly at the following government websites:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
            <a
              href="https://ncismindia.org"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded bg-[#173D32] hover:bg-[#C5A46D] hover:text-[#173D32] transition-colors border border-[#C5A46D]/30 flex items-center justify-between group"
            >
              <div>
                <p className="font-bold">NCISM Official Portal</p>
                <p className="text-[10px] text-[#DFCA9E] group-hover:text-[#173D32]">ncismindia.org</p>
              </div>
              <ExternalLink className="w-4 h-4 text-[#C5A46D] group-hover:text-[#173D32]" />
            </a>

            <a
              href="https://ayush.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded bg-[#173D32] hover:bg-[#C5A46D] hover:text-[#173D32] transition-colors border border-[#C5A46D]/30 flex items-center justify-between group"
            >
              <div>
                <p className="font-bold">Ministry of AYUSH</p>
                <p className="text-[10px] text-[#DFCA9E] group-hover:text-[#173D32]">ayush.gov.in</p>
              </div>
              <ExternalLink className="w-4 h-4 text-[#C5A46D] group-hover:text-[#173D32]" />
            </a>

            <a
              href="https://education.rajasthan.gov.in/dsrrau"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded bg-[#173D32] hover:bg-[#C5A46D] hover:text-[#173D32] transition-colors border border-[#C5A46D]/30 flex items-center justify-between group"
            >
              <div>
                <p className="font-bold">DSRRAU University Jodhpur</p>
                <p className="text-[10px] text-[#DFCA9E] group-hover:text-[#173D32]">Affiliating University</p>
              </div>
              <ExternalLink className="w-4 h-4 text-[#C5A46D] group-hover:text-[#173D32]" />
            </a>
          </div>
        </div>
      </div>

      {/* Inline Document Preview Modal */}
      {activeDocModal && (
        <DocumentPreviewModal
          doc={activeDocModal}
          onClose={() => setActiveDocModal(null)}
        />
      )}
    </div>
  );
}

// Subcomponent: Category Detail Card
function CategoryDetailCard({
  category,
  onViewDoc,
  getIcon
}: {
  category: DisclosureCategoryData;
  onViewDoc: (doc: DisclosureDocumentData) => void;
  getIcon: (name: string, className?: string) => React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg border border-[#C5A46D]/30 shadow-card overflow-hidden">
      {/* Category Header */}
      <div className="p-6 bg-gradient-to-r from-[#173D32] to-[#0F2821] text-white border-b border-[#C5A46D]/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-full border border-[#C5A46D] bg-[#0F2821] flex items-center justify-center text-[#C5A46D] shrink-0 mt-0.5">
              {getIcon(category.iconName, 'w-5 h-5 text-[#C5A46D]')}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#C5A46D]/20 text-[#DFCA9E] border border-[#C5A46D]/40">
                  CATEGORY {String(category.categoryNumber).padStart(2, '0')}
                </span>
                <span className="text-[11px] text-[#81917A]">•</span>
                <span className="text-[11px] text-[#DFCA9E]">Updated: {category.lastUpdated}</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold mt-1 text-white">
                {category.title}
              </h2>
            </div>
          </div>

          <span className="inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shrink-0 self-start sm:self-center">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            Verified Compliant
          </span>
        </div>

        <p className="text-xs text-[#F6F2E9]/85 font-light mt-3 leading-relaxed max-w-4xl">
          {category.description}
        </p>

        <div className="mt-3 pt-3 border-t border-[#C5A46D]/20 flex items-center text-[11px] text-[#DFCA9E]">
          <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#C5A46D]" />
          <span>Statutory Authority: <strong>{category.regulatoryReference}</strong></span>
        </div>
      </div>

      {/* Structured Content & Tables */}
      <div className="p-6 space-y-6">
        {category.records.map((rec) => (
          <div key={rec.id} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#C5A46D]/20 pb-2">
              <div>
                <h4 className="font-serif text-base font-bold text-[#173D32]">
                  {rec.title}
                </h4>
                {rec.referenceCode && (
                  <span className="text-[11px] font-mono text-[#81917A]">
                    Official Reference: {rec.referenceCode} | Session: {rec.academicYear}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-300 self-start">
                {rec.status}
              </span>
            </div>

            <p className="text-xs text-[#342B25]/85 leading-relaxed font-light">
              {rec.summary}
            </p>

            {/* Table Data View if present */}
            {rec.tableData && (
              <div className="overflow-x-auto rounded border border-[#C5A46D]/30">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#173D32] text-white">
                    <tr>
                      {rec.tableData.columns.map((col, idx) => (
                        <th key={idx} className="p-3 font-semibold uppercase tracking-wider text-[10px]">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#C5A46D]/20 bg-white">
                    {rec.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-[#F6F2E9]/50 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3 text-[#342B25] text-xs">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Key-Value Details View if present */}
            {rec.details && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#F6F2E9]/40 p-4 rounded border border-[#C5A46D]/30 text-xs">
                {Object.entries(rec.details).map(([key, val], idx) => (
                  <div key={idx} className="space-y-0.5">
                    <span className="text-[10px] uppercase font-semibold text-[#81917A] tracking-wider block">
                      {key}
                    </span>
                    <span className="text-xs font-medium text-[#173D32] block">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Official Downloadable Documents Section */}
        {category.documents.length > 0 && (
          <div className="space-y-3 pt-2">
            <h5 className="font-serif text-sm font-bold text-[#173D32] flex items-center">
              <FileText className="w-4 h-4 mr-1.5 text-[#C5A46D]" />
              <span>Official Regulatory Supporting Documents &amp; Certificates</span>
            </h5>

            <div className="divide-y divide-[#C5A46D]/20 border border-[#C5A46D]/30 rounded overflow-hidden">
              {category.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 bg-white hover:bg-[#F6F2E9]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-1.5 py-0.5 rounded bg-[#173D32]/10 text-[#173D32] font-mono text-[10px] font-bold">
                        {doc.fileType}
                      </span>
                      <span className="font-semibold text-xs text-[#173D32]">
                        {doc.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-[11px] text-[#81917A] font-mono">
                      <span>Doc Code: {doc.documentCode}</span>
                      <span>•</span>
                      <span>Size: {doc.fileSize}</span>
                      <span>•</span>
                      <span>Updated: {doc.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => onViewDoc(doc)}
                      className="inline-flex items-center px-3 py-1.5 rounded text-xs font-semibold bg-[#173D32] text-white hover:bg-[#0F2821] transition-colors border border-[#C5A46D]/40 shadow-sm"
                      title="Open inline document viewer"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1 text-[#C5A46D]" />
                      <span>View</span>
                    </button>

                    <a
                      href={`/api/download?file=${encodeURIComponent(doc.fileUrl)}&name=${encodeURIComponent(doc.title)}`}
                      download={`${doc.title.replace(/[^a-zA-Z0-9-_\s]/g, '').trim().replace(/\s+/g, '-')}.pdf`}
                      onClick={(e) => {
                        e.preventDefault();
                        triggerPdfDownload(doc.fileUrl, doc.title);
                      }}
                      className="inline-flex items-center px-3 py-1.5 rounded text-xs font-semibold bg-[#C5A46D] text-[#173D32] hover:bg-[#B3935C] transition-colors shadow-sm cursor-pointer select-none"
                      title="Download PDF file"
                    >
                      <Download className="w-3.5 h-3.5 mr-1" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Subcomponent: High-Fidelity Institutional Document Preview Modal
function DocumentPreviewModal({
  doc,
  onClose
}: {
  doc: DisclosureDocumentData;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-lg border border-[#C5A46D] shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Toolbar Header */}
        <div className="p-4 bg-[#173D32] text-white flex items-center justify-between border-b border-[#C5A46D]/40">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-8 h-8 rounded-full border border-[#C5A46D] bg-[#0F2821] flex items-center justify-center shrink-0">
              <span className="text-[#C5A46D] text-xs font-serif font-bold">ॐ</span>
            </div>
            <div className="min-w-0">
              <h4 className="font-serif text-sm font-bold text-white truncate">
                {doc.title}
              </h4>
              <p className="text-[10px] text-[#DFCA9E] font-mono truncate">
                Ref Code: {doc.documentCode} | Academic Session: {doc.academicYear} | Size: {doc.fileSize}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded text-[#DFCA9E] hover:text-white hover:bg-[#0F2821] transition-colors"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
            </button>
            <a
              href={`/api/download?file=${encodeURIComponent(doc.fileUrl)}&name=${encodeURIComponent(doc.title)}`}
              download={`${doc.title.replace(/[^a-zA-Z0-9-_\s]/g, '').trim().replace(/\s+/g, '-')}.pdf`}
              onClick={(e) => {
                e.preventDefault();
                triggerPdfDownload(doc.fileUrl, doc.title);
              }}
              className="p-1.5 rounded text-[#DFCA9E] hover:text-white hover:bg-[#0F2821] transition-colors cursor-pointer"
              title="Download File"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded text-white/70 hover:text-white hover:bg-[#0F2821] transition-colors ml-2"
              title="Close Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-[#F6F2E9] flex-1 space-y-6">
          <div className="bg-white p-8 sm:p-12 rounded border border-[#C5A46D]/30 shadow-lg max-w-3xl mx-auto space-y-6 text-[#342B25] relative">
            {/* Watermark Crest */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
              <span className="font-serif text-9xl font-bold text-[#173D32]">SHAMC</span>
            </div>

            {/* Official Letterhead */}
            <div className="text-center border-b-2 border-[#173D32] pb-6 space-y-1">
              <div className="inline-flex items-center space-x-2 text-[#C5A46D] font-serif text-xs font-bold tracking-widest uppercase mb-1">
                <span>ॐ</span>
                <span>सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः</span>
                <span>ॐ</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#173D32]">
                SHRI HARIDUTT AYURVEDIC MEDICAL COLLEGE &amp; HOSPITAL
              </h3>
              <p className="text-[11px] text-[#81917A] tracking-wider uppercase font-semibold">
                Recognised by NCISM, Ministry of AYUSH, Govt. of India · Affiliated to Dr. S.R. Rajasthan Ayurved University
              </p>
              <p className="text-[10px] text-[#342B25]/75 font-mono">
                {INSTITUTION_INFO.address} | Helpline: {INSTITUTION_INFO.admissionsHelpline}
              </p>
            </div>

            {/* Document Reference Block */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono border-b border-[#C5A46D]/20 pb-3 gap-2">
              <div>
                <span className="text-[#81917A]">Document Ref ID: </span>
                <strong className="text-[#173D32]">{doc.documentCode}</strong>
              </div>
              <div>
                <span className="text-[#81917A]">Verification Date: </span>
                <strong className="text-[#173D32]">{doc.lastUpdated}</strong>
              </div>
            </div>

            {/* Document Title Header */}
            <div className="text-center space-y-1 pt-2">
              <span className="text-[10px] font-mono tracking-widest text-[#C5A46D] uppercase font-bold">
                STATUTORY DISCLOSURE CERTIFICATE
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-[#173D32]">
                {doc.title}
              </h4>
              <p className="text-xs text-[#81917A]">
                Academic Session: {doc.academicYear} | Regulatory Classification: Public Disclosure
              </p>
            </div>

            {/* Official Certification Declaration */}
            <div className="p-4 bg-[#F6F2E9]/60 rounded border border-[#C5A46D]/30 text-xs leading-relaxed space-y-2">
              <p>
                <strong>Statutory Declaration:</strong> This certified document is issued by the Academic Secretariat &amp; Office of the Principal, Shri Haridutt Ayurvedic Medical College &amp; Hospital in compliance with directives of the National Commission for Indian System of Medicine (NCISM), New Delhi.
              </p>
              <p>
                The document has been verified against physical college council registers, university affiliation records, and hospital clinical data. Any unauthorized alteration or reproduction is punishable under applicable educational and civil regulations.
              </p>
            </div>

            {/* Embedded Iframe Preview or File Link */}
            <div className="pt-2 text-center space-y-3">
              <div className="p-4 rounded border border-[#C5A46D]/40 bg-white flex flex-col items-center justify-center space-y-2">
                <FileCheck className="w-8 h-8 text-emerald-600" />
                <p className="text-xs font-semibold text-[#173D32]">Official PDF Document Available for Immediate Download</p>
                <p className="text-[11px] text-[#81917A] max-w-md">
                  File name: <span className="font-mono">{doc.fileUrl.split('/').pop()}</span> ({doc.fileSize})
                </p>
                <div className="pt-2 flex items-center space-x-3">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded bg-[#173D32] text-white text-xs font-semibold hover:bg-[#0F2821] transition-colors inline-flex items-center space-x-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in New Browser Tab</span>
                  </a>
                  <a
                    href={`/api/download?file=${encodeURIComponent(doc.fileUrl)}&name=${encodeURIComponent(doc.title)}`}
                    download={`${doc.title.replace(/[^a-zA-Z0-9-_\s]/g, '').trim().replace(/\s+/g, '-')}.pdf`}
                    onClick={(e) => {
                      e.preventDefault();
                      triggerPdfDownload(doc.fileUrl, doc.title);
                    }}
                    className="px-4 py-2 rounded bg-[#C5A46D] text-[#173D32] text-xs font-semibold hover:bg-[#B3935C] transition-colors inline-flex items-center space-x-1.5 cursor-pointer select-none"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Official PDF</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-8 border-t border-[#C5A46D]/30 flex flex-col sm:flex-row items-center justify-between text-xs gap-6">
              <div className="text-center sm:text-left space-y-1">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#C5A46D] flex flex-col items-center justify-center p-1 text-[8px] text-[#C5A46D] mx-auto sm:mx-0">
                  <span className="font-bold">OFFICIAL</span>
                  <span className="font-bold">SEAL</span>
                  <span>NCISM MSR</span>
                </div>
                <p className="text-[10px] text-[#81917A] mt-1">Registrar / Secretary</p>
              </div>

              <div className="text-center sm:text-right space-y-1">
                <div className="font-serif font-bold text-sm text-[#173D32]">
                  Prof. (Dr.) Devendra Nath Tripathi
                </div>
                <p className="text-[11px] text-[#C5A46D] font-semibold">
                  Principal &amp; Head of Institution
                </p>
                <p className="text-[10px] text-[#81917A]">
                  Shri Haridutt Ayurvedic Medical College &amp; Hospital
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-white border-t border-[#C5A46D]/30 flex items-center justify-between text-xs text-[#81917A] px-6">
          <span>Verification Status: <strong className="text-emerald-700">ACTIVE &amp; LEGALLY AUTHENTICATED</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#173D32] text-white hover:bg-[#0F2821] text-xs font-semibold transition-colors"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
}
