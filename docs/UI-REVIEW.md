# UI-Review — hoeger.dev (retroaktiv, 6-Pillar)

**Stand:** 2026-04-20 (Nacht)
**Auditor:** Doc (automatisiert, code-only, kein laufender Dev-Server heute Nacht)
**Baseline:** `docs/REVIEW-INTERNAL.md` (intern) + 6-Pillar-Standards + Michaels Feedback-Regeln
**Scope:** `src/` aller Haupt-Routen (`/`, `/preise`, `/gruendungsangebot`, `/website-check`, `/farbpsychologie`, `/webdesign-limburg`, `/texterstellung`, `/blog`, `/impressum`, `/agb`, `/datenschutz`, `/not-found`)
**Ausserhalb Scope:** C1/C2/C3 aus internem Review (bereits bekannt). Dieses Review sucht, was übersehen wurde.

---

## Pillar-Scoring (0-10)

| Pillar | Score | One-Liner |
|--------|-------|-----------|
| 1. Visual Hierarchy | 7/10 | Klar & editorial, aber /gruendungsangebot + /texterstellung weichen komplett vom Grid-System ab |
| 2. Consistency | **4/10** | Zwei parallele Design-Sprachen (Token-basiert vs. Tailwind-Hardcode) — CI-Drift in Gründungsseiten |
| 3. Accessibility (A11y) | **4/10** | Fehlende focus-visible, FAQ ohne aria-expanded, Countdown ohne live-region, Placeholder-Kontrast, /gruendungsangebot ohne dark-mode |
| 4. Readability | **5/10** | Viele 9-12px Micro-Texte, `text-[12.5px]` als Tailwind-Arbitrary |
| 5. Emotional Resonance | 8/10 | /farbpsychologie ist ein Juwel; Haupt-Stack warm & persönlich; Gründungsseite knallig-hart |
| 6. Technical Polish | **5/10** | Hardcoded Produktions-URLs in internen Links, SSR/CSR Mismatch im Countdown, Content-Drift (4 vs. 5 Plätze) |

**Gesamtscore: 33/60**

Niedriger als erwartet — Kern-Komponenten (Header, Hero, Services, Projects, About, Contact, Footer, Faq) sind sauber und konsistent (~7-8/10). Die Abwertung kommt überwiegend aus drei Landingpages (`/preise`, `/gruendungsangebot`, `/texterstellung`), die als parallele Design-Sprachen entstanden sind und vom Token-System abweichen.

---

## Findings-Matrix

### BLOCK — muss vor Live-Freigabe fix (zusätzlich zu C1/C2/C3)

#### B1. `/gruendungsangebot/` hat ZERO Dark-Mode-Support
- **Ort:** `src/app/gruendungsangebot/page.tsx` (gesamte Datei, Zeilen 152-357)
- **Evidenz:** `grep -c "dark:" src/app/gruendungsangebot/page.tsx` → **0 Treffer**. Zum Vergleich: `/preise` = 34, `/texterstellung` = 36.
- **Problem:** Hero ist `from-slate-900 to-slate-800` — hart codiert statt `bg-card`/CI-Tokens. Trust-Bar `bg-white`, Pakete `bg-white`, Features `text-slate-700`, CTA-Footer wieder `slate-900`. Im Dark-Mode (Theme-Toggle): weisse Kacheln auf dunklem Body, `text-slate-700` (fast-schwarz) auf weissem Grund — eigentlich OK — ABER die Sticky-Bar am unteren Rand und Hero sind immer dunkel, die Abschnitte dazwischen sind immer hell. Das wirkt im Dark-Mode wie ein Bug, nicht wie Design.
- **Feedback-Regel:** Verletzt CI-Token-System aus `globals.css`. Widerspricht `feedback_distinct_design.md` (außergewöhnlich, nicht inkonsistent).
- **Severity:** BLOCK — Landingpage mit 50% Discount-Claim, die in Dark-Mode zerfällt, wirkt unprofessionell und untergräbt Trust.
- **Fix:** Entweder (a) voll token-basiert wie /preise nachziehen (ca. 45 Min), oder (b) expliziten `color-scheme: light;` / `data-theme="light"` Wrapper um `<main>` legen und Dark-Mode für diese eine Seite deaktivieren (5 Min, legitim weil Conversion-Seite).
- **Empfehlung:** (b). Die Seite ist bewusst laut/urgency-getrieben, Dark-Mode-Unterstützung ist hier nicht strategisch — aber dann **muss** das explizit deklariert sein.

