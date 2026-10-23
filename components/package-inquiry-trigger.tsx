'use client'

import React, { useState } from 'react'
import { VipInquiryDrawer } from '@/components/vip-inquiry-drawer'
import { ArrowUpRight, Sparkles } from 'lucide-react'

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
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          className ||
          'w-full flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-[#c5a030] border border-primary/40 py-3.5 px-6 min-h-[48px] text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-xl shadow-primary/20 hover:brightness-105 active:scale-95 transition-all text-center cursor-pointer'
        }
      >
        <Sparkles className="size-3.5 animate-pulse" />
        <span>{buttonText}</span>
        <ArrowUpRight className="size-3.5" />
      </button>

      <VipInquiryDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        serviceTitle={packageTitle}
        classification={classification}
      />
    </>
  )
}
