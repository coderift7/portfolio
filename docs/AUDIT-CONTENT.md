# Content- & Copy-Audit hoeger.dev

**Datum:** 20.04.2026
**Auditor:** Doc
**Umfang:** `src/app/**/*.tsx`, `src/components/*.tsx`, `src/config/site.ts`, `content/**/*`
**Fokus:** Kundensprache, Jargon-Reduzierung, KI-Floskeln, CTA-Qualität, Blog-Qualität, Claim-Konsistenz

> **Read-only:** Keine Code-Änderungen vorgenommen. Dieses Dokument listet alle Fundstellen mit Umformulierungsvorschlägen zur manuellen Übernahme.

---

## 1. Executive Summary

**Gesamtbild:** Die Seite ist in Sachen Kundensprache **überdurchschnittlich gut** — Hero, USP-Banner, Services und FAQ sprechen in der Zielgruppen-Sprache ("KMU", nicht Agentur). Typische KI-Floskeln fast komplett abwesend (ein einziger Hit: "ganzheitlich" — aber bewusst als Negativ-Beispiel!). Die größten Schwächen:

| Problem | Härte | Wo |
|---|---|---|
| **Jargon "SEO" sichtbar in Kundentexten** | hoch | Website-Check Kategorien, Blog-Tags, preise/addons |
| **Jargon "SSL" in Paket-Features** | mittel | preise (Zeile 44), gruendungsangebot (Zeile 51 bereits entschärft zu "Verschlüsselung") |
| **Jargon "Responsive Design"** in Kundentext | mittel | website-check Zeile 94 |
| **Jargon "Core Web Vitals"** | hoch | website-check Zeile 74 |
| **Preis-Inkonsistenz Website-Check** | hoch | Paketseite (kostenlos) ↔ Brain sagt "25 EUR paid check" (Projekt-File) |
| **Duplicate Subheadline** Webdesign-Limburg vs. Home | mittel | beide: "Ihre Kunden … suchen Sie gerade/online" |
| **"Absenden"-Synonyme uneinheitlich** | niedrig | "Nachricht senden", "Wird gesendet…", "Jetzt anfragen", "Unverbindlich anfragen" |
| **CTA "Mehr erfahren" x2** | niedrig | CookieBanner, AnnouncementBanner |
| **Lieferzeit-Inkonsistenz** | mittel | Home ("14 Tage"), Preise ("ca. 2 Wochen"), Gründungsangebot (identisch zu Preisen) |

**Priorität:** Die Jargon-Treffer "SEO" und "SSL" in öffentlich sichtbaren Paket-Listen sofort ersetzen; die Duplicate-Subheadline zwischen Home und Webdesign-Limburg entzerren; Blog-Posts um FAQ-Blöcke erweitern für bessere AI-Zitierbarkeit.

---

## 2. Jargon-Tabelle

**Regel aus `feedback_keine_fachbegriffe.md`:** Kundentexte ohne IT-Jargon (kein SEO, CI, SSL, CMS, API, etc.).

**Einordnung:** Fail = sichtbar für KMU-Kunden in Hero/Preise/CTA. OK-aber-anfassen = in Fachkontext (Blog für Vergleich, Metadaten für Crawler). OK = technisch unvermeidbar (Impressum, Datenschutz).

