/**
 * Sarrin Holidays — High-Touch VIP Dispatch & Alert Pipeline
 * Supports Resend Transactional Email & Universal Webhooks (Slack, Discord, Zapier, Custom CRM)
 */

import { createClient } from '@/lib/supabase/server'

export interface IntegrationSettings {
  emailEnabled: boolean
  recipientEmail: string
  resendApiKey: string
  fromEmail: string
  webhookEnabled: boolean
  webhookUrl: string
}

export const defaultIntegrationSettings: IntegrationSettings = {
  emailEnabled: false,
  recipientEmail: 'help@sarrinholidays.com',
  resendApiKey: '',
  fromEmail: 'Sarrin Holidays <onboarding@resend.dev>',
  webhookEnabled: false,
  webhookUrl: '',
}

export interface DispatchLeadPayload {
  referenceId: string
  type: 'VIP_INQUIRY' | 'CONTACT_FORM'
  clientName: string
  clientEmail: string
  clientPhone?: string | null
  expeditionTitle?: string
  dossier: string
  source?: string
  timestamp?: string
}

/**
 * Fetch active integration settings from Supabase (key: 'integrations') with environment variable fallbacks
 */
export async function getIntegrationSettings(): Promise<IntegrationSettings> {
  let dbSettings: Partial<IntegrationSettings> = {}

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'integrations')
      .maybeSingle()

    if (data?.value && typeof data.value === 'object') {
      dbSettings = data.value as Partial<IntegrationSettings>
    }
  } catch {
    // Non-blocking fallback
  }

  const resendApiKey =
    process.env.RESEND_API_KEY ||
    dbSettings.resendApiKey ||
    defaultIntegrationSettings.resendApiKey

  const recipientEmail =
    process.env.NOTIFICATION_EMAIL ||
    dbSettings.recipientEmail ||
    defaultIntegrationSettings.recipientEmail

  const fromEmail =
    process.env.NOTIFICATION_FROM_EMAIL ||
    dbSettings.fromEmail ||
    defaultIntegrationSettings.fromEmail

  const webhookUrl =
    process.env.LEAD_DISPATCH_WEBHOOK ||
    dbSettings.webhookUrl ||
    defaultIntegrationSettings.webhookUrl

  const emailEnabled =
    typeof dbSettings.emailEnabled === 'boolean'
      ? dbSettings.emailEnabled
      : Boolean(resendApiKey)

  const webhookEnabled =
    typeof dbSettings.webhookEnabled === 'boolean'
      ? dbSettings.webhookEnabled
      : Boolean(webhookUrl)

  return {
    emailEnabled,
    recipientEmail,
    resendApiKey,
    fromEmail,
    webhookEnabled,
    webhookUrl,
  }
}

/**
 * Dispatch lead to Resend Email and/or External Webhook
 */
