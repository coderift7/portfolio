import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Datenschutz – ${siteConfig.name}`,
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-5 py-24">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Zurück
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Datenschutzerklärung</h1>
        <div className="mt-8 space-y-8 text-muted-foreground">

          {/* 1. Verantwortlicher */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">1. Verantwortlicher</h2>
            <p className="mt-2">
              Michael Höger<br />
              Johann-Boppe-Str. 19<br />
              65549 Limburg an der Lahn<br />
              E-Mail: <a href="mailto:michael@hoeger.dev" className="text-primary hover:underline">michael@hoeger.dev</a>
            </p>
          </div>

          {/* 2. Überblick */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">2. Überblick der Verarbeitungen</h2>
            <p className="mt-2">
              Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung zusammen und verweist auf die betroffenen Personen.
            </p>
            <p className="mt-2 font-medium text-foreground">Arten der verarbeiteten Daten:</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
              <li>Bestandsdaten (z.&thinsp;B. Namen, Adressen)</li>
              <li>Kontaktdaten (z.&thinsp;B. E-Mail, Telefonnummern)</li>
              <li>Inhaltsdaten (z.&thinsp;B. Eingaben in Formularen)</li>
              <li>Nutzungsdaten (z.&thinsp;B. besuchte Seiten, Zugriffszeit)</li>
              <li>Meta-/Kommunikationsdaten (z.&thinsp;B. IP-Adressen, Browserinformationen)</li>
            </ul>
          </div>

          {/* 3. Rechtsgrundlagen */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">3. Maßgebliche Rechtsgrundlagen</h2>
            <p className="mt-2">
              Im Folgenden erhalten Sie eine Übersicht der Rechtsgrundlagen der DSGVO, auf deren Basis personenbezogene Daten verarbeitet werden:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              <li><strong className="text-foreground">Vertragserfüllung und vorvertragliche Anfragen</strong> (Art. 6 Abs. 1 S. 1 lit. b DSGVO) — Verarbeitung ist für die Erfüllung eines Vertrags oder zur Durchführung vorvertraglicher Maßnahmen erforderlich.</li>
              <li><strong className="text-foreground">Berechtigte Interessen</strong> (Art. 6 Abs. 1 S. 1 lit. f DSGVO) — Verarbeitung ist zur Wahrung berechtigter Interessen des Verantwortlichen erforderlich, sofern nicht die Interessen oder Grundrechte der betroffenen Person überwiegen.</li>
              <li><strong className="text-foreground">Einwilligung</strong> (Art. 6 Abs. 1 S. 1 lit. a DSGVO) — Die betroffene Person hat ihre Einwilligung in die Verarbeitung gegeben.</li>
            </ul>
          </div>

          {/* 4. Hosting */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">4. Hosting</h2>
            <p className="mt-2">
              Diese Webseite wird über <strong className="text-foreground">GitHub Pages</strong> (GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA) gehostet. Beim Aufruf der Seite werden automatisch technische Daten (IP-Adresse, Browsertyp, Betriebssystem, Zugriffszeit) durch GitHub erfasst. Weitere Informationen finden Sie in der Datenschutzerklärung von GitHub: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">GitHub Privacy Statement</a>.
            </p>
            <p className="mt-2 text-sm">
              Rechtsgrundlage: Berechtigtes Interesse (Art. 6 Abs. 1 S. 1 lit. f DSGVO) an einer sicheren und effizienten Bereitstellung der Webseite.
            </p>
          </div>

          {/* 5. Kontaktformular */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">5. Kontaktaufnahme</h2>
            <p className="mt-2">
              Wenn Sie über das Kontaktformular oder per E-Mail mit mir in Kontakt treten, werden die von Ihnen mitgeteilten Daten (Name, E-Mail-Adresse, Nachrichteninhalt) zum Zweck der Bearbeitung Ihrer Anfrage verarbeitet und gespeichert.
            </p>
            <p className="mt-2 text-sm">
              Rechtsgrundlage: Vorvertragliche Maßnahmen (Art. 6 Abs. 1 S. 1 lit. b DSGVO) bzw. berechtigtes Interesse (Art. 6 Abs. 1 S. 1 lit. f DSGVO). Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind — in der Regel nach Abschluss der Konversation.
            </p>
          </div>

          {/* 6. Google Fonts */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">6. Google Fonts (lokal eingebunden)</h2>
            <p className="mt-2">
              Diese Webseite nutzt die Schriftarten „Inter" und „JetBrains Mono" von Google Fonts. Die Schriften werden <strong className="text-foreground">lokal auf dem Server gehostet</strong> und nicht von Google-Servern nachgeladen. Es findet daher keine Datenübertragung an Google statt.
            </p>
          </div>

          {/* 7. Cookies */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">7. Cookies und Tracking</h2>
            <p className="mt-2">
              Diese Webseite verwendet <strong className="text-foreground">keine Cookies</strong> und <strong className="text-foreground">keine Tracking-Tools</strong>. Es werden keine Analyse-Dienste (wie Google Analytics) eingesetzt.
            </p>
          </div>

          {/* 8. Betroffenenrechte */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">8. Ihre Rechte</h2>
            <p className="mt-2">Ihnen stehen als betroffene Person folgende Rechte zu:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              <li><strong className="text-foreground">Auskunftsrecht</strong> (Art. 15 DSGVO) — Sie können Auskunft über Ihre verarbeiteten personenbezogenen Daten verlangen.</li>
              <li><strong className="text-foreground">Recht auf Berichtigung</strong> (Art. 16 DSGVO) — Sie können die Berichtigung unrichtiger Daten verlangen.</li>
              <li><strong className="text-foreground">Recht auf Löschung</strong> (Art. 17 DSGVO) — Sie können die Löschung Ihrer Daten verlangen.</li>
              <li><strong className="text-foreground">Recht auf Einschränkung</strong> (Art. 18 DSGVO) — Sie können die Einschränkung der Verarbeitung verlangen.</li>
              <li><strong className="text-foreground">Widerspruchsrecht</strong> (Art. 21 DSGVO) — Sie können der Verarbeitung Ihrer Daten widersprechen.</li>
              <li><strong className="text-foreground">Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO) — Sie können verlangen, dass Ihre Daten in einem gängigen Format übermittelt werden.</li>
            </ul>
            <p className="mt-3 text-sm">
              Zur Ausübung Ihrer Rechte wenden Sie sich an: <a href="mailto:michael@hoeger.dev" className="text-primary hover:underline">michael@hoeger.dev</a>
            </p>
          </div>

          {/* 9. Beschwerderecht */}
          <div>
            <h2 className="text-lg font-semibold text-foreground">9. Beschwerderecht bei einer Aufsichtsbehörde</h2>
            <p className="mt-2">
              Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt, haben Sie das Recht, sich bei einer Aufsichtsbehörde zu beschweren — insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.
            </p>
            <p className="mt-2 text-sm">
              Zuständige Aufsichtsbehörde: Der Hessische Beauftragte für Datenschutz und Informationsfreiheit, Gustav-Stresemann-Ring 1, 65189 Wiesbaden.
            </p>
          </div>

          {/* Stand */}
          <p className="text-sm text-muted-foreground/60">
            Stand: März 2026
          </p>

        </div>
      </div>
    </div>
  );
}
