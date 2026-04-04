import type { Metadata } from "next";
import { ArrowRight, MapPin, Clock, Shield, Star, CheckCircle2, Phone, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SchaeferhofMockup } from "@/components/BrowserMockup";
import { siteConfig } from "@/config/site";

const siteUrl = "https://hoeger.dev";

export const metadata: Metadata = {
  title: "Webdesign Limburg – Webseiten für kleine Unternehmen | Michael Höger",
  description:
    "Professionelles Webdesign in Limburg an der Lahn. Webseiten für kleine Unternehmen und Selbstständige — Google-optimiert, KI-ready, in 14 Tagen online. Festpreis, persönliche Betreuung.",
  alternates: { canonical: "/webdesign-limburg" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${siteUrl}/webdesign-limburg`,
    siteName: siteConfig.name,
    title: "Webdesign Limburg – Webseiten für kleine Unternehmen",
    description:
      "Professionelles Webdesign in Limburg an der Lahn. Google-optimiert, in 14 Tagen online. Kostenlose Erstberatung.",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Michael Höger – Webdesign in Limburg",
        type: "image/png",
      },
    ],
  },
  keywords: [
    "Webdesign Limburg",
    "Webdesigner Limburg",
    "Website erstellen Limburg",
    "Homepage erstellen lassen Limburg",
    "Webseite Limburg an der Lahn",
    "Webdesign Limburg-Weilburg",
    "SEO Limburg",
    "Webentwicklung Limburg",
    "KI-Optimierung",
  ],
  robots: { index: true, follow: true },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Michael Höger – Webdesign Limburg",
  description:
    "Professionelles Webdesign für kleine Unternehmen in Limburg an der Lahn und Umgebung. Google-optimiert, KI-ready, persönliche Betreuung.",
  url: `${siteUrl}/webdesign-limburg`,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  image: `${siteUrl}/images/og-image.png`,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Johann-Boppe-Str. 19",
    addressLocality: "Limburg an der Lahn",
    postalCode: "65549",
    addressRegion: "Hessen",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.3877,
    longitude: 8.0622,
  },
  areaServed: [
    { "@type": "City", name: "Limburg an der Lahn" },
    { "@type": "AdministrativeArea", name: "Landkreis Limburg-Weilburg" },
    { "@type": "State", name: "Hessen" },
  ],
  serviceType: [
    "Webdesign",
    "Webentwicklung",
    "Suchmaschinenoptimierung (SEO)",
    "KI-Optimierung",
  ],
};

const benefits = [
  {
    icon: Clock,
    title: "In 14 Tagen online",
    text: "Kein monatelanges Warten. Ihre neue Webseite ist in zwei Wochen fertig und bei Google sichtbar.",
  },
  {
    icon: MapPin,
    title: "Ihr Webdesigner vor Ort",
    text: "Persönlicher Ansprechpartner aus Limburg — kein Callcenter, keine Agentur. Wir können uns gerne auf einen Kaffee treffen.",
  },
  {
    icon: Shield,
    title: "Festpreis-Garantie",
    text: "Sie wissen vorher, was es kostet. Keine versteckten Gebühren, keine bösen Überraschungen auf der Rechnung.",
  },
  {
    icon: Star,
    title: "Gefunden werden — auch von KI",
    text: "Ihre Webseite wird nicht nur bei Google gefunden, sondern auch von ChatGPT und Co. empfohlen. Das bieten die wenigsten.",
  },
];

const targetGroups = [
  "Handwerksbetriebe",
  "Restaurants & Cafés",
  "Arztpraxen & Therapeuten",
  "Friseursalons & Studios",
  "Vereine & Verbände",
  "Coaches & Berater",
  "Einzelhandel",
  "Dienstleister aller Art",
];

export default function WebdesignLimburg() {
  return (
    <>
      <Header />
      <main id="main">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />

        {/* Hero */}
        <section className="relative flex min-h-[85dvh] items-center overflow-hidden bg-background">
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
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center rounded-full bg-primary/[0.07] glass shadow-depth px-4 py-1.5">
                <MapPin className="mr-2 h-3.5 w-3.5 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Webdesign in Limburg an der Lahn
                </span>
              </div>

              <h1 className="text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Ihre Kunden in Limburg
                <br />
                <span className="text-gradient-brand">suchen Sie online.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Finden sie Ihr Geschäft — oder das der Konkurrenz? Ich baue
                Webseiten für kleine Unternehmen in Limburg und Umgebung, die
                bei Google gefunden werden und Anfragen bringen. Persönlich,
                zum Festpreis, in 14 Tagen online.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#kontakt"
                  className="btn-brand group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
                >
                  Kostenlos beraten lassen
                  <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </a>
                <a
                  href="tel:+491629255254"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl glass shadow-depth glow-hover px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-150 hover:bg-muted"
                >
                  <Phone className="h-4 w-4" />
                  Direkt anrufen
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-y border-border bg-card py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Warum ich
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Webdesign aus Limburg — persönlich und ehrlich
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Kein anonymes Agentur-Erlebnis. Sie bekommen einen
                Ansprechpartner, der zuhört, versteht und liefert.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-border glass shadow-depth bg-background p-7 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.07]">
                    <b.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {b.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof — Schäferhof */}
        <section className="bg-background py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Kundenprojekt
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Von Null auf bei Google sichtbar
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  Ein Schäfer im Münsterland brauchte eine Webseite für seine
                  Guteschaf-Hobbyzucht. Innerhalb von zwei Wochen war die Seite
                  live — mit Kontaktformular, das Anfragen direkt aufs Handy
                  schickt, Google-Optimierung und einer Ladezeit unter einer
                  Sekunde.
                </p>
                <blockquote className="mt-6 border-l-2 border-primary pl-4 text-muted-foreground italic">
                  &ldquo;Michael hat genau verstanden, was wir brauchen. Schnell,
                  unkompliziert und das Ergebnis kann sich sehen lassen.&rdquo;
                </blockquote>
                <p className="mt-2 text-sm font-medium text-foreground">
                  — Michael Schäfer, Auf&apos;m Schäferhof
                </p>
                <a
                  href="https://aufmschaeferhof.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-secondary"
                >
                  Projekt ansehen
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <div>
                <SchaeferhofMockup />
              </div>
            </div>
          </div>
        </section>

        {/* Target Groups */}
        <section className="bg-card py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Für wen
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Webseiten für Limburger Unternehmen
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Ob Handwerker, Gastronom oder Dienstleister — wenn Ihre Kunden
                Sie bei Google suchen, sollten sie Sie auch finden.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2 md:grid-cols-4">
              {targetGroups.map((group) => (
                <div
                  key={group}
                  className="flex items-center gap-2 rounded-xl glass shadow-depth px-4 py-3"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {group}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / Contact */}
        <section id="kontakt" className="bg-background py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-6">
            <div className="rounded-2xl glass shadow-depth border-primary/10 p-8 text-center sm:p-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Bereit für Ihre neue Webseite?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                Schreiben Sie mir oder rufen Sie an. In 10 Minuten wissen Sie,
                ob und wie eine Webseite Ihrem Geschäft in Limburg helfen kann.
                Kostet nichts — außer 10 Minuten Ihrer Zeit.
              </p>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="tel:+491629255254"
                  className="btn-brand group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
                >
                  <Phone className="h-4 w-4" />
                  +49 162 9255254
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl glass shadow-depth glow-hover px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-150 hover:bg-muted"
                >
                  <Mail className="h-4 w-4" />
                  {siteConfig.email}
                </a>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                Oder nutzen Sie das{" "}
                <a href="/#kontakt" className="text-primary underline">
                  Kontaktformular
                </a>{" "}
                auf meiner Hauptseite. Ich melde mich innerhalb von 48 Stunden
                persönlich.
              </p>
            </div>
          </div>
        </section>

        {/* Local SEO Text */}
        <section className="border-t border-border bg-card py-16">
          <div className="mx-auto max-w-3xl px-5 sm:px-6">
            <h2 className="text-xl font-bold text-foreground">
              Webdesign in Limburg an der Lahn
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Als Webdesigner in Limburg an der Lahn unterstütze ich kleine
              Unternehmen, Selbstständige und Vereine im Landkreis
              Limburg-Weilburg dabei, online sichtbar zu werden. Ob Sie in
              Limburg, Hadamar, Weilburg, Diez oder im gesamten
              Rhein-Main-Gebiet Kunden erreichen möchten — ich erstelle
              Webseiten, die bei Google gefunden werden und echte Anfragen
              generieren. Jedes Projekt wird individuell umgesetzt, persönlich
              betreut und zum transparenten Festpreis abgerechnet.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
