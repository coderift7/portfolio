import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  installNetworkGate,
  installApiMocks,
  declineConsent,
  type NetworkGate,
} from "./helpers/network-gate";

// Synthetic test data only — never real addresses.
const TEST_URL_INPUT = "www.example-studio.de";
const TEST_URL_NORMALIZED = "https://www.example-studio.de";
const TEST_EMAIL = "test@example.com";
const TEST_NAME = "Test Person";

// Words that must never appear in the customer-facing copy of this page.
const FORBIDDEN_TERMS = [
  /\bSEO\b/,
  /\bCI\b/,
  /\bSSL\b/,
  /\bDSGVO\b/,
  /\bBFSG\b/,
  /\bWCAG\b/,
  /Core Web Vitals/i,
  /Lighthouse/i,
];

let gate: NetworkGate;
const consoleErrors: string[] = [];

test.beforeEach(async ({ context, page }) => {
  consoleErrors.length = 0;
  await declineConsent(context);
  gate = await installNetworkGate(context);
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    // Browsers log every non-2xx response as a console error. The mocked
    // 429/502 answers in the error-path tests are intended, so they are the
    // only messages that are ignored here.
    if (/Failed to load resource: the server responded with a status of (429|502)/.test(msg.text())) return;
    consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(err.message));
});

test.afterEach(async () => {
  expect(gate.violations, "no external network requests").toEqual([]);
  expect(consoleErrors, "no console errors").toEqual([]);
});

async function fillValidForm(page: Page) {
  await page.getByLabel(/Ihre Website-Adresse/).fill(TEST_URL_INPUT);
  await page.getByLabel(/Ihre E-Mail-Adresse/).fill(TEST_EMAIL);
  await page.getByLabel(/Ihr Name/).fill(TEST_NAME);
  await page.getByLabel(/Ich habe die Datenschutzerklärung gelesen/).check();
}

