import type { Metadata } from "next";
import {
  Gauge,
  Search,
  ShieldCheck,
  Accessibility,
  Smartphone,
  Scale,
  CheckCircle2,
} from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { siteConfig, siteUrl } from "@/config/site";
import WebsiteCheckForm from "./WebsiteCheckForm";


export const metadata: Metadata = {
  title: "Kostenloser Website-Check | Michael Höger",
  description:
    "Wie gut ist Ihre Website wirklich? Kostenloser Check für Performance, SEO, Sicherheit, Barrierefreiheit und mehr. Ergebnis per E-Mail in wenigen Minuten.",
  alternates: { canonical: "/website-check/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${siteUrl}/website-check/`,
    siteName: siteConfig.name,
    title: "Kostenloser Website-Check",
    description:
      "Wie gut ist Ihre Website wirklich? Kostenloser Check für Performance, SEO, Sicherheit und mehr.",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Kostenloser Website-Check von Michael Höger",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kostenloser Website-Check",
    description:
      "Wie gut ist Ihre Website wirklich? Kostenloser Check für Performance, SEO, Sicherheit und mehr.",
    images: [`${siteUrl}/images/og-image.png`],
  },
  robots: { index: true, follow: true },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kostenloser Website-Check",
  description:
    "Kostenloser Website-Check für Performance, SEO, Sicherheit, Barrierefreiheit, Mobile-Optimierung und rechtliche Anforderungen.",
  url: `${siteUrl}/website-check/`,
  applicationCategory: "UtilityApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  provider: {
    "@type": "Person",
    name: siteConfig.name,
    url: siteUrl,
  },
};

const checkCategories = [
  {
    icon: Gauge,
    title: "Performance",
    text: "Ladezeit, Core Web Vitals und Geschwindigkeitsoptimierung — langsame Seiten verlieren Besucher.",
  },
  {
    icon: Search,
    title: "SEO",
    text: "Meta-Tags, Überschriften-Struktur, indexierbare Inhalte — werden Sie bei Google gefunden?",
  },
  {
    icon: ShieldCheck,
    title: "Sicherheit",
    text: "SSL-Zertifikat, Security-Header und bekannte Schwachstellen — schützen Sie Ihre Besucher.",
  },
  {
    icon: Accessibility,
    title: "Barrierefreiheit",
    text: "WCAG-Konformität und BFSG-Anforderungen — seit 2025 für viele Webseiten Pflicht.",
  },
  {
    icon: Smartphone,
    title: "Mobile",
    text: "Responsive Design und Touch-Optimierung — über 60% Ihrer Besucher kommen vom Handy.",
  },
  {
    icon: Scale,
    title: "Recht",
    text: "Impressum, Datenschutz, Cookie-Consent — rechtliche Pflichtangaben auf einen Blick.",
  },
];

const trustPoints = [
  "100% kostenlos — keine versteckten Kosten",
  "Ergebnis per E-Mail in wenigen Minuten",
  "Konkrete Handlungsempfehlungen statt Fachchinesisch",
  "Kein Verkaufsgespräch, kein Druck",
  "DSGVO-konform — Ihre Daten sind sicher",
];

export default function WebsiteCheck() {
  return (
    <>
      <main id="main">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webAppSchema),
          }}
        />

        {/* Hero */}
        <section className="relative flex min-h-[70dvh] items-center overflow-hidden bg-background">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/[0.06] blur-[100px]" />
          <div className="absolute -left-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-secondary/[0.08] blur-[80px]" />

          <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full bg-primary/[0.07] glass shadow-depth px-4 py-1.5">
                <Gauge className="mr-2 h-3.5 w-3.5 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Kostenloser Website-Check
                </span>
              </div>

              <h1 className="text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Wie gut ist Ihre Website{" "}
                <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                  wirklich?
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Finden Sie in wenigen Minuten heraus, wie Ihre Website bei
                Performance, SEO, Sicherheit und Barrierefreiheit abschneidet
                — kostenlos und unverbindlich.
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section id="check" className="bg-card py-20">
          <div className="mx-auto max-w-2xl px-5 sm:px-6">
            <WebsiteCheckForm />
          </div>
        </section>

        {/* Was wir prüfen */}
        <section className="bg-background py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Umfassende Analyse
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Was wir prüfen
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Ihr Report deckt die sechs wichtigsten Bereiche ab — mit
                konkreten Empfehlungen, die Sie sofort umsetzen können.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {checkCategories.map((c, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-border glass shadow-depth bg-background p-7 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.07]">
                    <c.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust / Warum dieser Check */}
        <section className="border-t border-border bg-card py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-6">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Kein Haken
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Warum dieser Check?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Viele Unternehmen wissen gar nicht, wie ihre Website wirklich
                dasteht. Dieser Check gibt Ihnen Klarheit — ohne
                Verpflichtungen.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-xl space-y-4">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 rounded-xl glass shadow-depth px-5 py-4"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <WhatsAppButton />
    </>
  );
}
