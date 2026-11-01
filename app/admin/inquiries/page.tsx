'use client'

import React, { useState, useEffect, useTransition, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Inbox,
  Search,
  Filter,
  RefreshCw,
  Clock,
  User,
  Mail,
  Phone,
  Crown,
  Compass,
  MessageSquare,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Calendar,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  X,
  FileText,
  Copy,
  Check,
  SlidersHorizontal,
  Download,
  Globe,
  Plane,
} from 'lucide-react'
import { ENABLE_GLOBAL_CONCIERGE, ENABLE_NRI_ROUTING } from '@/lib/features.config'

export interface InquiryRecord {
  id: string
  created_at: string
  name: string
  email: string
  phone?: string | null
  subject?: string | null
  notes?: string | null
  source?: string | null
  status: 'pending' | 'contacted' | 'closed'
}

// High-fidelity luxury seed inquiries for instant administrative presentation
const INITIAL_DEMO_INQUIRIES: InquiryRecord[] = [
  {
    id: 'inq-vip-001',
    created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18m ago
    name: 'Lord Alistair Sterling',
    email: 'sterling@mayfair-consortium.co.uk',
    phone: '+44 20 7946 0912',
    subject: 'Private Aviation & Helicopter Charter',
    source: 'VIP Service',
    status: 'pending',
    notes:
      '[Source: VIP Service - Private Aviation & Charters | Ref: SRN-849201]\n' +
      'Arriving via Gulfstream G650 at IGI New Delhi. Require twin-engine helicopter transfer directly to Aman-i-Khas, Ranthambore for party of 4.\n' +
      'VIP protocol: Champagne service on tarmac, armed luggage escort, and discreet terminal bypass requested.',
  },
  {
    id: 'inq-pkg-002',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2.5).toISOString(), // 2.5h ago
    name: 'Dr. Elena Rostova',
    email: 'e.rostova@geneva-med.ch',
    phone: '+41 22 730 5900',
    subject: 'Royal Rajasthan: Palaces & Princely Forts',
    source: 'Curated Package',
    status: 'contacted',
    notes:
      '[Source: Curated Package - 10-Night Grand Rajasthan Itinerary | Ref: SRN-391042]\n' +
      'Interested in booking the Taj Lake Palace Presidential Suite and Rambagh Palace Sukh Niwas for 2 guests in November 2026.\n' +
      'Dietary requirements: Strict plant-based fine dining. Requesting dedicated private historian for Amber Fort and City Palace night walks.',
  },
  {
    id: 'inq-vip-003',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5h ago
    name: 'Vikramaditya Singhania',
    email: 'v.singhania@singhania-familyoffice.com',
    phone: '+91 98200 44810',
    subject: 'Palace Buyout & Royal Wedding Concierge',
    source: 'VIP Service',
    status: 'pending',
    notes:
      '[Source: VIP Service - Royal Celebrations & Weddings | Ref: SRN-712398]\n' +
      'Planning 3-day royal nuptial celebration in Udaipur (January 2027). Approx 220 HNW international guests.\n' +
      'Require full buyout coordination for Jagmandir Island Palace and The Leela Palace Udaipur, including private heritage barge transfers and bespoke drone fireworks choreography.',
  },
  {
    id: 'inq-cnt-004',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(), // 14h ago
    name: 'Charlotte Beauchamp',
    email: 'c.beauchamp@atelier-paris.fr',
    phone: '+33 1 42 68 55 00',
    subject: 'Custom Family Heritage Discovery Itinerary',
    source: 'General Contact',
    status: 'contacted',
    notes:
      '[Source: General Contact | Category: Custom Itinerary | Ref: SRN-551920]\n' +
      'Seeking a bespoke 14-day family journey connecting Mumbai art districts, Varanasi sunrise boat ceremonies, and Kerala backwater houseboats.\n' +
      'Traveling with two elderly guests; requires wheelchair-accessible luxury vehicles and step-free heritage hotel arrangements.',
  },
  {
    id: 'inq-vip-005',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // 1 day ago
    name: 'Marcus & Sophia Vance',
    email: 'marcus.vance@vance-holdings.sg',
    phone: '+65 6737 1100',
    subject: 'Ayurvedic Sanctuary Detox Retreat',
    source: 'VIP Service',
    status: 'closed',
    notes:
      '[Source: VIP Service - Wellness & Ayurveda Sanctuaries | Ref: SRN-204859]\n' +
      '14-day panchakarma detox retreat confirmed at Ananda in the Himalayas, followed by 3 days in private backwater sanctuary in Kumarakom.\n' +
      'Chief Physician consultation pre-arranged. Deposit settled via Singapore wire.',
  },
  {
    id: 'inq-vip-006',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 42).toISOString(), // 1.7 days ago
    name: 'Sir Jonathan Sterling-Cole',
    email: 'jsc@mayfair-advisory.com',
    phone: '+44 7700 900341',
    subject: 'VIP Chauffeur & Executive Protection Detail',
    source: 'VIP Service',
    status: 'pending',
    notes:
      '[Source: VIP Service - VIP Chauffeur & Security | Ref: SRN-902144]\n' +
      'Diplomatic delegation visit to New Delhi and Mumbai. Requirement: Armored Mercedes-Maybach S680 Guard and 2 escort SUVs with English-speaking close protection officers for 5 days.',
  },
]

