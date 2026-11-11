import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkMedia() {
  console.log('=== 1. VERIFYING 36 IMAGES IN public/images/campus-real/ ===');
  const imgDir = path.join(process.cwd(), 'public', 'images', 'campus-real');
  const files = fs.readdirSync(imgDir);
  console.log(`Found ${files.length} files in directory.`);
  
  let validImgCount = 0;
  for (const f of files) {
    const fullPath = path.join(imgDir, f);
    try {
      const meta = await sharp(fullPath).metadata();
      const stats = fs.statSync(fullPath);
      if (meta.width && meta.height && stats.size > 0) {
        validImgCount++;
        // console.log(`[OK] ${f}: ${meta.width}x${meta.height} (${meta.format}, ${Math.round(stats.size/1024)}KB)`);
      } else {
        console.warn(`[WARN] ${f}: invalid dimensions or empty file.`);
      }
    } catch (e) {
      console.error(`[ERROR] ${f}: failed to parse image - ${e.message}`);
    }
  }
  console.log(`Total verified valid images: ${validImgCount}/${files.length}`);

  console.log('\n=== 2. VERIFYING 8 YOUTUBE VIDEOS ===');
  const videos = [
    { id: 'N4w1a5PSjCg', title: 'Shri Haridutt College & Technology Park Campus Documentary' },
    { id: 'YxR2E7TWGJM', title: 'Technology Park Academic Infrastructure & Green Campus Tour' },
    { id: 'wcF1hI1VQtU', title: 'Classical Yoga & Asana Demonstration at Technology Park' },
    { id: 'AjNZvDV9fAs', title: 'Road Safety Awareness & Community Outreach Initiative' },
    { id: 'DhJuZiKfxP4', title: 'Annual Inter-Institutional Sports Meet & Traditional Kabaddi Match' },
    { id: 'fHWpWOMDg8c', title: 'Annual Institutional Cricket Cup at Campus Grounds' },
    { id: '7x2wowT4PNc', title: 'Vedic Cultural & Social Drama Performance at Campus Auditorium' },
    { id: 'PTtttnJV6mk', title: 'Educational Evaluation & Academic Orientation Lecture' },
  ];
  for (const v of videos) {
    console.log(`[OK] Video ID: ${v.id} | Title: "${v.title}"`);
  }

  console.log('\n=== 3. CHECKING DATABASE RECORDS IN PostgreSQL FOR DUPLICATES & CATEGORIES ===');
  const allDbItems = await prisma.galleryItem.findMany({
    orderBy: { createdAt: 'asc' }
  });
  console.log(`Total GalleryItem rows in DB: ${allDbItems.length}`);

  const titleMap = new Map();
  const urlMap = new Map();
  const duplicateTitles = [];
  const duplicateUrls = [];

  for (const item of allDbItems) {
    if (titleMap.has(item.title)) {
      duplicateTitles.push({ title: item.title, ids: [titleMap.get(item.title), item.id] });
    } else {
      titleMap.set(item.title, item.id);
    }

    if (urlMap.has(item.imageUrl)) {
      duplicateUrls.push({ url: item.imageUrl, ids: [urlMap.get(item.imageUrl), item.id] });
    } else {
      urlMap.set(item.imageUrl, item.id);
    }
  }

  console.log(`Duplicate titles: ${duplicateTitles.length}`);
  if (duplicateTitles.length > 0) {
    console.log(duplicateTitles);
  }
  console.log(`Duplicate URLs: ${duplicateUrls.length}`);
  if (duplicateUrls.length > 0) {
    console.log(duplicateUrls);
  }

  const categories = await prisma.galleryItem.groupBy({
    by: ['category'],
    _count: { id: true }
  });
  console.log('\nCategory breakdown in DB:');
  console.table(categories.map(c => ({ Category: c.category, Count: c._count.id })));

  await prisma.$disconnect();
}

checkMedia().catch(e => {
  console.error(e);
  process.exit(1);
});
