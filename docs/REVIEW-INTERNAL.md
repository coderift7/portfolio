# Internal Review — hoeger.dev

**Stand:** 2026-04-20, 22:50 CEST
**Kontext:** Selbst-Audit parallel zum externen Review (Commit `20cae7c` deployed).
**Ziel:** Findings für morgen mit externem Review mergen, dann in einem Rutsch fixen.
**Mode:** Read-only heute Abend — keine Deploys, keine Code-Changes.

---

## Pragmatische Freigaberegel (Michaels DoD)

Go-Live nur wenn:
- Keine offenen A11y-Findings
- Alle Kernpfade einmal real getestet
- Lighthouse für Key-Pages sauber
- Keine sichtbaren UI-Mängel

---

## Findings-Matrix

### 🔴 CRITICAL — muss fix vor „wirklich fertig"

#### C1. WhatsApp-Button — Text-Kontrast ~1.98:1
- **Ort:** `src/components/WhatsAppButton.tsx:12,16,19`
- **Problem:** `bg-[#25D366]` + `text-white` für "WhatsApp Chat" + `text-white/80` für "Gerade verfügbar"
- **WCAG:** 1.98:1 (erforderlich 4.5:1 normal, 3:1 large) — Hard Fail
- **Fix-Optionen:**
  - A: Darker Green `#128C7E` (WhatsApp Dark Brand) → ~4.8:1 mit white ✅
  - B: Text auf Portrait-Bubble verschieben, Button nur Icon+Portrait
  - C: Opacity-Overlay `bg-black/10` auf aktuellem Grün, Text darauf
- **Empfehlung:** A (brand-authentisch, WCAG-konform)

#### C2. Primary-CTA — `#0D9488 + text-white` ~3.71:1
- **Ort:** Überall wo `bg-primary` + weiße Schrift → Hero, Contact, Cookie-Akzeptieren, viele Buttons
- **Problem:** 3.71:1 ist Pass für „Large Text" (≥18pt oder ≥14pt bold), aber Fail für `text-sm` (14px) semibold
- **Tailwind-Inspektion:** die meisten `btn-brand`-Buttons sind `text-sm font-semibold` → grenzwertig/Fail
- **Fix-Optionen:**
  - A: Primary abdunkeln auf `#0A7A70` (~4.5:1) → Light-Mode CI leicht anpassen
  - B: Buttons auf `text-base` + `font-bold` hochziehen (>18pt bold threshold)
  - C: CTA-Farbe nach Farbpsychologie-Regel: Komplementär = Orange (`--accent: #F97316`) für CTAs, Teal bleibt Branding
- **Empfehlung:** C wäre ideal (folgt `feedback_farbpsychologie.md` Komplementärregel), aber größerer Eingriff → **mit externem Review abstimmen**

#### C3. Trailing-Slash-Inkonsistenz in Links
- **Canonical:** alle mit `/impressum/`, `/datenschutz/`, `/agb/` (mit Slash)
- **6 Links ohne Slash:**
  - `src/components/Footer.tsx:46` `/agb`
  - `src/components/Footer.tsx:49` `/impressum`
  - `src/components/Footer.tsx:53` `/datenschutz`
  - `src/components/CookieBanner.tsx:41` `/datenschutz`
  - `src/components/Contact.tsx:187` `/datenschutz`
  - `src/app/website-check/WebsiteCheckForm.tsx:134` `/datenschutz`
- **Auswirkung:** GitHub Pages / Next static export → Redirect 308 → Canonical-Mismatch
- **Fix:** Alle auf `/xxx/` vereinheitlichen (5-Min-Fix)

---

### 🟡 MEDIUM — vor Live-Launch angehen

#### M1. Blog-Übersicht & Blog-Posts ohne eigenen Twitter-Block
- **`src/app/blog/page.tsx`**: nur `openGraph`, kein `twitter:` → fällt auf Layout-Fallback
- **`src/app/blog/[slug]/page.tsx:27-38`**: `generateMetadata` hat `openGraph` aber kein `twitter:` — Post-Titel sind im og:title, aber Twitter zeigt generische Layout-Meta
- **Fix:** Twitter-Block in beiden Seiten analog zu den Landing-Pages

