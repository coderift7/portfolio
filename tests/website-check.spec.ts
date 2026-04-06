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
    await expect(page.locator('text=Performance')).toBeVisible();
    await expect(page.locator('text=SEO')).toBeVisible();
    await expect(page.locator('text=Sicherheit')).toBeVisible();
  });
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
