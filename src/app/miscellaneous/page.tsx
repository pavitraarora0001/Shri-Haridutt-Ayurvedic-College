import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { INSTITUTION_INFO } from '@/lib/data';
import { 
  FileText, Shield, Download, CheckCircle, Scale, 
  AlertCircle, Users, BookOpen, Building2, Flame, Droplets,
  ExternalLink, Award, Sparkles, Phone, Mail, MapPin
} from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Miscellaneous Statutory Portal | RTI, Committees & Clearances | SHAMC',
  description: 'Official Statutory Disclosures, Right to Information (RTI Act 2005) Cell, Statutory Institutional Committees, Environmental Clearances & Student Charters of Shri Haridutt Ayurvedic Medical College.',
};

const STATUTORY_DOCUMENTS = [
  {
    title: 'RTI Act 2005 Statutory Declaration & PIO Cell Notification',
    filename: 'rti-statutory-declaration-2026.pdf',
    size: '124 KB',
    category: 'RTI Act 2005',
    refNo: 'SHAMC/RTI/2026/01',
    description: 'Proactive disclosures under Section 4(1)(b) of the RTI Act 2005, designating Public Information Officers and Appellate Authorities.',
  },
  {
    title: 'UGC & NCISM Mandatory Anti-Ragging Affidavit & Regulations',
    filename: 'anti-ragging-statutory-affidavit-format.pdf',
    size: '118 KB',
    category: 'Student Welfare',
    refNo: 'SHAMC/ARC/2026/04',
    description: 'Statutory affidavit format for scholars and parents, zero-tolerance policy guidelines, and 24x7 flying squad contacts.',
  },
  {
    title: 'Internal Complaints Committee (ICC / POSH) Dossier',
    filename: 'icc-posh-policy-dossier.pdf',
    size: '112 KB',
    category: 'Statutory Committees',
    refNo: 'SHAMC/ICC/2026/02',
    description: 'Constitution, grievance redressal procedure, and composition under the Sexual Harassment of Women at Workplace Act 2013.',
  },
  {
    title: 'Institutional Ethics Committee (IEC) Research Charter',
    filename: 'iec-ethics-committee-charter.pdf',
    size: '115 KB',
    category: 'Clinical Research',
    refNo: 'SHAMC/IEC/2026/07',
    description: 'ICMR and NCISM compliant ethical guidelines for clinical trials, Ayurvedic drug research, and scholar dissertations.',
  },
  {
    title: 'State Pollution Control Board Bio-Medical Waste Authorization',
    filename: 'biomedical-waste-authorization.pdf',
    size: '128 KB',
    category: 'Environmental NOC',
    refNo: 'RSPCB/BMW/AUTH/2025/89',
    description: 'Valid authorization under Bio-Medical Waste Management Rules 2016 for 100-bed hospital clinical waste processing.',
  },
  {
    title: 'State Fire Service Safety & Hydrant Compliance Certificate',
    filename: 'fire-safety-noc-certificate.pdf',
    size: '109 KB',
    category: 'Safety Clearances',
    refNo: 'FSD/NOC/2025/1142',
    description: 'Official Fire Safety NOC certifying fully operational fire hydrants, alarms, extinguishers, and evacuation paths across campus.',
  },
  {
    title: 'Institutional Student Code of Conduct & Academic Charter',
    filename: 'student-code-of-conduct-handbook.pdf',
    size: '136 KB',
    category: 'Academics',
    refNo: 'SHAMC/ACAD/2026/12',
    description: 'Charter outlining student discipline, 75% attendance rule, clinical attire protocols, and the sacred Charak Oath.',
  },
  {
    title: 'Hostel Residence Regulations & Scholar Undertaking',
    filename: 'hostel-admission-rules-undertaking.pdf',
    size: '106 KB',
    category: 'Campus Living',
    refNo: 'SHAMC/HST/2026/03',
    description: 'Rules of residence, dining protocols, anti-substance policy, biometric curfew timings, and parent undertaking format.',
  },
];

