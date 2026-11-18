'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, Compass, ShieldCheck } from 'lucide-react'

interface StampData {
  id: string
  state: string
  pass: string
  altitude: string
  threshold: number // 0.1, 0.3, 0.5, 0.7, 0.9
  positionPercent: number // 10, 30, 50, 70, 90
  rotation: string
  stampCode: string
  dateLabel: string
}

const EXPEDITION_STAMPS: StampData[] = [
  {
    id: 'hp',
    state: 'HIMACHAL PRADESH',
    pass: 'Spiti & Atal Tunnel',
    altitude: '14,931 FT',
    threshold: 0.1,
    positionPercent: 10,
    rotation: '-rotate-6',
    stampCode: 'HP-14931',
    dateLabel: 'BORDER EXPEDITION',
  },
  {
    id: 'ld',
    state: 'LADAKH',
    pass: 'Khardung La & Pangong',
    altitude: '17,582 FT',
    threshold: 0.3,
    positionPercent: 30,
    rotation: 'rotate-3',
    stampCode: 'LD-17582',
    dateLabel: 'HIGH PASS CLEARED',
  },
  {
    id: 'jk',
    state: 'KASHMIR',
    pass: 'Zoji La & Sonamarg',
    altitude: '11,575 FT',
    threshold: 0.5,
    positionPercent: 50,
    rotation: '-rotate-4',
    stampCode: 'JK-11575',
    dateLabel: 'PIR PANJAL SECTOR',
  },
  {
    id: 'uk',
    state: 'UTTARAKHAND',
    pass: 'Mana Pass & Badrinath',
    altitude: '18,192 FT',
    threshold: 0.7,
    positionPercent: 70,
    rotation: 'rotate-6',
    stampCode: 'UK-18192',
    dateLabel: 'TIBETAN BORDER POST',
  },
  {
    id: 'sk',
    state: 'SIKKIM & ARUNACHAL',
    pass: 'Nathu La & Tawang',
    altitude: '17,800 FT',
    threshold: 0.9,
    positionPercent: 90,
    rotation: '-rotate-3',
    stampCode: 'SK-17800',
    dateLabel: 'SILK ROUTE SECTOR',
  },
]

