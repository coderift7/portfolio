import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, siteUrl } from "@/config/site";

export const metadata: Metadata = {
  title: `Datenschutz – ${siteConfig.name}`,
  description: "Datenschutzerklärung von Michael Höger – Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
  alternates: { canonical: "/datenschutz/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${siteUrl}/datenschutz/`,
    siteName: siteConfig.name,
    title: `Datenschutz – ${siteConfig.name}`,
    description: "Datenschutzerklärung gemäß DSGVO.",
    images: [{ url: `${siteUrl}/images/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Datenschutz – ${siteConfig.name}`,
    description: "DSGVO-Informationen zur Datenverarbeitung.",
    images: [`${siteUrl}/images/og-image.png`],
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://hoeger.dev/" },
    { "@type": "ListItem", position: 2, name: "Datenschutz" },
  ],
};

export default function Datenschutz() {
  return (
    <main id="main" className="legal-doc min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="legal-container px-5 pt-28 pb-24">
        <Link href="/" className="legal-back">← Zurück zur Startseite</Link>
        <h1>Datenschutzerklärung</h1>
        <p className="legal-meta">Stand: April 2026</p>
        <div className="mt-6 space-y-8">

          {/* 1. Verantwortlicher */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">1. Verantwortlicher (Art. 13 Abs. 1 lit. a DSGVO)</h2>
            <p className="mt-2">
              Michael Höger<br />
              Johann-Boppe-Str. 19<br />
              65549 Limburg an der Lahn<br />
              E-Mail: <a href="mailto:michael@hoeger.dev">michael@hoeger.dev</a>
            </p>
          </div>

          {/* 2. Überblick */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">2. Überblick der Verarbeitungen</h2>
            <p className="mt-2">
              Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten, die Zwecke ihrer Verarbeitung und die betroffenen Personen zusammen.
            </p>

            <p className="mt-3 font-medium text-foreground">Arten der verarbeiteten Daten:</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
              <li><strong className="text-foreground">Kontaktdaten</strong> (Name, E-Mail-Adresse) — bei Nutzung des Kontaktformulars</li>
              <li><strong className="text-foreground">Inhaltsdaten</strong> (Betreff, Nachrichtentext) — bei Nutzung des Kontaktformulars</li>
              <li><strong className="text-foreground">Nutzungsdaten</strong> (aufgerufene Seiten, Zugriffszeit) — automatisch beim Seitenaufruf durch den Hosting-Anbieter</li>
              <li><strong className="text-foreground">Meta-/Kommunikationsdaten</strong> (IP-Adresse, Browsertyp, Betriebssystem) — automatisch beim Seitenaufruf durch den Hosting-Anbieter</li>
            </ul>

            <p className="mt-3 font-medium text-foreground">Empfänger / Kategorien von Empfängern:</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
              <li><strong className="text-foreground">GitHub Inc.</strong> — als Hosting-Anbieter (Auftragsverarbeiter, siehe Abschnitt 4)</li>
              <li><strong className="text-foreground">Tally Forms BV</strong> — als Anbieter des Briefing-Formulars (Auftragsverarbeiter, siehe Abschnitt 11)</li>
            </ul>
          </div>

          {/* 3. Rechtsgrundlagen */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">3. Rechtsgrundlagen der Verarbeitung (Art. 13 Abs. 1 lit. c DSGVO)</h2>
            <p className="mt-2">
              Für jede Verarbeitung personenbezogener Daten wird nachfolgend die jeweilige Rechtsgrundlage angegeben:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm">
              <li>
                <strong className="text-foreground">Vertragserfüllung und vorvertragliche Anfragen</strong> (Art. 6 Abs. 1 S. 1 lit. b DSGVO) — Wenn Sie über das Kontaktformular eine Anfrage stellen, verarbeite ich Ihre Daten zur Durchführung vorvertraglicher Maßnahmen (z.&thinsp;B. Angebotserstellung, Beratung).
              </li>
              <li>
                <strong className="text-foreground">Berechtigte Interessen</strong> (Art. 6 Abs. 1 S. 1 lit. f DSGVO) — Die Verarbeitung technischer Daten beim Seitenaufruf erfolgt auf Basis meines berechtigten Interesses an der technisch fehlerfreien und sicheren Bereitstellung dieser Webseite. Mein Interesse besteht konkret darin, die Erreichbarkeit der Seite sicherzustellen, Fehler zu erkennen und Missbrauch zu verhindern. Eine Auswertung dieser Daten zu Marketingzwecken findet nicht statt. Die Interessen der Besucher werden gewahrt, da keine Profilbildung oder Weitergabe an Dritte zu Werbezwecken erfolgt.
              </li>
              <li>
                <strong className="text-foreground">Einwilligung</strong> (Art. 6 Abs. 1 S. 1 lit. a DSGVO) — Sofern Sie in die Verarbeitung einwilligen (z.&thinsp;B. Checkbox im Kontaktformular). Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie mir eine E-Mail an <a href="mailto:michael@hoeger.dev">michael@hoeger.dev</a> senden.
              </li>
            </ul>
          </div>

          {/* 4. Hosting + Drittlandtransfer */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">4. Hosting und Übermittlung in Drittländer</h2>
            <p className="mt-2">
              Diese Webseite wird über <strong className="text-foreground">GitHub Pages</strong> gehostet, einen Dienst der GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA (Muttergesellschaft: Microsoft Corporation).
            </p>
            <p className="mt-2">
              Beim Aufruf dieser Webseite werden automatisch technische Daten (IP-Adresse, Browsertyp, Betriebssystem, Zugriffszeit, aufgerufene Seite) durch GitHub erfasst und in Server-Logfiles gespeichert. GitHub fungiert hierbei als <strong className="text-foreground">Auftragsverarbeiter</strong> gemäß Art. 28 DSGVO.
            </p>

            <p className="mt-3 font-medium text-foreground">Drittlandtransfer (Art. 44–49 DSGVO):</p>
            <p className="mt-1 text-sm">
              Da GitHub Inc. ihren Sitz in den USA hat, werden Ihre Daten in ein Drittland außerhalb der EU/des EWR übermittelt. Die Übermittlung erfolgt auf Grundlage des <strong className="text-foreground">EU-U.S. Data Privacy Framework</strong> (Angemessenheitsbeschluss der EU-Kommission gemäß Art. 45 DSGVO vom 10. Juli 2023). GitHub Inc. / Microsoft Corporation ist unter dem Data Privacy Framework zertifiziert. Zusätzlich hat GitHub <strong className="text-foreground">Standardvertragsklauseln (SCCs)</strong> gemäß Art. 46 Abs. 2 lit. c DSGVO als ergänzende Schutzmaßnahme implementiert.
            </p>
            <p className="mt-2 text-sm">
              Weitere Informationen: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub Privacy Statement</a>
            </p>
            <p className="mt-2 text-sm">
              Rechtsgrundlage: Berechtigtes Interesse (Art. 6 Abs. 1 S. 1 lit. f DSGVO) an der technisch sicheren, stabilen und performanten Bereitstellung dieser Webseite über einen zuverlässigen Hosting-Dienst.
            </p>

            <p className="mt-3 font-medium text-foreground">Speicherdauer:</p>
            <p className="mt-1 text-sm">
              Server-Logfiles werden von GitHub gemäß deren Datenschutzerklärung gespeichert. Der Verantwortliche hat keinen direkten Zugriff auf diese Logfiles und wertet diese nicht aus.
            </p>
          </div>

          {/* 5. Kontaktformular */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">5. Kontaktaufnahme</h2>
            <p className="mt-2">
              Wenn Sie über das Kontaktformular oder per E-Mail mit mir in Kontakt treten, werden folgende Daten verarbeitet: Name, E-Mail-Adresse, Betreff und Nachrichteninhalt. Die Verarbeitung erfolgt ausschließlich zum Zweck der Bearbeitung Ihrer Anfrage.
            </p>
            <p className="mt-2 text-sm">
              Rechtsgrundlage: Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 S. 1 lit. b DSGVO) — Ihre Anfrage dient in der Regel der Anbahnung einer geschäftlichen Zusammenarbeit.
            </p>

            <p className="mt-3 font-medium text-foreground">Speicherdauer:</p>
            <p className="mt-1 text-sm">
              Ihre Kontaktdaten und Nachricht werden nach abschließender Bearbeitung Ihrer Anfrage gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen (z.&thinsp;B. steuerrechtliche Aufbewahrungspflichten von 6 bzw. 10 Jahren gemäß § 147 AO, § 257 HGB). Kommt es zu einem Vertragsverhältnis, werden die Daten bis zum Ablauf der gesetzlichen Aufbewahrungsfristen gespeichert und anschließend gelöscht.
            </p>
          </div>

          {/* 6. Google Fonts */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">6. Google Fonts (lokal eingebunden)</h2>
            <p className="mt-2">
              Diese Webseite nutzt die Schriftarten „Inter“ und „JetBrains Mono“ von Google Fonts. Die Schriften werden <strong className="text-foreground">lokal über den Hosting-Server ausgeliefert</strong> und nicht von Google-Servern nachgeladen. Es findet daher <strong className="text-foreground">keine Datenübertragung an Google</strong> statt.
            </p>
          </div>

          {/* 7. Cookies */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">7. Cookies</h2>
            <p className="mt-2">
              Diese Webseite verwendet ein technisch notwendiges Cookie (<code className="text-xs">cookie_consent</code>) zur Speicherung Ihrer Cookie-Einstellungen. Dieses Cookie wird ausschließlich lokal in Ihrem Browser gespeichert (localStorage) und nicht an Server übermittelt.
            </p>
            <p className="mt-2">
              Darüber hinaus wird das Meta Pixel (siehe Abschnitt 8) <strong className="text-foreground">nur nach Ihrer ausdrücklichen Einwilligung</strong> geladen. Ohne Ihre Zustimmung werden keine Tracking-Cookies gesetzt.
            </p>
          </div>

          {/* 8. Meta Pixel */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">8. Meta Pixel (nur mit Einwilligung)</h2>
            <p className="mt-2">
              Nach Ihrer ausdrücklichen Einwilligung setzen wir das <strong className="text-foreground">Meta Pixel</strong> ein, einen Analysedienst der Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland.
            </p>

            <p className="mt-2 text-sm">
              <strong className="text-foreground">Zweck:</strong> Messung der Wirksamkeit unserer Werbeanzeigen auf Meta-Plattformen (Facebook, Instagram). Das Pixel erfasst, ob Besucher über eine Anzeige auf unsere Webseite gelangen und bestimmte Aktionen durchführen (z.&thinsp;B. Absenden des Website-Check-Formulars).
            </p>

            <p className="mt-2 text-sm">
              <strong className="text-foreground">Verarbeitete Daten:</strong> IP-Adresse (gekürzt), Seitenaufrufe, Conversion-Events, Browserinformationen, Zeitstempel.
            </p>

            <p className="mt-2 text-sm">
              <strong className="text-foreground">Cookie:</strong> <code className="text-xs">_fbp</code> (gesetzt von Meta, Laufzeit 90 Tage). Wird nur nach Einwilligung gesetzt.
            </p>

            <p className="mt-2 text-sm">
              <strong className="text-foreground">Rechtsgrundlage:</strong> Ihre Einwilligung (Art. 6 Abs. 1 S. 1 lit. a DSGVO), erteilt über den Cookie-Banner beim ersten Besuch der Webseite.
            </p>

            <p className="mt-2 text-sm">
              <strong className="text-foreground">Widerruf:</strong> Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie im Footer auf „Cookie-Einstellungen“ klicken und die Einwilligung zurücksetzen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.
            </p>

            <p className="mt-2 text-sm">
              <strong className="text-foreground">Drittlandtransfer:</strong> Meta Platforms Ireland Limited kann Daten an Meta Platforms Inc. in den USA übermitteln. Die Übermittlung erfolgt auf Grundlage des EU-U.S. Data Privacy Framework (Angemessenheitsbeschluss der EU-Kommission gem. Art. 45 DSGVO).
            </p>

            <p className="mt-2 text-sm">
              Weitere Informationen: <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Meta Datenschutzrichtlinie</a> · <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener noreferrer">Meta Werbepräferenzen (Opt-out)</a>
            </p>
          </div>

          {/* 9. Betroffenenrechte */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">9. Ihre Rechte als betroffene Person</h2>
            <p className="mt-2">Ihnen stehen nach der DSGVO folgende Rechte zu:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              <li><strong className="text-foreground">Auskunftsrecht</strong> (Art. 15 DSGVO) — Sie können Auskunft über Ihre verarbeiteten personenbezogenen Daten verlangen.</li>
              <li><strong className="text-foreground">Recht auf Berichtigung</strong> (Art. 16 DSGVO) — Sie können die Berichtigung unrichtiger oder die Vervollständigung unvollständiger Daten verlangen.</li>
              <li><strong className="text-foreground">Recht auf Löschung</strong> (Art. 17 DSGVO) — Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</li>
              <li><strong className="text-foreground">Recht auf Einschränkung</strong> (Art. 18 DSGVO) — Sie können die Einschränkung der Verarbeitung verlangen.</li>
              <li><strong className="text-foreground">Widerspruchsrecht</strong> (Art. 21 DSGVO) — Sie können der Verarbeitung Ihrer Daten auf Basis von Art. 6 Abs. 1 lit. f DSGVO jederzeit widersprechen, wenn Gründe vorliegen, die sich aus Ihrer besonderen Situation ergeben.</li>
              <li><strong className="text-foreground">Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO) — Sie können verlangen, dass Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format an Sie oder einen anderen Verantwortlichen übermittelt werden.</li>
              <li><strong className="text-foreground">Widerrufsrecht bei Einwilligung</strong> (Art. 7 Abs. 3 DSGVO) — Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung wird dadurch nicht berührt.</li>
            </ul>
            <p className="mt-3 text-sm">
              Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an: <a href="mailto:michael@hoeger.dev">michael@hoeger.dev</a>
            </p>
          </div>

          {/* 10. Website-Check / Website-Analyse */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">10. Website-Check (Website-Analyse)</h2>
            <p className="mt-2">
              Wir bieten einen kostenlosen Website-Check an, bei dem Ihre Webseite automatisiert auf Performance, SEO, Sicherheit und Barrierefreiheit geprüft wird. Ein PDF-Report wird erstellt und Ihnen per E-Mail zugesendet.
            </p>
            <p className="mt-2 text-sm">
              <strong>Verarbeitete Daten:</strong> URL der zu prüfenden Webseite, E-Mail-Adresse, optional Ihr Name.
            </p>
            <p className="mt-2 text-sm">
              <strong>Zweck:</strong> Durchführung der Website-Analyse und Zusendung des Ergebnis-Reports.
            </p>
            <p className="mt-2 text-sm">
              <strong>Rechtsgrundlage:</strong> Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie durch Absenden des Formulars und Bestätigung der Datenschutz-Checkbox erteilen.
            </p>
            <p className="mt-2 text-sm">
              <strong>Speicherdauer:</strong> Ihre Daten werden ausschließlich für die Erstellung und Zustellung des Reports verwendet. Der generierte Report wird nach der Zustellung gelöscht. Ihre E-Mail-Adresse und die eingegebene URL werden nicht dauerhaft gespeichert.
            </p>
            <p className="mt-2 text-sm">
              <strong>E-Mail-Versand:</strong> Der Report wird über den Dienst Brevo (Sendinblue SAS, Paris, Frankreich) versendet. Brevo verarbeitet Ihre E-Mail-Adresse als Auftragsverarbeiter. Weitere Informationen: <a href="https://www.brevo.com/de/legal/privacypolicy/" target="_blank" rel="noopener noreferrer">Brevo Datenschutzerklärung</a>.
            </p>
            <p className="mt-2 text-sm">
              Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie uns unter <a href="mailto:michael@hoeger.dev">michael@hoeger.dev</a> kontaktieren.
            </p>
          </div>

          {/* 11. Briefing-Formular (Tally) */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">11. Briefing-Formular (Tally)</h2>
            <p className="mt-2">
              Auf dieser Webseite wird unter <a href="https://briefing.hoeger.dev" target="_blank" rel="noopener noreferrer">briefing.hoeger.dev</a> ein Online-Briefing-Formular bereitgestellt. Das Formular wird über den Dienst <strong className="text-foreground">Tally</strong> der Tally Forms BV, Antwerpen, Belgien, ausgeliefert. Tally fungiert als <strong className="text-foreground">Auftragsverarbeiter</strong> gemäß Art. 28 DSGVO; ein entsprechender Auftragsverarbeitungsvertrag (AVV) wurde abgeschlossen.
            </p>

            <p className="mt-3 font-medium text-foreground">Verarbeitete Daten:</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
              <li><strong className="text-foreground">Kontaktdaten</strong> (Name, Firma, E-Mail-Adresse, optional Telefon, optional Website-URL)</li>
              <li><strong className="text-foreground">Projektangaben</strong> (Branche, Angebotsbeschreibung, Ziele der Webseite, Zielgruppe, gewünschter Stil, Budget, Zeitrahmen, sonstige Anmerkungen)</li>
              <li><strong className="text-foreground">Optionale Datei-Uploads</strong> (z.&thinsp;B. Logo)</li>
              <li><strong className="text-foreground">Technische Daten</strong> (IP-Adresse, Browsertyp, Zeitstempel) zur Spam-Abwehr und Funktionsfähigkeit des Formulars</li>
            </ul>

            <p className="mt-3 font-medium text-foreground">Zweck:</p>
            <p className="mt-1 text-sm">
              Erfassung von Projektinformationen zur Anbahnung und Vorbereitung einer geschäftlichen Zusammenarbeit (vorvertragliche Maßnahme).
            </p>

            <p className="mt-3 font-medium text-foreground">Rechtsgrundlage:</p>
            <ul className="mt-1 list-disc space-y-2 pl-5 text-sm">
              <li><strong className="text-foreground">Art. 6 Abs. 1 S. 1 lit. b DSGVO</strong> — Durchführung vorvertraglicher Maßnahmen auf Anfrage der betroffenen Person.</li>
              <li><strong className="text-foreground">Art. 6 Abs. 1 S. 1 lit. a DSGVO</strong> — Einwilligung in die Verarbeitung der Briefing-Angaben über die Datenschutz-Checkbox am Ende des Formulars.</li>
              <li><strong className="text-foreground">Art. 6 Abs. 1 S. 1 lit. f DSGVO</strong> — Berechtigtes Interesse an einem funktionsfähigen, sicheren Briefing-Prozess (technische Daten zur Spam-Abwehr).</li>
            </ul>

            <p className="mt-3 font-medium text-foreground">Hosting und Datenstandort:</p>
            <p className="mt-1 text-sm">
              Tally Forms BV hat ihren Sitz in Belgien (EU). Die Verarbeitung der Formulardaten erfolgt nach Angaben des Anbieters auf Servern innerhalb der EU. Sollten im Rahmen des Betriebs einzelne Sub-Auftragsverarbeiter eingesetzt werden, sind diese vertraglich zur Einhaltung der DSGVO verpflichtet. Weitere Informationen: <a href="https://tally.so/help/privacy-policy" target="_blank" rel="noopener noreferrer">Tally Privacy Policy</a>.
            </p>

            <p className="mt-3 font-medium text-foreground">Speicherdauer:</p>
            <p className="mt-1 text-sm">
              Die im Briefing-Formular eingegebenen Daten werden nach abschließender Bearbeitung Ihrer Anfrage bzw. nach Beendigung des hieraus entstehenden Vertragsverhältnisses gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen (z.&thinsp;B. steuerrechtliche Aufbewahrungspflichten von 6 bzw. 10 Jahren gemäß § 147 AO, § 257 HGB). Datei-Uploads werden nach Projektabschluss gelöscht oder in den Projektordner überführt und dort nach den gleichen Fristen behandelt.
            </p>

            <p className="mt-3 font-medium text-foreground">Widerruf:</p>
            <p className="mt-1 text-sm">
              Ihre Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie eine formlose E-Mail an <a href="mailto:michael@hoeger.dev">michael@hoeger.dev</a> senden. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.
            </p>
          </div>

          {/* 12. Beschwerderecht */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">12. Beschwerderecht bei einer Aufsichtsbehörde (Art. 77 DSGVO)</h2>
            <p className="mt-2">
              Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt, haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren — insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.
            </p>
            <p className="mt-2 text-sm">
              Zuständige Aufsichtsbehörde:<br />
              Der Hessische Beauftragte für Datenschutz und Informationsfreiheit<br />
              Gustav-Stresemann-Ring 1, 65189 Wiesbaden<br />
              Telefon: +49 611 1408-0<br />
              E-Mail: poststelle@datenschutz.hessen.de<br />
              Web: <a href="https://datenschutz.hessen.de" target="_blank" rel="noopener noreferrer">datenschutz.hessen.de</a>
            </p>
          </div>

          {/* 13. Aktualität */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">13. Aktualität und Änderungen dieser Datenschutzerklärung</h2>
            <p className="mt-2 text-sm">
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand April 2026. Durch die Weiterentwicklung der Webseite oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung anzupassen. Die jeweils aktuelle Fassung kann jederzeit auf dieser Seite abgerufen werden.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
