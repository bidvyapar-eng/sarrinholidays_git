"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const links = [
  { label: "Destinations", href: "/#destinations" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Journal", href: "/blog" },
  { label: "About", href: "/#about" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 px-4 py-2.5 pl-5 transition-all duration-500 sm:px-6 ${
          scrolled
            ? "bg-background/70 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "bg-white/5 backdrop-blur-md"
        }`}
      >
        <a
          href="#"
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

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-white/10 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95 sm:inline-flex">
            Plan a trip
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-white/10 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-white/10 bg-background/80 p-2 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-white/10 hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="p-2">
              <button className="w-full rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                Plan a trip
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
