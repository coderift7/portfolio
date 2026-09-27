import type { Metadata } from "next";
import {
  Gauge,
  Search,
  ShieldCheck,
  Accessibility,
  Smartphone,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
  Send,
  FileCheck,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ProjectMockup } from "@/components/BrowserMockup";
import { siteConfig, siteUrl } from "@/config/site";
import FitnessCheckForm from "./FitnessCheckForm";
import FitnessFaq, { type FaqItem } from "./FitnessFaq";

const pageTitle = "Website-Check für Personal Trainer";
const pageDescription =
  "Kostenloser Website-Check für Personal Trainer: Sie erfahren, wie schnell Ihre Website lädt, wie sie auf dem Handy wirkt und ob Google sie richtig einordnen kann. Report per E-Mail.";

export const metadata: Metadata = {
  title: `${pageTitle} | ${siteConfig.name}`,
  description: pageDescription,
  alternates: { canonical: "/fuer-fitness/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${siteUrl}/fuer-fitness/`,
    siteName: siteConfig.name,
    title: pageTitle,
    description: pageDescription,
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
    title: pageTitle,
    description: pageDescription,
    images: [`${siteUrl}/images/og-image.png`],
  },
  robots: { index: true, follow: true },
};

const situations = [
  {
    icon: Phone,
    title: "Der Kontakt ist versteckt.",
    text: "Jemand will ein Probetraining oder ein Erstgespräch — und findet keine Telefonnummer, kein Formular, keinen klaren Weg.",
  },
  {
    icon: MessageSquare,
    title: "Das Angebot bleibt unklar.",
    text: "Trainingsangebot, Preise, Einstieg: Wenn Besucher nicht in wenigen Sekunden verstehen, was Sie anbieten und für wen, klicken sie weiter.",
  },
  {
    icon: Clock,
    title: "Die Seite lädt zu langsam.",
    text: "Auf dem Handy, unterwegs, mit schlechtem Empfang. Jede Sekunde Warten kostet Besucher.",
  },
  {
    icon: Accessibility,
    title: "Manche Besucher kommen nicht zurecht.",
    text: "Zu kleine Schrift, schwacher Kontrast, Bilder ohne Beschreibung. Das betrifft mehr Menschen, als man denkt.",
  },
];

// Only what the check actually measures (Lighthouse, certificate, meta data,
// broken links). No legal review, no security scan, no manual assessment.
const checkPoints = [
  {
    icon: Gauge,
    title: "Ladezeit und Handy-Tauglichkeit",
    text: "Wie schnell Ihre Seite lädt und wie sie auf dem Handy dargestellt wird.",
  },
  {
    icon: Accessibility,
    title: "Für alle nutzbar",
    text: "Ob Kontraste, Schriftgrößen und Bildbeschreibungen Besuchern das Lesen leicht machen.",
  },
  {
    icon: Search,
    title: "Bei Google gefunden werden",
    text: "Ob Seitentitel, Beschreibung und technische Grundlagen stimmen, damit Google Ihre Seite richtig einordnen kann.",
  },
  {
    icon: ShieldCheck,
    title: "Sichere Verbindung und kaputte Links",
    text: "Ob Ihr Zertifikat gültig ist, Besucher automatisch auf die sichere Version kommen und ob Links ins Leere führen.",
  },
];

const steps = [
  {
    number: "1",
    icon: Send,
    title: "Website eintragen",
    text: "Adresse und E-Mail genügen. Dauert eine Minute.",
  },
  {
    number: "2",
    icon: FileCheck,
    title: "Check erhalten",
    text: "Der Report kommt als PDF per E-Mail, in der Regel innerhalb weniger Minuten, bei vielen Anfragen etwas später.",
  },
];