| Begriff | Datei:Zeile | Kontext | Einordnung | Umformulierungsvorschlag |
|---|---|---|---|---|
| **SEO** | `config/site.ts` page.tsx:29 | "Freelancer für Webdesign, SEO und KI-Optimierung" (Schema, hidden für Nutzer) | OK (nur Schema) | Für Person-Schema OK lassen. |
| **SEO** | `app/page.tsx:76` | `serviceType` im Schema | OK (Schema) | Lassen, crawlerseitig. |
| **SEO** | `app/webdesign-limburg/page.tsx:45` | `keywords` Meta | OK | Lassen. |
| **SEO** | `app/webdesign-limburg/page.tsx:84` | `serviceType` Schema | OK | Lassen. |
| **SEO** | `app/webdesign-limburg/page.tsx:343` | HTML-Kommentar `{/* Local SEO Text */}` | OK | Lassen (Kommentar, nicht sichtbar). |
| **SEO** | `app/layout.tsx:66` | Global `keywords` | OK | Lassen. |
| **SEO** | `app/website-check/page.tsx:19,28,43,54,78,154` | **Sichtbarer Kategorie-Titel "SEO" + Copy** | **FAIL** | Titel: "Sichtbarkeit bei Google". Copy: "Werden Sie bei Google gefunden?" |
| **SEO** | `app/blog/page.tsx:12,17` | Blog-Description | mittel | "Tipps rund um Webdesign, Sichtbarkeit bei Google und KI-Auffindbarkeit" |
| **SEO** | `app/datenschutz/page.tsx:217` | "Performance, SEO, Sicherheit" (Erklärung Website-Check) | mittel | "Performance, Auffindbarkeit bei Google, Sicherheit" |
| **SEO** | `content/blog/ki-optimierung-was-ist-das.md:7,29` | Tag + Vergleichstabelle-Header "Google SEO" | **OK im Blog-Vergleich** | In der Tabelle ist "Google SEO" vs. "KI-Optimierung" als Fachvergleich legitim. Tag "SEO" → "Sichtbarkeit" erwägen. |
| **SSL** | `app/preise/page.tsx:44` | **Paket-Feature "Sichere Verbindung (SSL)"** | **FAIL** | "Sichere Verbindung (Verschlüsselung)" — so wie bereits im Gründungsangebot Zeile 51 formuliert. Einheitlich ziehen. |
| **SSL** | `app/preise/page.tsx:131` | Betreuung-Paket "Webhosting, SSL, Backups, …" | **FAIL** | "Webhosting, Verschlüsselung, Backups, Ausfall-Überwachung, Sicherheitsupdates, Domain-Verwaltung." |
| **SSL** | `app/website-check/page.tsx:84` | "SSL-Zertifikat, Security-Header und bekannte Schwachstellen" | **FAIL** | "Verschlüsselung, Schutz-Maßnahmen und bekannte Schwachstellen — damit Besucherdaten sicher übertragen werden." |
| **Hosting** | `app/preise/page.tsx:130,137,235,454` | "Hosting & Wartung" Paketname, Trust-Bar, Hinweisblock | **grenzwertig** | "Hosting" ist als Begriff im DACH-Mittelstand weitgehend eingedeutscht. Trotzdem Alternativ-Vorschlag: "Unterbringung im Internet" nicht nötig — aber "Hosting & Wartung" → **"Technik-Betreuung"** wäre kundennäher. Mindestens bei 454 ausformulieren: "Unterbringung auf meiner professionellen Infrastruktur". |
| **Hosting** | `app/gruendungsangebot/page.tsx:338` | Footer-Hinweis | OK | Akzeptabel, da Preisdetail. |
| **Hosting** | `app/datenschutz/page.tsx:68,69,74,97,99,109,115,144,187,217,232` | Rechtstext | OK | Datenschutz-Kontext, fachlich korrekt erforderlich. |
| **Hosting** | `content/blog/was-passiert-wenn-ihre-webseite-morgen-weg-ist.md` durchgehend | Blog-Thema | OK (Blog) | Blog erklärt das Thema, Jargon ist Teil des Gegenstands. |
| **Responsive** | `app/website-check/page.tsx:94` | "Responsive Design und Touch-Optimierung" | **FAIL** | "Funktioniert auf Handy, Tablet und Computer — über 60 % Ihrer Besucher kommen vom Handy." |
| **CTA** | `app/preise/page.tsx:301,466` | HTML-Kommentar `{/* CTA */}` | OK (Kommentar) | Lassen. |
| **CTA** | `app/farbpsychologie/page.tsx:63,425` | HTML-Kommentar + im Fließtext: "Ein Komplementär-CTA springt aus jeder Seite heraus" | grenzwertig | Die Farbpsychologie-Seite richtet sich an designaffine Kund:innen — "CTA" ist hier vertretbar. Alternativ: "Ein Klick-Button in der Komplementärfarbe…". |
| **CTA** | `app/farbpsychologie/page.tsx:142,267,437` (FAQ + 60-30-10 + Footer) | "CTAs, Highlights" im Regel-Text | grenzwertig | Bleiben lassen — Zielgruppe versteht. Alternativ "Klick-Elemente". |
| **CTA** | `app/texterstellung/page.tsx:440`, `app/gruendungsangebot/page.tsx:320` | HTML-Kommentar | OK | Lassen. |
| **Core Web Vitals** | `app/website-check/page.tsx:74` | "Ladezeit, Core Web Vitals und Geschwindigkeitsoptimierung" | **FAIL** | "Ladezeit und Geschwindigkeit — langsame Seiten verlieren Besucher." Der Begriff "Core Web Vitals" bringt dem KMU nichts. |
| **Meta-Tags** | `app/website-check/page.tsx:79` | "Meta-Tags, Überschriften-Struktur, indexierbare Inhalte" | **FAIL** | "Seitentitel, Überschriften-Struktur, für Google lesbare Inhalte" |
| **WCAG** | `app/website-check/page.tsx:89` | "WCAG-Konformität und BFSG-Anforderungen" | grenzwertig | "Barrierefreiheits-Richtlinie (BFSG) — seit 2025 für viele Webseiten Pflicht." WCAG weglassen oder in Klammer. |
| **WCAG 4.5:1** | `app/farbpsychologie/page.tsx:146` | FAQ-Eintrag "Was bedeutet WCAG 4.5:1?" | **OK** | FAQ erklärt den Begriff — bildungs-Format, passt. |
| **JSON-LD / Schema.org / llms.txt / Backlinks / Mobile-First** | `content/blog/ki-optimierung-was-ist-das.md:18-36` | Vergleichstabelle | OK im Blog | Blog ist pädagogisch. Ggf. "Schema.org Markup" → "maschinenlesbare Daten" — passt schon so (Zeile 22). |
| **Security-Header** | `app/website-check/page.tsx:84` | siehe SSL | **FAIL** | siehe oben — komplett entjargonisieren. |
| **Cookie-Consent** | `app/website-check/page.tsx:99` | "Impressum, Datenschutz, Cookie-Consent" | grenzwertig | "Cookie-Hinweis" ist verständlicher. |
| **Launch** | `app/gruendungsangebot/page.tsx:308`, `app/preise/page.tsx:215` ("Qualitätsprüfung vor Launch") | Ablauf-Schritt | grenzwertig | "Launch" → "Start" oder "Veröffentlichung". |
| **Handover** | `app/gruendungsangebot/page.tsx:215` "Handover mit allen Zugängen" | **FAIL** | "Übergabe aller Zugänge" oder "Komplette Übergabe an Sie". |

