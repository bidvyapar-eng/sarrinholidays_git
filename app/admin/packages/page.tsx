'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { fallbackPackages, type PackageItem } from '@/lib/cms'
import { ENABLE_INTERNATIONAL_PACKAGES } from '@/lib/features.config'
import { PackageCard } from '@/components/package-card'
import {
  Package,
  Search,
  Filter,
  RefreshCw,
  Clock,
  ArrowUpRight,
  ExternalLink,
  X,
  MapPin,
  Calendar,
  Globe,
  Tag,
  CheckCircle2,
  Plus,
  Edit2,
  Trash2,
  Save,
  AlertCircle,
  Check,
  Image as ImageIcon,
  Eye,
  Info,
  Crown,
} from 'lucide-react'

// Verified high-res Unsplash luxury presets for 1-click curator assignment
const CURATOR_PACKAGE_PRESETS = [
  {
    label: 'Rajasthan Palaces',
    url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=1200',
  },
  {
    label: 'Kerala Backwaters',
    url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200',
  },
  {
    label: 'Himalayan Retreat',
    url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200',
  },
  {
    label: 'Tiger Safari Machan',
    url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=1200',
  },
] as const

interface PackageFormData {
  id?: string
  title: string
  slug: string
  description: string
  price: number
  duration: string
  destinationsStr: string
  featured_image: string
  scarcity_status: string
  is_trending: boolean
  rating: number
  highlightsStr: string
  themeTagsStr: string
  inclusionsStr: string
  exclusionsStr: string
}

