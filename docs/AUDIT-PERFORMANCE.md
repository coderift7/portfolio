# Performance Deep-Dive — hoeger.dev

**Datum:** 2026-04-20
**Basis:** Lighthouse-JSON in `docs/audit-tmp/` (5 Seiten, localhost:4173, simulierte Mobil-Drosselung), Build-Output `out/_next/static/chunks/`.
**Status:** Read-only Analyse, kein Build, kein Deploy.

---

## 0. Executive Summary

| Seite | Perf | FCP | LCP | TBT | CLS | LCP-Element |
|---|---|---|---|---|---|---|
| Home | 0.73 | 2.3 s | **8.5 s** | 20 ms | 0.006 | `<p>` im CookieBanner (fixed bottom) |
| /preise | 0.78 | 1.5 s | 6.1 s | 10 ms | 0.002 | Hero-`<h1>` |
| /gruendungsangebot | 0.74 | 2.1 s | 7.3 s | 20 ms | 0 | Hero-`<p>` |
| /farbpsychologie | 0.75 | 1.8 s | 7.1 s | 10 ms | 0.002 | Intro-`<p>` |
| /website-check | 0.76 | 1.4 s | 6.9 s | 10 ms | 0.002 | Hero-`<p>` |

**Drei Root Causes:**

1. **TTFB dominiert das LCP** (1.5–4.0 s simuliert auf localhost:4173) — verursacht von Next.js-16-App-Router-Hydration + blockierendem 90 KB CSS. `elementRenderDelay` ist dagegen klein (80–260 ms), nur auf Home 1.5 s (CookieBanner-Spezialfall).
2. **90 KB CSS ist render-blocking** auf allen Seiten (`9af7b5ec6d928c61.css`), Lighthouse-Schätzung 451–1051 ms Einsparung.
3. **Home-spezifischer Chunk `a90098f97dfcd8b7.js` (33 KB) wird auf allen Unterseiten geladen, aber dort zu 99 % unused** (Lighthouse meldet 33 461 Bytes unused von 33 705 Gesamtbytes). Ursache: App-Router-Prefetching der Home-Route im Hintergrund, das die JS-Bundles herunterlädt.

**Der 80 KB "unused JS"-Eintrag** (`1c9669fd…`, 223 KB gesamt) ist **React + ReactDOM Client Runtime** — unvermeidbar.
**Der zweitgrößte Eintrag** (`604b9d31…`, 133 KB, ~75 KB unused) ist **Framer Motion** — hier sind echte Einsparungen möglich.

---

## 1. Bundle-Analyse

### 1.1 Chunk-Größen-Tabelle

| Chunk | Bytes | Typ | Inhalt | Seiten | Unused (lh) |
|---|---|---|---|---|---|
| `1c9669fd87998ca9.js` | 223 454 | **React + ReactDOM Client** (Reconciler, Scheduler, `hydrateRoot`, `createRoot`, `onRecoverableError`) | Runtime | alle | ~80 KB |
| `604b9d313262e281.js` | 133 577 | **Framer Motion** (MotionConfig, LayoutGroup, motionValue, animate, spring, easing, borderBottom/Transform-Tokens) | Library | alle | ~75 KB |
| `e62c31e82a429165.js` | 118 152 | **Next.js App-Router** (AppRouterContext, GlobalLayoutRouterContext, prefetch, flightRouterState, IntersectionObserver für Link-Prefetch) | Next-Runtime | alle | ~54 KB |
| `a6dad97d9634a72d.js` | 112 594 | **Next.js nomodule-Polyfill** — nur für Legacy-Browser (Attribut `noModule`, moderne Browser ignorieren) | Polyfill | alle | 0 (nicht geladen) |
| `71bf0b7abaea3b0f.js` | 43 876 | Layout-Shell: **CookieBanner + MetaPixel + AnnouncementBanner + Header + Footer + Logo + ThemeToggle + consent-Lib** | layout.tsx | alle | — |
| `a90098f97dfcd8b7.js` | 33 759 | **Home-Page**: Hero + UspBanner + Services (enthält `michael-hero`, `uspBanner`, `siteConfig`, `arrow-up-right`) | `/` | **ALLE** (via Prefetch!) | 33 461 B auf Unterseiten = Bug |
| `f091501564eb2ea3.js` | 32 831 | App-Router-Sub-Runtime (router, createContext) | alle | ~26 KB |
| `d2be314c3ece3fbe.js` | 30 681 | Router-Helpers (pathname, router, createContext) | alle | ~23 KB |
| `fdc29d7d7e830af2.js` | 24 383 | HeadManager + `next/script` + `next/image` (imageSrcSet, HeadManagerContext, useRouter) | alle | — |
| `turbopack-49493f2fe6bfbb49.js` | 10 232 | Turbopack Runtime-Loader | alle | — |
| `159f6dc7761ac1be.js` | 5 924 | `/website-check`-Page-Chunk (`.webp`-Referenzen) | /website-check | — |
| `eb01e09fb51bffc4.js` | 4 211 | `/farbpsychologie`-Page-Chunk | /farbpsychologie | — |
| `e83d2f26f34f14be.js` | 4 013 | Page-Chunk (vermutl. /preise oder /texterstellung) | — | — |
| `1c8603b4753eb8da.js` | 2 584 | Mini-Chunk | — | — |
| `e7516e6d5ba4033b.js` | 1 635 | `/gruendungsangebot`-Page-Chunk (enthält "Hero") | /gruendungsangebot | — |
| `159f…`/`ff1a…`/`1c58…` | < 500 | Manifest/Buildmarker | — | — |
| `9af7b5ec6d928c61.css` | **90 454** | **Globales CSS (Tailwind v4 + next/font Inter/JetBrains-Mono)** | alle | — |
| `09be6fa12c04827c.css` | 11 070 | Farbpsychologie-Page-CSS (Fraunces, Instrument Sans, fp.css) | /farbpsychologie | — |

