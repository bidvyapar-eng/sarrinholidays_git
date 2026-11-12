'use client'

import React, { useState } from 'react'
import {
  Send,
  Check,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react'
import { ServiceDrawer } from '@/components/service-drawer'

interface ServiceInquiryCardProps {
  serviceTitle: string
  pricing: string
  leadTime: string
  inclusions: string[]
}

export function ServiceInquiryCard({
  serviceTitle,
  pricing,
  leadTime,
  inclusions,
}: ServiceInquiryCardProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dates: '',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="relative overflow-hidden rounded-sm border border-white/10 bg-[#141310] p-6 sm:p-8 shadow-2xl transition-all duration-300">
      {/* Top subtle golden accent bar */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

      {/* Pricing Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#C5A059] font-medium">
            Curated Pricing Tier
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-500/10 px-2 py-0.5 text-[10px] font-sans font-medium uppercase tracking-wider text-emerald-400 border border-emerald-500/20">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active Fleet / Roster
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-serif text-3xl sm:text-4xl text-[#F4F2EC] font-light tracking-tight">
            {pricing}
          </span>
        </div>
        <p className="mt-1 text-xs text-[#B8B4AA] font-light leading-relaxed">
          Tailored to your itinerary, aircraft classification, or palace buyout scale.
        </p>

        {/* Lead time badge */}
        <div className="mt-4 flex items-center gap-2 rounded-sm bg-white/[0.03] px-3 py-2 text-xs text-[#B8B4AA] border border-white/10 font-sans">
          <Clock className="size-3.5 text-[#C5A059] shrink-0" />
          <span>Operational Lead Time: <strong className="text-[#F4F2EC] font-medium">{leadTime}</strong></span>
        </div>

        {/* Primary Drawer Trigger */}
        <div className="mt-5">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="w-full group inline-flex items-center justify-center gap-2.5 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] py-3.5 px-4 text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#0C0B09] shadow-lg shadow-[#C5A059]/20 transition-all cursor-pointer"
          >
            <span>Request this Service</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      <ServiceDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        serviceTitle={serviceTitle}
        classification="Sovereign Atelier Service"
      />

      {/* Inclusions list */}
      <div className="py-5 border-b border-white/10">
        <span className="text-[11px] uppercase tracking-wider text-[#B8B4AA] font-sans">
          Executive Inclusions
        </span>
        <div className="mt-3 space-y-2">
          {inclusions.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-[#B8B4AA] font-light">
              <span className="size-1.5 rounded-full bg-[#C5A059] shrink-0 mt-1.5" />
              <span className="leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="pt-6">
        {submitted ? (
          <div className="rounded-sm border border-[#C5A059]/40 bg-[#C5A059]/10 p-6 text-center space-y-3">
            <div className="mx-auto flex size-12 items-center justify-center rounded-sm bg-[#C5A059]/20 text-[#C5A059]">
              <Check className="size-6" />
            </div>
            <h4 className="font-serif text-xl text-[#F4F2EC] font-light">Dossier Dispatched</h4>
            <p className="text-xs text-[#B8B4AA] leading-relaxed font-light">
              Your parameters have been transmitted to our Chief Operations Curator. Expect a confidential reply within 2 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-2 text-xs text-[#C5A059] underline underline-offset-4 hover:opacity-80 font-sans tracking-wide"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans font-medium uppercase tracking-wider text-[#F4F2EC]">
                Confidential Inquiry
              </span>
              <span className="text-[10px] uppercase font-sans tracking-wider text-[#B8B4AA]/70">
                NDA Protected
              </span>
            </div>

            <div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name / Title"
                className="w-full rounded-sm border border-white/10 bg-[#0C0B09] px-3.5 py-2.5 text-xs text-[#F4F2EC] placeholder-white/30 outline-none focus:border-[#C5A059] transition-colors font-sans"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Private Email"
                className="w-full rounded-sm border border-white/10 bg-[#0C0B09] px-3.5 py-2.5 text-xs text-[#F4F2EC] placeholder-white/30 outline-none focus:border-[#C5A059] transition-colors font-sans"
              />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone / WhatsApp"
                className="w-full rounded-sm border border-white/10 bg-[#0C0B09] px-3.5 py-2.5 text-xs text-[#F4F2EC] placeholder-white/30 outline-none focus:border-[#C5A059] transition-colors font-sans"
              />
            </div>

            <div>
              <input
                type="text"
                value={formData.dates}
                onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                placeholder="Target Dates (e.g. Nov 14 - Nov 22, 2026)"
                className="w-full rounded-sm border border-white/10 bg-[#0C0B09] px-3.5 py-2.5 text-xs text-[#F4F2EC] placeholder-white/30 outline-none focus:border-[#C5A059] transition-colors font-sans"
              />
            </div>

            <div>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Routing, guest count, or special security protocols..."
                className="w-full rounded-sm border border-white/10 bg-[#0C0B09] px-3.5 py-2.5 text-xs text-[#F4F2EC] placeholder-white/30 outline-none focus:border-[#C5A059] transition-colors resize-none font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] py-3 text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#0C0B09] shadow-lg shadow-[#C5A059]/20 transition-all cursor-pointer"
            >
              <Send className="size-3.5" />
              <span>Inquire for {serviceTitle.split(' ')[0]}</span>
            </button>
          </form>
        )}
      </div>

      {/* Immediate Concierge Direct Call Footer */}
      <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-[#B8B4AA]">
        <a
          href="tel:+918419887730"
          className="flex items-center gap-1.5 text-[#B8B4AA] hover:text-[#C5A059] transition-colors font-sans"
        >
          <Phone className="size-3.5 text-[#C5A059]" />
          <span>+91 84198 87730</span>
        </a>

        <a
          href="mailto:concierge@sarrinholidays.com"
          className="flex items-center gap-1.5 text-[#B8B4AA] hover:text-[#C5A059] transition-colors font-sans"
        >
          <Mail className="size-3.5 text-[#C5A059]" />
          <span>Desk Email</span>
        </a>
      </div>
    </div>
  )
}
