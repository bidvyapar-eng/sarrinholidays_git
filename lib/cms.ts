import { createClient } from '@/lib/supabase/client'

export type SiteSetting = { key: string; value: Record<string, any> }
export type Destination = { id: string; country: string; title: string; description: string; duration: string; price: string; image_url: string; is_featured: boolean; is_published: boolean; sort_order: number }
export type Experience = { id: string; category: string; title: string; description: string; image_url: string; is_published: boolean; sort_order: number }
export type JournalPost = { id: string; title: string; excerpt: string; body: string; category: string; image_url: string; published_at?: string | null; is_published: boolean; sort_order: number; slug?: string }
export type ServiceItem = { id: string; title: string; slug: string; short_desc: string; full_desc: string; icon_name: string; hero_image: string; sort_order?: number; is_published?: boolean; created_at?: string }

export const fallbackSite = { brandName: 'Sarrin Holidays', tagline: 'Journey beyond limits', logoUrl: '/sarrin-holidays-logo.png', logoGifUrl: '', useGifLogo: false, heroTitle: 'Journeys crafted for the extraordinary', heroDescription: 'From private island retreats to alpine hideaways, discover handcrafted escapes to the world’s most breathtaking places.', heroBadge: 'Rated 4.9 by 12,000+ travelers' }
export const fallbackDestinations: Destination[] = [
  { id: 'amalfi', country: 'Italy', title: 'Amalfi Coast Curation', description: 'Private cliffside villas, chartered sunset sails, and coastal dining.', duration: '7 Days / 6 Nights', price: 'From $4,200', image_url: '/package-amalfi.png', is_featured: true, is_published: true, sort_order: 1 },
  { id: 'kyoto', country: 'Japan', title: 'Kyoto Hidden Pavilions', description: 'Dawn temple access, private tea ceremonies, and quiet ryokan stays.', duration: '6 Days / 5 Nights', price: 'From $5,800', image_url: '/package-kyoto.png', is_featured: true, is_published: true, sort_order: 2 },
  { id: 'serengeti', country: 'Tanzania', title: 'Serengeti Private Safari', description: 'Exclusive camps, golden-hour drives, and a balloon crossing.', duration: '8 Days / 7 Nights', price: 'From $9,400', image_url: '/package-serengeti.png', is_featured: true, is_published: true, sort_order: 3 },
]

export type PackageItem = {
  id: string
  title: string
  slug: string
  description: string
  price: number
  duration: string
  destinations: string[]
  featured_image: string
  gallery?: string[]
  highlights?: string[]
  is_trending?: boolean
  rating?: number
  created_at?: string
  experience_tags?: string[]
  theme_tags?: string[]
  inclusions?: string[]
  exclusions?: string[]
  scarcity_status?: string | null
}

