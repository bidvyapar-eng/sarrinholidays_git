import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarrinholidays.com'
  const isStaging = siteUrl.includes('sarrin.bidvyapar.com')

  return {
    rules: [
      // Staging site: noindex, nofollow until production cutover
      ...(isStaging
        ? [
            {
              userAgent: '*',
              disallow: '/',
            },
          ]
        : [
            {
              userAgent: '*',
              allow: '/',
              disallow: ['/admin/', '/admin', '/api/', '/api'],
            },
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
                '/privacy-policy',
                '/terms-and-conditions',
                '/refund-policy',
                '/sitemap',
              ],
              disallow: ['/admin/', '/admin', '/api/'],
            },
          ]),
    ],
    sitemap: isStaging
      ? []
      : [`${siteUrl}/sitemap.xml`, `${siteUrl}/feed.xml`],
    host: siteUrl,
  }
}
