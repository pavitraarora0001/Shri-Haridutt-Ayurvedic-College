'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import { 
  FileText, Download, Search, Filter, ShieldCheck, 
  BookOpen, ExternalLink, Calendar, CheckCircle2, AlertCircle, FileCheck, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { triggerPdfDownload } from '@/lib/download';

interface DocumentItem {
  id: string;
  title: string;
  category: string;
  fileUrl: string;
  fileSize: string;
  publishDate: string;
  refNo: string;
  description: string;
  status: 'VERIFIED' | 'AVAILABLE' | 'PENDING_RENEWAL';
}

const MASTER_DOCUMENTS: DocumentItem[] = [
  // Fee Structure & Admissions
  {
    id: 'doc-fee-01',
    title: 'Approved Fee Structure for B.A.M.S. 2026–27',
    category: 'Fee Structure',
    fileUrl: '/documents/misc/bams-approved-fee-structure-2026-27.pdf',
    fileSize: '185 KB',
    publishDate: '15 Jan 2026',
    refNo: 'SHAMC/FEE/2026/01',
    description: 'Official State Fee Regulatory Committee approved tuition, hostel, and institutional fee schedule for the 100-seat B.A.M.S. batch.',
    status: 'VERIFIED',
  },
  {
    id: 'doc-fee-02',
    title: 'Approved Fee Structure for M.D. (Ayurveda) Kayachikitsa',
    category: 'Fee Structure',
    fileUrl: '/documents/misc/md-ayurveda-approved-fee-structure-2026-27.pdf',
    fileSize: '162 KB',
    publishDate: '15 Jan 2026',
    refNo: 'SHAMC/FEE/2026/02',
    description: 'Annual tuition fee, clinical training fee, and thesis guidance fees for postgraduate Ayurvedic scholars.',
    status: 'VERIFIED',
  },
  {
    id: 'doc-adm-01',
    title: 'Institutional Prospectus & Information Brochure 2026–27',
    category: 'Prospectus',
    fileUrl: '/documents/misc/institutional-prospectus-information-brochure-2026-27.pdf',
    fileSize: '4.8 MB',
    publishDate: '01 Feb 2026',
    refNo: 'SHAMC/PROSPECTUS/2026',
    description: 'Comprehensive college guide featuring academic curriculum, clinical hospital facilities, Charak Vatika herbarium, and residential hostels.',
    status: 'VERIFIED',
  },
  {
    id: 'doc-adm-02',
    title: 'NEET-UG 2026 Admissions Notification & Counseling Guidelines',
    category: 'Admission Notifications',
    fileUrl: '/documents/misc/neet-ug-admissions-notification-guidelines-2026.pdf',
    fileSize: '240 KB',
    publishDate: '10 Feb 2026',
    refNo: 'SHAMC/ADM/2026/04',
    description: 'State AYUSH Counseling Board schedule, seat matrix distribution (85% State Quota + 15% All-India AYUSH Quota), and reporting instructions.',
    status: 'VERIFIED',
  },

  // Syllabus & Curriculum
  {
    id: 'doc-syl-01',
    title: 'NCISM Competency-Based B.A.M.S. Curriculum & Syllabus (MSE-2022)',
    category: 'Syllabus & Curriculum',
    fileUrl: '/documents/ncism/transitional-curriculum-ug-bams-2026.pdf',
    fileSize: '1.7 MB',
    publishDate: '01 Jan 2026',
    refNo: 'NCISM/UG-CURR/2022-26',
    description: 'Prescribed syllabus covering all First to Final Professional disciplines, clinical bedside postings, and rotatory internship logbook formats.',
    status: 'VERIFIED',
  },
  {
    id: 'doc-syl-02',
    title: 'Panchakarma Clinical Nursing Certificate Curriculum',
    category: 'Syllabus & Curriculum',
    fileUrl: '/documents/misc/panchakarma-nursing-certificate-curriculum.pdf',
    fileSize: '410 KB',
    publishDate: '12 Jan 2026',
    refNo: 'SHAMC/PANC-CERT/2026',
    description: 'Curriculum outlining theory and hands-on clinical therapy training for traditional Ayurvedic therapeutic nursing staff.',
    status: 'AVAILABLE',
  },

  // Approvals & Affiliations
  {
    id: 'doc-rec-01',
    title: 'NCISM Letter of Permission & Annual Recognition 2026–27',
    category: 'Approvals & Affiliations',
    fileUrl: '/documents/ncism/ncism-permission-letter-2026-27.pdf',
    fileSize: '620 KB',
    publishDate: '20 Dec 2025',
    refNo: 'NCISM/AYUSH/RECOG/2026-8941',
    description: 'Statutory approval letter from the National Commission for Indian System of Medicine permitting 100 seats in B.A.M.S.',
    status: 'VERIFIED',
  },
  {
    id: 'doc-rec-02',
    title: 'University Affiliation Notification — Dr. S.R. Rajasthan Ayurved University',
    category: 'Approvals & Affiliations',
    fileUrl: '/documents/ncism/university-affiliation-dsrrau-2026.pdf',
    fileSize: '480 KB',
    publishDate: '05 Jan 2026',
    refNo: 'DSRRAU/AFF/MED/2026/142',
    description: 'Annual academic affiliation order granting university affiliation for examination and degree conferral.',
    status: 'VERIFIED',
  },
  {
    id: 'doc-rec-03',
    title: 'State Pollution Control Board Bio-Medical Waste Authorization',
    category: 'Approvals & Affiliations',
    fileUrl: '/documents/misc/biomedical-waste-authorization.pdf',
    fileSize: '128 KB',
    publishDate: '15 Jan 2025',
    refNo: 'RSPCB/BMW/AUTH/2025/89',
    description: 'Valid authorization under Bio-Medical Waste Management Rules 2016 for hospital and lab operations.',
    status: 'VERIFIED',
  },
  {
    id: 'doc-rec-04',
    title: 'State Fire Service Campus Fire Safety NOC & Hydrant Clearance',
    category: 'Approvals & Affiliations',
    fileUrl: '/documents/misc/fire-safety-noc-certificate.pdf',
    fileSize: '109 KB',
    publishDate: '02 Feb 2025',
    refNo: 'FSD/NOC/2025/1142',
    description: 'Official safety certificate certifying fire alarms, hydrants, extinguishers, and safe evacuation corridors.',
    status: 'VERIFIED',
  },

  // Mandatory Disclosures
  {
    id: 'doc-ncism-01',
    title: 'NCISM Mandatory Institutional Disclosure Dossier (MSR 2026)',
    category: 'Mandatory Disclosure',
    fileUrl: '/documents/ncism/ncism-permission-letter-2026-27.pdf',
    fileSize: '2.4 MB',
    publishDate: '15 Jan 2026',
    refNo: 'SHAMC/MSR/2026/01',
    description: 'Comprehensive 16-section statutory declaration fulfilling all Minimum Standards of Requirements as mandated by NCISM.',
    status: 'VERIFIED',
  },
  {
    id: 'doc-ncism-02',
    title: 'Teaching Faculty Staff List & Qualification Ledger 2026',
    category: 'Mandatory Disclosure',
    fileUrl: '/documents/ncism/teaching-faculty-cadre-register-2026.pdf',
    fileSize: '420 KB',
    publishDate: '15 Jan 2026',
    refNo: 'SHAMC/FAC/REG/2026',
    description: 'Verified roster of Professors, Readers, Lecturers, and Clinical Doctors with registration numbers and experience.',
    status: 'VERIFIED',
  },

  // Policies & Regulations
  {
    id: 'doc-pol-01',
    title: 'Institutional Scholar Code of Conduct & Vaidya Ethical Charter',
    category: 'Policies & Regulations',
    fileUrl: '/documents/misc/student-code-of-conduct-handbook.pdf',
    fileSize: '136 KB',
    publishDate: '10 Jan 2026',
    refNo: 'SHAMC/ACAD/2026/12',
    description: 'Disciplinary rules, clinical dress code, 75% lecture / 80% clinical attendance mandate, and the Charak Vaidya Oath.',
    status: 'VERIFIED',
  },
  {
    id: 'doc-pol-02',
    title: 'UGC & NCISM Anti-Ragging Policy & Statutory Affidavits',
    category: 'Policies & Regulations',
    fileUrl: '/documents/misc/anti-ragging-statutory-affidavit-format.pdf',
    fileSize: '118 KB',
    publishDate: '10 Jan 2026',
    refNo: 'SHAMC/ARC/2026/04',
    description: 'Zero-tolerance regulations, anti-ragging squad contacts, and prescribed student/parent legal affidavit formats.',
    status: 'VERIFIED',
  },
  {
    id: 'doc-pol-03',
    title: 'Internal Complaints Committee (ICC / POSH) Policy Dossier',
    category: 'Policies & Regulations',
    fileUrl: '/documents/misc/icc-posh-policy-dossier.pdf',
    fileSize: '112 KB',
    publishDate: '08 Jan 2026',
    refNo: 'SHAMC/ICC/2026/02',
    description: 'Grievance submission procedures and gender sensitization charters under the Sexual Harassment of Women at Workplace Act 2013.',
    status: 'VERIFIED',
  },
  {
    id: 'doc-pol-04',
    title: 'Hostel Residence Regulations & Scholar Undertaking Format',
    category: 'Policies & Regulations',
    fileUrl: '/documents/misc/hostel-admission-rules-undertaking.pdf',
    fileSize: '106 KB',
    publishDate: '12 Jan 2026',
    refNo: 'SHAMC/HST/2026/03',
    description: 'Curfew rules, mess timings, anti-substance policy, biometric attendance, and visitor protocols.',
    status: 'VERIFIED',
  },

  // Tenders & Notices
  {
    id: 'doc-tnd-01',
    title: 'Notice Inviting Tenders: Central Library Botanical Reference E-Journals',
    category: 'Tenders & Notices',
    fileUrl: '/documents/misc/notice-inviting-tenders-library-ejournals-2026.pdf',
    fileSize: '95 KB',
    publishDate: '22 Jan 2026',
    refNo: 'SHAMC/TENDER/2026/02',
    description: 'Procurement of national/international AYUSH peer-reviewed e-journal subscriptions for research scholars.',
    status: 'VERIFIED',
  },
  {
    id: 'doc-tnd-02',
    title: 'Notice Inviting Tenders: Dravyaguna Laboratory Glassware & Reagents',
    category: 'Tenders & Notices',
    fileUrl: '/documents/misc/notice-inviting-tenders-lab-glassware-2026.pdf',
    fileSize: '105 KB',
    publishDate: '18 Jan 2026',
    refNo: 'SHAMC/TENDER/2026/01',
    description: 'Annual supply of analytical chemicals, chromatographic plates, and borosilicate glassware for pharmacognosy research.',
    status: 'VERIFIED',
  },
];

