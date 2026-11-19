'use client'

import React, { useState, useTransition } from 'react'
import Link from 'next/link'
import { subscribeToNewsletter } from '@/app/actions/newsletter'
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
  Lock,
  Loader2,
  AlertCircle,
} from 'lucide-react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [feedbackMsg, setFeedbackMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.')
      return
    }

    startTransition(async () => {
      const res = await subscribeToNewsletter(email)
      if (res.success) {
        setSubscribed(true)
        setFeedbackMsg(res.message)
        setEmail('')
      } else {
        setErrorMsg(res.message || 'Unable to subscribe. Please try again.')
      }
    })
  }

  return (
    <footer className="relative border-t border-white/10 bg-[#0C0B09] text-foreground overflow-hidden">
      {/* Subtle ambient gold radial gradient */}
      <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 size-[800px] rounded-full bg-[#C5A059]/5 blur-[160px]" />

      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid gap-12 lg:grid-cols-5 md:grid-cols-2">
          {/* Column 1: Brand & Atelier Identity (2 cols on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex flex-col items-start justify-center group">
              <span className="font-serif text-3xl font-medium tracking-[0.1em] text-[#F4F2EC] leading-none">
                SARRIN
              </span>
              <span className="mt-1.5 text-[9px] font-medium tracking-[0.1em] text-[#C5A059] uppercase leading-none">
                HOLIDAYS · INDIA
              </span>
            </Link>

            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed max-w-sm">
              India’s premier bespoke travel atelier. Curating living palace suites in Rajasthan,
              private aviation charters, secluded Kerala houseboat buyouts, and transformative
              Himalayan wellness sanctuaries under strict non-disclosure covenants.
            </p>

            {/* Direct Sarrin Holidays Contact Strip */}
            <div className="space-y-2.5 pt-2 text-xs font-sans text-[#E5E2DC]">
              <div className="flex items-start gap-2.5">
                <MapPin className="size-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span className="leading-snug">Registered Headquarters: 42, Jagtap Complex, Satpur, Nashik, Maharashtra – 422012 (All other destinations operated remotely)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="size-4 text-[#C5A059] shrink-0" />
                <a href="tel:+918419887730" className="hover:text-[#F4F2EC] transition-colors">
                  +91 84198 87730 (Official Sarrin Holidays Desk)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="size-4 text-[#C5A059] shrink-0" />
                <a href="mailto:help@sarrinholidays.com" className="hover:text-[#F4F2EC] transition-colors">
                  help@sarrinholidays.com
                </a>
              </div>
            </div>

            {/* Official MSME Enterprise Registration */}
            <div className="inline-flex items-center gap-2 rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 px-3 py-1 text-[11px] font-sans font-medium text-[#C5A059]">
              <ShieldCheck className="size-3.5 text-[#C5A059]" />
              <span>MSME Registered: UDYAM-MH-23-0433487</span>
            </div>
          </div>

          {/* Column 2: Flagship Expeditions */}
          <div className="space-y-4">
            <h4 className="text-xs font-sans uppercase tracking-[0.1em] text-[#C5A059] font-semibold">
              Curated Circuits
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#E5E2DC] font-normal">
              <li>
                <Link href="/packages/kerala-gods-own-country-8d" className="hover:text-[#F4F2EC] transition-colors">
                  Kerala — God’s Own Country (8D)
                </Link>
              </li>
              <li>
                <Link href="/packages/kashmir-paradise-valleys-7d" className="hover:text-[#F4F2EC] transition-colors">
                  Kashmir — Paradise Valleys (7D)
                </Link>
              </li>
              <li>
                <Link href="/packages/kerala-backwaters-hills-5d" className="hover:text-[#F4F2EC] transition-colors">
                  Kerala Backwaters & Hills (5D)
                </Link>
              </li>
              <li>
                <Link href="/packages/blissful-goa-beach-getaway-4d" className="hover:text-[#F4F2EC] transition-colors">
                  Blissful Goa Coastal & Heritage Escape (4D)
                </Link>
              </li>
              <li>
                <Link href="/packages/experience-varanasi-dev-deepawali-3d" className="hover:text-[#F4F2EC] transition-colors">
                  Varanasi Dev Deepawali (3D)
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/#destinations" className="text-[#C5A059] hover:underline font-medium inline-flex items-center gap-1">
                  <span>View All Expeditions</span>
                  <ArrowRight className="size-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Atelier Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-sans uppercase tracking-[0.1em] text-[#C5A059] font-semibold">
              Private Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#E5E2DC] font-normal">
              <li>
                <Link href="/services/private-aviation-charters" className="hover:text-[#F4F2EC] transition-colors">
                  Private Aviation & Helicopters
                </Link>
              </li>
              <li>
                <Link href="/services/royal-celebrations-weddings" className="hover:text-[#F4F2EC] transition-colors">
                  Palace Buyouts & Celebrations
                </Link>
              </li>
              <li>
                <Link href="/services/wellness-ayurveda-sanctuaries" className="hover:text-[#F4F2EC] transition-colors">
                  Wellness & Ayurveda Sanctuaries
                </Link>
              </li>
              <li>
                <Link href="/services/vip-chauffeur-security" className="hover:text-[#F4F2EC] transition-colors">
                  VIP Chauffeur & Private Fleet
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/services" className="text-[#C5A059] hover:underline font-medium inline-flex items-center gap-1">
                  <span>Explore Services Atelier</span>
                  <ArrowRight className="size-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: The Sarrin Gazette & Private Access */}
          <div className="space-y-4">
            <h4 className="text-xs font-sans uppercase tracking-[0.1em] text-[#C5A059] font-semibold">
              The Private Gazette
            </h4>
            <p className="text-xs text-[#E5E2DC] font-normal leading-relaxed">
              Confidential dispatches on seasonal palace buyouts, private aviation corridors, and new cultural expeditions.
            </p>

            {subscribed ? (
              <div className="rounded-sm border border-[#C5A059]/40 bg-[#C5A059]/10 p-3 text-xs text-[#C5A059] font-sans flex items-center gap-2.5">
                <span className="size-1.5 rounded-full bg-[#C5A059] shrink-0" />
                <span>{feedbackMsg || 'You are registered for our confidential seasonal dispatch.'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    disabled={isPending}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter private email address..."
                    className="w-full rounded-sm border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-foreground placeholder:text-[#E5E2DC]/50 outline-none transition-all focus:border-[#C5A059] focus:bg-white/10 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isPending}
                    className="absolute right-1 top-1 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] text-[#0C0B09] p-2 transition-colors cursor-pointer disabled:opacity-50"
                    aria-label="Subscribe to Private Gazette"
                  >
                    {isPending ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <ArrowRight className="size-3.5" />
                    )}
                  </button>
                </div>
                {errorMsg && (
                  <div className="flex items-center gap-1.5 text-[11px] font-sans text-red-400">
                    <AlertCircle className="size-3 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}
                <span className="text-[10px] font-sans text-[#E5E2DC]/60 block">
                  Strictly non-commercial. Maximum 4 dispatches per year.
                </span>
              </form>
            )}

            {/* Quick Navigation Links */}
            <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#E5E2DC] font-sans">
              <Link href="/#about" className="hover:text-[#F4F2EC] transition-colors">About Us</Link>
              <Link href="/contact" className="hover:text-[#F4F2EC] transition-colors">Press Room</Link>
              <Link href="/blog" className="hover:text-[#F4F2EC] transition-colors">The Journal</Link>
              <Link href="/contact" className="hover:text-[#F4F2EC] transition-colors">Contact</Link>
              <Link href="/feed.xml" target="_blank" className="hover:text-[#F4F2EC] transition-colors">RSS Feed</Link>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Compliance Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-[#E5E2DC]/70">
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
