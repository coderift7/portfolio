"use client";

import { ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

const basePath = process.env.__NEXT_ROUTER_BASEPATH || "";

const ease = [0.22, 1, 0.36, 1] as const;

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
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="mb-6 inline-flex items-center rounded-full bg-primary/[0.07] glass shadow-depth px-4 py-1.5"
            >
              <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm font-medium text-primary">
                {hero.greeting}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 1, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease }}
              className="text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-foreground whitespace-pre-line sm:text-5xl md:text-6xl lg:text-[4.25rem]"
            >
              {hero.headline}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0.7, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              {hero.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
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
            </motion.div>
          </div>

          {/* Hero portrait */}
          <motion.div
            initial={{ opacity: 1, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="flex justify-center lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}/images/michael-hero.webp`}
                alt="Michael Höger – Freelancer für Webdesign und digitale Lösungen"
                className="relative h-[280px] w-[210px] rounded-2xl object-cover object-top shadow-lg sm:h-[340px] sm:w-[260px] lg:h-[420px] lg:w-[320px]"
                fetchPriority="high"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#leistungen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/40 transition-colors hover:text-muted-foreground"
        aria-label="Weiter scrollen"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="absolute -inset-2 animate-pulse rounded-full bg-primary/15 blur-md" />
          <ArrowDown className="relative h-5 w-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}
