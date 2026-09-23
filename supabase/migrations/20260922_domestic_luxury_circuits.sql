-- ==============================================================================
-- Migration: Domestic Luxury Circuits Schema Expansion, Seed & Update
-- Project: Sarrin Holidays Luxury Travel Portal
-- Circuits:
-- 1. Heritage & Palaces (Udaipur, Jaipur, Jodhpur)
-- 2. Backwaters & Coast (Alleppey, Bekal, Goa)
-- 3. Spiritual & Wellness Retreats (Rishikesh, Varanasi, Ananda in the Himalayas)
-- 4. Wild & Untamed (Ranthambore, Jim Corbett, Bandhavgarh)
-- ==============================================================================

-- 1. Ensure required columns exist on public.packages
ALTER TABLE public.packages
    ADD COLUMN IF NOT EXISTS theme_tags TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS inclusions TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS exclusions TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS scarcity_status TEXT;

-- 2. Update Package 1: Heritage & Palaces
UPDATE public.packages
SET 
    title = 'Heritage & Palaces Grand Tour',
    destinations = ARRAY['Udaipur', 'Jaipur', 'Jodhpur'],
    experience_tags = ARRAY['Heritage & Palaces', 'Private Aviation', 'Palace Buyout'],
    theme_tags = ARRAY['Heritage & Palaces', 'Royal Fortresses', 'Living Heritage'],
    highlights = ARRAY[
        'Taj Lake Palace Grand Presidential Suite',
        'Private Helicopter Transfers between Royal Fortresses',
        'Amber Fort & City Palace Exclusive Night Access'
    ],
    inclusions = ARRAY[
        'Taj Lake Palace Grand Presidential Suite & Rambagh Palace Sukh Niwas stays',
        'Private twin-engine helicopter transfers between Udaipur, Jodhpur, and Jaipur',
        'Vintage Rolls-Royce and armored luxury SUV chauffeur fleet throughout',
        'Personal royal historian liaison for exclusive Amber Fort and City Palace night access',
        'Private Thar Desert tented camp with royal banquet & sunset camel caravan',
        'Dedicated 24/7 Sarrin Private Concierge and all royal palace courtyard dining'
    ],
    exclusions = ARRAY[
        'Commercial or private transcontinental long-haul flights',
        'Consular visa procurement fees for international accompanying guests',
        'Discretionary royal palace staff and chauffeur gratuities',
        'Personal heritage gem purchases, antique acquisitions, and custom textiles'
    ],
    scarcity_status = 'Limited Diwali Availability'
WHERE slug = 'royal-rajasthan-tour';

-- 3. Update Package 2: Backwaters & Coast
UPDATE public.packages
SET 
    title = 'Backwaters & Coastal Sanctuaries',
    destinations = ARRAY['Alleppey', 'Bekal', 'Goa'],
    experience_tags = ARRAY['Backwaters & Coast', 'Private Yacht', 'Secluded Coast'],
    theme_tags = ARRAY['Backwaters & Coast', 'Eco-Luxury', 'Coastal Sanctuaries'],
    highlights = ARRAY[
        'Exclusive Air-Conditioned Houseboat Buyout',
        'Private Pool Villa at Taj Bekal',
        'South Goa Private Sunset Yacht Charter'
    ],
    inclusions = ARRAY[
        'Exclusive air-conditioned 2-bedroom luxury Kettuvallam houseboat buyout in Alleppey',
        'Secluded cliffside private pool villa stay at Taj Bekal Resort & Spa',
        'Private sunset catamaran and yacht charter along secluded South Goa coastlines',
        'Dedicated Private Chef serving bespoke Malabar coastal and fresh seafood fare',
        'Daily 90-minute Ayurvedic Abhyanga & Shirodhara rejuvenation therapy on deck',
        'Chauffeured luxury Toyota Vellfire ground transfers between regional coastal air hubs'
    ],
    exclusions = ARRAY[
        'Inter-state commercial flights between Goa and Kerala air terminals',
        'Specialized PADI deep-sea diving certifications and motorized equipment rentals',
        'Vintage imported champagnes and rare single malt whiskeys outside pairings',
        'Discretionary crew and villa personal butler gratuities'
    ],
    scarcity_status = 'Only 2 Houseboat Buyouts This Season'
WHERE slug = 'kerala-houseboat-retreat';

-- 4. Update Package 3: Spiritual & Wellness Retreats
UPDATE public.packages
SET 
    title = 'Spiritual & Wellness Retreats',
    destinations = ARRAY['Rishikesh', 'Varanasi', 'Ananda in the Himalayas'],
    experience_tags = ARRAY['Spiritual & Wellness Retreats', 'Sacred Rituals', 'High-Altitude Sanctuary'],
    theme_tags = ARRAY['Spiritual & Wellness Retreats', 'Sacred & Spiritual', 'Wellness'],
    highlights = ARRAY[
        'Palace Suite at Ananda in the Himalayas',
        'Private VIP River Barge for Ganga Aarti',
        'Physician-Led Ayurvedic Pulse Diagnosis'
    ],
    inclusions = ARRAY[
        'Valley View Palace Suite stays at Ananda in the Himalayas and luxury heritage riverfront suites in Varanasi',
        'Private VIP river barge for sacred Ganga Aarti ceremony at Parmarth Niketan & Dashashwamedh Ghat',
        'Physician-led Ayurvedic pulse assessment (Nadi Pariksha) & bespoke dosha culinary curation',
        'Daily private yoga, pranayama, and sound meditation with Himalayan yogis and Vedic scholars',
        'Helicopter transfers connecting Dehradun Airport and the Ananda retreat helipad',
        'Herbal steam therapies, hydrotherapy infusions, and daily cold-pressed restorative elixirs'
    ],
    exclusions = ARRAY[
        'Domestic flights between Varanasi and Dehradun commercial terminals',
        'Personal international telecommunication and specialized lab diagnostics',
        'Off-property luxury purchases and custom artisanal weaving acquisitions',
        'Discretionary priest dakshina and spa curator gratuities'
    ],
    scarcity_status = 'Autumn Solstice: 3 Pavilions Remaining'
