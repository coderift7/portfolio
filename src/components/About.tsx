"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Reveal, slideFromLeft, slideFromRight } from "./Motion";

export default function About() {
  const { about } = siteConfig;

  return (
    <section id="ueber-mich" className="bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Text */}
          <Reveal variants={slideFromLeft}>
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                Über mich
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {about.headline}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {about.text}
              </p>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal variants={slideFromRight} delay={0.1}>
            <div className="grid grid-cols-3 gap-4">
              {about.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2 + i * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-2xl border border-border bg-white p-5 text-center"
                >
                  <div className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
