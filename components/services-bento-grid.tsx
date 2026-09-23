'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plane,
  Crown,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
  CheckCircle2,
  Phone,
  Mail,
  Calendar,
  X,
  Send,
  Compass,
  Check,
  Clock,
  Navigation,
} from 'lucide-react'
import type { ServiceItem } from '@/lib/cms'
import { ServiceDrawer } from '@/components/service-drawer'

interface ServicesBentoGridProps {
  services: ServiceItem[]
}

// Icon resolver for dynamic icon_name
function ServiceIcon({ name, className = 'size-5' }: { name: string; className?: string }) {
  switch (name?.toLowerCase()) {
    case 'plane':
      return <Plane className={className} />
    case 'crown':
      return <Crown className={className} />
    case 'sparkles':
      return <Sparkles className={className} />
    case 'shieldcheck':
    case 'shield':
      return <ShieldCheck className={className} />
    default:
      return <Sparkles className={className} />
  }
}

// Key curated features for each service
const SERVICE_HIGHLIGHTS: Record<
  string,
  {
    tag: string
    specs: string[]
    pills: string[]
    ctaText: string
    colSpan: string
  }
> = {
  'private-aviation-charters': {
    tag: 'HIGH-ALTITUDE & INTER-CITY AVIATION',
    specs: [
      'Direct mountain helipad landings in Rishikesh, Kedarnath & Ladakh',
      'VIP tarmac transfers & executive lounges across Delhi, Mumbai & Jaipur',
      'Curated in-flight dining by private Michelin-calibre chefs',
    ],
    pills: ['Airbus H125 / H130 Fleet', 'Citation Longitude Jets', 'Zero Tarmac Delays'],
    ctaText: 'Inquire Private Charter',
    colSpan: 'lg:col-span-7',
  },
  'royal-celebrations-weddings': {
    tag: 'HERITAGE PALACE ARCHITECTURE',
    specs: [
      'Full exclusive property buyouts across Udaipur, Jaipur & Jodhpur',
      'Regal torchlit courtyard banquets & desert sangeets in Thar',
      'Discreet round-the-clock ceremonial event concierge team',
    ],
    pills: ['Udaipur & Lake Pichola', '300-Year-Old Citadels', 'White-Glove Protocol'],
    ctaText: 'Explore Palace Buyouts',
    colSpan: 'lg:col-span-5',
  },
  'wellness-ayurveda-sanctuaries': {
    tag: 'AUTHENTIC RESTORATION & AYURVEDA',
    specs: [
      'Master Vaidya physician consultations & personalized Panchakarma',
      'Private cliffside meditation pavilions in Himalayan foothills',
      'Sacred Ganges sunset aartis & dosha-tailored organic cuisine',
    ],
    pills: ['Himalayan Foothills', 'Kumarakom Lagoons', 'Daily Sound Baths'],
    ctaText: 'Reserve Private Sanctuary',
    colSpan: 'lg:col-span-5',
  },
  'vip-chauffeur-security': {
    tag: 'ARMORED FLEET & EXECUTIVE PROTECTION',
    specs: [
      'Armored luxury SUVs, Rolls-Royce & vintage ceremonial convertibles',
      'Tactically certified close-protection security officers',
      'Multilingual vetted chauffeurs with live diplomatic route management',
    ],
    pills: ['Executive Fleet', 'Diplomatic Security', 'Vintage Convertibles'],
    ctaText: 'Arrange VIP Security Fleet',
    colSpan: 'lg:col-span-7',
  },
}