const CATEGORIES = [
  'ALL',
  'Fee Structure',
  'Prospectus',
  'Admission Notifications',
  'Syllabus & Curriculum',
  'Approvals & Affiliations',
  'Mandatory Disclosure',
  'Policies & Regulations',
  'Tenders & Notices',
];

export default function DocumentsHubPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (e: React.MouseEvent, doc: DocumentItem) => {
    e.preventDefault();
    setDownloadingId(doc.id);
    try {
      await triggerPdfDownload(doc.fileUrl, doc.title);
    } finally {
      setTimeout(() => setDownloadingId(null), 800);
    }
  };

  const filteredDocs = MASTER_DOCUMENTS.filter((doc) => {
    const matchesCategory = selectedCategory === 'ALL' || doc.category === selectedCategory;
    const matchesQuery = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.refNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="bg-[#F6F2E9] min-h-screen text-[#342B25]">
      <PageHeader
        title="Institutional Documents & Regulatory Repository"
        subtitle="Public Document Vault · Approvals, Syllabi, Fee Schedules, Mandatory Disclosures & Official Circulars"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Documents' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Banner Info Box */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-[#173D32] to-[#0F2821] rounded-xl text-white shadow-card border border-[#C5A46D]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C5A46D]/20 text-[#DFCA9E] text-xs font-semibold tracking-wider uppercase border border-[#C5A46D]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Institutional Repository · NCISM & State Affiliated</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
              Official Institutional Document Vault
            </h2>
            <p className="text-xs sm:text-sm text-[#F6F2E9]/80 font-light leading-relaxed">
              In accordance with statutory mandates of the National Commission for Indian System of Medicine (NCISM), Dr. S.R. Rajasthan Ayurved University, and State Regulatory authorities, all approved fee structures, curricula, circulars, and policies are cataloged below for public scrutiny and direct download.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
            <Link
              href="/mandatory-disclosures"
              className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-[#C5A46D] text-[#173D32] font-bold text-xs uppercase tracking-wider shadow-gold hover:bg-[#DFCA9E] transition-all"
            >
              <span>NCISM Disclosures Portal</span>
              <ExternalLink className="w-3.5 h-3.5 ml-2" />
            </Link>
            <Link
              href="/miscellaneous"
              className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white/10 text-white font-medium text-xs uppercase tracking-wider border border-white/20 hover:bg-white/20 transition-all"
            >
              <span>Statutory RTI & Committees</span>
            </Link>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#81917A]" />
            <input
              type="text"
              placeholder="Search documents by title, reference code, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#C5A46D]/40 bg-white text-sm text-[#342B25] placeholder-[#81917A] focus:outline-none focus:ring-2 focus:ring-[#173D32] shadow-sm"
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

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const count = cat === 'ALL'
                ? MASTER_DOCUMENTS.length
                : MASTER_DOCUMENTS.filter((d) => d.category === cat).length;
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 flex items-center space-x-1.5 border shadow-sm ${
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
        </div>

        {/* Document Listing Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#81917A] border-b border-[#C5A46D]/20 pb-2">
            <span>Showing {filteredDocs.length} of {MASTER_DOCUMENTS.length} Verified Documents</span>
            <span className="font-mono">Format: Official PDF</span>
          </div>

          {filteredDocs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-[#C5A46D]/30 space-y-3">
              <AlertCircle className="w-8 h-8 text-[#C5A46D] mx-auto" />
              <h3 className="font-serif text-lg font-bold text-[#173D32]">No Matching Documents Found</h3>
              <p className="text-xs text-[#81917A] max-w-md mx-auto">
                No documents match your query "{searchQuery}". Try selecting a different category or clearing the search bar.
              </p>
              <button
                onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}
                className="mt-2 text-xs font-semibold text-[#173D32] underline hover:text-[#C5A46D]"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-xl p-5 border border-[#C5A46D]/30 shadow-card hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#173D32] bg-[#173D32]/10 px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider">
                        {doc.category}
                      </span>
                      <span className="font-mono text-[11px] text-[#81917A]">{doc.refNo}</span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors leading-snug">
                      {doc.title}
                    </h3>

                    <p className="text-xs text-[#342B25]/80 leading-relaxed font-light">
                      {doc.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#C5A46D]/15 flex items-center justify-between">
                    <div className="text-[11px] text-[#81917A] flex items-center space-x-3">
                      <span className="font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 text-[10px]">
                        PDF
                      </span>
                      <span>{doc.fileSize}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {doc.publishDate}
                      </span>
                    </div>

                    <a
                      href={`/api/download?file=${encodeURIComponent(doc.fileUrl)}&name=${encodeURIComponent(doc.title)}`}
                      download={`${doc.title.replace(/[^a-zA-Z0-9-_\s]/g, '').trim().replace(/\s+/g, '-')}.pdf`}
                      onClick={(e) => handleDownload(e, doc)}
                      className={`inline-flex items-center px-3.5 py-1.5 rounded text-xs font-semibold border transition-all shadow-sm cursor-pointer select-none ${
                        downloadingId === doc.id
                          ? 'bg-[#173D32] text-[#DFCA9E] border-[#C5A46D] scale-95'
                          : 'text-[#173D32] bg-[#F6F2E9] border-[#C5A46D] hover:bg-[#173D32] hover:text-[#C5A46D] active:scale-95'
                      }`}
                      title={`Download ${doc.title} as PDF`}
                    >
                      {downloadingId === doc.id ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin text-[#C5A46D]" />
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5 mr-1.5" />
                          <span>Download</span>
                        </>
                      )}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Statutory Verification Footer */}
        <div className="p-8 bg-white rounded-xl border border-[#C5A46D]/30 shadow-card text-center space-y-3">
          <FileCheck className="w-6 h-6 text-[#C5A46D] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#173D32]">
            Document Authenticity &amp; Certified True Copies
          </h3>
          <p className="text-xs text-[#342B25]/80 max-w-2xl mx-auto leading-relaxed">
            All documents published on this official portal bear institutional digital certification or official signatures of the Directorate. For verified certified hard copies or legal verification, contact the Central Administrative Office, Shri Haridutt Ayurvedic Medical College &amp; Hospital.
          </p>
        </div>

      </div>
    </div>
  );
}
