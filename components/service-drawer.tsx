'use client'

import React, { useState, useTransition } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Calendar,
  User,
  Users,
  Send,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Utensils,
  HeartHandshake,
  Award,
  Crown,
  FileCheck,
  Plus,
  Minus,
  Check,
  Copy,
  ExternalLink,
  Car,
  Train,
  Plane,
  MapPin,
  AlertCircle,
  Compass,
} from 'lucide-react'
import { submitVipInquiry, type VipInquiryPayload } from '@/app/actions/vip-inquiry'

export interface ServiceDrawerProps {
  isOpen: boolean
  onClose: () => void
  serviceTitle?: string
  classification?: string
}

export const INDIAN_ORIGIN_HUBS = [
  { id: 'mumbai', name: 'Mumbai', code: 'BOM', state: 'Maharashtra' },
  { id: 'delhi', name: 'Delhi NCR', code: 'DEL', state: 'National Capital' },
  { id: 'bengaluru', name: 'Bengaluru', code: 'BLR', state: 'Karnataka' },
  { id: 'ahmedabad', name: 'Ahmedabad', code: 'AMD', state: 'Gujarat' },
  { id: 'kolkata', name: 'Kolkata', code: 'CCU', state: 'West Bengal' },
  { id: 'chennai', name: 'Chennai', code: 'MAA', state: 'Tamil Nadu' },
  { id: 'hyderabad', name: 'Hyderabad', code: 'HYD', state: 'Telangana' },
  { id: 'pune', name: 'Pune', code: 'PNQ', state: 'Maharashtra' },
  { id: 'other', name: 'Other City', code: 'IND', state: 'Pan-India Hub' },
]

export const DOMESTIC_TRANSIT_OPTIONS = [
  {
    id: 'chauffeur',
    title: 'Private Chauffeur Fleet',
    subtitle: 'Mercedes-Maybach & Toyota Vellfire fleet',
    desc: 'Armored or luxury executive fleet with discreet, uniformed security drivers.',
    badge: 'Executive Motorcade',
  },
  {
    id: 'charter',
    title: 'Helicopter / Charter',
    subtitle: 'Point-to-point private air charters',
    desc: 'Twin-engine private aircraft charters & direct high-altitude helipad transfers.',
    badge: 'Aviation Priority',
  },
  {
    id: 'train',
    title: 'Luxury Train',
    subtitle: 'Palace on Wheels & Maharajas’ Express',
    desc: 'Bespoke presidential suite carriages traversing royal Rajasthan & Indian heritage corridors.',
    badge: 'Royal Heritage Rail',
  },
]

export const SEASONS = [
  {
    id: 'diwali',
    label: 'Diwali Break',
    subtitle: 'October – November 2026',
    desc: 'Palace illuminations, royal fireworks & private family festival galas',
    urgencyBadge: 'Palace Scarcity • High Demand',
    urgencyClass: 'border-red-500/40 bg-red-500/15 text-red-300 shadow-sm shadow-red-500/20',
  },
  {
    id: 'year_end',
    label: 'Year-End & Winter Holidays',
    subtitle: 'Dec 20, 2026 – Jan 05, 2027',
    desc: 'Regal desert dunes, Udaipur lake soirees & winter soiree suites',
    urgencyBadge: 'Peak Season • Limited Inventory',
    urgencyClass: 'border-amber-500/40 bg-amber-500/15 text-amber-300 shadow-sm shadow-amber-500/20',
  },
  {
    id: 'summer',
    label: 'Summer Holidays',
    subtitle: 'April – June 2027',
    desc: 'Himalayan alpine cool retreats, Kashmir & Ladakh private helicopter charters',
    urgencyBadge: 'Himalayan High Season',
    urgencyClass: 'border-cyan-500/40 bg-cyan-500/15 text-cyan-300 shadow-sm shadow-cyan-500/20',
  },
  {
    id: 'long_weekend',
    label: 'Long Weekend Getaways',
    subtitle: '3 – 4 Day Curated Escapes',
    desc: 'Holi, Independence / Republic Day & festive private fortress retreats',
    urgencyBadge: 'Priority Sarrin Holidays Allocation',
    urgencyClass: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300 shadow-sm shadow-emerald-500/20',
  },
  {
    id: 'monsoon',
    label: 'Monsoon Palace Sabbatical',
    subtitle: 'July – September 2027',
    desc: 'Lush green Aravalis, Ayurvedic panchakarma & misty fort suites',
    urgencyBadge: 'Monsoon Sanctuary Season',
    urgencyClass: 'border-teal-500/40 bg-teal-500/15 text-teal-300 shadow-sm shadow-teal-500/20',
  },
]

const DURATIONS = [
  '3 – 4 Days (Long Weekend)',
  '5 – 7 Days (Holiday Week)',
  '8 – 10 Days (Grand Expedition)',
  '12+ Days (Pan-India Odyssey)',
]

const SUITE_PREFERENCES = [
  { id: 'presidential', title: 'Grand Presidential Suite', desc: 'Sovereign suite with private terrace and dedicated butler' },
  { id: 'connecting', title: 'Connecting Heritage Wings', desc: 'Multiple adjoining suites ideal for family entourages' },
  { id: 'buyout', title: 'Full Palace / Property Buyout', desc: 'Exclusive private fortress or lake palace reservation' },
]

