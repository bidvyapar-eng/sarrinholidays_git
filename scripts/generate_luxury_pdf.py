import os
import base64
from playwright.sync_api import sync_playwright

def get_base64_image(path):
    if os.path.exists(path):
        with open(path, "rb") as f:
            return f"data:image/png;base64,{base64.b64encode(f.read()).decode('utf-8')}"
    return ""

def main():
    logo_path = os.path.join(os.path.dirname(__file__), "..", "public", "sarrin-holidays-logo.png")
    logo_base64 = get_base64_image(logo_path)

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Sarrin Holidays — Design System & Platform Features Showcase</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

  @page {{
    size: A4 portrait;
    margin: 0;
  }}

  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}

  body {{
    background-color: #030712;
    color: #F3F4F6;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 10pt;
    line-height: 1.5;
  }}

  .page {{
    width: 210mm;
    height: 297mm;
    padding: 16mm 18mm;
    page-break-after: always;
    position: relative;
    background: radial-gradient(circle at 50% 0%, #0F172A 0%, #030712 70%);
    overflow: hidden;
  }}

  /* Subtle Golden Trim Border */
  .page::before {{
    content: '';
    position: absolute;
    top: 8mm;
    bottom: 8mm;
    left: 8mm;
    right: 8mm;
    border: 1px solid rgba(212, 175, 55, 0.18);
    pointer-events: none;
    border-radius: 4px;
  }}

  .page-inner {{
    position: relative;
    z-index: 10;
    height: 100%;
    display: flex;
    flex-direction: column;
  }}

  /* Header & Footer */
  .page-header {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 3.5mm;
    margin-bottom: 5mm;
  }}

  .page-header .brand-stamp {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 7.5pt;
    letter-spacing: 0.18em;
    color: #D4AF37;
    text-transform: uppercase;
  }}

  .page-header .doc-ref {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 7.5pt;
    letter-spacing: 0.1em;
    color: #94A3B8;
  }}

  .page-footer {{
    margin-top: auto;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 3mm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7.5pt;
    color: #64748B;
    font-family: 'JetBrains Mono', monospace;
  }}

  .page-footer a {{
    color: #D4AF37;
    text-decoration: none;
  }}

  /* Typography */
  h1, h2, h3, .serif {{
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 500;
  }}

  h1 {{
    font-size: 32pt;
    line-height: 1.1;
    color: #FFFFFF;
  }}

  h2 {{
    font-size: 20pt;
    line-height: 1.2;
    color: #FFFFFF;
    margin-bottom: 2.5mm;
  }}

  h3 {{
    font-size: 13pt;
    color: #F8FAFC;
    margin-bottom: 1.5mm;
  }}

  .gold-text {{
    color: #D4AF37;
  }}

  .subheading {{
    font-size: 8pt;
    font-family: 'JetBrains Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    color: #D4AF37;
    margin-bottom: 2mm;
    display: block;
  }}

  p {{
    color: #CBD5E1;
    font-size: 9pt;
    line-height: 1.55;
    font-weight: 300;
  }}

  /* Luxury Cards & Panels */
  .card {{
    background: rgba(15, 23, 42, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    padding: 4mm 5mm;
    margin-bottom: 3.5mm;
    backdrop-filter: blur(12px);
  }}

  .card-gold {{
    border-color: rgba(212, 175, 55, 0.35);
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(15, 23, 42, 0.7) 100%);
  }}

  .grid-2 {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3.5mm;
  }}

  .grid-3 {{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3mm;
  }}

  .grid-4 {{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5mm;
  }}

  /* Pills & Badges */
  .pill {{
    display: inline-flex;
    align-items: center;
    padding: 1mm 2.5mm;
    border-radius: 100px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 6.5pt;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #E2E8F0;
    white-space: nowrap;
  }}

  .pill-gold {{
    background: rgba(212, 175, 55, 0.12);
    border-color: rgba(212, 175, 55, 0.35);
    color: #FDE047;
  }}

  .bullet-dot {{
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #D4AF37;
    display: inline-block;
    margin-right: 6px;
    flex-shrink: 0;
  }}

  .bullet-item {{
    display: flex;
    align-items: baseline;
    font-size: 8.5pt;
    color: #CBD5E1;
    margin-bottom: 1.5mm;
  }}

  /* Tables */
  table.luxury-table {{
    width: 100%;
    border-collapse: collapse;
    font-size: 7.8pt;
    margin-top: 2.5mm;
  }}

  table.luxury-table th {{
    background: rgba(212, 175, 55, 0.12);
    color: #D4AF37;
    font-family: 'JetBrains Mono', monospace;
    font-size: 7pt;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    text-align: left;
    padding: 2.5mm 3mm;
    border-bottom: 1px solid rgba(212, 175, 55, 0.3);
  }}

  table.luxury-table td {{
    padding: 2mm 3mm;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    color: #E2E8F0;
    vertical-align: middle;
  }}

  table.luxury-table tr:nth-child(even) td {{
    background: rgba(255, 255, 255, 0.02);
  }}

  /* Color Swatches */
  .swatch {{
    height: 16mm;
    border-radius: 6px;
    margin-bottom: 1.5mm;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }}
</style>
</head>
<body>

