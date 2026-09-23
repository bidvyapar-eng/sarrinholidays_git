'use client'

import React, { useState } from 'react'
import {
  Globe,
  Plane,
  Building2,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  ArrowUpRight,
  Sparkles,
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
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/20 text-primary border border-primary/30">
              <Globe className="size-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white tracking-wide">
                Global Concierge Routing
              </h4>
              <p className="text-[10px] text-neutral-400">
                Select your logistical operations desk
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-primary uppercase tracking-wider">
            24/7 Dedicated
          </span>
        </div>

        {/* Side-by-Side Compact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Domestic (India) Option */}
          <div
            onClick={() => handleDeskClick('domestic')}
            className={`group relative rounded-2xl border p-3.5 transition-all cursor-pointer backdrop-blur-xl ${
              selected === 'domestic'
                ? 'border-primary/60 bg-primary/10 shadow-lg shadow-primary/10'
                : 'border-white/10 bg-neutral-900/60 hover:border-white/25 hover:bg-neutral-900/90'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-md bg-white/10 text-primary">
                  <Building2 className="size-3.5" />
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white">Domestic (India)</h5>
                  <span className="text-[9px] font-mono text-neutral-400">Pan-India Operations</span>
                </div>
              </div>
              {selected === 'domestic' && (
                <span className="size-2 rounded-full bg-primary animate-pulse" />
              )}
            </div>

            <p className="text-[11px] text-neutral-300 mt-2 line-clamp-2">
              Chauffeur fleets, private aviation charters, palace buyouts &amp; IST logistics.
            </p>

            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
              <a
                href="tel:+912269825500"
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] font-mono text-primary hover:underline flex items-center gap-1"
              >
                <Phone className="size-3" />
                +91 22 6982 5500
              </a>
              <a
                href="/contact?desk=domestic"
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] font-semibold text-white/80 hover:text-primary flex items-center gap-0.5"
              >
                <span>Select Desk</span>
                <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>

          {/* International / NRI Option */}
          <div
            onClick={() => handleDeskClick('nri')}
            className={`group relative rounded-2xl border p-3.5 transition-all cursor-pointer backdrop-blur-xl ${
              selected === 'nri'
                ? 'border-amber-500/60 bg-amber-500/10 shadow-lg shadow-amber-950/20'
                : 'border-white/10 bg-neutral-900/60 hover:border-white/25 hover:bg-neutral-900/90'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-md bg-amber-500/20 text-amber-300">
                  <Plane className="size-3.5" />
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white">International / NRI</h5>
                  <span className="text-[9px] font-mono text-amber-300/80">Cross-Border Desk</span>
                </div>
              </div>
              {selected === 'nri' && (
                <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </div>

            <p className="text-[11px] text-neutral-300 mt-2 line-clamp-2">
              Indian e-visas, international flight sync, forex billing &amp; multi-timezone liaison.
            </p>

            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
              <a
                href="https://wa.me/919820072774?text=Hello%20Sarrin%20Holidays%20NRI%20Desk,%20I%20am%20inquiring%20from%20abroad%20regarding%20bespoke%20travel%20curation."
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] font-mono text-amber-300 hover:underline flex items-center gap-1"
              >
                <Globe className="size-3" />
                NRI WhatsApp Line
              </a>
              <a
                href="/contact?desk=nri"
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] font-semibold text-white/80 hover:text-amber-300 flex items-center gap-0.5"
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
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary backdrop-blur-md">
            <Globe className="size-3" />
            Global Concierge Routing System
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight">
            Tailored Logistical Support for Discerning Travelers
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl font-light">
            Whether organizing corporate aviation clearances across India or coordinating cross-border visas and long-haul flights from abroad, our dedicated desks anticipate your requirements.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Both Desks Active &bull; &lt;2h Response</span>
        </div>
      </div>

      {/* Side-by-Side Full Concierge Desks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* =================================================================== */}
        {/* OPTION 1: DOMESTIC (INDIA) */}
        {/* =================================================================== */}
        <div
          onClick={() => handleDeskClick('domestic')}
          className={`group relative rounded-3xl border p-6 sm:p-8 backdrop-blur-2xl transition-all duration-300 cursor-pointer overflow-hidden shadow-2xl flex flex-col justify-between ${
            selected === 'domestic'
              ? 'border-primary/60 bg-gradient-to-br from-neutral-900/90 via-slate-950/90 to-primary/10 ring-1 ring-primary/40 shadow-primary/10'
              : 'border-white/12 bg-neutral-900/60 hover:border-white/30 hover:bg-neutral-900/80'
          }`}
        >
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-primary/15 blur-[60px]" />

          <div>
            {/* Header row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/20 text-primary border border-primary/30 shadow-md">
                  <Building2 className="size-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary block">
                    Pan-India Resident Operations
                  </span>
                  <h4 className="font-serif text-2xl text-white font-medium">
                    Domestic (India)
                  </h4>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono text-white/90 border border-white/15">
                IST Timezone
              </span>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              Designed for resident patrons, Indian corporate leadership, and royal celebration organizers requiring seamless intra-India hospitality.
            </p>

            {/* Anticipated Logistical Needs */}
            <div className="mt-6 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                Anticipated Logistical Services:
              </span>
              <ul className="space-y-2.5 text-xs text-neutral-300">
                <li className="flex items-start gap-2.5">
                  <div className="size-4 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-2.5" />
                  </div>
                  <span>Inter-state private aviation permits &amp; high-altitude helicopter transit</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="size-4 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-2.5" />
                  </div>
                  <span>Exclusive palace &amp; private island buyouts across Rajasthan &amp; Kerala</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="size-4 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-2.5" />
                  </div>
                  <span>VIP armored chauffeur motorcades with state protocol clearances</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="size-4 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-2.5" />
                  </div>
                  <span>Transparent Indian GST invoicing with corporate billing support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <span className="text-neutral-400">Direct Operations Desk:</span>
              <a
                href="tel:+912269825500"
                onClick={(e) => e.stopPropagation()}
                className="text-primary hover:underline flex items-center gap-1.5 font-semibold"
              >
                <Phone className="size-3.5" />
                +91 (0) 22 6982 5500
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href="https://wa.me/919820044810?text=Hello%20Sarrin%20Holidays%20Domestic%20Desk%2C%20I%20would%20like%20to%20inquire%20about%20a%20luxury%20journey%20within%20India."
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-primary/20 hover:bg-primary/30 border border-primary/40 text-xs font-semibold text-primary transition-colors text-center"
              >
                <span>WhatsApp Desk</span>
                <ArrowUpRight className="size-3" />
              </a>

              <a
                href="mailto:domestic.ops@sarrinholidays.com"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white transition-colors text-center"
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
          className={`group relative rounded-3xl border p-6 sm:p-8 backdrop-blur-2xl transition-all duration-300 cursor-pointer overflow-hidden shadow-2xl flex flex-col justify-between ${
            selected === 'nri'
              ? 'border-amber-500/60 bg-gradient-to-br from-neutral-900/90 via-slate-950/90 to-amber-500/10 ring-1 ring-amber-500/40 shadow-amber-950/20'
              : 'border-white/12 bg-neutral-900/60 hover:border-white/30 hover:bg-neutral-900/80'
          }`}
        >
          {/* Subtle Amber Glow */}
          <div className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-amber-500/15 blur-[60px]" />

          <div>
            {/* Header row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-md">
                  <Plane className="size-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 block">
                    Global Patrons &bull; US &bull; UK &bull; UAE &bull; EU
                  </span>
                  <h4 className="font-serif text-2xl text-white font-medium">
                    International / NRI
                  </h4>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-[11px] font-mono text-amber-300 border border-amber-500/30">
                Multi-Timezone
              </span>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              Specifically structured for Non-Resident Indians (NRIs) and international patrons seeking flawless end-to-end voyage curation from departure home airport to arrival in India.
            </p>

            {/* Anticipated Logistical Needs */}
            <div className="mt-6 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300/80 block">
                Anticipated Cross-Border Services:
              </span>
              <ul className="space-y-2.5 text-xs text-neutral-300">
                <li className="flex items-start gap-2.5">
                  <div className="size-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-2.5" />
                  </div>
                  <span>
                    <strong className="text-white font-medium">Indian E-Visa &amp; Consular Guidance:</strong> Expedited pre-clearance advisory &amp; biometric support
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="size-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-2.5" />
                  </div>
                  <span>
                    <strong className="text-white font-medium">International Flight Synchronization:</strong> Tarmac VIP meet &amp; greet upon arrival at DEL / BOM / BLR
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="size-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-2.5" />
                  </div>
                  <span>
                    <strong className="text-white font-medium">Multi-Currency Transparent Forex:</strong> Direct billing in USD, GBP, EUR, AED with locked rates
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="size-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-2.5" />
                  </div>
                  <span>
                    <strong className="text-white font-medium">24/7 Timezone Matching:</strong> Dedicated liaison on EST, PST, GMT, GST, or SGT schedules
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <span className="text-neutral-400">Global NRI Hotline:</span>
              <a
                href="https://wa.me/919820072774?text=Hello%20Sarrin%20Holidays%20NRI%20Desk,%20I%20am%20inquiring%20from%20abroad%20regarding%20bespoke%20travel%20curation."
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-amber-400 hover:underline flex items-center gap-1.5 font-semibold"
              >
                <Globe className="size-3.5" />
                +91 98200 SARRIN (NRI Priority)
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href="https://wa.me/919820072774?text=Hello%20Sarrin%20Holidays%20NRI%20Desk,%20I%20am%20inquiring%20from%20abroad%20regarding%20bespoke%20travel%20curation."
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-semibold text-amber-300 transition-colors text-center"
              >
                <span>NRI WhatsApp</span>
                <ArrowUpRight className="size-3" />
              </a>

              <a
                href="mailto:nri.concierge@sarrinholidays.com?subject=International%20/%20NRI%20Bespoke%20Expedition%20Inquiry"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white transition-colors text-center"
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