#### B2. Hardcoded Produktions-URLs in internen Kontakt-Links
- **Ort:** `src/app/preise/page.tsx:4`, `src/app/gruendungsangebot/page.tsx:5`, `src/app/texterstellung/page.tsx:4`, sowie `gruendungsangebot/page.tsx:336` (Mailto-Link mit hoeger.dev-Prefix)
- **Code:** `const kontaktLink = "https://hoeger.dev/#kontakt";`
- **Problem:** Diese Seiten linken auf die Produktion statt auf `/#kontakt` (relativ). Konsequenzen:
  1. **Lokal/Preview-Build:** Klick führt weg von der Branch/dem Feature, Test schlägt fehl
  2. **Produktion:** Full Page Reload statt Anchor-Scroll → schlechtes UX, unnötiger Network-Request
  3. **Analytics/Umami:** Off-site-Click wird gezählt, verfälscht Engagement-Metriken
  4. **Announcement-Banner:** Nach Klick landen User bei `/` mit eingeblendetem Banner UND Header — der Anker-Offset wird wegen `top-10`-Header falsch berechnet
- **Severity:** BLOCK — funktionaler UX-Bug auf allen drei Haupt-Landingpages.
- **Fix:** `const kontaktLink = "/#kontakt";` — gleiche Wirkung, korrektes Next-Routing.

#### B3. FAQ-Accordion ohne aria-expanded / aria-controls
- **Ort:** `src/components/Faq.tsx:33-46`
- **Evidenz:** `grep "aria-expanded" src/components/Faq.tsx` → leer. Nur Header.tsx hat das Attribut.
- **Problem:** Tastatur- und Screen-Reader-User erfahren nicht, ob ein Panel offen ist. WCAG 4.1.2 (Name, Role, Value) Fail.
- **Feedback-Regel:** Verletzt `feedback_barrierefreiheit.md` (BFSG-Pflicht) und Dogfooding — auf `/website-check/` wird Barrierefreiheit als Leistung beworben.
- **Severity:** BLOCK — glaubwürdigkeitsrelevant, da Michael selbst BFSG-Check anbietet.
- **Fix:**
  ```tsx
  <button
    aria-expanded={isOpen}
    aria-controls={`faq-panel-${i}`}
    onClick={...}
  >
  <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
  ```

#### B4. Keine sichtbaren focus-visible-Styles außer in /farbpsychologie
- **Ort:** Gesamter `src/components/*` + `src/app/*/page.tsx` (außer `/farbpsychologie/fp.css`)
- **Evidenz:** `grep -rn "focus-visible" src/` → 4 Treffer in `fp.css`, NULL im restlichen Code. `grep -rn "focus:ring\|focus:outline" src/` → nur 2 Treffer (beide Form-Inputs).
- **Problem:** Header-Nav-Links, Theme-Toggle, WhatsApp-Button, CTA-Buttons (`btn-brand`), Footer-Links, Social-Icons, Cookie-Banner-Buttons, FAQ-Trigger, Projekt-Karten, Service-Karten — alle verlassen sich auf den Browser-Default-Outline. Durch `rounded-xl`/Glassmorphism ist dieser Default-Outline oft unsichtbar (schneidet an Corner-Radius ab) oder wird durch Focus-Box-Shadow überdeckt.
- **WCAG:** 2.4.7 Focus Visible (AA) — Fail auf fast allen interaktiven Elementen.
- **Feedback-Regel:** `feedback_barrierefreiheit.md` — BFSG Juni 2025 Pflicht.
- **Severity:** BLOCK — Keyboard-Navigation im Kern der Seite nicht nachvollziehbar.
- **Fix:** Globale Utility in `globals.css`:
  ```css
  *:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
    border-radius: inherit;
  }
  .btn-brand:focus-visible {
    outline-color: var(--accent);  /* orange für Kontrast zu teal-BG */
  }
  ```
  Und Browser-Default-Outline NICHT via `outline-none` entfernen (aktuell nur in Inputs, ok).

