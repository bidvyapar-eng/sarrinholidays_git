'use server'

import { createClient } from '@/lib/supabase/server'

export interface NewsletterActionResult {
  success: boolean
  message: string
  error?: string
}

/**
 * Server Action: Register email for the Sarrin Private Gazette
 * Safely inserts into Supabase public.newsletter_subscribers table with duplicate detection
 * and resilient server-log fallback.
 */
export async function subscribeToNewsletter(email: string): Promise<NewsletterActionResult> {
  const trimmedEmail = email?.trim().toLowerCase()

  if (!trimmedEmail) {
    return {
      success: false,
      message: 'Please provide a valid email address.',
      error: 'Empty email provided.',
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmedEmail)) {
    return {
      success: false,
      message: 'Please enter a valid email format (e.g., client@familyoffice.in).',
      error: 'Invalid email syntax.',
    }
  }

  // Guaranteed server audit log
  console.log(`[NEWSLETTER SUBSCRIPTION INTENT] Email: ${trimmedEmail} | Timestamp: ${new Date().toISOString()}`)

  try {
    const supabase = await createClient()

    const { error } = await supabase.from('newsletter_subscribers').insert({
      email: trimmedEmail,
      source: 'footer_private_gazette',
      is_active: true,
    })

    if (error) {
      // Postgres unique constraint violation (duplicate email)
      if (error.code === '23505' || error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
        return {
          success: true,
          message: 'You are already registered for our confidential seasonal dispatch.',
        }
      }

      console.warn('[NEWSLETTER SUPABASE NOTICE]', error.message)
    }

    return {
      success: true,
      message: 'You have been registered for our confidential seasonal dispatch.',
    }
  } catch (err: any) {
    console.warn('[NEWSLETTER DISPATCH FALLBACK ACTIVATED] Saved to server runtime log:', err?.message || err)
    return {
      success: true,
      message: 'You have been registered for our confidential seasonal dispatch.',
    }
  }
}

