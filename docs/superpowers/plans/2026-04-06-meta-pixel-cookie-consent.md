# Meta Pixel + Cookie-Consent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** GDPR-compliant Meta Pixel integration with consent-first cookie banner on hoeger.dev

**Architecture:** Three new files — `consent.ts` (get/set/reset helpers), `CookieBanner.tsx` (bottom bar with accept/decline), `MetaPixel.tsx` (script injection after consent). Both components mount in `layout.tsx`. Footer gets a "Cookie-Einstellungen" link. Privacy policy updated. Pixel ID via env variable.

**Tech Stack:** Next.js 16 + TypeScript + Tailwind 4 + Framer Motion, Playwright for e2e tests

**Spec:** `docs/superpowers/specs/2026-04-06-meta-pixel-cookie-consent-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/lib/consent.ts` | Consent helpers: get, grant, deny, reset, onChange |
| Create | `src/components/CookieBanner.tsx` | Bottom bar UI, calls consent helpers |
| Create | `src/components/MetaPixel.tsx` | Loads pixel script after consent, tracks PageView + Lead |
| Create | `.env.example` | Documents `NEXT_PUBLIC_META_PIXEL_ID` |
| Create | `.env.local` | Actual pixel ID (gitignored) |
| Create | `tests/cookie-consent.spec.ts` | Playwright e2e tests for banner + pixel |
| Modify | `src/app/layout.tsx` | Mount CookieBanner + MetaPixel |
| Modify | `src/components/Footer.tsx` | Add "Cookie-Einstellungen" link |
| Modify | `src/app/datenschutz/page.tsx` | New sections 7+8, renumber 9-12 |
| Modify | `src/app/website-check/danke/page.tsx` | Fire Lead event via MetaPixel |

---

### Task 1: Consent Helpers

**Files:**
- Create: `src/lib/consent.ts`

- [ ] **Step 1: Create consent helpers**

```ts
// src/lib/consent.ts
"use client";

const STORAGE_KEY = "cookie_consent";

export type ConsentValue = "granted" | "denied";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY) as ConsentValue | null;
}

export function setConsent(value: ConsentValue): void {
  localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent("consent-change", { detail: value }));
}

export function resetConsent(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("consent-change", { detail: null }));
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/consent.ts
git commit -m "feat: add cookie consent helpers (get/set/reset with event)"
```

---

### Task 2: Cookie Banner Component

**Files:**
- Create: `src/components/CookieBanner.tsx`

- [ ] **Step 1: Create CookieBanner component**

```tsx
// src/components/CookieBanner.tsx
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { getConsent, setConsent } from "@/lib/consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setVisible(true);
  }, []);

  function handleAccept() {
    setConsent("granted");
    setVisible(false);
  }

  function handleDecline() {
    setConsent("denied");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie-Einstellungen"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border/30 bg-slate-900/95 p-4 backdrop-blur-md sm:p-5"
        >
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-center text-sm text-slate-200 sm:text-left">
              Wir nutzen Meta Pixel zur Messung unserer Werbeanzeigen.{" "}
              <Link
                href="/datenschutz"
                className="underline underline-offset-2 transition-colors hover:text-primary"
              >
                Mehr erfahren
              </Link>
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                onClick={handleDecline}
                className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-400 hover:text-white"
              >
                Ablehnen
              </button>
              <button
                onClick={handleAccept}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CookieBanner.tsx
git commit -m "feat: add GDPR cookie consent banner with slide-up animation"
```

---

### Task 3: Meta Pixel Component

**Files:**
- Create: `src/components/MetaPixel.tsx`
- Create: `.env.example`
- Create: `.env.local`

- [ ] **Step 1: Create .env.example**

```
# Meta Pixel ID — get from Meta Business Manager > Events Manager
NEXT_PUBLIC_META_PIXEL_ID=
```

- [ ] **Step 2: Create .env.local with actual Pixel ID**