#### M2. JSON-LD — Rich Results Test noch nicht durchgelaufen
- **Gefunden:** 78 `@type` Einträge → Person, ProfessionalService, LocalBusiness, WebApplication, FAQPage, BreadcrumbList, Service, Offer, BlogPosting...
- **Risiko:** Search Console wirft Warnings wenn required-fields fehlen
- **Fix:** Morgen `search.google.com/test/rich-results` gegen alle 13 Seiten + Fixes

#### M3. WhatsApp Alt-Text generisch
- **Ort:** `src/components/WhatsAppButton.tsx:37` `alt="Michael Höger"`
- **Besser:** `alt="Portrait von Michael Höger – für WhatsApp-Chat"` oder `alt=""` (dekorativ, aria-label deckt Semantik)
- **Impact:** Screen-Reader-UX

---

### 🟢 NICE-TO-HAVE — offene Tests für morgen

- [ ] **Lighthouse-Run** auf `/` und `/farbpsychologie/` (A11y/BP/SEO/Perf) — kein localer Server heute Abend gestartet
- [ ] **Rich Results Test** — alle JSON-LDs durchjagen
- [ ] **Formulare real testen:**
  - Kontaktformular einmal absenden (Brevo-Empfang verifizieren)
  - Website-Check-Formular einmal absenden
  - Validierungs-/Fehlerverhalten
  - Netzwerk-Tab: keine Red-Requests
  - Meta-Pixel lädt wirklich erst nach Consent (DevTools: `_fbp`-Cookie erst nach Akzeptieren)
- [ ] **Cross-Device:**
  - Desktop breit (>1440px)
  - Standard-Laptop (1366×768)
  - iPhone (375/390×844)
  - Tests: abgeschnittene Inhalte, Layout-Jumps, Hover/Focus-Zustände
- [ ] **Hover/Focus-Audit** alle CTAs — Tab-Navigation mit Keyboard
- [ ] **404-Page** — existiert (`not-found.tsx`), funktional OK, ggf. visuell aufwerten
- [ ] **Dark-Mode** — systematisch alle Seiten, Theme-Toggle testen

---

### ℹ️ BESTÄTIGT SAUBER (Audit heute Abend)

- ✅ **OG-Image:** `/public/images/og-image.png` existiert, 1200×630 PNG
- ✅ **Canonical:** auf allen 13 Seiten gesetzt (10 statische + Blog + Dynamic-Slug)
- ✅ **Twitter-Block:** auf 10 Hauptseiten (nach Commit `20cae7c`)
- ✅ **robots.txt:** referenziert Sitemap, schließt `/admin/` aus
- ✅ **Sitemap:** alle indexierbaren Seiten drin (inkl. `was-passiert-wenn-...`)
- ✅ **H1:** genau 1 pro Seite, alle gefunden
- ✅ **Alt-Texte:** alle `<img>` haben alt (6 Stellen)
- ✅ **ARIA-Labels:** Header, Theme-Toggle, Cookie, Social, Hero, WhatsApp — alle gelabelt
- ✅ **Skip-to-content-Link:** Header.tsx, `href="#main"` auf allen Seiten vorhanden
- ✅ **Anker-Ziele:** `#kontakt`, `#projekte`, `#ueber-mich`, `#faq`, `#leistungen`, `#lead-magnet` existieren
- ✅ **Legal-Pages:** OG-Images + Twitter ergänzt (Commit `20cae7c`)
- ✅ **Logo-Link:** `Link href="/"` mit `aria-label="Zur Startseite"` (Commit `20cae7c`)
- ✅ **noindex:** `/website-check/danke/`, `/not-found` korrekt

---

## Plan für morgen

1. **Externes Review abwarten** und mit diesen Findings mergen
2. **Lighthouse + Rich Results + Formular-Tests** durchführen → weitere Findings ergänzen
3. **Priorisierung:** Critical zuerst (C1 WhatsApp, C3 Slashes sind Quick-Fixes; C2 Primary-CTA ggf. mit Farbpsychologie-Komplementär-Entscheidung)
4. **Ein Rutsch:** alles fixen, Build verifizieren, Deploy
5. **Finaler Check:** visueller Walkthrough auf 3 Viewports, Kernpfade einmal durch

---

*Dokument wird morgen mit externem Review gemergt.*
