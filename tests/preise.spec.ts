import { readFile } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const matrixHeaders = [
  "Website-Paket",
  "Ohne Betreuung",
  "Basis · 99 €/Monat",
  "Business · 199 €/Monat",
  "Premium · 399 €/Monat",
];

const matrixRows = [
  ["Sichtbar werden", "1.890 €", "1.790 €", "1.690 €", "1.590 €"],
  ["Anfragen gewinnen", "3.490 €", "3.290 €", "3.140 €", "2.990 €"],
  ["Ihr digitaler Mitarbeiter", "5.990 €", "5.690 €", "5.390 €", "5.090 €"],
];

const legacyCreationClaims = [
  /(?:^|[^\d.])0\s*€(?=$|[^\d])/i,
  /\b(?:ab|bis hin zu)\s+0\s*€/i,
  /\b(?:Website|Webseite)[^.!?\n]{0,80}\b(?:kostenlos|gratis|inklusive|0\s*€)\b/i,
  /\b(?:kostenlose?|gratis|inklusive)\s+(?:Website|Webseite)\b/i,
  /\b(?:Erstell(?:ung|preis)|Webseitenerstellung)[^.!?\n]{0,60}\b(?:entfällt|kostenlos|gratis|0\s*€)\b/i,
];

const legacyPriceClaims = [
  /\bAnfragen auf Autopilot\b/i,
  /(?:^|[^\d.])990\s*€(?=$|[^\d])/,
  /(?:^|[^\d])1\.990\s*€(?=$|[^\d])/,
];

const briefingUrl = "https://tally.so/r/ODjJE7";

async function dismissCookieBanner(page: import("@playwright/test").Page) {
  const decline = page.getByRole("button", { name: "Ablehnen" });
  if (await decline.isVisible()) await decline.click();
}