#### B5. `AnnouncementBanner` verletzt Hydration-Kontrakt (SSR/CSR Mismatch)
- **Ort:** `src/components/AnnouncementBanner.tsx:9-26` und `useAnnouncementVisible` 50-69
- **Problem:** `visible` startet `false`, dann `useEffect` liest `localStorage` und setzt es ggf. auf `true`. Damit rendert der Server immer "nichts", der Client ggf. den Banner. Das ist korrekt gelöst (initial false = kein Mismatch). ABER: Der Header konsumiert `useAnnouncementVisible()` und setzt davon abhängig `top-10` vs. `top-0`. Das heißt: Auf dem ersten Paint ist der Header immer `top-0`, dann springt er `top-10` — sichtbarer Layout-Shift (CLS). Lighthouse-relevant.
- **Severity:** BLOCK — CLS-Impact auf jeder Seite außer den Legal-/Gründungs-Seiten.
- **Fix:** Den Banner-State via `document.documentElement.classList.add('has-banner')` im Inline-Script im `<head>` setzen (analog zum Theme-Detection-Script in `layout.tsx:90-94`), dann CSS-only ansprechen. Kein State-Flicker mehr.

---

### FLAG — vor Launch angehen, kein Hard-Stop

#### F1. Countdown ohne `aria-live` / `role="timer"` + SSR-Hydration-Risiko
- **Ort:** `src/app/gruendungsangebot/Countdown.tsx:21-52`
- **Problem 1:** Die Komponente hat keine Live-Region. Je nach Screen-Reader entweder komplettes Ignorieren ODER jede Sekunde wird neu vorgelesen ("dreizehn Tage, zwölf Stunden, vier Minuten, sechsundfünfzig Sekunden... dreizehn Tage, zwölf Stunden, vier Minuten, fünfundfünfzig Sekunden..."). Beides schlimm.
- **Problem 2:** `useState(getTimeLeft)` — Server und Client berechnen unterschiedliche `Date.now()`. Bei statischem Export (aktueller Build `out/`) ist der Wert beim Page-Render gefroren, dann wird er clientseitig überschrieben. Sichtbarer Timer-Sprung beim Mount.
- **Severity:** FLAG — funktional ok, a11y-problematisch.
- **Fix:**
  ```tsx
  const [t, setT] = useState<ReturnType<typeof getTimeLeft> | null>(null);
  useEffect(() => {
    setT(getTimeLeft());
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!t) return <div className="min-h-[60px]" aria-hidden="true" />; // Skeleton

  return (
    <div role="timer" aria-live="off" aria-label={`Angebot endet in ${t.days} Tagen, ${t.hours} Stunden`}>
      ...
    </div>
  );
  ```
  `aria-live="off"` bewusst, damit nicht gespammt wird. Die aria-label nur bei Mount initialisieren.

