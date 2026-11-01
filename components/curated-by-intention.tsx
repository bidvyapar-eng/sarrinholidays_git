'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Compass,
  Crown,
  Waves,
  HeartHandshake,
  Trees,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { fallbackPackages, type PackageItem } from '@/lib/cms'
import { PackageCard } from '@/components/package-card'

interface IntentionTab {
  id: string
  label: string
  destinations: string
  icon: React.ComponentType<{ className?: string }>
  headline: string
  description: string
  accentColor: string
}

const INTENTION_TABS: IntentionTab[] = [
  {
    id: 'all',
    label: 'All Domestic Circuits',
    destinations: 'Pan-India Grand Expeditions',
    icon: Compass,
    headline: 'Handcrafted For Sovereign Indian Royalty',
    description: 'Every curated domestic circuit across royal Rajasthan fortresses, backwater lagoons, high-altitude Himalayan retreats, and apex tiger reserves.',
    accentColor: 'from-primary via-amber-500 to-primary',
  },
  {
    id: 'heritage',
    label: 'Heritage & Palaces',
    destinations: 'Udaipur • Jaipur • Jodhpur',
    icon: Crown,
    headline: 'Sovereign Palaces & Living Royal Heritage',
    description: 'Private lake palace suites, rampart torchlit banquets, exclusive fort buyouts, and vintage motorcades across Udaipur, Jaipur, and Jodhpur.',
    accentColor: 'from-amber-400 to-yellow-600',
  },
  {
    id: 'backwaters',
    label: 'Backwaters & Coast',
    destinations: 'Alleppey • Bekal • Goa',
    icon: Waves,
    headline: 'Serene Coastal Sanctuaries & Private Yachts',
    description: 'Exclusive air-conditioned Kettuvallam houseboat buyouts in Alleppey, secluded cliffside pool villas in Bekal, and private sunset yachts in Goa.',
    accentColor: 'from-teal-400 to-cyan-600',
  },
  {
    id: 'spiritual',
    label: 'Spiritual & Wellness Retreats',
    destinations: 'Rishikesh • Varanasi • Ananda',
    icon: HeartHandshake,
    headline: 'Transcendent Sacred Rites & Restorative Silence',
    description: 'Private VIP river barges for Ganga Aarti in Varanasi, physician-led Ayurvedic pulse diagnosis, and mountain palace suites at Ananda in the Himalayas.',
    accentColor: 'from-orange-400 to-rose-500',
  },
  {
    id: 'wild',
    label: 'Wild & Untamed',
    destinations: 'Ranthambore • Jim Corbett • Bandhavgarh',
    icon: Trees,
    headline: 'Apex Wilderness & Royal Bengal Tiger Safaris',
    description: 'Exclusive 4x4 open-top gypsy safaris, master naturalists tracking Royal Bengal Tigers, and luxury tented pavilions across Ranthambore, Jim Corbett, and Bandhavgarh.',
    accentColor: 'from-emerald-400 to-green-700',
  },
]

