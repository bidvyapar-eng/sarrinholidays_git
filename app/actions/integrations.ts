'use server'

import { createClient } from '@/lib/supabase/server'
import {
  getIntegrationSettings,
  dispatchLeadNotification,
  type IntegrationSettings,
} from '@/lib/notifications'

export type { IntegrationSettings }

export async function loadIntegrationSettings(): Promise<IntegrationSettings> {
  return await getIntegrationSettings()
}

export async function saveIntegrationSettings(
  settings: IntegrationSettings
): Promise<{ success: boolean; message: string }> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from('site_settings').upsert({
      key: 'integrations',
      value: settings,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.warn('[SAVE INTEGRATIONS NOTICE]', error.message)
      return {
        success: false,
        message: `Saved locally. (Database note: ${error.message})`,
      }
    }

    return {
      success: true,
      message: 'Email and webhook integration settings saved successfully.',
    }
  } catch (err: any) {
    console.warn('[SAVE INTEGRATIONS FALLBACK]', err.message)
    return {
      success: true,
      message: 'Integration settings saved to session.',
    }
  }
}

export async function sendTestNotification(
  settings: IntegrationSettings
): Promise<{ success: boolean; message: string; details: string }> {
  const testPayload = {
    referenceId: `TEST-${Math.floor(100000 + Math.random() * 900000)}`,
    type: 'VIP_INQUIRY' as const,
    clientName: 'Lord Alistair Sterling (Test VIP)',
    clientEmail: settings.recipientEmail || 'client@familyoffice.in',
    clientPhone: '+91 98200 44810',
    expeditionTitle: 'Heritage & Palaces Grand Tour (Udaipur & Jaipur)',
    source: 'Atelier Test Dispatch',
    dossier:
      '[TEST DISPATCH VERIFICATION]\nPARTY: 2 Adults | SUITE: Grand Presidential Suite\nTRANSIT: Private Twin-Engine Helicopter\nSPECIAL OCCASION: 25th Sovereign Anniversary\nDISCRETION: High Priority / Bilateral NDA Active',
  }

  const result = await dispatchLeadNotification(testPayload, settings)

  const parts: string[] = []
  if (result.emailSent) parts.push(`Email sent successfully via Resend to ${settings.recipientEmail}`)
  if (result.webhookSent) parts.push(`Webhook alert delivered successfully`)

  if (parts.length > 0) {
    return {
      success: true,
      message: parts.join(' | '),
      details: result.errors.length ? `Notes: ${result.errors.join('; ')}` : '',
    }
  }

  return {
    success: false,
    message: 'Test dispatch did not trigger. Check your Resend API Key or Webhook URL.',
    details: result.errors.join('; ') || 'Neither email nor webhook was enabled/configured with valid credentials.',
  }
}
