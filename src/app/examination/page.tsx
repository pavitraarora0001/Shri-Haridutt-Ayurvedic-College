'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import { 
  GraduationCap, Calendar, FileText, Download, ExternalLink, 
  CheckCircle2, Clock, Award, AlertCircle, Search, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

interface ExamNotice {
  id: string;
  title: string;
  category: 'NOTICES' | 'SCHEDULE' | 'RESULTS' | 'PRACTICAL';
  date: string;
  refNo: string;
  academicYear: string;
  description: string;
  downloadUrl: string;
  isImportant?: boolean;
}

const EXAM_NOTICES: ExamNotice[] = [
  {
    id: 'ex-01',
    title: 'Dr. S.R. RAU Annual Theory Examination Schedule: First Professional B.A.M.S. (Batch 2025–26)',
    category: 'SCHEDULE',
    date: '15 Feb 2026',
    refNo: 'DSRRAU/COE/EXAM/2026/184',
    academicYear: '2025–26',
    description: 'Datesheet for Padartha Vijnana, Sharir Rachana, Sharir Kriya, and Samhita Adhyayana-1 written theory papers.',
    downloadUrl: '/documents/misc/student-code-of-conduct-handbook.pdf',
    isImportant: true,
  },
  {
    id: 'ex-02',
    title: 'Online Examination Form Submission Portal Opening for Final Professional B.A.M.S.',
    category: 'NOTICES',
    date: '10 Feb 2026',
    refNo: 'DSRRAU/COE/FORM/2026/092',
    academicYear: '2025–26',
    description: 'Mandatory online form filling and challan fee submission for eligible scholars appearing in Kayachikitsa and Shalya.',
    downloadUrl: '/documents/misc/student-code-of-conduct-handbook.pdf',
    isImportant: true,
  },
  {
    id: 'ex-03',
    title: 'Final Professional B.A.M.S. Annual Examination Results Declaration (Session 2024–25)',
    category: 'RESULTS',
    date: '28 Jan 2026',
    refNo: 'DSRRAU/RESULT/BAMS-FINAL/2026',
    academicYear: '2024–25',
    description: 'Official roll-number wise marksheets published on the University Examination Portal with 94.2% institutional pass rate.',
    downloadUrl: '/documents/ncism/university-exam-results-analysis-2026.pdf',
    isImportant: false,
  },
  {
    id: 'ex-04',
    title: 'Practical, Clinical Bedside & Viva-Voce Examination Center Roster (Department of Panchakarma & Roga Nidan)',
    category: 'PRACTICAL',
    date: '22 Jan 2026',
    refNo: 'SHAMC/EXAM/CLINICAL/2026/08',
    academicYear: '2025–26',
    description: 'External and internal examiner rosters, bedside case presentation schedules, and logbook assessment timings.',
    downloadUrl: '/documents/misc/student-code-of-conduct-handbook.pdf',
    isImportant: false,
  },
  {
    id: 'ex-05',
    title: 'Guidelines for Scrutiny and Re-evaluation of Theory Answer Scripts: Second Professional B.A.M.S.',
    category: 'NOTICES',
    date: '18 Jan 2026',
    refNo: 'DSRRAU/COE/REV/2026/33',
    academicYear: '2025–26',
    description: 'Statutory 15-day application window for re-totaling and photocopy evaluation of answer books.',
    downloadUrl: '/documents/misc/student-code-of-conduct-handbook.pdf',
    isImportant: false,
  },
  {
    id: 'ex-06',
    title: 'Model Question Papers & Previous 5-Year University Examination Question Bank (Dravyaguna & Rasa Shastra)',
    category: 'SCHEDULE',
    date: '05 Jan 2026',
    refNo: 'SHAMC/ACAD/QB/2026/02',
    academicYear: '2025–26',
    description: 'Curated compilation of essay questions, short notes, and shloka identification questions for scholar preparation.',
    downloadUrl: '/documents/misc/student-code-of-conduct-handbook.pdf',
    isImportant: false,
  },
];