export async function dispatchLeadNotification(
  payload: DispatchLeadPayload,
  overrideSettings?: IntegrationSettings
): Promise<{ emailSent: boolean; webhookSent: boolean; errors: string[] }> {
  const settings = overrideSettings || (await getIntegrationSettings())
  const errors: string[] = []
  let emailSent = false
  let webhookSent = false

  const timeString = payload.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

  // 1. Resend Email Dispatch
  if (settings.emailEnabled && settings.resendApiKey) {
    try {
      const emailHtml = `
        <div style="background-color: #050811; color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #0b1120; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
            <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: center;">
              <span style="font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #d4af37; font-weight: 600;">Sarrin Holidays • Confidential Lead Dispatch</span>
              <h1 style="margin: 8px 0 0 0; font-size: 22px; font-weight: 300; color: #ffffff;">${payload.type === 'VIP_INQUIRY' ? 'VIP Bespoke Expedition Brief' : 'New Client Consultation'}</h1>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8; font-family: monospace;">Reference ID: <strong style="color: #f1f5f9;">${payload.referenceId}</strong></p>
            </div>
            
            <div style="padding: 28px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 13px; width: 140px;">Client Name:</td>
                  <td style="padding: 8px 0; color: #f8fafc; font-size: 14px; font-weight: 600;">${payload.clientName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Primary Email:</td>
                  <td style="padding: 8px 0; color: #38bdf8; font-size: 14px;"><a href="mailto:${payload.clientEmail}" style="color: #38bdf8; text-decoration: none;">${payload.clientEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Telephone / WhatsApp:</td>
                  <td style="padding: 8px 0; color: #f8fafc; font-size: 14px; font-family: monospace;">${payload.clientPhone || 'Not provided'}</td>
                </tr>
                ${payload.expeditionTitle ? `
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Target Expedition:</td>
                  <td style="padding: 8px 0; color: #d4af37; font-size: 14px; font-weight: 500;">${payload.expeditionTitle}</td>
                </tr>` : ''}
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Reception Hub:</td>
                  <td style="padding: 8px 0; color: #cbd5e1; font-size: 12px; font-family: monospace;">${payload.source || 'Website'} • ${timeString}</td>
                </tr>
              </table>

              <div style="background-color: #030712; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 18px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #d4af37;">Curator Dossier & Specifications</h3>
                <pre style="margin: 0; white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.6; color: #e2e8f0;">${payload.dossier}</pre>
              </div>

              <div style="text-align: center; padding-top: 8px;">
                <a href="mailto:${payload.clientEmail}?subject=Re:%20Sarrin%20Holidays%20Bespoke%20Curation%20[${payload.referenceId}]" style="display: inline-block; background-color: #d4af37; color: #000000; padding: 12px 28px; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 9999px; letter-spacing: 0.05em;">Reply Directly to Client</a>
              </div>
            </div>

            <div style="background-color: #030712; padding: 16px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); font-size: 11px; color: #64748b;">
              Sarrin Holidays Operations Dispatch • UDYAM-MH-23-0433487 • Nashik, Maharashtra
            </div>
          </div>
        </div>
      `

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${settings.resendApiKey.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: settings.fromEmail || 'Sarrin Holidays <onboarding@resend.dev>',
          to: [settings.recipientEmail.trim()],
          subject: `[${payload.type === 'VIP_INQUIRY' ? 'VIP DOSSIER' : 'LEAD'}] ${payload.referenceId} — ${payload.clientName}`,
          html: emailHtml,
        }),
      })

      if (res.ok) {
        emailSent = true
      } else {
        const errorData = await res.json().catch(() => ({}))
        const msg = `Resend API Error (${res.status}): ${errorData.message || res.statusText}`
        console.warn('[NOTIFICATIONS]', msg)
        errors.push(msg)
      }
    } catch (e: any) {
      const msg = `Resend Network Error: ${e.message}`
      console.warn('[NOTIFICATIONS]', msg)
      errors.push(msg)
    }
  }

  // 2. Webhook Dispatch (Universal for Slack / Discord / Zapier)
  if (settings.webhookEnabled && settings.webhookUrl) {
    try {
      const webhookPayload = {
        text: `*New Sarrin Holidays Lead: ${payload.referenceId}*\n*Client:* ${payload.clientName} (${payload.clientEmail} | ${payload.clientPhone || 'N/A'})\n*Expedition:* ${payload.expeditionTitle || 'General'}\n*Source:* ${payload.source || 'Website'}\n\`\`\`\n${payload.dossier}\n\`\`\``,
        referenceId: payload.referenceId,
        type: payload.type,
        client: {
          name: payload.clientName,
          email: payload.clientEmail,
          phone: payload.clientPhone,
        },
        expeditionTitle: payload.expeditionTitle,
        dossier: payload.dossier,
        timestamp: timeString,
      }

      const res = await fetch(settings.webhookUrl.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookPayload),
      })

      if (res.ok) {
        webhookSent = true
      } else {
        const msg = `Webhook Error HTTP ${res.status}: ${res.statusText}`
        console.warn('[NOTIFICATIONS]', msg)
        errors.push(msg)
      }
    } catch (e: any) {
      const msg = `Webhook Network Error: ${e.message}`
      console.warn('[NOTIFICATIONS]', msg)
      errors.push(msg)
    }
  }

  return { emailSent, webhookSent, errors }
}

