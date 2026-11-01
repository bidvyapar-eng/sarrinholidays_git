// Full Cross-Check of All Systems on Sarrin Holidays Website
const BASE_URL = 'http://localhost:999';

// 1. All Canonical Public Routes
const PUBLIC_ROUTES = [
  // Homepage
  { path: '/', label: 'Home Page' },
  
  // Packages Hub & All Curated Expeditions (Real Commercial Inventory & Heritage)
  { path: '/packages', label: 'Packages Hub (Catalog)' },
  { path: '/packages/kerala-gods-own-country-8d', label: 'Package: Kerala 8D Grand Circuit' },
  { path: '/packages/kerala-backwaters-hills-5d', label: 'Package: Kerala Backwaters & Hills 5D' },
  { path: '/packages/kashmir-paradise-valleys-7d', label: 'Package: Kashmir & Gulmarg 7D' },
  { path: '/packages/blissful-goa-beach-getaway-4d', label: 'Package: Blissful Goa 4D' },
  { path: '/packages/experience-varanasi-dev-deepawali-3d', label: 'Package: Varanasi Dev Deepawali 3D' },
  { path: '/packages/royal-rajasthan-tour', label: 'Package: Royal Rajasthan' },
  { path: '/packages/kerala-houseboat-retreat', label: 'Package: Kerala Backwaters Legacy' },
  { path: '/packages/himalayan-wellness-escapade', label: 'Package: Himalayan Wellness' },
  { path: '/packages/wild-untamed-tiger-safari', label: 'Package: Royal Tiger Safari' },
  
  // Brand Favicons & Icons (Zero v0)
  { path: '/favicon.ico', label: 'Brand Multi-Res ICO' },
  { path: '/icon-32x32.png', label: 'Brand 32x32 PNG Tab Icon' },
  { path: '/apple-icon.png', label: 'Brand Apple Touch Icon' },
  { path: '/icon.svg', label: 'Brand SVG Icon' },
  
  // Services Hub & All 4 Bespoke Services
  { path: '/services', label: 'Services Hub' },
  { path: '/services/private-aviation-charters', label: 'Service: Private Aviation' },
  { path: '/services/royal-celebrations-weddings', label: 'Service: Royal Celebrations' },
  { path: '/services/wellness-ayurveda-sanctuaries', label: 'Service: Wellness & Ayurveda' },
  { path: '/services/vip-chauffeur-security', label: 'Service: VIP Chauffeur & Security' },
  
  // Blog Magazine & All 3 Curated Essays
  { path: '/blog', label: 'The Journal / Blog Magazine' },
  { path: '/blog/rajasthan-heritage-palaces', label: 'Article: Rajasthan Heritage' },
  { path: '/blog/kerala-slow-solitude', label: 'Article: Kerala Slow Solitude' },
  { path: '/blog/himalayan-wellness-sanctuary', label: 'Article: Himalayan Sanctuary' },
  
  // Press, About, Contact & Auth
  { path: '/about', label: 'About Atelier Page' },
  { path: '/press', label: 'Press Room & Media Kit' },
  { path: '/contact', label: 'Concierge Contact Desk' },
  { path: '/login', label: 'Admin VIP Login Portal' },
  
  // Off-Page SEO, Feeds & Technical Endpoints
  { path: '/robots.txt', label: 'Robots.txt Directives' },
  { path: '/sitemap.xml', label: 'Dynamic XML Sitemap' },
  { path: '/feed.xml', label: 'Dynamic RSS 2.0 Feed' },
  { path: '/rss.xml', label: 'RSS Feed Alias' },
  { path: '/llms.txt', label: 'LLM Search Context (llms.txt)' },
];

// 2. Backward-Compatible Redirect Routes
const REDIRECT_ROUTES = [
  { path: '/journal', expectedTarget: '/blog', label: 'Legacy /journal -> /blog' },
  { path: '/journal/rajasthan-heritage-palaces', expectedTarget: '/blog/rajasthan-heritage-palaces', label: 'Legacy /journal/[slug] -> /blog/[slug]' }
];

// 3. Protected Admin Routes (Must Redirect Unauthenticated Users)
const PROTECTED_ROUTES = [
  { path: '/admin', label: 'Admin Dashboard' },
  { path: '/admin/packages', label: 'Admin Packages Manager' },
  { path: '/admin/inquiries', label: 'Admin Inquiries CRM' }
];

