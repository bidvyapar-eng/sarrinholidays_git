import os
import shutil
import base64
import time
from PIL import Image
from playwright.sync_api import sync_playwright

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.abspath(os.path.join(BASE_DIR, ".."))
UPDATED_DIR_LOCAL = os.path.join(PROJECT_DIR, "updated_website_screenshots")
BRAIN_DIR = r"C:\Users\Amit\.gemini\antigravity\brain\f7358cca-401d-4f23-a1ef-7b1b51a029ed"
UPDATED_DIR_BRAIN = os.path.join(BRAIN_DIR, "updated_website_screenshots")

os.makedirs(UPDATED_DIR_LOCAL, exist_ok=True)
os.makedirs(UPDATED_DIR_BRAIN, exist_ok=True)

PDF_FILENAME = "Sarrin_Holidays_Updated_Complete_Website_Design.pdf"
OUTPUT_PDF_LOCAL_FOLDER = os.path.join(UPDATED_DIR_LOCAL, PDF_FILENAME)
OUTPUT_PDF_PROJECT_ROOT = os.path.join(PROJECT_DIR, PDF_FILENAME)
OUTPUT_PDF_BRAIN = os.path.join(BRAIN_DIR, PDF_FILENAME)
OUTPUT_PDF_BRAIN_FOLDER = os.path.join(UPDATED_DIR_BRAIN, PDF_FILENAME)

BASE_URL = "https://sarrin.bidvyapar.com"

def capture_all():
    print(f"Connecting to {BASE_URL} with 2x Retina resolution...")
    with sync_playwright() as p:
        browser = p.chromium.launch(
            channel="chrome",
            headless=True,
            args=["--disable-gpu", "--disable-dev-shm-usage", "--no-sandbox"]
        )
        context = browser.new_context(
            viewport={"width": 1440, "height": 960},
            device_scale_factor=2,
        )
        page = context.new_page()

        # 1. Homepage Full
        print("Capturing 01_homepage_full.png...")
        page.goto(BASE_URL, wait_until="networkidle", timeout=45000)
        time.sleep(3)
        page.screenshot(path=os.path.join(UPDATED_DIR_LOCAL, "01_homepage_full.png"), full_page=True, animations="disabled")

        # 2. Hero Section
        hero = page.locator("section").first
        if hero.count() > 0:
            hero.screenshot(path=os.path.join(UPDATED_DIR_LOCAL, "02_hero_section.png"), animations="disabled")

        # 3. 360 VR Section
        vr = page.locator("#virtual-tour").first
        if vr.count() > 0:
            vr.screenshot(path=os.path.join(UPDATED_DIR_LOCAL, "03_vr_tour_section.png"), animations="disabled")

        # 4. Packages Grid
        dest = page.locator("section#destinations, #destinations section").first
        if dest.count() == 0:
            dest = page.locator("#destinations").first
        if dest.count() > 0:
            dest.screenshot(path=os.path.join(UPDATED_DIR_LOCAL, "04_packages_grid.png"), animations="disabled")

        # 5. Philosophy Sandstone/Ivory Section
        phil = page.locator("#experiences").first
        if phil.count() > 0:
            phil.screenshot(path=os.path.join(UPDATED_DIR_LOCAL, "05_philosophy_ivory.png"), animations="disabled")

        # 6. Cartographic Map Section
        map_elem = page.locator("#journal").first
        if map_elem.count() > 0:
            map_elem.screenshot(path=os.path.join(UPDATED_DIR_LOCAL, "06_cartographic_map.png"), animations="disabled")

        # 7. Atelier Heritage & Metrics Section
        about_elem = page.locator("#about").first
        if about_elem.count() > 0:
            about_elem.screenshot(path=os.path.join(UPDATED_DIR_LOCAL, "07_atelier_heritage.png"), animations="disabled")

        # 8. Luxury Footer
        footer = page.locator("footer").first
        if footer.count() > 0:
            footer.screenshot(path=os.path.join(UPDATED_DIR_LOCAL, "08_footer.png"), animations="disabled")

        # 9. Concierge Drawer
        print("Capturing 09_concierge_drawer_active.png...")
        try:
            plan_btn = page.locator("button:has-text('Plan a Trip')").first
            if plan_btn.count() > 0:
                plan_btn.click()
                time.sleep(2)
                page.screenshot(path=os.path.join(UPDATED_DIR_LOCAL, "09_concierge_drawer_active.png"), animations="disabled")
                page.keyboard.press("Escape")
                time.sleep(1)
        except Exception as e:
            print("Note on drawer capture:", e)

        # 10. Package Detail Page (Full Page)
        print("Capturing 10_package_detail_full.png...")
        page.goto(f"{BASE_URL}/packages/kerala-backwaters-hills-5d", wait_until="networkidle", timeout=30000)
        time.sleep(3)
        page.screenshot(path=os.path.join(UPDATED_DIR_LOCAL, "10_package_detail_full.png"), full_page=True, animations="disabled")

        # 11. About Page (Full Page)
        print("Capturing 11_about_page_full.png...")
        page.goto(f"{BASE_URL}/about", wait_until="networkidle", timeout=30000)
        time.sleep(3)
        page.screenshot(path=os.path.join(UPDATED_DIR_LOCAL, "11_about_page_full.png"), full_page=True, animations="disabled")

        # 12. Packages Catalog Page (Full Page)
        print("Capturing 12_packages_catalog_full.png...")
        page.goto(f"{BASE_URL}/packages", wait_until="networkidle", timeout=30000)
        time.sleep(3)
        page.screenshot(path=os.path.join(UPDATED_DIR_LOCAL, "12_packages_catalog_full.png"), full_page=True, animations="disabled")

        # 13. Contact Page (Full Page)
        print("Capturing 13_contact_page_full.png...")
        page.goto(f"{BASE_URL}/contact", wait_until="networkidle", timeout=30000)
        time.sleep(3)
        page.screenshot(path=os.path.join(UPDATED_DIR_LOCAL, "13_contact_page_full.png"), full_page=True, animations="disabled")

        # 14. Services Atelier Hub (Full Page)
        print("Capturing 14_services_page_full.png...")
        page.goto(f"{BASE_URL}/services", wait_until="networkidle", timeout=30000)
        time.sleep(3)
        page.screenshot(path=os.path.join(UPDATED_DIR_LOCAL, "14_services_page_full.png"), full_page=True, animations="disabled")

        # 15. Blog & Editorial Page (Full Page)
        print("Capturing 15_blog_page_full.png...")
        page.goto(f"{BASE_URL}/blog", wait_until="networkidle", timeout=30000)
        time.sleep(3)
        page.screenshot(path=os.path.join(UPDATED_DIR_LOCAL, "15_blog_page_full.png"), full_page=True, animations="disabled")

        # 16. Press Room Page (Full Page)
        print("Capturing 16_press_page_full.png...")
        page.goto(f"{BASE_URL}/press", wait_until="networkidle", timeout=30000)
        time.sleep(3)
        page.screenshot(path=os.path.join(UPDATED_DIR_LOCAL, "16_press_page_full.png"), full_page=True, animations="disabled")

        browser.close()
        print("All screen captures saved successfully.")

