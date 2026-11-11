-- ==============================================================================
-- SARRIN HOLIDAYS — MASTER DATABASE SETUP & SEED SCRIPT
-- Target: PostgreSQL / Supabase SQL Editor
-- Scope: 100% Complete Schema, Row-Level Security, & Domestic Luxury Seed Data
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. PACKAGES TABLE (Curated Domestic Indian Expeditions)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.packages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price NUMERIC DEFAULT 0 NOT NULL,
    duration TEXT NOT NULL,
    destinations TEXT[] DEFAULT '{}' NOT NULL,
    featured_image TEXT NOT NULL,
    gallery TEXT[] DEFAULT '{}',
    highlights TEXT[] DEFAULT '{}',
    is_trending BOOLEAN DEFAULT false NOT NULL,
    rating NUMERIC DEFAULT 4.9 NOT NULL,
    experience_tags TEXT[] DEFAULT '{}',
    theme_tags TEXT[] DEFAULT '{}',
    inclusions TEXT[] DEFAULT '{}',
    exclusions TEXT[] DEFAULT '{}',
    scarcity_status TEXT,
    is_published BOOLEAN DEFAULT true NOT NULL,
    sort_order INT DEFAULT 0 NOT NULL
);

-- Ensure all columns exist if table was previously created with minimal schema
ALTER TABLE public.packages
    ADD COLUMN IF NOT EXISTS slug TEXT,
    ADD COLUMN IF NOT EXISTS gallery TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS highlights TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS is_trending BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS rating NUMERIC DEFAULT 4.9,
    ADD COLUMN IF NOT EXISTS experience_tags TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS theme_tags TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS inclusions TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS exclusions TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS scarcity_status TEXT,
    ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true,
    ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'packages_slug_key'
    ) THEN
        ALTER TABLE public.packages ADD CONSTRAINT packages_slug_key UNIQUE (slug);
    END IF;
EXCEPTION
    WHEN OTHERS THEN NULL;
END $$;

-- ==============================================================================
-- 2. SERVICES TABLE (Bespoke Atelier Services)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_desc TEXT NOT NULL,
    full_desc TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    hero_image TEXT NOT NULL,
    sort_order INT DEFAULT 0 NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL
);

ALTER TABLE public.services
    ADD COLUMN IF NOT EXISTS slug TEXT,
    ADD COLUMN IF NOT EXISTS short_desc TEXT,
    ADD COLUMN IF NOT EXISTS full_desc TEXT,
    ADD COLUMN IF NOT EXISTS icon_name TEXT,
    ADD COLUMN IF NOT EXISTS hero_image TEXT,
    ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
    ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'services_slug_key'
    ) THEN
        ALTER TABLE public.services ADD CONSTRAINT services_slug_key UNIQUE (slug);
    END IF;
EXCEPTION
    WHEN OTHERS THEN NULL;
END $$;

-- ==============================================================================
-- 3. INQUIRIES TABLE (Client Dossiers, VIP Requests & Leads)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    notes TEXT,
    source TEXT DEFAULT 'General Contact' NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    travel_dates TEXT,
    guest_count INT DEFAULT 2
);

ALTER TABLE public.inquiries
    ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'General Contact',
    ADD COLUMN IF NOT EXISTS subject TEXT,
    ADD COLUMN IF NOT EXISTS notes TEXT,
    ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending',
    ADD COLUMN IF NOT EXISTS travel_dates TEXT,
    ADD COLUMN IF NOT EXISTS guest_count INT DEFAULT 2;

-- ==============================================================================
-- 4. NEWSLETTER SUBSCRIBERS TABLE (Private Gazette Registrations)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    source TEXT DEFAULT 'footer_private_gazette' NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL
);

-- ==============================================================================
-- 5. 360° VR SPATIAL TOURS TABLE (Interactive Panoramas)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.virtual_tours (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    location TEXT NOT NULL,
    tag TEXT NOT NULL,
    panorama TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    description TEXT NOT NULL,
    features TEXT[] DEFAULT '{}',
    hotspots JSONB DEFAULT '[]'::jsonb,
    sort_order INT DEFAULT 0 NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL
);

-- ==============================================================================
-- 6. SITE SETTINGS & INTEGRATIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 7. DESTINATIONS, EXPERIENCES, JOURNAL POSTS & MEDIA ASSETS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.destinations (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    country TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    duration TEXT NOT NULL,
    price TEXT NOT NULL,
    image_url TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT true NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL,
    sort_order INT DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS public.experiences (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL,
    sort_order INT DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS public.journal_posts (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    body TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL,
    sort_order INT DEFAULT 0 NOT NULL
);

ALTER TABLE public.journal_posts
    ADD COLUMN IF NOT EXISTS slug TEXT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'journal_posts_slug_key'
    ) THEN
        ALTER TABLE public.journal_posts ADD CONSTRAINT journal_posts_slug_key UNIQUE (slug);
    END IF;
EXCEPTION
    WHEN OTHERS THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    asset_type TEXT DEFAULT 'image' NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT,
    is_active BOOLEAN DEFAULT true NOT NULL
);

