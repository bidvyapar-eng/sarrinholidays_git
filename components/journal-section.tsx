'use client'

import React, { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  MapPin,
  LayoutGrid,
  Sparkles,
  CheckCircle2,
  Clock,
  Navigation,
} from 'lucide-react'
import type { JournalPost } from '@/lib/cms'
import type { MappedArticle } from '@/components/journal-map'

// Dynamically import Leaflet map with ssr: false to prevent window is not defined
const JournalMap = dynamic(() => import('@/components/journal-map'), {
  ssr: false,
  loading: () => (
    <div className="relative flex h-[560px] md:h-[620px] w-full items-center justify-center rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="flex flex-col items-center gap-3">
        <div className="size-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary">
          Initializing Cartographic Discovery...
        </p>
      </div>
    </div>
  ),
})

// Curated regional metadata for Indian luxury travel articles
const REGIONAL_METADATA: Record<
  string,
  {
    region: 'Rajasthan' | 'Kerala' | 'Himalayas'
    locationName: string
    lat: number
    lng: number
    readTime: string
    relatedPackageSlug: string
    highlights: string[]
  }
> = {
  'rajasthan-heritage-palaces': {
    region: 'Rajasthan',
    locationName: 'Jaipur & Udaipur, Rajasthan',
    lat: 26.9124,
    lng: 75.7873,
    readTime: '6 min read',
    relatedPackageSlug: 'royal-rajasthan-tour',
    highlights: ['Stay at Taj Lake Palace', 'Lake Pichola Night Charters', 'Thar Desert Stargazing'],
  },
  'kerala-slow-solitude': {
    region: 'Kerala',
    locationName: 'Alleppey & Kumarakom, Kerala',
    lat: 9.4981,
    lng: 76.3388,
    readTime: '5 min read',
    relatedPackageSlug: 'kerala-houseboat-retreat',
    highlights: ['Bespoke Teak Kettuvallam', 'Master Vaidya Ayurvedic Healing', 'Vembanad Secret Lagoons'],
  },
  'himalayan-wellness-sanctuary': {
    region: 'Himalayas',
    locationName: 'Rishikesh & Garhwal Foothills, Himalayas',
    lat: 30.0869,
    lng: 78.2676,
    readTime: '7 min read',
    relatedPackageSlug: 'himalayan-wellness-escapade',
    highlights: ['Sacred Ganges Riverfront Aarti', 'Tibetan Singing Bowl Therapy', 'Palace Hydrotherapy Spas'],
  },
}

// Fallback mapped articles if database is still synchronizing
const DEFAULT_MAPPED_ARTICLES: MappedArticle[] = [
  {
    id: 'rajasthan-heritage-palaces',
    title: 'Echoes of the Thar: Opulent Fortresses & Heritage Palaces of Rajasthan',
    slug: 'rajasthan-heritage-palaces',
    excerpt:
      'From private candlelit dinners on Lake Pichola to sunset safaris across golden dunes, immerse in regal Rajputana splendour.',
    category: 'Rajasthan',
    region: 'Rajasthan',
    locationName: 'Jaipur & Udaipur, Rajasthan',
    lat: 26.9124,
    lng: 75.7873,
    readTime: '6 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200',
    relatedPackageSlug: 'royal-rajasthan-tour',
    highlights: ['Stay at Taj Lake Palace', 'Amber Fort Private Ateliers', 'Thar Desert Stargazing Camp'],
  },
  {
    id: 'kerala-slow-solitude',
    title: 'The Art of Slow Living: Kerala’s Emerald Backwaters & Secret Lagoons',
    slug: 'kerala-slow-solitude',
    excerpt:
      'Drift silently along palm-canopied waterways aboard a bespoke kettuvallam with master Ayurvedic healers and coastal dining.',
    category: 'Kerala',
    region: 'Kerala',
    locationName: 'Alleppey & Kumarakom, Kerala',
    lat: 9.4981,
    lng: 76.3388,
    readTime: '5 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200',
    relatedPackageSlug: 'kerala-houseboat-retreat',
    highlights: ['Exclusive Private Kettuvallam', 'Authentic Panchakarma Treatments', 'Vembanad Sunset Cruise'],
  },
  {
    id: 'himalayan-wellness-sanctuary',
    title: 'Sanctuary Above the Clouds: High-Altitude Himalayan Wellness in Rishikesh',
    slug: 'himalayan-wellness-sanctuary',
    excerpt:
      'Perched amidst whispering sal forests and sacred mountain waters, discover transformative yoga retreats and sunset aartis.',
    category: 'Himalayas',
    region: 'Himalayas',
    locationName: 'Rishikesh & Garhwal Foothills, Himalayas',
    lat: 30.0869,
    lng: 78.2676,
    readTime: '7 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200',
    relatedPackageSlug: 'himalayan-wellness-escapade',
    highlights: ['Private Ganges Aarti Ceremony', 'Guided Foothill Mindfulness Treks', 'Palace Spa & Hydrotherapy'],
  },
]

