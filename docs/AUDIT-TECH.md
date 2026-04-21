# Technisches Audit - hoeger.dev (Static Build)

**Datum:** 2026-04-20
**Audit-Umfang:** Lighthouse, JSON-LD / Rich Results, Broken-Links-Scan
**Grundlage:** lokaler Static-Build aus `out/` (Next.js export), via `python3 -m http.server 4173`
**Modus:** Read-only. Keine Code-Änderungen, kein Deploy.

---

## 0. Vorbemerkung: Routen-Abweichung

Die Aufgabe sah ein Audit gegen `/leistungen/` und `/kontakt/` vor. Beide Routen existieren im Static-Build **nicht** und werden auch aus keinem HTML-File verlinkt (0 Treffer). Stattdessen existieren:

- `/preise/` (Preisuebersicht/Pakete)
- `/texterstellung/`
- `/webdesign-limburg/`
- `/gruendungsangebot/`
- `/website-check/`

Ersatzseite fuer `/leistungen/` im Lighthouse-Lauf: `/preise/` (naechstverwandte Leistungsuebersicht).
`/kontakt/` wurde **nicht** substituiert - pruefen, ob eine Kontaktseite bewusst fehlt (Kontakt-CTA laeuft aktuell vermutlich via Cal.com/Mail auf anderen Seiten).

**Handlungsbedarf:** Entscheiden, ob `/leistungen/` und `/kontakt/` als eigene Routen geschaffen werden sollen - beides sind naheliegende Such-/Nav-Ziele fuer Neubesucher.

---

## 1. Lighthouse Scores

Lauf via `npx lighthouse` (v13.1.0), Desktop/Default-Throttling, headless Chrome, lokaler Server `http://localhost:4173/`.

| Seite | Performance | A11y | Best Practices | SEO | LCP | CLS | TBT | FCP |
|---|---|---|---|---|---|---|---|---|
| `/` (Home) | **0.73** | 0.96 | 1.00 | 1.00 | 8.5 s | 0.006 | 20 ms | 2.3 s |
| `/farbpsychologie/` | **0.75** | 0.96 | 1.00 | 1.00 | 7.1 s | 0.002 | 10 ms | 1.8 s |
| `/gruendungsangebot/` | **0.74** | 0.92 | 0.96 | 1.00 | 7.3 s | 0.000 | 20 ms | 2.1 s |
| `/website-check/` | **0.76** | 0.96 | 1.00 | 1.00 | 6.9 s | 0.002 | 10 ms | 1.4 s |
| `/preise/` (Ersatz fuer `/leistungen/`) | **0.78** | 0.96 | 1.00 | 1.00 | 6.1 s | 0.002 | 10 ms | 1.5 s |
| `/leistungen/` | - | - | - | - | - | - | - | - | **Route existiert nicht** |
| `/kontakt/` | - | - | - | - | - | - | - | - | **Route existiert nicht** |

**Faustlesart:** Gruenzone ab 0.90, Gelbzone 0.50-0.89, Rot < 0.50.

### Hauptproblem: LCP durchgehend > 6 s

Performance-Scores sitzen durchgaengig im gelben Bereich (0.73 - 0.78). **Einziger echter Treiber:** Largest Contentful Paint (LCP) zwischen 6.1 s und 8.5 s - Ziel waere < 2.5 s.

CLS, FCP und TBT sind alle im gruenen Bereich - es ist kein Layout-Shift- oder Input-Latency-Problem, sondern ein **Main-Content-Render-Problem**.