**Sonderfall Blog-Post `ki-optimierung-was-ist-das.md`:** Hier kollidieren zwei Welten. Der Titel "KI-Optimierung" nutzt der Kunde selbst nicht — aber der Blog ERKLÄRT den Begriff. Für SEO/GEO-Sichtbarkeit ist das genau richtig (Long-Tail-Keyword). Lassen.

**Sonderfall `farbpsychologie/page.tsx`:** Diese Leistungsseite hat eine designaffinere Zielgruppe (Selbstständige mit Gestaltungs-Bewusstsein). Begriffe wie "CTA", "Akzent", "Palette", "Sektion" sind akzeptabel. **Einziger echter Grenzfall:** "Sweet Spot" (Zeile 96) — evtl. "die goldene Mitte". Minor.

**Nicht gefunden:** CI/CD, DevOps, UX, UI, Framework, Stack, Backend, Frontend, TLS, DNS, API. Gut!

---

## 3. KI-Floskel-Liste

Gesucht nach typischen ChatGPT-Phrasen:

| Floskel | Vorkommen | Bewertung |
|---|---|---|
| "in der heutigen digitalen Welt" | **0** | Sauber. |
| "nahtlos" | **0** | Sauber. |
| "ganzheitlich" | **1x** in `texterstellung/page.tsx:259` | **OK — bewusst als Negativbeispiel zitiert** ("Wir bieten individuelle und ganzheitliche Fitness-…"). Das ist genau der richtige didaktische Einsatz. |
| "erleben Sie" / "entdecken Sie die Welt von" | **0** | Sauber. |
| "Ihr Erfolg ist unser Erfolg" | **0** | Sauber. Stattdessen konkrete Sätze wie "Drei Pakete. Ein Ziel: Ihr Erfolg." (preise/gruendungsangebot) — grenzwertig, aber akzeptabel, weil spezifisch. |
| "revolutionär" / "state of the art" | **0** | Sauber. |
| "maßgeschneidert" | **0** | Sauber. |
| "individuelle Lösungen" | **1x** in `content/texterstellung-leistungsseite.md:36` (als Negativ-Zitat) | **OK**, didaktisch. |
| "aus einer Hand" | **1x** in `Services.tsx:31` ("Alles aus einer Hand — von der Webseite bis zur ersten Kundenanfrage") | Akzeptabel, aber klischeehaft. **Vorschlag:** "Ein Ansprechpartner für alles: von der Idee bis zur ersten Kundenanfrage." |
| "passgenau" | **2x** in `texterstellung/page.tsx:411`, `content/texterstellung-leistungsseite.md:128` | grenzwertig, aber in Kombi-Angebot kontextuell fundiert ("kein Hin-und-Her, kein Copy-Paste aus alten Unterlagen"). Lassen. |
| "Mehrwert" | nur in `content/texterstellung-leistungsseite.md:4` als Meta-Tonalitäts-Hinweis | OK (ist Arbeits-Anweisung an mich selbst) |
| "reibungslos / innovativ / synergetisch / zukunftsweisend" | **0** | Sauber. |

**Bewertung:** Exzellente KI-Hygiene. Die einzigen Treffer sind bewusste Negativbeispiele zur Abgrenzung — didaktisch wertvoll. Score: **9/10**.

---

## 4. Duplicate-Content-Matrix

### 4.1 Hero-Subheadlines

| Seite | Subheadline | Duplikat-Risiko |
|---|---|---|
| Home (`site.ts:26`) | "Die Frage ist nur: Finden sie Sie — oder Ihre Konkurrenz? Ich baue Webseiten, die bei Google und sogar bei ChatGPT gefunden werden — als Webdesign im Abo…" | — |
| Webdesign-Limburg (`webdesign-limburg/page.tsx:163`) | "Finden sie Ihr Geschäft — oder das der Konkurrenz? Ich baue Webseiten für kleine Unternehmen in Limburg und Umgebung, die bei Google gefunden werden und Anfragen bringen. Persönlich, zum Festpreis, in 14 Tagen online." | **~65 % textliche Überlappung** mit Home. Beide verwenden das "Konkurrenz-Narrativ" fast identisch. |
| Website-Check (`website-check/page.tsx:152`) | "Finden Sie in wenigen Minuten heraus, wie Ihre Website bei Performance, SEO, Sicherheit und Barrierefreiheit abschneidet — kostenlos und unverbindlich." | unique |
| Texterstellung (Zeile 205) | "Das liegt meistens an den Texten. Ich schreibe für Ihre Website — so, wie Ihre Kunden denken und suchen." | unique |
| Gründungsangebot (Zeile 174) | "Ich starte mein Webdesign-Business und suche Gründungskunden, die von professioneller Qualität zum Einstiegspreis profitieren möchten…" | unique |
| Farbpsychologie (`HeroBranchen.tsx:66`) | "Jede Branche hat ihre eigene Farb-Erwartung. Wer sie bricht, verliert Vertrauen — oder gewinnt Aufmerksamkeit." | unique |

**Empfehlung:** Webdesign-Limburg entzerren. Z.B.: "Limburger Unternehmen verlieren täglich Kunden an bessere Google-Einträge der Konkurrenz. Ich baue Ihnen eine Webseite, die das ändert — persönlich betreut, zum Festpreis, in 14 Tagen online."

### 4.2 Wiederkehrende Claims (Cross-Page-Matrix)