**Summe initial auf Home:** ~770 KB JS (brotli/gzip on wire) + 90 KB CSS = **Lighthouse `total-byte-weight` = 1 066 KB**.

### 1.2 Chunk `1c9669fd87998ca9.js` — Was ist drin?

**Signaturen:** `scheduleCallback`, `hydrateRoot`, `createRoot`, `onRecoverableError`, `react.element`, `lanes` (82× — Fiber), `__REACT_DEVTOOLS` → **React 19.2 + React-DOM 19.2 Client Runtime** (produziert aus `react-dom/client`, Scheduler, Reconciler).

**Die 80 KB "unused"** sind vermutlich: Server-Components-Bridge, SuspenseList, Error-Boundary-Pfade, Hydration-Fallbacks, Dev-Warnings (obwohl production, sind einige Strings drin). **Nicht wegkürzbar** — das ist das Kern-Runtime-Paket einer Next.js-App-Router-Seite. Einziger Hebel: React-Server-Components stärker nutzen, damit weniger Client-Code.

### 1.3 npm-Deps-Size-Haupttreiber

```
node_modules ranked (du -sh):
  next               155 MB   → ~112 KB im Bundle (ohne polyfill) + 30–60 KB Router
  @next              101 MB
  lucide-react        45 MB   → Tree-shaken auf ~3–5 KB pro Icon ✅
  framer-motion      5.5 MB   → 133 KB im Bundle ⚠️
  motion-dom         4.2 MB   → in framer-motion-Chunk enthalten
  react-dom          7.1 MB   → 223 KB im Bundle
  react              (klein)
```

**Nicht im Client-Bundle** (Build-only): typescript, eslint, playwright-core, @tailwindcss/postcss, @babel, @swc, @img, lightningcss. `remark`/`rehype`/`unified`/`gray-matter`/`@tailwindcss/typography` = nur Build-Zeit (Markdown-Blog), nicht im Client.

**Einzige wirklich große Laufzeit-Dep:** **framer-motion**. `lucide-react` ist dank Per-Icon-Imports harmlos.

### 1.4 Dynamic Imports

**Vorhanden auf Home** (`src/app/page.tsx`):
```ts
const Process = dynamic(() => import("@/components/Process"));
const Projects = dynamic(() => import("@/components/Projects"));
const WebsiteCheckTeaser = dynamic(() => import("@/components/WebsiteCheckTeaser"));
const About = dynamic(() => import("@/components/About"));
const Guarantee = dynamic(() => import("@/components/Guarantee"));
const Faq = dynamic(() => import("@/components/Faq"));
const Contact = dynamic(() => import("@/components/Contact"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"));
```

**Aber:** `Hero`, `UspBanner`, `Services` sind statisch importiert → landen im Home-Chunk `a90098` — und dieser wird aktuell auf allen Unterseiten mitgeladen (siehe 1.5).

