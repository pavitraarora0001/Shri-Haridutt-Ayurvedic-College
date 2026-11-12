import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const ALL_REAL_PHOTOS = [
  // Campus & Architecture
  {
    title: 'Technology Park Campus & Main Academic Block',
    category: 'Campus',
    imageUrl: '/images/campus-real/colleg_photo1.jpg',
    caption: 'Front facade of the multi-storey collegiate and administrative complex at Technology Park, Sewar, Bharatpur.',
    order: 1,
  },
  {
    title: 'Instructional Wing & Campus Facade',
    category: 'Campus',
    imageUrl: '/images/campus-real/shddhomepage.jpg',
    caption: 'Collegiate academic building accommodating smart lecture halls, faculty suites, and central quadrangle.',
    order: 2,
  },
  {
    title: 'Central Academic Quadrangle & Gardens',
    category: 'Campus',
    imageUrl: '/images/campus-real/banner2(1).jpg',
    caption: 'Lush botanical gardens, flowering walkways, and open courtyards designed according to classical Vastu Vidya principles.',
    order: 3,
  },
  {
    title: 'Institutional Entrance Gate & Grand Driveway',
    category: 'Campus',
    imageUrl: '/images/campus-real/img-20250121-wa0023.jpg',
    caption: 'Grand collegiate entry portal with landscaped approach avenue connecting to NH-11 / NH-21.',
    order: 4,
  },
  {
    title: 'Academic Block & Lecture Complex',
    category: 'Campus',
    imageUrl: '/images/campus-real/img-20250121-wa00281.jpg',
    caption: 'Modern multi-tiered educational wing designed for high acoustic clarity, natural illumination, and airflow.',
    order: 5,
  },
  {
    title: 'Administrative Directorate & Entrance Plaza',
    category: 'Campus',
    imageUrl: '/images/campus-real/img_20241019_130606.jpg',
    caption: 'Central administrative building housing the office of the Chairman, Director, and Student Services.',
    order: 6,
  },
  {
    title: 'Campus Green Boulevard & Academic Pavilion',
    category: 'Campus',
    imageUrl: '/images/campus-real/whatsapp_image_2025-02-07_at_11_33_02_pm.jpeg',
    caption: 'Tree-lined central campus boulevard providing a calm, eco-friendly environment for study and reflection.',
    order: 7,
  },
  {
    title: 'Collegiate Courtyard & Assembly Ground',
    category: 'Campus',
    imageUrl: '/images/campus-real/whatsapp_image_2025-01-27_at_1_54_17_pm.jpeg',
    caption: 'Spacious central assembly quadrangle where institutional assemblies, yoga sessions, and cultural events take place.',
    order: 8,
  },

  // Hospital & Clinical
  {
    title: 'Free Ayurvedic Diagnosis & Medical Camp',
    category: 'Hospital',
    imageUrl: '/images/campus-real/img-20171201-wa0087_gfgfg.jpg',
    caption: 'Senior Ayurvedic physicians and post-graduate interns providing clinical consultations and Nadi Pariksha to rural communities.',
    order: 9,
  },
  {
    title: 'Community Health Outreach & Medicine Distribution',
    category: 'Hospital',
    imageUrl: '/images/campus-real/whatsapp_image_2022-04-01_at_10_45_06_jpeg.jpg',
    caption: 'Disbursing free classical Ayurvedic medicines, Rasayanas, and wellness guidance during community health missions.',
    order: 10,
  },
  {
    title: 'Attached Hospital Clinical Inpatient Ward',
    category: 'Hospital',
    imageUrl: '/images/campus-real/img_20241019_160610.jpg',
    caption: 'Clean, specialized IPD treatment wing equipped with dedicated nursing care and patient recovery beds.',
    order: 11,
  },
  {
    title: 'Specialty Clinical Consultation Gathering',
    category: 'Hospital',
    imageUrl: '/images/campus-real/img_20241115_170818.jpg',
    caption: 'Senior medical professors and clinical faculty discussing complex cases and patient treatment plans.',
    order: 12,
  },
  {
    title: 'Hospital Outpatient Department (OPD) Reception',
    category: 'Hospital',
    imageUrl: '/images/campus-real/img_4546.jpg',
    caption: 'Welcoming patients for specialized Kayachikitsa, Shalya Tantra, Shalakya, Kaumarbhritya, and Prasuti Tantra consultations.',
    order: 13,
  },

  // Laboratories & Academics
  {
    title: 'ICT Smart Classroom & Digital Lecture Studio',
    category: 'Academics',
    imageUrl: '/images/campus-real/whatsapp_image_2025-09-01_at_15_01_46_95afe1d9.jpg',
    caption: 'Smart interactive digital classroom equipped with high-definition projection, audio systems, and digital whiteboards.',
    order: 14,
  },
  {
    title: 'Modern High-Speed Computer & ICT Laboratory',
    category: 'Academics',
    imageUrl: '/images/campus-real/whatsapp_image_2025-09-01_at_13_36_30_9c58320d.jpg',
    caption: 'Networked workstations providing students with digital research resources, DELNET manuscript access, and e-learning portals.',
    order: 15,
  },
  {
    title: 'Digital Computing Workstations & Research Terminal',
    category: 'Academics',
    imageUrl: '/images/campus-real/whatsapp_image_2025-09-01_at_13_36_29_955b5c94.jpg',
    caption: 'Dedicated research terminals for Ayurvedic informatics, biostatistical analysis, and modern pharmaceutical documentation.',
    order: 16,
  },
  {
    title: 'Dravyaguna & Pharmacognosy Science Laboratory',
    category: 'Academics',
    imageUrl: '/images/campus-real/gallery_(4).jpg',
    caption: 'Modern analytical laboratory with binocular microscopes, authentic dry herbariums, and botanical dissection equipment.',
    order: 17,
  },
  {
    title: 'Analytical Herbarium & Pharmacognostical Lab',
    category: 'Academics',
    imageUrl: '/images/campus-real/gallery_(5).jpg',
    caption: 'Pharmacognostical testing and standardization lab for raw herbs, barks, roots, and classical herbal formulations.',
    order: 18,
  },
  {
    title: 'Central Library Reference & Reading Wing',
    category: 'Academics',
    imageUrl: '/images/campus-real/img-20250121-wa0017.jpg',
    caption: 'Spacious reading hall stocked with Samhitas, classical commentaries, reference textbooks, and modern medical journals.',
    order: 19,
  },
  {
    title: 'Advanced Anatomy Dissection & Osteology Hall',
    category: 'Academics',
    imageUrl: '/images/campus-real/img-20250121-wa0026.jpg',
    caption: 'Rachana Sharir dissection hall with anatomical models, bone sets, organ specimens, and charts for hands-on medical training.',
    order: 20,
  },
  {
    title: 'Physiology & Clinical Practical Laboratory',
    category: 'Academics',
    imageUrl: '/images/campus-real/img-20250121-wa0029.jpg',
    caption: 'Kriya Sharir laboratory for diagnostic hematology, urinalysis, and biochemical assessment.',
    order: 21,
  },
  {
    title: 'Pharmaceutical Preparation Unit (Rasa Shastra)',
    category: 'Academics',
    imageUrl: '/images/campus-real/img-20250121-wa0034.jpg',
    caption: 'Dedicated pharmacy training unit with heating hearths, pulverizers, pill-making machines, and purification apparatus.',
    order: 22,
  },

  // Herbal Garden
  {
    title: 'Charak Vatika Medicinal Tree Plantation Drive',
    category: 'Herbal Garden',
    imageUrl: '/images/campus-real/gallery_(2).jpg',
    caption: 'Faculty and student scholars planting rare and endangered Ayurvedic botanical species across the 5-acre campus conservatory.',
    order: 23,
  },

  // Student Life & Sports / Events
  {
    title: 'Classical Swasthavritta & Yoga Morning Session',
    category: 'Events',
    imageUrl: '/images/campus-real/gallery_(1).jpg',
    caption: 'Daily morning group practice of Pranayama, Surya Namaskar, and meditative asanas under certified Yoga instructors.',
    order: 24,
  },
  {
    title: 'Annual Campus Sports Meet & Athletic Championship',
    category: 'Events',
    imageUrl: '/images/campus-real/gallery_(6).jpg',
    caption: 'Inter-batch track and field competitions encouraging holistic student fitness, mental endurance, and sportsmanship.',
    order: 25,
  },
  {
    title: 'Traditional Kabaddi Tournament Championship',
    category: 'Events',
    imageUrl: '/images/campus-real/gallery_(10).jpg',
    caption: 'Thrilling inter-institutional traditional Kabaddi championship matches on the campus outdoor sports grounds.',
    order: 26,
  },
  {
    title: 'Annual Institutional Cricket Tournament',
    category: 'Events',
    imageUrl: '/images/campus-real/gallery_(11).jpg',
    caption: 'Annual collegiate cricket cup organized on the main campus athletic grounds.',
    order: 27,
  },
  {
    title: 'Hon’ble Governor of Rajasthan Shri Haribhau Bagde Campus Visit',
    category: 'Events',
    imageUrl: '/images/campus-real/haribhauBagde.jpg',
    caption: 'His Excellency the Governor of Rajasthan visiting the campus, interacting with faculty, and inspecting the healthcare facilities.',
    order: 28,
  },
  {
    title: 'Chairman Shri Hari Dutt Sharma Presiding at Annual Function',
    category: 'Events',
    imageUrl: '/images/campus-real/chairman.jpg',
    caption: 'Founder and Chairman delivering the institutional keynote address on value-based Ayurvedic education.',
    order: 29,
  },
  {
    title: 'Institutional Faculty & Academic Directorate Group',
    category: 'Academics',
    imageUrl: '/images/campus-real/group_photo.jpg',
    caption: 'Eminent professors, Ayurvedic clinical specialists, and senior faculty heads at Technology Park.',
    order: 30,
  },
  {
    title: 'Executive Leadership & Managing Committee Meeting',
    category: 'Events',
    imageUrl: '/images/campus-real/madansingh.jpeg',
    caption: 'Members of the governing trust and managing committee reviewing academic standards and institutional expansion.',
    order: 31,
  },
  {
    title: 'Academic Mentorship & Student Welfare Directorate',
    category: 'Events',
    imageUrl: '/images/campus-real/sanju_mam(1).jpeg',
    caption: 'Senior faculty mentor providing student counseling, welfare orientation, and academic guidance.',
    order: 32,
  },
  {
    title: 'State-Level Ayurveda Seminar & Academic Publication',
    category: 'Events',
    imageUrl: '/images/campus-real/news-cover.jpg',
    caption: 'Special publication release and scientific proceedings from the annual state-level Ayurvedic symposium.',
    order: 33,
  },
  {
    title: 'Campus Central Auditorium & Scientific Seminar',
    category: 'Events',
    imageUrl: '/images/campus-real/img-20250121-wa0018.jpg',
    caption: 'Large-scale scientific congregation and national seminar in the collegiate air-conditioned auditorium.',
    order: 34,
  },
];