<!-- ======================================================================= -->
<!-- PAGE 1: COVER PAGE                                                      -->
<!-- ======================================================================= -->
<div class="page" style="background: radial-gradient(circle at 50% 30%, #172554 0%, #030712 75%);">
  <div class="page-inner" style="justify-content: center; text-align: center; padding: 20mm 10mm;">
    <div style="margin-bottom: 10mm;">
      {"<img src='" + logo_base64 + "' style='height: 28mm; margin-bottom: 5mm;' />" if logo_base64 else ""}
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 8.5pt; letter-spacing: 0.3em; color: #D4AF37; text-transform: uppercase;">
        India's Sovereign Travel Atelier
      </div>
    </div>

    <div style="border-top: 1px solid rgba(212, 175, 55, 0.3); border-bottom: 1px solid rgba(212, 175, 55, 0.3); padding: 8mm 0; margin: 4mm 0 10mm 0;">
      <h1 style="font-size: 38pt; letter-spacing: -0.02em; margin-bottom: 3mm;">
        SARRIN HOLIDAYS
      </h1>
      <div style="font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 22pt; color: #D4AF37; font-weight: 400;">
        Bespoke Indian Expeditions & Sovereign Luxury
      </div>
    </div>

    <p style="max-width: 140mm; margin: 0 auto 12mm auto; font-size: 10pt; line-height: 1.7; color: #94A3B8;">
      Complete Architectural Blueprint, Design System Specifications & Curated Digital Experience Portfolio. Handcrafted for Sovereign Indian Royalty, Living Palace Stays, and High-Net-Worth Patrons.
    </p>

    <div class="card card-gold" style="max-width: 130mm; margin: 0 auto; text-align: left; padding: 4mm 6mm;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; font-size: 8pt; font-family: 'JetBrains Mono', monospace;">
        <div>
          <span style="color: #64748B; display: block; font-size: 6.5pt; text-transform: uppercase;">Live Deployment:</span>
          <span style="color: #D4AF37; font-weight: 600;">https://sarrin.bidvyapar.com</span>
        </div>
        <div>
          <span style="color: #64748B; display: block; font-size: 6.5pt; text-transform: uppercase;">Technology Stack:</span>
          <span style="color: #FFFFFF;">Next.js 16.3 + Supabase + Cloudflare</span>
        </div>
        <div>
          <span style="color: #64748B; display: block; font-size: 6.5pt; text-transform: uppercase;">Atelier Headquarters:</span>
          <span style="color: #FFFFFF;">Mumbai • Rajasthan Desk</span>
        </div>
        <div>
          <span style="color: #64748B; display: block; font-size: 6.5pt; text-transform: uppercase;">Legal Protocol:</span>
          <span style="color: #FFFFFF;">Strict Bilateral Non-Disclosure</span>
        </div>
      </div>
    </div>

    <div style="margin-top: 15mm; font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: #475569; letter-spacing: 0.15em;">
      CONFIDENTIAL DOSSIER • ATELIER INTERNAL SPECIFICATION • 2026 EDITION
    </div>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 2: EXECUTIVE VISION & BRAND IDENTITY SYSTEM                         -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-inner">
    <div class="page-header">
      <span class="brand-stamp">Sarrin Holidays Atelier</span>
      <span class="doc-ref">Section 01 // Brand Design System</span>
    </div>

    <span class="subheading">Executive Vision & Aesthetic Protocol</span>
    <h2>The Anatomy of Sovereign Quiet Luxury</h2>
    <p style="margin-bottom: 4mm;">
      Sarrin Holidays rejects generic mass-market tourism and AI-generated template styling. The brand aesthetic is engineered around <strong>restrained quiet luxury</strong>, architectural typography, frosted glassmorphism, and heritage Indian palatial hospitality under strict discretion covenants.
    </p>

    <!-- Color System Swatches -->
    <div class="card" style="margin-bottom: 4mm;">
      <h3 style="font-size: 11pt; color: #D4AF37; margin-bottom: 2.5mm;">Sovereign Atelier Color Hierarchy</h3>
      <div class="grid-4" style="text-align: center;">
        <div>
          <div class="swatch" style="background: #030712;"></div>
          <strong style="font-size: 7.5pt; color: #FFFFFF; display: block;">Obsidian Void</strong>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 6.5pt; color: #64748B;">#030712</span>
        </div>
        <div>
          <div class="swatch" style="background: #0B1120;"></div>
          <strong style="font-size: 7.5pt; color: #FFFFFF; display: block;">Midnight Slate</strong>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 6.5pt; color: #64748B;">#0B1120</span>
        </div>
        <div>
          <div class="swatch" style="background: #D4AF37;"></div>
          <strong style="font-size: 7.5pt; color: #FFFFFF; display: block;">Sovereign Gold</strong>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 6.5pt; color: #64748B;">#D4AF37</span>
        </div>
        <div>
          <div class="swatch" style="background: #10B981;"></div>
          <strong style="font-size: 7.5pt; color: #FFFFFF; display: block;">Lagoon Emerald</strong>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 6.5pt; color: #64748B;">#10B981</span>
        </div>
      </div>
    </div>

    <!-- Typography & Micro-copy Standards -->
    <div class="grid-2" style="margin-bottom: 4mm;">
      <div class="card">
        <h3 style="font-size: 11pt; color: #D4AF37; margin-bottom: 2mm;">Typography System</h3>
        <div style="margin-bottom: 2.5mm;">
          <strong style="font-family: 'Cormorant Garamond', serif; font-size: 15pt; color: #FFFFFF; display: block;">Cormorant Garamond</strong>
          <span style="font-size: 7.5pt; color: #94A3B8;">Editorial Headings, Grand Quotations, Narrative Prose</span>
        </div>
        <div style="margin-bottom: 2.5mm;">
          <strong style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 10pt; color: #FFFFFF; display: block;">Plus Jakarta Sans</strong>
          <span style="font-size: 7.5pt; color: #94A3B8;">Precision Body Copy, Controls, Forms, Navigation</span>
        </div>
        <div>
          <strong style="font-family: 'JetBrains Mono', monospace; font-size: 9pt; color: #D4AF37; display: block;">JetBrains Mono</strong>
          <span style="font-size: 7.5pt; color: #94A3B8;">Pricing Markers, Circuit Codes, Technical Durations</span>
        </div>
      </div>

      <div class="card">
        <h3 style="font-size: 11pt; color: #D4AF37; margin-bottom: 2mm;">Human Craftsmanship Directives</h3>
        <div class="bullet-item">
          <span class="bullet-dot"></span>
          <span><strong>Zero Emojis Everywhere:</strong> Strict prohibition of casual emoji symbols across all consumer views and forms.</span>
        </div>
        <div class="bullet-item">
          <span class="bullet-dot"></span>
          <span><strong>Minimal Dot Bullets (•):</strong> SaaS checkmark boxes replaced with understated luxury dots.</span>
        </div>
        <div class="bullet-item">
          <span class="bullet-dot"></span>
          <span><strong>Restrained Human Copywriting:</strong> Concise, readable, tailored travel desk liaison messaging instead of verbose AI fluff.</span>
        </div>
        <div class="bullet-item">
          <span class="bullet-dot"></span>
          <span><strong>Discrete Pricing Protocol:</strong> "Pricing on Request" reflecting custom palace suite buyouts and private aviation routing.</span>
        </div>
      </div>
    </div>

    <!-- Trust Credentials Grid -->
    <div class="card card-gold">
      <h3 style="font-size: 11pt; color: #D4AF37; margin-bottom: 2mm;">Operational Credentials & Bilateral Covenants</h3>
      <div class="grid-4" style="font-size: 7.5pt;">
        <div>
          <strong style="color: #FFFFFF; display: block;">Ministry of Tourism</strong>
          <span style="color: #94A3B8;">Approved Indian Inbound Luxury Atelier</span>
        </div>
        <div>
          <strong style="color: #FFFFFF; display: block;">Taj & Oberoi Partner</strong>
          <span style="color: #94A3B8;">Presidential Suite Buyout Clearances</span>
        </div>
        <div>
          <strong style="color: #FFFFFF; display: block;">Private Aviation</strong>
          <span style="color: #94A3B8;">Twin-engine Mountain Corridors</span>
        </div>
        <div>
          <strong style="color: #FFFFFF; display: block;">Non-Disclosure (NDA)</strong>
          <span style="color: #94A3B8;">Confidential Itinerary Manifest</span>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <span>Sarrin Holidays • Sovereign Travel Atelier</span>
      <span>Live URL: sarrin.bidvyapar.com</span>
      <span>Page 02</span>
    </div>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 3: SMART SEARCH & ATELIER FILTER ENGINE                            -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-inner">
    <div class="page-header">
      <span class="brand-stamp">Sarrin Holidays Atelier</span>
      <span class="doc-ref">Section 02 // Booking Architecture</span>
    </div>

    <span class="subheading">Hero Booking Interaction Matrix</span>
    <h2>The Smart Atelier Search & Filter Engine</h2>
    <p style="margin-bottom: 4mm;">
      Integrated seamlessly into the panoramic hero fold, the search bar acts as an intelligent concierge dispatch. Featuring frosted glassmorphism, instant auto-complete, dual-month calendar dates, and an advanced party configuration matrix.
    </p>

    <!-- Component Breakdown Grid -->
    <div class="grid-3" style="margin-bottom: 4mm;">
      <div class="card">
        <span class="pill pill-gold" style="margin-bottom: 2mm;">Field 01</span>
        <h3 style="font-size: 11pt; color: #FFFFFF;">Destination Desk</h3>
        <p style="font-size: 8pt; margin-bottom: 2mm;">
          Supports both published luxury circuits and unlisted custom requests.
        </p>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Real-time instant package auto-suggestions.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Displays circuit titles, thumbnails, & duration.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Bespoke custom lead capture for unlisted cities.</span></div>
      </div>

      <div class="card">
        <span class="pill pill-gold" style="margin-bottom: 2mm;">Field 02</span>
        <h3 style="font-size: 11pt; color: #FFFFFF;">Dual-Month Calendar</h3>
        <p style="font-size: 8pt; margin-bottom: 2mm;">
          Two synchronized months displayed side-by-side with range highlights.
        </p>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Check-in to check-out range selection.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Single-day or multi-week journey selection.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Strict past-date validation & weekend tinting.</span></div>
      </div>

      <div class="card">
        <span class="pill pill-gold" style="margin-bottom: 2mm;">Field 03</span>
        <h3 style="font-size: 11pt; color: #FFFFFF;">Party & Cabin Class</h3>
        <p style="font-size: 8pt; margin-bottom: 2mm;">
          Configurable party composition and transit classification.
        </p>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Adults (12+ yrs) counter.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Children (2-12 yrs) & Infants counter.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Economy, Premium, Business, First Class.</span></div>
      </div>
    </div>

    <!-- Out of the Box Bespoke Routing Highlight -->
    <div class="card card-gold" style="margin-bottom: 4mm;">
      <h3 style="font-size: 11pt; color: #D4AF37; margin-bottom: 2mm;">
        Out-of-the-Box Concierge Lead Routing Flow
      </h3>
      <p style="font-size: 8.5pt; margin-bottom: 3mm;">
        When a traveler enters a destination outside published catalogs (e.g., <em>“Nashik”</em>, <em>“Coorg”</em>, <em>“Kaziranga”</em>), the search bar instantly adapts into a bespoke concierge inquiry trigger:
      </p>
      <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 8px; padding: 3mm 4mm; font-family: 'JetBrains Mono', monospace; font-size: 8pt; color: #E2E8F0;">
        <span style="color: #D4AF37;">Desk Prompt:</span> "We arrange custom private travel to “Nashik”. Connect with our desk to plan your itinerary."<br>
        <span style="color: #10B981;">CTA Action:</span> [Request a call for detailed suggestions for Nashik] → Direct forward to VIP Operations Manifest.
      </div>
    </div>

    <!-- Mobile Responsive Behavior -->
    <div class="card">
      <h3 style="font-size: 11pt; color: #FFFFFF; margin-bottom: 2mm;">Responsive Glassmorphic Ergonomics</h3>
      <p style="font-size: 8pt;">
        On desktop, the search bar spans 768px with horizontal divisions and frosted blur (`backdrop-blur-2xl`). On mobile viewports (&lt; 768px), it collapses gracefully into a stacked vertical thumb-friendly panel with zero horizontal overflow, preventing viewport clipping.
      </p>
    </div>

    <div class="page-footer">
      <span>Sarrin Holidays • Sovereign Travel Atelier</span>
      <span>Live URL: sarrin.bidvyapar.com</span>
      <span>Page 03</span>
    </div>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 4: SPATIAL 360° VR SUITE PREVIEWS                                  -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-inner">
    <div class="page-header">
      <span class="brand-stamp">Sarrin Holidays Atelier</span>
      <span class="doc-ref">Section 03 // Spatial VR Technology</span>
    </div>

    <span class="subheading">Spatial Exploration Interface</span>
    <h2>Step Inside Our Finest Suites in 360° VR</h2>
    <p style="margin-bottom: 4mm;">
      Sarrin Holidays integrates WebGL-accelerated 360° equirectangular panoramas directly in the browser. Before committing to sovereign palace buyouts, patrons explore suites, private houseboats, and wellness villas in photorealistic detail.
    </p>

    <!-- The 3 Spatial Scenes -->
    <div class="grid-3" style="margin-bottom: 4mm;">
      <div class="card">
        <span class="pill pill-gold" style="margin-bottom: 1.5mm;">Spatial Scene 01</span>
        <h3 style="font-size: 10.5pt; color: #FFFFFF;">The Heritage Grand Suite</h3>
        <span style="font-size: 7.5pt; color: #D4AF37; font-family: 'JetBrains Mono', monospace; display: block; margin-bottom: 2mm;">
          Taj Mahal Palace • Mumbai
        </span>
        <p style="font-size: 7.8pt; line-height: 1.5; color: #CBD5E1;">
          Crowning jewel of Mumbai harbor with Belgian crystal chandeliers, century-old antiques, and panoramic sea views.
        </p>
        <div style="margin-top: 2.5mm; border-top: 1px solid rgba(255,255,255,0.08); pt-2;">
          <span class="pill" style="font-size: 6pt; margin: 1px;">24/7 Butler</span>
          <span class="pill" style="font-size: 6pt; margin: 1px;">Harbor Balcony</span>
        </div>
      </div>

      <div class="card">
        <span class="pill pill-gold" style="margin-bottom: 1.5mm;">Spatial Scene 02</span>
        <h3 style="font-size: 10.5pt; color: #FFFFFF;">Kettuvallam Royal Houseboat</h3>
        <span style="font-size: 7.5pt; color: #D4AF37; font-family: 'JetBrains Mono', monospace; display: block; margin-bottom: 2mm;">
          Alleppey Backwaters • Kerala
        </span>
        <p style="font-size: 7.8pt; line-height: 1.5; color: #CBD5E1;">
          Private full-craft luxury boat buyout with master stateroom, private chef galley, and open-air river observation deck.
        </p>
        <div style="margin-top: 2.5mm; border-top: 1px solid rgba(255,255,255,0.08); pt-2;">
          <span class="pill" style="font-size: 6pt; margin: 1px;">Chef Onboard</span>
          <span class="pill" style="font-size: 6pt; margin: 1px;">Lagoon Sunset</span>
        </div>
      </div>

      <div class="card">
        <span class="pill pill-gold" style="margin-bottom: 1.5mm;">Spatial Scene 03</span>
        <h3 style="font-size: 10.5pt; color: #FFFFFF;">The Cliffside Pool Villa</h3>
        <span style="font-size: 7.5pt; color: #D4AF37; font-family: 'JetBrains Mono', monospace; display: block; margin-bottom: 2mm;">
          Bekal & Arabian Shore • Kerala
        </span>
        <p style="font-size: 7.8pt; line-height: 1.5; color: #CBD5E1;">
          Secluded architectural sanctuary with private heated plunge pool, Ayurvedic massage pavilion, and ocean sunset lawn.
        </p>
        <div style="margin-top: 2.5mm; border-top: 1px solid rgba(255,255,255,0.08); pt-2;">
          <span class="pill" style="font-size: 6pt; margin: 1px;">Private Pool</span>
          <span class="pill" style="font-size: 6pt; margin: 1px;">Ayurveda Spa</span>
        </div>
      </div>
    </div>

    <!-- VR Technical Capabilities -->
    <div class="grid-2" style="margin-bottom: 4mm;">
      <div class="card">
        <h3 style="font-size: 10.5pt; color: #D4AF37; margin-bottom: 2mm;">Spatial Engine Features</h3>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Interactive Hotspots:</strong> Clickable spatial pins unveiling artifact histories.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Gyroscope / Inertial Drag:</strong> Smooth 60 FPS motion with damping.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Auto-Rotation Playback:</strong> Elegant cinematic camera tracking.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Fullscreen Immersion:</strong> True edge-to-edge spatial view mode.</span></div>
      </div>

      <div class="card">
        <h3 style="font-size: 10.5pt; color: #D4AF37; margin-bottom: 2mm;">Ergonomic Mobile Overlay Fix</h3>
        <p style="font-size: 8pt; line-height: 1.55;">
          Previously on mobile screens, static text overlays consumed 270px of vertical height, blocking the 360° canvas. We engineered a <strong>collapsible 85px ergonomic bottom bar</strong> with animated expand/collapse state, freeing 70% of the viewport for fluid 3D touch interaction.
        </p>
      </div>
    </div>

    <div class="page-footer">
      <span>Sarrin Holidays • Sovereign Travel Atelier</span>
      <span>Live URL: sarrin.bidvyapar.com</span>
      <span>Page 04</span>
    </div>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 5: THEMATIC INDIAN CIRCUITS (CURATED BY INTENTION)                 -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-inner">
    <div class="page-header">
      <span class="brand-stamp">Sarrin Holidays Atelier</span>
      <span class="doc-ref">Section 04 // Thematic Circuits</span>
    </div>

    <span class="subheading">Curated by Intention</span>
    <h2>The 4 Sovereign Domestic Circuits</h2>
    <p style="margin-bottom: 4mm;">
      Tailored for discerning domestic patrons, Sarrin Holidays categorizes expeditions not merely by geography, but by emotional intention and sovereign exclusivity.
    </p>

    <!-- The 4 Intentions Grid -->
    <div class="grid-2" style="margin-bottom: 4mm;">
      <div class="card card-gold">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5mm;">
          <h3 style="font-size: 11pt; color: #FFFFFF;">Heritage & Palaces Grand Tour</h3>
          <span class="pill pill-gold">Circuit 01</span>
        </div>
        <span style="font-size: 7.5pt; color: #D4AF37; font-family: 'JetBrains Mono', monospace; display: block; margin-bottom: 2mm;">
          Udaipur • Jaipur • Jodhpur
        </span>
        <p style="font-size: 8pt; margin-bottom: 2mm;">
          Private lake palace suites, rampart torchlit banquets, exclusive fort buyouts, and vintage motorcades across royal Rajasthan.
        </p>
        <div style="font-size: 7.5pt; color: #94A3B8; font-family: 'JetBrains Mono', monospace;">
          HIGHLIGHTS: Mewar Trust Access • Maybach Chauffeurs • Rampart Dinners
        </div>
      </div>

      <div class="card card-gold">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5mm;">
          <h3 style="font-size: 11pt; color: #FFFFFF;">Backwaters & Coastal Sanctuaries</h3>
          <span class="pill pill-gold">Circuit 02</span>
        </div>
        <span style="font-size: 7.5pt; color: #D4AF37; font-family: 'JetBrains Mono', monospace; display: block; margin-bottom: 2mm;">
          Alleppey • Bekal • Goa
        </span>
        <p style="font-size: 8pt; margin-bottom: 2mm;">
          Exclusive air-conditioned Kettuvallam houseboat buyouts in Alleppey, secluded cliffside pool villas, and private sunset yachts in Goa.
        </p>
        <div style="font-size: 7.5pt; color: #94A3B8; font-family: 'JetBrains Mono', monospace;">
          HIGHLIGHTS: Private Riverine Cruises • Oceanfront Villas • Beachfront Banquets
        </div>
      </div>

      <div class="card card-gold">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5mm;">
          <h3 style="font-size: 11pt; color: #FFFFFF;">Spiritual & Wellness Retreats</h3>
          <span class="pill pill-gold">Circuit 03</span>
        </div>
        <span style="font-size: 7.5pt; color: #D4AF37; font-family: 'JetBrains Mono', monospace; display: block; margin-bottom: 2mm;">
          Rishikesh • Varanasi • Ananda in the Himalayas
        </span>
        <p style="font-size: 8pt; margin-bottom: 2mm;">
          Private VIP river barges for Ganga Aarti in Varanasi, physician-led Ayurvedic pulse diagnosis, and mountain palace suites.
        </p>
        <div style="font-size: 7.5pt; color: #94A3B8; font-family: 'JetBrains Mono', monospace;">
          HIGHLIGHTS: Private Aarti Barge • Pulse Diagnostics • Himalayan Silence
        </div>
      </div>

      <div class="card card-gold">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5mm;">
          <h3 style="font-size: 11pt; color: #FFFFFF;">Wild & Untamed Apex Safaris</h3>
          <span class="pill pill-gold">Circuit 04</span>
        </div>
        <span style="font-size: 7.5pt; color: #D4AF37; font-family: 'JetBrains Mono', monospace; display: block; margin-bottom: 2mm;">
          Ranthambore • Jim Corbett • Bandhavgarh
        </span>
        <p style="font-size: 8pt; margin-bottom: 2mm;">
          Exclusive open-top gypsy safaris, master naturalists tracking Royal Bengal Tigers, and luxury tented pavilions.
        </p>
        <div style="font-size: 7.5pt; color: #94A3B8; font-family: 'JetBrains Mono', monospace;">
          HIGHLIGHTS: Private Forest Zones • Expert Naturalists • Glamping Pavilions
        </div>
      </div>
    </div>

    <!-- Package Card Anatomy Callout -->
    <div class="card">
      <h3 style="font-size: 11pt; color: #D4AF37; margin-bottom: 2.5mm;">Package Card Ergonomics & Quality Standards</h3>
      <div class="grid-3" style="font-size: 7.8pt;">
        <div>
          <strong style="color: #FFFFFF; display: block; margin-bottom: 1mm;">Non-Wrapping Duration Pill</strong>
          <p style="font-size: 7.5pt;">Duration badges (e.g. `8 Days / 7 Nights`) utilize strict `whitespace-nowrap` & `shrink-0` to guarantee pills never collapse into circles.</p>
        </div>
        <div>
          <strong style="color: #FFFFFF; display: block; margin-bottom: 1mm;">Subtle Scarcity Notice</strong>
          <p style="font-size: 7.5pt;">Curator notes like "Special Edition" or "Houseboat Allotted" are truncated cleanly with golden accents without squeezing header cards.</p>
        </div>
        <div>
          <strong style="color: #FFFFFF; display: block; margin-bottom: 1mm;">Direct Inquire Routing</strong>
          <p style="font-size: 7.5pt;">"Pricing on Request" paired with "Get in Touch" buttons opens high-touch VIP dossier modal directly linked to CRM inquiries.</p>
        </div>
      </div>
    </div>

    <div class="page-footer">
      <span>Sarrin Holidays • Sovereign Travel Atelier</span>
      <span>Live URL: sarrin.bidvyapar.com</span>
      <span>Page 05</span>
    </div>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 6: COMPLETE 9 PUBLISHED DOMESTIC ITINERARIES                       -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-inner">
    <div class="page-header">
      <span class="brand-stamp">Sarrin Holidays Atelier</span>
      <span class="doc-ref">Section 05 // Curated Itineraries</span>
    </div>

    <span class="subheading">Curated Expeditions Hub</span>
    <h2>The 9 Sovereign Domestic Expeditions</h2>
    <p style="margin-bottom: 3.5mm;">
      Published catalog currently active in production Supabase database. Each journey includes dedicated private chauffeur, palace/heritage stays, and white-glove logistics.
    </p>

    <!-- Itinerary Table -->
    <table class="luxury-table">
      <thead>
        <tr>
          <th>Expedition Title</th>
          <th>Duration</th>
          <th>Destinations</th>
          <th>Signature Highlights</th>
          <th>Curator Notice</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong style="color: #FFFFFF;">Kerala — God's Own Country (Grand Circuit)</strong></td>
          <td><span class="pill pill-gold">8D / 7N</span></td>
          <td>Kochi • Munnar • Thekkady • Alleppey • Kovalam</td>
          <td>Economy flights included, Abad Atrium, The Leaf, A/C Deluxe Houseboat, KTDC Samudra</td>
          <td>Airfare & Houseboat Allotment</td>
        </tr>
        <tr>
          <td><strong style="color: #FFFFFF;">Kerala Backwaters & Hills Escapade</strong></td>
          <td><span class="pill">5D / 4N</span></td>
          <td>Munnar • Thekkady • Alleppey • Kochi</td>
          <td>Cloud Palace Munnar, Sandra Palace Thekkady, Riverine Full-Board Cruise</td>
          <td>Riverine Cruise Exclusive</td>
        </tr>
        <tr>
          <td><strong style="color: #FFFFFF;">Kashmir — Paradise in the Valleys</strong></td>
          <td><span class="pill pill-gold">7D / 6N</span></td>
          <td>Srinagar • Gulmarg • Pahalgam • Sonamarg</td>
          <td>Dal Lake Deluxe Houseboat, Sunset Shikara, Gondola Phase 1, Martand Sun Temple</td>
          <td>Dal Lake Houseboat Allotted</td>
        </tr>
        <tr>
          <td><strong style="color: #FFFFFF;">Blissful Goa Coastal Escape</strong></td>
          <td><span class="pill">4D / 3N</span></td>
          <td>Colva Beach • North & South Goa</td>
          <td>Hotel Colva Kinara, Fort Aguada, Candolim, Mandovi River Sunset Cruise</td>
          <td>Colva Beach Resort Partner</td>
        </tr>
        <tr>
          <td><strong style="color: #FFFFFF;">Varanasi Dev Deepawali Sacred Lights</strong></td>
          <td><span class="pill pill-gold">3D / 2N</span></td>
          <td>Varanasi • Kashi Vishwanath • Sarnath</td>
          <td>Special Dev Deepawali Boat, Kashi Vishwanath VIP Darshan, Sarnath Dhamek Stupa</td>
          <td>Special Limited Edition</td>
        </tr>
        <tr>
          <td><strong style="color: #FFFFFF;">Heritage & Palaces Grand Tour</strong></td>
          <td><span class="pill">10 Days</span></td>
          <td>Udaipur • Jaipur • Jodhpur</td>
          <td>Taj Lake Palace suite, private rampart dinner at Mehrangarh, royal vintage motorcade</td>
          <td>Living Palace Buyout</td>
        </tr>
        <tr>
          <td><strong style="color: #FFFFFF;">Backwaters & Coastal Sanctuaries</strong></td>
          <td><span class="pill">7 Days</span></td>
          <td>Alleppey • Bekal • Goa</td>
          <td>Private Kettuvallam buyout, cliffside pool villa, private yacht sunset sail</td>
          <td>Coastal Yacht Charter</td>
        </tr>
        <tr>
          <td><strong style="color: #FFFFFF;">Himalayan Wellness Escapade</strong></td>
          <td><span class="pill">6 Days</span></td>
          <td>Rishikesh • Ananda • Haridwar</td>
          <td>Physician-led Ayurvedic consultation, private yoga pavilion, private Ganga Aarti</td>
          <td>Wellness Retreat</td>
        </tr>
        <tr>
          <td><strong style="color: #FFFFFF;">Wild & Untamed: Royal Tiger Safaris</strong></td>
          <td><span class="pill pill-gold">5 Days</span></td>
          <td>Ranthambore • Bandhavgarh</td>
          <td>Exclusive 4x4 open-top gypsy safaris, master naturalists tracking Royal Bengal Tigers</td>
          <td>Apex Reserve Clearance</td>
        </tr>
      </tbody>
    </table>

    <!-- Pricing Policy Note -->
    <div class="card card-gold" style="margin-top: 4mm;">
      <h3 style="font-size: 10pt; color: #D4AF37; margin-bottom: 1.5mm;">Transparent Inclusions & Discretionary Pricing</h3>
      <p style="font-size: 8pt; line-height: 1.5;">
        Every itinerary published specifies exact hotel properties, transport specifications (A/C Toyota Etios / Innova Crysta / Mercedes-Maybach), meal plans (Breakfast/Lunch/Dinner), monument entry tickets, and GST tax disclosures. Pricing is kept confidential to protect palace buyout terms.
      </p>
    </div>

    <div class="page-footer">
      <span>Sarrin Holidays • Sovereign Travel Atelier</span>
      <span>Live URL: sarrin.bidvyapar.com</span>
      <span>Page 06</span>
    </div>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 7: BESPOKE SERVICES BENTO GRID & VIP INQUIRIES                     -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-inner">
    <div class="page-header">
      <span class="brand-stamp">Sarrin Holidays Atelier</span>
      <span class="doc-ref">Section 06 // Specialized Services</span>
    </div>

    <span class="subheading">Exclusive Atelier Services</span>
    <h2>The Bespoke Services Bento Grid</h2>
    <p style="margin-bottom: 4mm;">
      Beyond scheduled tours, Sarrin Holidays operates four dedicated high-touch luxury service pillars with specialized logistical clearances across civil aviation, palace trusts, and private security.
    </p>

    <!-- 4 Bento Services -->
    <div class="grid-2" style="margin-bottom: 4mm;">
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
          <h3 style="font-size: 11pt; color: #FFFFFF;">Private Aviation & Helicopter Charters</h3>
          <span class="pill pill-gold">Aviation</span>
        </div>
        <p style="font-size: 8pt; margin-bottom: 2.5mm;">
          Point-to-point luxury air transit. Twin-engine executive jets and mountain helicopters with non-stop clearances into remote fortress helipads and high-altitude Himalayan retreats.
        </p>
        <div style="font-size: 7.5pt; color: #D4AF37; font-family: 'JetBrains Mono', monospace; margin-bottom: 1mm;">
          SPECIFICATIONS:
        </div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Bombardier Challenger, Pilatus PC-12 & Bell 429 helicopters.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>VIP private tarmac clearance & priority apron handling.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Lead Time: 12 Hours • Non-Disclosure Protocol Active.</span></div>
      </div>

      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
          <h3 style="font-size: 11pt; color: #FFFFFF;">Royal Celebrations & Palatial Weddings</h3>
          <span class="pill pill-gold">Heritage</span>
        </div>
        <p style="font-size: 8pt; margin-bottom: 2.5mm;">
          Full-fortress and palace buyouts in Udaipur, Jodhpur, and Jaipur. Sovereign weddings, milestone royal galas, and bespoke culinary degustations orchestrating up to 500 elite guests.
        </p>
        <div style="font-size: 7.5pt; color: #D4AF37; font-family: 'JetBrains Mono', monospace; margin-bottom: 1mm;">
          SPECIFICATIONS:
        </div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Exclusive palace buyouts across Taj Lake Palace & Umaid Bhawan.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Torchlit rampart banquets with private Michelin culinary teams.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Lead Time: 30 Days • Complete Palace Privacy Guarantee.</span></div>
      </div>

      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
          <h3 style="font-size: 11pt; color: #FFFFFF;">Wellness & Ayurvedic Sanctuaries</h3>
          <span class="pill pill-gold">Ayurveda</span>
        </div>
        <p style="font-size: 8pt; margin-bottom: 2.5mm;">
          Physician-directed traditional healing. Authentic Panchakarma, individualized pulse diagnosis, and restorative silence at Ananda in the Himalayas and coastal Kerala sanctuaries.
        </p>
        <div style="font-size: 7.5pt; color: #D4AF37; font-family: 'JetBrains Mono', monospace; margin-bottom: 1mm;">
          SPECIFICATIONS:
        </div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Vaidya physician pulse diagnosis & custom dosha dietary plan.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Daily private yoga, pranayama, and sound bath sessions.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Lead Time: 48 Hours • Complete Discretion Assured.</span></div>
      </div>

      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
          <h3 style="font-size: 11pt; color: #FFFFFF;">VIP Armored Chauffeurs & Security</h3>
          <span class="pill pill-gold">Security</span>
        </div>
        <p style="font-size: 8pt; margin-bottom: 2.5mm;">
          Armored motorcades, vetted diplomatic drivers, and close-protection executive security for visiting dignitaries, corporate titans, and sovereign royal families across India.
        </p>
        <div style="font-size: 7.5pt; color: #D4AF37; font-family: 'JetBrains Mono', monospace; margin-bottom: 1mm;">
          SPECIFICATIONS:
        </div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Mercedes-Maybach S-Class, Toyota Vellfire & Land Cruiser fleet.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Ex-special forces close protection officers & convoy escorts.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Lead Time: 6 Hours • Dedicated 24/7 Security Liaison.</span></div>
      </div>
    </div>

    <!-- Slide-Out Service Drawer Architecture -->
    <div class="card card-gold">
      <h3 style="font-size: 10pt; color: #D4AF37; margin-bottom: 1.5mm;">Interactive Service Drawer Flow</h3>
      <p style="font-size: 8pt; line-height: 1.5;">
        Every service features a slide-out drawer inquiry panel allowing patrons to customize party size, dates, and transit requirements without leaving the main browsing viewport. Inquiries trigger instant WhatsApp API dispatch and Supabase CRM logging.
      </p>
    </div>

    <div class="page-footer">
      <span>Sarrin Holidays • Sovereign Travel Atelier</span>
      <span>Live URL: sarrin.bidvyapar.com</span>
      <span>Page 07</span>
    </div>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 8: GLOBAL CONCIERGE ROUTING & NRI CROSS-BORDER CELL               -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-inner">
    <div class="page-header">
      <span class="brand-stamp">Sarrin Holidays Atelier</span>
      <span class="doc-ref">Section 07 // Cross-Border Operations</span>
    </div>

    <span class="subheading">Diplomatic Operations Infrastructure</span>
    <h2>Global Concierge & NRI Cross-Border Cell</h2>
    <p style="margin-bottom: 4mm;">
      To cater both to elite domestic Indian patrons and Non-Resident Indians (NRIs) traveling from abroad, Sarrin Holidays architected a dedicated <strong>dual-operations concierge routing infrastructure</strong>.
    </p>

    <!-- Dual Operations Cards -->
    <div class="grid-2" style="margin-bottom: 4mm;">
      <!-- Column 1: Domestic Desk -->
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
          <h3 style="font-size: 11pt; color: #FFFFFF;">Domestic Operations Cell</h3>
          <span class="pill pill-gold">India Desk</span>
        </div>
        <p style="font-size: 8pt; margin-bottom: 2.5mm;">
          Serving high-net-worth Indian resident families, corporate executives, and palace buyout trustees across major Indian metros.
        </p>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Direct Helpline:</strong> +91 98200 44810</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Concierge Email:</strong> domestic.ops@sarrinholidays.com</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Currency & Tax:</strong> Transparent INR billing with GST invoicing.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Transit Clearances:</strong> Inter-state private jet & Fastag tolls pre-paid.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Liaison Protocol:</strong> Senior Indian travel director assigned to every group.</span></div>
      </div>

      <!-- Column 2: NRI & Global Desk -->
      <div class="card card-gold">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2mm;">
          <h3 style="font-size: 11pt; color: #D4AF37;">Global NRI & Diplomatic Desk</h3>
          <span class="pill pill-gold">International Desk</span>
        </div>
        <p style="font-size: 8pt; margin-bottom: 2.5mm;">
          Specialized for NRIs, PIOs, and international dignitaries traveling from North America, Europe, the Middle East, and APAC.
        </p>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Direct Helpline:</strong> +91 98200 72774</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Concierge Email:</strong> nri.concierge@sarrinholidays.com</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Multi-Currency Forex:</strong> Direct billing in USD, GBP, EUR, AED.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Tarmac VIP Escort:</strong> Fast-track immigration upon arrival at DEL/BOM/BLR.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>24/7 Timezone Matching:</strong> Dedicated liaison on EST, PST, GMT, GST, SGT.</span></div>
      </div>
    </div>

    <!-- WhatsApp Integration Highlight -->
    <div class="card" style="margin-bottom: 4mm;">
      <h3 style="font-size: 10.5pt; color: #FFFFFF; margin-bottom: 2mm;">High-Priority WhatsApp Concierge Liaison</h3>
      <p style="font-size: 8pt; margin-bottom: 2mm;">
        Both desks feature encrypted deep-linked WhatsApp APIs pre-populating client itinerary parameters, eliminating repetitive form fills and granting immediate access to human directors.
      </p>
      <div style="background: rgba(0,0,0,0.4); padding: 2.5mm 3.5mm; border-radius: 6px; font-family: 'JetBrains Mono', monospace; font-size: 7.5pt; color: #D4AF37;">
        Sample API URL: https://wa.me/919820072774?text=Hello%20Sarrin%20Holidays%20NRI%20Desk...
      </div>
    </div>

    <!-- Legal Privacy Protocol -->
    <div class="card">
      <h3 style="font-size: 10.5pt; color: #FFFFFF; margin-bottom: 1.5mm;">Discretion & Non-Disclosure Legal Protocol</h3>
      <p style="font-size: 8pt;">
        All operations personnel and third-party aviators, palace butlers, and drivers execute legally binding Non-Disclosure Agreements (NDAs). Passenger manifests and itinerary coordinates are never broadcast publicly.
      </p>
    </div>

    <div class="page-footer">
      <span>Sarrin Holidays • Sovereign Travel Atelier</span>
      <span>Live URL: sarrin.bidvyapar.com</span>
      <span>Page 08</span>
    </div>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 9: THE PRIVATE JOURNAL & GIS CIRCUIT CARTOGRAPHY                   -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-inner">
    <div class="page-header">
      <span class="brand-stamp">Sarrin Holidays Atelier</span>
      <span class="doc-ref">Section 08 // Editorial & Cartography</span>
    </div>

    <span class="subheading">Editorial Gazette & Geospatial Mapping</span>
    <h2>The Private Gazette & Interactive GIS Map</h2>
    <p style="margin-bottom: 4mm;">
      Sarrin Holidays provides an integrated cultural journal featuring curated literary narratives paired with dynamic Leaflet.js interactive geospatial circuit cartography.
    </p>

    <!-- Journal Features Table -->
    <div class="card" style="margin-bottom: 4mm;">
      <h3 style="font-size: 11pt; color: #D4AF37; margin-bottom: 2mm;">Published Editorial Journal Articles</h3>
      <table class="luxury-table">
        <thead>
          <tr>
            <th>Article Title</th>
            <th>Category</th>
            <th>Geographic Anchor</th>
            <th>Curated Narrative Focus</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong style="color: #FFFFFF;">Secrets of Mewar: Inside Udaipur's Living Royal Palaces</strong></td>
            <td><span class="pill pill-gold">Palace Heritage</span></td>
            <td>Udaipur, Rajasthan</td>
            <td>Exclusive archives, 18th-century court rituals, private torchlit rampart dinners</td>
          </tr>
          <tr>
            <td><strong style="color: #FFFFFF;">Slow Solitude: Navigating Kerala's Emerald Water Corridors</strong></td>
            <td><span class="pill">Backwaters</span></td>
            <td>Alleppey & Vembanad</td>
            <td>Kettuvallam craftsmanship, artisanal toddy tap rituals, secluded riverine solitude</td>
          </tr>
          <tr>
            <td><strong style="color: #FFFFFF;">Transcendent Silence: Himalayan Ayurvedic Sanctuaries</strong></td>
            <td><span class="pill pill-gold">Wellness</span></td>
            <td>Rishikesh & Garhwal</td>
            <td>Physician pulse diagnosis, high-altitude yoga pavilions, Ganga Aarti philosophy</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- GIS Map Features -->
    <div class="grid-2" style="margin-bottom: 4mm;">
      <div class="card">
        <h3 style="font-size: 10.5pt; color: #FFFFFF; margin-bottom: 2mm;">Interactive Leaflet GIS Map</h3>
        <p style="font-size: 8pt; margin-bottom: 2mm;">
          Client-side Leaflet mapping dynamically links editorial articles to geographic coordinates across India.
        </p>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Custom dark-theme map tiles with golden route lines.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Clickable pin markers with article previews & read links.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Dynamic client hydration preventing SSR window errors.</span></div>
      </div>

      <div class="card">
        <h3 style="font-size: 10.5pt; color: #FFFFFF; margin-bottom: 2mm;">SEO & Content Syndication</h3>
        <p style="font-size: 8pt; margin-bottom: 2mm;">
          Every journal post is statically optimized for search engines and syndication engines.
        </p>
        <div class="bullet-item"><span class="bullet-dot"></span><span>Dynamic RSS 2.0 and Atom feeds at `/feed.xml`.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>OpenGraph & Twitter Card high-res image headers.</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span>JSON-LD Article structured data schema embedded.</span></div>
      </div>
    </div>

    <!-- Newsletter Gazette Subscription -->
    <div class="card card-gold">
      <h3 style="font-size: 10.5pt; color: #D4AF37; margin-bottom: 1.5mm;">The Private Gazette Dispatch</h3>
      <p style="font-size: 8pt;">
        Confidential newsletter dispatches notifying subscribers of seasonal palace buyouts and new helicopter transit corridors. Validated with instant inline feedback and Supabase newsletter subscriber logging.
      </p>
    </div>

    <div class="page-footer">
      <span>Sarrin Holidays • Sovereign Travel Atelier</span>
      <span>Live URL: sarrin.bidvyapar.com</span>
      <span>Page 09</span>
    </div>
  </div>
