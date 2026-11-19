'use client'

import React, { useEffect, useState, useRef } from 'react'

const CHECKPOINTS = [
  { id: 'spiti', label: 'Himachal Pradesh · Spiti & Atal Tunnel', x: 20 },
  { id: 'khardung', label: 'Ladakh · Khardung La 17,582 FT', x: 40 },
  { id: 'zoji', label: 'Kashmir · Zoji La 11,575 FT', x: 60 },
  { id: 'mana', label: 'Uttarakhand · Mana Pass 18,192 FT', x: 80 },
  { id: 'nathula', label: 'Sikkim & Arunachal · Nathu La & Tawang', x: 100 },
]

export function HimalayanBikeTrack() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionHeight = rect.height
      // Progress from 0 (section bottom enters viewport bottom) to 1 (section top leaves viewport top)
      const progress = (windowHeight - rect.top) / (windowHeight + sectionHeight)
      setScrollProgress(Math.max(0, Math.min(1, progress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const bikeX = scrollProgress * 100

  const stampOpacity = (checkpointX: number) => {
    // Stamp fades in as bike approaches, solid when bike passes it
    const progressDecimal = scrollProgress
    const threshold = checkpointX / 100
    return Math.min(1, Math.max(0.15, (progressDecimal - threshold + 0.12) / 0.14))
  }

  const WHATSAPP_MSG = encodeURIComponent(
    'Hello Sarrin Holidays, I would like to enquire about a Himalayan motorcycle expedition. Please share route options and details.'
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F6F3EC] text-[#141310] py-24 md:py-32 border-t border-stone-200/50 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-xs font-sans uppercase tracking-[0.1em] text-[#C5A059] font-medium block">
            Himalayan Motorcycle Expeditions
          </span>
          <h2 className="mt-4 font-serif font-medium text-3xl sm:text-4xl leading-tight tracking-tight text-[#141310]">
            Ride the Roof of the World
          </h2>
          <p className="mt-3 text-base text-[#5C554A] font-normal leading-relaxed max-w-sm mx-auto">
            Curated motorcycle journeys across India&rsquo;s highest mountain passes — from Spiti&rsquo;s stark plateaus to Ladakh&rsquo;s Khardung La.
          </p>
        </div>

        {/* Track container */}
        <div className="relative mx-auto max-w-4xl">
          {/* Fine-line mountain contour SVG */}
          <svg
            className="w-full h-[60px] md:h-[80px] block mx-auto"
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0,80 C100,40 200,110 300,50 C400,10 500,90 600,30 C700,100 800,20 900,70 C1000,40 1000,80 1000,80"
              stroke="#141310"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Motorcycle SVG */}
          <svg
            className={`absolute top-[-36px] w-[48px] h-[32px] transition-transform duration-100 ease-out ${
              scrollProgress > 0 ? 'translate-x-[calc(' + bikeX + '% - 24px)]' : 'translate-x-[-24px]'
            }`}
            viewBox="0 0 200 130"
            fill="none"
          >
            {/* Rear wheel */}
            <circle cx="50" cy="95" r="18" stroke="#141310" strokeWidth="2" />
            <circle cx="50" cy="95" r="6" stroke="#141310" strokeWidth="1" opacity={0.4} />
            {/* Front wheel */}
            <circle cx="140" cy="95" r="18" stroke="#141310" strokeWidth="2" />
            <circle cx="140" cy="95" r="6" stroke="#141310" strokeWidth="1" opacity={0.4} />
            {/* Frame */}
            <path d="M50,95 L75,80 L110,82 L140,95" stroke="#141310" strokeWidth="2.5" strokeLinecap="round" />
            {/* Seat */}
            <path d="M75,80 L90,72 L105,78" stroke="#141310" strokeWidth="2.5" strokeLinecap="round" />
            {/* Handlebars */}
            <path d="M110,82 L125,70 L135,75" stroke="#141310" strokeWidth="2" strokeLinecap="round" />
            {/* Exhaust */}
            <path d="M65,95 L60,105" stroke="#141310" strokeWidth="2" strokeLinecap="round" />
          </svg>

          {/* Checkpoint stamps */}
          {CHECKPOINTS.map((cp) => {
            const opacity = stampOpacity(cp.x)
            const isActive = scrollProgress >= cp.x / 100 - 0.02
            return (
              <div
                key={cp.id}
                className={`absolute top-[-110px] left-[calc(${cp.x}% - 48px)] w-96 h-20 flex items-center gap-3 rounded-full border px-3 py-2 text-center transition-all duration-500 ease-out ${
                  isActive
                    ? 'border-[#C5A059]/60 bg-white/90 shadow-md'
                    : 'border-white/30 bg-white/60 shadow-sm'
                }`}
                style={{ opacity }}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                    isActive
                      ? 'border-[#C5A059] bg-[#C5A059]/20'
                      : 'border-[#C5A059]/40 bg-transparent'
                  }`}
                />
                <span className={`text-[10px] font-sans font-medium uppercase tracking-wider leading-snug ${
                  isActive ? 'text-[#141310]' : 'text-[#141310]/40'
                }`}>
                  {cp.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center">
          <a
            href={`https://wa.me/918419887730?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] px-6 py-3 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#141310] shadow-lg shadow-[#C5A059]/20 transition-all cursor-pointer"
          >
            <span>Enquire Himalayan Bike Expedition &rarr;</span>
          </a>
          <p className="text-[11px] text-[#5C554A]/70 font-sans tracking-wider uppercase">
            Single day &amp; multi-day Himalayan motorcycle circuits
          </p>
        </div>
      </div>
    </section>
  )
}
