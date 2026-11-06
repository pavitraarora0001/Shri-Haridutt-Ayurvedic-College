import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://hariduttayurveda.edu.in';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/student/dashboard', '/faculty-portal/dashboard'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