const DIETARY_OPTIONS = [
  'Strict Jain Dining',
  'Pure Vegetarian / Sattvic',
  'Halal Certified Gourmet',
  'Plant-Based & Vegan',
  'Dedicated Private Chef',
  'Sommelier Wine Pairings',
]

const ACCESSIBILITY_OPTIONS = [
  'Ground Floor / Step-Free',
  'Wheelchair-Assisted Transit',
  'High-Altitude Acclimatization',
  'Doctor-on-Call Liaison',
  'Quiet Sanctuary / Low Noise',
]

const OCCASIONS = [
  'Milestone Anniversary',
  'Palace Nuptials / Wedding',
  'Royal Birthday Celebration',
  'Wellness & Detox Sabbatical',
  'Confidential Leisure Escape',
]

const STEP_TITLES = [
  { step: 1, title: 'Dates, Origin & Domestic Transit', subtitle: 'Select Indian holiday calendar, origin hub, and luxury transit mode' },
  { step: 2, title: 'Party Size & Suites', subtitle: 'Specify your traveling party architecture and suite preferences' },
  { step: 3, title: 'Bespoke Curations', subtitle: 'Personalize dietary privileges, accessibility care, and occasions' },
  { step: 4, title: 'Contact & Discretion Protocol', subtitle: 'Strict Indian mobile (+91) verification for Chief Operations dispatch' },
]