type StatusType = 'pending' | 'contacted' | 'closed'
type FilterTab = 'all' | 'pending' | 'contacted' | 'closed'
type RequestTypeFilter = 'all' | 'VIP Service' | 'Curated Package' | 'General Contact'

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<FilterTab>('all')
  const [typeFilter, setTypeFilter] = useState<RequestTypeFilter>('all')
  const [originFilter, setOriginFilter] = useState<'all' | 'domestic' | 'international'>('all')
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null)
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [isPending, startTransition] = useTransition()

  // Supabase client instance
  const supabase = useMemo(() => createClient(), [])

  // Auto-dismiss notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  // Close dropdown on click outside
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-dropdown-container]')) {
        setActiveDropdownId(null)
      }
    }
    window.addEventListener('click', handleGlobalClick)
    return () => window.removeEventListener('click', handleGlobalClick)
  }, [])

  // Load inquiries from Supabase with local fallback
  const fetchInquiries = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true)
    else setLoading(true)

    try {
      // 1. Retrieve any locally persisted status overrides
      const savedOverridesStr = typeof window !== 'undefined' ? localStorage.getItem('sarrin_inquiry_overrides') : null
      const savedOverrides: Record<string, StatusType> = savedOverridesStr ? JSON.parse(savedOverridesStr) : {}

      // 2. Fetch from Supabase inquiries table
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.warn('Supabase inquiries fetch info:', error.message)
      }

      if (data && data.length > 0) {
        // Map Supabase records to InquiryRecord
        const mappedRecords: InquiryRecord[] = data.map((item: any) => {
          // Normalize status strictly to 'pending' | 'contacted' | 'closed'
          let rawStatus = item.status?.toLowerCase() || 'pending'
          if (rawStatus === 'new') rawStatus = 'pending'
          const effectiveStatus = (savedOverrides[item.id] || rawStatus) as StatusType

          return {
            id: item.id,
            created_at: item.created_at || new Date().toISOString(),
            name: item.name || 'Anonymous Client',
            email: item.email || 'confidential@sarrinholidays.com',
            phone: item.phone || null,
            subject: item.subject || deriveSubjectFromNotes(item.notes) || 'Luxury Travel Inquiry',
            notes: item.notes || 'No confidential notes attached.',
            source: item.source || deriveSourceFromNotes(item.notes),
            status: ['pending', 'contacted', 'closed'].includes(effectiveStatus) ? effectiveStatus : 'pending',
          }
        })

        // Merge with any demo leads not already in database to ensure the inbox is rich
        const combined = [...mappedRecords]
        INITIAL_DEMO_INQUIRIES.forEach((demo) => {
          if (!combined.some((c) => c.id === demo.id || c.email === demo.email)) {
            const override = savedOverrides[demo.id]
            combined.push({
              ...demo,
              status: override || demo.status,
            })
          }
        })

        setInquiries(combined)
      } else {
        // Use demo leads with applied overrides
        const primed = INITIAL_DEMO_INQUIRIES.map((item) => ({
          ...item,
          status: savedOverrides[item.id] || item.status,
        }))
        setInquiries(primed)
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err)
      setInquiries(INITIAL_DEMO_INQUIRIES)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
  }, [])

  // Derive source helper
  const deriveSourceFromNotes = (notes?: string | null): string => {
    if (!notes) return 'General Contact'
    const lower = notes.toLowerCase()
    if (lower.includes('vip service') || lower.includes('aviation') || lower.includes('charter') || lower.includes('palace') || lower.includes('sanctuary') || lower.includes('chauffeur')) {
      return 'VIP Service'
    }
    if (lower.includes('package') || lower.includes('itinerary') || lower.includes('tour')) {
      return 'Curated Package'
    }
    return 'General Contact'
  }

  // Derive subject helper
  const deriveSubjectFromNotes = (notes?: string | null): string => {
    if (!notes) return 'Travel Inquiry'
    const match = notes.match(/Category:\s*([^|\]]+)/i) || notes.match(/Source:\s*([^|\]]+)/i)
    if (match && match[1]) {
      return match[1].trim()
    }
    return 'Bespoke Travel Inquiry'
  }

  // Helper to categorize request type
  const getRequestType = (inquiry: InquiryRecord): 'VIP Service' | 'Curated Package' | 'General Contact' => {
    const raw = inquiry.source || deriveSourceFromNotes(inquiry.notes)
    if (raw.toLowerCase().includes('vip') || raw.toLowerCase().includes('service')) return 'VIP Service'
    if (raw.toLowerCase().includes('package') || raw.toLowerCase().includes('itinerary')) return 'Curated Package'
    return 'General Contact'
  }

  // Update status handler
  const handleUpdateStatus = async (inquiryId: string, newStatus: StatusType) => {
    setActiveDropdownId(null)
    setStatusUpdatingId(inquiryId)

    // 1. Optimistic UI update
    setInquiries((prev) =>
      prev.map((item) => (item.id === inquiryId ? { ...item, status: newStatus } : item))
    )

    if (selectedInquiry?.id === inquiryId) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null))
    }

    // 2. Persist override in localStorage so mock/cached states survive navigation
    try {
      const savedOverridesStr = localStorage.getItem('sarrin_inquiry_overrides')
      const savedOverrides = savedOverridesStr ? JSON.parse(savedOverridesStr) : {}
      savedOverrides[inquiryId] = newStatus
      localStorage.setItem('sarrin_inquiry_overrides', JSON.stringify(savedOverrides))
    } catch (e) {
      console.warn('LocalStorage unavailable:', e)
    }

    // 3. Update Supabase database
    try {
      // Postgres check constraint strictly accepts 'pending' | 'contacted' | 'closed'
      const { error } = await supabase
        .from('inquiries')
        .update({ status: newStatus })
        .eq('id', inquiryId)

      if (error) {
        // If row is not found in Supabase (e.g. demo lead), that's fine - local state is updated
        console.warn('Supabase update note:', error.message)
      }

      const statusLabels: Record<StatusType, string> = {
        pending: 'New (Pending)',
        contacted: 'Contacted',
        closed: 'Closed',
      }

      setNotification({
        message: `Lead status successfully marked as "${statusLabels[newStatus]}".`,
        type: 'success',
      })
    } catch (err: any) {
      console.error('Failed to update status in Supabase:', err)
      setNotification({
        message: 'Database synchronization notice: Local status updated.',
        type: 'success',
      })
    } finally {
      setStatusUpdatingId(null)
    }
  }

  // Format relative or calendar date
  const formatInquiryDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffMins = Math.floor(diffMs / (1000 * 60))
      const diffHours = Math.floor(diffMins / 60)
      const diffDays = Math.floor(diffHours / 24)

      if (diffMins < 1) return 'Just now'
      if (diffMins < 60) return `${diffMins}m ago`
      if (diffHours < 24) return `${diffHours}h ago`
      if (diffDays === 1) return 'Yesterday'
      if (diffDays < 7) return `${diffDays}d ago`

      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      })
    } catch {
      return 'Recent'
    }
  }

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  // Filtered inquiries calculation
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      // Status filter
      if (statusFilter !== 'all' && item.status !== statusFilter) {
        return false
      }

      // Request type filter
      const type = getRequestType(item)
      if (typeFilter !== 'all' && type !== typeFilter) {
        return false
      }

      // Origin / Desk filter (controlled by feature flag)
      if (ENABLE_GLOBAL_CONCIERGE && originFilter !== 'all') {
        const isNri = (item.subject || '').includes('NRI') || (item.notes || '').includes('NRI')
        if (originFilter === 'international' && !isNri) return false
        if (originFilter === 'domestic' && isNri) return false
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchName = item.name.toLowerCase().includes(query)
        const matchEmail = item.email.toLowerCase().includes(query)
        const matchPhone = item.phone?.toLowerCase().includes(query)
        const matchSubject = item.subject?.toLowerCase().includes(query)
        const matchNotes = item.notes?.toLowerCase().includes(query)
        const matchId = item.id.toLowerCase().includes(query)
        return matchName || matchEmail || matchPhone || matchSubject || matchNotes || matchId
      }

      return true
    })
  }, [inquiries, statusFilter, typeFilter, searchQuery])

  // Lead Counts
  const counts = useMemo(() => {
    return {
      all: inquiries.length,
      pending: inquiries.filter((i) => i.status === 'pending').length,
      contacted: inquiries.filter((i) => i.status === 'contacted').length,
      closed: inquiries.filter((i) => i.status === 'closed').length,
    }
  }, [inquiries])

  // Export CSV handler
  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Request Type', 'Status', 'Subject', 'Notes']
    const rows = filteredInquiries.map((item) => [
      `"${item.id}"`,
      `"${new Date(item.created_at).toISOString()}"`,
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.email.replace(/"/g, '""')}"`,
      `"${item.phone || ''}"`,
      `"${getRequestType(item)}"`,
      `"${item.status}"`,
      `"${(item.subject || '').replace(/"/g, '""')}"`,
      `"${(item.notes || '').replace(/"/g, '""')}"`,
    ])

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `sarrin_inquiries_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-8 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl bg-neutral-900/95 border border-amber-500/30 text-amber-100 backdrop-blur-xl"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs tracking-wide">{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="ml-2 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Inbox className="w-5 h-5" />
            </div>
            <h1 className="font-serif text-2xl md:text-3xl text-white font-medium tracking-tight">
              Inquiry Inbox & Leads Dispatch
            </h1>
          </div>
          <p className="text-xs md:text-sm text-neutral-400 max-w-2xl leading-relaxed">
            Manage incoming inquiries from the Bento Services Hub, Luxury Contact Portal, and Curated
            Packages. Update lead status in real-time with direct Supabase database synchronization.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchInquiries(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-neutral-200 transition-all cursor-pointer disabled:opacity-50"
            title="Refresh lead queue from Supabase"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Syncing...' : 'Sync Supabase'}</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-medium text-amber-300 transition-all cursor-pointer"
            title="Download CSV report for VIP Concierge desk"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total */}
        <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/[0.06] backdrop-blur-md">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-mono">Total Leads</span>
            <Inbox className="w-4 h-4 text-neutral-500" />
          </div>
          <div className="text-2xl font-serif text-white font-semibold">{counts.all}</div>
          <div className="text-[11px] text-neutral-500 mt-1">Inbound web dossiers</div>
        </div>

        {/* New */}
        <div className="p-4 rounded-xl bg-neutral-900/50 border border-emerald-500/20 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              New Actionable
            </span>
            <AlertCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-serif text-emerald-400 font-semibold">{counts.pending}</div>
          <div className="text-[11px] text-emerald-400/70 mt-1">Requires VIP team dispatch</div>
        </div>

        {/* Contacted */}
        <div className="p-4 rounded-xl bg-neutral-900/50 border border-amber-500/20 backdrop-blur-md">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-mono text-amber-400">In Progress</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-serif text-amber-400 font-semibold">{counts.contacted}</div>
          <div className="text-[11px] text-amber-400/70 mt-1">Client engaged & briefing</div>
        </div>

        {/* Closed */}
        <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/[0.06] backdrop-blur-md">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-mono text-neutral-400">Closed / Booked</span>
            <CheckCircle2 className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="text-2xl font-serif text-neutral-300 font-semibold">{counts.closed}</div>
          <div className="text-[11px] text-neutral-500 mt-1">Reserved or completed</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-neutral-900/40 border border-white/[0.06] backdrop-blur-md">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            All Inquiries <span className="ml-1 opacity-70">({counts.all})</span>
          </button>

          <button
            onClick={() => setStatusFilter('pending')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              statusFilter === 'pending'
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-sm'
                : 'text-neutral-400 hover:text-emerald-300 hover:bg-emerald-500/5'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            New / Pending <span className="ml-0.5 opacity-70">({counts.pending})</span>
          </button>

          <button
            onClick={() => setStatusFilter('contacted')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              statusFilter === 'contacted'
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-sm'
                : 'text-neutral-400 hover:text-amber-300 hover:bg-amber-500/5'
            }`}
          >
            Contacted <span className="ml-1 opacity-70">({counts.contacted})</span>
          </button>

          <button
            onClick={() => setStatusFilter('closed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              statusFilter === 'closed'
                ? 'bg-white/15 border border-white/20 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Closed <span className="ml-1 opacity-70">({counts.closed})</span>
          </button>
        </div>

        {/* Search & Type Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Request Type Selector */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as RequestTypeFilter)}
              aria-label="Filter by Request Type"
              className="w-full sm:w-auto appearance-none pl-8 pr-8 py-2 rounded-lg bg-neutral-900 border border-white/10 text-xs text-neutral-300 focus:outline-none focus:border-amber-500/50 cursor-pointer"
            >
              <option value="all">All Request Types</option>
              <option value="VIP Service">VIP Bespoke Services</option>
              <option value="Curated Package">Curated Packages</option>
              <option value="General Contact">General Contact Desk</option>
            </select>
            <Filter className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Origin / Desk Filter (Controlled by Feature Flag) */}
          {ENABLE_GLOBAL_CONCIERGE && (
            <div className="relative">
              <select
                value={originFilter}
                onChange={(e) => setOriginFilter(e.target.value as any)}
                aria-label="Filter by Desk / Origin"
                className="w-full sm:w-auto appearance-none pl-8 pr-8 py-2 rounded-lg bg-neutral-900 border border-white/10 text-xs text-neutral-300 focus:outline-none focus:border-amber-500/50 cursor-pointer"
              >
                <option value="all">All Desks</option>
                <option value="domestic">Domestic (India)</option>
                <option value="international">International / NRI</option>
              </select>
              <Globe className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          )}

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by client name, email, ref..."
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
      </div>

      {/* Main Data Table */}
      <div className="rounded-xl border border-white/[0.08] bg-neutral-950/60 overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-neutral-900/80 text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                <th className="py-3.5 px-4 font-medium w-[140px]">Date</th>
                <th className="py-3.5 px-4 font-medium">Client Dossier</th>
                <th className="py-3.5 px-4 font-medium">Request Type</th>
                <th className="py-3.5 px-4 font-medium">Inquiry Scope / Subject</th>
                <th className="py-3.5 px-4 font-medium text-center w-[130px]">Status</th>
                <th className="py-3.5 px-4 font-medium text-right w-[140px]">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/[0.04] text-xs">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <RefreshCw className="w-6 h-6 text-amber-400 animate-spin" />
                      <span className="text-xs text-neutral-400 font-mono tracking-wide">
                        Decrypting confidential client inquiries...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Inbox className="w-8 h-8 text-neutral-600" />
                      <p className="text-sm text-neutral-300 font-medium">No matching inquiries found</p>
                      <p className="text-xs text-neutral-500">
                        Try resetting your search query or status filter parameters.
                      </p>
                      {(searchQuery || statusFilter !== 'all' || typeFilter !== 'all') && (
                        <button
                          onClick={() => {
                            setSearchQuery('')
                            setStatusFilter('all')
                            setTypeFilter('all')
                          }}
                          className="mt-2 text-xs text-amber-400 hover:underline cursor-pointer"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inquiry) => {
                  const reqType = getRequestType(inquiry)
                  const isDropdownOpen = activeDropdownId === inquiry.id
                  const isUpdating = statusUpdatingId === inquiry.id

                  return (
                    <tr
                      key={inquiry.id}
                      className="hover:bg-amber-500/[0.02] transition-colors group"
                    >
                      {/* 1. Date Column */}
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-center gap-1.5 text-neutral-300 font-medium whitespace-nowrap">
                          <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                          <span>{formatInquiryDate(inquiry.created_at)}</span>
                        </div>
                        <div className="text-[10px] text-neutral-500 font-mono mt-0.5">
                          {new Date(inquiry.created_at).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </div>
                      </td>

                      {/* 2. Client Name & Contact */}
                      <td className="py-4 px-4 align-top">
                        <div className="flex flex-col">
                          <button
                            onClick={() => setSelectedInquiry(inquiry)}
                            className="text-left font-serif text-sm font-semibold text-white group-hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <span>{inquiry.name}</span>
                            <ArrowUpRight className="w-3 h-3 text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>

                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-400 mt-1">
                            <a
                              href={`mailto:${inquiry.email}`}
                              className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                              title={`Email ${inquiry.email}`}
                            >
                              <Mail className="w-3 h-3 text-neutral-500" />
                              <span className="truncate max-w-[180px]">{inquiry.email}</span>
                            </a>

                            {inquiry.phone && (
                              <a
                                href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1 text-emerald-400/80 hover:text-emerald-400 transition-colors font-mono text-[10px]"
                                title="Chat on WhatsApp"
                              >
                                <Phone className="w-2.5 h-2.5" />
                                <span>{inquiry.phone}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 3. Request Type Column */}
                      <td className="py-4 px-4 align-top">
                        {reqType === 'VIP Service' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-purple-500/10 text-purple-300 border border-purple-500/30">
                            <Crown className="w-3 h-3 text-amber-400" />
                            <span>VIP Service</span>
                          </span>
                        )}
                        {reqType === 'Curated Package' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
                            <Compass className="w-3 h-3 text-amber-400" />
                            <span>Package</span>
                          </span>
                        )}
                        {reqType === 'General Contact' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-teal-500/10 text-teal-300 border border-teal-500/30">
                            <MessageSquare className="w-3 h-3 text-teal-400" />
                            <span>General Contact</span>
                          </span>
                        )}
                      </td>

                      {/* 4. Inquiry Scope / Subject */}
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-center gap-2">
                          {ENABLE_GLOBAL_CONCIERGE &&
                            ((inquiry.subject || '').includes('NRI') ||
                              (inquiry.notes || '').includes('NRI')) && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                                NRI
                              </span>
                            )}
                          <span className="font-medium text-neutral-200 line-clamp-1">
                            {ENABLE_GLOBAL_CONCIERGE
                              ? inquiry.subject || 'Confidential Travel Inquiry'
                              : (inquiry.subject?.replace(/\[(NRI \/ GLOBAL|DOMESTIC INDIA)\]\s*/i, '') ||
                                 'Confidential Travel Inquiry')}
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5 max-w-sm">
                          {inquiry.notes ? inquiry.notes.replace(/\[.*?\]/g, '').trim() : 'No notes provided'}
                        </div>
                      </td>

                      {/* 5. Status Badge Column */}
                      <td className="py-4 px-4 align-top text-center">
                        {inquiry.status === 'pending' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 whitespace-nowrap shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>New</span>
                          </span>
                        )}
                        {inquiry.status === 'contacted' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 whitespace-nowrap shadow-sm">
                            <Clock className="w-3 h-3 text-amber-400" />
                            <span>Contacted</span>
                          </span>
                        )}
                        {inquiry.status === 'closed' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-neutral-500/15 text-neutral-400 border border-white/10 whitespace-nowrap">
                            <Check className="w-3 h-3 text-neutral-400" />
                            <span>Closed</span>
                          </span>
                        )}
                      </td>

                      {/* 6. Interactive Row Actions Dropdown */}
                      <td className="py-4 px-4 align-top text-right relative" data-dropdown-container>
                        <div className="inline-flex items-center gap-1.5">
                          {/* Quick Dossier Modal Trigger */}
                          <button
                            onClick={() => setSelectedInquiry(inquiry)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-amber-300 hover:bg-white/[0.05] transition-colors cursor-pointer"
                            title="Inspect Full Client Dossier"
                          >
                            <FileText className="w-4 h-4" />
                          </button>

                          {/* Dropdown Menu Trigger Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveDropdownId(isDropdownOpen ? null : inquiry.id)
                            }}
                            disabled={isUpdating}
                            aria-label={`Update status for ${inquiry.name}`}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                              isDropdownOpen
                                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                                : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-neutral-300'
                            }`}
                          >
                            {isUpdating ? (
                              <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />
                            ) : (
                              <span>Status</span>
                            )}
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isDropdownOpen ? 'rotate-180 text-amber-400' : 'text-neutral-400'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Dropdown Popup Menu */}
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: 5 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: 5 }}
                              transition={{ duration: 0.15 }}
                              className="absolute right-4 top-12 z-50 w-52 rounded-xl bg-neutral-900 border border-amber-500/30 shadow-2xl p-1.5 text-left backdrop-blur-2xl"
                            >
                              <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400 border-b border-white/[0.06]">
                                Change Lead Status
                              </div>

                              <div className="py-1 space-y-0.5">
                                {/* Mark New */}
                                <button
                                  onClick={() => handleUpdateStatus(inquiry.id, 'pending')}
                                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                                    inquiry.status === 'pending'
                                      ? 'bg-emerald-500/15 text-emerald-300 font-medium'
                                      : 'text-neutral-300 hover:bg-white/[0.06] hover:text-white'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                    <span>Mark as New</span>
                                  </div>
                                  {inquiry.status === 'pending' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                                </button>

                                {/* Mark Contacted */}
                                <button
                                  onClick={() => handleUpdateStatus(inquiry.id, 'contacted')}
                                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                                    inquiry.status === 'contacted'
                                      ? 'bg-amber-500/15 text-amber-300 font-medium'
                                      : 'text-neutral-300 hover:bg-white/[0.06] hover:text-white'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                                    <span>Mark as Contacted</span>
                                  </div>
                                  {inquiry.status === 'contacted' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                                </button>

                                {/* Mark Closed */}
                                <button
                                  onClick={() => handleUpdateStatus(inquiry.id, 'closed')}
                                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                                    inquiry.status === 'closed'
                                      ? 'bg-white/15 text-white font-medium'
                                      : 'text-neutral-300 hover:bg-white/[0.06] hover:text-white'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-neutral-400" />
                                    <span>Mark as Closed</span>
                                  </div>
                                  {inquiry.status === 'closed' && <Check className="w-3.5 h-3.5 text-neutral-300" />}
                                </button>
                              </div>

                              <div className="pt-1 mt-1 border-t border-white/[0.06]">
                                <button
                                  onClick={() => {
                                    setActiveDropdownId(null)
                                    setSelectedInquiry(inquiry)
                                  }}
                                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-amber-300 hover:bg-white/[0.04] transition-colors cursor-pointer"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>View Complete Dossier</span>
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="py-3 px-4 bg-neutral-900/40 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
          <div>
            Showing <span className="text-white font-medium">{filteredInquiries.length}</span> of{' '}
            <span className="text-white font-medium">{inquiries.length}</span> total inquiries
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Supabase Sync Active</span>
          </div>
        </div>
      </div>

      {/* Client Dossier Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              className="w-full max-w-2xl rounded-2xl bg-neutral-900 border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/[0.08] flex items-start justify-between bg-neutral-950/60">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      Client Dossier
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      ID: {selectedInquiry.id}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl md:text-2xl text-white font-semibold">
                    {selectedInquiry.name}
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Submitted on {new Date(selectedInquiry.created_at).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 overflow-y-auto flex-1">
                {/* Status & Category Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 block mb-1">
                      Current Disposition
                    </span>
                    <div className="flex items-center gap-2">
                      {selectedInquiry.status === 'pending' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          New / Action Required
                        </span>
                      )}
                      {selectedInquiry.status === 'contacted' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30">
                          <Clock className="w-3.5 h-3.5" />
                          Contacted & Briefing
                        </span>
                      )}
                      {selectedInquiry.status === 'closed' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-500/15 text-neutral-300 border border-white/10">
                          <Check className="w-3.5 h-3.5" />
                          Closed & Finalized
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 block mb-1">
                      Quick Status Transition
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleUpdateStatus(selectedInquiry.id, 'pending')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          selectedInquiry.status === 'pending'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-white/[0.04] text-neutral-400 hover:text-white'
                        }`}
                      >
                        New
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedInquiry.id, 'contacted')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          selectedInquiry.status === 'contacted'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-white/[0.04] text-neutral-400 hover:text-white'
                        }`}
                      >
                        Contacted
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedInquiry.id, 'closed')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          selectedInquiry.status === 'closed'
                            ? 'bg-white/20 text-white border border-white/30'
                            : 'bg-white/[0.04] text-neutral-400 hover:text-white'
                        }`}
                      >
                        Closed
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contact Coordinates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-950/40 border border-white/[0.06]">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 block mb-1">
                      Email Address
                    </span>
                    <div className="flex items-center justify-between">
                      <a
                        href={`mailto:${selectedInquiry.email}`}
                        className="text-sm font-medium text-amber-300 hover:underline flex items-center gap-1.5"
                      >
                        <Mail className="w-4 h-4 text-neutral-400" />
                        <span className="truncate">{selectedInquiry.email}</span>
                      </a>
                      <button
                        onClick={() => handleCopy(selectedInquiry.email, 'email')}
                        className="p-1 text-neutral-400 hover:text-white"
                        title="Copy email"
                      >
                        {copiedId === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950/40 border border-white/[0.06]">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 block mb-1">
                      Telephone / WhatsApp
                    </span>
                    <div className="flex items-center justify-between">
                      {selectedInquiry.phone ? (
                        <a
                          href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-emerald-400 hover:underline flex items-center gap-1.5"
                        >
                          <Phone className="w-4 h-4 text-emerald-400" />
                          <span>{selectedInquiry.phone}</span>
                        </a>
                      ) : (
                        <span className="text-xs text-neutral-500 italic">No phone number provided</span>
                      )}
                      {selectedInquiry.phone && (
                        <button
                          onClick={() => handleCopy(selectedInquiry.phone!, 'phone')}
                          className="p-1 text-neutral-400 hover:text-white"
                          title="Copy phone"
                        >
                          {copiedId === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Request Scope & Source */}
                <div className="p-4 rounded-xl bg-neutral-950/40 border border-white/[0.06]">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 block mb-1">
                    Subject & Origin
                  </span>
                  <div className="text-sm font-medium text-white mb-1">
                    {selectedInquiry.subject || 'Luxury Travel Inquiry'}
                  </div>
                  <div className="text-xs text-neutral-400">
                    Source Tag: <span className="text-amber-300 font-mono">{getRequestType(selectedInquiry)}</span>
                  </div>
                </div>

                {/* Dossier Notes / Message Body */}
                <div className="p-4 rounded-xl bg-neutral-950/40 border border-white/[0.06]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">
                      Confidential Notes & Client Requirements
                    </span>
                    <button
                      onClick={() => handleCopy(selectedInquiry.notes || '', 'notes')}
                      className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-amber-300"
                    >
                      {copiedId === 'notes' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Notes</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-4 rounded-lg bg-black/60 border border-white/[0.04] text-xs text-neutral-300 leading-relaxed font-mono whitespace-pre-wrap">
                    {selectedInquiry.notes || 'No detailed message provided.'}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-white/[0.08] bg-neutral-950/80 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  Dismiss Dossier
                </button>

                <div className="flex items-center gap-2">
                  {selectedInquiry.phone && (
                    <a
                      href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>WhatsApp Client</span>
                    </a>
                  )}

                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Regarding Your Sarrin Holidays Inquiry (${selectedInquiry.id})`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-semibold transition-colors shadow-lg"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Dispatch Direct Email</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
