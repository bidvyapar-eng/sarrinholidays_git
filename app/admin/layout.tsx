'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Inbox,
  Package,
  Compass,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Clock,
  User,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'
import { adminLogout } from './login/actions'

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    id: 'inquiries',
    label: 'Inquiries',
    href: '/admin/inquiries',
    icon: Inbox,
    badge: 'Live Leads',
  },
  {
    id: 'packages',
    label: 'Packages',
    href: '/admin/packages',
    icon: Package,
  },
  {
    id: 'services',
    label: 'Services',
    href: '/admin/services',
    icon: Compass,
  },
]

function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const moduleParam = searchParams.get('module')

  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  // IST Clock in header
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const istString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      setCurrentTime(istString)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Exclude administrative shell layout on login page
  if (pathname?.startsWith('/admin/login')) {
    return <>{children}</>
  }

  const isNavActive = (item: NavItem) => {
    if (item.id === 'inquiries') {
      return pathname?.startsWith('/admin/inquiries')
    }
    if (item.id === 'packages') {
      return pathname?.startsWith('/admin/packages') || (pathname === '/admin' && moduleParam === 'packages')
    }
    if (item.id === 'services') {
      return pathname?.startsWith('/admin/services') || (pathname === '/admin' && moduleParam === 'services')
    }
    if (item.id === 'overview') {
      return pathname === '/admin' && (!moduleParam || moduleParam === 'overview')
    }
    return false
  }

  return (
    <div className="relative min-h-screen w-full bg-[#0C0B09] text-foreground flex overflow-x-hidden selection:bg-[#C5A059]/30 selection:text-[#C5A059]">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-10 left-10 size-80 rounded-full bg-[#C5A059]/5 blur-[120px]" />
        <div className="absolute bottom-10 right-10 size-80 rounded-full bg-amber-600/5 blur-[120px]" />
      </div>

      {/* ===================================================================== */}
      {/* 1. DESKTOP COLLAPSIBLE SIDEBAR */}
      {/* ===================================================================== */}
      <aside
        className={`hidden md:flex flex-col justify-between border-r border-white/10 bg-[#141310] backdrop-blur-2xl transition-all duration-300 relative z-20 shrink-0 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Top Branding & Collapse Button */}
        <div>
          <div className="flex h-20 items-center justify-between px-4 border-b border-white/10">
            {!collapsed && (
              <Link href="/admin" className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl border border-primary/40 bg-primary/20 text-primary shadow-lg shadow-primary/20">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <span className="block font-sans text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                    Sarrin
                  </span>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
                    Command Shell
                  </span>
                </div>
              </Link>
            )}

            {collapsed && (
              <div className="mx-auto flex size-10 items-center justify-center rounded-xl border border-primary/40 bg-primary/20 text-primary shadow-lg">
                <ShieldCheck className="size-5" />
              </div>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              className="hidden md:flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-foreground/60 hover:bg-white/10 hover:text-foreground transition-colors"
            >
              {collapsed ? (
                <PanelLeftOpen className="size-4" />
              ) : (
                <PanelLeftClose className="size-4" />
              )}
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="p-3 space-y-1.5 mt-2">
            {NAV_ITEMS.map((item) => {
              const active = isNavActive(item)
              const Icon = item.icon
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`group flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-xs font-medium transition-all duration-200 ${
                    active
                      ? 'border border-primary/40 bg-primary/15 text-primary shadow-lg shadow-primary/10'
                      : 'text-foreground/70 hover:bg-white/5 hover:text-foreground border border-transparent'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon
                    className={`size-4.5 shrink-0 transition-transform group-hover:scale-110 ${
                      active ? 'text-primary' : 'text-foreground/60'
                    }`}
                  />
                  {!collapsed && (
                    <div className="flex flex-1 items-center justify-between">
                      <span className="tracking-wider uppercase font-mono text-[11px]">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[9px] font-mono text-primary border border-primary/30">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Profile & Logout */}
        <div className="p-3 border-t border-white/10 bg-black/20">
          {!collapsed ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-2 py-1.5">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/30">
                  <User className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    Operations Director
                  </p>
                  <p className="text-[10px] font-mono text-foreground/50 truncate">
                    admin@sarrinholidays.com
                  </p>
                </div>
              </div>

              <form action={adminLogout}>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-foreground/75 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-colors"
                >
                  <LogOut className="size-3.5" />
                  <span>Log Out</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-2">
              <div
                title="admin@sarrinholidays.com"
                className="flex size-9 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/30"
              >
                <User className="size-4" />
              </div>
              <form action={adminLogout}>
                <button
                  type="submit"
                  title="Log Out"
                  className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-foreground/60 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-colors"
                >
                  <LogOut className="size-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </aside>

      {/* ===================================================================== */}
      {/* 2. MOBILE SLIDE-OVER DRAWER */}
      {/* ===================================================================== */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-72 max-w-[85vw] bg-slate-900 border-r border-white/15 p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="size-5 text-primary" />
                    <span className="font-serif text-lg text-foreground">Sarrin Admin</span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1 rounded-lg text-foreground/70 hover:bg-white/10"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <nav className="mt-4 space-y-2">
                  {NAV_ITEMS.map((item) => {
                    const active = isNavActive(item)
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between rounded-xl p-3 text-xs font-medium ${
                          active
                            ? 'bg-primary/20 text-primary border border-primary/30'
                            : 'text-foreground/80 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="size-4" />
                          <span className="uppercase font-mono tracking-wider">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-mono text-primary">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-white/10">
                <form action={adminLogout}>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/5 p-3 text-xs text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut className="size-4" />
                    <span>Log Out</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===================================================================== */}
      {/* 3. MAIN CONTENT CONTAINER WITH TOP HEADER */}
      {/* ===================================================================== */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Admin Top Header */}
        <header className="h-16 border-b border-white/10 bg-slate-900/60 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between shrink-0 relative z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-foreground/70 hover:bg-white/10"
            >
              <Menu className="size-5" />
            </button>

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-foreground/40">Admin</span>
              <span className="text-foreground/20">/</span>
              <span className="text-primary font-medium uppercase tracking-wider">
                {pathname?.includes('/inquiries') ? 'Inquiries Inbox' : 'Control Center'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Live IST Clock */}
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-foreground/75">
              <Clock className="size-3.5 text-primary" />
              <span>IST {currentTime || 'Loading...'}</span>
            </div>

            {/* External Website Link */}
            <Link
              href="/"
              target="_blank"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground/80 hover:border-primary/40 hover:text-primary transition-colors"
            >
              <span>View Website</span>
              <ExternalLink className="size-3" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#070A0F]" />}>
      <AdminLayoutShell>{children}</AdminLayoutShell>
    </React.Suspense>
  )
}

