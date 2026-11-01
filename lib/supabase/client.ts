import { createBrowserClient } from '@supabase/ssr'

const fastBrowserFetch: typeof fetch = async (input, init) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 1500)
  try {
    const res = await fetch(input, {
      ...init,
      signal: init?.signal || controller.signal,
    })
    return res
  } catch {
    // Return 404 to immediately stop exponential backoff retries in browser
    return new Response(JSON.stringify({ message: 'Host unreachable - fallback active', code: 'PGRST116' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  } finally {
    clearTimeout(timeoutId)
  }
}

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { fetch: fastBrowserFetch },
      auth: { persistSession: true, autoRefreshToken: false },
    }
  )
}
