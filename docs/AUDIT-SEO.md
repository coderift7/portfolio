# SEO Deep-Dive Audit — hoeger.dev

**Datum:** 2026-04-20
**Scope:** Content-SEO, Keyword-Strategie, Internal Linking, Meta-Qualität, AI-Visibility, llms.txt
**Methodik:** Read-only. Analyse von `src/app/**/*.tsx`, `content/blog/*.md`, `out/**/index.html`, `out/sitemap.xml`, `out/llms*.txt`, `src/config/site.ts`.
**Kontext:** Lighthouse SEO solid (technisches Minimum). AI-Visibility-Check 18.04. = **0/20 Hits** bei Perplexity + ChatGPT. Winning-Angle laut Branchen-Analyse: Next.js + AI-Search + BFSG + Farbpsychologie + KMU-Preis.

---

## TL;DR — Die 5 wichtigsten Findings

1. **`webdesign-limburg` ist eine komplette Orphan Page.** Keine einzige andere Seite der Site verlinkt darauf — nicht im Header-Nav, nicht im Footer, nicht im Content. Die Seite ist nur per Sitemap/direktem Aufruf erreichbar. Für das Core-Local-SEO-Keyword **"Webdesign Limburg"** ist das der gravierendste Finding.
2. **"Limburg" taucht auf der Homepage im sichtbaren Content NULL Mal auf.** Nur im JSON-LD (`postalAddress`) und im Keywords-Meta-Tag. Kein sichtbares H1/H2/Fließtext referenziert den Standort. Damit verschenkt die Homepage lokales SEO komplett.
3. **llms-full.txt ignoriert den Winning-Angle.** "Limburg" (0×), "Farbpsychologie" (0×), "BFSG" (0×), "KMU" (0×) — die vier differenzierenden Begriffe kommen im wichtigsten LLM-Kontext GAR NICHT vor. Das erklärt 0/20 AI-Visibility-Hits: LLMs kennen dich als "allgemeinen KI-Optimierer", nicht als Limburger BFSG+Farbpsychologie-Spezialisten.
4. **Keyword-Kannibalisierung preise ↔ gruendungsangebot.** Beide Seiten zielen auf "Website + Paket + KMU-Preis", beide haben fast identische Struktur (Hero → 3 Pakete → Ein Ziel: Ihr Erfolg), beide stehen mit priority 0.9 in der Sitemap. Google muss raten welche relevanter ist.
5. **Blog-Posts → Leistungsseiten = 0 Links.** Alle drei Blog-Artikel verlinken nur zu `/#kontakt` oder `/#leistungen` auf der Homepage, **kein einziger Link** ins Landingpage-Ökosystem (/preise/, /farbpsychologie/, /texterstellung/, /website-check/). Dabei wären diese Links für Relevanz + PageRank-Fluss entscheidend.

---

## 1. Keyword-Abdeckung (Matrix)

Legende: **P** = Primär (H1/Title), **S** = Sekundär (Body/H2), **–** = gar nicht, **(?)** = impliziert aber nicht wörtlich.

| Keyword                           | Home | /webdesign-limburg/ | /preise/ | /gruendungsangebot/ | /farbpsychologie/ | /texterstellung/ | /website-check/ | /blog/ki-optimierung/ | /blog/webseite-braucht/ | /blog/morgen-weg/ |
|-----------------------------------|:----:|:-------------------:|:--------:|:-------------------:|:-----------------:|:----------------:|:---------------:|:---------------------:|:-----------------------:|:-----------------:|
| Webdesign Limburg                 |  –   |         **P**       |    –     |         –           |         –         |        –         |        –        |          –            |            –            |         –         |
| Webseite KMU / kleine Unternehmen |  S   |          S          |    S     |         S           |         –         |        –         |        S        |          S            |            P            |         –         |
| BFSG-konforme Website             |  S   |          –          |    –     |         –           |         –         |        –         |       (?)       |          –            |            –            |         –         |
| Farbpsychologie Webdesign         |  –   |          –          |    –     |         –           |       **P**       |        –         |        –        |          –            |            –            |         –         |
| Webdesign im Abo                  |  –   |          –          |    S     |         S           |         –         |        –         |        –        |          –            |            –            |         –         |
| Website-Check kostenlos           |  S   |          –          |    –     |         –           |         –         |        –         |      **P**      |          –            |            –            |         –         |
| Handwerker-Website                |  S   |         (?)         |    –     |         –           |         S         |        –         |        –        |          –            |           (?)           |         –         |
| AI-Visibility / KI-Optimierung    |  S   |          S          |    S     |         –           |         –         |        –         |        –        |        **P**          |            –            |         –         |
| Webtexte / Copywriting            |  –   |          –          |    S     |         –           |         –         |       **P**      |        –        |          –            |            –            |         –         |
| Backup / Hosting-Sicherheit       |  –   |          –          |    –     |         –           |         –         |        –         |        –        |          –            |            –            |       **P**       |

