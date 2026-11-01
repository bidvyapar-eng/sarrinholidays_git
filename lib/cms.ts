import { createClient } from '@/lib/supabase/client'

export type SiteSetting = { key: string; value: Record<string, any> }
export type Destination = { id: string; country: string; title: string; description: string; duration: string; price: string; image_url: string; is_featured: boolean; is_published: boolean; sort_order: number }
export type Experience = { id: string; category: string; title: string; description: string; image_url: string; is_published: boolean; sort_order: number }
export type JournalPost = { id: string; title: string; excerpt: string; body: string; category: string; image_url: string; published_at?: string | null; created_at?: string; updated_at?: string; is_published: boolean; sort_order: number; slug?: string }
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
    id: 'b7010001-4401-4c11-9001-000000000001',
    title: 'Kerala — God’s Own Country (Grand Circuit)',
    slug: 'kerala-gods-own-country-8d',
    description: "An immersive 7-night journey across Kerala's crowning destinations—combining Kochi heritage, the misty tea hills of Munnar, Periyar wildlife in Thekkady, an authentic houseboat cruise in Alleppey, and sun-drenched beaches at Kovalam.",
    price: 0,
    duration: '8 Days / 7 Nights',
    destinations: ['Kochi', 'Munnar', 'Thekkady', 'Alleppey', 'Kovalam', 'Trivandrum'],
    featured_image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800',
    ],
    highlights: [
      'Return Economy Airfare with Taxes Included',
      'Abad Atrium Kochi, The Leaf Munnar & Spice Grove Thekkady',
      'Traditional A/C Deluxe Houseboat Overnight in Alleppey',
      'KTDC Samudra Deluxe Oceanfront Stay in Kovalam & Padmanabhaswamy Temple',
    ],
    is_trending: true,
    rating: 4.9,
    experience_tags: ['All-Inclusive Flights', 'Backwaters Houseboat', 'Tea Plantations'],
    theme_tags: ['Gods Own Country', 'Complete Kerala Circuit'],
    inclusions: [
      'Return economy class airfare with taxes included as per scheduled airlines',
      'Kochi Airport reception and private transfer to hotel; drop at Trivandrum Airport',
      '01 Night accommodation on double sharing at Cochin — Abad Atrium (Superior Room) or similar',
      '02 Nights accommodation on double sharing at Munnar — The Leaf (Green Leaf) or similar',
      '01 Night accommodation on double sharing at Thekkady — Spice Grove (Deluxe Room) or similar',
      '01 Night accommodation on double sharing at Alleppey — A/C Deluxe Houseboat or similar',
      '02 Nights accommodation on double sharing at Kovalam — KTDC Samudra (Deluxe Room) or similar',
      'Meal Plan MAPI: Daily Breakfast, Lunch, and Dinner included throughout',
      'All transfers and sightseeing by dedicated private A/C Toyota Etios (including toll, parking, road tax, driver allowance)',
      'Entrance tickets: Boating charge at Thekkady, monument entries, spice plantation tour, and park entrance fees',
    ],
    exclusions: [
      '5.00% GST applicable on total booking',
      'Early check-in / late check-out at hotels',
      'Optional activities: Spice plantation elephant safari, jeep safari, adventure sports',
      'Personal expenses such as laundry, bar bills, tips, and camera permits',
    ],
    scarcity_status: 'Airfare & Houseboat Allotment',
  },
  {
    id: 'b7010002-4402-4c12-9002-000000000002',
    title: 'Kerala Backwaters & Hills Escapade',
    slug: 'kerala-backwaters-hills-5d',
    description: "A compact 5-day holiday through Kerala's emerald tea hills and tranquil canals. Experience Munnar waterfalls, the Cardamom Hills of Thekkady, and a full-board overnight backwater cruise aboard Riverine Cruises.",
    price: 0,
    duration: '5 Days / 4 Nights',
    destinations: ['Munnar', 'Thekkady', 'Alleppey', 'Kochi'],
    featured_image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800',
    ],
    highlights: [
      'Hotel Cloud Palace in Munnar with Waterfalls En Route',
      'Hotel Sandra Palace in Thekkady & Cardamom Hills',
      'Exclusive Riverine Cruise in Alleppey with All Meals On Board',
      'Mattupetty Dam, Echo Point & Kundala Lake Sightseeing',
    ],
    is_trending: true,
    rating: 4.8,
    experience_tags: ['Riverine Cruise', 'Full Board Houseboat', 'Cardamom Hills'],
    theme_tags: ['Hill Stations', 'Emerald Waters'],
    inclusions: [
      '02 Nights accommodation at Munnar — Hotel Cloud Palace',
      '01 Night accommodation at Thekkady — Hotel Sandra Palace',
      '01 Night accommodation on board Riverine Cruises (Alleppey)',
      'Riverine Cruise Full Board Inclusions: Welcome Drinks, Lunch, Evening Tea & Snacks, Dinner, and Breakfast',
      'Private AC vehicle for all transfers: Kochi Airport pickup, Munnar, Thekkady, Alleppey, and Kochi Airport drop',
      'Full sightseeing covering Mattupetty Dam, Echo Point, Kundala Lake, and tea plantation photo points',
      'Driver allowances, state taxes, toll clearances, and vehicle parking',
    ],
    exclusions: [
      '5.00% GST applicable',
      'Optional activities: Spice garden walk, cultural Kathakali shows, local shopping',
      'Personal beverages, telephone charges, and laundry outside cruise meal plan',
    ],
    scarcity_status: 'Riverine Cruise Exclusive',
  },
  {
    id: 'b7010003-4403-4c13-9003-000000000003',
    title: 'Kashmir — Valleys of Paradise & Gulmarg',
    slug: 'kashmir-paradise-valleys-7d',
    description: 'Discover the ethereal beauty of Kashmir over 7 days. Drive through alpine pine forests in Sonamarg, take the Gulmarg Gondola ride to snow peaks, wander the meadows of Pahalgam, and sleep under stars in a traditional Dal Lake deluxe houseboat.',
    price: 0,
    duration: '7 Days / 6 Nights',
    destinations: ['Srinagar', 'Sonamarg', 'Gulmarg', 'Pahalgam', 'Dal Lake'],
    featured_image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=800',
    ],
    highlights: [
      'Return Economy Airfare with Taxes Included',
      'Gulmarg Gondola Ride Ticket (Phase 1 Included)',
      '60-Minute Private Shikara Ride on Dal Lake & Deluxe Houseboat Stay',
      'Mughal Gardens Entry (Nishat, Shalimar, Chashme Shahi) & Betaab Valley',
    ],
    is_trending: true,
    rating: 5.0,
    experience_tags: ['Gondola Phase 1 Included', 'Dal Lake Houseboat', 'Return Flights Included'],
    theme_tags: ['Alpine Heaven', 'Kashmir Valleys'],
    inclusions: [
      'Return economy class airfare with taxes as per scheduled airlines',
      '02 Nights accommodation on twin/double sharing in Srinagar at premium hotel',
      '01 Night accommodation on twin/double sharing in Gulmarg',
      '02 Nights accommodation on twin/double sharing in Pahalgam',
      '01 Night accommodation on twin/double sharing at Deluxe Houseboat on Dal Lake',
      'Daily Breakfast and Dinner at all hotels and houseboat',
      'Gulmarg Gondola Ride ticket up to Phase 1 included',
      'Private 60-Minute Shikara Ride in famous Dal Lake',
      'Mughal Garden entry fees included',
      'All transfers and sightseeing by private Toyota Etios for 07 Days (including tolls, parking, driver allowance)',
      'Daily 2 bottles mineral water during travel, welcome drink on arrival, and first aid kit in vehicle',
      'Srinagar Airport pickup and drop assistance',
    ],
    exclusions: [
      '5.00% GST applicable',
      'Optional pony ride to Thajiwas Glacier in Sonamarg',
      'Local private union vehicles for Aru Valley, Betaab Valley & Chandanwari in Pahalgam',
      'Personal activities such as skiing, snowboarding, sledging, or camera charges',
    ],
    scarcity_status: 'Gondola Pass Allotment',
  },
  {
    id: 'b7010004-4404-4c14-9004-000000000004',
    title: 'Blissful Goa Coastal & Heritage Getaway',
    slug: 'blissful-goa-beach-getaway-4d',
    description: 'A relaxed 4-day tropical escape balancing the sands of Colva, the vibrant energy of North Goa, and the serene heritage of South Goa. Includes historic Portuguese forts, spice plantations, and an evening Mandovi River Cruise.',
    price: 0,
    duration: '4 Days / 3 Nights',
    destinations: ['Colva Beach', 'North Goa', 'South Goa'],
    featured_image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800',
    ],
    highlights: [
      'Comfortable Stay at Hotel Colva Kinara near Colva Beach',
      'North Goa Fort Aguada, Candolim Beach, Baga Beach & Dolphin Point',
      'Scenic Mandovi River Cruise with Live Entertainment',
      'South Goa Old Goa UNESCO Churches, Mangueshi Temple & Spice Farm',
    ],
    is_trending: false,
    rating: 4.8,
    experience_tags: ['Mandovi River Cruise', 'Colva Beachfront', 'Private AC Vehicle'],
    theme_tags: ['Beach Retreat', 'Portuguese Heritage'],
    inclusions: [
      '03 Nights accommodation on double-sharing basis at Hotel Colva Kinara (or similar)',
      'Double-sharing accommodation with daily breakfast during stay (CPAI)',
      'Airport / Railway Station pick-up and drop; arrival/departure assistance',
      'Private AC vehicle for North Goa sightseeing (Fort Aguada, Candolim, Baga, Dolphin Point, Snow Park)',
      'Mandovi River Cruise ticket included',
      'Full-day South Goa sightseeing (Shantadurga Temple, Spice Farm, Big Foot, Mangueshi Temple, Old Goa Church, Wax World)',
      'All sightseeing, parking fees, toll taxes, and travel assistance throughout',
    ],
    exclusions: [
      'Flight or train tickets to and from Goa',
      'Water sports activities (parasailing, jet-ski, banana ride) and scuba diving',
      'Personal expenses such as laundry, minibar, drinks, tips, and camera tickets',
      '5.00% GST applicable',
    ],
    scarcity_status: 'Colva Beach Resort Partner',
  },
  {
    id: 'b7010005-4405-4c15-9005-000000000005',
    title: 'Experience Varanasi & Dev Deepawali Sacred Lights',
    slug: 'experience-varanasi-dev-deepawali-3d',
    description: 'Witness the divine festival of lights where the sacred riverfront of Kashi illuminates with thousands of earthen lamps. Features Kashi Vishwanath Corridor darshan, Subah-e-Banaras at Assi Ghat, an exclusive Dev Deepawali evening boat ride, and Buddhist heritage at Sarnath.',
    price: 0,
    duration: '3 Days / 2 Nights',
    destinations: ['Varanasi', 'Kashi Vishwanath', 'Assi Ghat', 'Sarnath'],
    featured_image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800',
    ],
    highlights: [
      'Special Dev Deepawali Boat Experience & Riverfront Deepdaan',
      'Darshan at Kashi Vishwanath Temple, Corridor & Kal Bhairav',
      'Evening Dashashwamedh Ghat Maha Aarti & Subah-e-Banaras Sunrise',
      'Excursion to Sarnath, Dhamek Stupa & Buddhist Archaeological Complex',
    ],
    is_trending: true,
    rating: 5.0,
    experience_tags: ['Dev Deepawali Boat', 'Kashi Vishwanath Corridor', 'Ganga Maha Aarti'],
    theme_tags: ['Spiritual Kashi', 'Festival of Lights'],
    inclusions: [
      '02 Nights accommodation in a handpicked heritage hotel/resort in Varanasi',
      'Double-sharing accommodation with daily breakfast (CPAI)',
      'Varanasi Airport / Railway Station pick-up and drop in private AC vehicle',
      'Special Dev Deepawali evening boat ride, Deepdaan, illuminated ghats, and Ganga Aarti vantage',
      'Temple darshan assistance: Kashi Vishwanath, Annapurna, Kal Bhairav, Sankat Mochan, Durga Temple, New Vishwanath BHU',
      'Excursion to Buddhist heritage site Sarnath & Dhamek Stupa with archaeological complex visit',
      'All transfers, tolls, parking, and dedicated travel team assistance throughout',
    ],
    exclusions: [
      'Flight or train tickets to and from Varanasi',
      'Personal expenses, laundry, drinks, and discretionary priest dakshina',
      'Special VIP fast-track darshan tokens beyond standard temple access',
      '5.00% GST applicable',
    ],
    scarcity_status: 'Dev Deepawali Special Edition',
  },
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
    experience_tags: ['Private Aviation', 'Palace Buyout'],
    theme_tags: ['Royal Fortresses', 'Living Heritage'],
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
    scarcity_status: 'Diwali Palace Allocation',
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
    experience_tags: ['Private Yacht Charter', 'Private Island Stay'],
    theme_tags: ['Eco-Luxury', 'Coastal Sanctuary'],
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
    scarcity_status: '2 Houseboat Buyouts This Season',
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
    experience_tags: ['Sacred Rituals', 'High-Altitude Sanctuary'],
    theme_tags: ['Sacred & Spiritual', 'Ayurveda & Yoga'],
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
    scarcity_status: 'Autumn Solstice • 3 Pavilions',
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
    experience_tags: ['Royal Bengal Tigers', 'Luxury Jungle Lodges'],
    theme_tags: ['Apex Wildlife', 'Forest Sanctuary'],
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
    scarcity_status: '4 Winter Safari Permits',
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
    icon_name: 'Compass',
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

