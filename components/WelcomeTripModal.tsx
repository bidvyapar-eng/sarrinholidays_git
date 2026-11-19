'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react'
import { ArrowUpRight, Phone, X, CheckCircle2, Loader2 } from 'lucide-react'

const OPEN_EVENT = 'sarrin:open-welcome-modal'
const SESSION_KEY = 'sarrin_welcome_modal_shown'

type TravelType = 'Within India' | 'Special / Group & Services'

export function WelcomeTripModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<'trip' | 'details' | 'success'>('trip')
  const [submitting, setSubmitting] = useState(false)
  const [travelType, setTravelType] = useState<TravelType>('Within India')
  const [travelMonth, setTravelMonth] = useState<string>('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const MONTHS = [
    'Oct 2026',
    'Nov 2026',
    'Dec 2026',
    'Jan 2027',
    'Feb 2027',
    'Mar 2027',
    'Apr 2027',
    'May 2027',
  ]

  // Show once per session after 4-second delay
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY) === '1'
    if (alreadyShown || isOpen) return

    timerRef.current = setTimeout(() => {
      setIsOpen(true)
    }, 4000)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isOpen])

  // Listen for programmatic open from "Plan Your Trip" / "Design Your Journey" buttons
  useEffect(() => {
    const handleOpen = () => {
      sessionStorage.setItem(SESSION_KEY, '1')
      setIsOpen(true)
    }
    window.addEventListener(OPEN_EVENT, handleOpen)
    return () => window.removeEventListener(OPEN_EVENT, handleOpen)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    setStep('trip')
    setSubmitting(false)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) handleClose()
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const dispatchOpen = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, '1')
    setIsOpen(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const whatsappMessage = `Hello Sarrin Holidays, I'd like to plan a bespoke journey:\n\n• Travel Type: ${travelType}\n• Travel Month: ${travelMonth || 'Flexible'}\n• Party: ${adults} Adults, ${children} Children\n• Name: ${fullName}\n• Email: ${email}\n• Phone: ${phone}`
    const whatsappUrl = `https://wa.me/918419887730?text=${encodeURIComponent(whatsappMessage)}`

    setTimeout(() => {
      setSubmitting(false)
      setStep('success')
    }, 1200)

    // Open WhatsApp in a new tab after a brief moment
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    }, 1300)
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Plan Your Trip with Sarrin Holidays"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/40 backdrop-blur-sm"
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Panel */}
      <div
        className="relative z-10 w-full max-w-5xl h-[75vh] sm:h-[80vh] md:h-[85vh] rounded-[2rem] border border-white/20 bg-white shadow-2xl shadow-black/60 overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close welcome modal"
          className="absolute right-6 top-6 z-20 flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/80 text-[#1A1A1A] transition-colors hover:bg-white"
        >
          <X className="size-5" />
        </button>

        {/* Left Column: Atmosphere + Stats */}
        <div className="flex-1 bg-[#FAF8F5] p-6 sm:p-8 relative overflow-hidden">
          {/* Decorative ambient glow */}
          <div className="absolute -top-20 -right-20 size-64 rounded-full bg-[#C5A059]/10 blur-[120px]" />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="inline-flex items-center gap-2 rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 px-3 py-1 text-[11px] font-sans font-medium uppercase tracking-[0.1em] text-[#C5A059] mb-6">
                  <span className="size-2.5 rounded-full bg-[#22c55e] animate-pulse" />
                  <span>Sarrin Holidays Concierge Online</span>
                </span>

                <h2 className="font-serif font-medium text-3xl sm:text-4xl text-[#1A1A1A] leading-tight tracking-tight mb-4">
                  Plan Your Bespoke Indian Journey
                </h2>

                <p className="text-sm text-[#5C554A] font-normal leading-relaxed max-w-sm mb-8">
                  Share your travel vision and we’ll craft a personalised itinerary — no obligations, just expert guidance.
                </p>

                {/* Stat Tiles */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: '4.9 / 5', label: 'Google Rating' },
                    { value: '100%', label: 'Tailored Plans' },
                    { value: '24 Hrs', label: 'Custom Proposal' },
                  ].map((stat) => (
                    <div
                      key={stat.value}
                      className="p-4 rounded-sm border border-white/30 bg-white/60"
                    >
                      <div className="font-serif font-medium text-xl text-[#1A1A1A]">
                        {stat.value}
                      </div>
                      <div className="text-[10px] font-sans uppercase tracking-wider text-[#5C554A] mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Atmospheric destination photo */}
              <div className="mt-8 flex items-end justify-center">
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md rounded-xl overflow-hidden border border-white/40 shadow-xl">
                  <ImagePlaceholder />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 2-Step Form */}
        <div className="flex-1 bg-[#FAF8F5] p-6 sm:p-8 md:p-12 flex flex-col">
          {step === 'success' ? (
            <SuccessState />
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-8">
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded-sm border ${
                    step === 'trip'
                      ? 'border-[#C5A059] bg-[#C5A059]/10'
                      : 'border-white/20 bg-white/60'
                  }`}
                >
                  <span className="font-serif font-medium text-sm text-[#1A1A1A]">
                    {step === 'trip' ? '01' : '02'}
                  </span>
                  <span className="text-[11px] font-sans uppercase tracking-wider ${
                    step === 'trip'
                      ? 'text-[#C5A059] font-semibold'
                      : 'text-[#5C554A]'
                  }">
                    Your Trip
                  </span>
                </div>
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded-sm border ${
                    step === 'details'
                      ? 'border-[#C5A059] bg-[#C5A059]/10'
                      : 'border-white/20 bg-white/60'
                  }`}
                >
                  <span className="font-serif font-medium text-sm text-[#1A1A1A]">
                    {step === 'details' ? '02' : '—'}
                  </span>
                  <span className="text-[11px] font-sans uppercase tracking-wider ${
                    step === 'details'
                      ? 'text-[#C5A059] font-semibold'
                      : 'text-[#5C554A]'
                  }">
                    Your Details
                  </span>
                </div>
              </div>

              {/* Step 1: Your Trip */}
              {step === 'trip' && (
                <div className="flex-1 overflow-y-auto space-y-8">
                  <div>
                    <h3 className="font-serif font-medium text-2xl text-[#1A1A1A] mb-2">
                      What kind of journey?
                    </h3>
                    <p className="text-sm text-[#5C554A] font-normal">
                      Tell us the style of trip you have in mind.
                    </p>
                  </div>

                  {/* Travel Type */}
                  <div className="space-y-3">
                    <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#1A1A1A]">
                      Travel Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['Within India', 'Special / Group & Services'] as TravelType[]).map(
                        (tt) => {
                          const selected = travelType === tt
                          return (
                            <button
                              key={tt}
                              type="button"
                              onClick={() => setTravelType(tt)}
                              className={`px-4 py-3 rounded-sm border text-left transition-all text-sm font-medium ${
                                selected
                                  ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#1A1A1A]'
                                  : 'border-white/20 bg-white/60 text-[#5C554A] hover:border-[#C5A059]/50'
                              }`}
                            >
                              {tt}
                            </button>
                          )
                        }
                      )}
                    </div>
                  </div>

                  {/* Travel Month */}
                  <div className="space-y-3">
                    <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#1A1A1A]">
                      Travel Month
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {MONTHS.map((m) => {
                        const selected = travelMonth === m
                        return (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setTravelMonth(m)}
                            className={`px-3 py-2 rounded-sm border text-sm transition-all ${
                              selected
                                ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#1A1A1A] font-medium'
                                : 'border-white/20 bg-white/60 text-[#5C554A] hover:border-[#C5A059]/50'
                            }`}
                          >
                            {m}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Party Size */}
                  <div className="space-y-3">
                    <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#1A1A1A]">
                      Party Size
                    </label>
                    <div className="flex items-center gap-6">
                      <Counter
                        label="Adults"
                        value={adults}
                        onChange={setAdults}
                        min={1}
                      />
                      <Counter
                        label="Children"
                        value={children}
                        onChange={setChildren}
                        min={0}
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setStep('details')}
                      className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] px-6 py-3 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#1A1A1A] shadow-lg shadow-[#C5A059]/20 transition-all cursor-pointer"
                    >
                      Continue to Details
                      <ArrowUpRight className="size-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Your Details */}
              {step === 'details' && (
                <div className="flex-1 overflow-y-auto space-y-6">
                  <div>
                    <h3 className="font-serif font-medium text-2xl text-[#1A1A1A] mb-2">
                      Your Contact Details
                    </h3>
                    <p className="text-sm text-[#5C554A] font-normal">
                      We’ll reach out via WhatsApp or phone with your custom proposal.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1A1A1A]">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Aarav Mehta"
                        className="w-full rounded-sm border border-white/30 bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#5C554A]/50 outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1A1A1A]">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@domain.com"
                          className="w-full rounded-sm border border-white/30 bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#5C554A]/50 outline-none focus:border-[#C5A059]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#1A1A1A]">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-sm border border-white/30 bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#5C554A]/50 outline-none focus:border-[#C5A059]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`w-full inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-xs font-sans font-medium uppercase tracking-[0.1em] shadow-lg transition-all disabled:opacity-60 ${
                        submitting
                          ? 'bg-[#C5A059]/40 text-[#1A1A1A]/50 cursor-not-allowed'
                          : 'bg-[#C5A059] hover:bg-[#D4B475] text-[#1A1A1A] cursor-pointer'
                      }`}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin text-[#1A1A1A]" />
                          <span>Connecting to Concierge...</span>
                        </>
                      ) : (
                        <>
                          <span>Message on WhatsApp</span>
                          <ArrowUpRight className="size-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-center text-[10px] text-[#5C554A]/60 font-normal mt-2">
                    Or call us directly at <a href="tel:+918419887730" className="text-[#C5A059] font-medium">+91 84198 87730</a>
                  </p>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function Counter({
  label,
  value,
  onChange,
  min = 0,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#1A1A1A]">
          {label}
        </span>
        <span className="text-xs font-sans font-medium text-[#5C554A]">{value}</span>
      </div>
      <div className="flex items-center gap-2 border border-white/30 rounded-sm bg-white px-2 py-1">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="size-6 rounded-sm border border-transparent bg-white/60 text-[#1A1A1A] hover:bg-[#C5A059]/10 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          –
        </button>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="size-6 rounded-sm border border-transparent bg-white/60 text-[#1A1A1A] hover:bg-[#C5A059]/10"
        >
          +
        </button>
      </div>
    </div>
  )
}

function SuccessState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-12">
      <div className="flex size-16 items-center justify-center rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e]">
        <CheckCircle2 className="size-8" />
      </div>
      <h3 className="font-serif font-medium text-2xl text-[#1A1A1A]">
        Request Sent to Concierge
      </h3>
      <p className="text-sm text-[#5C554A] font-normal max-w-sm">
        Your journey details have been transmitted. A Sarrin Holidays Concierge will connect with you via WhatsApp shortly.
      </p>
      <button
        onClick={() => window.open('https://wa.me/918419887730', '_blank', 'noopener,noreferrer')}
        className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] px-6 py-3 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#1A1A1A] shadow-lg shadow-[#C5A059]/20 transition-all cursor-pointer"
      >
        <Phone className="size-4" />
        <span>Open WhatsApp Now</span>
      </button>
    </div>
  )
}

function ImagePlaceholder() {
  return (
    <div className="aspect-[4/3] w-full bg-gradient-to-br from-[#E9E3D8] via-[#F3EFE6] to-[#FAF8F5] relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-sans uppercase tracking-widest text-[#C5A059]/50">
          Sarrin Holidays · India
        </span>
      </div>
    </div>
  )
}

/**
 * Global dispatch helper to open the Welcome Trip Planner from any button.
 * Usage: import { openWelcomeTripModal } from '@/components/WelcomeTripModal';
 *        openWelcomeTripModal()
 */
export function openWelcomeTripModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(OPEN_EVENT))
  }
}
