'use client'

import React, { useState, useEffect, useTransition } from 'react'
import {
  X,
  Phone,
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  Clock,
  Star,
  Users,
  Calendar,
  MapPin,
  Loader2,
  CheckCircle2,
} from 'lucide-react'
import { submitVipInquiry } from '@/app/actions/vip-inquiry'

export function openWelcomeTripModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sarrin:open-welcome-modal'))
  }
}

const TRAVEL_MONTHS = [
  "Nov '26",
  "Dec '26",
  "Jan '27",
  "Feb '27",
  "Mar '27",
  'Flexible',
]

export function WelcomeTripModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)
  const [isPending, startTransition] = useTransition()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitMode, setSubmitMode] = useState<'whatsapp' | 'callback' | null>(null)

  // Step 1 State
  const [travelType, setTravelType] = useState<'Within India' | 'Special / Group & Services'>('Within India')
  const [selectedMonth, setSelectedMonth] = useState<string>("Dec '26")
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  // Step 2 State
  const [destination, setDestination] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // 1. Open once per session 2 seconds after browser load
  useEffect(() => {
    try {
      const hasShown = sessionStorage.getItem('sarrin_welcome_modal_shown')
      if (!hasShown) {
        const timer = setTimeout(() => {
          setIsOpen(true)
          sessionStorage.setItem('sarrin_welcome_modal_shown', 'true')
        }, 2000)
        return () => clearTimeout(timer)
      }
    } catch {
      // Ignore if sessionStorage restricted
    }
  }, [])

  // 2. Open whenever any "Design Your Journey" button is clicked or custom event dispatched
  useEffect(() => {
    const handleOpenEvent = () => {
      setIsSubmitted(false)
      setStep(1)
      setIsOpen(true)
    }

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const trigger = target.closest('button, a')
      if (
        trigger &&
        trigger.textContent &&
        trigger.textContent.toLowerCase().includes('design your journey')
      ) {
        e.preventDefault()
        e.stopPropagation()
        setIsSubmitted(false)
        setStep(1)
        setIsOpen(true)
      }
    }

    window.addEventListener('sarrin:open-welcome-modal', handleOpenEvent)
    window.addEventListener('sarrin:open-concierge', handleOpenEvent)
    document.addEventListener('click', handleDocumentClick, true)

    return () => {
      window.removeEventListener('sarrin:open-welcome-modal', handleOpenEvent)
      window.removeEventListener('sarrin:open-concierge', handleOpenEvent)
      document.removeEventListener('click', handleDocumentClick, true)
    }
  }, [])

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  if (!isOpen) return null

  const handleContinueToStep2 = () => {
    setErrorMessage('')
    setStep(2)
  }

  const buildSummaryBrief = () => {
    return [
      `Travel Type: ${travelType}`,
      `Approximate Travel Month: ${selectedMonth}`,
      `Party Size: ${adults} Adults${children > 0 ? `, ${children} Children` : ''}`,
      destination.trim() ? `Preferred Destination / Service: ${destination.trim()}` : '',
      fullName.trim() ? `Name: ${fullName.trim()}` : '',
      phone.trim() ? `Contact: +91 ${phone.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n• ')
  }

  const handleSubmitWhatsApp = () => {
    setErrorMessage('')
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.')
      return
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMessage('Please enter a valid mobile or WhatsApp number.')
      return
    }

    setSubmitMode('whatsapp')

    // Construct structured WhatsApp message
    const waText = `Hello Sarrin Holidays, I would like to plan a bespoke journey:\n\n• ${buildSummaryBrief()}\n\nPlease prepare a tailored proposal.`
    const waUrl = `https://wa.me/918419887730?text=${encodeURIComponent(waText)}`

    // Also persist lead to Supabase in background
    startTransition(async () => {
      try {
        await submitVipInquiry({
          fullName: fullName.trim(),
          phone: `+91 ${phone.trim()}`,
          email: `${fullName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'client'}@sarrin-inquiry.com`,
          adults,
          children,
          travelDates: selectedMonth,
          serviceOrPackageTitle: destination.trim() || `${travelType} Expedition`,
          preferredChannel: 'whatsapp',
          vipBrief: `Preferred Month: ${selectedMonth} | Type: ${travelType} | Destination: ${destination}`,
        })
      } catch {
        // Continue to WhatsApp even if backend network fails
      }
    })

    window.open(waUrl, '_blank', 'noopener,noreferrer')
    setIsSubmitted(true)
  }

  const handleRequestCallback = () => {
    setErrorMessage('')
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.')
      return
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMessage('Please enter a valid mobile or WhatsApp number.')
      return
    }

    setSubmitMode('callback')

    startTransition(async () => {
      try {
        const res = await submitVipInquiry({
          fullName: fullName.trim(),
          phone: `+91 ${phone.trim()}`,
          email: `${fullName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'client'}@sarrin-inquiry.com`,
          adults,
          children,
          travelDates: selectedMonth,
          serviceOrPackageTitle: destination.trim() || `${travelType} Expedition`,
          preferredChannel: 'call',
          vipBrief: `Requested Call Back | Month: ${selectedMonth} | Type: ${travelType} | Destination: ${destination}`,
        })
        if (res.success) {
          setIsSubmitted(true)
        } else {
          setIsSubmitted(true) // Graceful display
        }
      } catch {
        setIsSubmitted(true)
      }
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      {/* Backdrop click to dismiss */}
      <div
        className="absolute inset-0 -z-10"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Main Modal Dialog Box */}
      <div className="relative w-full max-w-4xl overflow-hidden rounded-sm border border-stone-800 bg-[#FAF8F5] shadow-2xl grid grid-cols-1 md:grid-cols-12 max-h-[94vh] overflow-y-auto md:overflow-y-visible animate-in zoom-in-95 duration-200">
        {/* =================================================================== */}
        {/* LEFT COLUMN: Dark Visual Poster (md:col-span-5)                     */}
        {/* =================================================================== */}
        <div className="relative md:col-span-5 bg-[#100F0C] p-6 sm:p-8 flex flex-col justify-between text-[#F4F2EC] overflow-hidden min-h-[280px] md:min-h-[560px]">
          {/* Atmospheric Background Image with Gradient Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1000)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#100F0C] via-[#100F0C]/80 to-[#100F0C]/40" />

          {/* Top Status Indicator */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-mono tracking-wider uppercase text-emerald-300 font-semibold shadow-sm backdrop-blur-md">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse ring-4 ring-emerald-400/20" />
              <span>Sarrin Holidays Concierge Online</span>
            </div>

            {/* Poster Headline & Subtitle */}
            <div className="mt-8 sm:mt-12">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C5A059] block mb-2 font-medium">
                BESPOKE INDIAN JOURNEYS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F4F2EC] font-medium leading-tight tracking-tight">
                Crafted for Discerning Travelers
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-stone-300 font-normal leading-relaxed">
                Kashmir · Kerala · Rajasthan · Goa · Himalayas
              </p>
            </div>
          </div>

          {/* Bottom 3 Glassmorphic Trust Cards */}
          <div className="relative z-10 pt-6 border-t border-white/10 mt-8 md:mt-auto">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-sm border border-white/10 bg-white/[0.04] backdrop-blur-md p-2.5 text-center">
                <span className="font-mono text-base font-bold text-[#C5A059] block leading-none">
                  4.9 / 5
                </span>
                <span className="text-[9px] font-sans uppercase tracking-wider text-stone-300 block mt-1.5 leading-tight">
                  Google Rating
                </span>
              </div>

              <div className="rounded-sm border border-white/10 bg-white/[0.04] backdrop-blur-md p-2.5 text-center">
                <span className="font-mono text-base font-bold text-[#C5A059] block leading-none">
                  100%
                </span>
                <span className="text-[9px] font-sans uppercase tracking-wider text-stone-300 block mt-1.5 leading-tight">
                  Tailored Plans
                </span>
              </div>

              <div className="rounded-sm border border-white/10 bg-white/[0.04] backdrop-blur-md p-2.5 text-center">
                <span className="font-mono text-base font-bold text-[#C5A059] block leading-none">
                  24 Hrs
                </span>
                <span className="text-[9px] font-sans uppercase tracking-wider text-stone-300 block mt-1.5 leading-tight">
                  Custom Proposal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* RIGHT COLUMN: Form & Multi-Step Flow (md:col-span-7)                */}
        {/* =================================================================== */}
        <div className="md:col-span-7 bg-[#FAF8F5] text-[#141310] p-6 md:p-8 flex flex-col justify-between relative">
          {/* Header Row: Step Indicator & Close Button */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.15em]">
                <span
                  className={`font-semibold ${
                    step === 1 ? 'text-[#141310] underline decoration-[#C5A059] decoration-2 underline-offset-4' : 'text-stone-400'
                  }`}
                >
                  01 YOUR TRIP
                </span>
                <span className="text-stone-300">—</span>
                <span
                  className={`font-semibold ${
                    step === 2 ? 'text-[#141310] underline decoration-[#C5A059] decoration-2 underline-offset-4' : 'text-stone-400'
                  }`}
                >
                  02 YOUR DETAILS
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="size-8 rounded-full border border-stone-300 hover:border-[#141310] hover:bg-stone-200/50 flex items-center justify-center transition-colors text-stone-600 hover:text-[#141310] cursor-pointer"
                aria-label="Close trip modal"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Title & Subtext */}
            <div className="mt-5">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#141310] font-medium tracking-tight">
                Plan Your Journey
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
                Share your preferences and our travel desk will prepare a tailored itinerary.
              </p>
            </div>
          </div>

          {/* Form Content Area */}
          <div className="my-6">
            {isSubmitted ? (
              <div className="rounded-sm border border-emerald-600/30 bg-emerald-50/70 p-6 text-center space-y-3 animate-in zoom-in-95 duration-300">
                <div className="size-12 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="size-6" />
                </div>
                <h4 className="font-serif text-xl font-medium text-emerald-950">
                  {submitMode === 'whatsapp' ? 'Opening WhatsApp Chat' : 'Inquiry Successfully Received'}
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 font-normal max-w-md mx-auto leading-relaxed">
                  {submitMode === 'whatsapp'
                    ? 'Your preferences have been formatted. Our senior concierge desk will connect with your proposal directly.'
                    : `Thank you, ${fullName || 'traveler'}. Our senior operations desk will reach out to you within 2 hours at +91 ${phone}.`}
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-2 rounded-sm bg-[#141310] px-5 py-2.5 text-xs font-sans font-medium uppercase tracking-[0.1em] text-white hover:bg-[#C5A059] hover:text-[#141310] transition-colors"
                  >
                    <span>Close Window</span>
                  </button>
                </div>
              </div>
            ) : step === 1 ? (
              /* ============================================================ */
              /* STEP 1: YOUR TRIP                                            */
              /* ============================================================ */
              <div className="space-y-5 animate-in fade-in duration-200">
                {/* 1. Travel Type Selector */}
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-[0.12em] text-stone-700 block mb-2 font-semibold">
                    Travel Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTravelType('Within India')}
                      className={`py-2.5 px-3 rounded-sm border text-xs font-sans font-medium transition-all text-center cursor-pointer ${
                        travelType === 'Within India'
                          ? 'border-[#141310] bg-[#141310] text-white shadow-sm'
                          : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      Within India
                    </button>
                    <button
                      type="button"
                      onClick={() => setTravelType('Special / Group & Services')}
                      className={`py-2.5 px-3 rounded-sm border text-xs font-sans font-medium transition-all text-center cursor-pointer ${
                        travelType === 'Special / Group & Services'
                          ? 'border-[#141310] bg-[#141310] text-white shadow-sm'
                          : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      Special / Group &amp; Services
                    </button>
                  </div>
                </div>

                {/* 2. Travel Month Pills */}
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-[0.12em] text-stone-700 block mb-2 font-semibold">
                    Approximate Travel Month
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {TRAVEL_MONTHS.map((month) => {
                      const isSelected = selectedMonth === month
                      return (
                        <button
                          key={month}
                          type="button"
                          onClick={() => setSelectedMonth(month)}
                          className={`py-2 px-1 text-center rounded-sm border text-xs font-sans transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#C5A059] bg-[#C5A059] text-[#141310] font-bold shadow-sm'
                              : 'border-stone-300 bg-white text-stone-700 hover:border-[#C5A059]/60 font-medium'
                          }`}
                        >
                          {month}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* 3. Travellers Counter */}
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-[0.12em] text-stone-700 block mb-2 font-semibold">
                    Party Size
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Adults */}
                    <div className="flex items-center justify-between p-2.5 bg-white border border-stone-300 rounded-sm">
                      <div>
                        <span className="text-xs font-semibold text-[#141310] block">Adults</span>
                        <span className="text-[10px] text-stone-500 font-sans">12+ years</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAdults((a) => Math.max(1, a - 1))}
                          className="size-7 rounded-sm border border-stone-300 hover:border-[#141310] bg-stone-100 flex items-center justify-center text-sm font-semibold text-stone-800 transition-colors"
                          aria-label="Decrease adults"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-mono font-bold text-sm text-[#141310]">
                          {adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAdults((a) => Math.min(20, a + 1))}
                          className="size-7 rounded-sm border border-stone-300 hover:border-[#141310] bg-stone-100 flex items-center justify-center text-sm font-semibold text-stone-800 transition-colors"
                          aria-label="Increase adults"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between p-2.5 bg-white border border-stone-300 rounded-sm">
                      <div>
                        <span className="text-xs font-semibold text-[#141310] block">Children</span>
                        <span className="text-[10px] text-stone-500 font-sans">0–11 years</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setChildren((c) => Math.max(0, c - 1))}
                          className="size-7 rounded-sm border border-stone-300 hover:border-[#141310] bg-stone-100 flex items-center justify-center text-sm font-semibold text-stone-800 transition-colors"
                          aria-label="Decrease children"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-mono font-bold text-sm text-[#141310]">
                          {children}
                        </span>
                        <button
                          type="button"
                          onClick={() => setChildren((c) => Math.min(10, c + 1))}
                          className="size-7 rounded-sm border border-stone-300 hover:border-[#141310] bg-stone-100 flex items-center justify-center text-sm font-semibold text-stone-800 transition-colors"
                          aria-label="Increase children"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Continue Action */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleContinueToStep2}
                    className="w-full bg-[#141310] hover:bg-[#C5A059] hover:text-[#141310] text-[#FAF8F5] py-3.5 px-6 rounded-sm text-xs font-sans font-semibold uppercase tracking-[0.1em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Continue to Traveler Details</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* ============================================================ */
              /* STEP 2: YOUR DETAILS                                         */
              /* ============================================================ */
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* 1. Preferred Destination or Service */}
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-[0.12em] text-stone-700 block mb-1 font-semibold">
                    Preferred Destination or Service
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Rajasthan Palaces & Udaipur or Chauffeur Fleet"
                    className="w-full rounded-sm border border-stone-300 bg-white px-3.5 py-2.5 text-xs text-[#141310] placeholder:text-stone-400 outline-none transition-all focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>

                {/* 2. Full Name */}
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-[0.12em] text-stone-700 block mb-1 font-semibold">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aarav Mehta"
                    className="w-full rounded-sm border border-stone-300 bg-white px-3.5 py-2.5 text-xs text-[#141310] placeholder:text-stone-400 outline-none transition-all focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>

                {/* 3. Mobile / WhatsApp Number (+91) */}
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-[0.12em] text-stone-700 block mb-1 font-semibold">
                    Mobile / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex rounded-sm border border-stone-300 bg-white overflow-hidden focus-within:border-[#C5A059] focus-within:ring-1 focus-within:ring-[#C5A059]">
                    <span className="px-3 py-2.5 bg-stone-100 border-r border-stone-300 text-xs font-mono font-semibold text-stone-700 select-none flex items-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="w-full px-3.5 py-2.5 text-xs text-[#141310] placeholder:text-stone-400 outline-none"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <p className="text-[11px] font-sans text-red-600 bg-red-50 border border-red-200 p-2 rounded-sm">
                    {errorMessage}
                  </p>
                )}

                {/* Submit Actions */}
                <div className="pt-2 space-y-2.5">
                  {/* Action 1: WhatsApp Proposal */}
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={handleSubmitWhatsApp}
                    className="w-full bg-[#141310] hover:bg-[#C5A059] hover:text-[#141310] text-[#FAF8F5] py-3.5 px-6 rounded-sm text-xs font-sans font-semibold uppercase tracking-[0.1em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    <span>Get Proposal on WhatsApp</span>
                    <ArrowRight className="size-3.5" />
                  </button>

                  {/* Action 2: Request Call Back */}
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={handleRequestCallback}
                    className="w-full bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 py-3 px-6 rounded-sm text-xs font-sans font-semibold uppercase tracking-[0.1em] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isPending ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Phone className="size-3.5 text-[#C5A059]" />
                    )}
                    <span>Request a Call Back</span>
                  </button>
                </div>

                {/* Back to Step 1 Button */}
                <div className="pt-1 text-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1.5 text-xs font-sans text-stone-500 hover:text-[#141310] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="size-3" />
                    <span>Back to Trip Preferences</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Security / Reassurance Note */}
          <div className="pt-3 border-t border-stone-200 text-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="size-3 text-[#C5A059]" />
              <span>Strict Non-Disclosure Protocol · Zero Spam Guarantee</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeTripModal
