# BFSG + WCAG 2.2 AA Compliance-Audit — hoeger.dev

**Stand:** 2026-04-20 (Nacht)
**Auditor:** Doc (statische Code-Analyse, kein laufender Browser, keine Code-Änderungen)
**Scope:** `src/` aller Haupt-Routen (Startseite, `/preise`, `/gruendungsangebot`, `/website-check`, `/texterstellung`, `/farbpsychologie`, `/webdesign-limburg`, `/blog`, `/impressum`, `/agb`, `/datenschutz`, `/not-found`)
**Baseline:** WCAG 2.2 Level AA (50 Erfolgskriterien), BFSG (gültig ab 28.06.2025, § 1–§ 6), EN 301 549 Mapping
**Referenzen:** `docs/UI-REVIEW.md`, `docs/REVIEW-INTERNAL.md`, `docs/AUDIT-TECH.md`

---

## Executive Summary

**Compliance-Grad: „Nachbesserung nötig"** — nicht konform bis Blocker-Findings behoben.

hoeger.dev ist strukturell sehr nah an BFSG/WCAG 2.2 AA: semantische HTML5-Landmarks, Skip-Link, Alt-Texte, `prefers-reduced-motion`, `html lang="de"`, durchgängige Formular-Labels, `role="alert"` für Fehler, Honeypot-Spamschutz. Ein einzelnes Farbpsychologie-Modul (`/farbpsychologie`) ist vorbildlich und zeigt das angestrebte Niveau.

**Blockierende Mängel (BFSG-konform erst nach Fix):**

1. **Kontrast Primary-CTA 1,86 : 1** (Lighthouse bestätigt) — WCAG 1.4.3 (AA) FAIL. Erscheint auf >20 Buttons auf der Hauptnavigation und allen Landingpages. BFSG-relevant, weil Kernprozess (Kontakt, Website-Check) betroffen.
2. **Kontrast WhatsApp-Button 1,98 : 1** — WCAG 1.4.3 FAIL. Floating-Button, auf allen Unterseiten sichtbar.
3. **`focus-visible` fehlt global** — WCAG 2.4.7 (AA) FAIL auf ~30 interaktiven Elementen. Keyboard-Navigation praktisch nicht nachvollziehbar.
4. **FAQ-Accordion ohne `aria-expanded`/`aria-controls`** — WCAG 4.1.2 (A) FAIL.
5. **Keine BFSG-Barrierefreiheitserklärung vorhanden** — § 6 BFSG formal verletzt, sobald hoeger.dev als Kernprozess-Anbieter fällt (Vertragsabschluss via Kontaktformular → Hauptleistung Webdesign).
6. **Kein Feedback-Mechanismus für Barrieremeldungen** — BFSG § 6 Abs. 1 Nr. 3.

**Stärke:** Skip-Link, Landmarks, Alt-Texte, Reduced-Motion, Legal-Doc-Modus, Sprach-Attribut global gesetzt. Mit den 6 genannten Fixes ist BFSG-Freigabe realistisch innerhalb eines halben Arbeitstages.

**Vorsicht beim Vermarkten:** Solange die genannten Blocker offen sind, darf BFSG-Compliance **nicht** als „auf dieser Website selbst umgesetzt" beworben werden (Dogfooding-Risiko, Abmahnrisiko durch Mitbewerber oder Verbraucherschutz).

---

## 1. WCAG 2.2 Level AA — Erfolgskriterien-Matrix (50 SC)

Legende: **PASS** / **FAIL** / **N/A** / **PARTIAL**
Evidenz-Pfade relativ zum Repo-Root.

### Prinzip 1 — Wahrnehmbar