| Claim | Home | Preise | Limburg | Gründungsangebot | Texterstellung | Farbpsychologie |
|---|---|---|---|---|---|---|
| "auch von ChatGPT gefunden" | ✓ (Hero, Services, USP) | — | ✓ (Benefit 4) | ✓ (Features P1,P2) | — | — |
| "14 Tage / 2 Wochen bis online" | ✓ (about.stats "14 Tage") | ✓ (Paket 1: "ca. 2 Wochen") | ✓ (Hero: "in 14 Tagen online") | ✓ (P1: "Lieferzeit ca. 2 Wochen") | — | — |
| "Festpreis, keine versteckten Kosten" | ✓ (about.stats "100%") | ✓ (Trust-Bar) | ✓ (Benefit 3) | ✓ (Trust-Bar) | — | — |
| "Persönlicher Ansprechpartner" | ✓ (Service 6, About) | ✓ (Trust-Bar, Hinweis) | ✓ (gesamte Seite) | ✓ (Trust-Bar) | — | — |
| "DSGVO-konform" | ✓ (Service 5) | ✓ (Trust-Bar) | — | ✓ ("Datenschutz inklusive") | — | — |
| "Drei Pakete. Ein Ziel: Ihr Erfolg." | — | ✓ (Zeile 245) | — | ✓ (Zeile 202) | ✓ ähnlich ("Drei Pakete. Klare Preise.") | — |

**Bewertung:** Wiederholung der Kern-Claims ist **konsistent** und **gewollt** — schafft Wiedererkennung. Einzige echte Dopplung, die stört: die "suchen Sie gerade/online"-Hero-Phrase Home↔Limburg. Der Rest ist okay.

### 4.3 Identische Abschnitte (Copy-Paste)

| Überschrift/Satz | Vorkommen |
|---|---|
| "Drei Pakete. Ein Ziel: Ihr Erfolg." | `preise:245`, `gruendungsangebot:202` — **identisch**. OK, da verschiedene Preistabellen. |
| "Unverbindlich anfragen" (Button) | texterstellung (3x), gruendungsangebot (1x), preise (1x) — **konsistent**. |
| "Jetzt anfragen" (Button) | preise:315, texterstellung:398, gruendungsangebot:273. **Konsistent, aber hart (siehe CTA-Abschnitt)**. |

---

## 5. Call-to-Action-Qualität

### 5.1 Inventar (alle sichtbaren Button/Link-Labels)

| # | Label | Wo | Typ | Bewertung |
|---|---|---|---|---|
| 1 | "Kostenlos beraten lassen" | Hero (site.ts:27), Limburg | primär | **stark** — konkret, klares Angebot |
| 2 | "Beispiele ansehen" | Hero secondary | sekundär | gut — neugierigmachend |
| 3 | "Nachricht senden" | Contact (site.ts:115) | primär | ok — funktional |
| 4 | "Jetzt anfragen" | preise, texterstellung, gruendungsangebot (Paketkarten) | primär | **mittel** — etwas generisch. Alternative: "Paket besprechen" / "Diesen Weg gehen" |
| 5 | "Unverbindlich anfragen" | preise:477, texterstellung:213,451, gruendungsangebot:328 | primär | gut — reduziert Druck-Gefühl |
| 6 | "Jetzt Platz sichern" | gruendungsangebot:352 (Sticky) | primär | **stark** — Urgency passt zu 5-Plätze-Story |
| 7 | "Direkt anrufen" | Limburg Hero | sekundär | **stark** — konkrete Alternative |
| 8 | "Mehr erfahren" | CookieBanner:44 (Link zu Datenschutz) | tertiär | **schwach** — der Klassiker. Alternative: "Datenschutz lesen" |
| 9 | "→ Mehr erfahren" | AnnouncementBanner:37 | tertiär | **schwach**. Alternative: "Angebot ansehen" oder "5 Plätze — jetzt sichern". Der Button steht direkt neben "Website zum halben Preis — nur 5 Plätze", also reicht weniger. |
| 10 | "Color-Briefing gratis laden (PDF)" | Farbpsychologie:386, HeroBranchen:89 | primär | **exzellent** — konkret, Wert klar |
| 11 | "Lieber persönlich besprechen" | Farbpsychologie:388 | sekundär | **exzellent** — menschlich |
| 12 | "Kostenlose Erstberatung" / "Kostenlose Erstberatung anfragen →" | Farbpsychologie:92, :434 | primär | gut |
| 13 | "Jetzt kostenlos prüfen" | WebsiteCheckTeaser:47 | primär | gut |
| 14 | "Nachricht gesendet!" / "Wird gesendet…" | Contact States | — | ok |
| 15 | "Weitere Beiträge" | blog/[slug]:164 | zurück-Nav | gut |
| 16 | "Projekt ansehen" | Limburg Schäferhof | tertiär | gut |
| 17 | "Kostenlosen Backup-Check anfordern" | Blog was-passiert:84 | primär | **stark** — themenspezifisch |
| 18 | "Mehr erfahren →" | Blog ki-optimierung:44 | tertiär | **schwach** — im Blog-Kontext. Alternative: "Was ich bei Ihrem Projekt mitliefere →" |
| 19 | "Kostenlos beraten lassen →" | Blog warum-jedes:38 | primär | gut |
| 20 | "Banner schließen" / "Nicht ausfüllen" | a11y | — | ok (aria-Labels) |
| 21 | "Weiter scrollen" | Hero Scroll-Hint | aria | ok |
| 22 | "Cookies akzeptieren / ablehnen" | CookieBanner | primär | gut, Standard |
| 23 | "Bereit? Lassen Sie uns sprechen." → Button "Unverbindlich anfragen" | preise:468 | primär | gut |
| 24 | "Bereit? Sichern Sie sich Ihren Platz." → Button "Unverbindlich anfragen" | gruendungsangebot:322 | primär | **mittel** — Headline verspricht "Platz sichern", Button sagt "anfragen". Buttontext → "Platz sichern" würde ziehen. |
| 25 | "Klingt interessant?" → "Unverbindlich anfragen" | texterstellung:442 | primär | gut |