-- ==============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.virtual_tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- PACKAGES: Public read, admin full access
DROP POLICY IF EXISTS "Public read packages" ON public.packages;
CREATE POLICY "Public read packages" ON public.packages FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin full access packages" ON public.packages;
CREATE POLICY "Admin full access packages" ON public.packages FOR ALL USING (true) WITH CHECK (true);

-- SERVICES: Public read, admin full access
DROP POLICY IF EXISTS "Public read services" ON public.services;
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin full access services" ON public.services;
CREATE POLICY "Admin full access services" ON public.services FOR ALL USING (true) WITH CHECK (true);

-- INQUIRIES: Public can insert, admin can view/manage
DROP POLICY IF EXISTS "Public insert inquiries" ON public.inquiries;
CREATE POLICY "Public insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admin full access inquiries" ON public.inquiries;
CREATE POLICY "Admin full access inquiries" ON public.inquiries FOR ALL USING (true) WITH CHECK (true);

-- NEWSLETTER: Public can insert, admin can view
DROP POLICY IF EXISTS "Public insert newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Public insert newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admin full access newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Admin full access newsletter" ON public.newsletter_subscribers FOR ALL USING (true) WITH CHECK (true);

-- VIRTUAL TOURS: Public read, admin full access
DROP POLICY IF EXISTS "Public read virtual_tours" ON public.virtual_tours;
CREATE POLICY "Public read virtual_tours" ON public.virtual_tours FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin full access virtual_tours" ON public.virtual_tours;
CREATE POLICY "Admin full access virtual_tours" ON public.virtual_tours FOR ALL USING (true) WITH CHECK (true);

-- SITE SETTINGS: Public read, admin full access
DROP POLICY IF EXISTS "Public read site_settings" ON public.site_settings;
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin full access site_settings" ON public.site_settings;
CREATE POLICY "Admin full access site_settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);

