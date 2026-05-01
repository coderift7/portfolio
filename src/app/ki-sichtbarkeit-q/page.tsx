import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  Clock3,
  Euro,
  Eye,
  FileText,
  Mail,
  MessageSquareText,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { siteConfig, siteUrl } from "@/config/site";

const offerName = "KI-Sichtbarkeits-Check";
const mailSubject = "Anfrage KI-Sichtbarkeits-Check";
const mailBody = [
  "Hallo Michael,",
  "",
  "ich interessiere mich für den KI-Sichtbarkeits-Check.",
  "",
  "Meine Website:",
  "Mein Unternehmen:",
  "Was ich anbiete:",
  "",
  "Bitte melde dich mit den nächsten Schritten.",
].join("\n");

const mailHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  mailSubject
)}&body=${encodeURIComponent(mailBody)}`;

export const metadata: Metadata = {
  title: `${offerName} | Michael Höger`,
  description:
    "Finden ChatGPT, Gemini und andere KI-Assistenten Ihr Unternehmen, wenn Kunden nach Ihrem Angebot fragen? Der kompakte Check zeigt Lücken und konkrete nächste Schritte.",
  alternates: { canonical: "/ki-sichtbarkeit-q/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${siteUrl}/ki-sichtbarkeit-q/`,
    title: `${offerName} | Michael Höger`,
    description:
      "Ein kompakter Check für Unternehmen, die auch bei KI-Assistenten sichtbar werden wollen.",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Michael Höger – KI-Sichtbarkeits-Check",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${offerName} | Michael Höger`,
    description:
      "Klarer Check: Wird Ihr Unternehmen von KI-Assistenten gefunden und empfohlen?",
    images: [`${siteUrl}/images/og-image.png`],
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

const checks = [
  {
    icon: Bot,
    title: "KI-Test mit echten Kundenfragen",
    text: "Ich prüfe, ob Ihr Unternehmen bei typischen Fragen in ChatGPT, Gemini und Perplexity auftaucht.",
  },
  {
    icon: Eye,
    title: "Konkurrenz-Vergleich",
    text: "Sie sehen, wer stattdessen empfohlen wird und warum diese Anbieter für KI leichter zu greifen sind.",
  },
  {
    icon: FileText,
    title: "Konkrete Text-Bausteine",
    text: "Sie bekommen Formulierungen, die Ihre Website, Ihr Profil und Angebotsseiten klarer machen.",
  },
  {
    icon: Target,
    title: "Umsetzungsplan ohne Techniknebel",
    text: "Maximal zehn Maßnahmen, sortiert nach Wirkung. Verständlich genug, um sofort zu entscheiden.",
  },
];

const deliverables = [
  "Sichtbarkeitstest mit 12 typischen Kundenfragen",
  "Vergleich mit 3 direkten Mitbewerbern",
  "Kurzreport als PDF mit klarer Ampelbewertung",
  "Priorisierte Maßnahmenliste für Website und Unternehmensprofil",
  "30 Minuten Auswertung per Video",
];

const objections = [
  {
    q: "Brauche ich das, wenn Google schon passt?",
    a: "Ja, weil KI-Assistenten Antworten anders zusammensetzen. Eine gute Google-Position hilft, garantiert aber keine Empfehlung.",
  },
  {
    q: "Ist das ein großes Projekt?",
    a: "Nein. Der Check ist klein, schnell und bewusst begrenzt. Danach wissen Sie, ob sich mehr lohnt.",
  },
  {
    q: "Für wen passt das besonders?",
    a: "Für lokale Dienstleister, Praxen, Coaches, Berater und Betriebe, die erklärungsbedürftige Leistungen verkaufen.",
  },
];

