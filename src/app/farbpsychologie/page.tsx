import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { siteUrl } from "@/config/site";
import HeroBranchen from "./HeroBranchen";
import "./fp.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const jetbrainsMonoFp = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fp-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Farbpsychologie für Websites — Farbe ist Strategie, kein Geschmack | Michael Höger",
  description:
    "Jede Branche hat ihre eigene Farb-Erwartung. Ich baue Paletten nach Itten und 60-30-10-Regel — für Handwerk, Medizin, Finanz, Gastro. Color-Briefing-Template gratis.",
  alternates: { canonical: "/farbpsychologie/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${siteUrl}/farbpsychologie/`,
    title: "Farbpsychologie für Websites — Michael Höger",
    description:
      "Farbe strategisch einsetzen statt nach Bauchgefühl. Branchen-Paletten, 60-30-10-Regel, WCAG-geprüft.",
    images: [{ url: `${siteUrl}/images/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Farbpsychologie für Websites — Michael Höger",
    description:
      "Farbe strategisch einsetzen statt nach Bauchgefühl. Branchen-Paletten, 60-30-10-Regel, WCAG-geprüft.",
    images: [`${siteUrl}/images/og-image.png`],
  },
  robots: { index: true, follow: true },
};

// ── Content ─────────────────────────────────────────────────────────────

const ittenBasics = [
  {
    nr: "01",
    titel: "Der Farbkreis",
    text: "Zwölf Farben in Johannes Ittens Kreis (1961) ordnen sich nach Nähe. Benachbarte Farben harmonieren, gegenüberliegende erzeugen Spannung. Das ist kein Mystizismus — es ist ein Werkzeug.",
  },
  {
    nr: "02",
    titel: "Komplementärkontrast",
    text: "Rot-Grün, Blau-Orange, Gelb-Violett: Diese Paare liegen im Kreis gegenüber. Ein Komplementär-CTA springt aus jeder Seite heraus — weil das Auge den Kontrast physisch spürt.",
  },
  {
    nr: "03",
    titel: "Kalt vs. Warm",
    text: "Warme Töne kommen optisch näher, kalte Töne treten zurück. Hintergrund = kalt/neutral, Vordergrund-Akzent = warm. Nicht umgekehrt — sonst kippt die Tiefenwirkung.",
  },
  {
    nr: "04",
    titel: "Sättigung & Helligkeit",
    text: "Weniger ist fast immer mehr. Vollgesättigte Farben wirken schreiend, gedämpfte Töne wirken teuer. Das erklärt, warum Luxus-Marken fast nie Neon verwenden.",
  },
];

const branchenPaletten = [
  {
    name: "Handwerk & Bau",
    ton: "Erdig, warm, beständig",
    farben: [
      { name: "Bone", hex: "#F4EFE6" },
      { name: "Deep Ink", hex: "#1C1F26" },
      { name: "Vermilion", hex: "#B8412A" },
    ],
    begruendung: "Terracotta und Zinnober sind Siegelfarben, Materialität und Tradition. Cyan-Gradients hier wirken wie ein leerer Corporate-Anzug.",
  },
  {
    name: "Medizin & Praxis",
    ton: "Ruhig, vertrauensvoll, nicht klinisch",
    farben: [
      { name: "Off-White", hex: "#F6F5F2" },
      { name: "Ink", hex: "#223038" },
      { name: "Sage", hex: "#4F6B4E" },
    ],
    begruendung: "Salbei-Grün senkt nachweislich die wahrgenommene Wartezeit. Reines Weiß wirkt steril, Pastell-Rosa wirkt unseriös — Sage ist der Sweet Spot.",
  },
  {
    name: "Finanz & Recht",
    ton: "Seriös, diskret, nicht Fintech-laut",
    farben: [
      { name: "Paper", hex: "#F1EFEA" },
      { name: "Nachtblau", hex: "#1A2740" },
      { name: "Ink-Blue", hex: "#2F4B7A" },
    ],
    begruendung: "Tiefblau ist die Farbe der Verbindlichkeit — aber gedämpft, nicht Neon. Eine Kanzlei in Cyan-Gradient ist ein Widerspruch in sich.",
  },
  {
    name: "Gastronomie",
    ton: "Appetitanregend, warm, satt",
    farben: [
      { name: "Cream", hex: "#F6EFDF" },
      { name: "Espresso", hex: "#2B1F14" },
      { name: "Ochre", hex: "#A26F12" },
    ],
    begruendung: "Warme Erdtöne aktivieren den Appetit. Instagram-Pastell verkauft Matcha-Latte, aber kein Abendmenü. Ocker und Bordeaux sind Wein-Etiketten-Gold-Standard.",
  },
];

const cases = [
  {
    projekt: "Schäferhof Guteschaf",
    zeile: "Wollverarbeitung · Rhön",
    problem: "Die Vorgänger-Seite nutzte ein kühles Tech-Grün. Das passte zu keinem einzigen Produkt — Wolle ist warm, handwerklich, kein SaaS.",
    loesung: "Umstieg auf warme Beige- und Espresso-Töne, mit einem einzigen moosgrünen Akzent für CTAs. Jetzt riecht die Seite nach Schaf statt nach Cloud.",
  },
  {
    projekt: "Body Process",
    zeile: "Personal Training · Limburg",
    problem: "Typische Fitness-Seiten setzen auf Neon-Grün und aggressive Rot-Schwarz-Kombis. Das passt zu Discounter-Studios, nicht zu persönlicher Begleitung.",
    loesung: "Bodenständiges Teal und warmes Off-White. Signalisiert: hier wird gearbeitet, aber mit Respekt vor dem Menschen. Premium ohne Arroganz.",
  },
];

const faq = [
  {
    q: "Warum nicht einfach meine Lieblingsfarben?",
    a: "Weil Ihre Kund:innen entscheiden, nicht Sie. Eine Palette funktioniert, wenn sie die Erwartungen Ihrer Zielgruppe trifft — oder sie bewusst bricht. Beides braucht Analyse, nicht Bauchgefühl.",
  },
  {
    q: "Was ist die 60-30-10-Regel?",
    a: "60 % dominierende Farbe (meist neutral, Hintergrund), 30 % strukturierende Farbe (Text, Sektionsflächen), 10 % Akzentfarbe (CTAs, Highlights). Diese Aufteilung stammt aus dem Interior Design und funktioniert auch auf dem Bildschirm, weil das Auge Hierarchie braucht.",
  },
  {
    q: "Was bedeutet WCAG 4.5:1?",
    a: "Ein Kontrastwert. Text muss sich stark genug vom Hintergrund abheben — 4.5:1 für normale Schrift, 3:1 für große Schrift. Ohne das geht Barrierefreiheit nicht (BFSG ab Juni 2025 Pflicht für viele Websites).",
  },
  {
    q: "Ist das Teil eines Webseiten-Pakets?",
    a: "Ja. In Paket 2 und Paket 3 meines Gründungsangebots ist die Farbpsychologie-Beratung inklusive. Das Color-Briefing führen wir dann gemeinsam durch — kein Fragebogen per E-Mail.",
  },
];

// ── Page ────────────────────────────────────────────────────────────────

export default function FarbpsychologiePage() {
  return (
    <main className={`fp-root ${fraunces.variable} ${instrumentSans.variable} ${jetbrainsMonoFp.variable}`}>
      {/* JSON-LD Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Farbpsychologie-Beratung für Websites",
            provider: {
              "@type": "Person",
              name: "Michael Höger",
              url: siteUrl,
            },
            areaServed: { "@type": "Country", name: "DE" },
            serviceType: "Webdesign · Farbpsychologie · Branding",
            description:
              "Strategische Farbpalette für Ihre Website — nach Johannes Itten und 60-30-10-Regel. Branchen-spezifisch, WCAG-geprüft, mit Begründung statt Bauchgefühl.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 pt-36 lg:pt-44 pb-24 lg:pb-32 max-w-7xl mx-auto">
        <HeroBranchen />
      </section>

      <hr className="fp-rule max-w-7xl mx-auto" />

      {/* ── Warum das zählt ──────────────────────────────── */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 max-w-7xl mx-auto">
        <div className="fp-2col items-start">
          <div>
            <p className="fp-eyebrow mb-5">01 — Warum das zählt</p>
            <h2 className="fp-display text-[clamp(2rem,4vw,3.25rem)] mb-0">
              90&nbsp;Sekunden.
            </h2>
          </div>
          <div className="space-y-6 text-[1.05rem] lg:text-lg leading-relaxed max-w-[60ch]">
            <p>
              So lange braucht ein Mensch, um eine Website zu beurteilen. Bis zu <strong>90 Prozent dieser Entscheidung</strong> basieren auf Farbe allein — Typografie, Content, Technik kommen erst danach zum Tragen.
              <sup className="fp-hex"> [1]</sup>
            </p>
            <p>
              Das ist kein Grund für Panik, sondern für Handwerk. Farbe ist kein Geschmack, sondern ein Signal — für Vertrauen, für Branche, für Preisklasse. Wer sie zufällig wählt, überlässt die erste Entscheidung dem Zufall.
            </p>
            <p style={{ color: "var(--fp-ink-soft)" }}>
              Das Gegengift: ein dokumentiertes Color-Briefing vor dem ersten Layout. Wirkungsziel, Zielgruppe, Ausschluss-Kriterien, Branchen-Codes, Palette, WCAG-Check, Sektions-Mapping. 30 Minuten Vorarbeit spart drei Design-Iterationen im Nachhinein.
            </p>
            <p className="fp-hex pt-4" style={{ color: "var(--fp-ink-soft)" }}>
              [1] Singh, S. (2006). &bdquo;Impact of color on marketing.&ldquo; Management Decision, 44(6).
            </p>
          </div>
        </div>
      </section>

      <hr className="fp-rule max-w-7xl mx-auto" />

      {/* ── Itten-Grundlagen ─────────────────────────────── */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 max-w-7xl mx-auto">
        <div className="mb-14 lg:mb-20">
          <p className="fp-eyebrow mb-5">02 — Grundlagen</p>
          <h2 className="fp-display text-[clamp(2rem,4vw,3.25rem)] max-w-[22ch]">
            Vier Begriffe, die fast alles erklären.
          </h2>
        </div>
        <div className="fp-2col">
          {ittenBasics.map((item) => (
            <div key={item.nr} className="border-t pt-6" style={{ borderColor: "color-mix(in srgb, var(--fp-ink) 15%, transparent)" }}>
              <p className="fp-hex mb-3">{item.nr}</p>
              <h3 className="text-2xl lg:text-3xl mb-4">{item.titel}</h3>
              <p className="text-[1.02rem] leading-relaxed" style={{ color: "var(--fp-ink-soft)" }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Inverted: 60-30-10 Live-Demo ─────────────────── */}
      <section className="fp-inverted px-6 lg:px-10 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto fp-2col items-center">
          <div>
            <p className="fp-eyebrow mb-5">03 — Die Regel</p>
            <h2 className="fp-display text-[clamp(2rem,4.5vw,3.75rem)] mb-8">
              60 · 30 · 10.
            </h2>
            <div className="space-y-5 text-[1.05rem] leading-relaxed" style={{ color: "color-mix(in srgb, var(--fp-bone) 85%, transparent)" }}>
              <p>
                <strong style={{ color: "var(--fp-bone)" }}>60 % Dominante</strong> — meist ein neutraler Grundton. Trägt die Seite, ohne laut zu sein. Bone, Off-White, Warm-Grau.
              </p>
              <p>
                <strong style={{ color: "var(--fp-bone)" }}>30 % Sekundäre</strong> — strukturiert. Sektionsflächen, Navigations-Bereiche, Footer, Typografie-Farbe.
              </p>
              <p>
                <strong style={{ color: "var(--fp-bone)" }}>10 % Akzent</strong> — CTAs, Highlights, ein einziger Farbpunkt, der das Auge zieht. Komplementär zur Dominante.
              </p>
              <p style={{ color: "color-mix(in srgb, var(--fp-bone) 65%, transparent)" }}>
                Diese Seite folgt der Regel: Bone-White (60), Deep Ink (30), Vermilion (10). Links daneben das Beispiel als Balken-Visualisierung.
              </p>
            </div>
          </div>

          <div>
            <div className="grid grid-rows-[6fr_3fr_1fr] gap-2 aspect-[4/5]">
              <div className="fp-swatch" style={{ background: "var(--fp-bone)", color: "var(--fp-ink)" }}>
                <div>
                  <p className="mb-1 font-sans" style={{ fontSize: "0.7rem", fontWeight: 500 }}>60 % Dominante</p>
                  <p>Bone &nbsp;·&nbsp; #F4EFE6</p>
                </div>
              </div>
              <div className="fp-swatch" style={{ background: "color-mix(in srgb, var(--fp-bone) 20%, var(--fp-ink))", color: "var(--fp-bone)" }}>
                <div>
                  <p className="mb-1 font-sans" style={{ fontSize: "0.7rem", fontWeight: 500 }}>30 % Sekundäre</p>
                  <p>Deep Ink &nbsp;·&nbsp; #1C1F26</p>
                </div>
              </div>
              <div className="fp-swatch" style={{ background: "var(--fp-vermilion)", color: "var(--fp-bone)", aspectRatio: "auto" }}>
                <div>
                  <p className="mb-0 font-sans" style={{ fontSize: "0.7rem", fontWeight: 500 }}>10 % Akzent · Vermilion · #B8412A</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Branchen-Paletten Grid ───────────────────────── */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 max-w-7xl mx-auto">
        <div className="mb-14 lg:mb-20 max-w-[60ch]">
          <p className="fp-eyebrow mb-5">04 — Vier Branchen, vier Paletten</p>
          <h2 className="fp-display text-[clamp(2rem,4vw,3.25rem)] mb-6">
            Jede Branche hat ihre eigene Erwartung.
          </h2>
          <p className="text-[1.05rem] leading-relaxed" style={{ color: "var(--fp-ink-soft)" }}>
            Diese Paletten sind keine Vorlagen zum Kopieren, sondern Ausgangspunkte. Die finale Auswahl entsteht immer aus dem Briefing — aber die Richtung ist in 80 % der Fälle vorgezeichnet.
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:gap-14">
          {branchenPaletten.map((p) => (
            <article key={p.name} className="border-t pt-8" style={{ borderColor: "color-mix(in srgb, var(--fp-ink) 15%, transparent)" }}>
              <h3 className="text-2xl lg:text-3xl mb-1">{p.name}</h3>
              <p className="fp-hex mb-6">{p.ton}</p>
              <div className="grid grid-cols-3 gap-1 mb-5 h-24">
                {p.farben.map((f) => (
                  <div
                    key={f.hex}
                    className="flex items-end p-3"
                    style={{
                      background: f.hex,
                      color: f.name === "Bone" || f.name === "Off-White" || f.name === "Paper" || f.name === "Cream" ? "var(--fp-ink)" : "var(--fp-bone)",
                      fontFamily: "var(--fp-font-mono)",
                      fontSize: "0.68rem",
                    }}
                  >
                    <div>
                      <div>{f.name}</div>
                      <div style={{ opacity: 0.8 }}>{f.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[0.98rem] leading-relaxed" style={{ color: "var(--fp-ink-soft)" }}>
                {p.begruendung}
              </p>
            </article>
          ))}
        </div>
      </section>

      <hr className="fp-rule max-w-7xl mx-auto" />

      {/* ── Case Studies ─────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 max-w-7xl mx-auto">
        <div className="mb-14 lg:mb-20">
          <p className="fp-eyebrow mb-5">05 — Aus der Praxis</p>
          <h2 className="fp-display text-[clamp(2rem,4vw,3.25rem)] max-w-[22ch]">
            Zwei Farb-Entscheidungen, begründet.
          </h2>
        </div>
        <div className="space-y-16 lg:space-y-20">
          {cases.map((c) => (
            <article key={c.projekt} className="fp-2col items-start border-l-4 pl-6 lg:pl-10" style={{ borderColor: "var(--fp-vermilion)" }}>
              <div>
                <h3 className="text-2xl lg:text-3xl mb-2">{c.projekt}</h3>
                <p className="fp-hex">{c.zeile}</p>
              </div>
              <div className="space-y-5">
                <div>
                  <p className="fp-hex mb-2">Das Problem</p>
                  <p className="text-[1.02rem] leading-relaxed">{c.problem}</p>
                </div>
                <div>
                  <p className="fp-hex mb-2">Die Entscheidung</p>
                  <p className="text-[1.02rem] leading-relaxed" style={{ color: "var(--fp-ink-soft)" }}>{c.loesung}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Lead-Magnet ──────────────────────────────────── */}
      <section id="lead-magnet" className="fp-inverted px-6 lg:px-10 py-24 lg:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <p className="fp-eyebrow mb-6">06 — Für die Selbermacher:innen</p>
          <h2 className="fp-display text-[clamp(2.25rem,5vw,4rem)] mb-8">
            Das Briefing, das ich selbst nutze.
          </h2>
          <p className="text-lg lg:text-xl leading-relaxed max-w-[55ch] mx-auto mb-10" style={{ color: "color-mix(in srgb, var(--fp-bone) 80%, transparent)" }}>
            Zehn Fragen. Dreißig Minuten. Ergebnis: eine Palette, die Sie gegenüber Designer:innen, Kolleg:innen und Ihrer Zielgruppe begründen können — statt &bdquo;das gefällt mir halt&ldquo;.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <a href="/farbpsychologie/color-briefing.pdf" download className="fp-btn-primary" style={{ background: "var(--fp-vermilion)" }}>
              Color-Briefing gratis laden (PDF)
            </a>
            <a href="https://hoeger.dev/#kontakt" className="fp-btn-secondary" style={{ borderColor: "var(--fp-bone)", color: "var(--fp-bone)" }}>
              Lieber persönlich besprechen
            </a>
          </div>
          <p className="fp-hex" style={{ color: "color-mix(in srgb, var(--fp-bone) 55%, transparent)" }}>
            Kein Newsletter-Zwang. Keine E-Mail-Pflicht. Direkter Download.
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-24 lg:py-32 max-w-4xl mx-auto">
        <div className="mb-14">
          <p className="fp-eyebrow mb-5">07 — Häufige Fragen</p>
          <h2 className="fp-display text-[clamp(2rem,4vw,3.25rem)]">
            Was Leute vorher wissen wollen.
          </h2>
        </div>
        <div className="space-y-6">
          {faq.map((f) => (
            <details
              key={f.q}
              className="group border-t pt-5"
              style={{ borderColor: "color-mix(in srgb, var(--fp-ink) 15%, transparent)" }}
            >
              <summary className="cursor-pointer flex items-start justify-between gap-6 text-[1.15rem] lg:text-xl font-medium" style={{ fontFamily: "var(--fp-font-display)" }}>
                <span>{f.q}</span>
                <span className="fp-hex shrink-0 mt-2" aria-hidden="true">+</span>
              </summary>
              <p className="mt-4 text-[1rem] leading-relaxed" style={{ color: "var(--fp-ink-soft)" }}>
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section className="px-6 lg:px-10 py-20 lg:py-28 max-w-5xl mx-auto text-center">
        <h2 className="fp-display text-[clamp(1.75rem,3.5vw,2.75rem)] mb-6 max-w-[22ch] mx-auto">
          Palette statt Bauchgefühl. Reden wir drüber.
        </h2>
        <p className="text-[1.05rem] leading-relaxed max-w-[50ch] mx-auto mb-8" style={{ color: "var(--fp-ink-soft)" }}>
          Kostenlose Erstberatung · 30 Minuten · unverbindlich. Ich höre zu, Sie entscheiden danach.
        </p>
        <a href="https://hoeger.dev/#kontakt" className="fp-btn-primary">
          Kostenlose Erstberatung anfragen →
        </a>
        <p className="fp-hex mt-12" style={{ color: "color-mix(in srgb, var(--fp-ink) 45%, transparent)" }}>
          Farbkreis-Referenz: Johannes Itten, &bdquo;Kunst der Farbe&ldquo; (1961) · Palette WCAG-geprüft · Beratung persönlich, nicht per Formular-Abrechnung
        </p>
      </section>
    </main>
  );
}