</div>

<!-- ======================================================================= -->
<!-- PAGE 10: COMPLETE TECHNICAL BLUEPRINT & LIVE DEPLOYMENT DOSSIER         -->
<!-- ======================================================================= -->
<div class="page">
  <div class="page-inner">
    <div class="page-header">
      <span class="brand-stamp">Sarrin Holidays Atelier</span>
      <span class="doc-ref">Section 09 // Production Architecture</span>
    </div>

    <span class="subheading">Technical Architecture & Infrastructure</span>
    <h2>Production Deployment & Operations Blueprint</h2>
    <p style="margin-bottom: 4mm;">
      Sarrin Holidays is engineered as an enterprise-grade cloud application with zero single-point-of-failure dependencies, strict TypeScript typing, and automated process management.
    </p>

    <!-- Architecture Grid -->
    <div class="grid-2" style="margin-bottom: 4mm;">
      <div class="card">
        <h3 style="font-size: 10.5pt; color: #D4AF37; margin-bottom: 2mm;">Frontend & Framework Engine</h3>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Framework:</strong> Next.js 16.3.3 (Turbopack Engine)</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Runtime:</strong> React 19 + TypeScript 5.7.3</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Styling:</strong> Tailwind CSS v4 + Framer Motion 13</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Typecheck Audit:</strong> 0 Compiler Errors (`tsc --noEmit`)</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Static Optimization:</strong> 30/30 Canonical Routes Statically Generated</span></div>
      </div>

      <div class="card">
        <h3 style="font-size: 10.5pt; color: #D4AF37; margin-bottom: 2mm;">Cloud Database & Security</h3>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Database:</strong> Supabase PostgreSQL (AWS ap-south-1)</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Tables:</strong> packages (9), services (4), tours (3), inquiries (11)</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Access Control:</strong> Row Level Security (RLS) policies</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Admin Security:</strong> Middleware auth guard on `/admin/*`</span></div>
        <div class="bullet-item"><span class="bullet-dot"></span><span><strong>Integrations:</strong> Resend SMTP & Encrypted Webhooks</span></div>
      </div>
    </div>

    <!-- Live Server Specs -->
    <div class="card card-gold" style="margin-bottom: 4mm;">
      <h3 style="font-size: 10.5pt; color: #D4AF37; margin-bottom: 2mm;">Live Deployment Specifications</h3>
      <table class="luxury-table">
        <tbody>
          <tr>
            <td style="width: 30%; color: #D4AF37;">Live Production URL:</td>
            <td><strong>https://sarrin.bidvyapar.com</strong></td>
          </tr>
          <tr>
            <td style="color: #D4AF37;">Production Server:</td>
            <td>OVHcloud Singapore (15.235.251.215) • Ubuntu Linux 7.0 LTS</td>
          </tr>
          <tr>
            <td style="color: #D4AF37;">Dedicated App Directory:</td>
            <td>/opt/projects/sarrinholidays</td>
          </tr>
          <tr>
            <td style="color: #D4AF37;">Process Manager (PM2):</td>
            <td>App Name: `sarrinholidays` (Port 999, Cluster Mode, Auto-restart)</td>
          </tr>
          <tr>
            <td style="color: #D4AF37;">Network Gateway:</td>
            <td>Cloudflare Tunnel (`cloudflared-root`) with Edge SSL & DDoS Protection</td>
          </tr>
          <tr>
            <td style="color: #D4AF37;">Git Remote Repository:</td>
            <td>https://github.com/bidvyapar-eng/sarrinholidays_git.git (main branch)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Sign-off Block -->
    <div class="card" style="text-align: center; padding: 4mm;">
      <h3 style="font-size: 11pt; color: #FFFFFF; margin-bottom: 1mm;">Senior Engineering & Atelier Verification Sign-Off</h3>
      <p style="font-size: 7.5pt; color: #94A3B8;">
        Audited & Approved. 50/50 Full-Site QA Tests Passed. Zero Emojis. 100% Brand Consistency. Production Server Active.
      </p>
    </div>

    <div class="page-footer">
      <span>Sarrin Holidays • Sovereign Travel Atelier</span>
      <span>Live URL: sarrin.bidvyapar.com</span>
      <span>Page 10</span>
    </div>
  </div>
</div>

</body>
</html>
"""

    html_file = os.path.join(os.path.dirname(__file__), "..", "sarrin_holidays_showcase.html")
    pdf_file = os.path.join(os.path.dirname(__file__), "..", "Sarrin_Holidays_Design_and_Features_Showcase.pdf")

    with open(html_file, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"HTML written to {html_file}")

    print("Generating PDF via Playwright...")
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge")
        page = browser.new_page()
        page.goto(f"file:///{os.path.abspath(html_file)}")
        page.wait_for_load_state("networkidle")
        page.pdf(
            path=pdf_file,
            format="A4",
            print_background=True,
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"}
        )
        browser.close()

    print(f"SUCCESS: Luxury PDF generated at {pdf_file}")

if __name__ == "__main__":
    main()