### Lücken (Keyword ohne Landing)
- **"BFSG-konforme Website"** → nur als Bullet im Services-Schema auf Homepage. Keine dedizierte Landing, obwohl es Teil des Winning-Angles ist. Empfohlen: `/barrierefreiheit/` oder `/bfsg/`.
- **"Webdesign im Abo"** / **"Website-as-a-Service"** → Begriffe existieren nur in Prosa (preise, gruendungsangebot). Keine eigene Landing, obwohl es ein kaufentscheidendes Differenzierungsmerkmal ist.
- **"Handwerker Website"** / **"Webseite für Handwerker"** → nur in Prosa und Zielgruppe-Listen. Für lokale Handwerker-Suche (Maler, Elektriker…) fehlt eigene Landing. Branchen-Analyse hat das als Chance identifiziert.
- **"Arztpraxis Website"** → als Zielgruppe genannt, keine Landing. Passt zum Lead "Arztpraxis ohne Webseite" aus Brain.
- **"Umzugsunternehmen Website"** → Demo-Referenz (MoverPro) existiert, aber keine Landing-Seite als Trichter.

### Kannibalisierung
- **`/preise/` vs. `/gruendungsangebot/`**: Fast identische Struktur (Dark-Hero → 3 Pakete → gleicher H2-Text "Drei Pakete. Ein Ziel: Ihr Erfolg."), beide Sitemap-Priorität 0.9, beide im Hauptmenü. Lösung: `/gruendungsangebot/` sollte eine zeitlich befristete Kampagnen-Landing bleiben (`robots: noindex` nach Ablauf oder 301 → /preise/#fruehbucher), während `/preise/` die evergreen Konversions-Seite ist.
- **Homepage H1 "Ihre nächsten Kunden suchen Sie gerade."** vs. **/webdesign-limburg/ H1 "Ihre Kunden in Limburg suchen Sie online."** — kein klassischer Konflikt, aber Formulierungen redundant ohne dass Homepage "Limburg" aufgreift. Lösung: Homepage-H2 oder USP-Subline sollte "in Limburg und DACH-weit" enthalten.

---

## 2. Heading-Struktur (Audit)

### Regel-Check pro Seite

| Seite                   | H1                                              | H1-Count | H1→H2 sauber | Sprünge? | Kommentar |
|-------------------------|-------------------------------------------------|:--------:|:------------:|:--------:|-----------|
| `/` (Homepage)          | "Ihre nächsten Kunden suchen Sie gerade."       | 1        | ✓            | nein     | OK. H1 enthält keine Keywords (Intent ja, Begriffe nein). |
| `/webdesign-limburg/`   | "Ihre Kunden in Limburg suchen Sie online."     | 1        | ✓            | nein     | Stark: lokaler Keyword direkt in H1. |
| `/preise/`              | "Ihre Website ist nur der Anfang. Die Betreuung macht den Unterschied." | 1 | ✓ | nein | Kein Keyword "Preise/Leistungen/Pakete" in H1 — nur im Eyebrow-Badge. |
| `/gruendungsangebot/`   | "Ihre neue Website — zum halben Preis."         | 1        | ✓            | nein     | Eyebrow "Gründungsangebot · April 2026" nur als span, nicht als Heading. |
| `/farbpsychologie/`     | "Farbe ist Strategie. Kein Geschmack."          | 1        | ✓            | nein     | H1 liegt in `HeroBranchen.tsx` — leicht zu übersehen. Keyword "Farbpsychologie" nur im Eyebrow, nicht in H1. |
| `/texterstellung/`      | "Ihre Website sieht gut aus. Aber sie verkauft nicht." | 1 | ✓ | nein | Kein Keyword "Texterstellung/Webtexte" in H1. |
| `/website-check/`       | "Wie gut ist Ihre Website wirklich?"            | 1        | ✓            | nein     | Frage-Format = gut für Featured Snippets, aber Keyword "Website-Check" fehlt in H1. |
| `/blog/`                | "Wissen, das Ihnen weiterhilft"                 | 1        | ✓            | nein     | Generic. Könnte "Webdesign-Blog" enthalten. |
| `/blog/[slug]/`         | Post-Titel dynamisch                            | 1        | ✓            | nein     | OK. |
| `/agb/`                 | "Allgemeine Geschäftsbedingungen"               | 1        | ✓            | nein     | OK (Legal). |
| `/impressum/`           | "Impressum"                                     | 1        | ✓            | nein     | OK (Legal). |
| `/datenschutz/`         | "Datenschutzerklärung"                          | 1        | ✓            | nein     | Nutzt Hx-Defaults ohne Level-Klasse, aber gerendert ok. |

**Ergebnis:** Hierarchie ist überall sauber — keine H1→H3-Sprünge, kein Multi-H1. **ABER**: 6 von 10 Landingpages haben kein Keyword in der H1 (preise, gruendungsangebot, farbpsychologie, texterstellung, website-check, blog). Das ist semantisch OK (Intent-First), kostet aber Keyword-Match-Signal.

### H1 ↔ Title ↔ Description — redundant oder komplementär?

| Seite            | Redundanz-Risiko | Bewertung |
|------------------|:----------------:|-----------|
| Home             | niedrig          | H1 = Intent ("Ihre Kunden…"), Title = Brand + Value-Prop. Komplementär. |
| webdesign-limburg| niedrig          | H1 emotionalisiert ("suchen Sie online"), Title = Keyword-Match. Sehr gut. |
| preise           | mittel           | H1 + Title beide über "Betreuung" — Überschneidung, aber aus 2 Winkeln. OK. |
| gruendungsangebot| **hoch**         | H1 "zum halben Preis" + Title "zum halben Preis" = redundant. Title könnte Keyword "Website KMU" hinzufügen. |
| farbpsychologie  | niedrig          | H1 = Claim, Title = Thema + Claim. Ergänzen sich. |
| texterstellung   | mittel           | H1 "verkauft nicht" + Title "aus Besuchern Kunden machen" = gleiche Idee 2× formuliert. |
| website-check    | niedrig          | H1 = Frage, Title = Nutzenversprechen. Komplementär. |

---

## 3. Internal Linking (Graph)

### Zählung der eingehenden internen Links pro Ziel-Seite (aus `out/**/index.html`, **ohne Sitemap**, **ohne Breadcrumb-JSON**, nur tatsächliche `<a href>` im Body)

```
Ziel-Seite                  | Eingehende Links | Quelle
----------------------------+-----------------+------------------------------------------
/                           | 13              | Header-Logo + Kontakt-Button (jede Seite)
/preise/                    | 13              | Header-Nav + Footer-? (fehlt) — jede Seite via Desktop-Nav
/website-check/             | 14              | Header-Nav + Footer + Homepage-Teaser
/texterstellung/            | 13              | Header-Nav-Dropdown
/farbpsychologie/           | 13              | Header-Nav-Dropdown
/gruendungsangebot/         | 13              | Header-Nav-Dropdown + AnnouncementBanner
/blog/                      | 13              | Header-Nav + Footer-? (fehlt) + Blog-Posts zurück
/agb/                       | 12              | Footer
/impressum/                 | 12              | Footer
/datenschutz/               | 12              | Footer
/webdesign-limburg/         | **0** (!)       | ❌ ORPHAN
/blog/ki-optimierung-.../   | 1               | /blog/
/blog/warum-jedes-.../      | 1               | /blog/
/blog/was-passiert-wenn-.../| 1               | /blog/
```

### Orphan Pages

- **`/webdesign-limburg/`** — KRITISCH. Keine eingehenden Links. Nicht in Nav, nicht in Footer, nicht im Homepage-Hero, nicht auf /preise/, nirgends.

### Blog → Leistungsseiten-Verlinkung

Blog-Posts verlinken ausschließlich auf Hash-Anchors der Homepage:

```
ki-optimierung-was-ist-das.md             →  /#leistungen
warum-jedes-kleine-unternehmen-...md      →  /#kontakt
was-passiert-wenn-ihre-webseite-...md     →  /#kontakt
```

**Null** Links zu `/preise/`, `/farbpsychologie/`, `/texterstellung/`, `/website-check/`, `/webdesign-limburg/`. Für SEO-Relevanz und PageRank-Fluss ist das verschenktes Potenzial. Beispiele für natürliche Verlinkungen:
- "KI-Optimierung" → müsste auf die Landing verlinken (existiert nicht — neue Landing wäre sinnvoll)
- "Backup-Check anfordern" → sollte auf `/website-check/` verlinken (aktuell: `/#kontakt`)
- "Webseite für kleine Unternehmen" (aus webseite-braucht.md) → `/preise/` oder `/gruendungsangebot/`

### Landingpages untereinander

- `/preise/` → verlinkt (außer Nav) **nicht** auf `/farbpsychologie/`, `/texterstellung/`, `/website-check/`, `/webdesign-limburg/`.
- `/farbpsychologie/` → keine Links auf `/preise/` oder Pakete.
- `/texterstellung/` → hat einen Kontakt-Anchor, sonst nichts.
- `/gruendungsangebot/` → keine Cross-Links.

Alle Landingpages sind inhaltliche Silos. Ein kurzer "Das könnte auch interessant sein"-Block oder inline Verweise (z.B. im Farbpsychologie-Artikel → "passt zum Gründungsangebot" → `/gruendungsangebot/`) würde den Link-Flow deutlich verbessern.

### Footer — unvollständig

Aktueller Footer (src/components/Footer.tsx):
- Website-Check ✓
- AGB ✓
- Impressum ✓
- Datenschutz ✓
- Cookie-Einstellungen ✓

**Fehlt im Footer:**
- Leistungen & Preise
- Blog
- Webdesign Limburg (würde das Orphan-Problem sofort lösen)
- Farbpsychologie
- Texterstellung
- Kontakt (existiert nur als Anchor in Header)

Ein Sitemap-Footer mit 3 Spalten (Leistungen / Ressourcen / Rechtliches) wäre ein massiver SEO-Win bei ~30 min Aufwand.

---

## 4. Meta-Qualität pro Seite

Skala: 0 (katastrophal) — 10 (perfekt). Kriterien: Title-Länge (50–60 ideal), Description-Länge (150–160 ideal), Keyword-Einbau in beiden, Unique-OG-Image, CTR-Anreiz.

| Seite                   | Title-Len | Desc-Len | Keyword in Title | Keyword in Desc | Unique OG-Image | CTR-Anreiz | **Score** |
|-------------------------|:---------:|:--------:|:----------------:|:---------------:|:---------------:|:----------:|:---------:|
| `/` (Homepage)          | 51 ✓      | 121 ⚠    | teilweise        | ✓               | ✗ (generic)     | ⚠          | **6/10**  |
| `/webdesign-limburg/`   | 68 ⚠      | 185 ❌   | ✓✓ (stark)       | ✓✓              | ✗               | ✓          | **7/10**  |
| `/preise/`              | 69 ⚠      | 164 ⚠    | ⚠ (schwach)      | ✓               | ✗               | ✓✓ ("ab 0€") | **7/10**|
| `/gruendungsangebot/`   | 64 ⚠      | 191 ❌   | ✓                | ✓✓              | ✗               | ✓✓ (Urgency)| **7/10** |
| `/texterstellung/`      | 80 ❌     | 158 ✓    | ✓                | ✓               | ✗               | ✓          | **6/10**  |
| `/farbpsychologie/`     | 82 ❌     | 165 ⚠    | ✓✓               | ✓               | ✗               | ✓ (gratis Template) | **7/10** |
| `/website-check/`       | 41 ✓      | 153 ✓    | ✓                | ✓               | ✗               | ✓ (kostenlos) | **8/10** |
| `/blog/`                | 20 ✓      | 85 ⚠     | ⚠                | ✓               | ✗               | ⚠          | **5/10**  |
| `/agb/`                 | 19 ✓      | 131 ✓    | n/a              | n/a             | ✗               | n/a        | **7/10**  |
| `/impressum/`           | 25 ✓      | 118 ✓    | n/a              | n/a             | ✗               | n/a        | **7/10**  |
| `/datenschutz/`         | 27 ✓      | 89 ⚠     | n/a              | n/a             | ✗               | n/a        | **6/10**  |

### Häufigste Probleme
- **Titles zu lang** (texterstellung 80, farbpsychologie 82): werden in SERP abgeschnitten. Lösung: "| Michael Höger" kürzen auf "| Höger" oder ganz weglassen.
- **Descriptions zu lang** (webdesign-limburg 185, gruendungsangebot 191): werden auf ~160 Zeichen gekappt. Wichtiger CTA am Ende geht verloren.
- **OG-Image ist auf allen 11 Seiten identisch** (`/images/og-image.png`). Für Social-Media-Shares unverkennbar ein Own-Goal: Wer "Farbpsychologie" teilt, sieht das gleiche generische Bild wie wer "AGB" teilt. Unique OG-Images pro Landing sollten Pflicht sein (z.B. via `@vercel/og` oder statisch).
- **Description von `/datenschutz/` und `/blog/` zu kurz** (<100 Zeichen): verschenkt SERP-Real-Estate.

---

## 5. llms.txt + llms-full.txt — Qualitätscheck

### Existenz
- `out/llms.txt` — 57 Zeilen, vorhanden ✓
- `out/llms-full.txt` — 121 Zeilen, vorhanden ✓
- `robots.txt` referenziert beide ✓

### Vollständigkeits-Check — welche Seiten sind in llms-full.txt erfasst?

| Seite                       | In llms-full.txt erwähnt? | Qualität |
|-----------------------------|:-------------------------:|----------|
| Homepage (Leistungen, Garantie) | ✓                      | gut      |
| /webdesign-limburg/         | ❌                        | fehlt    |
| /preise/                    | teilweise (Preise-Block)  | unvollständig (3 Pakete fehlen) |
| /gruendungsangebot/         | ❌                        | fehlt komplett |
| /texterstellung/            | ❌                        | fehlt komplett |
| /farbpsychologie/           | ❌                        | fehlt komplett |
| /website-check/             | ✓ (inkl. URL)             | gut      |
| /blog/ (3 Artikel)          | ❌                        | fehlt komplett |
| FAQs                        | ✓ (5 Fragen)              | gut      |
| Referenzen (Schäferhof, MoverPro) | ✓                   | gut      |

### Named-Entity-Frequenz in llms-full.txt

```
Michael Höger:    7×
ChatGPT:          4×
Perplexity:       2×
Next.js:          2×
kleine Unternehmen: 3×
Limburg:          0× ❌
Farbpsychologie:  0× ❌
BFSG:             0× ❌
KMU:              0× ❌
Barrierefreiheit: 0× (nur als generische Kategorie)
```

### Interpretation
Der LLM-Kontext positioniert Michael als **generischen Webdesigner mit KI-Fokus**. Die vier Differenzierungsmerkmale aus dem Winning-Angle (Limburg / Farbpsychologie / BFSG / KMU-Preis) tauchen **überhaupt nicht** auf. Das erklärt zu einem großen Teil, warum der AI-Visibility-Check 0/20 Hits ergeben hat: Selbst wenn ein LLM die Seite crawlt und llms-full.txt priorisiert, findet es dort keine Fakten, die es in Antworten zu Perplexity-Fragen wie *"BFSG-konforme Webseite DACH"* oder *"Webdesigner Limburg"* einweben könnte.

### Kurz- vs. Lang-Qualität
- **llms.txt (Summary)**: Solide strukturiert (Überschriften-Hierarchie, Kontaktdaten, Leistungen, FAQ). Fehler: keine URLs zu Landings außer website-check.
- **llms-full.txt**: Nummerierung springt von "5. Website-Check" zu "7. Social Media" (Punkt 6 fehlt). Tech-Details am Ende sind für LLMs gut (erklärt warum er "von KI gefunden wird" überhaupt legitim behauptet).

---

## 6. AI-Visibility / LLM-Freundlichkeit

### FAQ-Schema-Abdeckung

| Seite            | FAQPage-Schema? | Sichtbare FAQ-Sektion? |
|------------------|:---------------:|:----------------------:|
| `/` (Homepage)   | ✓ (siteConfig.faq) | ✓ (`<Faq />`)        |
| /farbpsychologie/ | ✓               | ✓                      |
| /preise/         | ❌              | teilweise (Einzelpakete, keine FAQ-Sektion) |
| /gruendungsangebot/ | ❌           | ❌                      |
| /texterstellung/ | ❌              | ✓ ("Häufige Fragen" H2) — **Schema fehlt!** |
| /webdesign-limburg/ | ❌           | ❌                      |
| /website-check/  | ❌              | ❌                      |

**Fund:** `/texterstellung/` hat eine sichtbare FAQ-Sektion, aber **kein JSON-LD FAQPage-Schema** → Google/LLM erkennen die Q&A-Struktur nicht als FAQ. Quick-Fix.

### Fragen-Antworten-Struktur im Content (LLM-Freundlichkeit)

Bewertung: Nutzt die Seite das **Problem → Frage → Klare Antwort**-Muster, das LLMs gut zitieren können?

| Seite                | Muster vorhanden | Kommentar |
|----------------------|:----------------:|-----------|
| Homepage             | teilweise        | USP-Banner + Services sind Claims, keine klaren Q&As. |
| /website-check/      | ✓                | H1 ist selbst eine Frage. Stark. |
| /texterstellung/     | ✓                | Nutzt "Warum X? Weil Y." und FAQ. Stark. |
| /farbpsychologie/    | teilweise        | Essay-Stil mit Fußnote (Singh 2006) — wissenschaftlich, aber schwerer als Snippet zu extrahieren. |
| /preise/             | schwach          | Preistabellen — Daten ja, Fragen nein. |
| /gruendungsangebot/  | schwach          | Sales-Copy, kaum Q&A. |
| /webdesign-limburg/  | teilweise        | Nutzt rhetorische Fragen. |
| Blog-Posts           | ✓                | Gut strukturiert mit H2-Fragen. |

### Named Entities — Kontext-Dichte (globaler Site-Content)

- **"Michael Höger"**: ubiquitär, stark verankert ✓
- **"Limburg"**: Nur auf `/webdesign-limburg/` prominent. Auf Homepage nur in strukturierten Daten, nicht im sichtbaren Text. **Problem.**
- **"Next.js"**: Nur in llms-full.txt + Tech-Details. Nicht in Kundenansprache (korrekt, siehe Feedback "keine Fachbegriffe"). Für Dev-Peers aber im Blog/Fallstudien sinnvoll.
- **"Itten" / "Singh (2006)"**: Nur auf /farbpsychologie/. Gut — stützt E-E-A-T.
- **"BFSG"**: Homepage-Services-Block + Datenschutz, sonst fehlt fast überall. Keine BFSG-Landing.
- **"DSGVO"**: gut verteilt (Home, Datenschutz, Services).

### Fazit AI-Visibility
Die Site ist **technisch AI-ready** (Schema, llms.txt, semantisches HTML), aber **inhaltlich nicht auf die Fragen optimiert**, die ein LLM über hoeger.dev stellt. Ein Perplexity-Nutzer fragt z.B. "Welcher Webdesigner in Limburg kennt BFSG?" — dafür müsste die Site eine Seite haben, die genau das beantwortet. Hat sie nicht.

---

## 7. Sitemap & Robots

### `out/sitemap.xml`

14 URLs, alle relevanten Landingpages + Blog-Posts erfasst ✓.

**Probleme:**
- `lastmod`-Werte teilweise veraltet (Homepage 2026-04-03, Website-Check 2026-04-06) obwohl Content/Build neuer sind. Nicht kritisch, aber ein automatisches `lastmod` basierend auf Build-Date wäre sauberer.
- **/webdesign-limburg/ ist enthalten** — trotz Orphan-Status. Google indexiert die Seite, User kommen aber nie drauf → sehr schlechte CTR-Signale, potenzielles "Low-Quality Page"-Risiko langfristig.
- Kein `<image:image>`-Element. Für Blog-Posts mit Hero-Bildern wäre das ein Bonus.
- Kein `hreflang` — OK, da nur Deutsch.

### `out/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://hoeger.dev/sitemap.xml
```

**Bewertung:** Minimal, aber ausreichend. Nicht zu restriktiv ✓.

**Verbesserungsvorschläge (optional):**
- Expliziter `Allow: /llms.txt` + `Allow: /llms-full.txt` (redundant, aber Signal).
- AI-Bot-Policy explizit: aktuell alle zugelassen, das ist korrekt für die Strategie (AI-Visibility) — könnte aber explizit dokumentiert werden: `# GPTBot, Perplexity-Bot, ClaudeBot: allowed (strategic)`.
- Keine `Disallow: /api/` — aktuell gibt es keine `/api/`-Routen (statischer Export), also OK.

---

## 8. Top-10 SEO-Quick-Wins — Priorisiert

Bewertung: **Impact** (L/M/H), **Aufwand** (S/M/L in Stunden), **Schaden wenn nicht gemacht**.

| # | Quick-Win                                                                                          | Impact | Aufwand | Schaden sonst                               |
|---|---------------------------------------------------------------------------------------------------|:------:|:-------:|---------------------------------------------|
| 1 | **Orphan fixen**: `/webdesign-limburg/` in Header-Nav + Footer + Homepage-Content (USP-Banner oder About) verlinken | **H** | S (30 min) | Local-SEO tot, Seite droht deindexiert |
| 2 | **Homepage-Hero lokalisieren**: "Limburg" in H1 oder Subline einbauen ("…in Limburg und DACH-weit") | **H** | S (15 min) | "Webdesigner Limburg"-Ranking verschenkt  |
| 3 | **Footer-Sitemap**: 3-Spalten (Leistungen / Ressourcen / Rechtliches) statt 4 flacher Links       | **M**  | M (1h)    | PageRank-Fluss zu allen Landings bleibt schwach |
| 4 | **llms-full.txt erweitern**: Sektionen für Farbpsychologie, Texterstellung, BFSG, Webdesign Limburg, Gründungsangebot, Blog-Posts hinzufügen | **H** | M (1.5h) | AI-Visibility bleibt bei 0/20 |
| 5 | **Blog → Leistungen verlinken**: In jedem der 3 Blog-Posts 2–3 kontextuelle Links zu `/preise/`, `/website-check/`, `/farbpsychologie/` statt nur `/#kontakt` | **M** | S (30 min) | Kein Relevanz-Cross-Flow, Blog bleibt Insel |
| 6 | **FAQ-Schema auf /texterstellung/**: Vorhandene FAQ-Sektion mit JSON-LD FAQPage markieren        | **M**  | S (15 min)| Kein Rich Result, LLM ignoriert Q&As       |
| 7 | **Kannibalisierung auflösen**: `/gruendungsangebot/` nach Kampagnen-Ende auf `noindex` oder 301 → `/preise/#fruehbucher` | **M** | S (10 min nach Ende) | Google rät falsche Seite für Preis-Intent |
| 8 | **Unique OG-Images** für Top-5-Landings (farbpsychologie, webdesign-limburg, preise, website-check, texterstellung) | **M** | L (2h mit Template) | Social-Shares alle identisch, CTR leidet |
| 9 | **Descriptions kürzen** auf 150–160 Zeichen (webdesign-limburg, gruendungsangebot, farbpsychologie, texterstellung) | **L** | S (15 min) | CTA wird in SERP abgeschnitten       |
| 10 | **BFSG-Landing** neu bauen (`/barrierefreiheit/` oder `/bfsg-website/`) mit FAQPage-Schema und 800–1.200 Wörtern Content | **H** | L (4h) | BFSG-Winning-Angle bleibt im LLM unsichtbar |

### Bonus (Nice-to-have, nicht in Top-10)
- `sitemap.xml` auto-generieren aus `build`-Zeit statt manueller `lastmod`-Pflege.
- JSON-LD `LocalBusiness` zusätzlich zu `ProfessionalService` (hat expliziteres `openingHours`-Feld).
- `<image:image>` in Sitemap für Blog-Hero-Bilder (aktuell leer, also erst bei Blog-Redesign).
- `BlogPosting`-Schema um `wordCount` und `articleBody` erweitern.
- Breadcrumb-Schema auf Homepage + /farbpsychologie/ nachrüsten (aktuell fehlt es dort).

---

## 9. Scoring-Übersicht

| Dimension                  | Score | Kommentar                                               |
|----------------------------|:-----:|---------------------------------------------------------|
| Technisches SEO (Lighthouse) | 9/10 | aus Vorab-Audit, hier nicht nachgeprüft                |
| Keyword-Abdeckung          | 5/10  | große Lücken: BFSG, Handwerker, Webdesign im Abo       |
| Heading-Struktur           | 8/10  | Hierarchie sauber, aber Keywords fehlen oft in H1      |
| Internal Linking           | **3/10** | Orphan, keine Cross-Links, Blog isoliert           |
| Meta-Qualität              | 7/10  | solide, aber OG-Images identisch, manche Desc zu lang  |
| llms.txt / AI-Visibility   | **4/10** | Differenzierungs-Begriffe fehlen komplett         |
| Sitemap/Robots             | 8/10  | funktional, klein verbesserbar                         |
| **Gesamt (Content-SEO)**   | **6/10** | Solide Basis, aber Winning-Angle nicht im Content verankert |

Die Lighthouse-100 sind das technische Fundament — aber ein Lighthouse-Bot liest nicht, ob "Limburg" in der H1 steht oder ob `/webdesign-limburg/` verlinkt wird. Die 0/20-AI-Visibility-Hits spiegeln genau diese Content-Schwäche wider.

---

## 10. Anhang — Verwendete Dateien

**Analysiert:**
- `/Users/michaelhoger/Documents/Freelance/_business/website/src/app/**/page.tsx` (11 Seiten + blog/[slug])
- `/Users/michaelhoger/Documents/Freelance/_business/website/src/app/layout.tsx`
- `/Users/michaelhoger/Documents/Freelance/_business/website/src/components/*.tsx` (Hero, Header, Footer, Services, About, Faq, Contact, UspBanner)
- `/Users/michaelhoger/Documents/Freelance/_business/website/src/config/site.ts`
- `/Users/michaelhoger/Documents/Freelance/_business/website/content/blog/*.md` (3 Artikel)
- `/Users/michaelhoger/Documents/Freelance/_business/website/out/index.html` + `/out/**/index.html` (gerenderte HTML)
- `/Users/michaelhoger/Documents/Freelance/_business/website/out/sitemap.xml`
- `/Users/michaelhoger/Documents/Freelance/_business/website/out/robots.txt`
- `/Users/michaelhoger/Documents/Freelance/_business/website/out/llms.txt`
- `/Users/michaelhoger/Documents/Freelance/_business/website/out/llms-full.txt`

**Kontext (Brain):**
- ai_visibility_check_2026-04-18.md (0/20 Hits Baseline)
- branchen_analyse_dach_2026-04-20.md (Winning-Angle)

_Erstellt read-only — keine Code-Änderungen._