**Verdaechtige Ursachen** (bestaetigungsbeduerftig im DevTools-Performance-Panel, da Lighthouse keinen `largest-contentful-paint-element`-Node ausgibt):
- Hero-Bilder sind moeglicherweise nicht als `priority` / mit `fetchpriority="high"` geladen.
- LCP-Element ist vermutlich Text (Hero-Headline) hinter einem Font-Load - Tailwinds Inter wird evtl. erst nach JS-Hydration sichtbar.
- "Reduce unused JavaScript": 1.500 ms potenzielle Einsparung auf der Home. Top-5 Bundles:
  - `chunks/1c9669fd87998ca9.js` - 80 KB ungenutzt / 223 KB Gesamt
  - `chunks/604b9d313262e281.js` - 74 KB ungenutzt / 133 KB Gesamt
  - `chunks/e62c31e82a429165.js` - 53 KB ungenutzt / 118 KB Gesamt

**Hinweis:** Die Tests liefen gegen `localhost` ohne Netzwerk-Throttling - LCP spiegelt Render-Kosten, nicht Transport. Mit Netzwerk-Simulation ("Slow 4G") waere das Bild noch unguenstiger.

### Accessibility - konsistente Findings auf allen Seiten

Zwei A11y-Issues erscheinen identisch auf jeder Seite:

