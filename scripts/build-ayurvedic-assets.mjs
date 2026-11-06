import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';

const baseDir = path.join(process.cwd(), 'public', 'images', 'ayurveda');

const directories = [
  'herbs',
  'botanical-gardens',
  'manuscripts',
  'ancient-heritage',
  'medicine-preparation',
  'panchakarma',
  'research',
  'backgrounds',
];

directories.forEach((dir) => {
  const fullPath = path.join(baseDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

const assets = [
  // Herbs
  {
    folder: 'herbs',
    filename: 'ashwagandha-botanical.webp',
    id: '1615485290382-441e4d049cb5',
    width: 800,
    desc: 'Dried Withania somnifera (Ashwagandha) roots with authentic natural texture',
  },
  {
    folder: 'herbs',
    filename: 'tulsi-medicinal-leaves.webp',
    id: '1618160702438-9b02ab6515c9',
    width: 800,
    desc: 'Fresh Ocimum sanctum (Holy Basil / Tulsi) green leaves with delicate veins',
  },
  {
    folder: 'herbs',
    filename: 'neem-medicinal-leaves.webp',
    id: '1546842931-886c185b4c8c',
    width: 800,
    desc: 'Fresh Azadirachta indica (Neem) vibrant serrated medicinal leaves',
  },
  {
    folder: 'herbs',
    filename: 'brahmi-botanical-foliage.webp',
    id: '1518531933037-91b2f5f229cc',
    width: 800,
    desc: 'Bacopa monnieri (Brahmi) succulent aquatic medicinal foliage',
  },
  {
    folder: 'herbs',
    filename: 'amla-indian-gooseberry.webp',
    id: '1509358271058-acd22cc93898',
    width: 800,
    desc: 'Emblica officinalis (Amla) fresh branches and fruit bearing foliage',
  },
  {
    folder: 'herbs',
    filename: 'giloy-medicinal-vine.webp',
    id: '1546842931-886c185b4c8c',
    width: 800,
    desc: 'Tinospora cordifolia (Giloy / Amrita) heart-leaved climber vine foliage',
  },
  {
    folder: 'herbs',
    filename: 'shatavari-roots.webp',
    id: '1540420773420-3366772f4999',
    width: 800,
    desc: 'Asparagus racemosus (Shatavari) botanical tubers and herbs',
  },
  {
    folder: 'herbs',
    filename: 'arjuna-bark-herbal.webp',
    id: '1512069772995-ec65ed45afd6',
    width: 800,
    desc: 'Terminalia arjuna therapeutic bark pieces and dried herbal specimens',
  },
  {
    folder: 'herbs',
    filename: 'mulethi-licorice-root.webp',
    id: '1596040033229-a9821ebd058d',
    width: 800,
    desc: 'Glycyrrhiza glabra (Mulethi / Licorice) dried therapeutic root cuts',
  },
  {
    folder: 'herbs',
    filename: 'turmeric-fresh-rhizome.webp',
    id: '1598440947619-2c35fc9aa908',
    width: 800,
    desc: 'Curcuma longa (Haridra / Turmeric) golden rhizomes and ground powder',
  },
  {
    folder: 'herbs',
    filename: 'aloe-vera-ayurvedic.webp',
    id: '1509358271058-acd22cc93898',
    width: 800,
    desc: 'Aloe barbadensis (Ghritakumari) fleshy medicinal succulent leaves',
  },
  {
    folder: 'herbs',
    filename: 'shankhpushpi-herb.webp',
    id: '1515377905703-c4788e51af15',
    width: 800,
    desc: 'Convolvulus pluricaulis (Shankhpushpi) dried whole herb and flowers',
  },

  // Botanical Gardens
  {
    folder: 'botanical-gardens',
    filename: 'herbal-garden-landscape.webp',
    id: '1518531933037-91b2f5f229cc',
    width: 1400,
    desc: 'Expansive sunlit Charak Vatika botanical sanctuary with lush medicinal canopies',
  },
  {
    folder: 'botanical-gardens',
    filename: 'charak-vatika-botanical.webp',
    id: '1471193945509-9ad0617afabf',
    width: 1200,
    desc: 'Lush green medicinal beds featuring over 350 classical Ayurvedic species',
  },
  {
    folder: 'botanical-gardens',
    filename: 'medicinal-plant-sanctuary.webp',
    id: '1509358271058-acd22cc93898',
    width: 1200,
    desc: 'Botanical nursery and conservation zone with organic micro-climates',
  },
  {
    folder: 'botanical-gardens',
    filename: 'sunlit-herbal-canopy.webp',
    id: '1471193945509-9ad0617afabf',
    width: 1200,
    desc: 'Morning sunlight filtering through green medicinal tree branches',
  },
  {
    folder: 'botanical-gardens',
    filename: 'dewy-ayurvedic-foliage.webp',
    id: '1546842931-886c185b4c8c',
    width: 1000,
    desc: 'Dew-kissed organic medicinal leaves reflecting natural morning clarity',
  },

  // Manuscripts
  {
    folder: 'manuscripts',
    filename: 'ancient-ayurveda-manuscript.webp',
    id: '1457369804613-52c61a468e7d',
    width: 1200,
    desc: 'Ancient classical Ayurvedic manuscript on antique wooden desk',
  },
  {
    folder: 'manuscripts',
    filename: 'sanskrit-charaka-treatise.webp',
    id: '1457369804613-52c61a468e7d',
    width: 1200,
    desc: 'Charaka Samhita Sanskrit verses and philosophical commentaries',
  },
  {
    folder: 'manuscripts',
    filename: 'palm-leaf-ayurveda-scripture.webp',
    id: '1524995997946-a1c2e315a42f',
    width: 1200,
    desc: 'Classical leatherbound archival treatises and sacred medical manuscripts',
  },
  {
    folder: 'manuscripts',
    filename: 'classical-ayurvedic-scroll.webp',
    id: '1457369804613-52c61a468e7d',
    width: 1000,
    desc: 'Traditional handwritten medical scriptures and ancient paper textures',
  },
  {
    folder: 'manuscripts',
    filename: 'vintage-botanical-illustration.webp',
    id: '1512069772995-ec65ed45afd6',
    width: 1000,
    desc: 'Handcrafted botanical Materia Medica records and dried herb collections',
  },

  // Ancient Heritage Architecture
  {
    folder: 'ancient-heritage',
    filename: 'heritage-stone-architecture.webp',
    id: '1609137144813-7d9921338f24',
    width: 1400,
    desc: 'Majestic carved Indian sandstone arches in warm golden light',
  },
  {
    folder: 'ancient-heritage',
    filename: 'vedic-courtyard-colonnade.webp',
    id: '1548013146-72479768bada',
    width: 1200,
    desc: 'Historic Indian architectural colonnade and tranquil courtyard',
  },
  {
    folder: 'ancient-heritage',
    filename: 'carved-stone-pillars.webp',
    id: '1541339907198-e08756dedf3f',
    width: 1200,
    desc: 'Classical stone institutional building evocative of ancient universities',
  },
  {
    folder: 'ancient-heritage',
    filename: 'heritage-wooden-archway.webp',
    id: '1548013146-72479768bada',
    width: 1000,
    desc: 'Traditional architectural corridors and carved sandstone archways',
  },

  // Medicine Preparation
  {
    folder: 'medicine-preparation',
    filename: 'traditional-herbal-preparation.webp',
    id: '1628088062854-d1870b4553da',
    width: 1200,
    desc: 'Authentic stone Khalwa Yantra mortar with freshly pounded green leaves',
  },
  {
    folder: 'medicine-preparation',
    filename: 'stone-mortar-pestle-leaves.webp',
    id: '1628088062854-d1870b4553da',
    width: 1000,
    desc: 'Solid stone mortar and pestle preparing herbal extracts and churnas',
  },
  {
    folder: 'medicine-preparation',
    filename: 'dried-roots-wooden-bowls.webp',
    id: '1512069772995-ec65ed45afd6',
    width: 1000,
    desc: 'Dried medicinal roots, seeds, and barks organized in traditional wooden bowls',
  },
  {
    folder: 'medicine-preparation',
    filename: 'copper-vessel-ayurvedic-decoction.webp',
    id: '1596040033229-a9821ebd058d',
    width: 1000,
    desc: 'Natural herbs, spices, and decoction materials for classical Kashaya',
  },
  {
    folder: 'medicine-preparation',
    filename: 'herbal-oil-infusion.webp',
    id: '1608571423902-eed4a5ad8108',
    width: 1000,
    desc: 'Classical medicated Taila preparations and herbal extract vials',
  },

  // Panchakarma & Treatment Heritage
  {
    folder: 'panchakarma',
    filename: 'traditional-panchakarma-suite.webp',
    id: '1540555700478-4be289fbecef',
    width: 1200,
    desc: 'Traditional Panchakarma biopurification suite with brass vessels and herbal oils',
  },
  {
    folder: 'panchakarma',
    filename: 'shirodhara-bronze-vessel.webp',
    id: '1540555700478-4be289fbecef',
    width: 1000,
    desc: 'Authentic bronze Shirodhara pot for warm medicated oil stream therapy',
  },
  {
    folder: 'panchakarma',
    filename: 'ayurvedic-medicated-oils.webp',
    id: '1608571423902-eed4a5ad8108',
    width: 1000,
    desc: 'Artisanal medicated oils formulated with Sesame and Dashamoola herbs',
  },
  {
    folder: 'panchakarma',
    filename: 'abhyanga-therapy-herbs.webp',
    id: '1576765608535-5f04d1e3f289',
    width: 1000,
    desc: 'Herbal oil Abhyanga massage therapy room with natural warm ambiance',
  },

  // Research
  {
    folder: 'research',
    filename: 'botanical-herbarium-specimen.webp',
    id: '1512069772995-ec65ed45afd6',
    width: 1200,
    desc: 'Classical botanical specimens and crude drug herbarium museum',
  },
  {
    folder: 'research',
    filename: 'ayurvedic-pharmacognosy-lab.webp',
    id: '1579154204601-01588f351e67',
    width: 1200,
    desc: 'High-precision diagnostic microscope and phytochemistry workstation',
  },
  {
    folder: 'research',
    filename: 'phytochemical-extract-analysis.webp',
    id: '1532187863486-abf9dbad1b69',
    width: 1200,
    desc: 'Standardized phytochemical extraction and physiological test equipment',
  },

  // Backgrounds
  {
    folder: 'backgrounds',
    filename: 'hero-botanical-garden.webp',
    id: '1518531933037-91b2f5f229cc',
    width: 1920,
    desc: 'Cinematic wide Ayurvedic medicinal garden bathed in natural morning sunlight',
  },
  {
    folder: 'backgrounds',
    filename: 'manuscript-parchment-texture.webp',
    id: '1457369804613-52c61a468e7d',
    width: 1600,
    desc: 'Subtle ancient Sanskrit manuscript and antique wood background texture',
  },
  {
    folder: 'backgrounds',
    filename: 'vedic-botanical-leaves.webp',
    id: '1546842931-886c185b4c8c',
    width: 1600,
    desc: 'Lush natural medicinal green leaves pattern for editorial sections',
  },
];

function downloadAndSave(asset) {
  return new Promise((resolve, reject) => {
    const url = `https://images.unsplash.com/photo-${asset.id}?auto=format&fit=crop&q=85&w=${asset.width}`;
    const destPath = path.join(baseDir, asset.folder, asset.filename);

    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${asset.filename}: HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', async () => {
        const buffer = Buffer.concat(chunks);
        try {
          await sharp(buffer)
            .resize({ width: asset.width, withoutEnlargement: true })
            .webp({ quality: 85, effort: 4 })
            .toFile(destPath);
          const stats = fs.statSync(destPath);
          resolve({
            file: `${asset.folder}/${asset.filename}`,
            sizeKb: Math.round(stats.size / 1024),
            desc: asset.desc,
          });
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log(`Starting generation of ${assets.length} authentic Ayurvedic assets into /public/images/ayurveda/...`);
  const results = [];
  // Process sequentially or with slight concurrency to prevent network throttling
  for (const asset of assets) {
    try {
      const res = await downloadAndSave(asset);
      console.log(`✔ Generated: ${res.file} (${res.sizeKb} KB)`);
      results.push(res);
    } catch (err) {
      console.error(`✖ Failed for ${asset.filename}:`, err.message);
    }
  }
  console.log(`\nSuccessfully created ${results.length} / ${assets.length} WebP assets!`);
}

run();