### 5.2 Konkrete Upgrade-Vorschläge

| Schwach | Stark |
|---|---|
| "Mehr erfahren" (CookieBanner) | "Datenschutz lesen" |
| "→ Mehr erfahren" (AnnouncementBanner) | "5 Plätze sichern" / "Angebot ansehen" |
| "Mehr erfahren →" (Blog ki-optimierung:44) | "So baue ich Ihre Webseite KI-fit →" |
| "Jetzt anfragen" (Paketkarten) | "Paket besprechen" / "Dieses Paket anfragen" (macht klar, welches) |
| "Unverbindlich anfragen" (gruendungsangebot Final CTA 328) | "Platz sichern — kostenloses Gespräch" |
| "Nachricht senden" (Contact-Form) | "Nachricht senden" ist ok, aber "Jetzt Gespräch anstoßen" wäre stärker |

### 5.3 Nicht gefunden
"Hier klicken", "Absenden", "Click", "Submit" — alles sauber umschifft. 

---

## 6. Blog-Post-Qualität

Methodik: Scanbarkeit (H2/H3/Listen), Wort-Anzahl, FAQ-Blöcke, konkrete CTA, AI-Zitier-Fähigkeit (klare Fakten-Statements, TL;DR, nummerierte Listen).

| Post | Wörter | H2 | H3 | Listen | FAQ | CTA | Score (0-10) |
|---|---|---|---|---|---|---|---|
| `ki-optimierung-was-ist-das.md` | 289 | 4 | 0 | ✓ (Vergleichstabelle + 4-Bullet-Liste) | – | schwach ("Mehr erfahren") | **6.0** |
| `warum-jedes-kleine-unternehmen-eine-webseite-braucht.md` | 321 | 4 | 0 | ✓ (5-Bullet, 2 fettgedruckte Alternativen) | – | stark ("Kostenlos beraten lassen") | **6.5** |
| `was-passiert-wenn-ihre-webseite-morgen-weg-ist.md` | 837 | 6 | 0 | ✓ (Fragen-Listen, Checklisten) | implizit (3 Fragen + Liste) | stark ("Kostenlosen Backup-Check anfordern") | **8.5** |

### Detail-Bewertung

**Post 1 — KI-Optimierung (Score 6.0)**
- **Stärken:** Klare Vergleichstabelle (Google SEO vs. KI-Optimierung) — perfekt für AI-Zitate. Einstiegs-Szenario "Kunde fragt ChatGPT".
- **Schwächen:** Nur 289 Wörter — für GEO-Sichtbarkeit zu dünn. Kein FAQ-Block, kein TL;DR. CTA "Mehr erfahren" generisch. Kein klarer Handlungsaufruf, was genau der Leser jetzt tun soll.
- **Fixes:** (a) FAQ-Block mit 3–4 Fragen ("Brauche ich das schon jetzt?", "Was kostet KI-Optimierung extra?"). (b) TL;DR-Box oben. (c) CTA spezifizieren: "Prüfen Sie meine kostenlose Website-Analyse — inklusive KI-Sichtbarkeits-Check". (d) 1–2 konkrete Zahlen einbauen ("Laut Gartner werden bis 2027 …"). Ziel: 600–800 Wörter.

**Post 2 — Warum jedes kleine Unternehmen eine Webseite braucht (Score 6.5)**
- **Stärken:** Klares Preismodell erklärt (ab 0 € Abo vs. einmalig), Checkliste "Was eine gute Webseite mitbringen muss", starke Eröffnung ("80 % aller Kaufentscheidungen").
- **Schwächen:** Kein FAQ-Block. Keine Zwischen-Headlines (H3). Zahl "80 %" unbelegt — Haftungsrisiko (`feedback_haftungsrisiken_vermeiden`). 321 Wörter zu dünn für Ranking zu Long-Tail "Webseite kleines Unternehmen".
- **Fixes:** (a) Quelle für 80 %-Zahl nennen oder entschärfen ("Die meisten …"). (b) FAQ mit "Brauche ich eine Webseite, wenn ich nur lokal arbeite?", "Reicht Google Unternehmensprofil nicht?". (c) Mini-Case ("Ein Handwerker in Limburg …") einstreuen. Ziel: 700 Wörter.

