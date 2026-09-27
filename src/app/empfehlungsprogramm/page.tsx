import type { Metadata } from "next";
import { siteUrl } from "@/config/site";

// WhatsApp-Nummer im wa.me-Format (siteConfig.phone: "+49 162 9255254").
const WHATSAPP_NUMMER = "491629255254";

const kontaktLink = "/#kontakt";
const empfehlungAnker = "#empfehlung-senden";

const mailtoBody =
  "mailto:hallo@hoeger.dev?subject=Empfehlung&body=" +
  "Hi%20Michael%2C%0A%0A" +
  "ich%20moechte%20dir%20jemanden%20empfehlen%3A%0A%0A" +
  "Name%3A%0A" +
  "Firma%3A%0A" +
  "Kontakt%3A%0A" +
  "Kurz%20worum%20es%20geht%3A%0A%0A" +
  "Viele%20Gruesse";

const whatsappLink = `https://wa.me/${WHATSAPP_NUMMER}?text=Hi%20Michael%2C%20ich%20habe%20eine%20Empfehlung%20f%C3%BCr%20dich...`;

export const metadata: Metadata = {
  title: "Empfehlungsprogramm — hoeger.dev | Website-Freelancer",
  description:
    "Empfiehl mich weiter und sag mir selbst, wie du dich bedanken lassen willst: Cash, Betreuungs-Gutschrift oder Projekt-Gutschrift. Bis zu 400 Euro.",
  alternates: { canonical: "/empfehlungsprogramm/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${siteUrl}/empfehlungsprogramm/`,
    title: "Empfehlungsprogramm — Michael Höger",
    description:
      "Empfiehl mich weiter — such dir dein Dankeschön selbst aus. Cash, Betreuungs-Gutschrift oder Projekt-Gutschrift. Bis zu 400 Euro.",
    images: [{ url: `${siteUrl}/images/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Empfehlungsprogramm — Michael Höger",
    description:
      "Empfiehl mich weiter — such dir dein Dankeschön selbst aus. Bis zu 400 Euro.",
    images: [`${siteUrl}/images/og-image.png`],
  },
  robots: { index: true, follow: true },
};

// ── Content ────────────────────────────────────────────────────────────

const schritte = [
  {
    nr: "01",
    title: "Du empfiehlst mich.",
    text: "Du kennst jemanden, der eine neue Website oder eine laufende Betreuung braucht — und nennst meinen Namen oder gibst mir den Kontakt.",
  },
  {
    nr: "02",
    title: "Der Neukunde bucht.",
    text: "Sobald der Vertrag unterschrieben und die Anzahlung bei mir ist, ist die Empfehlung „eingelöst“ — bei dir muss nichts weiter passieren.",
  },
  {
    nr: "03",
    title: "Du bekommst dein Dankeschön.",
    text: "Du wählst aus drei Optionen — Geld, Betreuung oder Gutschrift — und ich melde mich innerhalb von einer Woche bei dir.",
  },
];

const optionen = [
  {
    key: "cash",
    label: "Option A",
    headline: "Geld auf dein Konto.",
    wert: "10 % vom Erstauftrag",
    spanne: "min. 150 Euro, max. 400 Euro",
    text: "Zehn Prozent vom Gesamtvolumen des Erstauftrags (Website-Paket plus mitgebuchte Zusatzleistungen, jeweils Endpreis) — direkt überwiesen, sobald die Anzahlung des Neukunden bei mir ist.",
    idealFuer: "Alle, die sich einfach freuen wollen — ohne Gegenleistung, ohne Bindung.",
    featured: false,
  },
  {
    key: "retainer",
    label: "Option B",
    headline: "Zwei Monate Betreuung gratis.",
    wert: "2 Monate Betreuung geschenkt",
    spanne: "max. 400 Euro Gegenwert",
    text: "Wenn du bereits Kunde bei mir bist, schreibe ich dir zwei Monatsbeiträge deiner Betreuung gut — bis zu einem Gegenwert von 400 Euro. Updates, Backups und kleine Änderungen laufen einfach weiter.",
    idealFuer: "Bestandskunden, die sowieso monatlich bezahlen und entspannt was zurückbekommen wollen.",
    featured: true,
  },
  {
    key: "gutschrift",
    label: "Option C",
    headline: "300 Euro für dein nächstes Projekt.",
    wert: "300 Euro Gutschrift",
    spanne: null,
    text: "Dreihundert Euro, die auf dein nächstes Projekt bei mir angerechnet werden — egal ob Relaunch, neue Landingpage oder Zusatzmodul.",
    idealFuer: "Kunden, die in den nächsten 24 Monaten ohnehin noch etwas bei mir planen.",
    featured: false,
  },
];

const spielregeln = [
  {
    bold: "Empfehlung zählt ab Anzahlung.",
    rest: "Das Dankeschön wird fällig, sobald der empfohlene Neukunde den Projektvertrag unterschrieben und die Anzahlung geleistet hat — nicht schon beim Erstgespräch.",
  },
  {
    bold: "Cash-Variante: einmal pro Kalenderjahr und Empfehler.",
    rest: "Wer mehrfach im selben Jahr erfolgreich empfiehlt, wählt ab der zweiten Empfehlung zwischen Betreuungs-Gutschrift oder Leistungs-Gutschrift (steuerlich-administrativer Grund).",
  },
  {
    bold: "Heilberufe-Regel.",
    rest: "Ärztinnen, Ärzte, Zahnärzte, Psychotherapeut:innen und andere Angehörige der Heilberufe sind von der Cash-Variante ausgeschlossen — berufsrechtliche Vorgaben (Zuweiserpauschalen-Verbot). Betreuungs- und Leistungs-Gutschrift bleiben möglich, solange sie nicht an konkrete Patienten-Zuweisungen gekoppelt sind.",
  },
  {
    bold: "Gutschriften sind 24 Monate gültig.",
    rest: "Betreuungs-Gutschrift und Leistungs-Gutschrift verfallen 24 Monate nach Ausstellung. Das reicht entspannt für ein Folgeprojekt.",
  },
  {
    bold: "Selbst-Empfehlungen zählen nicht.",
    rest: "Eigene Firmen, Ehepartner oder gemeinsame Haushalte sind ausgenommen.",
  },
  {
    bold: "Der Neukunde muss vorher noch nicht Kontakt gehabt haben.",
    rest: "Ein schon laufendes Angebot, das nur „umgetaggt“ wird, zählt nicht als Empfehlung.",
  },
  {
    bold: "Dankeschön wird nur bei erfolgreicher Projektabwicklung fällig.",
    rest: "Bei Rücktritt innerhalb der 14-Tage-Widerrufsfrist (B2C) bzw. bei Stornierung vor Projektstart entfällt die Zahlung — ist aber bei abgeschlossener Anzahlung der Regelfall nicht.",
  },
  {
    bold: "Zusatzleistungen zählen mit — 30-Tage-Fenster.",
    rest: "Die Provision von 10 % berechnet sich vom Gesamtvolumen des Erstauftrags: Website-Paket plus alle mitgebuchten Zusatzleistungen (Texterstellung, Logo-Reinzeichnung, Zusatzmodule, einmaliges Setup). Was dein Kontakt innerhalb von 30 Tagen nach Vertragsabschluss noch dazu bucht, zählt ebenfalls mit. Die Obergrenze von 400 Euro bleibt. Nicht eingerechnet: laufende Betreuung (dafür gibt es Option B), Hosting & Wartung, Zukäufe nach den 30 Tagen.",
  },
];

const faqs = [
  {
    q: "Was genau zählt als Empfehlung?",
    a: "Du nennst mir den Kontakt (Name + E-Mail oder Telefonnummer) oder der Neukunde sagt im Erstgespräch von sich aus, dass er durch dich auf mich gekommen ist. Letzteres ist unbürokratischer — du musst nichts eintragen.",
  },
  {
    q: "Wie wird ausgezahlt?",
    a: "Cash geht innerhalb von sieben Tagen nach Eingang der Anzahlung per Überweisung auf dein Konto. Die Betreuungs-Gutschrift wird mit deiner nächsten Rechnung verrechnet. Die Leistungs-Gutschrift bekommst du als PDF und ich hinterlege sie in deinem Kundenkonto.",
  },
  {
    q: "Was ist, wenn der Neukunde vom Projekt wieder abspringt?",
    a: "Sobald die Anzahlung bei mir ist, ist die Empfehlung „verdient“ — auch wenn das Projekt später aus Kunden-Gründen gestoppt wird. Einzige Ausnahme: Rücktritt innerhalb der gesetzlichen 14-Tage-Widerrufsfrist bei Verbraucherkunden. In dem (sehr seltenen) Fall entfällt die Auszahlung.",
  },
  {
    q: "Kann ich mehrfach empfehlen?",
    a: "Sehr gerne, ja. Cash-Auszahlung ist auf eine pro Kalenderjahr begrenzt — ab der zweiten erfolgreichen Empfehlung im selben Jahr wählst du zwischen Betreuungs-Gutschrift oder Leistungs-Gutschrift. Die Höhe bleibt gleich.",
  },
  {
    q: "Ist der Willkommensrabatt mit anderen Preisvorteilen kombinierbar?",
    a: "Ja, mit dem Preisvorteil für die Buchung mit Betreuung: Die 100 Euro Willkommensrabatt kommen zusätzlich auf den einmaligen Website-Preis, der auf der Preisseite schon gilt. Mit zeitlich begrenzten Aktionsrabatten wird nicht kombiniert — dann gilt der jeweils günstigere Rabatt für den Neukunden. Alle Beträge sind Endpreise; als Kleinunternehmer weise ich keine Umsatzsteuer aus (§ 19 UStG).",
  },
  {
    q: "Zählen Zusatzleistungen (Texte, Logo, Module) mit?",
    a: "Ja. Die Provision berechnet sich vom Gesamtvolumen des Erstauftrags — also Website-Paket plus alle im Erstauftrag gebuchten Zusatzleistungen (Texterstellung, Logo-Reinzeichnung, Zusatzmodule, einmaliges Setup). Auch was dein Kontakt innerhalb von 30 Tagen nach Vertragsabschluss noch dazu bucht, zählt mit. Beispiel: „Anfragen gewinnen“ (3.490 Euro) plus Texterstellung Business (650 Euro) = 4.140 Euro → 10 % wären 414 Euro, ausgezahlt wird die Obergrenze von 400 Euro. Nicht eingerechnet: laufende Betreuung (dafür gibt es Option B), Hosting & Wartung, Zukäufe nach den 30 Tagen.",
  },
  {
    q: "Muss ich die Auszahlung versteuern?",
    a: "Die Cash-Auszahlung ist für Privatpersonen bis zu 256 Euro pro Jahr steuerfrei (§22 Nr. 3 EStG — „sonstige Einkünfte“, Freigrenze). Darüber hinausgehende Beträge sind in der Einkommensteuererklärung anzugeben. Betreuungs- und Leistungs-Gutschriften sind Rabatte und werden nicht als Einkommen gewertet. Im Zweifel: kurz mit deinem Steuerberater abstimmen — ich darf dir das rechtlich nicht verbindlich sagen.",
  },
];

// ── Strukturierte Daten ────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Empfehlungsprogramm" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// ── Page ───────────────────────────────────────────────────────────────

export default function EmpfehlungsprogrammPage() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ── */}
      <section
        aria-labelledby="hero-h1"
        className="bg-gradient-to-br from-slate-900 to-slate-800 px-6 pt-28 pb-14 text-center"
      >
        <span className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-[11px] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full mb-6">
          Empfehlungsprogramm
        </span>
        <h1
          id="hero-h1"
          className="text-white text-4xl font-extrabold tracking-tight leading-tight max-w-[780px] mx-auto mb-4"
        >
          Empfehl mich weiter —{" "}
          <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            und such dir dein Dankeschön selbst aus.
          </span>
        </h1>
        <p className="text-slate-300 text-base max-w-[620px] mx-auto leading-relaxed mb-8">
          Wenn durch deine Empfehlung ein neues Website-Projekt zustande kommt, bekommst du
          bis zu 400 Euro — und entscheidest selbst, ob als Geld, als kostenlose Betreuung
          oder als Gutschrift für dein nächstes eigenes Projekt.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <a
            href={empfehlungAnker}
            className="btn-brand inline-block text-sm font-semibold px-8 py-3 rounded-lg"
          >
            Jemanden im Kopf? Schreib mir kurz.
          </a>
          <a
            href="#so-funktionierts"
            className="text-teal-300 hover:text-teal-200 text-sm font-medium underline underline-offset-4"
          >
            So funktioniert&apos;s →
          </a>
        </div>
      </section>

      <div className="max-w-[960px] mx-auto px-6 py-14">
        {/* ── So funktioniert's ── */}
        <section aria-labelledby="so-funktionierts-h2" id="so-funktionierts" className="mb-16 scroll-mt-24">
          <h2
            id="so-funktionierts-h2"
            className="text-center text-2xl font-bold tracking-tight mb-2"
          >
            So funktioniert&apos;s
          </h2>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-10">
            Drei Schritte — der Rest passiert automatisch.
          </p>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 list-none">
            {schritte.map((s) => (
              <li
                key={s.nr}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-sm" aria-hidden="true">
                    {s.nr}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Deine 3 Optionen ── */}
        <section aria-labelledby="optionen-h2" className="mb-16">
          <h2
            id="optionen-h2"
            className="text-center text-2xl font-bold tracking-tight mb-2"
          >
            Deine 3 Optionen
          </h2>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-10">
            Du entscheidest, wie du dich bedanken lassen willst.
          </p>

          <ul role="list" className="grid grid-cols-1 md:grid-cols-3 gap-5 list-none">
            {optionen.map((o) => (
              <li
                key={o.key}
                className={`bg-white dark:bg-slate-800 rounded-2xl flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                  o.featured
                    ? "border-2 border-teal-600 shadow-[0_0_0_1px_#0D9488,0_8px_24px_rgba(13,148,136,0.12)] relative"
                    : "border border-slate-200 dark:border-slate-700"
                }`}
              >
                {o.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                    Beliebt bei Bestandskunden
                  </div>
                )}

                <article className="flex flex-col h-full">
                  <div className="pt-7 pb-5 px-6 text-center">
                    <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                      <span className="sr-only">Dankeschön-Option: </span>
                      {o.label}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                      {o.headline}
                    </h3>
                  </div>

                  <div className="px-6 pb-5 text-center">
                    <div className="font-mono text-[22px] font-bold text-teal-600 dark:text-teal-400 tracking-tight leading-tight">
                      {o.wert}
                    </div>
                    {o.spanne && (
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {o.spanne}
                      </div>
                    )}
                  </div>

                  <div className="px-6 py-5 border-t border-slate-100 dark:border-slate-700 flex-1">
                    <p className="text-[13.5px] text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      {o.text}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        Ideal für:
                      </span>{" "}
                      {o.idealFuer}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Für den Neukunden auch ── */}
        <section
          aria-labelledby="neukunde-h2"
          className="rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 p-8 mb-16 text-white"
        >
          <h2 id="neukunde-h2" className="text-xl font-bold tracking-tight mb-3">
            Auch der Neukunde bekommt etwas.
          </h2>
          <p className="text-white/90 text-sm leading-relaxed max-w-[620px]">
            Eine Empfehlung ist keine Einbahnstraße. Wer auf dein Zureden hin bei mir bucht,
            bekommt <strong className="font-semibold">100 Euro Willkommensrabatt</strong> auf
            den einmaligen Website-Preis — zusätzlich zum Preisvorteil, den es bei Buchung mit
            Betreuung ohnehin gibt.
          </p>
        </section>

        {/* ── Beispiel-Rechnung ── */}
        <section aria-labelledby="beispiel-h2" className="mb-16">
          <h2
            id="beispiel-h2"
            className="text-center text-2xl font-bold tracking-tight mb-2"
          >
            Beispiel-Rechnung
          </h2>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-10">
            Drei konkrete Beispiele — alle Beträge sind Endpreise nach § 19 UStG.
          </p>

          {/* Szenario 1 */}
          <article className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 md:p-8 mb-6">
            <div className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-2">
              Szenario 1 — Cash-Auszahlung
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-5">
              Du empfiehlst einen befreundeten Handwerksbetrieb. Der bucht bei mir das{" "}
              <strong className="font-semibold">
                Paket „Anfragen gewinnen“ (3.490 Euro)
              </strong>
              .
            </p>

            {/* Desktop: Tabelle; Mobile: Definition-List */}
            <div className="hidden md:block">
              <table className="w-full text-sm">
                <caption className="sr-only">
                  Beispielrechnung Szenario 1 — Cash-Auszahlung
                </caption>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  <tr>
                    <th
                      scope="row"
                      className="text-left py-2.5 font-normal text-slate-600 dark:text-slate-400"
                    >
                      Auftragswert „Anfragen gewinnen“
                    </th>
                    <td className="py-2.5 text-right font-mono text-slate-900 dark:text-slate-100">
                      3.490 Euro
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="text-left py-2.5 font-normal text-slate-600 dark:text-slate-400"
                    >
                      10 % Empfehlungsdankeschön
                    </th>
                    <td className="py-2.5 text-right font-mono text-slate-900 dark:text-slate-100">
                      349 Euro
                    </td>
                  </tr>
                  <tr className="bg-teal-50 dark:bg-teal-900/20">
                    <th
                      scope="row"
                      className="text-left py-3 px-3 font-bold text-slate-900 dark:text-white"
                    >
                      Dein Auszahlungsbetrag (Cash)
                    </th>
                    <td className="py-3 px-3 text-right font-mono font-bold text-teal-700 dark:text-teal-300">
                      349 Euro
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="text-left py-2.5 font-normal text-slate-500 dark:text-slate-400 text-xs italic"
                    >
                      Willkommensrabatt für den Neukunden
                    </th>
                    <td className="py-2.5 text-right font-mono text-slate-500 dark:text-slate-400 text-xs italic">
                      100 Euro
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <dl className="md:hidden space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600 dark:text-slate-400">Auftragswert „Anfragen gewinnen“</dt>
                <dd className="font-mono text-slate-900 dark:text-slate-100 text-right">
                  3.490 Euro
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600 dark:text-slate-400">
                  10 % Empfehlungsdankeschön
                </dt>
                <dd className="font-mono text-slate-900 dark:text-slate-100 text-right">
                  349 Euro
                </dd>
              </div>
              <div className="flex justify-between gap-4 bg-teal-50 dark:bg-teal-900/20 -mx-3 px-3 py-2.5 rounded">
                <dt className="font-bold text-slate-900 dark:text-white">
                  Dein Auszahlungsbetrag (Cash)
                </dt>
                <dd className="font-mono font-bold text-teal-700 dark:text-teal-300 text-right">
                  349 Euro
                </dd>
              </div>
              <div className="flex justify-between gap-4 text-xs italic text-slate-500 dark:text-slate-400">
                <dt>Willkommensrabatt für den Neukunden</dt>
                <dd className="font-mono text-right">100 Euro</dd>
              </div>
            </dl>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-5 leading-relaxed">
              <span className="font-semibold text-slate-700 dark:text-slate-200">Ablauf:</span>{" "}
              Anzahlung kommt rein → innerhalb von 7 Tagen Überweisung auf dein Konto.
            </p>
          </article>

          {/* Szenario 1b — Zusatzleistungen */}
          <article className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 md:p-8 mb-6">
            <div className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-2">
              Szenario 1b — Mit Zusatzleistung im Erstauftrag
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-5">
              Gleicher Fall, aber dein Kontakt bucht{" "}
              <strong className="font-semibold">
                „Anfragen gewinnen“ plus Texterstellung Business
              </strong>{" "}
              im Erstauftrag.
            </p>

            <div className="hidden md:block">
              <table className="w-full text-sm">
                <caption className="sr-only">
                  Beispielrechnung Szenario 1b — Paket plus Zusatzleistung
                </caption>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  <tr>
                    <th
                      scope="row"
                      className="text-left py-2.5 font-normal text-slate-600 dark:text-slate-400"
                    >
                      „Anfragen gewinnen“
                    </th>
                    <td className="py-2.5 text-right font-mono text-slate-900 dark:text-slate-100">
                      3.490 Euro
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="text-left py-2.5 font-normal text-slate-600 dark:text-slate-400"
                    >
                      Texterstellung Business (Zusatzleistung)
                    </th>
                    <td className="py-2.5 text-right font-mono text-slate-900 dark:text-slate-100">
                      650 Euro
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="text-left py-2.5 font-semibold text-slate-700 dark:text-slate-200"
                    >
                      Gesamtvolumen Erstauftrag
                    </th>
                    <td className="py-2.5 text-right font-mono font-semibold text-slate-900 dark:text-slate-100">
                      4.140 Euro
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="text-left py-2.5 font-normal text-slate-600 dark:text-slate-400"
                    >
                      10 % Empfehlungsdankeschön
                    </th>
                    <td className="py-2.5 text-right font-mono text-slate-900 dark:text-slate-100">
                      414 Euro
                    </td>
                  </tr>
                  <tr className="bg-teal-50 dark:bg-teal-900/20">
                    <th
                      scope="row"
                      className="text-left py-3 px-3 font-bold text-slate-900 dark:text-white"
                    >
                      Dein Auszahlungsbetrag (Cash, Obergrenze)
                    </th>
                    <td className="py-3 px-3 text-right font-mono font-bold text-teal-700 dark:text-teal-300">
                      400 Euro
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <dl className="md:hidden space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600 dark:text-slate-400">„Anfragen gewinnen“</dt>
                <dd className="font-mono text-slate-900 dark:text-slate-100 text-right">
                  3.490 Euro
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600 dark:text-slate-400">
                  Texterstellung (Zusatz)
                </dt>
                <dd className="font-mono text-slate-900 dark:text-slate-100 text-right">
                  650 Euro
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-slate-200 dark:border-slate-700 pt-2">
                <dt className="font-semibold text-slate-700 dark:text-slate-200">
                  Gesamtvolumen
                </dt>
                <dd className="font-mono font-semibold text-slate-900 dark:text-slate-100 text-right">
                  4.140 Euro
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600 dark:text-slate-400">
                  10 % Empfehlungsdankeschön
                </dt>
                <dd className="font-mono text-slate-900 dark:text-slate-100 text-right">
                  414 Euro
                </dd>
              </div>
              <div className="flex justify-between gap-4 bg-teal-50 dark:bg-teal-900/20 -mx-3 px-3 py-2.5 rounded">
                <dt className="font-bold text-slate-900 dark:text-white">
                  Dein Auszahlungsbetrag (Cash, Obergrenze)
                </dt>
                <dd className="font-mono font-bold text-teal-700 dark:text-teal-300 text-right">
                  400 Euro
                </dd>
              </div>
            </dl>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-5 leading-relaxed">
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                Hinweis:
              </span>{" "}
              Was dein Kontakt innerhalb von 30 Tagen nach Vertragsabschluss noch dazu bucht,
              zählt ebenfalls mit — bis maximal 400 Euro. Laufende Betreuung sowie Hosting &
              Wartung sind ausgenommen.
            </p>
          </article>

          {/* Szenario 2 */}
          <article className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 md:p-8">
            <div className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-2">
              Szenario 2 — Betreuungs-Gutschrift für Bestandskunden
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-5">
              Du bist bereits Kunde bei mir mit einem{" "}
              <strong className="font-semibold">Betreuung „Basis“ über 99 Euro/Monat</strong>. Du
              empfiehlst einen Geschäftskontakt, der{" "}
              <strong className="font-semibold">
                Paket „Ihr digitaler Mitarbeiter“ (5.990 Euro)
              </strong>{" "}
              bucht.
            </p>

            <div className="hidden md:block">
              <table className="w-full text-sm">
                <caption className="sr-only">
                  Beispielrechnung Szenario 2 — Betreuungs-Gutschrift
                </caption>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  <tr>
                    <th
                      scope="row"
                      className="text-left py-2.5 font-normal text-slate-600 dark:text-slate-400"
                    >
                      Auftragswert „Ihr digitaler Mitarbeiter“
                    </th>
                    <td className="py-2.5 text-right font-mono text-slate-900 dark:text-slate-100">
                      5.990 Euro
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="text-left py-2.5 font-normal text-slate-600 dark:text-slate-400"
                    >
                      Alternative Cash-Variante wäre
                    </th>
                    <td className="py-2.5 text-right font-mono text-slate-900 dark:text-slate-100">
                      400 Euro (Obergrenze)
                    </td>
                  </tr>
                  <tr className="bg-teal-50 dark:bg-teal-900/20">
                    <th
                      scope="row"
                      className="text-left py-3 px-3 font-bold text-slate-900 dark:text-white"
                    >
                      Du wählst: Betreuungs-Gutschrift
                    </th>
                    <td className="py-3 px-3 text-right font-mono font-bold text-teal-700 dark:text-teal-300">
                      2 Monate gratis = 198 Euro Vorteil
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="text-left py-2.5 font-normal text-slate-600 dark:text-slate-400"
                    >
                      Statt Monats-Abbuchung pausiere ich 2 Monate
                    </th>
                    <td className="py-2.5 text-right text-slate-600 dark:text-slate-400 text-xs">
                      Betreuung läuft nahtlos weiter
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <dl className="md:hidden space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600 dark:text-slate-400">Auftragswert „Ihr digitaler Mitarbeiter“</dt>
                <dd className="font-mono text-slate-900 dark:text-slate-100 text-right">
                  5.990 Euro
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-600 dark:text-slate-400">
                  Alternative Cash-Variante wäre
                </dt>
                <dd className="font-mono text-slate-900 dark:text-slate-100 text-right">
                  400 Euro (Obergrenze)
                </dd>
              </div>
              <div className="flex justify-between gap-4 bg-teal-50 dark:bg-teal-900/20 -mx-3 px-3 py-2.5 rounded">
                <dt className="font-bold text-slate-900 dark:text-white">
                  Du wählst: Betreuungs-Gutschrift
                </dt>
                <dd className="font-mono font-bold text-teal-700 dark:text-teal-300 text-right">
                  2 Monate gratis = 198 Euro Vorteil
                </dd>
              </div>
              <div className="flex justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
                <dt>Statt Monats-Abbuchung pausiere ich 2 Monate</dt>
                <dd className="text-right italic">Betreuung läuft nahtlos weiter</dd>
              </div>
            </dl>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-5 leading-relaxed">
              <span className="font-semibold text-slate-700 dark:text-slate-200">Ablauf:</span>{" "}
              Die nächsten zwei Betreuungs-Rechnungen werden nicht gestellt. Du bekommst eine kurze
              Mail als Bestätigung.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed italic">
              <span className="font-semibold not-italic">Hinweis:</span> Cash wäre hier
              mathematisch höher — die Betreuungs-Variante ist vor allem dann sinnvoll, wenn
              du sowieso monatlich bezahlst und entspannte Kontinuität bevorzugst.
            </p>
          </article>
        </section>

        {/* ── Spielregeln ── */}
        <section aria-labelledby="spielregeln-h2" className="mb-16">
          <h2
            id="spielregeln-h2"
            className="text-center text-2xl font-bold tracking-tight mb-2"
          >
            Spielregeln
          </h2>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-10">
            Transparent. Keine versteckten Klauseln.
          </p>

          <ul className="space-y-3 max-w-[760px] mx-auto list-none">
            {spielregeln.map((r) => (
              <li
                key={r.bold}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex items-start gap-3"
              >
                <span
                  className="text-teal-600 dark:text-teal-400 font-bold text-lg mt-0.5 shrink-0"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    {r.bold}
                  </strong>{" "}
                  {r.rest}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── FAQ ── */}
        <section aria-labelledby="faq-h2" className="mb-16">
          <h2
            id="faq-h2"
            className="text-center text-2xl font-bold tracking-tight mb-10"
          >
            Häufige Fragen
          </h2>

          <div className="space-y-4 max-w-[720px] mx-auto">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
              >
                <summary className="px-6 py-4 cursor-pointer text-sm font-semibold text-slate-900 dark:text-white flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
                  <span>{f.q}</span>
                  <span
                    className="text-slate-400 group-open:rotate-45 transition-transform duration-200 text-lg ml-4 shrink-0"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA-Sektion ── */}
        <section
          id="empfehlung-senden"
          aria-labelledby="cta-h2"
          className="scroll-mt-24 mb-14"
        >
          <div className="text-center mb-10">
            <h2
              id="cta-h2"
              className="text-2xl font-bold tracking-tight mb-3 text-slate-900 dark:text-white"
            >
              Jemanden im Kopf? Schreib mir.
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-[560px] mx-auto">
              Drei Zeilen reichen: Wer, wofür, wie ich ihn erreichen darf. Alles andere kläre
              ich direkt mit dem Neukunden — du bist damit raus.
            </p>
          </div>

          <ul role="list" className="grid grid-cols-1 md:grid-cols-3 gap-5 list-none">
            {/* E-Mail */}
            <li className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-teal-600 dark:text-teal-400"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                E-Mail
              </div>
              <a
                href={mailtoBody}
                className="block text-sm font-semibold text-teal-700 dark:text-teal-300 hover:text-teal-800 dark:hover:text-teal-200 transition-colors break-words focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 rounded"
              >
                hallo@hoeger.dev
              </a>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Vorbereitete Vorlage, du musst nur ausfüllen.
              </p>
            </li>

            {/* WhatsApp */}
            <li className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-teal-600 dark:text-teal-400"
                  aria-hidden="true"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                WhatsApp
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-semibold text-teal-700 dark:text-teal-300 hover:text-teal-800 dark:hover:text-teal-200 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 rounded"
              >
                Kurz per WhatsApp
              </a>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Direkt vom Handy. Öffnet im Messenger.
              </p>
            </li>

            {/* Kontaktformular */}
            <li className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-teal-600 dark:text-teal-400"
                  aria-hidden="true"
                >
                  <rect x="4" y="3" width="16" height="18" rx="2" />
                  <path d="M8 8h8M8 12h8M8 16h5" />
                </svg>
              </div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                Formular
              </div>
              <a
                href={`${kontaktLink}`}
                className="block text-sm font-semibold text-teal-700 dark:text-teal-300 hover:text-teal-800 dark:hover:text-teal-200 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 rounded"
              >
                Zum Kontaktformular
              </a>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Klassisch. Landet in meinem Postfach.
              </p>
            </li>
          </ul>
        </section>

        {/* ── Rechtliches ── */}
        <section aria-labelledby="rechtliches-h3" className="pt-10 border-t border-slate-200 dark:border-slate-700">
          <h3
            id="rechtliches-h3"
            className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4"
          >
            Rechtliche Hinweise
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Die Cash-Auszahlung ist für Privatpersonen eine „sonstige Leistung“ im Sinne
            des §22 Nr. 3 EStG und bis 256 Euro pro Kalenderjahr steuerfrei (Freigrenze).
            Höhere Beträge oder gewerbliche Empfehler müssen die Einnahme im Rahmen ihrer
            Steuererklärung angeben — eine Klärung mit dem eigenen Steuerberater wird
            empfohlen. Angehörige der Heilberufe (Ärzte, Zahnärzte, Psychotherapeut:innen
            u. a.) sind von der Cash-Variante ausgeschlossen, da berufsrechtliche Vorgaben
            (u. a. Musterberufsordnung) monetäre Zuweisungspauschalen untersagen; Betreuungs-
            und Leistungs-Gutschrift bleiben möglich, sofern sie nicht an konkrete
            Patienten-Zuweisungen geknüpft sind. Es gelten ergänzend meine{" "}
            <a
              href="/agb/"
              className="underline hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
            >
              Allgemeinen Geschäftsbedingungen
            </a>
            . Ein Rechtsanspruch auf das Empfehlungsprogramm besteht nicht — ich behalte
            mir vor, die Konditionen für künftige Empfehlungen mit vier Wochen Vorlauf
            anzupassen. Bereits ausgesprochene Empfehlungen werden immer zu den Bedingungen
            zum Zeitpunkt der Empfehlung abgewickelt.
          </p>
        </section>
      </div>
    </main>
  );
}
