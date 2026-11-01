import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

let isHostLive: boolean | null = null
let lastCheckedTime = 0

async function checkHostLive(hostname: string): Promise<boolean> {
  const now = Date.now()
  if (isHostLive !== null && now - lastCheckedTime < 60000) return isHostLive

  try {
    const dns = await import('dns')
    return new Promise<boolean>((resolve) => {
      dns.resolve4(hostname, (err, addrs) => {
        isHostLive = !err && !!addrs?.length
        lastCheckedTime = Date.now()
        resolve(isHostLive)
      })
    })
  } catch {
    isHostLive = false
    lastCheckedTime = Date.now()
    return false
  }
}

const fastServerFetch: typeof fetch = async (input, init) => {
  try {
    const hostname = new URL(input.toString()).hostname
    if (hostname) {
      const isLive = await checkHostLive(hostname)
      if (!isLive) {
        return new Response(JSON.stringify({ message: 'Host unreachable', code: 'PGRST116' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    }
  } catch {}

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 1200)

  try {
    const res = await fetch(input, {
      ...init,
      signal: init?.signal || controller.signal,
    })
    isHostLive = true
    lastCheckedTime = Date.now()
    return res
  } catch {
    isHostLive = false
    lastCheckedTime = Date.now()
    return new Response(JSON.stringify({ message: 'Host unreachable', code: 'PGRST116' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  } finally {
    clearTimeout(timeoutId)
  }
}

/**
 * Creates a Supabase client for Server Components, Server Actions, and Route Handlers.
 * Automatically synchronizes auth session tokens with Next.js cookies.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { fetch: fastServerFetch },
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    }
  )
}
