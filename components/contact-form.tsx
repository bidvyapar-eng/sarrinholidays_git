'use client'

import React, { useState, useTransition, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  CheckCircle2,
  PhoneCall,
  Mail,
  ShieldCheck,
  Sparkles,
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
      {/* 1. SLEEK GLASSMORPHISM CONTACT FORM */}
      {/* ======================================================================= */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-slate-900/80 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl transition-all duration-300">
        {/* Subtle Top Gold Hairline */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-primary/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-primary/5 blur-[100px]" />

        {/* Form Header */}
        <div className="relative z-10 border-b border-white/10 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/20 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur-md">
              <Sparkles className="size-3" />
              Direct Operations Brief
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-foreground/50">
              <Clock className="size-3 text-primary" />
              SLA: &lt; 2 Hours
            </span>
          </div>

          <h3 className="mt-3 font-serif text-2xl sm:text-3xl text-foreground font-normal">
            Initiate Confidential Inquiry
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-foreground/70 font-light leading-relaxed">
            Please register your core journey requirements. Your dossier will be assigned directly to a Senior Operations Director.
          </p>
        </div>

        {/* Form Body */}
        <div className="relative z-10 pt-6">
          <AnimatePresence mode="wait">
            {result?.success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="rounded-3xl border border-primary/40 bg-primary/10 p-8 sm:p-10 text-center space-y-4 backdrop-blur-xl"
              >
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/40 shadow-xl shadow-primary/20">
                  <Check className="size-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-mono font-semibold">
                    Reference: {result.referenceId}
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl text-foreground">
                    Dossier Transmitted
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed max-w-md mx-auto font-light">
                  {result.message} Your parameters have been entered into the Sarrin Holidays Operations Manifest. Expect a discreet liaison via phone or encrypted email.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-lg transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    <span>Submit Another Inquiry</span>
                  </button>
                  <a
                    href="tel:+919820072774"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-xs font-medium text-foreground hover:bg-white/10 transition-colors"
                  >
                    <PhoneCall className="size-3.5 text-primary" />
                    <span>Direct Concierge Phone</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {result?.error && (
                  <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3.5 flex items-start gap-2.5 text-xs text-red-300">
                    <AlertCircle className="size-4 shrink-0 mt-0.5 text-red-400" />
                    <p className="leading-snug">{result.error}</p>
                  </div>
                )}

                {/* Desk Routing Selector (Controlled by Feature Flag) */}
                {ENABLE_GLOBAL_CONCIERGE && (
                  <>
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-foreground/75 uppercase tracking-wider font-mono">
                        Select Concierge Routing Desk
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setSelectedDesk('domestic')}
                          className={`flex items-center justify-center gap-2 rounded-2xl py-2.5 px-3 text-xs font-semibold transition-all cursor-pointer ${
                            selectedDesk === 'domestic'
                              ? 'border border-primary bg-primary/20 text-primary shadow-md shadow-primary/20'
                              : 'border border-white/10 bg-white/5 text-foreground/60 hover:border-white/25 hover:text-foreground'
                          }`}
                        >
                          <Building2 className="size-3.5" />
                          <span>Domestic (India)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedDesk('nri')}
                          className={`flex items-center justify-center gap-2 rounded-2xl py-2.5 px-3 text-xs font-semibold transition-all cursor-pointer ${
                            selectedDesk === 'nri'
                              ? 'border border-amber-500/60 bg-amber-500/20 text-amber-300 shadow-md shadow-amber-950/20'
                              : 'border border-white/10 bg-white/5 text-foreground/60 hover:border-white/25 hover:text-foreground'
                          }`}
                        >
                          <Plane className="size-3.5" />
                          <span>International / NRI</span>
                        </button>
                      </div>
                    </div>

                    {/* International / NRI Logistical Reassurance Banner */}
                    {selectedDesk === 'nri' && (
                      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 flex items-start gap-2.5 text-xs text-amber-200 animate-in fade-in duration-200">
                        <Globe className="size-4 shrink-0 text-amber-400 mt-0.5" />
                        <div>
                          <span className="font-semibold text-amber-300 font-mono text-[10px] uppercase tracking-wider block">
                            Cross-Border Concierge Routing Active
                          </span>
                          <p className="text-[11px] text-neutral-300 mt-0.5 leading-snug">
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
                    <label className="block text-xs font-medium text-foreground/75 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-primary" /> Indian Holiday Calendar &amp; Seasonality
                    </label>
                    <span className="text-[10px] font-mono text-primary/80">Festive Windows</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SEASONS.map((s) => {
                      const isSel = selectedSeason === s.label
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSelectedSeason(s.label)}
                          className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSel
                              ? 'border-primary bg-primary/15 shadow-md shadow-primary/20 text-primary'
                              : 'border-white/10 bg-white/5 text-foreground/70 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-semibold">
                            <span>{s.label}</span>
                            {isSel && <Check className="size-3 text-primary" />}
                          </div>
                          <span className="text-[9px] font-mono text-foreground/50 block mt-0.5">{s.subtitle}</span>
                          <span className={`inline-block mt-1.5 px-1.5 py-0.5 text-[9px] font-mono rounded-full border ${s.urgencyClass}`}>
                            {s.urgencyBadge}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Field 2: Inquiry Classification Pills */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-medium text-foreground/75 uppercase tracking-wider font-mono">
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
                          className={`rounded-full px-3.5 py-1.5 text-[11px] font-medium transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-primary text-primary-foreground border border-primary shadow-md shadow-primary/20'
                              : 'bg-white/5 text-foreground/70 border border-white/10 hover:border-white/25 hover:bg-white/10 hover:text-foreground'
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
                    <label className="block text-xs font-medium text-foreground/75 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-primary" /> Primary Indian Origin Hub (Departure City)
                    </label>
                    <span className="text-[10px] font-mono text-primary/80">Domestic Hub</span>
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
                          className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                            isSel
                              ? 'border-primary bg-primary/20 text-primary font-semibold shadow-sm shadow-primary/20'
                              : 'border-white/10 bg-white/5 text-foreground/70 hover:border-white/20'
                          }`}
                        >
                          <span className="block text-xs font-medium truncate">{hub.name}</span>
                          <span className="block text-[10px] font-mono text-foreground/40">{hub.code}</span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Dropdown fallback */}
                  <select
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className="w-full rounded-lg border border-white/12 bg-white/5 px-4 py-3 min-h-[48px] text-[16px] md:text-sm text-foreground outline-none transition-all duration-300 hover:border-white/25 focus:border-gold/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] cursor-pointer"
                  >
                    {INDIAN_ORIGIN_HUBS.map((hub) => (
                      <option key={hub.id} value={hub.name} className="bg-slate-900 text-foreground">
                        {hub.name} ({hub.code}) — {hub.state}
                      </option>
                    ))}
                  </select>

                  {departureCity === 'Other City' && (
                    <div className="space-y-1.5 pt-1">
                      <label className="text-xs font-mono uppercase tracking-wider text-foreground/85 font-medium">
                        Specify Origin City / Airstrip *
                      </label>
                      <input
                        type="text"
                        required
                        value={customDepartureCity}
                        onChange={(e) => setCustomDepartureCity(e.target.value)}
                        placeholder="e.g., Jaipur, Surat, Chandigarh, Kochi, Indore, Lucknow..."
                        className="w-full rounded-lg border border-white/12 bg-white/5 px-4 py-3 min-h-[48px] text-[16px] md:text-sm text-foreground placeholder:text-foreground/45 backdrop-blur-md outline-none transition-all duration-300 hover:border-white/25 focus:border-gold/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                      />
                    </div>
                  )}
                </div>

                {/* Field 4: Domestic Luxury Transit Preferences */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-foreground/75 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <Compass className="size-3.5 text-primary" /> Domestic Luxury Transit Preference
                    </label>
                    <span className="text-[10px] font-mono text-primary/80">Private Leg</span>
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
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                            isSel
                              ? 'border-primary bg-primary/15 shadow-lg shadow-primary/20'
                              : 'border-white/10 bg-white/[0.04] hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className={`flex size-6 items-center justify-center rounded-lg ${isSel ? 'bg-primary text-primary-foreground' : 'bg-white/10 text-primary'}`}>
                              <Icon className="size-3.5" />
                            </div>
                            <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border ${isSel ? 'border-primary/40 text-primary bg-primary/10' : 'border-white/10 text-foreground/50 bg-white/5'}`}>
                              {opt.badge}
                            </span>
                          </div>
                          <span className={`text-xs font-semibold block ${isSel ? 'text-primary' : 'text-white'}`}>
                            {opt.title}
                          </span>
                          <p className="text-[10px] text-foreground/60 mt-0.5 leading-snug">
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
                    <label className="flex items-center gap-1.5 text-xs font-medium text-foreground/90 uppercase tracking-wider font-mono">
                      <User className="size-3.5 text-primary" /> Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Lord Sterling / Ambassador Mehta"
                      className="w-full rounded-lg border border-white/12 bg-white/5 px-4 py-3 min-h-[48px] text-[16px] md:text-sm text-foreground placeholder:text-foreground/45 backdrop-blur-md outline-none transition-all duration-300 hover:border-white/25 focus:border-gold/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-foreground/90 uppercase tracking-wider font-mono">
                      <Mail className="size-3.5 text-primary" /> Private Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@private-office.com"
                      className="w-full rounded-lg border border-white/12 bg-white/5 px-4 py-3 min-h-[48px] text-[16px] md:text-sm text-foreground placeholder:text-foreground/45 backdrop-blur-md outline-none transition-all duration-300 hover:border-white/25 focus:border-gold/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                    />
                  </div>
                </div>

                {/* Field 6: Strict Indian Mobile Validation (+91, 10 Digits) */}
                <div className="space-y-1.5">
                  <label className="flex items-center justify-between text-xs font-medium text-foreground/90 uppercase tracking-wider font-mono">
                    <span className="flex items-center gap-1.5">
                      <Phone className="size-3.5 text-primary" /> Direct Indian Mobile / WhatsApp *
                    </span>
                    <span className="text-[10px] font-mono text-primary/80">Strict +91 (10 Digits)</span>
                  </label>

                  <div className="relative flex items-center">
                    {/* +91 Fixed Badge */}
                    <div className="flex min-h-[48px] items-center gap-1.5 px-3.5 py-3 rounded-l-lg border border-r-0 border-white/12 bg-white/10 text-white text-[16px] md:text-sm font-mono select-none">
                      <span className="text-sm leading-none">🇮🇳</span>
                      <span className="font-semibold text-primary">+91</span>
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
                      className={`w-full rounded-r-lg border border-white/12 bg-white/5 px-4 py-3 min-h-[48px] text-[16px] md:text-sm text-foreground font-mono placeholder:text-foreground/45 backdrop-blur-md outline-none transition-all duration-300 hover:border-white/25 ${
                        isPhoneValid
                          ? 'border-emerald-500/60 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/40 focus:shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                          : phoneDigits.length > 0
                          ? 'border-amber-500/50 focus:border-amber-400 focus:ring-1 focus:ring-amber-500/40'
                          : 'focus:border-gold/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]'
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
                      <span className="text-[11px] text-foreground/50 font-mono">
                        Enter 10-digit Indian mobile number (e.g., 98200 44810)
                      </span>
                    ) : isPhoneValid ? (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                        <CheckCircle2 className="size-3.5 shrink-0" />
                        <span>Verified Indian domestic mobile (+91 {formattedPhoneDisplay})</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
                        <AlertCircle className="size-3.5 shrink-0" />
                        <span>
                          {phoneDigits[0] && !['6', '7', '8', '9'].includes(phoneDigits[0])
                            ? 'Indian mobile numbers must start with 6, 7, 8, or 9'
                            : `10 digits required (${10 - phoneDigits.length} more needed)`}
                        </span>
                      </div>
                    )}
                    {phoneError && (
                      <p className="text-xs text-red-400 mt-1 font-mono">{phoneError}</p>
                    )}
                  </div>
                </div>

                {/* Field 4: Message / Requirements */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-foreground/90 uppercase tracking-wider font-mono">
                    <MessageSquare className="size-3.5 text-primary" /> Confidential Requirements & Dates
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Outline passenger manifest, palace dates, security clearances, or medical wellness goals..."
                    className="w-full rounded-lg border border-white/12 bg-white/5 px-4 py-3 text-[16px] md:text-sm text-foreground placeholder:text-foreground/45 backdrop-blur-md outline-none transition-all duration-300 hover:border-white/25 focus:border-gold/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] resize-none leading-relaxed"
                  />
                </div>

                {/* Non-Disclosure Assurance */}
                <div className="flex items-center gap-2 text-[11px] text-foreground/60">
                  <ShieldCheck className="size-4 text-primary shrink-0" />
                  <span>
                    Transmitted under strict non-disclosure covenants. Tagged automatically as <strong>General Contact</strong>.
                  </span>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isPending}
                  whileHover={{ scale: isPending ? 1 : 1.015 }}
                  whileTap={{ scale: isPending ? 1 : 0.98 }}
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-gold via-[#e0c774] to-gold hover:from-[#c5a030] hover:to-[#b89326] border border-gold/50 py-4 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#0B0F19] shadow-xl shadow-gold/25 transition-all duration-300 hover:brightness-105 active:scale-95 disabled:opacity-60 cursor-pointer"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="size-4 animate-spin text-[#0B0F19]" />
                      <span>Encrypting & Dispatching Dossier...</span>
                    </>
                  ) : (
                    <>
                      <Send className="size-3.5 text-[#0B0F19]" />
                      <span>Send Confidential Inquiry</span>
                      <ArrowUpRight className="size-4 text-[#0B0F19] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 2. INTERACTIVE QUICK ACTIONS: LARGE WHATSAPP & ELEGANT EMAIL BUTTONS */}
      {/* ======================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground/50 font-mono">
          <span className="h-px flex-1 bg-white/10" />
          <span>Instant Direct Communications</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Button 1: Prominent WhatsApp Button with Distinct Call Symbol */}
          <motion.a
            href="https://wa.me/919820072774?text=Hello%20Sarrin%20Holidays%20Concierge,%20I%20would%20like%20to%20inquire%20about%20a%20bespoke%20travel%20experience."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/60 via-slate-900/90 to-emerald-950/30 p-5 sm:p-6 backdrop-blur-xl shadow-xl shadow-emerald-950/30 transition-colors hover:border-emerald-400 hover:bg-emerald-950/80 cursor-pointer"
          >
            {/* Ambient emerald glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-emerald-500/15 blur-[50px] transition-opacity group-hover:opacity-100" />

            <div className="flex items-start justify-between">
              {/* Distinct Call Symbol Badge */}
              <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <PhoneCall className="size-6 text-emerald-400 animate-pulse" />
              </div>

              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-300 border border-emerald-500/30">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Desk
              </span>
            </div>

            <div className="mt-5">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400/90">
                Instant Chat & Voice
              </span>
              <h4 className="mt-1 font-serif text-lg sm:text-xl text-white font-medium group-hover:text-emerald-300 transition-colors">
                Connect via WhatsApp
              </h4>
              <p className="mt-1 text-xs text-white/70 font-mono">
                +91 98200 SARRIN
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>Open Direct Chat</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </motion.a>

          {/* Button 2: Separate Elegant Email Button */}
          <motion.a
            href="mailto:atelier@sarrinholidays.com?subject=Confidential%20Travel%20Inquiry%20-%20Sarrin%20Holidays"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-primary/10 p-5 sm:p-6 backdrop-blur-xl shadow-xl transition-colors hover:border-primary/50 hover:bg-slate-900/95 cursor-pointer"
          >
            {/* Ambient gold glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-primary/15 blur-[50px] transition-opacity group-hover:opacity-100" />

            <div className="flex items-start justify-between">
              {/* Mail Icon Badge */}
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/20 text-primary border border-primary/40 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <Mail className="size-6 text-primary" />
              </div>

              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider text-foreground/75 border border-white/10">
                PGP Encrypted
              </span>
            </div>

            <div className="mt-5">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/90">
                Official Correspondence
              </span>
              <h4 className="mt-1 font-serif text-lg sm:text-xl text-white font-medium group-hover:text-primary transition-colors">
                Send Direct Email
              </h4>
              <p className="mt-1 text-xs text-white/70 font-mono truncate">
                atelier@sarrinholidays.com
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-primary">
              <span>Launch Mail Client</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </motion.a>
        </div>
      </div>
    </div>
  )
}