**Fehlende Dynamic Imports:**
- **CookieBanner** (`layout.tsx`) importiert Framer Motion eagerly. Ist below-the-fold und nur sichtbar wenn kein Consent gesetzt — Kandidat für `dynamic(…, { ssr: false })`.
- **MetaPixel** (`layout.tsx`) — rendert nur bei Consent = granted, aber Code ist im Shell-Chunk. Gleicher Fix.
- **AnnouncementBanner** — verbraucht `lucide-react` (`X`), ist gated auf Pathname. Könnte dynamic geladen werden.
- **ThemeToggle**, **Header-Mobile-Dropdown** — Header ist 209 LOC, enthält mobile-state — könnte in mobile-only-Chunk aufgeteilt werden.

### 1.5 Home-Chunk-Leak (Bug!)

**`a90098f97dfcd8b7.js` (33 KB) wird in den HTML von `/preise`, `/gruendungsangebot`, `/farbpsychologie`, `/website-check` zwar NICHT als `<script>`-Tag eingebunden** (gegengecheckt mit `grep`), **aber Lighthouse meldet auf diesen Seiten 33 461 Bytes unused von diesem Chunk**. Das heißt: Der Browser lädt ihn **via Next.js App-Router-Prefetch im Hintergrund**, sobald ein `<Link href="/">`-Element (Logo, Footer) im Viewport ist.

Der Chunk enthält Hero + UspBanner + Services (Home-spezifisch). Auf Unterseiten wird nichts davon gebraucht.

**Lösung:** Prefetch für Home-Link aus Header/Footer deaktivieren (`<Link href="/" prefetch={false}>`) **oder** Above-the-Fold-Komponenten der Home (`Hero`, `UspBanner`, `Services`) ebenfalls `dynamic()` machen, damit sie nicht im Home-Page-Chunk landen.

---

## 2. LCP-Root-Cause

### 2.1 LCP-Element pro Seite

| Seite | LCP-Element | TTFB (sim.) | Render-Delay |
|---|---|---|---|
| Home | `<p class="pointer-events-none text-sm text-slate-200">` im **CookieBanner** (fixed bottom) | 3.97 s | **1 492 ms** |
| /preise | `<h1>` "Ihre Website ist nur der Anfang…" | 1.61 s | 84 ms |
| /gruendung | `<p>` "Ich starte mein Webdesign-Business…" | 1.55 s | 257 ms |
| /farbpsych | `<p>` "Jede Branche hat ihre eigene Farb-Erwartung…" | 2.13 s | 92 ms |
| /webcheck | `<p>` "Finden Sie in wenigen Minuten heraus…" | 1.56 s | 100 ms |

**Home-Spezialfall:** Der CookieBanner ist fixed am unteren Viewport, seine Textbreite ist ~400 px. Wenn `getConsent() === null` (Erstbesuch = Lighthouse-Simulation), erscheint er **erst nach Hydration von Framer Motion** (`AnimatePresence + motion.div`). Daher der 1.5 s Render-Delay. Weil der Banner visuell groß ist (40 px hoch, voller Viewport-Breite, 3.5-rem Padding, dunkler Hintergrund), wählt Lighthouse dieses Element als LCP — nicht das Hero-Portrait (das ist klein, nur 210×280 px) und nicht die Headline (die ist aufgeteilt in mehrere Zeilen).

### 2.2 Hero-Image-Analyse

- **Datei:** `/public/images/michael-hero.webp` — **17.6 KB** (bereits WebP, bereits kompakt)
- **Preload korrekt gesetzt** in HTML: `<link rel="preload" href="/images/michael-hero.webp" as="image" fetchPriority="high">`
- **`<img>` mit `fetchPriority="high"`** gesetzt in `Hero.tsx`
- **Kein `<Image priority>`**, sondern native `<img>` mit eslint-disable (Next-Config hat `images.unoptimized: true` — OK für static export)
- Width/Height (320×420) gesetzt → kein CLS
- **Aber:** Lighthouse meldet `image-delivery-insight`: 15.1 KB weitere Einsparung möglich durch bessere Kompression/AVIF oder responsive srcSet. Geringer Hebel.

Image ist **nicht das LCP-Problem**. Bild ist ordentlich optimiert.

### 2.3 Fonts

- next/font mit `display: "swap"` ✅ (layout.tsx Zeile 17, 24)
- **6 Weights Inter** (300/400/500/600/700/800) + 2 Weights JetBrains-Mono + (nur auf Farbpsych) Fraunces + Instrument Sans
- **Lighthouse-Netzwerk:** nur 2 Fonts werden tatsächlich geladen (Latin-Hauptranges, 31.5 KB + 48.6 KB = 80 KB) — Browser ignoriert die 16 anderen Unicode-Ranges
- **Preload der 2 Haupt-Fonts** korrekt gesetzt
- **Kein kritischer FOIT/FOUT**, CLS < 0.01 auf allen Seiten

