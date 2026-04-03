import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Impressum – ${siteConfig.name}`,
  description: "Impressum und Angaben gemäß § 5 TMG von Michael Höger – Webdesign & Digitale Lösungen.",
  alternates: { canonical: "/impressum/" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://hoeger.dev/" },
    { "@type": "ListItem", position: 2, name: "Impressum" },
  ],
};

export default function Impressum() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="mx-auto max-w-3xl px-5 py-24">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Zurück
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Impressum</h1>
        <div className="mt-8 space-y-6 text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Angaben gemäß § 5 TMG</h2>
            <p className="mt-2">
              Michael Höger<br />
              Johann-Boppe-Str. 19<br />
              65549 Limburg an der Lahn
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Kontakt</h2>
            <p className="mt-2">
              E-Mail: <a href="mailto:michael@hoeger.dev" className="text-primary hover:underline">michael@hoeger.dev</a>
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p className="mt-2">
              Michael Höger<br />
              Johann-Boppe-Str. 19<br />
              65549 Limburg an der Lahn
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Haftungsausschluss</h2>
            <h3 className="mt-2 font-medium text-foreground">Haftung für Inhalte</h3>
            <p className="mt-1 text-sm">
              Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann ich jedoch keine Gewähr übernehmen. Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <h3 className="mt-4 font-medium text-foreground">Haftung für Links</h3>
            <p className="mt-1 text-sm">
              Diese Webseite enthält Links zu externen Webseiten Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Urheberrecht</h2>
            <p className="mt-2 text-sm">
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