test.describe("Preisseite", () => {
  test("zeigt die freigegebene Preis- und Betreuungsmatrix ohne das alte 0-Euro-Modell", async ({ page }) => {
    await page.goto("/preise/");
    await dismissCookieBanner(page);

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Ihre Website ist nur der Anfang");
    await expect(page.locator("main")).toContainText("1.890 €");
    await expect(page.locator("main")).toContainText("3.490 €");
    await expect(page.locator("main")).toContainText("5.990 €");
    await expect(page.getByText("Anfragen gewinnen", { exact: true }).first()).toBeVisible();

    const matrix = page.locator("table").filter({ hasText: "Website-Paket" });
    await expect(matrix.locator("thead th")).toHaveCount(matrixHeaders.length);
    await expect(matrix.locator("thead th")).toHaveText(matrixHeaders);
    await expect(matrix.locator("tbody tr")).toHaveCount(matrixRows.length);
    await expect(matrix.locator("tbody td")).toHaveCount(15);
    await expect(matrix.locator("tbody td span.font-mono")).toHaveCount(12);
    await expect(matrix).not.toContainText("Hosting · 49 €/Monat");

    for (const [rowIndex, expectedRow] of matrixRows.entries()) {
      const cells = matrix.locator("tbody tr").nth(rowIndex).locator("td");
      await expect(cells).toHaveCount(matrixHeaders.length);
      await expect(cells).toHaveText(expectedRow);
    }

    await expect(page.getByRole("heading", { name: "Klar geregelt bei der Betreuung" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Hosting & Wartung" })).toBeVisible();
    await expect(page.getByText("49 €", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("Hosting & Wartung kann separat ergänzt werden und reduziert den einmaligen Websitepreis nicht.")).toBeVisible();
    await expect(page.getByText("Zusätzliche Arbeit: 99 € pro Stunde, in 15-Minuten-Schritten.")).toBeVisible();
    const priceContent = await page.locator("main").innerText();
    for (const claim of legacyCreationClaims) {
      expect(priceContent, `verbotene Gratis-Erstellungsbehauptung ${claim}`).not.toMatch(claim);
    }
    for (const claim of legacyPriceClaims) {
      expect(priceContent, `alter Preis- oder Angebotskontext ${claim}`).not.toMatch(claim);
    }
  });

  test("macht die mobile Kombinationsmatrix per Tastatur erreichbar und sichtbar fokussierbar", async ({ page }) => {
    await page.goto("/preise/");
    await dismissCookieBanner(page);

    const matrixRegion = page.getByRole("region", { name: /Kombinationsmatrix für Website-Pakete/i });
    await expect(matrixRegion).toHaveAttribute("tabindex", "0");
    await matrixRegion.focus();
    await expect(matrixRegion).toBeFocused();
    await expect(matrixRegion).toHaveClass(/focus-visible:ring-teal-700/);
  });

  test("öffnet alle Preis-CTAs über den zentralen Briefing-Link per Tastatur", async ({ page }) => {
    await page.goto("/preise/");
    await dismissCookieBanner(page);

    const configSource = await readFile("src/config/site.ts", "utf8");
    expect(configSource).toMatch(/briefingUrl:\s*"https:\/\/tally\.so\/r\/ODjJE7"/);

    const directCtas = page.getByRole("link", { name: "Direkt Briefing ausfüllen" });
    await expect(directCtas).toHaveCount(4);
    for (const cta of await directCtas.all()) {
      await expect(cta).toHaveAttribute("href", briefingUrl);
      await expect(cta).toHaveAttribute("target", "_blank");
      await expect(cta).toHaveAttribute("rel", /noopener/);
    }
    await expect(page.getByRole("link", { name: "Briefing", exact: true })).toHaveAttribute("href", briefingUrl);

    await page.context().route(briefingUrl, async (route) => {
      await route.fulfill({
        contentType: "text/html",
        body: "<!doctype html><title>Briefing-Test</title><h1>Projekt-Briefing</h1>",
      });
    });
    const popupPromise = page.waitForEvent("popup");
    const firstCta = directCtas.first();
    await firstCta.focus();
    await expect(firstCta).toBeFocused();
    await firstCta.press("Enter");
    const popup = await popupPromise;
    await popup.waitForLoadState();
    await expect(popup).toHaveURL(briefingUrl);
    await expect(popup.getByRole("heading", { name: "Projekt-Briefing" })).toBeVisible();
    await popup.close();
  });

  test("hat auf der Preisseite keine serious oder critical Axe-Befunde", async ({ page }) => {
    await page.goto("/preise/");
    await dismissCookieBanner(page);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
      .include("main")
      .analyze();
    const serious = results.violations.filter(
      (violation) => violation.impact === "serious" || violation.impact === "critical"
    );
    expect(
      serious.flatMap((violation) =>
        violation.nodes.map(
          (node) => `${violation.id}: ${node.target.join(" ")} — ${node.failureSummary ?? violation.help}`
        )
      ),
      "Preisseite: serious/critical Axe-Befunde"
    ).toEqual([]);
  });

  test("hält FAQ und KI-Textdateien frei von alter Angebotslogik", async () => {
    const [faq, llms, llmsFull] = await Promise.all([
      readFile("content/faq.json", "utf8"),
      readFile("public/llms.txt", "utf8"),
      readFile("public/llms-full.txt", "utf8"),
    ]);
    const content = `${faq}\n${llms}\n${llmsFull}`;

    expect(content).toContain("Anfragen gewinnen");
    expect(content).toContain("1.890 €");
    expect(content).toContain("5.990 €");
    expect(content).toContain("399 €/Monat");
    expect(content).not.toMatch(/Anfragen auf Autopilot/i);
    expect(content).not.toMatch(/(?:^|[^\d.])990\s*€(?=$|[^\d])/);
    expect(content).not.toMatch(/(?:^|[^\d])1\.990\s*€(?=$|[^\d])/);
    expect(content).not.toMatch(/teils sogar kostenlos/i);
    expect(content).not.toMatch(/Premium-Retainer/i);
    expect(content).not.toMatch(/entfällt der Erstellpreis/i);
  });
});
