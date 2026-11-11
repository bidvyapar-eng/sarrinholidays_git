"use client"

import { useEffect, useState, useRef } from "react"
import { Menu, X, Globe, ChevronDown, Phone } from "lucide-react"
import { GlobalConciergeRouting } from "@/components/global-concierge-routing"
import { ENABLE_GLOBAL_CONCIERGE } from "@/lib/features.config"

const links = [
  { label: "Destinations", href: "/#destinations" },
  { label: "360° VR Tours", href: "/#virtual-tour" },
  { label: "Services", href: "/services" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Journal", href: "/blog" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
]

export function Navbar({ logoText }: { logoText?: string } = {}) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [conciergeOpen, setConciergeOpen] = useState(false)
  const conciergeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Click outside listener to close concierge dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        conciergeRef.current &&
        !conciergeRef.current.contains(event.target as Node)
      ) {
        setConciergeOpen(false)
      }
    }
    if (conciergeOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [conciergeOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 pl-5 transition-all duration-500 sm:px-6 ${
          scrolled
            ? "border-white/15 bg-slate-950/75 shadow-2xl shadow-black/40 backdrop-blur-md"
            : "border-white/10 bg-slate-950/50 shadow-lg shadow-black/20 backdrop-blur-md"
        }`}
      >
        <a
          href="/"
          aria-label="Sarrin Holidays home"
          className="group flex items-center gap-3 [perspective:700px]"
        >
          <span className="relative block size-11 shrink-0 transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(-10deg)_rotateX(5deg)_translateZ(4px)]">
            <span className="absolute inset-0 translate-x-1 translate-y-1 rounded-xl bg-primary/30 blur-[3px]" />
            <span className="absolute inset-0 translate-y-1 rounded-xl bg-primary/20 shadow-lg shadow-black/40 [transform:translateZ(-8px)]" />
            <span className="relative block size-full overflow-hidden rounded-xl border border-white/50 bg-foreground shadow-xl shadow-black/30 [transform:translateZ(8px)]">
              <img
                src="/sarrin-holidays-logo.png"
                alt="Sarrin Holidays logo"
                className="size-full object-cover"
              />
            </span>
          </span>
          <span className="hidden text-left sm:block">
            <span className="block font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-foreground">
              Sarrin
            </span>
            <span className="block text-[9px] font-medium uppercase tracking-[0.2em] text-primary">
              Holidays
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 xl:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-white/10 hover:text-foreground whitespace-nowrap"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 shrink-0">
          {/* Header Action: Global Concierge (if enabled) OR Domestic Concierge Hotline */}
          {ENABLE_GLOBAL_CONCIERGE ? (
            <button
              onClick={() => setConciergeOpen((v) => !v)}
              aria-expanded={conciergeOpen}
              aria-label="Toggle Global Concierge Routing"
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all backdrop-blur-md whitespace-nowrap shrink-0 ${
                conciergeOpen
                  ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
              }`}
            >
              <Globe className="size-3.5" />
              <span>Global Concierge</span>
              <ChevronDown
                className={`size-3 transition-transform duration-200 ${
                  conciergeOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          ) : (
            <a
              href="tel:+918419887730"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 px-3.5 py-1.5 text-xs font-semibold text-primary transition-all backdrop-blur-md whitespace-nowrap shrink-0"
              aria-label="Domestic Indian Concierge Desk"
            >
              <Phone className="size-3" />
              <span>+91 84198 87730</span>
            </a>
          )}

          <a
            href="/contact"
            className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95 whitespace-nowrap shrink-0 md:inline-flex"
          >
            Plan a trip
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-foreground transition-colors hover:bg-white/10 xl:hidden shrink-0"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* Global Concierge Desktop Popover Dropdown (Controlled by Flag) */}
      {ENABLE_GLOBAL_CONCIERGE && conciergeOpen && (
        <div
          ref={conciergeRef}
          className="mx-auto mt-2 max-w-2xl rounded-3xl border border-white/20 bg-slate-950/95 p-5 sm:p-6 backdrop-blur-2xl shadow-2xl shadow-black/90 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
        >
          <GlobalConciergeRouting
            variant="compact"
            onSelectDesk={() => setConciergeOpen(false)}
          />
        </div>
      )}

      {/* Mobile & Tablet Navigation Drawer */}
      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-white/15 bg-slate-950/95 p-4 backdrop-blur-2xl shadow-2xl xl:hidden space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col space-y-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-2.5 text-base font-medium text-foreground/90 transition-colors hover:bg-white/10 hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Concierge Section in Mobile Menu */}
          {ENABLE_GLOBAL_CONCIERGE ? (
            <div className="border-t border-white/10 pt-3 px-1">
              <GlobalConciergeRouting
                variant="compact"
                onSelectDesk={() => setOpen(false)}
              />
            </div>
          ) : (
            <div className="border-t border-white/10 pt-3 px-2 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Domestic Indian Concierge</span>
                <span className="text-emerald-400 font-semibold">24/7 Operations</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="tel:+918419887730"
                  className="flex min-h-[44px] items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-primary/10 border border-primary/30 text-primary font-medium hover:bg-primary/20 transition-colors"
                >
                  <Phone className="size-3.5" />
                  <span>Call Desk</span>
                </a>
                <a
                  href="https://wa.me/918419887730?text=Hello%20Sarrin%20Holidays%2C%20I%20would%20like%20to%20inquire%20about%20a%20luxury%20journey."
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[44px] items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-medium hover:bg-emerald-500/25 transition-colors"
                >
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          )}

          <div className="pt-2">
            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex min-h-[48px] items-center justify-center w-full text-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
            >
              Plan a trip
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
