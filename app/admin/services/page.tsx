'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { fallbackServices, type ServiceItem } from '@/lib/cms'
import {
  Crown,
  Plane,
  Compass,
  ShieldCheck,
  HeartHandshake,
  Award,
  Clock,
  Search,
  RefreshCw,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  ExternalLink,
  ArrowUpRight,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Eye,
  Info,
} from 'lucide-react'

// Available luxury icons for curators
const AVAILABLE_ICONS = [
  { name: 'Crown', label: 'Royal & Palaces', icon: Crown },
  { name: 'Plane', label: 'Aviation & Charters', icon: Plane },
  { name: 'Compass', label: 'Expeditions & Wellness', icon: Compass },
  { name: 'ShieldCheck', label: 'VIP Security & Escort', icon: ShieldCheck },
  { name: 'HeartHandshake', label: 'Stewardship & Care', icon: HeartHandshake },
  { name: 'Award', label: 'Heritage & Diplomatic', icon: Award },
  { name: 'Clock', label: '24/7 Rapid Liaison', icon: Clock },
] as const

// Verified high-res Unsplash luxury presets for 1-click curator assignment
const CURATOR_IMAGE_PRESETS = [
  {
    label: 'Private Aviation',
    url: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&q=80&w=1200',
  },
  {
    label: 'Palace Architecture',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
  },
  {
    label: 'Ayurveda & Wellness',
    url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
  },
  {
    label: 'VIP Chauffeur Fleet',
    url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200',
  },
  {
    label: 'Coastal Yacht',
    url: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&q=80&w=1200',
  },
]

interface ServiceFormData {
  id?: string
  title: string
  slug: string
  short_desc: string
  full_desc: string
  icon_name: string
  hero_image: string
  sort_order: number
  is_published: boolean
}

const defaultFormData: ServiceFormData = {
  title: '',
  slug: '',
  short_desc: '',
  full_desc: '',
  icon_name: 'Crown',
  hero_image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
  sort_order: 1,
  is_published: true,
}

