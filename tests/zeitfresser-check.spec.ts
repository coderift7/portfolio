import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { installNetworkGate, declineConsent, type NetworkGate } from "./helpers/network-gate";

let gate: NetworkGate;
const consoleErrors: string[] = [];

test.beforeEach(async ({ context, page }) => {
  consoleErrors.length = 0;
  await declineConsent(context);
  gate = await installNetworkGate(context);
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(err.message));
});

test.afterEach(async () => {
  expect(gate.violations, "no external network requests").toEqual([]);
  expect(consoleErrors, "no console errors").toEqual([]);
});

test.describe("/zeitfresser-check/", () => {
  test("renders hero, sections, price and CTA", async ({ page }) => {
    const res = await page.goto("/zeitfresser-check/");
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toContainText("jede Woche Stunden");
    await expect(page.locator("#ablauf h3")).toHaveCount(4);
    await expect(page.getByText("490 €", { exact: true })).toBeVisible();
    const cta = page.getByRole("link", { name: /Zeitfresser-Check anfragen/ }).first();
    await expect(cta).toHaveAttribute("href", /^mailto:michael@hoeger\.dev\?subject=Zeitfresser-Check/);
    await expect(page.locator("main#main")).toHaveCount(1);
  });

  test("has correct meta title, description and canonical", async ({ page }) => {
    await page.goto("/zeitfresser-check/");
    await expect(page).toHaveTitle(/Zeitfresser-Check/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://hoeger.dev/zeitfresser-check/"
    );
  });

  test("copy makes no promises that are not yet true", async ({ page }) => {
    await page.goto("/zeitfresser-check/");
    // textContent also covers collapsed FAQ answers.
    const text = (await page.locator("main").textContent()) ?? "";
    // No compliance or AI buzzwords until the data-protection gaps are closed.
    for (const term of [/DSGVO/, /\bKI\b/, /Agent/, /Workflow/, /LLM/, /garantier/i, /Pilot|Rabatt/i]) {
      expect(text, `forbidden term ${term}`).not.toMatch(term);
    }
  });

  test("no serious accessibility violations", async ({ page }) => {
    await page.goto("/zeitfresser-check/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
      // Shared WhatsApp button has a known pre-existing contrast issue.
      .exclude('a[href^="https://wa.me/"]')
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical"
    );
    expect(serious.map((v) => `${v.id} (${v.nodes.length})`)).toEqual([]);
  });
});

test("navigation links to /zeitfresser-check/", async ({ page }) => {
  // Home loads the Cal.com embed, which the network gate blocks; any page
  // with the shared header proves the nav entry.
  await page.goto("/fuer-fitness/");
  await expect(page.locator('header a[href="/zeitfresser-check/"]').first()).toBeAttached();
});
