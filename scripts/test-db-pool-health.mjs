import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function testPool() {
  console.log('=== TESTING DATABASE CONNECTION POOL HEALTH ===');
  
  const startTime = Date.now();
  // Run 10 parallel queries to test pool concurrency
  const queries = Array.from({ length: 10 }, (_, i) => 
    prisma.websiteSetting.findFirst({ select: { key: true, value: true } })
  );

  const results = await Promise.all(queries);
  const duration = Date.now() - startTime;

  console.log(`Successfully completed 10 concurrent queries in ${duration}ms.`);
  console.log('Sample result:', results[0]);
  
  // Test raw pg stat if available or simple count
  const userCount = await prisma.user.count();
  const settingsCount = await prisma.websiteSetting.count();
  const galleryCount = await prisma.galleryItem.count();
  console.log(`[HEALTH OK] Users: ${userCount}, Settings: ${settingsCount}, Gallery: ${galleryCount}`);

  await prisma.$disconnect();
}

testPool().catch(err => {
  console.error('[FAIL] Database pool error:', err);
  process.exit(1);
});