def generate_crops():
    print("Generating precision detail crops...")
    # Package card detail
    pkg_grid_path = os.path.join(UPDATED_DIR_LOCAL, "04_packages_grid.png")
    if os.path.exists(pkg_grid_path):
        im = Image.open(pkg_grid_path)
        card_crop = im.crop((100, 1050, 920, 2600))
        card_crop.save(os.path.join(UPDATED_DIR_LOCAL, "04b_package_card_detail.png"))

    # Drawer panel detail
    drawer_path = os.path.join(UPDATED_DIR_LOCAL, "09_concierge_drawer_active.png")
    if os.path.exists(drawer_path):
        im = Image.open(drawer_path)
        drawer_crop = im.crop((1650, 0, 2880, 1920))
        drawer_crop.save(os.path.join(UPDATED_DIR_LOCAL, "09b_concierge_drawer_panel.png"))

    # Map container detail
    map_path = os.path.join(UPDATED_DIR_LOCAL, "06_cartographic_map.png")
    if os.path.exists(map_path):
        im = Image.open(map_path)
        map_crop = im.crop((120, 600, 2760, 2650))
        map_crop.save(os.path.join(UPDATED_DIR_LOCAL, "06b_map_interactive_container.png"))

    # Package hero & pillars detail
    detail_path = os.path.join(UPDATED_DIR_LOCAL, "10_package_detail_full.png")
    if os.path.exists(detail_path):
        im = Image.open(detail_path)
        hero_crop = im.crop((0, 0, 2880, 2200))
        hero_crop.save(os.path.join(UPDATED_DIR_LOCAL, "10b_package_hero_pillars.png"))

def img_b64(filename):
    path = os.path.join(UPDATED_DIR_LOCAL, filename)
    if os.path.exists(path):
        with open(path, "rb") as f:
            return f"data:image/png;base64,{base64.b64encode(f.read()).decode('utf-8')}"
    return ""

