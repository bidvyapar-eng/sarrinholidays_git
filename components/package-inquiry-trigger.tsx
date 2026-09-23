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
          'w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary via-amber-500 to-primary py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-xl shadow-primary/25 hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer'
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
