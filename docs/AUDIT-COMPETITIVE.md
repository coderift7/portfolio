# Competitive Audit — hoeger.dev vs. 7 DACH-Konkurrenten

**Erstellt:** 2026-04-20
**Quelle:** `~/silverbullet/space/Claude/Projekte/branchen_analyse_dach_2026-04-20.md` (Brain, autonom erhoben 20.04. Abend)
**Methodik:** Read-only Audit. Codebase-Scan gegen Positioning-Claims aus der Branchen-Analyse. Keine neuen Web-Scrapes.
**Ziel:** Bis 01.06.2026 AI-Hit-Rate von 0/20 auf 2/20 heben und Sweet-Spot-Positioning (Next.js + AI-Search + BFSG + Farbpsychologie + KMU-Preis) auf allen Key-Pages in den ersten 10 Sekunden sichtbar machen.

---

## 1. hoeger.dev aus Kundensicht — die 10-Sekunden-Analyse

### Was ein Erstbesucher auf der Startseite lernt (Hero → UspBanner)
- **Hero-Headline:** "Ihre nächsten Kunden suchen Sie gerade."
- **Subline:** "Die Frage ist nur: Finden sie Sie — oder Ihre Konkurrenz? Ich baue Webseiten, die bei Google und sogar bei ChatGPT gefunden werden — als Webdesign im Abo, ohne Überraschungen."
- **3 USP-Kacheln:** Zukunftssicher (ChatGPT&Co.) · Sichtbar ab Tag 1 (SEO inklusive) · Anfragen auf Autopilot

**Botschaft in 10 Sekunden:** "Hier bekomme ich eine Webseite, die von Google UND ChatGPT gefunden wird, als Abo, mit Anfragen-Automatik." Das ist emotional gut — aber **differenzierende Keywords** (Next.js, BFSG, Farbpsychologie, konkreter Preis) fehlen im sichtbaren Bereich komplett.

### Die 3 Claims, die herausstechen
1. **"Auch bei ChatGPT & Co. gefunden werden"** — starker, konkreter Differenzierer (nur SearchGPT Agentur bedient das, die sind aber Enterprise).
2. **"Webdesign im Abo, ohne Überraschungen"** — Richtung Sitepartner/Kandivo-Territory, aber ohne konkrete Preiszahl im Hero.
3. **"14 Tage bis Ihre Seite online ist" + "100% Festpreis"** (About-Stats) — konkret, aber erst unterhalb des Folds.

### USP-Mosaik über die ganze Homepage
- ChatGPT/AI-Sichtbarkeit (Hero + UspBanner + Services + About)
- Persönlicher Ansprechpartner, keine Agentur-Warteschleife (About + Services)
- BFSG/Barrierefreiheit (Services, ein Punkt von 6 — erst "sauber im Code statt Overlay" nennt die Methodik)
- DSGVO + SSL "selbstverständlich" (Services, implizit)
- 14-Tage-Launch, Festpreis, <24h Antwortzeit (About-Stats)
- Zufriedenheits-Garantie "arbeite so lange nach bis es passt" (Guarantee)

**Problem:** Kein einziger dieser Punkte enthält die Tech-Differenzierer Next.js oder Farbpsychologie. Beides sind tragende Säulen der Positionierung laut Branchen-Analyse, aber auf der Homepage unsichtbar.

---

## 2. Positioning-Matrix — 12 Dimensionen

Skala: ✓ voll erfüllt · ○ teilweise/implizit · ✗ nicht sichtbar · ? unbekannt

