'use client'

import React, { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  ArrowUpRight,
  Compass,
  MapPin,
  LayoutGrid,
  Clock,
  Navigation,
  Calendar,
} from 'lucide-react'
import type { JournalPost } from '@/lib/cms'
import type { MappedArticle } from '@/components/journal-map'

// Dynamically import Leaflet map with ssr: false to prevent window is not defined
const JournalMap = dynamic(() => import('@/components/journal-map'), {
  ssr: false,
  loading: () => (
    <div className="relative flex h-[560px] md:h-[620px] w-full items-center justify-center rounded-sm border border-white/10 bg-[#0C0B09] backdrop-blur-md">
      <div className="flex flex-col items-center gap-3">
        <div className="size-10 animate-spin rounded-full border-2 border-[#C5A059] border-t-transparent" />
        <p className="text-xs font-sans uppercase tracking-[0.25em] text-[#C5A059]">
          Initializing Cartographic Discovery...
        </p>
      </div>
    </div>
  ),
})

// 7 Iconic Pan-India Regional Dispatches with Coordinates, Seasons & Inclusions
const DEFAULT_MAPPED_ARTICLES: MappedArticle[] = [
  {
    id: 'rajasthan-heritage-palaces',
    title: 'Echoes of the Thar: Opulent Fortresses & Living Palaces of Rajasthan',
    slug: 'rajasthan-heritage-palaces',
    excerpt: 'From private candlelit dinners on Lake Pichola to sunset safaris across golden dunes, immerse in regal Rajputana splendour.',
    category: 'Royal Heritage',
    region: 'Rajasthan',
    locationName: 'Udaipur, Jaipur & Jodhpur',
    lat: 26.9124,
    lng: 75.7873,
    readTime: '6 min read',
    bestSeason: 'October – March',
    idealDuration: '8 – 10 Days',
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=1200',
    relatedPackageSlug: 'royal-rajasthan-tour',
    highlights: [
      'Presidential suites at Taj Lake Palace & Rambagh Palace',
      'Private rampart dining accompanied by royal historian',
      'Twin-engine helicopter charters between fortress citadels',
    ],
  },
  {
    id: 'kerala-slow-solitude',
    title: 'The Art of Slow Living: Kerala’s Emerald Backwaters & Secret Lagoons',
    slug: 'kerala-slow-solitude',
    excerpt: 'Drift silently along palm-canopied waterways aboard a bespoke Kettuvallam with master Ayurvedic healers and coastal dining.',
    category: 'Backwaters & Coast',
    region: 'Kerala',
    locationName: 'Alleppey, Munnar & Kumarakom',
    lat: 9.4981,
    lng: 76.3388,
    readTime: '5 min read',
    bestSeason: 'September – April',
    idealDuration: '5 – 8 Days',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200',
    relatedPackageSlug: 'kerala-gods-own-country-8d',
    highlights: [
      'Exclusive climate-controlled Kettuvallam with personal chef',
      'Daily 90-minute Ayurvedic physician-led rejuvenation',
      'Misty Munnar high-altitude tea plantation estate cottages',
    ],
  },
  {
    id: 'kashmir-ladakh-valleys',
    title: 'Sanctuary Above the Clouds: Alpine Corridors of Kashmir & High Ladakh',
    slug: 'kashmir-paradise-valleys-7d',
    excerpt: 'Private cedarwood houseboats on Dal Lake, VIP gondola passes to Gulmarg snow peaks, and ancient cliffside monasteries in Leh.',
    category: 'Alpine Corridors',
    region: 'Ladakh & Kashmir',
    locationName: 'Leh, Nubra & Gulmarg',
    lat: 34.1526,
    lng: 77.5771,
    readTime: '7 min read',
    bestSeason: 'May – Oct (Summer) / Dec – Feb (Snow)',
    idealDuration: '7 – 10 Days',
    imageUrl: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=1200',
    relatedPackageSlug: 'kashmir-paradise-valleys-7d',
    highlights: [
      'VIP Gondola Passes to Gulmarg Apharwat Ridge',
      'Handcrafted Cedar Houseboat with Dal Lake Shikara',
      'Private astronomer stargazing over Pangong Tso',
    ],
  },
  {
    id: 'varanasi-sacred-lights',
    title: 'Sacred Rites of Kashi: Twilight Aarti & Heritage Palaces of the Ganges',
    slug: 'experience-varanasi-dev-deepawali-3d',
    excerpt: 'Witness timeless riverfront rituals from private double-decker bajra boats, with exclusive temple corridor darshans and dawn Subah-e-Banaras.',
    category: 'Spiritual & Sacred',
    region: 'Varanasi & Awadh',
    locationName: 'Varanasi & Sarnath',
    lat: 25.3176,
    lng: 82.9739,
    readTime: '5 min read',
    bestSeason: 'October – March',
    idealDuration: '3 – 5 Days',
    imageUrl: 'https://images.unsplash.com/photo-1687753578819-08e5a39d715a?auto=format&fit=crop&q=80&w=1200',
    relatedPackageSlug: 'experience-varanasi-dev-deepawali-3d',
    highlights: [
      'Private chartered Sunset Bajra for Dashashwamedh Maha Aarti',
      'Kashi Vishwanath Corridor VIP protocol liaison',
      'Riverfront suite at BrijRama Palace with dawn flute recitals',
    ],
  },
  {
    id: 'central-india-tigers',
    title: 'The Tiger’s Realm: Master-Tracked Expeditions in Central India',
    slug: 'wild-untamed-tiger-safari',
    excerpt: 'Venture into premier tiger sanctuaries with master naturalists, staying at ultra-exclusive tented pavilions and torchlit forest machans.',
    category: 'Apex Wildlife',
    region: 'Central India',
    locationName: 'Ranthambore & Bandhavgarh',
    lat: 23.7042,
    lng: 80.9992,
    readTime: '6 min read',
    bestSeason: 'November – May',
    idealDuration: '6 – 9 Days',
    imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=1200',
    relatedPackageSlug: 'wild-untamed-tiger-safari',
    highlights: [
      'Aman-i-Khas & Taj Safari luxury forest pavilions',
      'Custom 4x4 Gypsies with dedicated master forest trackers',
      'Private torchlit bush dinners under pristine forest stars',
    ],
  },
  {
    id: 'goa-konkan-coast',
    title: 'Balmy Solitude: Indo-Portuguese Estates & Private Coastal Charters',
    slug: 'blissful-goa-beach-getaway-4d',
    excerpt: 'Explore tranquil southern shores, chartered sunset sails along the Mandovi river, and secluded heritage estate villas nestled in coconut groves.',
    category: 'Coastal Atelier',
    region: 'Goa & Konkan',
    locationName: 'South Goa & Old Goa',
    lat: 15.2993,
    lng: 74.1240,
    readTime: '4 min read',
    bestSeason: 'October – April',
    idealDuration: '4 – 6 Days',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1200',
    relatedPackageSlug: 'blissful-goa-beach-getaway-4d',
    highlights: [
      'Private luxury catamaran and yacht charter at sunset',
      '17th-century Indo-Portuguese heritage manor stay',
      'Curated Malabar Coast dining & private beach access',
    ],
  },
  {
    id: 'northeast-cloud-forests',
    title: 'The Abode of Clouds: Living Root Bridges & Kaziranga Rhino Reserves',
    slug: 'himalayan-wellness-escapade',
    excerpt: 'Descend into misty Khasi valleys to walk ancient bio-engineered root bridges and embark on private elephant-grass safaris in Assam.',
    category: 'Living Heritage & Nature',
    region: 'Northeast & Meghalaya',
    locationName: 'Shillong & Kaziranga',
    lat: 25.5788,
    lng: 91.8933,
    readTime: '8 min read',
    bestSeason: 'October – April',
    idealDuration: '7 – 10 Days',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200',
    relatedPackageSlug: 'wild-untamed-tiger-safari',
    highlights: [
      'Private guided trek to UNESCO living root bridges of Nongriat',
      'Private river & jeep safaris in Kaziranga National Park',
      'Heritage British tea estate bungalow stays in Assam',
    ],
  },
]

