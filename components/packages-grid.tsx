"use client"

import { useEffect, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowUpRight,
  MapPin,
  Calendar,
  Star,
  Search,
  X,
  CheckCircle2,
  Compass,
  ChevronRight,
  Send,
  Crown,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { fallbackPackages, type PackageItem } from "@/lib/cms"
import { PackageCard } from "@/components/package-card"

const categories = [
  "All Circuits",
  "Kerala Backwaters",
  "Kashmir & Valleys",
  "Goa Coastal",
  "Spiritual & Heritage",
  "Wild & Untamed",
] as const
type Category = (typeof categories)[number]

export function PackagesGrid() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || searchParams.get("destination") || ""

  const [packages, setPackages] = useState<PackageItem[]>(fallbackPackages)
  const [loading, setLoading] = useState<boolean>(false)
  const [activeCategory, setActiveCategory] = useState<Category>("All Circuits")
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch)
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null)

  // Sync with URL search params changes
  useEffect(() => {
    const query = searchParams.get("search") || searchParams.get("destination") || ""
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  // Listen to custom real-time search events from the Hero search bar
  useEffect(() => {
    const handleCustomSearch = (e: Event) => {
      const customEvent = e as CustomEvent<{ destination?: string }>
      if (customEvent.detail?.destination !== undefined) {
        setSearchQuery(customEvent.detail.destination)
        setActiveCategory("All Circuits")
      }
    }

    window.addEventListener("sarrin:search", handleCustomSearch)
    return () => window.removeEventListener("sarrin:search", handleCustomSearch)
  }, [])

  // Fetch live packages from Supabase with fallback merge
  useEffect(() => {
    let isCancelled = false

    async function loadPackages() {
      try {
        setLoading(true)
        const supabase = createClient()
        const { data, error } = await supabase
          .from("packages")
          .select("*")
          .order("created_at", { ascending: false })

        if (!isCancelled) {
          if (!error && data && data.length > 0) {
            // Merge with fallback packages to ensure new schema fields (theme_tags, scarcity_status) are always present
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
            let cachedCustom: PackageItem[] = []
            try {
              const stored = localStorage.getItem('sarrin_admin_custom_packages')
              if (stored) cachedCustom = JSON.parse(stored)
            } catch (e) {}

            const missingFallbacks = fallbackPackages.filter(
              (f) => !data.some((d: any) => d.slug === f.slug)
            )
            const combined = [...cachedCustom.filter(c => !merged.some(m => m.slug === c.slug)), ...merged, ...missingFallbacks.filter(f => !cachedCustom.some(c => c.slug === f.slug))]
            setPackages(combined)
          } else {
            let cachedCustom: PackageItem[] = []
            try {
              const stored = localStorage.getItem('sarrin_admin_custom_packages')
              if (stored) cachedCustom = JSON.parse(stored)
            } catch (e) {}
            const combined = [...cachedCustom, ...fallbackPackages.filter(f => !cachedCustom.some(c => c.slug === f.slug))]
            setPackages(combined)
          }
        }
      } catch (err) {
        console.error("Failed to load packages from Supabase, using fallback:", err)
        if (!isCancelled) {
          let cachedCustom: PackageItem[] = []
          try {
            const stored = localStorage.getItem('sarrin_admin_custom_packages')
            if (stored) cachedCustom = JSON.parse(stored)
          } catch (e) {}
          setPackages([...cachedCustom, ...fallbackPackages.filter(f => !cachedCustom.some(c => c.slug === f.slug))])
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    void loadPackages()

    return () => {
      isCancelled = true
    }
  }, [])

  // Filter packages based on activeCategory and searchQuery
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      // Category filter
      if (activeCategory !== "All Circuits") {
        const catLower = activeCategory.toLowerCase()
        const tags = [
          ...(pkg.experience_tags || []),
          ...(pkg.theme_tags || []),
          ...(pkg.destinations || []),
        ].map((t) => t.toLowerCase())
        const title = pkg.title.toLowerCase()
        const desc = pkg.description.toLowerCase()

        if (catLower.includes("kerala")) {
          const match = tags.some((t) => t.includes("kerala") || t.includes("alleppey") || t.includes("munnar") || t.includes("thekkady") || t.includes("kovalam") || t.includes("backwater") || t.includes("houseboat")) || title.includes("kerala")
          if (!match) return false
        } else if (catLower.includes("kashmir")) {
          const match = tags.some((t) => t.includes("kashmir") || t.includes("srinagar") || t.includes("gulmarg") || t.includes("pahalgam") || t.includes("sonamarg")) || title.includes("kashmir")
          if (!match) return false
        } else if (catLower.includes("goa")) {
          const match = tags.some((t) => t.includes("goa") || t.includes("colva") || t.includes("coast")) || title.includes("goa")
          if (!match) return false
        } else if (catLower.includes("spiritual") || catLower.includes("heritage")) {
          const match = tags.some((t) => t.includes("spiritual") || t.includes("varanasi") || t.includes("heritage") || t.includes("kashi") || t.includes("palace") || t.includes("rajasthan") || t.includes("udaipur")) || title.includes("varanasi") || title.includes("heritage") || title.includes("palace")
          if (!match) return false
        } else if (catLower.includes("wild") || catLower.includes("untamed")) {
          const match = tags.some((t) => t.includes("wild") || t.includes("untamed") || t.includes("ranthambore") || t.includes("corbett") || t.includes("bandhavgarh") || t.includes("safari") || t.includes("tiger")) || title.includes("wild") || title.includes("safari")
          if (!match) return false
        } else {
          const hasTag = tags.some((t) => t.includes(catLower))
          if (!hasTag && !title.includes(catLower) && !desc.includes(catLower)) {
            return false
          }
        }
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchTitle = pkg.title.toLowerCase().includes(query)
        const matchDesc = pkg.description.toLowerCase().includes(query)
        const matchDestinations = pkg.destinations?.some((d) =>
          d.toLowerCase().includes(query)
        )
        const matchTags = pkg.experience_tags?.some((t) =>
          t.toLowerCase().includes(query)
        )
        const matchThemes = pkg.theme_tags?.some((t) =>
          t.toLowerCase().includes(query)
        )
        const matchHighlights = pkg.highlights?.some((h) =>
          h.toLowerCase().includes(query)
        )

        return matchTitle || matchDesc || matchDestinations || matchTags || matchThemes || matchHighlights
      }

      return true
    })
  }, [packages, activeCategory, searchQuery])

  const clearFilter = () => {
    setSearchQuery("")
    setActiveCategory("All Circuits")
  }

  const formatPrice = (price: number) => {
    const inrValue = price < 10000 ? price * 100 : price
    return `₹${inrValue.toLocaleString('en-IN')}`
  }

  const getPackageImage = (pkg: PackageItem) => {
    if (!pkg.featured_image || pkg.featured_image.includes("photo-1599661559902")) {
      return "/scene-desert.png"
    }
    return pkg.featured_image
  }

  return (
    <section id="destinations" className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
      {/* Section Header */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary/90 font-medium block">
          Curated Expeditions
        </span>
        <h2 className="mt-4 text-balance font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Signature curated <span className="italic text-primary">journeys</span>
        </h2>
        <p className="mt-4 text-pretty text-base leading-relaxed text-foreground/80 font-light sm:text-lg">
          Each itinerary is architected end-to-end with private chauffeurs, palace heritage stays, and bespoke culinary hosts.
        </p>
      </div>

      {/* Filter & Search Bar Matrix */}
      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:pb-0">
          {categories.map((category) => {
            const isSelected = activeCategory === category
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`inline-flex items-center whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                    : "border border-white/15 bg-white/5 text-foreground/75 hover:border-white/30 hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        {/* Quick In-Grid Keyword Filter */}
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-foreground/45" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destination, style..."
            className="w-full rounded-full border border-white/15 bg-white/5 py-2 pl-9 pr-8 text-xs font-medium text-foreground placeholder:text-foreground/45 backdrop-blur-md outline-none transition-colors focus:border-primary/60 focus:bg-white/10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-foreground/50 hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Indicators */}
      {(searchQuery || activeCategory !== "All Circuits") && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-foreground/60">Filtered by:</span>
          {activeCategory !== "All Circuits" && (
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
              Category: {activeCategory}
              <button onClick={() => setActiveCategory("All Circuits")}>
                <X className="size-3 hover:text-white" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-foreground">
              Keyword: &ldquo;{searchQuery}&rdquo;
              <button onClick={() => setSearchQuery("")}>
                <X className="size-3 hover:text-white" />
              </button>
            </span>
          )}
          <button
            onClick={clearFilter}
            className="text-xs font-medium text-primary underline-offset-4 hover:underline ml-2"
          >
            Reset all
          </button>
          <span className="ml-auto text-xs text-foreground/50">
            {filteredPackages.length} {filteredPackages.length === 1 ? "journey" : "journeys"} found
          </span>
        </div>
      )}

      {/* Grid Content / Skeletons */}
      {loading ? (
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <div className="aspect-[4/3] w-full bg-white/10" />
              <div className="p-6 space-y-3">
                <div className="h-4 w-24 rounded-full bg-white/10" />
                <div className="h-7 w-3/4 rounded-lg bg-white/10" />
                <div className="h-14 w-full rounded-lg bg-white/10" />
                <div className="pt-4 flex justify-between">
                  <div className="h-6 w-20 rounded bg-white/10" />
                  <div className="h-9 w-28 rounded-full bg-white/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredPackages.length === 0 ? (
        <div className="mt-14 rounded-3xl border border-dashed border-white/15 bg-white/5 py-16 text-center backdrop-blur-xl">
          <Compass className="mx-auto size-12 text-primary/60" />
          <h3 className="mt-4 font-serif text-2xl text-foreground">No matching journeys found</h3>
          <p className="mt-2 text-sm text-foreground/60">
            We couldn&apos;t find any curations matching &ldquo;{searchQuery}&rdquo;. Try another destination or view all journeys.
          </p>
          <button
            onClick={clearFilter}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Show All Circuits
          </button>
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((pkg) => (
            <li key={pkg.id}>
              <PackageCard pkg={pkg} onSelect={() => setSelectedPackage(pkg)} />
            </li>
          ))}
        </ul>
      )}

      {/* Bespoke Itinerary Detail Modal */}
      {selectedPackage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop Blur */}
          <div
            onClick={() => setSelectedPackage(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity animate-in fade-in"
          />

          {/* Modal Container */}
          <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/20 bg-background/95 p-6 sm:p-8 shadow-2xl shadow-black/80 backdrop-blur-2xl scrollbar-none animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-foreground transition-colors hover:bg-white/20"
            >
              <X className="size-4" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {selectedPackage.duration}
              </span>
              {selectedPackage.is_trending && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-300">
                  <Crown className="size-3 text-amber-400" />
                  Iconic Curation
                </span>
              )}
              {selectedPackage.rating && (
                <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs text-foreground/80">
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                  {selectedPackage.rating.toFixed(1)} Guest Rating
                </span>
              )}
            </div>

            <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
              {selectedPackage.title}
            </h2>

            {/* Featured Image */}
            <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/15">
              <img
                src={getPackageImage(selectedPackage)}
                alt={selectedPackage.title}
                onError={(e) => {
                  e.currentTarget.src = "/scene-desert.png"
                }}
                className="size-full object-cover"
              />
            </div>

            {/* Description */}
            <div className="mt-6">
              <h4 className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                Itinerary Narrative
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80 sm:text-base">
                {selectedPackage.description}
              </p>
            </div>

            {/* Destinations Path */}
            {selectedPackage.destinations && selectedPackage.destinations.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                  Destinations En Route
                </h4>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {selectedPackage.destinations.map((dest, idx) => (
                    <span
                      key={dest}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-foreground/90"
                    >
                      <MapPin className="size-3 text-primary" />
                      {dest}
                      {idx < selectedPackage.destinations.length - 1 && (
                        <ChevronRight className="size-3 text-foreground/40 ml-1" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Curated Highlights */}
            {selectedPackage.highlights && selectedPackage.highlights.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                  Exclusive Inclusions & Highlights
                </h4>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {selectedPackage.highlights.map((hl, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-foreground/85"
                    >
                      <CheckCircle2 className="size-4 shrink-0 text-primary" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Experience Tags */}
            {selectedPackage.experience_tags && selectedPackage.experience_tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {selectedPackage.experience_tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Bottom Concierge Checkout / Inquiry Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">
              <div>
                <span className="block text-xs uppercase tracking-wider text-primary font-mono font-medium">
                  Bespoke Private Itinerary
                </span>
                <span className="font-serif text-2xl font-semibold text-white">
                  Pricing on Request
                </span>
                <span className="block text-xs text-foreground/60 mt-0.5">Customized to your travel dates & party</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/packages/${selectedPackage.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/20 hover:border-primary/40"
                >
                  <span>View Itinerary Details</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>

                <a
                  href={`https://wa.me/918419887730?text=${encodeURIComponent(
                    `Hello Sarrin Holidays, I would like to inquire about ${selectedPackage.title} (${selectedPackage.duration}).`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setSelectedPackage(null)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
                >
                  <Send className="size-4" />
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
