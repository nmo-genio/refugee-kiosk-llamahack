import os
from urllib.parse import urljoin, urlparse
from playwright.sync_api import sync_playwright

start_url = "https://help.unhcr.org/greece/uk/"
base_domain = "help.unhcr.org"
base_path = "/greece/uk"
visited = set()
output_dir = "unhcr_uk_pdfs"

os.makedirs(output_dir, exist_ok=True)


def sanitize_filename(url):
    parsed = urlparse(url)
    path = parsed.path.strip("/").replace("/", "_")
    if not path or path.endswith("uk"):
        path = "index"
    return f"{path}.pdf"


def crawl_and_save_pdf(page, url):
    if url in visited:
        return
    visited.add(url)

    print(f"Saving PDF from: {url}")
    try:
        page.goto(url, timeout=10000)
        page.wait_for_load_state("networkidle", timeout=10000)
    except Exception as e:
        print(f"Failed to load {url}: {e}")
        return

    filename = sanitize_filename(url)
    filepath = os.path.join(output_dir, filename)
    page.pdf(path=filepath, format="A4")

    links = page.locator("a").all()
    for link in links:
        href = link.get_attribute("href")
        if href:
            full_url = urljoin(url, href)
            parsed_url = urlparse(full_url)
            if parsed_url.netloc.endswith(base_domain) and parsed_url.path.startswith(
                base_path
            ):
                crawl_and_save_pdf(page, full_url.split("#")[0])


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    crawl_and_save_pdf(page, start_url)
    browser.close()
