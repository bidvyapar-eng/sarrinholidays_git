'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { fallbackPackages, type PackageItem } from '@/lib/cms'
import { ENABLE_INTERNATIONAL_PACKAGES } from '@/lib/features.config'
import {
  Package,
  Search,
  Filter,
  RefreshCw,
  Clock,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  X,
  MapPin,
  Calendar,
  Flame,
  Globe,
  Tag,
  CheckCircle2,
} from 'lucide-react'

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<PackageItem[]>(fallbackPackages)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTheme, setSelectedTheme] = useState('all')
  const [classificationFilter, setClassificationFilter] = useState<'all' | 'domestic' | 'international'>('all')

  const supabase = useMemo(() => createClient(), [])

  // Fetch packages from Supabase with fallback merge
  const fetchPackages = async (isManual = false) => {
    if (isManual) setRefreshing(true)
    else setLoading(true)

    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.warn('Supabase packages query notice:', error.message)
        setPackages(fallbackPackages)
      } else if (data && data.length > 0) {
        // Merge with fallbacks for complete fields
        const merged = data.map((item) => {
          const fb = fallbackPackages.find((f) => f.slug === item.slug || f.id === item.id)
          return {
            ...fb,
            ...item,
            theme_tags: item.theme_tags || fb?.theme_tags || [],
            inclusions: item.inclusions || fb?.inclusions || [],
            exclusions: item.exclusions || fb?.exclusions || [],
            scarcity_status: item.scarcity_status !== undefined ? item.scarcity_status : fb?.scarcity_status,
          }
        })
        setPackages(merged)
      } else {
        setPackages(fallbackPackages)
      }
    } catch (err) {
      console.error('Failed to load packages:', err)
      setPackages(fallbackPackages)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchPackages()
  }, [])

  // Collect distinct themes
  const availableThemes = useMemo(() => {
    const set = new Set<string>()
    packages.forEach((pkg) => {
      pkg.theme_tags?.forEach((t) => {
        // Hide international themes if feature flag is false
        if (!ENABLE_INTERNATIONAL_PACKAGES && (t.toLowerCase().includes('international') || t.toLowerCase().includes('cross-border'))) {
          return
        }
        set.add(t)
      })
    })
    return Array.from(set)
  }, [packages])

  // Filtered packages
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      // 1. Classification filter (controlled by feature flag)
      if (ENABLE_INTERNATIONAL_PACKAGES && classificationFilter !== 'all') {
        const isInternational =
          (pkg.theme_tags || []).some((t) => t.toLowerCase().includes('international')) ||
          (pkg.destinations || []).some((d) => d.toLowerCase().includes('dubai') || d.toLowerCase().includes('maldives'))
        if (classificationFilter === 'international' && !isInternational) return false
        if (classificationFilter === 'domestic' && isInternational) return false
      }

      // If flag is false, strictly hide any international packages from the table
      if (!ENABLE_INTERNATIONAL_PACKAGES) {
        const isInternational =
          (pkg.theme_tags || []).some((t) => t.toLowerCase().includes('international')) ||
          (pkg.destinations || []).some((d) => d.toLowerCase().includes('dubai') || d.toLowerCase().includes('maldives'))
        if (isInternational) return false
      }

      // 2. Theme filter
      if (selectedTheme !== 'all') {
        if (!pkg.theme_tags || !pkg.theme_tags.includes(selectedTheme)) {
          return false
        }
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = pkg.title.toLowerCase().includes(q)
        const matchDest = (pkg.destinations || []).some((d) => d.toLowerCase().includes(q))
        const matchThemes = (pkg.theme_tags || []).some((t) => t.toLowerCase().includes(q))
        return matchTitle || matchDest || matchThemes
      }

      return true
    })
  }, [packages, selectedTheme, classificationFilter, searchQuery])

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Package className="w-5 h-5" />
            </div>
            <h1 className="font-serif text-2xl md:text-3xl text-white font-medium tracking-tight">
              Curated Packages &amp; Itineraries
            </h1>
          </div>
          <p className="text-xs md:text-sm text-neutral-400 max-w-2xl leading-relaxed">
            Manage royal expeditions, heritage buyouts, and wellness retreats across India. Control inclusions, exclusions, and scarcity tags.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchPackages(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-neutral-200 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Syncing...' : 'Sync Supabase'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/[0.06] backdrop-blur-md">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-mono">Total Expeditions</span>
            <Package className="w-4 h-4 text-neutral-500" />
          </div>
          <div className="text-2xl font-serif text-white font-semibold">{filteredPackages.length}</div>
          <div className="text-[11px] text-neutral-500 mt-1">Active Indian journeys</div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900/50 border border-amber-500/20 backdrop-blur-md">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-mono text-amber-400">Trending</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-serif text-amber-400 font-semibold">
            {filteredPackages.filter((p) => p.is_trending).length}
          </div>
          <div className="text-[11px] text-amber-400/70 mt-1">Highlighted on homepage</div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900/50 border border-rose-500/20 backdrop-blur-md">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-mono text-rose-400">Scarcity Notices</span>
            <Sparkles className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-serif text-rose-400 font-semibold">
            {filteredPackages.filter((p) => p.scarcity_status).length}
          </div>
          <div className="text-[11px] text-rose-400/70 mt-1">High urgency allocations</div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900/50 border border-emerald-500/20 backdrop-blur-md">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-mono text-emerald-400">Regions</span>
            <MapPin className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-serif text-emerald-400 font-semibold">Pan-India</div>
          <div className="text-[11px] text-emerald-400/70 mt-1">Rajasthan, Kerala, Himalayas</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-neutral-900/40 border border-white/[0.06] backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          {/* Classification / Region Filter (Controlled by Feature Flag) */}
          {ENABLE_INTERNATIONAL_PACKAGES && (
            <div className="relative">
              <select
                value={classificationFilter}
                onChange={(e) => setClassificationFilter(e.target.value as any)}
                aria-label="Filter by Classification"
                className="appearance-none pl-8 pr-8 py-2 rounded-lg bg-neutral-900 border border-white/10 text-xs text-neutral-300 focus:outline-none focus:border-amber-500/50 cursor-pointer"
              >
                <option value="all">All Classifications</option>
                <option value="domestic">Domestic Indian Journeys</option>
                <option value="international">International Expeditions</option>
              </select>
              <Globe className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          )}

          {/* Theme Tag Selector */}
          <div className="relative">
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              aria-label="Filter by Theme"
              className="appearance-none pl-8 pr-8 py-2 rounded-lg bg-neutral-900 border border-white/10 text-xs text-neutral-300 focus:outline-none focus:border-amber-500/50 cursor-pointer"
            >
              <option value="all">All Themes ({packages.length})</option>
              {availableThemes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
            <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search packages by title or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-lg bg-neutral-900 border border-white/10 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Data Table */}
      <div className="rounded-xl border border-white/[0.08] bg-neutral-950/60 overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-neutral-900/80 text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                <th className="py-3.5 px-4 font-medium">Package Dossier</th>
                <th className="py-3.5 px-4 font-medium">Destinations</th>
                <th className="py-3.5 px-4 font-medium">Duration</th>
                <th className="py-3.5 px-4 font-medium">Tariff (USD)</th>
                <th className="py-3.5 px-4 font-medium">Thematic Attributes</th>
                <th className="py-3.5 px-4 font-medium">Scarcity Urgency</th>
                <th className="py-3.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-xs">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    <RefreshCw className="w-5 h-5 mx-auto animate-spin text-amber-400 mb-2" />
                    <span>Loading curated packages...</span>
                  </td>
                </tr>
              ) : filteredPackages.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400">
                    <span>No packages match the current filters.</span>
                  </td>
                </tr>
              ) : (
                filteredPackages.map((pkg) => (
                  <tr key={pkg.id || pkg.slug} className="hover:bg-amber-500/[0.02] transition-colors group">
                    {/* Package Title & Image */}
                    <td className="py-4 px-4 align-middle">
                      <div className="flex items-center gap-3">
                        <img
                          src={pkg.featured_image}
                          alt={pkg.title}
                          className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0"
                        />
                        <div>
                          <div className="font-serif text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                            {pkg.title}
                          </div>
                          <div className="text-[11px] font-mono text-neutral-500 mt-0.5">
                            /{pkg.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Destinations */}
                    <td className="py-4 px-4 align-middle">
                      <div className="flex items-center gap-1.5 text-neutral-300">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{(pkg.destinations || []).slice(0, 3).join(', ')}</span>
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="py-4 px-4 align-middle font-mono text-neutral-300">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{pkg.duration}</span>
                      </div>
                    </td>

                    {/* Tariff */}
                    <td className="py-4 px-4 align-middle font-serif font-semibold text-white">
                      ${pkg.price.toLocaleString()}
                    </td>

                    {/* Thematic Attributes (Filtered by feature flag) */}
                    <td className="py-4 px-4 align-middle">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {/* International Badge only when flag is true */}
                        {ENABLE_INTERNATIONAL_PACKAGES &&
                          (pkg.theme_tags || []).some((t) => t.toLowerCase().includes('international')) && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                              International
                            </span>
                          )}
                        {pkg.theme_tags
                          ?.filter((tag) => {
                            if (
                              !ENABLE_INTERNATIONAL_PACKAGES &&
                              (tag.toLowerCase().includes('international') ||
                                tag.toLowerCase().includes('cross-border'))
                            ) {
                              return false
                            }
                            return true
                          })
                          .slice(0, 2)
                          .map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/5 text-neutral-300 border border-white/10"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </td>

                    {/* Scarcity Urgency */}
                    <td className="py-4 px-4 align-middle">
                      {pkg.scarcity_status ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                          <Sparkles className="w-3 h-3 text-rose-400" />
                          <span>{pkg.scarcity_status}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-neutral-500">Standard Allocation</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 align-middle text-right">
                      <Link
                        href={`/packages/${pkg.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-amber-300 transition-colors"
                      >
                        <span>Preview</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
