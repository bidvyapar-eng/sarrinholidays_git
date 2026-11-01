'use client'

import React, { useState } from 'react'
import { Share2, Check, Copy, MessageCircle, Send } from 'lucide-react'

interface SocialShareProps {
  title: string
  url?: string
  description?: string
  className?: string
}

export function SocialShare({
  title,
  url,
  description = 'Curated by Sarrin Holidays — Bespoke Indian Expeditions & Sovereign Stays.',
  className = '',
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const resolvedUrl =
    url || (typeof window !== 'undefined' ? window.location.href : 'https://sarrinholidays.com')

  const encodedUrl = encodeURIComponent(resolvedUrl)
  const encodedText = encodeURIComponent(`${title} — ${description}`)

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(resolvedUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }
    } catch {
      // Fallback
    }
  }

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: resolvedUrl,
        })
      } catch {
        // User cancelled or unsupported
      }
    } else {
      handleCopy()
    }
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 select-none ${className}`}>
      <span className="text-xs font-mono uppercase tracking-wider text-foreground/50 mr-1 flex items-center gap-1.5">
        <Share2 className="size-3.5 text-primary" />
        <span>Share Dossier:</span>
      </span>

      {/* WhatsApp Share */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share via WhatsApp"
        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 hover:border-emerald-500/40 hover:bg-emerald-500/10 px-3 py-1.5 text-xs text-foreground/80 hover:text-emerald-300 transition-all duration-200"
      >
        <span className="font-mono text-[11px]">WhatsApp</span>
      </a>

      {/* LinkedIn Share */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 hover:border-sky-500/40 hover:bg-sky-500/10 px-3 py-1.5 text-xs text-foreground/80 hover:text-sky-300 transition-all duration-200"
      >
        <span className="font-mono text-[11px]">LinkedIn</span>
      </a>

      {/* X / Twitter Share */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (Twitter)"
        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 px-3 py-1.5 text-xs text-foreground/80 hover:text-white transition-all duration-200"
      >
        <span className="font-mono text-[11px]">X</span>
      </a>

      {/* Copy Direct Link */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy Link"
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-mono transition-all duration-200 cursor-pointer ${
          copied
            ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
            : 'border-white/10 bg-white/5 text-foreground/80 hover:border-primary/40 hover:bg-primary/10 hover:text-primary'
        }`}
      >
        {copied ? (
          <>
            <Check className="size-3 text-emerald-400" />
            <span className="text-[11px]">Copied</span>
          </>
        ) : (
          <>
            <Copy className="size-3" />
            <span className="text-[11px]">Copy Link</span>
          </>
        )}
      </button>
    </div>
  )
}
