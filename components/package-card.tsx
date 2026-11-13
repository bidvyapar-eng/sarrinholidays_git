'use client'

import React from 'react'
import Link from 'next/link'
import { Phone, MessageCircle } from 'lucide-react'
import type { PackageItem } from '@/lib/cms'
import { optimizeUnsplashUrl } from '@/lib/cms'

export interface PackageCardProps {
  pkg: PackageItem
  onSelect?: (pkg: PackageItem) => void
}

const SILENT_LUXURY_COPY: Record<string, string> = {
  'kerala-gods-own-country-8d':
    'Traverse mist-cloaked tea estates, emerald backwater canals, and tranquil Kovalam coastlines with unhurried private estate stewardship.',
  'kerala-backwaters-hills-5d':
    'Retreat through cascading Munnar tea valleys, organic spice plantations, and serene overnight backwater catamaran cruises.',
  'kashmir-paradise-valleys-7d':
    'Sojourn through snow-crested alpine valleys, private Dal Lake cedar houseboats, and authentic multi-course Wazwan royal feasts.',
  'blissful-goa-beach-getaway-4d':
    'Unwind along secluded South Goa sands, private sunset Mandovi yacht charters, and preserved Portuguese heritage estates.',
  'experience-varanasi-dev-deepawali-3d':
    'Witness thousands of golden earthen ghat lamps from private ceremonial river barges along sacred Kashi waters.',
  'royal-rajasthan-tour':
    'Inhabit sovereign Rajputana fortresses, torchlit Lake Pichola marble ramparts, and regal living royal palace suites.',
  'kerala-houseboat-retreat':
    'Drift through quiet palm-fringed Vembanad lagoons aboard an exclusive private houseboat with bespoke on-deck Ayurvedic wellness.',
  'himalayan-wellness-escapade':
    'Restore harmony with physician-led Ayurvedic immersions, private Ganga river barges, and tranquil Himalayan mountain sanctuary vistas.',
  'wild-untamed-tiger-safari':
    'Track Royal Bengal Tigers across pristine forest corridors with private naturalists and luxury open-air tented pavilions.',
}

function getPackageImage(pkg: PackageItem) {
  // Fix the Varanasi campervan bug permanently
  if (
    pkg.slug === 'experience-varanasi-dev-deepawali-3d' ||
    pkg.featured_image?.includes('photo-1561361513-2d000a50f0dc')
  ) {
    return 'https://images.unsplash.com/photo-1687753578819-08e5a39d715a?auto=format&fit=crop&w=800&q=75'
  }
  // Ensure Kerala 5D uses distinct tea gardens photo instead of duplicate houseboat or highway
  if (
    pkg.slug === 'kerala-backwaters-hills-5d' ||
    pkg.featured_image?.includes('photo-1596176530529-78163a4f7af2')
  ) {
    return '/munnar-tea-hills.jpg'
  }
  // Ensure Backwaters & Coastal Sanctuaries uses distinct sunset coastal lagoon
  if (pkg.slug === 'kerala-houseboat-retreat') {
    return '/kerala-coastal-lagoon.jpg'
  }
  if (pkg.featured_image && !pkg.featured_image.includes('photo-1599661559902')) {
    return optimizeUnsplashUrl(pkg.featured_image)
  }
  return 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=75'
}

