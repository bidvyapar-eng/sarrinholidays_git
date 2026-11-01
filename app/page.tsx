import { Suspense } from "react"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { VirtualTour } from "@/components/virtual-tour-client"
import { CuratedByIntention } from "@/components/curated-by-intention"
import { PackagesGrid } from "@/components/packages-grid"
import { PublicContent } from "@/components/public-content"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarrinholidays.com'

export const metadata: Metadata = {
  title: 'Sarrin Holidays | Luxury Indian Travel, Royal Palace Stays & Private Expeditions',
  description:
    'India’s premier bespoke travel atelier. Handcrafted private journeys across Rajasthan’s 18th-century royal palaces, secluded Kerala houseboat retreats, and high-altitude Himalayan wellness sanctuaries. Unrivaled access, private aviation, and 24/7 sovereign concierge service.',
  alternates: {
    canonical: siteUrl,
  },
  keywords: [
    'luxury travel India',
    'royal palace buyouts Rajasthan',
    'private jet charters India',
    'Kerala luxury houseboat buyouts',
    'Himalayan wellness retreats',
    'bespoke Indian tour operator',
    'Taj Lake Palace Udaipur suite',
    'Rambagh Palace Jaipur presidential suite',
    'Ranthambore luxury tiger safaris',
    'Sarrin Holidays luxury travel',
  ],
  openGraph: {
    title: 'Sarrin Holidays | Luxury Indian Travel & Sovereign Expeditions',
    description:
      'Handcrafted luxury travel, royal palace buyouts in Rajasthan, private aviation charters, and bespoke experiential expeditions across India.',
    url: siteUrl,
    siteName: 'Sarrin Holidays',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Sarrin Holidays — Bespoke Indian Expeditions & Royal Palaces',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarrin Holidays | Luxury Indian Travel & Sovereign Expeditions',
    description:
      'Handcrafted luxury travel, royal palace buyouts in Rajasthan, private aviation charters, and bespoke experiential expeditions across India.',
    images: ['https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200'],
  },
}

// Rich Structured Data for Front Page On-Page SEO
const frontPageSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'Sarrin Holidays',
    description: 'Bespoke Luxury Travel Atelier for Curated Indian Expeditions & Royal Palace Buyouts',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/packages?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Flagship Curated Indian Expeditions',
    description: 'Premier bespoke luxury travel itineraries across the Indian subcontinent.',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Heritage & Palaces Grand Tour',
        url: `${siteUrl}/packages/royal-rajasthan-tour`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Backwaters & Coastal Sanctuaries',
        url: `${siteUrl}/packages/kerala-houseboat-retreat`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Spiritual & Wellness Retreats',
        url: `${siteUrl}/packages/himalayan-wellness-escapade`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Wild & Untamed: Royal Tiger Safaris',
        url: `${siteUrl}/packages/wild-untamed-tiger-safari`,
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How are luxury itineraries customized by Sarrin Holidays?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every itinerary is 100% custom-built by our senior curatorial desk. We align private aviation schedules, presidential palace suite reservations, licensed royal historian liaisons, and personal dietary curation to your exact preferences.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Sarrin Holidays operate under strict Non-Disclosure Agreements (NDA)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Discretion is foundational to our atelier. Passenger manifests, private flight corridors, security details, and personal identities are safeguarded under strict legal non-disclosure covenants.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can private helicopters land directly at retreat properties?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We maintain direct private helipad agreements with premier properties in Uttarakhand, Rajasthan, and Ladakh, facilitating seamless point-to-point transfers that bypass commercial road transit.',
        },
      },
    ],
  },
]

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden w-full max-w-[100vw]">
      {/* Front Page SEO Schemas (WebSite, ItemList, FAQPage) */}
      <JsonLd data={frontPageSchemas} id="front-page-seo-schemas" />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* 360° VR Spatial Tour */}
      <VirtualTour />

      {/* Intent-Driven Itinerary Selector */}
      <CuratedByIntention />

      {/* Flagship Packages Grid with Suspense */}
      <div id="destinations" className="scroll-mt-24">
        <Suspense
          fallback={
            <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
              <div className="animate-pulse space-y-4 text-center">
                <div className="mx-auto h-4 w-36 rounded-full bg-white/10" />
                <div className="mx-auto h-10 w-96 rounded-lg bg-white/10" />
              </div>
            </div>
          }
        >
          <PackagesGrid />
        </Suspense>
      </div>

      {/* Experiences, Journal & About Section */}
      <PublicContent />

      {/* Global Luxury Footer */}
      <Footer />
    </main>
  )
}