const defaultFormData: PackageFormData = {
  title: '',
  slug: '',
  description: '',
  price: 0,
  duration: '7 Days',
  destinationsStr: 'Jaipur, Udaipur, Jodhpur',
  featured_image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=1200',
  scarcity_status: '',
  is_trending: false,
  rating: 4.9,
  highlightsStr: 'Taj Lake Palace Suite, Private Helicopter Transit, Amber Fort VIP Access',
  themeTagsStr: 'Heritage & Palaces, Royal Fortresses, Living Heritage',
  inclusionsStr: 'Luxury 5-Star Palace Stays\nArmored SUV Chauffeur Fleet\nPersonal Royal Historian Guide\n24/7 Dedicated Sarrin Concierge',
  exclusionsStr: 'Commercial International Airfares\nConsular Visa Procurement Fees\nDiscretionary Palace Staff Gratuities',
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<PackageItem[]>(fallbackPackages)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTheme, setSelectedTheme] = useState('all')
  const [classificationFilter, setClassificationFilter] = useState<'all' | 'domestic' | 'international'>('all')

  // Modal and CRUD state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<PackageFormData>(defaultFormData)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [showGuidelines, setShowGuidelines] = useState(true)
  const [modalTab, setModalTab] = useState<'form' | 'preview'>('form')

  const previewPkg: PackageItem = useMemo(() => {
    const rawDest = formData.destinationsStr.split(',').map(s => s.trim()).filter(Boolean)
    const rawTags = formData.themeTagsStr.split(',').map(s => s.trim()).filter(Boolean)
    const rawHighlights = formData.highlightsStr.split(',').map(s => s.trim()).filter(Boolean)
    return {
      id: formData.id || 'preview',
      title: formData.title || 'Untitled Royal Itinerary',
      slug: formData.slug || 'untitled-tour',
      description: formData.description || 'Experience bespoke royal hospitality across private palaces and sacred circuits...',
      price: typeof formData.price === 'number' && !isNaN(formData.price) ? Math.max(0, formData.price) : 0,
      duration: formData.duration || '7 Days',
      destinations: rawDest.length ? rawDest : ['Udaipur', 'Jaipur'],
      featured_image: formData.featured_image || 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=1200',
      scarcity_status: formData.scarcity_status.trim() || null,
      is_trending: formData.is_trending,
      rating: Number(formData.rating) || 4.9,
      highlights: rawHighlights.length ? rawHighlights : ['Palace Grand Suite', 'Helicopter Transfer'],
      theme_tags: rawTags,
      experience_tags: [],
    }
  }, [formData])

  const supabase = useMemo(() => createClient(), [])

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  // Fetch packages from Supabase with fallback & localStorage merge
  const fetchPackages = async (isManual = false) => {
    if (isManual) setRefreshing(true)
    else setLoading(true)

    try {
      // Check localStorage for offline/cached created packages
      let cachedCustom: PackageItem[] = []
      try {
        const stored = localStorage.getItem('sarrin_admin_custom_packages')
        if (stored) cachedCustom = JSON.parse(stored)
      } catch (e) {
        console.warn('LocalStorage unavailable:', e)
      }

      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.warn('Supabase packages query notice:', error.message)
        // Combine fallbacks with any locally saved packages
        const combined = [...cachedCustom, ...fallbackPackages.filter(f => !cachedCustom.some(c => c.slug === f.slug))]
        setPackages(combined)
      } else if (data && data.length > 0) {
        // Merge Supabase data with fallbacks for full rich tags/inclusions
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

        // Also merge any cached custom packages not yet in Supabase
        const finalMerged = [...cachedCustom.filter(c => !merged.some(m => m.slug === c.slug)), ...merged]
        setPackages(finalMerged)
      } else {
        const combined = [...cachedCustom, ...fallbackPackages.filter(f => !cachedCustom.some(c => c.slug === f.slug))]
        setPackages(combined)
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
      // 1. Classification filter
      if (ENABLE_INTERNATIONAL_PACKAGES && classificationFilter !== 'all') {
        const isInternational =
          (pkg.theme_tags || []).some((t) => t.toLowerCase().includes('international')) ||
          (pkg.destinations || []).some((d) => d.toLowerCase().includes('dubai') || d.toLowerCase().includes('maldives'))
        if (classificationFilter === 'international' && !isInternational) return false
        if (classificationFilter === 'domestic' && isInternational) return false
      }

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

  // Modal handlers
  const handleOpenNew = () => {
    setEditingId(null)
    setFormData(defaultFormData)
    setModalTab('form')
    setIsModalOpen(true)
  }

  const handleOpenEdit = (pkg: PackageItem) => {
    setEditingId(pkg.id || pkg.slug)
    setFormData({
      id: pkg.id,
      title: pkg.title,
      slug: pkg.slug,
      description: pkg.description || '',
      price: pkg.price,
      duration: pkg.duration,
      destinationsStr: (pkg.destinations || []).join(', '),
      featured_image: pkg.featured_image || '',
      scarcity_status: pkg.scarcity_status || '',
      is_trending: !!pkg.is_trending,
      rating: pkg.rating || 4.9,
      highlightsStr: (pkg.highlights || []).join(', '),
      themeTagsStr: (pkg.theme_tags || []).join(', '),
      inclusionsStr: (pkg.inclusions || []).join('\n'),
      exclusionsStr: (pkg.exclusions || []).join('\n'),
    })
    setModalTab('form')
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
  }

  // Auto slug generation
  const handleTitleChange = (val: string) => {
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: !editingId ? val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : prev.slug,
    }))
  }

  // Save handler (Insert or Update)
  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.slug.trim()) {
      showToast('Please provide both Title and Slug.', 'error')
      return
    }

    setSaving(true)

    const destinations = formData.destinationsStr.split(',').map(s => s.trim()).filter(Boolean)
    const highlights = formData.highlightsStr.split(',').map(s => s.trim()).filter(Boolean)
    const rawThemeTags = formData.themeTagsStr.split(',').map(s => s.trim()).filter(Boolean)
    const theme_tags = Array.from(new Set(rawThemeTags))
    const inclusions = formData.inclusionsStr.split('\n').map(s => s.trim()).filter(Boolean)
    const exclusions = formData.exclusionsStr.split('\n').map(s => s.trim()).filter(Boolean)

    const packagePayload: PackageItem = {
      id: formData.id || `custom-${Date.now()}`,
      title: formData.title.trim(),
      slug: formData.slug.trim(),
      description: formData.description.trim(),
      price: typeof formData.price === 'number' && !isNaN(formData.price) ? Math.max(0, formData.price) : 0,
      duration: formData.duration.trim() || '7 Days',
      destinations: destinations.length ? destinations : ['Pan-India'],
      featured_image: formData.featured_image.trim() || '/scene-desert.png',
      scarcity_status: formData.scarcity_status.trim() || null,
      is_trending: formData.is_trending,
      rating: Number(formData.rating) || 4.9,
      highlights,
      theme_tags,
      inclusions,
      exclusions,
    }

    try {
      // 1. Supabase attempt
      if (editingId) {
        const { error } = await supabase
          .from('packages')
          .update({
            title: packagePayload.title,
            slug: packagePayload.slug,
            description: packagePayload.description,
            price: packagePayload.price,
            duration: packagePayload.duration,
            destinations: packagePayload.destinations,
            featured_image: packagePayload.featured_image,
            scarcity_status: packagePayload.scarcity_status,
            is_trending: packagePayload.is_trending,
            rating: packagePayload.rating,
            highlights: packagePayload.highlights,
            theme_tags: packagePayload.theme_tags,
            inclusions: packagePayload.inclusions,
            exclusions: packagePayload.exclusions,
          })
          .eq('slug', packagePayload.slug)

        if (error) console.warn('Supabase update note:', error.message)
      } else {
        const { error } = await supabase
          .from('packages')
          .insert({
            title: packagePayload.title,
            slug: packagePayload.slug,
            description: packagePayload.description,
            price: packagePayload.price,
            duration: packagePayload.duration,
            destinations: packagePayload.destinations,
            featured_image: packagePayload.featured_image,
            scarcity_status: packagePayload.scarcity_status,
            is_trending: packagePayload.is_trending,
            rating: packagePayload.rating,
            highlights: packagePayload.highlights,
            theme_tags: packagePayload.theme_tags,
            inclusions: packagePayload.inclusions,
            exclusions: packagePayload.exclusions,
          })

        if (error) console.warn('Supabase insert note:', error.message)
      }

      // 2. Optimistic UI update
      setPackages(prev => {
        if (editingId) {
          return prev.map(p => (p.slug === editingId || p.id === editingId) ? packagePayload : p)
        }
        return [packagePayload, ...prev.filter(p => p.slug !== packagePayload.slug)]
      })

      // 3. Persist to localStorage
      try {
        const stored = localStorage.getItem('sarrin_admin_custom_packages')
        const currentCustom: PackageItem[] = stored ? JSON.parse(stored) : []
        const updatedCustom = [
          packagePayload,
          ...currentCustom.filter(p => p.slug !== packagePayload.slug && p.id !== packagePayload.id)
        ]
        localStorage.setItem('sarrin_admin_custom_packages', JSON.stringify(updatedCustom))
      } catch (e) {
        console.warn('LocalStorage error:', e)
      }

      showToast(editingId ? 'Package updated successfully!' : 'New package created successfully!', 'success')
      handleCloseModal()
    } catch (err: any) {
      console.error('Save error:', err)
      showToast(err?.message || 'Failed to save package.', 'error')
    } finally {
      setSaving(false)
    }
  }

  // Delete handler
  const handleDeletePackage = async (pkg: PackageItem) => {
    if (!window.confirm(`Are you sure you want to delete "${pkg.title}"?`)) {
      return
    }

    setDeletingId(pkg.id || pkg.slug)
    try {
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('slug', pkg.slug)

      if (error) console.warn('Supabase delete note:', error.message)

      // Optimistic update
      setPackages(prev => prev.filter(p => p.slug !== pkg.slug && p.id !== pkg.id))

      // Update localStorage
      try {
        const stored = localStorage.getItem('sarrin_admin_custom_packages')
        if (stored) {
          const currentCustom: PackageItem[] = JSON.parse(stored)
          const updatedCustom = currentCustom.filter(p => p.slug !== pkg.slug && p.id !== pkg.id)
          localStorage.setItem('sarrin_admin_custom_packages', JSON.stringify(updatedCustom))
        }
      } catch (e) {
        console.warn('LocalStorage error:', e)
      }

      showToast(`Package "${pkg.title}" removed.`, 'success')
    } catch (err: any) {
      console.error('Delete error:', err)
      showToast('Error removing package.', 'error')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-300 ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-200'
              : 'bg-rose-950/90 border-rose-500/30 text-rose-200'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span className="text-xs font-medium">{toast.message}</span>
        </div>
      )}

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

          <button
            onClick={handleOpenNew}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-[#c5a030] text-primary-foreground font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-primary/20 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Package</span>
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
            <span className="text-[11px] uppercase tracking-wider font-mono text-amber-400">Curator Highlights</span>
            <Crown className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-serif text-amber-400 font-semibold">
            {filteredPackages.filter((p) => p.is_trending).length}
          </div>
          <div className="text-[11px] text-amber-400/70 mt-1">Highlighted on homepage</div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900/50 border border-rose-500/20 backdrop-blur-md">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-mono text-rose-400">Scarcity Notices</span>
            <Clock className="w-4 h-4 text-rose-400" />
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

      {/* Curator Image & Publishing Standards Banner */}
      <div className="rounded-2xl border border-amber-500/25 bg-gradient-to-r from-amber-950/30 via-neutral-950 to-neutral-950 p-5 md:p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 shrink-0 mt-0.5">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-semibold text-white tracking-wide">
                  Curator Image &amp; Dossier Guidelines
                </h3>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Aman &amp; Belmond Luxury Standard
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Follow these clear standards when adding or editing itineraries so cards render flawlessly without badge collisions or slow loads.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowGuidelines(!showGuidelines)}
            className="text-xs text-amber-400/80 hover:text-amber-300 underline font-mono shrink-0 cursor-pointer"
          >
            {showGuidelines ? 'Collapse [-]' : 'Expand Instructions [+]'}
          </button>
        </div>

        {showGuidelines && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 pt-4 border-t border-white/[0.08] text-xs">
            <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-white/5 space-y-1.5">
              <div className="text-amber-400 font-medium font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" /> 1. Image Dimensions
              </div>
              <p className="text-neutral-300 font-semibold">1200 × 800 px (16:9 ratio)</p>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Horizontal landscape orientation ensures the image fills the card frame without awkward cropping.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-white/5 space-y-1.5">
              <div className="text-amber-400 font-medium font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> 2. File Size &amp; Format
              </div>
              <p className="text-neutral-300 font-semibold">&lt; 500 KB • WebP or JPG</p>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Keep file size under 500 KB for lightning-fast loading on mobile and desktop. Always compress before publishing.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-white/5 space-y-1.5">
              <div className="text-amber-400 font-medium font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> 3. Composition
              </div>
              <p className="text-neutral-300 font-semibold">Clean Editorial Photo</p>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Never upload images with text banners, discount badges, or watermarks. The UI automatically displays the duration and allocation pill cleanly.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-white/5 space-y-1.5">
              <div className="text-amber-400 font-medium font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> 4. Scarcity &amp; Tags
              </div>
              <p className="text-neutral-300 font-semibold">Max 28 Characters</p>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                e.g. <em>"Diwali Palace Allocation"</em> or <em>"Only 2 Buyouts Left"</em>. Short phrasing prevents text clipping on small phones.
              </p>
            </div>
          </div>
        )}
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
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
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
                <th className="py-3.5 px-4 font-medium">Tariff</th>
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
                          onError={(e) => {
                            e.currentTarget.src = '/scene-desert.png'
                          }}
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
                    <td className="py-4 px-4 align-middle">
                      {pkg.price && pkg.price > 0 ? (
                        <span className="font-serif font-semibold text-white">
                          ₹{(pkg.price < 10000 ? pkg.price * 100 : pkg.price).toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          Pricing on Request
                        </span>
                      )}
                    </td>

                    {/* Thematic Attributes */}
                    <td className="py-4 px-4 align-middle">
                      <div className="flex flex-wrap gap-1 max-w-xs">
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
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                          <span>{pkg.scarcity_status}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-neutral-500">Standard Allocation</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/packages/${pkg.slug}`}
                          target="_blank"
                          title="Preview public package page"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(pkg)}
                          title="Edit package specifications"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePackage(pkg)}
                          disabled={deletingId === (pkg.id || pkg.slug)}
                          title="Delete package"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 text-neutral-300 hover:text-rose-400 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over / Modal for Package Creation & Editing */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 rounded-2xl border border-white/15 bg-neutral-950 p-6 md:p-8 shadow-2xl">
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-serif text-white font-medium">
                    {editingId ? 'Edit Package Dossier' : 'Create New Curated Package'}
                  </h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Define itinerary details, pricing, inclusions, and scarcity tags.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Tab Switcher */}
                <div className="flex items-center p-1 rounded-xl bg-neutral-900 border border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => setModalTab('form')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                      modalTab === 'form'
                        ? 'bg-amber-500/20 text-amber-300 shadow-sm'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Edit Dossier
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab('preview')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                      modalTab === 'preview'
                        ? 'bg-amber-500/20 text-amber-300 shadow-sm'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live Card Preview</span>
                  </button>
                </div>

                <button
                  onClick={handleCloseModal}
                  aria-label="Close modal"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 cursor-pointer ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Live Guest Card Preview Tab */}
            {modalTab === 'preview' ? (
              <div className="py-4 space-y-6 animate-in fade-in duration-200">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
                  <Info className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Real-time Card Simulation:</strong> This is how your package appears to guests on the homepage and catalog. Notice the clean top duration pill and scarcity allocation chip without overlapping badges.
                  </p>
                </div>

                <div className="max-w-sm mx-auto">
                  <PackageCard pkg={previewPkg} />
                </div>

                <div className="flex justify-end pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setModalTab('form')}
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-[#c5a030] text-primary-foreground font-semibold text-xs tracking-wider uppercase transition-all shadow-lg cursor-pointer"
                  >
                    Back to Form Fields
                  </button>
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSavePackage} className="space-y-5 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
                      Package Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Sovereign Rajasthan Grand Circuit"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="e.g. royal-rajasthan-tour"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white font-mono placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
                      Tariff Amount (INR) <span className="text-neutral-500 normal-case">(0 for Price on Request)</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: Math.max(0, Number(e.target.value)) }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
                      Duration *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="e.g. 10 Days"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
                      Scarcity Notice (Optional)
                    </label>
                    <input
                      type="text"
                      maxLength={32}
                      value={formData.scarcity_status}
                      onChange={(e) => setFormData(prev => ({ ...prev, scarcity_status: e.target.value }))}
                      placeholder="e.g. Diwali Palace Allocation"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-amber-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
                    />
                    <p className="text-[10px] text-neutral-400 mt-1">Keep under 28 chars (renders top-right on card).</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
                    Destinations (Comma-separated) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.destinationsStr}
                    onChange={(e) => setFormData(prev => ({ ...prev, destinationsStr: e.target.value }))}
                    placeholder="e.g. Udaipur, Jaipur, Jodhpur"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                {/* Featured Image with Presets and Plain Guidelines */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono uppercase text-neutral-300">
                      Featured Image URL *
                    </label>
                    <span className="text-[11px] text-amber-400 font-mono">1200×800 px (16:9) • &lt; 500 KB</span>
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="url"
                      required
                      value={formData.featured_image}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                      placeholder="https://..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
                    />
                    {formData.featured_image && (
                      <img
                        src={formData.featured_image}
                        alt="Preview"
                        onError={(e) => {
                          e.currentTarget.src = '/scene-desert.png'
                        }}
                        className="size-10 rounded-lg object-cover border border-white/15 shrink-0"
                      />
                    )}
                  </div>

                  {/* 1-Click Luxury Presets */}
                  <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] text-neutral-400 font-mono">1-Click Presets:</span>
                    {CURATOR_PACKAGE_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, featured_image: preset.url }))}
                        className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-[11px] text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
                    Overview Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Detailed narrative describing the royal circuit, suites, and bespoke transit..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
                      Highlights (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.highlightsStr}
                      onChange={(e) => setFormData(prev => ({ ...prev, highlightsStr: e.target.value }))}
                      placeholder="e.g. Taj Lake Palace, Armored SUV, Night City Palace Access"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
                      Theme Tags (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.themeTagsStr}
                      onChange={(e) => setFormData(prev => ({ ...prev, themeTagsStr: e.target.value }))}
                      placeholder="e.g. Heritage & Palaces, Royal Fortresses"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
                    />
                    <p className="text-[10px] text-neutral-400 mt-1">Duplicates are automatically pruned.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
                      Inclusions (One per line)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.inclusionsStr}
                      onChange={(e) => setFormData(prev => ({ ...prev, inclusionsStr: e.target.value }))}
                      placeholder="Taj Lake Palace Grand Presidential Suite&#10;Private twin-engine helicopter transfers&#10;Armored luxury SUV chauffeur fleet"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 resize-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-300 mb-1.5">
                      Exclusions (One per line)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.exclusionsStr}
                      onChange={(e) => setFormData(prev => ({ ...prev, exclusionsStr: e.target.value }))}
                      placeholder="Commercial or private long-haul flights&#10;Consular visa procurement fees&#10;Discretionary palace gratuities"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 resize-none font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_trending}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_trending: e.target.checked }))}
                      className="size-4 rounded border-white/20 bg-neutral-900 text-amber-500 focus:ring-0"
                    />
                    <span className="text-xs text-neutral-300">Highlight as Curator Choice on Homepage</span>
                  </label>
                </div>

                {/* Form Buttons */}
                <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-5 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-[#c5a030] text-primary-foreground font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-primary/20 cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Saving...' : editingId ? 'Update Package' : 'Save Package'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
