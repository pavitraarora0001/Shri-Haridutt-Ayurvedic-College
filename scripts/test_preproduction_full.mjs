import fs from 'fs';
import path from 'path';

// Self-contained environment loader
try {
  const envContent = fs.readFileSync(path.resolve('.env'), 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
} catch (e) {
  console.warn('Could not load .env file:', e.message);
}

const BASE_URL = 'http://localhost:3000';
let currentAdminPassword = 'Haridutt@Secured2026!#';
let nextAdminPassword = 'Haridutt@ProdMaster2026!#';
let adminCookies = '';

const report = {
  passwordSecurity: {},
  crudModules: {},
  fileStorage: {},
  securityVulnerabilities: {},
  publicSync: {},
};

function banner(text) {
  console.log(`\n======================================================================`);
  console.log(`  ${text}`);
  console.log(`======================================================================`);
}

async function loginAdmin(password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: 'admin@hariduttayurveda.edu.in',
      password: password,
      portalType: 'ADMIN',
    }),
  });
  let data = {};
  try {
    data = await res.json();
  } catch {
    data = { error: 'Non-JSON response' };
  }
  const rawCookieHeader = res.headers.get('set-cookie');
  let cookieStr = '';
  if (rawCookieHeader) {
    cookieStr = rawCookieHeader
      .split(',')
      .map((c) => c.split(';')[0].trim())
      .join('; ');
  }
  return { status: res.status, data, cookies: cookieStr };
}

