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

---

## 🔁 KONSOLIDIERUNG NACHT 20.04.→21.04. (Parallel-Audit durch 3 Agents + Main)

**Stand:** 2026-04-21, ~00:00 CEST
**Quellen:**
- `docs/REVIEW.md` — Code-Review (`gsd-code-reviewer`)
- `docs/UI-REVIEW.md` — 6-Pillar Visual Audit (`gsd-ui-auditor`)
- `docs/AUDIT-TECH.md` — Lighthouse + JSON-LD + Broken-Links (`general-purpose`)

**Main-Context erledigt:**
- ✅ **C3 Trailing-Slashes gefixt** (Footer.tsx, CookieBanner.tsx, Contact.tsx, WebsiteCheckForm.tsx — 6 Links). Noch nicht committed, wartet auf Rutsch-Commit morgen.
- ✅ **content/-Crawl clean** — Blog-Posts 3/3 auf gültige Anchors (`/#kontakt`, `/#leistungen`). Projects.json externe URLs unverändert.
- ✅ **Systematik-Check**: keine weiteren trailing-slash-losen internen Links in `src/`.

---

### 🔴 Critical — bestätigt + verschärft

| ID | Finding | Agent-Bestätigung |
|---|---|---|
| **C1** | WhatsApp-Button 1.98:1 | ✓ bestätigt (Audit) |
| **C2** | Primary-CTA Kontrast | ⚠️ **verschärft auf 1.86:1** laut Lighthouse (vorher 3.71:1 angenommen). BFSG-Risiko pikant weil Farbpsychologie-Leistung. **Fix-Option C (Orange-Komplementär)** wird durch diesen Wert faktisch zur Pflicht. |
| **C3** | Trailing-Slashes | ✅ **gefixt in Main-Context** (6/6 Links) |

---

### 🔴 Neue BLOCK-Findings (UI-Auditor)

- **B1** `/gruendungsangebot/` hat **null** Dark-Mode-Klassen (`grep -c "dark:"` = 0 vs. 34/36 auf `/preise` + `/texterstellung`). Visuelle Fragmente im Dark-Toggle. Fix: Opt-out via `data-theme="light"` Wrapper (5 Min) oder Dark-Mode nachziehen (~90 Min).
- **B2** `const kontaktLink = "https://hoeger.dev/#kontakt"` in `preise/` + `gruendungsangebot/` + `texterstellung/` — absolute Prod-URL → Off-site-Click, bricht Preview-Builds. **Überlappt mit L-04** vom Code-Reviewer (dort für `farbpsychologie/page.tsx` + `HeroBranchen.tsx` — 3× dieselbe Stelle). **Total 6× zu fixen** (relativ auf `/#kontakt`). 5-10 Min.
- **B3** FAQ-Accordion ohne `aria-expanded` + `aria-controls`. WCAG 4.1.2 Fail. 10 Min.
- **B4** **Keine `focus-visible`-Styles außer `/farbpsychologie`**. ~30+ interaktive Elemente auf Browser-Default, durch `rounded-xl` oft unsichtbar. WCAG 2.4.7 Fail. 15 Min globaler Fix im `globals.css`.
- **B5** `AnnouncementBanner` CLS-Sprung `top-0 → top-10` nach Hydration. Lighthouse hat CLS noch grün, aber laut Audit ≥0.05 möglich. 10 Min.

---

### 🟡 Medium (Code-Reviewer)

- **M-01** `preise/page.tsx:288` — React-Key ist `label` (nicht garantiert unique). Fix: `key={`${p.name}-${i}`}`. **Vor externem Merge fixen.**
- **M-02** `siteConfig.url` vs. `siteUrl` — zwei Konstanten für dieselbe Info. Später normalisieren.
- **M-03** `--font-jetbrains` tote Ref in `fp.css:20`. Cleanup.
- **M-04** Nav-Dropdown-Trigger + Mobile-Nav `<a>` statt `<Link>` (Logo-Fix nur halb gezogen — Full-Reloads auf Mobile).

---

### 🟡 Medium (UI-Auditor FLAGs — Auszug)

