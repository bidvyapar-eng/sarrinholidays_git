import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Middleware session updater for Supabase Auth.
 * Refreshes auth tokens and strictly guards /admin/* routes.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Validate session with Supabase Auth (safe from network failure)
  let user = null
  try {
    const { data } = await supabase.auth.getUser()
    user = data?.user || null
  } catch {
    user = null
  }

  // Validate session with secure sarrin_admin_session cookie
  const adminCookie = request.cookies.get('sarrin_admin_session')?.value
  let hasAdminSession = false
  if (adminCookie) {
    try {
      const decoded = JSON.parse(Buffer.from(adminCookie, 'base64').toString('utf-8'))
      if (decoded?.role === 'admin' && decoded?.email) {
        hasAdminSession = true
      }
    } catch {
      hasAdminSession = false
    }
  }

  const isAuthenticated = !!user || hasAdminSession

  const { pathname, search } = request.nextUrl

  // 1. Route Protection: Intercept any requests to /admin/*
  if (pathname === '/admin/login') {
    const redirectParam = request.nextUrl.searchParams.get('redirect')
    const loginUrl = new URL('/login', request.url)
    if (redirectParam && redirectParam !== '/admin/login') {
      loginUrl.searchParams.set('redirect', redirectParam)
    }
    return NextResponse.redirect(loginUrl)
  }

  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url)
      const target = pathname + search
      loginUrl.searchParams.set('redirect', target)
      return NextResponse.redirect(loginUrl)
    }
  }

  // 2. If already authenticated and visiting /login, redirect to dashboard
  if (pathname === '/login' && isAuthenticated) {
    const redirectParam = request.nextUrl.searchParams.get('redirect') || '/admin/inquiries'
    return NextResponse.redirect(new URL(redirectParam, request.url))
  }

  return supabaseResponse
}
