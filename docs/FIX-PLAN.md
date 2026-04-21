# Fix-Plan hoeger.dev — One-Shot-Commit-Roadmap

**Stand:** 2026-04-20, 23:20 CEST
**Quelle:** `REVIEW-INTERNAL.md` Konsolidierung Nacht 20.04.→21.04.
**Ziel:** Strukturierter Fix-Rutsch, damit morgen extern reviewtes Feedback + interne Findings in **einem** Deploy landen.
**Policy:** Keine Einzelcommits. Keine Deploys heute Nacht.

---

## Phase 0 — Bereits erledigt (ungestaged)

- [x] **C3** Trailing-Slashes 6/6 Links — Footer/CookieBanner/Contact/WebsiteCheckForm
  - *Diff liegt im working tree, noch nicht committed.*

---

## Phase 1 — Quick-Wins vor externem Merge (~15 Min)

> *Ziel: Safe, kleine, non-controversial Fixes, die jedes externe Review auch bringen würde.*

### 1.1 React-Key-Kollisions-Schutz — `M-01`
**Datei:** `src/app/preise/page.tsx:288`
```tsx
// Vorher:
{p.features.map((f) => { ... const label = ...; return <li key={label} ...>
// Nachher:
{p.features.map((f, i) => { ... const label = ...; return <li key={`${p.name}-${i}`} ...>
```
**Warum:** Label als Key ist nicht garantiert unique. Preventive Fix.

### 1.2 Absolute URLs relativieren — `B2 + L-04` (gemeinsamer Fix)
**6 Vorkommen:**
- `src/app/preise/page.tsx` — `const kontaktLink = "https://hoeger.dev/#kontakt"`
- `src/app/gruendungsangebot/page.tsx` — gleiche Konstante
- `src/app/texterstellung/page.tsx` — gleiche Konstante
- `src/app/farbpsychologie/HeroBranchen.tsx:92`
- `src/app/farbpsychologie/page.tsx:388`
- `src/app/farbpsychologie/page.tsx:433`

**Fix:** Alle auf `/#kontakt` (relative URL).
**Warum:** Off-site-Click-Tracking in Umami, bricht Preview-Builds, unnötiger Full-Reload.

### 1.3 Globale `focus-visible` Styles — `B4` (BLOCK)
**Datei:** `src/app/globals.css` (oder Tailwind `@layer base`)
**Fix:** Wenn `/farbpsychologie`-Definition gut ist, auf Site-Ebene hochziehen.
```css
@layer base {
  *:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
    border-radius: 4px;
  }
  /* Buttons + Links: eigener Ring-Style */
  a:focus-visible,
  button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.4);
  }
}
```
**Warum:** WCAG 2.4.7 Pflicht, ~30+ interaktive Elemente betroffen.

---

## Phase 2 — Kritische Kontrast-Entscheidung (Design-Thema)

> *NICHT allein entscheiden — mit externem Review mergen. Aber Optionen vorbereiten.*

### 2.1 Primary-CTA — `C2` (1.86:1 gemessen, **BFSG Hard Fail**)

**Option A — Pragma-Fix:** Primary abdunkeln
- `--primary: #0A7A70` (statt `#0D9488` / `#2dd4bf`)
- WCAG gegen weiß: ~4.5:1 ✅
- **Eingriff:** Minimal, 1 CSS-Variable
- **Trade-off:** CI wird leicht dunkler

**Option B — Typografisch:**
- Alle `btn-brand` auf `text-base font-bold` (≥18pt bold threshold)
- WCAG-Pass für Large Text bei 3:1
- **Trade-off:** Buttons werden voluminöser

**Option C — Farbpsychologie-konform (empfohlen):**
- Primary `#0D9488` bleibt Markenfarbe (Logo, Headlines)
- CTA wechselt auf **Komplementär-Orange** `#F97316` (accent)
- Folgt `feedback_farbpsychologie.md` (Ittens Komplementärkontrast)
- **Trade-off:** Größerer visueller Eingriff, aber strategisch sauber

**Entscheidung:** → Morgen mit externem Review abstimmen.

### 2.2 WhatsApp-Button — `C1` (1.98:1)
**Empfehlung:** `#128C7E` (WhatsApp Dark Brand) → 4.8:1 gegen weiß ✅
**Datei:** `src/components/WhatsAppButton.tsx:12,16,19`

---

## Phase 3 — Dark-Mode-Entscheidung — `B1`

`/gruendungsangebot/` hat **0 `dark:`-Klassen** (vs. 34/36 auf anderen).

**Option A — Opt-out (5 Min):** Wrapper mit `data-theme="light"` + ThemeToggle auf der Seite deaktivieren.
**Option B — Nachziehen (~90 Min):** Dark-Mode systematisch ergänzen.

**Empfehlung:** **B**, denn Seite ist Sales-Kernseite und der Toggle wird von Nutzern bewusst verwendet.

---

## Phase 4 — Accessibility-Rutsch — `B3 + B5 + M-04`

### 4.1 FAQ-Accordion ARIA — `B3` (WCAG 4.1.2)
Jedes Accordion-Item:
```tsx
<button
  aria-expanded={isOpen}
  aria-controls={`faq-panel-${id}`}
  id={`faq-trigger-${id}`}
>
  {question}
</button>
<div
  id={`faq-panel-${id}`}
  role="region"
  aria-labelledby={`faq-trigger-${id}`}
  hidden={!isOpen}
>
  {answer}
</div>
```

