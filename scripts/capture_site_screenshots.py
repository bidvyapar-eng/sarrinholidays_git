import os
import time
from playwright.sync_api import sync_playwright

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "screenshots_pdf")
os.makedirs(OUTPUT_DIR, exist_ok=True)

BASE_URL = "https://sarrin.bidvyapar.com"

def capture_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch(
            channel="chrome",
            headless=True,
            args=["--disable-gpu", "--disable-dev-shm-usage", "--no-sandbox"]
        )
        # 1440px desktop width, 2x retina
        context = browser.new_context(
            viewport={"width": 1440, "height": 960},
            device_scale_factor=2,
        )
        page = context.new_page()

        print(f"Navigating to {BASE_URL}...")
        page.goto(BASE_URL, wait_until="networkidle", timeout=45000)
        time.sleep(3)

        # 1. Full Homepage screenshot
        full_home_path = os.path.join(OUTPUT_DIR, "01_homepage_full.png")
        page.screenshot(path=full_home_path, full_page=True, animations="disabled")
        print(f"Saved: {full_home_path}")

        # 2. Hero Section
        hero_elem = page.locator("section").first
        if hero_elem.count() > 0:
            hero_elem.screenshot(path=os.path.join(OUTPUT_DIR, "02_hero_section.png"), animations="disabled")
            print("Saved: 02_hero_section.png")

        # 3. 360 VR Tour Section
        vr_elem = page.locator("#virtual-tour").first
        if vr_elem.count() > 0:
            vr_elem.screenshot(path=os.path.join(OUTPUT_DIR, "03_vr_tour_section.png"), animations="disabled")
            print("Saved: 03_vr_tour_section.png")

        # 4. Curated Indian Journeys (Packages Grid)
        dest_elem = page.locator("section#destinations, #destinations section").first
        if dest_elem.count() == 0:
            dest_elem = page.locator("#destinations").first
        if dest_elem.count() > 0:
            dest_elem.screenshot(path=os.path.join(OUTPUT_DIR, "04_packages_grid.png"), animations="disabled")
            print("Saved: 04_packages_grid.png")

        # 5. Warm Sandstone/Ivory Contrast Philosophy Section
        phil_elem = page.locator("#experiences").first
        if phil_elem.count() > 0:
            phil_elem.screenshot(path=os.path.join(OUTPUT_DIR, "05_philosophy_ivory.png"), animations="disabled")
            print("Saved: 05_philosophy_ivory.png")

        # 6. Cartographic Discovery Map Section
        map_elem = page.locator("#journal").first
        if map_elem.count() > 0:
            map_elem.screenshot(path=os.path.join(OUTPUT_DIR, "06_cartographic_map.png"), animations="disabled")
            print("Saved: 06_cartographic_map.png")

        # 7. Atelier Heritage & Stats Section
        about_elem = page.locator("#about").first
        if about_elem.count() > 0:
            about_elem.screenshot(path=os.path.join(OUTPUT_DIR, "07_atelier_heritage.png"), animations="disabled")
            print("Saved: 07_atelier_heritage.png")

        # 8. Luxury Footer
        footer_elem = page.locator("footer").first
        if footer_elem.count() > 0:
            footer_elem.screenshot(path=os.path.join(OUTPUT_DIR, "08_footer.png"), animations="disabled")
            print("Saved: 08_footer.png")

        # 9. Concierge Drawer (Triggered state)
        print("Triggering Concierge Drawer...")
        try:
            plan_btn = page.locator("button:has-text('Plan a Trip')").first
            if plan_btn.count() > 0:
                plan_btn.click()
                time.sleep(2)
                dialog_elem = page.locator("[role='dialog']").first
                if dialog_elem.count() > 0:
                    page.screenshot(path=os.path.join(OUTPUT_DIR, "09_concierge_drawer_active.png"), animations="disabled")
                    print("Saved: 09_concierge_drawer_active.png")
                page.keyboard.press("Escape")
                time.sleep(1)
        except Exception as e:
            print("Note on drawer screenshot:", e)

        # 10. Package Detail Page
        print("Capturing Package Detail Page...")
        try:
            page.goto(f"{BASE_URL}/packages/kerala-backwaters-hills-5d", wait_until="networkidle", timeout=30000)
            time.sleep(3)
            page.screenshot(path=os.path.join(OUTPUT_DIR, "10_package_detail_full.png"), full_page=True, animations="disabled")
            print("Saved: 10_package_detail_full.png")
        except Exception as e:
            print("Error on package detail:", e)

        # 11. About Page
        print("Capturing About Page...")
        try:
            page.goto(f"{BASE_URL}/about", wait_until="networkidle", timeout=30000)
            time.sleep(3)
            page.screenshot(path=os.path.join(OUTPUT_DIR, "11_about_page_full.png"), full_page=True, animations="disabled")
            print("Saved: 11_about_page_full.png")
        except Exception as e:
            print("Error on about page:", e)

        # 12. Packages Catalog Page
        print("Capturing Packages Catalog Page...")
        try:
            page.goto(f"{BASE_URL}/packages", wait_until="networkidle", timeout=30000)
            time.sleep(3)
            page.screenshot(path=os.path.join(OUTPUT_DIR, "12_packages_catalog_full.png"), full_page=True, animations="disabled")
            print("Saved: 12_packages_catalog_full.png")
        except Exception as e:
            print("Error on packages catalog:", e)

        # 13. Contact Page
        print("Capturing Contact Page...")
        try:
            page.goto(f"{BASE_URL}/contact", wait_until="networkidle", timeout=30000)
            time.sleep(3)
            page.screenshot(path=os.path.join(OUTPUT_DIR, "13_contact_page_full.png"), full_page=True, animations="disabled")
            print("Saved: 13_contact_page_full.png")
        except Exception as e:
            print("Error on contact page:", e)

        # 14. Services Hub Page
        print("Capturing Services Page...")
        try:
            page.goto(f"{BASE_URL}/services", wait_until="networkidle", timeout=30000)
            time.sleep(3)
            page.screenshot(path=os.path.join(OUTPUT_DIR, "14_services_page_full.png"), full_page=True, animations="disabled")
            print("Saved: 14_services_page_full.png")
        except Exception as e:
            print("Error on services page:", e)

        # 15. Blog Editorial Page
        print("Capturing Blog Page...")
        try:
            page.goto(f"{BASE_URL}/blog", wait_until="networkidle", timeout=30000)
            time.sleep(3)
            page.screenshot(path=os.path.join(OUTPUT_DIR, "15_blog_page_full.png"), full_page=True, animations="disabled")
            print("Saved: 15_blog_page_full.png")
        except Exception as e:
            print("Error on blog page:", e)

        browser.close()
        print("ALL SCREENSHOTS CAPTURED SUCCESSFULLY!")

if __name__ == "__main__":
    capture_screenshots()