export function ServicesBentoGrid({ services }: ServicesBentoGridProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)
  const [drawerService, setDrawerService] = useState<ServiceItem | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  })

  const handleOpenDrawer = (service: ServiceItem) => {
    setDrawerService(service)
    setDrawerOpen(true)
  }

  const handleOpenInquiry = (service: ServiceItem) => {
    setSelectedService(service)
    setFormSubmitted(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setSelectedService(null)
      setFormSubmitted(false)
      setFormData({ name: '', email: '', phone: '', notes: '' })
    }, 2800)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <>
      {/* Bento Box Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-12"
      >
        {services.map((service, index) => {
          const meta = SERVICE_HIGHLIGHTS[service.slug] || {
            tag: 'CURATED SERVICE',
            specs: ['Bespoke travel curation', 'Dedicated liaison', 'Discreet execution'],
            pills: ['VIP Access', 'Handcrafted', 'Custom Itinerary'],
            ctaText: 'Inquire Service',
            colSpan: index % 2 === 0 ? 'lg:col-span-7' : 'lg:col-span-5',
          }

          return (
            <motion.div
              key={service.id || service.slug}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/12 bg-slate-900/60 p-6 md:p-8 backdrop-blur-2xl shadow-2xl transition-colors duration-500 hover:border-primary/50 hover:bg-slate-900/80 ${meta.colSpan}`}
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-[90px] transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div>
                {/* Visual Asset Container with Zoom on Hover */}
                <Link
                  href={`/services/${service.slug}`}
                  className="relative block aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg group/img"
                >
                  <img
                    src={service.hero_image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur-md shadow-md">
                      <ServiceIcon name={service.icon_name} className="size-3.5" />
                      {meta.tag}
                    </span>
                  </div>

                  {/* Bottom Image Sub-Pills */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                    {meta.pills.map((pill, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-white/15 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-white/90 border border-white/10"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </Link>

                {/* Service Header & Core Copy */}
                <div className="mt-6">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                      <ServiceIcon name={service.icon_name} className="size-4" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/50">
                      Tier 01 Private Service
                    </span>
                  </div>

                  <Link href={`/services/${service.slug}`} className="block group/title">
                    <h3 className="mt-3 font-serif text-2xl text-foreground sm:text-3xl leading-snug group-hover/title:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                  </Link>

                  <p className="mt-2 text-sm font-medium text-primary/90 leading-relaxed">
                    {service.short_desc}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-foreground/70 line-clamp-3">
                    {service.full_desc}
                  </p>
                </div>

                {/* Key Specifications Bulleted Grid */}
                <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
                  <span className="text-[11px] uppercase tracking-wider text-foreground/50 font-mono">
                    Service Standards & Protocol
                  </span>
                  <div className="space-y-1.5 pt-1">
                    {meta.specs.map((spec, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-foreground/85">
                        <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                        <span className="leading-snug">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Full Dossier & Quick Inquiry */}
              <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95"
                >
                  <span>Explore Dossier</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleOpenDrawer(service)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-primary/40 bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
                >
                  <Sparkles className="size-3.5" />
                  <span>Request this Service</span>
                </button>
              </div>
            </motion.div>
          )
        })}

        {/* 5th Bento Tile: Bespoke Atelier Inquiry Card (Full Width) */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-12 relative overflow-hidden rounded-[2.5rem] border border-primary/30 bg-gradient-to-r from-primary/15 via-slate-900/80 to-amber-950/20 p-8 md:p-12 backdrop-blur-2xl shadow-2xl"
        >
          <div className="pointer-events-none absolute -right-10 top-0 size-96 rounded-full bg-primary/10 blur-[100px]" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                  <Compass className="size-3.5" /> Bespoke Operations Atelier
                </span>
              </div>
              <h3 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
                Have a Complex or Sovereign Requirement?
              </h3>
              <p className="mt-3 text-sm text-foreground/75 leading-relaxed">
                Whether arranging multi-city private jet positioning, confidential diplomatic escorts, or historic
                courtyard galas under NDA, our senior operations curators engineer every detail in strict confidence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <button
                onClick={() =>
                  handleOpenInquiry(
                    services[0] || {
                      id: 'custom',
                      title: 'Bespoke Travel Inquiry',
                      slug: 'custom',
                      short_desc: 'Custom Private Request',
                      full_desc: '',
                      icon_name: 'Sparkles',
                      hero_image: '',
                    }
                  )
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:bg-primary/90 hover:scale-105"
              >
                <span>Request Private Consultation</span>
                <ArrowUpRight className="size-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Interactive Concierge Inquiry Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-slate-900/95 p-6 md:p-8 shadow-2xl backdrop-blur-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute right-5 top-5 rounded-full p-2 text-foreground/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" />
              </button>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/20 border border-primary text-primary">
                    <Check className="size-7" />
                  </div>
                  <h4 className="font-serif text-2xl text-foreground">Inquiry Received</h4>
                  <p className="text-sm text-foreground/70 max-w-sm mx-auto leading-relaxed">
                    Thank you. A Senior Travel Curator has been notified and will reach out discreetly within 2 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-primary/20 text-primary">
                      <ServiceIcon name={selectedService.icon_name} className="size-3.5" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary">
                      Concierge Dispatch
                    </span>
                  </div>

                  <h4 className="mt-2 font-serif text-2xl text-foreground leading-snug">
                    {selectedService.title}
                  </h4>
                  <p className="mt-1 text-xs text-foreground/70">
                    Submit your parameters below for a personalized private service dossier.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-foreground/70 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Lord Alistair Vance"
                        className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-2.5 text-sm text-foreground placeholder-white/30 outline-none focus:border-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-medium uppercase tracking-wider text-foreground/70 mb-1">
                          Private Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="client@sanctuary.com"
                          className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-2.5 text-sm text-foreground placeholder-white/30 outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium uppercase tracking-wider text-foreground/70 mb-1">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 or international"
                          className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-2.5 text-sm text-foreground placeholder-white/30 outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-foreground/70 mb-1">
                        Dates, Routing & Special Instructions
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Mention helicopter routing, palace guest count, or security requirements..."
                        className="w-full rounded-xl border border-white/15 bg-background/80 px-4 py-2.5 text-sm text-foreground placeholder-white/30 outline-none focus:border-primary resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02]"
                      >
                        <Send className="size-3.5" />
                        <span>Transmit Confidential Request</span>
                      </button>
                    </div>

                    <p className="text-center text-[10px] text-foreground/50">
                      All communications are protected under strict non-disclosure covenants.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Slide-out VIP Service Drawer */}
      <ServiceDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        serviceTitle={drawerService?.title || 'Sarrin Private Atelier'}
        classification="Sovereign Atelier Service"
      />
    </>
  )
}
