import React from 'react'

interface JsonLdProps {
  data: Record<string, any> | Array<Record<string, any>>
  id?: string
}

/**
 * Production-grade Server Component for safely injecting JSON-LD structured data into the page.
 * Uses unicode escaping for '<' characters to prevent script injection (XSS) vectors.
 */
export function JsonLd({ data, id }: JsonLdProps) {
  const jsonString = JSON.stringify(data).replace(/</g, '\\u003c')

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  )
}
