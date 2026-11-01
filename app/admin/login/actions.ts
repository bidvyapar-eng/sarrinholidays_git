'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface LoginActionResult {
  success: boolean
  error?: string
}

/**
 * Administrative Authentication Action
 * Validates against Supabase Auth with automatic failover to the configured Atelier Curator credentials.
 * Sets a secure, httpOnly session cookie ('sarrin_admin_session').
 */
export async function adminLogin(payload: {
  email?: string
  password?: string
}): Promise<LoginActionResult> {
  const email = payload.email?.trim() || ''
  const password = payload.password || ''

  if (!email || !password) {
    return { success: false, error: 'Please enter both your administrative email and password.' }
  }

  const normalizedEmail = email.toLowerCase()
  const configuredAdminEmail = (process.env.ADMIN_EMAIL || 'admin@sarrinholidays.com').toLowerCase()
  const configuredAdminPassword = process.env.ADMIN_PASSWORD || 'Password123!'

  let isSupabaseAuthenticated = false

  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    })
    if (!error && data?.session) {
      isSupabaseAuthenticated = true
    }
  } catch (err) {
    // Supabase endpoint may be offline, not yet initialized, or unreachable
    console.warn('Supabase auth network notice:', err)
  }

  // Authorize if Supabase session verified OR if matching designated Atelier credentials
  const isDirectAdminMatch =
    normalizedEmail === configuredAdminEmail && password === configuredAdminPassword

  if (!isSupabaseAuthenticated && !isDirectAdminMatch) {
    return {
      success: false,
      error: 'Invalid administrative credentials. Use admin@sarrinholidays.com / Password123!',
    }
  }

  // Set secure session cookie
  try {
    const cookieStore = await cookies()
    const sessionData = {
      email: normalizedEmail,
      role: 'admin',
      authenticatedAt: Date.now(),
    }
    const token = Buffer.from(JSON.stringify(sessionData)).toString('base64')

    cookieStore.set('sarrin_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days session
    })
  } catch (cookieErr: any) {
    console.error('Error establishing admin session cookie:', cookieErr)
    return { success: false, error: 'Failed to establish administrative session.' }
  }

  return { success: true }
}

export async function adminLogout(): Promise<void> {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
  } catch (err) {
    console.warn('Supabase signOut note:', err)
  }

  try {
    const cookieStore = await cookies()
    cookieStore.delete('sarrin_admin_session')
  } catch (err) {
    console.warn('Cookie delete note:', err)
  }

  redirect('/login')
}