export function CuratedByIntention() {
  const [activeTabId, setActiveTabId] = useState<string>('all')
  const [packages, setPackages] = useState<PackageItem[]>(fallbackPackages)
  const [loading, setLoading] = useState<boolean>(false)
  const [carouselIndex, setCarouselIndex] = useState<number>(0)
  const mobileCarouselRef = useRef<HTMLDivElement>(null)

  // Fetch packages from Supabase with fallback merge to guarantee all 4 domestic circuits
  useEffect(() => {
    let isCancelled = false

    async function fetchPackages() {
      try {
        setLoading(true)
        const supabase = createClient()
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .order('created_at', { ascending: false })

        if (!isCancelled) {
          if (!error && data && data.length > 0) {
            const merged = data.map((item: any) => {
              const fallback = fallbackPackages.find((f) => f.slug === item.slug)
              return {
                ...fallback,
                ...item,
                theme_tags: item.theme_tags && item.theme_tags.length > 0 ? item.theme_tags : fallback?.theme_tags,
                inclusions: item.inclusions && item.inclusions.length > 0 ? item.inclusions : fallback?.inclusions,
                exclusions: item.exclusions && item.exclusions.length > 0 ? item.exclusions : fallback?.exclusions,
                scarcity_status: item.scarcity_status !== undefined ? item.scarcity_status : fallback?.scarcity_status,
              }
            })
            // Ensure all 4 domestic fallback circuits (including wild-untamed) are present even if not in DB yet
            const missingFallbacks = fallbackPackages.filter(
              (f) => !data.some((d: any) => d.slug === f.slug)
            )
            setPackages([...merged, ...missingFallbacks])
          } else {
            setPackages(fallbackPackages)
          }
        }
      } catch (err) {
        console.warn('Using fallback packages for Curated by Intention:', err)
        if (!isCancelled) setPackages(fallbackPackages)
      } finally {
        if (!isCancelled) setLoading(false)
      }
    }

    fetchPackages()

    return () => {
      isCancelled = true
    }
  }, [])

  // Filter packages based on active domestic circuit tab
  const filteredPackages = useMemo(() => {
    if (activeTabId === 'all') return packages

    const target = activeTabId.toLowerCase()
    return packages.filter((pkg) => {
      const themes = (pkg.theme_tags || []).map((t) => t.toLowerCase())
      const tags = (pkg.experience_tags || []).map((t) => t.toLowerCase())
      const destinations = (pkg.destinations || []).map((d) => d.toLowerCase())
      const title = (pkg.title || '').toLowerCase()
      const combined = [...themes, ...tags, ...destinations, title]

      if (target === 'heritage') {
        return combined.some((t) =>
          t.includes('heritage') ||
          t.includes('palace') ||
          t.includes('udaipur') ||
          t.includes('jaipur') ||
          t.includes('jodhpur')
        )
      }
      if (target === 'backwaters') {
        return combined.some((t) =>
          t.includes('backwater') ||
          t.includes('coast') ||
          t.includes('alleppey') ||
          t.includes('bekal') ||
          t.includes('goa') ||
          t.includes('houseboat')
        )
      }
      if (target === 'spiritual') {
        return combined.some((t) =>
          t.includes('spiritual') ||
          t.includes('wellness') ||
          t.includes('rishikesh') ||
          t.includes('varanasi') ||
          t.includes('ananda') ||
          t.includes('sacred')
        )
      }
      if (target === 'wild') {
        return combined.some((t) =>
          t.includes('wild') ||
          t.includes('untamed') ||
          t.includes('ranthambore') ||
          t.includes('corbett') ||
          t.includes('bandhavgarh') ||
          t.includes('safari') ||
          t.includes('tiger')
        )
      }

      return combined.some((t) => t.includes(target))
    })
  }, [packages, activeTabId])

  // Reset carousel index when tab changes
  useEffect(() => {
    setCarouselIndex(0)
    if (mobileCarouselRef.current) {
      mobileCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }, [activeTabId])

  const activeTab = INTENTION_TABS.find((t) => t.id === activeTabId) || INTENTION_TABS[0]

  // Carousel navigation for mobile / desktop
  const nextSlide = () => {
    if (filteredPackages.length > 0) {
      const nextIdx = (carouselIndex + 1) % filteredPackages.length
      setCarouselIndex(nextIdx)
      if (mobileCarouselRef.current) {
        const itemWidth = mobileCarouselRef.current.clientWidth * 0.88
        mobileCarouselRef.current.scrollTo({ left: nextIdx * itemWidth, behavior: 'smooth' })
      }
    }
  }

  const prevSlide = () => {
    if (filteredPackages.length > 0) {
      const prevIdx = (carouselIndex - 1 + filteredPackages.length) % filteredPackages.length
      setCarouselIndex(prevIdx)
      if (mobileCarouselRef.current) {
        const itemWidth = mobileCarouselRef.current.clientWidth * 0.88
        mobileCarouselRef.current.scrollTo({ left: prevIdx * itemWidth, behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-slate-950 text-foreground selection:bg-primary/30 selection:text-primary">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-32 size-[500px] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute bottom-1/4 -right-32 size-[500px] rounded-full bg-amber-700/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-slate-950 to-slate-950" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 sm:space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary/90 font-medium block">
            Curated by Intention
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground font-medium tracking-tight leading-[1.15]">
            Thematic Indian Circuits
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-foreground/80 font-light leading-relaxed max-w-2xl mx-auto">
            Experience our sovereign domestic luxury circuits. Handcrafted exclusively for Indian patrons, featuring palace buyouts, private charters, and high-touch concierge care.
          </p>
        </div>

        {/* Intention Tabs Bar (Touch-scrollable on mobile, centered on tablet/desktop) */}
        <div className="mt-8 sm:mt-12 flex items-center overflow-x-auto sm:flex-wrap sm:justify-center gap-2 sm:gap-3 pb-3 sm:pb-0 -mx-4 sm:mx-0 px-4 sm:px-0 no-scrollbar">
          {INTENTION_TABS.map((tab) => {
            const isSelected = activeTabId === tab.id
            const Icon = tab.icon

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabId(tab.id)}
                className={`group relative flex shrink-0 flex-col items-start sm:items-center text-left sm:text-center px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border border-primary/60 bg-primary/20 text-primary shadow-lg shadow-primary/20 font-semibold'
                    : 'border border-white/10 bg-white/5 text-foreground/70 hover:border-white/20 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`size-4 shrink-0 ${isSelected ? 'text-primary' : 'text-foreground/50 group-hover:text-foreground/80'}`} />
                  <span className="font-mono text-xs uppercase tracking-wider whitespace-nowrap">{tab.label}</span>
                </div>
                <span className="text-[10px] text-foreground/50 tracking-normal font-sans font-light mt-0.5 whitespace-nowrap">
                  {tab.destinations}
                </span>
                {isSelected && (
                  <motion.div
                    layoutId="intentionActivePill"
                    className="absolute inset-0 rounded-2xl border border-primary bg-primary/10 pointer-events-none"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Active Circuit Editorial Prologue */}
        <div className="mt-6 sm:mt-8 text-center max-w-2xl mx-auto px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-1.5"
            >
              <h3 className="font-serif text-base sm:text-lg text-primary italic">
                &ldquo;{activeTab.headline}&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed font-light">
                {activeTab.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Info & Carousel Controls */}
        <div className="mt-8 sm:mt-10 flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-foreground/60">
            <span className="text-primary font-bold">
              0{filteredPackages.length > 0 ? (carouselIndex % filteredPackages.length) + 1 : 0}
            </span>
            <span>/</span>
            <span>0{filteredPackages.length} Domestic Curations</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous circuit journey"
              className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground/80 hover:border-primary hover:text-primary hover:bg-white/10 transition-colors cursor-pointer active:scale-95"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next circuit journey"
              className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground/80 hover:border-primary hover:text-primary hover:bg-white/10 transition-colors cursor-pointer active:scale-95"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-8 relative">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-3xl border border-white/10 bg-white/5 p-6 h-96"
                />
              ))}
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="py-16 text-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02]">
              <p className="text-sm text-foreground/60">
                No curations currently matched to this circuit. Please choose another tab.
              </p>
            </div>
          ) : (
            <>
              {/* ============================================================ */}
              {/* MOBILE HORIZONTAL TOUCH SNAP CAROUSEL (sm:hidden)             */}
              {/* ============================================================ */}
              <div
                ref={mobileCarouselRef}
                className="flex sm:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar -mx-4 px-4"
              >
                {filteredPackages.map((pkg, idx) => (
                  <div
                    key={pkg.id}
                    className="min-w-[85vw] max-w-[340px] shrink-0 snap-center h-full"
                  >
                    <PackageCard pkg={pkg} />
                  </div>
                ))}
              </div>

              {/* ============================================================ */}
              {/* TABLET & DESKTOP RESPONSIVE GRID (hidden sm:grid)            */}
              {/* ============================================================ */}
              <div
                className={`hidden sm:grid gap-6 lg:gap-8 ${
                  filteredPackages.length === 1
                    ? 'grid-cols-1 max-w-xl mx-auto'
                    : filteredPackages.length === 2
                    ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
                    : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
                }`}
              >
                {filteredPackages.map((pkg) => (
                  <div key={pkg.id} className="h-full">
                    <PackageCard pkg={pkg} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Carousel Pagination Dots */}
        {filteredPackages.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {filteredPackages.map((pkg, idx) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => {
                  setCarouselIndex(idx)
                  if (mobileCarouselRef.current) {
                    const itemWidth = mobileCarouselRef.current.clientWidth * 0.88
                    mobileCarouselRef.current.scrollTo({ left: idx * itemWidth, behavior: 'smooth' })
                  }
                }}
                aria-label={`Jump to circuit ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === carouselIndex % filteredPackages.length
                    ? 'w-8 bg-gradient-to-r from-primary to-amber-400'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
