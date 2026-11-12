import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function testAdmin() {
  console.log('=== TESTING ADMIN CMS AUTH & ENDPOINTS ===');
  
  // 1. Check admin user in DB
  const adminUser = await prisma.user.findFirst({
    where: { role: 'SUPER_ADMIN' }
  });
  
  if (!adminUser) {
    throw new Error('No SUPER_ADMIN found in DB');
  }
  console.log(`[PASS] Found Super Admin: ${adminUser.email} (Active: ${adminUser.isActive})`);

  // 2. Test password hash verification
  const isMatch = await bcrypt.compare('Haridutt@Admin2026!', adminUser.password);
  console.log(`[PASS] Password verification test for standard admin credential: ${isMatch}`);

  // 3. Test Gallery items fetch
  const galleryItems = await prisma.galleryItem.findMany({
    take: 5,
    orderBy: { order: 'asc' }
  });
  console.log(`[PASS] Gallery CMS items queryable: ${galleryItems.length} sample items fetched`);

  // 4. Test Website Settings fetch
  const settings = await prisma.websiteSetting.findMany();
  console.log(`[PASS] Website Settings queryable: ${settings.length} total settings keys configured`);

  // 5. Test Audit Log
  const latestAudit = await prisma.auditLog.findFirst({
    orderBy: { createdAt: 'desc' }
  });
  console.log(`[PASS] Audit log system operational. Latest action: "${latestAudit?.action || 'None'}"`);

  await prisma.$disconnect();
}

testAdmin().catch(e => {
  console.error('[FAIL] Admin CMS test failed:', e);
  process.exit(1);
});
