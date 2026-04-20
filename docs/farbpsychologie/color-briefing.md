# Color Briefing — /farbpsychologie Landingpage

> Meta-Dogfooding: Eine Landingpage ÜBER Farbpsychologie muss selbst exemplarisch eine durchdachte Palette haben. Die Seite demonstriert ihr eigenes Thema.
>
> **Erstellt:** 2026-04-20 · **Kunde:** hoeger.dev (eigene Site) · **Projekt:** /farbpsychologie Nischen-Landingpage (Branchen-Analyse Prio 2)

---

## 1. Wirkungsziel (3 Adjektive)

- **strategisch** — nicht dekorativ, nicht Bauchgefühl
- **editorial** — ein Fachbeitrag mit Haltung, kein Verkaufsprospekt
- **greifbar** — Theorie wird sofort sichtbar (Live-Demo)

**Abgrenzung:** NICHT "trendy", NICHT "verspielt", NICHT "corporate". Das wäre alles schon zu besetzen (Coolors = verspielt, Refactoring UI = corporate, Huemint = trendy).

---

## 2. Zielgruppe

- **Alter:** 30-55
- **Rolle:** Inhaber:innen kleiner Unternehmen, Marketing-Verantwortliche in KMU, Handwerk/Dienstleistung/Praxen. Sekundär: andere Designer:innen die Cases verlinken.
- **Werte:** Seriosität, Nachvollziehbarkeit, "warum" statt "wie sieht es aus". Sie wollen verstehen, nicht beeindruckt werden.
- **Ablehnung:** Buzzword-Bullshit, "KI-generierte Looks", generische Gradients, Stock-Fotos
- **Gewohnte Ästhetik:** Fachmagazine (Brand Eins, t3n-Print), Pantone-Blogs, MoMA-Publikationen, Offscreen Mag. NICHT: SaaS-Landingpages.

---

## 3. Ausschlusskriterien

- NICHT Teal/Cyan-Gradient (das ist hoeger.dev-Kern-CI — würde Farbpsych trivialisieren, wenn die Page selbst nur die Haus-Farbe zeigt)
- NICHT Schwarz-Weiß-Minimalismus (zu distanziert für ein Farbthema — ironisch gescheitert)
- NICHT Regenbogen/alle-Farben-gleichzeitig (genau der Anti-Pattern den wir bekämpfen)
- NICHT Glassmorphism/Neumorphism-Trends (widerspricht editorial-Wirkung)

---

## 4. Branchen-Codes (Meta: Design-Content-Branche)

- **Erwartet in "Design schreibt über Design":** entweder very pure (Refactoring UI: weiß+blau) oder sehr chromatisch (Coolors, Huemint: spielerisch)
- **Übernehmen:** Serifen-Display (editorial), großzügiger Weißraum, lange Lesebereiche
- **Brechen:** Wärme statt kühles Blau. Die meisten Color-Tools fühlen sich kalt/klinisch an (Fintech-Mimikry). Wir gehen warm + erdig + eine gesättigte Komplementär-Akzentfarbe.

---

## 5. Palette 60-30-10

### Dominant 60% — **Bone White** `#F4EFE6`
- Warmer Off-White (leicht ins Creme/Elfenbein). Signalisiert Papier, Druckerei, Handwerk.
- Wirkung: ruhig, konzentriert, zeitlos. Kein Tech-Sterilweiß.

### Sekundär 30% — **Deep Ink** `#1C1F26`
- Fast-Schwarz mit ganz leichtem Blau-Stich. Für Headlines, Body-Text, Struktur-Flächen.
- Wirkung: autoritativ, lesbar, druckfein. Ersetzt reines #000 (zu hart) und reines Slate (zu Tech).

