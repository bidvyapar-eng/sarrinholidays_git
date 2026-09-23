import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabaseClient'
import { Navbar } from '@/components/navbar'
import { fallbackPackages, type PackageItem } from '@/lib/cms'
import { JsonLd } from '@/components/json-ld'
import { PackageInquiryTrigger } from '@/components/package-inquiry-trigger'
import { ENABLE_GLOBAL_CONCIERGE } from '@/lib/features.config'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Star,
  Flame,
  CheckCircle2,
  XCircle,
  Clock,
  Compass,
  ArrowUpRight,
  ShieldCheck,
  Send,
  Phone,
  Mail,
  Award,
  Sparkles,
  Info,
  Check,
  Minus,
  MinusCircle,
  Globe,
  Plane,
  X,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

function getPackageImage(img?: string) {
  if (!img || img.includes('photo-1599661559902')) {
    return 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=1200'
  }
  return img
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  const { data: dbPkg } = await supabase
    .from('packages')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  const pkg: PackageItem | undefined =
    dbPkg || fallbackPackages.find((p) => p.slug === slug)

  if (!pkg) {
    return {
      title: 'Curated Expedition | Sarrin Holidays',
      description: 'Handcrafted luxury journeys and royal retreats across India.',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarrinholidays.com'
  const canonicalUrl = `${siteUrl}/packages/${pkg.slug}`
  const ogImageUrl = getPackageImage(pkg.featured_image)

  return {
    title: `${pkg.title} | Luxury Indian Itinerary`,
    description: pkg.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${pkg.title} | Sarrin Holidays`,
      description: pkg.description,
      url: canonicalUrl,
      siteName: 'Sarrin Holidays',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: pkg.title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pkg.title} | Sarrin Holidays`,
      description: pkg.description,
      images: [ogImageUrl],
    },
  }
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params

  // 1. Fetch package from Supabase with fallback merge
  const { data: dbPkg } = await supabase
    .from('packages')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  const fallbackMatch = fallbackPackages.find((p) => p.slug === slug)
  const pkg: PackageItem | undefined = dbPkg
    ? {
        ...fallbackMatch,
        ...dbPkg,
        theme_tags: dbPkg.theme_tags && dbPkg.theme_tags.length > 0 ? dbPkg.theme_tags : fallbackMatch?.theme_tags,
        inclusions: dbPkg.inclusions && dbPkg.inclusions.length > 0 ? dbPkg.inclusions : fallbackMatch?.inclusions,
        exclusions: dbPkg.exclusions && dbPkg.exclusions.length > 0 ? dbPkg.exclusions : fallbackMatch?.exclusions,
        scarcity_status: dbPkg.scarcity_status !== undefined ? dbPkg.scarcity_status : fallbackMatch?.scarcity_status,
      }
    : fallbackMatch

  if (!pkg) {
    notFound()
  }

  // 2. Fetch site settings for navbar logo
  const { data: settings } = await supabase
    .from('site_settings')
    .select('navbar_logo_text')
    .limit(1)
    .maybeSingle()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarrinholidays.com'

  // 3. Build TouristTrip Structured Data Schema
  const touristTripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': `${siteUrl}/packages/${pkg.slug}#trip`,
    name: pkg.title,
    description: pkg.description,
    image: getPackageImage(pkg.featured_image),
    touristType: ['Luxury Traveler', 'High-Net-Worth Individual', 'VIP Expedition'],
    offers: {
      '@type': 'Offer',
      price: pkg.price < 10000 ? pkg.price * 100 : pkg.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
      url: `${siteUrl}/packages/${pkg.slug}`,
    },
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: pkg.highlights?.length || 0,
      itemListElement: (pkg.highlights || []).map((highlight: string, idx: number) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: highlight,
      })),
    },
    destination: (pkg.destinations || []).map((dest: string) => ({
      '@type': 'TouristDestination',
      name: dest,
      containedInPlace: {
        '@type': 'Country',
        name: 'India',
      },
    })),
    provider: {
      '@type': 'TravelAgency',
      name: 'Sarrin Holidays',
      url: siteUrl,
      telephone: '+91-22-6982-5500',
    },
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      <JsonLd data={touristTripSchema} id="tourist-trip-schema" />
      <Navbar logoText={settings?.navbar_logo_text} />

      {/* Hero Header */}
      <div className="relative w-full min-h-[65vh] lg:min-h-[75vh] flex items-end pt-32 pb-16 px-4 sm:px-8">
        {/* Background Image with Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={getPackageImage(pkg.featured_image)}
            alt={pkg.title}
            className="size-full object-cover object-center brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl w-full">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-neutral-400 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/#packages" className="hover:text-primary transition-colors">
              Curated Packages
            </Link>
            <span>/</span>
            <span className="text-neutral-200">{pkg.title}</span>
          </div>

          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/25">
              <Calendar className="size-3.5" />
              {pkg.duration}
            </span>

            {pkg.scarcity_status && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-lg shadow-rose-950/40 animate-pulse">
                <Sparkles className="size-3.5 text-rose-400" />
                {pkg.scarcity_status}
              </span>
            )}

            {pkg.is_trending && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Flame className="size-3.5 text-amber-400" />
                Trending Journey
              </span>
            )}

            {pkg.rating && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/40 text-amber-300 border border-white/15 backdrop-blur-md">
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
                {pkg.rating.toFixed(1)} Exceptional
              </span>
            )}

            {pkg.theme_tags?.map((theme) => (
              <span
                key={theme}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-serif italic bg-amber-500/10 text-amber-300 border border-amber-500/30 backdrop-blur-md"
              >
                <span>✦</span>
                <span>{theme}</span>
              </span>
            ))}

            {pkg.experience_tags?.map((tag) => (
              <span
                key={tag}
                className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase bg-white/10 text-neutral-300 border border-white/10 backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium tracking-tight max-w-4xl leading-[1.1]">
            {pkg.title}
          </h1>

          {/* Destinations Strip */}
          {pkg.destinations && pkg.destinations.length > 0 && (
            <div className="flex items-center gap-2 mt-4 text-neutral-300 text-sm font-medium">
              <MapPin className="size-4 text-primary shrink-0" />
              <span>{pkg.destinations.join('  •  ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Rich Editorial Narrative & Itinerary */}
          <div className="lg:col-span-8 space-y-12">
            {/* Editorial Overview */}
            <section className="space-y-4">
              <span className="text-[11px] uppercase font-mono tracking-[0.2em] text-primary">
                Curator&apos;s Prologue
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                The Essence of the Expedition
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
                {pkg.description}
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Hand-curated by our senior Indian expedition directors, this journey marries
                exclusive access to heritage palaces with private chauffeur transit, discreet
                concierge logistics, and unparalleled culinary mastery. Every transfer, private
                tour, and suite reservation is overseen by your dedicated personal concierge.
              </p>
            </section>

            {/* Signature Highlights */}
            {pkg.highlights && pkg.highlights.length > 0 && (
              <section className="space-y-6">
                <span className="text-[11px] uppercase font-mono tracking-[0.2em] text-primary">
                  Signature Inclusions
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                  Itinerary Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pkg.highlights.map((highlight, index) => (
                    <div
                      key={highlight}
                      className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl flex items-start gap-3.5 hover:border-primary/40 transition-colors"
                    >
                      <span className="size-7 rounded-lg bg-primary/15 border border-primary/30 text-primary font-mono text-xs font-semibold flex items-center justify-center shrink-0">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{highlight}</h3>
                        <p className="text-xs text-neutral-400 mt-1">
                          Private access coordinated through our sovereign hospitality partnerships.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Destinations Breakdown */}
            {pkg.destinations && pkg.destinations.length > 0 && (
              <section className="space-y-6">
                <span className="text-[11px] uppercase font-mono tracking-[0.2em] text-primary">
                  Route Architecture
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                  Destinations Visited
                </h2>
                <div className="flex flex-wrap gap-3">
                  {pkg.destinations.map((city, idx) => (
                    <div
                      key={city}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-medium text-neutral-200"
                    >
                      <span className="text-primary font-mono text-[10px]">LEG 0{idx + 1}</span>
                      <span>{city}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Visually Distinct "At a Glance" UI Section */}
            <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-neutral-900/80 via-slate-950/90 to-neutral-900/60 p-6 sm:p-9 backdrop-blur-2xl shadow-2xl shadow-black/60 space-y-8">
              {/* Subtle Luxury Gold & Emerald Ambient Lighting */}
              <div className="pointer-events-none absolute -top-24 -left-24 size-64 rounded-full bg-emerald-500/10 blur-[90px]" />
              <div className="pointer-events-none absolute -bottom-24 -right-24 size-64 rounded-full bg-primary/10 blur-[90px]" />

              {/* Section Header */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary backdrop-blur-md mb-2">
                    <Sparkles className="size-3" />
                    At a Glance
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight">
                    Hyper-Transparent Itinerary Curation
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light max-w-2xl leading-relaxed">
                    Designed for high-net-worth patrons and NRI families. Complete clarity separating fully hosted royal amenities from self-arranged international logistics.
                  </p>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                  <ShieldCheck className="size-3.5" />
                  Verified Curation
                </span>
              </div>

              {/* Two-Column Grid: Bespoke Inclusions vs. Client Responsibilities */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Column 1: Bespoke Inclusions (with Checkmark Icons) */}
                <div className="flex flex-col justify-between rounded-2xl border border-emerald-500/30 bg-neutral-900/60 p-6 sm:p-7 backdrop-blur-xl relative overflow-hidden space-y-6 shadow-lg shadow-emerald-950/20 group hover:border-emerald-500/50 transition-colors">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-md">
                          <CheckCircle2 className="size-5" />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl text-white font-medium">
                            Bespoke Inclusions
                          </h3>
                          <span className="text-[10px] font-mono text-emerald-400/90 uppercase tracking-wider block">
                            Complimentary Sarrin Privileges
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Included
                      </span>
                    </div>

                    <ul className="space-y-3 text-xs sm:text-sm text-neutral-200">
                      {(pkg.inclusions && pkg.inclusions.length > 0 ? pkg.inclusions : [
                        'Taj Lake Palace Grand Presidential Suite & Palace stays',
                        'Private twin-engine helicopter transfers and chauffeur fleet',
                        'Dedicated 24/7 personal concierge and curator liaison',
                        'All royal palace courtyard dining and sommelier pairings'
                      ]).map((inc, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="size-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/40">
                            <Check className="size-2.5" />
                          </div>
                          <span className="leading-relaxed font-light">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10 text-[11px] text-neutral-400 flex items-center gap-2 font-mono">
                    <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                    <span>All domestic permits, chauffeurs &amp; palace taxes included</span>
                  </div>
                </div>

                {/* Column 2: Client Responsibilities (with Subtle Minus Icons) */}
                <div className="flex flex-col justify-between rounded-2xl border border-white/12 bg-neutral-900/60 p-6 sm:p-7 backdrop-blur-xl relative overflow-hidden space-y-6 shadow-lg group hover:border-white/25 transition-colors">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-white/5 text-neutral-400 border border-white/10 shadow-md">
                          <MinusCircle className="size-5 text-neutral-400" />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl text-white font-medium">
                            Client Responsibilities
                          </h3>
                          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                            Self-Arranged / Discretionary
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
                        Excluded
                      </span>
                    </div>

                    <ul className="space-y-3 text-xs sm:text-sm text-neutral-400">
                      {(pkg.exclusions && pkg.exclusions.length > 0 ? pkg.exclusions : [
                        'International and inter-continental airfare',
                        'Indian consular tourist visa fees',
                        'Discretionary royal staff and chauffeur gratuities',
                        'Personal bespoke antique or jewelry purchases'
                      ]).map((exc, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="size-4 rounded-full bg-white/10 text-neutral-400 flex items-center justify-center shrink-0 mt-0.5 border border-white/15">
                            <Minus className="size-2.5 text-neutral-400" />
                          </div>
                          <span className="leading-relaxed font-light">{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10 text-[11px] text-neutral-500 flex items-center gap-2 font-mono">
                    <MinusCircle className="size-3.5 text-neutral-500 shrink-0" />
                    <span>Disclosed upfront with zero hidden resort surcharges</span>
                  </div>
                </div>
              </div>

              {/* NRI & Global Logistics Advisory Box (Controlled by Feature Flag) */}
              {ENABLE_GLOBAL_CONCIERGE && (
                <div className="relative z-10 rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-4 sm:p-5 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="size-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
                      <Globe className="size-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">
                        Global &amp; NRI Traveler Logistics Protocol
                      </h4>
                      <p className="text-[11px] text-neutral-300 leading-relaxed mt-0.5 font-light">
                        While international flights and consular visas are client-booked, our Global Concierge provides complimentary flight synchronization (with DEL/BOM tarmac escort) and e-visa pre-clearance assistance.
                      </p>
                    </div>
                  </div>

                  <a
                    href="/contact?desk=nri"
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-medium transition-colors"
                  >
                    <span>NRI Desk</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              )}
            </section>

            {/* Inclusions & Guarantees */}
            <section className="p-8 rounded-3xl bg-neutral-900/40 border border-white/[0.08] backdrop-blur-xl space-y-6">
              <h3 className="font-serif text-xl text-white font-semibold">
                The Sarrin White-Glove Standard
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>Bespoke 24/7 dedicated personal concierge liaison throughout your stay</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>Executive private chauffeur fleet and high-touch airport tarmac transfers</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>VIP palace fast-track privileges and private curator-led heritage walks</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>Complimentary customized dietary provisioning and private sommelier pairing</span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Booking & Pricing Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-3xl border border-primary/30 bg-neutral-900/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/80 space-y-6">
                {/* Scarcity / Availability Callout on Card */}
                {pkg.scarcity_status && (
                  <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3.5 flex items-start gap-2.5 text-xs text-rose-200">
                    <Sparkles className="size-4 shrink-0 text-rose-400 mt-0.5" />
                    <div>
                      <div className="font-semibold text-rose-300 uppercase tracking-wider text-[10px] font-mono">
                        Exclusive Availability Notice
                      </div>
                      <p className="text-[11px] leading-snug mt-0.5">{pkg.scarcity_status}</p>
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block mb-1">
                    Bespoke Private Curation
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-white">
                      ₹{(pkg.price < 10000 ? pkg.price * 100 : pkg.price).toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">/ guest</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Based on double occupancy • Inclusive of private transfers, palace suites & taxes
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-3 text-xs">
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">Duration</span>
                    <span className="font-semibold text-white">{pkg.duration}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">Classification</span>
                    <span className="font-semibold text-primary">Private Luxury Tour</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">Availability</span>
                    <span className="font-semibold text-emerald-400">
                      {pkg.scarcity_status ? 'High Demand / Limited' : 'Immediate Confirmation'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <PackageInquiryTrigger
                    packageTitle={pkg.title}
                    classification="Curated Luxury Expedition"
                    buttonText="Request Confidential Itinerary"
                  />

                  <a
                    href="https://wa.me/919820044810?text=Hello%20Sarrin%20Holidays%2C%20I%20would%20like%20to%20inquire%20about%20the%20curated%20itinerary."
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 py-3 px-4 text-xs font-medium text-emerald-300 transition-colors"
                  >
                    <Phone className="size-3.5" />
                    <span>Instant WhatsApp Concierge</span>
                  </a>
                </div>

                <div className="border-t border-white/10 pt-4 text-center">
                  <p className="text-[11px] text-neutral-500 font-mono">
                    24/7 Chief Operations Desk: +91 (0) 22 6982 5500
                  </p>
                </div>
              </div>

              {/* Security & Confidentiality Card */}
              <div className="p-5 rounded-2xl bg-neutral-900/40 border border-white/[0.06] text-xs text-neutral-400 space-y-2">
                <div className="flex items-center gap-2 text-white font-medium">
                  <ShieldCheck className="size-4 text-primary" />
                  <span>Strict NDA & VIP Guarantee</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  All guest manifests, special security requirements, and custom flight requests are
                  safeguarded under strict confidentiality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
