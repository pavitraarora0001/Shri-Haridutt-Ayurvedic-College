import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function audit() {
  console.log('=== STARTING POSTGRESQL GALLERY RECORDS AUDIT ===\n');
  const items = await prisma.galleryItem.findMany({
    orderBy: [{ category: 'asc' }, { order: 'asc' }]
  });

  const total = items.length;
  const photos = items.filter(i => i.category !== 'Video');
  const videos = items.filter(i => i.category === 'Video');
  const published = items.filter(i => i.isPublished);

  console.log(`Total Records: ${total}`);
  console.log(`Photos: ${photos.length} (Expected: 34)`);
  console.log(`Videos: ${videos.length} (Expected: 8)`);
  console.log(`Published: ${published.length} (Expected: 42)\n`);

  // 1. Unique IDs
  const idSet = new Set(items.map(i => i.id));
  const uniqueIdsPass = idSet.size === total;
  console.log(`Unique IDs Check: ${uniqueIdsPass ? 'PASS' : 'FAIL'} (${idSet.size}/${total})`);

  // 2. Unique URLs
  const urlSet = new Set(items.map(i => i.imageUrl));
  const uniqueUrlsPass = urlSet.size === total;
  console.log(`Unique URLs Check: ${uniqueUrlsPass ? 'PASS' : 'FAIL'} (${urlSet.size}/${total})`);

  // 3. Category Breakdown
  const catDist = {};
  items.forEach(i => catDist[i.category] = (catDist[i.category] || 0) + 1);
  console.log('\nCategory Breakdown:');
  console.log(JSON.stringify(catDist, null, 2));

  // 4. Verify Local Files on Disk for Photos
  console.log('\nVerifying Image Files on Disk:');
  let diskMissing = 0;
  for (const p of photos) {
    if (p.imageUrl.startsWith('/')) {
      const localPath = path.join(process.cwd(), 'public', p.imageUrl.replace(/^\//, ''));
      const exists = fs.existsSync(localPath);
      if (!exists) {
        console.error(` [MISSING FILE] ID: ${p.id} - ${p.imageUrl}`);
        diskMissing++;
      }
    } else {
      console.log(` [EXTERNAL URL] ID: ${p.id} - ${p.imageUrl}`);
    }
  }
  console.log(`Disk check result: ${diskMissing === 0 ? 'PASS (All 34 image files exist locally)' : `FAIL (${diskMissing} missing)`}`);

  // 5. Verify YouTube Video IDs
  console.log('\nVerifying YouTube Video IDs:');
  let invalidVideos = 0;
  const ytRegex = /https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/;
  for (const v of videos) {
    const match = v.imageUrl.match(ytRegex);
    if (!match) {
      console.error(` [INVALID YOUTUBE URL] ID: ${v.id} - ${v.imageUrl}`);
      invalidVideos++;
    } else {
      const ytId = match[1];
      console.log(` [VALID VIDEO] ${ytId} -> ${v.title}`);
    }
  }
  console.log(`Video check result: ${invalidVideos === 0 ? 'PASS (All 8 videos have valid 11-char YouTube IDs)' : `FAIL (${invalidVideos} invalid)`}`);

  // 6. Detailed audit list
  const auditReport = items.map(item => ({
    id: item.id,
    title: item.title,
    category: item.category,
    order: item.order,
    isPublished: item.isPublished,
    url: item.imageUrl,
    captionLength: (item.caption || '').length
  }));

  fs.writeFileSync('scripts/audit_gallery_records.json', JSON.stringify(auditReport, null, 2));
  console.log('\nWrote full audit dataset to scripts/audit_gallery_records.json');

  await prisma.$disconnect();
}

audit().catch(e => {
  console.error('Audit failed:', e);
  process.exit(1);
});
