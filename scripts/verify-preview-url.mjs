const PREVIEW_URL = 'https://shri-haridutt-ayurvedic-college-n8imv2jlr.vercel.app';

const routes = [
  '/',
  '/about',
  '/about/management',
  '/courses/bams',
  '/gallery',
  '/video-gallery',
  '/admin/login',
  '/api/health',
  '/api/v1/settings/public',
  '/images/campus-real/campus-front-facade.jpg'
];

async function checkRoutes() {
  console.log(`Checking preview deployment at: ${PREVIEW_URL}\n`);
  let passed = 0;
  for (const r of routes) {
    try {
      const res = await fetch(`${PREVIEW_URL}${r}`);
      console.log(`[${res.status}] ${r} (Content-Type: ${res.headers.get('content-type')})`);
      if (res.ok) passed++;
    } catch (e) {
      console.error(`[ERROR] ${r}: ${e.message}`);
    }
  }
  console.log(`\nResult: ${passed}/${routes.length} passed.`);
}

checkRoutes();
