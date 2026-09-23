import { supabase } from "@/lib/supabaseClient"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"

export const dynamic = 'force-dynamic'

interface BlogPostProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const resolvedParams = await params

  const { data: blog } = await supabase
    .from('journal_posts')
    .select('title, excerpt, image_url')
    .eq('slug', resolvedParams.slug)
    .maybeSingle()

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
          alt: blog.title,
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

export default async function BlogPost({ params }: BlogPostProps) {
  const resolvedParams = await params
  
  const { data: settings } = await supabase
    .from('site_settings')
    .select('navbar_logo_text')
    .limit(1)
    .single()

  const { data: blog, error } = await supabase
    .from('journal_posts')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single()

  if (error || !blog) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarrinholidays.com'

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${siteUrl}/blog/${resolvedParams.slug}#article`,
    headline: blog.title,
    description: blog.excerpt,
    image: blog.image_url ? [blog.image_url] : [],
    datePublished: blog.created_at,
    dateModified: blog.updated_at || blog.created_at,
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
    <main className="relative min-h-screen bg-background">
      <JsonLd data={articleSchema} id="article-schema" />
      <Navbar logoText={settings?.navbar_logo_text} />
      
      <article className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl">
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-primary transition-colors mb-8">
          <ArrowLeft className="size-4 mr-2" /> Back to Journal
        </Link>
        
        <header className="mb-12">
          <div className="text-primary font-medium tracking-widest text-xs uppercase mb-4">
            {blog.category || new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight text-foreground mb-6">
            {blog.title}
          </h1>
          {blog.excerpt && (
            <p className="text-xl text-foreground/70 leading-relaxed max-w-3xl">
              {blog.excerpt}
            </p>
          )}
        </header>

        {blog.image_url && (
          <div className="relative aspect-video rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl">
            <img 
              src={blog.image_url} 
              alt={blog.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none text-foreground/80 font-sans prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          {/* Simple plain text rendering that respects line breaks */}
          {blog.body?.split('\n').map((paragraph: string, idx: number) => (
            <p key={idx} className="mb-6">{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  )
}
