'use client'

import React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown, MapPin, Navigation, Compass } from 'lucide-react'
import type { ItineraryStop } from '@/app/packages/[slug]/page'

interface ItineraryAccordionProps {
  items: ItineraryStop[]
  duration?: string
}

export function ItineraryAccordion({ items, duration }: ItineraryAccordionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] uppercase font-mono tracking-[0.2em] text-primary font-medium">
            Curated Progression
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium mt-1">
            Day-by-Day Expedition Itinerary
          </h2>
        </div>
        {duration && (
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Compass className="size-4 text-primary" />
            <span>{duration}</span>
          </div>
        )}
      </div>

      <Accordion.Root
        type="multiple"
        defaultValue={['item-0']}
        className="space-y-3"
      >
        {items.map((item, idx) => (
          <Accordion.Item
            key={idx}
            value={`item-${idx}`}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl transition-all duration-200 data-[state=open]:border-primary/50 shadow-lg shadow-black/40"
          >
            <Accordion.Header className="flex">
              <Accordion.Trigger className="flex flex-1 items-center justify-between p-4 sm:p-5 text-left transition-all hover:bg-white/[0.03] cursor-pointer min-h-[48px] w-full">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 pr-2 min-w-0">
                  {/* Glowing Pin Marker */}
                  <div className="flex size-7 items-center justify-center rounded-xl bg-primary/15 border border-primary/30 text-primary shrink-0 shadow-[0_0_10px_rgba(217,119,6,0.3)] mt-0.5 sm:mt-0">
                    <Navigation className="size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-primary">
                        {item.day}
                      </span>
                      <span className="text-neutral-500 text-xs hidden sm:inline">•</span>
                      <div className="flex items-center gap-1 text-xs text-neutral-300">
                        <MapPin className="size-3 text-primary shrink-0" />
                        <span className="font-medium text-white truncate max-w-[200px] sm:max-w-none">
                          {item.destination}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-serif text-sm sm:text-base text-neutral-200 font-medium mt-1 group-hover:text-primary transition-colors leading-snug">
                      {item.highlight}
                    </h3>
                  </div>
                </div>

                <div className="flex size-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-neutral-400 shrink-0 group-hover:text-white transition-colors ml-2">
                  <ChevronDown className="size-4 transition-transform duration-300 ease-out group-data-[state=open]:rotate-180 text-primary" />
                </div>
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up px-4 sm:px-5 pb-5 pt-2 border-t border-white/5">
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-3">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  )
}