```
NEXT_PUBLIC_META_PIXEL_ID=DEINE_PIXEL_ID
```

> ⚠️ Michael muss hier seine echte Pixel-ID eintragen. Bis dahin bleibt der Wert leer und das Pixel-Component rendert nichts.

- [ ] **Step 3: Create MetaPixel component**

```tsx
// src/components/MetaPixel.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { getConsent, type ConsentValue } from "@/lib/consent";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

export default function MetaPixel() {
  const [consent, setConsentState] = useState<ConsentValue | null>(null);
  const pathname = usePathname();

  const onConsentChange = useCallback((e: Event) => {
    setConsentState((e as CustomEvent).detail as ConsentValue | null);
  }, []);

  useEffect(() => {
    setConsentState(getConsent());
    window.addEventListener("consent-change", onConsentChange);
    return () => window.removeEventListener("consent-change", onConsentChange);
  }, [onConsentChange]);

  // Track PageView on route change
  useEffect(() => {
    if (consent === "granted" && PIXEL_ID && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname, consent]);

  if (consent !== "granted" || !PIXEL_ID) return null;

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      onLoad={() => {
        window.fbq("init", PIXEL_ID);
        window.fbq("track", "PageView");
      }}
    >{`
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    `}</Script>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/MetaPixel.tsx .env.example
git commit -m "feat: add Meta Pixel component with consent-gated loading"
```

---

### Task 4: Lead Event on Danke Page

**Files:**
- Modify: `src/app/website-check/danke/page.tsx`

- [ ] **Step 1: Create a client wrapper for the Lead event**

Add a new client component inline in the danke page file, above the existing server component. This fires the Lead event once when the page mounts:

```tsx
// Add at the TOP of src/app/website-check/danke/page.tsx, before the metadata export:

"use client";

import { useEffect, useRef } from "react";

export function LeadEvent() {
  const fired = useRef(false);

  useEffect(() => {
    if (!fired.current && typeof window.fbq === "function") {
      window.fbq("track", "Lead");
      fired.current = true;
    }
  }, []);

  return null;
}
```

**Problem:** The danke page is a Server Component (it exports `metadata`). We can't add `"use client"` to it. Instead, create a separate file:

Create `src/app/website-check/danke/LeadEvent.tsx`:

```tsx
// src/app/website-check/danke/LeadEvent.tsx
"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export default function LeadEvent() {
  const fired = useRef(false);

  useEffect(() => {
    if (!fired.current && typeof window.fbq === "function") {
      window.fbq("track", "Lead");
      fired.current = true;
    }
  }, []);

  return null;
}
```

- [ ] **Step 2: Import and mount LeadEvent in danke page**

In `src/app/website-check/danke/page.tsx`, add the import and mount it inside the JSX:

Add import at top (after existing imports):
```tsx
import LeadEvent from "./LeadEvent";
```

Add `<LeadEvent />` right after the opening `<>` fragment:
```tsx
export default function WebsiteCheckDanke() {
  return (
    <>
      <LeadEvent />
      <Header />
```

- [ ] **Step 3: Commit**

```bash
git add src/app/website-check/danke/LeadEvent.tsx src/app/website-check/danke/page.tsx
git commit -m "feat: fire Meta Pixel Lead event on website-check thank-you page"
```

---

### Task 5: Mount Components in Layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add imports to layout.tsx**

Add after existing imports (line 4):
```tsx
import CookieBanner from "@/components/CookieBanner";
import MetaPixel from "@/components/MetaPixel";
```

- [ ] **Step 2: Mount components in body**

Replace line 210:
```tsx
      <body className="antialiased">{children}</body>
```

With:
```tsx
      <body className="antialiased">
        {children}
        <CookieBanner />
        <MetaPixel />
      </body>
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: mount CookieBanner and MetaPixel in root layout"
```

---

### Task 6: Footer — Cookie-Einstellungen Link

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Convert Footer to client component and add reset link**

