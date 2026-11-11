import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const REAL_PHOTOS = [
  {
    title: 'Technology Park Campus & Main Academic Block',
    category: 'Campus',
    imageUrl: '/images/campus-real/colleg_photo1.jpg',
    caption: 'Front facade of the multi-storey academic and administrative complex situated at Technology Park, Sewar, Bharatpur.',
    order: 1,
  },
  {
    title: 'Instructional Wing & Campus Facade',
    category: 'Campus',
    imageUrl: '/images/campus-real/shddhomepage.jpg',
    caption: 'Modern collegiate architecture accommodating lecture theaters, analytical laboratories, and seminar halls.',
    order: 2,
  },
  {
    title: 'Central Academic Quadrangle & Gardens',
    category: 'Campus',
    imageUrl: '/images/campus-real/banner2(1).jpg',
    caption: 'Lush botanical landscaping and landscaped open grounds designed according to Vastu Vidya principles.',
    order: 3,
  },
  {
    title: 'Institutional Entrance Gate & Grand Driveway',
    category: 'Campus',
    imageUrl: '/images/campus-real/img-20250121-wa0023.jpg',
    caption: 'Main campus portal accessible from the Agra-Jaipur Highway (NH-11 / NH-21).',
    order: 4,
  },
  {
    title: 'Academic Block & Lecture Complex',
    category: 'Campus',
    imageUrl: '/images/campus-real/img-20250121-wa00281.jpg',
    caption: 'Well-ventilated academic wings providing a focused and disciplined pedagogical learning environment.',
    order: 5,
  },
  {
    title: 'Administrative Directorate & Entrance Plaza',
    category: 'Campus',
    imageUrl: '/images/campus-real/img_20241019_130606.jpg',
    caption: 'Administrative reception, dean chambers, and admissions facilitation center.',
    order: 6,
  },
  {
    title: 'Free Ayurvedic Diagnosis & Medical Camp',
    category: 'Hospital',
    imageUrl: '/images/campus-real/img-20171201-wa0087_gfgfg.jpg',
    caption: 'Faculty Vaidyas and intern scholars conducting community health outreach and pulse diagnosis.',
    order: 7,
  },
  {
    title: 'Community Health Outreach & Medicine Distribution',
    category: 'Hospital',
    imageUrl: '/images/campus-real/whatsapp_image_2022-04-01_at_10_45_06_jpeg.jpg',
    caption: 'Providing free authentic Ayurvedic remedies and geriatric consultation to rural populations.',
    order: 8,
  },
  {
    title: 'Attached Hospital Clinical Inpatient Ward',
    category: 'Hospital',
    imageUrl: '/images/campus-real/img_20241019_160610.jpg',
    caption: 'Specialized IPD patient ward supporting round-the-clock clinical bedside care.',
    order: 9,
  },
  {
    title: 'Specialty Clinical Consultation Gathering',
    category: 'Hospital',
    imageUrl: '/images/campus-real/img_20241115_170818.jpg',
    caption: 'Senior clinical professors supervising patient examinations across Kayachikitsa and Shalya Tantra.',
    order: 10,
  },
  {
    title: 'ICT Smart Classroom & Digital Recording Studio',
    category: 'Academics',
    imageUrl: '/images/campus-real/whatsapp_image_2025-09-01_at_15_01_46_95afe1d9.jpg',
    caption: 'Smart interactive classrooms equipped with audiovisual lecture capture systems.',
    order: 11,
  },
  {
    title: 'Modern High-Speed Computer & ICT Laboratory',
    category: 'Academics',
    imageUrl: '/images/campus-real/whatsapp_image_2025-09-01_at_13_36_30_9c58320d.jpg',
    caption: 'Digital computing facility with high-speed internet and DELNET library access for research.',
    order: 12,
  },
  {
    title: 'Digital Computing Workstations & E-Learning',
    category: 'Academics',
    imageUrl: '/images/campus-real/whatsapp_image_2025-09-01_at_13_36_29_955b5c94.jpg',
    caption: 'Providing computer literacy, biostatistics processing, and digital manuscript exploration.',
    order: 13,
  },
  {
    title: 'Dravyaguna & Pharmacognosy Science Laboratory',
    category: 'Academics',
    imageUrl: '/images/campus-real/gallery_(4).jpg',
    caption: 'Equipped with binocular compound microscopes, botanical specimens, and chemical reagents.',
    order: 14,
  },
  {
    title: 'Analytical Herbarium & Pharmacognostical Lab',
    category: 'Academics',
    imageUrl: '/images/campus-real/gallery_(5).jpg',
    caption: 'Practical analysis of crude raw drugs, barks, seeds, and classical formulation standardization.',
    order: 15,
  },
  {
    title: 'Classical Swasthavritta & Yoga Morning Session',
    category: 'Events',
    imageUrl: '/images/campus-real/gallery_(1).jpg',
    caption: 'Scholars performing daily Pranayama, Surya Namaskar, and therapeutic asanas in the campus gardens.',
    order: 16,
  },
  {
    title: 'Charak Vatika Medicinal Tree Plantation Drive',
    category: 'Herbal Garden',
    imageUrl: '/images/campus-real/gallery_(2).jpg',
    caption: 'Students cultivating sacred and rare medicinal trees including Neem, Ashoka, Haritaki, and Amalaki.',
    order: 17,
  },
  {
    title: 'Annual Campus Sports Meet & Athletic Championship',
    category: 'Events',
    imageUrl: '/images/campus-real/gallery_(6).jpg',
    caption: 'Fostering physical vitality, coordination, and team sportsmanship among students.',
    order: 18,
  },
  {
    title: 'Traditional Kabaddi Tournament Championship',
    category: 'Events',
    imageUrl: '/images/campus-real/gallery_(10).jpg',
    caption: 'Competitive rural and traditional sports meet highlighting stamina and agile team play.',
    order: 19,
  },
  {
    title: 'Annual Institutional Cricket Tournament',
    category: 'Events',
    imageUrl: '/images/campus-real/gallery_(11).jpg',
    caption: 'Inter-batch cricket tournament held at the campus main sports ground.',
    order: 20,
  },
  {
    title: 'Hon’ble Governor of Rajasthan Shri Haribhau Bagde Campus Visit',
    category: 'Events',
    imageUrl: '/images/campus-real/haribhauBagde.jpg',
    caption: 'Hon’ble Governor addressing the faculty and blessing the institutional healthcare mission.',
    order: 21,
  },
  {
    title: 'Chairman Shri Hari Dutt Sharma Presiding at Annual Function',
    category: 'Events',
    imageUrl: '/images/campus-real/chairman.jpg',
    caption: 'Founder & Chairman delivering institutional address on value-based education and Ayurvedic excellence.',
    order: 22,
  },
  {
    title: 'Institutional Faculty & Academic Directorate Group',
    category: 'Academics',
    imageUrl: '/images/campus-real/group_photo.jpg',
    caption: 'Eminent professors, Ayurvedic clinicians, and senior department heads.',
    order: 23,
  },
  {
    title: 'Campus Central Auditorium & Scientific Seminar',
    category: 'Events',
    imageUrl: '/images/campus-real/img-20250121-wa0018.jpg',
    caption: 'Gathering of scholars and delegates during state-level scientific seminar.',
    order: 24,
  },
];