### 4.2 AnnouncementBanner CLS — `B5`
- `visible` initial-state auf `true` setzen (SSR-konform)
- Close-Handler persistiert via localStorage
- Alternativ: `position: absolute` + reservierter Platzhalter im Header

### 4.3 Nav-Links `<a>` → `<Link>` — `M-04`
**Datei:** `src/components/Header.tsx:75-101, 148-180`
- Desktop-Dropdown-Trigger: `<a>` → `<Link>`
- Mobile-Nav-Parent + Children: `<a>` → `<Link>`
- Konsistenz mit Logo-Fix von Commit `20cae7c`

---

## Phase 5 — Cleanup-Rutsch (low risk, high tidiness)

### 5.1 Dead-Code in `fp.css` — `M-03 + L-01 + L-02 + L-03`
Entfernen:
- `--font-jetbrains`-Fallback in Z.20
- `--fp-sage`, `--fp-ochre`, `--fp-inkblue` (ungenutzt)
- `.fp-wheel` Selector (kein Markup)
- `.fp-fade-in` + `@keyframes fpFadeIn` (unreferenziert)

~15 Zeilen toter Code raus.

### 5.2 Konstanten dedupen — `M-02`
```bash
grep -rn "siteConfig.url" src/
# Alle auf siteUrl normalisieren. siteConfig.url → Alias oder entfernen.
```

### 5.3 Logo-Label-Mismatch (Lighthouse)
`label-content-name-mismatch` prüfen:
- Aria-Label des Logo-Links vs. sichtbarer Text
- Entweder beides synchron oder `aria-label` entfernen

### 5.4 `/gruendungsangebot/` `text-slate-400` → `text-slate-600`
Wo AA-Fail → darker.

---

## Phase 6 — SEO-Ergänzungen (nice, aber nicht Blocker)

### 6.1 BreadcrumbList-Schema auf 2 Seiten
- `/farbpsychologie/`
- `/website-check/`

### 6.2 FAQPage-Schema auf 2 Seiten
- `/preise/`
- `/gruendungsangebot/`

---

## Phase 7 — Kommit-Strategie

```bash
# Stage gruppiert (thematisch pro Commit):
git add src/components/Footer.tsx src/components/CookieBanner.tsx \
        src/components/Contact.tsx src/app/website-check/WebsiteCheckForm.tsx
git commit -m "fix(routing): Trailing-Slashes für Legal-Pages konsistent (C3)"

git add src/app/preise/page.tsx src/app/gruendungsangebot/page.tsx \
        src/app/texterstellung/page.tsx src/app/farbpsychologie/
git commit -m "fix(links): Absolute hoeger.dev/#kontakt → relativ (B2/L-04)"

git add src/app/globals.css
git commit -m "fix(a11y): Globale focus-visible-Styles für WCAG 2.4.7 (B4)"

git add src/app/preise/page.tsx  # M-01 React-Key
git commit -m "fix(react): stable key in feature-list (M-01)"

# Phase 2+3 nach Design-Entscheidung:
git commit -m "fix(a11y): Primary-CTA-Kontrast auf WCAG AA (C2)"
git commit -m "fix(a11y): WhatsApp-Button Dark-Brand-Green (C1)"
git commit -m "fix(dark): /gruendungsangebot Dark-Mode nachgezogen (B1)"

# Phase 4:
git commit -m "fix(a11y): FAQ-Accordion aria-expanded/controls (B3)"
git commit -m "fix(perf): AnnouncementBanner ohne CLS (B5)"
git commit -m "refactor(nav): Header-Links auf next/link (M-04)"

# Phase 5:
git commit -m "chore(style): Dead-Code in fp.css entfernt (L-01/02/03, M-03)"
git commit -m "refactor(seo): siteConfig.url/siteUrl dedupliziert (M-02)"

# Phase 6:
git commit -m "feat(seo): BreadcrumbList + FAQPage Schemas"

# Final:
git push origin main
```

---

## Phase 8 — Post-Deploy Verifikation

- [ ] Lighthouse Re-Run: Scores > 0.9 auf 5 Key-Pages
- [ ] Rich Results Test gegen Live (alle JSON-LDs grün)
- [ ] Kontaktformular + Website-Check-Formular real absenden (Brevo-Empfang verifizieren)
- [ ] Cookie-Banner Opt-Out testen (kein `_fbp` vor Consent)
- [ ] Cross-Device: Desktop (>1440), Laptop (1366), iPhone (390)
- [ ] Screen-Reader-Test: VoiceOver (macOS) Tab durch Startseite
- [ ] Keyboard-only Tab-Walk: alle CTAs erreichbar, focus-visible sichtbar
- [ ] Dark-Mode-Toggle: alle Seiten OK

---

## Geschätzter Aufwand

| Phase | Aufwand | Blocker |
|---|---|---|
| 1 Quick-Wins | 15 Min | — |
| 2 Kontrast-Entscheidung | 30 Min + Design-Call | externes Review |
| 3 Dark-Mode | 5 oder 90 Min | Entscheidung |
| 4 A11y-Rutsch | 40 Min | — |
| 5 Cleanup | 20 Min | — |
| 6 SEO-Schemas | 30 Min | — |
| 7 Commits | 10 Min | — |
| 8 Verifikation | 45 Min | — |
| **Gesamt (mit Dark-Mode nachziehen)** | **~4h** | |
| **Gesamt (mit Dark-Mode Opt-out)** | **~2.5h** | |

Fenster morgen: 09:00-13:00 wäre solide, Deploy mittags.
