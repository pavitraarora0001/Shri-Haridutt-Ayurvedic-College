import type { Metadata, Viewport } from 'next';
import './globals.css';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MotionProvider from '@/components/motion/MotionProvider';
import { INSTITUTION_INFO } from '@/lib/data';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#173D32',
};

export const metadata: Metadata = {
  title: {
    default: `${INSTITUTION_INFO.name} — Vedic Heritage × Modern Academic Luxury`,
    template: `%s | ${INSTITUTION_INFO.name}`,
  },
  description:
    'Premier Ayurvedic Medical College & 100-Bed Hospital in Rajasthan, India. Offering NCISM-approved BAMS (100 Seats) & MD Ayurveda. Ancient Ayurvedic wisdom integrated with modern medical education.',
  keywords: [
    'Ayurvedic Medical College',
    'BAMS Admissions 2026',
    'NCISM Approved Ayurvedic College',
    'Shri Haridutt Ayurvedic College',
    'Ayurvedic Hospital Rajasthan',
    'Panchakarma Center',
    'Dravyaguna Herbal Garden',
    'Vedic Medical Education',
  ],
  authors: [{ name: INSTITUTION_INFO.name }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://hariduttayurveda.edu.in'),
  openGraph: {
    title: `${INSTITUTION_INFO.name} — Vedic Heritage × Modern Academic Luxury`,
    description:
      'Discover the science of Ayurveda. NCISM-approved BAMS medical degree, 100-bed hospital, 5-acre herbal garden, and world-class Ayurvedic education.',
    url: 'https://hariduttayurveda.edu.in',
    siteName: INSTITUTION_INFO.name,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: INSTITUTION_INFO.name,
    description: 'Where Ancient Wisdom Meets Modern Healthcare. NCISM Approved BAMS & MD Ayurveda.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Institutional JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: INSTITUTION_INFO.name,
    alternateName: INSTITUTION_INFO.shortName,
    url: 'https://hariduttayurveda.edu.in',
    logo: 'https://hariduttayurveda.edu.in/logo.png',
    description: INSTITUTION_INFO.subTagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'NH-11B Heritage Campus',
      addressLocality: 'Karauli District',
      addressRegion: 'Rajasthan',
      postalCode: '322241',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-98290-44120',
      contactType: 'admissions',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Sanskrit'],
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="image"
          href="/images/ayurveda/backgrounds/hero-botanical-garden.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased min-h-screen flex flex-col bg-[#F6F2E9] text-[#342B25] selection:bg-[#C5A46D] selection:text-[#173D32] overflow-x-hidden w-full max-w-full">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-grow w-full max-w-full overflow-x-hidden">
          <MotionProvider>{children}</MotionProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
