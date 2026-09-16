import { expect, test } from "@playwright/test";

const PROFILE_URL =
  "https://www.provenexpert.com/de-de/michael-hoeger-it-beratung-webdesign/";
const BADGE_PATH = "/images/provenexpert-bewertungssiegel-hoeger.png";

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

test("shows the official local badge immediately with fixed intrinsic dimensions", async ({ page }) => {
  await page.goto("/");

  const badge = page.getByRole("img", {
    name: /ProvenExpert-Bewertungssiegel für Michael Höger/,
  });
  await expect(badge).toBeVisible();
  await expect(badge).toHaveAttribute("src", BADGE_PATH);
  await expect(badge).toHaveAttribute("width", "180");
  await expect(badge).toHaveAttribute("height", "216");
  await expect(badge).toHaveAttribute("loading", "eager");
  await expect.poll(() => badge.evaluate((image: HTMLImageElement) => image.complete)).toBe(true);

  const dimensions = await badge.evaluate((image: HTMLImageElement) => ({
    naturalWidth: image.naturalWidth,
    naturalHeight: image.naturalHeight,
  }));
  expect(dimensions).toEqual({ naturalWidth: 180, naturalHeight: 216 });
});

test("links only the badge safely to the exact public profile", async ({ page }) => {
  await page.goto("/");

  const section = page.locator("#bewertungen");
  const link = page.getByRole("link", {
    name: "Bewertungen für Michael Höger auf ProvenExpert öffnen",
  });

  await expect(section.locator(":scope > a")).toHaveCount(1);
  await expect(section.locator(":scope > :not(a)")).toHaveCount(0);
  await expect(link.locator(":scope > img")).toHaveCount(1);
  await expect(link.locator(":scope > :not(img)")).toHaveCount(0);
  await expect(section.locator("button")).toHaveCount(0);
  await expect(section).not.toContainText("ProvenExpert-Siegel laden");
  await expect(section).not.toContainText("Bewertungen auf ProvenExpert");
  expect((await section.textContent())?.trim()).toBe("");

  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", PROFILE_URL);
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noopener/);
  await expect(link).toHaveAttribute("rel", /noreferrer/);

  const frameStyles = await section.evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      backgroundImage: styles.backgroundImage,
      borderTopWidth: styles.borderTopWidth,
      boxShadow: styles.boxShadow,
    };
  });
  expect(frameStyles).toEqual({
    backgroundImage: "none",
    borderTopWidth: "0px",
    boxShadow: "none",
  });

  await link.focus();
  const focusStyles = await link.evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      focused: document.activeElement === element,
      outlineStyle: styles.outlineStyle,
      outlineWidth: styles.outlineWidth,
    };
  });
  expect(focusStyles.focused).toBe(true);
  expect(focusStyles.outlineStyle).not.toBe("none");
  expect(focusStyles.outlineWidth).not.toBe("0px");
});

test("makes no external ProvenExpert request on page load", async ({ page }) => {
  const externalRequests: string[] = [];
  page.on("request", (request) => {
    const hostname = new URL(request.url()).hostname;
    if (hostname.endsWith("provenexpert.com") || hostname.endsWith("provenexpert.net")) {
      externalRequests.push(request.url());
    }
  });

  await page.goto("/", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("img", { name: /ProvenExpert-Bewertungssiegel für Michael Höger/ })
  ).toBeVisible();
  expect(externalRequests).toEqual([]);
});

test("keeps the exact profile in Person schema without a script-specific privacy section", async ({ page }) => {
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
  await expect(page.getByText("s.provenexpert.net", { exact: true })).toHaveCount(0);
  await expect(page.getByText("d.provenexpert.net", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Session Storage", { exact: false })).toHaveCount(0);
  await expect(page.getByText("Expert Systems AG", { exact: false })).toHaveCount(0);
});
