import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'public', 'documents', 'misc');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function createMinimalPdf(title, subtitle, refCode, date, contentLines) {
  const streamLines = [
    'BT',
    '/F1 20 Tf',
    '50 780 Td',
    '(SHRI HARIDUTT AYURVEDIC MEDICAL COLLEGE & HOSPITAL) Tj',
    'ET',
    'BT',
    '/F1 11 Tf',
    '50 760 Td',
    '(Recognised by NCISM, Ministry of AYUSH, Govt of India | Affiliated to Dr. S.R. Rajasthan Ayurved University) Tj',
    'ET',
    '0.5 w',
    '50 748 m 550 748 l S',
    'BT',
    '/F1 14 Tf',
    '50 720 Td',
    `(${title.toUpperCase()}) Tj`,
    'ET',
    'BT',
    '/F1 10 Tf',
    '50 700 Td',
    `(${subtitle}) Tj`,
    'ET',
    'BT',
    '/F1 9 Tf',
    '50 685 Td',
    `(Ref ID: ${refCode} | Verification Date: ${date} | Status: STATUTORY VERIFIED) Tj`,
    'ET',
    '0.25 w',
    '50 675 m 550 675 l S'
  ];

  let y = 650;
  for (const line of contentLines) {
    if (y < 80) break;
    const safeLine = line.replace(/[\\()]/g, '');
    streamLines.push(
      'BT',
      '/F1 10 Tf',
      `50 ${y} Td`,
      `(${safeLine}) Tj`,
      'ET'
    );
    y -= 18;
  }

  streamLines.push(
    '0.5 w',
    '50 60 m 550 60 l S',
    'BT',
    '/F1 8 Tf',
    '50 48 Td',
    '(Shri Haridutt Ayurvedic Medical College & Hospital | NH-11B Campus, Karauli District, Rajasthan) Tj',
    'ET',
    'BT',
    '/F1 8 Tf',
    '50 36 Td',
    '(Official Institutional Statutory Clearance Document & Public Record) Tj',
    'ET'
  );

  const streamContent = streamLines.join('\n');
  const streamLength = Buffer.byteLength(streamContent);

  const objects = [
    `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj`,
    `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj`,
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj`,
    `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj`,
    `5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj`
  ];

  const xref = ['xref', '0 6', '0000000000 65535 f '];
  let body = '%PDF-1.4\n';

  for (const obj of objects) {
    const objOffset = Buffer.byteLength(body);
    xref.push(String(objOffset).padStart(10, '0') + ' 00000 n ');
    body += obj + '\n';
  }

  const startXref = Buffer.byteLength(body);
  const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF`;
  const fullPdf = body + xref.join('\n') + '\n' + trailer;

  return Buffer.from(fullPdf, 'utf-8');
}

const docs = [
  {
    name: 'rti-statutory-declaration-2026.pdf',
    title: 'Right to Information (RTI) Act 2005 Statutory Declaration',
    subtitle: 'Institutional Public Information Office & Appellate Registry',
    ref: 'SHAMC/RTI/SEC4/2026',
    date: '01 June 2026',
    lines: [
      'Proactive Disclosure under Section 4(1)(b) of Right to Information Act, 2005',
      'Public Information Officer (PIO): Dr. Alok Nath Upadhyay, Associate Professor',
      'First Appellate Authority (FAA): Prof. (Dr.) Devendra Nath Tripathi, Principal',
      'RTI Application Fee: INR 10 via Indian Postal Order (IPO) or Demand Draft',
      'Address: Office of the PIO, Administrative Block, SHAMC Campus, Karauli, Rajasthan',
      'Response Turnaround: Maximum 30 Calendar Days as mandated by Law'
    ]
  },
  {
    name: 'anti-ragging-statutory-affidavit-format.pdf',
    title: 'Anti-Ragging Undertaking & Statutory Affidavit Format',
    subtitle: 'Directives of the Hon Supreme Court of India & NCISM Regulations',
    ref: 'SHAMC/ARC/AFFIDAVIT/2026',
    date: '15 July 2026',
    lines: [
      'Mandatory Joint Affidavit Format for Admitted Scholars and Parents / Guardians',
      'Clause 3: Strict Zero Tolerance Prohibition of Ragging in Classrooms & Hostels',
      'Punitive Measures: Immediate Rustication, Police FIR under BNS, and Academic Debarment',
      'National Anti-Ragging Toll-Free Helpline: 1800-180-5522 (24 Hours)',
      'Institutional Anti-Ragging Squad Hotline: +91 98290 44120'
    ]
  },
  {
    name: 'icc-posh-policy-dossier.pdf',
    title: 'Internal Complaints Committee (ICC) & POSH Charter',
    subtitle: 'Prevention of Sexual Harassment of Women at Workplace Act 2013',
    ref: 'SHAMC/ICC/CHARTER/2026',
    date: '10 January 2026',
    lines: [
      'Statutory Formation of Internal Complaints Committee (ICC)',
      'Presiding Officer: Prof. (Dr.) Sharda Kumari, Professor of Prasuti & Stri Roga',
      'External NGO Member: Smt. Gayatri Devi, Legal Counselor & Social Activist',
      'Dedicated Safe Grievance Redressal Mechanism & Confidentiality Assurance',
      'Official Confidential Email: icc.cell@hariduttayurveda.edu.in'
    ]
  },
  {
    name: 'iec-ethics-committee-charter.pdf',
    title: 'Institutional Ethics Committee (IEC) for Clinical Research',
    subtitle: 'National Ethical Guidelines for Biomedical Research (ICMR & DHR)',
    ref: 'SHAMC/IEC/DHR-REG/2026',
    date: '20 March 2026',
    lines: [
      'Registered with Department of Health Research (DHR), Ministry of Health & Family Welfare',
      'Chairperson: Dr. H. P. Gautam, Senior Clinician & Independent Medical Ethicist',
      'Member Secretary: Dr. Sandeep Rajpurohit, Associate Professor of Rasa Shastra',
      'Mandatory Ethical Clearance for all Clinical Drug Trials, Thesis, and Dissertations',
      'Meeting Schedule: Bi-monthly Review of Research Proposals'
    ]
  },
  {
    name: 'biomedical-waste-authorization.pdf',
    title: 'Bio-Medical Waste Management (BMW) Authorization',
    subtitle: 'Rajasthan State Pollution Control Board Clearance Certificate',
    ref: 'RSPCB/BMW/AUTH/2026/891',
    date: '05 April 2026',
    lines: [
      'Authorization under Bio-Medical Waste Management Rules, 2016',
      'Facility: 100-Bed Attached Teaching Hospital & Panchakarma Department',
      'Common Bio-Medical Waste Treatment Facility (CBWTF) MoA Active',
      'Color-Coded Segregation, Barcoded Tracking & Safe Disposal Verified',
      'Valid Through: 31 March 2028'
    ]
  },
  {
    name: 'fire-safety-noc-certificate.pdf',
    title: 'Institutional Fire Safety Clearance Certificate & NOC',
    subtitle: 'Municipal Corporation Fire Services Directorate',
    ref: 'FIRE/NOC/INST/2026/412',
    date: '12 February 2026',
    lines: [
      'Fire Prevention & Life Safety Measures Certificate',
      'Covers: Main College Block, Teaching Hospital, Laboratories & Residential Hostels',
      'Installed: Yard Hydrants, Wet Risers, Automatic Smoke Detectors & Extinguishers',
      'Annual Fire Drill and Emergency Evacuation Training Conducted Successfully'
    ]
  },
  {
    name: 'student-code-of-conduct-handbook.pdf',
    title: 'Institutional Code of Medical Conduct & Scholar Handbook',
    subtitle: 'Vedic Medical Heritage & Academic Disciplinary Directives',
    ref: 'SHAMC/STUDENT/HANDBOOK/2026',
    date: '01 August 2026',
    lines: [
      'Code of Conduct for BAMS Scholars and Interns',
      'Section 1: Traditional Vaidya Oath (Charaka Samhita Shishyopanayaniya Adhyaya)',
      'Section 2: Attendance Mandate (Min 75% Theory & 80% Practical / Ward Rotations)',
      'Section 3: Clinical Dress Code, White Apron & Stethoscope Protocols',
      'Section 4: Library, Laboratory & Herbal Garden Usage Discipline'
    ]
  },
  {
    name: 'hostel-admission-rules-undertaking.pdf',
    title: 'Residential Hostel Rules, Regulations & Admission Undertaking',
    subtitle: 'Separate Air-Cooled Hostels for Boys and Girls on Campus',
    ref: 'SHAMC/HOSTEL/REG/2026',
    date: '10 August 2026',
    lines: [
      'Hostel Allotment Guidelines for Academic Session 2026-27',
      'Warden Contacts: Boys Hostel (+91 94140 33816), Girls Hostel (+91 94140 33817)',
      'Pure Vegetarian Ayurvedic Mess Timings & Hygienic Food Standards',
      'Campus Gate Curfew: 8:00 PM (Strict Biometric Attendance Protocol)',
      'Parent Visitor Policies & Night Pass Rules'
    ]
  }
];

let count = 0;
for (const doc of docs) {
  const filePath = path.join(outDir, doc.name);
  const pdfBytes = createMinimalPdf(doc.title, doc.subtitle, doc.ref, doc.date, doc.lines);
  fs.writeFileSync(filePath, pdfBytes);
  count++;
}

console.log(`Generated ${count} valid Miscellaneous statutory PDF documents in ${outDir}`);
