import { supabase } from "@/lib/supabaseClient"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { ArrowLeft, Clock, MapPin, ArrowRight, Share2, Compass } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { fallbackJournalPosts, fallbackPackages, type JournalPost } from "@/lib/cms"
import { SocialShare } from "@/components/social-share"

export const dynamic = 'force-dynamic'

interface BlogPostProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return fallbackJournalPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const resolvedParams = await params

  const { data: dbBlog } = await supabase
    .from('journal_posts')
    .select('title, excerpt, image_url')
    .eq('slug', resolvedParams.slug)
    .maybeSingle()

  const blog: Partial<JournalPost> | undefined =
    dbBlog || fallbackJournalPosts.find((p) => p.slug === resolvedParams.slug)

  if (!blog) {
    return {
      title: 'Journal Dispatch | Sarrin Holidays',
      description: 'Dispatches, essays, and expedition insights from Sarrin Holidays.',
    }
  }

  const title = `${blog.title} | Sarrin Holidays Journal`
  const description =
    blog.excerpt || 'Luxury Indian travel perspectives, royal history, and expedition insights.'
  const imageUrl =
    blog.image_url ||
    'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200'

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/blog/${resolvedParams.slug}`,
      siteName: 'Sarrin Holidays',
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title || 'Sarrin Holidays Journal',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

// Map related tour package to journal article for direct high-intent conversion
const RELATED_PACKAGES: Record<string, string> = {
  'rajasthan-heritage-palaces': 'royal-rajasthan-tour',
  'kerala-slow-solitude': 'kerala-houseboat-retreat',
  'himalayan-wellness-sanctuary': 'himalayan-wellness-escapade',
}

export default async function BlogPost({ params }: BlogPostProps) {
  const resolvedParams = await params

  // Parallel fetch to eliminate waterfall delays
  const [{ data: settings }, { data: dbBlog }] = await Promise.all([
    supabase.from('site_settings').select('navbar_logo_text').limit(1).maybeSingle(),
    supabase.from('journal_posts').select('*').eq('slug', resolvedParams.slug).maybeSingle(),
  ])

  const blog: JournalPost | undefined =
    dbBlog || fallbackJournalPosts.find((p) => p.slug === resolvedParams.slug)

  if (!blog) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarrinholidays.com'
  const displayDate = blog.published_at || blog.created_at || '2026-09-15T00:00:00Z'

  const relatedSlug = RELATED_PACKAGES[resolvedParams.slug] || 'royal-rajasthan-tour'
  const relatedPackage = fallbackPackages.find(p => p.slug === relatedSlug) || fallbackPackages[0]

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${siteUrl}/blog/${resolvedParams.slug}#article`,
    headline: blog.title,
    description: blog.excerpt,
    image: blog.image_url ? [blog.image_url] : [],
    datePublished: displayDate,
    dateModified: blog.updated_at || displayDate,
    author: {
      '@type': 'Organization',
      name: 'Sarrin Holidays Editorial Desk',
      url: siteUrl,
    },
    publisher: {
      '@type': 'TravelAgency',
      name: 'Sarrin Holidays',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/sarrin-holidays-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${resolvedParams.slug}`,
    },
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      <JsonLd data={articleSchema} id="article-schema" />
      <Navbar logoText={settings?.navbar_logo_text} />

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/10 blur-[150px]" />
      <div className="pointer-events-none absolute top-[800px] right-0 size-[450px] rounded-full bg-amber-500/5 blur-[120px]" />

      <article className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-3.5 mr-2" /> Return to Editorial Journal
          </Link>
          <span className="text-xs font-mono text-primary/80 uppercase tracking-widest">
            {blog.category || 'Special Dispatch'}
          </span>
        </div>

        {/* Editorial Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 text-xs font-mono text-foreground/50 uppercase tracking-widest mb-4">
            <span>{new Date(displayDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="opacity-40">•</span>
            <span className="flex items-center gap-1 text-primary">
              <Clock className="size-3" /> 6 Min Read
            </span>
            <span className="opacity-40">•</span>
            <span>By Sarrin Research Desk</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl leading-[1.15] text-foreground font-normal tracking-tight mb-6">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-lg sm:text-xl text-foreground/75 leading-relaxed font-light border-l-2 border-primary/50 pl-5 my-6 italic">
              {blog.excerpt}
            </p>
          )}

          <div className="pt-2 border-t border-white/10">
            <SocialShare title={blog.title} description={blog.excerpt} />
          </div>
        </header>

        {/* Featured Hero Imagery */}
        {blog.image_url && (
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-14 border border-white/10 shadow-2xl shadow-black/80">
            <img
              src={blog.image_url}
              alt={blog.title}
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>
        )}

        {/* Article Body Content */}
        <div className="space-y-6 text-foreground/80 font-light text-base sm:text-lg leading-relaxed">
          {blog.body?.split('\n\n').map((paragraph: string, idx: number) => {
            if (!paragraph.trim()) return null
            return (
              <p
                key={idx}
                className={idx === 0 ? "first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-primary" : ""}
              >
                {paragraph}
              </p>
            )
          })}
        </div>

        {/* Author Byline & Protocol Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-5">
          <div className="size-16 rounded-full overflow-hidden border border-primary/40 shrink-0 bg-slate-900">
            <img
              src="/sarrin-holidays-logo.png"
              alt="Sarrin Editorial Desk"
              className="size-full object-cover p-2"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-serif text-base text-white font-medium">Sarrin Holidays Editorial Desk</span>
            </div>
            <p className="text-xs text-foreground/70 leading-relaxed font-light">
              Authored in collaboration with royal historians, regional palace concierges, and private aviation advisors across Rajasthan, Kerala, and Uttarakhand.
            </p>
          </div>
        </div>

        {/* Related Tour Package Card (High Intent CTA) */}
        {relatedPackage && (
          <div className="mt-16 pt-12 border-t border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
                  Connected Expedition
                </span>
                <h3 className="font-serif text-2xl text-white font-medium mt-1">
                  Experience This Journey Firsthand
                </h3>
              </div>
              <Link
                href={`/packages/${relatedPackage.slug}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:underline cursor-pointer"
              >
                <span>View Full Itinerary</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <Link
              href={`/packages/${relatedPackage.slug}`}
              className="group flex flex-col sm:flex-row gap-6 p-5 rounded-2xl border border-white/10 bg-slate-900/50 hover:border-primary/50 transition-all hover:bg-slate-900/80 cursor-pointer overflow-hidden shadow-xl"
            >
              <div className="relative sm:w-56 aspect-[16/10] sm:aspect-auto rounded-xl overflow-hidden shrink-0">
                <img
                  src={relatedPackage.featured_image}
                  alt={relatedPackage.title}
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-primary mb-2">
                    <MapPin className="size-3" />
                    <span>{(relatedPackage.destinations || []).join(' • ')}</span>
                  </div>
                  <h4 className="font-serif text-xl text-white font-semibold group-hover:text-primary transition-colors mb-2">
                    {relatedPackage.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-foreground/70 line-clamp-2 font-light">
                    {relatedPackage.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 mt-3 border-t border-white/10 text-xs">
                  <span className="font-mono text-neutral-400">Duration: {relatedPackage.duration}</span>
                  <span className="font-serif font-semibold text-white">
                    ₹{(relatedPackage.price < 10000 ? relatedPackage.price * 100 : relatedPackage.price).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}
      </article>
    </main>
  )
}
