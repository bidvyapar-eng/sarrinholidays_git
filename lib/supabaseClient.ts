import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tyspjymmurdtkblpghab.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_dummy'

// Universal instant circuit breaker to eliminate 14-second network stalls on invalid/offline Supabase hosts
let isHostLive: boolean | null = null
let lastCheckedTime = 0
const COOLDOWN_MS = 60000 // 60s cooldown

async function checkHostLive(hostname: string): Promise<boolean> {
  const now = Date.now()
  if (isHostLive !== null && now - lastCheckedTime < COOLDOWN_MS) {
    return isHostLive
  }

  if (typeof window === 'undefined') {
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

  return true
}

const fastFetch: typeof fetch = async (input, init) => {
  let hostname = ''
  try {
    hostname = new URL(input.toString()).hostname
  } catch {}

  if (hostname) {
    const isLive = await checkHostLive(hostname)
    if (!isLive) {
      // Return 404 response immediately (3ms) to bypass PostgREST's 14-second exponential backoff retry loop
      return new Response(JSON.stringify({ message: 'Host unreachable - instant fallback active', code: 'PGRST116' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 1200)

  try {
    const response = await fetch(input, {
      ...init,
      signal: init?.signal || controller.signal,
    })
    isHostLive = true
    lastCheckedTime = Date.now()
    return response
  } catch {
    isHostLive = false
    lastCheckedTime = Date.now()
    // Return 404 response immediately to stop postgrest retry stalls
    return new Response(JSON.stringify({ message: 'Network error - instant fallback active', code: 'PGRST116' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  } finally {
    clearTimeout(timeoutId)
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  global: { fetch: fastFetch },
})