#### F2. Content-Drift: "4 vs. 5 Plätze"
- **Ort 1:** `AnnouncementBanner.tsx:35` — "nur 5 Plätze im April"
- **Ort 2:** `gruendungsangebot/page.tsx:184` — "Noch 4 von 5 Plätzen verfügbar"
- **Ort 3:** `gruendungsangebot/page.tsx:345` — "4 Plätze · endet in"
- **Ort 4:** `metadata.description` (Zeile 10): "Nur noch 4 Plätze frei!"
- **Problem:** Globaler Banner sagt 5, Landingpage sagt 4. Urgency-Messaging ist inkonsistent. Klickt ein Besucher auf den Banner und sieht "4", wundert er sich — Trust-Verlust.
- **Feedback-Regel:** `feedback_kundensprache.md` — konsistente Versprechen.
- **Severity:** FLAG — Trust-Impact, aber technisch trivial zu fixen.
- **Fix:** Entweder eine einzige Source of Truth in `siteConfig.gruendungsangebot.platzFrei` (Zahl) oder Banner auf "noch wenige Plätze" umstellen. Ich empfehle: `siteConfig` als Single Source, überall referenzieren. Dann reicht 1 Zahl zu ändern, wenn ein neuer Platz vergeben wird.

#### F3. Placeholder-Kontrast — `text-muted-foreground/60`
- **Ort:** `src/components/Contact.tsx:14`, `src/app/website-check/WebsiteCheckForm.tsx:9`
- **Rechnung:** `--muted-foreground = #64748B` (Slate-500). Mit `/60` opacity auf weissem BG ergibt ca. `rgba(100,116,139,0.6)` → effektive Farbe ≈ `#A3ABB8`. Kontrast zu weiss: **2.14:1**. WCAG 1.4.3 verlangt 4.5:1 für Text, auch für Placeholders wenn sie Felder beschriften (hier tun sie das — "Ihr Name", "ihre@email.de", "Worum geht es?").
- **Dark-Mode:** `--muted-foreground = #94A3B8` auf `#1E293B` Card, `/60` ≈ `rgba(148,163,184,0.6)` → effektiv ≈ `#5E6977` auf dunkel → **2.1:1** gegen Card. Auch Fail.
- **Severity:** FLAG — Placeholders sind nur Hinweis, aber wegen BFSG-Pflicht und Dogfooding-Signal relevant.
- **Fix:** `placeholder:text-muted-foreground/90` oder direkt `placeholder:text-slate-500` — ergibt ca. 4.6:1.

#### F4. Tracking-Pixel vs. Umami geladen, unabhängig vom Consent
- **Ort:** `src/app/layout.tsx:104-108`
- **Code:**
  ```tsx
  <Script
    src="https://analytics.hoeger.dev/script.js"
    data-website-id="6145f8bb-..."
    strategy="afterInteractive"
  />
  ```
- **Problem:** Umami wird direkt geladen, während Meta-Pixel via `<MetaPixel />` consent-gated ist. Umami selbst ist cookie-frei und DSGVO-minimal, ABER: wenn der User "Ablehnen" im Cookie-Banner klickt, zeigt die Seite dennoch einen Analytics-Request im Network-Tab zu `analytics.hoeger.dev/api/send`. Das ist rechtlich **wahrscheinlich OK** (berechtigtes Interesse, keine PII, kein Cookie), aber für einen IT-Beratungs-Freelancer, der DSGVO als USP verkauft, ist ein offen sichtbarer Request nach "Ablehnen" ein angreifbarer Moment.
- **Severity:** FLAG — rechtlich vertretbar, strategisch suboptimal. Dogfooding-relevant.
- **Fix:** Entweder (a) Umami-Doku in Datenschutzerklärung präzise beschreiben (Zweck, Datensparsamkeit, Server-Standort, keine Cookies, keine IPs nach Verarbeitung) — dann ist es sauber. Oder (b) Umami ebenfalls consent-gaten. Empfehlung: (a), weil Umami genau für diesen Use-Case gebaut ist. Datenschutz-Seite prüfen.