export default function ExaminationCentrePage() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'NOTICES' | 'SCHEDULE' | 'RESULTS' | 'PRACTICAL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = EXAM_NOTICES.filter((item) => {
    const matchesTab = activeTab === 'ALL' || item.category === activeTab;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.refNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-[#F6F2E9] min-h-screen text-[#342B25]">
      <PageHeader
        title="Examination Centre & Controller Cell"
        subtitle="University Examination Datesheets · Internal Assessments · Results Verification · Practical Clinical Rosters"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Examination' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Banner Alert with University Portal Link */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-[#173D32] to-[#0F2821] rounded-xl text-white shadow-card border border-[#C5A46D]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C5A46D]/20 text-[#DFCA9E] text-xs font-semibold tracking-wider uppercase border border-[#C5A46D]/30">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Dr. S.R. Rajasthan Ayurved University Affiliation Code: RAU-AYUR-184</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
              Institutional Examination &amp; Evaluation Directorate
            </h2>
            <p className="text-xs sm:text-sm text-[#F6F2E9]/80 font-light leading-relaxed">
              All undergraduate B.A.M.S. and postgraduate M.D. examinations are conducted under the authoritative guidelines and evaluation ordinances of Dr. S.R. Rajasthan Ayurved University, Jodhpur, and the National Commission for Indian System of Medicine (NCISM).
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
            <a
              href="https://education.rajasthan.gov.in/content/raj/education/dr--sarvepalli-radhakrishnan-rajasthan-ayurved-university--jodhpur/en/home.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-[#C5A46D] text-[#173D32] font-bold text-xs uppercase tracking-wider shadow-gold hover:bg-[#DFCA9E] transition-all"
            >
              <span>RAU Results Portal</span>
              <ExternalLink className="w-3.5 h-3.5 ml-2" />
            </a>
            <Link
              href="/student/login"
              className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white/10 text-white font-medium text-xs uppercase tracking-wider border border-white/20 hover:bg-white/20 transition-all"
            >
              <span>Scholar Internal Portal</span>
            </Link>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-lg border border-[#C5A46D]/30 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-[#81917A]">
              <span>Annual Pass Rate</span>
              <Award className="w-4 h-4 text-[#C5A46D]" />
            </div>
            <span className="font-serif text-2xl font-bold text-[#173D32]">94.2%</span>
            <p className="text-[11px] text-[#342B25]/80">Final Professional B.A.M.S. batch 2024–25</p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#C5A46D]/30 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-[#81917A]">
              <span>Mandatory Attendance</span>
              <Clock className="w-4 h-4 text-[#C5A46D]" />
            </div>
            <span className="font-serif text-2xl font-bold text-[#173D32]">75% / 80%</span>
            <p className="text-[11px] text-[#342B25]/80">75% Lectures & 80% Hospital Clinical Postings</p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#C5A46D]/30 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-[#81917A]">
              <span>Internal Assessments</span>
              <CheckCircle2 className="w-4 h-4 text-[#C5A46D]" />
            </div>
            <span className="font-serif text-2xl font-bold text-[#173D32]">3 Periodic Tests</span>
            <p className="text-[11px] text-[#342B25]/80">Two terminals + One pre-university model exam</p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#C5A46D]/30 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-[#81917A]">
              <span>Sanctum Center</span>
              <ShieldCheck className="w-4 h-4 text-[#C5A46D]" />
            </div>
            <span className="font-serif text-2xl font-bold text-[#173D32]">CCTV Monitored</span>
            <p className="text-[11px] text-[#342B25]/80">Continuous biometric & 24x7 video surveillance</p>
          </div>
        </div>

        {/* Filter Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#C5A46D]/20 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'ALL', label: 'All Updates' },
              { id: 'NOTICES', label: 'Notifications & Forms' },
              { id: 'SCHEDULE', label: 'Datesheets & Schedules' },
              { id: 'RESULTS', label: 'Results & Merits' },
              { id: 'PRACTICAL', label: 'Clinical Viva Voce' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#173D32] text-[#DFCA9E] border border-[#C5A46D] shadow-sm'
                    : 'bg-white text-[#342B25] border border-[#C5A46D]/20 hover:bg-[#173D32]/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#81917A]" />
            <input
              type="text"
              placeholder="Search circulars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-md border border-[#C5A46D]/30 bg-white text-xs text-[#342B25] placeholder-[#81917A] focus:outline-none focus:ring-1 focus:ring-[#173D32]"
            />
          </div>
        </div>

        {/* Notices Cards List */}
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl p-5 border shadow-card hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                item.isImportant ? 'border-l-4 border-l-[#C5A46D] border-[#C5A46D]/40' : 'border-[#C5A46D]/25'
              }`}
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold text-[#173D32] bg-[#173D32]/10 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="font-mono text-[10px] text-[#81917A]">{item.refNo}</span>
                  <span className="text-[#81917A]">•</span>
                  <span className="text-[10px] text-[#81917A]">{item.date}</span>
                  {item.isImportant && (
                    <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.2 rounded border border-amber-300 uppercase">
                      Urgent / Active
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-base font-bold text-[#173D32] leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#342B25]/80 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="shrink-0 flex items-center space-x-2">
                <a
                  href={`/api/download?file=${encodeURIComponent(item.downloadUrl)}&name=${encodeURIComponent(item.title)}`}
                  download={`${item.title.replace(/[^a-zA-Z0-9-_\s]/g, '').trim().replace(/\s+/g, '-')}.pdf`}
                  className="inline-flex items-center px-4 py-2 rounded text-xs font-semibold text-[#173D32] bg-[#F6F2E9] border border-[#C5A46D] hover:bg-[#173D32] hover:text-[#C5A46D] transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  <span>Download Circular</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions & Help */}
        <div className="p-6 bg-white rounded-xl border border-[#C5A46D]/30 shadow-card space-y-3">
          <h4 className="font-serif text-base font-bold text-[#173D32] flex items-center">
            <FileText className="w-4 h-4 mr-2 text-[#C5A46D]" />
            Examination Regulations &amp; Admit Card Instructions
          </h4>
          <ul className="text-xs text-[#342B25]/85 space-y-1.5 list-disc pl-5">
            <li>Scholars must carry their official University Hall Ticket / Admit Card and College Identity Card to all theory and practical centers.</li>
            <li>Possession of mobile phones, smartwatches, or electronic memory devices inside examination sanctums is strictly prohibited.</li>
            <li>Candidates must occupy allotted seats 15 minutes prior to the commencement of written examination papers.</li>
            <li>For discrepancies in marksheets or internal assessment marks, contact the College Examination In-Charge within 7 days of result declaration.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