**Post 3 — Was passiert, wenn Ihre Webseite morgen weg ist (Score 8.5) — BEST IN CLASS**
- **Stärken:** 837 Wörter Deep-Dive, drei konkrete Prüf-Fragen als Vorlage, klare "3-2-1-Regel" ohne Jargon-Overkill, konkret-actionable CTA (Backup-Check), starke narrative Eröffnung ("Der Anruf, den niemand bekommen will"). Für AI-Zitierbarkeit ideal: nummerierte Fragen, klare Aussagen.
- **Schwächen:** Kein formaler FAQ-Block (implizit vorhanden, aber nicht als `## FAQ`-Struktur). "Einer der größten Hoster Europas" bei Brand-Vorfall anonymisiert — juristisch klug, aber konkret wäre stärker. Keine H3-Zwischenebene bei der "Drei-Fragen"-Sektion (stattdessen bold) — AI-Parser lesen H-Tags besser.
- **Fixes:** (a) Die drei Fragen als H3 aufziehen. (b) Expliziter `## Häufige Fragen`-Block am Ende mit 3 Fragen. (c) Optional: Meta-Liste "Zusammenfassung" als 5-Punkt-TL;DR oben.

### Scanbarkeit-Gesamt
Alle drei Posts bestehen den Scan-Test (H2 vorhanden, Listen vorhanden, Fettungen gezielt). **Aber:** Keiner hat eine H3-Hierarchie — alle nutzen nur H2 + bold. Für längere Posts (>500 W) wäre H3 sinnvoll, besonders für AI-Parser (Perplexity, ChatGPT Search) die hierarchisch extrahieren.

### Empfohlene Blog-Prio
1. **Post 1** um FAQ + 300 W erweitern → springt auf ~8.0.
2. **Post 2** um FAQ + Case + Quellen → ~8.0.
3. **Post 3** formale FAQ-Section ergänzen → 9.5.

---

## 7. Claim-Konsistenz-Check

### 7.1 Preise

| Position | Preise-Seite | Gründungsangebot | Home/siteConfig | Blog | Konsistent? |
|---|---|---|---|---|---|
| Paket 1 regulär | **990 €** (Z. 36) | 990 € regulär (Z. 36) | — | 990–3.490 € Range (Post 2) | ✓ |
| Paket 2 regulär | **1.990 €** (Z. 55) | 1.990 € (Z. 60) | — | im Range | ✓ |
| Paket 3 regulär | **3.490 €** (Z. 77) | 3.490 € (Z. 85) | — | im Range | ✓ |
| Gründungspreis P1 | — | **495 €** | — | — | Nur Gründung. ok. |
| Gründungspreis P2 | — | **995 €** | — | — | ok |
| Gründungspreis P3 | — | **1.745 €** | — | — | ok |
| Hosting & Wartung | 20 €/Mo (Z. 132) | — | — | "20–149 Euro" (Post 2) | ✓ |
| Basis | 59 €/Mo | — | — | im Range | ✓ |
| Business | 99 €/Mo | — | — | im Range | ✓ |
| Premium | 149 €/Mo | — | — | "20–149" ✓ | ✓ |
| Stundensatz | 75 €/h (Z. 162) | — | — | 75 €/h in texterstellung:123 FAQ | ✓ |
| Texterstellung Starter | "ab 350 €" (addons Z. 161) | — | — | 350 € (texterstellung Z. 40) | ✓ |
| Texterstellung Business | — | — | — | 650 € (Z. 50) | nur dort |
| Texterstellung Premium | — | — | — | 1.200 € (Z. 66) | nur dort |
| Chatbot | "ab 500 €" (addons) | — | — | — | ok |
| Logo-Redesign | 200 € (addons) | — | — | — | ok |
| Logo-Neuerstellung | 350 € (addons) | — | — | — | ok |

**Keine Preis-Inkonsistenzen** auf der Webseite selbst. Sehr sauber.

**ABER: Externe Inkonsistenz mit dem Brain**
- Brain-File `project_website_check_paid.md` beschreibt einen **bezahlten Tier-C Website-Check für 25 €**.
- Die Live-Site bewirbt den Website-Check **kostenlos** (`website-check/page.tsx:19,54`, Trust-Point "100% kostenlos", WebsiteCheckTeaser).
- **Einzuordnen:** Vermutlich ist "Tier-C paid 25 €" ein geplanter Ausbau (Premium-Version), während der aktuelle Free-Check Tier-B ist. Sollte aus Konsistenz-Audit-Sicht notiert, aber nicht zwingend auf der Live-Site geklärt werden. **Prüfen:** Wenn Tier-C live geht, Website-Check-Seite braucht Differenzierung "Kostenloser Kurz-Check vs. Tiefenanalyse 25 €".

### 7.2 "Webdesign im Abo" / Website-as-a-Service

| Wo | Formulierung | Konsistent? |
|---|---|---|
| Home Hero (`site.ts:26`) | "als Webdesign im Abo, ohne Überraschungen" | Ankerpunkt |
| Gründungsangebot Hero (Z. 177) | "Auch als Webdesign im Abo (Website-as-a-Service) verfügbar" | ✓ (+ engl. Version in Klammer als Accessibility-Brücke) |
| Preise-Seite | **Wird nicht wörtlich verwendet** — dort wird "Website + Betreuung kombinieren" benutzt. | ⚠️ Andere Formulierung |
| Blog Post 2 (warum-jedes) | "Webseite + laufende Betreuung" | ⚠️ |
| Header-Nav | — (kein Menüpunkt) | — |

**Befund:** Der zentrale Claim "Webdesign im Abo" wird NICHT konsistent durchgezogen. Auf Home/Gründung prominent, auf Preise-Seite gar nicht — stattdessen "Website + Betreuung kombinieren". Das ist eine **Positionierungs-Unschärfe**.
**Vorschlag:** Einheitlich "Webdesign im Abo" als Produkt-Name etablieren und auf Preise-Seite nutzen (z.B. Intro: "Das Prinzip Webdesign im Abo: Erstellung niedrig, Betreuung planbar — bis hin zu 0 € für die Erstellung").

