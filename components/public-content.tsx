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
    image_url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800',
    is_published: true,
    sort_order: 1,
  },
  {
    id: 'exp-2',
    category: 'Waterway Sanctuaries',
    title: 'Exclusive Kettuvallam Houseboat Buyouts',
    description: 'Silent drifting through Alleppey’s emerald palm waterways with a dedicated private coastal chef and certified Ayurvedic therapist.',
    image_url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800',
    is_published: true,
    sort_order: 2,
  },
  {
    id: 'exp-3',
    category: 'Apex Wilderness',
    title: 'Naturalist-Led Royal Bengal Tiger Safaris',
    description: 'Exclusive 4x4 open-top gypsy corridors across Ranthambore and Bandhavgarh with senior trackers and luxury forest pavilions.',
    image_url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=800',
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
      if (e?.length) setExperiences(e)
      if (j?.length) setJournal(j)
    }
    void load()
  }, [])

  return (
    <>
      {/* 1. Curated Experiences Section */}
      <section id="experiences" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
            The Sarrin Philosophy
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-5xl text-foreground">
            Travel with profound authenticity.
          </h2>
          <p className="mt-4 leading-relaxed text-foreground/80 font-light">
            Every encounter is privately negotiated and personally accompanied by master historians,
            wildlife naturalists, or senior concierge liaisons.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {experiences.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-500 ease-out hover:border-primary/50 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-black/60 flex flex-col"
            >
              <div className="overflow-hidden aspect-[4/3] w-full relative">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-primary backdrop-blur-md">
                  {item.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-foreground/75 font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 2. Journal & Editorial Section */}
      <JournalSection initialPosts={journal} />

      {/* 3. The Sarrin Atelier About Section */}
      <AboutSection />
    </>
  )
}