#### F5. Tiny-Text-Inflation (9px-12px) auf Landingpages
- **Ort:**
  - `gruendungsangebot/page.tsx`: 11 Stellen mit `text-[11px]`, 2× `text-[12.5px]`, 1× `text-[9px]`, 1× `text-[10px]`, 1× `text-[13px]`
  - `preise/page.tsx`: analog, 6× `text-[11px]`, 3× `text-[12.5px]`, 2× `text-[10px]`
  - `texterstellung/page.tsx`: analog
  - `Logo.tsx:51`: `text-[9px]` ("IT-Beratung & Webdesign")
  - `Countdown.tsx:45`: `text-[9px]` (Tage/Std/Min/Sek Labels)
- **Problem:** 9-12px liegt unter dem WCAG-empfohlenen Minimum für Body-Text (14px/16px). Besonders kritisch:
  - Preis-Disclaimer "einmalig · Endpreis" mit 11px auf grauem Hintergrund
  - Countdown-Labels 9px → unlesbar für ältere Zielgruppe
  - Logo-Untertitel 9px → nur dekorativ, aber wenn Sie ihn lesbar meinen, muss er größer
- **Feedback-Regel:** Widerspricht implizit `feedback_keine_fachbegriffe.md` (zugänglich für KMU-Entscheider, oft 50+).
- **Severity:** FLAG — Readability-Issue ohne Hard-Fail.
- **Fix-Pauschal:** Minimum `text-xs` (12px), idealerweise `text-sm` (14px) für informative Inhalte. `text-[9px]` nur für dekorative Badges (wo der Text nicht der primäre Informationsträger ist).
- **Extra:** `text-[12.5px]` ist ein Code-Smell — halbe Pixel rastern unsauber auf Standard-Displays. Entweder 12 oder 13.

#### F6. Zwei parallele Button-Sprachen
- **Ort:** Global
- **Evidenz:**
  - **Sprache A (Token-basiert):** `.btn-brand` aus `globals.css:144` — verwendet `--gradient-brand` CSS-Variable, hat Dark-Mode-Variante, Glow-Hover. Eingesetzt in: Hero, Header, Contact, About, WebsiteCheckTeaser, Services.
  - **Sprache B (Tailwind-Hardcode):** `bg-gradient-to-r from-teal-600 to-cyan-600 text-white` — dupliziert den Gradient-Effekt, aber mit Tailwind-Klassen-Kette. Eingesetzt in: Gruendungsangebot (6×), Preise (3×), Texterstellung (5×), Announcement-Banner.
- **Problem:** Jede Änderung am Brand-Gradient muss an zwei Stellen erfolgen. `globals.css` hat dark-mode (`--gradient-brand: linear-gradient(135deg, #2DD4BF, #22D3EE)`), die Tailwind-Variante hat das nicht — ergo im Dark-Mode haben Gruendungs-/Preise-Buttons **andere** Brand-Farben als der Header.
- **Feedback-Regel:** CI-Drift, `feedback_distinct_design.md` (Qualität durch Konsistenz).
- **Severity:** FLAG — sichtbarer visueller Bruch zwischen Seiten.
- **Fix:** Alle Tailwind-Gradient-Buttons durch `className="btn-brand ..."` ersetzen. Ca. 14 Fundstellen.

#### F7. `placeholder=` enthält Zielgruppe-Ton-Bruch
- **Ort:** `Contact.tsx:177` — `placeholder="Erzählen Sie mir von Ihrem Projekt..."`
- **Minor:** Drei Punkte im Placeholder sind Typografie-Unfall — besser ein echtes `…` oder komplett weglassen. Kundenbrief-Ton sonst gut.

---

### PASS — Ausdrücklich positiv

