import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'haridutt-ayurveda-jwt-secret-key-2026-production';

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✔ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ✖ FAIL: ${testName}`);
    failed++;
  }
}

async function runTests() {
  console.log('\n======================================================');
  console.log('  SHRI HARIDUTT AYURVEDIC MEDICAL COLLEGE & HOSPITAL');
  console.log('  AUTOMATED END-TO-END SYSTEM INTEGRATION TEST SUITE');
  console.log('======================================================\n');

  // TEST SUITE 1: DATABASE INTEGRITY & CORE TABLES
  console.log('--- SUITE 1: DATABASE INTEGRITY & SEEDED DATA ---');
  try {
    const userCount = await prisma.user.count();
    assert(userCount >= 4, `Admin & Faculty Users seeded (found: ${userCount})`);

    const studentCount = await prisma.student.count();
    assert(studentCount >= 1, `Student accounts present (found: ${studentCount})`);

    const courseCount = await prisma.course.count();
    assert(courseCount >= 1, `Academic courses registered (found: ${courseCount})`);

    const facultyCount = await prisma.faculty.count();
    assert(facultyCount >= 4, `Faculty directory records (found: ${facultyCount})`);

    const noticeCount = await prisma.notice.count();
    assert(noticeCount >= 3, `Official circulars published (found: ${noticeCount})`);

    const galleryCount = await prisma.galleryItem.count();
    assert(galleryCount >= 4, `Campus gallery items (found: ${galleryCount})`);

    const researchCount = await prisma.researchPublication.count();
    assert(researchCount >= 2, `Research publications registered (found: ${researchCount})`);
  } catch (err) {
    console.error('Suite 1 error:', err);
    failed++;
  }

  // TEST SUITE 2: AUTHENTICATION & ACCESS CONTROL
  console.log('\n--- SUITE 2: AUTHENTICATION & ACCESS CONTROL ---');
  try {
    const admin = await prisma.user.findUnique({ where: { email: 'admin@hariduttayurveda.edu.in' } });
    assert(admin !== null, 'Super Admin user found');

    const adminPwMatch = await bcrypt.compare('Admin@123', admin.password);
    assert(adminPwMatch, 'Admin password hash verified via bcrypt');

    const student = await prisma.student.findUnique({ where: { studentId: 'SHAMC-2025-014' } });
    assert(student !== null, 'Scholar SHAMC-2025-014 found');

    const studentPwMatch = await bcrypt.compare('Student@123', student.password);
    assert(studentPwMatch, 'Scholar password hash verified via bcrypt');

    // JWT sign & verify
    const token = jwt.sign({ id: admin.id, role: admin.role, type: 'ADMIN' }, JWT_SECRET, { expiresIn: '7d' });
    const decoded = jwt.verify(token, JWT_SECRET);
    assert(decoded.id === admin.id && decoded.role === 'SUPER_ADMIN', 'JWT creation and cryptographic verification verified');
  } catch (err) {
    console.error('Suite 2 error:', err);
    failed++;
  }

  // TEST SUITE 3: ADMISSION APPLICATION & ENCRYPTION DOSSIER
  console.log('\n--- SUITE 3: ADMISSION APPLICATION & DOCUMENT WORKFLOW ---');
  let testAppId = null;
  const testRef = `TEST-E2E-${Date.now().toString().slice(-4)}`;
  const testEmail = `test.scholar.${Date.now()}@example.com`;

  try {
    const testApp = await prisma.admissionApplication.create({
      data: {
        applicationNumber: testRef,
        fullName: 'Test Candidate E2E',
        fatherName: 'Guardian Name',
        motherName: 'Mother Name',
        dob: '2005-02-14',
        gender: 'Female',
        email: testEmail,
        phone: '+91 99999 11111',
        category: 'OBC',
        neetRollNo: '2609999999',
        neetScore: 560,
        neetRank: 38200,
        previousSchool: 'National Academy',
        qualification: '10+2 (PCB)',
        marksPercentage: 89.5,
        courseCode: 'BAMS',
        address: 'Test Colony',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302001',
        status: 'SUBMITTED',
        documents: {
          create: [
            {
              documentType: 'NEET_SCORECARD',
              fileName: 'doc_test_neet.pdf',
              originalName: 'NEET_Scorecard_2026.pdf',
              mimeType: 'application/pdf',
              fileSize: 412000,
              storagePath: 'doc_test_neet.pdf',
            },
            {
              documentType: '12TH_MARKSHEET',
              fileName: 'doc_test_12th.pdf',
              originalName: '12th_PCB_Marksheet.pdf',
              mimeType: 'application/pdf',
              fileSize: 520000,
              storagePath: 'doc_test_12th.pdf',
            },
          ],
        },
      },
      include: { documents: true },
    });

    testAppId = testApp.id;
    assert(testApp.applicationNumber === testRef, `Application created with Ref #${testRef}`);
    assert(testApp.documents.length === 2, `Documents relation linked correctly (${testApp.documents.length} files attached)`);

    // Verify lookup by ref
    const retrieved = await prisma.admissionApplication.findUnique({
      where: { applicationNumber: testRef },
      include: { documents: true },
    });
    assert(retrieved && retrieved.fullName === 'Test Candidate E2E', 'Application lookup by reference number');

    // Update status to UNDER_REVIEW
    const updated = await prisma.admissionApplication.update({
      where: { id: testAppId },
      data: { status: 'UNDER_REVIEW', adminNotes: 'Verified against NCISM NEET merit database.' },
    });
    assert(updated.status === 'UNDER_REVIEW', 'Status updated to UNDER_REVIEW');
    assert(updated.adminNotes?.includes('NCISM'), 'Admin committee note saved');
  } catch (err) {
    console.error('Suite 3 error:', err);
    failed++;
  }

  // TEST SUITE 4: COURSE & CMS CRUD
  console.log('\n--- SUITE 4: ACADEMIC CMS & AUDIT LOGS ---');
  let testCourseId = null;
  try {
    const testCourse = await prisma.course.create({
      data: {
        code: 'E2E-AYUR',
        title: 'Fellowship in Ayurvedic Clinical Pharmacology',
        degree: 'Postgraduate Fellowship',
        duration: '1 Year',
        intake: 20,
        eligibility: 'BAMS degree with 1 year clinical internship',
        description: 'Advanced clinical formulation design',
        syllabusOverview: 'Advanced Dravyaguna & Rasashastra pharmacology',
        careerOpportunities: 'Formulation scientist, Senior clinical researcher',
        feePerYear: '₹1,50,000 / Year',
        isApproved: true,
      },
    });
    testCourseId = testCourse.id;
    assert(testCourse.code === 'E2E-AYUR', 'Course creation via Prisma CRUD');

    // Audit log verification
    const log = await prisma.auditLog.create({
      data: {
        action: 'CREATE_COURSE',
        entity: 'Course',
        entityId: testCourseId,
        details: 'E2E Automated test course creation',
      },
    });
    assert(log.id !== null, 'Security audit log persisted in database');
  } catch (err) {
    console.error('Suite 4 error:', err);
    failed++;
  }

  // CLEANUP SYNTHETIC TEST RECORDS
  console.log('\n--- CLEANUP SYNTHETIC TEST DATA ---');
  try {
    if (testAppId) {
      await prisma.admissionApplication.delete({ where: { id: testAppId } });
      console.log('  ✔ Cleaned up synthetic admission application');
    }
    if (testCourseId) {
      await prisma.course.delete({ where: { id: testCourseId } });
      console.log('  ✔ Cleaned up synthetic course record');
    }
  } catch (err) {
    console.error('Cleanup error:', err);
  }

  console.log('\n======================================================');
  console.log(`  E2E TESTS COMPLETED: ${passed} PASSED, ${failed} FAILED`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
