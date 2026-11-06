import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Shri Haridutt Ayurvedic Medical College Database...');

  // 1. Create Admins & Faculty Users
  const passwordHash = await bcrypt.hash('Admin@123', 10);
  const facultyPasswordHash = await bcrypt.hash('Faculty@123', 10);
  const studentPasswordHash = await bcrypt.hash('Student@123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@hariduttayurveda.edu.in' },
    update: {},
    create: {
      name: 'Super Administrator',
      email: 'admin@hariduttayurveda.edu.in',
      password: passwordHash,
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'principal@hariduttayurveda.edu.in' },
    update: {},
    create: {
      name: 'Prof. (Dr.) Devendra Nath Tripathi',
      email: 'principal@hariduttayurveda.edu.in',
      password: passwordHash,
      role: 'PRINCIPAL',
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'admissions@hariduttayurveda.edu.in' },
    update: {},
    create: {
      name: 'Admission Committee Officer',
      email: 'admissions@hariduttayurveda.edu.in',
      password: passwordHash,
      role: 'ADMISSION_ADMIN',
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'faculty@hariduttayurveda.edu.in' },
    update: {},
    create: {
      name: 'Dr. Vaidya Kripashankar Vyas',
      email: 'faculty@hariduttayurveda.edu.in',
      password: facultyPasswordHash,
      role: 'FACULTY',
      isActive: true,
    },
  });

  // 2. Create Sample Student
  await prisma.student.upsert({
    where: { studentId: 'SHAMC-2025-014' },
    update: {},
    create: {
      studentId: 'SHAMC-2025-014',
      name: 'Pooja Verma',
      email: 'pooja.verma@student.hariduttayurveda.edu.in',
      password: studentPasswordHash,
      mobile: '+91 98290 88210',
      dob: '2004-05-18',
      gender: 'Female',
      bloodGroup: 'O+',
      courseCode: 'BAMS',
      batch: '2025-2030 (Phase II)',
      address: 'Room 204, Saraswati Girls Ayurvedic Hostel, Campus',
      attendancePercentage: 89.2,
      feesPaid: true,
    },
  });

  // 3. Seed Courses
  const courses = [
    {
      code: 'BAMS',
      title: 'Bachelor of Ayurvedic Medicine and Surgery (BAMS)',
      degree: 'Undergraduate (Ayurvedacharya)',
      duration: '5.5 Years (4.5 Years Academic + 1 Year Rotatory Internship)',
      intake: 100,
      eligibility: 'Passed 10+2 with Physics, Chemistry, Biology & English (min 50% marks) and qualified in NEET-UG 2026.',
      description: 'Flagship professional program combining classical Ayurvedic Samhitas with modern diagnostics, clinical rotations, pathology, and surgical techniques.',
      syllabusOverview: 'Padartha Vijnana, Sharir Rachana, Sharir Kriya, Dravyaguna, Rasa Shastra, Roga Nidan, Agad Tantra, Swasthavritta, Prasuti Tantra, Kaumarbhritya, Kayachikitsa, Shalya, Shalakya, Panchakarma.',
      careerOpportunities: 'Ayurvedic Medical Officer (AMO), Clinical Vaidya, Panchakarma Specialist, Research Scientist (CCRAS), AYUSH Hospital Administrator.',
      feePerYear: '₹2,25,000 / Year',
      isApproved: true,
      approvalBody: 'National Commission for Indian System of Medicine (NCISM), New Delhi',
    },
    {
      code: 'MD-KAYACHIKITSA',
      title: 'M.D. (Ayurveda) in Kayachikitsa (Internal Medicine)',
      degree: 'Postgraduate (Ayurveda Vachaspati)',
      duration: '3 Years Full-Time Clinical Residency',
      intake: 12,
      eligibility: 'Recognized BAMS degree from NCISM/CCIM approved institute and qualified in AIAPGET.',
      description: 'Advanced postgraduate specialization in systemic disease diagnosis, metabolic syndromes, autoimmune disorders, and clinical evidence-based pharmacology.',
      syllabusOverview: 'Advanced Kayachikitsa, Research Methodology & Bio-statistics, Clinical Dissertation, Emergency Ayurvedic Protocols, Inpatient Ward Management.',
      careerOpportunities: 'Senior Consultant Physician, Associate Professor / HOD in Ayurvedic Colleges, Principal Investigator, Super-specialty Clinician.',
      feePerYear: '₹3,50,000 / Year',
      isApproved: true,
      approvalBody: 'NCISM & Ministry of AYUSH, Govt. of India',
    },
    {
      code: 'CERT-PANCHAKARMA',
      title: 'Certificate Course in Panchakarma & Ayurvedic Nursing',
      degree: 'Continuing Medical Education & Paramedical Certificate',
      duration: '1 Year (Hands-on Clinical Training)',
      intake: 30,
      eligibility: 'Passed 10+2 in any discipline (Science stream preferred) or GNM / Nursing diploma.',
      description: 'Hands-on practical training in classical detox procedures: Vamana, Virechana, Basti, Nasya, Raktamokshana, Shirodhara, and therapeutic dietetics.',
      syllabusOverview: 'Principles of Panchakarma, Purvakarma, Pradhanakarma, Paschatkarma protocols, Shirodhara and herbal oil therapy theatre administration.',
      careerOpportunities: 'Certified Panchakarma Therapist, Ayurveda Spa & Wellness Consultant, Clinical Nursing Assistant in Ayurvedic Hospitals.',
      feePerYear: '₹65,000 / Year',
      isApproved: true,
      approvalBody: 'Institutional Academic Council & State Paramedical Board',
    },
  ];

  for (const c of courses) {
    await prisma.course.upsert({
      where: { code: c.code },
      update: c,
      create: c,
    });
  }

  // 4. Seed Departments
  const departments = [
    {
      code: 'SAMHITA',
      name: 'Samhita & Sanskrit Siddhanta',
      sanskritName: 'संहिता एवं सिद्धान्त विभाग',
      description: 'Deals with classical treatises of Charaka, Sushruta and Vagbhata with Sanskrit grammatical analysis.',
      headOfDepartment: 'Prof. (Dr.) Acharya Vachaspati Shastri',
      facultyCount: 5,
      labs: 'Classical Manuscript Reading Hall & Philosophical Seminar Room',
      image: '/images/ayurveda/manuscripts/ancient-ayurveda-manuscript.webp',
    },
    {
      code: 'RACHANA',
      name: 'Sharir Rachana (Human Anatomy)',
      sanskritName: 'शारीर रचना विभाग',
      description: 'Integrates Marma Sharir and classical Ayurvedic structures with modern cadaveric dissection.',
      headOfDepartment: 'Dr. Arvind Kumar Sharma',
      facultyCount: 4,
      labs: 'Dissection Hall & Anatomical Museum with 120+ specimens',
      image: '/images/ayurveda/research/botanical-herbarium-specimen.webp',
    },
    {
      code: 'KRIYA',
      name: 'Sharir Kriya (Human Physiology)',
      sanskritName: 'शारीर क्रिया विभाग',
      description: 'Study of Tridosha, Dhatus, Malas, Agni, Ojas, and modern haematological/physiological testing.',
      headOfDepartment: 'Dr. Meenakshi Pathak',
      facultyCount: 4,
      labs: 'Physiology & Clinical Hematology Laboratory',
      image: '/images/ayurveda/research/phytochemical-extract-analysis.webp',
    },
    {
      code: 'DRAVYAGUNA',
      name: 'Dravyaguna Vijnana (Materia Medica)',
      sanskritName: 'द्रव्यगुण विज्ञान विभाग',
      description: 'Identification, pharmacodynamics, action mechanisms and conservation of medicinal plants.',
      headOfDepartment: 'Prof. (Dr.) Ramakant Dwivedi',
      facultyCount: 5,
      labs: 'Pharmacognosy Lab & 5-Acre Charak Vatika Herbal Garden',
      image: '/images/ayurveda/medicine-preparation/dried-roots-wooden-bowls.webp',
    },
    {
      code: 'RASA-SHASTRA',
      name: 'Rasa Shastra & Bhaishajya Kalpana',
      sanskritName: 'रसशास्त्र एवं भैषज्य कल्पना विभाग',
      description: 'Alchemy, mineral purification, calcination and pharmaceutical drug formulation.',
      headOfDepartment: 'Dr. Shrikant Upadhyay',
      facultyCount: 4,
      labs: 'GMP-Compliant Pilot Ayurvedic Medicine Pharmacy',
      image: '/images/ayurveda/medicine-preparation/stone-mortar-pestle-leaves.webp',
    },
    {
      code: 'KAYACHIKITSA',
      name: 'Kayachikitsa (Internal Medicine)',
      sanskritName: 'कायचिकित्सा विभाग',
      description: 'Systemic internal disorders, metabolic management, Rasayana therapy and clinical inpatient care.',
      headOfDepartment: 'Prof. (Dr.) Devendra Nath Tripathi',
      facultyCount: 6,
      labs: '100-Bed IPD, Kayachikitsa Specialty OPD Chambers',
      image: '/images/ayurveda/courses/md-kayachikitsa-internal-medicine.webp',
    },
    {
      code: 'PANCHAKARMA',
      name: 'Panchakarma (Biopurification)',
      sanskritName: 'पञ्चकर्म विभाग',
      description: 'Five-fold systemic cleansing therapies (Vamana, Virechana, Basti, Nasya, Raktamokshana).',
      headOfDepartment: 'Dr. Vaidya Kripashankar Vyas',
      facultyCount: 5,
      labs: 'Dedicated Male & Female Panchakarma Theatres & Shirodhara Suites',
      image: '/images/ayurveda/courses/panchakarma-therapy-nursing.webp',
    },
  ];

  for (const d of departments) {
    await prisma.department.upsert({
      where: { code: d.code },
      update: d,
      create: d,
    });
  }

  // 5. Seed Faculty
  const faculties = [
    {
      facultyId: 'SHAMC-FAC-001',
      name: 'Prof. (Dr.) Devendra Nath Tripathi',
      designation: 'Principal & Professor of Kayachikitsa',
      qualification: 'BAMS, MD (Ayurveda - Kayachikitsa), Ph.D., FICA',
      experienceYears: 24,
      specialization: 'Metabolic Disorders, Autoimmune Arthritis & Clinical Research',
      email: 'principal@hariduttayurveda.edu.in',
      phone: '+91 94140 33811',
      bio: 'Over 24 years of scholarly leadership in Ayurvedic higher education. Author of 4 books and 42 peer-reviewed scientific papers.',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=800',
      isHOD: true,
      isLeadership: true,
      order: 1,
    },
    {
      facultyId: 'SHAMC-FAC-002',
      name: 'Prof. (Dr.) Acharya Vachaspati Shastri',
      designation: 'Vice-Principal & Head, Samhita & Siddhanta',
      qualification: 'Acharya, BAMS, MD (Ayur - Samhita), D.Litt',
      experienceYears: 22,
      specialization: 'Charaka Samhita Critical Text Commentary & Vedic Epistemology',
      email: 'vachaspati@hariduttayurveda.edu.in',
      bio: 'Eminent Sanskrit scholar who has deciphered classical manuscripts and led Vedic research projects.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
      isHOD: true,
      isLeadership: true,
      order: 2,
    },
    {
      facultyId: 'SHAMC-FAC-003',
      name: 'Dr. Vaidya Kripashankar Vyas',
      designation: 'Medical Superintendent & HOD Panchakarma',
      qualification: 'BAMS, MD (Ayurveda - Panchakarma)',
      experienceYears: 19,
      specialization: 'Authentic Kerala Panchakarma, Neurological Rehabilitation',
      email: 'kripashankar@hariduttayurveda.edu.in',
      bio: 'Leads the 100-bed hospital clinical services with specialized mastery over classical bio-purification therapies.',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
      isHOD: true,
      isLeadership: true,
      order: 3,
    },
    {
      facultyId: 'SHAMC-FAC-004',
      name: 'Prof. (Dr.) Ramakant Dwivedi',
      designation: 'Professor & HOD, Dravyaguna Vijnana',
      qualification: 'BAMS, MD (Ayurveda - Dravyaguna), Ph.D.',
      experienceYears: 20,
      specialization: 'Medicinal Flora of Aravalli & Western Ghats, Pharmacognosy',
      email: 'ramakant@hariduttayurveda.edu.in',
      bio: 'Oversees 5-acre Charak Vatika herbal garden housing 350+ identified medicinal species.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800',
      isHOD: true,
      isLeadership: false,
      order: 4,
    },
  ];

  for (const f of faculties) {
    await prisma.faculty.upsert({
      where: { facultyId: f.facultyId },
      update: f,
      create: f,
    });
  }

  // 6. Seed Herbal Plants
  const herbs = [
    {
      botanicalName: 'Withania somnifera',
      sanskritName: 'अश्वगन्धा (Ashwagandha)',
      commonName: 'Indian Ginseng',
      family: 'Solanaceae',
      rasa: 'Tikta, Kashaya, Madhura',
      guna: 'Laghu, Snigdha',
      virya: 'Ushna (Hot potency)',
      vipaka: 'Madhura',
      therapeuticUses: 'Premier Rasayana herb promoting longevity, vitality, stress resilience, and Vata-Kapha balance.',
      habitat: 'Cultivated in dry sub-tropical plains of Rajasthan',
      imageUrl: '/images/ayurveda/herbs/ashwagandha-botanical.webp',
      category: 'Rasayana & Medhya',
    },
    {
      botanicalName: 'Tinospora cordifolia',
      sanskritName: 'गुडूची / अमृता (Guduchi)',
      commonName: 'Giloy / Moonseed',
      family: 'Menispermaceae',
      rasa: 'Tikta, Kashaya',
      guna: 'Laghu, Snigdha',
      virya: 'Ushna (Hot potency)',
      vipaka: 'Madhura',
      therapeuticUses: 'Potent immunomodulator, antipyretic (Jwarahara), and metabolic detoxifier.',
      habitat: 'Native climbing shrub in Charak Vatika medicinal garden',
      imageUrl: '/images/ayurveda/herbs/giloy-medicinal-vine.webp',
      category: 'Jwarahara & Rasayana',
    },
    {
      botanicalName: 'Bacopa monnieri',
      sanskritName: 'ब्राह्मी (Brahmi)',
      commonName: 'Water Hyssop',
      family: 'Plantaginaceae',
      rasa: 'Tikta, Kashaya, Madhura',
      guna: 'Laghu, Sara',
      virya: 'Sheeta (Cold potency)',
      vipaka: 'Madhura',
      therapeuticUses: 'Renowned Medhya Rasayana supporting neuroplasticity, memory retention, and calming nerves.',
      habitat: 'Aquatic nursery beds at Shri Haridutt herbal park',
      imageUrl: '/images/ayurveda/herbs/brahmi-botanical-foliage.webp',
      category: 'Medhya (Brain Tonic)',
    },
  ];

  for (const h of herbs) {
    await prisma.herbalPlant.upsert({
      where: { botanicalName: h.botanicalName },
      update: h,
      create: h,
    });
  }

  // 7. Seed Notices
  const notices = [
    {
      title: 'NEET-UG 2026 AYUSH State Counseling: BAMS Admissions Round 1 Seat Allotment Guidelines',
      category: 'Admissions',
      date: '2026-10-28',
      fileUrl: '/downloads/Admissions_Round1_2026.pdf',
      isPinned: true,
      isPublished: true,
    },
    {
      title: 'NCISM Annual Institutional Compliance Inspection & Academic Calendar Approval for 2026-27',
      category: 'NCISM',
      date: '2026-10-15',
      fileUrl: '/downloads/NCISM_Approval_2026_27.pdf',
      isPinned: true,
      isPublished: true,
    },
    {
      title: 'Dhanwantari Jayanti & National Ayurveda Day Free Mega Health & Panchakarma Camp',
      category: 'Hospital',
      date: '2026-10-02',
      isPinned: false,
      isPublished: true,
    },
  ];

  for (const n of notices) {
    const existing = await prisma.notice.findFirst({ where: { title: n.title } });
    if (!existing) {
      await prisma.notice.create({ data: n });
    }
  }

  // 8. Seed News & Events
  await prisma.newsEvent.upsert({
    where: { slug: 'international-ayurveda-symposium-2026' },
    update: {},
    create: {
      title: 'International Ayurveda Symposium 2026 Held at Shri Haridutt Campus',
      slug: 'international-ayurveda-symposium-2026',
      date: 'October 20, 2026',
      category: 'Conference',
      summary: 'Over 600 Vaidyas, global researchers and policymakers gathered to deliberate on standardized clinical trials and evidence-based Ayurvedic formulations.',
      content: 'The three-day symposium inaugurated by the Hon’ble Minister of AYUSH featured plenary sessions on integration of modern diagnostics with Nadi Pariksha and climate resilience of indigenous medicinal plants.',
      imageUrl: '/images/ayurveda/ancient-heritage/carved-stone-pillars.webp',
      location: 'Sushruta Memorial Auditorium, Main Campus',
      isFeatured: true,
    },
  });

  // 9. Seed Sample Admission Application
  await prisma.admissionApplication.upsert({
    where: { applicationNumber: 'HC-AYUR-2026-0182' },
    update: {},
    create: {
      applicationNumber: 'HC-AYUR-2026-0182',
      fullName: 'Aarav Sharma',
      fatherName: 'Dr. Suresh Sharma',
      motherName: 'Sunita Sharma',
      dob: '2005-08-14',
      gender: 'Male',
      email: 'aarav.sharma@example.com',
      phone: '+91 98291 55432',
      category: 'GENERAL',
      neetRollNo: '2601149201',
      neetScore: 542,
      neetRank: 42180,
      previousSchool: 'Delhi Public School',
      qualification: '10+2 (PCB)',
      marksPercentage: 88.6,
      courseCode: 'BAMS',
      address: 'Plot 45, Civil Lines, Jaipur',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302006',
      status: 'UNDER_REVIEW',
      adminNotes: 'Documents verified. NEET score card verified on AACCC portal. Eligible for interview.',
    },
  });

  // 10. Seed Gallery Items
  const galleryItems = [
    {
      title: 'Traditional Rajasthani Arches & Main Academic Block',
      category: 'Campus',
      imageUrl: '/images/ayurveda/ancient-heritage/heritage-stone-architecture.webp',
      caption: 'Heritage sandstone architecture blending Vedic aesthetics with modern lecture halls.',
      order: 1,
      isPublished: true,
    },
    {
      title: 'Panchakarma Treatment Suites & Shirodhara Therapy',
      category: 'Hospital',
      imageUrl: '/images/ayurveda/panchakarma/traditional-panchakarma-suite.webp',
      caption: 'Classical authentic bio-purification facilities in our 100-bed hospital.',
      order: 2,
      isPublished: true,
    },
    {
      title: 'Charak Vatika 5-Acre Botanical Conservatory',
      category: 'Herbal Garden',
      imageUrl: '/images/ayurveda/botanical-gardens/herbal-garden-landscape.webp',
      caption: 'Over 350 classical medicinal plants cultivated under organic micro-climates.',
      order: 3,
      isPublished: true,
    },
    {
      title: 'National Ayurveda Day Celebrations & Vaidya Felicitations',
      category: 'Events',
      imageUrl: '/images/ayurveda/ancient-heritage/vedic-courtyard-colonnade.webp',
      caption: 'Annual institutional symposium attended by eminent Ayurvedic dignitaries.',
      order: 4,
      isPublished: true,
    },
  ];

  for (const item of galleryItems) {
    const existing = await prisma.galleryItem.findFirst({ where: { title: item.title } });
    if (!existing) {
      await prisma.galleryItem.create({ data: item });
    }
  }

  // 11. Seed Research Publications
  const publications = [
    {
      title: 'Clinical Efficacy of Classical Dashamoola Nirūha Basti in Amavata (Rheumatoid Arthritis)',
      authors: 'Tripathi D.N., Vyas K.S., Sharma M.',
      journal: 'International Journal of Ayurvedic Medicine & Research',
      year: 2025,
      volume: 'Vol. 14, Issue 2, pp. 88-96',
      doi: '10.4103/ijamr.2025.11402',
      abstract: 'A randomized controlled clinical study on 60 patients demonstrating marked reduction in ESR, DAS-28 scores, and morning stiffness following 16 days of classical Kala Basti regimen.',
      category: 'Clinical Trial',
    },
    {
      title: 'Pharmacognostical & HPTLC Fingerprinting of Withania somnifera Grown in Aravalli Eco-Zones',
      authors: 'Dwivedi R., Shastri V., Verma P.',
      journal: 'Journal of Pharmacognosy and Phytochemistry',
      year: 2024,
      volume: 'Vol. 12, Issue 4, pp. 210-218',
      doi: '10.22271/phyto.2024.v12.i4c.14812',
      abstract: 'Quantification of Withaferin-A content comparing organic specimens from Charak Vatika against commercial wild-harvested samples.',
      category: 'Pharmacognosy',
    },
  ];

  for (const pub of publications) {
    const existing = await prisma.researchPublication.findFirst({ where: { title: pub.title } });
    if (!existing) {
      await prisma.researchPublication.create({ data: pub });
    }
  }

  // 12. Seed RBAC Roles & Granular Permissions
  const roles = [
    { name: 'Super Administrator', slug: 'super-admin', description: 'Full access to all institutional systems and settings' },
    { name: 'Administrator', slug: 'admin', description: 'Institutional administration and operational control' },
    { name: 'Admission Officer', slug: 'admission-officer', description: 'Handles admissions, enquiries, and document verification' },
    { name: 'Principal', slug: 'principal', description: 'Academic directorate leadership and approval desk' },
    { name: 'Faculty Member', slug: 'faculty', description: 'Academic professor, HOD, and hospital consultant' },
    { name: 'Student Scholar', slug: 'student', description: 'Enrolled BAMS/MD Ayurvedic scholar' },
    { name: 'Content Editor', slug: 'content-editor', description: 'CMS editor for notices, news, and campus gallery' },
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { slug: r.slug },
      update: r,
      create: r,
    });
  }

  const permissions = [
    { slug: 'admin:users:read', description: 'View system users and audit logs', module: 'users' },
    { slug: 'admin:users:create', description: 'Create new administrator accounts', module: 'users' },
    { slug: 'admin:users:update', description: 'Modify user roles and permissions', module: 'users' },
    { slug: 'admin:users:delete', description: 'Deactivate user accounts', module: 'users' },
    { slug: 'admissions:read', description: 'View admission applications and dossiers', module: 'admissions' },
    { slug: 'admissions:update', description: 'Add notes and verify documents', module: 'admissions' },
    { slug: 'admissions:approve', description: 'Approve or reject candidates', module: 'admissions' },
    { slug: 'faculty:manage', description: 'Manage faculty roster and HODs', module: 'faculty' },
    { slug: 'courses:manage', description: 'Manage courses, seats and syllabi', module: 'academics' },
    { slug: 'notices:manage', description: 'Publish and archive circulars', module: 'cms' },
    { slug: 'gallery:manage', description: 'Upload and manage media gallery', module: 'cms' },
    { slug: 'settings:manage', description: 'Configure institution parameters', module: 'settings' },
  ];

  for (const p of permissions) {
    await prisma.permission.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  // 13. Seed Gallery Categories
  const galleryCats = [
    { name: 'Campus Architecture', slug: 'campus', description: 'Sandstone Vedic architectural vistas' },
    { name: 'Teaching Hospital', slug: 'hospital', description: '100-bed clinical wards & OPD' },
    { name: 'Charak Vatika', slug: 'herbal-garden', description: '350+ classical medicinal plant species' },
    { name: 'Academic Events', slug: 'events', description: 'Symposia, conferences and celebrations' },
    { name: 'Panchakarma Suites', slug: 'panchakarma', description: 'Authentic Kerala Shirodhara theatres' },
  ];

  for (const gc of galleryCats) {
    await prisma.galleryCategory.upsert({
      where: { slug: gc.slug },
      update: gc,
      create: gc,
    });
  }

  // 14. Seed Academic Calendar
  const calendarEvents = [
    {
      title: 'NEET-UG 2026 AYUSH State & All-India Counseling Round 1',
      startDate: '2026-10-15',
      endDate: '2026-11-20',
      term: 'Admissions 2026-27',
      type: 'ACADEMIC',
      description: 'Document verification and physical reporting for allotted BAMS scholars.',
    },
    {
      title: 'Dhanwantari Jayanti & National Ayurveda Day Celebrations',
      startDate: '2026-11-10',
      endDate: '2026-11-11',
      term: 'Annual Festival',
      type: 'CULTURAL',
      description: 'Free multi-specialty clinical health camp and Vaidya felicitation ceremony.',
    },
    {
      title: 'Annual Professional University Examinations (Theory & Practical)',
      startDate: '2026-12-05',
      endDate: '2026-12-22',
      term: 'Winter Term',
      type: 'EXAMINATION',
      description: 'NCISM-affiliated annual professional examinations for BAMS 1st, 2nd, 3rd, and Final prof.',
    },
  ];

  for (const ce of calendarEvents) {
    const existing = await prisma.academicCalendarEvent.findFirst({ where: { title: ce.title } });
    if (!existing) {
      await prisma.academicCalendarEvent.create({ data: ce });
    }
  }

  // 15. Seed Student Resources
  const resources = [
    {
      title: 'Charaka Samhita Sutrasthana Classical Compendium with Chakrapani Commentary',
      courseCode: 'BAMS',
      semester: 'Professional Year 1',
      subject: 'Samhita & Siddhanta',
      fileUrl: '/downloads/resources/Charaka_Sutrasthana_Compendium.pdf',
      resourceType: 'LECTURE_NOTES',
      isPublished: true,
    },
    {
      title: 'Charak Vatika Herbarium 350+ Botanical Species Identification Compendium',
      courseCode: 'BAMS',
      semester: 'Professional Year 2',
      subject: 'Dravyaguna Vijnana',
      fileUrl: '/downloads/resources/Dravyaguna_Flora_Manual.pdf',
      resourceType: 'MANUAL',
      isPublished: true,
    },
  ];

  for (const sr of resources) {
    const existing = await prisma.studentResource.findFirst({ where: { title: sr.title } });
    if (!existing) {
      await prisma.studentResource.create({ data: sr });
    }
  }

  // 16. Seed Website Pages & Global Settings
  const pages = [
    {
      slug: 'institution',
      title: 'About Shri Haridutt Ayurvedic Medical College & Hospital',
      content: 'Founded to revive and propagate authentic Vedic Ayurveda with modern medical rigor, Shri Haridutt Ayurvedic Medical College & Hospital stands as an acclaimed center of excellence in Northern India.',
      metaTitle: 'About Us | Shri Haridutt Ayurvedic Medical College',
      metaDesc: 'Explore our legacy, 100-bed hospital, 5-acre botanical garden, and NCISM approved B.A.M.S. education.',
      isPublished: true,
    },
    {
      slug: 'vision-mission',
      title: 'Institutional Vision, Mission & Core Values',
      content: 'To be globally recognized as a premier seat of Ayurvedic healthcare, innovative clinical research, and academic excellence rooted in Vedic philosophy.',
      metaTitle: 'Vision & Mission | Shri Haridutt Ayurvedic College',
      metaDesc: 'Our sacred commitment to preserving ancient healing wisdom while advancing evidence-based medical sciences.',
      isPublished: true,
    },
  ];

  for (const p of pages) {
    await prisma.websitePage.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  const settings = [
    { key: 'admissions_open', value: 'true', description: 'Flag whether admissions banner is active' },
    { key: 'announcement_banner_text', value: 'NEET-UG 2026 AYUSH State & All-India Counseling Registration Now Active.', description: 'Top announcement bar notice' },
    { key: 'admissions_helpline', value: '+91 98290 44120', description: 'Primary phone helpline for admissions' },
    { key: 'admissions_email', value: 'admissions@hariduttayurveda.edu.in', description: 'Primary admission committee inbox' },
    { key: 'hospital_emergency_phone', value: '+91 94140 33811', description: '24/7 Casualty & Hospital Helpline' },
  ];

  for (const s of settings) {
    await prisma.websiteSetting.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