const REGION_TABS = [
  { id: 'all', label: 'All India (7 Regions)' },
  { id: 'rajasthan', label: 'Rajasthan' },
  { id: 'kerala', label: 'Kerala' },
  { id: 'ladakh', label: 'Ladakh & Kashmir' },
  { id: 'varanasi', label: 'Varanasi & Awadh' },
  { id: 'central', label: 'Central India' },
  { id: 'goa', label: 'Goa & Konkan' },
  { id: 'northeast', label: 'Northeast & Meghalaya' },
]

interface JournalSectionProps {
  initialPosts?: JournalPost[]
}

export function JournalSection({ initialPosts = [] }: JournalSectionProps) {
  const [viewMode, setViewMode] = useState<'map' | 'grid'>('map')
  const [activeRegion, setActiveRegion] = useState<string>('all')

  const mappedArticles = useMemo<MappedArticle[]>(() => {
    return DEFAULT_MAPPED_ARTICLES
  }, [])

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
    const regLower = activeRegion.toLowerCase()
    return mappedArticles.filter((a) => a.region.toLowerCase().includes(regLower))
  }, [mappedArticles, activeRegion])

  // Handle region filter tab click
  const handleRegionSelect = (regionKey: string) => {
    setActiveRegion(regionKey)
    if (regionKey !== 'all') {
      const regLower = regionKey.toLowerCase()
      const matched = mappedArticles.find((a) =>
        a.region.toLowerCase().includes(regLower)
      )
      if (matched) {
        setSelectedArticleId(matched.id)
      }
    }
  }

  return (
    <section id="journal" className="relative border-y border-white/10 bg-[#0C0B09] py-16 md:py-24 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -top-40 right-10 size-[500px] rounded-full bg-[#C5A059]/5 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-10 size-[500px] rounded-full bg-[#C5A059]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-sans font-medium">
                From The Journal
              </span>
            </div>
            <h2 className="mt-3 font-serif font-light text-4xl text-[#F4F2EC] sm:text-5xl tracking-tight">
              Field notes for curious travellers.
            </h2>
            <p className="mt-3 max-w-2xl text-base text-[#B8B4AA] leading-relaxed font-light">
              Explore dispatches across royal desert heartlands, emerald backwater lagoons, high-altitude alpine passes, and sacred riverfront ghats. Visually navigate articles by region across the Indian subcontinent.
            </p>
          </div>

          {/* Toggle Button Switcher: Grid vs Map */}
          <div className="flex items-center gap-1 rounded-sm border border-white/15 bg-[#141310] p-1.5 backdrop-blur-xl shadow-xl self-start md:self-auto">
            <button
              id="btn-interactive-map"
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                viewMode === 'map'
                  ? 'bg-[#C5A059] text-[#0C0B09] shadow-md shadow-[#C5A059]/20'
                  : 'text-[#B8B4AA] hover:text-[#F4F2EC] hover:bg-white/5'
              }`}
            >
              <Compass className="size-4" />
              <span>Interactive Map</span>
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C5A059] opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-[#C5A059]"></span>
              </span>
            </button>

            <button
              id="btn-story-grid"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-[#C5A059] text-[#0C0B09] shadow-md shadow-[#C5A059]/20'
                  : 'text-[#B8B4AA] hover:text-[#F4F2EC] hover:bg-white/5'
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
            {/* Regional Filter Bar (8 Tabs: All India + 7 Iconic Regions) */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-[#B8B4AA]/70 mr-1 flex items-center gap-1 font-sans">
                  <MapPin className="size-3.5 text-[#C5A059]" /> Region:
                </span>
                {REGION_TABS.map((tab) => {
                  const isActive = activeRegion.toLowerCase() === tab.id.toLowerCase()
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleRegionSelect(tab.id)}
                      className={`rounded-sm px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${
                        isActive
                          ? 'border border-[#C5A059] bg-[#C5A059]/15 text-[#C5A059] shadow-sm'
                          : 'border border-white/10 bg-[#141310] text-[#B8B4AA] hover:border-[#C5A059]/40 hover:text-[#F4F2EC]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  )
                })}
              </div>

              <div className="text-xs text-[#B8B4AA]/60 hidden lg:block font-sans">
                <span>Click pins on the map to inspect story field notes</span>
              </div>
            </div>

            {/* Map & Active Spotlight Grid */}
            <div className="grid gap-6 lg:grid-cols-12">
              {/* Interactive Leaflet Map Container */}
              <div className="relative h-[540px] md:h-[620px] w-full lg:col-span-7 xl:col-span-8 rounded-sm border border-white/15 shadow-2xl overflow-hidden">
                <JournalMap
                  articles={filteredMappedArticles}
                  selectedArticleId={selectedArticleId}
                  onSelectArticle={(id) => setSelectedArticleId(id)}
                  activeRegion={activeRegion}
                />
              </div>

              {/* Active Article Spotlight Glass Card */}
              <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
                <div className="relative flex flex-col h-full rounded-sm border border-white/10 bg-[#141310] backdrop-blur-2xl p-6 md:p-8 shadow-2xl justify-between overflow-hidden group transition-all duration-500 ease-out hover:border-[#C5A059]/40">
                  {/* Subtle top gold glow line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-75" />

                  {/* Crossfade Transition Container */}
                  <div key={activeArticle.id} className="animate-in fade-in duration-300 flex flex-col h-full justify-between">
                    <div>
                      {/* Top Image Preview with Badges */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-white/10 shadow-lg bg-[#0C0B09]">
                        <img
                          src={activeArticle.imageUrl}
                          alt={activeArticle.title}
                          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                          <span className="rounded-sm bg-[#0C0B09]/90 border border-[#C5A059]/40 backdrop-blur-md px-3 py-1 text-[11px] font-sans font-medium uppercase tracking-wider text-[#C5A059] shadow-md">
                            {activeArticle.region}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                          <span className="flex items-center gap-1 font-medium drop-shadow-md">
                            <MapPin className="size-3.5 text-[#C5A059]" /> {activeArticle.locationName}
                          </span>
                          <span className="flex items-center gap-1 font-sans text-[11px] text-white/80">
                            <Clock className="size-3 text-[#C5A059]" /> {activeArticle.readTime}
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div className="mt-5">
                        <span className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#C5A059]">
                          Featured Field Dispatch
                        </span>
                        <h3 className="mt-2 font-serif text-2xl text-[#F4F2EC] font-light leading-snug group-hover:text-[#C5A059] transition-colors">
                          {activeArticle.title}
                        </h3>
                        <p className="mt-2.5 text-xs text-[#B8B4AA] leading-relaxed font-light">
                          {activeArticle.excerpt}
                        </p>
                      </div>

                      {/* Sleek Metadata Row: BEST SEASON & IDEAL DURATION */}
                      <div className="mt-4 grid grid-cols-2 gap-3 border-y border-white/10 py-3 text-xs font-sans">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-medium flex items-center gap-1">
                            <Calendar className="size-3 text-[#C5A059]" /> Best Season
                          </span>
                          <span className="mt-1 text-[#F4F2EC] font-light">
                            {activeArticle.bestSeason || 'October – March'}
                          </span>
                        </div>
                        <div className="flex flex-col border-l border-white/10 pl-3">
                          <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-medium flex items-center gap-1">
                            <Clock className="size-3 text-[#C5A059]" /> Ideal Duration
                          </span>
                          <span className="mt-1 text-[#F4F2EC] font-light">
                            {activeArticle.idealDuration || '7 – 9 Days'}
                          </span>
                        </div>
                      </div>

                      {/* Curated Inclusions list */}
                      {activeArticle.highlights && activeArticle.highlights.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <span className="text-[10px] uppercase tracking-wider text-[#B8B4AA]/70 block font-sans">
                            Curated Inclusions
                          </span>
                          <div className="space-y-1.5">
                            {activeArticle.highlights.map((h, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-[#B8B4AA]">
                                <span className="size-1.5 rounded-full bg-[#C5A059] mt-1 shrink-0" />
                                <span className="font-light line-clamp-1">{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-2">
                      <Link
                        href={`/blog/${activeArticle.slug}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0C0B09] transition-colors shadow-sm"
                      >
                        <span>Read Story</span>
                        <ArrowUpRight className="size-4" />
                      </Link>

                      {activeArticle.relatedPackageSlug && (
                        <a
                          href="#destinations"
                          className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-[#F4F2EC] transition-colors"
                        >
                          <Compass className="size-4 text-[#C5A059]" />
                          <span>View Journey</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Regional Cards Bar (Pan-India 7 Regions) */}
            <div className="mt-8 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
              {mappedArticles.map((article) => {
                const isSelected = article.id === selectedArticleId
                return (
                  <button
                    key={article.id}
                    onClick={() => {
                      setSelectedArticleId(article.id)
                      setActiveRegion(article.region)
                    }}
                    className={`flex flex-col p-3 rounded-sm border text-left transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'border-[#C5A059] bg-[#C5A059]/15 shadow-md shadow-black/40 scale-[1.02]'
                        : 'border-white/10 bg-[#141310] hover:border-[#C5A059]/40 hover:bg-[#181714]'
                    }`}
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden rounded-sm bg-[#0C0B09] mb-2.5">
                      <img
                        src={article.imageUrl}
                        alt={article.region}
                        className="size-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-[#C5A059] truncate block">
                      {article.region}
                    </span>
                    <h4 className="mt-0.5 text-xs font-serif font-normal text-[#F4F2EC] truncate">
                      {article.locationName}
                    </h4>
                    <span className="mt-1.5 flex items-center gap-1 text-[10px] text-[#B8B4AA]/70 font-sans">
                      <Navigation className="size-2.5 text-[#C5A059]" /> Inspect Pin
                    </span>
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
              {mappedArticles.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col overflow-hidden rounded-sm border border-white/10 bg-[#141310] shadow-xl transition-all duration-300 hover:border-[#C5A059]/50 hover:shadow-2xl"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0C0B09]">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 rounded-sm border border-white/20 bg-[#0C0B09]/85 px-2.5 py-0.5 text-[10px] font-sans font-medium uppercase tracking-wider text-[#C5A059]">
                      {post.region}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A059]">
                      {post.category}
                    </span>
                    <h3 className="mt-2 font-serif text-xl font-light text-[#F4F2EC] leading-snug group-hover:text-[#C5A059] transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#B8B4AA] font-light line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2 border-y border-white/10 py-2.5 text-[11px] font-sans text-[#B8B4AA]">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#C5A059] block">Season</span>
                        <span className="text-[#F4F2EC]">{post.bestSeason}</span>
                      </div>
                      <div className="border-l border-white/10 pl-2">
                        <span className="text-[9px] uppercase tracking-wider text-[#C5A059] block">Duration</span>
                        <span className="text-[#F4F2EC]">{post.idealDuration}</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/10">
                      <span className="text-xs text-[#B8B4AA] font-light">{post.readTime}</span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-sans font-medium text-[#C5A059] hover:text-[#D4B475]"
                      >
                        <span>Read Story</span>
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
