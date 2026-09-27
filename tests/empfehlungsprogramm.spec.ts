import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const legacyClaims = [
  /Gründungsangebot/i,
  /\bnetto\b/i,
  /\bAnfragen auf Autopilot\b/i,
  /(?:^|[^\d])1\.990\s*(?:€|Euro)/,
  /\b89 Euro\/Monat\b/,
  /Monat Retainer/i,
];

async function dismissCookieBanner(page: import("@playwright/test").Page) {
  const decline = page.getByRole("button", { name: "Ablehnen" });
  if (await decline.isVisible()) await decline.click();
}

test.describe("Empfehlungsprogramm", () => {
  test("rechnet mit der aktuellen Preismatrix ohne Gründungsangebot und netto-Preise", async ({ page }) => {
    await page.goto("/empfehlungsprogramm/");
    await dismissCookieBanner(page);

    const main = page.locator("main");
    const content = await main.innerText();
    for (const claim of legacyClaims) {
      expect(content, `veralteter Preis- oder Angebotskontext ${claim}`).not.toMatch(claim);
    }

    // Option B is capped at the same 400 Euro as the cash option
    await expect(main).toContainText("max. 400 Euro Gegenwert");
    // Welcome discount stacks on top of the support-tier discount; no free month alternative
    await expect(main).toContainText("100 Euro Willkommensrabatt");
    await expect(main).toContainText("zusätzlich zum Preisvorteil");
    await expect(page.locator("#kombi-h2")).toHaveCount(0);

    // Worked examples use current end prices and respect the 400 Euro cap
    await expect(main).toContainText("Paket „Anfragen gewinnen“ (3.490 Euro)");
    await expect(main).toContainText("349 Euro");
    await expect(main).toContainText("4.140 Euro");
    await expect(main).toContainText("414 Euro");
    await expect(main).toContainText("Paket „Ihr digitaler Mitarbeiter“ (5.990 Euro)");
    await expect(main).toContainText("2 Monate gratis = 198 Euro Vorteil");
    await expect(main).toContainText("§ 19 UStG");
  });

  test("FAQ-Schema enthält keine veralteten Angebote", async ({ page }) => {
    await page.goto("/empfehlungsprogramm/");
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const faq = schemas.find((s) => s.includes('"FAQPage"'));
    expect(faq).toBeDefined();
    for (const claim of legacyClaims) {
      expect(faq!, `veralteter Kontext im FAQ-Schema ${claim}`).not.toMatch(claim);
    }
  });

  test("hat keine Axe-Verstöße", async ({ page }) => {
    await page.goto("/empfehlungsprogramm/");
    await dismissCookieBanner(page);
    // Scoped to main like the pricing test; the global cookie banner is tracked separately
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).include("main").analyze();
    expect(results.violations).toEqual([]);
  });
});

test("Farbpsychologie verweist auf die aktuellen Pakete statt auf das Gründungsangebot", async ({ page }) => {
  await page.goto("/farbpsychologie/");
  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).join("\n");
  const content = (await page.locator("main").innerText()) + schemas;
  expect(content).not.toMatch(/Gründungsangebot/i);
  expect(content).toContain("„Anfragen gewinnen“ und „Ihr digitaler Mitarbeiter“");
});
