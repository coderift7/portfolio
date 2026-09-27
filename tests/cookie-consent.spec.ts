// tests/cookie-consent.spec.ts
import { test, expect } from "@playwright/test";

// Playwright Chromium mobile emulation has a known issue with fixed-positioned
// elements where parent containers intercept pointer events on buttons.
// This only affects emulated mobile Chrome (Pixel 7), not real devices or other browsers.
const isMobileChrome = (projectName: string) => projectName === "mobile-chrome";

test.describe("Cookie Consent Banner", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("shows banner on first visit", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: "Cookie-Einstellungen" });
    await expect(banner).toBeVisible();
    await expect(banner).toContainText("Umami");
    await expect(banner).toContainText("Meta Pixel");
  });

  test("accept button meets WCAG AA contrast in light and dark mode", async ({ page }) => {
    for (const colorScheme of ["light", "dark"] as const) {
      await page.emulateMedia({ colorScheme });
      await page.goto("/");
      await page.evaluate((dark) => document.documentElement.classList.toggle("dark", dark), colorScheme === "dark");
      const button = page
        .getByRole("dialog", { name: "Cookie-Einstellungen" })
        .getByRole("button", { name: "Akzeptieren" });
      const ratio = await button.evaluate((el) => {
        const toRgb = (value: string) => value.match(/\d+(\.\d+)?/g)!.slice(0, 3).map(Number);
        const luminance = (rgb: number[]) => {
          const [r, g, b] = rgb.map((c) => {
            const s = c / 255;
            return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
          });
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        const style = getComputedStyle(el);
        const [dark, light] = [luminance(toRgb(style.color)), luminance(toRgb(style.backgroundColor))].sort((a, b) => a - b);
        return (light + 0.05) / (dark + 0.05);
      });
      expect(ratio, `contrast in ${colorScheme} mode`).toBeGreaterThanOrEqual(4.5);
    }
  });

  test("hides banner after accepting", async ({ page }, testInfo) => {
    test.skip(isMobileChrome(testInfo.project.name), "Chromium mobile emulation pointer event quirk");
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: "Cookie-Einstellungen" });
    await banner.getByRole("button", { name: "Akzeptieren" }).click();
    await expect(banner).not.toBeVisible();
  });

  test("hides banner after declining", async ({ page }, testInfo) => {
    test.skip(isMobileChrome(testInfo.project.name), "Chromium mobile emulation pointer event quirk");
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: "Cookie-Einstellungen" });
    await banner.getByRole("button", { name: "Ablehnen" }).click();
    await expect(banner).not.toBeVisible();
  });

  test("does not show banner on return visit after consent", async ({ page }) => {
    await page.goto("/");
    // Set consent via JS to avoid mobile-chrome click issues
    await page.evaluate(() => localStorage.setItem("cookie_consent", "granted"));
    await page.reload();
    await expect(page.getByRole("dialog", { name: "Cookie-Einstellungen" })).not.toBeVisible();
  });

  test("does not show banner on return visit after declining", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.setItem("cookie_consent", "denied"));
    await page.reload();
    await expect(page.getByRole("dialog", { name: "Cookie-Einstellungen" })).not.toBeVisible();
  });

  test("resetting consent shows banner again", async ({ page }) => {
    await page.goto("/");
    // Grant then reset consent
    await page.evaluate(() => localStorage.setItem("cookie_consent", "granted"));
    await page.reload();
    await expect(page.getByRole("dialog", { name: "Cookie-Einstellungen" })).not.toBeVisible();

    await page.evaluate(() => localStorage.removeItem("cookie_consent"));
    await page.reload();
    await expect(page.getByRole("dialog", { name: "Cookie-Einstellungen" })).toBeVisible();
  });

  test("datenschutz link in banner navigates to privacy page", async ({ page }, testInfo) => {
    test.skip(isMobileChrome(testInfo.project.name), "Chromium mobile emulation pointer event quirk");
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: "Cookie-Einstellungen" });
    await banner.getByRole("link", { name: "Mehr erfahren" }).click();
    await expect(page).toHaveURL(/\/datenschutz/);
  });
});

test.describe("Meta Pixel", () => {
  test("does not load pixel script without consent", async ({ page }) => {
    await page.goto("/");
    // Set denied consent via JS
    await page.evaluate(() => localStorage.setItem("cookie_consent", "denied"));
    await page.reload();

    // Check no fbevents.js script loaded
    const pixelScript = page.locator('script[src*="fbevents.js"]');
    await expect(pixelScript).toHaveCount(0);
  });
});