- F1 Countdown ohne `aria-live` / `role="timer"` + SSR-Hydration-Sprung
- F2 **Content-Drift 4 vs. 5 Plätze** zwischen Banner und Landingpage (Claim-Inkonsistenz, Vertrauensbruch) — **10 Min**
- F3 Placeholder-Kontrast `text-muted-foreground/60` ≈ 2.1:1
- F4 Umami lädt unabhängig vom Cookie-Banner (DSGVO-Check nötig)
- F5 9-12px Micro-Text-Inflation auf 3 Seiten
- F6 Zwei parallele Button-Sprachen (`btn-brand` vs. Tailwind-Hardcode-Gradient)
- F7 Placeholder-Ellipse in Contact-Form

---

### ⚡ Performance (Lighthouse v13.1.0)

- **Scores: 0.73-0.78** (alle Seiten Gelbbereich)
- **LCP: 6.1-8.5s** = Hauptbremser (CLS/TBT/FCP grün)
- **1.500 ms Einsparpotenzial** durch unused JS — Chunk `1c9669fd...` allein 80 KB
- **JSON-LD:** 24/24 aus 20 HTML-Dateien parsebar ✅
- **Broken-Links:** 0 von 761 Hrefs ✅
- **Zusatz-Befund:** `label-content-name-mismatch` Logo-Link (aria-label vs. sichtbarer Text)
- **Zusatz-Befund:** `/gruendungsangebot/` `text-slate-400` Labels unter AA

### 🟢 Low (Code-Reviewer, Aufräum-Rutsch)

- L-01 ungenutzte CSS-Vars `--fp-sage`, `--fp-ochre`, `--fp-inkblue`
- L-02 `.fp-wheel`-Selector ohne Markup
- L-03 `.fp-fade-in`-Animation unreferenziert
- L-04 ⇢ siehe B2 (gemeinsamer Fix)
- L-05 gekoppelt an L-04
- L-06 Markdown-Link-Checker in CI (Tracking-Thema)

### 🟢 JSON-LD / SEO Nachzügler

- **BreadcrumbList** fehlt auf `/farbpsychologie/` + `/website-check/`
- **FAQPage-Potenzial** auf `/preise/` + `/gruendungsangebot/` ungenutzt

---

## 🎯 Priorisierter Fix-Rutsch für morgen

**Vor externem Merge (~15 Min):**
1. **M-01** React-Key Fix (`preise/page.tsx:288`)
2. **B2 + L-04** in einem Rutsch: 6× `https://hoeger.dev/#kontakt` → `/#kontakt` (relativ)
3. **B4** globale `focus-visible`-Styles in `globals.css`

**Mit externem Review mergen, dann One-Shot-Fix:**
4. **C1** WhatsApp-Button → `#128C7E` (WCAG 4.8:1)
5. **C2** Primary-CTA-Entscheidung mit Farbpsych-Orange-Komplementär (oder Abdunkeln auf `#0A7A70`)
6. **B1** `/gruendungsangebot/` Dark-Mode-Entscheidung
7. **B3** FAQ aria-expanded
8. **B5** AnnouncementBanner CLS
9. **M-04** Nav-Links `<a>` → `<Link>`
10. **F1-F7** + M-02/M-03 + L-01/02/03 + BreadcrumbList/FAQPage Schemas

**Dann:** Build → Formulare real testen → Cross-Device → Lighthouse-Re-Run → Deploy.

---

## Gesamtscore UI-Audit

**33/60** — schwächste Pillars:
- **Consistency 4/10** — parallele Design-Sprachen auf Landingpages
- **Accessibility 4/10** — focus-visible, aria, Kontraste
- **Technical Polish 5/10** — CLS, absolute URLs, Dead-Code

Kern-Komponenten (Hero, Services, About, Contact, Footer) sauber. Abwertung kommt aus den drei Landingpages `/preise`, `/gruendungsangebot`, `/texterstellung`.

---

*Konsolidierung abgeschlossen 2026-04-21 ~00:00. Keine Deploys heute Nacht. Morgen: externes Review mergen, Quick-Fixes, dann Rutsch-Commit.*

