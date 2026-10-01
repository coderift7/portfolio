import type { Metadata } from "next";
import {
  Timer,
  MessageSquare,
  ClipboardList,
  FileText,
  Handshake,
  Repeat,
  Inbox,
  FolderSearch,
  CalendarClock,
  CheckCircle2,
  Mail,
  ArrowRight,
} from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import FitnessFaq, { type FaqItem } from "../fuer-fitness/FitnessFaq";
import { siteConfig, siteUrl } from "@/config/site";

const pageTitle = "Zeitfresser-Check";
const pageDescription =
  "Finden Sie heraus, wo in Ihrem Betrieb jede Woche Stunden verloren gehen und was sich davon zurückholen lässt. Festpreis 490 €, ohne Verpflichtung zur Umsetzung.";

const mailHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  "Zeitfresser-Check",
)}`;

export const metadata: Metadata = {
  title: `${pageTitle} | ${siteConfig.name}`,
  description: pageDescription,
  alternates: { canonical: "/zeitfresser-check/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${siteUrl}/zeitfresser-check/`,
    siteName: siteConfig.name,
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: `${siteUrl}/images/og-image-20261001.png`,
        width: 1200,
        height: 630,
        alt: "Zeitfresser-Check von Michael Höger",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [`${siteUrl}/images/og-image-20261001.png`],
  },
  robots: { index: true, follow: true },
};

const timeEaters = [
  {
    icon: Repeat,
    title: "Daten mehrfach eintippen",
    text: "Dieselben Angaben landen erst in der Mail, dann in der Tabelle, dann im Programm. Jedes Mal von Hand.",
  },
  {
    icon: Inbox,
    title: "Anfragen sortieren und beantworten",
    text: "Viele Nachrichten sind fast gleich, trotzdem wird jede einzeln gelesen, zugeordnet und beantwortet.",
  },
  {
    icon: FolderSearch,
    title: "Unterlagen hinterherlaufen",
    text: "Belege, Formulare, Rückmeldungen: anfordern, erinnern, noch mal erinnern, dann richtig ablegen.",
  },
  {
    icon: CalendarClock,
    title: "Termine hin und her",
    text: "Drei Mails für einen Termin, dazu Erinnerungen und Absagen, die jemand nachpflegen muss.",
  },
];

const steps = [
  {
    number: "1",
    icon: MessageSquare,
    title: "Gespräch",
    text: "Rund 60 Minuten, bei Ihnen vor Ort oder per Video. Wir gehen Ihren Arbeitsalltag durch: Wo hakt es, wo wird doppelt gearbeitet, was hält Ihr Team am meisten auf?",
  },
  {
    number: "2",
    icon: ClipboardList,
    title: "Abläufe aufnehmen",
    text: "Ich halte die wichtigsten Abläufe fest und rechne aus, wie viel Zeit sie wirklich kosten. Dafür sehe ich mir an, wie gearbeitet wird, nicht die Daten Ihrer Kunden.",
  },
  {
    number: "3",
    icon: FileText,
    title: "Ergebnis-Mappe",
    text: "Drei konkrete Vorschläge. Zu jedem: was sich ändert, wie viele Stunden im Monat Sie gewinnen, was die Umsetzung kosten würde und wo die Daten dabei verarbeitet würden.",
  },
  {
    number: "4",
    icon: Handshake,
    title: "Besprechung",
    text: "30 Minuten, in denen wir die Vorschläge gemeinsam durchgehen. Danach entscheiden Sie in Ruhe, ob und was Sie umsetzen möchten.",
  },
];

