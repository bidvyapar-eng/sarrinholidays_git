import { supabase } from "@/lib/supabaseClient"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
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

  return (
    <main className="relative min-h-screen bg-background">
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
          {/* Simple plain text rendering that respects line breaks. If using full Markdown in the future, a library like react-markdown would be used here. */}
          {blog.body?.split('\n').map((paragraph: string, idx: number) => (
            <p key={idx} className="mb-6">{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  )
}