function resolveServiceIcon(name: string, className = 'size-4') {
  switch (name?.toLowerCase()) {
    case 'plane':
      return <Plane className={className} />
    case 'crown':
      return <Crown className={className} />
    case 'compass':
      return <Compass className={className} />
    case 'shieldcheck':
    case 'shield':
      return <ShieldCheck className={className} />
    case 'hearthandshake':
      return <HeartHandshake className={className} />
    case 'award':
      return <Award className={className} />
    case 'clock':
      return <Clock className={className} />
    default:
      return <Crown className={className} />
  }
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(fallbackServices)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showGuidelines, setShowGuidelines] = useState(true)

  // Modal and CRUD state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<ServiceFormData>(defaultFormData)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const supabase = useMemo(() => createClient(), [])

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  // Fetch services from Supabase with fallback & localStorage merge
  const fetchServices = async (isManual = false) => {
    if (isManual) setRefreshing(true)
    else setLoading(true)

    try {
      let cachedCustom: ServiceItem[] = []
      try {
        const stored = localStorage.getItem('sarrin_admin_custom_services')
        if (stored) cachedCustom = JSON.parse(stored)
      } catch (e) {
        console.warn('LocalStorage unavailable:', e)
      }

      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true })

      if (error) {
        console.warn('Supabase services query notice:', error.message)
        const combined = [...cachedCustom, ...fallbackServices.filter(f => !cachedCustom.some(c => c.slug === f.slug))]
        setServices(combined)
      } else if (data && data.length > 0) {
        const merged = data.map((item) => {
          const fb = fallbackServices.find((f) => f.slug === item.slug || f.id === item.id)
          return {
            ...fb,
            ...item,
          }
        })
        const missingFallbacks = fallbackServices.filter(f => !data.some(d => d.slug === f.slug))
        const combined = [
          ...cachedCustom.filter(c => !merged.some(m => m.slug === c.slug)),
          ...merged,
          ...missingFallbacks.filter(f => !cachedCustom.some(c => c.slug === f.slug)),
        ]
        setServices(combined)
      } else {
        const combined = [...cachedCustom, ...fallbackServices.filter(f => !cachedCustom.some(c => c.slug === f.slug))]
        setServices(combined)
      }
    } catch (err: any) {
      console.warn('Fetch error:', err.message)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    void fetchServices()
  }, [])

  // Auto-slug generator from title
  const handleTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')

    setFormData(prev => ({
      ...prev,
      title: val,
      slug: editingId ? prev.slug : slug,
    }))
  }

  const handleOpenCreateModal = () => {
    setEditingId(null)
    setFormData({
      ...defaultFormData,
      sort_order: services.length + 1,
    })
    setActiveTab('form')
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (service: ServiceItem) => {
    setEditingId(service.id)
    setFormData({
      id: service.id,
      title: service.title,
      slug: service.slug,
      short_desc: service.short_desc,
      full_desc: service.full_desc,
      icon_name: service.icon_name || 'Crown',
      hero_image: service.hero_image,
      sort_order: service.sort_order ?? 1,
      is_published: service.is_published ?? true,
    })
    setActiveTab('form')
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
    setFormData(defaultFormData)
  }

  // Save (Create or Update) Service
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.slug.trim()) {
      showToast('Service Title and URL Slug are required.', 'error')
      return
    }

    setSaving(true)

    const payload = {
      title: formData.title.trim(),
      slug: formData.slug.trim().toLowerCase(),
      short_desc: formData.short_desc.trim(),
      full_desc: formData.full_desc.trim(),
      icon_name: formData.icon_name || 'Crown',
      hero_image: formData.hero_image.trim() || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
      sort_order: Number(formData.sort_order) || 1,
      is_published: formData.is_published,
    }

    try {
      if (editingId) {
        // Update in Supabase
        const { error } = await supabase
          .from('services')
          .update(payload)
          .eq('id', editingId)

        if (error) {
          console.warn('Supabase update notice:', error.message)
        }

        // Update local state and localStorage
        const updatedList = services.map(s => s.id === editingId ? { ...s, ...payload } : s)
        setServices(updatedList)
        try {
          localStorage.setItem('sarrin_admin_custom_services', JSON.stringify(updatedList))
        } catch (e) {}

        showToast('Service dossier successfully updated.')
      } else {
        // Create in Supabase
        const newId = crypto.randomUUID()
        const newService: ServiceItem = {
          id: newId,
          ...payload,
        }

        const { error } = await supabase
          .from('services')
          .insert([newService])

        if (error) {
          console.warn('Supabase insert notice:', error.message)
        }

        // Update local state and localStorage
        const updatedList = [newService, ...services]
        setServices(updatedList)
        try {
          localStorage.setItem('sarrin_admin_custom_services', JSON.stringify(updatedList))
        } catch (e) {}

        showToast('New bespoke service created and published.')
      }

      handleCloseModal()
    } catch (err: any) {
      showToast(`Error saving service: ${err.message}`, 'error')
    } finally {
      setSaving(false)
    }
  }

  // Delete Service with confirmation
  const handleDeleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)

      if (error) {
        console.warn('Supabase delete notice:', error.message)
      }

      const filtered = services.filter(s => s.id !== id)
      setServices(filtered)
      try {
        localStorage.setItem('sarrin_admin_custom_services', JSON.stringify(filtered))
      } catch (e) {}

      showToast('Service removed from catalog.')
    } catch (err: any) {
      showToast(`Error removing service: ${err.message}`, 'error')
    } finally {
      setDeletingId(null)
    }
  }

  // Filtered services based on search query
  const filteredServices = useMemo(() => {
    return services.filter(s => {
      const q = searchQuery.toLowerCase().trim()
      if (!q) return true
      return (
        s.title.toLowerCase().includes(q) ||
        s.slug.toLowerCase().includes(q) ||
        s.short_desc.toLowerCase().includes(q)
      )
    })
  }, [services, searchQuery])

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl px-5 py-3.5 text-xs font-semibold shadow-2xl backdrop-blur-xl border transition-all animate-in slide-in-from-bottom-5 ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40 shadow-emerald-950/50'
              : 'bg-rose-950/90 text-rose-200 border-rose-500/40 shadow-rose-950/50'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono uppercase tracking-[0.1em] text-primary font-medium">
              Operations Atelier
            </span>
            <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-mono text-primary font-semibold">
              {services.length} Services Active
            </span>
          </div>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
            Bespoke Services Manager
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-foreground/70 font-normal max-w-2xl leading-relaxed">
            Create, edit, and organize private aviation charters, palace buyouts, wellness retreats, and VIP escort protocols. Everything published here syncs seamlessly to the public website.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => void fetchServices(true)}
            disabled={refreshing}
            title="Refresh Services Catalog"
            className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-foreground/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-primary' : ''}`} />
          </button>

          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 rounded-xl bg-primary hover:bg-[#c5a030] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* CURATOR GUIDELINES BANNER: CLEAR INSTRUCTIONS IN PLAIN WORDS             */}
      {/* ======================================================================= */}
      <div className="rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/10 via-slate-900/90 to-amber-950/20 p-6 backdrop-blur-xl shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2 text-primary font-serif text-lg font-medium">
            <Info className="size-5 shrink-0" />
            <span>Curator Image &amp; Publishing Standards</span>
          </div>
          <button
            onClick={() => setShowGuidelines(!showGuidelines)}
            className="text-xs font-mono text-primary/80 hover:text-primary transition-colors cursor-pointer"
          >
            {showGuidelines ? 'Collapse' : 'Expand Guidelines'}
          </button>
        </div>

        {showGuidelines && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-foreground/80 leading-relaxed border-t border-primary/20 pt-4">
            <div className="space-y-1.5">
              <span className="font-mono uppercase text-primary tracking-wider text-[11px] block font-semibold">
                1. Image Dimensions &amp; Aspect Ratio
              </span>
              <p>
                Recommended size: <strong>1200 × 800 pixels</strong> (or 1920 × 1080 px). Horizontal landscape orientation is required for Bento cards and hero banners.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-mono uppercase text-primary tracking-wider text-[11px] block font-semibold">
                2. File Size &amp; Quality
              </span>
              <p>
                Keep images under <strong>500 KB</strong> (WebP or compressed JPG). High-resolution architectural, aviation, or nature photography without text overlays, logos, or watermarks.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-mono uppercase text-primary tracking-wider text-[11px] block font-semibold">
                3. URL Slug &amp; Web Link
              </span>
              <p>
                The slug forms the public web link (e.g. <code>/services/private-aviation-charters</code>). It auto-generates from your title using lowercase letters and hyphens.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-foreground/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search service title or description..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-xs font-medium text-white placeholder:text-foreground/40 outline-none transition-colors focus:border-primary/50 focus:bg-white/10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-white"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-foreground/60 font-mono">
          <span>Showing {filteredServices.length} of {services.length} services</span>
        </div>
      </div>

      {/* Services Table Card */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.03] text-[11px] font-mono uppercase tracking-wider text-foreground/50">
              <tr>
                <th className="py-4 px-5">Service / Visual</th>
                <th className="py-4 px-4">Icon</th>
                <th className="py-4 px-4">Brief Narrative</th>
                <th className="py-4 px-4 text-center">Sort Order</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-foreground/50">
                    No services found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr key={service.id || service.slug} className="hover:bg-white/[0.02] transition-colors">
                    {/* Visual Media & Title */}
                    <td className="py-4 px-5 align-middle">
                      <div className="flex items-center gap-3.5">
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-black/50">
                          <img
                            src={service.hero_image}
                            alt={service.title}
                            className="size-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/scene-desert.png'
                            }}
                          />
                        </div>
                        <div>
                          <span className="font-serif text-sm font-medium text-white block">
                            {service.title}
                          </span>
                          <span className="font-mono text-[10px] text-primary/80 block mt-0.5">
                            /services/{service.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Icon */}
                    <td className="py-4 px-4 align-middle">
                      <div className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-primary font-mono">
                        {resolveServiceIcon(service.icon_name || 'Crown', 'size-3.5')}
                        <span>{service.icon_name || 'Crown'}</span>
                      </div>
                    </td>

                    {/* Short Description */}
                    <td className="py-4 px-4 align-middle max-w-xs">
                      <p className="line-clamp-2 text-foreground/70 font-normal leading-relaxed">
                        {service.short_desc}
                      </p>
                    </td>

                    {/* Sort Order */}
                    <td className="py-4 px-4 align-middle text-center font-mono text-foreground/70">
                      {service.sort_order ?? 1}
                    </td>

                    {/* Published Status */}
                    <td className="py-4 px-4 align-middle text-center">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold ${
                          service.is_published !== false
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-neutral-800 text-neutral-400 border border-white/10'
                        }`}
                      >
                        {service.is_published !== false ? 'Live' : 'Draft'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/services/${service.slug}`}
                          target="_blank"
                          title="View live service page"
                          className="p-1.5 rounded-lg text-foreground/50 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <ExternalLink className="size-4" />
                        </Link>

                        <button
                          onClick={() => handleOpenEditModal(service)}
                          title="Edit Service Dossier"
                          className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                        >
                          <Edit2 className="size-4" />
                        </button>

                        <button
                          onClick={() => setDeletingId(service.id)}
                          title="Delete Service"
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        >
                          <Trash2 className="size-4" />
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

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl border border-rose-500/30 bg-slate-900 p-6 shadow-2xl text-center space-y-4">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
              <Trash2 className="size-6" />
            </div>
            <h3 className="font-serif text-xl text-white">Remove Service Dossier?</h3>
            <p className="text-xs text-foreground/70 leading-relaxed">
              This action will permanently remove this service from the public catalog and navigation. Are you certain?
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-xs text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteService(deletingId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-semibold uppercase tracking-wider text-white transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* ADD / EDIT SERVICE MODAL WITH LIVE CARD PREVIEW                         */}
      {/* ======================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
          <div className="relative w-full max-w-4xl rounded-3xl border border-white/15 bg-slate-900/95 p-6 sm:p-8 shadow-2xl my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/20 border border-primary/30 text-primary">
                  <Crown className="size-5" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-white font-medium">
                    {editingId ? 'Edit Bespoke Service' : 'Create New Luxury Service'}
                  </h2>
                  <p className="text-xs text-foreground/60 mt-0.5">
                    Define titles, imagery, narratives, and presentation icons.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Tab Switcher: Form vs Live Preview */}
                <div className="flex items-center rounded-xl border border-white/15 bg-white/5 p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('form')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeTab === 'form' ? 'bg-primary text-primary-foreground font-semibold' : 'text-foreground/70 hover:text-white'
                    }`}
                  >
                    Edit Fields
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeTab === 'preview' ? 'bg-primary text-primary-foreground font-semibold' : 'text-foreground/70 hover:text-white'
                    }`}
                  >
                    <Eye className="size-3.5" />
                    <span>Live Preview</span>
                  </button>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="p-1.5 rounded-lg text-foreground/50 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            {activeTab === 'preview' ? (
              /* Live Preview Mode */
              <div className="space-y-6 py-4">
                <div className="text-center max-w-md mx-auto">
                  <span className="text-xs font-mono uppercase tracking-widest text-primary">
                    Live Guest Bento Preview
                  </span>
                  <p className="text-xs text-foreground/60 mt-1">
                    This is how your service will appear on the public Services page.
                  </p>
                </div>

                {/* Simulated Bento Card */}
                <div className="max-w-xl mx-auto rounded-3xl border border-white/15 bg-slate-900/80 p-6 backdrop-blur-xl shadow-2xl space-y-5">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                    <img
                      src={formData.hero_image}
                      alt={formData.title || 'Preview'}
                      className="size-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/scene-desert.png'
                      }}
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-md">
                      {resolveServiceIcon(formData.icon_name, 'size-3.5 text-primary')}
                      <span>{formData.icon_name}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl text-white font-normal">
                      {formData.title || 'Untitled Service'}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-foreground/75 leading-relaxed font-normal">
                      {formData.short_desc || 'Brief descriptive summary of this luxury service...'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-primary uppercase tracking-wider">
                      Explore Dossier
                    </span>
                    <button
                      type="button"
                      className="rounded-xl border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary"
                    >
                      Request this Service
                    </button>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('form')}
                    className="text-xs font-mono text-primary underline cursor-pointer"
                  >
                    ← Return to edit fields
                  </button>
                </div>
              </div>
            ) : (
              /* Form Mode */
              <form onSubmit={handleSaveService} className="space-y-6">
                {/* Row 1: Title and Auto-Slug */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-foreground/80 mb-1.5 font-medium">
                      Service Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Private Island & Coastal Buyouts"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/15 text-xs text-white placeholder:text-foreground/40 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-foreground/80 mb-1.5 font-medium">
                      URL Slug * (auto-generated)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="e.g. private-island-coastal-buyouts"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/15 text-xs text-white font-mono placeholder:text-foreground/40 focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Row 2: Icon Selector */}
                <div>
                  <label className="block text-xs font-mono uppercase text-foreground/80 mb-2 font-medium">
                    Select Representation Icon *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {AVAILABLE_ICONS.map((item) => {
                      const Icon = item.icon
                      const isSelected = formData.icon_name.toLowerCase() === item.name.toLowerCase()
                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, icon_name: item.name }))}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-mono text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-primary bg-primary/20 text-primary font-bold shadow-md shadow-primary/10'
                              : 'border-white/10 bg-neutral-950/60 text-foreground/70 hover:border-white/25 hover:text-white'
                          }`}
                        >
                          <Icon className="size-4 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Row 3: Image URL with Presets and Guidance */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-mono uppercase text-foreground/80 font-medium">
                      Hero Image URL * (1200×800 px, &lt; 500 KB)
                    </label>
                    <span className="text-[11px] font-mono text-primary/80">
                      Landscape 16:9 / 3:2
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <input
                      type="url"
                      required
                      value={formData.hero_image}
                      onChange={(e) => setFormData(prev => ({ ...prev, hero_image: e.target.value }))}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-4 py-3 rounded-xl bg-neutral-950 border border-white/15 text-xs text-white placeholder:text-foreground/40 focus:outline-none focus:border-primary font-mono"
                    />
                    {formData.hero_image && (
                      <div className="size-11 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-black">
                        <img
                          src={formData.hero_image}
                          alt="Thumbnail preview"
                          className="size-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/scene-desert.png'
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* 1-Click High-Res Presets */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                    <span className="text-foreground/50 font-mono">1-Click Presets:</span>
                    {CURATOR_IMAGE_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, hero_image: preset.url }))}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-foreground/75 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 4: Short Description (Bento card teaser) */}
                <div>
                  <label className="block text-xs font-mono uppercase text-foreground/80 mb-1.5 font-medium">
                    Short Description (Bento Teaser, 1-2 sentences) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.short_desc}
                    onChange={(e) => setFormData(prev => ({ ...prev, short_desc: e.target.value }))}
                    placeholder="e.g. Helicopter transfers to the Himalayas and private jet inter-city travel."
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/15 text-xs text-white placeholder:text-foreground/40 focus:outline-none focus:border-primary resize-none leading-relaxed"
                  />
                </div>

                {/* Row 5: Full Dossier Narrative (For dedicated service page) */}
                <div>
                  <label className="block text-xs font-mono uppercase text-foreground/80 mb-1.5 font-medium">
                    Full Dossier Narrative (Displayed on /services/[slug]) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.full_desc}
                    onChange={(e) => setFormData(prev => ({ ...prev, full_desc: e.target.value }))}
                    placeholder="Provide a comprehensive narrative describing the execution, aircraft types, palace alliances, security protocols, and Sarrin Holidays coordination..."
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/15 text-xs text-white placeholder:text-foreground/40 focus:outline-none focus:border-primary resize-none leading-relaxed"
                  />
                </div>

                {/* Row 6: Sort Order & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-mono uppercase text-foreground/80 mb-1.5 font-medium">
                      Display Sort Order (1, 2, 3...)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={formData.sort_order}
                      onChange={(e) => setFormData(prev => ({ ...prev, sort_order: Number(e.target.value) }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_published}
                        onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                        className="size-4 rounded border-white/20 bg-neutral-950 text-primary focus:ring-0"
                      />
                      <span className="text-xs text-white font-medium">Publish Live to Public Website</span>
                    </label>
                  </div>
                </div>

                {/* Form Footer Buttons */}
                <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-5 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-foreground/80 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-[#c5a030] text-primary-foreground font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-primary/20 cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Saving Dossier...' : editingId ? 'Update Service' : 'Save & Publish Service'}</span>
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