-- DESTINATIONS, EXPERIENCES, JOURNAL: Public read, admin full access
DROP POLICY IF EXISTS "Public read destinations" ON public.destinations;
CREATE POLICY "Public read destinations" ON public.destinations FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin full access destinations" ON public.destinations;
CREATE POLICY "Admin full access destinations" ON public.destinations FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read experiences" ON public.experiences;
CREATE POLICY "Public read experiences" ON public.experiences FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin full access experiences" ON public.experiences;
CREATE POLICY "Admin full access experiences" ON public.experiences FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read journal_posts" ON public.journal_posts;
CREATE POLICY "Public read journal_posts" ON public.journal_posts FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin full access journal_posts" ON public.journal_posts;
CREATE POLICY "Admin full access journal_posts" ON public.journal_posts FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read media_assets" ON public.media_assets;
CREATE POLICY "Public read media_assets" ON public.media_assets FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin full access media_assets" ON public.media_assets;
CREATE POLICY "Admin full access media_assets" ON public.media_assets FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- 9. SEED DATA: 4 BESPOKE LUXURY SERVICES
-- ==============================================================================
INSERT INTO public.services (id, title, slug, short_desc, full_desc, icon_name, hero_image, sort_order, is_published)
VALUES
(
    'c7a10001-3829-4d8e-9001-000000000001',
    'Private Aviation & Charters',
    'private-aviation-charters',
    'Helicopter transfers to the Himalayas and private jet inter-city travel.',
    'Bypass conventional transit friction with on-demand turboprops, ultra-long-range private jets, and high-altitude helicopters. Seamlessly connect between metropolitan hubs and remote sanctuaries—from direct mountain helipad landings at exclusive Himalayan wellness retreats in Rishikesh and Ladakh to private jet charters linking Delhi, Mumbai, Udaipur, and Kochi with bespoke in-flight concierge services.',
    'Plane',
    'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&q=80&w=1200',
    1,
    true
),
(
    'c7a10001-3829-4d8e-9001-000000000002',
    'Royal Celebrations & Weddings',
    'royal-celebrations-weddings',
    'Palace buyouts and event concierge in Rajasthan.',
    'Transform Rajasthan’s most majestic 18th-century fortresses and floating lake palaces into your personal royal court. We coordinate exclusive full-property palace buyouts across Udaipur, Jaipur, and Jodhpur, orchestrating bespoke celebration architecture, regal torchlit courtyard banquets, private desert sangeets beneath Thar constellations, and discreet 24/7 event concierge liaisons.',
    'Crown',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
    2,
    true
),
(
    'c7a10001-3829-4d8e-9001-000000000003',
    'Wellness & Ayurveda Sanctuaries',
    'wellness-ayurveda-sanctuaries',
    'Curated private retreats in Rishikesh and Kerala.',
    'Immerse in holistic rejuvenation through physician-led Ayurvedic Panchakarma therapies and transformative yogic immersions. Our curated retreats unite high-altitude tranquility in the Himalayan foothills of Rishikesh with serene palm-canopied water sanctuaries in Kumarakom and Alleppey. Featuring personalized dosha-specific culinary menus, sacred Ganga riverfront aartis, and sound healing meditation.',
    'Sparkles',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
    3,
    true
),
(
    'c7a10001-3829-4d8e-9001-000000000004',
    'VIP Chauffeur & Security',
    'vip-chauffeur-security',
    'Premium fleet (vintage cars, luxury SUVs) with executive protection.',
    'Navigate India’s vibrant cities and scenic hinterlands with absolute discretion and comfort. Our hand-selected fleet features armored luxury SUVs, Rolls-Royce and vintage convertibles for ceremonial palace arrivals, and executive vans equipped with Wi-Fi lounges. Accompanied by vetted, multilingual chauffeurs and close-protection security officers trained to international VIP standards.',
    'ShieldCheck',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200',
    4,
    true
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    short_desc = EXCLUDED.short_desc,
    full_desc = EXCLUDED.full_desc,
    icon_name = EXCLUDED.icon_name,
    hero_image = EXCLUDED.hero_image,
    sort_order = EXCLUDED.sort_order,
    is_published = EXCLUDED.is_published;

-- ==============================================================================
-- 10. SEED DATA: 9 CURATED DOMESTIC INDIAN LUXURY PACKAGES
-- ==============================================================================
INSERT INTO public.packages (id, title, slug, description, price, duration, destinations, featured_image, gallery, highlights, is_trending, rating, experience_tags, theme_tags, inclusions, exclusions, scarcity_status)
VALUES
(
    'b7010001-4401-4c11-9001-000000000001',
    'Kerala — God’s Own Country (Grand Circuit)',
    'kerala-gods-own-country-8d',
    'An immersive 7-night journey across Kerala''s crowning destinations—combining Kochi heritage, the misty tea hills of Munnar, Periyar wildlife in Thekkady, an authentic houseboat cruise in Alleppey, and sun-drenched beaches at Kovalam.',
    0,
    '8 Days / 7 Nights',
    ARRAY['Kochi', 'Munnar', 'Thekkady', 'Alleppey', 'Kovalam', 'Trivandrum'],
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200',
    ARRAY['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800'],
    ARRAY['Return Economy Airfare with Taxes Included', 'Abad Atrium Kochi, The Leaf Munnar & Spice Grove Thekkady', 'Traditional A/C Deluxe Houseboat Overnight in Alleppey', 'KTDC Samudra Deluxe Oceanfront Stay in Kovalam & Padmanabhaswamy Temple'],
    true,
    4.9,
    ARRAY['All-Inclusive Flights', 'Backwaters Houseboat', 'Tea Plantations'],
    ARRAY['Gods Own Country', 'Complete Kerala Circuit'],
    ARRAY[
        'Return economy class airfare with taxes included as per scheduled airlines',
        'Kochi Airport reception and private transfer to hotel; drop at Trivandrum Airport',
        '01 Night accommodation on double sharing at Cochin — Abad Atrium (Superior Room) or similar',
        '02 Nights accommodation on double sharing at Munnar — The Leaf (Green Leaf) or similar',
        '01 Night accommodation on double sharing at Thekkady — Spice Grove (Deluxe Room) or similar',
        '01 Night accommodation on double sharing at Alleppey — A/C Deluxe Houseboat or similar',
        '02 Nights accommodation on double sharing at Kovalam — KTDC Samudra (Deluxe Room) or similar',
        'Meal Plan MAPI: Daily Breakfast, Lunch, and Dinner included throughout',
        'All transfers and sightseeing by dedicated private A/C Toyota Etios (including toll, parking, road tax, driver allowance)',
        'Entrance tickets: Boating charge at Thekkady, monument entries, spice plantation tour, and park entrance fees'
    ],
    ARRAY[
        '5.00% GST applicable on total booking',
        'Early check-in / late check-out at hotels',
        'Optional activities: Spice plantation elephant safari, jeep safari, adventure sports',
        'Personal expenses such as laundry, bar bills, tips, and camera permits'
    ],
    'Airfare & Houseboat Allotment'
),
(
    'b7010002-4402-4c12-9002-000000000002',
    'Kerala Backwaters & Hills Escapade',
    'kerala-backwaters-hills-5d',
    'A compact 5-day holiday through Kerala''s emerald tea hills and tranquil canals. Experience Munnar waterfalls, the Cardamom Hills of Thekkady, and a full-board overnight backwater cruise aboard Riverine Cruises.',
    0,
    '5 Days / 4 Nights',
    ARRAY['Munnar', 'Thekkady', 'Alleppey', 'Kochi'],
    'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=1200',
    ARRAY['https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800'],
    ARRAY['Hotel Cloud Palace in Munnar with Waterfalls En Route', 'Hotel Sandra Palace in Thekkady & Cardamom Hills', 'Exclusive Riverine Cruise in Alleppey with All Meals On Board', 'Mattupetty Dam, Echo Point & Kundala Lake Sightseeing'],
    true,
    4.8,
    ARRAY['Riverine Cruise', 'Full Board Houseboat', 'Cardamom Hills'],
    ARRAY['Hill Stations', 'Emerald Waters'],
    ARRAY[
        '02 Nights accommodation at Munnar — Hotel Cloud Palace',
        '01 Night accommodation at Thekkady — Hotel Sandra Palace',
        '01 Night accommodation on board Riverine Cruises (Alleppey)',
        'Riverine Cruise Full Board Inclusions: Welcome Drinks, Lunch, Evening Tea & Snacks, Dinner, and Breakfast',
        'Private AC vehicle for all transfers: Kochi Airport pickup, Munnar, Thekkady, Alleppey, and Kochi Airport drop',
        'Full sightseeing covering Mattupetty Dam, Echo Point, Kundala Lake, and tea plantation photo points',
        'Driver allowances, state taxes, toll clearances, and vehicle parking'
    ],
    ARRAY[
        '5.00% GST applicable',
        'Optional activities: Spice garden walk, cultural Kathakali shows, local shopping',
        'Personal beverages, telephone charges, and laundry outside cruise meal plan'
    ],
    'Riverine Cruise Exclusive'
),
(
    'b7010003-4403-4c13-9003-000000000003',
    'Kashmir — Valleys of Paradise & Gulmarg',
    'kashmir-paradise-valleys-7d',
    'Discover the ethereal beauty of Kashmir over 7 days. Drive through alpine pine forests in Sonamarg, take the Gulmarg Gondola ride to snow peaks, wander the meadows of Pahalgam, and sleep under stars in a traditional Dal Lake deluxe houseboat.',
    0,
    '7 Days / 6 Nights',
    ARRAY['Srinagar', 'Sonamarg', 'Gulmarg', 'Pahalgam', 'Dal Lake'],
    'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=1200',
    ARRAY['https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=800'],
    ARRAY['Return Economy Airfare with Taxes Included', 'Gulmarg Gondola Ride Ticket (Phase 1 Included)', '60-Minute Private Shikara Ride on Dal Lake & Deluxe Houseboat Stay', 'Mughal Gardens Entry (Nishat, Shalimar, Chashme Shahi) & Betaab Valley'],
    true,
    5.0,
    ARRAY['Gondola Phase 1 Included', 'Dal Lake Houseboat', 'Return Flights Included'],
    ARRAY['Alpine Heaven', 'Kashmir Valleys'],
    ARRAY[
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
        'Srinagar Airport pickup and drop assistance'
    ],
    ARRAY[
        '5.00% GST applicable',
        'Optional pony ride to Thajiwas Glacier in Sonamarg',
        'Local private union vehicles for Aru Valley, Betaab Valley & Chandanwari in Pahalgam',
        'Personal activities such as skiing, snowboarding, sledging, or camera charges'
    ],
    'Gondola Pass Allotment'
),
(
    'b7010004-4404-4c14-9004-000000000004',
    'Blissful Goa Coastal & Heritage Getaway',
    'blissful-goa-beach-getaway-4d',
    'A relaxed 4-day tropical escape balancing the sands of Colva, the vibrant energy of North Goa, and the serene heritage of South Goa. Includes historic Portuguese forts, spice plantations, and an evening Mandovi River Cruise.',
    0,
    '4 Days / 3 Nights',
    ARRAY['Colva Beach', 'North Goa', 'South Goa'],
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1200',
    ARRAY['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800'],
    ARRAY['Comfortable Stay at Hotel Colva Kinara near Colva Beach', 'North Goa Fort Aguada, Candolim Beach, Baga Beach & Dolphin Point', 'Scenic Mandovi River Cruise with Live Entertainment', 'South Goa Old Goa UNESCO Churches, Mangueshi Temple & Spice Farm'],
    false,
    4.8,
    ARRAY['Mandovi River Cruise', 'Colva Beachfront', 'Private AC Vehicle'],
    ARRAY['Beach Retreat', 'Portuguese Heritage'],
    ARRAY[
        '03 Nights accommodation on double-sharing basis at Hotel Colva Kinara (or similar)',
        'Double-sharing accommodation with daily breakfast during stay (CPAI)',
        'Airport / Railway Station pick-up and drop; arrival/departure assistance',
        'Private AC vehicle for North Goa sightseeing (Fort Aguada, Candolim, Baga, Dolphin Point, Snow Park)',
        'Mandovi River Cruise ticket included',
        'Full-day South Goa sightseeing (Shantadurga Temple, Spice Farm, Big Foot, Mangueshi Temple, Old Goa Church, Wax World)',
        'All sightseeing, parking fees, toll taxes, and travel assistance throughout'
    ],
    ARRAY[
        'Flight or train tickets to and from Goa',
        'Water sports activities (parasailing, jet-ski, banana ride) and scuba diving',
        'Personal expenses such as laundry, minibar, drinks, tips, and camera tickets',
        '5.00% GST applicable'
    ],
    'Colva Beach Resort Partner'
),
(
    'b7010005-4405-4c15-9005-000000000005',
    'Experience Varanasi & Dev Deepawali Sacred Lights',
    'experience-varanasi-dev-deepawali-3d',
    'Witness the divine festival of lights where the sacred riverfront of Kashi illuminates with thousands of earthen lamps. Features Kashi Vishwanath Corridor darshan, Subah-e-Banaras at Assi Ghat, an exclusive Dev Deepawali evening boat ride, and Buddhist heritage at Sarnath.',
    0,
    '3 Days / 2 Nights',
    ARRAY['Varanasi', 'Kashi Vishwanath', 'Assi Ghat', 'Sarnath'],
    'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=1200',
    ARRAY['https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800'],
    ARRAY['Special Dev Deepawali Boat Experience & Riverfront Deepdaan', 'Darshan at Kashi Vishwanath Temple, Corridor & Kal Bhairav', 'Evening Dashashwamedh Ghat Maha Aarti & Subah-e-Banaras Sunrise', 'Excursion to Sarnath, Dhamek Stupa & Buddhist Archaeological Complex'],
    true,
    5.0,
    ARRAY['Dev Deepawali Boat', 'Kashi Vishwanath Corridor', 'Ganga Maha Aarti'],
    ARRAY['Spiritual Kashi', 'Festival of Lights'],
    ARRAY[
        '02 Nights accommodation in a handpicked heritage hotel/resort in Varanasi',
        'Double-sharing accommodation with daily breakfast (CPAI)',
        'Varanasi Airport / Railway Station pick-up and drop in private AC vehicle',
        'Special Dev Deepawali evening boat ride, Deepdaan, illuminated ghats, and Ganga Aarti vantage',
        'Temple darshan assistance: Kashi Vishwanath, Annapurna, Kal Bhairav, Sankat Mochan, Durga Temple, New Vishwanath BHU',
        'Excursion to Buddhist heritage site Sarnath & Dhamek Stupa with archaeological complex visit',
        'All transfers, tolls, parking, and dedicated travel team assistance throughout'
    ],
    ARRAY[
        'Flight or train tickets to and from Varanasi',
        'Personal expenses, laundry, drinks, and discretionary priest dakshina',
        'Special VIP fast-track darshan tokens beyond standard temple access',
        '5.00% GST applicable'
    ],
    'Dev Deepawali Special Edition'
),
(
    '2a5afe16-4b69-4557-a66f-273aef15c795',
    'Heritage & Palaces Grand Tour',
    'royal-rajasthan-tour',
    'Experience the ultimate sovereign circuit across Rajasthan''s royal capitals. Private fortress buyouts, torchlit rampart dining, and suites in living royal palaces.',
    2500,
    '10 Days',
    ARRAY['Udaipur', 'Jaipur', 'Jodhpur'],
    'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=1200',
    ARRAY['https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800'],
    ARRAY['Taj Lake Palace Grand Presidential Suite', 'Private Helicopter Transfers between Royal Fortresses', 'Amber Fort & City Palace Exclusive Night Access'],
    true,
    4.9,
    ARRAY['Private Aviation', 'Palace Buyout'],
    ARRAY['Heritage & Palaces', 'Royal Fortresses', 'Living Heritage'],
    ARRAY[
        'Taj Lake Palace Grand Presidential Suite & Rambagh Palace Sukh Niwas stays',
        'Private twin-engine helicopter transfers between Udaipur, Jodhpur, and Jaipur',
        'Vintage Rolls-Royce and armored luxury SUV chauffeur fleet throughout',
        'Personal royal historian liaison for exclusive Amber Fort and City Palace night access',
        'Private Thar Desert tented camp with royal banquet & sunset camel caravan',
        'Dedicated 24/7 Sarrin Private Concierge and all royal palace courtyard dining'
    ],
    ARRAY[
        'Commercial or private transcontinental long-haul flights',
        'Consular visa procurement fees for international accompanying guests',
        'Discretionary royal palace staff and chauffeur gratuities',
        'Personal heritage gem purchases, antique acquisitions, and custom textiles'
    ],
    'Limited Diwali Availability'
),
(
    '410f9c21-1a38-4f58-a0c7-8881d95fad01',
    'Backwaters & Coastal Sanctuaries',
    'kerala-houseboat-retreat',
    'Drift through serene palm-fringed backwaters in Alleppey aboard a luxury houseboat, unwind in secluded Bekal cliffside villas, and sail private South Goa yachts.',
    1850,
    '7 Days',
    ARRAY['Alleppey', 'Bekal', 'Goa'],
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200',
    ARRAY['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800'],
    ARRAY['Exclusive Air-Conditioned Houseboat Buyout', 'Private Pool Villa at Taj Bekal', 'South Goa Private Sunset Yacht Charter'],
    false,
    4.8,
    ARRAY['Backwaters & Coast', 'Private Yacht Charter', 'Private Island Stay'],
    ARRAY['Backwaters & Coast', 'Eco-Luxury', 'Coastal Sanctuaries'],
    ARRAY[
        'Exclusive air-conditioned 2-bedroom luxury Kettuvallam houseboat buyout in Alleppey',
        'Secluded cliffside private pool villa stay at Taj Bekal Resort & Spa',
        'Private sunset catamaran and yacht charter along secluded South Goa coastlines',
        'Dedicated Private Chef serving bespoke Malabar coastal and fresh seafood fare',
        'Daily 90-minute Ayurvedic Abhyanga & Shirodhara rejuvenation therapy on deck',
        'Chauffeured luxury Toyota Vellfire ground transfers between regional coastal air hubs'
    ],
    ARRAY[
        'Inter-state commercial flights between Goa and Kerala air terminals',
        'Specialized PADI deep-sea diving certifications and motorized equipment rentals',
        'Vintage imported champagnes and rare single malt whiskeys outside pairings',
        'Discretionary crew and villa personal butler gratuities'
    ],
    'Only 2 Houseboat Buyouts This Season'
),
(
    'c12d3208-03bb-49c7-ad85-19f6e86612c6',
    'Spiritual & Wellness Retreats',
    'himalayan-wellness-escapade',
    'Transcendent sacred rites and restorative silence. Experience private VIP river barges for Ganga Aarti in Varanasi and palace wellness at Ananda in the Himalayas.',
    2200,
    '8 Days',
    ARRAY['Rishikesh', 'Varanasi', 'Ananda in the Himalayas'],
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200',
    ARRAY['https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800'],
    ARRAY['Palace Suite at Ananda in the Himalayas', 'Private VIP River Barge for Ganga Aarti', 'Physician-Led Ayurvedic Pulse Diagnosis'],
    true,
    5.0,
    ARRAY['Spiritual & Wellness Retreats', 'Sacred Rituals', 'High-Altitude Sanctuary'],
    ARRAY['Spiritual & Wellness Retreats', 'Sacred & Spiritual', 'Wellness'],
    ARRAY[
        'Valley View Palace Suite stays at Ananda in the Himalayas and luxury heritage riverfront suites in Varanasi',
        'Private VIP river barge for sacred Ganga Aarti ceremony at Parmarth Niketan & Dashashwamedh Ghat',
        'Physician-led Ayurvedic pulse assessment (Nadi Pariksha) & bespoke dosha culinary curation',
        'Daily private yoga, pranayama, and sound meditation with Himalayan yogis and Vedic scholars',
        'Helicopter transfers connecting Dehradun Airport and the Ananda retreat helipad',
        'Herbal steam therapies, hydrotherapy infusions, and daily cold-pressed restorative elixirs'
    ],
    ARRAY[
        'Domestic flights between Varanasi and Dehradun commercial terminals',
        'Personal international telecommunication and specialized lab diagnostics',
        'Off-property luxury purchases and custom artisanal weaving acquisitions',
        'Discretionary priest dakshina and spa curator gratuities'
    ],
    'Autumn Solstice Allocation: 3 Pavilions Remaining'
),
(
    'e4f9b8c2-7104-4e3a-9281-55018274a910',
    'Wild & Untamed: Royal Tiger Safaris',
    'wild-untamed-tiger-safari',
    'Explore the apex wilderness of central and northern India. Exclusive 4x4 open-top gypsy safaris, luxury machan pavilions, and master naturalists tracking Royal Bengal Tigers.',
    2750,
    '9 Days',
    ARRAY['Ranthambore', 'Jim Corbett', 'Bandhavgarh'],
    'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=1200',
    ARRAY['https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=800'],
    ARRAY['Aman-i-Khas & Taj Safari Luxury Forest Pavilions', 'Exclusive 4x4 Gypsy Corridors with Master Trackers', 'Private Torchlit Bush Dinners under Forest Stars'],
    true,
    4.9,
    ARRAY['Wild & Untamed', 'Royal Bengal Tigers', 'Luxury Jungle Lodges'],
    ARRAY['Wild & Untamed', 'Apex Wildlife', 'Forest Sanctuary'],
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
    '4 Winter Safari Permits Available'
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    duration = EXCLUDED.duration,
    destinations = EXCLUDED.destinations,
    featured_image = EXCLUDED.featured_image,
    gallery = EXCLUDED.gallery,
    highlights = EXCLUDED.highlights,
    is_trending = EXCLUDED.is_trending,
    rating = EXCLUDED.rating,
    experience_tags = EXCLUDED.experience_tags,
    theme_tags = EXCLUDED.theme_tags,
    inclusions = EXCLUDED.inclusions,
    exclusions = EXCLUDED.exclusions,
    scarcity_status = EXCLUDED.scarcity_status;

-- ==============================================================================
-- 11. SEED DATA: 3 360° VR SPATIAL TOURS
-- ==============================================================================
INSERT INTO public.virtual_tours (id, title, subtitle, location, tag, panorama, thumbnail, description, features, hotspots, sort_order, is_published)
VALUES
(
    'taj-palace-suite',
    'The Heritage Grand Suite — Taj Mahal Palace',
    'Opulent Gilded Architecture Overlooking the Arabian Sea',
    'Mumbai, Maharashtra',
    'Royal Heritage',
    '/panoramas/taj-mahal-palace.jpg',
    '/scene-snow.png',
    'Step inside the architectural crowning jewel of Mumbai. Featuring majestic grand staircases, Belgian chandeliers, and century-old vaulted ceilings reserved for dignitaries and royal delegations.',
    ARRAY['24/7 Private Butler', 'Panoramic Harbor Views', 'Heritage Antiques', 'Private Chauffeur'],
    '[
        {"id": "taj-harbor", "title": "Arabian Sea Harbor View", "subtitle": "Gateway of India panoramic vantage", "tag": "Scenic View", "position": {"yaw": 0.35, "pitch": 0.02}},
        {"id": "taj-butler", "title": "Private Butler Station", "subtitle": "24/7 dedicated royal butler service", "tag": "Concierge", "position": {"yaw": -1.2, "pitch": -0.15}},
        {"id": "taj-chandelier", "title": "Belgian Crystal Chandelier", "subtitle": "19th century hand-cut heirloom", "tag": "Heritage", "position": {"yaw": 1.6, "pitch": 0.3}}
    ]'::jsonb,
    1,
    true
),
(
    'kerala-houseboat-lagoon',
    'Bespoke Lake Villa & Houseboat Waterway',
    'Private Teak Sun-Decks Along Emerald Palm-Fringed Lagoons',
    'Kumarakom, Kerala Backwaters',
    'Backwaters Sanctuary',
    '/panoramas/kerala-houseboat-waters.jpg',
    '/package-amalfi.png',
    'A tranquil immersion into Vembanad Lake. Experience an authentic two-bedroom luxury Kettuvallam crafted without a single iron nail, featuring panoramic lounge glass, private chef galleys, and sunset observation decks.',
    ARRAY['Master Ayurvedic Vaidya', 'Private Coastal Chef', 'Silent Solar Propulsion', 'Canoe Excursions'],
    '[
        {"id": "houseboat-deck", "title": "Teak Observation Sun-Deck", "subtitle": "Open-air sunset panoramas", "tag": "Relaxation", "position": {"yaw": 0.0, "pitch": -0.05}},
        {"id": "houseboat-galley", "title": "Private Chef Kitchen", "subtitle": "Fresh Malabar seafood curation", "tag": "Gastronomy", "position": {"yaw": 2.1, "pitch": 0.1}},
        {"id": "houseboat-waterway", "title": "Vembanad Waterway", "subtitle": "Protected migratory bird lagoon", "tag": "Nature", "position": {"yaw": -1.8, "pitch": 0.0}}
    ]'::jsonb,
    2,
    true
),
(
    'rajasthan-heritage-terrace',
    'Citadel Sunset Pavilion & Royal Suites',
    'Sandstone Jharokhas & Torchlit Ramparts Overlooking Golden Fortresses',
    'Udaipur & Jodhpur, Rajasthan',
    'Desert Citadel',
    '/panoramas/luxury-resort-suite.jpg',
    '/scene-desert.png',
    'Perched atop living fortress walls. Featuring hand-carved jali stone lattice, silk-draped royal pavilions, and open-air stargazing dining terraces overlooking the blue city and shimmering lakes.',
    ARRAY['Helipad Direct Access', 'Royal Historian Escort', 'Vintage Rolls Fleet', 'Bespoke Banquets'],
    '[
        {"id": "rajasthan-terrace", "title": "Rampart Dining Pavilion", "subtitle": "Private torchlit dining setting", "tag": "Dining", "position": {"yaw": 0.45, "pitch": -0.08}},
        {"id": "rajasthan-jali", "title": "Hand-Carved Jali Lattice", "subtitle": "18th century Rajput craftsmanship", "tag": "Architecture", "position": {"yaw": -1.4, "pitch": 0.15}},
        {"id": "rajasthan-view", "title": "Fortress Citadel Panorama", "subtitle": "Unobstructed sunset vantage", "tag": "Scenic View", "position": {"yaw": 2.8, "pitch": 0.05}}
    ]'::jsonb,
    3,
    true
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    location = EXCLUDED.location,
    tag = EXCLUDED.tag,
    panorama = EXCLUDED.panorama,
    thumbnail = EXCLUDED.thumbnail,
    description = EXCLUDED.description,
    features = EXCLUDED.features,
    hotspots = EXCLUDED.hotspots,
    sort_order = EXCLUDED.sort_order,
    is_published = EXCLUDED.is_published;

