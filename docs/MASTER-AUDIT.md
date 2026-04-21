# MASTER-AUDIT hoeger.dev — Nacht 20.04.→21.04.2026

**Erstellt:** 2026-04-20/21, 9 Parallel-Agents über ~45 Min
**Scope:** 14 Artefakte aus 9 Spezialist-Perspektiven + 3 Main-Context-Arbeiten
**Policy:** Read-only Nacht-Audit. Keine Deploys. C3-Fix im Working Tree staged, uncommitted.

---

## 📚 Quellen-Index

| Doc | Scope | Quelle |
|---|---|---|
| `REVIEW-INTERNAL.md` | Interner Selbstaudit + Konsolidierung | Main + 3 Agents |
| `UI-REVIEW.md` | 6-Pillar Visual Audit | `gsd-ui-auditor` |
| `REVIEW.md` *(in REVIEW-INTERNAL)* | Code Review letzte Commits | `gsd-code-reviewer` |
| `AUDIT-TECH.md` | Lighthouse + JSON-LD + Broken-Links | `general-purpose` |
| `AUDIT-BFSG.md` | WCAG 2.2 AA + BFSG-Compliance | `general-purpose` |
| `AUDIT-PERFORMANCE.md` | LCP-Root-Cause + Bundle-Analyse | `general-purpose` |
| `AUDIT-CONTENT.md` | Jargon + KI-Floskeln + Claims | `general-purpose` |
| `AUDIT-SEO.md` | Keywords + Internal Linking + llms.txt | `general-purpose` |
| `AUDIT-SECURITY.md` | OWASP + Deps + Cookies + Headers | `Code Reviewer` |
| `AUDIT-COMPETITIVE.md` | hoeger.dev vs. 7 DACH-Konkurrenten | `general-purpose` |
| `FIX-PLAN.md` | One-Shot-Commit-Roadmap | Main |

---

## 🎯 Executive Summary

**Die Website ist handwerklich solide, strategisch unscharf, und in einzelnen Punkten BFSG-/Security-kritisch.**

| Dimension | Score | Status |
|---|---|---|
| Code-Qualität | 8/10 | Merge-fähig mit 2 Fixes |
| UI-Audit (6 Pillar) | 33/60 | Kern gut, Landingpages ziehen runter |
| WCAG 2.2 AA | 26P/12Pa/3F/9N | **BFSG-Nachbesserung nötig** |
| Performance | 0.73-0.78 | LCP 6-8s, konkrete Root-Causes identifiziert |
| Content-Qualität | 8.1/10 | Jargon in 3 Clustern |
| SEO | 6/10 | AI-Visibility-Desaster strukturell erklärt |
| Security | GELB | **5 CVEs durch Next.js-Update fixbar** |
| Competitive-Positioning | 65% | Winning-Angle nicht im Hero sichtbar |

---

## 🚨 Top-10 Critical — in Priorität

### 1. Next.js 16.1.6 → 16.2.4 *(Security F-01)*
5 High-CVEs, darunter CSRF-Bypass + HTTP Request Smuggling. **Kein Breaking.**
```bash
npm install next@16.2.4 && npm audit fix
npm uninstall remark-html  # nicht importiert, XSS-Risiko bei Versehen
```

### 2. Primary-CTA Kontrast 1.86:1 *(C2 + BFSG BLOCK-1)*
20+ Buttons betroffen. **Drei Optionen** — Entscheidung morgen mit externem Review:
- A) Primary auf `#0A7A70` abdunkeln (minimaler Eingriff)
- B) Buttons auf `text-base font-bold` hochziehen
- C) **CTA-Komplementär-Orange** `#F97316` (farbpsychologie-konform)

### 3. WhatsApp-Button 1.98:1 *(C1 + BFSG BLOCK-2)*
`#128C7E` WhatsApp Dark Brand → 4.8:1. 2-Min-Fix.

### 4. Globale `focus-visible`-Styles *(B4 + BFSG BLOCK-3)*
WCAG 2.4.7 Fail. ~30+ interaktive Elemente. 15-Min-Fix in `globals.css`.

### 5. BFSG § 6 — Barrierefreiheitserklärung + Feedback-Mechanismus *(BFSG BLOCK-6+7)*
Pflicht seit 28.06.2025. Fehlt komplett. Route `/barrierefreiheit/` + Feedback-Kanal.
**⚠️ NICHT "100% barrierefrei" oder "BFSG-zertifiziert" schreiben** (rechtlich problematisch).

### 6. FAQ-Accordion ohne aria-expanded *(B3 + BFSG BLOCK-4)*
WCAG 4.1.2. 10-Min-Fix.

### 7. Desktop-Nav-Dropdown nur Hover *(BFSG BLOCK-5)* 🆕
WCAG 2.1.1 — nicht keyboard-erreichbar. `Header.tsx:72-104`.

