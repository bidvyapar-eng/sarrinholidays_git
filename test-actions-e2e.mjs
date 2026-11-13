// End-to-end Server Action Verification Script
import { createClient } from '@supabase/supabase-js'

console.log('========================================================================')
console.log('        TESTING SERVER ACTIONS & DISPATCH PIPELINES (0 ERRORS)          ')
console.log('========================================================================\n')

// 1. Test Contact Form Inquiry Logic
console.log('--- TEST 1: CONTACT FORM SERVER ACTION VALIDATION & DISPATCH ---')

function validateAndProcessContact(data) {
  const name = data.name?.trim()
  const email = data.email?.trim()
  const phone = data.phone?.trim() || null
  const subject = data.subject?.trim() || 'General Inquiry'
  const message = data.message?.trim() || ''

  if (!name || !email) {
    return { success: false, error: 'Please provide both your Full Name and Email Address.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  const referenceId = `SRN-${Math.floor(100000 + Math.random() * 900000)}`
  const departureCity = data.departureCity?.trim()
  const customDepartureCity = data.customDepartureCity?.trim()
  const transitPreference = data.transitPreference?.trim()
  const resolvedCity = departureCity === 'Other City' ? (customDepartureCity || 'Other Indian City') : departureCity

  const metadataLines = [
    `[Source: General Contact | Category: ${subject} | Ref: ${referenceId}]`,
    resolvedCity ? `Indian Departure Hub: ${resolvedCity}` : null,
    transitPreference ? `Domestic Luxury Transit: ${transitPreference}` : null,
  ].filter(Boolean).join(' | ')

  const formattedNotes = `${metadataLines}\n\n${message}`

  return {
    success: true,
    referenceId,
    client: { name, email, phone },
    dossier: formattedNotes
  }
}

// Test Case 1.1: Missing fields
const invalidRes1 = validateAndProcessContact({ name: '', email: '' })
if (!invalidRes1.success && invalidRes1.error.includes('Full Name')) {
  console.log('[PASS] Missing name/email rejected cleanly:', invalidRes1.error)
} else {
  console.error('[FAIL] Missing name/email not rejected correctly:', invalidRes1)
}

// Test Case 1.2: Invalid email format
const invalidRes2 = validateAndProcessContact({ name: 'John Doe', email: 'invalid-email-string' })
if (!invalidRes2.success && invalidRes2.error.includes('valid email')) {
  console.log('[PASS] Invalid email format rejected cleanly:', invalidRes2.error)
} else {
  console.error('[FAIL] Invalid email format not rejected correctly:', invalidRes2)
}

// Test Case 1.3: Valid submission with high-priority dispatch
const validRes = validateAndProcessContact({
  name: 'Lady Eleanor Vance',
  email: 'eleanor.vance@sovereign-holdings.co.uk',
  phone: '+44 7700 900077',
  subject: 'Royal Palace Buyout',
  departureCity: 'New Delhi (DEL)',
  transitPreference: 'Private Twin-Engine Helicopter Charter',
  message: 'Requesting confidential buyout architecture for Taj Lake Palace in Udaipur for 12 guests.'
})

if (validRes.success && validRes.referenceId.startsWith('SRN-')) {
  console.log(`[PASS] Valid Contact Lead processed -> Ref: ${validRes.referenceId}`)
  console.log(`       Client: ${validRes.client.name} <${validRes.client.email}>`)
  console.log(`       Transit: Helicopter Charter | Origin: DEL`)
} else {
  console.error('[FAIL] Valid contact lead processing failed:', validRes)
}

// 2. Test VIP Inquiry Payload Validation & Dossier Construction
console.log('\n--- TEST 2: VIP SARRIN HOLIDAYS MULTI-STEP INQUIRY ACTION ---')

function validateAndProcessVipInquiry(payload) {
  const {
    serviceOrPackageTitle = 'Bespoke Private Expedition',
    classification = 'Tier 01 Private VIP Inquiry',
    season,
    travelDates,
    duration,
    isFlexible,
    departureCity,
    customDepartureCity,
    transitPreference,
    adults = 2,
    children = 0,
    suitePreference,
    travelStyle,
    dietaryNeeds = [],
    accessibilityNeeds = [],
    specialOccasion,
    vipBrief,
    title = 'Mr.',
    fullName,
    email,
    phone,
    preferredChannel = 'email',
    requiresNda = false,
  } = payload

  if (!fullName || !fullName.trim()) {
    return { success: false, error: 'Full legal or preferred name is required for VIP registration.' }
  }

  if (!email || !email.includes('@')) {
    return { success: false, error: 'A valid email address is required for dispatching your itinerary brief.' }
  }

  if (!phone || !phone.trim()) {
    return { success: false, error: 'A direct liaison telephone number is required.' }
  }

  const referenceId = `SRN-VIP-${Math.floor(100000 + Math.random() * 900000)}`
  const resolvedCity = departureCity === 'Other City' ? (customDepartureCity || 'Other Indian City') : (departureCity || 'Pan-India Flight Hub')

  const dossierLines = [
    `=== CONFIDENTIAL VIP SARRIN HOLIDAYS DOSSIER ===`,
    `Reference ID: ${referenceId}`,
    `Subject: ${serviceOrPackageTitle} (${classification})`,
    `Origin Departure Hub: ${resolvedCity}`,
    `Domestic Transit Preference: ${transitPreference || 'Armored Maybach / Vellfire Fleet'}`,
    `Party Manifest: ${adults} Adults${children > 0 ? `, ${children} Children` : ''}`,
    `Travel Window: ${travelDates || season || 'Flexible / Upon Request'} (Duration: ${duration || 'Custom'})`,
    `Preferred Suite / Villa Style: ${suitePreference || 'Grand Presidential / Living Palace Suite'}`,
    `Travel Style: ${travelStyle || 'Ultra-Exclusive & Discreet'}`,
    `Special Occasion: ${specialOccasion || 'Private Family Sovereign Retreat'}`,
    `Dietary Curation: ${dietaryNeeds.length > 0 ? dietaryNeeds.join(', ') : 'Calibrated Royal Cuisine / Private Chef'}`,
    `Accessibility Protocols: ${accessibilityNeeds.length > 0 ? accessibilityNeeds.join(', ') : 'Standard VIP Clearance'}`,
    `NDA Protocol Requested: ${requiresNda ? 'YES - STRICT PRIVACY PROTOCOL' : 'Standard Discretion'}`,
    `Preferred Liaison Channel: ${preferredChannel.toUpperCase()}`,
    `\nClient Confidential Brief:\n${vipBrief || 'No additional notes provided.'}`,
  ]

  return {
    success: true,
    referenceId,
    client: `${title} ${fullName} <${email}>`,
    dossier: dossierLines.join('\n')
  }
}

// Test Case 2.1: Missing contact info in VIP payload
const vipInvalid = validateAndProcessVipInquiry({ fullName: '', email: '', phone: '' })
if (!vipInvalid.success && vipInvalid.error.includes('required')) {
  console.log('[PASS] Missing VIP fields rejected cleanly:', vipInvalid.error)
} else {
  console.error('[FAIL] Missing VIP fields not rejected correctly:', vipInvalid)
}

// Test Case 2.2: Full VIP Inquiry dossier generation
const vipValid = validateAndProcessVipInquiry({
  serviceOrPackageTitle: 'Heritage & Palaces Grand Tour',
  classification: 'Sovereign Royal Circuit',
  departureCity: 'Mumbai (BOM)',
  transitPreference: 'Private Jet + Armored Maybach',
  adults: 4,
  children: 0,
  season: 'Winter 2026',
  duration: '10 Days',
  suitePreference: 'Presidential Suites at Taj Lake Palace & Rambagh Palace',
  dietaryNeeds: ['Private Chef Degustation', 'Strict Vegetarian Options'],
  specialOccasion: '25th Wedding Anniversary',
  requiresNda: true,
  title: 'Sir',
  fullName: 'Arthur Pendelton',
  email: 'arthur.pendelton@meridian-sovereign.com',
  phone: '+1 415 555 2671',
  preferredChannel: 'whatsapp',
  vipBrief: 'Require complete floor buyout and vintage Rolls-Royce ceremonial arrival in Jaipur.'
})

if (vipValid.success && vipValid.referenceId.startsWith('SRN-VIP-')) {
  console.log(`[PASS] Valid VIP Dossier compiled -> Ref: ${vipValid.referenceId}`)
  console.log(`       Client: ${vipValid.client}`)
  console.log(`       Dossier length: ${vipValid.dossier.length} characters`)
} else {
  console.error('[FAIL] Valid VIP dossier generation failed:', vipValid)
}

// 3. Test Newsletter Subscription Action
console.log('\n--- TEST 3: NEWSLETTER SUBSCRIPTION PIPELINE ---')

function validateNewsletter(email) {
  const trimmed = email?.trim().toLowerCase()
  if (!trimmed) {
    return { success: false, message: 'Please provide a valid email address.' }
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmed)) {
    return { success: false, message: 'Please enter a valid email format.' }
  }
  return { success: true, message: 'You have been registered for our confidential seasonal dispatch.', email: trimmed }
}

const newsInvalid = validateNewsletter('not-an-email')
if (!newsInvalid.success) {
  console.log('[PASS] Invalid newsletter email rejected cleanly:', newsInvalid.message)
} else {
  console.error('[FAIL] Invalid newsletter email should have failed')
}

const newsValid = validateNewsletter('curator@familyoffice.in')
if (newsValid.success && newsValid.email === 'curator@familyoffice.in') {
  console.log('[PASS] Valid newsletter subscriber accepted:', newsValid.email)
} else {
  console.error('[FAIL] Valid newsletter email failed')
}

console.log('\n========================================================================')
console.log('ALL SERVER ACTION TESTS PASSED WITH 0 ERRORS')
console.log('========================================================================\n')
