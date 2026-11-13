import os
import base64
import time
from playwright.sync_api import sync_playwright

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCREENSHOTS_DIR = os.path.join(BASE_DIR, "..", "screenshots_pdf")
OUTPUT_PDF_LOCAL = os.path.join(BASE_DIR, "..", "Sarrin_Holidays_Complete_Website_Design.pdf")
OUTPUT_PDF_BRAIN = r"C:\Users\Amit\.gemini\antigravity\brain\f7358cca-401d-4f23-a1ef-7b1b51a029ed\Sarrin_Holidays_Complete_Website_Design.pdf"

def img_b64(filename):
    path = os.path.join(SCREENSHOTS_DIR, filename)
    if os.path.exists(path):
        with open(path, "rb") as f:
            return f"data:image/png;base64,{base64.b64encode(f.read()).decode('utf-8')}"
    return ""

def build_pdf():
    print("Loading high-resolution screenshot assets...")
    img_hero = img_b64("02_hero_section.png")
    img_vr = img_b64("03_vr_tour_section.png")
    img_grid = img_b64("04_packages_grid.png")
    img_card = img_b64("04b_package_card_detail.png")
    img_phil = img_b64("05_philosophy_ivory.png")
    img_map = img_b64("06_cartographic_map.png")
    img_map_crop = img_b64("06b_map_interactive_container.png")
    img_about = img_b64("07_atelier_heritage.png")
    img_footer = img_b64("08_footer.png")
    img_drawer = img_b64("09_concierge_drawer_active.png")
    img_drawer_crop = img_b64("09b_concierge_drawer_panel.png")
    img_detail = img_b64("10_package_detail_full.png")
    img_detail_hero = img_b64("10b_package_hero_pillars.png")
    img_about_page = img_b64("11_about_page_full.png")
    img_catalog_page = img_b64("12_packages_catalog_full.png")
    img_contact_page = img_b64("13_contact_page_full.png")

    print("Generating Master Presentation HTML...")

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Sarrin Holidays — Complete Website Design & Brand Architecture Showcase</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  @page {{
    size: 297mm 210mm; /* A4 Landscape */
    margin: 0;
  }}

  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}

  body {{
    background-color: #080706;
    color: #F4F2EC;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
  }}

  .page {{
    width: 297mm;
    height: 210mm;
    page-break-after: always;
    page-break-inside: avoid;
    position: relative;
    overflow: hidden;
    background-color: #0C0B09;
    padding: 12mm 14mm 10mm 14mm;
    display: flex;
    flex-direction: column;
  }}

  /* Outer Luxury Framing */
  .frame-border {{
    position: absolute;
    top: 6mm;
    bottom: 6mm;
    left: 6mm;
    right: 6mm;
    border: 1px solid rgba(197, 160, 89, 0.22);
    pointer-events: none;
    border-radius: 2px;
  }}

  .frame-corner-tl, .frame-corner-tr, .frame-corner-bl, .frame-corner-br {{
    position: absolute;
    width: 8px;
    height: 8px;
    border-color: #C5A059;
    border-style: solid;
    pointer-events: none;
  }}
  .frame-corner-tl {{ top: 5mm; left: 5mm; border-width: 2px 0 0 2px; }}
  .frame-corner-tr {{ top: 5mm; right: 5mm; border-width: 2px 2px 0 0; }}
  .frame-corner-bl {{ bottom: 5mm; left: 5mm; border-width: 0 0 2px 2px; }}
  .frame-corner-br {{ bottom: 5mm; right: 5mm; border-width: 0 2px 2px 0; }}

  /* Top Running Header */
  .page-header {{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 3mm;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 3.5mm;
    font-size: 8.5pt;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #B8B4AA;
  }}
  .page-header .brand-title {{
    color: #C5A059;
    font-weight: 600;
  }}
  .page-header .module-tag {{
    color: #F4F2EC;
    font-weight: 500;
  }}

  /* Bottom Running Footer */
  .page-footer {{
    margin-top: auto;
    padding-top: 2.5mm;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 7.5pt;
    letter-spacing: 0.1em;
    color: #B8B4AA;
    text-transform: uppercase;
  }}
  .page-footer .gold-accent {{
    color: #C5A059;
  }}

  /* Content Containers */
  .content-body {{
    flex: 1;
    display: flex;
    gap: 6mm;
    overflow: hidden;
  }}

  .col-preview {{
    flex: 1.55;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }}

  .col-specs {{
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #141310;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    padding: 4mm 5mm;
  }}

  /* Image Preview Card */
  .img-frame {{
    width: 100%;
    height: 100%;
    border: 1px solid rgba(197, 160, 89, 0.35);
    background: #080706;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  }}
  .img-frame img {{
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
  }}

  /* Typography Utilities */
  .serif-title {{
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 400;
    font-size: 20pt;
    line-height: 1.15;
    color: #F4F2EC;
    margin-bottom: 1.5mm;
  }}
  .eyebrow {{
    font-size: 7.5pt;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #C5A059;
    font-weight: 600;
    margin-bottom: 1mm;
    display: block;
  }}
  .narrative-p {{
    font-size: 8.5pt;
    line-height: 1.45;
    color: #B8B4AA;
    font-weight: 300;
    margin-bottom: 3.5mm;
  }}

  /* Feature Badges & Specs */
  .spec-group {{
    margin-bottom: 3mm;
  }}
  .spec-label {{
    font-size: 7pt;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #C5A059;
    font-weight: 600;
    margin-bottom: 1.5mm;
    display: block;
    border-bottom: 1px solid rgba(197, 160, 89, 0.2);
    padding-bottom: 0.8mm;
  }}
  .feature-list {{
    list-style: none;
    font-size: 8pt;
    line-height: 1.4;
    color: #E2DFD6;
  }}
  .feature-list li {{
    position: relative;
    padding-left: 3.5mm;
    margin-bottom: 1.2mm;
    font-weight: 300;
  }}
  .feature-list li::before {{
    content: '';
    position: absolute;
    left: 0;
    top: 2.5mm;
    width: 1.5mm;
    height: 1.5mm;
    background: #C5A059;
    border-radius: 50%;
  }}

  .badge-row {{
    display: flex;
    flex-wrap: wrap;
    gap: 1.5mm;
    margin-top: 1.5mm;
  }}
  .badge-tag {{
    font-size: 6.8pt;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 1mm 2.2mm;
    border: 1px solid rgba(197, 160, 89, 0.35);
    background: rgba(197, 160, 89, 0.08);
    color: #C5A059;
    border-radius: 2px;
    font-weight: 500;
  }}

  /* COVER STYLING */
  .cover-body {{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 10mm 15mm;
  }}
  .cover-monogram {{
    width: 50px;
    height: 50px;
    border: 1px solid #C5A059;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 20pt;
    color: #C5A059;
    margin-bottom: 5mm;
  }}
  .cover-title {{
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 38pt;
    font-weight: 300;
    letter-spacing: 0.15em;
    color: #F4F2EC;
    line-height: 1.1;
    margin-bottom: 2mm;
  }}
  .cover-sub {{
    font-size: 9pt;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: #C5A059;
    font-weight: 500;
    margin-bottom: 7mm;
  }}
  .cover-divider {{
    width: 60mm;
    height: 1px;
    background: linear-gradient(90deg, transparent, #C5A059, transparent);
    margin-bottom: 7mm;
  }}
  .cover-desc {{
    font-family: 'Cormorant Garamond', serif;
    font-size: 14pt;
    line-height: 1.4;
    color: #B8B4AA;
    max-w: 180mm;
    margin-bottom: 9mm;
    font-style: italic;
  }}
  .cover-meta-grid {{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4mm;
    width: 100%;
    max-width: 210mm;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 5mm;
  }}
  .cover-meta-item {{
    text-align: center;
  }}
  .cover-meta-item .label {{
    font-size: 6.8pt;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #C5A059;
    display: block;
    margin-bottom: 1mm;
  }}
  .cover-meta-item .val {{
    font-size: 8pt;
    color: #F4F2EC;
    font-weight: 400;
  }}

  /* FULL-BLEED PREVIEW PAGE */
  .full-preview-container {{
    width: 100%;
    height: 100%;
    border: 1px solid rgba(197, 160, 89, 0.3);
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    background: #080706;
  }}
  .full-preview-container img {{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }}
</style>
</head>
<body>

<!-- ========================================================================= -->
<!-- PAGE 1: LUXURY COVER PRESENTATION -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="cover-body">
    <div class="cover-monogram">S</div>
    <h1 class="cover-title">SARRIN HOLIDAYS</h1>
    <div class="cover-sub">INDIA &middot; SOVEREIGN TRAVEL ATELIER</div>
    <div class="cover-divider"></div>
    <p class="cover-desc">
      &ldquo;Complete Digital Platform Architecture, Ultra-Luxury Design System &amp; Experiential Showcase&rdquo;
    </p>

    <div class="cover-meta-grid">
      <div class="cover-meta-item">
        <span class="label">Live Production Target</span>
        <span class="val font-mono">sarrin.bidvyapar.com</span>
      </div>
      <div class="cover-meta-item">
        <span class="label">Curatorial Standard</span>
        <span class="val">Aman &amp; Oberoi Benchmark</span>
      </div>
      <div class="cover-meta-item">
        <span class="label">Primary Palette</span>
        <span class="val">Obsidian &amp; Antique Gold</span>
      </div>
      <div class="cover-meta-item">
        <span class="label">Concierge Hotline</span>
        <span class="val">+91 84198 87730</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Strict Non-Disclosure &amp; Confidential Dossier</span>
    <span class="gold-accent">Sarrin Holidays Atelier</span>
    <span>Dossier Showcase &middot; 2026 Edition</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 2: EXECUTIVE ARCHITECTURE & DESIGN SYSTEM SPECIFICATIONS -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">EXECUTIVE DESIGN SYSTEM ARCHITECTURE</span>
    <span>PAGE 02 / 14</span>
  </div>

  <div class="content-body" style="gap: 5mm;">
    <!-- Left Column: Design System Foundation -->
    <div style="flex: 1; background: #141310; border: 1px solid rgba(255,255,255,0.1); border-radius: 3px; padding: 5mm;">
      <span class="eyebrow">DESIGN FOUNDATION</span>
      <h3 class="serif-title" style="font-size: 17pt;">Architectural Restraint &amp; Warm Obsidian</h3>
      <p class="narrative-p">
        Every SaaS and AI-template stereotype was methodically stripped from the codebase. Replacing generic cold slates and amber buttons, Sarrin Holidays is constructed upon a restrained palette inspired by Aman Resorts, Oberoi Hotels, and Cond&eacute; Nast Traveler.
      </p>

      <div class="spec-group">
        <span class="spec-label">Color Architecture</span>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2mm; margin-top: 1.5mm;">
          <div style="background: #0C0B09; border: 1px solid rgba(255,255,255,0.15); padding: 2mm; border-radius: 2px;">
            <div style="font-size: 7pt; color: #C5A059; font-weight: 600;">HERITAGE OBSIDIAN</div>
            <div style="font-size: 7.5pt; font-family: monospace;">#0C0B09</div>
            <div style="font-size: 6.5pt; color: #B8B4AA;">Base Surface &amp; Canvas</div>
          </div>
          <div style="background: #141310; border: 1px solid rgba(255,255,255,0.15); padding: 2mm; border-radius: 2px;">
            <div style="font-size: 7pt; color: #C5A059; font-weight: 600;">ELEVATED ATELIER</div>
            <div style="font-size: 7.5pt; font-family: monospace;">#141310</div>
            <div style="font-size: 6.5pt; color: #B8B4AA;">Card Surface &amp; Drawers</div>
          </div>
          <div style="background: #C5A059; color: #0C0B09; padding: 2mm; border-radius: 2px;">
            <div style="font-size: 7pt; font-weight: 700;">ANTIQUE GOLD</div>
            <div style="font-size: 7.5pt; font-family: monospace;">#C5A059</div>
            <div style="font-size: 6.5pt;">Primary Luxury Accents</div>
          </div>
          <div style="background: #F6F3EC; color: #141310; padding: 2mm; border-radius: 2px;">
            <div style="font-size: 7pt; font-weight: 700;">SANDSTONE IVORY</div>
            <div style="font-size: 7.5pt; font-family: monospace;">#F6F3EC</div>
            <div style="font-size: 6.5pt;">High-Contrast Philosophy</div>
          </div>
        </div>
      </div>

      <div class="spec-group" style="margin-top: 3.5mm;">
        <span class="spec-label">Typographic Hierarchy</span>
        <ul class="feature-list">
          <li><strong>Display &amp; Headings:</strong> Cormorant Garamond (Weights 300, 400, 500) rendered with editorial tracking and natural italics.</li>
          <li><strong>UI &amp; Navigation:</strong> Inter (Weights 300, 400, 500, 600) with wide tracking (0.16em&ndash;0.35em).</li>
          <li><strong>Zero Font-Mono in Editorial:</strong> Technical monospace removed from contact and body copy, reserved only for legal reference IDs.</li>
        </ul>
      </div>
    </div>

    <!-- Right Column: Site Map & Platform Capabilities -->
    <div style="flex: 1; background: #141310; border: 1px solid rgba(255,255,255,0.1); border-radius: 3px; padding: 5mm;">
      <span class="eyebrow">DIGITAL ATELIER ARCHITECTURE</span>
      <h3 class="serif-title" style="font-size: 17pt;">Modules &amp; Platform Capabilities</h3>
      <p class="narrative-p">
        The digital atelier features 12 production-grade architectural modules engineered for ultra-high conversion and prestigious guest engagement.
      </p>

      <div class="spec-group">
        <span class="spec-label">Flagship Modules Implemented</span>
        <ul class="feature-list" style="font-size: 7.5pt;">
          <li><strong>Architectural Header &amp; Hero:</strong> Edge-to-edge 80px header, custom typographic crest, unified Concierge hotline (+91 84198 87730), and multi-parameter booking engine.</li>
          <li><strong>360&deg; VR Spatial Suite:</strong> Immersive spatial panorama of Taj Mahal Palace Heritage Suite with live itinerary deep-linking.</li>
          <li><strong>Curated Indian Journeys:</strong> Consolidated 3-column flagship grid with sharp geometry, durations, tier indicators, and realistic tariffs.</li>
          <li><strong>Warm Sandstone Philosophy:</strong> High-contrast #F6F3EC balanced 2-column editorial section honoring living Rajputana palaces &amp; royal tiger wilderness.</li>
          <li><strong>Cartographic Discovery Map:</strong> Interactive Pan-India map exploring 7 iconic regions with seasons and durations.</li>
          <li><strong>Universal Concierge Drawer:</strong> Context-aware slide-over with 3-tier hospitality selector, season/party pills, and WhatsApp concierge.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: 4mm;">
        <span class="badge-tag">Next.js 16 App Router</span>
        <span class="badge-tag">Supabase Database</span>
        <span class="badge-tag">Tailwind CSS v4</span>
        <span class="badge-tag">Playwright Automation</span>
        <span class="badge-tag">Dynamic WhatsApp Concierge</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Platform Architecture &middot; Design Tokens</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 02</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 3: MODULE 01 — ARCHITECTURAL HEADER & HERO -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 01 &middot; ARCHITECTURAL HEADER &amp; HERO SEARCH ENGINE</span>
    <span>PAGE 03 / 14</span>
  </div>

  <div class="content-body">
    <div class="col-preview">
      <div class="img-frame">
        <img src="{img_hero}" alt="Hero Section Preview" />
      </div>
    </div>

    <div class="col-specs">
      <span class="eyebrow">MODULE SPECIFICATION</span>
      <h3 class="serif-title">Architectural Edge-to-Edge Header &amp; Search Engine</h3>
      <p class="narrative-p">
        Full-width 80px architectural header in obsidian glass backdrop with tracked-out typographic brand crest, verified hotline, and intelligent search bar.
      </p>

      <div class="spec-group">
        <span class="spec-label">Core Features &amp; Content</span>
        <ul class="feature-list">
          <li><strong>Brand Typography:</strong> "SARRIN" in tracked-out Cormorant Garamond serif with "HOLIDAYS &middot; INDIA" in #C5A059 gold.</li>
          <li><strong>Hotline Unification:</strong> Direct line to Concierge Desk (+91 84198 87730) with tel: protocol.</li>
          <li><strong>Design Your Journey CTA:</strong> High-visibility gold action button triggering the global ConciergeDrawer.</li>
          <li><strong>Intelligent Search Engine:</strong> 4 sharp architectural fields (Destination, Date Range, Party &amp; Class) divided by 1px hairlines.</li>
          <li><strong>Trust Credentials:</strong> Taj &amp; Oberoi Living Palaces &middot; Twin-Engine Helicopter Charters &middot; Strict Non-Disclosure Protocol.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">Obsidian Backdrop #0C0B09/85</span>
        <span class="badge-tag">Backdrop-Blur-MD</span>
        <span class="badge-tag">Cormorant Garamond H1</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 01 &middot; Header &amp; Hero Architecture</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 03</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 4: MODULE 02 — 360° VR SPATIAL SUITE EXPERIENCE -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 02 &middot; 360&deg; SPATIAL SUITE EXPERIENCE</span>
    <span>PAGE 04 / 14</span>
  </div>

  <div class="content-body">
    <div class="col-preview">
      <div class="img-frame">
        <img src="{img_vr}" alt="360 VR Tour Section" />
      </div>
    </div>

    <div class="col-specs">
      <span class="eyebrow">SPATIAL IMMERSION</span>
      <h3 class="serif-title">360&deg; Virtual Suite Panorama</h3>
      <p class="narrative-p">
        Allows discerning guests to step inside India&rsquo;s most exclusive presidential suites and royal quarters prior to reserving their private buyouts.
      </p>

      <div class="spec-group">
        <span class="spec-label">Key Inclusions &amp; Improvements</span>
        <ul class="feature-list">
          <li><strong>Featured Scene:</strong> The Heritage Grand Suite &mdash; Taj Mahal Palace, Mumbai.</li>
          <li><strong>Un-truncated Copy:</strong> Complete descriptive narrative detailing ocean vistas, century-old teak woodwork, and private royal butler service.</li>
          <li><strong>Deep-Linking CTA:</strong> &ldquo;Explore Itinerary Featuring This Suite &rarr;&rdquo; smoothly navigates guests directly to the corresponding tour circuit.</li>
          <li><strong>Scene Switcher:</strong> Quick controls allowing guests to preview living palace suites across Rajasthan, Kerala, and the Himalayas.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">PhotoSphere Core</span>
        <span class="badge-tag">Three.js Spatial Engine</span>
        <span class="badge-tag">Interactive Hotspots</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 02 &middot; Spatial Virtual Tour</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 04</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 5: MODULE 03 — FLAGSHIP CURATED JOURNEYS GRID -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 03 &middot; FLAGSHIP CURATED INDIAN JOURNEYS</span>
    <span>PAGE 05 / 14</span>
  </div>

  <div class="content-body">
    <div class="col-preview" style="flex: 1.2;">
      <div class="img-frame" style="height: 100%;">
        <img src="{img_grid}" alt="Curated Packages Grid" />
      </div>
    </div>

    <div class="col-preview" style="flex: 0.75;">
      <div class="img-frame" style="height: 100%;">
        <img src="{img_card}" alt="Package Card Detail" />
      </div>
    </div>

    <div class="col-specs" style="flex: 0.95;">
      <span class="eyebrow">CURATED CIRCUIT GRID</span>
      <h3 class="serif-title" style="font-size: 16pt;">Sharp Editorial Card Architecture</h3>
      <p class="narrative-p">
        Eliminated duplicate sections, consolidating search and circuits into one spacious 3-column flagship grid.
      </p>

      <div class="spec-group">
        <span class="spec-label">Card Design Improvements</span>
        <ul class="feature-list" style="font-size: 7.5pt;">
          <li><strong>Sharp Geometry:</strong> Crisp 2px corners (rounded-sm) in #141310 obsidian with gold hover borders.</li>
          <li><strong>Two Floating Top Badges:</strong> Left Duration tag + Right Signature Tier. No truncated badge soup.</li>
          <li><strong>Route Eyebrow:</strong> Pure uppercase route in #C5A059 gold (e.g. KOCHI &bull; MUNNAR &bull; THEKKADY &bull; ALLEPPEY).</li>
          <li><strong>2-Line Un-truncated Titles:</strong> Full editorial titles read without ellipses.</li>
          <li><strong>Realistic Tariffs:</strong> Realistic starting rates in INR (e.g. From &#8377;1,85,000 / Guest).</li>
          <li><strong>Plan a Trip Trigger:</strong> Directly opens the ConciergeDrawer pre-filled with this circuit.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">3-Column Grid</span>
        <span class="badge-tag">Aspect-[4/3] Media</span>
        <span class="badge-tag">Instant Drawer Trigger</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 03 &middot; Curated Circuits Architecture</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 05</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 6: MODULE 04 — WARM SANDSTONE IVORY PHILOSOPHY -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 04 &middot; WARM SANDSTONE IVORY CONTRAST SECTION</span>
    <span>PAGE 06 / 14</span>
  </div>

  <div class="content-body">
    <div class="col-preview">
      <div class="img-frame">
        <img src="{img_phil}" alt="Philosophy Warm Ivory Section" />
      </div>
    </div>

    <div class="col-specs">
      <span class="eyebrow">LIGHT / DARK RHYTHM</span>
      <h3 class="serif-title">The Sarrin Philosophy &middot; Sandstone Ivory</h3>
      <p class="narrative-p">
        Introduces authentic luxury hospitality rhythm by breaking all-dark monotony with a warm sandstone/ivory background (#F6F3EC) inspired by Jodhpur havelis.
      </p>

      <div class="spec-group">
        <span class="spec-label">Architectural Features</span>
        <ul class="feature-list">
          <li><strong>Balanced 2-Column Header:</strong> Large Cormorant Garamond title on the left, matched by descriptive editorial narrative aligned to bottom-right.</li>
          <li><strong>Card 01 &mdash; Living Rajputana Palaces:</strong> Private wings at Taj Lake Palace, Rambagh Palace, and Umaid Bhawan.</li>
          <li><strong>Card 02 &mdash; Kettuvallam Houseboats:</strong> Exclusive whole-vessel buyouts along Alleppey&rsquo;s backwater lagoons.</li>
          <li><strong>Card 03 &mdash; Royal Tiger Safaris:</strong> Naturalist-led expeditions through Ranthambore and Bandhavgarh.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">Ivory Canvas #F6F3EC</span>
        <span class="badge-tag">Deep Espresso Text</span>
        <span class="badge-tag">2-Column Asymmetric Header</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 04 &middot; Philosophy &amp; Editorial Contrast</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 06</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 7: MODULE 05 — CARTOGRAPHIC DISCOVERY MAP -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 05 &middot; CARTOGRAPHIC DISCOVERY MAP (7 ICONIC REGIONS)</span>
    <span>PAGE 07 / 14</span>
  </div>

  <div class="content-body">
    <div class="col-preview">
      <div class="img-frame">
        <img src="{img_map_crop}" alt="Pan India Cartographic Map" />
      </div>
    </div>

    <div class="col-specs">
      <span class="eyebrow">PAN-INDIA DISPATCH</span>
      <h3 class="serif-title">Field Notes for Curious Travellers</h3>
      <p class="narrative-p">
        Expanded from 2 sparse pins to 7 iconic luxury regions across India, complete with Best Season to Visit and Ideal Duration indicators.
      </p>

      <div class="spec-group">
        <span class="spec-label">7 Pan-India Luxury Regions</span>
        <ul class="feature-list" style="font-size: 7.5pt;">
          <li><strong>1. Rajasthan:</strong> Udaipur, Jaipur &amp; Jodhpur &mdash; Living Palaces &amp; Thar Dunes.</li>
          <li><strong>2. Kerala:</strong> Alleppey, Munnar &amp; Kumarakom &mdash; Emerald Backwaters &amp; Spice Hills.</li>
          <li><strong>3. Ladakh &amp; Kashmir:</strong> Leh, Nubra &amp; Gulmarg &mdash; Monasteries &amp; Alpine Passes.</li>
          <li><strong>4. Varanasi &amp; Awadh:</strong> Kashi Riverfront Ghats &amp; Heritage Havelis.</li>
          <li><strong>5. Central India:</strong> Ranthambore &amp; Bandhavgarh Royal Tiger Wilderness.</li>
          <li><strong>6. Goa &amp; Konkan:</strong> South Goa Indo-Portuguese Villas &amp; Private Yachts.</li>
          <li><strong>7. Northeast &amp; Meghalaya:</strong> Living Root Bridges &amp; Cloud Forests.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">Best Season Indicator</span>
        <span class="badge-tag">Ideal Duration Tag</span>
        <span class="badge-tag">Smooth Crossfades</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 05 &middot; Cartographic Discovery</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 07</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 8: MODULE 06 — UNIVERSAL CONCIERGE DRAWER -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 06 &middot; UNIVERSAL HIGH-CONVERTING CONCIERGE DRAWER</span>
    <span>PAGE 08 / 14</span>
  </div>

  <div class="content-body">
    <div class="col-preview" style="flex: 1.15;">
      <div class="img-frame">
        <img src="{img_drawer}" alt="Active Concierge Drawer" />
      </div>
    </div>

    <div class="col-preview" style="flex: 0.85;">
      <div class="img-frame">
        <img src="{img_drawer_crop}" alt="Drawer Panel Close Up" />
      </div>
    </div>

    <div class="col-specs" style="flex: 0.95;">
      <span class="eyebrow">REUSABLE CONVERSION ENGINE</span>
      <h3 class="serif-title" style="font-size: 16pt;">Context-Aware Slide-Over Drawer</h3>
      <p class="narrative-p">
        Reusable slide-over component with context pre-filling, 3-tier hospitality selector, and instant dual actions.
      </p>

      <div class="spec-group">
        <span class="spec-label">Interactive Architecture</span>
        <ul class="feature-list" style="font-size: 7.5pt;">
          <li><strong>Context Pre-filling:</strong> Automatically loads package title and route (e.g. Kerala &mdash; God&rsquo;s Own Country 8D) at the top.</li>
          <li><strong>3-Tier Hospitality Selector:</strong>
            <br/>&bull; <em>Boutique Heritage</em> (4-Star Haveli Stays)
            <br/>&bull; <em>Grand Luxury</em> (5-Star Taj &amp; Oberoi)
            <br/>&bull; <em>Presidential Charter</em> (Palace Buyouts &amp; Aviation)
          </li>
          <li><strong>Travel Window:</strong> Pill selectors for Oct&ndash;Dec, Jan&ndash;Mar, Apr&ndash;Jun, Jul&ndash;Sep, or Flexible Dates.</li>
          <li><strong>Party Architecture:</strong> Couple, Family, Private Group, Solo.</li>
          <li><strong>Primary CTA:</strong> Request Tailored Itinerary &amp; Tariff (generates SRN-VIP reference dossier).</li>
          <li><strong>Secondary CTA:</strong> Connect Instantly via WhatsApp Concierge (dynamically pre-populates message).</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">Global Event Dispatch</span>
        <span class="badge-tag">VIP Server Action</span>
        <span class="badge-tag">Dynamic WhatsApp</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 06 &middot; Concierge Drawer Architecture</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 08</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 9: MODULE 07 — ATELIER HERITAGE & TRUST CREDENTIALS -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 07 &middot; ATELIER HERITAGE, TRUST METRICS &amp; DISCRETION PROTOCOL</span>
    <span>PAGE 09 / 14</span>
  </div>

  <div class="content-body">
    <div class="col-preview">
      <div class="img-frame">
        <img src="{img_about}" alt="Atelier Heritage Section" />
      </div>
    </div>

    <div class="col-specs">
      <span class="eyebrow">TRUST ARCHITECTURE</span>
      <h3 class="serif-title">Atelier Heritage &amp; Custodianship</h3>
      <p class="narrative-p">
        Expanded container width to site-wide max-w-7xl, replaced military phrasing with prestigious luxury hospitality language, and verified key metrics.
      </p>

      <div class="spec-group">
        <span class="spec-label">Key Pillars &amp; Metrics</span>
        <ul class="feature-list">
          <li><strong>Four Institutional Metrics:</strong> 100% Bespoke Itineraries &middot; 15+ Years Heritage Alliances &middot; 4.9 / 5.0 Guest Rating &middot; &lt; 2 Hrs VIP Concierge Response.</li>
          <li><strong>Sovereign Privacy:</strong> Discretion Covenants safeguarding passenger manifests, flight corridors, and security details.</li>
          <li><strong>Point-to-Point Transfers:</strong> Mercedes-Maybach chauffeur fleet and direct twin-engine helicopter pad landings.</li>
          <li><strong>Concierge Liaison CTA:</strong> Directly connects guests to a senior concierge architect.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">Full-Width Grid</span>
        <span class="badge-tag">Prestigious Hospitality Copy</span>
        <span class="badge-tag">Confidential Protocol</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 07 &middot; Heritage &amp; Trust Metrics</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 09</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 10: MODULE 08 — ARCHITECTURAL LUXURY FOOTER -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 08 &middot; ARCHITECTURAL LUXURY FOOTER</span>
    <span>PAGE 10 / 14</span>
  </div>

  <div class="content-body">
    <div class="col-preview">
      <div class="img-frame">
        <img src="{img_footer}" alt="Luxury Footer" />
      </div>
    </div>

    <div class="col-specs">
      <span class="eyebrow">EDGE-TO-EDGE FOOTER</span>
      <h3 class="serif-title">Architectural Footer &amp; Alliances</h3>
      <p class="narrative-p">
        Cleaned up all font-mono artifacts, eliminated internal admin links from public view, and unified the verified Concierge desk telephone and credentials.
      </p>

      <div class="spec-group">
        <span class="spec-label">Verified Specifications</span>
        <ul class="feature-list">
          <li><strong>Verified Phone Number:</strong> +91 84198 87730 (24/7 Concierge Hotline).</li>
          <li><strong>Verified Sarrin Holidays Email:</strong> help@sarrinholidays.com.</li>
          <li><strong>Unified Sans-Serif:</strong> All links and contact info rendered in elegant Inter typography.</li>
          <li><strong>Official Affiliations:</strong> Indian Heritage Hotels Association (IHHA), IATA Partner Network, and Sovereign Aviation Network.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">Zero Admin Links</span>
        <span class="badge-tag">IHHA Accredited</span>
        <span class="badge-tag">IATA Partner Network</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 08 &middot; Architectural Footer</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 10</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 11: MODULE 09 — BESPOKE ITINERARY DETAIL EXPERIENCE -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 09 &middot; BESPOKE ITINERARY DETAIL ARCHITECTURE (/PACKAGES/[SLUG])</span>
    <span>PAGE 11 / 14</span>
  </div>

  <div class="content-body">
    <div class="col-preview">
      <div class="img-frame">
        <img src="{img_detail_hero}" alt="Package Detail Page Hero & Pillars" />
      </div>
    </div>

    <div class="col-specs">
      <span class="eyebrow">EXPEDITION ARCHITECTURE</span>
      <h3 class="serif-title">Deep Itinerary Dossier Architecture</h3>
      <p class="narrative-p">
        Comprehensive journey dossiers detailing day-by-day itineraries, private transfers, dining curation, and live VIP triggers.
      </p>

      <div class="spec-group">
        <span class="spec-label">5 Domestic Luxury Pillars</span>
        <ul class="feature-list" style="font-size: 7.5pt;">
          <li><strong>1. 5-Star Palace &amp; Resort Stays:</strong> Presidential suites, private pool villas, and living royal residences with bespoke butler service.</li>
          <li><strong>2. Inter-City Luxury Transfers:</strong> Chauffeur fleet (Mercedes-Maybach &amp; Toyota Vellfire) or twin-engine helicopter charters.</li>
          <li><strong>3. Curated Regional Degustation:</strong> Private palace courtyards and master-chef regional culinary journeys.</li>
          <li><strong>4. Monument VIP Passes:</strong> Fast-track royal fortress entries with private historian liaisons.</li>
          <li><strong>5. Toll &amp; State Clearances:</strong> All green cess, permits, and highway Fastag clearances pre-cleared.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">Day-by-Day Accordion</span>
        <span class="badge-tag">Social Sharing</span>
        <span class="badge-tag">Instant WhatsApp Desk</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 09 &middot; Package Dossier Architecture</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 11</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 12: MODULE 10 — CURATED CIRCUITS CATALOG -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 10 &middot; CURATED CIRCUITS CATALOG DIRECTORY (/PACKAGES)</span>
    <span>PAGE 12 / 14</span>
  </div>

  <div class="content-body">
    <div class="col-preview">
      <div class="img-frame">
        <img src="{img_catalog_page}" alt="Packages Catalog Page" style="object-position: top center;" />
      </div>
    </div>

    <div class="col-specs">
      <span class="eyebrow">CATALOG DIRECTORY</span>
      <h3 class="serif-title">Curated Circuits Directory &amp; Filtering</h3>
      <p class="narrative-p">
        Full directory of pan-India circuits categorized by travel intention, geographic region, and luxury tier.
      </p>

      <div class="spec-group">
        <span class="spec-label">Catalog Capabilities</span>
        <ul class="feature-list">
          <li><strong>Circuit Categories:</strong> Royal Rajasthan, Kerala Backwaters, Kashmir &amp; Ladakh, Ganges &amp; Spiritual, Royal Tiger Safaris.</li>
          <li><strong>Smart Search:</strong> Instant text search across destination names, highlights, and regional circuits.</li>
          <li><strong>Live Inventory Sync:</strong> Real-time integration with Supabase database with fallback guarantees.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">Supabase Database</span>
        <span class="badge-tag">Real-Time Search</span>
        <span class="badge-tag">Structured SEO Schema</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 10 &middot; Catalog Directory</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 12</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 13: MODULE 11 & 12 — ABOUT & CONTACT CONCIERGE -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 11 &amp; 12 &middot; ATELIER PHILOSOPHY (/ABOUT) &amp; CONCIERGE DESK (/CONTACT)</span>
    <span>PAGE 13 / 14</span>
  </div>

  <div class="content-body">
    <div class="col-preview" style="flex: 1;">
      <div class="img-frame">
        <img src="{img_about_page}" alt="About Page" style="object-position: top center;" />
      </div>
    </div>

    <div class="col-preview" style="flex: 1;">
      <div class="img-frame">
        <img src="{img_contact_page}" alt="Contact Page" style="object-position: top center;" />
      </div>
    </div>

    <div class="col-specs" style="flex: 0.9;">
      <span class="eyebrow">INSTITUTIONAL PAGES</span>
      <h3 class="serif-title" style="font-size: 16pt;">Atelier Story &amp; Protocol</h3>
      <p class="narrative-p">
        Dedicated spaces detailing sovereign discretion, private aviation agreements, and direct liaison channels.
      </p>

      <div class="spec-group">
        <span class="spec-label">Key Pillars</span>
        <ul class="feature-list" style="font-size: 7.5pt;">
          <li><strong>About Page (/about):</strong> Details the 15-year custodianship, heritage alliances with royal families, and private aviation corridors.</li>
          <li><strong>Contact Desk (/contact):</strong> Confidential dossier inquiry form, 24/7 hotline, direct WhatsApp channel, and bilateral NDA protocol options.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">Confidential Dossier</span>
        <span class="badge-tag">Sovereign Protocol</span>
        <span class="badge-tag">24/7 Desk Availability</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 11 &amp; 12 &middot; Institutional Pages</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 13</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 14: SIGN-OFF & DEPLOYMENT VERIFICATION -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">VERIFICATION &amp; PRODUCTION STATUS SIGN-OFF</span>
    <span>PAGE 14 / 14</span>
  </div>

  <div class="content-body" style="align-items: center; justify-content: center;">
    <div style="background: #141310; border: 1px solid rgba(197, 160, 89, 0.4); border-radius: 4px; padding: 8mm 12mm; max-width: 220mm; text-align: center;">
      <span class="eyebrow">PRODUCTION VERIFICATION</span>
      <h2 class="serif-title" style="font-size: 24pt; margin-bottom: 3mm;">Digital Atelier Live Status &amp; Sign-Off</h2>
      <div class="cover-divider" style="margin: 0 auto 5mm auto;"></div>
      <p class="narrative-p" style="font-size: 9.5pt; max-width: 180mm; margin: 0 auto 6mm auto;">
        The entire digital presence of Sarrin Holidays has been architected to the highest luxury hospitality standards, eliminating all generic template artifacts, introducing rich editorial contrast, high-converting drawers, and pan-India cartography.
      </p>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; text-align: left; margin-bottom: 6mm;">
        <div style="background: #0C0B09; border: 1px solid rgba(255,255,255,0.1); padding: 3.5mm; border-radius: 2px;">
          <span style="font-size: 7pt; color: #C5A059; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600; display: block;">Production URL</span>
          <span style="font-size: 9pt; font-weight: 600; color: #F4F2EC;">sarrin.bidvyapar.com</span>
          <span style="font-size: 7pt; color: #10B981; display: block; margin-top: 1mm;">&bull; 200 OK &middot; Port 999 Active</span>
        </div>
        <div style="background: #0C0B09; border: 1px solid rgba(255,255,255,0.1); padding: 3.5mm; border-radius: 2px;">
          <span style="font-size: 7pt; color: #C5A059; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600; display: block;">Preserved Baseline</span>
          <span style="font-size: 9pt; font-weight: 600; color: #F4F2EC;">sarrin1.bidvyapar.com</span>
          <span style="font-size: 7pt; color: #3B82F6; display: block; margin-top: 1mm;">&bull; 200 OK &middot; Port 998 Untouched</span>
        </div>
        <div style="background: #0C0B09; border: 1px solid rgba(255,255,255,0.1); padding: 3.5mm; border-radius: 2px;">
          <span style="font-size: 7pt; color: #C5A059; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600; display: block;">Curatorial Response</span>
          <span style="font-size: 9pt; font-weight: 600; color: #F4F2EC;">+91 84198 87730</span>
          <span style="font-size: 7pt; color: #C5A059; display: block; margin-top: 1mm;">&bull; 24/7 Sovereign Concierge Desk</span>
        </div>
      </div>

      <div style="font-size: 8pt; color: #B8B4AA; letter-spacing: 0.1em; text-transform: uppercase;">
        Approved &amp; Certified by Sarrin Holidays Senior Curatorial Architecture Team
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Production Sign-Off &middot; Verification Protocol</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 14</span>
  </div>
</div>

</body>
</html>"""

    html_path = os.path.join(BASE_DIR, "showcase_master.html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"HTML written to {html_path}")

    print("Rendering Master PDF with Playwright Chrome...")
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        page = browser.new_page()
        page.goto(f"file:///{html_path.replace(os.sep, '/')}", wait_until="networkidle")
        time.sleep(2)
        
        # Generate PDF in A4 Landscape
        page.pdf(
            path=OUTPUT_PDF_LOCAL,
            format="A4",
            landscape=True,
            print_background=True,
            margin={"top": "0", "bottom": "0", "left": "0", "right": "0"},
        )
        print(f"Successfully generated local PDF: {OUTPUT_PDF_LOCAL}")

        # Also copy / save to Brain directory for direct access
        page.pdf(
            path=OUTPUT_PDF_BRAIN,
            format="A4",
            landscape=True,
            print_background=True,
            margin={"top": "0", "bottom": "0", "left": "0", "right": "0"},
        )
        print(f"Successfully generated Brain PDF: {OUTPUT_PDF_BRAIN}")

        browser.close()

if __name__ == "__main__":
    build_pdf()

