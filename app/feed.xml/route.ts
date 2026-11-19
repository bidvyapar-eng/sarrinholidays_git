import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { fallbackJournalPosts, type JournalPost } from '@/lib/cms'

export const dynamic = 'force-dynamic'

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case '\'':
        return '&apos;'
      case '"':
        return '&quot;'
      default:
        return c
    }
  })
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarrinholidays.com'
  const currentDate = new Date()

  let posts: JournalPost[] = fallbackJournalPosts

  try {
    const { data: dbPosts } = await supabase
      .from('journal_posts')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })

    if (dbPosts && dbPosts.length > 0) {
      posts = dbPosts as JournalPost[]
    }
  } catch {
    posts = fallbackJournalPosts
  }

  const itemsXml = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`
      const pubDate = post.published_at ? new Date(post.published_at).toUTCString() : currentDate.toUTCString()
      const enclosure = post.image_url
        ? `<enclosure url="${escapeXml(post.image_url)}" type="image/jpeg" length="0" />`
        : ''

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${post.category || 'Luxury Travel'}]]></category>
      <description><![CDATA[${post.excerpt}]]></description>
      ${enclosure}
      <author>concierge@sarrinholidays.com (Sarrin Holidays Editorial Desk)</author>
    </item>`
    })
    .join('')

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>The Sarrin Gazette | Luxury Indian Travel &amp; Sovereign Expeditions</title>
    <link>${siteUrl}/blog</link>
    <description>Essays on living heritage palaces in Rajasthan, emerald Kerala backwaters, private aviation, and transformative Himalayan sanctuaries.</description>
    <language>en-us</language>
    <lastBuildDate>${currentDate.toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteUrl}/sarrin-holidays-logo.png</url>
      <title>Sarrin Holidays</title>
      <link>${siteUrl}</link>
    </image>
    ${itemsXml}
  </channel>
</rss>`

  return new NextResponse(rssXml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400',
    },
  })
}
