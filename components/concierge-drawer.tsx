'use client'

import React, { useState, useEffect, useTransition } from 'react'
import {
  X,
  Phone,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Building2,
  Crown,
  Compass,
  ArrowRight,
  MessageSquare,
  Users,
  Calendar,
  MapPin,
  Check,
  Loader2,
} from 'lucide-react'
import { submitVipInquiry } from '@/app/actions/vip-inquiry'

export type HospitalityTier = 'Boutique Heritage' | 'Grand Luxury' | 'Presidential Charter'

export interface ConciergeDrawerDetail {
  packageTitle?: string
  route?: string
  slug?: string
  tier?: HospitalityTier
}

// Global dispatch helper to open the drawer from anywhere in the app
export function openConciergeDrawer(detail?: ConciergeDrawerDetail) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('sarrin:open-concierge', {
        detail: detail || {},
      })
    )
  }
}

export interface ConciergeDrawerProps {
  isOpen?: boolean
  onClose?: () => void
  initialPackage?: ConciergeDrawerDetail
}

const HOSPITALITY_TIERS: {
  id: HospitalityTier
  title: string
  subtitle: string
  description: string
  badge?: string
  icon: typeof Crown
}[] = [
  {
    id: 'Boutique Heritage',
    title: 'Boutique Heritage',
    subtitle: '4-Star Curated Heritage & Boutique Stays',
    description:
      'Restored Rajput havelis, character courtyard suites, intimate plantation estates & resident local historians.',
    icon: Compass,
  },
  {
    id: 'Grand Luxury',
    title: 'Grand Luxury',
    subtitle: '5-Star Taj, Oberoi & Leela Properties',
    description:
      'Iconic palace suites (Lake Palace Udaipur, Rambagh Palace, Oberoi Amarvilas), dedicated royal butlers & private garden dining.',
    badge: 'Signature Standard',
    icon: Building2,
  },
  {
    id: 'Presidential Charter',
    title: 'Presidential Charter',
    subtitle: 'Palace Suite Buyouts & Private Aviation',
    description:
      'Complete private palace wing or houseboat buyouts, dedicated twin-engine helicopter corridors & sovereign discretion.',
    badge: 'Ultra-Exclusive',
    icon: Crown,
  },
]

const SEASONS = [
  { id: 'Oct – Dec', label: 'Oct – Dec', tag: 'Peak Heritage' },
  { id: 'Jan – Mar', label: 'Jan – Mar', tag: 'Pleasant Winter' },
  { id: 'Apr – Jun', label: 'Apr – Jun', tag: 'Himalayan Summer' },
  { id: 'Jul – Sep', label: 'Jul – Sep', tag: 'Monsoon Sanctuaries' },
  { id: 'Flexible Window', label: 'Flexible Dates', tag: 'Any Season' },
]

const PARTY_SIZES = [
  { id: 'Couple', label: 'Couple', sub: '2 Guests', adults: 2 },
  { id: 'Family', label: 'Family', sub: '3–5 Guests', adults: 4 },
  { id: 'Private Group', label: 'Private Group', sub: '6+ Guests', adults: 6 },
  { id: 'Solo Atelier', label: 'Solo Atelier', sub: '1 Guest', adults: 1 },
]

