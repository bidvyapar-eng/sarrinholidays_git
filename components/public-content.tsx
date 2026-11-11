'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { fallbackDestinations, fallbackSite, type Destination, type Experience, type JournalPost } from '@/lib/cms'
import { JournalSection } from '@/components/journal-section'
import { AboutSection } from '@/components/about-section'

const AUTHENTIC_INDIAN_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    category: 'Royal Heritage',
    title: 'Suites in Living Rajputana Palaces',
    description: 'Private fortress buyouts, torchlit rampart dining, and presidential suites at Taj Lake Palace Udaipur and Rambagh Palace Jaipur.',
    image_url: '/experiences/rajputana-palaces.jpg',
    is_published: true,
    sort_order: 1,
  },
  {
    id: 'exp-2',
    category: 'Waterway Sanctuaries',
    title: 'Exclusive Kettuvallam Houseboat Buyouts',
    description: 'Silent drifting through Alleppey’s emerald palm waterways with a dedicated private coastal chef and certified Ayurvedic therapist.',
    image_url: '/experiences/houseboat-buyout.jpg',
    is_published: true,
    sort_order: 2,
  },
  {
    id: 'exp-3',
    category: 'Apex Wilderness',
    title: 'Naturalist-Led Royal Bengal Tiger Safaris',
    description: 'Exclusive 4x4 open-top gypsy corridors across Ranthambore and Bandhavgarh with senior trackers and luxury forest pavilions.',
    image_url: '/experiences/tiger-safari.jpg',
    is_published: true,
    sort_order: 3,
  },
]

export function PublicContent() {
  const [site, setSite] = useState(fallbackSite)
  const [destinations, setDestinations] = useState<Destination[]>(fallbackDestinations)
  const [experiences, setExperiences] = useState<Experience[]>(AUTHENTIC_INDIAN_EXPERIENCES)
  const [journal, setJournal] = useState<JournalPost[]>([])

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const [{ data: s }, { data: d }, { data: e }, { data: j }] = await Promise.all([
        supabase.from('site_settings').select('value').eq('key', 'site').maybeSingle(),
        supabase.from('destinations').select('*').eq('is_published', true).order('sort_order'),
        supabase.from('experiences').select('*').eq('is_published', true).order('sort_order'),
        supabase.from('journal_posts').select('*').eq('is_published', true).order('sort_order'),
      ])
      if (s?.value) setSite({ ...fallbackSite, ...s.value })
      if (d?.length) setDestinations(d)
      if (e?.length) {
        setExperiences(
          e.map((item, idx) => ({
            ...item,
            image_url:
              AUTHENTIC_INDIAN_EXPERIENCES[idx]?.image_url ||
              item.image_url ||
              '/experiences/rajputana-palaces.jpg',
          }))
        )
      }
      if (j?.length) setJournal(j)
    }
    void load()
  }, [])

  return (
    <>
      {/* 1. Curated Experiences Section — Warm Sandstone / Ivory Editorial Contrast */}
      <section id="experiences" className="relative w-full bg-[#F6F3EC] text-[#141310] py-28 border-y border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Balanced 2-Column Editorial Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-stone-300/70">
            <div className="max-w-2xl">
              <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#9A7B3E] font-medium block mb-3">
                The Sarrin Philosophy
              </span>
              <h2 className="font-serif font-light text-4xl sm:text-5xl lg:text-6xl text-[#141310] leading-tight tracking-tight">
                Travel with profound authenticity.
              </h2>
            </div>
            <p className="max-w-md text-sm sm:text-base leading-relaxed text-stone-600 font-light">
              Every encounter is privately negotiated and personally accompanied by master historians,
              wildlife naturalists, or senior concierge liaisons.
            </p>
          </div>

          {/* 3 Editorial Experience Cards */}
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {experiences.map((item, idx) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-sm border border-stone-300/80 bg-[#EFECE4] transition-all duration-500 ease-out hover:border-[#9A7B3E]/60 hover:shadow-xl hover:shadow-stone-400/20 flex flex-col"
              >
                <div className="overflow-hidden aspect-[4/3] w-full relative bg-stone-200">
                  <img
                    src={item.image_url || AUTHENTIC_INDIAN_EXPERIENCES[idx]?.image_url || '/experiences/rajputana-palaces.jpg'}
                    alt={item.title}
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget
                      const fallback = AUTHENTIC_INDIAN_EXPERIENCES[idx]?.image_url || '/experiences/rajputana-palaces.jpg'
                      if (target.src !== fallback) {
                        target.src = fallback
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <span className="absolute top-3.5 left-3.5 rounded-sm border border-white/20 bg-[#141310]/80 px-2.5 py-1 text-[10px] font-sans uppercase tracking-wider text-[#C5A059] backdrop-blur-md">
                    {item.category}
                  </span>
                </div>
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-sans font-medium uppercase tracking-[0.16em] text-[#9A7B3E] block mb-2">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-2xl text-[#141310] font-light leading-snug group-hover:text-[#9A7B3E] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-stone-600 font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Journal & Editorial Section */}
      <JournalSection initialPosts={journal} />

      {/* 3. The Sarrin Atelier About Section */}
      <AboutSection />
    </>
  )
}
