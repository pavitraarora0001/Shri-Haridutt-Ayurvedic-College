async function findLinks() {
  const res = await fetch('https://shddcbpr.org/');
  const html = await res.text();
  
  // Extract all hrefs
  const hrefRegex = /href=["']([^"'#]+)["']/gi;
  const hrefs = new Set();
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    hrefs.add(match[1]);
  }
  console.log('Hrefs on shddcbpr.org:');
  for (const h of hrefs) {
    console.log(' - ', h);
  }

  // Extract all images with alt or titles
  const imgTagRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  const imgs = [];
  while ((match = imgTagRegex.exec(html)) !== null) {
    imgs.push(match[0]);
  }
  console.log(`\nTotal img tags on shddcbpr.org: ${imgs.length}`);
  imgs.forEach(tag => console.log('IMG:', tag));
}

findLinks();