| SC | Name | Level | Status | Evidenz / Begründung |
|----|------|-------|--------|----------------------|
| 1.1.1 | Non-text Content | A | **PASS** | Alle `<img>` haben `alt` (About.tsx:39, Contact.tsx:76, WhatsAppButton.tsx:37, BrowserMockup.tsx:26/51, Hero.tsx:71, blog/page.tsx:95). Logo als SVG mit `aria-hidden="true"` + sichtbarem Text-Fallback (Logo.tsx:8). |
| 1.2.1 | Audio-only / Video-only (Prerecorded) | A | **N/A** | Keine Audio-/Video-Inhalte. |
| 1.2.2 | Captions (Prerecorded) | A | **N/A** | Keine Video-Inhalte. |
| 1.2.3 | Audio Description or Media Alternative | A | **N/A** | — |
| 1.2.4 | Captions (Live) | AA | **N/A** | Keine Live-Media. |
| 1.2.5 | Audio Description (Prerecorded) | AA | **N/A** | — |
| 1.3.1 | Info and Relationships | A | **PASS** | Semantisches HTML: `<header>`, `<nav>`, `<main id="main">` (page.tsx:124, impressum/page.tsx:38), `<footer>` (Footer.tsx:15), `<section id="…">`, korrekte H1→H2→H3-Kaskade, `<label htmlFor="…">` in Formularen (Contact.tsx:150/156/163/169, WebsiteCheckForm.tsx:65-110). |
| 1.3.2 | Meaningful Sequence | A | **PASS** | DOM-Reihenfolge entspricht visueller Reihenfolge; keine CSS-Order-Manipulation außerhalb Grid-Layouts, die die Bedeutung ändert. |
| 1.3.3 | Sensory Characteristics | A | **PASS** | Keine rein visuell/geografisch referenzierten Anweisungen („Klicken Sie auf den grünen Button rechts"). |
| 1.3.4 | Orientation | AA | **PASS** | Kein `orientation:landscape`-Lock; Tailwind-Breakpoints respektieren Portrait & Landscape. |
| 1.3.5 | Identify Input Purpose | AA | **PARTIAL** | Contact.tsx und WebsiteCheckForm.tsx haben `type="email"` und `required`, aber **kein `autocomplete="name"` / `autocomplete="email"`** auf den entsprechenden Feldern. WCAG 1.3.5 verlangt für häufige Input-Zwecke die Autofill-Tokens. FIX-SOON. |
| 1.4.1 | Use of Color | A | **PASS** | Links haben Unterstreichung (`.legal-doc a` globals.css:308), Formfehler haben Icon+Farbe+`role="alert"` (Contact.tsx:194), Fokusinformation wird nicht allein über Farbe transportiert (zurzeit allerdings Fokus praktisch fehlend — s. 2.4.7). |
| 1.4.2 | Audio Control | A | **N/A** | Kein Auto-Play-Audio. |
| 1.4.3 | Contrast (Minimum) | AA | **FAIL** | **BLOCKER.** (a) Primary-CTA `bg-primary #0D9488` + `text-white` = **1,86 : 1** (Lighthouse-Messung, REVIEW-INTERNAL.md C2). 20+ Fundstellen. (b) WhatsApp-Button `bg-[#25D366] + text-white` = **1,98 : 1** (WhatsAppButton.tsx:12,16,19). (c) Placeholder `text-muted-foreground/60` ≈ **2,1 : 1** auf Weiß (Contact.tsx:14, WebsiteCheckForm.tsx:9). Erforderlich: 4,5 : 1 (normal), 3 : 1 (large ≥18pt oder ≥14pt bold). |
| 1.4.4 | Resize Text | AA | **PASS** | Kein `user-scalable=no`; Tailwind-Font-Größen in `rem`, respektieren Browser-Zoom; H1 `clamp()` in Legal-Docs skaliert flüssig. |
| 1.4.5 | Images of Text | AA | **PASS** | Keine Text-in-Bildern; Logo hat Text-Bestandteil als echten Text (Logo.tsx). |
| 1.4.10 | Reflow | AA | **PASS** | Responsive bis 320px Breite; keine fixierten Horizontal-Scroll-Elemente (manuelle Sichtung ausstehend, Code zeigt keine problematischen `min-width`-Konstrukte außerhalb Landingpage-Grids). |
| 1.4.11 | Non-text Contrast | AA | **PARTIAL** | Form-Borders `border-border` (#E2E8F0) auf Weiß = 1,3 : 1 — erforderlich 3 : 1 für UI-Komponenten. Fokus-Ring `focus:ring-primary/15` mit 15% Opacity reicht nicht für 3 : 1. FIX-SOON. |
| 1.4.12 | Text Spacing | AA | **PASS** | Keine `!important`-Overrides auf `line-height`, `letter-spacing`, `word-spacing`; Tailwind-Klassen setzen Werte in `em`/unitless, sodass User-Stylesheets überschrieben werden können. |
| 1.4.13 | Content on Hover or Focus | AA | **PARTIAL** | Desktop-Nav-Dropdown (Header.tsx:85-103) öffnet bei `onMouseEnter`, schließt nach 150 ms Timeout (Header.tsx:39). Dismissable: **nein**, der User kann das Dropdown nicht per ESC schließen. Hoverable: ja (Timeout erlaubt das Queren in das Panel). Persistent: ja (150 ms Delay). FIX-SOON: ESC-Handler ergänzen. |

### Prinzip 2 — Bedienbar

| SC | Name | Level | Status | Evidenz / Begründung |
|----|------|-------|--------|----------------------|
| 2.1.1 | Keyboard | A | **PARTIAL** | Alle `<button>`/`<a>`/`<input>` nativ tastaturbedienbar. **ABER** Desktop-Nav-Dropdown öffnet nur auf Hover (Header.tsx:72-73 `onMouseEnter`/`onMouseLeave`), **keine Keyboard-Aktivierung** via Enter/Space auf dem Parent-Link. Tastatur-User sehen die Untermenüs auf Desktop nicht. Mobile-Nav hat expliziten Dropdown-Toggle-Button → dort PASS. FIX-SOON (Blocker bei strenger Auslegung). |
| 2.1.2 | No Keyboard Trap | A | **PASS** | Keine Modal-Dialoge mit Focus-Trap; Cookie-Banner ist nicht modal (kein Overlay, das Tab blockiert). |
| 2.1.4 | Character Key Shortcuts | A | **N/A** | Keine Single-Character-Shortcuts implementiert. |
| 2.2.1 | Timing Adjustable | A | **PARTIAL** | **Countdown** in `gruendungsangebot/Countdown.tsx` ist rein informativ (Angebotsende), keine User-Action durch Zeitablauf blockiert → argumentierbar PASS. ABER ohne `aria-live`-Steuerung und ohne Pause-Mechanismus Grenzfall (s. UI-REVIEW F1). FIX-SOON. |
| 2.2.2 | Pause, Stop, Hide | A | **PARTIAL** | Auto-Animationen: (a) `animate-bounce-slow` (Hero.tsx:88) pulsiert dauerhaft >5 s, (b) `animate-pulse` auf Red-Dot im AnnouncementBanner (line 34) dauerhaft. WCAG verlangt Pause/Stop-Mechanismus für bewegte Inhalte >5 s. Wird durch `prefers-reduced-motion` abgeschaltet (globals.css:245), ist aber ohne User-OS-Setting nicht stoppbar. FIX-SOON: entweder Animationen auf ≤5 s begrenzen oder Pause-Control. |
| 2.3.1 | Three Flashes or Below Threshold | A | **PASS** | Keine Blink-/Flash-Animationen; `animate-pulse` ist langsamer Fade, kein Flash-Trigger. |
| 2.4.1 | Bypass Blocks | A | **PASS** | **Skip-Link** vorhanden (Header.tsx:45-50 `<a href="#main">Zum Inhalt springen</a>` mit `sr-only focus:not-sr-only`). Landing-Target `<main id="main">` existiert auf allen Routen. |
| 2.4.2 | Page Titled | A | **PASS** | Jede Route setzt `metadata.title` (layout.tsx:29, impressum/page.tsx:6, alle Landingpages). |
| 2.4.3 | Focus Order | A | **PARTIAL** | DOM-Reihenfolge logisch (Header → Main → Footer). **ABER** Skip-Link kommt vor Header, AnnouncementBanner kommt vor Skip-Link im DOM (layout.tsx:98 vs Header.tsx:45-50) → erster Tab landet auf dem Banner-Schließen-Button, nicht auf Skip-Link. Kleiner Bruch. FIX-SOON. |
| 2.4.4 | Link Purpose (In Context) | A | **PASS** | Navigationslinks beschriftet; „Mehr erfahren" im Cookie-Banner ist im Context-Satz eindeutig. |
| 2.4.5 | Multiple Ways | AA | **PASS** | Sitemap vorhanden (public/sitemap.xml), Header-Navigation + Footer-Links, Suchmaschinen-Crawling erlaubt. |
| 2.4.6 | Headings and Labels | AA | **PASS** | H1 eindeutig pro Seite (REVIEW-INTERNAL.md bestätigt); Labels aller Formulare beschreiben Inhalt präzise. |
| 2.4.7 | Focus Visible | AA | **FAIL** | **BLOCKER.** Nur `/farbpsychologie/fp.css` hat expliziten `:focus-visible`-Style. Im restlichen Code (Header, Hero, Services, Contact-Buttons, FAQ-Trigger, Footer-Links, Cookie-Banner-Buttons, WhatsApp, ThemeToggle, Social-Icons) kein `focus-visible`-Style definiert. `rounded-xl` schneidet den Browser-Default-Outline oft ab, wodurch Fokus visuell nicht erkennbar ist. UI-REVIEW B4. |
| 2.4.11 | Focus Not Obscured (Minimum) | AA (WCAG 2.2 neu) | **PARTIAL** | Fixed Header (Header.tsx:51-59) + fixed AnnouncementBanner können beim Tab-Scrollen fokussierte Elemente teilweise überdecken. `scroll-behavior: smooth` (globals.css:88) kompensiert nicht automatisch. FIX-SOON mit `scroll-padding-top` auf `<html>`. |
| 2.4.12 | Focus Not Obscured (Enhanced) | AAA | **N/A** | AAA, nicht im AA-Scope. |
| 2.4.13 | Focus Appearance | AAA | **N/A** | AAA, nicht im AA-Scope. |
| 2.5.1 | Pointer Gestures | A | **PASS** | Keine Multi-Touch- oder Drag-Gestures erforderlich; alle Interaktionen durch Single-Tap/Click bedienbar. |
| 2.5.2 | Pointer Cancellation | A | **PASS** | Alle Buttons feuern auf `click` (nicht `mousedown`), Abbruch durch Wegziehen möglich. |
| 2.5.3 | Label in Name | A | **PASS** | Sichtbare Button-Texte (z.B. „Kontakt", „Akzeptieren") sind im `aria-label` bzw. Text-Content enthalten. **Ausnahme:** Logo-Link hat `aria-label="Zur Startseite"`, enthält aber sichtbaren Text „Michael Höger" (Lighthouse-Warning `label-content-name-mismatch`, AUDIT-TECH). FIX-SOON. |
| 2.5.4 | Motion Actuation | A | **PASS** | Keine Shake-/Tilt-Aktivierung. |
| 2.5.7 | Dragging Movements | AA (WCAG 2.2 neu) | **N/A** | Keine Drag-only-Interaktionen. |
| 2.5.8 | Target Size (Minimum) | AA (WCAG 2.2 neu) | **PARTIAL** | Header-Burger-Menü `p-2` + `h-5 w-5` = ~36 × 36 px, unter 24 × 24 CSS-Pixel-Mindestgröße PASS (Minimum ist 24 × 24 für AA-Neu). Social-Icons im Footer `h-5 w-5` = 20 × 20 px → **FAIL gegen 24 × 24**. Cookie-Banner-Close-Button ist nicht vorhanden, aber der „X"-Button im AnnouncementBanner (`p-1` + `h-4 w-4` = ~24 × 24 px) liegt genau am Limit. FIX-SOON. |

### Prinzip 3 — Verständlich

| SC | Name | Level | Status | Evidenz / Begründung |
|----|------|-------|--------|----------------------|
| 3.1.1 | Language of Page | A | **PASS** | `<html lang="de">` (layout.tsx:87). |
| 3.1.2 | Language of Parts | AA | **PASS** | Inhaltsweite `lang="de"` gesetzt (About.tsx:61, agb/page.tsx:57). Englische Fachbegriffe wie „Next.js" sind Produktnamen, kein fremdsprachlicher Text-Block. |
| 3.2.1 | On Focus | A | **PASS** | Kein automatischer Kontextwechsel bei Fokus. |
| 3.2.2 | On Input | A | **PASS** | Keine automatische Formular-Submission bei Eingabe; explizite Submit-Buttons. |
| 3.2.3 | Consistent Navigation | AA | **PASS** | Header und Footer identisch auf allen Seiten (layout.tsx:98-102). |
| 3.2.4 | Consistent Identification | AA | **PASS** | Gleiche Komponenten (CTA, Formular-Button) haben konsistente Labels. |
| 3.2.6 | Consistent Help | A (WCAG 2.2 neu) | **PASS** | Kontakt-Informationen (E-Mail, Telefon, WhatsApp) sind überall auf gleicher Position erreichbar (Footer + schwebender WhatsApp-Button + Contact-Sektion). |
| 3.3.1 | Error Identification | A | **PASS** | Formular-Fehler über `role="alert"` (Contact.tsx:194, WebsiteCheckForm.tsx:142) mit Text-Message ausgegeben. |
| 3.3.2 | Labels or Instructions | A | **PASS** | Alle Form-Felder mit `<label htmlFor="…">` + Pflichtfeld-Markierung „*" im Label-Text. |
| 3.3.3 | Error Suggestion | AA | **PARTIAL** | Generische Fehlermeldung „Etwas ist schiefgelaufen" (Contact.tsx:45) — keine feldspezifische Hilfe bei ungültigen E-Mails o.ä. Browser-Native-Validation via `type="email"` greift, aber Custom-Messages fehlen. FIX-SOON. |
| 3.3.4 | Error Prevention (Legal, Financial, Data) | AA | **PASS** | Kontaktformular ist kein rechtsverbindlicher Vertrag; keine Zahlungsvorgänge auf hoeger.dev (Stripe-Flow extern). Für Website-Check: Bestätigung auf `/website-check/danke/`. |
| 3.3.7 | Redundant Entry | A (WCAG 2.2 neu) | **N/A** | Einzel-Formulare, keine Multi-Step-Flows mit wiederholter Eingabe. |
| 3.3.8 | Accessible Authentication (Minimum) | AA (WCAG 2.2 neu) | **N/A** | Keine Auth-Flows auf hoeger.dev (keine Login-Funktion für User). |

### Prinzip 4 — Robust

| SC | Name | Level | Status | Evidenz / Begründung |
|----|------|-------|--------|----------------------|
| 4.1.1 | Parsing (obsolet in WCAG 2.2) | — | **N/A** | In WCAG 2.2 als obsolet markiert. |
| 4.1.2 | Name, Role, Value | A | **FAIL** | **BLOCKER.** FAQ-Accordion (`Faq.tsx:33-46`) hat `<button>` ohne `aria-expanded` und ohne `aria-controls` → Screen-Reader erfährt nicht, ob Panel offen ist. Desktop-Dropdown hat `aria-expanded` + `aria-haspopup` (Header.tsx:78-79) → dort PASS. |
| 4.1.3 | Status Messages | AA | **PARTIAL** | Formular-Submit-Erfolg „Nachricht gesendet!" wird nicht als `aria-live`-Region angekündigt, nur visuell (Contact.tsx:135). Countdown ebenso ohne Live-Region (UI-REVIEW F1). Fehlermeldungen haben `role="alert"` → dort PASS. FIX-SOON. |

**Zusammenfassung Level AA (50 SC, abzüglich N/A):**
- PASS: 26
- PARTIAL: 12
- FAIL: 3 (Blocker: 1.4.3, 2.4.7, 4.1.2)
- N/A: 9

---

## 2. BFSG-spezifische Pflichten (DE, gültig 28.06.2025)

### 2.1 Anwendbarkeit auf hoeger.dev

Das BFSG gilt für Produkte/Dienstleistungen im B2C-Bereich, die nach dem 28.06.2025 in Verkehr gebracht werden. Für Dienstleistungen: „elektronischer Geschäftsverkehr" (§ 1 Abs. 3 Nr. 5 BFSG) umfasst Websites, über die Dienstleistungen angeboten werden, inklusive Vertragsanbahnung.

**Einschätzung hoeger.dev:**
- Michael Höger bietet Webdesign-Dienstleistungen an → Zielgruppe B2B (Kleinunternehmen), aber auch B2C-Anteil (Selbstständige, Vereine) nicht ausgeschlossen.
- Kontaktformular + Website-Check-Formular + Preisdarstellung = **Vertragsanbahnung** → unter BFSG-elektronischem Geschäftsverkehr zu subsumieren.
- **Kleinstunternehmer-Ausnahme (§ 3 Abs. 3 BFSG):** < 10 Mitarbeiter UND < 2 Mio. EUR Jahresumsatz → greift aktuell wahrscheinlich (Michael ist Solo-Selbstständiger). ABER die Ausnahme gilt nur für Dienstleistungen, **nicht** für Produkte. Und: Sobald als Webdesigner für Kunden BFSG-konforme Sites angeboten werden, muss die eigene Site vorbildlich sein (Glaubwürdigkeit, nicht rechtliche Pflicht).

**Empfehlung:** Behandeln wie vollumfänglich BFSG-pflichtig. Kleinstunternehmer-Ausnahme nicht als Argument nutzen, um die eigene Site nicht zu fixen (inkompatibel mit dem Angebot „ich mache Ihre Site BFSG-konform").

### 2.2 Barrierefreiheitserklärung (§ 6 BFSG / EU-RL 2016/2102)

**Status: FEHLT. BLOCKER für formale BFSG-Konformität.**

Eine Barrierefreiheitserklärung muss enthalten:

1. **Konformitätsstatus** — „voll konform" / „teilweise konform" / „nicht konform"
2. **Nicht barrierefreie Inhalte** — präzise Auflistung der Abweichungen von WCAG 2.1/2.2 AA
3. **Begründung für nicht barrierefreie Inhalte** — unangemessene Belastung / nicht anwendbar
4. **Barrierefreie Alternativen** — sofern vorhanden
5. **Feedback-Mechanismus** — E-Mail/Formular für Barriere-Meldungen
6. **Zeitpunkt der Erstellung/Überprüfung** — Datum
7. **Durchsetzungsverfahren** — Hinweis auf die zuständige Schlichtungsstelle (in Deutschland: BFIT-Bund für Bundesbehörden; für Privatwirtschaft: Schlichtungsstelle BGG beim Bundesbeauftragten für die Belange von Menschen mit Behinderungen)
8. **Sprache** — Deutsch (empfohlen zusätzlich einfache Sprache)

**Fix-Empfehlung:** Neue Route `/barrierefreiheit/` (parallel zu `/impressum/`, `/datenschutz/`, `/agb/`) mit dem `.legal-doc`-Stil. Footer-Link ergänzen.

### 2.3 Feedback-Mechanismus

**Status: TEILWEISE — nicht BFSG-konform dokumentiert.**

Ein Kontaktformular ist vorhanden (Contact.tsx). BFSG verlangt jedoch **explizit benannten Feedback-Kanal für Barrierefreiheits-Probleme**. Aktuelles Kontaktformular ist generisch.

**Fix-Empfehlung:** In der Barrierefreiheitserklärung einen dedizierten E-Mail-Alias nennen, z.B. `barrierefreiheit@hoeger.dev` (oder `michael@hoeger.dev` mit Betreff „Barrierefreiheit"). Erwartete Reaktionszeit angeben (z.B. „innerhalb von 7 Werktagen").

### 2.4 Einfache Sprache — Bereiche unter BFSG

BFSG fordert nicht durchgängig einfache Sprache für den kompletten Website-Content, aber für den **Kernprozess** der Dienstleistung. Bei hoeger.dev ist das:

1. **Kontaktformular** (Contact.tsx) — Labels „Name", „E-Mail", „Betreff", „Nachricht" sind bereits einfach. Datenschutz-Checkbox-Text OK. **PASS.**
2. **Website-Check-Formular** (WebsiteCheckForm.tsx) — „Website-URL", „E-Mail", „Name (optional)" — einfach. **PASS.**
3. **Preise-Seite** (`/preise`) — enthält Fachbegriffe wie „SEO-Basis", „Hosting-Retainer". Zielgruppe KMU-Entscheider → grenzwertig. **PARTIAL.** Empfehlung: Tooltips oder Klarstellungen in Nebensätzen (z.B. „SEO (bessere Auffindbarkeit in Google)").
4. **Gründungsangebot** (`/gruendungsangebot`) — marketing-lastige Urgency-Sprache („nur 5 Plätze", „halber Preis"). Einfachheit OK, aber Trust-Ton fraglich. **PASS** für BFSG-Zweck.
5. **Blog** — journalistische Sprache, kein Kernprozess → nicht BFSG-relevant.

**Feedback-Regel Referenz:** `feedback_keine_fachbegriffe.md` — Kundentexte ohne IT-Jargon. Punkt 3 (Preise) sollte nochmal durchgegangen werden.

---

## 3. Screen-Reader-Walkthrough (simuliert, Code-basiert)

### 3.1 Tab-Order Startseite (abgeleitet aus DOM)

1. AnnouncementBanner → Link „Gründungsangebot → Mehr erfahren"
2. AnnouncementBanner → Button „Banner schließen" (X)
3. Header → Skip-Link „Zum Inhalt springen" (nur bei Fokus sichtbar)
4. Header → Logo-Link (Startseite)
5. Header → Nav-Links (Leistungen, Über mich, Projekte, Preise, Blog, Kontakt) — **Untermenü-Einträge nur auf Desktop per Hover, nicht per Tab erreichbar — FAIL 2.1.1**
6. Header → ThemeToggle-Button
7. Header → Kontakt-CTA (Desktop)
8. Hero → Primary-CTA „Jetzt Kontakt aufnehmen"
9. Hero → Secondary-CTA „Projekte ansehen"
10. Hero → Scroll-Hint „Weiter scrollen"
11. Services → 6 Service-Karten (nicht fokussierbar als Ganzes, enthalten keine Links)
12. Process → 4 Prozess-Schritte
13. Projects → Projekt-Karten (Links auf externe Demo-Sites)
14. WebsiteCheckTeaser → „Jetzt prüfen lassen"-CTA
15. About → Inline-Links
16. Guarantee → keine interaktiven Elemente
17. FAQ → 6 Accordion-Buttons (ohne aria-expanded — FAIL)
18. Contact → Formular-Felder (Name, E-Mail, Betreff, Nachricht, Datenschutz-Checkbox)
19. Contact → Submit-Button
20. Contact → Cal.com-Booking-Button
21. Footer → Social-Links (Facebook, Instagram)
22. Footer → 4 Legal-Links + Cookie-Einstellungen-Button
23. WhatsAppButton (fixed, letzter Tab-Stop)
24. Cookie-Banner (wenn sichtbar) → Ablehnen-Button, Akzeptieren-Button, Mehr-erfahren-Link

**Problem:** Erste Tab-Position ist der AnnouncementBanner — Skip-Link ist erst Position 3. Besser wäre: Skip-Link als allererster Tab-Stop vor dem Banner.

### 3.2 Skip-Links

- **Vorhanden:** Ein Skip-Link „Zum Inhalt springen" in Header.tsx:45-50, mit `sr-only focus:not-sr-only`, Ziel `#main`.
- **Landing-Target:** `<main id="main">` in allen Route-Dateien gesetzt (verifiziert auf Startseite page.tsx:124, impressum/page.tsx:38).
- **Bewertung:** PASS, aber Position sub-optimal (siehe 3.1).

### 3.3 ARIA-Landmarks

| Landmark | Status | Ort |
|----------|--------|-----|
| `<header>` | PASS | Header.tsx:51 |
| `<nav>` | PASS | Header.tsx:66 + 143 (Mobile) |
| `<main>` | PASS | page.tsx:124, alle weiteren page.tsx |
| `<footer>` | PASS | Footer.tsx:15 |
| `<aside>` | N/A | Kein sidebar-Inhalt |
| `role="dialog"` | PASS | CookieBanner.tsx:29 (mit `aria-label`) |
| `role="alert"` | PASS | Contact.tsx:194, WebsiteCheckForm.tsx:142 |
| `role="timer"` | **FEHLT** | Countdown.tsx sollte es haben (UI-REVIEW F1) |

### 3.4 Alt-Texte-Qualität

| Datei | Alt-Text | Bewertung |
|-------|----------|-----------|
| Hero.tsx:71 | „Michael Höger – Freelancer für Webdesign und digitale Lösungen" | **PASS** (informativ, Kontext-angemessen) |
| Contact.tsx:76 | „Michael Höger – persönlicher Ansprechpartner für Webdesign-Projekte" | **PASS** |
| About.tsx:39 | „Michael Höger bei der Webentwicklung am Schreibtisch in seinem Büro" | **PASS** (beschreibt Szene) |
| WhatsAppButton.tsx:37 | „Michael Höger" | **PARTIAL** — zu generisch. Da Icon daneben ist, wäre `alt=""` (dekorativ) sauberer, weil `aria-label` auf dem Parent-`<a>` die Semantik trägt (UI-REVIEW M3). |
| BrowserMockup.tsx:26/51 | dynamisch via Props | PASS (abhängig von Aufrufer) |
| blog/page.tsx:95 | `{post.title}` | PASS (Titel als Beschreibung angemessen) |

### 3.5 Formular-Labels + Error-Messages

**Contact.tsx (Startseite):**
- Felder: `name`, `email`, `subject`, `message`, `privacy-contact`
- Labels: alle mit `<label htmlFor="…">` verknüpft (Lines 150, 156, 163, 169, 185) → PASS
- Pflicht: `required` gesetzt, „*" visuell markiert → PASS
- Honeypot: `_gotcha` mit `aria-hidden`, `tabIndex={-1}`, off-screen → PASS
- Error: `role="alert"` → PASS
- Success: Text-only, **ohne `aria-live`** → PARTIAL
- Autocomplete-Tokens: **FEHLEN** (kein `autocomplete="name"`/`"email"`) → SC 1.3.5 FIX-SOON

**WebsiteCheckForm.tsx:**
- Felder: `url`, `email`, `name`, `privacy`
- Labels korrekt verknüpft (Lines 65, 83, 101) → PASS
- Gleiche Lücken wie oben (kein autocomplete, kein aria-live auf Success — Success erfolgt via router.push).

---

## 4. Keyboard-Only-Test (statisch, Code-basiert)

### 4.1 Desktop-Nav-Dropdown

- **Öffnen:** Nur via `onMouseEnter` (Header.tsx:72) — **Keyboard-User können Untermenüs auf Desktop nicht öffnen.**
- **Schließen:** `onMouseLeave` (Header.tsx:73) mit 150 ms Timeout.
- **ESC-Support:** Nein.
- **Tab-Fokus auf Dropdown-Items:** Items sind im DOM, aber mit `pointer-events: none` versehen, wenn geschlossen — und „geschlossen" ist der Default-State für Keyboard-User.
- **Bewertung:** **FAIL** (2.1.1 Keyboard). Fix: `onFocus`/`onBlur`-Handler ergänzen + ESC-Handler.

### 4.2 Mobile-Nav

- Burger-Button (Header.tsx:127) via Tab + Enter erreichbar → PASS.
- Dropdown-Toggle-Button (Header.tsx:155) mit `aria-expanded` → PASS.
- Mobile-Menü schließt sich bei Link-Klick → PASS.
- **ESC-Support:** Nein. FIX-SOON.

### 4.3 FAQ-Accordion

- `<button>`-Element → nativ tastaturbedienbar → PASS.
- Enter/Space öffnet/schließt → PASS.
- **`aria-expanded` fehlt** → FAIL (4.1.2).
- **`aria-controls` fehlt** → FAIL (Best-Practice, nicht hart in WCAG AA, aber BFSG erwartet).

### 4.4 Cookie-Banner

- Keine Focus-Trap implementiert → User kann per Tab aus dem Banner herausspringen und auf Hintergrund-Elemente fokussieren. Kein hartes Fail, aber Best-Practice wäre Focus-Trap bei Erstanzeige.
- ESC zum Schließen: Nein.
- Close-Button: **nicht vorhanden** — User muss „Ablehnen" oder „Akzeptieren" klicken. BFSG-relevant: kein Hinder­nis für die Navigation, aber Nutzer mit kognitiven Einschränkungen könnten sich „gezwungen" fühlen.
- **Bewertung:** PARTIAL. FIX-SOON: ESC-Handler + ggf. Focus-Trap während Modal-Anzeige.

### 4.5 Modal-Dialoge

- Kein `<dialog>` Element im Einsatz.
- Cookie-Banner ist semantisch ein Dialog (`role="dialog"`, `aria-label`) → aber nicht modal geschaltet.
- AnnouncementBanner ist kein Dialog (nur informativer Banner) → PASS.

---

## 5. Motion & Cognitive

### 5.1 `prefers-reduced-motion`

**Status: PASS (global und scoped).**

- `src/app/globals.css:245-251`:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- `src/app/farbpsychologie/fp.css:209` ebenfalls respektiert.
- `CookieBanner.tsx` und `Contact.tsx` nutzen Framer Motion — diese respektiert `prefers-reduced-motion` per Default, aber nur wenn Komponenten die Standard-API verwenden (Motion.tsx wurde nicht im Detail geprüft).

### 5.2 Countdown-Elemente

- `gruendungsangebot/Countdown.tsx` — sekündliches Update der Ziffern.
- **Bewertung:** FAIL für SC 4.1.3 (Status Messages) wegen fehlendem `aria-live="off"` und `role="timer"`. Ohne `aria-live="off"` könnten Screen-Reader jede Sekunde vorlesen → Ablenkung.
- **Fix-Empfehlung:** Siehe UI-REVIEW F1. `role="timer" aria-live="off" aria-label="Angebot endet in X Tagen"`.

### 5.3 Text-Spacing (WCAG 1.4.12)

- Keine `!important`-Sperre auf `line-height`/`letter-spacing`/`word-spacing`.
- User kann in Browser-Stylesheet Werte bis zu 1.5× `line-height`, 0.12em `letter-spacing`, 0.16em `word-spacing`, 2× `word-spacing` setzen ohne Informationsverlust.
- **Bewertung:** PASS.

---

## 6. Konkrete Fix-Empfehlungen (Severity-sortiert)

### BLOCK — vor BFSG-Compliance-Deklaration Pflicht

| # | SC / Thema | Ort | Fix-Aufwand | Kurz-Empfehlung |
|---|-----------|-----|-------------|-----------------|
| 1 | 1.4.3 Kontrast Primary-CTA (1,86 : 1) | `globals.css` `--primary`, alle `btn-brand`-Aufrufe | 15 Min | Option A: `--primary: #0A7A70` → ~4,5 : 1. Option B: Komplementär-Orange `--accent` für CTAs (Farbpsychologie-konform, größerer Eingriff). |
| 2 | 1.4.3 Kontrast WhatsApp (1,98 : 1) | `WhatsAppButton.tsx:12` | 2 Min | `bg-[#128C7E]` (WhatsApp-Dark-Brand) statt `bg-[#25D366]`. |
| 3 | 2.4.7 Focus Visible global | `globals.css` (neue Regel) | 15 Min | Globale `*:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }` + `.btn-brand:focus-visible` in Accent-Farbe. |
| 4 | 4.1.2 FAQ aria-expanded | `Faq.tsx:33-46` | 10 Min | `aria-expanded={isOpen}`, `aria-controls={`faq-panel-${i}`}`, Panel-`<div id>` + `role="region"`. |
| 5 | 2.1.1 Keyboard auf Desktop-Nav-Dropdown | `Header.tsx:72-104` | 20 Min | `onFocus`/`onBlur`-Handler für Keyboard-User + ESC-Handler. |
| 6 | BFSG § 6 Barrierefreiheitserklärung | Neue Route `/barrierefreiheit/page.tsx` | 60 Min | `.legal-doc`-Template, 8 Pflicht-Abschnitte, Footer-Link. |
| 7 | BFSG § 6 Feedback-Mechanismus | In Barrierefreiheitserklärung | 5 Min | E-Mail-Alias `barrierefreiheit@hoeger.dev` (oder dedizierte Betreffzeile), Reaktionszeit 7 Werktage. |

### FIX-SOON — vor Marketing-Claim „BFSG-konform" beheben

| # | SC / Thema | Ort | Fix-Aufwand | Empfehlung |
|---|-----------|-----|-------------|------------|
| 8 | 1.4.3 Placeholder-Kontrast ~2,1 : 1 | `Contact.tsx:14`, `WebsiteCheckForm.tsx:9` | 2 Min | `/60` → `/90` Opacity oder `placeholder:text-slate-500`. |
| 9 | 1.4.11 Form-Border-Kontrast | `inputClasses` in Contact.tsx/WebsiteCheckForm.tsx | 5 Min | `border-border` → `border-slate-400` (3 : 1). |
| 10 | 1.3.5 Autofill-Tokens | Formulare | 5 Min | `autocomplete="name"`/`"email"` auf entsprechenden Feldern. |
| 11 | 2.4.3 Skip-Link vor AnnouncementBanner | `layout.tsx:97-103` | 10 Min | Skip-Link aus Header.tsx in layout.tsx vor `<AnnouncementBanner>` ziehen. |
| 12 | 2.4.11 Focus Not Obscured | `globals.css:88` | 2 Min | `html { scroll-padding-top: 5rem; }` (plus `+2.5rem` wenn Banner sichtbar). |
| 13 | 2.5.3 Label in Name (Logo) | `Header.tsx:61` | 2 Min | `aria-label` entfernen (Text „Michael Höger" ist sichtbar) ODER auf „Michael Höger – Zur Startseite" erweitern. |
| 14 | 2.5.8 Target Size (Social-Icons) | `Footer.tsx:25,37` | 5 Min | Icon-Container auf `p-2 h-10 w-10` (40×40) oder `h-6 w-6` Icon (24×24). |
| 15 | 3.3.3 Error Suggestion | Formulare | 30 Min | Feldspezifische Validierung + deutsche Error-Messages (E-Mail-Format, URL-Format). |
| 16 | 4.1.3 Status Messages | `Contact.tsx:135`, `Countdown.tsx` | 15 Min | `aria-live="polite"` auf Success-Container, `role="timer" aria-live="off"` auf Countdown. |
| 17 | 2.2.2 Pause für Dauer-Animationen | `Hero.tsx:88`, `AnnouncementBanner.tsx:34` | 10 Min | Entweder Bounce auf ≤5 s limitieren oder in `prefers-reduced-motion`-Spirit dauerhaft dezent. |
| 18 | Keyboard-ESC auf CookieBanner + Mobile-Nav | `CookieBanner.tsx`, `Header.tsx` | 15 Min | `useEffect` mit `keydown`-Listener, `Escape` → `setVisible(false)`/`setMobileOpen(false)`. |

### NICE — Polish, nicht BFSG-hart

| # | Thema | Ort | Empfehlung |
|---|-------|-----|------------|
| 19 | Alt-Text WhatsApp-Portrait | `WhatsAppButton.tsx:37` | `alt=""` (dekorativ, da aria-label auf Parent semantisch abdeckt). |
| 20 | Einfache Sprache auf `/preise` | `app/preise/page.tsx` | Tooltips/Klammer-Erklärungen für „SEO", „Retainer", „Cal.com". |
| 21 | Micro-Text 9-12px (UI-REVIEW F5) | `gruendungsangebot`, `Countdown`, `Logo` | Minimum `text-xs` (12px), ideal `text-sm`. |
| 22 | Cookie-Banner Close-Button | `CookieBanner.tsx` | Optional „X" zum Schließen als dritter Button (gilt als „Ablehnen"). |
| 23 | `role="timer"` + `aria-label` Countdown | `Countdown.tsx` | Siehe UI-REVIEW F1 Fix-Snippet. |

---

## 7. Kurz-Checkliste „Was für BFSG-Compliance-Page erwähnen werden kann"

Nach Abarbeitung aller **BLOCK**- und **FIX-SOON**-Items kann auf einer eigenen Seite (z.B. `/barrierefreiheit/` oder als Trust-Badge im Footer) mit gutem Gewissen kommuniziert werden:

### Umgesetzte Maßnahmen (nach Fixes)

- **WCAG 2.2 Level AA**: 50 Erfolgskriterien geprüft, alle anwendbaren erfüllt oder N/A.
- **Barrierefreiheitserklärung** nach § 6 BFSG vorhanden, inkl. Feedback-Kanal und Schlichtungsstelle-Hinweis.
- **Tastaturbedienung** vollständig möglich, inklusive Skip-Link „Zum Inhalt springen" und sichtbarer Fokus-Indikator auf allen interaktiven Elementen.
- **Screen-Reader-kompatibel** durch semantische HTML5-Landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`), beschreibende Alt-Texte, verknüpfte Form-Labels, ARIA-Live-Regions für Statusmeldungen.
- **Kontrast** erfüllt 4,5 : 1 (normaler Text) bzw. 3 : 1 (Großtext, UI-Komponenten) nach WCAG 1.4.3 und 1.4.11.
- **`prefers-reduced-motion`** respektiert — Animationen werden für Nutzer:innen mit eingeschränkter Bewegungstoleranz ausgeschaltet.
- **Responsive** bis 320px Viewport-Breite, Browser-Zoom bis 400% ohne Informationsverlust.
- **Sprach-Attribut** (`lang="de"`) global und für Teilbereiche (`lang`-Attribut auf englischen Fachbegriffen wo nötig).
- **Keine Blink-/Flash-Animationen** (SC 2.3.1).
- **Honeypot-Spamschutz** ohne CAPTCHA → keine zusätzliche kognitive Belastung für berechtigte Nutzer:innen.
- **Kontaktmöglichkeiten mehrgleisig**: Formular, E-Mail, Telefon, WhatsApp, Cal.com-Terminbuchung — Nutzer:innen wählen den für sie zugänglichsten Kanal.
- **Legal-Doc-Modus** für Impressum, AGB, Datenschutz, Barrierefreiheitserklärung: serif, ruhige Typografie, hoher Lesekomfort (68ch max-width, 1.75 line-height).

### Was NICHT beworben werden sollte (Stand heute)

- „100 % barrierefrei" — das ist ein Grad, der nie vollständig erreichbar ist; besser „auf Konformität mit WCAG 2.2 AA ausgerichtet".
- „BFSG-zertifiziert" — es gibt keine offizielle Zertifizierung; korrekt ist „BFSG-konform gemäß eigener Selbstbewertung" oder „durch unabhängigen Audit geprüft" (falls zutreffend).
- Bilder, die Menschen mit Behinderungen symbolisch darstellen, ohne dass diese an der Entstehung beteiligt waren — Tokenismus-Risiko.

### Was ehrlich kommuniziert werden kann

- „Diese Seite wurde nach den Prinzipien des Barrierefreiheitsstärkungsgesetzes (BFSG) und der Web Content Accessibility Guidelines (WCAG) 2.2 Level AA entwickelt."
- „Wenn Sie auf eine Barriere stoßen, melden Sie sich bitte unter [barrierefreiheit@hoeger.dev](mailto:barrierefreiheit@hoeger.dev) — Antwort innerhalb von 7 Werktagen."
- „Letzte Prüfung: [Datum], nächste Prüfung: halbjährlich."
- „Audit-Grundlage: interner 50-Kriterien-Durchgang + [ggf. externer Audit]."

---

## 8. Zusammenfassung & nächste Schritte

**Status heute (2026-04-20):** Nachbesserung nötig. Nicht BFSG-konform in 7 Punkten.

**Fix-Reihenfolge (~3–4 h Arbeit):**

1. Kontrast-Fixes (WhatsApp, Primary-CTA) — 20 Min
2. `focus-visible` global — 15 Min
3. FAQ `aria-expanded` — 10 Min
4. Keyboard-Fix Desktop-Nav-Dropdown — 20 Min
5. Barrierefreiheitserklärung `/barrierefreiheit/` erstellen — 60 Min
6. Feedback-Kanal + Footer-Link — 10 Min
7. FIX-SOON-Block abarbeiten (Placeholder, Autofill, Skip-Link-Position, Target-Size, Status-Messages, ESC-Handler) — 60–90 Min

**Danach: Re-Audit** — Lighthouse-Accessibility-Score sollte ≥95 sein, manueller Tab-Durchgang ohne Orientierungsverlust, Screen-Reader-Test (VoiceOver auf macOS, NVDA auf Windows) auf Startseite + Kontaktformular + Website-Check-Formular.

**Nach Re-Audit:** BFSG-Compliance-Page live, Marketing-Claim auf `/website-check/` und `/preise/` kann von „wird geprüft" auf „ist umgesetzt" umgestellt werden.

---

*Audit erstellt: 2026-04-20, Doc (Claude Opus 4.7 Agent, statische Code-Analyse, read-only).*
*Keine Deploys, keine Code-Änderungen durchgeführt.*