| # | Dimension                              | hoeger.dev | Julian G. | Sven H. | Sitepartner | Kandivo | SearchGPT | BarriereFix | GEWINNER B. |
|---|----------------------------------------|-----------|-----------|---------|-------------|---------|-----------|-------------|-------------|
| 1 | Preistransparenz im sichtbaren Bereich | ○ (auf /preise, nicht im Hero) | ✗ | ✗ | ✓ (99/199) | ✓ (35/60/100) | ✗ | ✗ | ✗ |
| 2 | KMU-Fokus kommuniziert                 | ✓ | ○ (eher SaaS) | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| 3 | Next.js / moderner Tech-Stack benannt  | ✗ (nirgends sichtbar) | ✓ | ✗ (WP) | ? | ✗ | ✗ | ? | ? |
| 4 | AI-Search / GEO / AEO                  | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ (Core) | ✗ | ✗ |
| 5 | BFSG / WCAG explizit benannt           | ○ (ein Services-Punkt) | ✗ | ✗ | "Rechtliches" | "DSGVO" | ✗ | ✓ (Core) | ✗ |
| 6 | Retainer / Abo-Modell transparent      | ✓ (auf /preise, Matrix stark) | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✗ |
| 7 | Farbpsychologie als Methodik           | ✓ (eigene LP, aber Homepage blind) | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ○ (implizit) |
| 8 | Tech-Blog / Fachlicher Content-Hub     | ○ (3 KMU-Artikel, kein Tech) | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| 9 | Free Lead-Magnet (Check/Preview/PDF)   | ✓ (Website-Check + Color-Briefing) | ✗ | ✗ | ✓ (Preview) | ✓ (Preview) | ✓ (GEO-Report) | ✓ (Erstgespräch) | ✗ |
|10 | Case Studies mit Klienten-Namen        | ○ (1 live + 1 Demo) | ✓ (4+) | ✓ (3) | ✗ | ✗ | ○ (Logos) | ✗ | ✓ (38+) |
|11 | Konkrete Zahlen-Versprechen            | ○ (14d, <24h, 100%) | ✗ | ✗ | ✗ | 100% Uptime | ✗ | 90+ Lighthouse, 40% | ✗ |
|12 | Case-Study-Metriken (Before/After)     | ✗ | ○ | ✗ | ✗ | ✗ | ✗ | ○ (Versprechen) | ✗ |