export const fallbackJournalPosts: JournalPost[] = [
  {
    id: 'rajasthan-heritage-palaces',
    slug: 'rajasthan-heritage-palaces',
    title: 'Echoes of the Thar: Opulent Fortresses & Heritage Palaces of Rajasthan',
    excerpt:
      'From private candlelit dinners on Lake Pichola to sunset safaris across golden dunes, immerse in regal Rajputana splendour.',
    category: 'Royal Heritage',
    image_url:
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200',
    published_at: '2026-09-15T00:00:00Z',
    is_published: true,
    sort_order: 1,
    body: `To experience Rajasthan through the prism of sovereign luxury is to step across the boundary separating ordinary tourism from living history. For centuries, the royal families of Jaipur, Udaipur, and Jodhpur curated lives of extraordinary aesthetic refinement—where sandstone ramparts met hand-painted frescoes and courtyards echoed with the melodies of classical sarangi virtuosos.

Our curated Rajputana circuits unlock private chambers and fortress ramparts normally sealed behind velvet ropes. Imagine boarding a private ceremonial barge at dusk on Lake Pichola, drifting toward the white-marble apparition of Taj Lake Palace as thousands of floating clay lamps illuminate the waters.

By day, your dedicated royal historian guides you through private suites in living palaces—accompanied by personal meetings with master textile artisans and gem custodians who have preserved ancestral savoir-faire across seven generations.

As twilight descends over the Thar Desert, your private encampment awakes: handcrafted royal shamiana pavilions draped in raw silk, silver dinnerware, and multi-course Rajput banquets prepared over fragrant wood embers under a ceiling of infinite stars.`,
  },
  {
    id: 'kerala-slow-solitude',
    slug: 'kerala-slow-solitude',
    title: 'The Art of Slow Living: Kerala’s Emerald Backwaters & Secret Lagoons',
    excerpt:
      'Drift silently along palm-canopied waterways aboard a bespoke kettuvallam with master Ayurvedic healers and coastal dining.',
    category: 'Coastal Sanctuaries',
    image_url:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200',
    published_at: '2026-09-18T00:00:00Z',
    is_published: true,
    sort_order: 2,
    body: `In a world measured by velocity, the emerald backwaters of Kerala represent the pinnacle of true luxury: unhurried, intentional time. Here, the waters of Vembanad Lake stretch into an intricate labyrinth of palm-canopied waterways where the modern world gently falls away.

Our guests embark on private buyouts of master-crafted Kettuvallam houseboats—crafted from indigenous Anjili timber and coir without a single metal nail, yet outfitted with climate-controlled staterooms, panoramic glass view lounges, and private sun-decks.

Accompanying your voyage is a dedicated Private Chef and master Ayurvedic physician (Vaidya). Each morning begins with gentle deck yoga as river mist lifts over water hyacinths, followed by tailored Abhyanga therapies utilizing warm botanical oils pressed in regional monastic apothecaries.

Evenings unfold over freshly prepared Malabar coastal delicacies: Karimeen Pollichathu wrapped in charred banana leaves, coconut-scented appams, and chilled organic coconut water harvested minutes before docking at secluded lagoon sanctuaries.`,
  },
  {
    id: 'himalayan-wellness-sanctuary',
    slug: 'himalayan-wellness-sanctuary',
    title: 'Sanctuary Above the Clouds: High-Altitude Himalayan Wellness in Rishikesh',
    excerpt:
      'Perched amidst whispering sal forests and sacred mountain waters, discover transformative yoga retreats and sunset aartis.',
    category: 'Himalayan Wellness',
    image_url:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200',
    published_at: '2026-09-20T00:00:00Z',
    is_published: true,
    sort_order: 3,
    body: `High in the Garhwal foothills where the sacred Ganges flows crystal-clear from glacial heights, the air is perfumed with mountain pine, wild cedar, and the quiet rhythm of ancient contemplation.

Our Himalayan Wellness Escapade centers upon exclusive palace sanctuaries perched 3,000 feet above the valley floor. Here, restorative wellness is approached not as an itinerary, but as an awakening of vitality through traditional Hatha yoga, Tibetan singing bowl sound therapy, and hydrotherapy fed by pristine mountain springs.

Guests enjoy private helipad transfers directly from New Delhi or Dehradun, bypassing regional road congestion in serene aerial comfort. Your days are structured around bespoke consultations with Ayurvedic doctors, forest mindfulness treks through private sal canopies, and private riverside bajra platforms for the evening Ganga Aarti.

As temple bells resonate across the canyon at twilight and priests elevate flaming brass lamps toward the river, an overwhelming sense of clarity takes hold—reminding us why the Himalayas have long stood as the spiritual crown of the subcontinent.`,
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
    journal: journal?.length ? journal : fallbackJournalPosts,
    services: services?.length ? services : fallbackServices,
  }
}


