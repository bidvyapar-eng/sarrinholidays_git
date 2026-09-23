'use client'

import React, { useState } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'
import { ServiceDrawer } from './service-drawer'

interface ServiceRequestButtonProps {
  serviceTitle: string
  classification?: string
  className?: string
  variant?: 'hero' | 'card' | 'secondary'
  label?: string
}

export function ServiceRequestButton({
  serviceTitle,
  classification = 'Tier 01 Private Service',
  className = '',
  variant = 'hero',
  label = 'Request this Service',
}: ServiceRequestButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (variant === 'hero') {
    return (
      <>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary via-amber-500 to-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-2xl shadow-primary/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-primary/50 active:scale-95 cursor-pointer ${className}`}
        >
          <Sparkles className="size-4 animate-pulse" />
          <span>{label}</span>
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </button>

        <ServiceDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          serviceTitle={serviceTitle}
          classification={classification}
        />
      </>
    )
  }

  if (variant === 'card') {
    return (
      <>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`w-full group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-primary via-amber-500 to-primary py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-200 hover:scale-[1.01] hover:shadow-primary/40 active:scale-95 cursor-pointer ${className}`}
        >
          <Sparkles className="size-3.5" />
          <span>{label}</span>
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </button>

        <ServiceDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          serviceTitle={serviceTitle}
          classification={classification}
        />
      </>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`group inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer ${className}`}
      >
        <Sparkles className="size-3.5" />
        <span>{label}</span>
      </button>

      <ServiceDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        serviceTitle={serviceTitle}
        classification={classification}
      />
    </>
  )
}
