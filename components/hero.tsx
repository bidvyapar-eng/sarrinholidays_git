import { Star } from "lucide-react"
import { SearchFilter } from "@/components/search-filter"
import { VideoBackground } from "@/components/video-background"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Cycling nature background: mountains, forest waterfall, snow, desert */}
      <VideoBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-28 pb-16 text-center sm:px-6">
        <div className="animate-float absolute right-[8%] top-32 hidden size-20 rounded-full border border-primary/30 bg-primary/10 blur-[1px] lg:block" aria-hidden="true" />
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground/90 backdrop-blur-md">
          <span className="flex items-center gap-0.5 text-primary">
            <Star className="size-3.5 fill-current" />
            <Star className="size-3.5 fill-current" />
            <Star className="size-3.5 fill-current" />
          </span>
          Rated 4.9 by 12,000+ travelers
        </span>

        <h1 className="mt-6 max-w-4xl text-balance font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Journeys crafted for the{" "}
          <span className="italic text-primary">extraordinary</span>
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-foreground/75 sm:text-lg">
          From private island retreats to alpine hideaways, discover
          handcrafted escapes to the world&apos;s most breathtaking places.
        </p>

        <div className="mt-10 w-full">
          <SearchFilter />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-foreground/60">
          <span>Private villas</span>
          <span className="hidden size-1 rounded-full bg-foreground/30 sm:inline-block" />
          <span>Curated itineraries</span>
          <span className="hidden size-1 rounded-full bg-foreground/30 sm:inline-block" />
          <span>24/7 concierge</span>
        </div>
      </div>
    </section>
  )
}