### 7.3 Lieferzeiten

| Wo | Angabe | Konsistent? |
|---|---|---|
| `Process.tsx` (Schritt 3) | "In 14 Tagen online" | Anker |
| `about.stats` (`site.ts:100`) | "14 Tage bis Ihre Seite online ist" | ✓ |
| Webdesign-Limburg Hero | "in 14 Tagen online" + Benefit "In 14 Tagen online" | ✓ |
| Preise-Seite Paket 1 | "ca. 2 Wochen" | ✓ (semantisch identisch) |
| Preise-Seite Paket 2 | "ca. 3 Wochen" | — (größeres Paket) |
| Preise-Seite Paket 3 | "ca. 4–5 Wochen" | — (größtes Paket) |
| Gründungsangebot P1/P2/P3 | "ca. 2 / 3 / 4–5 Wochen" | ✓ identisch zu Preise |
| FAQ (`faq.json:9`) | "In der Regel 1–2 Wochen. Größere Projekte … 3–4 Wochen." | **⚠️ leichte Diskrepanz** — Paket 3 auf Preise-Seite = "4–5 Wochen", FAQ sagt "3–4 Wochen". |
| Blog Post Limburg-Case | "Innerhalb von zwei Wochen war die Seite live" | ✓ |
| Limburg Benefit 1 | "in zwei Wochen fertig" | ✓ |
| Texterstellung Starter | "ca. 5 Werktage" | — (anderes Produkt) |
| Texterstellung Business | "ca. 10 Werktage" | — |

**Einzige Inkonsistenz:** FAQ sagt "Größere Projekte … 3–4 Wochen", Paket 3 sagt "4–5 Wochen". Fix: FAQ auf "3–5 Wochen" anpassen.

### 7.4 "5 Plätze" (Gründungs-Scarcity)

| Wo | Formulierung | Konsistent? |
|---|---|---|
| AnnouncementBanner | "nur 5 Plätze im April" | Anker |
| Metadata (gruendungsangebot title/desc) | "Nur noch 4 Plätze frei!" | ✓ (4 von 5) |
| Urgency-Box Hero | "Noch 4 von 5 Plätzen verfügbar" | ✓ |
| Sticky-Bar | "4 Plätze · endet in …" | ✓ |

**Konsistent.** Nur der Banner sagt "5" (Angebots-Umfang), die Seite selbst "4 von 5" (aktueller Stand). Kohärent.

### 7.5 "KI auch bei ChatGPT gefunden"

| Wo | Formulierung |
|---|---|
| Home USP "Zukunftssicher" | "auch von ChatGPT & Co. gefunden — nicht nur von Google. Das kann fast niemand." |
| Home Service "Gefunden werden — auch von KI" | "…auch dort empfohlen wird. Das bieten die wenigsten." |
| Home About | "…auch von KI-Assistenten wie ChatGPT empfohlen wird. Das bieten die wenigsten — und genau das ist Ihr Vorsprung." |
| FAQ KI-Optimierung | "Das machen bisher die wenigsten — und genau das ist Ihr Vorteil." |
| Limburg Benefit | "Das bieten die wenigsten." |
| Gründungsangebot P1 Feature | "Auch bei ChatGPT & Co. gefunden werden" |
| Gründungsangebot P2 Feature | "Sichtbarkeits-Check in ChatGPT & Co." |
| Gründungsangebot P3 Feature | "KI-Sichtbarkeit: fortlaufend optimiert" |

**Konsistent im Tenor.** "Das bieten die wenigsten" / "Das machen bisher die wenigsten" / "Das kann fast niemand" — drei leicht unterschiedliche Formulierungen. Würde ich **auf zwei reduzieren**: "Das kann fast niemand" (strong claim) + "Ihr Vorsprung" (Benefit). 3x leichtes Variieren ist ok für Menschen, aber für AI-Grounding ist konsistente Phrasierung besser zitierbar.

---

## 8. Weitere Beobachtungen

### 8.1 Positive Highlights
- **Hero-Pill "Hallo, ich bin Michael"** — persönlich, menschlich, keine Agentursprache.
- **Services-Titel** durchgehend kundenorientiert ("Ihre neue Webseite" statt "Web Design", "Gefunden werden — auch von KI" statt "KI/SEO-Optimierung", "Weniger Arbeit, mehr Anfragen" statt "Automation").
- **Vorher/Nachher-Pattern** in Texterstellung-Seite — didaktisch stark, konkret.
- **Transparente Preise** mit Rabatt-Matrix — keine versteckten Kosten, zeigt Commitment.
- **FAQ-Antworten** nutzen "Sie"-Ansprache, konkret, ohne Jargon.