export function ServiceDrawer({
  isOpen,
  onClose,
  serviceTitle = 'Bespoke Atelier Service',
  classification = 'Tier 01 Private Service',
}: ServiceDrawerProps) {
  // Navigation & Step State
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [direction, setDirection] = useState<number>(1) // 1 = forward, -1 = backward
  const [isPending, startTransition] = useTransition()
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [referenceId, setReferenceId] = useState<string>('')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean>(false)

  // Step 1: Travel Window, Indian Origin Hub & Domestic Transit
  const [season, setSeason] = useState<string>(SEASONS[0].label)
  const [specificDate, setSpecificDate] = useState<string>('')
  const [duration, setDuration] = useState<string>(DURATIONS[1])
  const [isFlexible, setIsFlexible] = useState<boolean>(true)
  const [departureCity, setDepartureCity] = useState<string>('Mumbai')
  const [customDepartureCity, setCustomDepartureCity] = useState<string>('')
  const [transitPreference, setTransitPreference] = useState<string>('Private Chauffeur Fleet')

  // Step 2: Party Size
  const [adults, setAdults] = useState<number>(2)
  const [children, setChildren] = useState<number>(0)
  const [suitePreference, setSuitePreference] = useState<string>(SUITE_PREFERENCES[0].title)
  const [travelStyle, setTravelStyle] = useState<string>('Private & Romantic')

  // Step 3: Bespoke Requests
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([])
  const [specialOccasion, setSpecialOccasion] = useState<string>('Confidential Leisure Escape')
  const [vipBrief, setVipBrief] = useState<string>('')

  // Step 4: Contact & Discretion Protocol
  const [title, setTitle] = useState<string>('Mr.')
  const [fullName, setFullName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phoneDigits, setPhoneDigits] = useState<string>('')
  const [preferredChannel, setPreferredChannel] = useState<'whatsapp' | 'email' | 'call'>('whatsapp')
  const [requiresNda, setRequiresNda] = useState<boolean>(false)

  // Indian mobile validation helper (+91, exactly 10 digits starting with 6, 7, 8, or 9)
  const isIndianMobileValid = (digits: string) => {
    return /^[6-9]\d{9}$/.test(digits)
  }

  const handlePhoneChange = (val: string) => {
    // Strip non-digits
    let clean = val.replace(/\D/g, '')
    // Clean leading +91 or 91 if pasted
    if (clean.length === 12 && clean.startsWith('91')) {
      clean = clean.slice(2)
    } else if (clean.length === 11 && clean.startsWith('0')) {
      clean = clean.slice(1)
    }
    setPhoneDigits(clean.slice(0, 10))
  }

  const formattedPhoneDisplay =
    phoneDigits.length > 5
      ? `${phoneDigits.slice(0, 5)} ${phoneDigits.slice(5)}`
      : phoneDigits

  const isPhoneValid = isIndianMobileValid(phoneDigits)

  // Step navigation helpers
  const goToNextStep = () => {
    if (currentStep < 4) {
      setDirection(1)
      setCurrentStep((prev) => prev + 1)
    }
  }

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setDirection(-1)
      setCurrentStep((prev) => prev - 1)
    }
  }

  const toggleArrayItem = (item: string, list: string[], setList: (val: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item))
    } else {
      setList([...list, item])
    }
  }

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!fullName.trim() || !email.trim()) {
      setSubmitError('Please complete your full name and primary email.')
      return
    }

    if (!isPhoneValid) {
      setSubmitError('Please enter a valid 10-digit Indian mobile number (+91 format, starting with 6, 7, 8, or 9).')
      return
    }

    const payload: VipInquiryPayload = {
      serviceOrPackageTitle: serviceTitle,
      classification,
      season,
      travelDates: specificDate || season,
      duration,
      isFlexible,
      departureCity,
      customDepartureCity,
      transitPreference,
      adults,
      children,
      suitePreference,
      travelStyle,
      dietaryNeeds: selectedDietary,
      accessibilityNeeds: selectedAccessibility,
      specialOccasion,
      vipBrief,
      title,
      fullName,
      email,
      phone: `+91 ${phoneDigits.slice(0, 5)} ${phoneDigits.slice(5)}`.trim(),
      preferredChannel,
      requiresNda,
    }

    startTransition(async () => {
      try {
        const res = await submitVipInquiry(payload)
        if (res.success && res.referenceId) {
          setReferenceId(res.referenceId)
          setSubmitted(true)
        } else {
          setSubmitError(res.error || 'Failed to transmit brief. Please try again.')
        }
      } catch (err: any) {
        setSubmitError(err?.message || 'An unexpected operational failure occurred.')
      }
    })
  }

  const handleReset = () => {
    setCurrentStep(1)
    setSubmitted(false)
    setReferenceId('')
    setSubmitError(null)
    setPhoneDigits('')
    setCustomDepartureCity('')
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      handleReset()
    }, 400)
  }

  const copyRefToClipboard = () => {
    if (referenceId && navigator.clipboard) {
      navigator.clipboard.writeText(referenceId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Animation variants
  const slideVariants: import('framer-motion').Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 35 : -35,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.28, ease: 'easeOut' },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -35 : 35,
      opacity: 0,
      transition: { duration: 0.22, ease: 'easeIn' },
    }),
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal forceMount>
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Premium Blur-Backdrop Overlay */}
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl"
                  onClick={handleClose}
                />
              </Dialog.Overlay>

              {/* Slide-out Multi-Step Drawer Content */}
              <Dialog.Content asChild>
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 32, stiffness: 320 }}
                  className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-[#0C0B09]/95 backdrop-blur-2xl border-l border-white/15 shadow-[-25px_0_70px_rgba(0,0,0,0.95)] flex flex-col justify-between overflow-y-auto focus:outline-none selection:bg-[#C5A059]/30 selection:text-[#C5A059] text-foreground"
                >
                  {/* Golden Top Hairline Accent */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

                  {/* Ambient Background Lighting Orbs */}
                  <div className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-[#C5A059]/10 blur-[100px]" />
                  <div className="pointer-events-none absolute bottom-10 -left-20 size-72 rounded-full bg-amber-600/10 blur-[110px]" />

                  {/* ========================================================= */}
                  {/* TOP HEADER & MULTI-STEP PROGRESS BAR                      */}
                  {/* ========================================================= */}
                  <div className="relative z-10 p-6 sm:p-8 pb-4 border-b border-white/10 bg-[#141310]/80 backdrop-blur-md">
                    {/* Top Row: Tag, Reference, Close */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/20 px-3 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-[0.1em] text-primary backdrop-blur-md">
                          <Crown className="size-3" />
                          {classification}
                        </span>
                      </div>

                      <Dialog.Close asChild>
                        <button
                          type="button"
                          onClick={handleClose}
                          aria-label="Close VIP drawer"
                          className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground/70 hover:bg-white/15 hover:text-foreground transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                        >
                          <X className="size-4" />
                        </button>
                      </Dialog.Close>
                    </div>

                    {/* Title & Service Target */}
                    <div className="mt-3">
                      <Dialog.Title className="font-serif text-2xl sm:text-3xl text-white font-medium tracking-tight">
                        VIP Expedition Inquiry
                      </Dialog.Title>
                      <Dialog.Description className="text-xs text-foreground/70 mt-1">
                        Curating a private brief for <strong className="text-primary font-medium">{serviceTitle}</strong>.
                      </Dialog.Description>
                    </div>

                    {/* Multi-Step Progress Indicator */}
                    {!submitted && (
                      <div className="mt-5 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-primary font-medium uppercase tracking-wider">
                            Step 0{currentStep} / 04
                          </span>
                          <span className="text-foreground/50 truncate max-w-[240px]">
                            {STEP_TITLES[currentStep - 1].title}
                          </span>
                        </div>

                        {/* Segmented Progress Bar */}
                        <div className="grid grid-cols-4 gap-2">
                          {[1, 2, 3, 4].map((stepIdx) => (
                            <div
                              key={stepIdx}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                stepIdx <= currentStep
                                  ? 'bg-gradient-to-r from-primary to-amber-400 shadow-sm shadow-primary/40'
                                  : 'bg-white/10'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ========================================================= */}
                  {/* MAIN DRAWER BODY                                          */}
                  {/* ========================================================= */}
                  <div className="relative z-10 flex-1 p-6 sm:p-8 py-6">
                    {submitted ? (
                      /* ===================================================== */
                      /* SUCCESS STATE: PREMIUM ANIMATED CHECKMARK             */
                      /* ===================================================== */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="my-auto py-8 text-center space-y-6"
                      >
                        {/* Animated SVG Checkmark Icon */}
                        <div className="relative mx-auto flex size-24 items-center justify-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                            className="absolute inset-0 rounded-full bg-primary/20 blur-xl pointer-events-none"
                          />
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 18, stiffness: 240 }}
                            className="size-20 rounded-full border-2 border-primary/50 bg-primary/20 flex items-center justify-center text-primary shadow-2xl shadow-primary/30"
                          >
                            <svg className="size-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
                                d="M20 6L9 17l-5-5"
                              />
                            </svg>
                          </motion.div>
                        </div>

                        {/* Heading & Subtitle */}
                        <div className="space-y-2 max-w-md mx-auto">
                          <span className="inline-flex items-center text-[10px] font-mono uppercase tracking-[0.1em] text-primary">
                            Confidential Brief Logged
                          </span>
                          <h3 className="font-serif text-3xl text-white font-normal">
                            Dossier Transmitted
                          </h3>
                          <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed font-normal">
                            Thank you, <strong className="text-white">{title} {fullName}</strong>. Your bespoke expedition requirements have been logged into our Chief Operations desk.
                          </p>
                        </div>

                        {/* Reference Badge Card */}
                        <div className="mx-auto max-w-sm rounded-2xl border border-primary/30 bg-primary/10 p-4 backdrop-blur-xl">
                          <div className="flex items-center justify-between text-xs">
                            <div className="text-left">
                              <span className="block text-[10px] font-mono text-primary/80 uppercase tracking-wider">
                                VIP Protocol Reference
                              </span>
                              <span className="font-mono text-sm sm:text-base font-bold text-white tracking-widest">
                                {referenceId}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={copyRefToClipboard}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-primary/40 bg-primary/20 text-primary text-[11px] font-mono hover:bg-primary/30 transition-colors cursor-pointer"
                            >
                              {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                              <span>{copied ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Turnaround Notice & Actions */}
                        <div className="space-y-3 max-w-sm mx-auto pt-2">
                          <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-foreground/60 flex items-center justify-center gap-2">
                            <Clock className="size-4 text-primary shrink-0" />
                            <span>Target Curator Response: Within 4 Business Hours</span>
                          </div>

                          <a
                            href={`https://wa.me/919820044810?text=${encodeURIComponent(
                              `Hello Sarrin Holidays, I have submitted VIP Dossier ${referenceId} for ${serviceTitle}.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 py-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors"
                          >
                            <Phone className="size-3.5" />
                            <span>Instant WhatsApp Protocol Follow-up</span>
                          </a>

                          <button
                            type="button"
                            onClick={handleClose}
                            className="w-full rounded-xl border border-white/15 bg-white/5 py-3 text-xs font-mono uppercase tracking-wider text-foreground/75 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                          >
                            Close Drawer
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      /* ===================================================== */
                      /* 4-STEP INTERACTIVE FLOW FORM                          */
                      /* ===================================================== */
                      <form onSubmit={handleFinalSubmit} className="space-y-6">
                        <AnimatePresence mode="wait" custom={direction}>
                          {/* ================================================= */}
                          {/* STEP 1: TRAVEL WINDOW, ORIGIN HUB & DOMESTIC TRANSIT */}
                          {/* ================================================= */}
                          {currentStep === 1 && (
                            <motion.div
                              key="step-1"
                              custom={direction}
                              variants={slideVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              className="space-y-6"
                            >
                              {/* Section 1: Domestic Holiday Presets & Urgency Badges */}
                              <div className="space-y-2">
                                <div className="space-y-1">
                                  <h4 className="font-serif text-lg text-white font-medium">
                                    Indian Holiday Calendar &amp; Seasonality
                                  </h4>
                                  <p className="text-xs text-foreground/60">
                                    Select an Indian festive getaway window or enter specific calendar dates.
                                  </p>
                                </div>

                                {/* Season Selector Cards Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                                  {SEASONS.map((s) => {
                                    const isSelected = season === s.label
                                    return (
                                      <button
                                        key={s.id}
                                        type="button"
                                        onClick={() => setSeason(s.label)}
                                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                                          isSelected
                                            ? 'border-primary bg-primary/15 shadow-lg shadow-primary/15'
                                            : 'border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]'
                                        }`}
                                      >
                                        <div className="flex items-start justify-between gap-2">
                                          <div>
                                            <span className={`text-xs font-semibold block ${isSelected ? 'text-primary' : 'text-white'}`}>
                                              {s.label}
                                            </span>
                                            <span className="text-[11px] text-foreground/50 block font-mono mt-0.5">
                                              {s.subtitle}
                                            </span>
                                          </div>
                                          {isSelected && (
                                            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                              <Check className="size-3 stroke-[3]" />
                                            </span>
                                          )}
                                        </div>

                                        {/* Urgency Badge */}
                                        <div className="mt-2.5">
                                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-mono border ${s.urgencyClass}`}>
                                            {s.urgencyBadge}
                                          </span>
                                        </div>
                                        <p className="text-[11px] text-foreground/60 mt-1.5 leading-snug">
                                          {s.desc}
                                        </p>
                                      </button>
                                    )
                                  })}
                                </div>
                              </div>

                              {/* Section 2: Specific Dates & Flexibility */}
                              <div className="space-y-4 pt-3 border-t border-white/10">
                                <div className="space-y-1.5">
                                  <label className="text-xs font-mono uppercase tracking-wider text-foreground/90 font-medium flex items-center gap-2">
                                    <Calendar className="size-3.5 text-primary" /> Specific Target Dates (Optional)
                                  </label>
                                  <input
                                    type="text"
                                    value={specificDate}
                                    onChange={(e) => setSpecificDate(e.target.value)}
                                    placeholder="e.g., Diwali Weekend (Oct 30 – Nov 04, 2026) or Year-End Dec 28"
                                    className="w-full min-h-[48px] rounded-lg border border-white/12 bg-white/5 px-4 py-3 text-[16px] md:text-sm text-foreground placeholder:text-foreground/45 backdrop-blur-md outline-none transition-all duration-300 hover:border-white/25 focus:border-gold/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                                  />
                                </div>

                                {/* Voyage Duration Chips */}
                                <div className="space-y-2">
                                  <label className="text-xs font-mono uppercase tracking-wider text-foreground/75 flex items-center gap-2">
                                    <Clock className="size-3.5 text-primary" /> Preferred Duration Window
                                  </label>
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {DURATIONS.map((dur) => {
                                      const isSel = duration === dur
                                      return (
                                        <button
                                          key={dur}
                                          type="button"
                                          onClick={() => setDuration(dur)}
                                          className={`py-2 px-2 rounded-xl border text-center text-xs font-mono transition-all cursor-pointer ${
                                            isSel
                                              ? 'border-primary bg-primary/20 text-primary font-semibold shadow-sm shadow-primary/20'
                                              : 'border-white/10 bg-white/5 text-foreground/70 hover:bg-white/10'
                                          }`}
                                        >
                                          {dur}
                                        </button>
                                      )
                                    })}
                                  </div>
                                </div>

                                {/* Flexible Window Toggle */}
                                <label className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03] cursor-pointer hover:bg-white/[0.06] transition-colors">
                                  <input
                                    type="checkbox"
                                    checked={isFlexible}
                                    onChange={(e) => setIsFlexible(e.target.checked)}
                                    className="size-4 rounded border-white/20 bg-white/10 text-primary focus:ring-primary"
                                  />
                                  <span className="text-xs text-foreground/80 leading-relaxed">
                                    Our travel window is flexible by +/- 2 to 4 days for optimal palace suite availability &amp; VIP slots
                                  </span>
                                </label>
                              </div>

                              {/* Section 3: Primary Indian Origin Hub (Departure City) */}
                              <div className="space-y-3 pt-3 border-t border-white/10">
                                <div className="flex items-center justify-between">
                                  <label className="text-xs font-mono uppercase tracking-wider text-foreground/85 flex items-center gap-2">
                                    <MapPin className="size-3.5 text-primary" /> Primary Indian Origin Hub (Departure City)
                                  </label>
                                  <span className="text-[10px] font-mono text-primary/80 uppercase">
                                    Domestic Liaison
                                  </span>
                                </div>

                                {/* Quick-select chips */}
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                  {INDIAN_ORIGIN_HUBS.map((hub) => {
                                    const isSelected = departureCity === hub.name
                                    return (
                                      <button
                                        key={hub.id}
                                        type="button"
                                        onClick={() => setDepartureCity(hub.name)}
                                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                                          isSelected
                                            ? 'border-primary bg-primary/20 text-primary font-semibold shadow-sm shadow-primary/20'
                                            : 'border-white/10 bg-white/5 text-foreground/70 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                      >
                                        <span className="block text-xs font-medium truncate">{hub.name}</span>
                                        <span className="block text-[10px] font-mono text-foreground/40">{hub.code}</span>
                                      </button>
                                    )
                                  })}
                                </div>

                                {/* Quick-select dropdown */}
                                <div>
                                  <select
                                    value={departureCity}
                                    onChange={(e) => setDepartureCity(e.target.value)}
                                    className="w-full min-h-[48px] rounded-lg border border-white/12 bg-white/5 px-4 py-3 text-[16px] md:text-sm text-foreground outline-none transition-all duration-300 hover:border-white/25 focus:border-gold/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] cursor-pointer"
                                  >
                                    {INDIAN_ORIGIN_HUBS.map((hub) => (
                                      <option key={hub.id} value={hub.name} className="bg-[#141310] text-[#F4F2EC]">
                                        {hub.name} ({hub.code}) — {hub.state}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* Conditional Other City input */}
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
                                      className="w-full min-h-[48px] rounded-lg border border-white/12 bg-white/5 px-4 py-3 text-[16px] md:text-sm text-foreground placeholder:text-foreground/45 backdrop-blur-md outline-none transition-all duration-300 hover:border-white/25 focus:border-gold/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                                    />
                                  </div>
                                )}
                              </div>

                              {/* Section 4: Domestic Luxury Transit Preferences */}
                              <div className="space-y-3 pt-3 border-t border-white/10">
                                <div className="flex items-center justify-between">
                                  <label className="text-xs font-mono uppercase tracking-wider text-foreground/85 flex items-center gap-2">
                                    <Compass className="size-3.5 text-primary" /> Domestic Luxury Transit Preference
                                  </label>
                                  <span className="text-[10px] font-mono text-primary/80 uppercase">
                                    Private Domestic Leg
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                  {DOMESTIC_TRANSIT_OPTIONS.map((opt) => {
                                    const isSelected = transitPreference === opt.title
                                    const Icon = opt.id === 'chauffeur' ? Car : opt.id === 'charter' ? Plane : Train
                                    return (
                                      <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => setTransitPreference(opt.title)}
                                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                                          isSelected
                                            ? 'border-primary bg-primary/15 shadow-lg shadow-primary/20'
                                            : 'border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]'
                                        }`}
                                      >
                                        <div className="flex items-center justify-between mb-2">
                                          <div className={`flex size-7 items-center justify-center rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-white/10 text-primary'}`}>
                                            <Icon className="size-3.5" />
                                          </div>
                                          <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border ${isSelected ? 'border-primary/40 text-primary bg-primary/10' : 'border-white/10 text-foreground/50 bg-white/5'}`}>
                                            {opt.badge}
                                          </span>
                                        </div>
                                        <span className={`text-xs font-semibold block ${isSelected ? 'text-primary' : 'text-white'}`}>
                                          {opt.title}
                                        </span>
                                        <p className="text-[10px] text-foreground/60 mt-1 leading-snug">
                                          {opt.desc}
                                        </p>
                                      </button>
                                    )
                                  })}
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* ================================================= */}
                          {/* STEP 2: PARTY SIZE & ACCOMMODATION STYLE          */}
                          {/* ================================================= */}
                          {currentStep === 2 && (
                            <motion.div
                              key="step-2"
                              custom={direction}
                              variants={slideVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              className="space-y-6"
                            >
                              <div className="space-y-1">
                                <h4 className="font-serif text-lg text-white font-medium">
                                  Who will be traveling in your party?
                                </h4>
                                <p className="text-xs text-foreground/60">
                                  Ensure accurate private aircraft manifest and royal suite configurations.
                                </p>
                              </div>

                              {/* Guest Counters */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Adults */}
                                <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-between">
                                  <div>
                                    <span className="block text-xs font-mono uppercase tracking-wider text-white">
                                      Adult Guests
                                    </span>
                                    <span className="text-[11px] text-foreground/50">Age 13 and above</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button
                                      type="button"
                                      disabled={adults <= 1}
                                      onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                                      className="size-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center text-foreground/70 hover:bg-white/15 hover:text-white disabled:opacity-30 cursor-pointer"
                                    >
                                      <Minus className="size-4" />
                                    </button>
                                    <span className="font-mono text-base font-bold text-primary w-5 text-center">
                                      {adults}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => setAdults((prev) => prev + 1)}
                                      className="size-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center text-foreground/70 hover:bg-white/15 hover:text-white cursor-pointer"
                                    >
                                      <Plus className="size-4" />
                                    </button>
                                  </div>
                                </div>

                                {/* Children */}
                                <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-between">
                                  <div>
                                    <span className="block text-xs font-mono uppercase tracking-wider text-white">
                                      Young VIPs
                                    </span>
                                    <span className="text-[11px] text-foreground/50">Under age 13</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button
                                      type="button"
                                      disabled={children <= 0}
                                      onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                                      className="size-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center text-foreground/70 hover:bg-white/15 hover:text-white disabled:opacity-30 cursor-pointer"
                                    >
                                      <Minus className="size-4" />
                                    </button>
                                    <span className="font-mono text-base font-bold text-primary w-5 text-center">
                                      {children}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => setChildren((prev) => prev + 1)}
                                      className="size-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center text-foreground/70 hover:bg-white/15 hover:text-white cursor-pointer"
                                    >
                                      <Plus className="size-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Palace Suite Preferences */}
                              <div className="space-y-3 pt-2 border-t border-white/10">
                                <label className="text-xs font-mono uppercase tracking-wider text-foreground/75 flex items-center gap-2">
                                  <Award className="size-3.5 text-primary" /> Palace Accommodation Architecture
                                </label>
                                <div className="space-y-2.5">
                                  {SUITE_PREFERENCES.map((suite) => {
                                    const isSel = suitePreference === suite.title
                                    return (
                                      <button
                                        key={suite.id}
                                        type="button"
                                        onClick={() => setSuitePreference(suite.title)}
                                        className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                                          isSel
                                            ? 'border-primary bg-primary/15 shadow-md shadow-primary/15'
                                            : 'border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]'
                                        }`}
                                      >
                                        <div className="flex items-center justify-between">
                                          <span className={`text-xs font-semibold ${isSel ? 'text-primary' : 'text-white'}`}>
                                            {suite.title}
                                          </span>
                                          {isSel && <Check className="size-3.5 text-primary shrink-0" />}
                                        </div>
                                        <p className="text-[11px] text-foreground/60 mt-0.5">
                                          {suite.desc}
                                        </p>
                                      </button>
                                    )
                                  })}
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* ================================================= */}
                          {/* STEP 3: BESPOKE REQUESTS & OCCASIONS              */}
                          {/* ================================================= */}
                          {currentStep === 3 && (
                            <motion.div
                              key="step-3"
                              custom={direction}
                              variants={slideVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              className="space-y-6"
                            >
                              <div className="space-y-1">
                                <h4 className="font-serif text-lg text-white font-medium">
                                  Bespoke Dining & Personal Care
                                </h4>
                                <p className="text-xs text-foreground/60">
                                  Select all dietary requirements and special accommodations.
                                </p>
                              </div>

                              {/* Dietary Privileges Multi-Select Chips */}
                              <div className="space-y-2.5">
                                <label className="text-xs font-mono uppercase tracking-wider text-foreground/75 flex items-center gap-2">
                                  <Utensils className="size-3.5 text-primary" /> Dietary Privileges (Multi-Select)
                                </label>
                                <div className="flex flex-wrap gap-2">
                                  {DIETARY_OPTIONS.map((item) => {
                                    const isSel = selectedDietary.includes(item)
                                    return (
                                      <button
                                        key={item}
                                        type="button"
                                        onClick={() => toggleArrayItem(item, selectedDietary, setSelectedDietary)}
                                        className={`px-3 py-1.5 rounded-full border text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                                          isSel
                                            ? 'border-primary bg-primary/20 text-primary font-medium'
                                            : 'border-white/10 bg-white/5 text-foreground/70 hover:border-white/20'
                                        }`}
                                      >
                                        {isSel && <Check className="size-3" />}
                                        <span>{item}</span>
                                      </button>
                                    )
                                  })}
                                </div>
                              </div>

                              {/* Accessibility & Comfort */}
                              <div className="space-y-2.5 pt-2 border-t border-white/10">
                                <label className="text-xs font-mono uppercase tracking-wider text-foreground/75 flex items-center gap-2">
                                  <HeartHandshake className="size-3.5 text-primary" /> Accessibility & Comfort
                                </label>
                                <div className="flex flex-wrap gap-2">
                                  {ACCESSIBILITY_OPTIONS.map((item) => {
                                    const isSel = selectedAccessibility.includes(item)
                                    return (
                                      <button
                                        key={item}
                                        type="button"
                                        onClick={() => toggleArrayItem(item, selectedAccessibility, setSelectedAccessibility)}
                                        className={`px-3 py-1.5 rounded-full border text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                                          isSel
                                            ? 'border-primary bg-primary/20 text-primary font-medium'
                                            : 'border-white/10 bg-white/5 text-foreground/70 hover:border-white/20'
                                        }`}
                                      >
                                        {isSel && <Check className="size-3" />}
                                        <span>{item}</span>
                                      </button>
                                    )
                                  })}
                                </div>
                              </div>

                              {/* Freeform VIP Briefing Notes */}
                              <div className="space-y-2 pt-2 border-t border-white/10">
                                <label className="text-xs font-mono uppercase tracking-wider text-foreground/90 font-medium">
                                  Confidential Briefing Notes (Optional)
                                </label>
                                <textarea
                                  rows={3}
                                  value={vipBrief}
                                  onChange={(e) => setVipBrief(e.target.value)}
                                  placeholder="Describe any private jet tarmac connections, armed escort, antique shopping curators, or discreet celebration requests..."
                                  className="w-full rounded-lg border border-white/12 bg-white/5 px-4 py-3 text-[16px] md:text-sm text-foreground placeholder:text-foreground/45 backdrop-blur-md outline-none transition-all duration-300 hover:border-white/25 focus:border-gold/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] resize-none leading-relaxed"
                                />
                              </div>
                            </motion.div>
                          )}

                          {/* ================================================= */}
                          {/* STEP 4: CONTACT & DISCRETION PROTOCOL             */}
                          {/* ================================================= */}
                          {currentStep === 4 && (
                            <motion.div
                              key="step-4"
                              custom={direction}
                              variants={slideVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              className="space-y-5"
                            >
                              <div className="space-y-1">
                                <h4 className="font-serif text-lg text-white font-medium">
                                  Confidential Dispatch Destination
                                </h4>
                                <p className="text-xs text-foreground/60">
                                  Direct coordinates for your Chief Operations curator liaison.
                                </p>
                              </div>

                              {submitError && (
                                <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
                                  {submitError}
                                </div>
                              )}

                              {/* Salutation + Full Name */}
                              <div className="grid grid-cols-4 gap-3">
                                <div className="col-span-1 space-y-1.5">
                                  <label className="text-[11px] font-mono uppercase tracking-wider text-foreground/75">
                                    Title
                                  </label>
                                  <select
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full min-h-[48px] rounded-lg border border-white/12 bg-white/5 px-3 py-3 text-[16px] md:text-sm text-foreground outline-none transition-all duration-300 hover:border-white/25 focus:border-gold/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] cursor-pointer"
                                  >
                                    <option value="Mr." className="bg-[#141310] text-[#F4F2EC]">Mr.</option>
                                    <option value="Ms." className="bg-[#141310] text-[#F4F2EC]">Ms.</option>
                                    <option value="Dr." className="bg-[#141310] text-[#F4F2EC]">Dr.</option>
                                    <option value="Lord" className="bg-[#141310] text-[#F4F2EC]">Lord</option>
                                    <option value="Lady" className="bg-[#141310] text-[#F4F2EC]">Lady</option>
                                    <option value="Ambassador" className="bg-[#141310] text-[#F4F2EC]">Amb.</option>
                                  </select>
                                </div>

                                <div className="col-span-3 space-y-1.5">
                                  <label className="text-xs font-mono uppercase tracking-wider text-foreground/90 font-medium">
                                    Full Legal / Preferred Name *
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Alistair Sterling"
                                    className="w-full min-h-[48px] rounded-lg border border-white/12 bg-white/5 px-4 py-3 text-[16px] md:text-sm text-foreground placeholder:text-foreground/45 backdrop-blur-md outline-none transition-all duration-300 hover:border-white/25 focus:border-gold/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                                  />
                                </div>
                              </div>

                              {/* Email */}
                              <div className="space-y-1.5">
                                <label className="text-xs font-mono uppercase tracking-wider text-foreground/90 font-medium flex items-center gap-1.5">
                                  <Mail className="size-3.5 text-primary" /> Primary Confidential Email *
                                </label>
                                <input
                                  type="email"
                                  required
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="client@familyoffice.in"
                                  className="w-full min-h-[48px] rounded-lg border border-white/12 bg-white/5 px-4 py-3 text-[16px] md:text-sm text-foreground placeholder:text-foreground/45 backdrop-blur-md outline-none transition-all duration-300 hover:border-white/25 focus:border-gold/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                                />
                              </div>

                              {/* Phone / WhatsApp: Strict Indian Mobile Validation (+91, 10 Digits) */}
                              <div className="space-y-1.5">
                                <label className="text-xs font-mono uppercase tracking-wider text-foreground/90 font-medium flex items-center justify-between">
                                  <span className="flex items-center gap-1.5">
                                    <Phone className="size-3.5 text-primary" /> Direct Indian Mobile / WhatsApp *
                                  </span>
                                  <span className="text-[10px] font-mono text-primary/80">
                                    Strict +91 (10 Digits)
                                  </span>
                                </label>

                                <div className="relative flex items-center">
                                  {/* +91 Fixed Flag/Prefix Badge */}
                                  <div className="flex min-h-[48px] items-center gap-1.5 px-3.5 py-3 rounded-l-lg border border-r-0 border-white/12 bg-white/10 text-white text-[16px] md:text-sm font-mono select-none">
                                    <span className="text-[11px] font-mono font-semibold tracking-wider text-foreground/80">IND</span>
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
                                    className={`w-full min-h-[48px] rounded-r-lg border border-white/12 bg-white/5 px-4 py-3 text-[16px] md:text-sm text-foreground font-mono placeholder:text-foreground/45 backdrop-blur-md outline-none transition-all duration-300 hover:border-white/25 ${
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
                                          : `10 digits required (${10 - phoneDigits.length} more digit${10 - phoneDigits.length === 1 ? '' : 's'} needed)`}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Channel Selector */}
                              <div className="space-y-2 pt-1">
                                <label className="text-[11px] font-mono uppercase tracking-wider text-foreground/75">
                                  Preferred Transmission Protocol
                                </label>
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                  {[
                                    { id: 'whatsapp', label: 'WhatsApp' },
                                    { id: 'email', label: 'Encrypted Email' },
                                    { id: 'call', label: 'Direct Call' },
                                  ].map((ch) => (
                                    <button
                                      key={ch.id}
                                      type="button"
                                      onClick={() => setPreferredChannel(ch.id as any)}
                                      className={`py-2 px-2 rounded-xl border text-center text-xs font-mono transition-all cursor-pointer ${
                                        preferredChannel === ch.id
                                          ? 'border-primary bg-primary/20 text-primary font-semibold'
                                          : 'border-white/10 bg-white/5 text-foreground/70 hover:bg-white/10'
                                      }`}
                                    >
                                      {ch.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Bilateral NDA Toggle */}
                              <label className="flex items-start gap-3 p-3 rounded-xl border border-primary/30 bg-primary/10 cursor-pointer hover:bg-primary/15 transition-colors">
                                <input
                                  type="checkbox"
                                  checked={requiresNda}
                                  onChange={(e) => setRequiresNda(e.target.checked)}
                                  className="size-4 mt-0.5 rounded border-white/20 bg-white/10 text-primary focus:ring-primary"
                                />
                                <div className="text-xs">
                                  <span className="font-semibold text-white block">
                                    Request Bilateral Non-Disclosure Agreement (NDA)
                                  </span>
                                  <span className="text-[11px] text-foreground/70">
                                    Execute our legal mutual NDA before final flight manifests or itinerary specifics are transmitted.
                                  </span>
                                </div>
                              </label>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* ===================================================== */}
                        {/* FOOTER ACTIONS: BACK / NEXT / SUBMIT                  */}
                        {/* ===================================================== */}
                        <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3">
                          {currentStep > 1 ? (
                            <motion.button
                              type="button"
                              onClick={goToPrevStep}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="inline-flex min-h-[48px] items-center gap-1.5 px-4 py-3 rounded-lg border border-white/12 bg-white/5 text-xs font-mono uppercase tracking-wider text-foreground/85 hover:bg-white/10 hover:border-white/25 hover:text-white transition-all duration-300 cursor-pointer"
                            >
                              <ArrowLeft className="size-3.5" />
                              <span>Back</span>
                            </motion.button>
                          ) : (
                            <div />
                          )}

                          {currentStep < 4 ? (
                            <motion.button
                              type="button"
                              onClick={goToNextStep}
                              whileHover={{ scale: 1.015 }}
                              whileTap={{ scale: 0.98 }}
                              className="inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-gradient-to-r from-gold via-[#e0c774] to-gold hover:from-[#c5a030] hover:to-[#b89326] border border-gold/50 py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.1em] text-[#0B0F19] shadow-xl shadow-gold/25 transition-all duration-300 hover:brightness-105 cursor-pointer"
                            >
                              <span>Next Step</span>
                              <ArrowRight className="size-3.5 text-[#0B0F19]" />
                            </motion.button>
                          ) : (
                            <motion.button
                              type="submit"
                              disabled={isPending}
                              whileHover={{ scale: isPending ? 1 : 1.015 }}
                              whileTap={{ scale: isPending ? 1 : 0.98 }}
                              className="inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-gradient-to-r from-gold via-[#e0c774] to-gold hover:from-[#c5a030] hover:to-[#b89326] border border-gold/50 py-3.5 px-7 text-xs font-semibold uppercase tracking-[0.1em] text-[#0B0F19] shadow-xl shadow-gold/25 transition-all duration-300 hover:brightness-105 disabled:opacity-50 cursor-pointer"
                            >
                              {isPending ? (
                                <>
                                  <Loader2 className="size-4 animate-spin text-[#0B0F19]" />
                                  <span>Transmitting Dossier...</span>
                                </>
                              ) : (
                                <>
                                  <Send className="size-3.5 text-[#0B0F19]" />
                                  <span>Transmit VIP Brief</span>
                                </>
                              )}
                            </motion.button>
                          )}
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Drawer Footer Notice */}
                  {!submitted && (
                    <div className="relative z-10 px-6 sm:px-8 py-4 border-t border-white/10 bg-black/40 text-center">
                      <p className="text-[11px] text-foreground/50 font-mono tracking-wider uppercase">
                        Sovereign Discretion • TLS 1.3 Encrypted Protocol
                      </p>
                    </div>
                  )}
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
