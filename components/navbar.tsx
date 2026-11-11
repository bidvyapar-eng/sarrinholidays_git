"use client"

import { useEffect, useState, useRef } from "react"
import { Menu, X, Globe, ChevronDown, Phone } from "lucide-react"
import { GlobalConciergeRouting } from "@/components/global-concierge-routing"
import { ENABLE_GLOBAL_CONCIERGE } from "@/lib/features.config"
import { openConciergeDrawer } from "@/components/ConciergeDrawer"

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
    <header className="fixed inset-x-0 top-0 z-50 h-20 border-b border-white/10 bg-[#0C0B09]/85 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <a
          href="/"
          aria-label="Sarrin Holidays home"
          className="group flex flex-col items-start justify-center text-left transition-opacity hover:opacity-90"
        >
          <span className="font-serif text-2xl font-light tracking-[0.25em] text-[#F4F2EC] leading-none">
            SARRIN
          </span>
          <span className="mt-1.5 text-[9px] font-medium tracking-[0.35em] text-[#C5A059] uppercase leading-none">
            HOLIDAYS · INDIA
          </span>
        </a>

        <ul className="hidden items-center gap-1 xl:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="px-3.5 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#B8B4AA] transition-colors hover:text-[#F4F2EC] whitespace-nowrap"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 shrink-0">
          {/* Header Action: Global Concierge (if enabled) OR Domestic Concierge Hotline */}
          {ENABLE_GLOBAL_CONCIERGE ? (
            <button
              onClick={() => setConciergeOpen((v) => !v)}
              aria-expanded={conciergeOpen}
              aria-label="Toggle Global Concierge Routing"
              className={`hidden sm:inline-flex items-center gap-1.5 border px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all backdrop-blur-md whitespace-nowrap shrink-0 ${
                conciergeOpen
                  ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "border-[#C5A059]/40 bg-[#C5A059]/10 text-[#C5A059] hover:bg-[#C5A059]/20"
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
              className="hidden sm:inline-flex items-center gap-2 border border-[#C5A059]/30 bg-[#C5A059]/10 hover:bg-[#C5A059]/20 px-3.5 py-2 text-xs font-medium text-[#C5A059] transition-all whitespace-nowrap shrink-0 tracking-wider"
              aria-label="Concierge Desk: +91 84198 87730"
            >
              <Phone className="size-3.5 text-[#C5A059]" />
              <span>+91 84198 87730</span>
            </a>
          )}

          <button
            type="button"
            onClick={() => openConciergeDrawer()}
            className="hidden md:inline-flex items-center justify-center bg-[#C5A059] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#0C0B09] hover:bg-[#D4B475] transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            Design Your Journey
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-foreground transition-colors hover:text-[#C5A059] xl:hidden shrink-0"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Global Concierge Desktop Popover Dropdown (Controlled by Flag) */}
      {ENABLE_GLOBAL_CONCIERGE && conciergeOpen && (
        <div
          ref={conciergeRef}
          className="mx-auto mt-2 max-w-2xl border border-white/20 bg-[#141310]/95 p-5 sm:p-6 backdrop-blur-2xl shadow-2xl shadow-black/90 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
        >
          <GlobalConciergeRouting
            variant="compact"
            onSelectDesk={() => setConciergeOpen(false)}
          />
        </div>
      )}

      {/* Mobile & Tablet Navigation Drawer */}
      {open && (
        <div className="mx-auto mt-2 max-w-6xl border border-white/15 bg-[#141310]/98 p-5 backdrop-blur-2xl shadow-2xl xl:hidden space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col space-y-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm font-medium uppercase tracking-wider text-[#B8B4AA] transition-colors hover:text-[#C5A059]"
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
              <div className="flex items-center justify-between text-[11px] text-[#B8B4AA]">
                <span>Concierge Desk</span>
                <span className="text-[#C5A059] font-medium">24/7 Operations</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="tel:+918419887730"
                  className="flex min-h-[44px] items-center justify-center gap-1.5 py-2.5 px-3 bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] font-medium hover:bg-[#C5A059]/20 transition-colors"
                >
                  <Phone className="size-3.5" />
                  <span>Call Desk</span>
                </a>
                <a
                  href="https://wa.me/918419887730?text=Hello%20Sarrin%20Holidays%2C%20I%20would%20like%20to%20inquire%20about%20a%20luxury%20journey."
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[44px] items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-medium hover:bg-emerald-500/25 transition-colors"
                >
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                openConciergeDrawer()
              }}
              className="flex min-h-[48px] items-center justify-center w-full text-center bg-[#C5A059] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#0C0B09] hover:bg-[#D4B475] transition-colors cursor-pointer"
            >
              Design Your Journey
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
