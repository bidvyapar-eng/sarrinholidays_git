'use client'

import React, { useState, useTransition, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  Check,
  PhoneCall,
  Loader2,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react'
import { submitContactInquiry, type ContactActionResult } from '@/app/contact/actions'

type TravelTier = 'Boutique Heritage' | 'Grand Luxury' | 'Presidential Charter'

export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<ContactActionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Form State
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [destinations, setDestinations] = useState('')
  const [selectedTier, setSelectedTier] = useState<TravelTier>('Grand Luxury')
  const [notes, setNotes] = useState('')

  // Prefill when custom destination lead is passed from search bar
  const searchParams = useSearchParams()
  const customDest = searchParams?.get('destination')
  const customDates = searchParams?.get('dates')
  const customGuests = searchParams?.get('guests')

  useEffect(() => {
    if (customDest) {
      const parts = [
        customDest,
        customDates ? customDates : null,
        customGuests ? customGuests : null,
      ].filter(Boolean)
      setDestinations(parts.join(' · '))
    }
  }, [customDest, customDates, customGuests])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !email.trim() || !phone.trim() || !destinations.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    const data = new FormData()
    data.set('name', name.trim())
    data.set('email', email.trim())
    data.set('phone', phone.trim())
    data.set('subject', `Bespoke Inquiry: ${destinations.trim()} [${selectedTier}]`)

    const formattedNotes = [
      `[Hospitality Tier: ${selectedTier}]`,
      `[Preferred Destinations & Timing: ${destinations.trim()}]`,
      notes.trim() ? `[Client Notes]:\n${notes.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n\n')

    data.set('message', formattedNotes)

    startTransition(async () => {
      const res = await submitContactInquiry(null, data)
      setResult(res)
      if (res.success) {
        setName('')
        setPhone('')
        setEmail('')
        setDestinations('')
        setNotes('')
      }
    })
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
    setName('')
    setPhone('')
    setEmail('')
    setDestinations('')
    setNotes('')
  }

  return (
    <div className="relative overflow-hidden rounded-sm border border-white/10 bg-[#141310] p-6 sm:p-8 lg:p-10 shadow-2xl">
      {/* Subtle Top Gold Accent Line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

      {/* Form Header */}
      <div className="border-b border-white/10 pb-6 mb-6">
        <span className="text-[10px] font-sans font-medium uppercase tracking-[0.1em] text-[#C5A059] block">
          Direct Atelier Consultation
        </span>
        <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl text-[#F4F2EC] font-medium tracking-tight">
          Request a Bespoke Itinerary
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#E5E2DC] font-normal leading-relaxed">
          Please register your journey vision below. A Senior Curatorial Director will prepare your custom proposal within 2 hours.
        </p>

        {customDest && (
          <div className="mt-4 rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 p-3.5 flex items-center gap-2 text-xs text-[#C5A059]">
            <Sparkles className="size-4 shrink-0 text-[#C5A059]" />
            <span>
              Pre-selected expedition for <strong className="text-[#F4F2EC] font-normal">&ldquo;{destinations}&rdquo;</strong>
            </span>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {result?.success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="rounded-sm border border-[#C5A059]/40 bg-[#0C0B09] p-8 text-center space-y-4"
          >
            <div className="mx-auto flex size-14 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 shadow-lg shadow-[#C5A059]/10">
              <Check className="size-7" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.1em] text-[#C5A059] font-sans font-medium">
                Reference: {result.referenceId}
              </span>
              <h3 className="font-serif font-medium text-2xl sm:text-3xl text-[#F4F2EC]">
                Dossier Transmitted
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#E5E2DC] leading-relaxed max-w-md mx-auto font-normal">
              {result.message || 'Your inquiry has been received into the Sarrin Holidays Operations Manifest. A Senior Curatorial Director will contact you directly.'}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] px-6 py-3 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#0C0B09] transition-all cursor-pointer"
              >
                <span>Submit Another Request</span>
              </button>
              <a
                href="tel:+918419887730"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-sm border border-white/10 bg-white/5 px-6 py-3 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#F4F2EC] hover:bg-white/10 transition-colors"
              >
                <PhoneCall className="size-3.5 text-[#C5A059]" />
                <span>Call Sarrin Holidays Desk</span>
              </a>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {(error || result?.error) && (
              <div className="rounded-sm border border-red-500/40 bg-red-500/10 p-3.5 flex items-start gap-2.5 text-xs text-red-300">
                <AlertCircle className="size-4 shrink-0 mt-0.5 text-red-400" />
                <p className="leading-snug">{error || result?.error}</p>
              </div>
            )}

            {/* 1. Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans font-medium text-[#E5E2DC] uppercase tracking-wider">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Mehta"
                className="w-full rounded-sm border border-white/15 bg-[#0C0B09] px-4 py-3 text-sm text-[#F4F2EC] placeholder-[#E5E2DC]/40 outline-none transition-all duration-200 hover:border-white/25 focus:border-[#C5A059]"
              />
            </div>

            {/* 2. Mobile / WhatsApp & 3. Email Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-sans font-medium text-[#E5E2DC] uppercase tracking-wider">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-sm border border-white/15 bg-[#0C0B09] px-4 py-3 text-sm text-[#F4F2EC] placeholder-[#E5E2DC]/40 outline-none transition-all duration-200 hover:border-white/25 focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-sans font-medium text-[#E5E2DC] uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full rounded-sm border border-white/15 bg-[#0C0B09] px-4 py-3 text-sm text-[#F4F2EC] placeholder-[#E5E2DC]/40 outline-none transition-all duration-200 hover:border-white/25 focus:border-[#C5A059]"
                />
              </div>
            </div>

            {/* 4. Preferred Destinations & Approximate Travel Month */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans font-medium text-[#E5E2DC] uppercase tracking-wider">
                Preferred Destinations &amp; Travel Timing *
              </label>
              <input
                type="text"
                name="destinations"
                required
                value={destinations}
                onChange={(e) => setDestinations(e.target.value)}
                placeholder="e.g. Udaipur & Jodhpur · December 2026 · 4 Guests"
                className="w-full rounded-sm border border-white/15 bg-[#0C0B09] px-4 py-3 text-sm text-[#F4F2EC] placeholder-[#E5E2DC]/40 outline-none transition-all duration-200 hover:border-white/25 focus:border-[#C5A059]"
              />
            </div>

            {/* 5. Travel Tier Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-sans font-medium text-[#E5E2DC] uppercase tracking-wider">
                Preferred Travel Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(['Boutique Heritage', 'Grand Luxury', 'Presidential Charter'] as const).map((tier) => {
                  const isSelected = selectedTier === tier
                  return (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setSelectedTier(tier)}
                      className={`py-2.5 px-3 rounded-sm border text-xs font-sans transition-all text-center cursor-pointer ${
                        isSelected
                          ? 'border-[#C5A059] bg-[#C5A059] text-[#0C0B09] shadow-md shadow-[#C5A059]/20 font-semibold'
                          : 'border-white/10 bg-[#0C0B09] text-[#E5E2DC] hover:border-white/25 hover:text-[#F4F2EC] font-medium'
                      }`}
                    >
                      {tier}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 6. Journey Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans font-medium text-[#E5E2DC] uppercase tracking-wider">
                Journey Notes (Optional)
              </label>
              <textarea
                rows={3}
                name="message"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share any hotel preferences, celebration occasions, or special requests..."
                className="w-full rounded-sm border border-white/15 bg-[#0C0B09] px-4 py-3 text-sm text-[#F4F2EC] placeholder-[#E5E2DC]/40 outline-none transition-all duration-200 hover:border-white/25 focus:border-[#C5A059] resize-none leading-relaxed"
              />
            </div>

            {/* 7. Primary Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] border border-[#C5A059]/50 py-3.5 px-6 text-xs font-sans font-semibold uppercase tracking-[0.1em] text-[#0C0B09] shadow-xl shadow-[#C5A059]/20 transition-all duration-300 disabled:opacity-60 cursor-pointer"
              >
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin text-[#0C0B09]" />
                    <span>Transmitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="size-3.5 text-[#0C0B09]" />
                    <span>Request Bespoke Itinerary</span>
                    <ArrowUpRight className="size-4 text-[#0C0B09]" />
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-[11px] text-[#E5E2DC]/70 font-normal leading-relaxed pt-1">
              All communications are safeguarded under strict non-disclosure covenants.
            </p>
          </form>
        )}
      </AnimatePresence>
    </div>
  )
}