**Fonts sind nicht das LCP-Problem**. Einsparpotenzial wenn man auf 3–4 Weights reduziert: vernachlässigbar (Browser lädt eh nur die genutzten).

### 2.4 Above-the-Fold Client-Komponenten (blockieren Hydration)

Auf Home above-the-fold:
1. **AnnouncementBanner** (`use client`, `usePathname`, `lucide-react/X`) — 40 px top
2. **Header** (`use client`, `useEffect` scroll, `useState` mobile, `useAnnouncementVisible`, Framer nicht direkt aber via `Motion`)
3. **Hero** — Server Component ✅ (enthält nur statisches `<img>`)
4. **UspBanner** (`use client`, importiert `StaggerContainer`/`StaggerItem` aus `Motion.tsx` → **zieht Framer Motion** in den Hauptpfad)
5. **Services** (`use client`, direkter `motion`-Import → Framer Motion)
6. **CookieBanner** (`use client`, Framer Motion) — below-the-fold, aber im Layout-Chunk

→ **Framer Motion ist im kritischen Rendering-Pfad** weil `UspBanner` + `Services` es oberhalb der Fold brauchen. Das heißt die 133 KB Framer-Motion-Chunk müssen geparst + hydrated sein bevor diese Sections final rendern.

### 2.5 LCP-Kaskade (Home, simuliert)

```
0.0 s   ├─ HTML geladen
        │   └─ Preload: Inter-Font (49 KB), JetBrains (32 KB), michael-hero.webp (18 KB)
        │
~2.3 s  ├─ FCP: First Paint (Text aus Hero sichtbar — aber als FOUT da Font noch lädt)
        │
        ├─ CSS (90 KB) geparst → render-blocking beendet
        ├─ React-Runtime (223 KB) geparst
        ├─ Framer Motion (133 KB) geparst
        ├─ App-Router (118 KB) geparst
        ├─ Layout-Chunk (44 KB) mit CookieBanner/Header hydrated
        │
~3.8 s  ├─ Hydration startet, State resolviert
        │   └─ CookieBanner's `useEffect(() => setVisible(true))` feuert
        │   └─ AnimatePresence startet Slide-in-Animation (300 ms tween)
        │
~8.5 s  └─ LCP: CookieBanner-Text vollständig gerendert (simuliert auf 4x Mobile-CPU)
```

Handlungsbedarf pro Stufe:

| Stufe | Maßnahme | LCP-Δ (geschätzt) |
|---|---|---|
| CSS 90 KB | Critical-CSS inlinen, Rest lazy | −200 bis −400 ms |
| React-Runtime | nicht reduzierbar | 0 |
| Framer Motion 133 KB | Tree-shake / `LazyMotion` + `m.div` / CSS-Ersatz für einfache Fades | −300 bis −600 ms |
| CookieBanner | Ohne Framer-Motion-Animation (CSS-Transition) + `dynamic({ ssr: false })` | −1000 ms auf Home |
| Home-Chunk-Leak | `prefetch={false}` auf Home-Link | −100 ms auf allen Unterseiten |

---

## 3. Unused JS — Quelle konkret

Aus Lighthouse-Daten (alle 5 Seiten gemittelt):

| Chunk | Bytes total | Unused (B) | Unused % | Was? |
|---|---|---|---|---|
| `1c9669fd…` | 223 454 | ~80 000 | 36 % | **React + ReactDOM** — Server-Bridge, Suspense-Varianten, Error-Pfade. Nur marginal reduzierbar. |
| `604b9d31…` | 133 577 | ~75 000 | 56 % | **Framer Motion komplett** — hier die größten Savings möglich. |
| `e62c31e8…` | 118 152 | ~54 000 | 45 % | **App-Router-Runtime** — nicht reduzierbar (Next-Build). |
| `a90098f9…` | 33 759 | 33 461 auf Unterseiten | 99 % | **Home-Page-Chunk unnötig geprefetcht** (Bug). |
| `f0915015…` | 32 831 | ~26 000 | 79 % | Router-Utilities — nicht reduzierbar. |
| `d2be314c…` | 30 681 | ~23 000 | 75 % | Router-Utilities — nicht reduzierbar. |