export function HimalayanBikeTrack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateScrollProgress = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight || 800

      // Start calculating when the section enters the bottom 85% of screen
      // Complete as the section moves through the viewport
      const startOffset = windowHeight * 0.85
      const endOffset = windowHeight * 0.2
      const totalDistance = rect.height + (startOffset - endOffset)
      const currentScroll = startOffset - rect.top
      const rawProgress = currentScroll / totalDistance
      const clamped = Math.min(Math.max(rawProgress, 0), 1)

      setProgress(clamped)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updateScrollProgress()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Identify current pass name based on progress
  const getCurrentPassLabel = () => {
    if (progress < 0.1) return 'MANALI BASE · 6,700 FT'
    if (progress < 0.3) return 'SPITI & ATAL · 14,931 FT'
    if (progress < 0.5) return 'KHARDUNG LA · 17,582 FT'
    if (progress < 0.7) return 'ZOJI LA · 11,575 FT'
    if (progress < 0.9) return 'MANA PASS · 18,192 FT'
    return 'NATHU LA · 17,800 FT'
  }

  const isCompleted = progress >= 0.95

  return (
    <div
      ref={containerRef}
      className="mt-16 pt-12 border-t border-stone-300/80 max-w-7xl mx-auto px-4 sm:px-6"
    >
      {/* 1. Top Editorial Header Row */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-stone-300/60">
        <div>
          <span className="text-[11px] font-sans font-medium uppercase tracking-[0.15em] text-[#9A7B3E] block mb-2">
            TRANS-HIMALAYAN MOTORCYCLE EXPEDITIONS
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#141310] font-medium tracking-tight">
            The High-Altitude Rider&apos;s Circuit
          </h3>
          <p className="mt-2 text-sm text-stone-600 max-w-2xl font-normal leading-relaxed">
            Five legendary frontier corridors. Custom Royal Enfield Himalayan &amp; BMW GS adventure fleets with chase vehicle mechanics, high-altitude oxygen arrays, and royal tented encampments.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <a
            href="https://wa.me/918419887730?text=Hello%20Sarrin%20Holidays,%20I%20want%20to%20enquire%20about%20a%20Himalayan%20Bike%20Expedition"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-[#141310] bg-[#141310] px-5 py-3 text-xs font-sans font-semibold uppercase tracking-[0.1em] text-[#F6F3EC] hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-[#141310] transition-all duration-300 shadow-sm"
          >
            <span>Enquire Bike Expedition</span>
            <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>

      {/* 2. Scroll-Driven Left-to-Right Motorcycle & Mountain Contour Track */}
      <div className="relative mt-12 pt-8 pb-14 overflow-hidden rounded-sm bg-[#EFECE4]/60 border border-stone-300/70 p-4 sm:p-6 lg:p-8">
        {/* Subtle Map Coordinate Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Milestone Indicator Track Bar (Top Mini-HUD) */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-stone-600 mb-4 pb-2 border-b border-stone-300/50">
          <div className="flex items-center gap-2">
            <Compass className="size-3.5 text-[#C5A059]" />
            <span className="font-semibold text-[#141310]">EXPEDITION ODYSSEY</span>
            <span className="text-stone-400">·</span>
            <span className="text-[#9A7B3E]">{getCurrentPassLabel()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-stone-500">ROUTE COMPLETION:</span>
            <span className="font-semibold text-[#141310]">{Math.round(progress * 100)}%</span>
          </div>
        </div>

        {/* Interactive Track Area */}
        <div className="relative w-full h-44 sm:h-48 my-4 select-none">
          {/* Mountain Ridge Silhouette SVG Background */}
          <svg
            className="absolute inset-x-0 bottom-0 w-full h-36 sm:h-40 pointer-events-none"
            viewBox="0 0 1000 140"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="mountainIvoryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#DFDAD0" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#E9E5DC" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#F6F3EC" stopOpacity="0.05" />
              </linearGradient>
              <clipPath id="progressFillClip">
                <rect x="0" y="0" width={`${progress * 1000}`} height="140" />
              </clipPath>
            </defs>

            {/* Background Mountain Peaks (Full Width) */}
            <path
              d="M0 140 L0 105 L60 85 L120 100 L180 65 L240 85 L300 45 L360 80 L420 55 L480 90 L540 60 L600 85 L660 38 L720 75 L780 48 L840 80 L900 42 L960 70 L1000 95 L1000 140 Z"
              fill="url(#mountainIvoryGrad)"
              stroke="#D3CDC1"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Snow Peak Accents on highest summits */}
            <path d="M300 45 L285 62 L315 62 Z" fill="#FFFFFF" opacity="0.9" />
            <path d="M660 38 L642 58 L678 58 Z" fill="#FFFFFF" opacity="0.9" />
            <path d="M900 42 L885 60 L915 60 Z" fill="#FFFFFF" opacity="0.9" />

            {/* Base Highway Contour Line (Neutral Grey) */}
            <path
              d="M0 115 Q 150 95, 300 105 T 600 110 T 800 100 T 1000 112"
              stroke="#D3CDC1"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
            />

            {/* Active Gold Progress Track Line (Fills dynamically with progress) */}
            <path
              d="M0 115 Q 150 95, 300 105 T 600 110 T 800 100 T 1000 112"
              stroke="#C5A059"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              clipPath="url(#progressFillClip)"
            />
          </svg>

          {/* Dynamic Checkpoint Milestones along the Line (10%, 30%, 50%, 70%, 90%) */}
          <div className="absolute inset-x-0 bottom-4 sm:bottom-6 pointer-events-none">
            {EXPEDITION_STAMPS.map((st) => {
              const reached = progress >= st.threshold
              return (
                <div
                  key={st.id}
                  className="absolute -translate-x-1/2 flex flex-col items-center transition-all duration-500"
                  style={{ left: `${st.positionPercent}%` }}
                >
                  <div
                    className={`size-3 rounded-full border-2 transition-all duration-300 ${
                      reached
                        ? 'bg-[#C5A059] border-[#141310] scale-125 shadow-sm'
                        : 'bg-[#DFDAD0] border-stone-400 scale-90'
                    }`}
                  />
                  <span
                    className={`mt-1.5 text-[9px] font-mono tracking-wider whitespace-nowrap transition-colors duration-300 ${
                      reached ? 'text-[#141310] font-semibold' : 'text-stone-400'
                    }`}
                  >
                    {st.altitude}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Minimalist Fine-Line SVG Touring Motorcycle with Rider */}
          <div
            className="absolute bottom-11 sm:bottom-12 -translate-x-1/2 pointer-events-none transition-[left] duration-150 ease-out z-20"
            style={{ left: `${Math.min(Math.max(progress * 92, 4), 94)}%` }}
          >
            {/* Elevation Altitude Callout Tag above Rider */}
            <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#141310] text-[#F6F3EC] text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-md border border-[#C5A059]/40 flex items-center gap-1.5 animate-in fade-in duration-200">
              <span className="size-1.5 rounded-full bg-[#C5A059] animate-pulse" />
              <span>{getCurrentPassLabel()}</span>
            </div>

            {/* Fine-Line Adventure Motorcycle with Rider SVG */}
            <svg
              viewBox="0 0 160 95"
              className="w-24 sm:w-28 md:w-32 h-auto drop-shadow-md"
              fill="none"
              stroke="#141310"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Rear Spoke Wheel */}
              <circle cx="36" cy="68" r="16" stroke="#141310" strokeWidth="2.5" />
              <circle cx="36" cy="68" r="9" stroke="#C5A059" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="36" cy="68" r="3" fill="#141310" />
              <line x1="36" y1="52" x2="36" y2="84" stroke="#8B6F3B" strokeWidth="0.8" />
              <line x1="20" y1="68" x2="52" y2="68" stroke="#8B6F3B" strokeWidth="0.8" />
              <line x1="25" y1="57" x2="47" y2="79" stroke="#8B6F3B" strokeWidth="0.8" />
              <line x1="25" y1="79" x2="47" y2="57" stroke="#8B6F3B" strokeWidth="0.8" />

              {/* Front Spoke Wheel */}
              <circle cx="124" cy="68" r="16" stroke="#141310" strokeWidth="2.5" />
              <circle cx="124" cy="68" r="9" stroke="#C5A059" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="124" cy="68" r="3" fill="#141310" />
              <line x1="124" y1="52" x2="124" y2="84" stroke="#8B6F3B" strokeWidth="0.8" />
              <line x1="108" y1="68" x2="140" y2="68" stroke="#8B6F3B" strokeWidth="0.8" />
              <line x1="113" y1="57" x2="135" y2="79" stroke="#8B6F3B" strokeWidth="0.8" />
              <line x1="113" y1="79" x2="135" y2="57" stroke="#8B6F3B" strokeWidth="0.8" />

              {/* Upswept Performance Exhaust */}
              <path d="M62 66 Q50 65 38 58 L24 46" stroke="#C5A059" strokeWidth="2.5" fill="none" />
              <rect x="18" y="42" width="14" height="5" rx="1.5" transform="rotate(-35 18 42)" fill="#141310" stroke="#C5A059" strokeWidth="1" />

              {/* Rear Swingarm & Tubular Chassis Frame */}
              <line x1="36" y1="68" x2="65" y2="62" stroke="#141310" strokeWidth="3" />
              <line x1="65" y1="62" x2="80" y2="48" stroke="#141310" strokeWidth="2.5" />
              <line x1="65" y1="62" x2="106" y2="36" stroke="#141310" strokeWidth="2" />

              {/* Engine Block & Bash Plate */}
              <rect x="64" y="52" width="18" height="14" rx="2" fill="#141310" stroke="#8B6F3B" strokeWidth="1.5" />
              <line x1="66" y1="56" x2="80" y2="56" stroke="#C5A059" strokeWidth="1" />
              <line x1="66" y1="60" x2="80" y2="60" stroke="#C5A059" strokeWidth="1" />
              <path d="M60 68 L84 68 L86 62" stroke="#C5A059" strokeWidth="1.5" fill="none" />

              {/* Hard Adventure Touring Pannier (Luggage Box) */}
              <rect x="22" y="42" width="18" height="15" rx="1.5" fill="#EFECE4" stroke="#141310" strokeWidth="1.8" />
              <line x1="22" y1="47" x2="40" y2="47" stroke="#C5A059" strokeWidth="1" />
              <circle cx="31" cy="44.5" r="1" fill="#141310" />

              {/* Fuel Tank & Stepped Seat */}
              <path d="M50 46 Q60 46 64 44 L82 38 Q94 36 98 42 L102 42 Q106 36 106 34 L86 34 Q72 36 66 44 Z" fill="#141310" stroke="#C5A059" strokeWidth="1.5" />
              <path d="M44 46 Q54 45 64 46 L66 43 Q58 41 46 42 Z" fill="#C5A059" stroke="#141310" strokeWidth="1" />

              {/* Front Long-Travel Suspension Forks */}
              <line x1="106" y1="34" x2="124" y2="68" stroke="#141310" strokeWidth="3" />
              <line x1="104" y1="36" x2="122" y2="68" stroke="#C5A059" strokeWidth="1" />

              {/* High Enduro Beak Mudguard */}
              <path d="M104 44 L120 42 L114 47" stroke="#141310" strokeWidth="2" fill="#141310" />

              {/* Windscreen & Round Headlamp */}
              <path d="M106 34 L112 22 L109 21 L104 31" fill="#C5A059" opacity="0.6" stroke="#141310" strokeWidth="1.2" />
              <circle cx="111" cy="35" r="3" fill="#C5A059" stroke="#141310" strokeWidth="1" />

              {/* Handlebars */}
              <path d="M102 31 L98 26 L94 26" stroke="#141310" strokeWidth="2" fill="none" />
              <circle cx="93" cy="26" r="1.5" fill="#C5A059" />

              {/* RIDER */}
              {/* Legs in technical riding trousers */}
              <path d="M58 46 L68 54 L74 63 L78 63" stroke="#141310" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />

              {/* Torso & Armored Jacket */}
              <path d="M54 44 L68 26 Q78 24 84 30 L72 48 Z" fill="#141310" stroke="#8B6F3B" strokeWidth="1.2" />
              {/* Gold Reflective Sash */}
              <line x1="62" y1="31" x2="76" y2="43" stroke="#C5A059" strokeWidth="1.5" />

              {/* Arm reaching forward to handlebar */}
              <path d="M74 28 L86 30 L94 26" stroke="#141310" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

              {/* Helmet & Visor */}
              <ellipse cx="80" cy="16" rx="7" ry="7.5" fill="#141310" stroke="#C5A059" strokeWidth="1.5" />
              <path d="M84 14 Q88 16 86 19 L82 19" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M82 10 L87 12" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Five Vintage State Expedition Stamps Along the Route */}
      <div className="mt-10">
        <div className="text-center mb-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9A7B3E] font-medium block">
            HISTORIC FRONTIER CHECKPOINTS · PASSPORT STAMP TRACKER
          </span>
          <p className="text-xs text-stone-600 mt-1 font-normal">
            Scroll down to advance your motorcycle across high Himalayan passes and clear all five state frontier seals.
          </p>
        </div>

        {/* 5 Circular Vintage Postmark Stamps (Grid on Mobile/Tablet, 5-col on Desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-center justify-items-center">
          {EXPEDITION_STAMPS.map((stamp) => {
            const isStamped = progress >= stamp.threshold

            return (
              <div
                key={stamp.id}
                className={`relative transition-all duration-700 ease-out flex flex-col items-center ${stamp.rotation} ${
                  isStamped
                    ? 'opacity-100 scale-100'
                    : 'opacity-30 scale-95 grayscale'
                }`}
              >
                {/* Stamp Circle Container (w-28 h-28 / w-32 h-32) */}
                <div
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-dashed flex flex-col items-center justify-center text-center p-2.5 transition-all duration-500 relative select-none ${
                    isStamped
                      ? 'border-[#141310] bg-[#EFECE4] text-[#141310] shadow-md ring-1 ring-[#C5A059]/50'
                      : 'border-[#8B6F3B]/50 bg-stone-200/40 text-stone-600'
                  }`}
                >
                  {/* Inner Solid Ring for vintage passport postmark effect */}
                  <div
                    className={`absolute inset-1.5 rounded-full border pointer-events-none transition-colors duration-500 ${
                      isStamped ? 'border-[#8B6F3B]/60' : 'border-stone-400/40'
                    }`}
                  />

                  {/* Stamp Header (State Name) */}
                  <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-[0.12em] uppercase leading-tight line-clamp-1 px-1">
                    {stamp.state}
                  </span>

                  {/* Divider line */}
                  <div className="w-10 sm:w-12 h-px bg-current opacity-30 my-1" />

                  {/* Pass Name */}
                  <span className="font-serif text-[10px] sm:text-[11px] font-medium uppercase leading-snug line-clamp-2 px-1">
                    {stamp.pass}
                  </span>

                  {/* Altitude in Gold Accent */}
                  <span className="mt-0.5 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-[#9A7B3E]">
                    {stamp.altitude}
                  </span>

                  {/* Bottom Verification Label */}
                  <span className="text-[7px] font-mono uppercase tracking-widest opacity-60 mt-0.5">
                    {stamp.stampCode}
                  </span>

                  {/* Vintage Ink Verification Badge when passed */}
                  {isStamped && (
                    <div className="absolute -top-1.5 -right-1.5 bg-[#141310] text-[#C5A059] size-5 rounded-full border border-[#C5A059] flex items-center justify-center shadow-sm animate-in zoom-in-75 duration-300">
                      <Check className="size-3 stroke-[2.5]" />
                    </div>
                  )}
                </div>

                {/* Micro Label Below Stamp */}
                <div className="mt-2 text-center">
                  <span
                    className={`text-[9px] font-mono uppercase tracking-wider block transition-colors duration-300 ${
                      isStamped ? 'text-[#9A7B3E] font-semibold' : 'text-stone-400'
                    }`}
                  >
                    {isStamped ? 'PASS VERIFIED' : 'PENDING PASS'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* 4. "ROUTE COMPLETED" Seal (Appears when progress >= 95%) */}
        <div
          className={`mt-10 overflow-hidden transition-all duration-700 ease-out ${
            isCompleted
              ? 'opacity-100 max-h-48 scale-100'
              : 'opacity-0 max-h-0 pointer-events-none scale-95'
          }`}
        >
          <div className="rounded-sm border-2 border-[#C5A059] bg-[#141310] p-6 text-[#F6F3EC] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-full border-2 border-dashed border-[#C5A059] bg-[#1C1A15] flex flex-col items-center justify-center text-center shrink-0">
                <ShieldCheck className="size-6 text-[#C5A059]" />
                <span className="text-[7px] font-mono uppercase tracking-widest text-[#C5A059]">SEALED</span>
              </div>
              <div>
                <div className="inline-flex items-center gap-2 rounded-sm bg-[#C5A059]/20 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-[#C5A059] font-semibold mb-1">
                  OFFICIAL SARRIN EXPEDITION CITATION
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[#F6F3EC]">
                  Trans-Himalayan Route Completed
                </h4>
                <p className="text-xs text-stone-300 font-normal leading-relaxed max-w-xl">
                  All five high-altitude frontier passes successfully cleared. Contact our senior expedition desk to commission your private bespoke convoy.
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <a
                href="https://wa.me/918419887730?text=Hello%20Sarrin%20Holidays,%20I%20have%20completed%20the%20Trans-Himalayan%20Circuit%20overview%20and%20want%20to%20reserve%20a%20private%20motorcycle%20expedition."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-sm bg-[#C5A059] px-6 py-3.5 text-xs font-sans font-bold uppercase tracking-widest text-[#141310] hover:bg-[#D4B475] transition-colors shadow-lg w-full sm:w-auto text-center"
              >
                <span>Book Bespoke Convoy</span>
                <ArrowRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HimalayanBikeTrack
