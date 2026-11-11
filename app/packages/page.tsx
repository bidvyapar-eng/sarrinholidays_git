import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { PackagesGrid } from '@/components/packages-grid'
import { supabase } from '@/lib/supabaseClient'
import { Compass, Sparkles, ShieldCheck, Clock, Award } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Curated Expeditions & Luxury Packages | Sarrin Holidays',
  description: 'Handcrafted luxury journeys across India. Experience royal palace buyouts, serene backwater houseboat retreats, and Himalayan wellness sanctuaries.',
  alternates: {
    canonical: 'https://sarrinholidays.com/packages',
  },
}

function PackagesLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6">
      {[1, 2, 3].map((n) => (
        <div key={n} className="rounded-3xl border border-white/10 bg-white/5 p-6 h-[480px] animate-pulse" />
      ))}
    </div>
  )
}

export default async function PackagesPage() {
  const { data: settings } = await supabase
    .from('site_settings')
    .select('navbar_logo_text')
    .limit(1)
    .maybeSingle()

  return (
    <main className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/30 selection:text-primary">
      {/* Navbar */}
      <Navbar logoText={settings?.navbar_logo_text} />

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-primary/8 blur-[140px]" />
      <div className="pointer-events-none absolute top-[700px] -right-40 size-[500px] rounded-full bg-amber-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 -left-40 size-[500px] rounded-full bg-primary/5 blur-[120px]" />

      {/* Hero Header Section */}
      <section className="relative pt-36 pb-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow */}
          <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C5A059] font-medium block">
            The Grand Expeditions
          </span>

          {/* H1 Headline */}
          <h1 className="mt-5 font-serif font-light text-4xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-[#F4F2EC]">
            Bespoke Expeditions Across India
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-[#B8B4AA] leading-relaxed font-light">
            Every itinerary is personally orchestrated with private aviation, living heritage palace suites,
            master historian liaisons, and 24/7 dedicated private concierge service.
          </p>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#B8B4AA] font-sans uppercase tracking-[0.18em]">
            <span>Verified Palaces &amp; Luxury Fleets</span>
            <span className="opacity-30">•</span>
            <span>VIP Concierge Confirmation</span>
            <span className="opacity-30">•</span>
            <span>Curated In-House by Sarrin</span>
          </div>
        </div>
      </section>

      {/* Packages Grid Section with Suspense */}
      <section className="relative pb-24 px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<PackagesLoadingSkeleton />}>
          <PackagesGrid />
        </Suspense>
      </section>
    </main>
  )
}