WHERE slug = 'himalayan-wellness-escapade';

-- 5. Insert Package 4: Wild & Untamed (if not yet in table)
INSERT INTO public.packages (
    id,
    title,
    slug,
    description,
    price,
    duration,
    destinations,
    featured_image,
    gallery,
    highlights,
    is_trending,
    rating,
    experience_tags,
    theme_tags,
    inclusions,
    exclusions,
    scarcity_status
)
SELECT
    'e4f9b8c2-7104-4e3a-9281-55018274a910',
    'Wild & Untamed: Royal Tiger Safaris',
    'wild-untamed-tiger-safari',
    'Explore the apex wilderness of central and northern India. Exclusive 4x4 open-top gypsy safaris, luxury machan pavilions, and master naturalists tracking Royal Bengal Tigers.',
    2750,
    '9 Days',
    ARRAY['Ranthambore', 'Jim Corbett', 'Bandhavgarh'],
    'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=1200',
    ARRAY[
        'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=800'
    ],
    ARRAY[
        'Aman-i-Khas & Taj Safari Luxury Forest Pavilions',
        'Exclusive 4x4 Gypsy Corridors with Master Trackers',
        'Private Torchlit Bush Dinners under Forest Stars'
    ],
    true,
    4.9,
    ARRAY['Wild & Untamed', 'Royal Bengal Tigers', 'Luxury Jungle Lodges'],
    ARRAY['Wild & Untamed', 'Apex Wildlife', 'Forest Sanctuaries'],
    ARRAY[
        'Luxury air-conditioned tented pavilions at Aman-i-Khas (Ranthambore) & Taj Mahua Kothi (Bandhavgarh)',
        'Exclusive 4x4 custom open-top gypsy safaris with dedicated Master Naturalists and forest department permits',
        'Private chartered turboprop transfers between regional national park airstrips',
        'Torchlit bush dinners with local folk musicians and stargazing telescopes',
        'Exclusive buffer zone night drives and elephant-assisted photographic tracking',
        'All luxury meals, park entrance permits, forest conservation levies, and 24/7 dedicated wildlife curator concierge'
    ],
    ARRAY[
        'High-magnification telephoto camera bodies and lens rental packages',
        'Commercial regional flights outside private charter airstrips',
        'Discretionary tips for forest department trackers and lodge naturalists',
        'Personal travel and specialized adventure evacuation insurance'
    ],
    'Only 4 Safari Permits Available for Winter'
WHERE NOT EXISTS (
    SELECT 1 FROM public.packages WHERE slug = 'wild-untamed-tiger-safari'
);

-- 6. Ensure Package 4 is updated if it already existed
UPDATE public.packages
SET 
    title = 'Wild & Untamed: Royal Tiger Safaris',
    destinations = ARRAY['Ranthambore', 'Jim Corbett', 'Bandhavgarh'],
    experience_tags = ARRAY['Wild & Untamed', 'Royal Bengal Tigers', 'Luxury Jungle Lodges'],
    theme_tags = ARRAY['Wild & Untamed', 'Apex Wildlife', 'Forest Sanctuaries'],
    highlights = ARRAY[
        'Aman-i-Khas & Taj Safari Luxury Forest Pavilions',
        'Exclusive 4x4 Gypsy Corridors with Master Trackers',
        'Private Torchlit Bush Dinners under Forest Stars'
    ],
    inclusions = ARRAY[
        'Luxury air-conditioned tented pavilions at Aman-i-Khas (Ranthambore) & Taj Mahua Kothi (Bandhavgarh)',
        'Exclusive 4x4 custom open-top gypsy safaris with dedicated Master Naturalists and forest department permits',
        'Private chartered turboprop transfers between regional national park airstrips',
        'Torchlit bush dinners with local folk musicians and stargazing telescopes',
        'Exclusive buffer zone night drives and elephant-assisted photographic tracking',
        'All luxury meals, park entrance permits, forest conservation levies, and 24/7 dedicated wildlife curator concierge'
    ],
    exclusions = ARRAY[
        'High-magnification telephoto camera bodies and lens rental packages',
        'Commercial regional flights outside private charter airstrips',
        'Discretionary tips for forest department trackers and lodge naturalists',
        'Personal travel and specialized adventure evacuation insurance'
    ],
    scarcity_status = 'Only 4 Safari Permits Available for Winter'
WHERE slug = 'wild-untamed-tiger-safari';
