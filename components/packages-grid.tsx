"use client"

import { useState } from "react"
import { ArrowUpRight, Heart, Star } from "lucide-react"

type Package = {
  id: string
  country: string
  title: string
  duration: string
  description: string
  price: string
  image: string
  imageAlt: string
  rating: number
  review: string
}

const packages: Package[] = [
  {
    id: "amalfi",
    country: "Italy",
    title: "Amalfi Coast Curation",
    duration: "7 Days / 6 Nights",
    description:
      "Private cliffside villas, chartered sunset sails, and Michelin-starred coastal dining along the Tyrrhenian.",
    price: "From $4,200",
    image: "/package-amalfi.png",
    imageAlt: "Pastel villages cascading down the Amalfi Coast cliffs above a turquoise sea",
    rating: 4.9,
    review: "Every detail felt effortless, intimate, and beautifully considered.",
  },
  {
    id: "kyoto",
    country: "Japan",
    title: "Kyoto Hidden Pavilions",
    duration: "6 Days / 5 Nights",
    description:
      "Dawn temple access, a private tea ceremony, and quiet ryokan stays among the maple-lined pavilions.",
    price: "From $5,800",
    image: "/package-kyoto.png",
    imageAlt: "A traditional Kyoto temple pavilion reflected in a still pond at misty dawn",
    rating: 4.8,
    review: "A quiet, soulful escape that gave us room to truly slow down.",
  },
  {
    id: "serengeti",
    country: "Tanzania",
    title: "Serengeti Private Safari",
    duration: "8 Days / 7 Nights",
    description:
      "Exclusive-use camps, guided golden-hour game drives, and a hot-air balloon crossing over the savanna.",
    price: "From $9,400",
    image: "/package-serengeti.png",
    imageAlt: "Acacia trees silhouetted against an amber Serengeti sky at golden hour",
    rating: 5,
    review: "The kind of once-in-a-lifetime journey we will talk about forever.",
  },
]

export function PackageCard({ package: pkg }: { package: Package }) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <article className="motion-card group flex h-full flex-col overflow-hidden rounded-3xl border border-white/12 bg-white/8 shadow-xl shadow-black/30 backdrop-blur-xl transition-colors hover:border-white/25">
      <div className="relative aspect-video overflow-hidden">
        <img src={pkg.image || "/placeholder.svg"} alt={pkg.imageAlt} className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-[11px] font-medium tracking-wide text-white backdrop-blur-md">
          Trending this week
        </span>
        <button
          type="button"
          aria-label={isWishlisted ? `Remove ${pkg.title} from wishlist` : `Add ${pkg.title} to wishlist`}
          aria-pressed={isWishlisted}
          onClick={() => setIsWishlisted((current) => !current)}
          className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/25 active:scale-95"
        >
          <Heart className={`size-5 transition-colors ${isWishlisted ? "fill-primary text-primary" : ""}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3 text-xs text-foreground/60">
          <span className="font-medium uppercase tracking-[0.2em] text-primary">{pkg.country}</span>
          <span>{pkg.duration}</span>
        </div>
        <h3 className="mt-2 font-serif text-2xl leading-snug tracking-tight text-foreground">{pkg.title}</h3>
        <div className="mt-3 flex items-center gap-1.5" aria-label={`${pkg.rating} out of 5 stars`}>
          <span className="flex text-primary" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-3.5 fill-current" />)}
          </span>
          <span className="text-xs font-medium text-foreground/65">{pkg.rating.toFixed(1)}</span>
        </div>
        <p className="mt-3 text-sm italic leading-relaxed text-foreground/65">&ldquo;{pkg.review}&rdquo;</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground/70">{pkg.description}</p>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-foreground">{pkg.price}</span>
            <span className="text-xs text-foreground/55">per planner</span>
          </div>
          <button type="button" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95">
            View Itinerary
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </article>
  )
}

export function PackageCardSkeleton() {
  return (
    <article aria-label="Loading travel package" className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-black/20">
      <div className="aspect-video animate-pulse bg-muted/40" />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex justify-between gap-4"><div className="h-3 w-20 animate-pulse rounded bg-muted/50" /><div className="h-3 w-24 animate-pulse rounded bg-muted/50" /></div>
        <div className="h-8 w-4/5 animate-pulse rounded bg-muted/50" />
        <div className="h-4 w-24 animate-pulse rounded bg-muted/50" />
        <div className="h-10 w-full animate-pulse rounded bg-muted/50" />
        <div className="h-12 w-full animate-pulse rounded bg-muted/50" />
        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5"><div className="h-6 w-24 animate-pulse rounded bg-muted/50" /><div className="h-10 w-32 animate-pulse rounded-full bg-muted/50" /></div>
      </div>
    </article>
  )
}

export function PackagesGrid() {
  return (
    <section id="destinations" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Sarrinholidays</span>
        <h2 className="mt-3 text-balance font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
          Signature curated journeys
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-foreground/70">
          Each itinerary is handcrafted end to end, blending rare access with effortless luxury.
        </p>
      </div>

      <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <li key={pkg.id}>
            <PackageCard package={pkg} />
          </li>
        ))}
      </ul>
    </section>
  )
}
