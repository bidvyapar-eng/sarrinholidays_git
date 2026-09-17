"use client"

import type React from "react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, MapPin, Search } from "lucide-react"

const destinations = [
  { name: "Amalfi Coast", detail: "Italy · Mediterranean", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=96&q=80" },
  { name: "Ubud, Bali", detail: "Indonesia · Southeast Asia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=96&q=80" },
  { name: "The Dolomites", detail: "Italy · Alpine escapes", image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=96&q=80" },
]

const filters = [
  { label: "Destinations", options: ["Anywhere", "Europe", "Asia Pacific", "The Americas"] },
  { label: "Price tier", options: ["Any budget", "Essential", "Elevated", "Ultra luxury"] },
  { label: "Experience", options: ["Any experience", "Slow travel", "Adventure", "Wellness"] },
]

export function SearchFilter() {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const visibleDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(query.toLowerCase()),
  )

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsFocused(false)
  }

  return (
    <form onSubmit={onSubmit} className="relative mx-auto w-full max-w-4xl">
      <div className={`relative z-20 flex items-center gap-3 rounded-full border bg-black/25 px-5 py-3 shadow-2xl shadow-black/40 backdrop-blur-2xl transition-all duration-300 sm:px-7 sm:py-4 ${isFocused ? "border-primary/70 ring-4 ring-primary/15" : "border-white/20 hover:border-white/40"}`}>
        <MapPin className="size-5 shrink-0 text-primary" />
        <label className="min-w-0 flex-1 text-left">
          <span className="sr-only">Search destinations</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Where do you want to go?"
            className="w-full bg-transparent text-base font-medium text-white outline-none placeholder:text-white/55 sm:text-lg"
            aria-expanded={isFocused}
            aria-controls="destination-suggestions"
          />
        </label>
        <button type="submit" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 hover:scale-105 active:scale-95" aria-label="Search journeys">
          <Search className="size-5" />
        </button>
      </div>

      <AnimatePresence>
        {isFocused && (
          <motion.div
            id="destination-suggestions"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-x-2 top-[calc(100%+10px)] z-10 overflow-hidden rounded-3xl border border-white/15 bg-[#172522]/95 p-2 text-left shadow-2xl shadow-black/40 backdrop-blur-2xl sm:inset-x-8"
          >
            <p className="px-4 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">Popular destinations</p>
            {visibleDestinations.length > 0 ? visibleDestinations.map((destination, index) => (
              <motion.button
                key={destination.name}
                type="button"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onMouseDown={() => { setQuery(destination.name); setIsFocused(false) }}
                className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-white/10"
              >
                <img src={destination.image} alt="" className="size-10 rounded-full object-cover" />
                <span className="flex flex-col"><span className="text-sm font-medium text-white">{destination.name}</span><span className="text-xs text-white/50">{destination.detail}</span></span>
              </motion.button>
            )) : <p className="px-4 py-5 text-sm text-white/55">Try a broader destination.</p>}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {filters.map((filter) => (
          <label key={filter.label} className="group flex items-center justify-between rounded-full border border-white/15 bg-black/20 px-4 py-2.5 backdrop-blur-xl transition-colors hover:border-white/35">
            <span className="text-xs text-white/65">{filter.label}</span>
            <span className="relative"><select defaultValue={filter.options[0]} aria-label={filter.label} className="absolute inset-0 w-full cursor-pointer opacity-0"><option>{filter.options[0]}</option>{filter.options.slice(1).map((option) => <option key={option}>{option}</option>)}</select><span className="flex items-center gap-2 text-xs font-medium text-white"><span className="hidden sm:inline">{filter.options[0]}</span><ChevronDown className="size-3.5 text-primary transition-transform group-hover:translate-y-0.5" /></span></span>
          </label>
        ))}
      </div>
    </form>
  )
}