export const fallbackPackages: PackageItem[] = [
  {
    id: '2a5afe16-4b69-4557-a66f-273aef15c795',
    title: 'Heritage & Palaces Grand Tour',
    slug: 'royal-rajasthan-tour',
    description: "Experience the ultimate sovereign circuit across Rajasthan's royal capitals. Private fortress buyouts, torchlit rampart dining, and suites in living royal palaces.",
    price: 2500,
    duration: '10 Days',
    destinations: ['Udaipur', 'Jaipur', 'Jodhpur'],
    featured_image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=1200',
    gallery: ['https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800'],
    highlights: ['Taj Lake Palace Grand Presidential Suite', 'Private Helicopter Transfers between Royal Fortresses', 'Amber Fort & City Palace Exclusive Night Access'],
    is_trending: true,
    rating: 4.9,
    experience_tags: ['Heritage & Palaces', 'Private Aviation', 'Palace Buyout'],
    theme_tags: ['Heritage & Palaces', 'Royal Fortresses', 'Living Heritage'],
    inclusions: [
      'Taj Lake Palace Grand Presidential Suite & Rambagh Palace Sukh Niwas stays',
      'Private twin-engine helicopter transfers between Udaipur, Jodhpur, and Jaipur',
      'Vintage Rolls-Royce and armored luxury SUV chauffeur fleet throughout',
      'Personal royal historian liaison for exclusive Amber Fort and City Palace night access',
      'Private Thar Desert tented camp with royal banquet & sunset camel caravan',
      'Dedicated 24/7 Sarrin Private Concierge and all royal palace courtyard dining',
    ],
    exclusions: [
      'Commercial or private transcontinental long-haul flights',
      'Consular visa procurement fees for international accompanying guests',
      'Discretionary royal palace staff and chauffeur gratuities',
      'Personal heritage gem purchases, antique acquisitions, and custom textiles',
    ],
    scarcity_status: 'Limited Diwali Availability',
  },
  {
    id: '410f9c21-1a38-4f58-a0c7-8881d95fad01',
    title: 'Backwaters & Coastal Sanctuaries',
    slug: 'kerala-houseboat-retreat',
    description: 'Drift through serene palm-fringed backwaters in Alleppey aboard a luxury houseboat, unwind in secluded Bekal cliffside villas, and sail private South Goa yachts.',
    price: 1850,
    duration: '7 Days',
    destinations: ['Alleppey', 'Bekal', 'Goa'],
    featured_image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200',
    gallery: ['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800'],
    highlights: ['Exclusive Air-Conditioned Houseboat Buyout', 'Private Pool Villa at Taj Bekal', 'South Goa Private Sunset Yacht Charter'],
    is_trending: false,
    rating: 4.8,
    experience_tags: ['Backwaters & Coast', 'Private Yacht', 'Secluded Coast'],
    theme_tags: ['Backwaters & Coast', 'Eco-Luxury', 'Coastal Sanctuaries'],
    inclusions: [
      'Exclusive air-conditioned 2-bedroom luxury Kettuvallam houseboat buyout in Alleppey',
      'Secluded cliffside private pool villa stay at Taj Bekal Resort & Spa',
      'Private sunset catamaran and yacht charter along secluded South Goa coastlines',
      'Dedicated Private Chef serving bespoke Malabar coastal and fresh seafood fare',
      'Daily 90-minute Ayurvedic Abhyanga & Shirodhara rejuvenation therapy on deck',
      'Chauffeured luxury Toyota Vellfire ground transfers between regional coastal air hubs',
    ],
    exclusions: [
      'Inter-state commercial flights between Goa and Kerala air terminals',
      'Specialized PADI deep-sea diving certifications and motorized equipment rentals',
      'Vintage imported champagnes and rare single malt whiskeys outside pairings',
      'Discretionary crew and villa personal butler gratuities',
    ],
    scarcity_status: 'Only 2 Houseboat Buyouts This Season',
  },
  {
    id: 'c12d3208-03bb-49c7-ad85-19f6e86612c6',
    title: 'Spiritual & Wellness Retreats',
    slug: 'himalayan-wellness-escapade',
    description: 'Transcendent sacred rites and restorative silence. Experience private VIP river barges for Ganga Aarti in Varanasi and palace wellness at Ananda in the Himalayas.',
    price: 2200,
    duration: '8 Days',
    destinations: ['Rishikesh', 'Varanasi', 'Ananda in the Himalayas'],
    featured_image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200',
    gallery: ['https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800'],
    highlights: ['Palace Suite at Ananda in the Himalayas', 'Private VIP River Barge for Ganga Aarti', 'Physician-Led Ayurvedic Pulse Diagnosis'],
    is_trending: true,
    rating: 5.0,
    experience_tags: ['Spiritual & Wellness Retreats', 'Sacred Rituals', 'High-Altitude Sanctuary'],
    theme_tags: ['Spiritual & Wellness Retreats', 'Sacred & Spiritual', 'Wellness'],
    inclusions: [
      'Valley View Palace Suite stays at Ananda in the Himalayas and luxury heritage riverfront suites in Varanasi',
      'Private VIP river barge for sacred Ganga Aarti ceremony at Parmarth Niketan & Dashashwamedh Ghat',
      'Physician-led Ayurvedic pulse assessment (Nadi Pariksha) & bespoke dosha culinary curation',
      'Daily private yoga, pranayama, and sound meditation with Himalayan yogis and Vedic scholars',
      'Helicopter transfers connecting Dehradun Airport and the Ananda retreat helipad',
      'Herbal steam therapies, hydrotherapy infusions, and daily cold-pressed restorative elixirs',
    ],
    exclusions: [
      'Domestic flights between Varanasi and Dehradun commercial terminals',
      'Personal international telecommunication and specialized lab diagnostics',
      'Off-property luxury purchases and custom artisanal weaving acquisitions',
      'Discretionary priest dakshina and spa curator gratuities',
    ],
    scarcity_status: 'Autumn Solstice: 3 Pavilions Remaining',
  },
  {
    id: 'e4f9b8c2-7104-4e3a-9281-55018274a910',
    title: 'Wild & Untamed: Royal Tiger Safaris',
    slug: 'wild-untamed-tiger-safari',
    description: 'Explore the apex wilderness of central and northern India. Exclusive 4x4 open-top gypsy safaris, luxury machan pavilions, and master naturalists tracking Royal Bengal Tigers.',
    price: 2750,
    duration: '9 Days',
    destinations: ['Ranthambore', 'Jim Corbett', 'Bandhavgarh'],
    featured_image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=800',
    ],
    highlights: ['Aman-i-Khas & Taj Safari Luxury Forest Pavilions', 'Exclusive 4x4 Gypsy Corridors with Master Trackers', 'Private Torchlit Bush Dinners under Forest Stars'],
    is_trending: true,
    rating: 4.9,
    experience_tags: ['Wild & Untamed', 'Royal Bengal Tigers', 'Luxury Jungle Lodges'],
    theme_tags: ['Wild & Untamed', 'Apex Wildlife', 'Forest Sanctuaries'],
    inclusions: [
      'Luxury air-conditioned tented pavilions at Aman-i-Khas (Ranthambore) & Taj Mahua Kothi (Bandhavgarh)',
      'Exclusive 4x4 custom open-top gypsy safaris with dedicated Master Naturalists and forest department permits',
      'Private chartered turboprop transfers between regional national park airstrips',
      'Torchlit bush dinners with local folk musicians and stargazing telescopes',
      'Exclusive buffer zone night drives and elephant-assisted photographic tracking',
      'All luxury meals, park entrance permits, forest conservation levies, and 24/7 dedicated wildlife curator concierge',
    ],
    exclusions: [
      'High-magnification telephoto camera bodies and lens rental packages',
      'Commercial regional flights outside private charter airstrips',
      'Discretionary tips for forest department trackers and lodge naturalists',
      'Personal travel and specialized adventure evacuation insurance',
    ],
    scarcity_status: 'Only 4 Safari Permits Available for Winter',
  },
]


