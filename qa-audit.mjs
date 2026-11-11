// Comprehensive End-to-End QA Audit Suite for Sarrin Holidays
import { createClient } from '@supabase/supabase-js'

const BASE_URL = 'http://localhost:999'

async function runQAAudit() {
  console.log('='.repeat(72))
  console.log('        SARRIN HOLIDAYS — COMPREHENSIVE FULL-SITE QA AUDIT')
  console.log(`        Target: ${BASE_URL} | Timestamp: ${new Date().toISOString()}`)
  console.log('='.repeat(72))

  let passed = 0
  let failed = 0

  function assert(condition, testName, detail = '') {
    if (condition) {
      console.log(`[PASS] ${testName} ${detail ? '(' + detail + ')' : ''}`)
      passed++
    } else {
      console.error(`[FAIL] ${testName} ${detail ? '(' + detail + ')' : ''}`)
      failed++
    }
  }

  // 1. PUBLIC ROUTES AUDIT
  console.log('\n--- 1. CANONICAL PUBLIC ROUTES ---')
  const routes = [
    '/',
    '/packages',
    '/packages/kerala-gods-own-country-8d',
    '/packages/kerala-backwaters-hills-5d',
    '/packages/kashmir-paradise-valleys-7d',
    '/packages/blissful-goa-beach-getaway-4d',
    '/packages/experience-varanasi-dev-deepawali-3d',
    '/packages/royal-rajasthan-tour',
    '/packages/kerala-houseboat-retreat',
    '/packages/himalayan-wellness-escapade',
    '/packages/wild-untamed-tiger-safari',
    '/services',
    '/services/private-aviation-charters',
    '/services/royal-celebrations-weddings',
    '/services/wellness-ayurveda-sanctuaries',
    '/services/vip-chauffeur-security',
    '/blog',
    '/blog/rajasthan-heritage-palaces',
    '/blog/kerala-slow-solitude',
    '/blog/himalayan-wellness-sanctuary',
    '/about',
    '/press',
    '/contact',
    '/login',
  ]

  for (const route of routes) {
    const t0 = performance.now()
    const res = await fetch(`${BASE_URL}${route}`)
    const duration = Math.round(performance.now() - t0)
    assert(res.status === 200, `Route: ${route}`, `${res.status} OK in ${duration}ms`)
  }

  // 2. SEO, FEED & MACHINE-READABLE ENDPOINTS
  console.log('\n--- 2. SEO, SYNDICATION & MACHINE CONTEXT ---')
  const metaEndpoints = [
    { path: '/sitemap.xml', type: 'application/xml', check: '<urlset' },
    { path: '/robots.txt', type: 'text/plain', check: 'User-agent:' },
    { path: '/feed.xml', type: 'application/xml', check: '<rss' },
    { path: '/rss.xml', type: 'application/xml', check: '<rss' },
    { path: '/llms.txt', type: 'text/plain', check: 'Sarrin Holidays' },
    { path: '/favicon.ico', type: 'image/x-icon', check: null },
    { path: '/icon-32x32.png', type: 'image/png', check: null },
    { path: '/apple-icon.png', type: 'image/png', check: null },
    { path: '/icon.svg', type: 'image/svg+xml', check: null },
  ]

  for (const ep of metaEndpoints) {
    const res = await fetch(`${BASE_URL}${ep.path}`)
    let valid = res.status === 200
    if (valid && ep.check) {
      const text = await res.text()
      valid = text.toLowerCase().includes(ep.check.toLowerCase())
    }
    assert(valid, `Endpoint: ${ep.path}`, `${res.status}`)
  }

  // 3. 360 VR PANORAMA ASSETS
  console.log('\n--- 3. 360° VR SPATIAL PANORAMA ASSETS ---')
  const panoramas = [
    '/panoramas/taj-mahal-palace.jpg',
    '/panoramas/kerala-houseboat-waters.jpg',
    '/panoramas/luxury-resort-suite.jpg',
  ]
  for (const pano of panoramas) {
    const res = await fetch(`${BASE_URL}${pano}`)
    const len = res.headers.get('content-length')
    assert(res.status === 200 && Number(len) > 1000000, `VR Panorama: ${pano}`, `${(Number(len) / 1024 / 1024).toFixed(2)} MB`)
  }

  // 4. AUTH & SECURITY MIDDLEWARE
  console.log('\n--- 4. AUTHENTICATION & ACCESS CONTROL ---')
  const protectedAdminRoutes = ['/admin', '/admin/packages', '/admin/inquiries']
  for (const adminRoute of protectedAdminRoutes) {
    const res = await fetch(`${BASE_URL}${adminRoute}`, { redirect: 'manual' })
    const isRedirect = res.status === 307 || res.status === 308
    const location = res.headers.get('location') || ''
    assert(isRedirect && location.includes('/login'), `Protected Route: ${adminRoute}`, `Redirects to ${location}`)
  }

  // 5. CLOUD DATABASE (SUPABASE) CONNECTIVITY
  console.log('\n--- 5. SUPABASE CLOUD DATABASE ---')
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tyspjymmurdtkblpghab.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_AhFSsBrNGQ154Ov5h3OprQ_bmgwc7pI'
  const supabase = createClient(supabaseUrl, supabaseKey)

  const dbTables = ['packages', 'services', 'virtual_tours', 'site_settings', 'inquiries', 'journal_posts']
  for (const table of dbTables) {
    const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true })
    assert(!error && count !== null, `Supabase table: ${table}`, `Rows: ${count}`)
  }

  // 6. HOMEPAGE SEO META & ON-PAGE ASSETS
  console.log('\n--- 6. ON-PAGE SEO & BRAND ATTRIBUTES ---')
  const homeRes = await fetch(`${BASE_URL}/`)
  const homeHtml = await homeRes.text()

  assert(homeHtml.includes('Bespoke Indian Expeditions'), 'H1 Presence: Bespoke Indian Expeditions')
  assert(homeHtml.includes('Sovereign Luxury'), 'Sub-brand Headline: Sovereign Luxury')
  assert(homeHtml.includes('Taj &amp; Oberoi') || homeHtml.includes('Taj & Oberoi'), 'Trust Bar: Taj & Oberoi Living Palaces')
  assert(homeHtml.includes('application/ld+json'), 'Structured Data: JSON-LD Schema Present')
  assert(homeHtml.includes('name="viewport"'), 'Mobile Responsive: Viewport Tag Present')

  console.log('\n' + '='.repeat(72))
  console.log(`QA AUDIT COMPLETED: ${passed} PASSED | ${failed} FAILED`)
  console.log('='.repeat(72))
  process.exit(failed > 0 ? 1 : 0)
}

runQAAudit().catch((err) => {
  console.error('Audit crashed:', err)
  process.exit(1)
})