Replace the entire `src/components/Footer.tsx` with:

```tsx
"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { resetConsent } from "@/lib/consent";

export default function Footer() {
  function handleCookieSettings(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    resetConsent();
    window.location.reload();
  }

  return (
    <footer className="border-t border-border/50 bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-6">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. Alle Rechte
          vorbehalten.
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link href="/impressum" className="transition-colors hover:text-primary">
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="transition-colors hover:text-primary"
          >
            Datenschutz
          </Link>
          <button
            onClick={handleCookieSettings}
            className="transition-colors hover:text-primary"
          >
            Cookie-Einstellungen
          </button>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Cookie-Einstellungen link to footer"
```

---

### Task 7: Update Datenschutzerklärung

**Files:**
- Modify: `src/app/datenschutz/page.tsx`

- [ ] **Step 1: Replace section 7 (Cookies und Tracking)**

Find the existing section 7 comment `{/* 7. Cookies */}` (lines 134-140) and replace it with two new sections:

Replace:
```tsx
          {/* 7. Cookies */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">7. Cookies und Tracking</h2>
            <p className="mt-2">
              Diese Webseite verwendet <strong className="text-foreground">keine Cookies</strong> und <strong className="text-foreground">keine Tracking-Tools</strong>. Es werden keine Analyse-Dienste (wie Google Analytics), Werbepixel oder Social-Media-Plugins eingesetzt. Es findet keine Profilbildung statt.
            </p>
          </div>
```

With:
```tsx
          {/* 7. Cookies */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">7. Cookies</h2>
            <p className="mt-2">
              Diese Webseite verwendet ein technisch notwendiges Cookie (<code className="text-xs">cookie_consent</code>) zur Speicherung Ihrer Cookie-Einstellungen. Dieses Cookie wird ausschließlich lokal in Ihrem Browser gespeichert (localStorage) und nicht an Server übermittelt.
            </p>
            <p className="mt-2">
              Darüber hinaus wird das Meta Pixel (siehe Abschnitt 8) <strong className="text-foreground">nur nach Ihrer ausdrücklichen Einwilligung</strong> geladen. Ohne Ihre Zustimmung werden keine Tracking-Cookies gesetzt.
            </p>
          </div>

          {/* 8. Meta Pixel */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">8. Meta Pixel (nur mit Einwilligung)</h2>
            <p className="mt-2">
              Nach Ihrer ausdrücklichen Einwilligung setzen wir das <strong className="text-foreground">Meta Pixel</strong> ein, einen Analysedienst der Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland.
            </p>

            <p className="mt-2 text-sm">
              <strong className="text-foreground">Zweck:</strong> Messung der Wirksamkeit unserer Werbeanzeigen auf Meta-Plattformen (Facebook, Instagram). Das Pixel erfasst, ob Besucher über eine Anzeige auf unsere Webseite gelangen und bestimmte Aktionen durchführen (z.&thinsp;B. Absenden des Website-Check-Formulars).
            </p>

            <p className="mt-2 text-sm">
              <strong className="text-foreground">Verarbeitete Daten:</strong> IP-Adresse (gekürzt), Seitenaufrufe, Conversion-Events, Browserinformationen, Zeitstempel.
            </p>

            <p className="mt-2 text-sm">
              <strong className="text-foreground">Cookie:</strong> <code className="text-xs">_fbp</code> (gesetzt von Meta, Laufzeit 90 Tage). Wird nur nach Einwilligung gesetzt.
            </p>

            <p className="mt-2 text-sm">
              <strong className="text-foreground">Rechtsgrundlage:</strong> Ihre Einwilligung (Art. 6 Abs. 1 S. 1 lit. a DSGVO), erteilt über den Cookie-Banner beim ersten Besuch der Webseite.
            </p>

            <p className="mt-2 text-sm">
              <strong className="text-foreground">Widerruf:</strong> Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie im Footer auf „Cookie-Einstellungen" klicken und die Einwilligung zurücksetzen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.
            </p>

            <p className="mt-2 text-sm">
              <strong className="text-foreground">Drittlandtransfer:</strong> Meta Platforms Ireland Limited kann Daten an Meta Platforms Inc. in den USA übermitteln. Die Übermittlung erfolgt auf Grundlage des EU-U.S. Data Privacy Framework (Angemessenheitsbeschluss der EU-Kommission gem. Art. 45 DSGVO).
            </p>

            <p className="mt-2 text-sm">
              Weitere Informationen: <a href="https://www.facebook.com/privacy/policy/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Meta Datenschutzrichtlinie</a> · <a href="https://www.facebook.com/adpreferences" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Meta Werbepräferenzen (Opt-out)</a>
            </p>
          </div>
```

