-- ==============================================================================
-- Migration: Expand packages table with theme_tags, inclusions, exclusions, and scarcity_status
-- Project: Sarrin Holidays Luxury Travel Portal
-- Date: 2026-09-22
-- ==============================================================================

-- 1. Add new columns to public.packages
ALTER TABLE public.packages
    ADD COLUMN IF NOT EXISTS theme_tags TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS inclusions TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS exclusions TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS scarcity_status TEXT;

-- 2. Add documentation comments
COMMENT ON COLUMN public.packages.theme_tags IS 'Curated thematic classifications such as Sacred & Spiritual, Wellness, Legacy & Heritage.';
COMMENT ON COLUMN public.packages.inclusions IS 'Explicit list of luxury amenities, private charters, and high-touch Sarrin Holidays services included in the tariff.';
COMMENT ON COLUMN public.packages.exclusions IS 'Transparent disclosures of items not covered (e.g., International Airfare, Visa Fees).';
COMMENT ON COLUMN public.packages.scarcity_status IS 'Real-time or high-demand availability alert (e.g., Limited Diwali Availability).';

-- 3. Update existing Indian travel seed data with rich themes, inclusions, exclusions, and scarcity indicators

-- Package 1: Royal Rajasthan Tour
UPDATE public.packages
SET 
    theme_tags = ARRAY['Legacy & Heritage', 'Royal Palaces', 'Desert Luxury'],
    inclusions = ARRAY[
        'Taj Lake Palace Grand Presidential Suite & Rambagh Palace Sukh Niwas stays',
        'Private twin-engine helicopter transfers between Udaipur and Jodhpur',
        'Vintage Rolls-Royce and armored luxury SUV chauffeur fleet throughout',
        'Personal royal historian liaison for exclusive Amber Fort and City Palace night access',
        'Private Thar Desert tented camp with royal banquet & sunset camel caravan',
        'Dedicated 24/7 Sarrin Holidays liaison and all royal palace courtyard dining'
    ],
    exclusions = ARRAY[
        'International commercial or private aviation to New Delhi (available upon request)',
        'Indian consular tourist visa procurement fees',
        'Discretionary royal palace staff and chauffeur gratuities',
        'Personal heritage gem purchases, antique acquisitions, and custom textiles'
    ],
    scarcity_status = 'Limited Diwali Availability'
WHERE slug = 'royal-rajasthan-tour';

-- Package 2: Private Kerala Houseboat Retreat
UPDATE public.packages
SET 
    theme_tags = ARRAY['Wellness', 'Eco-Luxury', 'Backwater Serenity'],
    inclusions = ARRAY[
        'Exclusive air-conditioned 2-bedroom luxury Kettuvallam houseboat buyout',
        'Dedicated Private Chef serving bespoke Malabar coastal & Ayurvedic menus',
        'Daily 90-minute Ayurvedic Abhyanga & Shirodhara rejuvenation therapy on deck',
        'Silent electric canoe excursions through narrow village canals with local botanist',
        'Lake Vembanad sunset champagne cruises and private Kathakali performance',
        'Chauffeured luxury hybrid transfers from Cochin International Airport'
    ],
    exclusions = ARRAY[
        'International and domestic inter-city flight tickets',
        'Indian travel visa fees and medical insurance coverage',
        'Vintage imported champagnes and rare single malt whiskeys beyond curated pairing',
        'Motorized water sport rentals outside the curated voyage'
    ],
    scarcity_status = 'Only 2 Private Buyouts Available This Winter'
WHERE slug = 'kerala-houseboat-retreat';

-- Package 3: Himalayan Wellness Escapade
UPDATE public.packages
SET 
    theme_tags = ARRAY['Sacred & Spiritual', 'Wellness', 'High-Altitude Sanctuary'],
    inclusions = ARRAY[
        'Valley View Palace Suite stays at Ananda in the Himalayas',
        'Physician-led Ayurvedic pulse assessment (Nadi Pariksha) & bespoke dosha dining',
        'Daily private yoga, pranayama, and sound meditation with Himalayan yogis',
        'Private VIP river barge for sacred Ganga Aarti ceremony at Parmarth Niketan, Rishikesh',
        'Helicopter transfers connecting Dehradun Airport and the retreat helipad',
        'Herbal steam therapies, hydrotherapy infusions, and daily fresh cold-pressed elixirs'
    ],
    exclusions = ARRAY[
        'Transcontinental flights and domestic flights to Dehradun',
        'Indian entry visa and travel health clearance fees',
        'Personal international telecommunication and specialized lab diagnostics',
        'Off-property luxury purchases and custom trekking equipment'
    ],
    scarcity_status = 'Autumn Solstice Allocation: 3 Pavilions Remaining'
WHERE slug = 'himalayan-wellness-escapade';