async function runCrossCheck() {
  console.log('========================================================================');
  console.log('         SARRIN HOLIDAYS — 100% EXHAUSTIVE SYSTEM CROSS-CHECK           ');
  console.log(`         Target: ${BASE_URL} | Timestamp: ${new Date().toISOString()} `);
  console.log('========================================================================\n');

  let passed = 0;
  let failed = 0;
  const timings = [];

  // 1. PUBLIC ROUTES
  console.log('--- SYSTEM 1: CANONICAL PUBLIC ROUTES (Target: HTTP 200 OK) ---');
  for (const { path, label } of PUBLIC_ROUTES) {
    const start = performance.now();
    try {
      const res = await fetch(`${BASE_URL}${path}`);
      const duration = Math.round(performance.now() - start);
      timings.push(duration);
      const text = await res.text();
      const hasContent = text.length > 50;

      if (res.status === 200 && hasContent) {
        console.log(`[PASS] HTTP ${res.status} | ${duration.toString().padStart(4)}ms | ${text.length.toString().padStart(6)} B | ${label} (${path})`);
        passed++;
      } else {
        console.error(`[FAIL] HTTP ${res.status} | ${duration.toString().padStart(4)}ms | ${text.length.toString().padStart(6)} B | ${label} (${path})`);
        failed++;
      }
    } catch (err) {
      const duration = Math.round(performance.now() - start);
      console.error(`[ERR]  FAILED   | ${duration.toString().padStart(4)}ms | ${label} (${path}) -> ${err.message}`);
      failed++;
    }
  }

  // 2. REDIRECT ROUTES
  console.log('\n--- SYSTEM 2: PERMANENT & TEMPORARY REDIRECTS (Target: HTTP 307/308) ---');
  for (const { path, expectedTarget, label } of REDIRECT_ROUTES) {
    const start = performance.now();
    try {
      const res = await fetch(`${BASE_URL}${path}`, { redirect: 'manual' });
      const duration = Math.round(performance.now() - start);
      const location = res.headers.get('location') || '';
      const isRedirect = [301, 302, 307, 308].includes(res.status);
      const matchesTarget = location.includes(expectedTarget);

      if (isRedirect && matchesTarget) {
        console.log(`[PASS] HTTP ${res.status} | ${duration.toString().padStart(4)}ms | ${label} -> ${location}`);
        passed++;
      } else {
        console.error(`[FAIL] HTTP ${res.status} | Expected Redirect to ${expectedTarget}, Got: ${location}`);
        failed++;
      }
    } catch (err) {
      console.error(`[ERR]  FAILED   | ${label} -> ${err.message}`);
      failed++;
    }
  }

  // 3. PROTECTED ADMIN ROUTES
  console.log('\n--- SYSTEM 3: AUTH MIDDLEWARE GUARD (Target: HTTP 307 -> /login) ---');
  for (const { path, label } of PROTECTED_ROUTES) {
    const start = performance.now();
    try {
      const res = await fetch(`${BASE_URL}${path}`, { redirect: 'manual' });
      const duration = Math.round(performance.now() - start);
      const location = res.headers.get('location') || '';
      const isRedirect = [301, 302, 307, 308].includes(res.status);
      const redirectedToLogin = location.includes('/login');

      if (isRedirect && redirectedToLogin) {
        console.log(`[PASS] HTTP ${res.status} | ${duration.toString().padStart(4)}ms | ${label} (${path}) -> ${location}`);
        passed++;
      } else {
        console.error(`[FAIL] HTTP ${res.status} | Expected Redirect to /login, Got: ${location}`);
        failed++;
      }
    } catch (err) {
      console.error(`[ERR]  FAILED   | ${label} -> ${err.message}`);
      failed++;
    }
  }

  // Performance stats
  const avgTiming = Math.round(timings.reduce((a, b) => a + b, 0) / (timings.length || 1));
  const maxTiming = Math.max(...timings);

  console.log('\n========================================================================');
  console.log(`CROSS-CHECK RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log(`PERFORMANCE STATS: Avg Response Time = ${avgTiming}ms | Max Time = ${maxTiming}ms`);
  console.log('========================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runCrossCheck();
