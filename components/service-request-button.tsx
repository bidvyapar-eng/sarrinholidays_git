'use client'

import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
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
          className={`group inline-flex items-center gap-3 rounded-2xl bg-primary hover:bg-[#c5a030] border border-primary/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer ${className}`}
        >
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
          className={`w-full group inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary hover:bg-[#c5a030] border border-primary/40 py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.1em] text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-200 hover:scale-[1.01] active:scale-95 cursor-pointer ${className}`}
        >
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
