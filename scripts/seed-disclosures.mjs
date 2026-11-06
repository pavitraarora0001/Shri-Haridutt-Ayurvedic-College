import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding NCISM Mandatory Disclosures into SQLite database...');

  // Read data from disclosure-data.ts or embed cleanly
  // Clean existing disclosures to allow fresh idempotent seeding
  await prisma.disclosureDocument.deleteMany({});
  await prisma.disclosureRecord.deleteMany({});
  await prisma.disclosureCategory.deleteMany({});

  const categories = [
    {
      categoryNumber: 1,
      code: 'PRINCIPAL_MS',
      title: 'Details of Principal & Medical Superintendent',
      description: 'Statutory institutional leadership, academic qualifications, state council registration numbers, clinical experience, and administrative appointments.',
      icon: 'UserCheck',
      records: [
        {
          title: 'Institutional Principal Profile',
          referenceCode: 'SHAMC/DIR/ADMIN/2026/01',
          academicYear: '2026-27',
          status: 'VERIFIED',
          summary: 'Chief Academic & Executive Officer responsible for college governance, university affiliation compliance, and academic standard maintenance.',
          order: 1,
          documents: [
            {
              title: 'Appointment Order & Verification of Principal (Prof. Dr. D. N. Tripathi)',
              documentCode: 'NCISM-DOC-01-PRIN-2026',
              academicYear: '2026-27',
              fileUrl: '/documents/ncism/principal-appointment-order-2026.pdf',
              fileType: 'PDF',
              fileSize: '1.4 MB'
            }
          ]
        },
        {
          title: 'Hospital Medical Superintendent Profile',
          referenceCode: 'SHAMC/HOSP/MS/2026/02',
          academicYear: '2026-27',
          status: 'VERIFIED',
          summary: 'Head of Clinical Services responsible for 100-bed hospital operations, patient safety, IPD/OPD management, and emergency response.',
          order: 2,
          documents: [
            {
              title: 'Medical Superintendent Appointment & Board Registration Gazette',
              documentCode: 'NCISM-DOC-01-MS-2026',
              academicYear: '2026-27',
              fileUrl: '/documents/ncism/medical-superintendent-gazette-2026.pdf',
              fileType: 'PDF',
              fileSize: '1.2 MB'
            }
          ]
        }
      ]
    },
    {
      categoryNumber: 2,
      code: 'APPROVALS_PERMISSIONS',
      title: 'Registrations, Approvals, Affiliations & Permission Status',
      description: 'Current and historical NCISM Letters of Permission (LoP), University Affiliations, State Govt NOCs, and regulatory compliance orders.',
      icon: 'Award',
      records: [
        {
          title: 'Year-Wise Regulatory Permissions & Sanctions',
          referenceCode: 'NCISM/AYUSH/LOP/2026',
          academicYear: '2026-27',
          status: 'VERIFIED',
          summary: 'Official sanction letters granted by NCISM and the Ministry of AYUSH, Government of India for the conduct of BAMS academic programmes.',
          order: 1,
          documents: [
            {
              title: 'NCISM Letter of Permission (LoP) Academic Session 2026–27',
              documentCode: 'NCISM-LOP-BAMS-2026-27',
              academicYear: '2026-27',
              fileUrl: '/documents/ncism/ncism-permission-letter-2026-27.pdf',
              fileType: 'PDF',
              fileSize: '2.8 MB'
            },
            {
              title: 'University Affiliation Certificate – DSRRAU Jodhpur (2026–27)',
              documentCode: 'DSRRAU-AFF-CERT-2026',
              academicYear: '2026-27',
              fileUrl: '/documents/ncism/university-affiliation-dsrrau-2026.pdf',
              fileType: 'PDF',
              fileSize: '1.9 MB'
            }
          ]
        }
      ]
    },
    {
      categoryNumber: 3,
      code: 'TEACHING_STAFF',
      title: 'Details of Teaching Staff',
      description: 'Department-wise list of full-time teaching faculty with NCISM Teacher Codes, qualifications, designations, experience, and State Council Registration numbers.',
      icon: 'GraduationCap',
      records: [
        {
          title: 'Full-Time Academic Teaching Faculty Register',
          referenceCode: 'SHAMC/HR/FAC-CADRE/2026',
          academicYear: '2026-27',
          status: 'VERIFIED',
          summary: 'Comprehensive department-wise teaching staff list meeting and exceeding NCISM minimum staffing requirements for 100 BAMS seats.',
          order: 1,
          documents: [
            {
              title: 'Certified Teaching Faculty Cadre List with Biometric Codes (NCISM Format)',
              documentCode: 'NCISM-FACULTY-CADRE-2026',
              academicYear: '2026-27',
              fileUrl: '/documents/ncism/teaching-faculty-cadre-register-2026.pdf',
              fileType: 'PDF',
              fileSize: '3.4 MB'
            }
          ]
        }
      ]
    },
    {
      categoryNumber: 4,
      code: 'HOSPITAL_STAFF',
      title: 'Hospital Specialities, Consultants & Staff',
      description: '100-Bed hospital clinical departments, consultant schedules, OPD duty roster, clinical laboratory staff, and hospital nursing personnel.',
      icon: 'Building2',
      records: [
        {
          title: 'Clinical Out-Patient & In-Patient Hospital Departments',
          referenceCode: 'SHAMC/HOSP/CLIN-MSR/2026',
          academicYear: '2026-27',
          status: 'VERIFIED',
          summary: 'Operational clinical departments active 365 days a year with designated consultants and round-the-clock emergency care.',
          order: 1,
          documents: [
            {
              title: 'Hospital Staff Cadre Register, Nursing & Technical Personnel Register',
              documentCode: 'SHAMC-HOSP-STAFF-2026',
              academicYear: '2026-27',
              fileUrl: '/documents/ncism/hospital-clinical-bed-strength-opd-2026.pdf',
              fileType: 'PDF',
              fileSize: '2.1 MB'
            }
          ]
        }
      ]
    },
    {
      categoryNumber: 5,
      code: 'STUDENTS_ADMITTED',
      title: 'Details of Students Admitted',
      description: 'Course-wise, category-wise, and merit-wise admissions summary for current and previous academic sessions under AYUSH NEET counseling.',
      icon: 'Users',
      records: [
        {
          title: 'Admissions Summary by Quota & Category (BAMS 100 Seats)',
          referenceCode: 'SHAMC/ADM/NEET-STAT/2026',
          academicYear: '2025-26',
          status: 'VERIFIED',
          summary: 'All admissions conducted 100% through authorized State AYUSH UG Counseling & AACCC All-India Quota on the basis of NEET-UG merit.',
          order: 1,
          documents: [
            {
              title: 'NEET-UG Admitted Scholars Batch List (Session 2025–26)',
              documentCode: 'SHAMC-BAMS-ADM-LIST-2025-26',
              academicYear: '2025-26',
              fileUrl: '/documents/ncism/student-admissions-register-2025-26.pdf',
              fileType: 'PDF',
              fileSize: '1.7 MB'
            }
          ]
        }
      ]
    },
    {
      categoryNumber: 6,
      code: 'EXAM_RESULTS',
      title: 'University Examination Results',
      description: 'Annual and supplementary examination results authenticated by Dr. Sarvepalli Radhakrishnan Rajasthan Ayurved University, Jodhpur.',
      icon: 'CheckSquare',
      records: [
        {
          title: 'Three-Year Comparative BAMS University Result Performance',
          referenceCode: 'DSRRAU/EXAM/SHAMC-RESULTS/2026',
          academicYear: '2025-26',
          status: 'VERIFIED',
          summary: 'Official annual pass percentages certified by the Controller of Examinations, Dr. S.R. Rajasthan Ayurved University.',
          order: 1,
          documents: [
            {
              title: 'Certified University Examination Result Gazette (3-Year Comparative)',
              documentCode: 'DSRRAU-EXAM-GAZETTE-SHAMC-2026',
              academicYear: '2025-26',
              fileUrl: '/documents/ncism/university-exam-results-analysis-2026.pdf',
              fileType: 'PDF',
              fileSize: '2.5 MB'
            }
          ]
        }
      ]
    },
    {
      categoryNumber: 7,
      code: 'RESEARCH_PUBLICATIONS',
      title: 'Research Publications',
      description: 'Faculty and scholar research publications in UGC-CARE, Scopus, PubMed, and peer-reviewed AYUSH scientific medical journals.',
      icon: 'BookOpen',
      records: [
        {
          title: 'Selected Faculty Research Papers (Past 12 Months)',
          referenceCode: 'SHAMC/RES/PUB-INDEX/2026',
          academicYear: '2026-27',
          status: 'VERIFIED',
          summary: 'Original research papers, clinical trials, and phytochemical analyses authored by institutional faculty.',
          order: 1,
          documents: [
            {
              title: 'Institutional Annual Research Publications Compendium',
              documentCode: 'SHAMC-RES-COMPENDIUM-2026',
              academicYear: '2026-27',
              fileUrl: '/documents/ncism/research-publications-compendium-2026.pdf',
              fileType: 'PDF',
              fileSize: '3.1 MB'
            }
          ]
        }
      ]
    },
    {
      categoryNumber: 8,
      code: 'CME_CONFERENCES',
      title: 'CME, Conferences, Workshops & FDPs',
      description: 'Continuing Medical Education (CME) programmes, national workshops, hands-on clinical seminars, and faculty training organized by the college.',
      icon: 'FileCheck',
      records: [
        {
          title: 'Academic Events Conducted in Current & Previous Academic Years',
          referenceCode: 'SHAMC/ACAD/CME-REP/2026',
          academicYear: '2026-27',
          status: 'VERIFIED',
          summary: 'Institutional records of state and national level conferences, hands-on surgical workshops, and accredited CMEs.',
          order: 1,
          documents: [
            {
              title: 'Annual CME & Faculty Development Activity Report with Event Photographs',
              documentCode: 'SHAMC-CME-REPORT-2026',
              academicYear: '2026-27',
              fileUrl: '/documents/ncism/cme-fdp-activity-report-2026.pdf',
              fileType: 'PDF',
              fileSize: '4.2 MB'
            }
          ]
        }
      ]
    },
    {
      categoryNumber: 9,
      code: 'PROGRAMMES_INTAKE',
      title: 'Educational Programmes & Sanctioned Intake Capacity',
      description: 'Officially recognized degree programmes, sanctioned annual seats, duration, and statutory approval references under Ministry of AYUSH.',
      icon: 'GraduationCap',
      records: [
        {
          title: 'Sanctioned Academic Degree Programmes & Seat Matrix',
          referenceCode: 'SHAMC/ACAD/COURSES-SANCTION/2026',
          academicYear: '2026-27',
          status: 'VERIFIED',
          summary: 'All academic courses offered by Shri Haridutt Ayurvedic Medical College with official government sanctioned capacity.',
          order: 1,
          documents: [
            {
              title: 'Sanctioned Intake Capacity Letter & University Seat Matrix Certificate',
              documentCode: 'NCISM-INTAKE-CERT-2026',
              academicYear: '2026-27',
              fileUrl: '/documents/ncism/bams-sanctioned-intake-certificate-2026.pdf',
              fileType: 'PDF',
              fileSize: '1.6 MB'
            }
          ]
        }
      ]
    },
    {
      categoryNumber: 10,
      code: 'ACCREDITATIONS_AWARDS',
      title: 'Accreditations, Awards & Achievements',
      description: 'Institutional quality certifications, hospital accreditation status, academic awards, and state honors.',
      icon: 'Sparkles',
      records: [
        {
          title: 'Quality Accreditations & Institutional Accolades',
          referenceCode: 'SHAMC/QA/ACCRED-REP/2026',
          academicYear: '2026-27',
          status: 'VERIFIED',
          summary: 'Recognitions granted by statutory quality councils and healthcare inspection boards.',
          order: 1,
          documents: [
            {
              title: 'ISO 9001:2015 & Quality Assurance Compliance Certificates',
              documentCode: 'SHAMC-QA-ISO-CERT-2026',
              academicYear: '2026-27',
              fileUrl: '/documents/ncism/iso-accreditation-certificates-2026.pdf',
              fileType: 'PDF',
              fileSize: '1.9 MB'
            }
          ]
        }
      ]
    },
    {
      categoryNumber: 11,
      code: 'HOSPITAL_STATISTICS',
      title: 'Hospital Statistics & Comparative Data',
      description: 'Verified clinical OPD footfall, IPD admissions, bed occupancy rates, Panchakarma therapies, and laboratory diagnostic statistics.',
      icon: 'Activity',
      records: [
        {
          title: 'Three-Year Verified Hospital Clinical Workload Data',
          referenceCode: 'SHAMC/HOSP/ANNUAL-STAT/2026',
          academicYear: '2025-26',
          status: 'VERIFIED',
          summary: 'Monthly and annual patient workload logs audited and submitted to NCISM inspection committee.',
          order: 1,
          documents: [
            {
              title: 'Hospital Annual Statistical Report with Month-Wise OPD/IPD Breakup',
              documentCode: 'SHAMC-HOSP-STAT-REP-2026',
              academicYear: '2025-26',
              fileUrl: '/documents/ncism/hospital-clinical-bed-strength-opd-2026.pdf',
              fileType: 'PDF',
              fileSize: '2.9 MB'
            }
          ]
        }
      ]
    },
    {
      categoryNumber: 12,
      code: 'EVENTS_ANNOUNCEMENTS',
      title: 'Upcoming Events & Announcements',
      description: 'Statutory institutional notices, national seminars, AYUSH counseling schedules, and college circulars.',
      icon: 'Bell',
      records: [
        {
          title: 'Active Institutional Circulars & Forthcoming Academic Events',
          referenceCode: 'SHAMC/NOTICES/ACTIVE/2026',
          academicYear: '2026-27',
          status: 'PUBLISHED',
          summary: 'Public notices for enrolled scholars, admission applicants, and academic community.',
          order: 1,
          documents: [
            {
              title: 'Admissions 2026–27 Counseling Guidelines & Institutional Rules Gazette',
              documentCode: 'SHAMC-NOT-ADM-2026-08',
              academicYear: '2026-27',
              fileUrl: '/documents/ncism/anti-ragging-statutory-committee-2026.pdf',
              fileType: 'PDF',
              fileSize: '1.5 MB'
            }
          ]
        }
      ]
    },
    {
      categoryNumber: 13,
      code: 'RECOGNITION_STATUS',
      title: 'Recognition Status of All Courses',
      description: 'Comprehensive regulatory recognition directory of undergraduate and postgraduate programmes under NCISM Act 2020.',
      icon: 'ShieldCheck',
      records: [
        {
          title: 'Statutory Course Recognition & Degree Eligibility Directory',
          referenceCode: 'SHAMC/STAT/REC-STATUS/2026',
          academicYear: '2026-27',
          status: 'VERIFIED',
          summary: 'All courses offered lead to qualifications recognized under the National Commission for Indian System of Medicine Act, 2020.',
          order: 1,
          documents: [
            {
              title: 'NCISM Act 2020 Statutory Recognition Gazette Notification',
              documentCode: 'NCISM-REC-GAZETTE-2026',
              academicYear: '2026-27',
              fileUrl: '/documents/ncism/ncism-permission-letter-2026-27.pdf',
              fileType: 'PDF',
              fileSize: '2.8 MB'
            }
          ]
        }
      ]
    },
    {
      categoryNumber: 14,
      code: 'OFFICIAL_LINKS',
      title: 'NCISM & AYUSH Official Links',
      description: 'Authenticated external links to the National Commission, Ministry of AYUSH, affiliating university, and apex regulatory portals.',
      icon: 'ExternalLink',
      records: [
        {
          title: 'Verified Apex Regulatory Government Portals',
          referenceCode: 'SHAMC/EXT/REG-PORTALS/2026',
          academicYear: '2026-27',
          status: 'VERIFIED',
          summary: 'Direct verified links to check institutional approvals and statutory notifications.',
          order: 1,
          documents: [
            {
              title: 'Official Gazette Notification on NCISM Regulations and Institutional Portals',
              documentCode: 'NCISM-GAZETTE-REF-2026',
              academicYear: '2026-27',
              fileUrl: '/documents/ncism/university-affiliation-dsrrau-2026.pdf',
              fileType: 'PDF',
              fileSize: '1.9 MB'
            }
          ]
        }
      ]
    },
    {
      categoryNumber: 15,
      code: 'ATTENDANCE_ANALYSIS',
      title: 'Month-wise Attendance Analysis',
      description: 'Biometric and clinical ward attendance logs for teaching faculty, hospital medical officers, paramedical cadre, and enrolled students.',
      icon: 'Clock',
      records: [
        {
          title: 'Monthly Institutional Attendance Compliance Summary',
          referenceCode: 'SHAMC/HR/ATTEND-REP/2026',
          academicYear: '2026-27',
          status: 'VERIFIED',
          summary: 'Biometric attendance data registered via Aadhaar-enabled biometric systems (AEBAS) in compliance with NCISM instructions.',
          order: 1,
          documents: [
            {
              title: 'Certified Month-Wise Faculty & Student Attendance Register (Quarterly Summary)',
              documentCode: 'SHAMC-ATTEND-LOG-2026-Q3',
              academicYear: '2026-27',
              fileUrl: '/documents/ncism/faculty-student-attendance-summary-2026.pdf',
              fileType: 'PDF',
              fileSize: '2.7 MB'
            }
          ]
        }
      ]
    },
    {
      categoryNumber: 16,
      code: 'TRANSITIONAL_CURRICULUM',
      title: 'Transitional Curriculum',
      description: '15-Day Induction and Transitional Curriculum conducted for newly admitted BAMS scholars as mandated by NCISM Curriculum Guidelines.',
      icon: 'BookMarked',
      records: [
        {
          title: 'BAMS 15-Day Transitional Induction Programme Overview',
          referenceCode: 'SHAMC/ACAD/TRANS-CURR/2026',
          academicYear: '2026-27',
          status: 'VERIFIED',
          summary: 'Structured transitional modules orienting incoming scholars to Ayurvedic philosophy, Sanskrit language foundations, and modern clinical integration.',
          order: 1,
          documents: [
            {
              title: 'BAMS 15-Day Transitional Curriculum Implementation Dossier with Schedule & Reports',
              documentCode: 'NCISM-TRANS-CURR-BAMS-2026',
              academicYear: '2026-27',
              fileUrl: '/documents/ncism/transitional-curriculum-ug-bams-2026.pdf',
              fileType: 'PDF',
              fileSize: '3.6 MB'
            }
          ]
        }
      ]
    }
  ];

  for (const cat of categories) {
    const createdCat = await prisma.disclosureCategory.create({
      data: {
        categoryNumber: cat.categoryNumber,
        code: cat.code,
        title: cat.title,
        description: cat.description,
        icon: cat.icon
      }
    });

    for (const rec of cat.records) {
      const createdRec = await prisma.disclosureRecord.create({
        data: {
          categoryId: createdCat.id,
          title: rec.title,
          referenceCode: rec.referenceCode,
          academicYear: rec.academicYear,
          status: rec.status,
          summary: rec.summary,
          order: rec.order
        }
      });

      for (const doc of rec.documents) {
        await prisma.disclosureDocument.create({
          data: {
            categoryId: createdCat.id,
            recordId: createdRec.id,
            title: doc.title,
            documentCode: doc.documentCode,
            academicYear: doc.academicYear,
            fileUrl: doc.fileUrl,
            fileType: doc.fileType,
            fileSize: doc.fileSize,
            isVerified: true,
            isPublic: true
          }
        });
      }
    }
  }

  const countCat = await prisma.disclosureCategory.count();
  const countRec = await prisma.disclosureRecord.count();
  const countDoc = await prisma.disclosureDocument.count();

  console.log(`Successfully seeded NCISM Disclosures: ${countCat} categories, ${countRec} records, ${countDoc} documents.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