**Drittanbieter-Bytes (Lighthouse):**

- **Umami** (`analytics.hoeger.dev/script.js`): **2 128 Bytes transfer, priority `High`** — geladen über `<Script strategy="afterInteractive">`. Läuft **ohne Cookie-Consent** (Umami ist cookiefrei → DSGVO-compliant). Okay.
- **Meta Pixel** (`connect.facebook.net/en_US/fbevents.js`): wird **NUR bei Consent = granted** geladen (MetaPixel.tsx Zeile 39). In Lighthouse-Runs nie geladen. ✅ Gated korrekt.
- **Brevo-Form**: Im Grep nicht gefunden — scheint nicht mehr eingebunden zu sein. Falls doch via `siteConfig`: check separat.

Umami-Script-Tag ist `strategy="afterInteractive"` — das ist bereits optimal (läuft nach Hydration, blockiert nichts).

---

## 4. Render-Blocking

**Einziger render-blocker:** `9af7b5ec6d928c61.css` (90 KB) — Lighthouse-Einsparung 180–1051 ms je nach Seite.

**Inhalt:**
- Tailwind v4 Utility-Classes (~20–30 KB nach Purge)
- 44 `@font-face` Inter (6 Weights × 6–7 Unicode-Ranges) ≈ 40–50 KB
- 14 `@font-face` JetBrains-Mono ≈ 10–15 KB
- Design-Tokens + Custom-Utilities (glass, btn-brand, shadow-depth, animate-fade-in-up, glow-hover)

**Optionen:**
1. **Critical-CSS inlinen** (Above-the-Fold-Styles direkt ins `<head>`): Next.js 16 hat `experimental.inlineCss` oder Tools wie `beasties`/`critters` — 10–20 KB inline, Rest lazy via `<link rel="preload" as="style" onload="this.rel='stylesheet'">`.
2. **Font-Faces in separate CSS auslagern**, per Preload laden — reduziert Haupt-CSS auf ~30 KB.
3. **Tailwind-v4-Optimierung** überprüfen (`@import "tailwindcss"` + Content-Scanning sollte reines Purging machen — aber 90 KB ist groß für diese Site).

Schnellster Win: **Font-`@font-face`-Rules aus dem Haupt-CSS rausziehen** (aktuell generiert `next/font` sie ins Seiten-CSS). Mit custom Font-Strategie per `<link rel="preload">` + inline-CSS kann der CSS-Chunk halbiert werden.

---

## 5. Top-5 Quick-Wins

| # | Maßnahme | Aufwand | LCP-Δ Home | LCP-Δ Unterseiten |
|---|---|---|---|---|
| **1** | **Home-Chunk-Leak fixen:** `<Link href="/" prefetch={false}>` in Header/Footer, **oder** `Hero`/`UspBanner`/`Services` in `dynamic()` ziehen | 15 min | — | **−100 bis −200 ms** |
| **2** | **CookieBanner ohne Framer Motion:** CSS-Transition statt `AnimatePresence` + `motion.div` (translate-Y + opacity), plus `dynamic(() => import("@/components/CookieBanner"), { ssr: false })` in layout.tsx | 30 min | **−1 000 ms** | −50 ms (weniger Hydration-Last) |
| **3** | **Framer Motion → `LazyMotion` + `m.div`:** 133 KB auf ~30 KB reduzieren, Features on-demand laden | 2 h | **−400 bis −700 ms** | −400 ms |
| **4** | **Critical-CSS inlinen** (beasties/critters im Build, oder manuell für Above-the-Fold), Rest async | 2 h | **−300 ms** | −200 bis −400 ms |
| **5** | **AnnouncementBanner + MetaPixel dynamic laden** (`dynamic(…, { ssr: false })`), lucide-Icon `X` direkt als Inline-SVG | 20 min | −100 ms | −100 ms |

**Gesamteffekt bei voller Umsetzung:** LCP Home von 8.5 s → ~5–6 s (simuliert), LCP Unterseiten von 6.1–7.3 s → ~4.5–5.5 s. Performance-Score 0.73 → ~0.85.

---

## 6. Langfrist-Empfehlungen

### 6.1 Bundle-Splitting-Strategie

**Zielarchitektur:**

