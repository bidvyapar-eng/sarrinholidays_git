-- ==============================================================================
-- Migration: Create Services Table and Seed Premium Indian Luxury Services
-- Schema: public.services
-- Date: 2026-09-22
-- ==============================================================================

-- 1. Create the services table
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

-- 2. Add comment descriptions
COMMENT ON TABLE public.services IS 'Curated bespoke luxury travel services for Sarrin Holidays.';
COMMENT ON COLUMN public.services.icon_name IS 'Lucide React icon component identifier (e.g. Plane, Crown, Sparkles, ShieldCheck).';
COMMENT ON COLUMN public.services.hero_image IS 'High-resolution Unsplash visual asset for the service showcase.';

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- 4. Create Security Policies
-- Allow public unauthenticated read access
DROP POLICY IF EXISTS "Allow public read access" ON public.services;
CREATE POLICY "Allow public read access" ON public.services 
    FOR SELECT USING (true);

-- Allow full access for admin and operations panel
DROP POLICY IF EXISTS "Allow operations full access" ON public.services;
CREATE POLICY "Allow operations full access" ON public.services 
    FOR ALL USING (true)
    WITH CHECK (true);

-- 5. Seed with 4 Premium Indian Luxury Services
INSERT INTO public.services (
    id,
    title,
    slug,
    short_desc,
    full_desc,
    icon_name,
    hero_image,
    sort_order,
    is_published
) VALUES
(
    'c7a10001-3829-4d8e-9001-000000000001',
    'Private Aviation & Charters',
    'private-aviation-charters',
    'Helicopter transfers to the Himalayas and private jet inter-city travel.',
    'Bypass conventional transit friction with on-demand turboprops, ultra-long-range private jets, and high-altitude helicopters. Seamlessly connect between metropolitan hubs and remote sanctuaries—from direct mountain helipad landings at exclusive Himalayan wellness retreats in Rishikesh and Ladakh to private jet charters linking Delhi, Mumbai, Udaipur, and Kochi with bespoke in-flight Sarrin Holidays services.',
    'Plane',
    'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&q=80&w=1200',
    1,
    true
),
(
    'c7a10001-3829-4d8e-9001-000000000002',
    'Royal Celebrations & Weddings',
    'royal-celebrations-weddings',
    'Palace buyouts and event curation in Rajasthan by Sarrin Holidays.',
    'Transform Rajasthan’s most majestic 18th-century fortresses and floating lake palaces into your personal royal court. We coordinate exclusive full-property palace buyouts across Udaipur, Jaipur, and Jodhpur, orchestrating bespoke celebration architecture, regal torchlit courtyard banquets, private desert sangeets beneath Thar constellations, and discreet 24/7 Sarrin Holidays liaisons.',
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