- [ ] **Step 2: Renumber sections 8→9 through 11→12**

Update the following headings:

- `8. Ihre Rechte` → `9. Ihre Rechte`
- `9. Website-Check` → `10. Website-Check`
- `10. Beschwerderecht` → `11. Beschwerderecht`
- `11. Aktualität` → `12. Aktualität`

Also update the comment markers:
- `{/* 8. Betroffenenrechte */}` → `{/* 9. Betroffenenrechte */}`
- `{/* 9. Website-Check */}` → `{/* 10. Website-Check */}`
- `{/* 10. Beschwerderecht */}` → `{/* 11. Beschwerderecht */}`
- `{/* 11. Aktualität */}` → `{/* 12. Aktualität */}`

Update the stand date in section 12:
- `Stand März 2026` → `Stand April 2026`

- [ ] **Step 3: Commit**

```bash
git add src/app/datenschutz/page.tsx
git commit -m "docs: update privacy policy with Meta Pixel and cookie sections"
```

---

### Task 8: Playwright E2E Tests

**Files:**
- Create: `tests/cookie-consent.spec.ts`

- [ ] **Step 1: Create e2e test file**

```ts
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
```

- [ ] **Step 2: Run tests locally**

```bash
cd /Users/michael/Documents/01_AKTUELLE_PROJEKTE/Webseite_Michael/portfolio
npx playwright test tests/cookie-consent.spec.ts --reporter=list
```

Expected: All 7 tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/cookie-consent.spec.ts
git commit -m "test: add Playwright e2e tests for cookie consent banner"
```

---

### Task 9: Manual Verification

- [ ] **Step 1: Start dev server and check visually**

```bash
cd /Users/michael/Documents/01_AKTUELLE_PROJEKTE/Webseite_Michael/portfolio
npm run dev
```

Open http://localhost:3000 and verify:
1. Cookie banner appears at bottom with slide-up animation
2. "Ablehnen" hides the banner, no pixel script in DevTools Network tab
3. "Akzeptieren" hides the banner (pixel would load if ID is set)
4. Reload — banner stays hidden
5. Footer shows "Cookie-Einstellungen" link
6. Clicking "Cookie-Einstellungen" reloads and shows banner again
7. /datenschutz shows new sections 7+8, correct numbering through 12

- [ ] **Step 2: Run full test suite**

```bash
npx playwright test --reporter=list
```

Expected: All existing tests + new cookie-consent tests pass.

- [ ] **Step 3: Build static export**

```bash
npm run build
```

Expected: Build succeeds with no errors.

---

### Post-Implementation (Manual, nicht im Code)

1. **Meta Pixel ID eintragen:** Meta Business Manager → Events Manager → Pixel-ID kopieren → in `.env.local` eintragen
2. **Custom Conversion anlegen:** Meta Business Manager → Events Manager → Custom Conversions → URL enthält `/website-check/danke` → Event: Lead
3. **UTM-Link für Ad:** `https://hoeger.dev/website-check?utm_source=meta&utm_medium=paid&utm_campaign=website-check`
4. **Deploy:** `git push` → GitHub Actions baut und deployt automatisch