const benefits = [
  {
    title: "Klarheit statt Bauchgefühl",
    text: "Sie wissen danach, wo sich Automatisierung in Ihrem Betrieb lohnt und wo nicht. Ehrlich, auch wenn die Antwort mal „lohnt sich nicht“ lautet.",
  },
  {
    title: "Zahlen, mit denen Sie rechnen können",
    text: "Jeder Vorschlag hat eine geschätzte Ersparnis in Stunden und einen Preis für die Umsetzung. So sehen Sie auf einen Blick, was sich rechnet.",
  },
  {
    title: "Vertraulichkeit zuerst",
    text: "Ein Vorschlag, bei dem der Umgang mit Kunden- oder Mandantendaten nicht sauber lösbar ist, kommt nicht in die Mappe.",
  },
  {
    title: "Fester Preis, keine Verpflichtung",
    text: "Sie zahlen den Check, sonst nichts. Ob Sie danach etwas umsetzen, entscheiden allein Sie.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Was kostet der Zeitfresser-Check?",
    answer:
      "490 € als Festpreis. Gemäß § 19 UStG wird keine Umsatzsteuer berechnet. Wenn Sie danach einen der Vorschläge bei mir umsetzen lassen, rechne ich die Hälfte des Preises an.",
  },
  {
    question: "Für wen ist der Check gedacht?",
    answer:
      "Für kleine Betriebe, Praxen und Kanzleien, in denen viele Abläufe noch von Hand laufen: E-Mails, Tabellen, Papier. Eine bestimmte Software brauchen Sie dafür nicht.",
  },
  {
    question: "Muss ich danach etwas umsetzen lassen?",
    answer:
      "Nein. Die Mappe gehört Ihnen. Sie können die Vorschläge selbst umsetzen, jemand anderen beauftragen oder es lassen.",
  },
  {
    question: "Sehen Sie dabei Daten meiner Kunden oder Mandanten?",
    answer:
      "Nein. Für den Check reicht es, wenn Sie mir zeigen und erzählen, wie die Arbeit abläuft. Echte Kunden- oder Mandantendaten brauche ich dafür nicht.",
  },
  {
    question: "Wie lange dauert es bis zur Ergebnis-Mappe?",
    answer:
      "In der Regel etwa eine Woche nach dem Gespräch. Den Termin für die Besprechung legen wir gemeinsam fest.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: pageTitle },
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

export default function ZeitfresserCheck() {
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

        {/* Hero — same pattern as /fuer-fitness/ */}
        <section className="relative flex items-center overflow-hidden bg-background sm:min-h-[70dvh]">
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

          <div className="relative z-10 mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full bg-primary/[0.07] glass shadow-depth px-4 py-1.5">
                <Timer className="mr-2 h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium text-primary">
                  Zeitfresser-Check · Festpreis
                </span>
              </div>

              <h1 className="text-[2rem] font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Wo verliert Ihr Betrieb{" "}
                <span className="text-gradient-brand">jede Woche Stunden?</span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Der Zeitfresser-Check zeigt, welche Routinearbeit sich
                automatisieren lässt, wie viel Zeit Sie damit zurückgewinnen
                und was das kosten würde. Mit festem Preis und ohne
                Verpflichtung zur Umsetzung.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center">
                <a
                  href={mailHref}
                  className="btn-brand group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
                >
                  Zeitfresser-Check anfragen
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="#ablauf"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl glass shadow-depth glow-hover px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-150 hover:bg-muted"
                >
                  So läuft der Check ab
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Typische Zeitfresser */}
        <section className="border-y border-border bg-card py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-primary">
                Kommt Ihnen das bekannt vor?
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Einzeln nur Minuten, im Jahr ganze Wochen
              </h2>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {timeEaters.map((t) => (
                <div
                  key={t.title}
                  className="group relative overflow-hidden rounded-2xl border border-border glass shadow-depth bg-background p-7 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.07]">
                    <t.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{t.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {t.text}
                  </p>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-center text-lg text-muted-foreground">
              Zehn Minuten am Tag sind übers Jahr rund 40 Stunden, also eine
              ganze Arbeitswoche. Pro Person und pro Aufgabe.
            </p>
          </div>
        </section>

        {/* Ablauf */}
        <section id="ablauf" className="scroll-mt-24 bg-background py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-primary">
                Ablauf
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                In vier Schritten zur Ergebnis-Mappe
              </h2>
            </div>

            <ol className="mt-14 grid list-none gap-6 p-0 sm:grid-cols-2">
              {steps.map((step) => (
                <li
                  key={step.number}
                  className="relative rounded-2xl glass shadow-depth border border-border bg-background p-7"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <step.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <span
                      aria-hidden="true"
                      className="font-mono text-sm font-bold text-teal-700 dark:text-primary"
                    >
                      0{step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    <span className="sr-only">Schritt {step.number}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Nutzen */}
        <section className="border-y border-border bg-card py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-6">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-primary">
                Was Sie davon haben
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Entscheiden auf einer klaren Grundlage
              </h2>
            </div>

            <ul className="mx-auto mt-12 max-w-xl list-none space-y-4 p-0">
              {benefits.map((b) => (
                <li
                  key={b.title}
                  className="flex items-start gap-3 rounded-xl glass shadow-depth bg-background px-5 py-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{b.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Preis */}
        <section className="bg-background py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-6">
            <div className="rounded-2xl glass shadow-depth border border-primary/20 p-8 text-center sm:p-12">
              <span className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-primary">
                Festpreis
              </span>
              <p className="mt-3 text-5xl font-extrabold tracking-tight text-foreground">
                490 €
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
              </p>
              <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                Gespräch, Ablauf-Aufnahme, Ergebnis-Mappe mit drei Vorschlägen
                und Besprechung. Lassen Sie danach einen Vorschlag bei mir
                umsetzen, rechne ich die Hälfte an.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-background pb-20">
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
          </div>
        </section>

        {/* Schluss-CTA */}
        <section className="border-t border-border bg-card py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-6">
            <div className="rounded-2xl glass shadow-depth border-primary/10 p-8 text-center sm:p-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Finden wir Ihre Zeitfresser
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                Schreiben Sie mir kurz, was Sie machen und wo es gerade am
                meisten hakt. Ich melde mich mit einem Terminvorschlag.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3">
                <a
                  href={mailHref}
                  className="btn-brand group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Zeitfresser-Check anfragen
                </a>
                <p className="text-sm text-muted-foreground">
                  oder anrufen:{" "}
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="font-semibold text-teal-700 underline dark:text-primary"
                  >
                    {siteConfig.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <WhatsAppButton />
    </>
  );
}
