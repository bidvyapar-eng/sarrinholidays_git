import { supabase } from "@/lib/supabaseClient"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Force dynamic rendering since we are fetching from a database
export const dynamic = 'force-dynamic'

export default async function BlogIndex() {
  const { data: settings } = await supabase
    .from('site_settings')
    .select('navbar_logo_text')
    .limit(1)
    .single()

  const { data: blogs } = await supabase
    .from('journal_posts')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar logoText={settings?.navbar_logo_text} />
      
      <div className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Sarrinholidays Journal</span>
          <h1 className="mt-4 font-serif text-5xl leading-tight tracking-tight text-foreground sm:text-6xl">
            Travel & Curation Insights
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/70">
            Expert perspectives on bespoke luxury travel, itinerary architecture, and industry trends.
          </p>
        </div>

        {(!blogs || blogs.length === 0) ? (
          <div className="text-center text-foreground/50 py-20">
            No journal entries published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link href={`/blog/${blog.slug}`} key={blog.id} className="group flex flex-col h-full rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors overflow-hidden">
                {blog.image_url && (
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={blog.image_url} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-primary mb-3 uppercase tracking-wider">
                    {blog.category || new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h2 className="text-xl font-serif text-foreground mb-3 leading-snug">{blog.title}</h2>
                  <p className="text-foreground/70 text-sm mb-6 flex-1">{blog.excerpt}</p>
                  <div className="flex items-center text-primary text-sm font-medium mt-auto group-hover:underline">
                    Read article <ArrowRight className="size-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