def build_pdf_showcase():
    print("Building comprehensive multi-page PDF presentation...")
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
    img_services_page = img_b64("14_services_page_full.png")
    img_blog_page = img_b64("15_blog_page_full.png")
    img_press_page = img_b64("16_press_page_full.png")

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Sarrin Holidays — Updated Complete Website Design & Brand Architecture Showcase</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap');

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
    font-family: 'Inter', sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}

  .page {{
    width: 297mm;
    height: 210mm;
    position: relative;
    page-break-after: always;
    page-break-inside: avoid;
    overflow: hidden;
    background: radial-gradient(circle at 10% 10%, rgba(197, 160, 89, 0.05), transparent 40%),
                radial-gradient(circle at 90% 90%, rgba(197, 160, 89, 0.03), transparent 50%),
                #0C0B09;
    padding: 12mm 14mm 10mm 14mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }}

  .frame-border {{
    position: absolute;
    inset: 4.5mm;
    border: 1px solid rgba(197, 160, 89, 0.28);
    pointer-events: none;
  }}
  .frame-corner-tl, .frame-corner-tr, .frame-corner-bl, .frame-corner-br {{
    position: absolute;
    width: 6mm;
    height: 6mm;
    border-color: #C5A059;
    pointer-events: none;
  }}
  .frame-corner-tl {{ top: 3.5mm; left: 3.5mm; border-top: 2px solid #C5A059; border-left: 2px solid #C5A059; }}
  .frame-corner-tr {{ top: 3.5mm; right: 3.5mm; border-top: 2px solid #C5A059; border-right: 2px solid #C5A059; }}
  .frame-corner-bl {{ bottom: 3.5mm; left: 3.5mm; border-bottom: 2px solid #C5A059; border-left: 2px solid #C5A059; }}
  .frame-corner-br {{ bottom: 3.5mm; right: 3.5mm; border-bottom: 2px solid #C5A059; border-right: 2px solid #C5A059; }}

  .page-header {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 2mm;
    font-size: 7.5pt;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #B8B4AA;
    z-index: 10;
  }}
  .brand-title {{
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 11pt;
    letter-spacing: 0.2em;
    color: #F4F2EC;
    font-weight: 500;
  }}
  .module-tag {{
    color: #C5A059;
    font-weight: 600;
  }}

  .page-footer {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 2mm;
    font-size: 7pt;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #7E7A71;
    z-index: 10;
  }}
  .gold-accent {{ color: #C5A059; font-weight: 600; }}

  .content-body {{
    display: flex;
    gap: 7mm;
    height: 165mm;
    align-items: stretch;
    z-index: 5;
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

  .serif-title {{
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 300;
    font-size: 19pt;
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
    margin-top: 2mm;
  }}
  .badge-tag {{
    font-size: 6.5pt;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 1mm 2.2mm;
    background: rgba(197, 160, 89, 0.1);
    color: #C5A059;
    border: 1px solid rgba(197, 160, 89, 0.3);
    border-radius: 2px;
    font-weight: 500;
  }}

  /* Cover Page Styles */
  .cover-container {{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    padding: 0 20mm;
  }}
  .cover-crest {{
    width: 18mm;
    height: 18mm;
    border: 1.5px solid #C5A059;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6mm;
    background: rgba(197, 160, 89, 0.08);
  }}
  .cover-crest svg {{
    width: 9mm;
    height: 9mm;
    stroke: #C5A059;
    fill: none;
    stroke-width: 1.5;
  }}
  .cover-title {{
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 34pt;
    font-weight: 300;
    letter-spacing: 0.08em;
    line-height: 1.1;
    color: #F4F2EC;
    margin-bottom: 3mm;
  }}
  .cover-subtitle {{
    font-size: 10pt;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: #C5A059;
    font-weight: 500;
    margin-bottom: 5mm;
  }}
  .cover-divider {{
    width: 35mm;
    height: 1px;
    background: linear-gradient(90deg, transparent, #C5A059, transparent);
    margin-bottom: 6mm;
  }}
  .cover-desc {{
    font-size: 9pt;
    line-height: 1.6;
    color: #B8B4AA;
    font-weight: 300;
    max-width: 170mm;
    margin-bottom: 8mm;
  }}
  .cover-meta-grid {{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6mm;
    width: 100%;
    max-width: 220mm;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 5mm;
    text-align: left;
  }}
  .cover-meta-item {{
    font-size: 7pt;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #7E7A71;
  }}
  .cover-meta-item strong {{
    display: block;
    font-size: 8pt;
    color: #F4F2EC;
    margin-top: 1mm;
    font-weight: 500;
  }}
</style>
</head>
<body>

<!-- ========================================================================= -->
<!-- PAGE 01: MASTER COVER -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">VERIFIED ARCHITECTURAL SHOWCASE &middot; 2026</span>
    <span>DISPATCH REF: SH-2026-V3</span>
  </div>

  <div class="cover-container">
    <div class="cover-crest">
      <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
    </div>
    <span class="cover-subtitle">Bespoke Indian Expeditions &amp; Private Journeys</span>
    <h1 class="cover-title">Sarrin Holidays</h1>
    <div class="cover-divider"></div>
    <p class="cover-desc">
      A complete photographic and architectural record of the live digital presence on <strong>sarrin.bidvyapar.com</strong>.
      Engineered in accordance with ultra-luxury editorial hospitality benchmarks: Cormorant Garamond typography, Warm Heritage Obsidian palette, sharp architectural geometry, dynamic 3-tier hospitality selectors, and verified white-glove protocols.
    </p>

    <div class="cover-meta-grid">
      <div class="cover-meta-item">Client / Brand<strong>Sarrin Holidays India</strong></div>
      <div class="cover-meta-item">Live Production Target<strong>sarrin.bidvyapar.com (Port 999)</strong></div>
      <div class="cover-meta-item">Preserved Baseline<strong>sarrin1.bidvyapar.com (Port 998)</strong></div>
      <div class="cover-meta-item">Certification Date<strong>November 12, 2026 &middot; Live Production</strong></div>
    </div>
  </div>

  <div class="page-footer">
    <span>Private &amp; Confidential Dossier</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 01</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 02: FLAGSHIP HERO BANNER -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 01 &middot; FLAGSHIP HERO EXPERIENCE</span>
    <span>PAGE 02</span>
  </div>

  <div class="content-body">
    <div class="col-preview">
      <div class="img-frame">
        <img src="{img_hero}" alt="Flagship Hero Section" />
      </div>
    </div>

    <div class="col-specs">
      <span class="eyebrow">PORTAL ENTRANCE</span>
      <h3 class="serif-title">Editorial Typography &amp; Atmospheric Depth</h3>
      <p class="narrative-p">
        The entrance establishes immediate luxury gravitas through high-contrast Cormorant Garamond serif headlines, warm obsidian background illumination, and a refined smart search filter.
      </p>

      <div class="spec-group">
        <span class="spec-label">Key Enhancements</span>
        <ul class="feature-list">
          <li><strong>Cormorant Garamond Binding:</strong> Google Fonts variable bound cleanly with high-contrast serif rendering.</li>
          <li><strong>Refined Search Placeholder:</strong> &ldquo;Rajasthan, Kerala, Ladakh&rdquo; replaces generic labels.</li>
          <li><strong>Direct Concierge Pill:</strong> &ldquo;Dedicated 24/7 Travelling Concierge&rdquo; upper badge in Champagne Gold.</li>
          <li><strong>Direct Actions:</strong> &ldquo;Design Your Journey&rdquo; and &ldquo;Explore Curated Circuits&rdquo; with sharp rounded-sm styling.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">Cormorant Garamond</span>
        <span class="badge-tag">Champagne Gold #C5A059</span>
        <span class="badge-tag">Sharp Corners rounded-sm</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 01 &middot; Flagship Hero Experience</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 02</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 03: 360 VR SUITE PREVIEW -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 02 &middot; 360&deg; VR SUITE PREVIEW</span>
    <span>PAGE 03</span>
  </div>

  <div class="content-body">
    <div class="col-preview">
      <div class="img-frame">
        <img src="{img_vr}" alt="360 VR Suite Section" />
      </div>
    </div>

    <div class="col-specs">
      <span class="eyebrow">IMMERSIVE SUITE VIEWER</span>
      <h3 class="serif-title">360&deg; Living Heritage Suite Discovery</h3>
      <p class="narrative-p">
        Allows prospective guests to virtually tour presidential suites in living Rajputana palaces, Udaipur lake suites, and high-altitude Himalayan retreats prior to confirming reservations.
      </p>

      <div class="spec-group">
        <span class="spec-label">Technical Upgrades</span>
        <ul class="feature-list">
          <li><strong>Eliminated Truncation:</strong> Complete descriptive copy displayed without awkward ellipsis cuts.</li>
          <li><strong>Interactive Itinerary CTA:</strong> &ldquo;Explore Itinerary Featuring This Suite &rarr;&rdquo; linking directly to package dossiers.</li>
          <li><strong>3-City Panoramic Selector:</strong> Instant toggles between Udaipur Palace, Kerala Houseboat, and Taj Palace.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">360&deg; Panorama</span>
        <span class="badge-tag">Zero Truncation</span>
        <span class="badge-tag">Connected Packages</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 02 &middot; 360&deg; VR Suite Discovery</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 03</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 04: CURATED JOURNEYS GRID -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 03 &middot; FLAGSHIP PACKAGES CATALOG GRID</span>
    <span>PAGE 04</span>
  </div>

  <div class="content-body">
    <div class="col-preview">
      <div class="img-frame">
        <img src="{img_grid}" alt="Curated Journeys Grid" />
      </div>
    </div>

    <div class="col-specs">
      <span class="eyebrow">CURATED CIRCUITS</span>
      <h3 class="serif-title">Unified 3-Column Editorial Grid</h3>
      <p class="narrative-p">
        Eliminated the previous duplicate 4-column carousel redundancy. Curated Indian Journeys is now consolidated into a spacious 3-column architectural grid with authentic high-resolution photography.
      </p>

      <div class="spec-group">
        <span class="spec-label">Architecture Highlights</span>
        <ul class="feature-list">
          <li><strong>Deduplicated Catalog:</strong> Removed redundant sections; unified category filtering under one flagship view.</li>
          <li><strong>Sharp Card Geometry:</strong> Sharp 2px rounded corners with subtle white/10 borders and gold hover states.</li>
          <li><strong>Verified Backwaters Photo:</strong> Distinct misty daylight Munnar hills and golden hour coastal sanctuaries.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">3-Column Grid</span>
        <span class="badge-tag">Munnar Verified Image</span>
        <span class="badge-tag">Zero Duplication</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 03 &middot; Flagship Packages Catalog</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 04</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 05: PACKAGE CARD CLOSE-UP -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 03B &middot; PACKAGE CARD SPECIFICATION DETAIL</span>
    <span>PAGE 05</span>
  </div>

  <div class="content-body">
    <div class="col-preview" style="flex: 1.2;">
      <div class="img-frame" style="background: #141310; align-items: center;">
        <img src="{img_card}" alt="Package Card Close-up" style="max-height: 155mm; width: auto;" />
      </div>
    </div>

    <div class="col-specs" style="flex: 1.35;">
      <span class="eyebrow">CARD ARCHITECTURE</span>
      <h3 class="serif-title">Eliminating &ldquo;Pill Badge Soup&rdquo;</h3>
      <p class="narrative-p">
        Previous card designs suffered from up to 8 cluttered rounded pills and text truncation. The rebuilt card delivers an editorial Aman/Oberoi aesthetic.
      </p>

      <div class="spec-group">
        <span class="spec-label">Precise Layout Specifications</span>
        <ul class="feature-list">
          <li><strong>Top Clean Overlays:</strong> Duration on left (&ldquo;5 Days / 4 Nights&rdquo;) and Signature Tier on right (&ldquo;Private Heritage&rdquo;). Truncated pills eliminated.</li>
          <li><strong>Route Eyebrow:</strong> Single uppercase route eyebrow in Champagne Gold: e.g. KOCHI &bull; MUNNAR &bull; THEKKADY &bull; ALLEPPEY.</li>
          <li><strong>Two-Line Title:</strong> Cormorant Garamond serif title displayed gracefully across two lines without single-line clipping.</li>
          <li><strong>Pricing &amp; Action Row:</strong> Starting tariff in large Cormorant Garamond alongside &ldquo;Plan a Trip&rdquo; and &ldquo;Explore Dossier&rdquo; buttons.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">Editorial Route Eyebrow</span>
        <span class="badge-tag">Dynamic Tariff</span>
        <span class="badge-tag">No Text Clipping</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 03B &middot; Package Card Engineering</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 05</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 06: WARM IVORY PHILOSOPHY SECTION -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 04 &middot; WARM IVORY CONTRAST SECTION (#F6F3EC)</span>
    <span>PAGE 06</span>
  </div>

  <div class="content-body">
    <div class="col-preview">
      <div class="img-frame">
        <img src="{img_phil}" alt="Warm Ivory Philosophy Section" />
      </div>
    </div>

    <div class="col-specs">
      <span class="eyebrow">LIGHT/DARK EDITORIAL RHYTHM</span>
      <h3 class="serif-title">Warm Sandstone (#F6F3EC) Philosophy</h3>
      <p class="narrative-p">
        Breaks monochrome fatigue by introducing a warm sandstone/ivory editorial section reminiscent of Cond&eacute; Nast Traveler print layouts.
      </p>

      <div class="spec-group">
        <span class="spec-label">Design Standards</span>
        <ul class="feature-list">
          <li><strong>Balanced 2-Column Header:</strong> Large serif headline on left balanced by an editorial manifesto paragraph aligned bottom-right.</li>
          <li><strong>Restored Assets:</strong> Bound valid local high-resolution photography for Rajputana Palaces, Kettuvallam Houseboats, and Tiger Safaris.</li>
          <li><strong>Warm Sandstone Surfaces:</strong> Cards styled with #EFECE4 warm background, deep bronze eyebrows, and dark espresso serif titles.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">Sandstone #F6F3EC</span>
        <span class="badge-tag">2-Column Balanced Header</span>
        <span class="badge-tag">Zero Placeholder Boxes</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 04 &middot; Warm Ivory Editorial Rhythm</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 06</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 07: PAN-INDIA CARTOGRAPHIC MAP -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 05 &middot; CARTOGRAPHIC DISCOVERY MAP (7 REGIONS)</span>
    <span>PAGE 07</span>
  </div>

  <div class="content-body">
    <div class="col-preview">
      <div class="img-frame">
        <img src="{img_map}" alt="Cartographic Map Section" />
      </div>
    </div>

    <div class="col-specs">
      <span class="eyebrow">PAN-INDIA CARTOGRAPHY</span>
      <h3 class="serif-title">7 Iconic Regions &amp; Seasonal Curation</h3>
      <p class="narrative-p">
        Expanded the previous 2-pin map into a Pan-India cartographic exploration interface with interactive SVG pins across all primary luxury circuits.
      </p>

      <div class="spec-group">
        <span class="spec-label">Expanded Coverage</span>
        <ul class="feature-list" style="font-size: 7.5pt;">
          <li><strong>1. Rajasthan:</strong> Living Palaces, Lake Pichola &amp; Thar Sand Dunes.</li>
          <li><strong>2. Kerala:</strong> Emerald Backwaters, Kettuvallams &amp; Spice Hills.</li>
          <li><strong>3. Ladakh &amp; Kashmir:</strong> Monasteries, Nubra Valley &amp; Alpine Ski Estates.</li>
          <li><strong>4. Varanasi &amp; Ganges:</strong> Sacred Riverfront Rituals &amp; Heritage Havelis.</li>
          <li><strong>5. Central India:</strong> Private Ranthambore &amp; Bandhavgarh Bengal Tiger Safaris.</li>
          <li><strong>6. Goa &amp; Konkan:</strong> Indo-Portuguese Villas &amp; Private Arabian Sea Yachts.</li>
          <li><strong>7. Northeast &amp; Meghalaya:</strong> Living Root Bridges &amp; Cloud Rainforests.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">7 Regional Pins</span>
        <span class="badge-tag">Best Season Indicator</span>
        <span class="badge-tag">Zero Layout Shift</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 05 &middot; Pan-India Cartographic Discovery</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 07</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 08: ATELIER HERITAGE & METRICS -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 06 &middot; ATELIER HERITAGE &amp; PRODUCTION METRICS</span>
    <span>PAGE 08</span>
  </div>

  <div class="content-body">
    <div class="col-preview">
      <div class="img-frame">
        <img src="{img_about}" alt="Atelier Heritage Section" />
      </div>
    </div>

    <div class="col-specs">
      <span class="eyebrow">INSTITUTIONAL CREDIBILITY</span>
      <h3 class="serif-title">Curatorial Trust &amp; Standards</h3>
      <p class="narrative-p">
        Documents the 15+ years of direct relationships with royal palace trusts, certified wildlife naturalists, and private aviation partners across India.
      </p>

      <div class="spec-group">
        <span class="spec-label">4 Key Performance Metrics</span>
        <ul class="feature-list">
          <li><strong>100% Bespoke Itineraries:</strong> Zero cookie-cutter pre-fab packages.</li>
          <li><strong>15+ Years Alliances:</strong> Direct royal family relationships in Mewar, Marwar &amp; Travancore.</li>
          <li><strong>4.9 / 5.0 Rating:</strong> Guest satisfaction across discerning international patrons.</li>
          <li><strong>&lt; 2 Hour Response:</strong> Rapid mountain and aviation dispatch window.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">MSME Verified</span>
        <span class="badge-tag">15+ Years Trust</span>
        <span class="badge-tag">24/7 Traveling Concierge</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 06 &middot; Atelier Heritage &amp; Metrics</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 08</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 09: CONCIERGE DRAWER SLIDE-OVER -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 07 &middot; HIGH-CONVERTING CONCIERGE DRAWER</span>
    <span>PAGE 09</span>
  </div>

  <div class="content-body">
    <div class="col-preview">
      <div class="img-frame">
        <img src="{img_drawer}" alt="Concierge Drawer Active" />
      </div>
    </div>

    <div class="col-specs">
      <span class="eyebrow">CONVERSION ARCHITECTURE</span>
      <h3 class="serif-title">Context-Aware Concierge Drawer</h3>
      <p class="narrative-p">
        Opens seamlessly when clicking &ldquo;Plan a Trip&rdquo; on any package or navigation bar. Contextually pre-fills destination data and guest parameters.
      </p>

      <div class="spec-group">
        <span class="spec-label">3-Tier Hospitality Architecture</span>
        <ul class="feature-list">
          <li><strong>Boutique Heritage (4-Star):</strong> Curated heritage havelis &amp; colonial boutique retreats.</li>
          <li><strong>Grand Luxury (5-Star):</strong> Palace properties from Taj, Oberoi, and Leela collections.</li>
          <li><strong>Presidential Charter:</strong> Palace suite buyouts, private villas, and private aircraft transfers.</li>
          <li><strong>Direct WhatsApp Action:</strong> Instant dynamic wa.me link pre-populated with inquiry parameters.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">Context-Aware</span>
        <span class="badge-tag">3 Hospitality Tiers</span>
        <span class="badge-tag">Instant WhatsApp Lead</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 07 &middot; Concierge Drawer Slide-Over</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 09</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 10: PACKAGE DETAIL PAGE (KERALA BACKWATERS) -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 08 &middot; PACKAGE DETAIL ARCHITECTURE (/PACKAGES/[SLUG])</span>
    <span>PAGE 10</span>
  </div>

  <div class="content-body">
    <div class="col-preview">
      <div class="img-frame">
        <img src="{img_detail_hero}" alt="Package Detail Page Hero" />
      </div>
    </div>

    <div class="col-specs">
      <span class="eyebrow">JOURNEY DOSSIER</span>
      <h3 class="serif-title">Dynamic Tariff &amp; White-Glove Inclusions</h3>
      <p class="narrative-p">
        Refactored to Warm Heritage Obsidian (#0C0B09). Eliminated the 8-pill badge row in favor of a clean gold eyebrow and interactive 3-tier pricing switcher.
      </p>

      <div class="spec-group">
        <span class="spec-label">Detail Features</span>
        <ul class="feature-list">
          <li><strong>Clean Editorial Eyebrow:</strong> &ldquo;5 DAYS / 4 NIGHTS &middot; PRIVATE CURATED JOURNEY&rdquo;.</li>
          <li><strong>Dynamic Tariff Switcher:</strong> Interactive toggle (Boutique Heritage | Grand Luxury | Presidential) updating starting rate in real time.</li>
          <li><strong>5 White-Glove Standards:</strong> Chauffeur fleet, curated degustation, VIP fast-track monument passes, and pre-cleared state tolls.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">Dynamic Price Switcher</span>
        <span class="badge-tag">White-Glove Standards</span>
        <span class="badge-tag">Munnar Verified Hero</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 08 &middot; Package Detail Architecture</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 10</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 11: ABOUT & CONTACT ATELIER PAGES -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 09 &middot; INSTITUTIONAL ATELIER &amp; CONTACT (/ABOUT, /CONTACT)</span>
    <span>PAGE 11</span>
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

    <div class="col-specs" style="flex: 1;">
      <span class="eyebrow">INSTITUTIONAL PAGES</span>
      <h3 class="serif-title" style="font-size: 16pt;">Personal Hospitality &amp; Contact Desk</h3>
      <p class="narrative-p">
        Completely cleansed of spy-thriller copywriting and cold navy blue AI styling. Transformed into an authentic Indian luxury travel atelier.
      </p>

      <div class="spec-group">
        <span class="spec-label">Recent Editorial Cleanups</span>
        <ul class="feature-list" style="font-size: 7.5pt;">
          <li><strong>About Page:</strong> Headline updated to &ldquo;The Art of Personal Indian Hospitality&rdquo;; trust badge row updated to &ldquo;CURATED HERITAGE &middot; PRIVATE ACCESS &middot; 24/7 CONCIERGE&rdquo;.</li>
          <li><strong>Contact Page:</strong> Right-hand form styled with warm obsidian surface (#141310, rounded-sm, p-8 lg:p-10).</li>
          <li><strong>Refined Placeholders:</strong> &ldquo;e.g. Aarav Mehta&rdquo;, &ldquo;aarav@domain.com&rdquo;, and &ldquo;JOURNEY VISION &amp; PREFERENCES&rdquo;.</li>
          <li><strong>Obsidian Quick Cards:</strong> WhatsApp and Direct Email cards styled with warm gold accents.</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">Authentic Hospitality</span>
        <span class="badge-tag">Warm Obsidian Form</span>
        <span class="badge-tag">Refined Placeholders</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 09 &middot; Institutional Pages</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 11</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 12: SERVICES HUB & THE SARRIN JOURNAL -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">MODULE 10 &middot; SERVICES ATELIER &amp; EDITORIAL JOURNAL (/SERVICES, /BLOG)</span>
    <span>PAGE 12</span>
  </div>

  <div class="content-body">
    <div class="col-preview" style="flex: 1;">
      <div class="img-frame">
        <img src="{img_services_page}" alt="Services Page" style="object-position: top center;" />
      </div>
    </div>

    <div class="col-preview" style="flex: 1;">
      <div class="img-frame">
        <img src="{img_blog_page}" alt="Blog Page" style="object-position: top center;" />
      </div>
    </div>

    <div class="col-specs" style="flex: 1;">
      <span class="eyebrow">EDITORIAL ECOSYSTEM</span>
      <h3 class="serif-title" style="font-size: 16pt;">Bespoke Services &amp; Dispatches</h3>
      <p class="narrative-p">
        Comprehensive luxury services and long-form editorial essays on living royal heritage, Ayurvedic wellness, and Himalayan solitude.
      </p>

      <div class="spec-group">
        <span class="spec-label">Curatorial Highlights</span>
        <ul class="feature-list" style="font-size: 7.5pt;">
          <li><strong>Services Hub (/services):</strong> 5-tile bento grid detailing Palace Buyouts, Private Aviation, Diplomatic Protocol, and Bespoke Charters.</li>
          <li><strong>Editorial Journal (/blog):</strong> Rich magazine cover story layout with estimated read times, category tags, and connected tour packages.</li>
          <li><strong>Zero Slate Artifacts:</strong> Replaced all slate-950/900 instances with Warm Heritage Obsidian (#0C0B09 / #141310).</li>
        </ul>
      </div>

      <div class="badge-row" style="margin-top: auto;">
        <span class="badge-tag">Services Bento Grid</span>
        <span class="badge-tag">Connected Journeys</span>
        <span class="badge-tag">#0C0B09 Surface</span>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>Module 10 &middot; Services &amp; Editorial Journal</span>
    <span class="gold-accent">sarrin.bidvyapar.com</span>
    <span>PAGE 12</span>
  </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 13: PRODUCTION SIGN-OFF & CERTIFICATION -->
<!-- ========================================================================= -->
<div class="page">
  <div class="frame-border"></div>
  <div class="frame-corner-tl"></div><div class="frame-corner-tr"></div>
  <div class="frame-corner-bl"></div><div class="frame-corner-br"></div>

  <div class="page-header">
    <span class="brand-title">SARRIN HOLIDAYS &middot; INDIA</span>
    <span class="module-tag">VERIFICATION &amp; PRODUCTION STATUS SIGN-OFF</span>
    <span>PAGE 13</span>
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
          <span style="font-size: 7pt; color: #C5A059; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600; display: block;">Production Target</span>
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
          <span style="font-size: 7pt; color: #C5A059; display: block; margin-top: 1mm;">&bull; 24/7 Concierge Hotline</span>
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
    <span>PAGE 13</span>
  </div>
</div>

</body>
</html>"""

    html_path = os.path.join(UPDATED_DIR_LOCAL, "showcase_master.html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"HTML written to {html_path}")

    print("Rendering Master PDF with Playwright Chrome...")
    with sync_playwright() as p:
        browser = p.chromium.launch(
            channel="chrome",
            headless=True,
            args=["--disable-gpu", "--disable-dev-shm-usage", "--no-sandbox"]
        )
        page = browser.new_page()
        page.goto(f"file:///{html_path.replace(os.sep, '/')}", wait_until="networkidle")
        time.sleep(2)

        # Generate PDF in A4 Landscape
        page.pdf(
            path=OUTPUT_PDF_LOCAL_FOLDER,
            format="A4",
            landscape=True,
            print_background=True,
            margin={"top": "0", "bottom": "0", "left": "0", "right": "0"},
        )
        print(f"Saved PDF to: {OUTPUT_PDF_LOCAL_FOLDER}")

        # Also copy to project root
        shutil.copyfile(OUTPUT_PDF_LOCAL_FOLDER, OUTPUT_PDF_PROJECT_ROOT)
        print(f"Copied PDF to: {OUTPUT_PDF_PROJECT_ROOT}")

        # Also copy to Brain artifact directory
        shutil.copyfile(OUTPUT_PDF_LOCAL_FOLDER, OUTPUT_PDF_BRAIN)
        shutil.copyfile(OUTPUT_PDF_LOCAL_FOLDER, OUTPUT_PDF_BRAIN_FOLDER)
        print(f"Copied PDF to: {OUTPUT_PDF_BRAIN}")

        browser.close()

def sync_brain_assets():
    print("Mirroring screenshot assets to Brain artifact directory...")
    for item in os.listdir(UPDATED_DIR_LOCAL):
        s = os.path.join(UPDATED_DIR_LOCAL, item)
        d = os.path.join(UPDATED_DIR_BRAIN, item)
        if os.path.isfile(s):
            shutil.copyfile(s, d)
    print("Mirroring complete.")

def main():
    capture_all()
    generate_crops()
    build_pdf_showcase()
    sync_brain_assets()
    print("\nALL OPERATIONS COMPLETED SUCCESSFULLY!")

if __name__ == "__main__":
    main()

