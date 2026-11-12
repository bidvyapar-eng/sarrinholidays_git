'use client'

import React, { useState, useTransition, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  CheckCircle2,
  PhoneCall,
  Mail,
  User,
  Phone,
  MessageSquare,
  ArrowUpRight,
  Loader2,
  Clock,
  Check,
  AlertCircle,
  Globe,
  Plane,
  Building2,
  Car,
  Train,
  MapPin,
  Compass,
  Calendar,
  Sparkles,
} from 'lucide-react'
import { submitContactInquiry, type ContactActionResult } from '@/app/contact/actions'
import { ENABLE_GLOBAL_CONCIERGE } from '@/lib/features.config'
import {
  INDIAN_ORIGIN_HUBS,
  DOMESTIC_TRANSIT_OPTIONS,
  SEASONS,
} from '@/components/service-drawer'

const INQUIRY_CATEGORIES = [
  'International / NRI Multi-City Odyssey',
  'Bespoke Multi-Region Itinerary',
  'Private Aviation & Mountain Charters',
  'Royal Palace Buyouts & Celebrations',
  'Wellness & Ayurveda Sanctuaries',
  'VIP Chauffeur & Executive Security',
]

export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<ContactActionResult | null>(null)
  const [selectedDesk, setSelectedDesk] = useState<'domestic' | 'nri'>('domestic')

  // Indian domestic traveler preferences
  const [departureCity, setDepartureCity] = useState<string>('Mumbai')
  const [customDepartureCity, setCustomDepartureCity] = useState<string>('')
  const [transitPreference, setTransitPreference] = useState<string>('Private Chauffeur Fleet')
  const [selectedSeason, setSelectedSeason] = useState<string>(SEASONS[0].label)
  const [phoneDigits, setPhoneDigits] = useState<string>('')
  const [phoneError, setPhoneError] = useState<string | null>(null)

  // Out of the box search lead detection
  const searchParams = useSearchParams()
  const customDest = searchParams?.get('destination')
  const customDates = searchParams?.get('dates')
  const customGuests = searchParams?.get('guests')

  const visibleCategories = useMemo(() => {
    if (ENABLE_GLOBAL_CONCIERGE) return INQUIRY_CATEGORIES
    return INQUIRY_CATEGORIES.filter(
      (cat) => !cat.toLowerCase().includes('international') && !cat.toLowerCase().includes('nri')
    )
  }, [])

  const [selectedCategory, setSelectedCategory] = useState(
    ENABLE_GLOBAL_CONCIERGE ? INQUIRY_CATEGORIES[0] : 'Bespoke Multi-Region Itinerary'
  )

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  // Prefill when custom destination lead is passed from search bar
  useEffect(() => {
    if (customDest) {
      setSelectedCategory('Bespoke Multi-Region Itinerary')
      setFormData((prev) => {
        if (prev.message) return prev
        const datesPart = customDates ? ` Preferred travel dates: ${customDates}.` : ''
        const guestsPart = customGuests ? ` Party size: ${customGuests}.` : ''
        return {
          ...prev,
          message: `I am requesting a bespoke itinerary for ${customDest}.${datesPart}${guestsPart} Please call me to tailor accommodations, transit, and private experiences.`,
        }
      })
    }
  }, [customDest, customDates, customGuests])

  // Indian mobile validation (+91, 10 digits starting with 6, 7, 8, or 9)
  const isIndianMobileValid = (num: string) => /^[6-9]\d{9}$/.test(num)

  const handlePhoneChange = (val: string) => {
    let clean = val.replace(/\D/g, '')
    if (clean.length === 12 && clean.startsWith('91')) {
      clean = clean.slice(2)
    } else if (clean.length === 11 && clean.startsWith('0')) {
      clean = clean.slice(1)
    }
    setPhoneDigits(clean.slice(0, 10))
    if (phoneError) setPhoneError(null)
  }

  const formattedPhoneDisplay =
    phoneDigits.length > 5
      ? `${phoneDigits.slice(0, 5)} ${phoneDigits.slice(5)}`
      : phoneDigits

  const isPhoneValid = isIndianMobileValid(phoneDigits)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPhoneError(null)

    if (!isPhoneValid) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number (+91 format, starting with 6, 7, 8, or 9).')
      return
    }

    const form = e.currentTarget
    const data = new FormData(form)

    const resolvedHub =
      departureCity === 'Other City'
        ? (customDepartureCity.trim() || 'Other Indian Hub')
        : departureCity

    const subjectPrefix = ENABLE_GLOBAL_CONCIERGE
      ? `[${selectedDesk === 'nri' ? 'NRI / GLOBAL' : 'DOMESTIC INDIA'}] `
      : `[${resolvedHub} | ${transitPreference}] `

    data.set('subject', `${subjectPrefix}${selectedCategory} (${selectedSeason})`)
    data.set('phone', `+91 ${phoneDigits.slice(0, 5)} ${phoneDigits.slice(5)}`.trim())
    data.set('departureCity', departureCity)
    data.set('customDepartureCity', customDepartureCity)
    data.set('transitPreference', transitPreference)

    startTransition(async () => {
      const res = await submitContactInquiry(null, data)
      setResult(res)
      if (res.success) {
        setFormData({ name: '', email: '', message: '' })
        setPhoneDigits('')
        setCustomDepartureCity('')
      }
    })
  }

  const handleReset = () => {
    setResult(null)
    setFormData({ name: '', email: '', message: '' })
    setPhoneDigits('')
    setPhoneError(null)
    setCustomDepartureCity('')
  }

  return (
    <div className="space-y-8">
      {/* ======================================================================= */}
      {/* 1. SLEEK ARCHITECTURAL CONTACT FORM */}
      {/* ======================================================================= */}
      <div className="relative overflow-hidden rounded-sm border border-white/10 bg-[#141310] p-8 lg:p-10 shadow-2xl transition-all duration-300">
        {/* Subtle Top Gold Hairline */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-[#C5A059]/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-[#C5A059]/5 blur-[100px]" />

        {/* Form Header */}
        <div className="relative z-10 border-b border-white/10 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 px-3 py-0.5 text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-[#C5A059]">
              Direct Operations Brief
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-sans uppercase tracking-wider text-[#B8B4AA]">
              <Clock className="size-3 text-[#C5A059]" />
              SLA: &lt; 2 Hours
            </span>
          </div>

          <h3 className="mt-3 font-serif font-light text-2xl sm:text-3xl text-[#F4F2EC]">
            Initiate Confidential Inquiry
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-[#B8B4AA] font-light leading-relaxed">
            Please register your journey vision below. Your dossier will be assigned directly to a Senior Curatorial Director.
          </p>

          {customDest && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 p-4"
            >
              <div className="flex items-center gap-2 text-[#C5A059] font-serif text-sm font-light">
                <Sparkles className="size-4 text-[#C5A059]" />
                <span>Bespoke Destination Lead Request</span>
              </div>
              <p className="mt-1 text-xs text-[#B8B4AA] leading-relaxed font-light">
                You requested a custom journey for <strong className="text-[#F4F2EC] font-normal">&ldquo;{customDest}&rdquo;</strong>
                {customDates && ` (${customDates})`}
                {customGuests && ` • ${customGuests}`}. Complete your details below to receive a direct consultation.
              </p>
            </motion.div>
          )}
        </div>

        {/* Form Body */}
        <div className="relative z-10 pt-6">
          <AnimatePresence mode="wait">
            {result?.success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="rounded-sm border border-[#C5A059]/40 bg-[#141310] p-8 sm:p-10 text-center space-y-4"
              >
                <div className="mx-auto flex size-14 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 shadow-lg shadow-[#C5A059]/10">
                  <Check className="size-7" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-sans font-medium">
                    Reference: {result.referenceId}
                  </span>
                  <h4 className="font-serif font-light text-2xl sm:text-3xl text-[#F4F2EC]">
                    Dossier Transmitted
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-[#B8B4AA] leading-relaxed max-w-md mx-auto font-light">
                  {result.message} Your parameters have been entered into the Sarrin Holidays Operations Manifest. Expect a discreet liaison via phone or encrypted email.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] px-6 py-3 text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#0C0B09] transition-all cursor-pointer"
                  >
                    <span>Submit Another Inquiry</span>
                  </button>
                  <a
                    href="tel:+918419887730"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-sm border border-white/10 bg-white/5 px-6 py-3 text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#F4F2EC] hover:bg-white/10 transition-colors"
                  >
                    <PhoneCall className="size-3.5 text-[#C5A059]" />
                    <span>Direct Concierge Phone</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {result?.error && (
                  <div className="rounded-sm border border-red-500/40 bg-red-500/10 p-3.5 flex items-start gap-2.5 text-xs text-red-300">
                    <AlertCircle className="size-4 shrink-0 mt-0.5 text-red-400" />
                    <p className="leading-snug">{result.error}</p>
                  </div>
                )}

                {/* Desk Routing Selector (Controlled by Feature Flag) */}
                {ENABLE_GLOBAL_CONCIERGE && (
                  <>
                    <div className="space-y-2">
                      <label className="block text-xs font-sans font-medium text-[#B8B4AA] uppercase tracking-wider">
                        Select Concierge Routing Desk
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setSelectedDesk('domestic')}
                          className={`flex items-center justify-center gap-2 rounded-sm py-2.5 px-3 text-xs font-sans font-medium uppercase tracking-wider transition-all cursor-pointer ${
                            selectedDesk === 'domestic'
                              ? 'border border-[#C5A059] bg-[#C5A059]/15 text-[#C5A059] shadow-md shadow-[#C5A059]/10'
                              : 'border border-white/10 bg-[#0C0B09] text-[#B8B4AA] hover:border-white/25 hover:text-[#F4F2EC]'
                          }`}
                        >
                          <Building2 className="size-3.5" />
                          <span>Domestic (India)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedDesk('nri')}
                          className={`flex items-center justify-center gap-2 rounded-sm py-2.5 px-3 text-xs font-sans font-medium uppercase tracking-wider transition-all cursor-pointer ${
                            selectedDesk === 'nri'
                              ? 'border border-[#C5A059] bg-[#C5A059]/15 text-[#C5A059] shadow-md shadow-[#C5A059]/10'
                              : 'border border-white/10 bg-[#0C0B09] text-[#B8B4AA] hover:border-white/25 hover:text-[#F4F2EC]'
                          }`}
                        >
                          <Plane className="size-3.5" />
                          <span>International / NRI</span>
                        </button>
                      </div>
                    </div>

                    {/* International / NRI Logistical Reassurance Banner */}
                    {selectedDesk === 'nri' && (
                      <div className="rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 p-3.5 flex items-start gap-2.5 text-xs text-[#F4F2EC] animate-in fade-in duration-200">
                        <Globe className="size-4 shrink-0 text-[#C5A059] mt-0.5" />
                        <div>
                          <span className="font-sans font-medium text-[#C5A059] text-[10px] uppercase tracking-wider block">
                            Cross-Border Concierge Routing Active
                          </span>
                          <p className="text-[11px] text-[#B8B4AA] mt-0.5 leading-snug font-light">
                            Your inquiry is assigned directly to our Global NRI Desk. We coordinate international arrival flights into DEL/BOM/BLR (with VIP tarmac meet &amp; greet) and assist with Indian e-visa pre-clearance advisory.
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Field 1: Domestic Holiday Presets & Seasonality */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-sans font-medium text-[#B8B4AA] uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-[#C5A059]" /> Indian Holiday Calendar &amp; Seasonality
                    </label>
                    <span className="text-[10px] font-sans uppercase tracking-wider text-[#C5A059]/80">Festive Windows</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SEASONS.map((s) => {
                      const isSel = selectedSeason === s.label
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSelectedSeason(s.label)}
                          className={`p-2.5 rounded-sm border text-left transition-all cursor-pointer ${
                            isSel
                              ? 'border-[#C5A059] bg-[#C5A059]/15 shadow-sm text-[#C5A059]'
                              : 'border-white/10 bg-[#0C0B09] text-[#B8B4AA] hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-sans font-medium">
                            <span>{s.label}</span>
                            {isSel && <Check className="size-3 text-[#C5A059]" />}
                          </div>
                          <span className="text-[9px] font-sans uppercase tracking-wider text-[#B8B4AA]/60 block mt-0.5">{s.subtitle}</span>
                          <span className={`inline-block mt-1.5 px-1.5 py-0.5 text-[9px] font-sans rounded-sm border ${s.urgencyClass}`}>
                            {s.urgencyBadge}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Field 2: Inquiry Classification Pills */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-sans font-medium text-[#B8B4AA] uppercase tracking-wider">
                    Inquiry Classification
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {visibleCategories.map((cat) => {
                      const isSelected = selectedCategory === cat
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedCategory(cat)}
                          className={`rounded-sm px-3.5 py-1.5 text-[11px] font-sans font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-[#C5A059] text-[#0C0B09] border border-[#C5A059] shadow-sm'
                              : 'bg-[#0C0B09] text-[#B8B4AA] border border-white/10 hover:border-white/25 hover:text-[#F4F2EC]'
                          }`}
                        >
                          {cat}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Field 3: Primary Indian Origin Hub (Departure City) */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-sans font-medium text-[#B8B4AA] uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-[#C5A059]" /> Primary Indian Origin Hub (Departure City)
                    </label>
                    <span className="text-[10px] font-sans uppercase tracking-wider text-[#C5A059]/80">Domestic Hub</span>
                  </div>

                  {/* Quick chips */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {INDIAN_ORIGIN_HUBS.map((hub) => {
                      const isSel = departureCity === hub.name
                      return (
                        <button
                          key={hub.id}
                          type="button"
                          onClick={() => setDepartureCity(hub.name)}
                          className={`p-2 rounded-sm border text-center transition-all cursor-pointer ${
                            isSel
                              ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#C5A059] font-medium shadow-sm'
                              : 'border-white/10 bg-[#0C0B09] text-[#B8B4AA] hover:border-white/20'
                          }`}
                        >
                          <span className="block text-xs font-sans truncate">{hub.name}</span>
                          <span className="block text-[10px] font-sans uppercase text-[#B8B4AA]/50">{hub.code}</span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Dropdown fallback */}
                  <select
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className="w-full rounded-sm border border-white/15 bg-[#0C0B09] px-4 py-3 min-h-[48px] text-[16px] md:text-sm text-[#F4F2EC] outline-none transition-all duration-300 hover:border-white/25 focus:border-[#C5A059] cursor-pointer"
                  >
                    {INDIAN_ORIGIN_HUBS.map((hub) => (
                      <option key={hub.id} value={hub.name} className="bg-[#141310] text-[#F4F2EC]">
                        {hub.name} ({hub.code}) — {hub.state}
                      </option>
                    ))}
                  </select>

                  {departureCity === 'Other City' && (
                    <div className="space-y-1.5 pt-1">
                      <label className="text-xs font-sans uppercase tracking-wider text-[#B8B4AA] font-medium">
                        Specify Origin City / Airstrip *
                      </label>
                      <input
                        type="text"
                        required
                        value={customDepartureCity}
                        onChange={(e) => setCustomDepartureCity(e.target.value)}
                        placeholder="e.g., Jaipur, Surat, Chandigarh, Kochi, Indore, Lucknow..."
                        className="w-full rounded-sm border border-white/15 bg-[#0C0B09] px-4 py-3 min-h-[48px] text-[16px] md:text-sm text-[#F4F2EC] placeholder-[#B8B4AA]/40 outline-none transition-all duration-300 hover:border-white/25 focus:border-[#C5A059]"
                      />
                    </div>
                  )}
                </div>

                {/* Field 4: Domestic Luxury Transit Preferences */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-sans font-medium text-[#B8B4AA] uppercase tracking-wider flex items-center gap-1.5">
                      <Compass className="size-3.5 text-[#C5A059]" /> Domestic Luxury Transit Preference
                    </label>
                    <span className="text-[10px] font-sans uppercase tracking-wider text-[#C5A059]/80">Private Leg</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {DOMESTIC_TRANSIT_OPTIONS.map((opt) => {
                      const isSel = transitPreference === opt.title
                      const Icon = opt.id === 'chauffeur' ? Car : opt.id === 'charter' ? Plane : Train
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setTransitPreference(opt.title)}
                          className={`p-3 rounded-sm border text-left transition-all cursor-pointer relative ${
                            isSel
                              ? 'border-[#C5A059] bg-[#C5A059]/15 shadow-sm'
                              : 'border-white/10 bg-[#0C0B09] hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className={`flex size-6 items-center justify-center rounded-sm ${isSel ? 'bg-[#C5A059] text-[#0C0B09]' : 'bg-white/10 text-[#C5A059]'}`}>
                              <Icon className="size-3.5" />
                            </div>
                            <span className={`text-[9px] font-sans uppercase px-2 py-0.5 rounded-sm border ${isSel ? 'border-[#C5A059]/40 text-[#C5A059] bg-[#C5A059]/10' : 'border-white/10 text-[#B8B4AA]/60 bg-white/5'}`}>
                              {opt.badge}
                            </span>
                          </div>
                          <span className={`text-xs font-sans font-medium block ${isSel ? 'text-[#C5A059]' : 'text-[#F4F2EC]'}`}>
                            {opt.title}
                          </span>
                          <p className="text-[10px] text-[#B8B4AA] mt-0.5 leading-snug font-light">
                            {opt.desc}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Field 5: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-sans font-medium text-[#B8B4AA] uppercase tracking-wider">
                      <User className="size-3.5 text-[#C5A059]" /> Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aarav Mehta"
                      className="w-full rounded-sm border border-white/15 bg-[#0C0B09] px-4 py-3 min-h-[48px] text-[16px] md:text-sm text-[#F4F2EC] placeholder-[#B8B4AA]/40 outline-none transition-all duration-300 hover:border-white/25 focus:border-[#C5A059]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-sans font-medium text-[#B8B4AA] uppercase tracking-wider">
                      <Mail className="size-3.5 text-[#C5A059]" /> Private Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="aarav@domain.com"
                      className="w-full rounded-sm border border-white/15 bg-[#0C0B09] px-4 py-3 min-h-[48px] text-[16px] md:text-sm text-[#F4F2EC] placeholder-[#B8B4AA]/40 outline-none transition-all duration-300 hover:border-white/25 focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                {/* Field 6: Strict Indian Mobile Validation (+91, 10 Digits) */}
                <div className="space-y-1.5">
                  <label className="flex items-center justify-between text-xs font-sans font-medium text-[#B8B4AA] uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Phone className="size-3.5 text-[#C5A059]" /> Direct Indian Mobile / WhatsApp *
                    </span>
                    <span className="text-[10px] font-sans uppercase tracking-wider text-[#C5A059]/80">Strict +91 (10 Digits)</span>
                  </label>

                  <div className="relative flex items-center">
                    {/* +91 Fixed Badge */}
                    <div className="flex min-h-[48px] items-center gap-1.5 px-3.5 py-3 rounded-l-sm border border-r-0 border-white/15 bg-[#141310] text-[#F4F2EC] text-[16px] md:text-sm font-sans select-none">
                      <span className="text-[11px] font-sans font-semibold tracking-wider text-[#B8B4AA]">IND</span>
                      <span className="font-medium text-[#C5A059]">+91</span>
                    </div>

                    {/* 10-Digit Mobile Input */}
                    <input
                      type="tel"
                      inputMode="numeric"
                      required
                      value={formattedPhoneDisplay}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="98200 44810"
                      maxLength={11} // 10 digits + 1 space
                      className={`w-full rounded-r-sm border border-white/15 bg-[#0C0B09] px-4 py-3 min-h-[48px] text-[16px] md:text-sm text-[#F4F2EC] font-sans placeholder-[#B8B4AA]/40 outline-none transition-all duration-300 hover:border-white/25 ${
                        isPhoneValid
                          ? 'border-emerald-500/60 focus:border-emerald-400'
                          : phoneDigits.length > 0
                          ? 'border-amber-500/50 focus:border-amber-400'
                          : 'focus:border-[#C5A059]'
                      }`}
                    />

                    {/* Real-time Status Icon */}
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      {isPhoneValid ? (
                        <CheckCircle2 className="size-4 text-emerald-400" />
                      ) : phoneDigits.length > 0 ? (
                        <AlertCircle className="size-4 text-amber-400" />
                      ) : null}
                    </div>
                  </div>

                  {/* Real-time Validation Message */}
                  <div className="pt-0.5">
                    {phoneDigits.length === 0 ? (
                      <span className="text-[11px] text-[#B8B4AA]/60 font-sans">
                        Enter 10-digit Indian mobile number (e.g., 98200 44810)
                      </span>
                    ) : isPhoneValid ? (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-sans">
                        <CheckCircle2 className="size-3.5 shrink-0" />
                        <span>Verified Indian domestic mobile (+91 {formattedPhoneDisplay})</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 font-sans">
                        <AlertCircle className="size-3.5 shrink-0" />
                        <span>
                          {phoneDigits[0] && !['6', '7', '8', '9'].includes(phoneDigits[0])
                            ? 'Indian mobile numbers must start with 6, 7, 8, or 9'
                            : `10 digits required (${10 - phoneDigits.length} more needed)`}
                        </span>
                      </div>
                    )}
                    {phoneError && (
                      <p className="text-xs text-red-400 mt-1 font-sans">{phoneError}</p>
                    )}
                  </div>
                </div>

                {/* Field 7: Journey Vision & Preferences */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-sans font-medium text-[#B8B4AA] uppercase tracking-wider">
                    <MessageSquare className="size-3.5 text-[#C5A059]" /> JOURNEY VISION &amp; PREFERENCES
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your preferred destinations, approximate travel dates, celebration occasion, or specific hotel preferences..."
                    className="w-full rounded-sm border border-white/15 bg-[#0C0B09] px-4 py-3 text-[16px] md:text-sm text-[#F4F2EC] placeholder-[#B8B4AA]/40 outline-none transition-all duration-300 hover:border-white/25 focus:border-[#C5A059] resize-none leading-relaxed"
                  />
                </div>

                {/* Discretion Assurance */}
                <div className="text-[11px] text-[#B8B4AA]/70 leading-relaxed font-light">
                  Your parameters are treated with complete discretion and assigned to a dedicated Senior Curator.
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isPending}
                  whileHover={{ scale: isPending ? 1 : 1.01 }}
                  whileTap={{ scale: isPending ? 1 : 0.98 }}
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] border border-[#C5A059]/50 py-4 px-6 text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#0C0B09] shadow-xl shadow-[#C5A059]/20 transition-all duration-300 disabled:opacity-60 cursor-pointer"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="size-4 animate-spin text-[#0C0B09]" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="size-3.5 text-[#0C0B09]" />
                      <span>Submit Journey Inquiry</span>
                      <ArrowUpRight className="size-4 text-[#0C0B09] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 2. INTERACTIVE QUICK ACTIONS: WARM OBSIDIAN & GOLD CARDS */}
      {/* ======================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B8B4AA]/60 font-sans">
          <span className="h-px flex-1 bg-white/10" />
          <span>Direct Atelier Communications</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Button 1: Warm Obsidian WhatsApp Card */}
          <motion.a
            href="https://wa.me/918419887730?text=Hello%20Sarrin%20Holidays%20Concierge,%20I%20would%20like%20to%20inquire%20about%20a%20bespoke%20travel%20experience."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-white/10 hover:border-[#C5A059]/50 bg-[#141310] p-6 shadow-xl transition-all cursor-pointer"
          >
            {/* Ambient gold glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-[#C5A059]/10 blur-[50px] transition-opacity group-hover:opacity-100" />

            <div className="flex items-start justify-between">
              {/* Call Symbol Badge */}
              <div className="flex size-11 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 shadow-md">
                <PhoneCall className="size-5 text-[#C5A059]" />
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-sm bg-[#C5A059]/10 px-2.5 py-0.5 text-[10px] font-sans font-medium uppercase tracking-wider text-[#C5A059] border border-[#C5A059]/20">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Live Desk
              </span>
            </div>

            <div className="mt-5">
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A059]">
                Instant Chat &amp; Voice
              </span>
              <h4 className="mt-1 font-serif font-light text-lg sm:text-xl text-[#F4F2EC] group-hover:text-[#C5A059] transition-colors">
                Connect via WhatsApp
              </h4>
              <p className="mt-1 text-xs text-[#B8B4AA] font-sans">
                +91 8419887730
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-sans font-medium uppercase tracking-wider text-[#C5A059]">
              <span>Open Direct Chat</span>
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </motion.a>

          {/* Button 2: Warm Obsidian Email Card */}
          <motion.a
            href="mailto:info@sarrinholidays.com?subject=Confidential%20Travel%20Inquiry%20-%20Sarrin%20Holidays"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-white/10 hover:border-[#C5A059]/50 bg-[#141310] p-6 shadow-xl transition-all cursor-pointer"
          >
            {/* Ambient gold glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-[#C5A059]/10 blur-[50px] transition-opacity group-hover:opacity-100" />

            <div className="flex items-start justify-between">
              {/* Mail Icon Badge */}
              <div className="flex size-11 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 shadow-md">
                <Mail className="size-5 text-[#C5A059]" />
              </div>

              <span className="inline-flex items-center gap-1 rounded-sm bg-white/5 px-2.5 py-0.5 text-[10px] font-sans font-medium uppercase tracking-wider text-[#B8B4AA] border border-white/10">
                Encrypted Manifest
              </span>
            </div>

            <div className="mt-5">
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A059]">
                Official Correspondence
              </span>
              <h4 className="mt-1 font-serif font-light text-lg sm:text-xl text-[#F4F2EC] group-hover:text-[#C5A059] transition-colors">
                Send Direct Email
              </h4>
              <p className="mt-1 text-xs text-[#B8B4AA] font-sans truncate">
                info@sarrinholidays.com
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-sans font-medium uppercase tracking-wider text-[#C5A059]">
              <span>Launch Mail Client</span>
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </motion.a>
        </div>
      </div>
    </div>
  )
}
