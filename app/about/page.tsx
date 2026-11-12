import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AboutSection } from '@/components/about-section'
import { supabase } from '@/lib/supabaseClient'
import {
  Crown,
  Plane,
  ArrowRight,
  Compass,
  CheckCircle2,
  Users,
  MapPin,
  HeartHandshake,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarrinholidays.com'

export const metadata: Metadata = {
  title: 'About Sarrin Holidays | Bespoke Indian Luxury Travel Atelier',
  description:
    'Discover the heritage and philosophy of Sarrin Holidays. Purveyor of sovereign Indian expeditions, royal palace buyouts in Rajasthan, private aviation charters, and authentic cultural stewardship.',
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: 'About Sarrin Holidays | Bespoke Indian Luxury Travel Atelier',
    description:
      'Purveyor of sovereign Indian expeditions, royal palace buyouts in Rajasthan, private aviation charters, and authentic cultural stewardship.',
    url: `${siteUrl}/about`,
    siteName: 'Sarrin Holidays',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'About Sarrin Holidays — Indian Luxury Travel Atelier',
      },
    ],
  },
}

export default async function AboutPage() {
  const { data: settings } = await supabase
    .from('site_settings')
    .select('navbar_logo_text')
    .limit(1)
    .maybeSingle()

  return (
    <main className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/30 selection:text-primary">
      {/* Navigation */}
      <Navbar logoText={settings?.navbar_logo_text} />

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-primary/8 blur-[140px]" />
      <div className="pointer-events-none absolute top-[600px] -right-40 size-[500px] rounded-full bg-amber-500/5 blur-[120px]" />

      {/* Hero Header Section */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 px-4 py-1 text-xs font-sans uppercase tracking-[0.25em] text-[#C5A059]">
            <span>The Atelier Story</span>
          </div>

          {/* H1 Headline */}
          <h1 className="mt-6 font-serif font-light text-4xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-[#F4F2EC]">
            Bespoke Mastery &amp; Sovereign Discretion
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-[#B8B4AA] leading-relaxed font-light">
            Founded to bridge extraordinary Indian heritage with uncompromising private luxury.
            We curate living palace suites, on-demand aviation, and sacred rituals for travelers
            who seek depth rather than conventional sightseeing.
          </p>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#B8B4AA] font-sans tracking-[0.18em] uppercase">
            <span>Strict NDA Protocol</span>
            <span className="hidden sm:inline opacity-30">•</span>
            <span>24/7 Dedicated Liaison</span>
            <span className="hidden sm:inline opacity-30">•</span>
            <span>Sovereign Palace Alliances</span>
          </div>
        </div>
      </section>

      {/* Main Narrative and Pillars */}
      <AboutSection />

      {/* Curatorial Philosophy & Standards Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-sm border border-white/10 bg-[#141310] p-8 transition-all duration-300 hover:border-[#C5A059]/40">
            <div className="flex size-11 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <Crown className="size-5" />
            </div>
            <h3 className="mt-6 font-serif text-2xl text-[#F4F2EC] font-light">Living Heritage</h3>
            <p className="mt-3 text-sm text-[#B8B4AA] leading-relaxed font-light">
              We work directly with royal trusts to unlock private living quarters, ancestral armories,
              and private courtyards closed to standard museum visitors.
            </p>
          </div>

          <div className="rounded-sm border border-white/10 bg-[#141310] p-8 transition-all duration-300 hover:border-[#C5A059]/40">
            <div className="flex size-11 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <Plane className="size-5" />
            </div>
            <h3 className="mt-6 font-serif text-2xl text-[#F4F2EC] font-light">Frictionless Transit</h3>
            <p className="mt-3 text-sm text-[#B8B4AA] leading-relaxed font-light">
              By coupling chartered aircraft and high-altitude helicopters with armored chauffeur fleets,
              we reclaim valuable hours so you arrive restored, not exhausted.
            </p>
          </div>

          <div className="rounded-sm border border-white/10 bg-[#141310] p-8 transition-all duration-300 hover:border-[#C5A059]/40">
            <div className="flex size-11 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <HeartHandshake className="size-5" />
            </div>
            <h3 className="mt-6 font-serif text-2xl text-[#F4F2EC] font-light">Personal Custodianship</h3>
            <p className="mt-3 text-sm text-[#B8B4AA] leading-relaxed font-light">
              Your dedicated senior concierge liaises directly with property owners, private chefs,
              and master historians to calibrate every detail in real time.
            </p>
          </div>
        </div>
      </section>

      {/* Global Luxury Footer */}
      <Footer />
    </main>
  )
}
