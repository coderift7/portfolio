import type { BrowserContext, Page, Request } from "@playwright/test";

/**
 * Network gate for local tests.
 *
 * Every request that does not target the local test server is aborted and
 * recorded. Tests assert that the list is empty, so no test can reach
 * production, Brevo, SMTP, Meta or Umami — even by accident.
 *
 * Route handlers registered *after* this one take precedence in Playwright,
 * so API mocks must be installed after the gate.
 */
export const LOCAL_ORIGIN = "http://localhost:3000";

export interface NetworkGate {
  violations: string[];
}

export async function installNetworkGate(context: BrowserContext): Promise<NetworkGate> {
  const gate: NetworkGate = { violations: [] };
  await context.route("**/*", (route) => {
    const url = route.request().url();
    if (url.startsWith(LOCAL_ORIGIN + "/") || url === LOCAL_ORIGIN) {
      return route.continue();
    }
    gate.violations.push(url);
    return route.abort("blockedbyclient");
  });
  return gate;
}

export interface RecordedRequest {
  url: string;
  method: string;
  body: unknown;
}

export interface ApiMockOptions {
  checkStatus?: number;
  checkBody?: unknown;
  impulseStatus?: number;
  impulseBody?: unknown;
}

/**
 * Mocks the two backend endpoints. Request B (/api/impulse) is never real
 * in round B; both are recorded so tests can assert exact payloads and
 * — more importantly — the absence of a request.
 */
export async function installApiMocks(
  page: Page,
  options: ApiMockOptions = {}
): Promise<{ check: RecordedRequest[]; impulse: RecordedRequest[] }> {
  const recorded = { check: [] as RecordedRequest[], impulse: [] as RecordedRequest[] };

  const record = (req: Request): RecordedRequest => ({
    url: req.url(),
    method: req.method(),
    body: req.postDataJSON(),
  });

  await page.route("**/api/check", (route) => {
    recorded.check.push(record(route.request()));
    return route.fulfill({
      status: options.checkStatus ?? 202,
      contentType: "application/json",
      body: JSON.stringify(options.checkBody ?? { status: "queued", jobId: "test-1" }),
    });
  });

  await page.route("**/api/impulse", (route) => {
    recorded.impulse.push(record(route.request()));
    return route.fulfill({
      status: options.impulseStatus ?? 202,
      contentType: "application/json",
      body: JSON.stringify(options.impulseBody ?? { status: "confirmation_pending" }),
    });
  });

  return recorded;
}

/** Declines the cookie banner up front: no pixel, no analytics, no overlay. */
export async function declineConsent(context: BrowserContext) {
  await context.addInitScript(() => {
    try {
      localStorage.setItem("cookie_consent", "denied");
    } catch {
      /* ignore */
    }
  });
}
