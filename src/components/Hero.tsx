import { ArrowRight, ArrowDown } from "lucide-react";
import { siteConfig } from "@/config/site";

const basePath = process.env.__NEXT_ROUTER_BASEPATH || "";

export default function Hero() {
  const { hero } = siteConfig;

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-background">
      {/* Subtle background dots */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Soft gradient blobs — CI Teal/Cyan */}
      <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/[0.06] blur-[100px]" />
      <div className="absolute -left-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-secondary/[0.08] blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-32 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            {/* Greeting pill */}
            <div className="mb-6 inline-flex items-center rounded-full bg-primary/[0.07] glass shadow-depth px-4 py-1.5 animate-fade-in-up">
              <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm font-medium text-primary">
                {hero.greeting}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-foreground whitespace-pre-line sm:text-5xl md:text-6xl lg:text-[4.25rem] animate-fade-in-up animation-delay-100">
              {hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground animate-fade-in-up animation-delay-200">
              {hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-in-up animation-delay-300">
              <a
                href="#kontakt"
                className="btn-brand group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
              >
                {hero.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#projekte"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl glass shadow-depth glow-hover px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-150 hover:bg-muted"
              >
                {hero.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Hero portrait */}
          <div className="flex justify-center lg:block animate-fade-in-up animation-delay-150">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}/images/michael-hero.webp`}
                alt="Michael Höger – Freelancer für Webdesign und digitale Lösungen"
                width={320}
                height={420}
                className="relative h-[280px] w-[210px] rounded-2xl object-cover object-top shadow-lg sm:h-[340px] sm:w-[260px] lg:h-[420px] lg:w-[320px]"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#leistungen"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/40 transition-colors hover:text-muted-foreground animate-fade-in animation-delay-500"
        aria-label="Weiter scrollen"
      >
        <div className="relative animate-bounce-slow">
          <div className="absolute -inset-2 animate-pulse rounded-full bg-primary/15 blur-md" />
          <ArrowDown className="relative h-5 w-5" />
        </div>
      </a>
    </section>
  );
}
