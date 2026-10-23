"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarDays, MapPin, Search, Users } from "lucide-react"

export function SearchFilter() {
  const router = useRouter()
  const [active, setActive] = useState<string | null>(null)
  const [formValues, setFormValues] = useState({
    destination: "",
    dates: "",
    guests: "",
  })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const query = formValues.destination.trim()

    // Dispatch instant custom event for real-time reactivity
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("sarrin:search", {
          detail: {
            destination: query,
            dates: formValues.dates,
            guests: formValues.guests,
          },
        })
      )
    }

    // Update URL hash and params
    const params = new URLSearchParams()
    if (query) params.set("search", query)
    const queryString = params.toString() ? `?${params.toString()}` : ""
    router.push(`/#destinations${queryString}`, { scroll: false })

    // Smooth scroll to the destinations section
    const target = document.getElementById("destinations")
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleChange = (id: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-3xl rounded-[28px] border border-white/15 bg-white/10 p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl"
    >
      <div className="flex flex-col gap-1.5 md:flex-row md:items-center">
        {/* Destination */}
        <div
          className={`flex min-h-[50px] flex-1 items-center gap-3 rounded-2xl px-4 py-2.5 transition-colors ${
            active === "destination" ? "bg-white/15" : "hover:bg-white/10"
          }`}
        >
          <MapPin className="size-5 shrink-0 text-primary" />
          <label className="flex w-full flex-col text-left">
            <span className="text-[11px] font-medium uppercase tracking-wider text-foreground/60">
              Destination
            </span>
            <input
              type="text"
              name="destination"
              value={formValues.destination}
              onChange={(e) => handleChange("destination", e.target.value)}
              placeholder="e.g. Rajasthan, Kerala, Himalayas..."
              onFocus={() => setActive("destination")}
              onBlur={() => setActive(null)}
              className="w-full bg-transparent text-[16px] md:text-sm font-medium text-foreground placeholder:text-foreground/45 focus:outline-none"
            />
          </label>
        </div>

        {/* Dates */}
        <div
          className={`flex min-h-[50px] flex-1 items-center gap-3 rounded-2xl px-4 py-2.5 transition-colors md:border-l md:border-white/10 ${
            active === "dates" ? "bg-white/15" : "hover:bg-white/10"
          }`}
        >
          <CalendarDays className="size-5 shrink-0 text-primary" />
          <label className="flex w-full flex-col text-left">
            <span className="text-[11px] font-medium uppercase tracking-wider text-foreground/60">
              When
            </span>
            <input
              type="text"
              name="dates"
              value={formValues.dates}
              onChange={(e) => handleChange("dates", e.target.value)}
              placeholder="Flexible dates"
              onFocus={() => setActive("dates")}
              onBlur={() => setActive(null)}
              className="w-full bg-transparent text-[16px] md:text-sm font-medium text-foreground placeholder:text-foreground/45 focus:outline-none"
            />
          </label>
        </div>

        {/* Guests */}
        <div
          className={`flex min-h-[50px] flex-1 items-center gap-3 rounded-2xl px-4 py-2.5 transition-colors md:border-l md:border-white/10 ${
            active === "guests" ? "bg-white/15" : "hover:bg-white/10"
          }`}
        >
          <Users className="size-5 shrink-0 text-primary" />
          <label className="flex w-full flex-col text-left">
            <span className="text-[11px] font-medium uppercase tracking-wider text-foreground/60">
              Travelers
            </span>
            <input
              type="text"
              name="guests"
              value={formValues.guests}
              onChange={(e) => handleChange("guests", e.target.value)}
              placeholder="2 Guests"
              onFocus={() => setActive("guests")}
              onBlur={() => setActive(null)}
              className="w-full bg-transparent text-[16px] md:text-sm font-medium text-foreground placeholder:text-foreground/45 focus:outline-none"
            />
          </label>
        </div>

        <button
          type="submit"
          className="flex min-h-[48px] w-full md:w-auto items-center justify-center gap-2 rounded-2xl md:rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Search className="size-5" />
          <span className="md:hidden">Search Curated Journeys</span>
          <span className="sr-only md:not-sr-only md:hidden lg:not-sr-only lg:inline">
            Search
          </span>
        </button>
      </div>
    </form>
  )
}