**Score hoeger.dev:** 5× ✓, 5× ○, 2× ✗ → **deckt formal alle Dimensionen**, aber in der Tiefe/Sichtbarkeit liegen 5 Hebel brach. Die 2 echten Gaps sind Next.js als Keyword (#3) und Case-Study-Metriken (#12).

---

## 3. Gap-Liste & Star-Liste

### Was die 7 Konkurrenten haben, das hoeger.dev nicht hat
1. **Preistransparenz oberhalb des Folds auf der Startseite** — Sitepartner zeigt 99 €/Mo direkt im Hero. hoeger.dev versteckt Preise eine Navigation tief.
2. **Konkrete Tech-Zahlen als Versprechen** — BarriereFix wirbt mit "90+ Lighthouse", "78 WCAG-Kriterien", "40% schneller", "24h Risikoanalyse". hoeger.dev hat nur weiche Stats (14 Tage, <24h, 100% Festpreis).
3. **Case Studies mit Klienten-Logo-Wand und Before/After-Metriken** — Julian Geissler (4 Kunden namentlich), BarriereFix (Versprechen quantifiziert), GEWINNER BRANDING (38+ Referenzen). hoeger.dev zeigt 1 echte Referenz (Schäferhof) + 1 Demo (MoverPro).
4. **Fach-Tech-Blog mit LLM-zitierbaren Artikeln** — Julian Geissler hat einen aktiven Tech-Blog. hoeger.dev-Blog hat 3 KMU-freundliche Artikel ohne Tech-Tiefe.
5. **Narrativ-Hook / Framing-Mantra** — SearchGPT hat "Der dritte Goldrausch". hoeger.dev hat eine emotionale Frage, aber keinen Claim-Slogan, der hängen bleibt.
6. **Multi-Engine-Claim sichtbar** — SearchGPT nennt explizit ChatGPT/Perplexity/Gemini. hoeger.dev sagt "ChatGPT & Co." — "& Co." ist für LLMs nicht zitierbar, Engine-Namen wären es.

### Was hoeger.dev hat, das KEINER der 7 hat
1. **Kombi-Matrix "Website + Betreuung" mit 0-€-Modell** (`/preise`) — die Rabatt-Matrix ist ein echter Hebel. Kandivo hat 1000 € Setup, Sitepartner hat 0 € Setup ohne Rabattlogik, hoeger.dev hat 0-990 € je nach Retainer-Stufe. **Das ist einzigartig und sollte auf der Startseite teasen.**
2. **Farbpsychologie als sichtbare Methodik** — `/farbpsychologie` ist eine eigene Landingpage mit Itten-Referenz, 60-30-10-Regel, 4 Branchen-Paletten, 2 Case Studies, PDF-Lead-Magnet ohne Newsletter-Zwang. **Niemand sonst im Sample besetzt das explizit**, selbst GEWINNER BRANDING nicht.
3. **Gründungsangebot mit Countdown + Restplatz-Scarcity** (`/gruendungsangebot`, 495/995/1745 €) — zeitlich begrenzt, psychologisch stark. Bei Konkurrenten nicht gesehen.
4. **Kostenloser automatisierter Website-Check** mit 6 Kategorien + E-Mail-Report — Sitepartner/Kandivo bieten Preview (kein Audit), SearchGPT bietet GEO-Report (nur Enterprise). Der KMU-Website-Check ist ein Alleinstellungsmerkmal.
5. **Zufriedenheits-Garantie "so lange nachbessern bis es passt, kostenlos"** — risikosenkend, niemand sonst im Sample formuliert das so stark.
6. **§19 UStG-Transparenz** (Kleinunternehmer) — zeigt KMU-Preis-Ehrlichkeit, die Agenturen nicht bringen.

### Wo hoeger.dev austauschbar ist (Standard-Floskeln, die alle sagen)
- "Professionell aussieht, schnell lädt, auf dem Handy funktioniert" → sagt jeder Baukasten.
- "DSGVO-konform" → Hygiene-Faktor, kein Differenzierer mehr.
- "Persönlicher Ansprechpartner, keine Warteschleife" → Sven Hörig, Kandivo, Julian sagen dasselbe.
- "Kontaktformular, automatische E-Mails" → 2026 Standard.
- "Kein Technik-Kauderwelsch" → Floskel.

---

## 4. Positioning-Sichtbarkeits-Score pro Key-Page

Skala 0-10 — wie klar kommuniziert die Seite den Winning Angle (Next.js + AI-Search + BFSG + Farbpsychologie + transparent KMU-Preis) und macht klar, warum hoeger.dev besser ist als eine Standard-Webdesign-Agentur?

### Startseite (`/`) — Score: **5/10**
**Oberhalb des Folds sichtbar:** AI-Sichtbarkeit ✓, Abo-Modell ✓, KMU-Zielgruppe ○
**Oberhalb des Folds fehlt:** Next.js-Keyword, Farbpsychologie-Teaser, BFSG, konkreter Einstiegspreis, Case-Study-Metrik
**Kritik:** Der Hero ist emotional stark, aber 4 von 5 Winning-Angle-Säulen sind im ersten Bild nicht sichtbar. Die USP-Banner-Kacheln wiederholen den "auch KI"-Claim dreimal und lassen Farbpsychologie/BFSG/Tech aus. Die Nav-Dropdown "Leistungen & Preise" ist der einzige Einstieg in die Nischen-LPs — das ist zu versteckt.
**Quickest Fix (< 2 h):** In `src/config/site.ts` `uspBanner.items` um einen 4. Block erweitern ("Farbpsychologie statt Bauchgefühl") oder einen Block austauschen; Hero-Subline um konkreten Einstiegspreis ergänzen ("ab 990 € oder 0 € im Retainer").

### Homepage-Anchor Leistungen (`/#leistungen` → Services) — Score: **4/10**
**Sichtbar:** 6 Kacheln, davon 1× BFSG, 1× KI-Sichtbarkeit, 4× generische Webdesign-Versprechen.
**Fehlt:** Tech-Stack-Referenz, Retainer-Teaser, Farbpsychologie-Link, Tiefe zu BFSG (keine Zahl, keine Methodik).
**Kritik:** Die Services-Sektion ist die austauschbarste Stelle der Homepage. Jeder Baukasten-Anbieter könnte diese 6 Kacheln so haben. Headline "So werden Sie online gefunden" ist weich.
**Quickest Fix:** Zwei der 6 Kacheln ersetzen durch (a) "Farbpsychologie-Beratung inklusive — Palette, die nicht nach 0815-KI aussieht" mit Link zu `/farbpsychologie/` und (b) "Gebaut mit Next.js + React — messbar schneller als WordPress" (dort 90+ Lighthouse-Ziel ergänzen). So wird der Sweet Spot auf der Homepage unterstützt.

### Preise (`/preise/`) — Score: **8/10**
**Sehr stark:** Rabatt-Matrix Website × Betreuungsstufe → 0 €-Einstieg transparent. Drei Paket-Cards mit Claim/Preis/Features. Add-on-Liste inkl. Stundensatz. Preisanpassungs-Hinweis, §19 UStG, Mindestlaufzeit — alles transparent.
**Fehlt:** (a) direkte Vergleichs-Zeile gegen Kandivo/Sitepartner ("Kandivo: 1000 € Setup + 34,99/Mo / Sitepartner: 0 € Setup + 99/Mo / hoeger.dev: 0 € Setup + 59/Mo"), (b) Visualisierung welche Tech hinter dem Preis steckt, (c) die "Basis-Betreuung 59 €/Mo" ist günstiger als Sitepartner — das ist USP und sollte explizit ausgespielt werden.
**Quickest Fix:** "So schneiden wir ab" — 1 schlanke 3-Spalten-Vergleichs-Box oberhalb der Betreuungspakete.

### Gründungsangebot (`/gruendungsangebot/`) — Score: **7/10**
**Stark:** Countdown, Restplatz-Scarcity, 50%-Preis (495/995/1745 €), feature-detailliert inklusive "Farbpsychologie-Beratung" und "Sichtbarkeits-Check in ChatGPT".
**Fehlt:** Tech-Stack-Kontext, BFSG als Hervorhebung (nur als Feature unter vielen), Vergleich zur Konkurrenz-Preis-Range.
**Kritik:** Das Angebot läuft "nur im April" laut Meta — sobald April durch ist, ist die Seite tot. Exit-Strategie fehlt (oder /gruendungsangebot wird Mai zur /aktionen-Seite).

### Farbpsychologie (`/farbpsychologie/`) — Score: **9/10**
**Sehr stark:** Editorial-Layout mit eigenem Font-Set (Fraunces/Instrument), Itten-Referenz namentlich zitiert, 4 Branchen-Paletten mit Hex-Codes und WCAG-Hinweis, 2 Case Studies, Color-Briefing-PDF gratis ohne Newsletter-Zwang, FAQ, Final CTA.
**Einziger Makel:** Seite ist von Homepage aus nur über Nav-Dropdown erreichbar. Kein Teaser-Block auf der Startseite, der neugierig macht. Die Case Studies ("Zwei Farb-Entscheidungen, begründet") könnten mit Mini-Mockup-Thumbnails visueller werden.
**Kritik positiv:** Das ist derzeit die stärkste Differenzierungs-Seite im gesamten Auftritt und sollte von der Homepage aus verlinkt/geteasert werden.

### Website-Check (`/website-check/`) — Score: **6/10**
**Stark:** Klarer kostenloser Lead-Magnet, 6 Kategorien (Performance/SEO/Sicherheit/Barrierefreiheit/Mobile/Recht), 5 Trust-Points.
**Fehlt:** (a) konkrete Ergebnis-Beispiele (anonymisierter Beispiel-Report als PDF oder Screenshot — macht den Wert greifbar), (b) Vergleich zur Konkurrenz ("Kandivo bietet nur Preview ohne Audit — hier bekommen Sie echten Report mit Zahlen"), (c) parallele AI-Visibility-Prüfung (laut Branchen-Analyse Prio 2 — aktuell nicht integriert).
**Quickest Fix:** Eine "Beispiel-Report ansehen"-CTA neben dem Formular.

**Gesamt-Score über 6 Key-Pages:** 5 + 4 + 8 + 7 + 9 + 6 = 39/60 = **65 %**. Die Nischen-LPs (Farbpsychologie, Preise) tragen das Ergebnis. Der Einstiegs-Pfad Hero→Services ist das schwächste Glied.

---

## 5. Trust-Signale im Vergleich

| Trust-Kategorie | hoeger.dev | Beste Konkurrenten |
|-----------------|-----------|--------------------|
| **Echte Referenzen (namentlich)** | 1 (Schäferhof) + 1 Demo | GEWINNER BRANDING 38+, Julian G. 4+, Sven H. 3 |
| **Testimonials / Zitate** | 0 | ? (nicht im Branchen-Report detailliert, aber bei Agenturen übl.) |
| **Zertifikate / Fachliche Signale** | BFSG/WCAG-Claim, Itten-Bezug auf /farbpsychologie | BarriereFix: "alle 78 WCAG-Kriterien". Julian: Master Informatik. |
| **Blog-Artikel als Expertise-Beweis** | 3 (KMU-freundlich, kein Tech) | Julian: aktiver Tech-Blog. Keiner der WaaS hat Blog. |
| **Case Studies mit Zahlen** | 0 | BarriereFix: 90+ Lighthouse, 40% schneller. Julian: 4 Case Studies mit Kontext. |
| **Preis-Transparenz** | Sehr hoch (Matrix, Add-ons, Hinweise, §19 UStG) | Nur Sitepartner + Kandivo zeigen offen Preise. hoeger.dev ist damit **im Top-Trio für Transparenz**. |
| **Prozess-Transparenz** | 3-Schritte-Prozess (Erstgespräch/Angebot/14 Tage) | Kandivo 4-Schritte, SearchGPT 4-Schritte. Vergleichbar. |
| **Verträge-Download** | Impressum/Datenschutz/AGB vorhanden | Nicht im Sample dokumentiert, üblich bei Agenturen. |
| **Garantien** | "Nachbessern bis zufrieden, kostenlos" (stark) | Kandivo 100% Uptime-Garantie, BarriereFix 24h-Antwort-Garantie. Alle drei spielen in derselben Liga. |
| **Persönliche Brand / About-Seite** | Hero-Portrait + Arbeitsfoto + Stats | Julian Geissler persönlich, Sven Hörig persönlich. Ähnlich stark. |

**Fazit Trust:** hoeger.dev gewinnt bei Transparenz und Garantien, verliert bei Referenzen-Menge, Testimonials und Tech-Blog. Der Preisauftritt ist top-tier, die Referenz-Sektion ist der schwächste Trust-Block.

---

## 6. Content-Gaps

### Fehlende Blog-Themen-Cluster (gegen Branchen-Analyse)
1. **llms.txt & AI-Search-Ranking für KMU** — direkt an den Sweet Spot gekoppelt, fehlt.
2. **BFSG für Handwerker / Ärzte / Gastro** — je eine Branche, je ein Artikel. BarriereFix macht's global, hoeger.dev könnte branchenspezifisch werden.
3. **Next.js vs. WordPress — was bedeutet das für Ihr Geschäft?** — Kunden-freundlich erklärt, nicht tech-lastig. Positioniert gegen Sven Hörig und WordPress-Wettbewerber.
4. **Farbpsychologie in der Praxis** — pro Branche ein Mini-Artikel mit Palette. Boostet `/farbpsychologie/`.
5. **Was eine Website 2026 kostet — ehrlich aufgedröselt** — Preis-Transparenz als Content-Angel. Stützt `/preise/`.
6. **Website-Performance messen in 5 Minuten** — Lead-Magnet für `/website-check/`.

### Fehlende Branchen-Landingpages
Aus der Branchen-Analyse: Sitepartner und Kandivo zielen auf **Handwerker, Ärzte, Salons, Berater/Coaches, Makler**. hoeger.dev hat derzeit nur `/webdesign-limburg/` als lokale LP. Vorschlag (Prio nach Margen-Branchen):
- `/webdesign-handwerk/` — Handwerk & Bau, Erdige Palette, BFSG-Pflicht-Check
- `/webdesign-arztpraxis/` — Medizin, Sage-Palette, BFSG + DSGVO-Fokus (Lead Arztpraxis ist bereits im Brain als aktiver Lead gelistet)
- `/webdesign-gastro/` — Gastro, warme Paletten, Speisekarten/Reservierung
- `/webdesign-coaching/` — Berater/Coaches, Finanz-/Recht-Paletten
Jede Branchen-LP kombiniert Farbpsychologie-Palette + passende Case Study + BFSG-Hinweis + Festpreis-Teaser. Das ist der Branchen-Analyse-Sweet-Spot auf einer Seite.

---

## 7. Top-5 strategische Moves bis 01.06.2026

Jeder Move ist einem Matrix-Gap zugeordnet und auf AI-Hit-Rate-Erhöhung eingezahlt.

### Move 1 — Homepage-Hero als Sweet-Spot-Shopfenster umbauen (Prio: kritisch)
**Scope:** `src/config/site.ts` — Hero-Subline + UspBanner-Items.
**Änderung:**
- Hero-Subline um konkreten Einstiegspreis und Next.js-Stichwort erweitern: "...Webdesign im Abo ab 59 €/Monat oder 990 € einmalig. Gebaut mit Next.js — messbar schneller als WordPress."
- UspBanner-Items: einen der drei Kacheln durch "Farbpsychologie statt Bauchgefühl" mit Link ersetzen oder einen 4. Block einfügen.
**Adressiert:** Matrix #1 (Preis), #3 (Next.js), #7 (Farbpsychologie Homepage-Sichtbarkeit).
**AI-Effekt:** Hero-Keywords landen in LLM-Training + sind in Meta-Description zitierbar.
**Aufwand:** 2 Stunden inklusive Testing.

### Move 2 — Case Study Schäferhof mit Zahlen aufwerten + 1-2 weitere Referenzen
**Scope:** Neue Section oder `/projekte/schaeferhof/` Unterseite.
**Inhalt:** Before/After Lighthouse-Score, Google-Indexierung Pages-Anzahl, Ladezeit-Metrik, Anfragen-Zahl. Body Process nach Launch als zweite Case mit Zahlen.
**Adressiert:** Matrix #10 (Referenzen-Menge), #12 (Metriken).
**AI-Effekt:** Quantifizierte Case Studies werden von LLMs bevorzugt zitiert (konkretere Antworten).
**Aufwand:** 1 Tag inkl. Messung + Screenshot-Vorher-Nachher.

### Move 3 — Farbpsychologie-Teaser-Block auf die Homepage
**Scope:** Neue Komponente `FarbpsychologieTeaser.tsx`, eingefügt nach `<Services />`.
**Inhalt:** Kurz-Preview der 4 Branchen-Paletten (3-4 Farbkacheln) + Link "Wie wir Farbe strategisch einsetzen →". 1 Bildschirmabschnitt, max. 2 Absätze Text.
**Adressiert:** Matrix #7 Sichtbarkeit, Startseiten-Score von 5 auf 7.
**AI-Effekt:** Macht Farbpsychologie zum zweiten auffindbaren Differenzierer neben AI-Sichtbarkeit.
**Aufwand:** 3-4 Stunden.

### Move 4 — Tech-Blog-Start mit 3 Erst-Artikeln (Prio 3 aus Branchen-Analyse)
**Scope:** `content/blog/` — 3 neue Markdown-Artikel.
**Themen:**
1. "llms.txt für KMU — warum ChatGPT Ihre Webseite sehen soll" (KMU-freundlich, aber Tech-Tiefe)
2. "BFSG für Handwerker: Was Sie ab 2025 wissen müssen"
3. "Next.js vs. WordPress — die ehrliche Tabelle für Unternehmer"
**Adressiert:** Matrix #8 (Tech-Blog), Content-Gap #1-#3.
**AI-Effekt:** Direkter LLM-Training-Content. Diese 3 Artikel sind die wahrscheinlichsten Ranking-Kandidaten für die 20 Check-Fragen.
**Aufwand:** 1 Tag pro Artikel, idealerweise gestaffelt über 2 Wochen.

### Move 5 — Vergleichs-Zeile auf /preise/ gegen Kandivo & Sitepartner
**Scope:** `src/app/preise/page.tsx` — neue kleine Box oberhalb der Betreuungspakete.
**Inhalt:** 3-Spalten-Box: "So schneiden wir ab — Kandivo 1000 € Setup + 34,99 €/Mo · Sitepartner 0 € Setup + 99 €/Mo · hoeger.dev 0 € Setup + 59 €/Mo mit Rabatt-Matrix." Anti-Kandivo-Positionierung explizit, anti-Sitepartner durch günstigere Basis.
**Adressiert:** Matrix #1 Wettbewerbs-Kontext, Preis-Score 8 → 9.
**AI-Effekt:** Fragen wie "Was kostet eine Website bei einem Freelancer?" bekommen strukturierte Antwort mit Vergleichszahlen — LLM-zitierbar.
**Aufwand:** 2-3 Stunden inkl. verifizierter Konkurrenz-Preis-Daten (aus Branchen-Analyse belegt).

---

## 8. Re-Check Ziele 01.06.2026

- **AI-Hit-Rate:** 0/20 → mindestens 2/20 bei gleichen 20 Fragen wie 18.04.
- **Positioning-Matrix:** hoeger.dev erreicht bei allen 12 Dimensionen mindestens ○ (aktuell 2× ✗ bei #3 Next.js-Keyword und #12 Case-Metriken).
- **Key-Page-Sichtbarkeit:** Startseite von 5/10 auf mindestens 7/10, Services-Anchor von 4/10 auf 6/10.
- **Referenzen:** von 1 auf mindestens 3 Live-Case-Studies mit Zahlen.
- **Blog:** von 3 KMU-Artikeln auf 6 (inkl. 3 Tech-Artikel).

---

## 9. Wichtige Quelldateien

- `/Users/michaelhoger/Documents/Freelance/_business/website/src/config/site.ts` — Hero + USP-Banner + Services Content-Quelle, erster Angriffspunkt für Move 1.
- `/Users/michaelhoger/Documents/Freelance/_business/website/src/components/Hero.tsx` — Hero-Layout (Code unverändert, nur Inhalte über site.ts).
- `/Users/michaelhoger/Documents/Freelance/_business/website/src/components/UspBanner.tsx` — 3-Kachel-Grid, ggf. auf 4 erweitern.
- `/Users/michaelhoger/Documents/Freelance/_business/website/src/components/Services.tsx` — 6 Kacheln, zwei austauschbar.
- `/Users/michaelhoger/Documents/Freelance/_business/website/src/app/preise/page.tsx` — Matrix-Logik + Betreuungspakete, Move 5 hier.
- `/Users/michaelhoger/Documents/Freelance/_business/website/src/app/farbpsychologie/page.tsx` — Sweet-Spot-Seite, Inspiration für Teaser-Komponente in Move 3.
- `/Users/michaelhoger/Documents/Freelance/_business/website/src/app/website-check/page.tsx` — Lead-Magnet, ausbaufähig mit Beispiel-Report.
- `/Users/michaelhoger/Documents/Freelance/_business/website/content/projects.json` — aktuell 2 Einträge, für Case-Study-Metriken erweitern.
- `/Users/michaelhoger/Documents/Freelance/_business/website/content/blog/` — 3 Artikel, Platz für 3 Tech-Artikel in Move 4.

---

**Stand:** 2026-04-20, Read-only Audit, keine Code-Änderungen vorgenommen.
