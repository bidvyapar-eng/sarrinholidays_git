"use client"

import type React from "react"
import { useState, useEffect, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  CalendarDays,
  MapPin,
  Search,
  Users,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
} from "lucide-react"
import { fallbackPackages, type PackageItem } from "@/lib/cms"
import { createClient } from "@/lib/supabase/client"

export function SearchFilter() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  // Active open popover: null | 'destination' | 'dates' | 'guests'
  const [active, setActive] = useState<string | null>(null)

  // Packages list (from fallback + live Supabase)
  const [packagesList, setPackagesList] = useState<PackageItem[]>(fallbackPackages)

  // Form values
  const [destinationQuery, setDestinationQuery] = useState("")
  const [selectedDatesStr, setSelectedDatesStr] = useState("")
  const [travelersStr, setTravelersStr] = useState("2 Guests · Private Suite Tier")

  // --- CALENDAR STATE (Matching Sample Image 1) ---
  const today = useMemo(() => new Date(), [])
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [hoverDate, setHoverDate] = useState<Date | null>(null)

  // --- TRAVELERS STATE (Matching Sample Image 2) ---
  const [adults, setAdults] = useState(2)
  const [childrenCount, setChildrenCount] = useState(0)
  const [infants, setInfants] = useState(0)
  const [travelClass, setTravelClass] = useState("Private Suite Tier")

  // Load packages from Supabase
  useEffect(() => {
    let isCancelled = false
    async function load() {
      try {
        const supabase = createClient()
        const { data } = await supabase.from("packages").select("*")
        if (!isCancelled && data && data.length > 0) {
          const merged = data.map((item: any) => {
            const fallback = fallbackPackages.find((f) => f.slug === item.slug)
            return { ...fallback, ...item }
          })
          setPackagesList(merged)
        }
      } catch {
        // Fallback already set
      }
    }
    load()
    return () => {
      isCancelled = true
    }
  }, [])

  // Sync Travelers summary string whenever counts or class change
  useEffect(() => {
    const totalGuests = adults + childrenCount
    let summary = `${totalGuests} Guest${totalGuests > 1 ? "s" : ""}`
    if (infants > 0) {
      summary += `, ${infants} Infant${infants > 1 ? "s" : ""}`
    }
    summary += ` · ${travelClass}`
    setTravelersStr(summary)
  }, [adults, childrenCount, infants, travelClass])

  // Close popovers on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setActive(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Filter packages for Destination dropdown
  const filteredPackages = useMemo(() => {
    const q = destinationQuery.trim().toLowerCase()
    if (!q) return packagesList
    return packagesList.filter((pkg) => {
      const matchTitle = pkg.title.toLowerCase().includes(q)
      const matchDest = (pkg.destinations || []).some((d) => d.toLowerCase().includes(q))
      const matchTags = (pkg.experience_tags || []).some((t) => t.toLowerCase().includes(q))
      const matchThemes = (pkg.theme_tags || []).some((th) => th.toLowerCase().includes(q))
      return matchTitle || matchDest || matchTags || matchThemes
    })
  }, [destinationQuery, packagesList])

  // Check if current query is "out of the box" (custom destination not in published catalog)
  const isOutOfTheBox = useMemo(() => {
    const q = destinationQuery.trim()
    if (!q) return false
    return filteredPackages.length === 0
  }, [destinationQuery, filteredPackages])

  // Direct redirection to the lead / contact page for custom or out-of-the-box requests
  const handleCustomLeadRequest = (destName: string) => {
    setActive(null)
    const targetDest = destName.trim() || destinationQuery.trim() || "Bespoke Journey"
    const params = new URLSearchParams()
    params.set("destination", targetDest)
    if (selectedDatesStr) params.set("dates", selectedDatesStr)
    if (travelersStr) params.set("guests", travelersStr)
    params.set("custom", "true")
    router.push(`/contact?${params.toString()}`)
  }

  // --- CALENDAR LOGIC ---
  const nextMonthDate = useMemo(() => {
    return new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)
  }, [viewDate])

  const prevMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date)
      setEndDate(null)
      setSelectedDatesStr(formatDateDisplay(date))
    } else if (startDate && !endDate) {
      if (date.getTime() < startDate.getTime()) {
        setStartDate(date)
        setEndDate(null)
        setSelectedDatesStr(formatDateDisplay(date))
      } else if (date.getTime() === startDate.getTime()) {
        // Double clicked or re-clicked same date: single-day journey selected!
        setEndDate(date)
        setSelectedDatesStr(formatDateDisplay(date))
        setActive(null)
      } else {
        setEndDate(date)
        setSelectedDatesStr(`${formatDateDisplay(startDate)} – ${formatDateDisplay(date)}`)
        setActive(null)
      }
    }
  }

  const handleDateDoubleClick = (date: Date) => {
    setStartDate(date)
    setEndDate(date)
    setSelectedDatesStr(formatDateDisplay(date))
    setActive(null)
  }

  const isSameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }

  const isBetween = (date: Date, start: Date | null, end: Date | null) => {
    if (!start || !end) return false
    const time = date.getTime()
    const startTime = start.getTime()
    const endTime = end.getTime()
    return time > startTime && time < endTime
  }

  // Render a single month grid
  const renderMonthGrid = (year: number, month: number) => {
    const firstDayIndex = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null)
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d))
    }

    return (
      <div className="w-full">
        <div className="grid grid-cols-7 mb-2 text-center text-xs font-semibold">
          <span className="text-[#C5A059]">Su</span>
          <span className="text-foreground/70">Mo</span>
          <span className="text-foreground/70">Tu</span>
          <span className="text-foreground/70">We</span>
          <span className="text-foreground/70">Th</span>
          <span className="text-foreground/70">Fr</span>
          <span className="text-[#C5A059]">Sa</span>
        </div>
        <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
          {days.map((date, idx) => {
            if (!date) {
              return <div key={`empty-${idx}`} className="h-8 w-8" />
            }

            const isStart = isSameDay(date, startDate)
            const isEnd = isSameDay(date, endDate)
            const inRange = isBetween(date, startDate, endDate || hoverDate)
            const isPast = date.getTime() < new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()

            let cellClass = "relative h-8 w-8 flex items-center justify-center font-medium transition-colors mx-auto cursor-pointer"
            let dayNumClass = "z-10"

            if (isPast) {
              cellClass += " text-foreground/25 cursor-not-allowed"
            } else if (isStart || isEnd) {
              cellClass += " text-[#0C0B09] font-bold"
              dayNumClass += " size-7 rounded-sm bg-[#C5A059] flex items-center justify-center shadow-md shadow-[#C5A059]/30"
            } else if (inRange) {
              cellClass += " bg-[#C5A059]/15 text-[#C5A059] rounded-none"
            } else {
              cellClass += " text-foreground hover:bg-white/10 rounded-sm"
            }

            return (
              <div
                key={date.toISOString()}
                onClick={() => !isPast && handleDateClick(date)}
                onDoubleClick={() => !isPast && handleDateDoubleClick(date)}
                onMouseEnter={() => !isPast && startDate && !endDate && setHoverDate(date)}
                className={cellClass}
              >
                <span className={dayNumClass}>{date.getDate()}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Submission handler
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setActive(null)
    const query = destinationQuery.trim()

    // IF OUT OF THE BOX: redirect immediately to the lead / contact page to get a call!
    if (isOutOfTheBox) {
      handleCustomLeadRequest(query)
      return
    }

    // Otherwise, dispatch custom event for instant on-page filtering
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("sarrin:search", {
          detail: {
            destination: query,
            dates: selectedDatesStr,
            guests: travelersStr,
          },
        })
      )
    }

    // Update URL query params
    const params = new URLSearchParams()
    if (query) params.set("search", query)
    const queryString = params.toString() ? `?${params.toString()}` : ""
    router.push(`/#destinations${queryString}`, { scroll: false })

    // Smooth scroll to destinations section
    const target = document.getElementById("destinations")
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="relative w-full max-w-3xl rounded-none md:rounded-sm border border-white/15 bg-[#141310]/90 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl"
    >
      <div className="flex flex-col gap-1.5 md:flex-row md:items-center">
        
        {/* ======================= FIELD 1: DESTINATION ======================= */}
        <div className="relative flex-1">
          <div
            className={`flex min-h-[50px] items-center gap-3 rounded-none md:rounded-sm px-4 py-2.5 transition-all cursor-text ${
              active === "destination"
                ? "bg-white/10 border border-white/25 shadow-inner"
                : "hover:bg-white/5 border border-transparent"
            }`}
            onClick={() => setActive("destination")}
          >
            <MapPin className="size-5 shrink-0 text-[#C5A059]" />
            <div className="flex w-full flex-col text-left">
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#B8B4AA]">
                Destination
              </span>
              <input
                type="text"
                name="destination"
                value={destinationQuery}
                onChange={(e) => {
                  setDestinationQuery(e.target.value)
                  if (active !== "destination") setActive("destination")
                }}
                onFocus={() => setActive("destination")}
                placeholder="e.g. Rajasthan, Kerala, Himalayas..."
                className="w-full bg-transparent text-[16px] md:text-sm font-medium text-[#F4F2EC] placeholder:text-[#B8B4AA]/50 focus:outline-none"
                autoComplete="off"
              />
            </div>
          </div>

          {/* ANIMATED PACKAGES DROPDOWN */}
          <AnimatePresence>
            {active === "destination" && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 sm:-left-2 top-[calc(100%+8px)] w-[calc(100vw-48px)] sm:w-[480px] max-w-[calc(100vw-48px)] rounded-none md:rounded-sm border border-white/15 bg-[#141310]/98 p-4 shadow-2xl shadow-black/80 backdrop-blur-2xl z-50 text-left"
              >
                {/* Dropdown Content Area with Custom Neutral Frosted Scrollbar */}
                <div className="max-h-[280px] overflow-y-auto space-y-1.5 pr-1.5 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40">
                  {/* IF OUT OF THE BOX DESTINATION: Concierge Call Prompt */}
                  {isOutOfTheBox ? (
                    <div className="p-4 rounded-sm bg-white/[0.04] border border-white/15 shadow-xl">
                      <p className="text-xs text-foreground/80 leading-relaxed font-light">
                        We arrange custom private travel to <span className="text-foreground font-semibold">&ldquo;{destinationQuery}&rdquo;</span>. Connect with our desk to plan your itinerary.
                      </p>
                      <button
                        type="button"
                        onClick={() => handleCustomLeadRequest(destinationQuery)}
                        className="mt-3.5 w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#C5A059] text-[#0C0B09] text-xs font-semibold uppercase tracking-wider hover:bg-[#D4B475] transition-all shadow-md cursor-pointer"
                      >
                        <PhoneCall className="size-3.5" />
                        <span>Request a call for detailed suggestions for {destinationQuery}</span>
                      </button>
                    </div>
                  ) : (
                    filteredPackages.map((pkg) => (
                      <div
                        key={pkg.id || pkg.slug}
                        onClick={() => {
                          setDestinationQuery(pkg.title)
                          setActive(null)
                        }}
                        className="group flex items-start gap-3 p-2.5 rounded-sm bg-white/[0.04] hover:bg-white/[0.12] border border-white/10 hover:border-[#C5A059]/40 transition-all cursor-pointer"
                      >
                        <div className="size-11 rounded-sm overflow-hidden shrink-0 bg-neutral-900 ring-1 ring-white/15 group-hover:ring-[#C5A059]/50 transition-all mt-0.5">
                          {pkg.featured_image ? (
                            <img
                              src={pkg.featured_image}
                              alt={pkg.title}
                              className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="size-full flex items-center justify-center text-[#C5A059] text-xs font-bold">SH</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-medium text-foreground truncate group-hover:text-[#C5A059] transition-colors">
                              {pkg.title}
                            </span>
                            <span className="text-[11px] font-sans text-foreground/75 bg-white/10 px-2 py-0.5 rounded-sm border border-white/15 shrink-0">
                              {pkg.duration}
                            </span>
                          </div>
                          {pkg.destinations && pkg.destinations.length > 0 && (
                            <div className="flex items-center gap-1.5 text-[11px] text-[#B8B4AA] truncate mt-0.5 font-light">
                              <MapPin className="size-3 shrink-0 text-[#C5A059]" />
                              <span className="truncate">{pkg.destinations.join(" • ")}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ======================= FIELD 2: DATES (CALENDAR) ======================= */}
        <div className="relative flex-1 md:border-l md:border-white/15">
          <div
            className={`flex min-h-[50px] items-center gap-3 rounded-none md:rounded-sm px-4 py-2.5 transition-all cursor-pointer ${
              active === "dates"
                ? "bg-white/10 border border-white/25 shadow-inner"
                : "hover:bg-white/5 border border-transparent"
            }`}
            onClick={() => setActive(active === "dates" ? null : "dates")}
          >
            <CalendarDays className="size-5 shrink-0 text-[#C5A059]" />
            <div className="flex w-full flex-col text-left">
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#B8B4AA]">
                When
              </span>
              <span className="text-[16px] md:text-sm font-medium text-[#F4F2EC] truncate">
                {selectedDatesStr || "Flexible dates"}
              </span>
            </div>
          </div>

          {/* DUAL-MONTH CALENDAR POPOVER */}
          <AnimatePresence>
            {active === "dates" && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] w-[calc(100vw-48px)] sm:w-[580px] md:w-[620px] max-w-[calc(100vw-48px)] rounded-none md:rounded-sm border border-white/15 bg-[#141310]/98 p-4 sm:p-5 shadow-2xl shadow-black/80 backdrop-blur-2xl z-50 text-left"
              >
                {/* Header */}
                <div className="pb-3 mb-3 border-b border-white/10">
                  <span className="text-sm font-semibold text-foreground tracking-wide">
                    Select check in and check out
                  </span>
                </div>

                {/* Dual Month Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                  {/* Month 1 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <button
                        type="button"
                        onClick={prevMonth}
                        className="size-7 rounded-sm border border-white/10 hover:bg-white/10 flex items-center justify-center text-foreground transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="size-4" />
                      </button>
                      <span className="text-xs font-bold text-foreground">
                        {viewDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
                      </span>
                      <div className="size-7 sm:invisible" />
                    </div>
                    {renderMonthGrid(viewDate.getFullYear(), viewDate.getMonth())}
                  </div>

                  {/* Month 2 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <div className="size-7 sm:invisible" />
                      <span className="text-xs font-bold text-foreground">
                        {nextMonthDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
                      </span>
                      <button
                        type="button"
                        onClick={nextMonth}
                        className="size-7 rounded-sm border border-white/10 hover:bg-white/10 flex items-center justify-center text-foreground transition-colors cursor-pointer"
                      >
                        <ChevronRight className="size-4" />
                      </button>
                    </div>
                    {renderMonthGrid(nextMonthDate.getFullYear(), nextMonthDate.getMonth())}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-3.5 mt-3 border-t border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setStartDate(null)
                      setEndDate(null)
                      setSelectedDatesStr("")
                    }}
                    className="text-[#B8B4AA] hover:text-foreground font-sans cursor-pointer"
                  >
                    Clear dates
                  </button>
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="px-5 py-2 bg-[#C5A059] text-[#0C0B09] font-semibold uppercase tracking-wider text-xs hover:bg-[#D4B475] transition-colors cursor-pointer shadow-sm"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ======================= FIELD 3: TRAVEL STYLE ======================= */}
        <div className="relative flex-1 md:border-l md:border-white/15">
          <div
            className={`flex min-h-[50px] items-center gap-3 rounded-none md:rounded-sm px-4 py-2.5 transition-all cursor-pointer ${
              active === "guests"
                ? "bg-white/10 border border-white/25 shadow-inner"
                : "hover:bg-white/5 border border-transparent"
            }`}
            onClick={() => setActive(active === "guests" ? null : "guests")}
          >
            <Users className="size-5 shrink-0 text-[#C5A059]" />
            <div className="flex w-full flex-col text-left">
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#B8B4AA]">
                TRAVEL STYLE
              </span>
              <span className="text-[16px] md:text-sm font-medium text-[#F4F2EC] truncate">
                {travelersStr}
              </span>
            </div>
          </div>

          {/* TRAVEL STYLE POPOVER */}
          <AnimatePresence>
            {active === "guests" && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 top-[calc(100%+8px)] w-[calc(100vw-48px)] sm:w-[340px] max-w-[calc(100vw-48px)] rounded-none md:rounded-sm border border-white/15 bg-[#141310]/98 p-4 shadow-2xl shadow-black/80 backdrop-blur-2xl z-50 text-left"
              >
                {/* Counter: Adults */}
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <div>
                    <div className="text-sm font-semibold text-foreground">Adults</div>
                    <div className="text-xs text-[#B8B4AA] font-light">12+ Years</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                      className={`size-8 rounded-sm border border-foreground/30 flex items-center justify-center font-bold text-base transition-colors ${
                        adults <= 1 ? "opacity-30 cursor-not-allowed text-foreground/40" : "text-foreground hover:border-[#C5A059] hover:text-[#C5A059] cursor-pointer"
                      }`}
                    >
                      –
                    </button>
                    <span className="text-sm font-semibold text-foreground w-4 text-center">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => prev + 1)}
                      className="size-8 rounded-sm border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059]/10 flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Counter: Children */}
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <div>
                    <div className="text-sm font-semibold text-foreground">Children</div>
                    <div className="text-xs text-[#B8B4AA] font-light">2 - 12 yrs</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={childrenCount <= 0}
                      onClick={() => setChildrenCount((prev) => Math.max(0, prev - 1))}
                      className={`size-8 rounded-sm border border-foreground/30 flex items-center justify-center font-bold text-base transition-colors ${
                        childrenCount <= 0 ? "opacity-30 cursor-not-allowed text-foreground/40" : "text-foreground hover:border-[#C5A059] hover:text-[#C5A059] cursor-pointer"
                      }`}
                    >
                      –
                    </button>
                    <span className="text-sm font-semibold text-foreground w-4 text-center">{childrenCount}</span>
                    <button
                      type="button"
                      onClick={() => setChildrenCount((prev) => prev + 1)}
                      className="size-8 rounded-sm border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059]/10 flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Counter: Infants */}
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <div>
                    <div className="text-sm font-semibold text-foreground">Infants</div>
                    <div className="text-xs text-[#B8B4AA] font-light">Below 2 yrs</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={infants <= 0}
                      onClick={() => setInfants((prev) => Math.max(0, prev - 1))}
                      className={`size-8 rounded-sm border border-foreground/30 flex items-center justify-center font-bold text-base transition-colors ${
                        infants <= 0 ? "opacity-30 cursor-not-allowed text-foreground/40" : "text-foreground hover:border-[#C5A059] hover:text-[#C5A059] cursor-pointer"
                      }`}
                    >
                      –
                    </button>
                    <span className="text-sm font-semibold text-foreground w-4 text-center">{infants}</span>
                    <button
                      type="button"
                      onClick={() => setInfants((prev) => prev + 1)}
                      className="size-8 rounded-sm border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059]/10 flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Class / Tier Pills */}
                <div className="pt-3">
                  <div className="text-[10px] uppercase tracking-wider text-[#B8B4AA] mb-2 font-medium">Curated Tier</div>
                  <div className="flex flex-wrap gap-2">
                    {["Private Suite Tier", "Royal Heritage", "Aviation Charter", "First Class"].map((cls) => (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => setTravelClass(cls)}
                        className={`px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
                          travelClass === cls
                            ? "border border-[#C5A059] bg-[#C5A059]/15 text-[#C5A059] font-semibold"
                            : "border border-white/15 text-[#B8B4AA] hover:border-[#C5A059]/50"
                        }`}
                      >
                        {cls}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Done button */}
                <div className="mt-4 pt-3 border-t border-white/10 text-right">
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="px-5 py-1.5 bg-[#C5A059] text-[#0C0B09] font-semibold uppercase tracking-wider text-xs hover:bg-[#D4B475] transition-colors cursor-pointer shadow-sm"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ======================= SEARCH SUBMIT BUTTON ======================= */}
        <button
          type="submit"
          className="flex min-h-[50px] w-full md:w-auto items-center justify-center gap-2 rounded-none md:rounded-sm bg-[#C5A059] px-7 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#0C0B09] hover:bg-[#D4B475] transition-colors cursor-pointer shrink-0 shadow-sm"
        >
          <Search className="size-4" />
          <span className="md:hidden">Search Curated Journeys</span>
          <span className="sr-only md:not-sr-only md:hidden lg:not-sr-only lg:inline">
            Search
          </span>
        </button>

      </div>
    </form>
  )
}