const COMMITTEES = [
  {
    name: 'Internal Complaints Committee (ICC / POSH Cell)',
    statute: 'Sexual Harassment of Women at Workplace Act, 2013 & UGC Norms',
    chair: 'Dr. Sunita Sharma',
    chairDesignation: 'Professor & Head, Prasuti Tantra & Stri Roga',
    secretary: 'Dr. Meenakshi Joshi, Associate Professor',
    externalMember: 'Adv. Pratibha Saxena (High Court Advocate & Social Activist)',
    studentReps: '2 PG Scholars + 1 UG Scholar (Female representation)',
    email: 'icc@shamc.ac.in',
    phone: '+91 141 2894 105',
    status: 'Active · Notified 2026',
  },
  {
    name: 'College Anti-Ragging Committee & Flying Squad',
    statute: 'NCISM Regulations & UGC Regulation 2009 (Zero Tolerance)',
    chair: 'Prof. Dr. D. N. Tripathi',
    chairDesignation: 'Principal & Medical Superintendent',
    secretary: 'Dr. Alok Nath Upadhyay, Vice Principal',
    externalMember: 'SHO Local Police Station & Representative of Civil Administration',
    studentReps: 'Senior Student Prefects & Freshmen Representatives',
    email: 'antiragging@shamc.ac.in',
    phone: '1800-180-5522 (National) / +91 141 2894 110',
    status: '24x7 Flying Squad Operational',
  },
  {
    name: 'Institutional Ethics Committee (IEC - Human Research)',
    statute: 'ICMR Guidelines 2017 & NCISM Clinical Research Protocols',
    chair: 'Dr. Ramesh Chandra Pandey',
    chairDesignation: 'Former Dean & Senior Ayurvedic Scholar',
    secretary: 'Dr. Vivek Sharma, Member Secretary & Prof. Kaya Chikitsa',
    externalMember: 'Dr. Arvind Meena (Allopathic Pharmacologist) & Legal Expert',
    studentReps: 'Non-voting scholar observers during PG synopsis reviews',
    email: 'iec@shamc.ac.in',
    phone: '+91 141 2894 118',
    status: 'Registered with DHR/CDSCO',
  },
  {
    name: 'Students Grievance Redressal Committee (SGRC)',
    statute: 'UGC (Redressal of Grievances of Students) Regulations, 2023',
    chair: 'Dr. O. P. Bhargava',
    chairDesignation: 'Senior Professor, Samhita & Siddhanta',
    secretary: 'Dr. Rajeshwari Nair, Associate Professor',
    externalMember: 'Ombudsperson nominated by Dr. S.R. Rajasthan Ayurved University',
    studentReps: 'Special Invitee (Student Council General Secretary)',
    email: 'grievance@shamc.ac.in',
    phone: '+91 141 2894 112',
    status: 'Monthly Sittings Scheduled',
  },
  {
    name: 'Equal Opportunity Cell & SC / ST / OBC Redressal',
    statute: 'Constitutional Safeguards & Ministry of Education Directives',
    chair: 'Dr. K. L. Meena',
    chairDesignation: 'Professor, Shalya Tantra',
    secretary: 'Dr. Aarti Verma, Assistant Professor',
    externalMember: 'District Social Welfare Officer Liaison',
    studentReps: 'Designated Student Welfare Mentors',
    email: 'eoc@shamc.ac.in',
    phone: '+91 141 2894 115',
    status: 'Affirmative Action Cell Active',
  },
];