-- ==============================================================================
-- 12. SEED DATA: 3 JOURNAL ARTICLES
-- ==============================================================================
INSERT INTO public.journal_posts (id, title, slug, excerpt, body, category, image_url, is_published, sort_order)
VALUES
(
    '4c4442fe-6fe0-44f9-94f8-cd9662b9f14d',
    'Echoes of the Thar: Opulent Fortresses & Heritage Palaces of Rajasthan',
    'rajasthan-heritage-palaces',
    'From private candlelit dinners on Lake Pichola to sunset safaris across golden dunes, immerse in regal Rajputana splendour.',
    'To experience Rajasthan through the prism of sovereign luxury is to step across the boundary separating ordinary tourism from living history. For centuries, the royal families of Jaipur, Udaipur, and Jodhpur curated lives of extraordinary aesthetic refinement—where sandstone ramparts met hand-painted frescoes and courtyards echoed with the melodies of classical sarangi virtuosos.

Our curated Rajputana circuits unlock private chambers and fortress ramparts normally sealed behind velvet ropes. Imagine boarding a private ceremonial barge at dusk on Lake Pichola, drifting toward the white-marble apparition of Taj Lake Palace as thousands of floating clay lamps illuminate the waters.

By day, your dedicated royal historian guides you through private suites in living palaces—accompanied by personal meetings with master textile artisans and gem custodians who have preserved ancestral savoir-faire across seven generations.

As twilight descends over the Thar Desert, your private encampment awakes: handcrafted royal shamiana pavilions draped in raw silk, silver dinnerware, and multi-course Rajput banquets prepared over fragrant wood embers under a ceiling of infinite stars.',
    'Royal Heritage',
    'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200',
    true,
    1
),
(
    '6ced8bf3-ce10-4b3c-8d5a-7348c56926b1',
    'The Art of Slow Living: Kerala’s Emerald Backwaters & Secret Lagoons',
    'kerala-slow-solitude',
    'Drift silently along palm-canopied waterways aboard a bespoke kettuvallam with master Ayurvedic healers and coastal dining.',
    'In a world measured by velocity, the emerald backwaters of Kerala represent the pinnacle of true luxury: unhurried, intentional time. Here, the waters of Vembanad Lake stretch into an intricate labyrinth of palm-canopied waterways where the modern world gently falls away.

Our guests embark on private buyouts of master-crafted Kettuvallam houseboats—crafted from indigenous Anjili timber and coir without a single metal nail, yet outfitted with climate-controlled staterooms, panoramic glass view lounges, and private sun-decks.

Accompanying your voyage is a dedicated Private Chef and master Ayurvedic physician (Vaidya). Each morning begins with gentle deck yoga as river mist lifts over water hyacinths, followed by tailored Abhyanga therapies utilizing warm botanical oils pressed in regional monastic apothecaries.

Evenings unfold over freshly prepared Malabar coastal delicacies: Karimeen Pollichathu wrapped in charred banana leaves, coconut-scented appams, and chilled organic coconut water harvested minutes before docking at secluded lagoon sanctuaries.',
    'Coastal Sanctuaries',
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200',
    true,
    2
),
(
    '2fd973da-a310-4d44-8e64-ce84c75b16da',
    'Sanctuary Above the Clouds: High-Altitude Himalayan Wellness in Rishikesh',
    'himalayan-wellness-sanctuary',
    'Perched amidst whispering sal forests and sacred mountain waters, discover transformative yoga retreats and sunset aartis.',
    'High in the Garhwal foothills where the sacred Ganges flows crystal-clear from glacial heights, the air is perfumed with mountain pine, wild cedar, and the quiet rhythm of ancient contemplation.

Our Himalayan Wellness Escapade centers upon exclusive palace sanctuaries perched 3,000 feet above the valley floor. Here, restorative wellness is approached not as an itinerary, but as an awakening of vitality through traditional Hatha yoga, Tibetan singing bowl sound therapy, and hydrotherapy fed by pristine mountain springs.

Guests enjoy private helipad transfers directly from New Delhi or Dehradun, bypassing regional road congestion in serene aerial comfort. Your days are structured around bespoke consultations with Ayurvedic doctors, forest mindfulness treks through private sal canopies, and private riverside bajra platforms for the evening Ganga Aarti.

As temple bells resonate across the canyon at twilight and priests elevate flaming brass lamps toward the river, an overwhelming sense of clarity takes hold—reminding us why the Himalayas have long stood as the spiritual crown of the subcontinent.',
    'Himalayan Wellness',
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200',
    true,
    3
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    body = EXCLUDED.body,
    category = EXCLUDED.category,
    image_url = EXCLUDED.image_url,
    is_published = EXCLUDED.is_published,
    sort_order = EXCLUDED.sort_order;

-- ==============================================================================
-- 13. SEED DATA: INITIAL SITE SETTINGS & NOTIFICATION INTEGRATIONS
-- ==============================================================================
INSERT INTO public.site_settings (key, value)
VALUES
(
    'site',
    '{
        "brandName": "Sarrin Holidays",
        "tagline": "Journey beyond limits",
        "logoUrl": "/sarrin-holidays-logo.png",
        "heroTitle": "Journeys crafted for the extraordinary",
        "heroDescription": "From royal Rajasthan palaces to sacred Himalayan heights, discover handcrafted escapes to the subcontinent''s most breathtaking places.",
        "heroBadge": "Rated 4.9 by 12,000+ travelers",
        "contactEmail": "concierge@sarrinholidays.com",
        "contactPhone": "+91 8419887730"
    }'::jsonb
),
(
    'integrations',
    '{
        "emailEnabled": false,
        "recipientEmail": "concierge@sarrinholidays.com",
        "resendApiKey": "",
        "fromEmail": "Sarrin Concierge <concierge@sarrinholidays.com>",
        "webhookEnabled": false,
        "webhookUrl": ""
    }'::jsonb
)
ON CONFLICT (key) DO UPDATE SET
    value = EXCLUDED.value,
    updated_at = now();

-- ==============================================================================
-- 14. AUTH USER AUTO-CONFIRM (admin@sarrinholidays.com)
-- ==============================================================================
DO $$
BEGIN
    UPDATE auth.users
    SET email_confirmed_at = COALESCE(email_confirmed_at, now()),
        updated_at = now()
    WHERE email = 'admin@sarrinholidays.com';
EXCEPTION
    WHEN OTHERS THEN NULL;
END $$;

