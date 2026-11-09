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
let adminCookies = '';

const results = {
  auth: {},
  modules: {},
  security: {},
  publicIntegration: {},
  googleVerification: {}
};

function logSection(title) {
  console.log(`\n======================================================`);
  console.log(`  ${title}`);
  console.log(`======================================================`);
}

async function run() {
  logSection('1. AUTHENTICATION & SESSION MANAGEMENT TESTS');

  // Test 1.1: Missing fields
  console.log('\n[Test 1.1] Missing credentials:');
  const resMissing = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: '' }),
  });
  const dataMissing = await resMissing.json();
  console.log(`  HTTP Status: ${resMissing.status} (Expected: 400)`);
  console.log(`  Response:`, dataMissing);
  results.auth.missingFields = resMissing.status === 400 ? 'PASS' : 'FAIL';

  // Test 1.2: Invalid password
  console.log('\n[Test 1.2] Invalid password:');
  const resWrongPw = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: 'admin@hariduttayurveda.edu.in',
      password: 'WrongPassword!999',
      portalType: 'ADMIN',
    }),
  });
  const dataWrongPw = await resWrongPw.json();
  console.log(`  HTTP Status: ${resWrongPw.status} (Expected: 401)`);
  console.log(`  Response:`, dataWrongPw);
  results.auth.invalidPassword = resWrongPw.status === 401 ? 'PASS' : 'FAIL';

  // Test 1.3: Invalid email / non-existent user
  console.log('\n[Test 1.3] Invalid email:');
  const resWrongEmail = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: 'nonexistent@hariduttayurveda.edu.in',
      password: 'SomePassword123',
      portalType: 'ADMIN',
    }),
  });
  const dataWrongEmail = await resWrongEmail.json();
  console.log(`  HTTP Status: ${resWrongEmail.status} (Expected: 401)`);
  console.log(`  Response:`, dataWrongEmail);
  results.auth.invalidEmail = resWrongEmail.status === 401 ? 'PASS' : 'FAIL';

  // Test 1.4: Deactivated secondary user (e.g. principal@hariduttayurveda.edu.in)
  console.log('\n[Test 1.4] Deactivated secondary user login attempt:');
  const resDeactivated = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: 'principal@hariduttayurveda.edu.in',
      password: 'Admin@123',
      portalType: 'ADMIN',
    }),
  });
  const dataDeactivated = await resDeactivated.json();
  console.log(`  HTTP Status: ${resDeactivated.status} (Expected: 401)`);
  console.log(`  Response:`, dataDeactivated);
  results.auth.deactivatedRejection = resDeactivated.status === 401 ? 'PASS' : 'FAIL';

  // Test 1.5: Unauthenticated access to protected admin route
  console.log('\n[Test 1.5] Unauthenticated access to /api/admin/overview:');
  const resUnauth = await fetch(`${BASE_URL}/api/admin/overview`);
  const dataUnauth = await resUnauth.json();
  console.log(`  HTTP Status: ${resUnauth.status} (Expected: 401)`);
  console.log(`  Response:`, dataUnauth);
  results.auth.unauthenticatedRejection = resUnauth.status === 401 ? 'PASS' : 'FAIL';

  // Test 1.6: Valid admin login
  console.log('\n[Test 1.6] Valid Admin Login:');
  const resLogin = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: 'admin@hariduttayurveda.edu.in',
      password: 'Admin@123',
      portalType: 'ADMIN',
    }),
  });
  const dataLogin = await resLogin.json();
  const rawCookieHeader = resLogin.headers.get('set-cookie');
  console.log(`  HTTP Status: ${resLogin.status} (Expected: 200)`);
  console.log(`  User Authenticated:`, dataLogin.user);
  
  if (resLogin.status === 200 && rawCookieHeader) {
    results.auth.validLogin = 'PASS';
    // Format cookies for subsequent requests
    adminCookies = rawCookieHeader
      .split(',')
      .map((c) => c.split(';')[0].trim())
      .join('; ');
  } else {
    results.auth.validLogin = 'FAIL';
    throw new Error('Valid admin login failed. Aborting further authenticated tests.');
  }

  logSection('2. CMS MODULES CRUD & VERIFICATION');

  // Module 2.1: Overview Dashboard
  console.log('\n[Module 2.1] Dashboard Overview API (/api/admin/overview):');
  const resOverview = await fetch(`${BASE_URL}/api/admin/overview`, {
    headers: { Cookie: adminCookies },
  });
  const dataOverview = await resOverview.json();
  console.log(`  HTTP Status: ${resOverview.status}`);
  console.log(`  Real DB Stats:`, dataOverview.stats);
  results.modules.overview = resOverview.status === 200 && dataOverview.success ? 'PASS' : 'FAIL';

  // Module 2.2: Photo Gallery (Create, Read, Update, Delete)
  console.log('\n[Module 2.2] Photo Gallery API (/api/admin/gallery):');
  const testPhotoPayload = {
    title: 'Automated QA Test Herbal Conservatory',
    category: 'Herbal Garden',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800',
    caption: 'QA automated test entry for botanical conservatory.',
    order: 99,
    isPublished: true,
  };
  const resGalleryCreate = await fetch(`${BASE_URL}/api/admin/gallery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify(testPhotoPayload),
  });
  const dataGalleryCreate = await resGalleryCreate.json();
  console.log(`  CREATE Photo Status: ${resGalleryCreate.status}, ID: ${dataGalleryCreate.item?.id}`);
  
  const createdPhotoId = dataGalleryCreate.item?.id;

  // Verify list
  const resGalleryList = await fetch(`${BASE_URL}/api/admin/gallery`, {
    headers: { Cookie: adminCookies },
  });
  const dataGalleryList = await resGalleryList.json();
  const photoFound = dataGalleryList.items?.some((i) => i.id === createdPhotoId);
  console.log(`  LIST Photos: ${dataGalleryList.items?.length} items. Test item found: ${photoFound}`);

  // Delete test photo
  let galleryDeleteOk = false;
  if (createdPhotoId) {
    const resGalleryDel = await fetch(`${BASE_URL}/api/admin/gallery?id=${createdPhotoId}`, {
      method: 'DELETE',
      headers: { Cookie: adminCookies },
    });
    galleryDeleteOk = resGalleryDel.status === 200;
    console.log(`  DELETE Photo Status: ${resGalleryDel.status}`);
  }
  results.modules.photoGallery = resGalleryCreate.status === 200 && photoFound && galleryDeleteOk ? 'PASS' : 'FAIL';

  // Module 2.3: Video Gallery
  console.log('\n[Module 2.3] Video Gallery API (/api/admin/gallery category=Videos):');
  const testVideoPayload = {
    title: 'Campus Tour & Institutional Documentary 2026',
    category: 'Videos',
    imageUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    caption: 'Official institutional documentary.',
    order: 1,
    isPublished: true,
  };
  const resVideoCreate = await fetch(`${BASE_URL}/api/admin/gallery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify(testVideoPayload),
  });
  const dataVideoCreate = await resVideoCreate.json();
  const createdVideoId = dataVideoCreate.item?.id;
  console.log(`  CREATE Video Status: ${resVideoCreate.status}, ID: ${createdVideoId}`);

  let videoDeleteOk = false;
  if (createdVideoId) {
    const resVideoDel = await fetch(`${BASE_URL}/api/admin/gallery?id=${createdVideoId}`, {
      method: 'DELETE',
      headers: { Cookie: adminCookies },
    });
    videoDeleteOk = resVideoDel.status === 200;
    console.log(`  DELETE Video Status: ${resVideoDel.status}`);
  }
  results.modules.videoGallery = resVideoCreate.status === 200 && videoDeleteOk ? 'PASS' : 'FAIL';

  // Module 2.4: News & Events
  console.log('\n[Module 2.4] News & Events API (/api/admin/news):');
  const testNewsPayload = {
    title: 'QA National Ayurveda Conclave 2026',
    summary: 'Annual research symposium on integrative panchakarma science.',
    content: 'Full discourse on evidence-based classical Ayurveda protocols and drug standardization.',
    category: 'Symposium',
    isFeatured: true,
    isPublished: true,
  };
  const resNewsCreate = await fetch(`${BASE_URL}/api/admin/news`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify(testNewsPayload),
  });
  const dataNewsCreate = await resNewsCreate.json();
  const createdNewsId = dataNewsCreate.article?.id;
  console.log(`  CREATE News Status: ${resNewsCreate.status}, ID: ${createdNewsId}`);

  // Update News
  let newsUpdateOk = false;
  if (createdNewsId) {
    const resNewsPut = await fetch(`${BASE_URL}/api/admin/news`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
      body: JSON.stringify({ id: createdNewsId, title: 'Updated QA Conclave 2026' }),
    });
    newsUpdateOk = resNewsPut.status === 200;
    console.log(`  UPDATE News Status: ${resNewsPut.status}`);
  }

  // Delete News
  let newsDeleteOk = false;
  if (createdNewsId) {
    const resNewsDel = await fetch(`${BASE_URL}/api/admin/news?id=${createdNewsId}`, {
      method: 'DELETE',
      headers: { Cookie: adminCookies },
    });
    newsDeleteOk = resNewsDel.status === 200;
    console.log(`  DELETE News Status: ${resNewsDel.status}`);
  }
  results.modules.news = resNewsCreate.status === 200 && newsUpdateOk && newsDeleteOk ? 'PASS' : 'FAIL';

  // Module 2.5: Notices & Circulars
  console.log('\n[Module 2.5] Notices & Circulars API (/api/admin/notices):');
  const testNoticePayload = {
    title: 'QA AYUSH Counseling Round 2 Seat Allotment Guidelines',
    category: 'Admissions',
    date: '2026-11-09',
    fileUrl: '/downloads/test-circular.pdf',
    isPinned: true,
    isPublished: true,
  };
  const resNoticeCreate = await fetch(`${BASE_URL}/api/admin/notices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify(testNoticePayload),
  });
  const dataNoticeCreate = await resNoticeCreate.json();
  const createdNoticeId = dataNoticeCreate.notice?.id;
  console.log(`  CREATE Notice Status: ${resNoticeCreate.status}, ID: ${createdNoticeId}`);

  let noticeDeleteOk = false;
  if (createdNoticeId) {
    const resNoticeDel = await fetch(`${BASE_URL}/api/admin/notices?id=${createdNoticeId}`, {
      method: 'DELETE',
      headers: { Cookie: adminCookies },
    });
    noticeDeleteOk = resNoticeDel.status === 200;
    console.log(`  DELETE Notice Status: ${resNoticeDel.status}`);
  }
  results.modules.notices = resNoticeCreate.status === 200 && noticeDeleteOk ? 'PASS' : 'FAIL';

  // Module 2.6: Courses
  console.log('\n[Module 2.6] Courses API (/api/admin/courses):');
  const testCoursePayload = {
    code: 'QA-MD-AYUR',
    title: 'QA MD Ayurveda (Kayachikitsa)',
    degree: 'Postgraduate',
    duration: '3 Years Full-Time',
    intake: 15,
    eligibility: 'BAMS degree from NCISM recognized institution + AIAPGET score',
    feePerYear: '₹3,50,000 / Year',
  };
  const resCourseCreate = await fetch(`${BASE_URL}/api/admin/courses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify(testCoursePayload),
  });
  const dataCourseCreate = await resCourseCreate.json();
  const createdCourseId = dataCourseCreate.course?.id;
  console.log(`  CREATE Course Status: ${resCourseCreate.status}, ID: ${createdCourseId}`);

  let courseDeleteOk = false;
  if (createdCourseId) {
    const resCourseDel = await fetch(`${BASE_URL}/api/admin/courses?id=${createdCourseId}`, {
      method: 'DELETE',
      headers: { Cookie: adminCookies },
    });
    courseDeleteOk = resCourseDel.status === 200;
    console.log(`  DELETE Course Status: ${resCourseDel.status}`);
  }
  results.modules.courses = resCourseCreate.status === 200 && courseDeleteOk ? 'PASS' : 'FAIL';

  // Module 2.7: Faculty
  console.log('\n[Module 2.7] Faculty API (/api/admin/faculty):');
  const testFacultyPayload = {
    name: 'Dr. QA Rameshwar Shastri',
    designation: 'Associate Professor',
    qualification: 'BAMS, MD (Ayurveda)',
    experienceYears: 12,
    specialization: 'Dravyaguna Vijnana',
    email: `dr.rameshwar.qa.${Date.now()}@example.com`,
    phone: '+91 98290 00099',
    isHOD: false,
    isLeadership: false,
  };
  const resFacultyCreate = await fetch(`${BASE_URL}/api/admin/faculty`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify(testFacultyPayload),
  });
  const dataFacultyCreate = await resFacultyCreate.json();
  const createdFacultyId = dataFacultyCreate.faculty?.id || dataFacultyCreate.member?.id;
  console.log(`  CREATE Faculty Status: ${resFacultyCreate.status}, ID: ${createdFacultyId}`);

  let facultyDeleteOk = false;
  if (createdFacultyId) {
    const resFacultyDel = await fetch(`${BASE_URL}/api/admin/faculty?id=${createdFacultyId}`, {
      method: 'DELETE',
      headers: { Cookie: adminCookies },
    });
    facultyDeleteOk = resFacultyDel.status === 200;
    console.log(`  DELETE Faculty Status: ${resFacultyDel.status}`);
  }
  results.modules.faculty = resFacultyCreate.status === 200 && facultyDeleteOk ? 'PASS' : 'FAIL';

  // Module 2.8: Mandatory Disclosures
  console.log('\n[Module 2.8] Disclosures API (/api/admin/disclosures):');
  const resDisclosuresGet = await fetch(`${BASE_URL}/api/admin/disclosures`, {
    headers: { Cookie: adminCookies },
  });
  const dataDisclosuresGet = await resDisclosuresGet.json();
  console.log(`  GET Disclosures Status: ${resDisclosuresGet.status}, Categories: ${dataDisclosuresGet.data?.length}`);
  results.modules.disclosures = resDisclosuresGet.status === 200 && dataDisclosuresGet.success ? 'PASS' : 'FAIL';

  // Module 2.9: Testimonials
  console.log('\n[Module 2.9] Testimonials API (/api/admin/testimonials):');
  const testTestimonialPayload = {
    authorName: 'Aman Verma',
    role: 'BAMS Intern',
    batchOrDesignation: 'Class of 2025',
    quote: 'The hospital exposure and clinical rotations in Panchakarma provided unmatched hands-on expertise.',
    rating: 5,
  };
  const resTestimonialCreate = await fetch(`${BASE_URL}/api/admin/testimonials`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify(testTestimonialPayload),
  });
  const dataTestimonialCreate = await resTestimonialCreate.json();
  const createdTestimonialId = dataTestimonialCreate.testimonial?.id;
  console.log(`  CREATE Testimonial Status: ${resTestimonialCreate.status}, ID: ${createdTestimonialId}`);

  let testimonialDeleteOk = false;
  if (createdTestimonialId) {
    const resTestimonialDel = await fetch(`${BASE_URL}/api/admin/testimonials?id=${createdTestimonialId}`, {
      method: 'DELETE',
      headers: { Cookie: adminCookies },
    });
    testimonialDeleteOk = resTestimonialDel.status === 200;
    console.log(`  DELETE Testimonial Status: ${resTestimonialDel.status}`);
  }
  results.modules.testimonials = resTestimonialCreate.status === 200 && testimonialDeleteOk ? 'PASS' : 'FAIL';

  // Module 2.10: Settings & Pages
  console.log('\n[Module 2.10] Settings & Pages API (/api/admin/settings & /api/admin/pages):');
  const resSettingsGet = await fetch(`${BASE_URL}/api/admin/settings`, {
    headers: { Cookie: adminCookies },
  });
  const dataSettingsGet = await resSettingsGet.json();
  console.log(`  GET Settings Status: ${resSettingsGet.status}, Keys count: ${Object.keys(dataSettingsGet.settings || {}).length}`);
  results.modules.settings = resSettingsGet.status === 200 ? 'PASS' : 'FAIL';

  logSection('3. FILE UPLOAD & SECURITY VALIDATION');

  // Test 3.1: Reject Unauthenticated Upload
  console.log('\n[Test 3.1] Unauthenticated Upload:');
  const resUploadUnauth = await fetch(`${BASE_URL}/api/admin/upload`, {
    method: 'POST',
    body: new FormData(),
  });
  console.log(`  HTTP Status: ${resUploadUnauth.status} (Expected: 401)`);
  results.security.unauthUpload = resUploadUnauth.status === 401 ? 'PASS' : 'FAIL';

  // Test 3.2: Valid Safe Image Upload (PNG)
  console.log('\n[Test 3.2] Authenticated Image Upload with Magic Byte Validation:');
  // 1x1 Transparent PNG valid bytes
  const pngBytes = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
  const blob = new Blob([pngBytes], { type: 'image/png' });
  const uploadForm = new FormData();
  uploadForm.append('file', blob, 'test-pixel.png');

  const resUpload = await fetch(`${BASE_URL}/api/admin/upload`, {
    method: 'POST',
    headers: { Cookie: adminCookies },
    body: uploadForm,
  });
  const dataUpload = await resUpload.json();
  console.log(`  Upload HTTP Status: ${resUpload.status}`);
  console.log(`  Uploaded File URL:`, dataUpload.urls?.[0] || dataUpload.files?.[0]?.url);
  results.security.safeImageUpload = resUpload.status === 200 ? 'PASS' : 'FAIL';

  logSection('4. PUBLIC WEBSITE INTEGRATION');

  // Test 4.1: Public Homepage loads with HTTP 200
  console.log('\n[Test 4.1] Public Homepage (/):');
  const resHome = await fetch(`${BASE_URL}/`);
  console.log(`  Homepage HTTP Status: ${resHome.status} (Expected: 200)`);
  results.publicIntegration.homepage = resHome.status === 200 ? 'PASS' : 'FAIL';

  // Test 4.2: Public Notices Page (/notices)
  console.log('\n[Test 4.2] Public Notices Page (/notices):');
  const resNoticesPage = await fetch(`${BASE_URL}/notices`);
  console.log(`  Notices Page HTTP Status: ${resNoticesPage.status} (Expected: 200)`);
  results.publicIntegration.noticesPage = resNoticesPage.status === 200 ? 'PASS' : 'FAIL';

  // Test 4.3: Public Gallery Page (/gallery)
  console.log('\n[Test 4.3] Public Gallery Page (/gallery):');
  const resGalleryPage = await fetch(`${BASE_URL}/gallery`);
  console.log(`  Gallery Page HTTP Status: ${resGalleryPage.status} (Expected: 200)`);
  results.publicIntegration.galleryPage = resGalleryPage.status === 200 ? 'PASS' : 'FAIL';

  logSection('5. GOOGLE SEARCH CONSOLE VERIFICATION AUDIT');

  // Test 5.1: Verification file at /google56db1582a44e913d.html
  console.log('\n[Test 5.1] Verification HTML file (/google56db1582a44e913d.html):');
  const resGFile = await fetch(`${BASE_URL}/google56db1582a44e913d.html`);
  const gFileBody = await resGFile.text();
  console.log(`  HTTP Status: ${resGFile.status}`);
  console.log(`  Content: "${gFileBody.trim()}"`);
  const fileValid = resGFile.status === 200 && gFileBody.includes('google-site-verification: google56db1582a44e913d.html');
  results.googleVerification.htmlFile = fileValid ? 'PASS' : 'FAIL';

  // Test 5.2: Verification meta tag on homepage
  console.log('\n[Test 5.2] Verification Meta Tag on Homepage:');
  const homeHtml = await resHome.text();
  const hasMetaTag = homeHtml.includes('B_nuYFuxSm9psdTP_-4bed8s3zyUMlrNWbuItLKO1Uc');
  console.log(`  Meta tag detected in HTML: ${hasMetaTag}`);
  results.googleVerification.metaTag = hasMetaTag ? 'PASS' : 'FAIL';

  logSection('6. LOGOUT & SESSION INVALIDATION');

  // Test 6.1: Logout API
  console.log('\n[Test 6.1] Logout (/api/auth/logout):');
  const resLogout = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: 'POST',
    headers: { Cookie: adminCookies },
  });
  console.log(`  Logout HTTP Status: ${resLogout.status}`);
  results.auth.logout = resLogout.status === 200 ? 'PASS' : 'FAIL';

  // Test 6.2: Access admin overview after logout
  console.log('\n[Test 6.2] Protected route access after session invalidation:');
  const resAfterLogout = await fetch(`${BASE_URL}/api/admin/overview`, {
    headers: { Cookie: adminCookies },
  });
  console.log(`  HTTP Status: ${resAfterLogout.status} (Expected: 401)`);
  results.auth.postLogoutRejection = resAfterLogout.status === 401 ? 'PASS' : 'FAIL';

  logSection('SUMMARY OF TEST RESULTS');
  console.log(JSON.stringify(results, null, 2));
}

run().catch((err) => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