1. **`color-contrast` (Score 0)** - kritisch
   - **Home/alle Seiten:** Primary-Button `bg-primary` (Teal #2dd4bf) mit weisser Schrift hat ein Kontrastverhaeltnis von **1.86:1**. WCAG AA fordert 4.5:1 fuer Fliesstext, 3:1 fuer Large Text / UI-Komponenten.
     ```html
     <button class="rounded-lg bg-primary ... text-white ...">
     ```
   - **`/gruendungsangebot/`:** Zusaetzlich viele `text-slate-400`-Labels auf hellem Hintergrund (11px Uppercase-Keys, Durchstreich-Preise, Footnotes) - ebenfalls unter AA.
   - **Schwere:** Dies ist der Hauptbremser fuer A11y-Scores und ein echtes BFSG-Risiko (ab 28.06.2025 gesetzlich relevant fuer relevante Angebote).

2. **`label-content-name-mismatch` (Score 0)** - mittel
   - Das Logo-Link-Element `<a aria-label="Zur Startseite" ...>` enthaelt sichtbaren Text, der nicht mit dem accessible name uebereinstimmt. Screen-Reader lesen "Zur Startseite", Voice-Control-User sagen evtl. "Michael Hoeger" o.ae. und treffen nichts.
   - Fix: entweder `aria-label` entfernen (sichtbaren Text als accessible name nutzen) oder `aria-label` so anpassen, dass sichtbarer Text darin enthalten ist.

**Abweichung:** `/gruendungsangebot/` hat zusaetzlich Best-Practices 0.96 (statt 1.00) - vermutlich ein Deprecated-API oder Console-Warning. Nicht kritisch.

### Manuell nachzuholen morgen

- **LCP-Element identifizieren** via Chrome DevTools > Performance > LCP-Marker (Lighthouse liefert keinen Selector zurueck).
- **Bundle-Splits** im Next-Build analysieren: `next build` mit `ANALYZE=true` + `@next/bundle-analyzer`.

---

## 2. Structured Data / JSON-LD

**20 HTML-Seiten** im Build gescannt, **24 JSON-LD-Bloecke** extrahiert.

- **Parse-Erfolg: 24/24** - alle Bloecke sind valides JSON. **Keine defekten Seiten.**
- **@type-Gesamtuebersicht** (Vorkommen):

| @type | Anzahl | Zweck |
|---|---|---|
| Person | 28 | Autor/Inhaber-Attribution |
| ListItem | 23 | Breadcrumb-Elemente |
| Offer | 16 | Pakete/Preise |
| Service | 16 | Leistungen (Web/SEO/KI) |
| Country / Question / Answer | je 11 | ServiceArea + FAQ |
| BreadcrumbList | 10 | Navigationshilfe |
| PriceSpecification | 9 | Preisangaben |
| OfferCatalog | 4 | Leistungsgruppen |
| BlogPosting | 3 | Blog-Artikel |
| ProfessionalService | 2 | Home + webdesign-limburg |
| PostalAddress / GeoCoordinates | je 2 | LocalBusiness |
| FAQPage | 2 | Home + Farbpsychologie |
| Organization / WebSite / WebApplication | je 1 | Root-Entities |
| City / State / AdministrativeArea | je 1 | Webdesign-Limburg-Seite |

### @type pro Seite

| Seite | @types |
|---|---|
| `/` (Home) | Organization, WebSite, ProfessionalService, PostalAddress, GeoCoordinates, FAQPage, Question, Answer, Service, OfferCatalog, Offer, Person, Country |
| `/farbpsychologie/` | FAQPage, Question, Answer, Service, Person, Country |
| `/gruendungsangebot/` | BreadcrumbList, ListItem, Service, Offer, OfferCatalog, PriceSpecification, Person, Country |
| `/preise/` | BreadcrumbList, ListItem, Service, Offer, OfferCatalog, PriceSpecification, Person, Country |
| `/texterstellung/` | BreadcrumbList, ListItem, Service, Offer, OfferCatalog, PriceSpecification, Person, Country |
| `/website-check/` | WebApplication, Offer, Person |
| `/webdesign-limburg/` | ProfessionalService, PostalAddress, GeoCoordinates, AdministrativeArea, City, State |
| `/blog/*` (3 Artikel) | BlogPosting, BreadcrumbList, ListItem, Person |
| `/blog/` (Index) | BreadcrumbList, ListItem |
| `/agb/`, `/impressum/`, `/datenschutz/` | BreadcrumbList, ListItem |

### Beobachtungen

- **Solide Abdeckung.** Root-Entities (Organization, WebSite, ProfessionalService) sitzen auf der Home, Service-/Offer-Modell auf allen Verkaufsseiten, FAQPage dort wo es Sinn ergibt.
- **`BreadcrumbList` fehlt auf `/` und `/farbpsychologie/` und `/website-check/`.** Fuer `/` ist das OK (ist Wurzel), aber auf `/farbpsychologie/` und `/website-check/` waere ein Breadcrumb sinnvoll fuer Rich-Results-Anreicherung.
- **`FAQPage` nur auf 2 Seiten** (`/` und `/farbpsychologie/`) - auf `/preise/`, `/gruendungsangebot/`, `/website-check/` gaebe es reichlich FAQ-Potenzial das aktuell nicht als Structured Data exponiert ist.
- **`WebApplication` auf `/website-check/`** ist eine interessante Wahl - Google interpretiert das eher als SaaS-Tool; fuer einen bezahlten Audit-Service waere `Service` + `Offer` passender (ist dort teilweise vorhanden, aber `WebApplication` dominiert).
- **Keine Dubletten-Issues** festgestellt (kein mehrfacher `@id`-Clash sichtbar) - Spot-Check, nicht vollstaendiger graph-walk.

### Rich Results Test - manuelle URLs (nach Go-Live)

Nach naechstem Prod-Deploy diese URLs durch Googles Rich Results Test schieben:

- https://hoeger.dev/
- https://hoeger.dev/farbpsychologie/
- https://hoeger.dev/gruendungsangebot/
- https://hoeger.dev/preise/
- https://hoeger.dev/texterstellung/
- https://hoeger.dev/website-check/
- https://hoeger.dev/webdesign-limburg/
- https://hoeger.dev/blog/ki-optimierung-was-ist-das/

Tool: https://search.google.com/test/rich-results (API erfordert Auth, daher manuell).

---

## 3. Broken Links

- **HTML-Dateien gescannt:** 20
- **Hrefs geprueft:** 761
- **Dead internal links:** **0**

Externe Links, `mailto:`, `tel:`, Fragment-only (`#...`) wurden ausgeschlossen. Geprueft wurden:
- Absolute Pfade (`href="/..."`) gegen Dateien/Verzeichnisse in `out/`.
- Relative Pfade, aufgeloest gegen Parent-Verzeichnis, inkl. `index.html`-Fallback.

**Ergebnis: clean.** Kein toter interner Link im Static Build.

---

## 4. Handlungsbedarf - Top 5

Prio-Reihenfolge nach Impact x Aufwand:

1. **Color-Contrast Primary-Button fixen (A11y + BFSG-Risiko)**
   - `bg-primary` (#2dd4bf) + `text-white` = **1.86:1**, WCAG AA fordert 4.5:1.
   - Loesung: dunkleres Teal (z.B. `#0f766e` / `teal-700`) als Button-BG **oder** `text-slate-900` auf dem hellen Teal.
   - Tangiert alle Seiten einheitlich. Betrifft auch das Farbpsychologie-Storytelling-Argument, weil der eigene Primary selbst ein Kontrast-Sorgenkind ist.
   - Zusatz: `text-slate-400`-Labels auf `/gruendungsangebot/` gleich mit heben (auf `text-slate-600` oder dunkler).

2. **LCP < 2.5 s bringen (Performance auf allen 5 Seiten im Gelbbereich)**
   - Hero-Bild mit `priority` + `fetchpriority="high"` + passenden `sizes`-Werten ausstatten.
   - Font `Inter` via `next/font` mit `display: "swap"` + Preload sicherstellen - dann blockt der LCP-Text nicht auf Font.
   - Bundle-Splitting: 1.500 ms Einsparpotenzial durch Entfernen ungenutzten JS-Codes (siehe Chunks oben). `next build` mit Bundle-Analyzer, dann Dynamic Imports fuer schwere Komponenten.

3. **`label-content-name-mismatch` Logo-Link fixen**
   - `<a aria-label="Zur Startseite">` im Header so anpassen, dass der sichtbare Logo-Text im accessible name enthalten ist - z.B. `aria-label="Michael Hoeger - Zur Startseite"` oder `aria-label` komplett weg.
   - Einmal im Layout geaendert, wirkt global.

4. **Routen-Luecken `/leistungen/` + `/kontakt/` bewerten**
   - `/leistungen/` als Hub-Seite mit Links auf `/preise/`, `/texterstellung/`, `/webdesign-limburg/`, `/farbpsychologie/` schaffen? Aktuell muss ein Neubesucher raten, ob Leistungen unter `/preise/` oder der Home zu finden sind.
   - `/kontakt/` als dedizierter Einstieg (Cal.com-Embed + Mailto + ggf. Kontaktformular) - derzeit vermutlich nur als CTA auf anderen Seiten integriert.
   - Falls bewusst so entschieden: in der Nav/Sitemap klar machen, welcher Slug "Leistungen" bzw. "Kontakt" abdeckt.

5. **Structured Data aufhuebschen**
   - `BreadcrumbList` auf `/farbpsychologie/` und `/website-check/` ergaenzen.
   - `FAQPage` auf `/preise/` und `/gruendungsangebot/` nachruesten (Quick Win fuer SERP-Platz).
   - Pruefen ob `/website-check/` weiter als `WebApplication` klassifiziert bleibt oder als `Service` + `Offer` (Verkaufsseiten-Logik) umgebaut wird.

---

## Anhang - Rohdaten

- Lighthouse-JSONs liegen in `docs/audit-tmp/lh-*.json` (nicht ins VCS einchecken, sind Zwischenartefakte).
- JSON-LD-Extrakt: `docs/audit-tmp/jsonld/all.txt`.
- Server wurde nach Abschluss gestoppt.

**Was morgen manuell im Chrome DevTools Lighthouse-Panel nachgeholt werden sollte:**
- LCP-Element-Identifikation (Lighthouse-JSON enthielt keinen Selector).
- Throttled Mobile-Run ("Slow 4G" + CPU 4x slowdown) fuer realistisches Mobile-Bild.
- Rich Results Test gegen Live-Domain nach naechstem Deploy.
