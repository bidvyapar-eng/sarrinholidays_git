'use client'

import React from 'react'
import Link from 'next/link'
import {
  Compass,
  Crown,
  Plane,
  ShieldCheck,
  Clock,
  Award,
  ArrowRight,
  HeartHandshake,
  Users,
  MapPin,
} from 'lucide-react'

export function AboutSection() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32 scroll-mt-24">
      {/* Ambient background illumination */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/5 blur-[140px]" />

      {/* Main Container Card with Subtle Luxury Glassmorphism */}
      <div className="relative rounded-[2.5rem] border border-white/12 bg-gradient-to-b from-white/[0.07] via-slate-950/80 to-white/[0.03] p-8 sm:p-12 lg:p-16 backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden">
        {/* Subtle decorative gold corner motif */}
        <div className="pointer-events-none absolute top-0 right-0 -mr-16 -mt-16 size-64 rounded-full bg-primary/10 blur-3xl" />

        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-mono uppercase tracking-[0.25em] text-primary shadow-sm shadow-primary/20">
            <span>The Sarrin Atelier • Heritage & Philosophy</span>
          </div>

          <h2 className="mt-6 font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] text-foreground tracking-tight">
            Engineered with Precision. <br />
            <span className="italic text-primary font-light">Delivered with Sovereign Discretion.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-foreground/80 leading-relaxed font-light">
            Founded to eliminate the compromises of conventional tourism, Sarrin Holidays operates
            as an intimate travel atelier for travelers who require absolute privacy, authenticated
            heritage access, and flawless logistical execution across the Indian subcontinent.
          </p>
        </div>

        {/* Story Narrative & Core Tenets Grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          {/* Left Column: Authentic Brand Narrative */}
          <div className="space-y-6 text-foreground/75 font-light leading-relaxed text-sm sm:text-base">
            <p>
              India is a land of sovereign histories and breathtaking geography, yet accessing its true
              wonders without friction requires rare relationships. For over a decade, our curatorial desk
              has maintained direct alliances with royal families across Rajasthan, master naturalists in
              central India’s tiger reserves, and senior Ayurvedic doctors in Kerala and the Himalayas.
            </p>
            <p>
              We do not sell pre-packaged vacations or off-the-shelf tours. Every itinerary is individually
              architected around your pace, security requirements, and aesthetic preferences—whether that
              means securing presidential palace suites, coordinating twin-engine helicopter charters,
              or opening locked fortress ramparts after public visiting hours.
            </p>

            {/* Credential Checkpoints */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-foreground/85">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-white/10 bg-white/5">
                <span className="size-1.5 rounded-full bg-primary/80 shrink-0" />
                <span>100% Private & Custom-Built</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-white/10 bg-white/5">
                <span className="size-1.5 rounded-full bg-primary/80 shrink-0" />
                <span>Direct Helipad Clearances</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-white/10 bg-white/5">
                <span className="size-1.5 rounded-full bg-primary/80 shrink-0" />
                <span>Strict NDA Privacy Protection</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-white/10 bg-white/5">
                <span className="size-1.5 rounded-full bg-primary/80 shrink-0" />
                <span>24/7 Senior Flight Liaison</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Sovereign Operational Pillars */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Pillar 1 */}
            <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.08]">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Crown className="size-5" />
              </div>
              <h3 className="mt-4 font-serif text-lg text-foreground font-medium">Palace Alliances</h3>
              <p className="mt-2 text-xs text-foreground/70 leading-relaxed font-light">
                Direct liaisons with Mewar and Rajputana heritage trusts, granting private chamber entries and closed-door dining.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.08]">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Plane className="size-5" />
              </div>
              <h3 className="mt-4 font-serif text-lg text-foreground font-medium">Private Aviation</h3>
              <p className="mt-2 text-xs text-foreground/70 leading-relaxed font-light">
                Turboprops, high-altitude mountain helicopters, and FBO tarmac escorts eliminating commercial transit friction.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.08]">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="mt-4 font-serif text-lg text-foreground font-medium">Sovereign NDA</h3>
              <p className="mt-2 text-xs text-foreground/70 leading-relaxed font-light">
                Client manifests, travel corridors, and security detail are guarded under strict non-disclosure legal covenants.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.08]">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Clock className="size-5" />
              </div>
              <h3 className="mt-4 font-serif text-lg text-foreground font-medium">24/7 Desk Liaison</h3>
              <p className="mt-2 text-xs text-foreground/70 leading-relaxed font-light">
                A personal operations director dedicated to your journey from initial brief through post-travel debriefing.
              </p>
            </div>
          </div>
        </div>

        {/* Atelier Key Metrics Banner */}
        <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-serif text-3xl sm:text-4xl text-primary font-normal">100%</div>
            <div className="mt-1 text-xs font-mono uppercase tracking-wider text-foreground/60">Bespoke Itineraries</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl text-foreground font-normal">15+</div>
            <div className="mt-1 text-xs font-mono uppercase tracking-wider text-foreground/60">Years Heritage Alliances</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl text-primary font-normal">4.9 / 5.0</div>
            <div className="mt-1 text-xs font-mono uppercase tracking-wider text-foreground/60">Guest Satisfaction Rating</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl text-foreground font-normal">&lt; 2 Hrs</div>
            <div className="mt-1 text-xs font-mono uppercase tracking-wider text-foreground/60">VIP Concierge Response</div>
          </div>
        </div>

        {/* Action Call to Action */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-primary/20 bg-primary/10 p-6 sm:p-8 backdrop-blur-md">
          <div>
            <h4 className="font-serif text-xl sm:text-2xl text-foreground font-normal">
              Planning a Sovereign Indian Expedition?
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-foreground/75 font-light">
              Connect confidentially with a senior concierge liaison to architect your bespoke journey.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary hover:bg-[#c5a030] text-primary-foreground font-semibold px-6 py-3.5 text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Consult Our Concierge</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