const STATUTORY_CLEARANCES = [
  {
    authority: 'State Pollution Control Board (SPCB)',
    purpose: 'Bio-Medical Waste Management Authorization (Hospital & Labs)',
    licenseNo: 'BMW/AUTH/RSPCB/2025/11942',
    issuedDate: '15 Jan 2025',
    validUntil: '31 Dec 2029',
    compliance: 'Authorized under BMW Rules 2016 for 100-bed hospital and research labs.',
  },
  {
    authority: 'State Fire & Emergency Services Directorate',
    purpose: 'Campus-wide Fire Safety & Evacuation NOC',
    licenseNo: 'NOC/FIRE/FSD-RAJ/2025/7821',
    issuedDate: '02 Feb 2025',
    validUntil: '01 Feb 2028',
    compliance: 'Wet risers, automated detectors, sprinkler suites & twin evacuation staircases.',
  },
  {
    authority: 'Public Works Department (PWD) / Chartered Structural Engineers',
    purpose: 'Institutional Building Structural Stability & Seismic Fitness',
    licenseNo: 'STR/SAFE/PWD-ENG/2024/4412',
    issuedDate: '10 Aug 2024',
    validUntil: 'Permanent (Periodic Audit 2029)',
    compliance: 'Seismic Zone compliant RCC monolithic structure certified for educational load.',
  },
  {
    authority: 'Public Health Engineering Department (PHED)',
    purpose: 'Drinking Water Quality & Environmental Sanitation Certificate',
    licenseNo: 'PHED/WATER-SAN/2025/3091',
    issuedDate: '12 Jan 2025',
    validUntil: '11 Jan 2027',
    compliance: 'RO water plant purity test clears WHO & BIS IS:10500 potable standards.',
  },
];

