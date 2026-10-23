'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Calendar,
  Flame,
  Star,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Compass,
} from 'lucide-react'
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

export function PackageCard({ pkg, onSelect }: PackageCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/12 bg-slate-900/60 shadow-xl shadow-black/40 backdrop-blur-xl transition-all duration-500 ease-out hover:border-primary/50 hover:shadow-2xl hover:shadow-black/70">
      {/* Visual Media Header */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
        <img
          src={getPackageImage(pkg)}
          alt={pkg.title}
          onError={(e) => {
            e.currentTarget.src = '/scene-desert.png'
          }}
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

        {/* ============================================================= */}
        {/* TOP-LEFT: SLEEK SEMI-TRANSPARENT SCARCITY BADGE               */}
        {/* ============================================================= */}
        {pkg.scarcity_status ? (
          <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 z-10">
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/40 bg-rose-950/80 px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-rose-200 backdrop-blur-md shadow-lg shadow-black/70"
            >
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-rose-500" />
              </span>
              <Sparkles className="size-3 text-rose-300 shrink-0" />
              <span className="tracking-wide truncate max-w-[200px] sm:max-w-none">{pkg.scarcity_status}</span>
            </motion.div>
          </div>
        ) : (
          /* Default Duration Pill when no scarcity */
          <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 z-10">
            <span className="rounded-full border border-white/20 bg-gradient-to-r from-primary/95 to-primary/80 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-primary-foreground shadow-md backdrop-blur-md">
              {pkg.duration}
            </span>
          </div>
        )}

        {/* Top-Right: Rating or Trending */}
        <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-10 flex items-center gap-1.5">
          {pkg.is_trending && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-500/30 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold text-amber-200 backdrop-blur-md">
              <Flame className="size-3 text-amber-400" />
              <span>Trending</span>
            </span>
          )}
          {pkg.rating && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/60 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold text-white backdrop-blur-md">
              <Star className="size-3 fill-amber-400 text-amber-400" />
              {pkg.rating.toFixed(1)}
            </span>
          )}
        </div>

        {/* When scarcity badge is active, place Duration chip on secondary overlay */}
        {pkg.scarcity_status && (
          <div className="absolute top-11 sm:top-12 left-3 sm:left-3.5 z-10">
            <span className="rounded-full border border-white/15 bg-black/70 px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono font-medium text-white/90 backdrop-blur-md">
              {pkg.duration}
            </span>
          </div>
        )}

        {/* Destinations Pill on Image Bottom */}
        {pkg.destinations && pkg.destinations.length > 0 && (
          <div className="absolute bottom-2.5 sm:bottom-3 left-3.5 right-3.5 flex items-center gap-1.5 text-xs text-white/95">
            <MapPin className="size-3.5 shrink-0 text-primary" />
            <span className="truncate font-medium drop-shadow-md">
              {pkg.destinations.join(' • ')}
            </span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        {/* Themes & Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {pkg.theme_tags?.slice(0, 2).map((theme) => (
            <span
              key={theme}
              className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-serif italic text-amber-300"
            >
              ✦ {theme}
            </span>
          ))}
          {pkg.experience_tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <Link href={`/packages/${pkg.slug}`} className="block group-hover:text-primary transition-colors">
          <h3 className="font-serif text-xl sm:text-2xl leading-snug tracking-tight text-white line-clamp-1">
            {pkg.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-2 text-pretty text-xs sm:text-sm leading-relaxed text-foreground/70 line-clamp-2 font-light">
          {pkg.description}
        </p>

        {/* Highlights Bullet Previews */}
        {pkg.highlights && pkg.highlights.length > 0 && (
          <ul className="mt-3.5 sm:mt-4 space-y-1.5 border-t border-white/10 pt-3 sm:pt-3.5">
            {pkg.highlights.slice(0, 2).map((hl, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-foreground/75">
                <CheckCircle2 className="size-3.5 shrink-0 text-primary" />
                <span className="truncate">{hl}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Card Footer Pricing & Actions */}
        <div className="mt-auto pt-4 sm:pt-5 border-t border-white/10 flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-semibold text-white tracking-tight font-mono">
              {formatPrice(pkg.price)}
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-foreground/50 font-mono">
              per guest (All-Inclusive)
            </span>
          </div>

          <Link
            href={`/packages/${pkg.slug}`}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-[11px] sm:text-xs font-semibold text-primary-foreground transition-all hover:brightness-110 hover:scale-[1.03] active:scale-95 shadow-md shadow-primary/20 shrink-0"
          >
            <span>View Itinerary</span>
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
