'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { PackageItem } from '@/lib/cms'
import { optimizeUnsplashUrl } from '@/lib/cms'
import { openConciergeDrawer } from '@/components/ConciergeDrawer'

export interface PackageCardProps {
  pkg: PackageItem
  onSelect?: (pkg: PackageItem) => void
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

function formatPricingDisplay(price?: number) {
  if (!price || price <= 0) {
    return 'Bespoke Charter · On Request'
  }
  const inrValue = price < 1000 ? price * 1000 : price
  return `From ₹${inrValue.toLocaleString('en-IN')} / Guest`
}

export function PackageCard({ pkg }: PackageCardProps) {
  const imageUrl = optimizeUnsplashUrl(getPackageImage(pkg))
  const tier = pkg.scarcity_status || (pkg.is_trending ? 'Curated Circuit' : 'Private Heritage')
  const routeEyebrow = pkg.destinations && pkg.destinations.length > 0 ? pkg.destinations.join(' • ') : ''

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-white/10 bg-[#141310] shadow-xl shadow-black/50 transition-all duration-500 ease-out hover:border-[#C5A059]/60 hover:shadow-2xl hover:shadow-black/70">
      {/* Visual Media Header: aspect-[4/3] */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0C0B09]">
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
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-6">
        {/* Route Eyebrow in #C5A059 */}
        {routeEyebrow && (
          <div className="text-[11px] tracking-[0.1em] uppercase text-[#C5A059] font-medium mb-2 truncate">
            {routeEyebrow}
          </div>
        )}

        {/* Title: 2 lines fully readable without single-line ellipses */}
        <Link href={`/packages/${pkg.slug}`} className="block group-hover:text-[#C5A059] transition-colors">
          <h3 className="font-serif text-2xl text-[#F6F3EC] leading-snug line-clamp-2 min-h-[3.5rem] font-medium">
            {pkg.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-2 text-pretty text-sm leading-relaxed text-[#E5E2DC] line-clamp-2 font-normal">
          {pkg.description}
        </p>

        {/* Highlights Bullet Previews */}
        {pkg.highlights && pkg.highlights.length > 0 && (
          <ul className="mt-4 space-y-2 border-t border-white/10 pt-3.5">
            {pkg.highlights.slice(0, 2).map((hl, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-[#E5E2DC]">
                <span className="size-1.5 rounded-full bg-[#C5A059] mt-1 shrink-0" />
                <span className="truncate font-normal">{hl}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Card Footer Pricing & Actions */}
        <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#C5A059] tracking-wider font-sans uppercase">
              {formatPricingDisplay(pkg.price)}
            </span>
            <Link
              href={`/packages/${pkg.slug}`}
              className="mt-0.5 text-[10px] text-[#E5E2DC] hover:text-[#C5A059] tracking-wider uppercase transition-colors"
            >
              View Itinerary →
            </Link>
          </div>

          <button
            type="button"
            onClick={() =>
              openConciergeDrawer({
                packageTitle: pkg.title,
                route: routeEyebrow,
                slug: pkg.slug,
              })
            }
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-sm bg-[#C5A059] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#0C0B09] transition-colors hover:bg-[#D4B475] active:scale-95 shadow-sm shrink-0 cursor-pointer"
          >
            <span>Plan a Trip</span>
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </article>
  )
}
