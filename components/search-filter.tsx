"use client"

import type React from "react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, MapPin, Search } from "lucide-react"

const destinations = [
  { name: "Amalfi Coast", detail: "Italy · Mediterranean", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=96&q=80" },
  { name: "Ubud, Bali", detail: "Indonesia · Southeast Asia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=96&q=80" },
  { name: "The Dolomites", detail: "Italy · Alpine escapes", image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=96&q=80" },
  { name: "Santorini", detail: "Greece · Island escape", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=96&q=80" },
  { name: "Marrakech", detail: "Morocco · Desert charm", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=96&q=80" },
]

const filters = [
  { label: "Destinations", options: ["Anywhere", "Europe", "Asia Pacific", "The Americas"] },
  { label: "Price tier", options: ["Any budget", "Essential", "Elevated", "Ultra luxury"] },
  { label: "Experience", options: ["Any experience", "Slow travel", "Adventure", "Wellness"] },
]

const filterItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
}

export function SearchFilter() {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
  
  const visibleDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(query.toLowerCase()),
  )

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsFocused(false)
  }

  return (
    <form onSubmit={onSubmit} className="relative mx-auto w-full max-w-4xl">
      {/* Search input with glassmorphism */}
      <motion.div
        className={`relative z-20 flex items-center gap-3 rounded-full border bg-black/25 px-5 py-3 shadow-2xl shadow-black/40 backdrop-blur-2xl transition-all duration-300 sm:px-7 sm:py-4 ${
          isFocused ? "border-primary/70 ring-4 ring-primary/15" : "border-white/20 hover:border-white/40"
        }`}
        animate={{
          boxShadow: isFocused
            ? "0 0 40px rgba(var(--color-primary), 0.3), 0 20px 40px rgba(0, 0, 0, 0.4)"
            : "0 20px 40px rgba(0, 0, 0, 0.4)",
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ scale: isFocused ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <MapPin className="size-5 shrink-0 text-primary" />
        </motion.div>
        <label className="min-w-0 flex-1 text-left">
          <span className="sr-only">Search destinations</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Where do you want to go?"
            className="w-full bg-transparent text-base font-medium text-white outline-none placeholder:text-white/55 sm:text-lg"
            aria-expanded={isFocused}
            aria-controls="destination-suggestions"
          />
        </label>
        <motion.button
          type="submit"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Search journeys"
        >
          <Search className="size-5" />
        </motion.button>
      </motion.div>

      {/* Destination suggestions dropdown */}
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
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="px-4 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45"
            >
              Popular destinations
            </motion.p>
            {visibleDestinations.length > 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                {visibleDestinations.map((destination, index) => (
                  <motion.button
                    key={destination.name}
                    type="button"
                    variants={filterItemVariants}
                    custom={index}
                    onMouseDown={() => {
                      setQuery(destination.name)
                      setTimeout(() => setIsFocused(false), 100)
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-white/10"
                    whileHover={{ x: 4 }}
                  >
                    <motion.img
                      src={destination.image}
                      alt=""
                      className="size-10 rounded-full object-cover flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <span className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-white truncate">{destination.name}</span>
                      <span className="text-xs text-white/50">{destination.detail}</span>
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 py-5 text-sm text-white/55"
              >
                Try a broader destination.
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter dropdowns */}
      <motion.div
        className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.3,
            },
          },
        }}
      >
        {filters.map((filter, idx) => (
          <motion.label
            key={filter.label}
            variants={filterItemVariants}
            custom={idx}
            className="group relative flex items-center justify-between rounded-full border border-white/15 bg-black/20 px-4 py-2.5 backdrop-blur-xl cursor-pointer"
            whileHover={{ borderColor: "rgba(255, 255, 255, 0.35)", backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-xs text-white/65">{filter.label}</span>
            <span className="relative">
              <select
                defaultValue={filter.options[0]}
                aria-label={filter.label}
                onChange={() => setSelectedFilter(filter.label)}
                className="absolute inset-0 w-full cursor-pointer opacity-0"
              >
                <option>{filter.options[0]}</option>
                {filter.options.slice(1).map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <motion.span
                className="flex items-center gap-2 text-xs font-medium text-white pointer-events-none"
                animate={{
                  y: selectedFilter === filter.label ? 2 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="hidden sm:inline">{filter.options[0]}</span>
                <ChevronDown className="size-3.5 text-primary transition-transform group-hover:rotate-180" style={{ transitionDuration: "300ms" }} />
              </motion.span>
            </span>
          </motion.label>
        ))}
      </motion.div>
    </form>
  )
}
