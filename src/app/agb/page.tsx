import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { siteConfig, siteUrl } from "@/config/site";
import { agb, agbMeta } from "./content";
import AgbMobileToggle from "./AgbMobileToggle";

export const metadata: Metadata = {
  title: `AGB – ${siteConfig.name}`,
  description:
    "Allgemeine Geschäftsbedingungen von Michael Höger – rechtsverbindliche Fassung und Klartext-Version nebeneinander.",
  alternates: { canonical: "/agb/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${siteUrl}/agb/`,
    siteName: siteConfig.name,
    title: `AGB – ${siteConfig.name}`,
    description:
      "Allgemeine Geschäftsbedingungen von Michael Höger – rechtsverbindliche Fassung und Klartext-Version nebeneinander.",
    images: [{ url: `${siteUrl}/images/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `AGB – ${siteConfig.name}`,
    description:
      "Allgemeine Geschäftsbedingungen von Michael Höger – rechtsverbindliche Fassung und Klartext-Version.",
    images: [`${siteUrl}/images/og-image.png`],
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://hoeger.dev/" },
    { "@type": "ListItem", position: 2, name: "AGB" },
  ],
};

export default function AGB() {
  return (
    <main id="main" className="legal-doc min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="mx-auto max-w-6xl px-5 pt-28 pb-24">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm underline"
        >
          <ArrowLeft className="h-4 w-4" /> Zurück
        </Link>

        <h1 className="text-2xl font-bold text-foreground hyphens-auto break-words sm:text-3xl md:text-4xl" lang="de">
          Allgemeine Geschäftsbedingungen
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Stand: {agbMeta.stand} · Version {agbMeta.version}
        </p>

        {/* Disclaimer */}
        <div className="mt-8 rounded-lg border border-border bg-card p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            
            Zwei Spalten, ein Vertrag
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Links sehen Sie die <strong className="text-foreground">rechtsverbindliche Fassung</strong> —
            das ist der Text, der vor Gericht gilt. Rechts steht die{" "}
            <strong className="text-foreground">Klartext-Version</strong>: derselbe Inhalt, nur in
            Alltagssprache. Die Klartext-Spalte ist eine Lesehilfe und nicht rechtsverbindlich —
            bei Unterschieden zählt immer die linke Seite.
          </p>
        </div>

        {/* Mobile Toggle (Rechtstext ↔ Klartext) */}
        <AgbMobileToggle legalSelector="[data-agb-legal]" plainSelector="[data-agb-plain]" />

        {/* Spalten-Header Desktop */}
        <div className="mt-10 hidden grid-cols-2 gap-8 md:grid">
          <div className="flex items-center gap-2 border-b-2 border-border pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <FileText className="h-4 w-4" aria-hidden="true" />
            Rechtsverbindliche Fassung
          </div>
          <div className="flex items-center gap-2 border-b-2 border-border pb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
            
            Klartext — zum Drüberlesen
          </div>
        </div>

        {/* Paragraphen */}
        <div className="mt-6 space-y-10">
          {agb.map((p) => (
            <section
              key={p.num}
              aria-labelledby={`agb-${p.num.replace(/\W/g, "")}`}
              className="grid gap-6 md:grid-cols-2 md:gap-8"
            >
              {/* Legal */}
              <div data-agb-legal className="space-y-3">
                <h3
                  id={`agb-${p.num.replace(/\W/g, "")}`}
                  className="text-lg font-semibold text-foreground"
                >
                  <span className="mr-2 font-mono text-sm text-foreground">{p.num}</span>
                  {p.title}
                </h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  {p.legal.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span
                        className="mt-0.5 font-mono text-xs text-muted-foreground/60"
                        aria-hidden="true"
                      >
                        ({i + 1})
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Plain */}
              <div
                data-agb-plain
                className="space-y-3 rounded-lg bg-card/50 p-4 md:bg-transparent md:p-0"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  <span className="mr-2 font-mono text-sm text-foreground/70">{p.num}</span>
                  {p.plainTitle}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {p.plain.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span
                        className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 rounded-lg border border-border/50 bg-card/50 p-5 text-sm text-muted-foreground">
          <p>
            Fragen zu einzelnen Punkten? Schreiben Sie mir eine kurze Nachricht an{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline"
            >
              {siteConfig.email}
            </a>
            . Ich erkläre gerne, was gemeint ist.
          </p>
          <p className="mt-3 text-xs text-muted-foreground/70">
            Die rechtsverbindliche Fassung als PDF liegt jedem Angebot bei. Bei abweichenden
            individuellen Vereinbarungen im Angebot haben diese Vorrang vor diesen AGB.
          </p>
        </div>
      </div>
    </main>
  );
}
