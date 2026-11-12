import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  const items = await prisma.galleryItem.findMany();
  console.log('Total items in galleryItem table:', items.length);
  const categories = {};
  items.forEach(i => {
    categories[i.category] = (categories[i.category] || 0) + 1;
  });
  console.log('Categories breakdown:', categories);
  console.log('\nVideos in DB:');
  items.filter(i => i.category === 'Video').forEach(v => {
    console.log(` - ${v.title} -> ${v.imageUrl}`);
  });
  console.log('\nPhotos in DB:');
  items.filter(i => i.category !== 'Video').forEach(p => {
    console.log(` - [${p.category}] ${p.title} -> ${p.imageUrl}`);
  });
  await prisma.$disconnect();
}

run();