const trustPoints = [
  {
    title: "Klarer Kontaktweg",
    text: "Anruf, Nachricht oder Termin: in zwei Klicks erreichbar, auf jedem Gerät.",
  },
  {
    title: "Auf dem Handy verständlich",
    text: "Die meisten Interessenten schauen unterwegs. Dort muss alles lesbar und bedienbar sein.",
  },
  {
    title: "Für alle nutzbar",
    text: "Gute Lesbarkeit hilft jedem Besucher, nicht nur Menschen mit Einschränkungen.",
  },
  {
    title: "Datenschutz, der Vertrauen schafft",
    text: "Wer über Körper, Gewicht und Gesundheit spricht, muss sorgsam mit Daten umgehen. Das merken Ihre Interessenten.",
  },
  {
    title: "Bei Google gefunden werden",
    text: "Wer in Ihrer Region nach Ihrem Angebot sucht, sollte Sie finden können.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Was kostet der Website-Check?",
    answer:
      "Nichts. Es gibt keine versteckten Kosten und keine Verpflichtung.",
  },
  {
    question: "Muss ich danach etwas kaufen?",
    answer:
      "Nein. Sie bekommen den Report und entscheiden selbst, ob Sie etwas damit machen möchten.",
  },
  {
    question: "Ruft mich jemand an?",
    answer:
      "Nein. Ich melde mich nicht unaufgefordert. Wenn Sie Fragen haben, schreiben Sie mir — ich antworte per E-Mail.",
  },
  {
    question: "Was prüft der Check nicht?",
    answer:
      "Rechtliche Fragen, Ihre Texte inhaltlich und Ihre Angebote. Er misst Technik und Nutzbarkeit — den Rest besprechen wir nur, wenn Sie das wollen.",
  },
  {
    question: "Was passiert mit meinen Daten?",
    answer:
      "Website-Adresse und E-Mail brauche ich für den Report. Was genau gespeichert wird und wie lange, steht in der Datenschutzerklärung.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Website-Check für Personal Trainer" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FuerFitness() {
  return (
    <>
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* Hero — same pattern as /website-check/ */}
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
                <Smartphone className="mr-2 h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium text-primary">
                  Für Personal Trainer
                </span>
              </div>

              <h1 className="text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Ihre Website soll{" "}
                <span className="text-gradient-brand">Vertrauen schaffen</span>{" "}
                — nicht Interessenten verlieren.
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Wer einen Personal Trainer sucht, schaut zuerst auf Ihre
                Website. Meist auf dem Handy, meist nur ein paar Sekunden. Der
                kostenlose Website-Check zeigt Ihnen, was Interessenten dort
                erleben — und was Sie leicht verbessern können.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
                <a
                  href="#check"
                  className="btn-brand group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
                >
                  Kostenlosen Website-Check anfordern
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="#pruefpunkte"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl glass shadow-depth glow-hover px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-150 hover:bg-muted"
                >
                  Was geprüft wird
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Alltagssituationen — card grid pattern from /webdesign-limburg/ */}
        <section className="border-y border-border bg-card py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-primary">
                Kommt Ihnen das bekannt vor?
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Vier Dinge, die Interessenten still wieder gehen lassen
              </h2>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {situations.map((s) => (
                <div
                  key={s.title}
                  className="group relative overflow-hidden rounded-2xl border border-border glass shadow-depth bg-background p-7 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.07]">
                    <s.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-center text-lg text-muted-foreground">
              Genau solche Punkte macht der Website-Check sichtbar — mit
              Messwerten, nicht mit Bauchgefühl.
            </p>
          </div>
        </section>

        {/* Prüfpunkte */}
        <section id="pruefpunkte" className="scroll-mt-24 bg-background py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-primary">
                Kostenlos und unverbindlich
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Was Sie bekommen
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Ein kurzer Report als PDF per E-Mail. Verständlich erklärt, mit
                Ampel-Bewertung und konkreten Hinweisen.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {checkPoints.map((c) => (
                <div
                  key={c.title}
                  className="group relative overflow-hidden rounded-2xl border border-border glass shadow-depth bg-background p-7 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.07]">
                    <c.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-10 max-w-3xl rounded-2xl glass shadow-depth px-6 py-5">
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Was der Check nicht ist:</strong>{" "}
                keine Rechtsprüfung, keine Sichtung Ihrer Texte, keine Beratung.
                Er misst, was messbar ist. Alles Weitere besprechen wir nur, wenn
                Sie das möchten.
              </p>
            </div>
          </div>
        </section>

        {/* Ablauf — static variant of components/Process.tsx */}
        <section className="border-y border-border bg-card py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-primary">
                Ablauf
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                So einfach geht es
              </h2>
            </div>

            <ol className="relative mt-16 grid list-none gap-8 p-0 md:grid-cols-2">
              <li
                aria-hidden="true"
                className="absolute top-16 left-1/4 right-1/4 hidden h-[2px] bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 md:block"
              />
              {steps.map((step) => (
                <li key={step.number} className="relative flex h-full flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shadow-[0_0_20px_rgba(13,148,136,0.12)]">
                      <step.icon className="h-7 w-7 text-primary" aria-hidden="true" />
                    </div>
                    <div
                      aria-hidden="true"
                      className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary font-mono text-xs font-bold text-white shadow-md"
                    >
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1 rounded-2xl glass shadow-depth glow-hover border-white/20 dark:border-white/5 p-6 transition-all duration-300">
                    <h3 className="text-lg font-bold text-foreground">
                      <span className="sr-only">Schritt {step.number}: </span>
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Referenz — same mockup as the portfolio cards */}
        <section className="bg-background pt-20">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2">
            <ProjectMockup image="body-process" title="Body Process" />
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-primary">
                Aus der Praxis
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Body Process: eine Website für einen Personal Trainer
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Für das Fitness- und Ernährungscoaching von Body Process habe
                ich die Website neu gebaut: Leistungen, Module und Preise klar
                gegliedert, auf dem Handy gut lesbar und mit einem direkten Weg
                zur Kontaktaufnahme.
              </p>
              <a
                href="https://body-process.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 underline underline-offset-4 dark:text-primary"
              >
                body-process.de ansehen
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(öffnet in neuem Tab)</span>
              </a>
            </div>
          </div>
        </section>

        {/* Vertrauen — trust list pattern from /website-check/ */}
        <section className="bg-background py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-6">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-primary">
                Worauf es ankommt
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Was eine gute Trainer-Website leistet
              </h2>
            </div>

            <ul className="mx-auto mt-12 max-w-xl list-none space-y-4 p-0">
              {trustPoints.map((point) => (
                <li
                  key={point.title}
                  className="flex items-start gap-3 rounded-xl glass shadow-depth px-5 py-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{point.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{point.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Formular */}
        <section id="check" className="scroll-mt-24 border-t border-border bg-card py-20">
          <div className="mx-auto max-w-2xl px-5 sm:px-6">
            <FitnessCheckForm />
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-background py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-6">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-primary">
                Häufige Fragen
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Gut zu wissen
              </h2>
            </div>
            <FitnessFaq items={faqItems} />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Alle Angaben zur Datenverarbeitung stehen in der{" "}
              <a href="/datenschutz/#website-check" className="text-teal-700 underline dark:text-primary">
                Datenschutzerklärung
              </a>
              .
            </p>
          </div>
        </section>

        {/* Schluss-CTA — card pattern from /webdesign-limburg/ */}
        <section className="border-t border-border bg-card py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-6">
            <div className="rounded-2xl glass shadow-depth border-primary/10 p-8 text-center sm:p-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ein kleiner Schritt, der Klarheit bringt
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                Tragen Sie Ihre Website ein. Sie bekommen einen verständlichen
                Report — und danach entscheiden Sie in Ruhe, was Sie damit
                machen.
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  href="#check"
                  className="btn-brand group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
                >
                  Kostenlosen Website-Check anfordern
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <WhatsAppButton />
    </>
  );
}
