import { expect, test } from "@playwright/test";

const PROFILE_URL =
  "https://www.provenexpert.com/de-de/michael-hoeger-it-beratung-webdesign/";
const PRO_SEAL_SCRIPT_URL = "https://s.provenexpert.net/seals/proseal-v2.js";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("cookie_consent", "denied");
  });
});

test("places the ProvenExpert trust section directly after the portfolio", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#projekte")).toBeAttached();
  await expect(page.locator("#bewertungen")).toBeVisible();

  const followsPortfolio = await page.evaluate(() => {
    const portfolio = document.querySelector("#projekte");
    const reviews = document.querySelector("#bewertungen");
    return Boolean(
      portfolio &&
        reviews &&
        (portfolio.compareDocumentPosition(reviews) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0
    );
  });

  expect(followsPortfolio).toBe(true);
});

test("provides a crawlable and safely opened profile link", async ({ page }) => {
  await page.goto("/");

  const link = page.getByRole("link", { name: "Bewertungen auf ProvenExpert" }).first();
  await expect(link).toHaveAttribute("href", PROFILE_URL);
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noopener/);
  await expect(link).toHaveAttribute("rel", /noreferrer/);
});

test("does not contact ProvenExpert before the visitor actively loads the seal", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("provenexpert")) requests.push(request.url());
  });

  await page.goto("/", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("button", { name: "ProvenExpert-Siegel laden" })
  ).toBeVisible();
  expect(requests).toEqual([]);
});

test("loads the official widget with the approved generator settings after consent", async ({ page }) => {
  await page.route(PRO_SEAL_SCRIPT_URL, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/javascript",
      body: `
        window.provenExpert = {
          proSeal: async function (config) {
            window.__proSealConfig = config;
            const seal = document.createElement("div");
            seal.setAttribute("role", "img");
            seal.setAttribute("aria-label", "ProvenExpert Pro Seal");
            seal.textContent = "ProvenExpert Pro Seal";
            document.querySelector(config.embeddedSelector).appendChild(seal);
          }
        };
      `,
    })
  );

  await page.goto("/");
  await page.getByRole("button", { name: "ProvenExpert-Siegel laden" }).click();

  await expect(page.getByRole("img", { name: "ProvenExpert Pro Seal" })).toBeVisible();

  const config = await page.evaluate(() =>
    (window as Window & { __proSealConfig?: Record<string, unknown> }).__proSealConfig
  );

  expect(config).toEqual({
    widgetId: "c66f1176-3a94-4232-9a39-3f10dd04964d",
    language: "de-DE",
    usePageLanguage: false,
    bannerColor: "#097E92",
    textColor: "#FFFFFF",
    showBackPage: false,
    showReviews: true,
    hideDate: true,
    hideName: false,
    googleStars: false,
    displayReviewerLastName: false,
    embeddedSelector: "#proSealWidget",
  });
});

test("retries with a new script request after the first load fails", async ({ page }) => {
  let loadAttempts = 0;

  await page.route(PRO_SEAL_SCRIPT_URL, async (route) => {
    loadAttempts += 1;

    if (loadAttempts === 1) {
      await route.abort("failed");
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/javascript",
      body: `
        window.provenExpert = {
          proSeal: async function (config) {
            const seal = document.createElement("div");
            seal.setAttribute("role", "img");
            seal.setAttribute("aria-label", "ProvenExpert Pro Seal after retry");
            seal.textContent = "ProvenExpert Pro Seal after retry";
            document.querySelector(config.embeddedSelector).appendChild(seal);
          }
        };
      `,
    });
  });

  await page.goto("/");
  const loadButton = page.getByRole("button", {
    name: "ProvenExpert-Siegel laden",
  });

  await loadButton.click();
  await expect(
    page.getByText("Das Siegel konnte nicht geladen werden.", { exact: false })
  ).toBeVisible();
  await expect(page.locator("#proSeal")).toHaveCount(0);

  await loadButton.click();
  await expect(
    page.getByRole("img", { name: "ProvenExpert Pro Seal after retry" })
  ).toBeVisible();
  expect(loadAttempts).toBe(2);
});

test("connects the ProvenExpert profile to the Person schema and privacy notice", async ({ page }) => {
  await page.goto("/");

  const personSchema = await page.locator('script[type="application/ld+json"]').evaluateAll(
    (scripts) =>
      scripts
        .map((script) => {
          try {
            return JSON.parse(script.textContent ?? "");
          } catch {
            return null;
          }
        })
        .find((entry) => entry?.["@type"] === "Person")
  );

  expect(personSchema.sameAs).toContain(PROFILE_URL);

  await page.goto("/datenschutz/");
  await expect(
    page.getByRole("heading", {
      name: "9. ProvenExpert-Bewertungssiegel (erst nach Zustimmung)",
    })
  ).toBeVisible();
  await expect(page.getByText("s.provenexpert.net", { exact: true })).toBeVisible();
  await expect(page.getByText("d.provenexpert.net", { exact: true })).toBeVisible();
  await expect(page.getByText(/außerhalb der EU oder des EWR/)).toBeVisible();
});