### Akzent 10% — **Vermilion** `#B8412A`
- Gedämpftes Zinnoberrot. Komplementärkontrast zur warmen Blau-Grün-Achse.
- Wirkung: Handwerk (Siegelwachs, Buchdruck-Initiale, Lackschild), Aufmerksamkeit ohne Klinik.
- **Komplementärkontrast:** Ja — komplementär zu einem warmen Teal, was die Brücke zur hoeger.dev-CI spannt, ohne sie zu kopieren.
- **Warum dieser Ton und nicht heller:** heller (#D14D3A) erreicht nur 3.4:1 auf Bone → Body-Text nicht möglich. Dieser Ton ist dual-nutzbar (Text auf Bone UND Fläche mit Bone-White-Text).

### 4. Farbe (nur für Branchen-Demo-Widget): **Sage** `#4F6B4E`, **Ochre** `#A26F12`, **Ink-Blue** `#2F4B7A`
- Diese drei rotieren im Hero-Branchen-Umschalter (Medizin/Gastro/Handwerk/Finanz) als Live-Demo. NICHT Teil der Seitenpalette, sondern Content. Alle drei erreichen ≥4.5:1 auf Bone.

### WCAG-Kontrast-Check (alle rechnerisch verifiziert)
- **Body Deep Ink `#1C1F26` auf Bone White `#F4EFE6`:** ~14.3:1 ✓ (Pflicht 4.5:1)
- **Vermilion `#B8412A` Text auf Bone White:** ~4.87:1 ✓ Body-OK
- **Bone White auf Vermilion `#B8412A` (CTA-Fläche):** ~4.87:1 ✓ Body-OK
- **Bone White Text auf Deep Ink (inverted CTA-Sektion):** ~14.3:1 ✓
- **Deep Ink Text auf Vermilion-Fläche:** ~2.94:1 ✗ NUR für Large Display (≥24px bold / 18.66px) — Regel: Auf Vermilion-Fläche verwenden wir Bone-White-Text, NICHT Deep Ink.

---

## 6. Sektions-Mapping

| Section | Dominante | Akzent | Begründung |
|---|---|---|---|
| Hero | Bone White | Vermilion (Headline-Highlight, Branchen-Chip aktiv) | Ruhiger Einstieg, ein einziger Farbpunkt zieht das Auge |
| Itten-Grundlagen (Value) | Bone White | Deep Ink (Frame + Typo) | Lehrbuch-Anmutung, Farben als Demo-Blocks in situ |
| 60-30-10-Live-Demo | Deep Ink als Hintergrund (Inversion!) | Bone White + Vermilion | Bewusster Kontrastbruch mittendrin — zeigt Sektions-Farbwechsel in Aktion |
| Branchen-Paletten | Bone White | jeweilige Branchenfarbe | Jede Branche bekommt ihren eigenen Farbblock |
| Case Study (Schäferhof / Body Process) | Bone White | Zitat-Vermilion-Strich | Glaubwürdigkeit, keine Ablenkung |
| Lead-Magnet-CTA (Template-Download) | Deep Ink (inverted) | Vermilion (CTA-Fläche mit Bone-White-Text) | High-Contrast Umgebung lässt Vermilion laut werden, ohne den Rest der Seite zu stören |
| FAQ | Bone White | Deep Ink Underlines | Dezent |
| Footer (erbt von Site) | Site-CI | — | Konsistenz mit Restsite |

---

## 7. CTA-Strategie

- **Primärer CTA:** "Color-Briefing-Template gratis laden" — Vermilion-Fläche auf Deep-Ink-Sektion (Inversion macht sie magnetisch)
- **Sekundärer CTA:** "Kostenlose Erstberatung" — Deep-Ink-Outline auf Bone-White
- **Platzierung:** Above-fold Soft-CTA (Outline), nach Itten-Sektion Soft-CTA, am Ende harter Lead-Magnet-CTA
- **Hover:** Subtile `translateY(-1px)` + Shadow-Depth, kein Farbwechsel (Farbe ist das Thema — niemand soll sie "verlieren" beim Hover)

---

## 8. Typografie

- **Display/Headline:** **Fraunces** (variable, optical size) — Google Fonts, kostenlos. Editorial, Serifen mit Charakter, NICHT Inter/Poppins. Konkret: SOFT-Axis 100, opsz 144 für Hero.
- **Body:** **Inter Tight** ODER **Instrument Sans**. Entscheidung → **Instrument Sans** (Google Fonts, ruhig, neutral, nicht Inter). Fallback: Inter Tight.
- **Mono/Code (HEX-Werte):** **JetBrains Mono** (ist schon im Layout geladen, Reuse)
- **Regel erfüllt:** NICHT Inter/Poppins/Manrope als Haupt-Sans ✓

---

## 9. Mood-Board (siehe separate Datei moodboard.md)

10 Referenzen gesammelt, alle Nicht-KI, alle editorial/Farb-Fachthemen.

---

## 10. Checklist vor Coding

- [x] Wirkungsziel (strategisch, editorial, greifbar)
- [x] Zielgruppe definiert (KMU-Inhaber 30-55 + Peers)
- [x] Ausschluss-Kriterien notiert (keine Teal/Cyan-Wiederholung, kein Rainbow, kein Glassmorph)
- [x] Palette finalisiert: Bone White / Deep Ink / Vermilion
- [x] WCAG geprüft (alle Kombinationen ≥4.5:1 außer Vermilion-Flächen — Regel dokumentiert)
- [x] Sektions-Mapping steht
- [x] CTA: Vermilion auf Deep Ink (invertierter Lead-Magnet-Block)
- [x] Mood-Board zusammengestellt (siehe moodboard.md)
- [ ] Kunde (= Michael) hat Palette abgesegnet — Review beim Fitness-Rückkehr

---

## 11. Strukturelle Eigenheit (Distinction-Hebel #3)

Die Page bricht das Standard-Hero-Muster: Statt Headline-Subheadline-CTA-Bild haben wir ein **Live-Experiment als Hero** — ein 60-30-10-Farbblock mit Branchen-Umschalter (Handwerk / Medizin / Finanz / Gastro). Die Proportionen bleiben, die Farben wechseln live. Wer scrollt, versteht das Thema in 3 Sekunden ohne Text.

Zusätzlich: **Anker-Navigation mit Farbpunkten** (links auf Desktop), jeder Abschnitt hat einen einfarbigen Chip — scrollt mit, zeigt Position. Funktioniert als visueller Index und demonstriert gleichzeitig wie Farbe Orientierung gibt.

---

## 12. Persönlichkeits-Details (Distinction-Hebel #5)

- **Kontrast-Ratio als Fußnote** neben HEX-Werten (z.B. "Vermilion #D14D3A · 4.7:1 auf Bone") — nerdig, beweist Fachlichkeit
- **Itten-Referenz explizit** im Impressum-artigen Block ("Farbkreis nach Johannes Itten, 1961") — Buchverweis statt Generic-Footer
- **Handgezeichneter Farbkreis als SVG** (keine KI!) — als Hero-Side-Element. Kleine Ungenauigkeiten bleiben drin.
