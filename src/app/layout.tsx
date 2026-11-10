import type { Metadata, Viewport } from 'next';
import './globals.css';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MotionProvider from '@/components/motion/MotionProvider';
import { INSTITUTION_INFO } from '@/lib/data';
import { getInstitutionalSettings } from '@/lib/settings';

export const dynamic = 'force-dynamic';

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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'B_nuYFuxSm9psdTP_-4bed8s3zyUMlrNWbuItLKO1Uc',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getInstitutionalSettings();

  // Institutional JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': `${settings.officialWebsiteUrl}/#college`,
        name: settings.name,
        alternateName: settings.shortName,
        url: settings.officialWebsiteUrl,
        logo: `${settings.officialWebsiteUrl}${settings.logoUrl}`,
        description: settings.collegeDescription,
        sameAs: [
          settings.socialFacebook,
          settings.socialInstagram,
          settings.socialYoutube,
          settings.socialLinkedin,
          settings.socialTwitter,
        ].filter(Boolean),
        address: {
          '@type': 'PostalAddress',
          streetAddress: settings.campusAddress,
          addressLocality: settings.city,
          addressRegion: settings.state,
          postalCode: settings.pincode,
          addressCountry: 'IN',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: settings.admissionsHelpline,
            contactType: 'admissions',
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi', 'Sanskrit'],
          },
          {
            '@type': 'ContactPoint',
            telephone: settings.hospitalEmergency,
            contactType: 'emergency',
            areaServed: 'IN',
          },
        ],
      },
      {
        '@type': 'MedicalOrganization',
        '@id': `${settings.officialWebsiteUrl}/#hospital`,
        name: settings.hospitalName,
        url: `${settings.officialWebsiteUrl}/hospital`,
        description: settings.hospitalDescription,
        telephone: settings.hospitalEmergency,
        address: {
          '@type': 'PostalAddress',
          streetAddress: settings.campusAddress,
          addressLocality: settings.city,
          addressRegion: settings.state,
          postalCode: settings.pincode,
          addressCountry: 'IN',
        },
        openingHours: 'Mo-Sa 08:00-14:00',
      },
    ],
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