export function ConciergeDrawer({
  isOpen: propIsOpen,
  onClose: propOnClose,
  initialPackage,
}: ConciergeDrawerProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = propIsOpen !== undefined
  const isOpen = isControlled ? propIsOpen : internalOpen

  const [packageDetail, setPackageDetail] = useState<ConciergeDrawerDetail | null>(
    initialPackage || null
  )

  // Form State
  const [tier, setTier] = useState<HospitalityTier>('Grand Luxury')
  const [season, setSeason] = useState<string>('Oct – Dec')
  const [party, setParty] = useState<string>('Couple')
  const [fullName, setFullName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('+91 ')
  const [specialRequests, setSpecialRequests] = useState<string>('')

  // UI state
  const [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successReferenceId, setSuccessReferenceId] = useState<string | null>(null)

  // Listen to global open event
  useEffect(() => {
    function handleGlobalOpen(e: Event) {
      const customEvent = e as CustomEvent<ConciergeDrawerDetail>
      if (customEvent.detail) {
        setPackageDetail(customEvent.detail)
        if (customEvent.detail.tier) {
          setTier(customEvent.detail.tier)
        }
      }
      setErrorMessage(null)
      setSuccessReferenceId(null)
      setInternalOpen(true)
    }

    window.addEventListener('sarrin:open-concierge', handleGlobalOpen)
    return () => window.removeEventListener('sarrin:open-concierge', handleGlobalOpen)
  }, [])

  // Sync initialPackage when prop changes
  useEffect(() => {
    if (initialPackage) {
      setPackageDetail(initialPackage)
      if (initialPackage.tier) setTier(initialPackage.tier)
    }
  }, [initialPackage])

  // Close handlers
  const handleClose = () => {
    if (propOnClose) {
      propOnClose()
    } else {
      setInternalOpen(false)
    }
    setErrorMessage(null)
  }

  // Keyboard Escape listener & body scroll lock
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  // Construct dynamic WhatsApp link
  const generateWhatsAppUrl = () => {
    const journeyTitle = packageDetail?.packageTitle || 'Bespoke Private Indian Journey'
    const routeText = packageDetail?.route ? `\n• Route: ${packageDetail.route}` : ''
    const guestText = fullName.trim() ? `\n• Guest: ${fullName.trim()}` : ''

    const message = `Namaste Sarrin Concierge,\n\nI would like to design a bespoke journey with your curatorial atelier:\n\n• Selected Circuit: ${journeyTitle}${routeText}\n• Preferred Hospitality: ${tier}\n• Travel Season: ${season}\n• Party: ${party}${guestText}\n\nPlease share your curatorial recommendations and itinerary tariffs.`

    return `https://wa.me/918419887730?text=${encodeURIComponent(message)}`
  }

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!fullName.trim() || !email.trim() || !phone.trim() || phone.trim() === '+91') {
      setErrorMessage('Please provide your full name, email, and phone number.')
      return
    }

    startTransition(async () => {
      try {
        const partyObj = PARTY_SIZES.find((p) => p.id === party)
        const adultsCount = partyObj?.adults || 2

        const result = await submitVipInquiry({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          serviceOrPackageTitle: packageDetail?.packageTitle || 'Bespoke Pan-Indian Journey',
          classification: tier,
          season: season,
          adults: adultsCount,
          children: 0,
          suitePreference: tier,
          vipBrief: [
            packageDetail?.route ? `Selected Route: ${packageDetail.route}` : null,
            `Party Architecture: ${party} (${adultsCount} Guests)`,
            `Hospitality Standard: ${tier}`,
            `Anticipated Season: ${season}`,
            specialRequests ? `Special Requests:\n${specialRequests.trim()}` : null,
          ]
            .filter(Boolean)
            .join('\n\n'),
          preferredChannel: 'whatsapp',
          requiresNda: tier === 'Presidential Charter',
        })

        if (result.success && result.referenceId) {
          setSuccessReferenceId(result.referenceId)
        } else {
          setErrorMessage(result.error || 'Unable to submit inquiry. Please try again or connect via WhatsApp.')
        }
      } catch (err: any) {
        setErrorMessage(err?.message || 'A network error occurred. Please connect directly via WhatsApp.')
      }
    })
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sarrin Holidays Concierge Drawer"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative z-10 flex h-full w-full max-w-xl flex-col border-l border-white/10 bg-[#0C0B09] shadow-2xl text-[#F4F2EC] animate-in slide-in-from-right duration-300 ease-out">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#141310] px-6 py-5 sm:px-8">
          <div>
            <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-[#C5A059]">
              Sarrin Concierge Desk
            </span>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-light text-[#F4F2EC] leading-tight">
              Design Your Journey
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close concierge drawer"
            className="flex size-10 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-[#B8B4AA] transition-colors hover:border-[#C5A059]/40 hover:bg-[#C5A059]/10 hover:text-[#C5A059] cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 space-y-7 [scrollbar-width:thin] [scrollbar-color:#C5A059_transparent]">
          
          {/* SUCCESS SCREEN */}
          {successReferenceId ? (
            <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#C5A059]">
                <CheckCircle2 className="size-8" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
                  Confidential Dossier Initialized
                </span>
                <h3 className="mt-2 font-serif text-3xl font-light text-[#F4F2EC]">
                  Inquiry Received with Honour
                </h3>
                <p className="mt-3 text-sm text-[#B8B4AA] leading-relaxed max-w-md mx-auto font-light">
                  Our Senior Curatorial Desk has received your bespoke journey parameters. A private itinerary proposal with guaranteed palace inventory will be presented within 2 hours.
                </p>
              </div>

              {/* Reference ID Pill */}
              <div className="inline-block rounded-sm border border-[#C5A059]/40 bg-[#141310] px-5 py-3 text-center">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#B8B4AA]">
                  VIP Dossier Reference
                </span>
                <span className="mt-0.5 font-mono text-base font-semibold text-[#C5A059]">
                  {successReferenceId}
                </span>
              </div>

              {/* Instant WhatsApp Follow-up */}
              <div className="pt-4 space-y-3">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-sm bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300 transition-colors"
                >
                  <MessageSquare className="size-4" />
                  <span>Connect Directly via WhatsApp Now</span>
                </a>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full rounded-sm border border-white/10 bg-white/5 py-3 text-xs font-medium uppercase tracking-wider text-[#B8B4AA] hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Return to Atelier
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              
              {/* 1. Context-Aware Pre-filling Card */}
              {packageDetail?.packageTitle ? (
                <div className="rounded-sm border border-[#C5A059]/40 bg-[#141310] p-4.5 sm:p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-16 w-16 bg-[#C5A059]/5 blur-2xl pointer-events-none" />
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
                      Selected Expedition
                    </span>
                    <button
                      type="button"
                      onClick={() => setPackageDetail(null)}
                      className="text-[10px] text-[#B8B4AA] hover:text-[#C5A059] uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Change Circuit
                    </button>
                  </div>
                  <h4 className="mt-1 font-serif text-xl sm:text-2xl text-[#F4F2EC] font-normal leading-snug">
                    {packageDetail.packageTitle}
                  </h4>
                  {packageDetail.route && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-[#C5A059] font-medium tracking-wide">
                      <MapPin className="size-3.5 shrink-0" />
                      <span className="truncate">{packageDetail.route}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-sm border border-white/10 bg-[#141310] p-4.5 sm:p-5">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
                    Expedition Focus
                  </span>
                  <h4 className="mt-1 font-serif text-xl text-[#F4F2EC] font-normal">
                    Custom Pan-Indian Bespoke Expedition
                  </h4>
                  <p className="mt-1 text-xs text-[#B8B4AA] font-light">
                    Handcrafted to your choice of royal palaces, backwaters, or high mountain passes.
                  </p>
                </div>
              )}

              {/* 2. Interactive 3-Tier Hospitality Selector */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-sans font-semibold uppercase tracking-[0.16em] text-[#F4F2EC]">
                    Accommodation Standard
                  </label>
                  <span className="text-[10px] uppercase tracking-wider text-[#C5A059]">
                    3 Curated Tiers
                  </span>
                </div>
                <div className="mt-3 space-y-2.5">
                  {HOSPITALITY_TIERS.map((item) => {
                    const isSelected = tier === item.id
                    const IconComponent = item.icon
                    return (
                      <div
                        key={item.id}
                        onClick={() => setTier(item.id)}
                        className={`group relative rounded-sm border p-4 transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'border-[#C5A059] bg-[#C5A059]/10 shadow-lg shadow-[#C5A059]/5'
                            : 'border-white/10 bg-[#141310] hover:border-white/25 hover:bg-[#191814]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div
                              className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm border transition-colors ${
                                isSelected
                                  ? 'border-[#C5A059] bg-[#C5A059] text-[#0C0B09]'
                                  : 'border-white/15 bg-white/5 text-[#B8B4AA] group-hover:text-[#F4F2EC]'
                              }`}
                            >
                              <IconComponent className="size-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-serif text-lg text-[#F4F2EC] font-medium leading-none">
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span className="rounded-sm border border-[#C5A059]/40 bg-[#0C0B09] px-2 py-0.5 text-[9px] font-sans font-semibold uppercase tracking-wider text-[#C5A059]">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <div className="mt-1 text-[11px] font-medium text-[#C5A059]">
                                {item.subtitle}
                              </div>
                              <p className="mt-1.5 text-xs leading-relaxed text-[#B8B4AA] font-light">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          {/* Custom Radio Circle */}
                          <div
                            className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                              isSelected
                                ? 'border-[#C5A059] bg-[#C5A059]'
                                : 'border-white/20 bg-transparent group-hover:border-white/40'
                            }`}
                          >
                            {isSelected && <Check className="size-3 text-[#0C0B09] stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 3. Travel Month & Party Size Pickers */}
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Travel Month / Season */}
                <div>
                  <label className="text-xs font-sans font-semibold uppercase tracking-[0.16em] text-[#F4F2EC] flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-[#C5A059]" />
                    <span>Travel Season</span>
                  </label>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {SEASONS.map((s) => {
                      const isSelected = season === s.id
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSeason(s.id)}
                          className={`flex flex-col items-start rounded-sm border px-3 py-1.5 text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#C5A059] bg-[#C5A059] text-[#0C0B09]'
                              : 'border-white/10 bg-[#141310] text-[#B8B4AA] hover:border-white/25 hover:text-[#F4F2EC]'
                          }`}
                        >
                          <span className="text-[11px] font-semibold tracking-wider">
                            {s.label}
                          </span>
                          <span
                            className={`text-[9px] uppercase tracking-wider ${
                              isSelected ? 'text-[#0C0B09]/80' : 'text-[#C5A059]'
                            }`}
                          >
                            {s.tag}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Party Size */}
                <div>
                  <label className="text-xs font-sans font-semibold uppercase tracking-[0.16em] text-[#F4F2EC] flex items-center gap-1.5">
                    <Users className="size-3.5 text-[#C5A059]" />
                    <span>Party Architecture</span>
                  </label>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {PARTY_SIZES.map((p) => {
                      const isSelected = party === p.id
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setParty(p.id)}
                          className={`flex flex-col items-start rounded-sm border px-3 py-1.5 text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#C5A059] bg-[#C5A059] text-[#0C0B09]'
                              : 'border-white/10 bg-[#141310] text-[#B8B4AA] hover:border-white/25 hover:text-[#F4F2EC]'
                          }`}
                        >
                          <span className="text-[11px] font-semibold tracking-wider">
                            {p.label}
                          </span>
                          <span
                            className={`text-[9px] uppercase tracking-wider ${
                              isSelected ? 'text-[#0C0B09]/80' : 'text-[#B8B4AA]/70'
                            }`}
                          >
                            {p.sub}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* 4. Guest Contact Information */}
              <div className="space-y-4 border-t border-white/10 pt-6">
                <span className="text-xs font-sans font-semibold uppercase tracking-[0.16em] text-[#F4F2EC] block">
                  Guest Identity &amp; Channel
                </span>

                <div className="space-y-3.5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#B8B4AA] mb-1 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Maharani Gayatri / Lord Sterling"
                      className="w-full rounded-sm border border-white/10 bg-[#141310] px-4 py-2.5 text-sm text-[#F4F2EC] placeholder:text-[#B8B4AA]/40 focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#B8B4AA] mb-1 font-medium">
                        Primary Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="concierge@bespoke.com"
                        className="w-full rounded-sm border border-white/10 bg-[#141310] px-4 py-2.5 text-sm text-[#F4F2EC] placeholder:text-[#B8B4AA]/40 focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#B8B4AA] mb-1 font-medium">
                        Telephone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-sm border border-white/10 bg-[#141310] px-4 py-2.5 text-sm text-[#F4F2EC] placeholder:text-[#B8B4AA]/40 focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                      />
                    </div>
                  </div>

                  {/* Special Requests / Notes */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#B8B4AA] mb-1 font-medium">
                      Bespoke Requests &amp; Discretion Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Dietary preferences, private aviation requirements, celebration dates, or specific palace suites..."
                      className="w-full rounded-sm border border-white/10 bg-[#141310] px-4 py-2.5 text-sm text-[#F4F2EC] placeholder:text-[#B8B4AA]/40 focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="rounded-sm border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
                  {errorMessage}
                </div>
              )}

              {/* Bottom Sticky Action Bar */}
              <div className="pt-2 space-y-3">
                {/* Primary CTA */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex w-full min-h-[46px] items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] active:scale-[0.99] text-[#0C0B09] font-semibold px-6 py-3 text-xs uppercase tracking-[0.16em] transition-all duration-200 cursor-pointer disabled:opacity-50 shadow-lg shadow-[#C5A059]/10"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Transmitting Dossier to Concierge...</span>
                    </>
                  ) : (
                    <>
                      <span>Request Tailored Itinerary &amp; Tariff</span>
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>

                {/* Secondary Instant Action: WhatsApp Concierge */}
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-sm border border-[#C5A059]/40 bg-[#141310] hover:bg-[#C5A059]/10 text-[#C5A059] font-medium px-5 py-2.5 text-xs uppercase tracking-[0.14em] transition-colors"
                >
                  <MessageSquare className="size-3.5 text-[#C5A059]" />
                  <span>Connect Instantly via WhatsApp Concierge</span>
                </a>

                {/* Sovereign Discretion Footnote */}
                <div className="flex items-center justify-center gap-1.5 pt-1 text-center text-[10px] text-[#B8B4AA]/70 font-light">
                  <ShieldCheck className="size-3.5 text-[#C5A059]/70 shrink-0" />
                  <span>Strict Non-Disclosure &amp; Confidential Guest Privacy Protocol</span>
                </div>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  )
}

