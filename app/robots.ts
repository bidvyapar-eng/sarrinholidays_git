import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarrinholidays.com'

  return {
    rules: [
      // Standard search engines & social graph preview scrapers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/admin', '/api/', '/api'],
      },
      // AI Search & LLM Discovery Crawlers (Perplexity, ChatGPT, Claude, Apple Intelligence)
      {
        userAgent: [
          'GPTBot',
          'PerplexityBot',
          'Claude-Web',
          'ClaudeBot',
          'Google-Extended',
          'Applebot',
          'facebookexternalhit',
          'Twitterbot',
          'LinkedInBot',
        ],
        allow: [
          '/',
          '/packages/',
          '/packages',
          '/services/',
          '/services',
          '/blog/',
          '/blog',
          '/about',
          '/contact',
          '/press',
          '/feed.xml',
        ],
        disallow: ['/admin/', '/admin', '/api/'],
      },
    ],
    sitemap: [`${siteUrl}/sitemap.xml`, `${siteUrl}/feed.xml`],
    host: siteUrl,
  }
}