- **Hero** ist exemplarisch: Token-basiert, responsive, gute Animationen mit Reduced-Motion, H1 klar, CTA-Primary/Secondary hierarchisch korrekt, fetchPriority auf Hero-Image.
- **Farbpsychologie-Seite** ist ein handwerkliches Highlight — eigene Palette, Fraunces-Serif, Scoped CSS, WCAG-konforme Paletten mit Hex-Callouts, `focus-visible` vorhanden. Genau so wie `feedback_distinct_design.md` es fordert.
- **Legal-Pages** (`.legal-doc` in `globals.css:258`): Charter-Serif, 68ch-max-Width, reduzierter Marketing-Chrome — editorial und vertrauenswürdig.
- **Header Skip-to-content** (Header.tsx:45-50) korrekt implementiert mit `sr-only`/`focus:not-sr-only` — WCAG 2.4.1.
- **prefers-reduced-motion** global in `globals.css:245` und scoped in `fp.css:209` — Vorbildlich.
- **Honeypot** auf beiden Formularen (`_gotcha`) korrekt umgesetzt, Position und `aria-hidden` sauber.
- **Form-Fehler-Handling** mit `role="alert"` und sichtbarem Feedback (Contact.tsx:194, WebsiteCheckForm.tsx:142) — gut.

---

## Top 5 Priority Fixes — nach Impact × Aufwand

| # | Finding | Impact | Aufwand | Empfehlung |
|---|---------|--------|---------|-----------|
| 1 | **B4** focus-visible global | Hoch (BFSG, Keyboard-UX) | 15 Min | Globale Utility in globals.css |
| 2 | **B2** kontaktLink relativ machen | Hoch (UX, Analytics) | 5 Min | 3 Files, 1-Zeilen-Change |
| 3 | **B3** FAQ aria-expanded | Hoch (BFSG, Dogfooding) | 10 Min | 4 Attribute ergänzen |
| 4 | **F2** 4-vs-5-Plätze Drift | Mittel (Trust) | 10 Min | Single Source of Truth in config |
| 5 | **B1** Gründungsangebot Dark-Mode | Mittel (Visual) | 5 Min (Opt-out) / 45 Min (Port) | Opt-out empfohlen |

**Summe Priority-Fixes:** ~45-50 Minuten bei Opt-out-Entscheidung für B1.

---

## Zusätzliche Beobachtungen (nicht scored)

- **`test-results/` und `playwright-report/` im Repo-Root** — sollten in `.gitignore`, um Repo klein zu halten.
- **`out/` commited?** — bei Static Export via GH Actions unnötig, sollte nur CI-Artefakt sein.
- **Favicon-Check nicht möglich ohne laufenden Build** — `public/icon.svg` existiert, Apple-Touch-Icon referenziert — visuelle Prüfung morgen.
- **Umami-Website-ID ist im Source** (`layout.tsx:106`) — das ist OK (öffentlicher Identifier, kein Secret), aber gute Praxis wäre `NEXT_PUBLIC_UMAMI_ID` Env.
- **Alt-Text auf About-Photo** (`About.tsx:40`) ist gut ("Michael Höger bei der Webentwicklung am Schreibtisch in seinem Büro") — präziser als WhatsApp-Alt (vgl. M3 im internen Review).

---

## Merge-Empfehlung morgen

Die drei Critical-Findings des internen Reviews (C1 WhatsApp, C2 Primary-CTA, C3 Slashes) sind unabhängig von den hier gefundenen Issues. Meine Empfehlung:

1. **Erst C3 fixen** (5 Min, trivialer Quick-Win)
2. **Dann B4 + B2 + B3** (zusammen ~30 Min, alle drei sind BFSG-relevant und billig)
3. **Dann C1 + C2** mit externem Review abstimmen (farbpsychologische Entscheidung bei C2)
4. **Dann F2 Content-Drift** (10 Min, bevor Gründungsangebot weiter live ist)
5. **Dann B1/B5/F1/F6** — ein gemeinsamer Cleanup-Commit

Nach Fixes: Lighthouse-Run, Rich-Results-Test, Formular-Durchlauf, manueller Tab-Durchgang mit Tastatur → Go-Live.

**Keine Deploys heute Nacht** (wie von Michael vorgegeben).

---

*Erstellt 2026-04-20 ~23:30 CEST — Doc.*
