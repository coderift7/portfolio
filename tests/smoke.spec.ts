import { test, expect } from '@playwright/test';

// Dismiss cookie banner for all smoke tests so it doesn't overlay page elements
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("cookie_consent", "denied"));
});

// All routes that must load without errors
const routes = ['/', '/datenschutz/', '/impressum/'];

// Anchor sections on the homepage
const sections = ['leistungen', 'projekte', 'ueber-mich', 'kontakt'];

// All images expected on homepage with their src patterns
const expectedImages = [
  { pattern: /michael-hero\.webp/, description: 'Hero portrait' },
  { pattern: /schaeferhof-desktop\.webp/, description: 'Schäferhof mockup' },
  { pattern: /moverpro-desktop\.webp/, description: 'MoverPro mockup' },
  { pattern: /michael-working\.webp/, description: 'About photo' },
  { pattern: /michael-casual\.webp/, description: 'Contact photo' },
];

// ── Page load ────────────────────────────────────────────────

for (const route of routes) {
  test(`${route} loads with status 200`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
  });
}

// ── No console errors ────────────────────────────────────────

for (const route of routes) {
  test(`${route} has no console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto(route, { waitUntil: 'networkidle' });
    expect(errors).toEqual([]);
  });
}

// ── Homepage sections exist ──────────────────────────────────

for (const id of sections) {
  test(`homepage section #${id} is present`, async ({ page }) => {
    await page.goto('/');
    const section = page.locator(`#${id}`);
    await expect(section).toBeAttached();
  });
}

// ── Navigation links ─────────────────────────────────────────

test('header navigation links point to valid anchors', async ({ page }) => {
  await page.goto('/');
  const navLinks = page.locator('nav a[href^="#"], header a[href^="#"]');
  const count = await navLinks.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const href = await navLinks.nth(i).getAttribute('href');
    if (href && href !== '#') {
      const anchor = href.replace('#', '');
      await expect(page.locator(`#${anchor}`)).toBeAttached();
    }
  }
});

test('footer contains legal links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('footer a[href*="impressum"]')).toBeAttached();
  await expect(page.locator('footer a[href*="datenschutz"]')).toBeAttached();
});

// ── Images: all present and loaded ──────────────────────────

for (const img of expectedImages) {
  test(`image loaded: ${img.description}`, async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const imgEl = page.locator(`img[src*="${img.pattern.source.replace(/\\/g, '')}"]`).first();
    await expect(imgEl).toBeAttached();

    // Scroll into view to trigger lazy loading
    await imgEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Verify image actually loaded (naturalWidth > 0)
    const loaded = await imgEl.evaluate(
      (el: HTMLImageElement) => el.complete && el.naturalWidth > 0
    );
    expect(loaded).toBe(true);
  });
}

// ── Mobile: Hero portrait visible ────────────────────────────
// This is the exact bug from 03.04.2026 — hero was hidden on mobile

test('hero portrait is visible on mobile', async ({ page, browserName }) => {
  test.skip(browserName === 'chromium' && test.info().project.name === 'desktop-chrome', 'mobile-only test');
  test.skip(browserName === 'webkit' && test.info().project.name === 'desktop-safari', 'mobile-only test');

  await page.goto('/', { waitUntil: 'networkidle' });
  const heroImg = page.locator('img[src*="michael-hero"]').first();
  await expect(heroImg).toBeVisible();
});

// ── Mobile: all images visible after scroll ──────────────────

test('all images become visible on scroll (mobile)', async ({ page, browserName }) => {
  test.skip(browserName === 'chromium' && test.info().project.name === 'desktop-chrome', 'mobile-only test');
  test.skip(browserName === 'webkit' && test.info().project.name === 'desktop-safari', 'mobile-only test');

  await page.goto('/', { waitUntil: 'networkidle' });

  // Scroll through entire page to trigger Framer Motion animations
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(300);
  }

  // All images should now be visible
  const images = page.locator('img');
  const count = await images.count();
  for (let i = 0; i < count; i++) {
    const img = images.nth(i);
    // Check the image's parent chain for display:none
    const isHidden = await img.evaluate((el: HTMLImageElement) => {
      let node: HTMLElement | null = el;
      while (node) {
        const style = getComputedStyle(node);
        if (style.display === 'none' || style.visibility === 'hidden') return true;
        node = node.parentElement;
      }
      return false;
    });
    expect(isHidden, `Image ${i} should not be hidden`).toBe(false);
  }
});

