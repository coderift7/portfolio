import type { Metadata } from "next";
import { siteUrl } from "@/config/site";

const kontaktLink = "https://hoeger.dev/#kontakt";

export const metadata: Metadata = {
  title: "Professionelle Webtexte — Texte, die aus Besuchern Kunden machen | Michael Höger",
  description:
    "Ihre Website sieht gut aus, aber es kommen keine Anfragen? Das liegt oft an den Texten. Ich schreibe für Ihre Website — so, wie Ihre Kunden denken und suchen.",
  alternates: { canonical: "/texterstellung/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${siteUrl}/texterstellung/`,
    title: "Professionelle Webtexte — Michael Höger",
    description:
      "Texte, die aus Besuchern Kunden machen. Ich schreibe für Ihre Website — so, wie Ihre Kunden denken und suchen.",
    images: [{ url: `${siteUrl}/images/og-image.png`, width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

const pakete = [
  {
    name: "Starter",
    title: "Die wichtigsten 4 Seiten",
    claim: "Klar, überzeugend, auf den Punkt.",
    price: "350",
    features: [
      "Startseite, Über mich, Leistungen, Kontakt",
      "Ca. 1.500-2.000 Wörter insgesamt",
      "Auf Ihre Zielgruppe zugeschnitten",
      "Auffindbar bei Google",
      "1 Korrekturschleife",
    ],
    lieferzeit: "ca. 5 Werktage",
    featured: false,
  },
  {
    name: "Business",
    title: "Ihr kompletter Webauftritt",
    claim: "Mehr Seiten, mehr Sichtbarkeit, mehr Anfragen.",
    price: "650",
    features: [
      "Alles aus Starter",
      "6-8 Seiten komplett",
      "FAQ-Bereich",
      "2 Blogartikel für Google",
      "Stärkere Auffindbarkeit",
      "2 Korrekturschleifen",
    ],
    lieferzeit: "ca. 10 Werktage",
    featured: true,
  },
  {
    name: "Premium",
    title: "Langfristiges Wachstum",
    claim: "Frische Inhalte, ohne selbst zu schreiben.",
    price: "1.200",
    features: [
      "Alles aus Business",
      "Monatlich 2 neue Blogartikel",
      "Über 6 Monate — 12 Artikel insgesamt",
      "Themenplanung inklusive",
      "Sie kümmern sich um nichts",
    ],
    lieferzeit: "Erstlieferung in 10 Werktagen",
    featured: false,
  },
];

const probleme = [
  {
    nr: "1",
    title: "Sie beschreiben, statt zu überzeugen",
    text: "\u201EWir bieten individuelle L\u00F6sungen f\u00FCr Ihr Unternehmen.\u201C \u2014 Das steht auf tausend Websites. Warum sollte jemand ausgerechnet bei Ihnen anfragen?",
  },
  {
    nr: "2",
    title: "Ihre Kunden finden sich nicht wieder",
    text: "Fachbegriffe klingen professionell, aber Ihre Kunden googeln anders. Wenn die Texte nicht deren Sprache sprechen, scrollen sie weiter.",
  },
  {
    nr: "3",
    title: "Es fehlt ein klarer nächster Schritt",
    text: "Jemand liest Ihre Seite, findet alles interessant — und dann? Ohne klare Handlungsaufforderung verlieren Sie Besucher, die eigentlich kaufbereit waren.",
  },
];

const schritte = [
  {
    nr: "01",
    title: "Gespräch",
    text: "30 Minuten: Wer sind Ihre besten Kunden? Was überzeugt sie? Welche Fragen kommen immer wieder?",
  },
  {
    nr: "02",
    title: "Recherche",
    text: "Ich analysiere Ihre Branche, Ihre Wettbewerber und die Suchbegriffe Ihrer Kunden — aus deren Sicht, nicht aus Ihrer.",
  },
  {
    nr: "03",
    title: "Texte schreiben",
    text: "Klare, ehrliche Texte die auf den Punkt kommen. Kein Marketing-Blabla, sondern S\u00E4tze, bei denen Ihre Kunden denken: \u201EGenau das brauche ich.\u201C",
  },
  {
    nr: "04",
    title: "Feinschliff",
    text: "Sie geben Rückmeldung, ich passe an. Fertig.",
  },
];

const faqs = [
  {
    q: "Kann ich die Texte auch ohne Website bei Ihnen buchen?",
    a: "Ja. Ich schreibe Texte auch für bestehende Websites. Sie bekommen die fertigen Texte als Dokument und können sie selbst einpflegen — oder ich übernehme das für 75 €/Stunde.",
  },
  {
    q: "Woher wissen Sie, was meine Kunden anspricht?",
    a: "Aus unserem Erstgespräch, der Analyse Ihrer Branche, Ihrer Wettbewerber und der Suchbegriffe Ihrer Kunden. Ich schreibe nicht ins Blaue.",
  },
  {
    q: "Was ist, wenn mir die Texte nicht gefallen?",
    a: "Jedes Paket enthält mindestens eine Korrekturschleife. In der Praxis treffe ich meistens beim ersten Mal den richtigen Ton — aber Anpassungen sind selbstverständlich inklusive.",
  },
  {
    q: "Schreiben Sie die Texte mit KI?",
    a: "KI ist ein Werkzeug, das ich gezielt einsetze — so wie ein Tischler eine elektrische Säge benutzt. Die Strategie, die Kundenkenntnis und der Feinschliff kommen von mir. Sie bekommen keine Standardtexte, sondern Texte, die nach Ihrem Unternehmen klingen.",
  },
  {
    q: "Wie läuft die Bezahlung?",
    a: "50 % bei Auftragsbestätigung, 50 % nach Abnahme. Beim Premium-Paket zahlen Sie die Blogartikel monatlich.",
  },
];

export default function TexterstellungPage() {
  return (
    <main id="main">
      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 px-6 pt-28 pb-14 text-center">
        <span className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-[11px] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full mb-6">
          Texterstellung
        </span>
        <h1 className="text-white text-4xl font-extrabold tracking-tight leading-tight max-w-[680px] mx-auto mb-3">
          Ihre Website sieht gut aus.{" "}
          <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Aber sie verkauft nicht.
          </span>
        </h1>
        <p className="text-slate-400 text-base max-w-[540px] mx-auto leading-relaxed mb-8">
          Das liegt meistens an den Texten. Ich schreibe für Ihre Website —
          so, wie Ihre Kunden denken und suchen.
        </p>
        <a
          href={kontaktLink}
          className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-sm font-semibold px-8 py-3 rounded-lg hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
        >
          Unverbindlich anfragen
        </a>
      </div>

      <div className="max-w-[960px] mx-auto px-6 py-14">

        {/* ── Problem-Sektion ── */}
        <h2 className="text-center text-2xl font-bold tracking-tight mb-2">
          Die 3 häufigsten Fehler auf Firmenwebsites
        </h2>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-10">
          Erkennen Sie sich wieder? Dann sind Sie nicht allein — und es lässt sich leicht ändern.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {probleme.map((p) => (
            <div
              key={p.nr}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-4">
                <span className="text-red-500 font-bold text-sm">{p.nr}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{p.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

        {/* ── Vorher / Nachher ── */}
        <h2 className="text-center text-2xl font-bold tracking-tight mb-2">
          So klingt der Unterschied
        </h2>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-10">
          Gleicher Anbieter. Gleiche Leistung. Andere Wirkung.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <span className="text-red-500 font-bold text-sm">&#x2717;</span>
              </span>
              <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">Vorher</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed italic">
              &bdquo;Wir bieten individuelle und ganzheitliche Fitness- und
              Ern&auml;hrungskonzepte f&uuml;r Ihr pers&ouml;nliches Wohlbefinden.
              Profitieren Sie von unserer langj&auml;hrigen Erfahrung im Bereich
              Personal Training und Ern&auml;hrungsberatung.&ldquo;
            </p>
            <p className="text-xs text-red-400 mt-3">Klingt wie jede andere Website. Kein Grund, anzurufen.</p>
          </div>
          <div className="bg-teal-50 dark:bg-teal-900/10 border-2 border-teal-600 rounded-2xl p-6 shadow-[0_4px_16px_rgba(13,148,136,0.1)]">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                <span className="text-teal-600 font-bold text-sm">&#x2713;</span>
              </span>
              <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">Nachher</span>
            </div>
            <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-medium">
              &bdquo;In 12 Wochen schmerzfrei und leistungsf&auml;hig &mdash; mit einem Trainer,
              der selbst wei&szlig; wie sich Verletzungen anf&uuml;hlen. F&uuml;r Berufst&auml;tige
              in Limburg, die keine Zeit f&uuml;r Umwege haben.&ldquo;
            </p>
            <p className="text-xs text-teal-600 mt-3 font-medium">Sofort klar: f&uuml;r wen, was, warum hier.</p>
          </div>
        </div>

        {/* ── Was ändert sich ── */}
        <div className="rounded-2xl overflow-hidden border-2 border-teal-600 shadow-[0_8px_32px_rgba(13,148,136,0.12)] mb-16 p-8">
          <h2 className="text-xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white">
            Was professionelle Webtexte &auml;ndern
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Besucher verstehen sofort, was Sie anbieten und warum es relevant ist",
              "Google zeigt Ihre Seite bei den richtigen Suchbegriffen",
              "Mehr Anfragen \u2014 ohne einen Euro mehr in Werbung zu stecken",
              "Sie heben sich ab von Wettbewerbern, die alle gleich klingen",
            ].map((t) => (
              <div key={t} className="flex items-start gap-3">
                <span className="text-teal-600 font-bold text-lg mt-0.5">&#x2713;</span>
                <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Ablauf (2x2 Grid, grössere Texte) ── */}
        <h2 className="text-center text-2xl font-bold tracking-tight mb-2">
          So entstehen Ihre Texte
        </h2>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-10">
          Vier Schritte, kein Aufwand f&uuml;r Sie.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {schritte.map((s) => (
            <div key={s.nr} className="flex items-start gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">{s.nr}</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{s.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Für wen ── */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 mb-16 text-center">
          <h2 className="text-xl font-bold tracking-tight mb-3 text-slate-900 dark:text-white">
            Für wen ist das?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-[600px] mx-auto mb-5">
            Für alle Selbständigen, die wissen was sie können — aber keine
            Zeit haben, das überzeugend aufzuschreiben.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Personal Trainer", "Handwerker", "Berater", "Coaches", "Ärzte & Therapeuten", "Agenturen", "Gastronomen"].map((b) => (
              <span key={b} className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-medium px-3.5 py-1.5 rounded-full">{b}</span>
            ))}
          </div>
        </div>

        {/* ── Pakete ── */}
        <h2 className="text-center text-2xl font-bold tracking-tight mb-2">Drei Pakete. Klare Preise.</h2>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-10">
          W&auml;hlen Sie, was zu Ihrem Bedarf passt.
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

        {/* ── Kombi-Hinweis ── */}
        <div className="rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 p-8 mb-16 text-white">
          <h2 className="text-xl font-bold tracking-tight mb-2">
            Am besten zusammen mit Ihrer neuen Website
          </h2>
          <p className="text-white/80 text-sm mb-5 max-w-[600px]">
            Wenn ich Ihre Website baue, kenne ich Ihr Geschäft bereits. Die Texte entstehen passgenau
            zum Design — kein Hin-und-Her, kein Copy-Paste aus alten Unterlagen.
          </p>
          <div className="inline-block bg-white/15 backdrop-blur-sm rounded-lg px-5 py-3">
            <span className="font-bold text-lg">15 % Kombi-Rabatt</span>
            <span className="text-white/70 text-sm ml-2">auf die Texterstellung bei Website-Buchung</span>
          </div>
        </div>

        {/* ── FAQ ── */}
        <h2 className="text-center text-2xl font-bold tracking-tight mb-10">Häufige Fragen</h2>

        <div className="space-y-4 mb-16 max-w-[720px] mx-auto">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
            >
              <summary className="px-6 py-4 cursor-pointer text-sm font-semibold text-slate-900 dark:text-white flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                {f.q}
                <span className="text-slate-400 group-open:rotate-45 transition-transform duration-200 text-lg ml-4">+</span>
              </summary>
              <div className="px-6 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {f.a}
              </div>
            </details>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="text-center py-10 border-t border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold tracking-tight mb-3 text-slate-900 dark:text-white">Klingt interessant?</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-[480px] mx-auto">
            Erzählen Sie mir in 2 Minuten, worum es geht — ich melde mich mit einer ehrlichen Einschätzung,
            ob und wie ich helfen kann.
          </p>
          <a
            href={kontaktLink}
            className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-sm font-semibold px-8 py-3 rounded-lg hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
          >
            Unverbindlich anfragen
          </a>
        </div>
      </div>
    </main>
  );
}