export const fallbackServices: ServiceItem[] = [
  {
    id: 'c7a10001-3829-4d8e-9001-000000000001',
    title: 'Private Aviation & Charters',
    slug: 'private-aviation-charters',
    short_desc: 'Helicopter transfers to the Himalayas and private jet inter-city travel.',
    full_desc: 'Bypass conventional transit friction with on-demand turboprops, ultra-long-range private jets, and high-altitude helicopters. Seamlessly connect between metropolitan hubs and remote sanctuaries—from direct mountain helipad landings at exclusive Himalayan wellness retreats in Rishikesh and Ladakh to private jet charters linking Delhi, Mumbai, Udaipur, and Kochi with bespoke in-flight concierge services.',
    icon_name: 'Plane',
    hero_image: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&q=80&w=1200',
    sort_order: 1,
    is_published: true,
  },
  {
    id: 'c7a10001-3829-4d8e-9001-000000000002',
    title: 'Royal Celebrations & Weddings',
    slug: 'royal-celebrations-weddings',
    short_desc: 'Palace buyouts and event concierge in Rajasthan.',
    full_desc: 'Transform Rajasthan’s most majestic 18th-century fortresses and floating lake palaces into your personal royal court. We coordinate exclusive full-property palace buyouts across Udaipur, Jaipur, and Jodhpur, orchestrating bespoke celebration architecture, regal torchlit courtyard banquets, private desert sangeets beneath Thar constellations, and discreet 24/7 event concierge liaisons.',
    icon_name: 'Crown',
    hero_image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
    sort_order: 2,
    is_published: true,
  },
  {
    id: 'c7a10001-3829-4d8e-9001-000000000003',
    title: 'Wellness & Ayurveda Sanctuaries',
    slug: 'wellness-ayurveda-sanctuaries',
    short_desc: 'Curated private retreats in Rishikesh and Kerala.',
    full_desc: 'Immerse in holistic rejuvenation through physician-led Ayurvedic Panchakarma therapies and transformative yogic immersions. Our curated retreats unite high-altitude tranquility in the Himalayan foothills of Rishikesh with serene palm-canopied water sanctuaries in Kumarakom and Alleppey. Featuring personalized dosha-specific culinary menus, sacred Ganga riverfront aartis, and sound healing meditation.',
    icon_name: 'Sparkles',
    hero_image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
    sort_order: 3,
    is_published: true,
  },
  {
    id: 'c7a10001-3829-4d8e-9001-000000000004',
    title: 'VIP Chauffeur & Security',
    slug: 'vip-chauffeur-security',
    short_desc: 'Premium fleet (vintage cars, luxury SUVs) with executive protection.',
    full_desc: 'Navigate India’s vibrant cities and scenic hinterlands with absolute discretion and comfort. Our hand-selected fleet features armored luxury SUVs, Rolls-Royce and vintage convertibles for ceremonial palace arrivals, and executive vans equipped with Wi-Fi lounges. Accompanied by vetted, multilingual chauffeurs and close-protection security officers trained to international VIP standards.',
    icon_name: 'ShieldCheck',
    hero_image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200',
    sort_order: 4,
    is_published: true,
  },
]

export async function getPublicContent() {
  const supabase = createClient()
  const [{ data: settings }, { data: destinations }, { data: experiences }, { data: journal }, { data: services }] = await Promise.all([
    supabase.from('site_settings').select('key,value').eq('key', 'site').maybeSingle(),
    supabase.from('destinations').select('*').eq('is_published', true).order('sort_order'),
    supabase.from('experiences').select('*').eq('is_published', true).order('sort_order'),
    supabase.from('journal_posts').select('*').eq('is_published', true).order('sort_order'),
    supabase.from('services').select('*').eq('is_published', true).order('sort_order').then(res => res, () => ({ data: null })),
  ])
  return {
    site: { ...fallbackSite, ...(settings?.value ?? {}) },
    destinations: destinations?.length ? destinations : fallbackDestinations,
    experiences: experiences ?? [],
    journal: journal ?? [],
    services: services?.length ? services : fallbackServices,
  }
}

