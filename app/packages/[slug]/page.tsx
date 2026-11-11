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
import { SocialShare } from '@/components/social-share'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Star,
  Flame,
  XCircle,
  Clock,
  Compass,
  ArrowUpRight,
  ShieldCheck,
  Send,
  Phone,
  Mail,
  Award,
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

  // 1. Kerala 8D Grand Circuit
  if (slug.includes('kerala-gods-own-country') || (slug.includes('kerala') && (slug.includes('8d') || slug.includes('7n')))) {
    return [
      {
        day: 'Day 01',
        destination: 'Arrival in Kochi — Heritage & Colonial Harbor',
        highlight: 'Chinese Fishing Nets, Synagogue & Mattancherry',
        description:
          'Arrival at Kochi Airport with private reception. Check-in to Abad Atrium (Superior Room) or similar. Afternoon sightseeing of Chinese Fishing Nets, St. Francis Church, Santa Cruz Basilica, Jewish Synagogue, and historic Mattancherry Palace. Evening at leisure.',
        tags: ['Kochi Harbor', 'Abad Atrium', 'Private AC Car'],
      },
      {
        day: 'Day 02',
        destination: 'Kochi to Munnar — Tea Plantation Hills',
        highlight: 'Cheeyappara & Valara Waterfalls En Route',
        description:
          'Breakfast and check-out. Scenic morning drive towards the misty hills of Munnar with en route photo stops at Valara and Cheeyappara Waterfalls. Check-in to The Leaf (Green Leaf) or similar resort in Munnar. Evening free to relax or walk through tea gardens.',
        tags: ['Cheeyappara Falls', 'The Leaf Munnar', 'Tea Estates'],
      },
      {
        day: 'Day 03',
        destination: 'Munnar — Tea Estates & Scenic Reservoirs',
        highlight: 'Mattupetty Dam, Kundala Lake & Echo Point',
        description:
          'Full-day guided exploration of Munnar. Visit Mattupetty Dam, Kundala Lake, Echo Point, and panoramic tea plantation viewpoints. Enjoy refreshing mountain air and photograph sprawling green slopes. Overnight stay in Munnar.',
        tags: ['Mattupetty Dam', 'Kundala Lake', 'Echo Point'],
      },
      {
        day: 'Day 04',
        destination: 'Munnar to Thekkady — Cardamom Hills & Wildlife',
        highlight: 'Periyar Wildlife Sanctuary Boat Cruise',
        description:
          'Check out after breakfast and drive through the fragrant Cardamom Hills to Thekkady. Check-in to Spice Grove (Deluxe Room). Afternoon boat ride on Periyar Lake inside the Periyar Wildlife Sanctuary to spot wild elephants, gaur, and exotic birds. Optional spice plantation visit.',
        tags: ['Periyar Lake', 'Spice Grove', 'Wildlife Boat Ride'],
      },
      {
        day: 'Day 05',
        destination: 'Thekkady to Alleppey — Palm-Fringed Backwaters',
        highlight: 'Traditional A/C Deluxe Houseboat Overnight Cruise',
        description:
          'Drive to Alleppey jetty and board your private traditional A/C Deluxe Houseboat. Cruise through serene canals, village waterways, and paddy fields. Savor freshly prepared authentic Kerala meals on board and spend a peaceful night on the calm waters.',
        tags: ['Alleppey Houseboat', 'Private Chef Meals', 'Backwaters'],
      },
      {
        day: 'Day 06',
        destination: 'Alleppey to Kovalam — Golden Beach Sands',
        highlight: 'Check-in at KTDC Samudra Beachfront Resort',
        description:
          'Breakfast on board the houseboat before checkout. Scenic coastal drive to Kovalam. Check in to KTDC Samudra (Deluxe Room) or similar oceanfront property. Relax on the sandy beaches, watch the sunset over the Arabian Sea, or experience coastal amenities.',
        tags: ['Kovalam Beach', 'KTDC Samudra', 'Sunset Coast'],
      },
      {
        day: 'Day 07',
        destination: 'Kovalam & Trivandrum City Tour',
        highlight: 'Sree Padmanabhaswamy Temple & Napier Museum',
        description:
          'Day excursion to Trivandrum. Seek blessings at the historic Sree Padmanabhaswamy Temple, visit the Napier Museum, Chitra Art Gallery, Kuthiramalika Palace Museum, and Veli Tourist Village. Watch the waves at Shangumugham Beach before returning to Kovalam for dinner.',
        tags: ['Padmanabhaswamy', 'Napier Museum', 'Kuthiramalika Palace'],
      },
      {
        day: 'Day 08',
        destination: 'Kovalam to Trivandrum Airport — Departure',
        highlight: 'Private Airport Transfer for Onward Flight',
        description:
          'Enjoy breakfast by the sea and check out. Private AC transfer to Trivandrum International Airport for your scheduled onward flight with lifelong memories of Kerala.',
        tags: ['Airport Transfer', 'All-Inclusive Airfare', 'End of Services'],
      },
    ]
  }

  // 2. Kerala 5D Backwaters & Hills Escapade
  if (slug.includes('kerala-backwaters-hills') || (slug.includes('kerala') && (slug.includes('5d') || slug.includes('4n')))) {
    return [
      {
        day: 'Day 01',
        destination: 'Kochi Airport to Munnar',
        highlight: 'Hotel Cloud Palace & Misty Mountain Waterfalls',
        description:
          'Meet your driver at Kochi Airport and proceed toward Munnar. En route enjoy lush tea plantations, small mountain streams, and waterfalls. Check-in to Hotel Cloud Palace in Munnar and spend the evening at leisure.',
        tags: ['Hotel Cloud Palace', 'Airport Pickup', 'Cheeyappara'],
      },
      {
        day: 'Day 02',
        destination: 'Munnar — Full-Day Sightseeing',
        highlight: 'Mattupetty Dam, Echo Point & Kundala Lake',
        description:
          'After breakfast, embark on a scenic tour covering Mattupetty Dam, Echo Point, Kundala Lake, and tea plantation photo points. Return to Hotel Cloud Palace for an overnight stay.',
        tags: ['Mattupetty Dam', 'Kundala Lake', 'Tea Hills'],
      },
      {
        day: 'Day 03',
        destination: 'Munnar to Thekkady',
        highlight: 'Hotel Sandra Palace & Cardamom Hills Drive',
        description:
          'Breakfast and check-out. Drive to Thekkady through beautiful Cardamom Hills. Check-in at Hotel Sandra Palace. Evening at leisure for an optional spice plantation visit, cultural Kathakali show, or local shopping.',
        tags: ['Hotel Sandra Palace', 'Cardamom Hills', 'Spice Market'],
      },
      {
        day: 'Day 04',
        destination: 'Thekkady to Alleppey — Riverine Cruise',
        highlight: 'Full-Board Backwater Cruise with All Meals Included',
        description:
          'Drive to Alleppey and check in to Riverine Cruises at 12:00 noon. Enjoy a welcome drink, traditional lunch, evening tea & snacks, and delicious dinner on board while gliding through picturesque backwaters. Overnight stay on board.',
        tags: ['Riverine Cruise', 'Full Board Meals', 'Backwater Stay'],
      },
      {
        day: 'Day 05',
        destination: 'Alleppey to Kochi Airport Departure',
        highlight: 'Check-out at 9:00 AM & Airport Drop',
        description:
          'Breakfast on board the houseboat. Check out at 9:00 AM and transfer directly by private AC car to Kochi Airport for your departure, concluding your Kerala journey.',
        tags: ['Airport Drop', 'Private Car', 'End of Tour'],
      },
    ]
  }

  // 3. Kashmir Holidays 7D
  if (slug.includes('kashmir') || title.includes('kashmir')) {
    return [
      {
        day: 'Day 01',
        destination: 'Arrival in Srinagar — City of Gardens',
        highlight: 'Chashme Shahi, Nishat Bagh & Shalimar Bagh',
        description:
          'Arrive at Srinagar Airport with personal reception and transfer to your hotel. Visit the famous royal Mughal Gardens: Chashme Shahi, Nishat Bagh, and Shalimar Bagh along the Dal Lake shoreline. Evening at leisure.',
        tags: ['Mughal Gardens', 'Srinagar Stay', 'Airport Reception'],
      },
      {
        day: 'Day 02',
        destination: 'Srinagar to Sonamarg Excursion',
        highlight: 'Meadow of Gold & Thajiwas Glacier Views',
        description:
          'Full-day excursion to Sonamarg along the Sindh River. Witness towering snow peaks and alpine meadows. Optional pony ride to Thajiwas Glacier. Return to Srinagar in the evening for dinner and overnight stay.',
        tags: ['Sonamarg', 'Thajiwas Glacier', 'Alpine River'],
      },
      {
        day: 'Day 03',
        destination: 'Srinagar to Gulmarg — Meadow of Flowers',
        highlight: 'Gulmarg Gondola Ride (Phase 1 Included)',
        description:
          'Drive to Gulmarg, the premier winter sports resort of India. Board the world-famous Gulmarg Gondola Ride (Phase 1 ticket included) to reach high snow slopes. Enjoy snow activities and stay overnight in Gulmarg.',
        tags: ['Gondola Phase 1 Included', 'Snow Peaks', 'Gulmarg Resort'],
      },
      {
        day: 'Day 04',
        destination: 'Gulmarg to Pahalgam — Valley of Shepherds',
        highlight: 'Scenic Countryside Drive along Lidder River',
        description:
          'After breakfast, drive to Pahalgam through saffron fields and scenic pine countryside. Check-in to hotel and relax. Take a peaceful walk along the Lidder River or explore the local handicrafts market.',
        tags: ['Pahalgam Valley', 'Lidder River', 'Saffron Fields'],
      },
      {
        day: 'Day 05',
        destination: 'Pahalgam Sightseeing Excursion',
        highlight: 'Aru Valley, Betaab Valley & Chandanwari',
        description:
          'Explore the breathtaking landscapes of Aru Valley, Betaab Valley, and Chandanwari by local vehicle. Surrounded by emerald meadows and glacier streams. Return to Pahalgam for dinner and overnight stay.',
        tags: ['Betaab Valley', 'Aru Valley', 'Chandanwari'],
      },
      {
        day: 'Day 06',
        destination: 'Pahalgam to Srinagar Houseboat',
        highlight: 'Martand Sun Temple & 60-Min Dal Lake Shikara Ride',
        description:
          'Return drive to Srinagar, visiting the historic 8th-century Martand Sun Temple en route. Check in to a traditional Deluxe Houseboat on Dal Lake. In the evening, enjoy a 60-minute sunset Shikara ride across the lotus waters.',
        tags: ['Deluxe Houseboat', 'Shikara Ride Included', 'Martand Temple'],
      },
      {
        day: 'Day 07',
        destination: 'Srinagar Airport Departure',
        highlight: 'Transfer to Airport for Flight to Delhi',
        description:
          'Breakfast on the houseboat and check out. Transfer by private Toyota Etios to Srinagar Airport for your onward journey with unforgettable memories of Kashmir.',
        tags: ['Airport Transfer', 'Return Flights', 'End of Services'],
      },
    ]
  }

  // 4. Blissful Goa 4D
  if (slug.includes('goa') || title.includes('goa')) {
    return [
      {
        day: 'Day 01',
        destination: 'Arrival in Goa — Colva Beachfront',
        highlight: 'Hotel Colva Kinara & Leisure on Colva Sands',
        description:
          'Arrive in Goa and meet your driver. Transfer to Hotel Colva Kinara and check in. Spend the afternoon strolling along the wide white sands of Colva Beach, relaxing by beach shacks, and soaking in coastal sunsets.',
        tags: ['Hotel Colva Kinara', 'Colva Beach', 'Airport Pickup'],
      },
      {
        day: 'Day 02',
        destination: 'Full-Day North Goa Sightseeing',
        highlight: 'Fort Aguada, Baga, Candolim & Mandovi River Cruise',
        description:
          'Full-day North Goa tour visiting Dolphin Point, the 17th-century Portuguese Fort Aguada, Candolim Beach, and vibrant Baga Beach. Visit Snow Park and Thunder World. In the evening, embark on a scenic Mandovi River Cruise with folk dance performances.',
        tags: ['Fort Aguada', 'Baga Beach', 'River Cruise Included'],
      },
      {
        day: 'Day 03',
        destination: 'Full-Day South Goa Heritage & Temples',
        highlight: 'Old Goa UNESCO Churches, Mangueshi Temple & Spice Farm',
        description:
          'Explore South Goa heritage: Shantadurga Temple, Sahakari Spice Farm with traditional lunch, Big Foot museum, Mangueshi Temple, and the UNESCO World Heritage Basilica of Bom Jesus and Se Cathedral in Old Goa. Visit Wax World and Colva Beach.',
        tags: ['Old Goa Churches', 'Spice Farm', 'Mangueshi Temple'],
      },
      {
        day: 'Day 04',
        destination: 'Departure from Goa',
        highlight: 'Transfer to Airport / Railway Station',
        description:
          'Enjoy breakfast at Hotel Colva Kinara and check out. Private AC transfer to Goa Airport (Dabolim/Mopa) or Madgaon Railway Station for your departure journey.',
        tags: ['Airport Drop', 'Private AC Car', 'End of Tour'],
      },
    ]
  }

  // 5. Experience Varanasi 3D (Dev Deepawali)
  if (slug.includes('varanasi') || title.includes('varanasi') || slug.includes('deepawali')) {
    return [
      {
        day: 'Day 01',
        destination: 'Arrival in Varanasi & Kashi Darshan',
        highlight: 'Kashi Vishwanath Corridor & Dashashwamedh Ganga Aarti',
        description:
          'Arrival at Varanasi Airport or Railway Station and transfer to heritage hotel. Visit Kashi Vishwanath Temple via the new Corridor, Annapurna Temple, and Kal Bhairav Temple. In the evening, witness the grand Ganga Aarti ceremony from the steps of Dashashwamedh Ghat.',
        tags: ['Kashi Vishwanath Corridor', 'Ganga Aarti', 'Kal Bhairav'],
      },
      {
        day: 'Day 02',
        destination: 'Subah-e-Banaras & Dev Deepawali Festival',
        highlight: 'Special Dev Deepawali Boat Ride, Deepdaan & Maha Aarti',
        description:
          'Early morning sunrise experience at Assi Ghat for Subah-e-Banaras. Visit Sankat Mochan, Durga Temple, Tulsi Manas, and New Vishwanath Temple (BHU). In the afternoon, board your dedicated Dev Deepawali festival boat. Witness millions of glowing earthen diyas illuminating all 84 ghats, participate in Deepdaan on the sacred river, and experience the magnificent Ganga Maha Aarti.',
        tags: ['Dev Deepawali Boat', 'Deepdaan on Ganga', 'Illuminated Ghats'],
      },
      {
        day: 'Day 03',
        destination: 'Sarnath Buddhist Heritage & Departure',
        highlight: 'Dhamek Stupa, Buddhist Monasteries & Airport Transfer',
        description:
          'Check out after breakfast and drive to Sarnath, the revered site where Lord Buddha delivered his first sermon. Visit the ancient Dhamek Stupa, Buddhist temples, and archaeological museum. Transfer to Varanasi Airport or Railway Station for onward journey.',
        tags: ['Sarnath Stupa', 'Buddhist Heritage', 'Airport Transfer'],
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

function getPackageImage(img?: string, slug?: string) {
  if (slug === 'experience-varanasi-dev-deepawali-3d' || img?.includes('photo-1561361513-2d000a50f0dc')) {
    return 'https://images.unsplash.com/photo-1687753578819-08e5a39d715a?auto=format&fit=crop&q=80&w=1200'
  }
  if (
    slug === 'kerala-backwaters-hills-5d' &&
    (img?.includes('photo-1602216056096-3b40cc0c9944') || img?.includes('photo-1593693397690-362cb9666fc2'))
  ) {
    return 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=1200'
  }
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
  const ogImageUrl = getPackageImage(pkg.featured_image, pkg.slug)

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

  // 1. Parallel fetch package and site settings
  const [{ data: dbPkg }, { data: settings }] = await Promise.all([
    supabase.from('packages').select('*').eq('slug', slug).maybeSingle(),
    supabase.from('site_settings').select('navbar_logo_text').limit(1).maybeSingle(),
  ])

  const fallbackMatch = fallbackPackages.find((p) => p.slug === slug)
  const pkg: PackageItem | undefined = dbPkg
    ? {
        ...dbPkg,
        ...fallbackMatch,
        id: dbPkg.id || fallbackMatch?.id,
      }
    : fallbackMatch

  if (!pkg) {
    notFound()
  }

  const itineraryDays = getPackageItinerary(pkg)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarrinholidays.com'

  // 3. Build TouristTrip Structured Data Schema
  const touristTripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': `${siteUrl}/packages/${pkg.slug}#trip`,
    name: pkg.title,
    description: pkg.description,
    image: getPackageImage(pkg.featured_image, pkg.slug),
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
            src={getPackageImage(pkg.featured_image, pkg.slug)}
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
              <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-lg shadow-rose-950/40">
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
                <span className="size-1 rounded-full bg-amber-400/80 inline-block mr-0.5" />
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

          {/* Destinations Strip & Social Share */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-5 pt-4 border-t border-white/10">
            {pkg.destinations && pkg.destinations.length > 0 && (
              <div className="flex items-center gap-2 text-neutral-300 text-sm font-medium">
                <MapPin className="size-4 text-primary shrink-0" />
                <span>{pkg.destinations.join('  •  ')}</span>
              </div>
            )}
            <SocialShare title={pkg.title} />
          </div>
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
                  <div className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-primary backdrop-blur-md mb-2">
                    At a Glance
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-normal tracking-tight">
                    Hyper-Transparent Itinerary Curation
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light max-w-2xl leading-relaxed">
                    Designed specifically for high-net-worth patrons and discerning Indian domestic travelers. Uncompromising clarity across accommodations, transfers, gastronomy, VIP accesses, and toll clearances.
                  </p>
                </div>

                <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
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
                          <Award className="size-5" />
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
                          <span className="size-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                          <span className="leading-relaxed font-light">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10 text-[11px] text-neutral-400 flex items-center gap-2 font-mono">
                    <span className="size-1.5 rounded-full bg-emerald-400 shrink-0" />
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
                  <span className="size-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  <span>Bespoke 24/7 dedicated personal concierge liaison throughout your stay</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  <span>Executive private chauffeur fleet and high-touch airport tarmac transfers</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  <span>VIP palace fast-track privileges and private curator-led heritage walks</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
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
                  <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-200">
                    <div>
                      <div className="font-semibold text-rose-300 uppercase tracking-wider text-[10px] font-mono">
                        Exclusive Availability Notice
                      </div>
                      <p className="text-[11px] leading-snug mt-0.5">{pkg.scarcity_status}</p>
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-primary block mb-1">
                    Bespoke Private Itinerary
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl sm:text-3xl font-medium text-white">
                      Pricing on Request
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1.5 leading-relaxed font-light">
                    Every holiday is privately tailored to your chosen travel dates, room categories, and party size with zero hidden surcharges.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-3 text-xs">
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">Duration</span>
                    <span className="font-semibold text-white">{pkg.duration}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">Classification</span>
                    <span className="font-semibold text-primary">Private Tour</span>
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
                    buttonText="Get in Touch / Request Quote"
                  />

                  <a
                    href={`https://wa.me/918419887730?text=${encodeURIComponent(
                      `Hello Sarrin Holidays, I would like to inquire about the ${pkg.title} (${pkg.duration}).`
                    )}`}
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
                    Official Concierge Desk: +91 8419887730
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