const ALL_REAL_VIDEOS = [
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
    caption: 'Institutional road safety and public preventive healthcare campaign by faculty and students.',
    order: 4,
  },
  {
    title: 'Annual Inter-Institutional Sports Meet & Traditional Kabaddi Match',
    category: 'Video',
    imageUrl: 'https://www.youtube.com/embed/DhJuZiKfxP4',
    caption: 'Traditional sports championship match showcasing collegiate athletic spirit.',
    order: 5,
  },
  {
    title: 'Annual Institutional Cricket Cup at Campus Grounds',
    category: 'Video',
    imageUrl: 'https://www.youtube.com/embed/fHWpWOMDg8c',
    caption: 'Live highlights from the annual inter-college cricket championship.',
    order: 6,
  },
  {
    title: 'Vedic Cultural & Social Drama Performance at Campus Auditorium',
    category: 'Video',
    imageUrl: 'https://www.youtube.com/embed/7x2wowT4PNc',
    caption: 'Annual Day theatrical play "Khaandaan" presented by collegiate scholars.',
    order: 7,
  },
  {
    title: 'Educational Evaluation & Academic Orientation Lecture',
    category: 'Video',
    imageUrl: 'https://www.youtube.com/embed/PTtttnJV6mk',
    caption: 'Comprehensive faculty and student development seminar on curriculum pedagogy and classical Ayurvedic teaching methodology.',
    order: 8,
  },
];