// ── Contact form ─────────────────────────────────────────────

test('contact form has all required fields', async ({ page }) => {
  await page.goto('/');
  await page.locator('#kontakt').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await expect(page.locator('#name')).toBeVisible();
  await expect(page.locator('#email')).toBeVisible();
  await expect(page.locator('#subject')).toBeVisible();
  await expect(page.locator('#message')).toBeVisible();
});

test('contact form validates required fields', async ({ page }) => {
  await page.goto('/');
  await page.locator('#kontakt').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  const submitBtn = page.locator('form button[type="submit"]');
  await submitBtn.click();

  // Should still be on form (not success state)
  await expect(page.locator('#name')).toBeVisible();
});

test('contact form has privacy consent checkbox', async ({ page }) => {
  await page.goto('/');
  await page.locator('#kontakt').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  const checkbox = page.locator('form input[type="checkbox"]');
  await expect(checkbox).toBeAttached();

  // Privacy link in label
  const privacyLink = page.locator('form a[href*="datenschutz"]');
  await expect(privacyLink).toBeAttached();
});

// ── Meta tags & SEO ──────────────────────────────────────────

test('homepage has essential meta tags', async ({ page }) => {
  await page.goto('/');

  const title = await page.title();
  expect(title.length).toBeGreaterThan(0);

  const desc = page.locator('meta[name="description"]');
  await expect(desc).toHaveAttribute('content', /.+/);

  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
  await expect(page.locator('meta[name="viewport"]')).toHaveAttribute('content', /.+/);
});

test('og:image points to og-image.png', async ({ page }) => {
  await page.goto('/');
  const ogImage = page.locator('meta[property="og:image"]');
  await expect(ogImage).toHaveAttribute('content', /og-image\.png/);
});

test('legal pages have robots meta tag', async ({ page }) => {
  for (const route of ['/datenschutz/', '/impressum/']) {
    await page.goto(route);
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', /.+/);
  }
});

// ── Accessibility basics ─────────────────────────────────────

test('all images have alt attributes', async ({ page }) => {
  await page.goto('/');
  const images = page.locator('img');
  const count = await images.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const alt = await images.nth(i).getAttribute('alt');
    expect(alt, `Image ${i} missing alt attribute`).toBeTruthy();
  }
});

test('page has exactly one h1', async ({ page }) => {
  await page.goto('/');
  const h1s = page.locator('h1');
  expect(await h1s.count()).toBe(1);
});

// ── Framer Motion: no stuck invisible content ────────────────
// Server-rendered HTML has opacity:0 — JS must animate to visible

test('no elements stuck at opacity:0 after page load', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  // Scroll through to trigger all IntersectionObserver callbacks
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 300) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(200);
  }
  await page.waitForTimeout(1000);

  // Check that no section-level elements remain invisible
  for (const id of sections) {
    const section = page.locator(`#${id}`);
    const opacity = await section.evaluate((el) => {
      return getComputedStyle(el).opacity;
    });
    expect(Number(opacity), `Section #${id} should be visible`).toBeGreaterThan(0);
  }
});

// ── Performance basics ───────────────────────────────────────

test('homepage loads within 5 seconds', async ({ page }) => {
  const start = Date.now();
  await page.goto('/', { waitUntil: 'networkidle' });
  const duration = Date.now() - start;
  expect(duration).toBeLessThan(5000);
});

// ── Image HTTP responses ─────────────────────────────────────

test('all image URLs return 200', async ({ page }) => {
  const imagePaths = [
    '/images/michael-hero.webp',
    '/images/schaeferhof-desktop.webp',
    '/images/schaeferhof-mobile.webp',
    '/images/moverpro-desktop.webp',
    '/images/moverpro-mobile.webp',
    '/images/michael-working.webp',
    '/images/michael-casual.webp',
    '/images/og-image.png',
  ];

  for (const path of imagePaths) {
    const res = await page.goto(path);
    expect(res?.status(), `${path} should return 200`).toBe(200);
  }
});