export function PackageCard({ pkg }: PackageCardProps) {
  const imageUrl = optimizeUnsplashUrl(getPackageImage(pkg))
  const tier = pkg.scarcity_status || (pkg.is_trending ? 'Curated Circuit' : 'Private Heritage')
  const routeEyebrow = pkg.destinations && pkg.destinations.length > 0 ? pkg.destinations.join(' · ') : ''
  const silentLuxuryCopy =
    SILENT_LUXURY_COPY[pkg.slug] ||
    pkg.description ||
    'Experience handcrafted Indian circuits featuring private chauffeur transit, heritage sanctuaries, and discreet bespoke travel stewardship.'

  const whatsappMessage = `Hello Sarrin Holidays, I would like to enquire about the ${pkg.title} journey.`
  const whatsappHref = `https://wa.me/918419887730?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-white/10 bg-[#141310] shadow-xl shadow-black/50 transition-all duration-500 ease-out hover:border-[#C5A059]/60 hover:shadow-2xl hover:shadow-black/70">
      {/* Visual Media Header: aspect-[4/3] */}
      <Link href={`/packages/${pkg.slug}`} className="block relative aspect-[4/3] w-full overflow-hidden bg-[#0C0B09]">
        <img
          src={imageUrl}
          alt={pkg.title}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = '/scene-desert.png'
          }}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B09]/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top Floating Header Badges: ONLY 2 clean metadata tags */}
        <div className="absolute inset-x-3.5 top-3.5 z-10 flex items-center justify-between gap-2 pointer-events-none">
          {/* Top-Left: Duration */}
          <span className="inline-flex items-center rounded-sm border border-white/15 bg-[#0C0B09]/85 px-3 py-1 text-[11px] font-sans font-medium uppercase tracking-wider text-[#F4F2EC] backdrop-blur-md shadow-md shrink-0 whitespace-nowrap">
            {pkg.duration}
          </span>

          {/* Top-Right: Signature Tier */}
          <span className="inline-flex items-center rounded-sm border border-[#C5A059]/40 bg-[#0C0B09]/90 px-3 py-1 text-[11px] font-sans font-medium uppercase tracking-wider text-[#C5A059] backdrop-blur-md shadow-md shrink-0 whitespace-nowrap">
            {tier}
          </span>
        </div>
      </Link>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-6">
        {/* Route Eyebrow in #C5A059 */}
        {routeEyebrow && (
          <div className="text-[11px] tracking-[0.1em] uppercase text-[#C5A059] font-sans font-medium mb-2.5 truncate">
            {routeEyebrow}
          </div>
        )}

        {/* Title: text-[20px] font-semibold text-white tracking-normal leading-snug */}
        <Link href={`/packages/${pkg.slug}`} className="block group-hover:text-[#C5A059] transition-colors">
          <h3 className="text-[20px] font-semibold text-white tracking-normal leading-snug line-clamp-2 min-h-[3.25rem]">
            {pkg.title}
          </h3>
        </Link>

        {/* Short Silent Luxury Copy: text-[15px] font-normal text-[#EAE6DF] leading-relaxed */}
        <p className="mt-2.5 text-[15px] font-normal text-[#EAE6DF] leading-relaxed line-clamp-2">
          {silentLuxuryCopy}
        </p>

        {/* Typographic Line in #C5A059 gold: Private Chauffeur · Curated Stays · 24/7 Concierge */}
        <div className="mt-3.5 text-xs font-sans font-medium text-[#C5A059] tracking-wide">
          Private Chauffeur · Curated Stays · 24/7 Concierge
        </div>

        {/* Quiet link to View Full Itinerary */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-sans">
          <Link
            href={`/packages/${pkg.slug}`}
            className="text-[#E5E2DC]/75 hover:text-[#C5A059] transition-colors uppercase tracking-wider font-medium"
          >
            Explore Complete Itinerary —
          </Link>
          <span className="text-[#C5A059]/70 uppercase tracking-widest text-[10px]">Bespoke Lead</span>
        </div>

        {/* Card Footer: 2 Direct Lead-Generation Actions (Strictly Zero Pricing) */}
        <div className="mt-auto pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-12 gap-2">
          {/* Primary Action Button: WhatsApp Concierge */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:col-span-8 inline-flex items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] px-3.5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0C0B09] transition-all shadow-md active:scale-[0.98] text-center"
          >
            <MessageCircle className="size-3.5 shrink-0" strokeWidth={1.5} />
            <span>WhatsApp Concierge</span>
          </a>

          {/* Secondary Action Button: Call Desk */}
          <a
            href="tel:+918419887730"
            className="sm:col-span-4 inline-flex items-center justify-center gap-1.5 rounded-sm border border-white/20 bg-white/5 hover:bg-white/10 px-3 py-2.5 text-xs font-medium uppercase tracking-wider text-[#F4F2EC] transition-colors text-center"
          >
            <Phone className="size-3.5 text-[#C5A059] shrink-0" strokeWidth={1.5} />
            <span>Call Desk</span>
          </a>
        </div>
      </div>
    </article>
  )
}
