'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import {
  Plane,
  Crown,
  ShieldCheck,
  ArrowUpRight,
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
    case 'shieldcheck':
    case 'shield':
      return <ShieldCheck className={className} />
    case 'compass':
      return <Compass className={className} />
    default:
      return <Crown className={className} />
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
      'Discreet round-the-clock ceremonial event coordination team',
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

  const cardVariants: Variants = {
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
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-sm border border-white/10 bg-[#141310] p-6 md:p-8 shadow-xl transition-all duration-500 ease-out hover:border-[#C5A059]/50 hover:shadow-2xl hover:shadow-black/70 ${meta.colSpan}`}
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-[90px] transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div>
                {/* Visual Asset Container with Zoom on Hover */}
                <Link
                  href={`/services/${service.slug}`}
                  className="relative block aspect-[16/9] w-full overflow-hidden rounded-sm border border-white/10 shadow-lg group/img"
                >
                  <img
                    src={service.hero_image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B09]/90 via-[#0C0B09]/30 to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-sm border border-white/20 bg-[#141310]/85 px-2.5 py-1 text-[10px] font-sans font-medium uppercase tracking-wider text-[#C5A059] backdrop-blur-md shadow-md">
                      <ServiceIcon name={service.icon_name} className="size-3.5" />
                      {meta.tag}
                    </span>
                  </div>

                  {/* Bottom Image Sub-Pills */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                    {meta.pills.map((pill, i) => (
                      <span
                        key={i}
                        className="rounded-sm bg-[#141310]/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-sans font-medium tracking-wide uppercase text-[#E5E2DC] border border-white/10"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </Link>

                {/* Service Header & Core Copy */}
                <div className="mt-6">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 text-[#C5A059]">
                      <ServiceIcon name={service.icon_name} className="size-3.5" />
                    </div>
                    <span className="font-sans text-[11px] uppercase tracking-[0.1em] text-[#C5A059] font-medium">
                      Tier 01 Private Service
                    </span>
                  </div>

                  <Link href={`/services/${service.slug}`} className="block group/title">
                    <h3 className="mt-3 font-serif font-medium text-2xl text-[#F4F2EC] sm:text-3xl leading-snug group-hover/title:text-[#C5A059] transition-colors duration-300 tracking-tight">
                      {service.title}
                    </h3>
                  </Link>

                  <p className="mt-2 text-sm font-normal text-[#C5A059] leading-relaxed">
                    {service.short_desc}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-[#E5E2DC] font-normal line-clamp-3">
                    {service.full_desc}
                  </p>
                </div>

                {/* Key Specifications Bulleted Grid */}
                <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
                  <span className="text-[11px] uppercase tracking-wider text-[#E5E2DC] font-sans">
                    Service Standards &amp; Protocol
                  </span>
                  <div className="space-y-1.5 pt-1">
                    {meta.specs.map((spec, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#E5E2DC] font-normal">
                        <span className="size-1.5 rounded-full bg-[#C5A059] shrink-0 mt-1.5" />
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
                  className="inline-flex items-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] px-4 py-2.5 text-xs font-sans font-medium uppercase tracking-[0.14em] text-[#0C0B09] shadow-lg shadow-[#C5A059]/20 transition-all"
                >
                  <span>Explore Dossier</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleOpenDrawer(service)}
                  className="inline-flex items-center rounded-sm border border-[#C5A059]/40 bg-[#C5A059]/10 px-4 py-2 text-xs font-sans font-medium uppercase tracking-[0.14em] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0C0B09] transition-all cursor-pointer"
                >
                  <span>Request this Service</span>
                </button>
              </div>
            </motion.div>
          )
        })}

        {/* 5th Bento Tile: Bespoke Atelier Inquiry Card (Full Width) */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-12 relative overflow-hidden rounded-sm border border-white/10 bg-[#141310] p-8 md:p-12 shadow-2xl transition-all duration-500 ease-out hover:border-[#C5A059]/50"
        >
          <div className="pointer-events-none absolute -right-10 top-0 size-96 rounded-full bg-[#C5A059]/5 blur-[100px]" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 px-3 py-1 text-[11px] font-sans font-medium uppercase tracking-[0.1em] text-[#C5A059]">
                  Bespoke Operations Atelier
                </span>
              </div>
              <h3 className="mt-4 font-serif font-medium text-3xl sm:text-4xl text-[#F4F2EC] tracking-tight">
                Have a Complex or Sovereign Requirement?
              </h3>
              <p className="mt-3 text-base text-[#E5E2DC] leading-relaxed font-normal">
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
                      icon_name: 'Crown',
                      hero_image: '',
                    }
                  )
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] px-8 py-3.5 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#0C0B09] shadow-xl shadow-[#C5A059]/20 transition-all cursor-pointer"
              >
                <span>Request Private Consultation</span>
                <ArrowUpRight className="size-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Interactive Sarrin Holidays Inquiry Modal */}
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
              className="relative w-full max-w-lg overflow-hidden rounded-sm border border-white/10 bg-[#141310] p-6 md:p-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute right-5 top-5 rounded-sm p-2 text-[#E5E2DC] transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" />
              </button>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-sm bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059]">
                    <Check className="size-7" />
                  </div>
                  <h4 className="font-serif font-medium text-2xl text-[#F4F2EC]">Inquiry Received</h4>
                  <p className="text-sm text-[#E5E2DC] max-w-sm mx-auto leading-relaxed font-normal">
                    Thank you. A Senior Travel Curator has been notified and will reach out discreetly within 2 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059]">
                      <ServiceIcon name={selectedService.icon_name} className="size-3.5" />
                    </div>
                    <span className="text-[11px] font-sans font-medium uppercase tracking-[0.1em] text-[#C5A059]">
                      Sarrin Holidays Dispatch
                    </span>
                  </div>

                  <h4 className="mt-2 font-serif font-medium text-2xl text-[#F4F2EC] leading-snug">
                    {selectedService.title}
                  </h4>
                  <p className="mt-1 text-xs text-[#E5E2DC] font-normal">
                    Submit your parameters below for a personalized private service dossier.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-[#E5E2DC] mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Lord Alistair Vance"
                        className="w-full rounded-sm border border-white/10 bg-[#0C0B09] px-4 py-2.5 text-sm text-[#F4F2EC] placeholder-[#E5E2DC]/30 outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-[#E5E2DC] mb-1">
                          Private Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="client@sanctuary.com"
                          className="w-full rounded-sm border border-white/10 bg-[#0C0B09] px-4 py-2.5 text-sm text-[#F4F2EC] placeholder-[#E5E2DC]/30 outline-none focus:border-[#C5A059]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-[#E5E2DC] mb-1">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 or international"
                          className="w-full rounded-sm border border-white/10 bg-[#0C0B09] px-4 py-2.5 text-sm text-[#F4F2EC] placeholder-[#E5E2DC]/30 outline-none focus:border-[#C5A059]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-[#E5E2DC] mb-1">
                        Dates, Routing & Special Instructions
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Mention helicopter routing, palace guest count, or security requirements..."
                        className="w-full rounded-sm border border-white/10 bg-[#0C0B09] px-4 py-2.5 text-sm text-[#F4F2EC] placeholder-[#E5E2DC]/30 outline-none focus:border-[#C5A059] resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] py-3 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#0C0B09] shadow-lg shadow-[#C5A059]/20 transition-all cursor-pointer"
                      >
                        <Send className="size-3.5" />
                        <span>Transmit Confidential Request</span>
                      </button>
                    </div>

                    <p className="text-center text-[10px] text-[#E5E2DC]/60 font-normal">
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
