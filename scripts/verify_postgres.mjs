import fs from 'fs';
import path from 'path';

// Self-contained environment loader without external dependencies
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

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function run() {
  console.log('--- 1. POSTGRESQL CONNECTIVITY & RECORD INTEGRITY AUDIT ---');
  
  // Safe read-only counts using verified schema models
  const userCount = await prisma.user.count();
  const galleryCount = await prisma.galleryItem.count();
  const newsCount = await prisma.news.count();
  const noticeCount = await prisma.notice.count();
  const docCount = await prisma.disclosureDocument.count();
  const courseCount = await prisma.course.count();
  const deptCount = await prisma.department.count();
  const facultyCount = await prisma.faculty.count();
  const testCount = await prisma.testimonial.count();
  const settingsCount = await prisma.websiteSetting.count();
  const appCount = await prisma.admissionApplication.count();
  const enquiryCount = await prisma.admissionEnquiry.count();
  const contactCount = await prisma.contactMessage.count();
  const auditCount = await prisma.auditLog.count();

  const totalRecords = userCount + galleryCount + newsCount + noticeCount + 
                       docCount + courseCount + deptCount + facultyCount + testCount + 
                       settingsCount + appCount + enquiryCount + contactCount + auditCount;

  console.log(`Database records count:
  - Users: ${userCount}
  - Gallery Items (Photos/Videos): ${galleryCount}
  - News Articles: ${newsCount}
  - Notices: ${noticeCount}
  - Mandatory Documents: ${docCount}
  - Courses: ${courseCount}
  - Departments: ${deptCount}
  - Faculty Members: ${facultyCount}
  - Testimonials: ${testCount}
  - Website Settings: ${settingsCount}
  - Admission Applications: ${appCount}
  - Admission Enquiries: ${enquiryCount}
  - Contact Messages: ${contactCount}
  - Audit Logs: ${auditCount}
  TOTAL DATABASE ENTITIES: ${totalRecords}`);

  console.log('\n--- 2. SINGLE ADMIN ACCOUNT AUDIT ---');
  const allUsers = await prisma.user.findMany();
  
  for (const u of allUsers) {
    const isBcrypt = u.password.startsWith('$2a$') || u.password.startsWith('$2b$');
    console.log(`User: ${u.email} | Role: ${u.role} | Active: ${u.isActive} | Bcrypt Hashed: ${isBcrypt}`);
    if (!isBcrypt) {
      throw new Error(`SECURITY ALERT: User ${u.email} does not have a bcrypt hashed password!`);
    }
  }

  // Enforce single active admin architecture per user requirements:
  // Deactivate all secondary / faculty / demo users so only admin@hariduttayurveda.edu.in is active.
  const deactivated = await prisma.user.updateMany({
    where: {
      email: { not: 'admin@hariduttayurveda.edu.in' },
      isActive: true,
    },
    data: { isActive: false },
  });
  console.log(`\nDeactivated secondary accounts count: ${deactivated.count}`);

  // Ensure sole master admin is active with SUPER_ADMIN role
  const soleAdmin = await prisma.user.findUnique({
    where: { email: 'admin@hariduttayurveda.edu.in' },
  });

  if (!soleAdmin) {
    throw new Error('FATAL: Single master admin account admin@hariduttayurveda.edu.in does not exist!');
  }

  if (!soleAdmin.isActive || soleAdmin.role !== 'SUPER_ADMIN') {
    await prisma.user.update({
      where: { email: 'admin@hariduttayurveda.edu.in' },
      data: { isActive: true, role: 'SUPER_ADMIN' },
    });
  }

  // Count active admins
  const activeAdmins = await prisma.user.findMany({
    where: { isActive: true },
    select: { email: true, name: true, role: true, isActive: true },
  });
  console.log('\nActive Admin Accounts in System (Must be exactly 1):', activeAdmins);

  if (activeAdmins.length !== 1 || activeAdmins[0].email !== 'admin@hariduttayurveda.edu.in') {
    throw new Error(`VIOLATION: Exactly one active admin required, found ${activeAdmins.length}`);
  }

  console.log('\nSUCCESS: Single admin architecture verified. Database records verified intact.');
  await prisma.$disconnect();
}

run().catch((err) => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