interface JournalSectionProps {
  initialPosts?: JournalPost[]
}

export function JournalSection({ initialPosts = [] }: JournalSectionProps) {
  const [viewMode, setViewMode] = useState<'map' | 'grid'>('map')
  const [activeRegion, setActiveRegion] = useState<string>('all')

  // Transform posts into mapped articles with Indian coordinates
  const mappedArticles = useMemo<MappedArticle[]>(() => {
    if (!initialPosts || initialPosts.length === 0) {
      return DEFAULT_MAPPED_ARTICLES
    }

    const enriched: MappedArticle[] = []

    initialPosts.forEach((post) => {
      const slug = post.slug || ''
      const meta = REGIONAL_METADATA[slug]

      if (meta) {
        enriched.push({
          id: post.id || slug,
          title: post.title,
          slug,
          excerpt: post.excerpt,
          category: post.category,
          region: meta.region,
          locationName: meta.locationName,
          lat: meta.lat,
          lng: meta.lng,
          readTime: meta.readTime,
          imageUrl: post.image_url,
          relatedPackageSlug: meta.relatedPackageSlug,
          highlights: meta.highlights,
        })
      }
    })

    // If none matched from DB, supply the default curated ones
    return enriched.length > 0 ? enriched : DEFAULT_MAPPED_ARTICLES
  }, [initialPosts])

  // Selected article on map (defaults to the first mapped article)
  const [selectedArticleId, setSelectedArticleId] = useState<string>(
    mappedArticles[0]?.id || 'rajasthan-heritage-palaces'
  )

  const activeArticle = useMemo(() => {
    return (
      mappedArticles.find((a) => a.id === selectedArticleId) ||
      mappedArticles[0] ||
      DEFAULT_MAPPED_ARTICLES[0]
    )
  }, [mappedArticles, selectedArticleId])

  // Filtered mapped articles according to activeRegion
  const filteredMappedArticles = useMemo(() => {
    if (activeRegion === 'all') return mappedArticles
    return mappedArticles.filter((a) => a.region.toLowerCase() === activeRegion.toLowerCase())
  }, [mappedArticles, activeRegion])

  // Handle region filter tab click
  const handleRegionSelect = (regionKey: string) => {
    setActiveRegion(regionKey)
    if (regionKey !== 'all') {
      const matched = mappedArticles.find(
        (a) => a.region.toLowerCase() === regionKey.toLowerCase()
      )
      if (matched) {
        setSelectedArticleId(matched.id)
      }
    }
  }

  return (
    <section id="journal" className="relative border-y border-white/10 bg-black/30 py-24 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -top-40 right-10 size-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-10 size-[500px] rounded-full bg-amber-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-primary font-medium">
                From The Journal
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider">
                <Sparkles className="size-3" /> Visual Discovery
              </span>
            </div>
            <h2 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">
              Field notes for curious travellers.
            </h2>
            <p className="mt-3 max-w-2xl text-base text-foreground/70 leading-relaxed">
              Explore dispatches across royal desert heartlands, tranquil coastal lagoons, and high Himalayan
              sanctuaries. Visually navigate articles by region or browse the curated archive.
            </p>
          </div>

          {/* Toggle Button Switcher: Grid vs Map */}
          <div className="flex items-center gap-1 rounded-2xl border border-white/15 bg-white/5 p-1.5 backdrop-blur-xl shadow-xl self-start md:self-auto">
            <button
              id="btn-interactive-map"
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                viewMode === 'map'
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]'
                  : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
              }`}
            >
              <Compass className="size-4" />
              <span>Interactive Map</span>
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-amber-400"></span>
              </span>
            </button>

            <button
              id="btn-story-grid"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]'
                  : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
              }`}
            >
              <LayoutGrid className="size-4" />
              <span>Story Grid</span>
            </button>
          </div>
        </div>

        {/* MAP VIEW */}
        {viewMode === 'map' && (
          <div className="mt-10 space-y-6 animate-in fade-in duration-500">
            {/* Regional Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-foreground/50 mr-2 flex items-center gap-1">
                  <MapPin className="size-3.5 text-primary" /> Region:
                </span>
                {[
                  { id: 'all', label: 'All India (3 Regions)' },
                  { id: 'rajasthan', label: 'Rajasthan (Forts & Dunes)' },
                  { id: 'kerala', label: 'Kerala (Emerald Backwaters)' },
                  { id: 'himalayas', label: 'Himalayas (Mountain Wellness)' },
                ].map((tab) => {
                  const isActive = activeRegion.toLowerCase() === tab.id.toLowerCase()
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleRegionSelect(tab.id)}
                      className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all ${
                        isActive
                          ? 'border border-primary bg-primary/20 text-primary shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                          : 'border border-white/10 bg-white/5 text-foreground/70 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  )
                })}
              </div>

              <div className="text-xs text-foreground/60 hidden lg:block">
                <span>Click pins on the map to inspect story field notes</span>
              </div>
            </div>

            {/* Map & Active Spotlight Grid */}
            <div className="grid gap-6 lg:grid-cols-12">
              {/* Interactive Leaflet Map Container */}
              <div className="relative h-[540px] md:h-[600px] w-full lg:col-span-7 xl:col-span-8 rounded-3xl border border-white/15 shadow-2xl overflow-hidden">
                <JournalMap
                  articles={filteredMappedArticles}
                  selectedArticleId={selectedArticleId}
                  onSelectArticle={(id) => setSelectedArticleId(id)}
                  activeRegion={activeRegion}
                />
              </div>

              {/* Active Article Spotlight Glass Card */}
              <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
                <div className="relative flex flex-col h-full rounded-3xl border border-white/15 bg-slate-900/60 backdrop-blur-2xl p-6 md:p-8 shadow-2xl justify-between overflow-hidden group">
                  {/* Subtle top amber glow line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-75" />

                  {/* Top Image Preview with Badges */}
                  <div>
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg">
                      <img
                        src={activeArticle.imageUrl}
                        alt={activeArticle.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-primary/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-950 shadow-md">
                          {activeArticle.region}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                        <span className="flex items-center gap-1 font-medium drop-shadow-md">
                          <MapPin className="size-3.5 text-primary" /> {activeArticle.locationName}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[11px] text-white/80">
                          <Clock className="size-3 text-primary" /> {activeArticle.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="mt-6">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                        Featured Field Dispatch
                      </span>
                      <h3 className="mt-2 font-serif text-2xl text-foreground leading-snug group-hover:text-primary transition-colors">
                        {activeArticle.title}
                      </h3>
                      <p className="mt-3 text-sm text-foreground/75 leading-relaxed">
                        {activeArticle.excerpt}
                      </p>
                    </div>

                    {/* Curated Highlights list */}
                    {activeArticle.highlights && activeArticle.highlights.length > 0 && (
                      <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
                        <span className="text-[11px] uppercase tracking-wider text-foreground/60">
                          Curated Inclusions
                        </span>
                        <div className="space-y-1.5">
                          {activeArticle.highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-foreground/80">
                              <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/blog/${activeArticle.slug}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02]"
                    >
                      <span>Read Story</span>
                      <ArrowUpRight className="size-4" />
                    </Link>

                    {activeArticle.relatedPackageSlug && (
                      <a
                        href="#destinations"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-foreground hover:bg-white/10 transition-colors"
                      >
                        <Compass className="size-4 text-primary" />
                        <span>View Journey</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Regional Cards Bar */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {mappedArticles.map((article) => {
                const isSelected = article.id === selectedArticleId
                return (
                  <button
                    key={article.id}
                    onClick={() => {
                      setSelectedArticleId(article.id)
                      setActiveRegion(article.region)
                    }}
                    className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                      isSelected
                        ? 'border-primary/80 bg-primary/10 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="size-16 rounded-xl object-cover shrink-0 border border-white/10"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                          {article.region}
                        </span>
                        <span className="text-[10px] text-foreground/50">{article.readTime}</span>
                      </div>
                      <h4 className="mt-1 truncate text-sm font-medium text-foreground">
                        {article.title}
                      </h4>
                      <p className="mt-1 flex items-center gap-1 text-xs text-foreground/60">
                        <Navigation className="size-3 text-primary" /> Fly to coordinates
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="mt-12 space-y-10 animate-in fade-in duration-500">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(initialPosts.length > 0 ? initialPosts : DEFAULT_MAPPED_ARTICLES).map((post) => {
                const slug = post.slug || (post as any).id || ''
                const meta = REGIONAL_METADATA[slug]

                return (
                  <article
                    key={post.id}
                    className="group flex flex-col rounded-3xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300 hover:border-primary/40 hover:bg-white/10 hover:-translate-y-1 shadow-xl"
                  >
                    <div className="relative aspect-video w-full overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      {meta && (
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-white border border-white/10">
                          <MapPin className="size-3 text-primary" />
                          <span>{meta.locationName}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col flex-1 p-6">
                      <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
                        {post.category}
                      </span>
                      <h3 className="mt-2 font-serif text-2xl text-foreground leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/65 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                        <Link
                          href={`/blog/${slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:underline"
                        >
                          Read story <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>

                        {meta && (
                          <button
                            onClick={() => {
                              setSelectedArticleId(post.id)
                              setActiveRegion(meta.region)
                              setViewMode('map')
                            }}
                            className="inline-flex items-center gap-1 text-xs text-foreground/50 hover:text-primary transition-colors"
                          >
                            <Compass className="size-3 text-primary" /> View on Map
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Bottom Archive Link */}
            <div className="flex justify-center pt-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <span>Browse All Articles in Editorial Journal</span>
                <BookOpen className="size-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
