'use client'

import React, { useState } from 'react'
import {
  Globe,
  Plane,
  Building2,
  Clock,
  Phone,
  Mail,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  CreditCard,
  Check,
} from 'lucide-react'

interface GlobalConciergeRoutingProps {
  variant?: 'full' | 'compact'
  onSelectDesk?: (desk: 'domestic' | 'nri') => void
  activeDesk?: 'domestic' | 'nri'
  className?: string
}

export function GlobalConciergeRouting({
  variant = 'full',
  onSelectDesk,
  activeDesk,
  className = '',
}: GlobalConciergeRoutingProps) {
  const [selected, setSelected] = useState<'domestic' | 'nri'>(activeDesk || 'nri')

  const handleDeskClick = (desk: 'domestic' | 'nri') => {
    setSelected(desk)
    if (onSelectDesk) {
      onSelectDesk(desk)
    }
  }

  if (variant === 'compact') {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
              <Globe className="size-4" />
            </div>
            <div>
              <h4 className="text-xs font-serif text-[#F4F2EC] tracking-wide">
                Global Concierge Routing
              </h4>
              <p className="text-[10px] text-[#B8B4AA]">
                Select your logistical operations desk
              </p>
            </div>
          </div>
          <span className="text-[10px] font-sans text-[#C5A059] uppercase tracking-[0.16em]">
            24/7 Dedicated
          </span>
        </div>

        {/* Side-by-Side Compact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Domestic (India) Option */}
          <div
            onClick={() => handleDeskClick('domestic')}
            className={`group relative rounded-sm border p-3.5 transition-all cursor-pointer ${
              selected === 'domestic'
                ? 'border-[#C5A059]/60 bg-[#C5A059]/10 shadow-lg shadow-[#C5A059]/10'
                : 'border-white/10 bg-[#141310] hover:border-white/25 hover:bg-[#141310]/90'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-sm bg-white/10 text-[#C5A059]">
                  <Building2 className="size-3.5" />
                </div>
                <div>
                  <h5 className="text-xs font-serif font-medium text-[#F4F2EC]">Domestic (India)</h5>
                  <span className="text-[9px] font-sans uppercase tracking-wider text-[#B8B4AA]">Pan-India Operations</span>
                </div>
              </div>
              {selected === 'domestic' && (
                <span className="size-1.5 rounded-full bg-[#C5A059] animate-pulse" />
              )}
            </div>

            <p className="text-[11px] text-[#B8B4AA] mt-2 line-clamp-2 font-light">
              Chauffeur fleets, private aviation charters, palace buyouts &amp; IST logistics.
            </p>

            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
              <a
                href="tel:+918419887730"
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] font-sans text-[#C5A059] hover:underline flex items-center gap-1"
              >
                <Phone className="size-3" />
                +91 8419887730
              </a>
              <a
                href="/contact?desk=domestic"
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] font-sans font-medium uppercase tracking-wider text-[#F4F2EC]/80 hover:text-[#C5A059] flex items-center gap-0.5"
              >
                <span>Select Desk</span>
                <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>

          {/* International / NRI Option */}
          <div
            onClick={() => handleDeskClick('nri')}
            className={`group relative rounded-sm border p-3.5 transition-all cursor-pointer ${
              selected === 'nri'
                ? 'border-[#C5A059]/60 bg-[#C5A059]/10 shadow-lg shadow-[#C5A059]/10'
                : 'border-white/10 bg-[#141310] hover:border-white/25 hover:bg-[#141310]/90'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-sm bg-[#C5A059]/20 text-[#C5A059]">
                  <Plane className="size-3.5" />
                </div>
                <div>
                  <h5 className="text-xs font-serif font-medium text-[#F4F2EC]">International / NRI</h5>
                  <span className="text-[9px] font-sans uppercase tracking-wider text-[#C5A059]/80">Cross-Border Desk</span>
                </div>
              </div>
              {selected === 'nri' && (
                <span className="size-1.5 rounded-full bg-[#C5A059] animate-pulse" />
              )}
            </div>

            <p className="text-[11px] text-[#B8B4AA] mt-2 line-clamp-2 font-light">
              Indian e-visas, international flight sync, forex billing &amp; multi-timezone liaison.
            </p>

            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
              <a
                href="https://wa.me/918419887730?text=Hello%20Sarrin%20Holidays%20NRI%20Desk,%20I%20am%20inquiring%20from%20abroad%20regarding%20bespoke%20travel%20curation."
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] font-sans text-[#C5A059] hover:underline flex items-center gap-1"
              >
                <Globe className="size-3" />
                NRI WhatsApp Line
              </a>
              <a
                href="/contact?desk=nri"
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] font-sans font-medium uppercase tracking-wider text-[#F4F2EC]/80 hover:text-[#C5A059] flex items-center gap-0.5"
              >
                <span>Select Desk</span>
                <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Full Variant for Contact Us Page & Main Content
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 px-3 py-0.5 text-[10px] font-sans font-medium uppercase tracking-[0.22em] text-[#C5A059]">
            <Globe className="size-3" />
            Global Concierge Routing System
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#F4F2EC] font-light tracking-tight">
            Tailored Logistical Support for Discerning Travelers
          </h3>
          <p className="text-xs sm:text-sm text-[#B8B4AA] max-w-2xl font-light">
            Whether organizing corporate aviation clearances across India or coordinating cross-border visas and long-haul flights from abroad, our dedicated desks anticipate your requirements.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-sans text-[#B8B4AA]">
          <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] uppercase tracking-wider">Both Desks Active &bull; &lt;2h Response</span>
        </div>
      </div>

      {/* Side-by-Side Full Concierge Desks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* =================================================================== */}
        {/* OPTION 1: DOMESTIC (INDIA) */}
        {/* =================================================================== */}
        <div
          onClick={() => handleDeskClick('domestic')}
          className={`group relative rounded-sm border p-6 sm:p-8 transition-all duration-300 cursor-pointer overflow-hidden shadow-2xl flex flex-col justify-between ${
            selected === 'domestic'
              ? 'border-[#C5A059]/60 bg-[#141310] ring-1 ring-[#C5A059]/40 shadow-[#C5A059]/10'
              : 'border-white/10 bg-[#141310]/80 hover:border-white/30 hover:bg-[#141310]'
          }`}
        >
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-[#C5A059]/10 blur-[60px]" />

          <div>
            {/* Header row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 shadow-md">
                  <Building2 className="size-6" />
                </div>
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A059] block">
                    Pan-India Resident Operations
                  </span>
                  <h4 className="font-serif text-2xl text-[#F4F2EC] font-light">
                    Domestic (India)
                  </h4>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-sm bg-white/5 px-3 py-1 text-[11px] font-sans uppercase tracking-wider text-[#F4F2EC]/90 border border-white/10">
                IST Timezone
              </span>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-[#B8B4AA] leading-relaxed font-light">
              Designed for resident patrons, Indian corporate leadership, and royal celebration organizers requiring seamless intra-India hospitality.
            </p>

            {/* Anticipated Logistical Needs */}
            <div className="mt-6 space-y-3">
              <span className="text-[10px] font-sans uppercase tracking-[0.16em] text-[#C5A059] block">
                Anticipated Logistical Services:
              </span>
              <ul className="space-y-2.5 text-xs text-[#B8B4AA] font-light">
                <li className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-[#C5A059] shrink-0 mt-1.5" />
                  <span>Inter-state private aviation permits &amp; high-altitude helicopter transit</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-[#C5A059] shrink-0 mt-1.5" />
                  <span>Exclusive palace &amp; private island buyouts across Rajasthan &amp; Kerala</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-[#C5A059] shrink-0 mt-1.5" />
                  <span>VIP armored chauffeur motorcades with state protocol clearances</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-[#C5A059] shrink-0 mt-1.5" />
                  <span>Transparent Indian GST invoicing with corporate billing support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans">
              <span className="text-[#B8B4AA]">Direct Operations Desk:</span>
              <a
                href="tel:+918419887730"
                onClick={(e) => e.stopPropagation()}
                className="text-[#C5A059] hover:underline flex items-center gap-1.5 font-medium"
              >
                <Phone className="size-3.5" />
                +91 8419887730
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href="https://wa.me/918419887730?text=Hello%20Sarrin%20Holidays%20Domestic%20Desk%2C%20I%20would%20like%20to%20inquire%20about%20a%20luxury%20journey%20within%20India."
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-sm bg-[#C5A059]/10 hover:bg-[#C5A059]/20 border border-[#C5A059]/30 text-xs font-sans font-medium uppercase tracking-wider text-[#C5A059] transition-colors text-center cursor-pointer"
              >
                <span>WhatsApp Desk</span>
                <ArrowUpRight className="size-3" />
              </a>

              <a
                href="mailto:info@sarrinholidays.com"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans font-medium uppercase tracking-wider text-[#B8B4AA] hover:text-[#F4F2EC] transition-colors text-center cursor-pointer"
              >
                <Mail className="size-3.5" />
                <span>Email Ops</span>
              </a>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* OPTION 2: INTERNATIONAL / NRI */}
        {/* =================================================================== */}
        <div
          onClick={() => handleDeskClick('nri')}
          className={`group relative rounded-sm border p-6 sm:p-8 transition-all duration-300 cursor-pointer overflow-hidden shadow-2xl flex flex-col justify-between ${
            selected === 'nri'
              ? 'border-[#C5A059]/60 bg-[#141310] ring-1 ring-[#C5A059]/40 shadow-[#C5A059]/10'
              : 'border-white/10 bg-[#141310]/80 hover:border-white/30 hover:bg-[#141310]'
          }`}
        >
          {/* Subtle Amber Glow */}
          <div className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-[#C5A059]/10 blur-[60px]" />

          <div>
            {/* Header row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 shadow-md">
                  <Plane className="size-6" />
                </div>
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A059] block">
                    Global Patrons &bull; US &bull; UK &bull; UAE &bull; EU
                  </span>
                  <h4 className="font-serif text-2xl text-[#F4F2EC] font-light">
                    International / NRI
                  </h4>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-sm bg-[#C5A059]/10 px-3 py-1 text-[11px] font-sans uppercase tracking-wider text-[#C5A059] border border-[#C5A059]/30">
                Multi-Timezone
              </span>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-[#B8B4AA] leading-relaxed font-light">
              Specifically structured for Non-Resident Indians (NRIs) and international patrons seeking flawless end-to-end voyage curation from departure home airport to arrival in India.
            </p>

            {/* Anticipated Logistical Needs */}
            <div className="mt-6 space-y-3">
              <span className="text-[10px] font-sans uppercase tracking-[0.16em] text-[#C5A059] block">
                Anticipated Cross-Border Services:
              </span>
              <ul className="space-y-2.5 text-xs text-[#B8B4AA] font-light">
                <li className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-[#C5A059] shrink-0 mt-1.5" />
                  <span>
                    <strong className="text-[#F4F2EC] font-medium">Indian E-Visa &amp; Consular Guidance:</strong> Expedited pre-clearance advisory &amp; biometric support
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-[#C5A059] shrink-0 mt-1.5" />
                  <span>
                    <strong className="text-[#F4F2EC] font-medium">International Flight Synchronization:</strong> Tarmac VIP meet &amp; greet upon arrival at DEL / BOM / BLR
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-[#C5A059] shrink-0 mt-1.5" />
                  <span>
                    <strong className="text-[#F4F2EC] font-medium">Multi-Currency Transparent Forex:</strong> Direct billing in USD, GBP, EUR, AED with locked rates
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-[#C5A059] shrink-0 mt-1.5" />
                  <span>
                    <strong className="text-[#F4F2EC] font-medium">24/7 Timezone Matching:</strong> Dedicated liaison on EST, PST, GMT, GST, or SGT schedules
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans">
              <span className="text-[#B8B4AA]">Global NRI Hotline:</span>
              <a
                href="https://wa.me/918419887730?text=Hello%20Sarrin%20Holidays%20NRI%20Desk,%20I%20am%20inquiring%20from%20abroad%20regarding%20bespoke%20travel%20curation."
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[#C5A059] hover:underline flex items-center gap-1.5 font-medium"
              >
                <Globe className="size-3.5" />
                +91 8419887730 (NRI Priority)
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href="https://wa.me/918419887730?text=Hello%20Sarrin%20Holidays%20NRI%20Desk,%20I%20am%20inquiring%20from%20abroad%20regarding%20bespoke%20travel%20curation."
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-sm bg-[#C5A059]/10 hover:bg-[#C5A059]/20 border border-[#C5A059]/30 text-xs font-sans font-medium uppercase tracking-wider text-[#C5A059] transition-colors text-center cursor-pointer"
              >
                <span>NRI WhatsApp</span>
                <ArrowUpRight className="size-3" />
              </a>

              <a
                href="mailto:info@sarrinholidays.com?subject=International%20/%20NRI%20Bespoke%20Expedition%20Inquiry"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-sans font-medium uppercase tracking-wider text-[#B8B4AA] hover:text-[#F4F2EC] transition-colors text-center cursor-pointer"
              >
                <Mail className="size-3.5" />
                <span>NRI Email Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
