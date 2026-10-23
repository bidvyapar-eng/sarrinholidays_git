import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabaseClient'
import { Navbar } from '@/components/navbar'
import { fallbackPackages, type PackageItem } from '@/lib/cms'
import { JsonLd } from '@/components/json-ld'
import { PackageInquiryTrigger } from '@/components/package-inquiry-trigger'
import { ItineraryAccordion } from '@/components/itinerary-accordion'
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
  Building2,
  Car,
  Utensils,
  Ticket,
  FileText,
  Navigation,
} from 'lucide-react'

export const DOMESTIC_LUXURY_PILLARS = [
  {
    title: '5-Star Palace & Luxury Resort Stays',
    desc: 'Presidential suites, private pool villas, and living royal residences with bespoke butler service.',
    icon: Building2,
  },
  {
    title: 'Inter-City Luxury Transfers',
    desc: 'Armored chauffeur fleet (Mercedes-Maybach & Toyota Vellfire) or twin-engine helicopter charters.',
    icon: Car,
  },
  {
    title: 'Curated Regional Cuisine & Private Chef',
    desc: 'Private palace courtyards, regional royal degustations, and master-chef bespoke dietary curation.',
    icon: Utensils,
  },
  {
    title: 'Monument VIP Passes & Curated Access',
    desc: 'Fast-track royal fortress entries, after-hours museum access, and private historian liaisons.',
    icon: Ticket,
  },
  {
    title: 'State Entry Taxes & Toll Clearances',
    desc: 'All inter-state green cess, luxury entry permits, and highway Fastag tolls pre-paid and cleared.',
    icon: FileText,
  },
]

export interface ItineraryStop {
  day: string
  destination: string
  highlight: string
  description: string
  tags: string[]
}

