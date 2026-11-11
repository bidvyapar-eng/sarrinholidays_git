'use client'

import React from 'react'
import { openConciergeDrawer } from '@/components/ConciergeDrawer'
import { ArrowUpRight } from 'lucide-react'

interface PackageInquiryTriggerProps {
  packageTitle: string
  classification?: string
  buttonText?: string
  className?: string
}

export function PackageInquiryTrigger({
  packageTitle,
  classification = 'Curated Luxury Expedition',
  buttonText = 'Request Confidential Itinerary',
  className = '',
}: PackageInquiryTriggerProps) {
  return (
    <button
      type="button"
      onClick={() =>
        openConciergeDrawer({
          packageTitle,
          route: classification,
        })
      }
      className={
        className ||
        'w-full flex items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] border border-[#C5A059]/40 py-3.5 px-6 min-h-[48px] text-xs font-semibold uppercase tracking-[0.2em] text-[#0C0B09] shadow-md hover:brightness-105 active:scale-95 transition-all text-center cursor-pointer'
      }
    >
      <span>{buttonText}</span>
      <ArrowUpRight className="size-3.5" />
    </button>
  )
}
