import type { Metadata } from "next";
import { HeroCountdown, StickyCountdown } from "./Countdown";

const siteUrl = "https://hoeger.dev";
const mailto = (subject: string, paket?: string) =>
  `mailto:michael@hoeger.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `Hallo Michael,\n\nich interessiere mich für das Gründungsangebot${paket ? ` (${paket})` : ""}.\n\nMein Unternehmen: \nBranche: \n${paket ? "Website-Wünsche: \n" : ""}\nViele Grüße`
  )}`;

export const metadata: Metadata = {
  title: "Gründungsangebot – Ihre Website zum halben Preis | Michael Höger",
  description:
    "Nur im April: Professionelle Website zum Gründungspreis — 50% Rabatt für die ersten 5 Kunden. Persönliche Betreuung, bei Google gefunden werden, Datenschutz inklusive.",
  alternates: { canonical: "/gruendungsangebot/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${siteUrl}/gruendungsangebot/`,
    title: "Ihre neue Website — zum halben Preis",
    description:
      "Gründungsangebot April 2026: Professionelle Website ab 495 €. Nur 5 Plätze.",
    images: [{ url: `${siteUrl}/images/og-image.png`, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

const pakete = [
  {
    name: "Paket 1",
    title: "Sichtbar werden",
    claim: "Kunden finden Sie online — nicht die Konkurrenz.",
    regular: "990 €",
    founding: "495 €",
    save: "495 €",
    features: [
      "Bis zu 6 Seiten",
      "Optimiert für alle Geräte",
      "Kontaktformular",
      "Bei Google gefunden werden",
      "Google Unternehmensprofil",
      "Datenschutz (Cookie-Banner, Impressum)",
      "Sichere Verbindung (Verschlüsselung)",
      "1 Korrekturschleife",
      "Lieferzeit ca. 2 Wochen",
    ],
    featured: false,
  },
  {
    name: "Paket 2",
    title: "Anfragen auf Autopilot",
    claim: "Besucher werden zu Anfragen — automatisch.",
    regular: "1.990 €",
    founding: "995 €",
    save: "995 €",
    features: [
      "Alles aus Paket 1",
      "Bis zu 8 Seiten",
      "Design nach Ihrem Erscheinungsbild",
      "Bildergalerie / Portfolio",
      "Blog- oder News-Bereich",
      "Bessere Auffindbarkeit bei Google",
      "Terminbuchung / Angebotsformular",
      "Social-Media-Einbindung",
      "Performance-Optimierung",
      "2 Korrekturschleifen",
      "Lieferzeit ca. 3 Wochen",
    ],
    featured: true,
  },
  {
    name: "Paket 3",
    title: "Dein digitaler Mitarbeiter",
    claim: "24/7 für Sie da — für weniger als ein Minijobber.",
    regular: "3.490 €",
    founding: "1.745 €",
    save: "1.745 €",
    features: [
      "Alles aus Paket 2",
      "Bis zu 12 Seiten",
      "KI-Chatbot für Kundenanfragen",
      "Terminbuchung + Kalender",
      "Mehrsprachigkeit (2 Sprachen)",
      "Top-Platzierung bei Google + Werbeberatung",
      "Barrierefreiheit (für alle nutzbar)",
      "3 Korrekturschleifen",
      "1 Monat Betreuung inklusive",
      "Lieferzeit ca. 4–5 Wochen",
    ],
    featured: false,
  },
];

export default function Gruendungsangebot() {
  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-6 pt-16 pb-12 text-center">
        <span className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-[11px] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full mb-6">
          Gründungsangebot · April 2026
        </span>
        <h1 className="text-white text-4xl font-extrabold tracking-tight leading-tight max-w-[600px] mx-auto mb-3">
          Ihre neue Website —{" "}
          <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
            zum halben Preis.
          </span>
        </h1>
        <p className="text-slate-400 text-base max-w-[500px] mx-auto mb-7 leading-relaxed">
          Ich starte mein Webdesign-Business und suche 5 Gründungskunden,
          die von professioneller Qualität zum Einstiegspreis profitieren möchten.
        </p>

        {/* Urgency Box */}
        <div className="bg-gradient-to-br from-red-500/15 to-red-500/5 border-2 border-red-500/40 rounded-2xl p-6 max-w-[540px] mx-auto shadow-[0_0_40px_rgba(239,68,68,0.12),inset_0_0_20px_rgba(239,68,68,0.03)]">
          <div className="flex items-center justify-center gap-2.5 text-[17px] font-bold text-white mb-4">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
            Noch <span className="font-mono text-[22px] text-red-300">5</span> von 5 Plätzen verfügbar
          </div>
          <div className="text-[11px] text-slate-400 tracking-wide mb-2.5">Angebot endet in:</div>
          <HeroCountdown />
        </div>
      </div>

      {/* ── Trust Bar ── */}
      <div className="bg-white border-b border-slate-200 py-4 px-6 flex justify-center gap-10 flex-wrap">
        {["Persönliche Betreuung", "Optimiert für alle Geräte", "Bei Google gefunden werden", "Datenschutz inklusive", "Keine versteckten Kosten"].map((t) => (
          <span key={t} className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="text-teal-600 font-bold">✓</span> {t}
          </span>
        ))}
      </div>

      {/* ── Pakete ── */}
      <div className="max-w-[960px] mx-auto px-6 py-12">
        <h2 className="text-center text-2xl font-bold tracking-tight mb-2">Drei Pakete. Ein Ziel: Ihr Erfolg.</h2>
        <p className="text-center text-sm text-slate-500 mb-10">Regulärpreise durchgestrichen — Sie zahlen nur den Gründungspreis.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {pakete.map((p) => (
            <div
              key={p.name}
              className={`bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                p.featured
                  ? "border-2 border-teal-600 shadow-[0_0_0_1px_#0D9488,0_8px_24px_rgba(13,148,136,0.12)] relative"
                  : "border border-slate-200"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-b-lg">
                  Empfehlung
                </div>
              )}

              <div className="pt-7 pb-5 px-6 text-center">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{p.name}</div>
                <div className="text-xl font-bold text-slate-900 mb-1.5 tracking-tight">{p.title}</div>
                <div className="text-xs text-slate-500 italic">{p.claim}</div>
              </div>

              <div className="px-6 pb-5 text-center">
                <div className="font-mono text-lg text-red-500 line-through font-medium mb-0.5">{p.regular}</div>
                <div className="font-mono text-[32px] font-bold text-slate-900 tracking-tight leading-none">{p.founding}</div>
                <span className="inline-block bg-emerald-50 text-emerald-600 text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-1">
                  Sie sparen {p.save}
                </span>
                <div className="text-[11px] text-slate-400 mt-1">einmalig · Endpreis</div>
              </div>

              <div className="px-6 py-5 border-t border-slate-100 flex-1">
                <ul className="space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="text-[12.5px] text-slate-700 pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-teal-600 before:font-bold before:text-xs">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-6 pb-6 pt-4">
                <a
                  href={mailto(`Gründungsangebot ${p.name}`, `${p.name} – ${p.title}`)}
                  className={`block w-full py-3 text-center rounded-lg text-sm font-semibold transition-all duration-200 ${
                    p.featured
                      ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:-translate-y-0.5 hover:shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Jetzt anfragen
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Deal ── */}
        <div className="bg-white border border-slate-200 rounded-2xl p-9 mb-12 text-center">
          <h2 className="text-xl font-bold mb-2">Was wir uns von Ihnen wünschen</h2>
          <p className="text-sm text-slate-500 mb-6">Im Gegenzug zum Gründungspreis bitten wir Sie um drei kleine Dinge:</p>
          <div className="flex justify-center gap-8 flex-wrap">
            {[
              { icon: "⭐", title: "Google-Bewertung", desc: "Ein paar ehrliche Worte zu Ihrer Erfahrung mit mir." },
              { icon: "💬", title: "Kurzes Testimonial", desc: "Ein Zitat, das ich auf meiner Website verwenden darf." },
              { icon: "🖼️", title: "Portfolio-Referenz", desc: "Ihr Projekt darf in meinem Portfolio gezeigt werden." },
            ].map((d) => (
              <div key={d.title} className="text-center max-w-[180px]">
                <div className="text-3xl mb-2">{d.icon}</div>
                <h3 className="text-sm font-semibold mb-1">{d.title}</h3>
                <p className="text-xs text-slate-400">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Ablauf ── */}
        <h2 className="text-center text-2xl font-bold tracking-tight mb-2">So läuft es ab</h2>
        <p className="text-center text-sm text-slate-500 mb-10">Von der Anfrage bis zur fertigen Website — in vier Schritten.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {[
            { n: "1", title: "Gespräch", desc: "Wir klären Ihren Bedarf — kostenlos und unverbindlich." },
            { n: "2", title: "Angebot", desc: "Sie erhalten ein individuelles Angebot auf Basis des Gesprächs." },
            { n: "3", title: "Umsetzung", desc: "Ich baue Ihre Website — mit Abstimmung nach jeder Phase." },
            { n: "4", title: "Launch", desc: "Ihre Website geht live. Sie starten durch." },
          ].map((s) => (
            <div key={s.n} className="text-center">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-600 to-cyan-600 text-white font-mono text-sm font-semibold rounded-full flex items-center justify-center mx-auto mb-2.5">
                {s.n}
              </div>
              <h3 className="text-[13px] font-semibold mb-1">{s.title}</h3>
              <p className="text-[11px] text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Final CTA ── */}
        <div className="text-center py-12 px-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl mb-12">
          <h2 className="text-white text-2xl font-bold mb-2">Bereit? Sichern Sie sich Ihren Platz.</h2>
          <p className="text-slate-400 text-sm mb-6">10 Minuten Gespräch — kostet nichts, bringt Klarheit.</p>
          <a
            href={mailto("Gründungsangebot – Interesse")}
            className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-9 py-3.5 rounded-lg text-[15px] font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
          >
            Unverbindlich anfragen
          </a>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="text-center py-6 pb-20 text-[11px] text-slate-400">
        Michael Höger · IT-Beratung &amp; Webgestaltung ·{" "}
        <a href="mailto:michael@hoeger.dev" className="text-teal-600 no-underline">michael@hoeger.dev</a>
        <br />
        Alle Preise sind Endpreise (§19 UStG). Kosten für Hosting und Domains nicht enthalten.
      </div>

      {/* ── Sticky Bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 to-slate-800 border-t-2 border-teal-600 py-3 px-6 flex items-center justify-center gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        <span className="text-white text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          5 Plätze · endet in
        </span>
        <StickyCountdown />
        <a
          href={mailto("Gründungsangebot – Interesse")}
          className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-2.5 rounded-lg text-[13px] font-semibold hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
        >
          Jetzt Platz sichern
        </a>
      </div>
    </>
  );
}
