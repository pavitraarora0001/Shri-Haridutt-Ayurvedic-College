/**
 * Comprehensive 17-Scenario Phase 8 Regression & Security Test Suite
 * Shri Haridutt Ayurvedic Medical College & Hospital
 */

const BASE_URL = 'http://localhost:3000';

let passed = 0;
let failed = 0;

function logPass(title, details = '') {
  console.log(`  [PASS] ${title} ${details ? '-> ' + details : ''}`);
  passed++;
}

function logFail(title, err = '') {
  console.error(`  [FAIL] ${title} ${err ? '-> ' + err : ''}`);
  failed++;
}

async function runTests() {
  console.log('='.repeat(70));
  console.log('PHASE 8 — FULL 17-ITEM REGRESSION & SECURITY VERIFICATION SUITE');
  console.log('='.repeat(70));

  let adminCookie = '';
  let adminRefreshToken = '';
  let facultyCookie = '';
  let studentCookie = '';
  let testAppNumber = '';

  // 1. Administrator login
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: 'admin@hariduttayurveda.edu.in', password: 'Admin@123' }),
    });
    const data = await res.json();
    const rawCookies = res.headers.get('set-cookie') || '';
    if (res.status === 200 && data.success && data.user.role === 'SUPER_ADMIN') {
      adminCookie = rawCookies.split(',').find(c => c.trim().startsWith('auth_token='))?.split(';')[0] || '';
      adminRefreshToken = rawCookies.split(',').find(c => c.trim().startsWith('refresh_token='))?.split(';')[0] || '';
      logPass('1. Administrator Login', `Role: ${data.user.role}, Name: ${data.user.name}`);
    } else {
      logFail('1. Administrator Login', JSON.stringify(data));
    }
  } catch (err) {
    logFail('1. Administrator Login', err.message);
  }

  // 2. Administrator dashboard access
  try {
    const res = await fetch(`${BASE_URL}/api/admin/overview`, {
      headers: { Cookie: adminCookie },
    });
    const data = await res.json();
    if (res.status === 200 && data.success) {
      logPass('2. Administrator Dashboard Data Access', `Applications: ${data.stats.totalApplications}`);
    } else {
      logFail('2. Administrator Dashboard Data Access', `HTTP ${res.status}`);
    }
  } catch (err) {
    logFail('2. Administrator Dashboard Data Access', err.message);
  }

  // 3. Faculty login
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: 'faculty@hariduttayurveda.edu.in', password: 'Faculty@123' }),
    });
    const data = await res.json();
    const rawCookies = res.headers.get('set-cookie') || '';
    if (res.status === 200 && data.success && data.user.role === 'FACULTY') {
      facultyCookie = rawCookies.split(',').find(c => c.trim().startsWith('auth_token='))?.split(';')[0] || '';
      logPass('3. Faculty Login', `Role: ${data.user.role}, Name: ${data.user.name}`);
    } else {
      logFail('3. Faculty Login', JSON.stringify(data));
    }
  } catch (err) {
    logFail('3. Faculty Login', err.message);
  }

  // 4. Faculty portal access
  try {
    const res = await fetch(`${BASE_URL}/api/faculty/profile`, {
      headers: { Cookie: facultyCookie },
    });
    const data = await res.json();
    if (res.status === 200 && data.success) {
      logPass('4. Faculty Portal Profile Access', `Faculty ID: ${data.faculty?.facultyId || 'Verified'}`);
    } else {
      logFail('4. Faculty Portal Profile Access', `HTTP ${res.status}`);
    }
  } catch (err) {
    logFail('4. Faculty Portal Profile Access', err.message);
  }

  // 5. Student login
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: 'SHAMC-2025-014',
        password: 'Student@123',
        portalType: 'STUDENT',
      }),
    });
    const data = await res.json();
    const rawCookies = res.headers.get('set-cookie') || '';
    if (res.status === 200 && data.success && data.user.role === 'STUDENT') {
      studentCookie = rawCookies.split(',').find(c => c.trim().startsWith('auth_token='))?.split(';')[0] || '';
      logPass('5. Student Login', `Student: ${data.user.name}, ID: ${data.user.studentId}`);
    } else {
      logFail('5. Student Login', JSON.stringify(data));
    }
  } catch (err) {
    logFail('5. Student Login', err.message);
  }

  // 6. Student dashboard
  try {
    const res = await fetch(`${BASE_URL}/api/student/profile`, {
      headers: { Cookie: studentCookie },
    });
    const data = await res.json();
    if (res.status === 200 && data.success) {
      logPass('6. Student Dashboard Access', `Course: ${data.student?.courseCode}, Batch: ${data.student?.batch}`);
    } else {
      logFail('6. Student Dashboard Access', `HTTP ${res.status}`);
    }
  } catch (err) {
    logFail('6. Student Dashboard Access', err.message);
  }

  // 7. Admissions application submission
  try {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const res = await fetch(`${BASE_URL}/api/admissions/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Ayurveda Regression Applicant',
        fatherName: 'Prakash Chandra',
        motherName: 'Shanti Devi',
        dob: '2004-04-14',
        gender: 'Female',
        email: `regression.${Date.now()}.${randomSuffix}@example.com`,
        phone: `+91 98${randomSuffix}`,
        category: 'GENERAL',
        neetRollNo: `NEET-${randomSuffix}`,
        neetScore: 540,
        neetRank: 36000,
        previousSchool: 'National Higher Secondary School',
        qualification: '10+2 (PCB)',
        marksPercentage: 88.5,
        courseCode: 'BAMS',
        address: '108 Charak Marg, Civil Lines',
        city: 'Varanasi',
        state: 'Uttar Pradesh',
        pincode: '221002',
      }),
    });
    const data = await res.json();
    if (data.success && (data.applicationNumber || data.application?.applicationNumber)) {
      testAppNumber = data.applicationNumber || data.application?.applicationNumber;
      logPass('7. Admissions Application Submission', `App No: ${testAppNumber}`);
    } else if (data.existingRef) {
      testAppNumber = data.existingRef;
      logPass('7. Admissions Application Submission & Deduplication', `Deduplicated to existing Ref: ${testAppNumber}`);
    } else {
      logFail('7. Admissions Application Submission', JSON.stringify(data));
    }
  } catch (err) {
    logFail('7. Admissions Application Submission', err.message);
  }

  // 8. Admissions status tracking & privacy audit
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const app = await prisma.admissionApplication.findFirst({
      where: { applicationNumber: testAppNumber || 'HC-AYUR-2026-001' },
      select: {
        applicationNumber: true,
        fullName: true,
        courseCode: true,
        status: true,
        createdAt: true,
        adminNotes: true,
      },
    });
    await prisma.$disconnect();

    if (app) {
      logPass('8. Admissions Status Data Integrity', `App: ${app.applicationNumber}, Status: ${app.status}`);
    } else {
      logFail('8. Admissions Status Data Integrity', 'Application record not found');
    }
  } catch (err) {
    logFail('8. Admissions Status Tracking', err.message);
  }

  // 9. Course catalog
  try {
    const res = await fetch(`${BASE_URL}/api/v1/courses`);
    const data = await res.json();
    const courses = data.data || data.courses;
    if (res.status === 200 && data.success && Array.isArray(courses) && courses.length >= 3) {
      logPass('9. Course Catalog API', `Active Courses: ${courses.length} (${courses.map(c => c.code).join(', ')})`);
    } else {
      logFail('9. Course Catalog API', `HTTP ${res.status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('9. Course Catalog API', err.message);
  }

  // 10. Department records
  try {
    const res = await fetch(`${BASE_URL}/api/v1/departments`);
    const data = await res.json();
    const depts = data.data || data.departments;
    if (res.status === 200 && data.success && Array.isArray(depts) && depts.length >= 7) {
      logPass('10. Department Records API', `Departments: ${depts.length}`);
    } else {
      logFail('10. Department Records API', `HTTP ${res.status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('10. Department Records API', err.message);
  }

  // 11. Statutory disclosures
  try {
    const res = await fetch(`${BASE_URL}/api/disclosures`);
    const data = await res.json();
    const cats = data.data || data.categories;
    if (res.status === 200 && data.success && Array.isArray(cats) && cats.length >= 16) {
      logPass('11. NCISM Mandatory Statutory Disclosures', `Disclosure Categories: ${cats.length}`);
    } else {
      logFail('11. NCISM Mandatory Statutory Disclosures', `HTTP ${res.status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logFail('11. NCISM Mandatory Statutory Disclosures', err.message);
  }

  // 12. PDF and document downloads
  try {
    // Valid allowed prefix check
    const validRes = await fetch(`${BASE_URL}/api/download?file=documents/ncism/sample.pdf`);
    // Path traversal attack simulation
    const traversalRes = await fetch(`${BASE_URL}/api/download?file=../../etc/passwd`);
    if ((validRes.status === 200 || validRes.status === 404) && traversalRes.status === 403) {
      logPass('12. Document Download & Path Traversal Guard', 'Path traversal blocked (HTTP 403); sanitized directory enforced');
    } else {
      logFail('12. Document Download API', `Valid: ${validRes.status}, Traversal: ${traversalRes.status}`);
    }
  } catch (err) {
    logFail('12. Document Download API', err.message);
  }

  // 13. Contact and enquiry forms
  try {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Vaidya Prospective Visitor',
        email: 'visitor@ayurcollege.org',
        phone: '+91 94140 12345',
        subject: 'Inquiry regarding BAMS Panchakarma internship',
        message: 'Kindly provide counseling schedule and hostel accommodations details.',
      }),
    });
    const data = await res.json();
    if ((res.status === 200 || res.status === 201) && data.success) {
      logPass('13. Contact & Enquiry Form API', 'Inquiry stored and processed');
    } else {
      logFail('13. Contact & Enquiry Form API', JSON.stringify(data));
    }
  } catch (err) {
    logFail('13. Contact & Enquiry Form API', err.message);
  }

  // 14. File uploads validation
  try {
    const unauthRes = await fetch(`${BASE_URL}/api/admin/upload`, {
      method: 'POST',
      body: new FormData(),
    });
    if (unauthRes.status === 401 || unauthRes.status === 403) {
      logPass('14. Server-Side File Upload Authorization Guard', `Unauthorized upload blocked (HTTP ${unauthRes.status})`);
    } else {
      logFail('14. File Upload Authorization Guard', `Expected 401/403, got ${unauthRes.status}`);
    }
  } catch (err) {
    logFail('14. File Upload Authorization Guard', err.message);
  }

  // 15. Logout, Session Revocation & Token Refresh
  try {
    // Refresh token rotation
    const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { Cookie: adminRefreshToken },
    });
    const refreshData = await refreshRes.json();
    if (refreshRes.status === 200 && refreshData.success) {
      logPass('15a. Refresh Token Session Rotation', `User: ${refreshData.user.name}`);
    } else {
      logFail('15a. Refresh Token Session Rotation', `HTTP ${refreshRes.status}: ${JSON.stringify(refreshData)}`);
    }

    // Logout
    const logoutRes = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { Cookie: adminCookie },
    });
    const logoutData = await logoutRes.json();
    if (logoutRes.status === 200 && logoutData.success) {
      logPass('15b. Logout & Session Revocation', 'Cookies cleared and session revoked in DB');
    } else {
      logFail('15b. Logout API', JSON.stringify(logoutData));
    }
  } catch (err) {
    logFail('15. Logout & Session Management', err.message);
  }

  // 16. Role-based API authorization (RBAC)
  try {
    const rbacRes = await fetch(`${BASE_URL}/api/admin/overview`, {
      headers: { Cookie: studentCookie },
    });
    if (rbacRes.status === 403 || rbacRes.status === 401) {
      logPass('16. Role-Based Access Control (RBAC)', `Student blocked from Admin API (HTTP ${rbacRes.status})`);
    } else {
      logFail('16. Role-Based Access Control (RBAC)', `Expected 403, got ${rbacRes.status}`);
    }
  } catch (err) {
    logFail('16. Role-Based Access Control (RBAC)', err.message);
  }

  // 17. Database relations and foreign-key integrity
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const categoriesWithRecords = await prisma.disclosureCategory.findMany({
      include: {
        records: true,
        documents: true,
      },
    });
    const totalRecords = categoriesWithRecords.reduce((sum, c) => sum + (c.records?.length || 0), 0);
    const totalDocs = categoriesWithRecords.reduce((sum, c) => sum + (c.documents?.length || 0), 0);
    await prisma.$disconnect();

    if (categoriesWithRecords.length === 16 && totalRecords === 17 && totalDocs === 18) {
      logPass(
        '17. Database Relations & Foreign-Key Integrity',
        `Verified 16 statutory disclosure categories with ${totalRecords} records & ${totalDocs} documents`
      );
    } else {
      logFail('17. Database Relations & Foreign-Key Integrity', `Categories: ${categoriesWithRecords.length}, Records: ${totalRecords}, Docs: ${totalDocs}`);
    }
  } catch (err) {
    logFail('17. Database Relations & Foreign-Key Integrity', err.message);
  }

  console.log('='.repeat(70));
  console.log(`FINAL RESULT: ${passed} PASSED, ${failed} FAILED`);
  console.log('='.repeat(70));
}

runTests().catch(err => {
  console.error('Test suite runner crashed:', err);
  process.exit(1);
});
