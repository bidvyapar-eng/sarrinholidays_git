import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { JsonLd } from '@/components/json-ld'

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarrinholidays.com'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
  themeColor: '#020617',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sarrin Holidays | Luxury Indian Journeys & Bespoke Expeditions',
    template: '%s | Sarrin Holidays',
  },
  description:
    'Handcrafted luxury travel, royal palace buyouts in Rajasthan, private aviation charters, and bespoke experiential expeditions across India.',
  keywords: [
    'luxury travel India',
    'palace buyouts Rajasthan',
    'private jet charters India',
    'Himalayan wellness retreats',
    'bespoke luxury holidays',
    'Sarrin Holidays',
    'luxury tour operator India',
    'VIP chauffeur protection India',
    'Kerala private houseboats',
  ],
  authors: [{ name: 'Sarrin Holidays Editorial Desk', url: siteUrl }],
  creator: 'Sarrin Holidays',
  publisher: 'Sarrin Holidays',
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': `${siteUrl}/feed.xml`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Sarrin Holidays',
    title: 'Sarrin Holidays | Luxury Indian Journeys & Bespoke Expeditions',
    description:
      'Handcrafted luxury travel, royal palace buyouts in Rajasthan, private aviation charters, and bespoke experiential expeditions across India.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Sarrin Holidays — Bespoke Indian Expeditions & Royal Palaces',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarrin Holidays | Luxury Indian Journeys & Bespoke Expeditions',
    description:
      'Handcrafted luxury travel, royal palace buyouts in Rajasthan, private aviation charters, and bespoke experiential expeditions across India.',
    creator: '@sarrinholidays',
    images: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
    ],
  },
  icons: {
    icon: [
      {
        url: '/icon-32x32.png?v=sarrin2026',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/icon-16x16.png?v=sarrin2026',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/icon-light-32x32.png?v=sarrin2026',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/icon.svg?v=sarrin2026',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.ico?v=sarrin2026',
        sizes: 'any',
      },
    ],
    shortcut: '/favicon.ico?v=sarrin2026',
    apple: [
      {
        url: '/apple-icon.png?v=sarrin2026',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const travelAgencySchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': `${siteUrl}/#organization`,
  name: 'Sarrin Holidays',
  alternateName: 'Sarrin Luxury Travel & Bespoke Indian Expeditions',
  description:
    'Purveyor of bespoke luxury journeys across India, private aviation charters, 18th-century palace buyouts in Rajasthan, and transformative Himalayan wellness sanctuaries.',
  url: siteUrl,
  logo: `${siteUrl}/sarrin-holidays-logo.png`,
  image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
  telephone: '+91-22-6982-5500',
  email: 'concierge@sarrinholidays.com',
  priceRange: '$$$$',
  currenciesAccepted: 'USD, EUR, GBP, INR',
  paymentAccepted: 'Wire Transfer, Credit Card',
  foundingDate: '2012',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Level 18, The Capital, G Block, Bandra Kurla Complex (BKC)',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400051',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 19.0657,
    longitude: 72.8688,
  },
  areaServed: [
    {
      '@type': 'AdministrativeArea',
      name: 'Rajasthan',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Kerala',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Himalayas & Uttarakhand',
    },
    {
      '@type': 'Country',
      name: 'India',
    },
  ],
  knowsAbout: [
    'Private Aviation Charters',
    'Palace Buyouts & Royal Heritage',
    'Ayurvedic Sanctuaries & Panchakarma',
    'VIP Armored Chauffeur & Diplomatic Security',
    'Bespoke Cultural Expeditions',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5.0',
    worstRating: '1.0',
    ratingCount: '184',
    reviewCount: '142',
  },
  award: [
    'Indian Heritage Hospitality Excellence Recognition',
    'Sovereign Aviation Concierge Partner 2025',
    'Condé Nast Traveler Recommended Specialist Network',
  ],
  memberOf: [
    {
      '@type': 'Organization',
      name: 'Indian Heritage Hotels Association',
    },
    {
      '@type': 'Organization',
      name: 'International Air Transport Association (IATA) Partner Network',
    },
  ],
  sameAs: [
    'https://www.instagram.com/sarrinholidays',
    'https://www.linkedin.com/company/sarrinholidays',
    'https://twitter.com/sarrinholidays',
    'https://www.facebook.com/sarrinholidays',
    'https://www.youtube.com/@sarrinholidays',
    'https://maps.google.com/?cid=18294719284719284719',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={travelAgencySchema} id="travel-agency-schema" />
      </head>
      <body className="font-sans antialiased overflow-x-hidden min-w-[320px] max-w-[100vw]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
