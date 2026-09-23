'use client'

import React, { useState } from 'react'
import {
  CheckCircle2,
  Send,
  Check,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles,
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
    <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl transition-all duration-300">
      {/* Top subtle golden accent bar */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Pricing Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary">
            Curated Pricing Tier
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active Fleet / Roster
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-serif text-3xl sm:text-4xl text-foreground font-semibold">
            {pricing}
          </span>
        </div>
        <p className="mt-1 text-xs text-foreground/60">
          Tailored to your itinerary, aircraft classification, or palace buyout scale.
        </p>

        {/* Lead time badge */}
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs text-foreground/75 border border-white/10">
          <Clock className="size-3.5 text-primary shrink-0" />
          <span>Operational Lead Time: <strong className="text-white font-medium">{leadTime}</strong></span>
        </div>

        {/* Primary Drawer Trigger */}
        <div className="mt-5">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="w-full group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-primary via-amber-500 to-primary py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-primary/45 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="size-3.5 animate-pulse" />
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
        <span className="text-[11px] uppercase tracking-wider text-foreground/50 font-mono">
          Executive Inclusions
        </span>
        <div className="mt-3 space-y-2">
          {inclusions.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-foreground/80">
              <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
              <span className="leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="pt-6">
        {submitted ? (
          <div className="rounded-2xl border border-primary/40 bg-primary/10 p-6 text-center space-y-3">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Check className="size-6" />
            </div>
            <h4 className="font-serif text-xl text-foreground">Dossier Dispatched</h4>
            <p className="text-xs text-foreground/75 leading-relaxed">
              Your parameters have been transmitted to our Chief Operations Curator. Expect a confidential reply within 2 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-2 text-xs text-primary underline underline-offset-4 hover:opacity-80"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
                Confidential Inquiry
              </span>
              <span className="flex items-center gap-1 text-[10px] text-foreground/50">
                <ShieldCheck className="size-3 text-primary" /> NDA Protected
              </span>
            </div>

            <div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name / Title"
                className="w-full rounded-xl border border-white/15 bg-background/80 px-3.5 py-2.5 text-xs text-foreground placeholder-white/30 outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Private Email"
                className="w-full rounded-xl border border-white/15 bg-background/80 px-3.5 py-2.5 text-xs text-foreground placeholder-white/30 outline-none focus:border-primary transition-colors"
              />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone / WhatsApp"
                className="w-full rounded-xl border border-white/15 bg-background/80 px-3.5 py-2.5 text-xs text-foreground placeholder-white/30 outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <input
                type="text"
                value={formData.dates}
                onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                placeholder="Target Dates (e.g. Nov 14 - Nov 22, 2026)"
                className="w-full rounded-xl border border-white/15 bg-background/80 px-3.5 py-2.5 text-xs text-foreground placeholder-white/30 outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Routing, guest count, or special security protocols..."
                className="w-full rounded-xl border border-white/15 bg-background/80 px-3.5 py-2.5 text-xs text-foreground placeholder-white/30 outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02] active:scale-95"
            >
              <Send className="size-3.5" />
              <span>Inquire for {serviceTitle.split(' ')[0]}</span>
            </button>
          </form>
        )}
      </div>

      {/* Immediate Concierge Direct Call Footer */}
      <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-foreground/60">
        <a
          href="tel:+919820072774"
          className="flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors"
        >
          <Phone className="size-3.5 text-primary" />
          <span>+91 98200 SARRIN</span>
        </a>

        <a
          href="mailto:concierge@sarrinholidays.com"
          className="flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors"
        >
          <Mail className="size-3.5 text-primary" />
          <span>Desk Email</span>
        </a>
      </div>
    </div>
  )
}
