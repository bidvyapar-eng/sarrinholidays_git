import { supabase } from "@/lib/supabaseClient"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { ArrowRight, BookOpen, Clock, Compass, MapPin } from "lucide-react"
import { fallbackJournalPosts, type JournalPost } from "@/lib/cms"

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'The Sarrin Journal | Bespoke Travel Essays & Curations',
  description: 'Perspectives on royal Indian history, palace buyouts, backwater slow living, and high-altitude Himalayan wellness.',
}

export default async function BlogIndex() {
  // Parallel fetch to eliminate waterfall delays
  const [{ data: settings }, { data: dbBlogs }] = await Promise.all([
    supabase.from('site_settings').select('navbar_logo_text').limit(1).maybeSingle(),
    supabase.from('journal_posts').select('*').eq('is_published', true).order('sort_order', { ascending: true }),
  ])

  const blogs: JournalPost[] = (dbBlogs && dbBlogs.length > 0) ? dbBlogs : fallbackJournalPosts
  const featuredPost = blogs[0]
  const regularPosts = blogs.slice(1)

  return (
    <main className="relative min-h-screen bg-slate-950 text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      <Navbar logoText={settings?.navbar_logo_text} />

      {/* Ambient Atmospheric Glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-primary/10 blur-[150px]" />
      <div className="pointer-events-none absolute top-[700px] -right-32 size-[500px] rounded-full bg-amber-500/5 blur-[130px]" />

      <div className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Magazine Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary shadow-lg shadow-primary/10 mb-4">
            <BookOpen className="size-3.5" />
            <span>The Sarrin Editorial</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight text-foreground">
            Travel &amp; Curation <br className="hidden sm:inline" />
            <span className="italic text-primary font-light">Insights &amp; Dispatches.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-foreground/75 leading-relaxed font-light max-w-2xl mx-auto">
            Essays on living royal heritage, sovereign palace retreats, Ayurvedic sanctuaries, and private expedition design.
          </p>
        </div>

        {/* Featured Cover Story */}
        {featuredPost && (
          <div className="mb-16 sm:mb-20">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group relative block rounded-3xl border border-white/12 bg-white/5 overflow-hidden transition-all duration-700 ease-out hover:border-primary/50 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-black/80"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
                {/* Visual Media Canvas */}
                <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden">
                  <img
                    src={featuredPost.image_url}
                    alt={featuredPost.title}
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:hidden" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center rounded-full border border-amber-500/40 bg-slate-950/80 px-3 py-1 text-xs font-mono uppercase tracking-widest text-amber-300 backdrop-blur-md">
                      Cover Story
                    </span>
                  </div>
                </div>

                {/* Editorial Narrative Column */}
                <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-mono text-primary uppercase tracking-widest mb-4">
                      <span>{featuredPost.category || 'Special Dispatch'}</span>
                      <span className="opacity-40">•</span>
                      <span className="flex items-center gap-1 text-foreground/60">
                        <Clock className="size-3" /> 6 min read
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground font-medium leading-snug group-hover:text-primary transition-colors mb-4">
                      {featuredPost.title}
                    </h2>

                    <p className="text-sm sm:text-base text-foreground/75 leading-relaxed font-light line-clamp-4 mb-6">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-foreground/50">
                      Published {new Date(featuredPost.published_at || featuredPost.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary group-hover:translate-x-1 transition-transform">
                      <span>Read Full Essay</span>
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id || post.slug}
              className="group flex flex-col h-full rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 ease-out hover:border-primary/50 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-black/70 overflow-hidden"
            >
              {post.image_url && (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-slate-950/80 text-primary border border-white/10 backdrop-blur-md">
                      {post.category || 'Dispatch'}
                    </span>
                  </div>
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-foreground/50 mb-3">
                  <span>{new Date(post.published_at || post.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3 text-primary/70" /> 5 min read
                  </span>
                </div>
                <h3 className="font-serif text-xl text-foreground font-semibold mb-3 leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed mb-6 flex-1 line-clamp-3 font-light">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-primary text-xs font-semibold uppercase tracking-wider mt-auto group-hover:translate-x-1 transition-transform">
                  Read dispatch <ArrowRight className="size-3.5 ml-1.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Editorial Footnote Banner */}
        <div className="mt-20 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-slate-900/90 to-primary/5 p-8 sm:p-12 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-primary font-medium">
                Sarrin Curations Desk
              </span>
              <h3 className="mt-2 font-serif text-2xl sm:text-3xl text-white font-medium">
                Seeking a bespoke private expedition?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-foreground/70 max-w-xl font-light">
                Our Chief Curators collaborate with royal family historians, master Ayurvedic doctors, and aviation charters across India.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-[#c5a030] text-primary-foreground px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all shadow-lg shadow-primary/20 shrink-0 cursor-pointer active:scale-95"
            >
              <span>Connect with Concierge</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
