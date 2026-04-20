import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, siteUrl } from "@/config/site";

export const metadata: Metadata = {
  title: `Impressum – ${siteConfig.name}`,
  description: "Impressum und Angaben gemäß § 5 TMG von Michael Höger – Webdesign & Digitale Lösungen in Limburg an der Lahn.",
  alternates: { canonical: "/impressum/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${siteUrl}/impressum/`,
    siteName: siteConfig.name,
    title: `Impressum – ${siteConfig.name}`,
    description: "Impressum und Angaben gemäß § 5 TMG von Michael Höger.",
    images: [{ url: `${siteUrl}/images/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Impressum – ${siteConfig.name}`,
    description: "Angaben gemäß § 5 TMG.",
    images: [`${siteUrl}/images/og-image.png`],
  },
  robots: { index: true, follow: true },
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
    <main id="main" className="legal-doc min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="legal-container px-5 pt-28 pb-24">
        <Link href="/" className="legal-back">← Zurück zur Startseite</Link>
        <h1>Impressum</h1>
        <p className="legal-meta">Angaben gemäß § 5 TMG · Stand April 2026</p>

        <h2>Anbieter</h2>
        <p>
          Michael Höger<br />
          Johann-Boppe-Str. 19<br />
          65549 Limburg an der Lahn
        </p>

        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href="mailto:michael@hoeger.dev">michael@hoeger.dev</a>
        </p>

        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          Michael Höger<br />
          Johann-Boppe-Str. 19<br />
          65549 Limburg an der Lahn
        </p>

        <h2>Haftung für Inhalte</h2>
        <p>
          Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann ich jedoch keine Gewähr übernehmen. Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>

        <h2>Haftung für Links</h2>
        <p>
          Diese Webseite enthält Links zu externen Webseiten Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </div>
    </main>
  );
}