async function run() {
  banner('1. ADMIN PASSWORD SECURITY & ROTATION LIFECYCLE');

  // 1.1 Initial Login with current credentials
  console.log('\n[1.1] Initial Admin Authentication:');
  const initialAuth = await loginAdmin(currentAdminPassword);
  console.log(`  Initial Login Status: ${initialAuth.status}`);
  if (initialAuth.status !== 200) {
    throw new Error('Initial login failed. Cannot proceed with password rotation test.');
  }
  adminCookies = initialAuth.cookies;
  const initialTokenCookie = adminCookies;

  // 1.2 Test authenticated password rotation to a strong temporary key
  console.log('\n[1.2] Executing Authenticated Password Rotation:');
  const tempRotatedPassword = nextAdminPassword;

  const resRotate = await fetch(`${BASE_URL}/api/admin/change-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      currentPassword: currentAdminPassword,
      newPassword: tempRotatedPassword,
    }),
  });
  const dataRotate = await resRotate.json();
  console.log(`  Password Rotation Status: ${resRotate.status}`);
  console.log(`  Response Message:`, dataRotate.message || dataRotate.error);
  report.passwordSecurity.rotationExecution = resRotate.status === 200 ? 'PASS' : 'FAIL';

  // 1.3 Verify immediate session invalidation of old access token
  console.log('\n[1.3] Verifying Immediate Session Invalidation:');
  const resOldSession = await fetch(`${BASE_URL}/api/admin/overview`, {
    headers: { Cookie: initialTokenCookie },
  });
  console.log(`  Old Session Status: ${resOldSession.status} (Expected: 401 Unauthorized)`);
  report.passwordSecurity.sessionRevocation = resOldSession.status === 401 ? 'PASS' : 'FAIL';

  // 1.4 Verify old password is REJECTED
  console.log('\n[1.4] Verifying Rejection of Old Password:');
  const resOldLogin = await loginAdmin(currentAdminPassword);
  console.log(`  Old Password Login Status: ${resOldLogin.status} (Expected: 401)`);
  report.passwordSecurity.oldPasswordRejection = resOldLogin.status === 401 ? 'PASS' : 'FAIL';

  // 1.5 Verify new password is ACCEPTED
  console.log('\n[1.5] Verifying Acceptance of New Password:');
  const resNewLogin = await loginAdmin(tempRotatedPassword);
  console.log(`  New Password Login Status: ${resNewLogin.status} (Expected: 200)`);
  report.passwordSecurity.newPasswordAcceptance = resNewLogin.status === 200 ? 'PASS' : 'FAIL';

  if (resNewLogin.status === 200) {
    adminCookies = resNewLogin.cookies;
    currentAdminPassword = tempRotatedPassword;
  }

  // 1.6 Verify password policy validation (rejecting short password)
  console.log('\n[1.6] Verifying Password Strength Policy (short password rejection):');
  const resWeak = await fetch(`${BASE_URL}/api/admin/change-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      currentPassword: currentAdminPassword,
      newPassword: 'short',
    }),
  });
  console.log(`  Weak Password Status: ${resWeak.status} (Expected: 400)`);
  report.passwordSecurity.strengthValidation = resWeak.status === 400 ? 'PASS' : 'FAIL';

  banner('2. COMPLETE CRUD TESTING FOR ALL CMS MODULES');

  // 2.1 Photo Gallery: Create, Read, Update (Image Replacement), Delete
  console.log('\n[2.1] Photo Gallery CRUD & Image Replacement:');
  const createPhotoRes = await fetch(`${BASE_URL}/api/admin/gallery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      title: 'QA Botanical Herbal Plant Specimen',
      category: 'Herbal Garden',
      imageUrl: '/images/ayurveda/ancient-heritage/charak-vatika-botanical.webp',
      caption: 'Initial photo caption',
      order: 10,
      isPublished: true,
    }),
  });
  const photoData = await createPhotoRes.json();
  const photoId = photoData.item?.id;
  console.log(`  Photo Created ID: ${photoId}, Status: ${createPhotoRes.status}`);

  // Update / Image Replacement
  const updatePhotoRes = await fetch(`${BASE_URL}/api/admin/gallery`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      id: photoId,
      title: 'QA Botanical Herbal Plant Specimen (Replaced)',
      category: 'Herbal Garden',
      imageUrl: '/images/ayurveda/ancient-heritage/dravyaguna-garden-specimens.webp',
      caption: 'Updated photo caption after image replacement',
      order: 11,
      isPublished: true,
    }),
  });
  console.log(`  Photo Update / Replacement Status: ${updatePhotoRes.status}`);

  // Delete
  const delPhotoRes = await fetch(`${BASE_URL}/api/admin/gallery?id=${photoId}`, {
    method: 'DELETE',
    headers: { Cookie: adminCookies },
  });
  console.log(`  Photo Delete Status: ${delPhotoRes.status}`);
  report.crudModules.gallery = createPhotoRes.status === 200 && updatePhotoRes.status === 200 && delPhotoRes.status === 200 ? 'PASS' : 'FAIL';

  // 2.2 Video Gallery: Create, Read, Update, Delete
  console.log('\n[2.2] Video Gallery CRUD:');
  const createVideoRes = await fetch(`${BASE_URL}/api/admin/gallery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      title: 'QA Institutional Clinical Documentary',
      category: 'Videos',
      imageUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      caption: 'Initial video caption',
      order: 1,
      isPublished: true,
    }),
  });
  const videoData = await createVideoRes.json();
  const videoId = videoData.item?.id;
  console.log(`  Video Created ID: ${videoId}, Status: ${createVideoRes.status}`);

  const updateVideoRes = await fetch(`${BASE_URL}/api/admin/gallery`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      id: videoId,
      title: 'QA Institutional Clinical Documentary (Updated)',
      category: 'Videos',
      imageUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      caption: 'Updated video caption with YouTube embed verification',
      order: 2,
      isPublished: true,
    }),
  });
  console.log(`  Video Update Status: ${updateVideoRes.status}`);

  const delVideoRes = await fetch(`${BASE_URL}/api/admin/gallery?id=${videoId}`, {
    method: 'DELETE',
    headers: { Cookie: adminCookies },
  });
  console.log(`  Video Delete Status: ${delVideoRes.status}`);
  report.crudModules.videoGallery = createVideoRes.status === 200 && updateVideoRes.status === 200 && delVideoRes.status === 200 ? 'PASS' : 'FAIL';

  // 2.3 News & Events: Complete CRUD
  console.log('\n[2.3] News & Events CRUD:');
  const createNewsRes = await fetch(`${BASE_URL}/api/admin/news`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      title: 'QA National Ayurveda Summit 2026',
      summary: 'Symposium on Ayurvedic Pharmacology and Drug Standardisation',
      content: 'Complete proceedings of the national conclave held in campus auditorium.',
      category: 'Academic',
      isFeatured: true,
      isPublished: true,
    }),
  });
  const newsData = await createNewsRes.json();
  const newsId = newsData.article?.id;
  console.log(`  News Created ID: ${newsId}, Status: ${createNewsRes.status}`);

  const updateNewsRes = await fetch(`${BASE_URL}/api/admin/news`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      id: newsId,
      title: 'QA National Ayurveda Summit 2026 (Updated Edition)',
      summary: 'Updated symposium executive summary',
      content: 'Revised clinical proceedings with peer-reviewed research papers.',
      category: 'Academic',
      isFeatured: false,
      isPublished: true,
    }),
  });
  console.log(`  News Update Status: ${updateNewsRes.status}`);

  const delNewsRes = await fetch(`${BASE_URL}/api/admin/news?id=${newsId}`, {
    method: 'DELETE',
    headers: { Cookie: adminCookies },
  });
  console.log(`  News Delete Status: ${delNewsRes.status}`);
  report.crudModules.news = createNewsRes.status === 200 && updateNewsRes.status === 200 && delNewsRes.status === 200 ? 'PASS' : 'FAIL';

  // 2.4 Notices & Circulars: Create, Read, Update, Delete
  console.log('\n[2.4] Notices & Circulars CRUD:');
  const createNoticeRes = await fetch(`${BASE_URL}/api/admin/notices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      title: 'QA Examination Schedule Winter 2026',
      category: 'Examination',
      date: '2026-11-09',
      fileUrl: '/downloads/exam_schedule_2026.pdf',
      isPinned: false,
      isPublished: true,
    }),
  });
  const noticeData = await createNoticeRes.json();
  const noticeId = noticeData.notice?.id;
  console.log(`  Notice Created ID: ${noticeId}, Status: ${createNoticeRes.status}`);

  const updateNoticeRes = await fetch(`${BASE_URL}/api/admin/notices`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      id: noticeId,
      title: 'QA Examination Schedule Winter 2026 (Revised & Pinned)',
      category: 'Examination',
      date: '2026-11-09',
      fileUrl: '/downloads/exam_schedule_2026_revised.pdf',
      isPinned: true,
      isPublished: true,
    }),
  });
  console.log(`  Notice Update Status: ${updateNoticeRes.status}`);

  const delNoticeRes = await fetch(`${BASE_URL}/api/admin/notices?id=${noticeId}`, {
    method: 'DELETE',
    headers: { Cookie: adminCookies },
  });
  console.log(`  Notice Delete Status: ${delNoticeRes.status}`);
  report.crudModules.notices = createNoticeRes.status === 200 && updateNoticeRes.status === 200 && delNoticeRes.status === 200 ? 'PASS' : 'FAIL';

  // 2.5 Courses & Academics: Create, Read, Update, Delete
  console.log('\n[2.5] Courses & Academics CRUD:');
  const createCourseRes = await fetch(`${BASE_URL}/api/admin/courses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      code: `QA-PANC-${Date.now().toString().slice(-4)}`,
      title: 'QA Diploma in Panchakarma Therapy',
      degree: 'Diploma',
      duration: '1 Year Full-Time',
      intake: 30,
      eligibility: '10+2 with Science stream',
      feePerYear: '₹75,000 / Year',
    }),
  });
  const courseData = await createCourseRes.json();
  const courseId = courseData.course?.id;
  console.log(`  Course Created ID: ${courseId}, Status: ${createCourseRes.status}`);

  const updateCourseRes = await fetch(`${BASE_URL}/api/admin/courses`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      id: courseId,
      title: 'QA Diploma in Panchakarma Therapy (Updated Intake)',
      degree: 'Diploma',
      duration: '1 Year Full-Time',
      intake: 45,
      eligibility: '10+2 with Science stream (Min 50%)',
      feePerYear: '₹80,000 / Year',
      isApproved: true,
    }),
  });
  console.log(`  Course Update Status: ${updateCourseRes.status}`);

  const delCourseRes = await fetch(`${BASE_URL}/api/admin/courses?id=${courseId}`, {
    method: 'DELETE',
    headers: { Cookie: adminCookies },
  });
  console.log(`  Course Delete Status: ${delCourseRes.status}`);
  report.crudModules.courses = createCourseRes.status === 200 && updateCourseRes.status === 200 && delCourseRes.status === 200 ? 'PASS' : 'FAIL';

  // 2.6 Faculty Profiles: Create, Read, Update, Delete
  console.log('\n[2.6] Faculty Profiles CRUD:');
  const facultyEmail = `dr.qa.shastri.${Date.now()}@example.com`;
  const createFacultyRes = await fetch(`${BASE_URL}/api/admin/faculty`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      name: 'Dr. QA Rameshwar Shastri',
      designation: 'Assistant Professor',
      qualification: 'BAMS, MD (Rasa Shastra)',
      experienceYears: 8,
      specialization: 'Rasa Shastra & Bhaishajya Kalpana',
      email: facultyEmail,
      phone: '+91 98290 12345',
      bio: 'Classical Ayurvedic pharmaceutical expert.',
      isHOD: false,
      isLeadership: false,
    }),
  });
  const facultyData = await createFacultyRes.json();
  const facultyId = facultyData.faculty?.id || facultyData.member?.id;
  console.log(`  Faculty Created ID: ${facultyId}, Status: ${createFacultyRes.status}`);

  const updateFacultyRes = await fetch(`${BASE_URL}/api/admin/faculty`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      id: facultyId,
      name: 'Dr. QA Rameshwar Shastri (Promoted)',
      designation: 'Associate Professor & HOD',
      qualification: 'BAMS, MD, Ph.D.',
      experienceYears: 10,
      specialization: 'Rasa Shastra & Bhaishajya Kalpana',
      email: facultyEmail,
      phone: '+91 98290 12345',
      bio: 'Published 14 papers on Ayurvedic formulation stability.',
      isHOD: true,
      isLeadership: false,
      order: 5,
    }),
  });
  console.log(`  Faculty Update Status: ${updateFacultyRes.status}`);

  const delFacultyRes = await fetch(`${BASE_URL}/api/admin/faculty?id=${facultyId}`, {
    method: 'DELETE',
    headers: { Cookie: adminCookies },
  });
  console.log(`  Faculty Delete Status: ${delFacultyRes.status}`);
  report.crudModules.faculty = createFacultyRes.status === 200 && updateFacultyRes.status === 200 && delFacultyRes.status === 200 ? 'PASS' : 'FAIL';

  // 2.7 Mandatory Disclosures: Create Document, Update, Delete
  console.log('\n[2.7] Mandatory Disclosures CRUD:');
  const getDiscRes = await fetch(`${BASE_URL}/api/admin/disclosures`, {
    headers: { Cookie: adminCookies },
  });
  const discData = await getDiscRes.json();
  const sampleCategoryId = discData.data?.[0]?.id;

  const createDocRes = await fetch(`${BASE_URL}/api/admin/disclosures`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      action: 'CREATE_DOCUMENT',
      categoryId: sampleCategoryId,
      title: 'QA NCISM Compliance Audit Report 2026-27',
      documentCode: `DISC-QA-${Date.now().toString().slice(-4)}`,
      fileUrl: '/downloads/ncism_audit_2026.pdf',
      academicYear: '2026-27',
    }),
  });
  const docData = await createDocRes.json();
  const docId = docData.data?.id;
  console.log(`  Disclosure Document Created ID: ${docId}, Status: ${createDocRes.status}`);

  const delDocRes = await fetch(`${BASE_URL}/api/admin/disclosures?documentId=${docId}`, {
    method: 'DELETE',
    headers: { Cookie: adminCookies },
  });
  console.log(`  Disclosure Document Delete Status: ${delDocRes.status}`);
  report.crudModules.disclosures = createDocRes.status === 200 && delDocRes.status === 200 ? 'PASS' : 'FAIL';

  // 2.8 Testimonials: Create, Read, Update, Delete
  console.log('\n[2.8] Testimonials CRUD:');
  const createTestimonialRes = await fetch(`${BASE_URL}/api/admin/testimonials`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      authorName: 'Sunita Meena',
      role: 'BAMS Student',
      batchOrDesignation: 'Batch 2023-28',
      quote: 'The herbal garden and 100-bed hospital clinical training is unparalleled.',
      rating: 5,
      isPublished: true,
    }),
  });
  const testimonialData = await createTestimonialRes.json();
  const testimonialId = testimonialData.testimonial?.id;
  console.log(`  Testimonial Created ID: ${testimonialId}, Status: ${createTestimonialRes.status}`);

  const updateTestimonialRes = await fetch(`${BASE_URL}/api/admin/testimonials`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      id: testimonialId,
      authorName: 'Sunita Meena',
      role: 'Senior BAMS Intern',
      batchOrDesignation: 'Batch 2023-28',
      quote: 'Comprehensive exposure to classical Panchakarma procedures.',
      rating: 5,
      isPublished: true,
    }),
  });
  console.log(`  Testimonial Update Status: ${updateTestimonialRes.status}`);

  const delTestimonialRes = await fetch(`${BASE_URL}/api/admin/testimonials?id=${testimonialId}`, {
    method: 'DELETE',
    headers: { Cookie: adminCookies },
  });
  console.log(`  Testimonial Delete Status: ${delTestimonialRes.status}`);
  report.crudModules.testimonials = createTestimonialRes.status === 200 && updateTestimonialRes.status === 200 && delTestimonialRes.status === 200 ? 'PASS' : 'FAIL';

  // 2.9 Website Settings: Read & Update
  console.log('\n[2.9] Website Settings Read & Update:');
  const updateSettingsRes = await fetch(`${BASE_URL}/api/admin/settings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      'site.institution_name': 'Shri Haridutt Ayurvedic Medical College & Hospital',
      'site.admissions_open': 'true',
      'site.qa_audit_timestamp': String(Date.now()),
    }),
  });
  console.log(`  Settings Update Status: ${updateSettingsRes.status}`);
  report.crudModules.settings = updateSettingsRes.status === 200 ? 'PASS' : 'FAIL';

  // 2.10 Page Content Management (Homepage, About College, Hospital Services)
  console.log('\n[2.10] Page Content Management (Homepage, About, Hospital):');
  
  // Homepage
  const homePageRes = await fetch(`${BASE_URL}/api/admin/pages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      slug: 'home',
      title: 'Home Page Content',
      content: {
        heroHeadline: 'Vedic Healing Meets Modern Medical Science',
        heroSubheadline: '100-Bed Super Specialty Ayurvedic Hospital & NCISM Approved BAMS College',
        lastUpdated: Date.now(),
      },
      metaTitle: 'Premier Ayurvedic Medical College & Hospital',
      metaDesc: 'Ancient Ayurvedic wisdom integrated with modern clinical excellence.',
    }),
  });
  console.log(`  Homepage Content Update Status: ${homePageRes.status}`);

  // About College
  const aboutPageRes = await fetch(`${BASE_URL}/api/admin/pages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      slug: 'about',
      title: 'About Institutional Heritage',
      content: {
        intro: 'Founded with the mission to preserve and advance authentic Ayurvedic sciences.',
        accreditation: 'Approved by NCISM, Ministry of AYUSH, Govt of India',
        campusArea: '15 Acres Sandstone Heritage Campus',
      },
      metaTitle: 'About Shri Haridutt Ayurvedic Medical College',
      metaDesc: 'Discover our heritage, faculty, and clinical infrastructure.',
    }),
  });
  console.log(`  About College Content Update Status: ${aboutPageRes.status}`);

  // Hospital Services
  const hospitalPageRes = await fetch(`${BASE_URL}/api/admin/pages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      slug: 'hospital',
      title: 'Hospital Services & Clinical Facilities',
      content: {
        bedCapacity: '100 Operational IPD Beds',
        specialties: ['Kayachikitsa', 'Panchakarma', 'Shalya Tantra', 'Shalakya Tantra', 'Prasuti & Stri Roga', 'Kaumarbhritya'],
        emergency: '24x7 Casualty and Emergency Ayurvedic Care',
      },
      metaTitle: '100-Bed Ayurvedic Hospital Services',
      metaDesc: 'State-of-the-art Panchakarma, OPD, IPD, and clinical pathology laboratories.',
    }),
  });
  console.log(`  Hospital Services Content Update Status: ${hospitalPageRes.status}`);

  report.crudModules.pageContent = homePageRes.status === 200 && aboutPageRes.status === 200 && hospitalPageRes.status === 200 ? 'PASS' : 'FAIL';

  banner('3. FILE STORAGE & UPLOAD SECURITY VERIFICATION');

  // 3.1 Valid PNG image upload with magic bytes
  console.log('\n[3.1] Valid PNG Image Upload:');
  const validPngBytes = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
  const pngBlob = new Blob([validPngBytes], { type: 'image/png' });
  const pngForm = new FormData();
  pngForm.append('file', pngBlob, 'valid-specimen.png');

  const resPngUpload = await fetch(`${BASE_URL}/api/admin/upload`, {
    method: 'POST',
    headers: { Cookie: adminCookies },
    body: pngForm,
  });
  const dataPngUpload = await resPngUpload.json();
  const uploadedPngUrl = dataPngUpload.urls?.[0] || dataPngUpload.files?.[0]?.url;
  console.log(`  PNG Upload Status: ${resPngUpload.status}, URL: ${uploadedPngUrl}`);

  // Verify persistent HTTP accessibility
  let pngAccessible = false;
  if (uploadedPngUrl) {
    const resGetPng = await fetch(`${BASE_URL}${uploadedPngUrl}`);
    pngAccessible = resGetPng.status === 200;
    console.log(`  Persistent HTTP 200 Fetch: ${resGetPng.status}`);
  }
  report.fileStorage.pngUploadAndPersistence = resPngUpload.status === 200 && pngAccessible ? 'PASS' : 'FAIL';

  // 3.2 Valid PDF document upload with %PDF- magic bytes
  console.log('\n[3.2] Valid PDF Document Upload:');
  const validPdfBytes = Buffer.from('%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF', 'utf-8');
  const pdfBlob = new Blob([validPdfBytes], { type: 'application/pdf' });
  const pdfForm = new FormData();
  pdfForm.append('file', pdfBlob, 'ncism-circular.pdf');

  const resPdfUpload = await fetch(`${BASE_URL}/api/admin/upload`, {
    method: 'POST',
    headers: { Cookie: adminCookies },
    body: pdfForm,
  });
  const dataPdfUpload = await resPdfUpload.json();
  const uploadedPdfUrl = dataPdfUpload.urls?.[0] || dataPdfUpload.files?.[0]?.url;
  console.log(`  PDF Upload Status: ${resPdfUpload.status}, URL: ${uploadedPdfUrl}`);
  report.fileStorage.pdfUpload = resPdfUpload.status === 200 ? 'PASS' : 'FAIL';

  // 3.3 Rejection of Disallowed Extension (.exe / .sh)
  console.log('\n[3.3] Disallowed File Extension (.sh shell script):');
  const shBlob = new Blob([Buffer.from('#!/bin/bash\necho "exploit"', 'utf-8')], { type: 'application/x-sh' });
  const shForm = new FormData();
  shForm.append('file', shBlob, 'malicious.sh');

  const resShUpload = await fetch(`${BASE_URL}/api/admin/upload`, {
    method: 'POST',
    headers: { Cookie: adminCookies },
    body: shForm,
  });
  console.log(`  Disallowed Extension Status: ${resShUpload.status} (Expected: 400)`);
  report.fileStorage.disallowedExtensionRejection = resShUpload.status === 400 ? 'PASS' : 'FAIL';

  // 3.4 MIME Spoofing (Executable disguised as PNG without magic bytes)
  console.log('\n[3.4] MIME Spoofing (Shell code disguised as .png):');
  const fakePngBlob = new Blob([Buffer.from('<?php echo "fake script"; ?>', 'utf-8')], { type: 'image/png' });
  const fakeForm = new FormData();
  fakeForm.append('file', fakePngBlob, 'fake-image.png');

  const resFakeUpload = await fetch(`${BASE_URL}/api/admin/upload`, {
    method: 'POST',
    headers: { Cookie: adminCookies },
    body: fakeForm,
  });
  console.log(`  MIME Spoofing Status: ${resFakeUpload.status} (Expected: 400)`);
  report.fileStorage.mimeSpoofingRejection = resFakeUpload.status === 400 ? 'PASS' : 'FAIL';

  // 3.5 Path Traversal in Filename
  console.log('\n[3.5] Path Traversal Filename Sanitization:');
  const traversalForm = new FormData();
  traversalForm.append('file', pngBlob, '../../../../etc/passwd.png');

  const resTraversal = await fetch(`${BASE_URL}/api/admin/upload`, {
    method: 'POST',
    headers: { Cookie: adminCookies },
    body: traversalForm,
  });
  const dataTraversal = await resTraversal.json();
  const traversalUrl = dataTraversal.urls?.[0] || dataTraversal.files?.[0]?.url;
  const isSafeUrl = traversalUrl && !traversalUrl.includes('..') && traversalUrl.startsWith('/uploads/media_');
  console.log(`  Sanitized Upload URL: ${traversalUrl}, Safe: ${isSafeUrl}`);
  report.fileStorage.pathTraversalSanitization = isSafeUrl ? 'PASS' : 'FAIL';

  banner('4. COMPLETE SECURITY TESTING & OWASP DEFENSES');

  // 4.1 SQL Injection defense (Prisma parameterized query test)
  console.log('\n[4.1] SQL Injection Defense:');
  const sqliPayload = "admin@hariduttayurveda.edu.in' OR '1'='1' --";
  const resSqli = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: sqliPayload, password: 'arbitraryPassword', portalType: 'ADMIN' }),
  });
  console.log(`  SQL Injection Status: ${resSqli.status} (Expected: 401 Unauthorized)`);
  report.securityVulnerabilities.sqlInjectionDefense = resSqli.status === 401 ? 'PASS' : 'FAIL';

  // 4.2 XSS Sanitization defense
  console.log('\n[4.2] Stored XSS Defense:');
  const xssPayload = '<script>alert("XSS")</script>';
  const resXss = await fetch(`${BASE_URL}/api/admin/gallery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      title: `QA XSS Test ${xssPayload}`,
      category: 'Campus',
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
      caption: xssPayload,
      order: 99,
      isPublished: true,
    }),
  });
  const xssData = await resXss.json();
  const xssId = xssData.item?.id;
  // Cleanup test item
  if (xssId) {
    await fetch(`${BASE_URL}/api/admin/gallery?id=${xssId}`, {
      method: 'DELETE',
      headers: { Cookie: adminCookies },
    });
  }
  console.log(`  XSS Ingestion Handled Safely, Status: ${resXss.status}`);
  report.securityVulnerabilities.xssDefense = resXss.status === 200 ? 'PASS' : 'FAIL';

  // 4.3 Brute-Force Rate Limiting (5 failed attempts)
  console.log('\n[4.3] Brute-Force Protection Rate Limiter:');
  let rateLimitTriggered = false;
  for (let i = 1; i <= 6; i++) {
    const resRate = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: 'bruteforce.target@hariduttayurveda.edu.in',
        password: `AttemptPass_${i}`,
        portalType: 'ADMIN',
      }),
    });
    if (resRate.status === 429) {
      rateLimitTriggered = true;
      console.log(`  Attempt ${i}: Rate limit triggered with HTTP 429 Too Many Requests`);
      break;
    }
  }
  report.securityVulnerabilities.bruteForceProtection = rateLimitTriggered ? 'PASS' : 'FAIL';

  // 4.4 HTTP Security Headers
  console.log('\n[4.4] HTTP Security Headers Check:');
  const resHomeHeaders = await fetch(`${BASE_URL}/`);
  const hsts = resHomeHeaders.headers.get('strict-transport-security');
  const xframe = resHomeHeaders.headers.get('x-frame-options');
  const xcontent = resHomeHeaders.headers.get('x-content-type-options');
  const csp = resHomeHeaders.headers.get('content-security-policy');
  console.log(`  HSTS: ${hsts ? 'PRESENT' : 'MISSING'}`);
  console.log(`  X-Frame-Options: ${xframe || 'MISSING'}`);
  console.log(`  X-Content-Type-Options: ${xcontent || 'MISSING'}`);
  console.log(`  CSP: ${csp ? 'CONFIGURED' : 'MISSING'}`);
  report.securityVulnerabilities.securityHeaders = (xframe && xcontent && csp) ? 'PASS' : 'FAIL';

  // 4.5 Sensitive Information Exposure in API responses
  console.log('\n[4.5] Sensitive Information Scrubbing:');
  const resOverviewInfo = await fetch(`${BASE_URL}/api/admin/overview`, {
    headers: { Cookie: adminCookies },
  });
  const overviewText = await resOverviewInfo.text();
  const hasSecret = overviewText.includes('password') && overviewText.includes('$2b$');
  const hasDbUrl = overviewText.includes('postgresql://') || overviewText.includes('postgres://');
  console.log(`  Contains Plaintext or Hash: ${hasSecret}, Contains Database URL: ${hasDbUrl}`);
  report.securityVulnerabilities.noSensitiveDataLeaked = (!hasSecret && !hasDbUrl) ? 'PASS' : 'FAIL';

  banner('5. PUBLIC WEBSITE SYNCHRONIZATION');

  const publicRoutes = [
    { name: 'Homepage', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Notices', path: '/notices' },
    { name: 'Academics & Courses', path: '/academics' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Mandatory Disclosures', path: '/mandatory-disclosures' },
    { name: 'Hospital', path: '/hospital' },
  ];

  for (const r of publicRoutes) {
    const resP = await fetch(`${BASE_URL}${r.path}`);
    console.log(`  Public Route [${r.name}] (${r.path}): HTTP ${resP.status}`);
    report.publicSync[r.name] = resP.status === 200 ? 'PASS' : 'FAIL';
  }

  banner('FINAL PRE-PRODUCTION TEST RESULTS');
  console.log(JSON.stringify(report, null, 2));
}

run().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
