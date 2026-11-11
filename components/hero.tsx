import { SearchFilter } from "@/components/search-filter"
import { VideoBackground } from "@/components/video-background"

export function Hero() {
  return (
    <section className="relative z-30 flex min-h-screen items-center justify-center">
      {/* Cycling nature background: mountains, forest waterfall, snow, desert */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <VideoBackground />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-28 pb-16 md:pt-32 md:pb-20 text-center sm:px-6">
        {/* Eyebrow: Quiet Luxury Editorial Typography */}
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary/90 font-medium block">
          India&apos;s Sovereign Travel Atelier
        </span>

        {/* H1 Primary SEO Title */}
        <h1 className="mt-4 max-w-4xl text-balance font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-foreground">
          Bespoke Indian Expeditions. <br className="hidden sm:inline" />
          <span className="italic text-primary font-light">Sovereign Luxury.</span>
        </h1>

        {/* High-Converting, Grounded Editorial Subtitle */}
        <p className="mt-4 max-w-2xl text-pretty text-sm sm:text-base md:text-lg leading-relaxed text-foreground/80 font-light">
          Handcrafted private itineraries uniting 18th-century living palace suites in Rajasthan,
          exclusive houseboat buyouts along Kerala&apos;s emerald lagoons, and high-altitude Himalayan
          wellness retreats. Architected with private aviation and 24/7 dedicated concierge service.
        </p>

        {/* Interactive Search & Filter Bar */}
        <div className="mt-8 w-full max-w-3xl flex justify-center">
          <SearchFilter />
        </div>

        {/* Authentic Editorial Trust Credentials */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-foreground/75 font-mono tracking-wider uppercase">
          <span>Taj &amp; Oberoi Living Palaces</span>
          <span className="size-1 rounded-full bg-primary/40 inline-block" />
          <span>Twin-Engine Helicopter Charters</span>
          <span className="size-1 rounded-full bg-primary/40 inline-block" />
          <span>Strict Non-Disclosure Protocol</span>
        </div>
      </div>
    </section>
  )
}
