'use client'

import React, { useState, useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
            <Link href="/" aria-label="Sarrin Holidays home" className="inline-flex items-start justify-center group">
              <Image
                src="/images/sarrin-logo.png"
                alt="Sarrin Holidays"
                width={160}
                height={44}
                className="h-11 w-auto object-contain"
              />
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

            {/* Theme-Matched Architectural Social Media Links */}
            <div className="pt-2 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#C5A059] block">
                Official Channels
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com/sarrinholidays"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 border border-white/15 bg-[#141310] text-[#B8B4AA] hover:border-[#C5A059] hover:text-[#C5A059] rounded-sm flex items-center justify-center transition-colors"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com/sarrinholidays"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 border border-white/15 bg-[#141310] text-[#B8B4AA] hover:border-[#C5A059] hover:text-[#C5A059] rounded-sm flex items-center justify-center transition-colors"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/sarrinholidays"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 border border-white/15 bg-[#141310] text-[#B8B4AA] hover:border-[#C5A059] hover:text-[#C5A059] rounded-sm flex items-center justify-center transition-colors"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com/@sarrinholidays"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 border border-white/15 bg-[#141310] text-[#B8B4AA] hover:border-[#C5A059] hover:text-[#C5A059] rounded-sm flex items-center justify-center transition-colors"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/918419887730"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 border border-white/15 bg-[#141310] text-[#B8B4AA] hover:border-[#C5A059] hover:text-[#C5A059] rounded-sm flex items-center justify-center transition-colors"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                  </svg>
                </a>
              </div>
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

            {/* "Coming Soon Mobile App" Card */}
            <div className="border border-[#C5A059]/30 bg-[#141310] p-4 rounded-sm mt-6 space-y-2.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#C5A059] font-semibold block">
                SARRIN CONCIERGE APP · COMING SOON
              </span>
              <p className="text-xs text-[#B8B4AA] font-normal leading-relaxed">
                Live itinerary tracking, offline vouchers, and one-tap concierge for iOS &amp; Android.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="border border-white/15 bg-[#0C0B09] px-3 py-1.5 text-[11px] text-white rounded-sm font-sans tracking-wide">
                  App Store · Soon
                </span>
                <span className="border border-white/15 bg-[#0C0B09] px-3 py-1.5 text-[11px] text-white rounded-sm font-sans tracking-wide">
                  Google Play · Soon
                </span>
              </div>
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

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-[#F4F2EC] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-[#F4F2EC] transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/refund-policy" className="hover:text-[#F4F2EC] transition-colors">
              Refund &amp; Cancellation
            </Link>
            <Link href="/sitemap" className="hover:text-[#F4F2EC] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
