"use client"

import type React from "react"
import { useState } from "react"
import { CalendarDays, MapPin, Search, Users } from "lucide-react"

const fields = [
  {
    id: "destination",
    icon: MapPin,
    label: "Destination",
    placeholder: "Where to?",
    type: "text",
  },
  {
    id: "dates",
    icon: CalendarDays,
    label: "When",
    placeholder: "Add dates",
    type: "text",
  },
  {
    id: "guests",
    icon: Users,
    label: "Guests",
    placeholder: "Add guests",
    type: "text",
  },
] as const

export function SearchFilter() {
  const [active, setActive] = useState<string | null>(null)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] search submitted")
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-3xl rounded-[28px] border border-white/15 bg-white/10 p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
        {fields.map((field, i) => {
          const Icon = field.icon
          return (
            <div
              key={field.id}
              className={`flex flex-1 items-center gap-3 rounded-3xl px-4 py-3 transition-colors ${
                active === field.id ? "bg-white/15" : "hover:bg-white/10"
              } ${i > 0 ? "sm:border-l sm:border-white/10" : ""}`}
            >
              <Icon className="size-5 shrink-0 text-primary" />
              <label className="flex w-full flex-col text-left">
                <span className="text-[11px] font-medium uppercase tracking-wider text-foreground/60">
                  {field.label}
                </span>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  onFocus={() => setActive(field.id)}
                  onBlur={() => setActive(null)}
                  className="w-full bg-transparent text-sm font-medium text-foreground placeholder:text-foreground/45 focus:outline-none"
                />
              </label>
            </div>
          )
        })}

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-3xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95 sm:rounded-full sm:px-5"
        >
          <Search className="size-5" />
          <span className="sm:hidden">Search journeys</span>
          <span className="sr-only sm:not-sr-only sm:hidden lg:not-sr-only lg:inline">
            Search
          </span>
        </button>
      </div>
    </form>
  )
}
