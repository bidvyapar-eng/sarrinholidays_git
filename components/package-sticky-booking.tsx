'use client'

import React, { useState } from 'react'
import { openConciergeDrawer, type HospitalityTier } from '@/components/ConciergeDrawer'
import { Phone, ShieldCheck, ArrowUpRight } from 'lucide-react'
import type { PackageItem } from '@/lib/cms'

export const HOSPITALITY_TIERS: {
  id: HospitalityTier
  label: string
  multiplier: number
  description: string
  properties: string
}[] = [
  {
    id: 'Boutique Heritage',
    label: 'Boutique Heritage',
    multiplier: 1.0,
    description: 'Curated 4-Star & 5-Star Heritage Havelis and Boutique Plantations',
    properties: 'Abad Atrium · Coconut Lagoon · CGH Earth',
  },
  {
    id: 'Grand Luxury',
    label: 'Grand Luxury',
    multiplier: 1.55,
    description: 'Palace Stays, Lake & Hill Suites with Private Chauffeur',
    properties: 'Taj Mahal Palace · Oberoi Amarvilas · Leela Palace',
  },
  {
    id: 'Presidential Charter',
    label: 'Presidential',
    multiplier: 2.85,
    description: 'Exclusive Palace Buyouts, Private Aviation & Master Butler',
    properties: 'Taj Lake Palace Buyout · Rambagh Presidential',
  },
]

interface PackageStickyBookingCardProps {
  pkg: PackageItem
}