async function sync() {
  console.log('--- Synchronizing All Real Media from shddcbpr.org ---');
  
  // 1. Clean out any Unsplash or test entries
  const deleted = await prisma.galleryItem.deleteMany({
    where: {
      OR: [
        { imageUrl: { contains: 'unsplash' } },
        { title: { equals: 'hello' } },
      ]
    }
  });
  console.log(`Removed ${deleted.count} legacy placeholder/test entries.`);

  // 2. Upsert all 34 real photos
  let photosAdded = 0;
  for (const p of ALL_REAL_PHOTOS) {
    const existing = await prisma.galleryItem.findFirst({
      where: { imageUrl: p.imageUrl }
    });
    if (existing) {
      await prisma.galleryItem.update({
        where: { id: existing.id },
        data: {
          title: p.title,
          category: p.category,
          caption: p.caption,
          order: p.order,
        }
      });
    } else {
      await prisma.galleryItem.create({
        data: {
          title: p.title,
          category: p.category,
          imageUrl: p.imageUrl,
          caption: p.caption,
          order: p.order,
        }
      });
      photosAdded++;
    }
  }
  console.log(`Photos synced: 34 (new added: ${photosAdded})`);

  // 3. Upsert all 8 real videos
  let videosAdded = 0;
  for (const v of ALL_REAL_VIDEOS) {
    const existing = await prisma.galleryItem.findFirst({
      where: { imageUrl: v.imageUrl }
    });
    if (existing) {
      await prisma.galleryItem.update({
        where: { id: existing.id },
        data: {
          title: v.title,
          category: v.category,
          caption: v.caption,
          order: v.order,
        }
      });
    } else {
      await prisma.galleryItem.create({
        data: {
          title: v.title,
          category: v.category,
          imageUrl: v.imageUrl,
          caption: v.caption,
          order: v.order,
        }
      });
      videosAdded++;
    }
  }
  console.log(`Videos synced: 8 (new added: ${videosAdded})`);

  const total = await prisma.galleryItem.count();
  console.log(`Total active gallery items in PostgreSQL: ${total}`);

  await prisma.$disconnect();
}

sync().catch(err => {
  console.error('Error syncing gallery media:', err);
  process.exit(1);
});