const REAL_VIDEOS = [
  {
    title: 'Shri Haridutt College & Technology Park Campus Documentary',
    category: 'Video',
    imageUrl: 'https://www.youtube.com/embed/N4w1a5PSjCg',
    caption: 'Comprehensive documentary highlighting the campus facilities, academic blocks, lush green environment, and infrastructure at Technology Park, Sewar, Bharatpur.',
    order: 1,
  },
  {
    title: 'Technology Park Academic Infrastructure & Green Campus Tour',
    category: 'Video',
    imageUrl: 'https://www.youtube.com/embed/YxR2E7TWGJM',
    caption: 'Aerial views and architectural walkthrough of the modern institutional complex.',
    order: 2,
  },
  {
    title: 'Classical Yoga & Asana Demonstration at Technology Park',
    category: 'Video',
    imageUrl: 'https://www.youtube.com/embed/wcF1hI1VQtU',
    caption: 'Demonstration of authentic Yogic postures, Pranayama, and meditative discipline reflecting Swasthavritta principles.',
    order: 3,
  },
  {
    title: 'Community Health Awareness & Road Safety Campaign',
    category: 'Video',
    imageUrl: 'https://www.youtube.com/embed/AjNZvDV9fAs',
    caption: 'Social outreach, public safety education, and civic responsibility initiatives led by campus scholars.',
    order: 4,
  },
  {
    title: 'Annual Inter-Institutional Sports Meet & Traditional Kabaddi Match',
    category: 'Video',
    imageUrl: 'https://www.youtube.com/embed/DhJuZiKfxP4',
    caption: 'Thrilling traditional Kabaddi match showing vigorous student participation and sportsmanship.',
    order: 5,
  },
  {
    title: 'Annual Institutional Cricket Cup at Campus Grounds',
    category: 'Video',
    imageUrl: 'https://www.youtube.com/embed/fHWpWOMDg8c',
    caption: 'Action-packed final cricket match of the annual campus athletic tournament.',
    order: 6,
  },
  {
    title: 'Vedic Cultural & Social Drama Performance at Campus Auditorium',
    category: 'Video',
    imageUrl: 'https://www.youtube.com/embed/7x2wowT4PNc',
    caption: 'Students performing the poignant cultural drama "Khaandaan", fostering moral ethos and dramatic arts.',
    order: 7,
  },
  {
    title: 'Educational Evaluation & Academic Orientation Lecture',
    category: 'Video',
    imageUrl: 'https://www.youtube.com/embed/PTtttnJV6mk',
    caption: 'Faculty development and student orientation on modern academic evaluation and scientific pedagogy.',
    order: 8,
  },
];