```
Initial Pfad (alle Seiten):
├── react-runtime.js           (~220 KB, nicht reduzierbar)
├── next-router-runtime.js     (~120 KB, nicht reduzierbar)
├── layout-shell.js            (~25 KB)  ← Header + Footer (server components wo möglich)
└── page-[slug].js             (~5–15 KB)  ← echte page-spezifische Komponenten

Deferred (on-interaction / on-idle / on-consent):
├── framer-lazy.js             (~30 KB, nur LazyMotion + m.div) + Features on-demand
├── cookie-banner.js           (~5 KB, ssr:false, lazy-loaded)
├── meta-pixel.js              (~2 KB, consent-gated)
└── announcement-banner.js     (~3 KB, ssr:false)
```

### 6.2 Konkrete Architektur-Hebel

1. **Header als Server-Component zerschneiden**: Statisches Markup + Logo als SC rendern, Mobile-Menu als Island-Client-Component. Aktuell 209 LOC Client-Component nur wegen `useState` für Mobile.
2. **Motion-Wrapper überdenken:** `src/components/Motion.tsx` importiert `framer-motion` global, obwohl der Kommentar sagt "animations are now CSS-driven" und ein `useIntersect`-Hook + CSS-Transform drin ist. Die Variants (`fadeUp`, `slideFromLeft`, `slideFromRight`) werden nur noch für Typ-Kompat exportiert — der `framer-motion`-Import sollte entfernt werden, sofern die Callsites nur Variants konsumieren.
3. **`About`/`Contact`/`Projects`/`Services`/`CookieBanner` direkt-motion-Importe ersetzen:** Diese 6 Komponenten importieren `from "framer-motion"`. Prüfen, ob die Animationen durch CSS (`animate-fade-in-up` ist bereits definiert) ersetzbar sind. Bei Scroll-getriggerten Anims: `useIntersect` + CSS-Transitions reichen.
4. **`next/dynamic` mit `loading: () => null`** für alle Below-the-Fold-Komponenten auch auf Unterseiten, nicht nur Home.
5. **Route-based Code-Splitting für Header-Varianten:** Home/Landing-Pages brauchen anderen Header als Legal-Pages (AGB/Impressum). Separate Layouts im Route-Group definieren.

### 6.3 Monitoring

- **Lighthouse-CI** in GitHub Action mit Budget: `lcp < 2500ms`, `tbt < 200ms`, `total-byte-weight < 800 KB`.
- **Bundle-Analyzer** (`@next/bundle-analyzer`) in CI — Alert wenn ein Chunk > 150 KB.
- **Umami** für Real-User-Metrics (LCP/CLS/INP) per `web-vitals`-Paket senden.

---

## 7. Dateipfade (für Folge-Sessions)

- **Layout:** `/Users/michaelhoger/Documents/Freelance/_business/website/src/app/layout.tsx`
- **Home Page:** `/Users/michaelhoger/Documents/Freelance/_business/website/src/app/page.tsx`
- **Hero:** `/Users/michaelhoger/Documents/Freelance/_business/website/src/components/Hero.tsx`
- **CookieBanner** (Framer-Motion + LCP-Schuldiger auf Home): `/Users/michaelhoger/Documents/Freelance/_business/website/src/components/CookieBanner.tsx`
- **Motion-Wrapper** (Framer-Motion-Import überflüssig?): `/Users/michaelhoger/Documents/Freelance/_business/website/src/components/Motion.tsx`
- **MetaPixel** (bereits consent-gated): `/Users/michaelhoger/Documents/Freelance/_business/website/src/components/MetaPixel.tsx`
- **AnnouncementBanner:** `/Users/michaelhoger/Documents/Freelance/_business/website/src/components/AnnouncementBanner.tsx`
- **Header** (209 LOC, Client): `/Users/michaelhoger/Documents/Freelance/_business/website/src/components/Header.tsx`
- **Build-Output:** `/Users/michaelhoger/Documents/Freelance/_business/website/out/_next/static/chunks/`
- **Rohe Lighthouse-JSONs:** `/Users/michaelhoger/Documents/Freelance/_business/website/docs/audit-tmp/lh-*.json`

---

## Anhang A — Parsing-Methodik

- Chunk-Inhalts-Identifikation: `strings <chunk>.js | grep -oE '<fingerprint-pattern>'` (keine Source-Maps außer für `a6dad...` Polyfill).
- Lighthouse-Auswertung: Python-Script mit `json.load`, gezogene Audits: `largest-contentful-paint`, `lcp-breakdown-insight`, `unused-javascript`, `render-blocking-insight`, `network-requests`, `total-byte-weight`, `image-delivery-insight`.
- Kein Build oder Deploy. Alles read-only.
