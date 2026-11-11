'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { MapPin, ArrowUpRight } from 'lucide-react'
import type { PackageItem } from '@/lib/cms'

export interface PackageCardProps {
  pkg: PackageItem
  onSelect?: (pkg: PackageItem) => void
}

function getPackageImage(pkg: PackageItem) {
  if (pkg.featured_image && !pkg.featured_image.includes('photo-1599661559902')) {
    return pkg.featured_image
  }
  return 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=1200'
}

function formatPrice(price: number) {
  const inrValue = price < 10000 ? price * 100 : price
  return `₹${inrValue.toLocaleString('en-IN')}`
}

export function PackageCard({ pkg }: PackageCardProps) {
  // Deduplicate and filter tags to eliminate repeats or echoes of the title
  const curatedTags = useMemo(() => {
    const raw = [...(pkg.theme_tags || []), ...(pkg.experience_tags || [])]
    const seen = new Set<string>()
    const cleaned: string[] = []

    for (const tag of raw) {
      if (!tag) continue
      const normalized = tag.trim().toLowerCase()
      if (!seen.has(normalized)) {
        seen.add(normalized)
        cleaned.push(tag.trim())
      }
    }
    return cleaned.slice(0, 3)
  }, [pkg.theme_tags, pkg.experience_tags])

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-none sm:rounded-sm border border-white/10 bg-[#141310] shadow-xl shadow-black/50 transition-all duration-500 ease-out hover:border-[#C5A059]/40 hover:shadow-2xl hover:shadow-black/70">
      {/* Visual Media Header */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
        <img
          src={getPackageImage(pkg)}
          alt={pkg.title}
          onError={(e) => {
            e.currentTarget.src = '/scene-desert.png'
          }}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B09] via-transparent to-black/30" />

        {/* Top Floating Header Badges: Sleek non-wrapping duration pill + optional status */}
        <div className="absolute inset-x-3.5 top-3.5 z-10 flex items-center justify-between gap-2 pointer-events-none">
          {/* Top-Left: Duration Pill */}
          <span className="inline-flex items-center rounded-none sm:rounded-sm border border-white/15 bg-[#0C0B09]/85 px-3 py-1 text-[11px] font-sans font-medium uppercase tracking-wider text-[#F4F2EC] backdrop-blur-md shadow-md shrink-0 whitespace-nowrap">
            {pkg.duration}
          </span>

          {/* Top-Right: Scarcity Notice OR Curated Circuit Tag */}
          {pkg.scarcity_status ? (
            <span className="inline-flex items-center gap-1.5 rounded-none sm:rounded-sm border border-[#C5A059]/40 bg-[#0C0B09]/90 px-2.5 py-1 text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-wider text-[#C5A059] backdrop-blur-md shadow-md truncate max-w-[58%]">
              <span className="size-1.5 rounded-full bg-[#C5A059] shrink-0" />
              <span className="truncate">{pkg.scarcity_status}</span>
            </span>
          ) : pkg.is_trending ? (
            <span className="inline-flex items-center rounded-none sm:rounded-sm border border-[#C5A059]/30 bg-[#0C0B09]/85 px-2.5 py-1 text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-wider text-[#C5A059] backdrop-blur-md shadow-md shrink-0 whitespace-nowrap">
              Curated Circuit
            </span>
          ) : null}
        </div>

        {/* Destinations Pill on Image Bottom */}
        {pkg.destinations && pkg.destinations.length > 0 && (
          <div className="absolute bottom-2.5 sm:bottom-3 left-3.5 right-3.5 flex items-center gap-1.5 text-xs text-[#F4F2EC]">
            <MapPin className="size-3.5 shrink-0 text-[#C5A059]" />
            <span className="truncate font-medium drop-shadow-md">
              {pkg.destinations.join(' • ')}
            </span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        {/* Curated Non-Duplicate Tags */}
        {curatedTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {curatedTags.map((tag, idx) => (
              <span
                key={tag}
                className={
                  idx === 0
                    ? 'rounded-none sm:rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 px-2.5 py-0.5 text-[10px] font-sans font-medium uppercase tracking-wider text-[#C5A059]'
                    : 'rounded-none sm:rounded-sm border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-sans font-medium uppercase tracking-wider text-[#B8B4AA]'
                }
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/packages/${pkg.slug}`} className="block group-hover:text-[#C5A059] transition-colors">
          <h3 className="font-serif text-xl sm:text-2xl font-normal leading-snug tracking-tight text-[#F4F2EC] line-clamp-1">
            {pkg.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-2 text-pretty text-xs sm:text-sm leading-relaxed text-[#B8B4AA] line-clamp-2 font-light">
          {pkg.description}
        </p>

        {/* Highlights Bullet Previews */}
        {pkg.highlights && pkg.highlights.length > 0 && (
          <ul className="mt-3.5 sm:mt-4 space-y-2 border-t border-white/10 pt-3 sm:pt-3.5">
            {pkg.highlights.slice(0, 2).map((hl, idx) => (
              <li key={idx} className="flex items-center gap-2.5 text-xs text-[#B8B4AA]">
                <span className="size-1.5 rounded-full bg-[#C5A059] shrink-0" />
                <span className="truncate font-light">{hl}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Card Footer Pricing & Actions: Price hidden per client directive */}
        <div className="mt-auto pt-4 sm:pt-5 border-t border-white/10 flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#C5A059] tracking-wider font-sans uppercase">
              Pricing on Request
            </span>
          </div>

          <Link
            href={`/packages/${pkg.slug}`}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-none sm:rounded-sm bg-[#C5A059] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#0C0B09] transition-colors hover:bg-[#D4B475] active:scale-95 shadow-sm shrink-0"
          >
            <span>Inquire</span>
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
