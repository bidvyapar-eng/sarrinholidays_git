import type { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabaseClient'
import { fallbackPackages, fallbackServices } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarrinholidays.com'
  const currentDate = new Date()

  // 1. Static Core Application Pages (Only canonical 200 OK routes)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // 2. Fetch Packages from Supabase with fallback resilience
  let packageRoutes: MetadataRoute.Sitemap = []
  try {
    const { data: dbPackages } = await supabase
      .from('packages')
      .select('slug, created_at')

    const seenPackageSlugs = new Set<string>()
    const packageItems = [...(dbPackages || [])]

    // Ensure fallback packages are indexed if database is empty/syncing
    fallbackPackages.forEach((pkg) => {
      if (!packageItems.some((p) => p.slug === pkg.slug)) {
        packageItems.push({ slug: pkg.slug, created_at: pkg.created_at || currentDate.toISOString() })
      }
    })

    packageRoutes = packageItems
      .filter((pkg) => {
        if (!pkg.slug || seenPackageSlugs.has(pkg.slug)) return false
        seenPackageSlugs.add(pkg.slug)
        return true
      })
      .map((pkg) => ({
        url: `${siteUrl}/packages/${pkg.slug}`,
        lastModified: pkg.created_at ? new Date(pkg.created_at) : currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
      }))
  } catch (err) {
    console.error('Error generating package sitemap entries:', err)
    packageRoutes = fallbackPackages.map((pkg) => ({
      url: `${siteUrl}/packages/${pkg.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    }))
  }

  // 3. Fetch Services from Supabase with fallback resilience
  let serviceRoutes: MetadataRoute.Sitemap = []
  try {
    const { data: dbServices } = await supabase
      .from('services')
      .select('slug, created_at')

    const seenServiceSlugs = new Set<string>()
    const serviceItems = [...(dbServices || [])]

    fallbackServices.forEach((svc) => {
      if (!serviceItems.some((s) => s.slug === svc.slug)) {
        serviceItems.push({ slug: svc.slug, created_at: svc.created_at || currentDate.toISOString() })
      }
    })

    serviceRoutes = serviceItems
      .filter((svc) => {
        if (!svc.slug || seenServiceSlugs.has(svc.slug)) return false
        seenServiceSlugs.add(svc.slug)
        return true
      })
      .map((svc) => ({
        url: `${siteUrl}/services/${svc.slug}`,
        lastModified: svc.created_at ? new Date(svc.created_at) : currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
      }))
  } catch (err) {
    console.error('Error generating service sitemap entries:', err)
    serviceRoutes = fallbackServices.map((svc) => ({
      url: `${siteUrl}/services/${svc.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    }))
  }

  // 4. Fetch Journal Entries from Supabase
  let journalRoutes: MetadataRoute.Sitemap = []
  try {
    const { data: dbPosts } = await supabase
      .from('journal_posts')
      .select('slug, created_at, published_at')
      .eq('is_published', true)

    if (dbPosts && dbPosts.length > 0) {
      journalRoutes = dbPosts
        .filter((post) => Boolean(post.slug))
        .map((post) => ({
          url: `${siteUrl}/blog/${post.slug}`,
          lastModified: post.published_at
            ? new Date(post.published_at)
            : post.created_at
            ? new Date(post.created_at)
            : currentDate,
          changeFrequency: 'monthly',
          priority: 0.7,
        }))
    }
  } catch (err) {
    console.error('Error generating journal sitemap entries:', err)
  }

  return [...staticRoutes, ...packageRoutes, ...serviceRoutes, ...journalRoutes]
}