### 8. LCP-Root-Cause: CookieBanner + Framer Motion *(Perf-HEBEL)* 🆕
Render-Delay 1492 ms auf Home. CookieBanner ohne Framer Motion + `dynamic({ssr:false})` → −1000 ms LCP.

### 9. Framer Motion raus aus Above-the-Fold *(Perf + 3 Feedback-Regeln)*
133 KB, 75 KB unused. `LazyMotion` + `m.div` → −100 KB. Fixt gleichzeitig:
- `feedback_framer_motion_events.md` (onClick unzuverlässig)
- Performance (LCP)
- Bundle-Size

### 10. AI-Visibility strukturell 🆕
llms-full.txt enthält **0×** „Limburg", „Farbpsychologie", „BFSG", „KMU" — erklärt das 0/20-Hit-Desaster vom 18.04. direkt.

---

## 🔴 BLOCK-Findings Gesamt

| ID | Ort | Issue | Aufwand |
|---|---|---|---|
| **C1** | WhatsApp | Kontrast 1.98:1 | 2 Min |
| **C2** | Primary-CTA | Kontrast 1.86:1 | 30 Min + Design-Call |
| **C3** ✅ | 6 Links | Trailing-Slashes | **gefixt** |
| **B1** | `/gruendungsangebot/` | Kein Dark-Mode | 5 / 90 Min |
| **B2** | 6 Landingpages | Absolute hoeger.dev-URLs | 5 Min |
| **B3** | FAQ | aria-expanded fehlt | 10 Min |
| **B4** | Site-wide | focus-visible fehlt | 15 Min |
| **B5** | Header | AnnouncementBanner CLS | 10 Min |
| **BFSG-5** 🆕 | Nav-Dropdown | Keyboard-Trap | 20 Min |
| **BFSG-6** 🆕 | Route | Barrierefreiheitserklärung | 45 Min |
| **BFSG-7** 🆕 | Contact | Feedback-Mechanismus | 15 Min |
| **F-01** 🆕 | package.json | Next.js CVEs | 5 Min |
| **F-02** 🆕 | API | Rate-Limiting | 30 Min Brevo-Setup |
| **SEO-1** 🆕 | `/webdesign-limburg/` | 0 eingehende Links | 15 Min |
| **SEO-2** 🆕 | Homepage | „Limburg" nicht sichtbar | 10 Min |
| **SEO-3** 🆕 | llms-full.txt | Winning-Angle fehlt | 30 Min |

---

## 🟡 MEDIUM — Bündel

### Code-Quality
- **M-01** React-Key preise/page.tsx:288 → stable
- **M-02** `siteConfig.url` vs. `siteUrl` dedupen
- **M-03** `--font-jetbrains` tote Ref in fp.css
- **M-04** Nav-Links `<a>` → `<Link>` (Logo-Fix nur halb gezogen)

### Security (gelb)
- **F-03** CSRF-Token / Origin-Allowlist
- **F-04** Umami Consent-Gate *(Perf relativiert: cookiefrei, DSGVO-OK)*
- **F-06** HTTP-Security-Header als Meta-Tags
- **F-09** LeadEvent.tsx `getConsent()==='granted'`

### Content
- **Jargon P0:** „SSL", „Core Web Vitals", „Meta-Tags", „WCAG", „Handover" in Kundentexten
- **Lieferzeit-Widerspruch:** FAQ 3-4 Wo vs. Paket-3 4-5 Wo
- **„Webdesign im Abo"** auf `/preise` nicht verwendet (Positionierungs-Unschärfe)
- **Home vs. /webdesign-limburg:** ~65% Text-Überlappung
- **Blog-Post 2:** unbelegte „80%"-Zahl (Haftungsrisiko `feedback_haftungsrisiken_vermeiden`)

### SEO
- Keyword-Kannibalisierung `/preise` vs `/gruendungsangebot` (identischer H2, Priority 0.9)
- Blog → Leistungsseiten = 0 Links
- Footer enthält keine Leistungsseiten, keinen Blog, kein `/webdesign-limburg`
- H1 ohne Keyword bei 6/10 Landings
- 3 Descriptions zu lang (webdesign-limburg 185, gruendungsangebot 191, farbpsychologie 165)
- OG-Image auf allen 11 Seiten identisch
- FAQ-Schema auf `/texterstellung` fehlt trotz sichtbarer FAQ
- BreadcrumbList auf `/farbpsychologie/` + `/website-check/` fehlt
- FAQPage-Potenzial auf `/preise/` + `/gruendungsangebot/`

### UI/UX (Auditor FLAGs)
- Countdown ohne aria-live / role="timer"
- **Content-Drift 4 vs. 5 Plätze** zwischen Banner und Landingpage (Vertrauensbruch)
- Placeholder-Kontrast `text-muted-foreground/60` ≈ 2.1:1
- 9-12px Micro-Text-Inflation auf 3 Seiten
- Zwei parallele Button-Sprachen (btn-brand vs. Gradient)
- Autocomplete-Tokens fehlen in Formularen (WCAG 1.3.5)
- Target-Size Social-Icons 20×20 unter WCAG 2.2 2.5.8 (24×24)