export default function KiSichtbarkeitQPage() {
  return (
    <main id="main" className="bg-background">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.24),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(249,115,22,0.16),transparent_28%)]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto grid min-h-[86dvh] max-w-7xl items-center gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-white/8 px-4 py-2 text-sm font-semibold text-teal-100 backdrop-blur">
              <Sparkles className="h-4 w-4 text-teal-300" aria-hidden="true" />
              Mai-Test · 5 Plätze zum Launchpreis
            </div>

            <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-7xl">
              Werden Sie von KI empfohlen, wenn Kunden nach Ihrem Angebot fragen?
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              Der KI-Sichtbarkeits-Check zeigt, ob ChatGPT, Gemini und andere
              Assistenten Ihr Unternehmen verstehen, nennen und vertrauenswürdig
              einordnen. Kompakt, verständlich und mit klaren nächsten Schritten.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={mailHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_18px_40px_rgba(20,184,166,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-teal-300 focus-visible:ring-2 focus-visible:ring-teal-200"
              >
                Check anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="#umfang"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/14 bg-white/6 px-6 py-3 text-sm font-bold text-white backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-teal-200"
              >
                Umfang ansehen
              </Link>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
              {[
                ["490 EUR", "Launchpreis für die ersten 5 Checks"],
                ["3 Werktage", "Report nach Zahlung und Website-Link"],
                ["30 Min.", "Auswertung direkt mit Michael"],
              ].map(([value, label]) => (
                <div
                  key={value}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur"
                >
                  <div className="text-xl font-extrabold text-white">{value}</div>
                  <p className="mt-1 leading-snug text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-teal-400/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-3 shadow-2xl backdrop-blur-xl">
              <Image
                src="/images/michael-working.webp"
                alt="Michael Höger arbeitet an einem Website- und KI-Check"
                width={1200}
                height={900}
                priority
                className="aspect-[4/3] w-full rounded-[1.1rem] object-cover"
              />
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-950/74 p-4">
                  <SearchCheck className="h-5 w-5 text-teal-300" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-white">
                    Wird Ihr Angebot verstanden?
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-950/74 p-4">
                  <MessageSquareText className="h-5 w-5 text-orange-300" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-white">
                    Welche Antwort bekommt Ihr Kunde?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="umfang" className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Was geprüft wird
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Kein Ratespiel. Ein klarer Blick darauf, was KI über Sie versteht.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {checks.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-depth transition duration-200 hover:-translate-y-1 hover:shadow-depth-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Angebot
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              490 EUR für eine Entscheidung, die Sie sonst monatelang vertagen.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Der Check ist kein Beratungsabo. Er beantwortet eine einfache Frage:
              Wo stehen Sie heute, und was bringt als Nächstes wirklich etwas?
            </p>
          </div>

          <div className="rounded-[1.6rem] border border-border bg-background p-6 shadow-depth sm:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-primary/10 p-4">
                <Euro className="h-5 w-5 text-primary" aria-hidden="true" />
                <div className="mt-4 text-2xl font-extrabold text-foreground">
                  490 EUR
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Launchpreis
                </p>
              </div>
              <div className="rounded-2xl bg-secondary/10 p-4">
                <Clock3 className="h-5 w-5 text-secondary" aria-hidden="true" />
                <div className="mt-4 text-2xl font-extrabold text-foreground">
                  3 Tage
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  bis zum Report
                </p>
              </div>
              <div className="rounded-2xl bg-accent/10 p-4">
                <Calendar className="h-5 w-5 text-accent" aria-hidden="true" />
                <div className="mt-4 text-2xl font-extrabold text-foreground">
                  5 Plätze
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  im Mai-Test
                </p>
              </div>
            </div>

            <ul className="mt-8 space-y-3">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium leading-relaxed text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href={mailHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition duration-200 hover:-translate-y-0.5 hover:brightness-110"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Per E-Mail anfragen
              </a>
              <a
                href={siteConfig.briefingUrl}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold text-foreground transition duration-200 hover:-translate-y-0.5 hover:border-primary/40"
              >
                Briefing starten
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Einordnung
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Für Unternehmen, die früh genug handeln wollen.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {objections.map((item) => (
              <article key={item.q} className="rounded-2xl border border-border bg-card p-6">
                <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">
                  {item.q}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-20 text-white sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-teal-300">
              Start im Mai
            </span>
            <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
              Lassen Sie prüfen, ob KI Ihre Firma schon auf dem Schirm hat.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              Sie schicken Website und Unternehmensname. Ich prüfe die Lage,
              erstelle den Report und bespreche die wichtigsten nächsten Schritte
              persönlich mit Ihnen.
            </p>
          </div>

          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
            <a
              href={mailHref}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-400 px-5 py-3 text-sm font-extrabold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:bg-teal-300"
            >
              Check für 490 EUR anfragen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://cal.hoeger.dev/michael/kennenlernen"
              className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/14 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/[0.1]"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Erst kurz sprechen
            </a>
            <p className="mt-3 text-center text-xs leading-relaxed text-slate-400">
              15 Minuten, unverbindlich, per Video.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