### 8.2 Minor Smells
- `app/gruendungsangebot/page.tsx:215` — **"Handover"** (siehe Jargon) ist die härteste Stelle, weil prominent in "In jedem Paket enthalten".
- `app/preise/page.tsx:455` "Automatische Überwachung rund um die Uhr" — ok, aber "Uptime-Monitoring" in Zeile 131 ist Jargon. Würde ich zu **"Ausfall-Überwachung"** vereinheitlichen.
- `app/farbpsychologie/page.tsx:382` "Newsletter-Zwang" — ist umgangssprachlich ok, aber "Kein Newsletter, keine E-Mail-Angabe nötig" wäre positiver formuliert.
- Das Wort **"Website"** vs. **"Webseite"** wird gemischt (site.ts:18 "Webseiten", preise:339 "Website"). Beides ist DACH-gebräuchlich. **Vorschlag:** In Kundentexten konsequent "Webseite" (deutsch, warm), in Paket-/Produkt-Namen "Website" (kürzer, Produkt-Gefühl). Aktuell nicht kritisch — einfach bewusst halten.
- `Services.tsx` Headline Rechtschreibung: "So läuft's ab" (`Process.tsx:40`) — `&apos;` korrekt eingesetzt. Kein Issue.

### 8.3 AI-Zitier-Fähigkeit (GEO)
Die Seite ist bereits sehr gut strukturiert:
- Schema.org `ProfessionalService`, `Service`, `OfferCatalog`, `FAQPage`, `WebApplication` sauber eingesetzt.
- Klare Fakten-Statements in FAQ.
- **Verbesserungspotenzial:** Fakten-Boxen / TL;DR-Summaries auf Leistungsseiten (texterstellung, gruendungsangebot) würden Perplexity/ChatGPT-Zitate begünstigen.

---

## 9. Konkrete To-Do-Liste (priorisiert)

### P0 (Jargon-Critical, heute)
1. **`preise/page.tsx:44`** — "Sichere Verbindung (SSL)" → "Sichere Verbindung (Verschlüsselung)". Harmonisierung mit `gruendungsangebot`.
2. **`preise/page.tsx:131`** — Betreuungspaket-Desc: "SSL" → "Verschlüsselung"; "Uptime-Monitoring" → "Ausfall-Überwachung".
3. **`website-check/page.tsx:74,79,84,89,94,99`** — gesamten Kategorien-Block entjargonisieren (Core Web Vitals, Meta-Tags, SSL-Zertifikat, Security-Header, WCAG, Responsive, Cookie-Consent).
4. **`gruendungsangebot/page.tsx:215`** — "Handover mit allen Zugängen" → "Komplette Übergabe aller Zugänge".

### P1 (Konsistenz, diese Woche)
5. **`faq.json:9`** — Lieferzeit "3–4 Wochen" → "3–5 Wochen" (Angleich an Paket 3).
6. **Webdesign-Limburg Hero** neu formulieren, um Duplikat zur Home-Hero zu entzerren.
7. **Preise-Seite** mit Claim "Webdesign im Abo" explizit machen (Intro oder Trust-Bar).
8. **Contact CTA-Text "Nachricht senden"** belassen oder zu "Gespräch anstoßen" ziehen.
9. **AnnouncementBanner CTA** "→ Mehr erfahren" → "5 Plätze sichern".
10. **CookieBanner Link** "Mehr erfahren" → "Datenschutz lesen".

### P2 (Blog-Upgrade, nächste 1–2 Wochen)
11. **Blog Post 1 (KI-Optimierung)** um FAQ-Block + 300 Wörter + konkreten CTA erweitern.
12. **Blog Post 2 (Warum Webseite)** Quelle für "80 %"-Claim nennen oder entschärfen + FAQ.
13. **Blog Post 3 (Backup)** formale `## Häufige Fragen`-Section ergänzen + drei Fragen als H3.

### P3 (Nice-to-have)
14. **"Das bieten die wenigsten"**-Formulierung auf 2 Varianten reduzieren (aktuell 3 Varianten).
15. **"Alles aus einer Hand"** in `Services.tsx:31` umformulieren zu "Ein Ansprechpartner für alles".
16. **Jetzt anfragen**-Button auf Paketkarten → "Paket besprechen" oder "Dieses Paket anfragen" (eindeutiger).
17. **Gründungsangebot Final-CTA Button** "Unverbindlich anfragen" → "Platz sichern — kostenloses Gespräch".

---

## 10. Score-Übersicht

| Dimension | Score (0-10) | Kommentar |
|---|---|---|
| Kundensprache (feedback_kundensprache) | **8.5** | Hero, USP, FAQ, Services exzellent. Website-Check-Seite zieht runter. |
| Jargon-Freiheit (feedback_keine_fachbegriffe) | **7.0** | SEO, SSL, Responsive, Core Web Vitals sichtbar an Kern-Touchpoints. |
| KI-Floskel-Freiheit (feedback_dokumente_natuerlich) | **9.5** | Praktisch clean. |
| Distinct-Voice (feedback_distinct_design) | **8.5** | Persönliche Note durchgängig, Hero-Pill, "Kein Agentur-Sprech" klar positioniert. |
| Duplicate-Hygiene | **7.5** | Eine echte Dopplung (Home↔Limburg Hero). |
| CTA-Qualität | **8.0** | Überwiegend stark, 3–4 schwache Stellen. |
| Claim-Konsistenz | **8.5** | Preise/Lieferzeiten/Plätze sauber. "Webdesign im Abo" nicht konsequent. |
| Blog-Qualität gesamt | **7.0** | Post 3 exzellent, 1+2 brauchen Substanz. |
| **Gesamt** | **8.1 / 10** | Überdurchschnittlich. P0-Jargon-Fixes heben auf ~8.5. |

---

**Bearbeitet von Doc · 20.04.2026 · Keine Code-Änderungen.**
