import { createClient } from '@/lib/supabase/client'

export type SiteSetting = { key: string; value: Record<string, any> }
export type Destination = { id: string; country: string; title: string; description: string; duration: string; price: string; image_url: string; is_featured: boolean; is_published: boolean; sort_order: number }
export type Experience = { id: string; category: string; title: string; description: string; image_url: string; is_published: boolean; sort_order: number }
export type JournalPost = { id: string; title: string; excerpt: string; body: string; category: string; image_url: string; published_at: string | null; is_published: boolean; sort_order: number }

export const fallbackSite = { brandName: 'Sarrin Holidays', tagline: 'Journey beyond limits', logoUrl: '/sarrin-holidays-logo.png', logoGifUrl: '', useGifLogo: false, heroTitle: 'Journeys crafted for the extraordinary', heroDescription: 'From private island retreats to alpine hideaways, discover handcrafted escapes to the world’s most breathtaking places.', heroBadge: 'Rated 4.9 by 12,000+ travelers' }
export const fallbackDestinations: Destination[] = [
  { id: 'amalfi', country: 'Italy', title: 'Amalfi Coast Curation', description: 'Private cliffside villas, chartered sunset sails, and coastal dining.', duration: '7 Days / 6 Nights', price: 'From $4,200', image_url: '/package-amalfi.png', is_featured: true, is_published: true, sort_order: 1 },
  { id: 'kyoto', country: 'Japan', title: 'Kyoto Hidden Pavilions', description: 'Dawn temple access, private tea ceremonies, and quiet ryokan stays.', duration: '6 Days / 5 Nights', price: 'From $5,800', image_url: '/package-kyoto.png', is_featured: true, is_published: true, sort_order: 2 },
  { id: 'serengeti', country: 'Tanzania', title: 'Serengeti Private Safari', description: 'Exclusive camps, golden-hour drives, and a balloon crossing.', duration: '8 Days / 7 Nights', price: 'From $9,400', image_url: '/package-serengeti.png', is_featured: true, is_published: true, sort_order: 3 },
]

export async function getPublicContent() {
  const supabase = createClient()
  const [{ data: settings }, { data: destinations }, { data: experiences }, { data: journal }] = await Promise.all([
    supabase.from('site_settings').select('key,value').eq('key', 'site').maybeSingle(),
    supabase.from('destinations').select('*').eq('is_published', true).order('sort_order'),
    supabase.from('experiences').select('*').eq('is_published', true).order('sort_order'),
    supabase.from('journal_posts').select('*').eq('is_published', true).order('sort_order'),
  ])
  return { site: { ...fallbackSite, ...(settings?.value ?? {}) }, destinations: destinations?.length ? destinations : fallbackDestinations, experiences: experiences ?? [], journal: journal ?? [] }
}
