import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabaseClient'
import { Navbar } from '@/components/navbar'
import { fallbackServices, type ServiceItem } from '@/lib/cms'
import { ServiceInquiryCard } from '@/components/service-inquiry-card'
import { ServiceRequestButton } from '@/components/service-request-button'
import { JsonLd } from '@/components/json-ld'
import {
  ArrowLeft,
  Plane,
  Crown,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Compass,
  ArrowUpRight,
  Award,
  HelpCircle,
  FileText,
  MapPin,
  Phone,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

// Detailed specifications, editorial essays, and operational pillars for each service
const SERVICE_DOSSIERS: Record<
  string,
  {
    subtitle: string
    pricing: string
    leadTime: string
    classification: string
    coverage: string
    inclusions: string[]
    editorial: {
      lead: string
      bodyOne: string
      bodyTwo: string
    }
    pillars: Array<{
      title: string
      desc: string
      metric: string
    }>
    timeline: Array<{
      step: string
      title: string
      desc: string
    }>
    faqs: Array<{
      q: string
      a: string
    }>
  }
> = {
  'private-aviation-charters': {
    subtitle: 'Direct mountain helipad landings, executive turboprops, and transcontinental private jets.',
    pricing: 'From $4,800 / flight hr',
    leadTime: '4 - 6 Hours Notice',
    classification: 'Sovereign & Ultra-Long Range',
    coverage: 'Pan-India, Himalayas & International Corridors',
    inclusions: [
      'Direct mountain helipad landings at exclusive Himalayan retreats',
      'VIP tarmac transfers & FBO executive lounges across Delhi, Mumbai & Jaipur',
      'Personalized in-flight dining by private Michelin-calibre culinary team',
      'Diplomatic clearances & real-time high-altitude weather routing',
      'Dedicated 24/7 aviation operations liaison & baggage escorts',
    ],
    editorial: {
      lead: 'In the geography of the Indian subcontinent, true luxury is measured in hours reclaimed and landscapes unlocked. Commercial aviation remains tethered to crowded runways; Sarrin Private Aviation liberates your itinerary entirely.',
      bodyOne: 'Our curated fleet ranges from high-altitude Airbus H125 and H130 helicopters capable of landing on private alpine resort pads in Rishikesh, Kedarnath, and Ladakh, to ultra-long-range Cessna Citation and Gulfstream private jets linking cosmopolitan hubs in effortless serenity.',
      bodyTwo: 'Every charter is overseen by our Senior Operations Flight Desk. From tarmac vehicle escorts that allow you to step directly from your chauffeured vehicle into your cabin, to bespoke in-flight gastronomy calibrated to your dietary preferences, your journey proceeds with absolute privacy.',
    },
    pillars: [
      {
        title: 'High-Altitude Mountain Approvals',
        desc: 'Certified twin and single-engine turbine helicopters piloted by veteran high-altitude captains with extensive Himalayan flight hours.',
        metric: '18,000 ft Service Ceiling',
      },
      {
        title: 'Zero Tarmac Friction',
        desc: 'Direct private terminal (FBO) arrivals with expedited diplomatic immigration, discreet baggage transfers, and tarmac boarding.',
        metric: '12 Min Curbside-to-Air',
      },
      {
        title: 'Calibrated In-Flight Menus',
        desc: 'Farm-to-table cuisine, vintage cellar selections, and bespoke Ayurvedic dietary menus prepared specifically for cabin altitude comfort.',
        metric: 'Michelin-Trained Chefs',
      },
      {
        title: 'Sovereign Manifest Protection',
        desc: 'Passenger manifests, routing schedules, and client identities are safeguarded under strict non-disclosure security protocols.',
        metric: '100% Confidentiality',
      },
    ],
    timeline: [
      {
        step: '01',
        title: 'Confidential Flight Architecture',
        desc: 'Submit your desired routing and passenger manifest. Our flight desk selects the optimal aircraft, verifies mountain slot clearances, and confirms FBO slots.',
      },
      {
        step: '02',
        title: 'VIP Tarmac Escort',
        desc: 'Arrive at the private terminal where your dedicated Sarrin Holidays liaison coordinates direct vehicle tarmac boarding without entering public airport infrastructure.',
      },
      {
        step: '03',
        title: 'Direct Mountain / City Touchdown',
        desc: 'Touch down directly on the helipad of your heritage palace or Himalayan estate, where the local Sarrin Holidays team awaits with private transfers.',
      },
    ],
    faqs: [
      {
        q: 'Can helicopters land directly at Himalayan hotels and retreat properties?',
        a: 'Yes. We maintain dedicated private helipad access agreements with leading properties including Ananda in the Himalayas, Taj Corbett, and exclusive private estates across Uttarakhand, Himachal Pradesh, and Ladakh.',
      },
      {
        q: 'What is the required booking notice for a private charter?',
        a: 'While we recommend 24 to 48 hours for bespoke international flights and custom catering, our emergency flight operations desk can position standby aircraft across Delhi and Mumbai within 4 to 6 hours.',
      },
      {
        q: 'How are passenger privacy and security guaranteed?',
        a: 'All flights operate through dedicated private FBO terminals. Manifests are managed under strict NDA agreements, and no flight data is shared with third parties.',
      },
    ],
  },
  'royal-celebrations-weddings': {
    subtitle: 'Exclusive heritage palace buyouts, royal courtyards, and sovereign celebration curation by Sarrin Holidays.',
    pricing: 'From $45,000 / buyout day',
    leadTime: '3 - 6 Months Preferred',
    classification: 'Full Property Buyout & Royal Protocol',
    coverage: 'Udaipur, Jaipur, Jodhpur & Jaisalmer',
    inclusions: [
      'Complete private buyouts of 18th-century Rajputana fortresses and lake palaces',
      'Regal torchlit courtyard banquets with multi-course royal thali feasts',
      'Private desert sangeets & astronomy galas beneath Thar sand dune constellations',
      'Ceremonial welcomes with royal vintage motorcades & heritage fanfare',
      'Full white-glove event production & guest coordination logistics liaisons',
    ],
    editorial: {
      lead: 'A milestone celebration or wedding in Rajasthan is not merely an event—it is the staging of a sovereign history. Sarrin Holidays opens doors to private palaces and fortresses that remain completely inaccessible to the commercial public.',
      bodyOne: 'From complete buyouts of floating marble palaces on Lake Pichola to sunset banquets atop the 300-year-old sandstone ramparts of Jodhpur and Jaipur, we architect celebrations that resonate with majesty, authenticity, and impeccable taste.',
      bodyTwo: 'Our dedicated ceremonial production team coordinates every sensory detail: hand-sculpted floral arches, classical royal shehnai and sarangi virtuosos, vintage Rolls-Royce arrivals, and menus derived from authentic royal kitchen archives.',
    },
    pillars: [
      {
        title: 'Complete Property Exclusivity',
        desc: 'No outside guests or commercial tourists. The entire fortress, palace grounds, gardens, and suites belong exclusively to your party.',
        metric: '100% Private Estate',
      },
      {
        title: 'Historic Royal Gastronomy',
        desc: 'Multi-course royal feasts prepared in collaboration with royal family chefs, featuring heritage recipes passed through dynasties.',
        metric: 'Centuries-Old Recipes',
      },
      {
        title: 'Sensory Lighting & Architecture',
        desc: 'Thousands of beeswax candles, brass oil lanterns, and gentle architectural illumination highlighting ornate jharokhas and courtyards.',
        metric: 'Master Lighting Design',
      },
      {
        title: 'Comprehensive Guest Logistics',
        desc: 'VIP airport meet-and-greets, vintage motorcade transfers, suite allocation, and 24/7 dedicated Sarrin Holidays liaisons for every attending guest.',
        metric: 'Zero Guest Friction',
      },
    ],
    timeline: [
      {
        step: '01',
        title: 'Palace Curation & Private Inspection',
        desc: 'We curate a shortlist of heritage palaces matching your scale and aesthetic, arranging private chartered site inspections with the property owners.',
      },
      {
        step: '02',
        title: 'Celebration Master Planning',
        desc: 'Our production team designs the full multi-day itinerary: from intimate mehendi courtyards to grand sangeet galas and sunrise desert breakfasts.',
      },
      {
        step: '03',
        title: 'Royal Execution & Guest Care',
        desc: 'Our on-ground operations squad assumes complete command of the property, ensuring seamless ceremony flow, guest service, and executive security.',
      },
    ],
    faqs: [
      {
        q: 'What guest capacities can your curated palaces accommodate?',
        a: 'Our portfolio accommodates intimate gatherings of 20 to 50 guests in private havelis up to grand royal celebrations of 400+ guests in full fortresses across Udaipur and Jaipur.',
      },
      {
        q: 'Can you arrange private charter flights for all wedding guests?',
        a: 'Yes. Our aviation division coordinates guest group charters from London, Dubai, New York, Delhi, and Mumbai directly into Jaipur, Udaipur, or Jodhpur.',
      },
      {
        q: 'Are local regulatory permits and heritage clearances handled?',
        a: 'Every permit—including sound permissions, heritage architectural clearances, and fireworks licensing—is managed directly by our legal and operations team.',
      },
    ],
  },
  'wellness-ayurveda-sanctuaries': {
    subtitle: 'Physician-led Panchakarma, private Himalayan yoga pavilions, and coastal Ayurvedic sanctuaries.',
    pricing: 'From $1,400 / night per suite',
    leadTime: '1 - 2 Weeks Notice',
    classification: 'Physician-Led Holistic Restoration',
    coverage: 'Rishikesh, Tehri Garhwal, Kumarakom & Alleppey',
    inclusions: [
      'Comprehensive pulse diagnosis & consultation with hereditary Vaidya master physicians',
      'Daily customized Panchakarma therapies using certified organic herbal formulations',
      'Private cliffside yoga & pranayama pavilions with Himalayan masters',
      'Organic Sattvic cuisine tailored to individual dosha metabolic profiles',
      'Sacred evening riverfront Ganga aartis & Tibetan singing bowl sound healing',
    ],
    editorial: {
      lead: 'In a world of constant acceleration, the deepest luxury is profound physiological and spiritual renewal. Our wellness retreats synthesize five millennia of classical Vedic medicine with boutique estate hospitality.',
      bodyOne: 'We orchestrate restorative journeys in two of India’s most spiritually charged landscapes: the tranquil Himalayan foothills overlooking the sacred Ganges in Rishikesh, and the emerald palm-fringed lagoons of Kumarakom in Kerala.',
      bodyTwo: 'Under the guidance of hereditary Vaidya doctors, each day is structured to cleanse, restore, and elevate. From warm medicated oil shirodhara and herbal steam purifications to silent sunrise meditation on private river decks, you are held in complete serenity.',
    },
    pillars: [
      {
        title: 'Authentic Lineage Physicians',
        desc: 'Direct care from veteran Ayurvedic doctors and yogic masters trained in unbroken family lineages rather than generic commercial spa staff.',
        metric: '7th-Gen Vaidya Masters',
      },
      {
        title: 'Custom Dosha Alchemy',
        desc: 'Every herbal oil, herbal tea, and organic meal is prescribed specifically following pulse analysis (Nadi Pariksha) on arrival.',
        metric: '100% Tailored Formulation',
      },
      {
        title: 'Sacred Waterfront Solitude',
        desc: 'Private estate grounds situated along tranquil riverbanks and secret backwater lagoons, insulated from all external distraction.',
        metric: 'Pure Silence & Clean Air',
      },
      {
        title: 'Holistic Mind-Body Synthesis',
        desc: 'Integrating deep hydrotherapy, vibrational sound baths, classical Hatha yoga, and therapeutic mindfulness walks through sal forests.',
        metric: 'Full Reset Protocol',
      },
    ],
    timeline: [
      {
        step: '01',
        title: 'Pre-Arrival Wellness Consultation',
        desc: 'Prior to departure, our medical liaison conducts an initial intake covering lifestyle goals, dietary needs, and medical parameters.',
      },
      {
        step: '02',
        title: 'Diagnostic Nadi Pariksha',
        desc: 'Upon check-in at your private sanctuary suite, the Chief Ayurvedic Doctor performs a detailed pulse diagnosis to establish your personalized treatment blueprint.',
      },
      {
        step: '03',
        title: 'Daily Rhythmic Restoration',
        desc: 'Experience daily multi-hour therapeutic treatments, yoga and breathwork sessions, dosha-tailored nutrition, and evening sound therapy under starlit skies.',
      },
    ],
    faqs: [
      {
        q: 'What is the recommended length of stay for an authentic retreat?',
        a: 'While 5-day rejuvenation programs provide deep revitalization, a minimum of 7 to 14 days is recommended for comprehensive Panchakarma cellular detoxification.',
      },
      {
        q: 'Is the culinary experience completely customized?',
        a: 'Yes. Every meal is prepared by wellness chefs following daily physician prescriptions, utilizing fresh organic produce grown in local estate gardens.',
      },
      {
        q: 'Can retreats be combined with cultural journeys?',
        a: 'Yes. Many clients pair a 7-day restorative retreat in Rishikesh or Kerala with a private palace tour across Rajasthan or high-altitude aviation charters.',
      },
    ],
  },
  'vip-chauffeur-security': {
    subtitle: 'Armored luxury SUVs, Rolls-Royce ceremonial fleets, and international-standard executive protection.',
    pricing: 'From $950 / day protected motorcade',
    leadTime: '12 - 24 Hours Notice',
    classification: 'Executive Protection & Armored Fleet',
    coverage: 'Delhi, Mumbai, Bengaluru, Rajasthan & Goa',
    inclusions: [
      'Armored luxury SUVs (B6/B7 certified), Mercedes-Maybach & Rolls-Royce motorcades',
      'Tactically certified close-protection security officers trained to diplomatic standards',
      'Multilingual vetted executive chauffeurs with live diplomatic route management',
      'Real-time operations center tracking & emergency medical response liaison',
      'Complete counter-surveillance protocols & strict non-disclosure compliance',
    ],
    editorial: {
      lead: 'Navigating India’s dynamic metropolitan centres and historic terrain demands absolute logistical mastery. Sarrin VIP Chauffeur & Security provides sovereign-grade executive mobility paired with flawless luxury comfort.',
      bodyOne: 'Our meticulously maintained fleet comprises armored Range Rover Sentinels, Mercedes-Maybach sedans, luxury executive vans with mobile Wi-Fi conference lounges, and vintage convertibles for ceremonial palace arrivals in Udaipur and Jaipur.',
      bodyTwo: 'Every vehicle is crewed by vetted, tactically trained chauffeurs and close-protection officers with backgrounds in diplomatic security details. With advance route scouting, green-channel traffic management, and constant satellite operations oversight, you move with total assurance.',
    },
    pillars: [
      {
        title: 'Ballistic Armored Certification',
        desc: 'B6 and B7 level armored luxury SUVs engineered to provide comprehensive protection against ballistic threats while retaining luxury interiors.',
        metric: 'B6/B7 European Standard',
      },
      {
        title: 'Diplomatic Close Protection',
        desc: 'Officers trained in defensive driving, executive escort protocol, counter-surveillance, and emergency medical trauma response.',
        metric: 'Certified VIP Bodyguards',
      },
      {
        title: 'Live Route Intelligence',
        desc: 'Our 24/7 central operations room continuously monitors satellite traffic and local conditions, guiding motorcades through clear transit corridors.',
        metric: 'Real-Time Traffic Bypass',
      },
      {
        title: 'Vintage & Ceremonial Collection',
        desc: 'Immaculately restored 1940s and 50s Rolls-Royce, Cadillac, and Jaguar open-top convertibles for dramatic palace entrances.',
        metric: 'Historic Royal Classics',
      },
    ],
    timeline: [
      {
        step: '01',
        title: 'Security & Route Threat Assessment',
        desc: 'Our security directors review your itinerary, travel corridors, and public profile to design a customized motorcade and security allocation.',
      },
      {
        step: '02',
        title: 'Advance Corridor Scouting',
        desc: 'Advance security teams verify arrival gates, hotel secure loading docks, emergency medical facilities, and secondary egress paths.',
      },
      {
        step: '03',
        title: 'Flawless Motorcade Deployment',
        desc: 'Your private chauffeur and protective officers take command, delivering silent, punctual, and fortified transit throughout your stay.',
      },
    ],
    faqs: [
      {
        q: 'Are your security officers licensed and vetted?',
        a: 'Yes. All close-protection personnel are thoroughly vetted, government-cleared, and trained to international embassy and sovereign dignitary standards.',
      },
      {
        q: 'Can armored vehicles be positioned in multiple cities simultaneously?',
        a: 'Yes. We operate dedicated executive garages in New Delhi, Mumbai, Bengaluru, Jaipur, and Hyderabad with seamless inter-city motorcade handovers.',
      },
      {
        q: 'Can we request vintage convertibles for palace wedding entries?',
        a: 'Absolutely. We maintain a curated private collection of vintage royal cars available with period-uniformed chauffeurs across Rajasthan.',
      },
    ],
  },
}

function ServiceIcon({ name, className = 'size-5' }: { name: string; className?: string }) {
  switch (name?.toLowerCase()) {
    case 'plane':
      return <Plane className={className} />
    case 'crown':
      return <Crown className={className} />
    case 'shieldcheck':
    case 'shield':
      return <ShieldCheck className={className} />
    case 'compass':
      return <Compass className={className} />
    default:
      return <Crown className={className} />
  }
}

export async function generateStaticParams() {
  return fallbackServices.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const { data: dbService } = await supabase
    .from('services')
    .select('title, short_desc, full_desc, hero_image')
    .eq('slug', resolvedParams.slug)
    .maybeSingle()

  const service =
    (dbService as ServiceItem) ||
    fallbackServices.find((s) => s.slug === resolvedParams.slug)

  if (!service) {
    return {
      title: 'Bespoke Private Service | Sarrin Holidays',
      description: 'Bespoke luxury Indian travel and VIP services by Sarrin Holidays.',
    }
  }

  const title = `${service.title} | Luxury Travel | Sarrin Holidays`
  const description =
    service.short_desc ||
    service.full_desc?.slice(0, 160) ||
    'Bespoke luxury Indian travel service by Sarrin Holidays.'
  const imageUrl =
    service.hero_image ||
    'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&q=80&w=1200'

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/services/${service.slug}`,
      siteName: 'Sarrin Holidays',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${service.title} — Sarrin Holidays Atelier`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params

  // 1. Fetch site settings
  // 1. Parallel fetch site settings and service
  const [{ data: settings }, { data: dbService }] = await Promise.all([
    supabase.from('site_settings').select('navbar_logo_text').limit(1).maybeSingle(),
    supabase.from('services').select('*').eq('slug', resolvedParams.slug).maybeSingle(),
  ])

  // Fallback to local data if database is syncing
  const service: ServiceItem | undefined =
    (dbService as ServiceItem) ||
    fallbackServices.find((s) => s.slug === resolvedParams.slug)

  if (!service) {
    notFound()
  }

  const dossier = SERVICE_DOSSIERS[service.slug] || {
    subtitle: service.short_desc,
    pricing: 'Custom Quote Available',
    leadTime: '24 Hours Notice',
    classification: 'Tier 01 Private Service',
    coverage: 'Pan-India',
    inclusions: [
      'Dedicated personal Sarrin Holidays liaison',
      'Custom itinerary and schedule architecture',
      'White-glove ground execution',
      'Confidentiality under strict NDA protocol',
    ],
    editorial: {
      lead: service.short_desc,
      bodyOne: service.full_desc,
      bodyTwo: 'Every arrangement is engineered by Sarrin Holidays with sovereign-grade attention to detail.',
    },
    pillars: [
      {
        title: 'Bespoke Architecture',
        desc: 'Tailored specifically around your timing, comfort, and private preferences.',
        metric: '100% Customized',
      },
      {
        title: 'Discreet Operations',
        desc: 'Protected under stringent non-disclosure agreements and privacy covenants.',
        metric: 'Full Discretion',
      },
    ],
    timeline: [
      { step: '01', title: 'Consultation', desc: 'Initial confidential parameter review.' },
      { step: '02', title: 'Route Planning', desc: 'Detailed itinerary and slot confirmation.' },
      { step: '03', title: 'Flawless Execution', desc: 'White-glove delivery on the day of service.' },
    ],
    faqs: [
      {
        q: 'How do I initiate a private booking?',
        a: 'Submit your requirements via the confidential inquiry card or contact Sarrin Holidays directly.',
      },
    ],
  }

  // Fetch companion services for bottom navigation
  const otherServices = fallbackServices.filter((s) => s.slug !== service.slug)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarrinholidays.com'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}/services/${service.slug}#service`,
    name: service.title,
    description: service.short_desc || service.full_desc,
    image: service.hero_image,
    provider: {
      '@type': 'TravelAgency',
      name: 'Sarrin Holidays',
      url: siteUrl,
      telephone: '+91-22-6982-5500',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        description: dossier.pricing,
      },
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/services/${service.slug}`,
    },
  }

  return (
    <main className="relative min-h-screen bg-background selection:bg-primary/30 selection:text-primary overflow-x-hidden w-full max-w-[100vw] pb-28 md:pb-0">
      <JsonLd data={serviceSchema} id="service-schema" />
      {/* Floating Glass Navbar */}
      <Navbar logoText={settings?.navbar_logo_text} />

      {/* ========================================================================= */}
      {/* 1. MASSIVE IMMERSIVE HERO WITH DARK GRADIENT OVERLAY */}
      {/* ========================================================================= */}
      <section className="relative h-[70vh] sm:h-[80vh] min-h-[560px] w-full overflow-hidden flex items-end">
        {/* Full-bleed hero background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={service.hero_image}
            alt={service.title}
            className="size-full object-cover scale-105 animate-kenburns"
          />
          {/* Multi-layered cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Copy Container */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 w-full">
          {/* Back Navigation Link */}
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.1em] text-[#E5E2DC] hover:text-[#C5A059] transition-colors mb-6 group"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Services Hub</span>
          </Link>

          {/* Service Classification Eyebrow Badge */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 px-3.5 py-1 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#C5A059]">
              <ServiceIcon name={service.icon_name} className="size-3.5" />
              {dossier.classification}
            </span>

            <span className="rounded-sm border border-white/10 bg-[#141310] px-3 py-1 text-xs font-sans uppercase tracking-wider text-[#E5E2DC] hidden sm:inline-block">
              {dossier.coverage}
            </span>
          </div>

          {/* Service Main Headline */}
          <h1 className="font-serif font-medium text-4xl sm:text-6xl lg:text-7xl leading-[1.08] text-[#F4F2EC] max-w-4xl tracking-tight">
            {service.title}
          </h1>

          {/* Subtitle / Teaser */}
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-[#E5E2DC] font-normal leading-relaxed">
            {dossier.subtitle}
          </p>

          {/* Hero Action Trigger: Request this Service */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <ServiceRequestButton
              serviceTitle={service.title}
              classification={dossier.classification}
              variant="hero"
              label="Request this Service"
            />
          </div>

          {/* Bottom Fast-Facts Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-8 pt-6 border-t border-white/10 text-xs text-[#E5E2DC] font-sans">
            <div>
              <span className="text-[#E5E2DC]/60 block text-[10px] uppercase font-sans tracking-wider">Standard Pricing</span>
              <span className="text-[#C5A059] font-medium text-sm">{dossier.pricing}</span>
            </div>
            <div className="hidden sm:block h-6 w-[1px] bg-white/10" />
            <div>
              <span className="text-[#E5E2DC]/60 block text-[10px] uppercase font-sans tracking-wider">Lead Dispatch</span>
              <span className="text-[#F4F2EC] font-normal">{dossier.leadTime}</span>
            </div>
            <div className="hidden sm:block h-6 w-[1px] bg-white/10" />
            <div>
              <span className="text-[#E5E2DC]/60 block text-[10px] uppercase font-sans tracking-wider">Confidentiality</span>
              <span className="text-[#F4F2EC] font-normal">Strict NDA Standard</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TWO-COLUMN RESPONSIVE LAYOUT BELOW THE FOLD */}
      {/* ========================================================================= */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Rich Editorial, Specifications, Process, and FAQs */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-16">
            
            {/* Section 1: Editorial Essay */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="size-4 text-[#C5A059]" />
                <span className="text-xs uppercase tracking-[0.1em] text-[#C5A059] font-sans font-medium">
                  Curator Perspective
                </span>
              </div>
              <h2 className="font-serif font-medium text-3xl sm:text-4xl text-[#F4F2EC] leading-snug tracking-tight">
                The Philosophy of Frictionless Execution
              </h2>

              <div className="mt-6 space-y-5 text-base sm:text-lg text-[#E5E2DC] leading-relaxed font-normal">
                <p className="text-xl sm:text-2xl text-[#F4F2EC] font-serif leading-relaxed border-l-2 border-[#C5A059]/50 pl-5 italic">
                  &ldquo;{dossier.editorial.lead}&rdquo;
                </p>
                <p>{dossier.editorial.bodyOne}</p>
                <p>{dossier.editorial.bodyTwo}</p>
              </div>
            </div>

            {/* Section 2: Four Core Operational Pillars */}
            <div className="pt-4">
              <span className="text-xs uppercase tracking-[0.1em] text-[#C5A059] font-sans font-medium">
                Operational Framework
              </span>
              <h3 className="mt-2 font-serif font-medium text-2xl sm:text-3xl text-[#F4F2EC] tracking-tight">
                Sovereign Standards &amp; Capabilities
              </h3>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {dossier.pillars.map((pillar, i) => (
                  <div
                    key={i}
                    className="rounded-sm border border-white/10 bg-[#141310] p-6 hover:border-[#C5A059]/40 transition-colors"
                  >
                    <span className="inline-block rounded-sm bg-[#C5A059]/10 border border-[#C5A059]/30 px-2.5 py-0.5 text-[10px] font-sans text-[#C5A059] uppercase tracking-wider mb-3 font-medium">
                      {pillar.metric}
                    </span>
                    <h4 className="font-serif text-lg text-[#F4F2EC] font-normal">
                      {pillar.title}
                    </h4>
                    <p className="mt-2 text-sm text-[#E5E2DC] leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: The 3-Step Execution Sequence */}
            <div className="pt-4 border-t border-white/10">
              <span className="text-xs uppercase tracking-[0.1em] text-[#C5A059] font-sans font-medium">
                Sarrin Holidays Protocol
              </span>
              <h3 className="mt-2 font-serif font-medium text-2xl sm:text-3xl text-[#F4F2EC] tracking-tight">
                How Your Service Unfolds
              </h3>

              <div className="mt-8 space-y-4">
                {dossier.timeline.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row items-start gap-5 rounded-sm border border-white/10 bg-[#141310] p-6"
                  >
                    <div className="flex size-11 items-center justify-center rounded-sm bg-[#C5A059]/15 text-[#C5A059] font-serif font-medium text-lg shrink-0 border border-[#C5A059]/30">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-serif text-xl text-[#F4F2EC] font-normal">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 text-sm text-[#E5E2DC] leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Frequently Asked Inquiries */}
            <div className="pt-4 border-t border-white/10">
              <span className="text-xs uppercase tracking-[0.1em] text-[#C5A059] font-sans font-medium">
                Client Intelligence
              </span>
              <h3 className="mt-2 font-serif font-medium text-2xl sm:text-3xl text-[#F4F2EC] tracking-tight">
                Frequently Asked Inquiries
              </h3>

              <div className="mt-8 space-y-4">
                {dossier.faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-sm border border-white/10 bg-[#141310] p-6"
                  >
                    <div className="flex items-start gap-3">
                      <HelpCircle className="size-5 text-[#C5A059] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-serif text-lg text-[#F4F2EC] font-normal">
                          {faq.q}
                        </h4>
                        <p className="mt-2 text-sm text-[#E5E2DC] leading-relaxed font-normal">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Pricing & Inquiry Card */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24 space-y-6">
              <ServiceInquiryCard
                serviceTitle={service.title}
                pricing={dossier.pricing}
                leadTime={dossier.leadTime}
                inclusions={dossier.inclusions}
              />

              {/* Security & Confidentiality Advisory Badge */}
              <div className="rounded-sm border border-white/10 bg-[#141310] p-5 text-xs text-[#E5E2DC] space-y-2 font-normal">
                <div className="flex items-center gap-2 text-[#C5A059] font-sans font-medium uppercase tracking-wider text-[11px]">
                  <Award className="size-4" /> Sovereign Sarrin Holidays Guarantee
                </div>
                <p className="leading-relaxed">
                  Every booking is protected by our global operations warranty. Direct satellite flight tracking, VIP tarmac protocol, and zero cancellation penalties up to 48 hours prior to dispatch.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. COMPANION SERVICES SHOWCASE FOOTER */}
      {/* ========================================================================= */}
      <section className="relative border-t border-white/10 bg-[#0C0B09] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.1em] text-[#C5A059] font-sans font-medium">
                Sarrin Private Atelier
              </span>
              <h2 className="mt-2 font-serif font-medium text-3xl sm:text-4xl text-[#F4F2EC] tracking-tight">
                Companion Private Services
              </h2>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#C5A059] hover:underline"
            >
              <span>View All Services</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="group flex flex-col rounded-sm border border-white/10 bg-[#141310] overflow-hidden p-5 transition-all duration-300 hover:border-[#C5A059]/50 shadow-xl"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-white/10">
                  <img
                    src={other.hero_image}
                    alt={other.title}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-sm bg-[#141310]/80 backdrop-blur-md px-3 py-1 text-[11px] font-sans font-medium uppercase tracking-wider text-[#C5A059] border border-white/10">
                    <ServiceIcon name={other.icon_name} className="size-3" />
                    {other.title.split(' ')[0]}
                  </span>
                </div>

                <div className="mt-4 flex flex-col flex-1">
                  <h4 className="font-serif font-medium text-xl text-[#F4F2EC] group-hover:text-[#C5A059] transition-colors">
                    {other.title}
                  </h4>
                  <p className="mt-2 text-sm text-[#E5E2DC] line-clamp-2 leading-relaxed flex-1 font-normal">
                    {other.short_desc}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-sans font-medium uppercase tracking-[0.14em] text-[#C5A059]">
                    <span>Explore Dossier</span>
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STICKY BOTTOM ACTION BAR FOR MOBILE (< 768px)                             */}
      {/* ========================================================================= */}
      <div className="block md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#0C0B09]/95 backdrop-blur-2xl border-t border-white/10 p-3 sm:p-4 shadow-[0_-10px_35px_rgba(0,0,0,0.85)]">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block truncate">
              {dossier.leadTime}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-base sm:text-lg font-bold text-white truncate max-w-[140px]">
                {dossier.pricing}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://wa.me/919820044810?text=Hello%20Sarrin%20Holidays%2C%20I%20would%20like%20to%20inquire%20about%20your%20bespoke%20services."
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 transition-colors"
            >
              <Phone className="size-4" />
            </a>

            <ServiceRequestButton
              serviceTitle={service.title}
              classification={dossier.classification}
              variant="card"
              label="Plan Your Journey"
              className="w-auto px-5 py-3 text-xs font-bold min-h-[48px]"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