---

## 🟢 LOW & Cleanup

- L-01/02/03: ungenutzte CSS-Vars, `.fp-wheel`, `.fp-fade-in` in fp.css
- L-04 gekoppelt an B2
- L-06 Markdown-Link-Checker in CI (Tracking)
- Skip-Link-Positionierung nach AnnouncementBanner → davor setzen

---

## 🎨 Strategische Findings (Competitive + SEO)

### Winning-Angle im Hero nicht sichtbar
Laut Branchen-Analyse 20.04.: **Next.js + AI-Search + BFSG + Farbpsych + KMU-Preis**.
Aktuell im Hero sichtbar: nur AI-Search. **4 von 5 Säulen** fehlen im 10-Sekunden-Eindruck.

### Trust-Schwäche
- 1 echte Referenz (Schäferhof) + 1 Demo
- 0 Testimonials
- 0 quantifizierte Case Studies
- Vergleich: GEWINNER B. 38+ Referenzen, Julian Geissler 4+ mit Logos

### Fünf strategische Moves bis 01.06.2026 (AI-Visibility 2/20)
1. Hero-Subline + USP-Banner via `site.ts` (2h)
2. Schäferhof-Case mit Before/After-Zahlen (1 Tag)
3. Farbpsychologie-Teaser auf Homepage (3-4h)
4. 3 Tech-Blog-Artikel (je 1 Tag) — llms.txt, BFSG-Handwerk, Next.js vs. WordPress
5. Vergleichs-Box auf `/preise` gegen Kandivo/Sitepartner (2-3h)

**Gesamt:** ~5-6 Arbeitstage.

---

## 📝 Merge mit externem Review — Vorschlag

**Morgen früh:**
1. Externes Review durchgehen
2. Duplicate-Findings mergen (vor allem Kontrast + Fokus erwarte ich auch extern)
3. Quick-Wins aus Phase 1 (FIX-PLAN.md) im One-Shot-Commit
4. Kontrast-Entscheidung mit Review abstimmen (C2 Option A/B/C)
5. Dark-Mode-Entscheidung `/gruendungsangebot/` (B1 A vs. B)

**Mittags/Nachmittag Fix-Rutsch:**
- Phase 2-6 des FIX-PLAN.md
- Plus: 3 neue BFSG-BLOCKs (5, 6, 7)
- Plus: Next.js-Update + remark-html entfernen
- Plus: Framer-Motion-Exit aus Above-the-Fold
- Plus: llms-full.txt um Limburg/BFSG/Farbpsych/KMU erweitern

**Post-Deploy:**
- Lighthouse Re-Run
- Rich Results Test
- Screen-Reader + Keyboard-Test
- Cross-Device

---

## 🤝 Bemerkenswerte Cross-Agent-Bestätigungen

- **Kontrast-Problem bestätigt von 3 Agents** (UI-Auditor, Lighthouse, BFSG) — härteste Konsens-Finding
- **focus-visible-Fehlen bestätigt von 2 Agents** (UI-Auditor, BFSG)
- **Framer-Motion-Bundle-Impact** validiert `feedback_framer_motion_events.md` Kategorie-2 über Perf-Metric
- **Nav-Dropdown-Issue** erstmals von BFSG-Agent gefunden (UI-Auditor hatte es nur implizit)

---

## 🧭 Widersprüche / zu klären

- **Security F-04 (Umami ohne Consent)** vs. **Performance (Umami cookiefrei)**: kein echter Widerspruch — laden ohne Consent ist DSGVO-OK wenn cookiefrei, aber für Datenschutz-Transparenz trotzdem im Cookie-Banner erwähnen.
- **Security erwähnt `/api/contact` + `/api/check`** — static export hat keine API-Routes. Vermutlich Direct-Brevo-Submits. Bei Rate-Limiting-Fix dran denken: das ist Brevo-Seite, nicht Next-Seite.

---

## 📊 Work-Stream-Übersicht

**9 Agents in ~45 Min:**
- 3 Waves à je 3 (Code-Review + UI-Auditor + Lighthouse)
- 6 parallel (BFSG + Perf + Content + SEO + Security + Competitive)

**Main-Context währenddessen:**
- C3 Trailing-Slashes gefixt (4 Dateien, 6 Links, uncommitted)
- content/-Crawl clean (0 zusätzliche 404er)
- REVIEW-INTERNAL.md konsolidiert
- FIX-PLAN.md erstellt (212 Zeilen)
- MASTER-AUDIT.md (diese Datei)

**Geschätzter Gesamt-Aufwand für vollen Durchlauf:**
- **Morgen Vormittag:** 3-4h (alle BLOCK-Findings + Next.js-Update + Deploy)
- **Diese Woche:** 5-6 Tage (strategische Moves bis 01.06.-Deadline)

---

*Schluss der Nacht-Audit-Phase. 14 Artefakte in `docs/`. Schlaf gut, Doc 🖖*
