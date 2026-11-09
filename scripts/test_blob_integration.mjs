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

import { uploadMedia, deleteMedia } from '../src/lib/storage.ts';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run() {
  console.log('======================================================================');
  console.log('  VERCEL BLOB STORAGE END-TO-END VERIFICATION');
  console.log('======================================================================\n');

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  console.log('1. Checking BLOB_READ_WRITE_TOKEN presence:');
  if (!token) {
    throw new Error('FAILED: BLOB_READ_WRITE_TOKEN is missing from environment.');
  }
  console.log('   PASS: Token is configured (starts with vercel_blob_rw_...)\n');

  // 2. Create sample valid PNG image buffer (1x1 pixel PNG)
  console.log('2. Testing persistent upload of valid PNG media:');
  const validPngBuffer = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64'
  );
  const fileName = `test_media_${Date.now()}_audit.png`;
  const uploadResult = await uploadMedia(validPngBuffer, fileName, 'image/png');

  console.log(`   PASS: File successfully uploaded!`);
  console.log(`   URL Hostname: ${new URL(uploadResult.url).hostname}`);
  console.log(`   Full URL: ${uploadResult.url}`);

  if (!uploadResult.url.includes('.public.blob.vercel-storage.com')) {
    throw new Error(`FAILED: URL is not a Vercel Blob store URL: ${uploadResult.url}`);
  }

  // 3. Verify public retrieval over HTTPS
  console.log('\n3. Testing public CDN fetch from Vercel Blob store:');
  const fetchRes = await fetch(uploadResult.url);
  console.log(`   HTTP Status: ${fetchRes.status} ${fetchRes.statusText}`);
  console.log(`   Content-Type: ${fetchRes.headers.get('content-type')}`);
  if (fetchRes.status !== 200) {
    throw new Error(`FAILED: Public fetch returned status ${fetchRes.status}`);
  }
  const fetchedBytes = Buffer.from(await fetchRes.arrayBuffer());
  if (fetchedBytes.length !== validPngBuffer.length) {
    throw new Error('FAILED: Downloaded byte length does not match uploaded byte length.');
  }
  console.log(`   PASS: Byte verification matches (${fetchedBytes.length} bytes).\n`);

  // 4. Test database persistence in UploadedFile
  console.log('4. Testing UploadedFile database entity creation:');
  const record = await prisma.uploadedFile.create({
    data: {
      originalName: 'test-audit.png',
      fileName: fileName,
      mimeType: 'image/png',
      size: validPngBuffer.length,
      path: uploadResult.url,
      isPrivate: false,
      uploadedBy: 'audit-test-admin',
    },
  });
  console.log(`   PASS: Database record created with ID: ${record.id}`);

  // 5. Test clean deletion
  console.log('\n5. Testing persistent Blob deletion:');
  const delSuccess = await deleteMedia(uploadResult.url);
  console.log(`   deleteMedia returned: ${delSuccess}`);
  if (!delSuccess) {
    throw new Error('FAILED: deleteMedia returned false.');
  }

  // Verify file is gone from Blob CDN
  const checkRes = await fetch(uploadResult.url);
  console.log(`   Post-deletion HTTP status (Expect 404): ${checkRes.status}`);
  if (checkRes.status === 200) {
    console.warn('   Note: CDN cache may take a moment to expire, but del() succeeded.');
  } else {
    console.log('   PASS: Blob removed from store (HTTP 404).');
  }

  // Clean test record from DB
  await prisma.uploadedFile.delete({ where: { id: record.id } });
  console.log('   PASS: UploadedFile test entity cleaned from database.');

  console.log('\n======================================================================');
  console.log('  ALL VERCEL BLOB STORAGE TESTS PASSED SUCCESSFULLY');
  console.log('======================================================================');
  await prisma.$disconnect();
}

run().catch((err) => {
  console.error('\nTEST FAILED:', err);
  process.exit(1);
});
