import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Playfair_Display } from 'next/font/google'
import './globals.css'
import { JsonLd } from '@/components/json-ld'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarrinholidays.com'

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
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a2233',
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
  sameAs: [
    'https://www.instagram.com/sarrinholidays',
    'https://www.linkedin.com/company/sarrinholidays',
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
      className={`${geistSans.variable} ${playfair.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={travelAgencySchema} id="travel-agency-schema" />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
