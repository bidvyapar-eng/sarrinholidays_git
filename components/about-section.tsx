'use client'

import React from 'react'
import Link from 'next/link'
import { openConciergeDrawer } from '@/components/ConciergeDrawer'
import {
  Crown,
  Plane,
  ShieldCheck,
  Clock,
  ArrowRight,
} from 'lucide-react'

export function AboutSection() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32 scroll-mt-24">
      {/* Ambient background illumination */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-[#C5A059]/5 blur-[140px]" />

      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 px-4 py-1 text-xs font-sans uppercase tracking-[0.25em] text-[#C5A059]">
          <span>The Sarrin Atelier • Heritage &amp; Philosophy</span>
        </div>

        <h2 className="mt-6 font-serif text-3xl sm:text-5xl lg:text-6xl font-light leading-[1.15] text-[#F4F2EC] tracking-tight">
          Crafted with Quiet Precision. Delivered with Personal Grace.
        </h2>

        <p className="mt-6 text-base sm:text-lg text-[#B8B4AA] leading-relaxed font-light">
          Founded to elevate the art of Indian travel, Sarrin Holidays operates
          as an intimate atelier for discerning travelers who appreciate understated luxury,
          authenticated heritage access, and gracious hospitality across the Indian subcontinent.
        </p>
      </div>

      {/* Story Narrative & Core Pillars Grid */}
      <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
        {/* Left Column: Authentic Brand Narrative */}
        <div className="space-y-6 text-[#B8B4AA] font-light leading-relaxed text-sm sm:text-base">
          <p>
            India is a land of profound heritage and breathtaking diversity, where true luxury lies in authentic relationships. For over a decade, our curatorial desk has nurtured direct alliances with royal families across Rajasthan, master naturalists in central India’s tiger sanctuaries, and renowned Ayurvedic physicians in Kerala and the Himalayan foothills.
          </p>
          <p>
            We do not offer pre-packaged itineraries. Every journey is thoughtfully composed around your personal rhythm, privacy, and cultural passions—whether that entails securing presidential suites in living palaces, arranging private aviation charters, or opening museum courtyards for quiet evening viewings.
          </p>
        </div>

        {/* Right Column: 4 Prestigious Hospitality Pillars */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Pillar 1 */}
          <div className="group rounded-sm border border-white/10 bg-[#141310] p-6 transition-all duration-300 hover:border-[#C5A059]/40 hover:bg-[#191814]">
            <div className="flex size-10 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20">
              <Crown className="size-5" />
            </div>
            <h3 className="mt-4 font-serif text-lg text-[#F4F2EC] font-normal">Heritage Palace Alliances</h3>
            <p className="mt-2 text-xs text-[#B8B4AA] leading-relaxed font-light">
              Direct relationships with noble families and palace trusts, unlocking private chambers, ancestral courtyards, and starlit dining.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="group rounded-sm border border-white/10 bg-[#141310] p-6 transition-all duration-300 hover:border-[#C5A059]/40 hover:bg-[#191814]">
            <div className="flex size-10 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20">
              <Plane className="size-5" />
            </div>
            <h3 className="mt-4 font-serif text-lg text-[#F4F2EC] font-normal">Private Aviation &amp; Charters</h3>
            <p className="mt-2 text-xs text-[#B8B4AA] leading-relaxed font-light">
              Point-to-point turboprops, high-altitude mountain helicopters, and seamless airport escorts eliminating commercial transit friction.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="group rounded-sm border border-white/10 bg-[#141310] p-6 transition-all duration-300 hover:border-[#C5A059]/40 hover:bg-[#191814]">
            <div className="flex size-10 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20">
              <ShieldCheck className="size-5" />
            </div>
            <h3 className="mt-4 font-serif text-lg text-[#F4F2EC] font-normal">Complete Guest Privacy</h3>
            <p className="mt-2 text-xs text-[#B8B4AA] leading-relaxed font-light">
              Your itinerary, personal preferences, and travel party details are protected with unwavering discretion and legal confidentiality.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="group rounded-sm border border-white/10 bg-[#141310] p-6 transition-all duration-300 hover:border-[#C5A059]/40 hover:bg-[#191814]">
            <div className="flex size-10 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20">
              <Clock className="size-5" />
            </div>
            <h3 className="mt-4 font-serif text-lg text-[#F4F2EC] font-normal">24/7 Dedicated Concierge</h3>
            <p className="mt-2 text-xs text-[#B8B4AA] leading-relaxed font-light">
              A personal senior curatorial director dedicated to your journey from initial conversation through your safe return home.
            </p>
          </div>
        </div>
      </div>

      {/* Atelier Key Metrics Banner */}
      <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <div className="font-serif text-3xl sm:text-4xl text-[#C5A059] font-normal">100%</div>
          <div className="mt-1 text-xs font-sans uppercase tracking-wider text-[#B8B4AA]">Bespoke Itineraries</div>
        </div>
        <div>
          <div className="font-serif text-3xl sm:text-4xl text-[#F4F2EC] font-normal">15+</div>
          <div className="mt-1 text-xs font-sans uppercase tracking-wider text-[#B8B4AA]">Years Heritage Alliances</div>
        </div>
        <div>
          <div className="font-serif text-3xl sm:text-4xl text-[#C5A059] font-normal">4.9 / 5.0</div>
          <div className="mt-1 text-xs font-sans uppercase tracking-wider text-[#B8B4AA]">Guest Satisfaction Rating</div>
        </div>
        <div>
          <div className="font-serif text-3xl sm:text-4xl text-[#F4F2EC] font-normal">&lt; 2 Hrs</div>
          <div className="mt-1 text-xs font-sans uppercase tracking-wider text-[#B8B4AA]">VIP Concierge Response</div>
        </div>
      </div>

      {/* Action Call to Action */}
      <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-sm border border-[#C5A059]/30 bg-[#141310] p-6 sm:p-8 backdrop-blur-md">
        <div>
          <h4 className="font-serif text-xl sm:text-2xl text-[#F4F2EC] font-normal">
            Planning a Bespoke Indian Journey?
          </h4>
          <p className="mt-1 text-xs sm:text-sm text-[#B8B4AA] font-light">
            Connect confidentially with a senior concierge liaison to architect your itinerary.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openConciergeDrawer()}
          className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] text-[#0C0B09] font-semibold px-6 py-3.5 text-xs uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer"
        >
          <span>Consult Our Concierge</span>
          <ArrowRight className="size-4" />
        </button>
      </div>
    </section>
  )
}
