import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://hariduttayurveda.edu.in';

  const routes = [
    '',
    '/about',
    '/about/history',
    '/about/vision-mission',
    '/about/chairmans-message',
    '/about/principals-message',
    '/about/management',
    '/academics/programmes',
    '/courses/bams',
    '/courses/md-ayurveda',
    '/courses/panchakarma-certificate',
    '/departments',
    '/departments/kaya',
    '/departments/dravya',
    '/departments/panchakarma',
    '/faculty',
    '/admissions',
    '/admissions/eligibility',
    '/admissions/fee-structure',
    '/admissions/apply',
    '/admissions/status',
    '/infrastructure',
    '/infrastructure/hospital',
    '/infrastructure/herbal-garden',
    '/infrastructure/library',
    '/infrastructure/laboratories',
    '/infrastructure/hostel',
    '/knowledge-hub',
    '/research',
    '/news-events',
    '/student-life',
    '/achievements',
    '/gallery',
    '/mandatory-disclosures',
    '/notices',
    '/downloads',
    '/contact',
    '/privacy-policy',
    '/terms-conditions',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/notices' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/courses') || route.startsWith('/admissions') ? 0.9 : 0.8,
  }));
}
