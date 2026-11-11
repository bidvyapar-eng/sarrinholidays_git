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
          <span className="text-[11px] uppercase font-sans tracking-[0.2em] text-[#C5A059] font-medium">
            Curated Progression
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F4F2EC] font-light tracking-tight mt-1">
            Day-by-Day Expedition Itinerary
          </h2>
        </div>
        {duration && (
          <div className="hidden sm:flex items-center gap-2 text-xs font-sans text-[#B8B4AA]">
            <Compass className="size-4 text-[#C5A059]" />
            <span className="tracking-wider uppercase">{duration}</span>
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
            className="group overflow-hidden rounded-sm border border-white/10 bg-[#141310] transition-all duration-300 data-[state=open]:border-[#C5A059]/60 shadow-lg shadow-black/40"
          >
            <Accordion.Header className="flex">
              <Accordion.Trigger className="flex flex-1 items-center justify-between p-4 sm:p-5 text-left transition-all hover:bg-white/[0.02] cursor-pointer min-h-[48px] w-full">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 pr-2 min-w-0">
                  {/* Pin Marker */}
                  <div className="flex size-7 items-center justify-center rounded-sm bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] shrink-0 mt-0.5 sm:mt-0">
                    <Navigation className="size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-sans font-medium uppercase tracking-[0.16em] text-[#C5A059]">
                        {item.day}
                      </span>
                      <span className="text-stone-600 text-xs hidden sm:inline">•</span>
                      <div className="flex items-center gap-1.5 text-xs text-[#B8B4AA]">
                        <MapPin className="size-3 text-[#C5A059] shrink-0" />
                        <span className="font-normal text-[#F4F2EC] truncate max-w-[200px] sm:max-w-none">
                          {item.destination}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-serif text-sm sm:text-base text-[#F4F2EC] font-light mt-1 group-hover:text-[#C5A059] transition-colors leading-snug">
                      {item.highlight}
                    </h3>
                  </div>
                </div>

                <div className="flex size-8 items-center justify-center rounded-sm bg-white/5 border border-white/10 text-[#B8B4AA] shrink-0 group-hover:text-white transition-colors ml-2">
                  <ChevronDown className="size-4 transition-transform duration-300 ease-out group-data-[state=open]:rotate-180 text-[#C5A059]" />
                </div>
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up px-4 sm:px-5 pb-5 pt-2 border-t border-white/5">
              <p className="text-xs sm:text-sm text-[#B8B4AA] leading-relaxed font-light">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-3">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-sm bg-white/[0.03] border border-white/10 text-[10px] font-sans uppercase tracking-wider text-[#B8B4AA]"
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