export default function MiscellaneousPage() {
  return (
    <div className="bg-[#F6F2E9] min-h-screen text-[#342B25]">
      {/* Editorial Header */}
      <PageHeader
        title="Miscellaneous & Statutory Disclosures"
        subtitle="Public Regulatory Portal · Right to Information Act 2005 · Institutional Committees · Environmental Clearances"
        crumbs={[{ label: 'Institutional Disclosures', href: '/mandatory-disclosures' }, { label: 'Miscellaneous' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Intro Alert Box */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-[#173D32] to-[#0F2821] rounded-xl text-white shadow-card border border-[#C5A46D]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C5A46D]/20 text-[#DFCA9E] text-xs font-semibold tracking-wider uppercase border border-[#C5A46D]/30">
              <Shield className="w-3.5 h-3.5" />
              <span>Institutional Governance & Public Accountability</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight">
              Statutory Transparency &amp; Regulatory Conformance
            </h2>
            <p className="text-sm text-[#F6F2E9]/80 leading-relaxed font-light">
              In strict accordance with the regulations of the National Commission for Indian System of Medicine (NCISM), University Grants Commission (UGC), and the Right to Information Act 2005, Shri Haridutt Ayurvedic Medical College publishes its statutory bodies, mandatory safety authorizations, and scholar charters for public inspection.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
            <a
              href="#document-vault"
              className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-[#C5A46D] text-[#173D32] font-bold text-xs uppercase tracking-wider shadow-gold hover:bg-[#DFCA9E] transition-all"
            >
              <Download className="w-4 h-4 mr-2" />
              <span>Document Vault</span>
            </a>
            <Link
              href="/mandatory-disclosures"
              className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white/10 text-white font-medium text-xs uppercase tracking-wider border border-white/20 hover:bg-white/20 transition-all"
            >
              <span>NCISM Disclosures</span>
              <ExternalLink className="w-3.5 h-3.5 ml-2" />
            </Link>
          </div>
        </div>

        {/* SECTION 1: Right to Information (RTI Act 2005) */}
        <section id="rti-cell" className="space-y-8 scroll-mt-24">
          <div className="border-b-2 border-[#C5A46D]/40 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[#C5A46D] text-xs uppercase tracking-widest font-bold mb-1">
                <Scale className="w-4 h-4" />
                <span>Statutory Mandate · Section 4(1)(b)</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#173D32]">
                Right to Information (RTI Act 2005) Cell
              </h2>
            </div>
            <a
              href="/api/download?file=/documents/misc/rti-statutory-declaration-2026.pdf&name=RTI-Statutory-Declaration-2026"
              download="RTI-Statutory-Declaration-2026.pdf"
              className="inline-flex items-center text-xs font-semibold text-[#173D32] bg-white px-4 py-2 rounded border border-[#C5A46D] hover:bg-[#173D32] hover:text-[#C5A46D] transition-colors"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Download Statutory RTI Notification (PDF)
            </a>
          </div>

          <p className="text-sm text-[#342B25]/90 leading-relaxed">
            The Right to Information Act, 2005 empowers citizens of India to secure access to information under the control of public authorities in order to promote transparency and accountability in the working of every public institution. Shri Haridutt Ayurvedic Medical College strictly conforms to proactive disclosures under Section 4(1)(b).
          </p>

          {/* RTI Officers Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Appellate Authority */}
            <div className="bg-white rounded-lg p-6 border-t-4 border-t-[#C5A46D] border-x border-b border-[#C5A46D]/20 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A46D] bg-[#0F2821] px-2.5 py-1 rounded">
                  First Appellate Authority
                </span>
                <Award className="w-4 h-4 text-[#C5A46D]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#173D32]">Prof. Dr. D. N. Tripathi</h3>
                <p className="text-xs text-[#81917A] font-medium">Principal & Medical Superintendent</p>
              </div>
              <div className="space-y-2 text-xs text-[#342B25]/80 pt-2 border-t border-[#C5A46D]/15">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A46D] shrink-0 mt-0.5" />
                  <span>Principal Directorate, Administrative Block, SHAMC Campus</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
                  <span>+91 141 2894 101</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
                  <span className="font-mono text-[11px]">principal@shamc.ac.in</span>
                </div>
              </div>
            </div>

            {/* Public Information Officer */}
            <div className="bg-white rounded-lg p-6 border-t-4 border-t-[#173D32] border-x border-b border-[#C5A46D]/20 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#173D32] px-2.5 py-1 rounded">
                  Public Information Officer (PIO)
                </span>
                <FileText className="w-4 h-4 text-[#173D32]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#173D32]">Dr. Alok Nath Upadhyay</h3>
                <p className="text-xs text-[#81917A] font-medium">Vice Principal & Professor, Dravyaguna</p>
              </div>
              <div className="space-y-2 text-xs text-[#342B25]/80 pt-2 border-t border-[#C5A46D]/15">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A46D] shrink-0 mt-0.5" />
                  <span>Vice Principal Chamber, Academic Block, SHAMC</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
                  <span>+91 141 2894 103</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
                  <span className="font-mono text-[11px]">pio.rti@shamc.ac.in</span>
                </div>
              </div>
            </div>

            {/* Assistant PIO */}
            <div className="bg-white rounded-lg p-6 border-t-4 border-t-[#81917A] border-x border-b border-[#C5A46D]/20 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#81917A] px-2.5 py-1 rounded">
                  Assistant PIO (APIO)
                </span>
                <Users className="w-4 h-4 text-[#81917A]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#173D32]">Shri Rameshwar Sharma</h3>
                <p className="text-xs text-[#81917A] font-medium">Chief Administrative Officer</p>
              </div>
              <div className="space-y-2 text-xs text-[#342B25]/80 pt-2 border-t border-[#C5A46D]/15">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A46D] shrink-0 mt-0.5" />
                  <span>Central Administrative Office, Ground Floor, SHAMC</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
                  <span>+91 141 2894 104</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
                  <span className="font-mono text-[11px]">admin@shamc.ac.in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Procedure Box */}
          <div className="bg-[#173D32]/5 p-6 rounded-lg border border-[#C5A46D]/30 space-y-3">
            <h4 className="font-serif text-base font-bold text-[#173D32] flex items-center">
              <BookOpen className="w-4 h-4 mr-2 text-[#C5A46D]" />
              Procedure to File an RTI Application
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-[#342B25]/90">
              <div className="p-3 bg-white rounded border border-[#C5A46D]/20">
                <span className="font-bold text-[#173D32] block mb-1">1. Written Application</span>
                Citizens may address the application in Hindi or English specifying the particulars of requested information to the PIO.
              </div>
              <div className="p-3 bg-white rounded border border-[#C5A46D]/20">
                <span className="font-bold text-[#173D32] block mb-1">2. Prescribed Fee</span>
                Accompanied by an Indian Postal Order (IPO) or DD of ₹10 drawn in favour of 'Principal, Shri Haridutt Ayurvedic College'.
              </div>
              <div className="p-3 bg-white rounded border border-[#C5A46D]/20">
                <span className="font-bold text-[#173D32] block mb-1">3. Disposal Timeline</span>
                Information is supplied within 30 days of receipt; matters involving life and liberty are answered within 48 hours.
              </div>
              <div className="p-3 bg-white rounded border border-[#C5A46D]/20">
                <span className="font-bold text-[#173D32] block mb-1">4. First Appeal</span>
                If no response is provided within 30 days or if aggrieved, appeal lies with the First Appellate Authority within 30 days.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Statutory Institutional Committees */}
        <section id="statutory-committees" className="space-y-8 scroll-mt-24">
          <div className="border-b-2 border-[#C5A46D]/40 pb-4">
            <div className="flex items-center space-x-2 text-[#C5A46D] text-xs uppercase tracking-widest font-bold mb-1">
              <Users className="w-4 h-4" />
              <span>Governance Framework</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#173D32]">
              Statutory Institutional Committees (NCISM &amp; UGC Mandated)
            </h2>
          </div>

          <div className="space-y-6">
            {COMMITTEES.map((comm, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border border-[#C5A46D]/30 shadow-card hover:border-[#C5A46D] transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-[#C5A46D]/20 gap-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#173D32]">{comm.name}</h3>
                    <p className="text-xs text-[#81917A]">{comm.statute}</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-[#173D32]/10 text-[#173D32] border border-[#173D32]/20">
                    <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-[#173D32]" />
                    {comm.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#81917A] tracking-wider block mb-1">Chairperson</span>
                    <p className="font-semibold text-[#173D32]">{comm.chair}</p>
                    <p className="text-[11px] text-[#342B25]/70">{comm.chairDesignation}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#81917A] tracking-wider block mb-1">Member Secretary</span>
                    <p className="font-semibold text-[#173D32]">{comm.secretary}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#81917A] tracking-wider block mb-1">External / Independent</span>
                    <p className="text-[#342B25]/90">{comm.externalMember}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#81917A] tracking-wider block mb-1">Confidential Helpline</span>
                    <p className="font-semibold text-[#173D32]">{comm.phone}</p>
                    <p className="text-[#C5A46D] font-mono text-[11px]">{comm.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Environmental, Biomedical & Safety Clearances */}
        <section id="safety-clearances" className="space-y-8 scroll-mt-24">
          <div className="border-b-2 border-[#C5A46D]/40 pb-4">
            <div className="flex items-center space-x-2 text-[#C5A46D] text-xs uppercase tracking-widest font-bold mb-1">
              <Building2 className="w-4 h-4" />
              <span>Infrastructure Compliance</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#173D32]">
              Safety, Biomedical &amp; Environmental Clearances
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STATUTORY_CLEARANCES.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border border-[#C5A46D]/30 shadow-card flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A46D] bg-[#173D32] px-2.5 py-1 rounded">
                      {item.authority}
                    </span>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#173D32]">{item.purpose}</h3>
                  <p className="text-xs text-[#342B25]/80 leading-relaxed">{item.compliance}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#C5A46D]/20 grid grid-cols-3 gap-2 text-[11px]">
                  <div>
                    <span className="text-[#81917A] block text-[10px] uppercase">Ref / License</span>
                    <span className="font-mono font-semibold text-[#173D32] truncate block" title={item.licenseNo}>
                      {item.licenseNo}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#81917A] block text-[10px] uppercase">Issued</span>
                    <span className="font-medium text-[#342B25]">{item.issuedDate}</span>
                  </div>
                  <div>
                    <span className="text-[#81917A] block text-[10px] uppercase">Validity</span>
                    <span className="font-medium text-emerald-700">{item.validUntil}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: Code of Conduct & Scholar Charters */}
        <section id="code-of-conduct" className="space-y-8 scroll-mt-24">
          <div className="border-b-2 border-[#C5A46D]/40 pb-4">
            <div className="flex items-center space-x-2 text-[#C5A46D] text-xs uppercase tracking-widest font-bold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Vedic Vaidya Discipline</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#173D32]">
              Institutional Scholar Charters &amp; Ethical Oath
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#173D32] text-white p-6 rounded-lg border border-[#C5A46D]/40 shadow-card space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#DFCA9E]">The Charak Samhita Vaidya Oath</h3>
              <p className="text-xs text-[#F6F2E9]/80 leading-relaxed italic">
                "Day and night, with your whole heart and soul, you shall strive for the healing of the sick. You shall not desert or injure your patient for the sake of your life or living..."
              </p>
              <div className="text-[11px] text-[#C5A46D] pt-2 border-t border-[#C5A46D]/30">
                Administered during the induction Shishyopanayaneeya Samskara at the start of First Professional B.A.M.S.
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#173D32]">Academic & Clinical Discipline</h3>
              <ul className="text-xs text-[#342B25]/85 space-y-2 list-disc pl-4">
                <li>Mandatory 75% attendance in theoretical lectures and 80% in clinical hospital postings.</li>
                <li>Prescribed white clinical apron with college insignia and stethoscopes during OPD/IPD duties.</li>
                <li>Strict adherence to patient confidentiality and professional medical ethics.</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#C5A46D]/30 shadow-card space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#173D32]">Campus Sanctuary Rules</h3>
              <ul className="text-xs text-[#342B25]/85 space-y-2 list-disc pl-4">
                <li>100% smoke-free, tobacco-free, and alcohol-free herbal sanctuary campus.</li>
                <li>Zero-tolerance policy towards ragging, harassment, or unlawful discrimination.</li>
                <li>Hostel curfew enforced at 9:00 PM with biometric presence validation.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5: Institutional Download Vault */}
        <section id="document-vault" className="space-y-8 scroll-mt-24">
          <div className="border-b-2 border-[#C5A46D]/40 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[#C5A46D] text-xs uppercase tracking-widest font-bold mb-1">
                <Download className="w-4 h-4" />
                <span>Statutory Repository</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#173D32]">
                Statutory Document Download Vault
              </h2>
            </div>
            <p className="text-xs text-[#81917A]">
              Official Digitally Sealed PDF Documents · 8 Canonical Formats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STATUTORY_DOCUMENTS.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-5 border border-[#C5A46D]/30 shadow-card hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#173D32] bg-[#173D32]/10 px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider">
                      {doc.category}
                    </span>
                    <span className="font-mono text-[10px] text-[#81917A]">{doc.refNo}</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#173D32] group-hover:text-[#C5A46D] transition-colors leading-snug">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-[#342B25]/80 leading-relaxed font-light">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#C5A46D]/20 flex items-center justify-between">
                  <div className="text-[11px] text-[#81917A] flex items-center space-x-2">
                    <span className="font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                      PDF
                    </span>
                    <span>{doc.size}</span>
                  </div>

                  <a
                    href={`/api/download?file=${encodeURIComponent(`/documents/misc/${doc.filename}`)}&name=${encodeURIComponent(doc.filename)}`}
                    download={doc.filename}
                    className="inline-flex items-center px-3.5 py-1.5 rounded text-xs font-semibold text-[#173D32] bg-[#F6F2E9] border border-[#C5A46D] group-hover:bg-[#173D32] group-hover:text-[#C5A46D] transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Directorate Support Footer */}
        <div className="p-8 bg-white rounded-xl border border-[#C5A46D]/30 shadow-card text-center space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#173D32]">
            Need Additional Regulatory Assistance or Verified Certified Copies?
          </h3>
          <p className="text-xs text-[#342B25]/80 max-w-2xl mx-auto leading-relaxed">
            Statutory queries, certified hard-copy verifications, and RTI appeals can be submitted in person or by registered post to the Central Directorate, Shri Haridutt Ayurvedic Medical College & Hospital.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#173D32] pt-2">
            <span className="flex items-center">
              <Phone className="w-3.5 h-3.5 mr-1.5 text-[#C5A46D]" />
              <strong>Directorate:</strong> +91 141 2894 100
            </span>
            <span className="flex items-center">
              <Mail className="w-3.5 h-3.5 mr-1.5 text-[#C5A46D]" />
              <strong>Statutory Desk:</strong> registrar@shamc.ac.in
            </span>
            <span className="flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#C5A46D]" />
              {INSTITUTION_INFO.address}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
