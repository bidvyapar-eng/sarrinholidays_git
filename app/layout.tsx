import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { ConciergeDrawer } from '@/components/ConciergeDrawer'

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const serif = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
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
  themeColor: '#0C0B09',
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
    icon: '/favicon.ico',
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
  telephone: '+91-84198-87730',
  email: 'help@sarrinholidays.com',
  identifier: 'UDYAM-MH-23-0433487',
  address: '42, Jagtap Complex, Satpur, Nashik, Maharashtra 422012, IN',
  areaServed: 'IN',
  priceRange: '$$$$',
  currenciesAccepted: 'USD, EUR, GBP, INR',
  paymentAccepted: 'Wire Transfer, Credit Card',
  foundingDate: '2012',
  sameAs: [
    'https://www.instagram.com/sarrinholidays',
    'https://www.linkedin.com/company/sarrinholidays',
    'https://twitter.com/sarrinholidays',
    'https://www.facebook.com/sarrinholidays',
    'https://www.youtube.com/@sarrinholidays',
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
      <body className={`${sans.variable} ${serif.variable} font-sans antialiased overflow-x-hidden min-w-[320px] max-w-[100vw]`}>
        <script
          type="application/ld+json"
          id="travel-agency-schema"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(travelAgencySchema),
          }}
        />
        {children}
        <ConciergeDrawer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