async function expectNoSeriousAxeViolations(page: Page, label: string) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
    // The shared WhatsApp button (components/WhatsAppButton.tsx) has a known,
    // pre-existing contrast issue (white on #128c7e = 4.13:1, 11px sub-line
    // 3.22:1). It is rendered on every page and is not part of this change;
    // its fix lives in the shared component. Excluded so this page's own
    // markup is what gets asserted.
    .exclude('a[href^="https://wa.me/"]')
    .analyze();
  const serious = results.violations.filter(
    (v) => v.impact === "serious" || v.impact === "critical"
  );
  expect(
    serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`),
    `${label}: serious/critical axe violations`
  ).toEqual([]);
  // Report the rest without failing so they can be judged in the protocol.
  const minor = results.violations.filter(
    (v) => v.impact !== "serious" && v.impact !== "critical"
  );
  if (minor.length) {
    console.log(
      `[axe:${label}] non-serious: ` +
        minor.map((v) => `${v.id}(${v.impact},${v.nodes.length})`).join(", ")
    );
  }
}

// ── /fuer-fitness/ page ─────────────────────────────────────

test.describe("/fuer-fitness/", () => {
  test("renders hero, sections and form", async ({ page }) => {
    const res = await page.goto("/fuer-fitness/");
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toContainText("Ihre Website soll");
    await expect(page.locator("h1")).toContainText("Vertrauen schaffen");
    await expect(page.locator("main")).toContainText("Für Personal Trainer");
    await expect(page.getByRole("heading", { level: 2, name: /Vier Dinge/ })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Was Sie bekommen" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "So einfach geht es" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: /Body Process/ })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Gut zu wissen" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Kostenlosen Website-Check anfordern" })).toBeVisible();
    await expect(page.locator("main#main")).toHaveCount(1);
  });

  test("has correct meta title, description and canonical", async ({ page }) => {
    await page.goto("/fuer-fitness/");
    await expect(page).toHaveTitle(/Website-Check für Personal Trainer/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /für Personal Trainer/
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://hoeger.dev/fuer-fitness/"
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index/);
  });

  test("copy contains no technical jargon and no guarantees", async ({ page }) => {
    await page.goto("/fuer-fitness/");
    const text = await page.locator("main").innerText();
    for (const term of FORBIDDEN_TERMS) {
      expect(text, `forbidden term ${term}`).not.toMatch(term);
    }
    expect(text).not.toMatch(/garantier/i);
    // The e-mail series is not live yet, so the page must not offer it.
    // textContent also covers collapsed FAQ answers.
    const allText = (await page.locator("main").textContent()) ?? "";
    expect(allText).not.toMatch(/drei hilfreiche E-Mails|Impuls/i);
    await expect(page.locator('#check input[type="checkbox"]')).toHaveCount(1);
    // The check measures speed, readability and links, not contact paths or offers.
    expect(allText).not.toMatch(/macht der Website-Check sichtbar/);
  });

  test("only measurable check points are promised", async ({ page }) => {
    await page.goto("/fuer-fitness/");
    const section = page.locator("#pruefpunkte");
    await expect(section.getByRole("heading", { level: 3 })).toHaveText([
      "Ladezeit und Handy-Tauglichkeit",
      "Für alle nutzbar",
      "Bei Google gefunden werden",
      "Sichere Verbindung und kaputte Links",
      "Pflichtangaben auffindbar",
    ]);
    await expect(section).toContainText("Den Inhalt prüfen wir nicht rechtlich.");
    await expect(section).toContainText("Was der Check nicht ist");
    await expect(section).toContainText("keine Rechtsprüfung");
  });

  test("form fields have visible labels, required marks and hints", async ({ page }) => {
    await page.goto("/fuer-fitness/");
    const url = page.getByLabel(/Ihre Website-Adresse/);
    const email = page.getByLabel(/Ihre E-Mail-Adresse/);
    const name = page.getByLabel(/Ihr Name/);
    await expect(url).toBeVisible();
    await expect(url).toHaveAttribute("required", "");
    await expect(url).toHaveAttribute("aria-describedby", /url-hint/);
    await expect(email).toBeVisible();
    await expect(email).toHaveAttribute("required", "");
    await expect(name).toBeVisible();
    await expect(name).not.toHaveAttribute("required", "");
    await expect(page.getByText("Felder mit * sind Pflichtfelder.")).toBeVisible();
    await expect(page.getByText("Ohne www geht es auch.")).toBeVisible();
  });

  test("honeypot field is hidden", async ({ page }) => {
    await page.goto("/fuer-fitness/");
    await expect(page.locator('input[name="_gotcha"]')).toBeHidden();
  });

  test("form is operable by keyboard in the expected order", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name.includes("safari"),
      "WebKit does not move focus to links/buttons via Tab without the OS setting"
    );
    await page.goto("/fuer-fitness/");
    await page.getByLabel(/Ihre Website-Adresse/).focus();
    const expected = ["url", "email", "name", "privacy"];
    for (const id of expected.slice(1)) {
      await page.keyboard.press("Tab");
      // Links inside labels sit between checkboxes; skip them.
      let active = await page.evaluate(() => document.activeElement?.id || document.activeElement?.tagName);
      while (active === "A") {
        await page.keyboard.press("Tab");
        active = await page.evaluate(() => document.activeElement?.id || document.activeElement?.tagName);
      }
      expect(active).toBe(id);
    }
    await page.keyboard.press("Tab");
    // The privacy label contains a link, which comes before the button.
    if (await page.evaluate(() => document.activeElement?.tagName === "A")) {
      await page.keyboard.press("Tab");
    }
    const onButton = await page.evaluate(
      () => document.activeElement?.tagName === "BUTTON" && (document.activeElement as HTMLButtonElement).type === "submit"
    );
    expect(onButton).toBe(true);
  });

  test("empty submit shows field errors, marks fields invalid and focuses the first", async ({ page }) => {
    await page.goto("/fuer-fitness/");
    const recorded = await installApiMocks(page);
    await page.getByRole("button", { name: "Kostenlosen Website-Check anfordern" }).click();

    await expect(page.locator('form [role="alert"]')).toContainText("Bitte prüfen Sie 3 Felder.");
    await expect(page.locator("#url-error")).toHaveText("Bitte tragen Sie die Adresse Ihrer Website ein.");
    await expect(page.locator("#email-error")).toContainText("Bitte tragen Sie Ihre E-Mail-Adresse ein");
    await expect(page.locator("#privacy-error")).toContainText("Bitte bestätigen Sie die Datenschutzerklärung");
    await expect(page.locator("#url")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#url")).toHaveAttribute("aria-describedby", "url-error url-hint");
    await expect(page.locator("#url")).toBeFocused();

    expect(recorded.check).toHaveLength(0);
    expect(recorded.impulse).toHaveLength(0);
  });

  test("invalid URL and e-mail get understandable messages", async ({ page }) => {
    await page.goto("/fuer-fitness/");
    const recorded = await installApiMocks(page);
    await page.getByLabel(/Ihre Website-Adresse/).fill("nur text");
    await page.getByLabel(/Ihre E-Mail-Adresse/).fill("name@");
    await page.getByLabel(/Ich habe die Datenschutzerklärung gelesen/).check();
    await page.getByRole("button", { name: "Kostenlosen Website-Check anfordern" }).click();

    await expect(page.locator("#url-error")).toContainText("Beispiel: www.ihr-studio.de");
    await expect(page.locator("#email-error")).toContainText("Beispiel: name@beispiel.de");
    expect(recorded.check).toHaveLength(0);
    expect(recorded.impulse).toHaveLength(0);
  });

  test("submit sends only /api/check and no marketing request", async ({ page }) => {
    await page.goto("/fuer-fitness/");
    const recorded = await installApiMocks(page);
    await fillValidForm(page);
    await page.getByRole("button", { name: "Kostenlosen Website-Check anfordern" }).click();

    await page.waitForURL("**/website-check/danke/");
    expect(recorded.check).toHaveLength(1);
    expect(recorded.check[0].body).toEqual({
      url: TEST_URL_NORMALIZED,
      email: TEST_EMAIL,
      name: TEST_NAME,
      tier: "b",
      honeypot: "",
    });
    expect(recorded.impulse).toHaveLength(0);

    await expect(page.locator("h1")).toContainText("Report wird erstellt");
    // Lead event: pixel is not loaded (consent denied, no pixel id) → no fbq.
    expect(await page.evaluate(() => typeof (window as unknown as { fbq?: unknown }).fbq)).toBe("undefined");
  });

  test("failed /api/check shows an error, no navigation, no /api/impulse", async ({ page }) => {
    await page.goto("/fuer-fitness/");
    const recorded = await installApiMocks(page, { checkStatus: 429, checkBody: { error: "Rate limit" } });
    await fillValidForm(page);
    await page.getByRole("button", { name: "Kostenlosen Website-Check anfordern" }).click();

    await expect(page.locator('form [role="alert"]')).toContainText("Gerade kommen viele Anfragen an");
    expect(page.url()).toContain("/fuer-fitness/");
    expect(recorded.check).toHaveLength(1);
    expect(recorded.impulse).toHaveLength(0);
  });

  test("FAQ accordion is accessible and toggles", async ({ page }) => {
    await page.goto("/fuer-fitness/");
    const trigger = page.getByRole("button", { name: "Ruft mich jemand an?" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("region", { name: "Ruft mich jemand an?" })).toContainText(
      "Ich melde mich nicht unaufgefordert."
    );
  });

  test("axe: page has no serious or critical violations", async ({ page }) => {
    await page.goto("/fuer-fitness/");
    await expectNoSeriousAxeViolations(page, "fuer-fitness");
  });

  test("axe: form error state has no serious or critical violations", async ({ page }) => {
    await page.goto("/fuer-fitness/");
    await installApiMocks(page);
    await page.getByRole("button", { name: "Kostenlosen Website-Check anfordern" }).click();
    await expect(page.locator("#url-error")).toBeVisible();
    await expectNoSeriousAxeViolations(page, "fuer-fitness-errors");
  });
});

test.describe("lead machine privacy contract", () => {
  test("documents actual hosting, analytics and check scope", async ({ page }) => {
    await page.goto("/datenschutz/");
    const main = page.locator("main");

    await expect(main).toContainText("Hetzner Online GmbH");
    await expect(main).toContainText("analytics.hoeger.dev");
    await expect(main).not.toContainText("GitHub Pages");

    const check = page.locator("#website-check");
    await expect(check).toContainText("bis zu 20 interne Links");
    await expect(check).toContainText("keine vollständige WCAG-/BFSG-Prüfung");
    await expect(check).toContainText("kein Scan auf Schwachstellen oder Security-Header");
    await expect(check).toContainText("ob Links zu Impressum und Datenschutzerklärung sowie ein Cookie-Hinweis erkennbar sind");
    await expect(check).toContainText("Deren Inhalt wird nicht geprüft.");
    await expect(check).toContainText("interne Kopie des Reports");
    await expect(check).toContainText("spätestens nach drei Monaten gelöscht");
    await expect(check).toContainText("im Zusammenhang mit diesem Auftrag erforderlich");

    // The e-mail series is documented only once it is live.
    await expect(page.locator("#e-mail-serie")).toHaveCount(0);
  });
});

// ── thank-you page ──────────────────────────────────────────

test("axe: thank-you page has no serious or critical violations", async ({ page }) => {
  await page.goto("/website-check/danke/");
  await expectNoSeriousAxeViolations(page, "danke");
});

// ── sitemap ─────────────────────────────────────────────────

test("sitemap lists /fuer-fitness/", async ({ page }) => {
  const res = await page.goto("/sitemap.xml");
  expect(res?.status()).toBe(200);
  const xml = await res!.text();
  expect(xml).toContain("<loc>https://hoeger.dev/fuer-fitness/</loc>");
});
