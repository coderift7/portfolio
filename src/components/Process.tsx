"use client";

import { MessageSquare, FileCheck, Rocket } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "./Motion";

const steps = [
  {
    number: "1",
    icon: MessageSquare,
    title: "Erstgespräch",
    subtitle: "Kostenlos & unverbindlich",
    text: "In 10 Minuten klären wir, was Sie brauchen und ob eine Webseite für Ihr Geschäft Sinn macht. Ehrlich — ohne Verkaufsdruck.",
    details: ["Ihre Ziele verstehen", "Erste Einschätzung & Empfehlung"],
  },
  {
    number: "2",
    icon: FileCheck,
    title: "Angebot zum Festpreis",
    subtitle: "Transparent & verbindlich",
    text: "Sie bekommen ein klares Angebot — was Sie bekommen, was es kostet, wann es fertig ist. Keine Überraschungen.",
    details: ["Umfang & Funktionen definiert", "Verbindlicher Preis & Zeitplan"],
  },
  {
    number: "3",
    icon: Rocket,
    title: "In 14 Tagen online",
    subtitle: "Umsetzung & Launch",
    text: "Ich setze Ihre Webseite um, Sie geben Feedback, wir verfeinern. Dann geht's live — mit Google-Optimierung ab dem ersten Tag.",
    details: ["Feedback-Runden inklusive", "Google-optimiert & startklar"],
  },
];

export default function Process() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              So läuft&apos;s ab
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              In drei Schritten zu Ihrer Webseite
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Kein komplizierter Prozess, kein Agentur-Overhead — nur drei
              einfache Schritte.
            </p>
          </div>
        </Reveal>

        <StaggerContainer
          className="relative mt-16 grid gap-8 md:grid-cols-3"
          staggerDelay={0.15}
        >
          {/* Connecting line (desktop) */}
          <div className="absolute top-16 left-[16.67%] right-[16.67%] hidden h-[2px] bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 md:block" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={step.number}>
                <div className="relative flex h-full flex-col items-center text-center">
                  {/* Number + Icon */}
                  <div className="relative mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shadow-[0_0_20px_rgba(13,148,136,0.12)]">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary font-mono text-xs font-bold text-white shadow-md">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-2xl glass shadow-depth glow-hover border-white/20 dark:border-white/5 p-6 transition-all duration-300">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary/70">
                      {step.subtitle}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>

                    {/* Detail checkmarks */}
                    <div className="mt-4 space-y-2">
                      {step.details.map((detail) => (
                        <div
                          key={detail}
                          className="flex items-center gap-2 text-left"
                        >
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <svg
                              className="h-3 w-3 text-primary"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
