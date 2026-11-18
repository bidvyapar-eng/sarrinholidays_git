'use client'

import React from 'react'
import Link from 'next/link'
import {
  FileCheck,
  BookOpen,
  Car,
  Building2,
  Compass,
  Luggage,
  Plane,
  ArrowRight,
  ArrowUpRight,
  Phone,
} from 'lucide-react'

export interface TravelService {
  index: string
  name: string
  tagline: string
  description: string
  deliverables?: string[]
  icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>
  whatsappText: string
}

export const TRAVEL_SERVICES: TravelService[] = [
  {
    index: '01',
    name: 'Visa Assistance',
    tagline: 'Embassy & Diplomatic File Preparation',
    description:
      'Complete tourist and business visa documentation, embassy appointments, and file preparation.',
    deliverables: [
      'Tourist & business visa files',
      'VFS & consulate appointments',
      'Document notarization guidance',
      'Fast-track biometric scheduling',
    ],
    icon: FileCheck,
    whatsappText:
      'Hello Sarrin Holidays, I would like to enquire about your Visa Assistance services.',
  },
  {
    index: '02',
    name: 'Passport Services',
    tagline: 'Fresh Applications & Tatkaal Expeditions',
    description:
      'Dedicated guidance for fresh passport applications, Tatkaal renewals, and verification.',
    deliverables: [
      'New passport applications',
      'Tatkaal fast-track renewal',
      'Police verification liaisons',
      'Name change & ECR clearances',
    ],
    icon: BookOpen,
    whatsappText:
      'Hello Sarrin Holidays, I would like to enquire about your Passport Services.',
  },
  {
    index: '03',
    name: 'Chauffeur & Car Rental',
    tagline: 'Uniformed Chauffeurs & Executive Fleet',
    description:
      'Private luxury sedans, SUVs, Innova Crystas, and touring coaches with uniformed drivers.',
    deliverables: [
      'Toyota Vellfire & Innova Crysta',
      'Mercedes-Maybach & E-Class sedans',
      'Luxury air-conditioned coaches',
      'Verified & uniformed chauffeurs',
    ],
    icon: Car,
    whatsappText:
      'Hello Sarrin Holidays, I would like to enquire about your Chauffeur & Car Rental services.',
  },
  {
    index: '04',
    name: 'Hotels & Heritage Stays',
    tagline: 'Five-Star & Royal Palace Allocations',
    description:
      'Preferred reservations across five-star hotels, heritage palaces, and boutique retreats.',
    deliverables: [
      'Taj, Oberoi & ITC luxury suites',
      'Living Rajputana palace buyouts',
      'Private pool plantations & villas',
      'Complimentary suite upgrades',
    ],
    icon: Building2,
    whatsappText:
      'Hello Sarrin Holidays, I would like to enquire about your Hotels & Heritage Stays services.',
  },
  {
    index: '05',
    name: 'Ground Sports & Adventure',
    tagline: 'High-Altitude & Wilderness Expeditions',
    description:
      'Guided Himalayan motorcycling, wildlife safaris, river rafting, scuba, and desert expeditions.',
    deliverables: [
      'Trans-Himalayan motorcycle convoys',
      'Private wildlife safari jeep buyouts',
      'River rafting & scuba expeditions',
      'Thar desert luxury tent glamping',
    ],
    icon: Compass,
    whatsappText:
      'Hello Sarrin Holidays, I would like to enquire about your Ground Sports & Adventure services.',
  },
  {
    index: '06',
    name: 'All Travel Amenities',
    tagline: 'VIP Transit Comforts & Curated Setups',
    description:
      'Airport lounge access, curated on-trip comfort kits, local connectivity, and special dining setups.',
    deliverables: [
      'International & domestic lounge passes',
      'Curated on-road gourmet comfort hampers',
      'Private candlelit dinner setups',
      'High-speed local eSIM connectivity',
    ],
    icon: Luggage,
    whatsappText:
      'Hello Sarrin Holidays, I would like to enquire about your All Travel Amenities services.',
  },
  {
    index: '07',
    name: 'Complete Transport Desk',
    tagline: 'Air, Luxury Rail & Inter-City Transit',
    description:
      'Domestic and international air ticketing, luxury rail journeys, and seamless transfers.',
    deliverables: [
      'Domestic & international business flights',
      'Palace on Wheels & Maharaja Express',
      'Private helicopter point-to-point',
      '24/7 flight monitoring & rescheduling',
    ],
    icon: Plane,
    whatsappText:
      'Hello Sarrin Holidays, I would like to enquire about your Complete Transport Desk services.',
  },
]

interface TravelServicesGridProps {
  variant?: 'compact' | 'full'
  className?: string
  showHeading?: boolean
}

