import { test, expect } from '@playwright/test';

// ── /website-check landing page ─────────────────────────────

test.describe('/website-check', () => {
  test('renders hero and form', async ({ page }) => {
    await page.goto('/website-check');
    await expect(page.locator('h1')).toContainText('Wie gut ist Ihre Website');
    await expect(page.locator('input[name="url"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('form requires URL and email', async ({ page }) => {
    await page.goto('/website-check');
    const urlInput = page.locator('input[name="url"]');
    await expect(urlInput).toHaveAttribute('required', '');
    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toHaveAttribute('required', '');
  });

  test('privacy checkbox is required', async ({ page }) => {
    await page.goto('/website-check');
    const checkbox = page.locator('input[type="checkbox"]#privacy');
    await expect(checkbox).toBeVisible();
    await expect(checkbox).toHaveAttribute('required', '');
  });

  test('honeypot field is hidden', async ({ page }) => {
    await page.goto('/website-check');
    const honeypot = page.locator('input[name="_gotcha"]');
    await expect(honeypot).toBeHidden();
  });

  test('has correct meta title', async ({ page }) => {
    await page.goto('/website-check');
    const title = await page.title();
    expect(title).toContain('Website-Check');
  });

  test('shows check categories', async ({ page }) => {
    await page.goto('/website-check');
    await expect(page.locator('h3:has-text("Performance")').first()).toBeVisible();
    await expect(page.locator('h3:has-text("SEO")').first()).toBeVisible();
    await expect(page.locator('h3:has-text("Sichere Verbindung")').first()).toBeVisible();
    // Legal pages are checked for presence only, and the page says so.
    const legal = page.locator('div', { has: page.locator('h3', { hasText: "Pflichtangaben auffindbar" }) }).last();
    await expect(legal).toContainText("ohne rechtliche Prüfung der Inhalte");
  });

  // The check only detects legal-page links and a cookie notice; it does not
  // review their content, security headers or full WCAG/BFSG conformance,
  // so neither the page nor the home teaser may promise it.
  for (const path of ['/website-check', '/']) {
    test(`does not promise unchecked areas on ${path}`, async ({ page }) => {
      await page.goto(path);
      const labels = path === '/'
        ? page.locator('section', { hasText: 'Wie gut ist Ihre Website wirklich?' }).locator('span')
        : page.locator('h3');
      const texts = (await labels.allTextContents()).map((t) => t.trim());
      for (const forbidden of ['Recht', 'Sicherheit', 'Barrierefreiheit']) {
        expect(texts).not.toContain(forbidden);
      }
      await expect(page.locator('body')).not.toContainText('DSGVO-konform — Ihre Daten sind sicher');
      await expect(page.locator('body')).not.toContainText('Impressum, Datenschutz, Cookie-Consent');
    });
  }
});

// ── /website-check/danke confirmation page ──────────────────

test.describe('/website-check/danke', () => {
  test('shows confirmation message', async ({ page }) => {
    await page.goto('/website-check/danke');
    await expect(page.locator('h1')).toContainText('Report wird erstellt');
    await expect(page.locator('text=Zurück zur Startseite')).toBeVisible();
  });

  test('has noindex meta', async ({ page }) => {
    await page.goto('/website-check/danke');
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', /noindex/);
  });
});
