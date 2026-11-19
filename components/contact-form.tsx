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
  ArrowUpRight,
} from 'lucide-react'
import { submitContactInquiry, type ContactActionResult } from '@/app/contact/actions'

export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<ContactActionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Form State (4 fields only)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [destination, setDestination] = useState('')
  const [notes, setNotes] = useState('')

  // Prefill when custom destination is passed from search bar
  const searchParams = useSearchParams()
  const customDest = searchParams?.get('destination')

  useEffect(() => {
    if (customDest) setDestination(customDest)
  }, [customDest])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !phone.trim() || !destination.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    const data = new FormData()
    data.set('name', name.trim())
    data.set('phone', phone.trim())
    data.set('email', '')
    data.set('subject', `Enquiry: ${destination.trim()}`)

    const formattedNotes = [
      `[Destination or Service: ${destination.trim()}]`,
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
        setDestination('')
        setNotes('')
      }
    })
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
    setName('')
    setPhone('')
    setDestination('')
    setNotes('')
  }

  const whatsappHref = `https://wa.me/918419887730?text=${encodeURIComponent(
    `Hello Sarrin Holidays, I would like to enquire about ${destination.trim()}.`
  )}`

  return (
    <div className="relative overflow-hidden rounded-sm border border-white/10 bg-[#141310] p-6 sm:p-8 lg:p-10 shadow-2xl">
      {/* Subtle Top Gold Accent Line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

      {/* Form Header */}
      <div className="border-b border-white/10 pb-6 mb-6">
        <span className="text-[10px] font-sans font-medium uppercase tracking-[0.1em] text-[#C5A059] block">
          Travel Enquiry
        </span>
        <h2 className="mt-1.5 font-serif text-2xl sm:text-3xl text-[#F4F2EC] font-medium tracking-tight">
          Request a Bespoke Itinerary
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#E5E2DC] font-normal leading-relaxed">
          Share your journey details below. A Sarrin Holidays Concierge will respond via WhatsApp or phone.
        </p>

        {customDest && (
          <div className="mt-4 rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 p-3.5 flex items-center gap-2 text-xs text-[#C5A059]">
            <span>Pre-selected: <strong className="text-[#F4F2EC] font-normal">&ldquo;{destination}&rdquo;</strong></span>
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
                Enquiry Received
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#E5E2DC] leading-relaxed max-w-md mx-auto font-normal">
              {result.message || 'Your enquiry has been received. A Sarrin Holidays Concierge will contact you directly.'}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={whatsappHref || 'https://wa.me/918419887730'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-sm bg-emerald-950/20 hover:bg-emerald-900/30 border border-emerald-500/30 px-6 py-3 text-xs font-sans font-medium uppercase tracking-[0.1em] text-emerald-300 transition-colors cursor-pointer text-center"
              >
                <PhoneCall className="size-3.5 text-emerald-400" />
                <span>Chat on WhatsApp Now</span>
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] px-6 py-3 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#0C0B09] transition-all cursor-pointer"
              >
                <span>Submit Another Request</span>
              </button>
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

            {/* 2. WhatsApp / Phone Number */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans font-medium text-[#E5E2DC] uppercase tracking-wider">
                WhatsApp / Phone Number *
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

            {/* 3. Destination or Service Required */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans font-medium text-[#E5E2DC] uppercase tracking-wider">
                Destination or Service Required *
              </label>
              <input
                type="text"
                name="destination"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Kerala Houseboat · Rajasthan Palace · Visa Assistance"
                className="w-full rounded-sm border border-white/15 bg-[#0C0B09] px-4 py-3 text-sm text-[#F4F2EC] placeholder-[#E5E2DC]/40 outline-none transition-all duration-200 hover:border-white/25 focus:border-[#C5A059]"
              />
            </div>

            {/* 4. Travel Month & Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-sans font-medium text-[#E5E2DC] uppercase tracking-wider">
                Travel Month & Notes
              </label>
              <textarea
                rows={3}
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. December 2026 · 4 guests · Celebration occasion · Special requests..."
                className="w-full rounded-sm border border-white/15 bg-[#0C0B09] px-4 py-3 text-sm text-[#F4F2EC] placeholder-[#E5E2DC]/40 outline-none transition-all duration-200 hover:border-white/25 focus:border-[#C5A059] resize-none leading-relaxed"
              />
            </div>

            {/* Primary Submit Button */}
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
                    <span>Send Enquiry</span>
                    <ArrowUpRight className="size-4 text-[#0C0B09]" />
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-[11px] text-[#E5E2DC]/70 font-normal leading-relaxed pt-1">
              Your enquiry is handled with personal discretion by our Nashik desk.
            </p>
          </form>
        )}
      </AnimatePresence>
    </div>
  )
}