async function main() {
  console.log('Seeding Real Institutional Photos...');
  for (const photo of REAL_PHOTOS) {
    const existing = await prisma.galleryItem.findFirst({
      where: {
        OR: [
          { imageUrl: photo.imageUrl },
          { title: photo.title }
        ]
      }
    });

    if (existing) {
      await prisma.galleryItem.update({
        where: { id: existing.id },
        data: photo
      });
      console.log(`Updated photo: ${photo.title}`);
    } else {
      await prisma.galleryItem.create({
        data: {
          ...photo,
          isPublished: true
        }
      });
      console.log(`Created photo: ${photo.title}`);
    }
  }

  console.log('\nSeeding Real Institutional Videos...');
  for (const vid of REAL_VIDEOS) {
    const existing = await prisma.galleryItem.findFirst({
      where: {
        OR: [
          { imageUrl: vid.imageUrl },
          { title: vid.title }
        ]
      }
    });

    if (existing) {
      await prisma.galleryItem.update({
        where: { id: existing.id },
        data: vid
      });
      console.log(`Updated video: ${vid.title}`);
    } else {
      await prisma.galleryItem.create({
        data: {
          ...vid,
          isPublished: true
        }
      });
      console.log(`Created video: ${vid.title}`);
    }
  }

  // Update Settings with verified details
  await prisma.websiteSetting.upsert({
    where: { key: 'parent_society' },
    update: { value: 'Saraswati Shiksha Samiti, Bharatpur (Registered Society)' },
    create: { key: 'parent_society', value: 'Saraswati Shiksha Samiti, Bharatpur (Registered Society)' }
  });

  await prisma.websiteSetting.upsert({
    where: { key: 'chairman_name' },
    update: { value: 'Shri Hari Dutt Sharma' },
    create: { key: 'chairman_name', value: 'Shri Hari Dutt Sharma' }
  });

  await prisma.websiteSetting.upsert({
    where: { key: 'chairman_photo' },
    update: { value: '/images/campus-real/chairman.jpg' },
    create: { key: 'chairman_photo', value: '/images/campus-real/chairman.jpg' }
  });

  const totalPhotos = await prisma.galleryItem.count({ where: { category: { not: 'Video' } } });
  const totalVideos = await prisma.galleryItem.count({ where: { category: 'Video' } });

  console.log(`\nDONE! Database now has ${totalPhotos} photos and ${totalVideos} videos.`);
  await prisma.$disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
