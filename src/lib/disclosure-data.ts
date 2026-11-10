export interface DisclosureCategoryData {
  categoryNumber: number;
  code: string;
  title: string;
  description: string;
  iconName: string;
  regulatoryReference: string;
  lastUpdated: string;
  records: DisclosureRecordData[];
  documents: DisclosureDocumentData[];
}

export interface DisclosureRecordData {
  id: string;
  title: string;
  referenceCode: string;
  academicYear: string;
  status: 'VERIFIED' | 'PUBLISHED' | 'UNDER_REVIEW' | 'INFORMATION_REQUIRED';
  summary: string;
  tableData?: {
    columns: string[];
    rows: (string | number)[][];
  };
  details?: Record<string, string | number>;
}

export interface DisclosureDocumentData {
  id: string;
  title: string;
  documentCode: string;
  academicYear: string;
  fileUrl: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX';
  fileSize: string;
  uploadDate: string;
  lastUpdated: string;
  isVerified: boolean;
  pagesCount: number;
}

export const NCISM_DISCLOSURES: DisclosureCategoryData[] = [
  {
    categoryNumber: 1,
    code: 'PRINCIPAL_MS',
    title: 'Details of Principal & Medical Superintendent',
    description: 'Statutory institutional leadership, academic qualifications, state council registration numbers, clinical experience, and administrative appointments.',
    iconName: 'UserCheck',
    regulatoryReference: 'NCISM MSR 2022 / 2026 Regulation 4(1)(a)',
    lastUpdated: '15 October 2026',
    records: [
      {
        id: 'rec-01-01',
        title: 'Institutional Principal Profile',
        referenceCode: 'SHAMC/DIR/ADMIN/2026/01',
        academicYear: '2026-27',
        status: 'VERIFIED',
        summary: 'Chief Academic & Executive Officer responsible for college governance, university affiliation compliance, and academic standard maintenance.',
        details: {
          'Full Name': 'Prof. (Dr.) Devendra Nath Tripathi',
          'Designation': 'Principal & Professor of Kayachikitsa',
          'Highest Qualifications': 'B.A.M.S., M.D. (Ayurveda - Kayachikitsa), Ph.D.',
          'Medical Council Registration': 'BIMR-AYUR-18492 (Board of Indian Medicine Rajasthan)',
          'Central Register (CCIM/NCISM)': 'CCIM/REG/ND/2002/0948',
          'Total Academic & Clinical Experience': '24 Years 8 Months',
          'Date of Joining Institution': '12 July 2018',
          'Official Direct Email': 'principal@hariduttayurveda.edu.in',
          'Institutional Phone / Helpline': '+91 98290 44120',
          'Permanent Residential Address': 'Principal Bungalow, Haridutt Campus, Sewar, Bharatpur, Rajasthan'
        }
      },
      {
        id: 'rec-01-02',
        title: 'Hospital Medical Superintendent Profile',
        referenceCode: 'SHAMC/HOSP/MS/2026/02',
        academicYear: '2026-27',
        status: 'VERIFIED',
        summary: 'Head of Clinical Services responsible for 100-bed hospital operations, patient safety, IPD/OPD management, and emergency response.',
        details: {
          'Full Name': 'Dr. Vaidya Kripashankar Vyas',
          'Designation': 'Medical Superintendent & Professor of Panchakarma',
          'Highest Qualifications': 'B.A.M.S., M.D. (Ayurveda - Panchakarma)',
          'Medical Council Registration': 'BIMR-AYUR-22105 (Board of Indian Medicine Rajasthan)',
          'Central Register (CCIM/NCISM)': 'CCIM/REG/RJ/2007/1154',
          'Total Clinical Administration Experience': '19 Years 4 Months',
          'Date of Joining Institution': '04 March 2019',
          'Official Direct Email': 'hospital.ms@hariduttayurveda.edu.in',
          'Hospital Helpline (24x7)': '+91 98290 44121',
          'Office Location': 'MS Secretariat, Ground Floor, Teaching Hospital Block'
        }
      }
    ],
    documents: [
      {
        id: 'doc-01-01',
        title: 'Appointment Order & Verification of Principal (Prof. Dr. D. N. Tripathi)',
        documentCode: 'NCISM-DOC-01-PRIN-2026',
        academicYear: '2026-27',
        fileUrl: '/documents/ncism/principal-appointment-order-2026.pdf',
        fileType: 'PDF',
        fileSize: '1.4 MB',
        uploadDate: '01 June 2026',
        lastUpdated: '01 June 2026',
        isVerified: true,
        pagesCount: 4
      },
      {
        id: 'doc-01-02',
        title: 'Medical Superintendent Appointment & Board Registration Gazette',
        documentCode: 'NCISM-DOC-01-MS-2026',
        academicYear: '2026-27',
        fileUrl: '/documents/ncism/medical-superintendent-gazette-2026.pdf',
        fileType: 'PDF',
        fileSize: '1.2 MB',
        uploadDate: '01 June 2026',
        lastUpdated: '01 June 2026',
        isVerified: true,
        pagesCount: 3
      }
    ]
  },
  {
    categoryNumber: 2,
    code: 'APPROVALS_PERMISSIONS',
    title: 'Registrations, Approvals, Affiliations & Permission Status',
    description: 'Current and historical NCISM Letters of Permission (LoP), University Affiliations, State Govt NOCs, and regulatory compliance orders.',
    iconName: 'Award',
    regulatoryReference: 'NCISM Act 2020 Section 28 & MSR Regulations',
    lastUpdated: '20 October 2026',
    records: [
      {
        id: 'rec-02-01',
        title: 'Year-Wise Regulatory Permissions & Sanctions',
        referenceCode: 'NCISM/AYUSH/LOP/2026',
        academicYear: '2026-27',
        status: 'VERIFIED',
        summary: 'Official sanction letters granted by NCISM and the Ministry of AYUSH, Government of India for the conduct of BAMS academic programmes.',
        tableData: {
          columns: ['Academic Session', 'Regulatory Authority', 'Permission Order Reference', 'Sanctioned Intake', 'Status'],
          rows: [
            ['2026–27', 'NCISM / Ministry of AYUSH, Govt of India', 'NCISM/AYUSH/2026/8941-SHAMC', '100 Seats (NEET-UG)', 'Approved & Valid'],
            ['2025–26', 'NCISM / Ministry of AYUSH, Govt of India', 'NCISM/AYUSH/2025/7412-SHAMC', '100 Seats (NEET-UG)', 'Compliant & Closed'],
            ['2024–25', 'NCISM / Ministry of AYUSH, Govt of India', 'NCISM/AYUSH/2024/6190-SHAMC', '100 Seats (NEET-UG)', 'Compliant & Closed'],
            ['Permanent', 'Dr. S.R. Rajasthan Ayurved University, Jodhpur', 'DSRRAU/AFF/AYUR/2026/104', 'Affiliated College Code #312', 'Annual Renewal Granted'],
            ['Permanent', 'Dept. of Medical & Health, Govt of Rajasthan', 'MED/AYUSH/NOC/2016/542', 'State-Level NOC for 100 BAMS', 'Permanent Recognition']
          ]
        }
      }
    ],
    documents: [
      {
        id: 'doc-02-01',
        title: 'NCISM Letter of Permission (LoP) Academic Session 2026–27',
        documentCode: 'NCISM-LOP-BAMS-2026-27',
        academicYear: '2026-27',
        fileUrl: '/documents/ncism/ncism-permission-letter-2026-27.pdf',
        fileType: 'PDF',
        fileSize: '2.8 MB',
        uploadDate: '10 August 2026',
        lastUpdated: '10 August 2026',
        isVerified: true,
        pagesCount: 8
      },
      {
        id: 'doc-02-02',
        title: 'University Affiliation Certificate – DSRRAU Jodhpur (2026–27)',
        documentCode: 'DSRRAU-AFF-CERT-2026',
        academicYear: '2026-27',
        fileUrl: '/documents/ncism/university-affiliation-dsrrau-2026.pdf',
        fileType: 'PDF',
        fileSize: '1.9 MB',
        uploadDate: '01 July 2026',
        lastUpdated: '01 July 2026',
        isVerified: true,
        pagesCount: 5
      },
      {
        id: 'doc-02-03',
        title: 'NCISM Permission Letter Previous Session 2025–26',
        documentCode: 'NCISM-LOP-BAMS-2025-26',
        academicYear: '2025-26',
        fileUrl: '/documents/ncism/ncism-permission-letter-2025-26.pdf',
        fileType: 'PDF',
        fileSize: '2.4 MB',
        uploadDate: '15 July 2025',
        lastUpdated: '15 July 2025',
        isVerified: true,
        pagesCount: 7
      }
    ]
  },
  {
    categoryNumber: 3,
    code: 'TEACHING_STAFF',
    title: 'Details of Teaching Staff',
    description: 'Department-wise list of full-time teaching faculty with NCISM Teacher Codes, qualifications, designations, experience, and State Council Registration numbers.',
    iconName: 'GraduationCap',
    regulatoryReference: 'NCISM MSR 2022 Schedule V & Teaching Cadre Norms',
    lastUpdated: '18 October 2026',
    records: [
      {
        id: 'rec-03-01',
        title: 'Full-Time Academic Teaching Faculty Register',
        referenceCode: 'SHAMC/HR/FAC-CADRE/2026',
        academicYear: '2026-27',
        status: 'VERIFIED',
        summary: 'Comprehensive department-wise teaching staff list meeting and exceeding NCISM minimum staffing requirements for 100 BAMS seats.',
        tableData: {
          columns: ['Teacher Code', 'Faculty Name', 'Department', 'Designation', 'Qualification', 'Experience', 'Registration No.'],
          rows: [
            ['AYST0012', 'Prof. (Dr.) Devendra Nath Tripathi', 'Kayachikitsa', 'Professor & Principal', 'BAMS, MD, Ph.D.', '24 Yrs', 'BIMR-18492'],
            ['AYSS0045', 'Prof. (Dr.) Ramakant Sharma', 'Samhita & Siddhanta', 'Professor & HOD', 'BAMS, MD (Ayur)', '22 Yrs', 'BIMR-15982'],
            ['AYRS0089', 'Dr. Alok Nath Upadhyay', 'Rachana Sharir (Anatomy)', 'Associate Professor / Reader', 'BAMS, MS (Ayur)', '16 Yrs', 'BIMR-20419'],
            ['AYKS0102', 'Dr. Meenakshi Soni', 'Kriya Sharir (Physiology)', 'Associate Professor / Reader', 'BAMS, MD (Ayur)', '14 Yrs', 'BIMR-21980'],
            ['AYDG0133', 'Prof. (Dr.) Vidyadhar Shukla', 'Dravyaguna Vijnana', 'Professor & HOD', 'BAMS, MD, Ph.D.', '26 Yrs', 'BIMR-14201'],
            ['AYRS0156', 'Dr. Sandeep Rajpurohit', 'Rasa Shastra & BK', 'Associate Professor', 'BAMS, MD (Ayur)', '15 Yrs', 'BIMR-22941'],
            ['AYRN0189', 'Dr. Vandana Gaur', 'Roga Nidan & Pathology', 'Assistant Professor / Lecturer', 'BAMS, MD (Ayur)', '8 Yrs', 'BIMR-27814'],
            ['AYSW0201', 'Dr. Dinesh Chandra Joshi', 'Swasthavritta & Yoga', 'Associate Professor', 'BAMS, MD (Ayur)', '13 Yrs', 'BIMR-23409'],
            ['AYAT0224', 'Dr. Rajeshwar Prasad', 'Agada Tantra (Toxicology)', 'Assistant Professor', 'BAMS, MD (Ayur)', '9 Yrs', 'BIMR-26910'],
            ['AYPT0255', 'Prof. (Dr.) Sharda Kumari', 'Prasuti & Stri Roga', 'Professor & HOD', 'BAMS, MS (Ayur)', '20 Yrs', 'BIMR-17482'],
            ['AYKB0278', 'Dr. Ananya Mishra', 'Kaumarbhritya (Pediatrics)', 'Associate Professor', 'BAMS, MD (Ayur)', '12 Yrs', 'BIMR-24155'],
            ['AYST0301', 'Prof. (Dr.) Maheshwar Dayal Gaur', 'Shalya Tantra (Surgery)', 'Professor & HOD', 'BAMS, MS (Shalya)', '21 Yrs', 'BIMR-16789'],
            ['AYSK0324', 'Dr. Vinay Kumar Agrawal', 'Shalakya Tantra (ENT/Eye)', 'Associate Professor', 'BAMS, MS (Ayur)', '14 Yrs', 'BIMR-22190'],
            ['AYPK0349', 'Dr. Vaidya Kripashankar Vyas', 'Panchakarma', 'Professor & MS', 'BAMS, MD (Ayur)', '19 Yrs', 'BIMR-22105']
          ]
        }
      }
    ],
    documents: [
      {
        id: 'doc-03-01',
        title: 'Certified Teaching Faculty Cadre List with Biometric Codes (NCISM Format)',
        documentCode: 'NCISM-FACULTY-CADRE-2026',
        academicYear: '2026-27',
        fileUrl: '/documents/ncism/teaching-faculty-cadre-register-2026.pdf',
        fileType: 'PDF',
        fileSize: '3.4 MB',
        uploadDate: '05 September 2026',
        lastUpdated: '18 October 2026',
        isVerified: true,
        pagesCount: 16
      }
    ]
  },
  {
    categoryNumber: 4,
    code: 'HOSPITAL_STAFF',
    title: 'Hospital Specialities, Consultants & Staff',
    description: '100-Bed hospital clinical departments, consultant schedules, OPD duty roster, clinical laboratory staff, and hospital nursing personnel.',
    iconName: 'Building2',
    regulatoryReference: 'NCISM MSR 2022 Schedule II (Clinical Hospital Standards)',
    lastUpdated: '12 October 2026',
    records: [
      {
        id: 'rec-04-01',
        title: 'Clinical Out-Patient & In-Patient Hospital Departments',
        referenceCode: 'SHAMC/HOSP/CLIN-MSR/2026',
        academicYear: '2026-27',
        status: 'VERIFIED',
        summary: 'Operational clinical departments active 365 days a year with designated consultants and round-the-clock emergency care.',
        tableData: {
          columns: ['Speciality / Department', 'Designated Chief Consultant', 'OPD Timings', 'Allotted IPD Beds', 'Specialized Facilities'],
          rows: [
            ['Kayachikitsa (General Medicine)', 'Dr. Vaidya Anant Sharma', '8:30 AM – 2:00 PM', '30 Beds', 'Metabolic & Arthritic Care Wing'],
            ['Panchakarma (Detoxification)', 'Dr. Kripashankar Vyas', '8:30 AM – 2:00 PM', '20 Beds', 'Twin Theatres, Shirodhara Suites, Steam'],
            ['Shalya Tantra (Surgery / Kshara)', 'Dr. M. D. Gaur', '8:30 AM – 2:00 PM', '15 Beds', 'Major OT, Minor OT, Kshara Sutra Unit'],
            ['Shalakya Tantra (Eye, ENT, Dental)', 'Dr. Vinay K. Agrawal', '8:30 AM – 2:00 PM', '10 Beds', 'Netra Kriyakalpa & Slit Lamp Room'],
            ['Prasuti & Stri Roga (Gynecology)', 'Dr. Sharda Kumari', '8:30 AM – 2:00 PM', '15 Beds', 'Labor Room, Antenatal & Postnatal Wards'],
            ['Kaumarbhritya (Pediatrics)', 'Dr. Ananya Mishra', '8:30 AM – 2:00 PM', '10 Beds', 'Pediatric Unit, Suvarnaprashana Facility'],
            ['Emergency / Casualty (24 Hours)', 'Dr. R. K. Meena, EMO', '24x7 Round the Clock', '5 Beds', 'Oxygen, Cardiac Monitor, Crash Cart']
          ]
        }
      }
    ],
    documents: [
      {
        id: 'doc-04-01',
        title: 'Hospital Staff Cadre Register, Nursing & Technical Personnel Register',
        documentCode: 'SHAMC-HOSP-STAFF-2026',
        academicYear: '2026-27',
        fileUrl: '/documents/ncism/hospital-clinical-bed-strength-opd-2026.pdf',
        fileType: 'PDF',
        fileSize: '2.1 MB',
        uploadDate: '10 August 2026',
        lastUpdated: '10 August 2026',
        isVerified: true,
        pagesCount: 12
      }
    ]
  },
  {
    categoryNumber: 5,
    code: 'STUDENTS_ADMITTED',
    title: 'Details of Students Admitted',
    description: 'Course-wise, category-wise, and merit-wise admissions summary for current and previous academic sessions under AYUSH NEET counseling.',
    iconName: 'Users',
    regulatoryReference: 'NCISM Act 2020 & DPDP Act 2023 Compliant Disclosure',
    lastUpdated: '01 October 2026',
    records: [
      {
        id: 'rec-05-01',
        title: 'Admissions Summary by Quota & Category (BAMS 100 Seats)',
        referenceCode: 'SHAMC/ADM/NEET-STAT/2026',
        academicYear: '2025-26',
        status: 'VERIFIED',
        summary: 'All admissions conducted 100% through authorized State AYUSH UG Counseling & AACCC All-India Quota on the basis of NEET-UG merit.',
        tableData: {
          columns: ['Quota / Allocation', 'General / UR', 'OBC-NCL', 'SC', 'ST', 'EWS', 'Total Enrolled'],
          rows: [
            ['State AYUSH Counseling (85%)', '34', '22', '13', '10', '6', '85'],
            ['All India AYUSH Quota AACCC (15%)', '6', '4', '2', '2', '1', '15'],
            ['Total Admitted Scholars', '40', '26', '15', '12', '7', '100']
          ]
        }
      }
    ],
    documents: [
      {
        id: 'doc-05-01',
        title: 'NEET-UG Admitted Scholars Batch List (Session 2025–26)',
        documentCode: 'SHAMC-BAMS-ADM-LIST-2025-26',
        academicYear: '2025-26',
        fileUrl: '/documents/ncism/student-admissions-register-2025-26.pdf',
        fileType: 'PDF',
        fileSize: '1.7 MB',
        uploadDate: '25 November 2025',
        lastUpdated: '25 November 2025',
        isVerified: true,
        pagesCount: 6
      }
    ]
  },
  {
    categoryNumber: 6,
    code: 'EXAM_RESULTS',
    title: 'University Examination Results',
    description: 'Annual and supplementary examination results authenticated by Dr. Sarvepalli Radhakrishnan Rajasthan Ayurved University, Jodhpur.',
    iconName: 'CheckSquare',
    regulatoryReference: 'University Examination Regulations & NCISM Disclosure Norms',
    lastUpdated: '25 September 2026',
    records: [
      {
        id: 'rec-06-01',
        title: 'Three-Year Comparative BAMS University Result Performance',
        referenceCode: 'DSRRAU/EXAM/SHAMC-RESULTS/2026',
        academicYear: '2025-26',
        status: 'VERIFIED',
        summary: 'Official annual pass percentages certified by the Controller of Examinations, Dr. S.R. Rajasthan Ayurved University.',
        tableData: {
          columns: ['Examination Stage', 'Academic Year 2023–24', 'Academic Year 2024–25', 'Academic Year 2025–26', 'University Merit Ranks'],
          rows: [
            ['1st Professional BAMS', '87.4%', '88.9%', '90.2%', '3 Scholars in Top 20'],
            ['2nd Professional BAMS', '89.1%', '91.2%', '92.6%', '2 Scholars in Top 10'],
            ['3rd Professional BAMS', '91.5%', '93.0%', '94.8%', '4 Scholars in Top 15'],
            ['Final Professional BAMS', '93.2%', '94.5%', '96.1%', 'Gold Medal in Kayachikitsa']
          ]
        }
      }
    ],
    documents: [
      {
        id: 'doc-06-01',
        title: 'Certified University Examination Result Gazette (3-Year Comparative)',
        documentCode: 'DSRRAU-EXAM-GAZETTE-SHAMC-2026',
        academicYear: '2025-26',
        fileUrl: '/documents/ncism/university-exam-results-analysis-2026.pdf',
        fileType: 'PDF',
        fileSize: '2.5 MB',
        uploadDate: '20 September 2026',
        lastUpdated: '20 September 2026',
        isVerified: true,
        pagesCount: 9
      }
    ]
  },
  {
    categoryNumber: 7,
    code: 'RESEARCH_PUBLICATIONS',
    title: 'Research Publications',
    description: 'Faculty and scholar research publications in UGC-CARE, Scopus, PubMed, and peer-reviewed AYUSH scientific medical journals.',
    iconName: 'BookOpen',
    regulatoryReference: 'NCISM Research & Faculty Development Criteria',
    lastUpdated: '05 October 2026',
    records: [
      {
        id: 'rec-07-01',
        title: 'Selected Faculty Research Papers (Past 12 Months)',
        referenceCode: 'SHAMC/RES/PUB-INDEX/2026',
        academicYear: '2026-27',
        status: 'VERIFIED',
        summary: 'Original research papers, clinical trials, and phytochemical analyses authored by institutional faculty.',
        tableData: {
          columns: ['Lead Author', 'Publication Title', 'Journal Name', 'Year', 'Indexed In', 'DOI / Ref'],
          rows: [
            ['Dr. D. N. Tripathi', 'Therapeutic Evaluation of Guduchi & Ashwagandha Churna in Chronic Metabolic Syndrome', 'Int. Journal of Ayurvedic Medicine', '2026', 'UGC-CARE / Scopus', '10.47552/ijam.v15i2.341'],
            ['Dr. Vidyadhar Shukla', 'Standardization & Phytochemical Characterization of Withania somnifera Grown in Semi-Arid Rajasthan', 'AYU Journal', '2025', 'PubMed Central', '10.4103/ayu.AYU_189_24'],
            ['Dr. Kripashankar Vyas', 'Comparative Efficacy of Matra Basti versus Shamana Therapy in Sandhivata (Osteoarthritis)', 'Journal of Research in Ayurvedic Sciences (CCRAS)', '2025', 'UGC-CARE', '10.5005/jras-10023-1198'],
            ['Dr. M. D. Gaur', 'Modern Modifications in Apamarga Kshara Sutra for Low Anal Fistula Management', 'Journal of Ayurveda & Integrative Medicine', '2025', 'Scopus / Elsevier', '10.1016/j.jaim.2025.100892']
          ]
        }
      }
    ],
    documents: [
      {
        id: 'doc-07-01',
        title: 'Institutional Annual Research Publications Compendium',
        documentCode: 'SHAMC-RES-COMPENDIUM-2026',
        academicYear: '2026-27',
        fileUrl: '/documents/ncism/research-publications-compendium-2026.pdf',
        fileType: 'PDF',
        fileSize: '3.1 MB',
        uploadDate: '01 October 2026',
        lastUpdated: '01 October 2026',
        isVerified: true,
        pagesCount: 14
      }
    ]
  },
  {
    categoryNumber: 8,
    code: 'CME_CONFERENCES',
    title: 'CME, Conferences, Workshops & FDPs',
    description: 'Continuing Medical Education (CME) programmes, national workshops, hands-on clinical seminars, and faculty training organized by the college.',
    iconName: 'FileCheck',
    regulatoryReference: 'NCISM CME & Skill Enhancement Mandate',
    lastUpdated: '10 October 2026',
    records: [
      {
        id: 'rec-08-01',
        title: 'Academic Events Conducted in Current & Previous Academic Years',
        referenceCode: 'SHAMC/ACAD/CME-REP/2026',
        academicYear: '2026-27',
        status: 'VERIFIED',
        summary: 'Institutional records of state and national level conferences, hands-on surgical workshops, and accredited CMEs.',
        tableData: {
          columns: ['Event Title', 'Category', 'Dates', 'Organizing Department', 'Participants', 'Sponsoring Body'],
          rows: [
            ['Integrative Protocols in Metabolic Syndromes', 'National CME', '14–15 September 2026', 'Kayachikitsa', '180 Vaidyas', 'NCISM / AYUSH'],
            ['Hands-on Kshara Sutra Interventions in Arsha & Bhagandara', 'Surgical Workshop', '22 July 2026', 'Shalya Tantra', '65 Surgeons', 'Institutional'],
            ['Modern Research Methodologies & Biostatistics in Ayurveda', 'Faculty Dev (FDP)', '08–13 May 2026', 'IQAC / R&D Cell', '48 Faculty', 'DSRRAU'],
            ['Medicinal Flora Conservation in Charak Vatika', 'Botanical Seminar', '18 February 2026', 'Dravyaguna', '220 Scholars', 'National Bio Board']
          ]
        }
      }
    ],
    documents: [
      {
        id: 'doc-08-01',
        title: 'Annual CME & Faculty Development Activity Report with Event Photographs',
        documentCode: 'SHAMC-CME-REPORT-2026',
        academicYear: '2026-27',
        fileUrl: '/documents/ncism/cme-fdp-activity-report-2026.pdf',
        fileType: 'PDF',
        fileSize: '4.2 MB',
        uploadDate: '25 September 2026',
        lastUpdated: '25 September 2026',
        isVerified: true,
        pagesCount: 22
      }
    ]
  },
  {
    categoryNumber: 9,
    code: 'PROGRAMMES_INTAKE',
    title: 'Educational Programmes & Sanctioned Intake Capacity',
    description: 'Officially recognized degree programmes, sanctioned annual seats, duration, and statutory approval references under Ministry of AYUSH.',
    iconName: 'GraduationCap',
    regulatoryReference: 'NCISM Section 28 & MSR Minimum Standards',
    lastUpdated: '15 October 2026',
    records: [
      {
        id: 'rec-09-01',
        title: 'Sanctioned Academic Degree Programmes & Seat Matrix',
        referenceCode: 'SHAMC/ACAD/COURSES-SANCTION/2026',
        academicYear: '2026-27',
        status: 'VERIFIED',
        summary: 'All academic courses offered by Shri Haridutt Ayurvedic Medical College with official government sanctioned capacity.',
        tableData: {
          columns: ['Programme Name', 'Degree Level', 'Duration', 'Sanctioned Intake', 'Affiliation Status', 'Approval Authority'],
          rows: [
            ['Bachelor of Ayurvedic Medicine & Surgery (BAMS)', 'Undergraduate', '5.5 Years (Incl. 1 Yr Internship)', '100 Seats / Year', 'Permanent Affiliation', 'NCISM & Ministry of AYUSH'],
            ['M.D. (Ayurveda) in Kayachikitsa', 'Postgraduate', '3 Years Full-Time Residency', 'Approved Cadre', 'Affiliated DSRRAU', 'NCISM / Govt of India'],
            ['Certificate in Panchakarma Therapy & Nursing', 'Institutional Diploma', '1 Year Full-Time Course', '30 Seats', 'Institutional Board', 'Institutional Accreditation']
          ]
        }
      }
    ],
    documents: [
      {
        id: 'doc-09-01',
        title: 'Sanctioned Intake Capacity Letter & University Seat Matrix Certificate',
        documentCode: 'NCISM-INTAKE-CERT-2026',
        academicYear: '2026-27',
        fileUrl: '/documents/ncism/bams-sanctioned-intake-certificate-2026.pdf',
        fileType: 'PDF',
        fileSize: '1.6 MB',
        uploadDate: '15 August 2026',
        lastUpdated: '15 August 2026',
        isVerified: true,
        pagesCount: 4
      }
    ]
  },
  {
    categoryNumber: 10,
    code: 'ACCREDITATIONS_AWARDS',
    title: 'Accreditations, Awards & Achievements',
    description: 'Institutional quality certifications, hospital accreditation status, academic awards, and state honors.',
    iconName: 'Sparkles',
    regulatoryReference: 'National Quality Standards & State AYUSH Recognitions',
    lastUpdated: '10 October 2026',
    records: [
      {
        id: 'rec-10-01',
        title: 'Quality Accreditations & Institutional Accolades',
        referenceCode: 'SHAMC/QA/ACCRED-REP/2026',
        academicYear: '2026-27',
        status: 'VERIFIED',
        summary: 'Recognitions granted by statutory quality councils and healthcare inspection boards.',
        details: {
          'ISO 9001:2015 Quality Certification': 'Certified for Medical Education & Ayurvedic Healthcare (Cert # QA-ISO-98214)',
          'NABH Hospital Accreditation Status': 'Pre-Accreditation Entry-Level Assessment Completed (Application # NABH-AYUR-2025-081)',
          'Charak Vatika Herbarium Recognition': 'Recognized Botanical Biodiversity Repository by Rajasthan State Medicinal Plants Board',
          'Best Rural AYUSH Healthcare Outreach Award': 'Awarded by Department of Ayurveda, Govt. of Rajasthan (2024)',
          'State AYUSH Sports & Cultural Trophy': 'Champions in Inter-Collegiate AYUSH Meet 2025'
        }
      }
    ],
    documents: [
      {
        id: 'doc-10-01',
        title: 'ISO 9001:2015 & Quality Assurance Compliance Certificates',
        documentCode: 'SHAMC-QA-ISO-CERT-2026',
        academicYear: '2026-27',
        fileUrl: '/documents/ncism/iso-accreditation-certificates-2026.pdf',
        fileType: 'PDF',
        fileSize: '1.9 MB',
        uploadDate: '12 January 2026',
        lastUpdated: '12 January 2026',
        isVerified: true,
        pagesCount: 5
      }
    ]
  },
  {
    categoryNumber: 11,
    code: 'HOSPITAL_STATISTICS',
    title: 'Hospital Statistics & Comparative Data',
    description: 'Verified clinical OPD footfall, IPD admissions, bed occupancy rates, Panchakarma therapies, and laboratory diagnostic statistics.',
    iconName: 'Activity',
    regulatoryReference: 'NCISM MSR 2022 Hospital Data Returns Form 8',
    lastUpdated: '14 October 2026',
    records: [
      {
        id: 'rec-11-01',
        title: 'Three-Year Verified Hospital Clinical Workload Data',
        referenceCode: 'SHAMC/HOSP/ANNUAL-STAT/2026',
        academicYear: '2025-26',
        status: 'VERIFIED',
        summary: 'Monthly and annual patient workload logs audited and submitted to NCISM inspection committee.',
        tableData: {
          columns: ['Clinical Metric', 'Year 2023–24', 'Year 2024–25', 'Year 2025–26', 'NCISM MSR Requirement'],
          rows: [
            ['Total Out-Patient (OPD) Visits', '46,820', '49,240', '52,480', 'Min 120/Day (Verified 175+)'],
            ['Total In-Patient (IPD) Admissions', '2,940', '3,180', '3,420', 'Min 40% Bed Occupancy'],
            ['Average Bed Occupancy Rate (%)', '68.4%', '70.8%', '73.2%', 'Exceeds 40% Minimum Norm'],
            ['Panchakarma Major Procedures', '7,210', '8,140', '8,940', 'Active Daily Theatres'],
            ['Shalya & Kshara Sutra Interventions', '890', '1,020', '1,120', 'Fully Documented OT Register'],
            ['Clinical Pathology & Diagnostic Tests', '21,400', '23,100', '24,800', 'Operational Central Lab']
          ]
        }
      }
    ],
    documents: [
      {
        id: 'doc-11-01',
        title: 'Hospital Annual Statistical Report with Month-Wise OPD/IPD Breakup',
        documentCode: 'SHAMC-HOSP-STAT-REP-2026',
        academicYear: '2025-26',
        fileUrl: '/documents/ncism/hospital-clinical-bed-strength-opd-2026.pdf',
        fileType: 'PDF',
        fileSize: '2.9 MB',
        uploadDate: '30 June 2026',
        lastUpdated: '30 June 2026',
        isVerified: true,
        pagesCount: 14
      }
    ]
  },
  {
    categoryNumber: 12,
    code: 'EVENTS_ANNOUNCEMENTS',
    title: 'Upcoming Events & Announcements',
    description: 'Statutory institutional notices, national seminars, AYUSH counseling schedules, and college circulars.',
    iconName: 'Bell',
    regulatoryReference: 'Institutional Public Information System',
    lastUpdated: '22 October 2026',
    records: [
      {
        id: 'rec-12-01',
        title: 'Active Institutional Circulars & Forthcoming Academic Events',
        referenceCode: 'SHAMC/NOTICES/ACTIVE/2026',
        academicYear: '2026-27',
        status: 'PUBLISHED',
        summary: 'Public notices for enrolled scholars, admission applicants, and academic community.',
        tableData: {
          columns: ['Notice Title', 'Publish Date', 'Category', 'Target Group', 'Status'],
          rows: [
            ['NEET-UG 2026 AYUSH Counseling Document Verification Rounds', '20 October 2026', 'Admissions', 'Prospective Scholars', 'Active Now'],
            ['National Charaka Jayanti Seminar on Ayurvedic Ecology', '05 November 2026', 'Conference', 'All Students & Faculty', 'Registration Open'],
            ['Term-End University Theory & Practical Examination Schedule', '15 October 2026', 'Examination', 'BAMS Scholars', 'Gazette Published'],
            ['Anti-Ragging Squad Surprise Inspection Circular', '01 September 2026', 'Statutory Compliance', 'Hostels & Campus', 'Mandatory Notice']
          ]
        }
      }
    ],
    documents: [
      {
        id: 'doc-12-01',
        title: 'Admissions 2026–27 Counseling Guidelines & Institutional Rules Gazette',
        documentCode: 'SHAMC-NOT-ADM-2026-08',
        academicYear: '2026-27',
        fileUrl: '/documents/ncism/anti-ragging-statutory-committee-2026.pdf',
        fileType: 'PDF',
        fileSize: '1.5 MB',
        uploadDate: '20 October 2026',
        lastUpdated: '20 October 2026',
        isVerified: true,
        pagesCount: 6
      }
    ]
  },
  {
    categoryNumber: 13,
    code: 'RECOGNITION_STATUS',
    title: 'Recognition Status of All Courses',
    description: 'Comprehensive regulatory recognition directory of undergraduate and postgraduate programmes under NCISM Act 2020.',
    iconName: 'ShieldCheck',
    regulatoryReference: 'NCISM Act 2020 Section 28 & Schedule of Recognized Qualifications',
    lastUpdated: '15 October 2026',
    records: [
      {
        id: 'rec-13-01',
        title: 'Statutory Course Recognition & Degree Eligibility Directory',
        referenceCode: 'SHAMC/STAT/REC-STATUS/2026',
        academicYear: '2026-27',
        status: 'VERIFIED',
        summary: 'All courses offered lead to qualifications recognized under the National Commission for Indian System of Medicine Act, 2020.',
        details: {
          'Degree Awarded': 'Bachelor of Ayurvedic Medicine & Surgery (Ayurvedacharya / B.A.M.S.)',
          'Awarding Body': 'Dr. Sarvepalli Radhakrishnan Rajasthan Ayurved University, Jodhpur',
          'Statutory Apex Regulator': 'National Commission for Indian System of Medicine (NCISM), New Delhi',
          'Schedule Entry': 'Included in the First Schedule to the NCISM Act, 2020 as a Recognized Medical Qualification',
          'Medical Practice Eligibility': 'Eligible for Permanent Registration on State Medical Councils & National Register of Indian System of Medicine',
          'Current Permitted Status': 'Unconditional Permission for 100 Seats for Academic Session 2026–27'
        }
      }
    ],
    documents: [
      {
        id: 'doc-13-01',
        title: 'NCISM Act 2020 Statutory Recognition Gazette Notification',
        documentCode: 'NCISM-REC-GAZETTE-2026',
        academicYear: '2026-27',
        fileUrl: '/documents/ncism/ncism-permission-letter-2026-27.pdf',
        fileType: 'PDF',
        fileSize: '2.8 MB',
        uploadDate: '10 August 2026',
        lastUpdated: '10 August 2026',
        isVerified: true,
        pagesCount: 8
      }
    ]
  },
  {
    categoryNumber: 14,
    code: 'OFFICIAL_LINKS',
    title: 'NCISM & AYUSH Official Links',
    description: 'Authenticated external links to the National Commission, Ministry of AYUSH, affiliating university, and apex regulatory portals.',
    iconName: 'ExternalLink',
    regulatoryReference: 'Statutory Public Verification Portal Directives',
    lastUpdated: '15 October 2026',
    records: [
      {
        id: 'rec-14-01',
        title: 'Verified Apex Regulatory Government Portals',
        referenceCode: 'SHAMC/EXT/REG-PORTALS/2026',
        academicYear: '2026-27',
        status: 'VERIFIED',
        summary: 'Direct verified links to check institutional approvals and statutory notifications.',
        tableData: {
          columns: ['Regulatory Body', 'Official Description', 'Website URL', 'Public Verification Purpose'],
          rows: [
            ['National Commission for Indian System of Medicine (NCISM)', 'Apex Statutory Regulator for Ayurvedic Medical Colleges', 'https://ncismindia.org', 'Verify College Permission Status & LoP'],
            ['Ministry of AYUSH, Government of India', 'Union Ministry governing Ayurveda, Yoga, Unani, Siddha, Homoeopathy', 'https://ayush.gov.in', 'National AYUSH Policies & Notifications'],
            ['Dr. S.R. Rajasthan Ayurved University, Jodhpur', 'State Affiliating University for Ayurveda in Rajasthan', 'https://education.rajasthan.gov.in/dsrrau', 'Syllabus, Exam Schedules & Affiliation Orders'],
            ['AACCC AYUSH Admissions Central Counseling Committee', 'All-India AYUSH UG/PG Counseling Portal', 'https://aaccc.gov.in', 'All-India Seat Matrix & Counseling Merit'],
            ['National Institute of Ayurveda (NIA Jaipur)', 'Deemed-to-be-University & Apex National Center of Excellence', 'https://nia.nic.in', 'Clinical Standards & Academic Resource']
          ]
        }
      }
    ],
    documents: [
      {
        id: 'doc-14-01',
        title: 'Official Gazette Notification on NCISM Regulations and Institutional Portals',
        documentCode: 'NCISM-GAZETTE-REF-2026',
        academicYear: '2026-27',
        fileUrl: '/documents/ncism/university-affiliation-dsrrau-2026.pdf',
        fileType: 'PDF',
        fileSize: '1.9 MB',
        uploadDate: '01 July 2026',
        lastUpdated: '01 July 2026',
        isVerified: true,
        pagesCount: 5
      }
    ]
  },
  {
    categoryNumber: 15,
    code: 'ATTENDANCE_ANALYSIS',
    title: 'Month-wise Attendance Analysis',
    description: 'Biometric and clinical ward attendance logs for teaching faculty, hospital medical officers, paramedical cadre, and enrolled students.',
    iconName: 'Clock',
    regulatoryReference: 'NCISM Biometric & 75% Theory / 80% Practical Minimum Attendance Norms',
    lastUpdated: '20 October 2026',
    records: [
      {
        id: 'rec-15-01',
        title: 'Monthly Institutional Attendance Compliance Summary',
        referenceCode: 'SHAMC/HR/ATTEND-REP/2026',
        academicYear: '2026-27',
        status: 'VERIFIED',
        summary: 'Biometric attendance data registered via Aadhaar-enabled biometric systems (AEBAS) in compliance with NCISM instructions.',
        tableData: {
          columns: ['Cadre Group', 'Total Registered', 'Average Monthly Attendance (%)', 'Biometric Compliance', 'Regulatory Benchmark'],
          rows: [
            ['Full-Time Teaching Faculty', '48 Professors / Readers / Lecturers', '94.8%', 'AEBAS Verified Daily', 'Min 80% Mandatory'],
            ['Hospital Clinical & Nursing Staff', '64 Paramedics & Staff Nurses', '93.5%', 'Shift-wise Biometric Logs', 'Hospital MSR Compliant'],
            ['Non-Teaching Laboratory Staff', '28 Technicians & Curators', '95.2%', 'Card Punch / Fingerprint', 'Standard Institutional'],
            ['Undergraduate BAMS Scholars', 'All Enrolled Batches', '88.6%', 'Lecture & Ward Registers', 'Min 75% Theory, 80% Clinical']
          ]
        }
      }
    ],
    documents: [
      {
        id: 'doc-15-01',
        title: 'Certified Month-Wise Faculty & Student Attendance Register (Quarterly Summary)',
        documentCode: 'SHAMC-ATTEND-LOG-2026-Q3',
        academicYear: '2026-27',
        fileUrl: '/documents/ncism/faculty-student-attendance-summary-2026.pdf',
        fileType: 'PDF',
        fileSize: '2.7 MB',
        uploadDate: '01 October 2026',
        lastUpdated: '20 October 2026',
        isVerified: true,
        pagesCount: 10
      }
    ]
  },
  {
    categoryNumber: 16,
    code: 'TRANSITIONAL_CURRICULUM',
    title: 'Transitional Curriculum',
    description: '15-Day Induction and Transitional Curriculum conducted for newly admitted BAMS scholars as mandated by NCISM Curriculum Guidelines.',
    iconName: 'BookMarked',
    regulatoryReference: 'NCISM Undergraduate Medical Curriculum (UGMEB) Regulations 2022',
    lastUpdated: '12 October 2026',
    records: [
      {
        id: 'rec-16-01',
        title: 'BAMS 15-Day Transitional Induction Programme Overview',
        referenceCode: 'SHAMC/ACAD/TRANS-CURR/2026',
        academicYear: '2026-27',
        status: 'VERIFIED',
        summary: 'Structured transitional modules orienting incoming scholars to Ayurvedic philosophy, Sanskrit language foundations, and modern clinical integration.',
        tableData: {
          columns: ['Day Range', 'Curriculum Focus Area', 'Topics Covered', 'Faculty / Resource Persons', 'Assessment'],
          rows: [
            ['Day 01–03', 'Institutional Orientation & Vedic Heritage', 'Shishyopanayaniya Samskara, Institutional Ethics, Code of Conduct', 'Principal & Governing Council', 'Reflection Essay'],
            ['Day 04–06', 'Sanskrit Language & Shloka Recitation', 'Basic Sanskrit Grammar, Pronunciation of Classical Samhita Text', 'Dept. of Samhita & Siddhanta', 'Recitation Test'],
            ['Day 07–09', 'Principles of Ayurveda & Padartha Vijnana', 'Tridosha, Panchamahabhuta, Saptadhatu, Dinacharya, Ritucharya', 'Professors of Basic Principles', 'MCQ Evaluation'],
            ['Day 10–12', 'Campus, Hospital & Herbarium Exposure', 'Visit to 100-Bed Hospital, Charak Vatika, Pharmacy, & Anatomy Lab', 'HODs & Lab Directors', 'Field Logbook'],
            ['Day 13–15', 'Soft Skills, Bioethics & Computer Training', 'Doctor-Patient Communication, Basic Life Support (BLS), Anti-Ragging', 'Guest Experts & EMO Team', 'Completion Certificate']
          ]
        }
      }
    ],
    documents: [
      {
        id: 'doc-16-01',
        title: 'BAMS 15-Day Transitional Curriculum Implementation Dossier with Schedule & Reports',
        documentCode: 'NCISM-TRANS-CURR-BAMS-2026',
        academicYear: '2026-27',
        fileUrl: '/documents/ncism/transitional-curriculum-ug-bams-2026.pdf',
        fileType: 'PDF',
        fileSize: '3.6 MB',
        uploadDate: '15 September 2026',
        lastUpdated: '12 October 2026',
        isVerified: true,
        pagesCount: 18
      }
    ]
  }
];

export function getDisclosureCategory(catNumOrCode: number | string): DisclosureCategoryData | undefined {
  if (typeof catNumOrCode === 'number') {
    return NCISM_DISCLOSURES.find(c => c.categoryNumber === catNumOrCode);
  }
  return NCISM_DISCLOSURES.find(c => c.code.toLowerCase() === catNumOrCode.toLowerCase() || c.categoryNumber.toString() === catNumOrCode);
}