export function TravelServicesGrid({
  variant = 'compact',
  className = '',
  showHeading = true,
}: TravelServicesGridProps) {
  const isCompact = variant === 'compact'

  return (
    <section
      id="travel-services"
      className={`relative w-full ${isCompact ? 'py-20 bg-[#0C0B09] border-y border-white/10' : 'py-16'} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {showHeading && (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-white/10">
            <div className="max-w-2xl">
              <span className="text-xs font-sans uppercase tracking-[0.15em] text-[#C5A059] font-medium block mb-2">
                {isCompact ? 'FULL-SPECTRUM TRAVEL DESK' : 'SEVEN CORE LOGISTICAL DIVISIONS'}
              </span>
              <h2 className="font-serif font-medium text-3xl sm:text-4xl lg:text-5xl text-[#F4F2EC] tracking-tight leading-tight">
                {isCompact
                  ? 'Complete End-to-End Travel Services'
                  : 'Seven Dedicated Travel Services'}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-stone-300 font-normal leading-relaxed">
                Beyond handcrafted tour packages, Sarrin Holidays operates an independent, full-service logistics desk ensuring every credential, transfer, and luxury amenity is cleared with sovereign precision.
              </p>
            </div>

            {isCompact && (
              <div className="shrink-0 flex items-center gap-3">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/[0.03] px-5 py-3 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#F4F2EC] hover:bg-white/[0.08] hover:border-[#C5A059]/40 transition-colors"
                >
                  <span>Explore Full Atelier</span>
                  <ArrowRight className="size-3.5 text-[#C5A059]" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* 7 Services Architectural Grid */}
        <div
          className={`mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${
            isCompact ? 'xl:grid-cols-4' : 'xl:grid-cols-3 lg:gap-8'
          } gap-6`}
        >
          {TRAVEL_SERVICES.map((service, idx) => {
            const Icon = service.icon
            const isLast = idx === TRAVEL_SERVICES.length - 1
            const waHref = `https://wa.me/918419887730?text=${encodeURIComponent(
              service.whatsappText
            )}`

            return (
              <article
                key={service.index}
                className={`group relative rounded-sm border border-white/10 bg-[#141310] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#C5A059]/60 hover:shadow-xl hover:shadow-black/60 ${
                  isCompact && isLast
                    ? 'sm:col-span-2 lg:col-span-3 xl:col-span-2 bg-gradient-to-br from-[#141310] via-[#141310] to-[#1C1A15]'
                    : ''
                }`}
              >
                {/* Ambient top border hover glow */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-transparent group-hover:bg-[#C5A059] transition-colors duration-300" />

                <div>
                  {/* Top Row: Numeric Index & Thin 1.25px Monochrome SVG Icon */}
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <span className="font-mono text-sm sm:text-base font-semibold tracking-widest text-[#C5A059]">
                      {service.index}
                    </span>
                    <div className="size-11 rounded-sm border border-white/10 bg-white/[0.03] flex items-center justify-center text-stone-300 group-hover:text-[#C5A059] group-hover:border-[#C5A059]/40 transition-all duration-300">
                      <Icon className="size-5" strokeWidth={1.25} />
                    </div>
                  </div>

                  {/* Service Title & Subtitle */}
                  <div className="pt-5">
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#F4F2EC] tracking-tight group-hover:text-[#C5A059] transition-colors duration-300">
                      {service.name}
                    </h3>
                    {!isCompact && (
                      <span className="block mt-1 text-[11px] font-sans font-medium uppercase tracking-[0.1em] text-[#9A7B3E]">
                        {service.tagline}
                      </span>
                    )}

                    {/* Calm 1-Sentence Description */}
                    <p className="mt-3 text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Expanded Deliverables List (Full Variant) */}
                  {!isCompact && service.deliverables && (
                    <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs font-sans text-stone-400">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="size-1 rounded-full bg-[#C5A059]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Bottom WhatsApp Link */}
                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#C5A059] group-hover/link:text-[#D4B475] transition-colors"
                  >
                    <span>Enquire via WhatsApp</span>
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>

                  {!isCompact && (
                    <a
                      href="tel:+918419887730"
                      className="text-stone-400 hover:text-[#F4F2EC] text-[11px] font-mono tracking-wider transition-colors inline-flex items-center gap-1.5"
                    >
                      <Phone className="size-3 text-[#C5A059]" />
                      <span>Desk</span>
                    </a>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        {/* Global Dispatch Strip */}
        <div className="mt-12 rounded-sm border border-white/10 bg-[#141310] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#C5A059]">
              CENTRAL DISPATCH · SATPUR, NASHIK HEADQUARTERS
            </span>
            <p className="text-xs sm:text-sm text-stone-300 font-normal">
              Need combined ticketing, visa processing, and a private chauffeur fleet? Speak with our central operations coordinator.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/918419887730?text=Hello%20Sarrin%20Holidays,%20I%20need%20multi-service%20coordination%20for%20my%20upcoming%20travel."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-[#C5A059] px-5 py-3 text-xs font-sans font-semibold uppercase tracking-[0.1em] text-[#0C0B09] hover:bg-[#D4B475] transition-colors shadow-md"
            >
              <span>Multi-Service Inquiry</span>
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TravelServicesGrid