export function PackageStickyBookingCard({ pkg }: PackageStickyBookingCardProps) {
  const [selectedTier, setSelectedTier] = useState<HospitalityTier>('Boutique Heritage')

  const rawPrice = pkg.price && pkg.price > 0 ? pkg.price : 95000
  const normalizedBase =
    rawPrice < 1000 ? rawPrice * 1000 : rawPrice < 10000 ? rawPrice * 100 : rawPrice

  const tierObj =
    HOSPITALITY_TIERS.find((t) => t.id === selectedTier) || HOSPITALITY_TIERS[0]
  const currentPrice = Math.round(normalizedBase * tierObj.multiplier)

  const handleOpenDrawer = () => {
    openConciergeDrawer({
      packageTitle: pkg.title,
      route: pkg.destinations?.join(' • ') || '',
      slug: pkg.slug,
      tier: selectedTier,
    })
  }

  return (
    <div className="sticky top-28 space-y-5">
      {/* Main Architectural Booking Card */}
      <div className="rounded-sm border border-white/10 bg-[#141310] p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/80 space-y-6">
        {/* Dynamic Pricing Header */}
        <div>
          <span className="text-[11px] uppercase font-sans tracking-[0.1em] text-[#C5A059] font-medium block mb-1">
            Bespoke Lead-Generation &amp; Consultation
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl sm:text-4xl text-[#F4F2EC] font-medium tracking-tight">
              Tariff on Request
            </span>
          </div>
          <p className="text-sm text-[#E5E2DC] mt-2 leading-relaxed font-normal">
            Privately tailored to your chosen party size, room categories, and seasonal dates with zero hidden surcharges.
          </p>
        </div>

        {/* Interactive 3-Tier Switcher */}
        <div className="space-y-2.5 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-[0.1em]">
            <span className="text-[#E5E2DC]">Hospitality Tier</span>
            <span className="text-[#C5A059] font-medium">{selectedTier}</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-sm bg-[#0C0B09] border border-white/10">
            {HOSPITALITY_TIERS.map((t) => {
              const isActive = selectedTier === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTier(t.id)}
                  className={`px-2 py-2 text-center rounded-sm text-xs font-sans transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#C5A059] text-[#0C0B09] font-medium shadow-sm'
                      : 'text-[#E5E2DC] hover:text-[#F4F2EC] hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="block truncate text-[11px]">{t.label}</span>
                </button>
              )
            })}
          </div>

          {/* Tier Description Box */}
          <div className="p-3 rounded-sm bg-[#0C0B09]/60 border border-white/5 text-[11px] leading-relaxed">
            <span className="text-[#F4F2EC] font-medium block">{tierObj.description}</span>
            <span className="text-stone-200 text-[10px] mt-0.5 block">{tierObj.properties}</span>
          </div>
        </div>

        {/* Itinerary Metadata Summary */}
        <div className="border-t border-white/10 pt-4 space-y-2.5 text-xs font-sans">
          <div className="flex justify-between text-[#E5E2DC]">
            <span>Duration</span>
            <span className="font-medium text-[#F4F2EC]">{pkg.duration}</span>
          </div>
          {pkg.destinations && pkg.destinations.length > 0 && (
            <div className="flex justify-between text-[#E5E2DC] gap-3">
              <span className="shrink-0">Circuit</span>
              <span className="font-medium text-[#F4F2EC] truncate text-right">
                {pkg.destinations.join(' • ')}
              </span>
            </div>
          )}
          <div className="flex justify-between text-[#E5E2DC]">
            <span>Availability</span>
            <span className="font-medium text-[#C5A059]">Bespoke Scheduling</span>
          </div>
        </div>

        {/* Dual Actions */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleOpenDrawer}
            className="w-full flex items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] text-[#0C0B09] py-3.5 px-5 text-xs font-sans font-medium uppercase tracking-[0.1em] transition-all duration-300 shadow-lg shadow-[#C5A059]/20 cursor-pointer"
          >
            <span>Design This Journey</span>
            <ArrowUpRight className="size-4" />
          </button>

          <a
            href={`https://wa.me/918419887730?text=${encodeURIComponent(
              `Hello Sarrin Holidays, I would like to design the ${pkg.title} (${pkg.duration}) under the ${selectedTier} tier.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-sm bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/30 py-3 px-4 text-xs font-sans text-emerald-300 transition-colors"
          >
            <Phone className="size-3.5" />
            <span>Instant WhatsApp Consultation</span>
          </a>
        </div>

        <div className="border-t border-white/10 pt-4 text-center">
          <p className="text-[11px] text-[#E5E2DC]/70 font-sans tracking-wider uppercase">
            Direct Sarrin Holidays Desk: +91 84198 87730
          </p>
        </div>
      </div>

      {/* Security & Confidentiality Card */}
      <div className="p-5 rounded-sm bg-[#141310] border border-white/10 text-xs text-[#E5E2DC] space-y-2">
        <div className="flex items-center gap-2 text-[#F4F2EC] font-medium">
          <ShieldCheck className="size-4 text-[#C5A059]" />
          <span>Strict Non-Disclosure &amp; VIP Security</span>
        </div>
        <p className="text-[11px] leading-relaxed text-stone-200 font-normal">
          Client passenger manifests, special security requirements, and custom flight requests are safeguarded under strict legal confidentiality covenants.
        </p>
      </div>
    </div>
  )
}

export function MobileStickyBookingBar({ pkg }: PackageStickyBookingCardProps) {
  const rawPrice = pkg.price && pkg.price > 0 ? pkg.price : 95000
  const normalizedBase =
    rawPrice < 1000 ? rawPrice * 1000 : rawPrice < 10000 ? rawPrice * 100 : rawPrice

  const handleOpenDrawer = () => {
    openConciergeDrawer({
      packageTitle: pkg.title,
      route: pkg.destinations?.join(' • ') || '',
      slug: pkg.slug,
      tier: 'Boutique Heritage',
    })
  }

  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 z-50 bg-[#0C0B09]/95 backdrop-blur-2xl border-t border-white/10 p-3 sm:p-4 shadow-[0_-10px_35px_rgba(0,0,0,0.85)]">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[#C5A059] block truncate font-medium">
            Bespoke Itinerary
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-xl sm:text-2xl font-medium text-[#F4F2EC]">
              Tariff on Request
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`https://wa.me/918419887730?text=${encodeURIComponent(
              `Hello Sarrin Holidays, I would like to inquire about the ${pkg.title} (${pkg.duration}).`
            )}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 transition-colors"
          >
            <Phone className="size-4" />
          </a>

          <button
            type="button"
            onClick={handleOpenDrawer}
            className="flex min-h-[44px] items-center justify-center rounded-sm bg-[#C5A059] hover:bg-[#D4B475] text-[#0C0B09] px-4 py-2 text-xs font-sans font-medium uppercase tracking-[0.14em] transition-colors cursor-pointer"
          >
            <span>Design Journey</span>
          </button>
        </div>
      </div>
    </div>
  )
}

