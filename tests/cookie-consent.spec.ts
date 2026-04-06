// tests/cookie-consent.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Cookie Consent Banner", () => {
  test.beforeEach(async ({ context }) => {
    // Clear localStorage before each test
    await context.clearCookies();
  });

  test("shows banner on first visit", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: "Cookie-Einstellungen" });
    await expect(banner).toBeVisible();
    await expect(banner).toContainText("Meta Pixel");
  });

  test("hides banner after accepting", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: "Cookie-Einstellungen" });
    await banner.getByRole("button", { name: "Akzeptieren" }).click();
    await expect(banner).not.toBeVisible();
  });

  test("hides banner after declining", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: "Cookie-Einstellungen" });
    await banner.getByRole("button", { name: "Ablehnen" }).click();
    await expect(banner).not.toBeVisible();
  });

  test("does not show banner on return visit after accepting", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: "Cookie-Einstellungen" });
    await banner.getByRole("button", { name: "Akzeptieren" }).click();
    await page.goto("/");
    await expect(page.getByRole("dialog", { name: "Cookie-Einstellungen" })).not.toBeVisible();
  });

  test("does not show banner on return visit after declining", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: "Cookie-Einstellungen" });
    await banner.getByRole("button", { name: "Ablehnen" }).click();
    await page.goto("/");
    await expect(page.getByRole("dialog", { name: "Cookie-Einstellungen" })).not.toBeVisible();
  });

  test("footer link resets consent and shows banner again", async ({ page }) => {
    await page.goto("/");
    // Accept first
    const banner = page.getByRole("dialog", { name: "Cookie-Einstellungen" });
    await banner.getByRole("button", { name: "Akzeptieren" }).click();
    await expect(banner).not.toBeVisible();

    // Click footer link — page reloads, banner should appear
    await page.getByRole("button", { name: "Cookie-Einstellungen" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("dialog", { name: "Cookie-Einstellungen" })).toBeVisible();
  });

  test("datenschutz link in banner navigates to privacy page", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: "Cookie-Einstellungen" });
    await banner.getByRole("link", { name: "Mehr erfahren" }).click();
    await expect(page).toHaveURL(/\/datenschutz/);
  });
});

test.describe("Meta Pixel", () => {
  test("does not load pixel script without consent", async ({ page }) => {
    await page.goto("/");
    // Decline cookies
    const banner = page.getByRole("dialog", { name: "Cookie-Einstellungen" });
    await banner.getByRole("button", { name: "Ablehnen" }).click();

    // Check no fbevents.js script loaded
    const pixelScript = page.locator('script[src*="fbevents.js"]');
    await expect(pixelScript).toHaveCount(0);
  });
});
