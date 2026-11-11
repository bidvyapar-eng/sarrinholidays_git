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
        <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C5A059] font-medium block">
          India&apos;s Sovereign Travel Atelier
        </span>

        {/* H1 Primary SEO Title */}
        <h1 className="mt-5 max-w-4xl text-balance font-serif font-light text-4xl sm:text-6xl lg:text-7xl leading-[1.12] tracking-tight text-[#F4F2EC]">
          Bespoke Indian Expeditions &amp; Private Journeys
        </h1>

        {/* High-Converting, Grounded Editorial Subtitle */}
        <p className="mt-5 max-w-2xl text-pretty text-sm sm:text-base md:text-lg leading-relaxed text-[#B8B4AA] font-light">
          Handcrafted private itineraries uniting 18th-century living palace suites in Rajasthan,
          exclusive houseboat buyouts along Kerala&apos;s emerald lagoons, and high-altitude Himalayan
          wellness retreats. Architected with private aviation and 24/7 dedicated concierge service.
        </p>

        {/* Interactive Search & Filter Bar */}
        <div className="mt-8 w-full max-w-3xl flex justify-center">
          <SearchFilter />
        </div>

        {/* Authentic Editorial Trust Credentials */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#B8B4AA] font-sans tracking-[0.18em] uppercase">
          <span>Taj &amp; Oberoi Living Palaces</span>
          <span className="size-1 rounded-full bg-[#C5A059]/50 inline-block" />
          <span>Twin-Engine Helicopter Charters</span>
          <span className="size-1 rounded-full bg-[#C5A059]/50 inline-block" />
          <span>Dedicated 24/7 Travelling Concierge</span>
        </div>
      </div>
    </section>
  )
}
