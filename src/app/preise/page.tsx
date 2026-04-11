import type { Metadata } from "next";

const siteUrl = "https://hoeger.dev";
const kontaktLink = "https://hoeger.dev/#kontakt";

export const metadata: Metadata = {
  title: "Leistungen & Preise — Website + Betreuung kombinieren | Michael Höger",
  description:
    "Professionelle Website ab 0 € — wenn Sie in die laufende Betreuung investieren, sinkt Ihr Erstellungspreis. Drei Pakete, faire Preise, persönlicher Ansprechpartner.",
  alternates: { canonical: "/preise/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${siteUrl}/preise/`,
    title: "Leistungen & Preise — Michael Höger",
    description:
      "Website + Betreuung kombinieren: Je höher die Betreuungsstufe, desto weniger zahlen Sie für die Erstellung.",
    images: [{ url: `${siteUrl}/images/og-image.png`, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

const pakete = [
  {
    name: "Paket 1",
    title: "Sichtbar werden",
    claim: "Kunden finden Sie online — nicht die Konkurrenz.",
    price: "990",
    sub: "oder ab 0 € mit Betreuung",
    features: [
      "Bis zu 6 Seiten",
      "Optimiert für alle Geräte",
      "Kontaktformular",
      "Bei Google gefunden werden",
      "Google Unternehmensprofil",
      "DSGVO-konform",
      "Sichere Verbindung (SSL)",
      "1 Korrekturschleife",
    ],
    lieferzeit: "ca. 2 Wochen",
    featured: false,
  },
  {
    name: "Paket 2",
    title: "Anfragen auf Autopilot",
    claim: "Besucher werden zu Anfragen — automatisch.",
    price: "1.990",
    sub: "oder ab 0 € mit Betreuung",
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
    ],
    lieferzeit: "ca. 3 Wochen",
    featured: true,
  },
  {
    name: "Paket 3",
    title: "Dein digitaler Mitarbeiter",
    claim: "24/7 für Sie da — für weniger als ein Minijobber.",
    price: "3.490",
    sub: "oder ab 990 € mit Betreuung",
    features: [
      "Alles aus Paket 2",
      "Bis zu 12 Seiten",
      "KI-Chatbot für Kundenanfragen",
      "Terminbuchung + Kalender",
      "Mehrsprachigkeit (2 Sprachen)",
      "Barrierefreiheit",
      "3 Korrekturschleifen",
      "1 Monat Betreuung inklusive",
    ],
    lieferzeit: "ca. 4–5 Wochen",
    featured: false,
  },
];

const matrix = {
  headers: ["Ohne Betreuung", "Basis · 59 €/Mo.", "Business · 99 €/Mo.", "Premium · 149 €/Mo."],
  rows: [
    {
      paket: "Sichtbar werden",
      cells: [
        { price: "990 €", original: null, badge: null, free: false },
        { price: "690 €", original: "990 €", badge: "-30 %", free: false },
        { price: "490 €", original: "990 €", badge: "-50 %", free: false },
        { price: "0 €", original: null, badge: null, free: true },
      ],
    },
    {
      paket: "Anfragen auf Autopilot",
      cells: [
        { price: "1.990 €", original: null, badge: null, free: false },
        { price: "1.490 €", original: "1.990 €", badge: "-25 %", free: false },
        { price: "990 €", original: "1.990 €", badge: "-50 %", free: false },
        { price: "0 €", original: null, badge: null, free: true },
      ],
    },
    {
      paket: "Dein digitaler Mitarbeiter",
      cells: [
        { price: "3.490 €", original: null, badge: null, free: false },
        { price: "2.990 €", original: "3.490 €", badge: "-15 %", free: false },
        { price: "1.990 €", original: "3.490 €", badge: "-43 %", free: false },
        { price: "990 €", original: "3.490 €", badge: "-71 %", free: false },
      ],
    },
  ],
};

const betreuung = [
  {
    name: "Hosting & Wartung",
    desc: "Webhosting, SSL, Backups, Uptime-Monitoring, Sicherheitsupdates, Domain-Verwaltung. Keine inhaltlichen Änderungen.",
    price: "20",
    unit: "monatlich",
  },
  {
    name: "Basis-Betreuung",
    desc: "Hosting & Wartung plus 1 kleine Änderung pro Monat (Text oder Bild, bis 30 Min.).",
    price: "59",
    unit: "monatlich",
  },
  {
    name: "Business-Betreuung",
    desc: "Alles aus Basis, plus: bis zu 3 Änderungen pro Monat, Google-Sichtbarkeit prüfen, Ladezeiten-Checks, Google Unternehmensprofil pflegen.",
    price: "99",
    unit: "monatlich",
  },
  {
    name: "Premium-Betreuung",
    desc: "Alles aus Business, plus: bis zu 5 Änderungen pro Monat, Chatbot-Pflege, monatlicher Google-Report, Quartals-Strategiegespräch, bevorzugter Support.",
    price: "149",
    unit: "monatlich",
  },
];

const addons = [
  { name: "Chatbot-Entwicklung", desc: "KI-gestützter Assistent für Kundenanfragen — einzeln buchbar.", price: "ab 500 €", unit: "Ersteinrichtung" },
  { name: "Prozessautomatisierung", desc: "Wiederkehrende Abläufe automatisieren — E-Mail-Verarbeitung, Benachrichtigungen, Datenübernahme.", price: "ab 300 €", unit: "je nach Aufwand" },
  { name: "Zusätzliche Sprache", desc: "Übersetzung und Einrichtung einer weiteren Sprachversion Ihrer Website.", price: "200 €", unit: "pro Sprache" },
  { name: "Stundensatz", desc: "Beratung, Schulung oder individuelle Aufgaben. Auch für Leistungen über den Retainer hinaus.", price: "75 €", unit: "pro Stunde" },
];

export default function PreisePage() {
  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-6 pt-16 pb-14 text-center">
        <span className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-[11px] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full mb-6">
          Leistungen &amp; Preise
        </span>
        <h1 className="text-white text-4xl font-extrabold tracking-tight leading-tight max-w-[680px] mx-auto mb-3">
          Ihre Website ist nur der Anfang.{" "}
          <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Die Betreuung macht den Unterschied.
          </span>
        </h1>
        <p className="text-slate-400 text-base max-w-[540px] mx-auto leading-relaxed">
          Je mehr Sie in die laufende Partnerschaft investieren,
          desto weniger zahlen Sie für die Erstellung — bis hin zu 0 €.
        </p>
      </div>

      {/* ── Trust Bar ── */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 py-4 px-6 flex justify-center gap-10 flex-wrap">
        {["Persönlicher Ansprechpartner", "Hosting auf eigener Infrastruktur", "DSGVO-konform", "Keine versteckten Kosten", "Jederzeit erreichbar"].map((t) => (
          <span key={t} className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="text-teal-600 font-bold">✓</span> {t}
          </span>
        ))}
      </div>

      <div className="max-w-[960px] mx-auto px-6 py-14">

        {/* ── Website-Pakete ── */}
        <h2 className="text-center text-2xl font-bold tracking-tight mb-2">Drei Pakete. Ein Ziel: Ihr Erfolg.</h2>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-10">
          Wählen Sie das passende Paket — und kombinieren Sie es mit einer Betreuungsstufe für maximalen Rabatt.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {pakete.map((p) => (
            <div
              key={p.name}
              className={`bg-white dark:bg-slate-800 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                p.featured
                  ? "border-2 border-teal-600 shadow-[0_0_0_1px_#0D9488,0_8px_24px_rgba(13,148,136,0.12)] relative"
                  : "border border-slate-200 dark:border-slate-700"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-b-lg">
                  Empfehlung
                </div>
              )}

              <div className="pt-7 pb-5 px-6 text-center">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{p.name}</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white mb-1.5 tracking-tight">{p.title}</div>
                <div className="text-xs text-slate-500 italic">{p.claim}</div>
              </div>

              <div className="px-6 pb-5 text-center">
                <div className="font-mono text-[32px] font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                  {p.price} €
                </div>
                <div className="text-[11px] text-slate-400 mt-1">einmalig · Endpreis</div>
                <span className="inline-block bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-2">
                  {p.sub}
                </span>
              </div>

              <div className="px-6 py-5 border-t border-slate-100 dark:border-slate-700 flex-1">
                <ul className="space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="text-[12.5px] text-slate-700 dark:text-slate-300 pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-teal-600 before:font-bold before:text-xs">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-6 pb-4 pt-2">
                <div className="text-[11px] text-slate-400 text-center">Lieferzeit: {p.lieferzeit}</div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <a
                  href={kontaktLink}
                  className={`block w-full py-3 text-center rounded-lg text-sm font-semibold transition-all duration-200 ${
                    p.featured
                      ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:-translate-y-0.5 hover:shadow-md"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  Jetzt anfragen
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Rabatt-Matrix ── */}
        <div className="rounded-2xl overflow-hidden border-2 border-teal-600 shadow-[0_8px_32px_rgba(13,148,136,0.12)] mb-16">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 pt-7 pb-2">
            <h2 className="text-white text-xl font-bold tracking-tight">
              Ihr Vorteil: Website + Betreuung kombinieren
            </h2>
            <p className="text-white/80 text-sm italic mb-5">
              Je höher Ihre Betreuungsstufe, desto weniger zahlen Sie für die Erstellung.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800">
                  <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-4 text-xs uppercase tracking-wider">
                    Website-Paket
                  </th>
                  {matrix.headers.map((h) => (
                    <th key={h} className="text-center font-semibold text-slate-600 dark:text-slate-300 px-4 py-4 text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-900">
                {matrix.rows.map((row) => (
                  <tr key={row.paket} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-6 py-5 font-semibold text-slate-900 dark:text-white text-[13px]">
                      {row.paket}
                    </td>
                    {row.cells.map((cell, i) => (
                      <td key={i} className="px-4 py-5 text-center">
                        {cell.free ? (
                          <span className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg">
                            0 € inklusive
                          </span>
                        ) : (
                          <div>
                            {cell.original && (
                              <span className="block text-slate-400 text-xs line-through font-mono">{cell.original}</span>
                            )}
                            <span className={`font-mono font-bold text-[14px] ${cell.original ? "text-teal-600" : "text-slate-900 dark:text-white"}`}>
                              {cell.price}
                            </span>
                            {cell.badge && (
                              <span className="block text-teal-600 text-[10px] font-semibold mt-0.5">{cell.badge}</span>
                            )}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-teal-50 dark:bg-teal-900/20 px-8 py-4 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Mindestlaufzeit 12 Monate, danach monatlich kündbar.
              Nach 12 Monaten läuft Ihre Betreuung weiter — <strong className="text-teal-600">die Website haben Sie bereits.</strong>
            </p>
          </div>
        </div>

        {/* ── Betreuungspakete ── */}
        <h2 className="text-2xl font-bold tracking-tight mb-2">Laufende Betreuung</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          Ihre Website läuft — und Sie müssen sich um nichts kümmern.
          Ich halte alles aktuell, sicher und schnell.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {betreuung.map((b) => (
            <div
              key={b.name}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 flex justify-between items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-[15px] mb-1">{b.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{b.desc}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-mono text-xl font-bold text-slate-900 dark:text-white">{b.price} €</span>
                <span className="block text-[10px] text-slate-400 tracking-wide">{b.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Add-ons ── */}
        <h2 className="text-2xl font-bold tracking-tight mb-2">Einzelleistungen &amp; Add-ons</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          Brauchen Sie etwas Spezielles? Diese Leistungen sind einzeln oder ergänzend buchbar.
        </p>

        <div className="space-y-3 mb-16">
          {addons.map((a) => (
            <div
              key={a.name}
              className="flex justify-between items-center py-4 px-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            >
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-[14px]">{a.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{a.desc}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-mono text-lg font-bold text-slate-900 dark:text-white">{a.price}</span>
                <span className="block text-[10px] text-slate-400 tracking-wide">{a.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Hinweise ── */}
        <div className="space-y-3 mb-16">
          {[
            { label: "Preise", text: "Alle Beträge sind Endpreise. Gemäß §19 UStG wird keine Umsatzsteuer berechnet. Kosten für externe Dienste (z.B. Google Workspace) sind nicht enthalten." },
            { label: "Hosting", text: "Alle Websites werden auf meiner professionellen Infrastruktur gehostet. So kann ich Sicherheit, Geschwindigkeit und Verfügbarkeit garantieren." },
            { label: "Support", text: "Erreichbarkeit Mo–Fr 18–21 Uhr, Sa 10–16 Uhr. Reaktionszeit innerhalb von 24 Stunden. Automatische Überwachung rund um die Uhr." },
            { label: "Preisanpassung", text: "Die vereinbarten Preise gelten für die ersten 12 Monate. Danach ist eine jährliche Anpassung um maximal 5 % möglich. Anpassungen werden mindestens 4 Wochen vorher schriftlich angekündigt." },
          ].map((h) => (
            <div key={h.label} className="bg-slate-50 dark:bg-slate-800/50 border-l-2 border-teal-600 px-5 py-3.5 rounded-r-lg">
              <span className="text-xs text-slate-700 dark:text-slate-300">
                <strong className="text-slate-900 dark:text-white">{h.label}:</strong> {h.text}
              </span>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="text-center py-14 px-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl">
          <h2 className="text-white text-2xl font-bold mb-2">Bereit? Lassen Sie uns sprechen.</h2>
          <p className="text-slate-400 text-sm mb-7 max-w-[440px] mx-auto">
            In einem kurzen Gespräch finden wir heraus, welches Paket und welche Betreuungsstufe
            am besten zu Ihnen passt — kostenlos und unverbindlich.
          </p>
          <a
            href={kontaktLink}
            className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-9 py-3.5 rounded-lg text-[15px] font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
          >
            Unverbindlich anfragen
          </a>
        </div>
      </div>

      {/* ── Footer-Hinweis ── */}
      <div className="text-center py-8 text-[11px] text-slate-400">
        Stand: April 2026. Preisanpassungen vorbehalten — laufende Vereinbarungen bleiben unberührt.
      </div>
    </>
  );
}