export function getPackageItinerary(pkg: PackageItem): ItineraryStop[] {
  const title = (pkg.title || '').toLowerCase()
  const slug = (pkg.slug || '').toLowerCase()

  if (slug.includes('rajasthan') || title.includes('heritage') || title.includes('palace')) {
    return [
      {
        day: 'Day 01 – 03',
        destination: 'Udaipur — Sovereign Lakes & Aravali Ramparts',
        highlight: 'Taj Lake Palace Presidential Suite Arrival',
        description:
          'Private arrival transfer via vintage Rolls-Royce fleet. Check-in to the Grand Presidential Suite at Taj Lake Palace. Sunset private catamaran cruise on Lake Pichola with customized royal Mewari dinner prepared by the executive chef.',
        tags: ['Private Boat', 'Vintage Transfer', 'Palace Suite'],
      },
      {
        day: 'Day 04 – 06',
        destination: 'Jodhpur — The Blue Fortress Citadel',
        highlight: 'Helicopter Transfer & Umaid Bhawan Palace',
        description:
          'Twin-engine private helicopter flight to Jodhpur. Residence at Umaid Bhawan Palace. Exclusive after-hours torchlit private tour of Mehrangarh Fort led by the chief royal curator, followed by champagne on the ramparts.',
        tags: ['Aviation Transfer', 'Curator Access', 'Mehrangarh Night Tour'],
      },
      {
        day: 'Day 07 – 10',
        destination: 'Jaipur — The Royal Pink Capital',
        highlight: 'Rambagh Palace & Amber Fort Sovereign Access',
        description:
          'Chauffeured inter-city transfer in luxury armored SUV with pre-cleared toll corridors. Stay at Rambagh Palace Sukh Niwas Suite. Private sunrise access to Amber Fort Sheesh Mahal before public opening hours and royal polo club luncheon.',
        tags: ['Armored SUV Fleet', 'Rambagh Palace', 'VIP Passes'],
      },
    ]
  }

  if (slug.includes('kerala') || title.includes('backwater') || title.includes('coast')) {
    return [
      {
        day: 'Day 01 – 03',
        destination: 'Alleppey — Backwater Palm Lagoons',
        highlight: 'Exclusive Kettuvallam Houseboat Buyout',
        description:
          'Private chauffeur transfer from Kochi airport in Toyota Vellfire. Private boarding of an ultra-luxury air-conditioned 2-bedroom Kettuvallam houseboat. Dedicated Private Chef serving fresh Karimeen and Malabar coastal degustation.',
        tags: ['Houseboat Buyout', 'Private Chef', 'Vellfire Transfer'],
      },
      {
        day: 'Day 04 – 05',
        destination: 'Bekal — Secluded Northern Coast',
        highlight: 'Taj Bekal Cliffside Pool Villa & Ayurveda',
        description:
          'Chauffeured coastal transfer with all inter-district toll clearances. Stay in a secluded private plunge pool villa at Taj Bekal. Daily personalized 90-minute Ayurvedic Abhyanga sessions led by certified Vaidyas.',
        tags: ['Private Pool Villa', 'Ayurvedic Doctor', 'Inter-City Transfer'],
      },
      {
        day: 'Day 06 – 07',
        destination: 'South Goa — Pristine Coastal Sanctuary',
        highlight: 'Private Sunset Yacht Charter',
        description:
          'Private transit to private South Goa beachfront residence. Sunset catamaran and private yacht sail with sommelier wine tasting and secluded beach picnic.',
        tags: ['Private Yacht', 'Sommelier Pairing', 'Coastal Concierge'],
      },
    ]
  }

  if (
    slug.includes('spiritual') ||
    title.includes('spiritual') ||
    title.includes('wellness') ||
    title.includes('himalaya')
  ) {
    return [
      {
        day: 'Day 01 – 03',
        destination: 'Varanasi — The Eternal Sacred River',
        highlight: 'Private Ganga Aarti VIP River Barge',
        description:
          'VIP tarmac reception at Varanasi airport with luxury SUV escort to BrijRama Palace. Exclusive private multi-deck bajra boat anchored for Ganga Aarti with Vedic chanting and personal priest blessing.',
        tags: ['Private Barge', 'Vedic Priest', 'Heritage Palace'],
      },
      {
        day: 'Day 04 – 05',
        destination: 'Rishikesh — Foothills of the Divine',
        highlight: 'Private Helipad Transit & Ganges Cleansing',
        description:
          'Private air charter to Dehradun and direct helipad landing. Stay at Taj Rishikesh Resort & Spa. Private riverside havan ceremony and morning guided meditation with Himalayan masters.',
        tags: ['Helicopter Charter', 'Meditation Master', 'Private Ghat'],
      },
      {
        day: 'Day 06 – 08',
        destination: 'Narendra Nagar — Ananda in the Himalayas',
        highlight: 'Viceregal Palace Suite & Panchakarma',
        description:
          'Chauffeured luxury mountain motorcade to Ananda in the Himalayas. Personalized wellness consultation, custom Dosha cuisine, and restorative hydrotherapy treatments overlooking the Doon Valley.',
        tags: ['Ananda Palace', 'Ayurvedic Pulse', 'Mountain Chauffeur'],
      },
    ]
  }

  if (slug.includes('wild') || title.includes('wild') || title.includes('safari') || title.includes('tiger')) {
    return [
      {
        day: 'Day 01 – 03',
        destination: 'Ranthambore — Royal Bengal Tiger Reserve',
        highlight: 'Exclusive 4x4 Private Gypsy Safaris',
        description:
          'Direct luxury train or chauffeur transfer from Jaipur. Stay at Aman-i-Khás luxury tented camp. Exclusive open-top 4x4 gypsy safaris in Zone 3 with chief wildlife naturalist tracking Royal Bengal Tigers.',
        tags: ['Private 4x4 Gypsy', 'Master Naturalist', 'Luxury Tents'],
      },
      {
        day: 'Day 04 – 06',
        destination: 'Bandhavgarh — High-Density Apex Sanctuaries',
        highlight: 'Mahua Kothi & Private Wilderness Tracking',
        description:
          'Private aviation transfer to Tala airstrip. Residence at Taj Mahua Kothi. Sunrise and twilight wilderness safaris tracking leopards, sloth bears, and tiger cubs with bespoke bush breakfasts.',
        tags: ['Private Aviation', 'Bush Breakfast', 'Apex Reserve'],
      },
      {
        day: 'Day 07 – 09',
        destination: 'Jim Corbett — The Historic Himalayan Foothills',
        highlight: 'Dhikala Grasslands & Riverside Camp',
        description:
          'Executive chauffeur motorcade through scenic foothills. Exclusive Dhikala forest permits and private elephant patrol escorts along the Ramganga river.',
        tags: ['Dhikala Permit', 'Chauffeur Motorcade', 'VIP Forest Clearance'],
      },
    ]
  }

  const dests = pkg.destinations && pkg.destinations.length > 0 ? pkg.destinations : ['Royal Hub', 'Sacred Circuit', 'Coastal Haven']
  return dests.map((dest, i) => ({
    day: `Leg 0${i + 1}`,
    destination: dest,
    highlight: `Curated Sovereign Experience in ${dest}`,
    description: `Bespoke luxury itinerary hosted in ${dest}. Includes 5-star palace accommodation, dedicated personal chauffeur, and curated VIP monument entries.`,
    tags: ['Luxury Palace', 'Private Chauffeur', 'VIP Pass'],
  }))
}

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

