'use server'

import { supabase } from '@/lib/supabaseClient'

export interface ContactActionResult {
  success: boolean
  message?: string
  error?: string
  referenceId?: string
}

export async function submitContactInquiry(
  _prevState: ContactActionResult | null,
  formData: FormData
): Promise<ContactActionResult> {
  const name = formData.get('name')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const phone = formData.get('phone')?.toString().trim() || null
  const subject = formData.get('subject')?.toString().trim() || 'General Inquiry'
  const message = formData.get('message')?.toString().trim() || ''

  if (!name || !email) {
    return {
      success: false,
      error: 'Please provide both your Full Name and Email Address.',
    }
  }

  // Basic email pattern validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: 'Please enter a valid email address.',
    }
  }

  const referenceId = `SRN-${Math.floor(100000 + Math.random() * 900000)}`
  
  const departureCity = formData.get('departureCity')?.toString().trim()
  const customDepartureCity = formData.get('customDepartureCity')?.toString().trim()
  const transitPreference = formData.get('transitPreference')?.toString().trim()
  const resolvedCity = departureCity === 'Other City' ? (customDepartureCity || 'Other Indian City') : departureCity

  const metadataLines = [
    `[Source: General Contact | Category: ${subject} | Ref: ${referenceId}]`,
    resolvedCity ? `Indian Departure Hub: ${resolvedCity}` : null,
    transitPreference ? `Domestic Luxury Transit: ${transitPreference}` : null,
  ].filter(Boolean).join(' | ')

  const formattedNotes = `${metadataLines}\n\n${message}`

  try {
    // 1. Attempt insert with dedicated 'source' column
    const { error: primaryError } = await supabase
      .from('inquiries')
      .insert({
        name,
        email,
        phone,
        notes: formattedNotes,
        source: 'General Contact',
      })

    if (!primaryError) {
      return {
        success: true,
        message: 'Your confidential dossier has been transmitted directly to our Chief Operations Desk.',
        referenceId,
      }
    }

    // 2. If 'source' column does not exist yet in schema cache (code PGRST204), fallback to inserting standard columns
    if (primaryError.code === 'PGRST204' || primaryError.message?.includes("'source' column")) {
      console.warn('Supabase inquiries source column pending migration. Falling back to standard schema payload.')
      const { error: fallbackError } = await supabase
        .from('inquiries')
        .insert({
          name,
          email,
          phone,
          notes: formattedNotes,
        })

      if (!fallbackError) {
        return {
          success: true,
          message: 'Your confidential dossier has been transmitted directly to our Chief Operations Desk.',
          referenceId,
        }
      }

      console.error('Supabase inquiries fallback error:', fallbackError)
      return {
        success: false,
        error: fallbackError.message || 'Unable to log inquiry at this moment. Please contact our direct line.',
      }
    }

    console.error('Supabase inquiries primary error:', primaryError)
    return {
      success: false,
      error: primaryError.message || 'An error occurred while submitting. Please call our 24/7 concierge.',
    }
  } catch (err: any) {
    console.error('Server action exception:', err)
    return {
      success: false,
      error: err?.message || 'Unexpected server error occurred. Please try again or reach out directly.',
    }
  }
}
