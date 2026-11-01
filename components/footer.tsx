'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Compass,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && email.includes('@')) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="relative border-t border-white/10 bg-slate-950 text-foreground overflow-hidden">
      {/* Subtle ambient gold radial gradient */}
      <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 size-[800px] rounded-full bg-primary/5 blur-[160px]" />

      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid gap-12 lg:grid-cols-5 md:grid-cols-2">
          {/* Column 1: Brand & Atelier Identity (2 cols on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="font-serif text-2xl sm:text-3xl font-light tracking-wider text-foreground">
                SARRIN <span className="italic text-primary font-normal">HOLIDAYS</span>
              </span>
            </Link>

            <p className="text-sm text-foreground/70 font-light leading-relaxed max-w-sm">
              India’s premier bespoke travel atelier. Curating living palace suites in Rajasthan,
              private aviation charters, secluded Kerala houseboat buyouts, and transformative
              Himalayan wellness sanctuaries under strict non-disclosure covenants.
            </p>

            {/* Direct Concierge Contact Strip */}
            <div className="space-y-2.5 pt-2 text-xs font-mono text-foreground/80">
              <div className="flex items-center gap-2.5">
                <MapPin className="size-4 text-primary shrink-0" />
                <span>Shop No 42, Jagtap Complex, Satpur, Nashik, Maharashtra - 422012</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="size-4 text-primary shrink-0" />
                <a href="tel:+918419887730" className="hover:text-primary transition-colors">
                  +91 8419887730 (Official Concierge Desk)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="size-4 text-primary shrink-0" />
                <a href="mailto:concierge@sarrinholidays.com" className="hover:text-primary transition-colors">
                  concierge@sarrinholidays.com
                </a>
              </div>
            </div>

            {/* Official MSME Enterprise Registration */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-mono text-primary">
              <ShieldCheck className="size-3.5 text-primary" />
              <span>MSME Registered: UDYAM-MH-23-0433487</span>
            </div>
          </div>

          {/* Column 2: Flagship Expeditions */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-primary font-semibold">
              Curated Circuits
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/75 font-light">
              <li>
                <Link href="/packages/kerala-gods-own-country-8d" className="hover:text-primary transition-colors">
                  Kerala — God’s Own Country (8D)
                </Link>
              </li>
              <li>
                <Link href="/packages/kashmir-paradise-valleys-7d" className="hover:text-primary transition-colors">
                  Kashmir — Paradise Valleys (7D)
                </Link>
              </li>
              <li>
                <Link href="/packages/kerala-backwaters-hills-5d" className="hover:text-primary transition-colors">
                  Kerala Backwaters & Hills (5D)
                </Link>
              </li>
              <li>
                <Link href="/packages/blissful-goa-beach-getaway-4d" className="hover:text-primary transition-colors">
                  Blissful Goa Getaway (4D)
                </Link>
              </li>
              <li>
                <Link href="/packages/experience-varanasi-dev-deepawali-3d" className="hover:text-primary transition-colors">
                  Varanasi Dev Deepawali (3D)
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/packages" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                  <span>View All Expeditions</span>
                  <ArrowRight className="size-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Atelier Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-primary font-semibold">
              Private Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/75 font-light">
              <li>
                <Link href="/services/private-aviation-charters" className="hover:text-primary transition-colors">
                  Private Aviation & Helicopters
                </Link>
              </li>
              <li>
                <Link href="/services/royal-celebrations-weddings" className="hover:text-primary transition-colors">
                  Palace Buyouts & Celebrations
                </Link>
              </li>
              <li>
                <Link href="/services/wellness-ayurveda-sanctuaries" className="hover:text-primary transition-colors">
                  Wellness & Ayurveda Sanctuaries
                </Link>
              </li>
              <li>
                <Link href="/services/vip-chauffeur-security" className="hover:text-primary transition-colors">
                  VIP Chauffeur & Armored Fleet
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/services" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                  <span>Explore Services Atelier</span>
                  <ArrowRight className="size-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: The Sarrin Gazette & Private Access */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-primary font-semibold">
              The Private Gazette
            </h4>
            <p className="text-xs text-foreground/70 font-light leading-relaxed">
              Confidential dispatches on seasonal palace buyouts, private aviation corridors, and new cultural expeditions.
            </p>

            {subscribed ? (
              <div className="rounded-xl border border-primary/40 bg-primary/10 p-3 text-xs text-primary font-mono flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>You are registered for our confidential seasonal dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter private email address..."
                    className="w-full rounded-xl border border-white/12 bg-white/5 px-3.5 py-2.5 text-xs text-foreground placeholder:text-foreground/40 outline-none transition-all focus:border-primary focus:bg-white/10"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 rounded-lg bg-primary hover:bg-[#c5a030] text-primary-foreground p-1.5 transition-colors cursor-pointer"
                    aria-label="Subscribe to Private Gazette"
                  >
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
                <span className="text-[10px] font-mono text-foreground/45 block">
                  Strictly non-commercial. Maximum 4 dispatches per year.
                </span>
              </form>
            )}

            {/* Quick Navigation Links */}
            <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground/60 font-mono">
              <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
              <Link href="/press" className="hover:text-primary transition-colors">Press Room</Link>
              <Link href="/blog" className="hover:text-primary transition-colors">The Journal</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
              <Link href="/feed.xml" target="_blank" className="hover:text-primary transition-colors">RSS Feed</Link>
              <Link href="/login" className="hover:text-primary transition-colors">Admin Portal</Link>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Compliance Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-foreground/50">
          <div className="flex flex-wrap items-center justify-center gap-4 text-center md:text-left">
            <span>© 2026 Sarrin Holidays Atelier Pvt. Ltd. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span>Accredited Indian Heritage Specialist</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/#about" className="hover:text-foreground transition-colors">
              Philosophy
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Discretion & NDA
            </Link>
            <Link href="/sitemap.xml" className="hover:text-foreground transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