export async function generateStaticParams() {
  return fallbackPackages.map((pkg) => ({
    slug: pkg.slug,
  }))
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

  const itineraryDays = getPackageItinerary(pkg)

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
    <div className="relative min-h-screen bg-slate-950 text-foreground overflow-x-hidden w-full max-w-[100vw] selection:bg-primary/30 selection:text-primary">
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
      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 pt-16 md:pt-20 pb-32 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Rich Editorial Narrative & Itinerary */}
          <div className="lg:col-span-8 space-y-16">
            {/* Editorial Overview */}
            <section className="space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-primary font-medium">
                Curator&apos;s Prologue
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-medium">
                The Essence of the Expedition
              </h2>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-light">
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
                <span className="text-xs uppercase font-mono tracking-widest text-primary font-medium">
                  Signature Inclusions
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-medium">
                  Itinerary Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pkg.highlights.map((highlight, index) => (
                    <div
                      key={highlight}
                      className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl flex items-start gap-3.5 transition-all duration-500 ease-out hover:border-primary/50 hover:bg-neutral-900/80 hover:shadow-2xl hover:shadow-black/50"
                    >
                      <span className="size-7 rounded-lg bg-primary/15 border border-primary/30 text-primary font-mono text-xs font-semibold flex items-center justify-center shrink-0">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{highlight}</h3>
                        <p className="text-xs text-neutral-400 mt-1 font-light">
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
                <span className="text-xs uppercase font-mono tracking-widest text-primary font-medium">
                  Route Architecture
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-medium">
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

            {/* Day-by-Day Itinerary Collapsible Accordion (Radix UI) */}
            <ItineraryAccordion items={itineraryDays} duration={pkg.duration} />

            {/* Visually Distinct "At a Glance" UI Section */}
            <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-neutral-900/80 via-slate-950/90 to-neutral-900/60 p-6 sm:p-9 backdrop-blur-2xl shadow-2xl shadow-black/60 space-y-8">
              {/* Subtle Luxury Gold & Emerald Ambient Lighting */}
              <div className="pointer-events-none absolute -top-24 -left-24 size-64 rounded-full bg-emerald-500/10 blur-[90px]" />
              <div className="pointer-events-none absolute -bottom-24 -right-24 size-64 rounded-full bg-primary/10 blur-[90px]" />

              {/* Section Header */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary backdrop-blur-md mb-2">
                    <Sparkles className="size-3" />
                    At a Glance
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-normal tracking-tight">
                    Hyper-Transparent Itinerary Curation
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light max-w-2xl leading-relaxed">
                    Designed specifically for high-net-worth patrons and discerning Indian domestic travelers. Uncompromising clarity across accommodations, transfers, gastronomy, VIP accesses, and toll clearances.
                  </p>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                  <ShieldCheck className="size-3.5" />
                  Verified Domestic Standard
                </span>
              </div>

              {/* 5 Flagship Domestic Luxury Pillars */}
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary font-medium">
                    Domestic Travel Specifics
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {DOMESTIC_LUXURY_PILLARS.map((pillar) => {
                    const Icon = pillar.icon
                    return (
                      <div
                        key={pillar.title}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md flex flex-col justify-between transition-all duration-500 ease-out hover:border-primary/50 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-black/40"
                      >
                        <div className="space-y-2">
                          <div className="size-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                            <Icon className="size-4" />
                          </div>
                          <h4 className="text-xs font-semibold text-white leading-snug">
                            {pillar.title}
                          </h4>
                          <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                            {pillar.desc}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
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
                        '5-Star Palace & Luxury Resort stays (Presidential Suites & Private Pool Villas)',
                        'Inter-city luxury transfers via Mercedes-Maybach / Toyota Vellfire & Helicopter charters',
                        'Curated regional cuisine & Private Chef degustations across royal properties',
                        'Monument VIP passes & fast-track clearances with private royal historians',
                        'All domestic state entry taxes, highway Fastag tolls, and green clearances pre-paid',
                        'Dedicated 24/7 personal concierge liaison and white-glove baggage service'
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
                        'Commercial transcontinental or international long-haul flights',
                        'Consular visa procurement fees for international accompanying guests',
                        'Discretionary royal palace staff and chauffeur gratuities',
                        'Personal bespoke antique acquisitions, gemstones, or custom textiles'
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

      {/* Sticky Bottom Action Bar for Mobile Devices (< 1024px) */}
      <div className="block lg:hidden fixed bottom-0 inset-x-0 z-50 bg-slate-950/95 backdrop-blur-2xl border-t border-white/10 p-3 sm:p-4 shadow-[0_-10px_35px_rgba(0,0,0,0.85)]">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block truncate">
              All-Inclusive Domestic
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-xl sm:text-2xl font-bold text-white">
                ₹{(pkg.price < 10000 ? pkg.price * 100 : pkg.price).toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] font-mono text-neutral-400">/ guest</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://wa.me/919820044810?text=Hello%20Sarrin%20Holidays%2C%20I%20would%20like%20to%20inquire%20about%20the%20curated%20domestic%20tour."
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 transition-colors"
            >
              <Phone className="size-4" />
            </a>

            <PackageInquiryTrigger
              packageTitle={pkg.title}
              classification="Curated Domestic Luxury Expedition"
              buttonText="Plan Your Journey"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
