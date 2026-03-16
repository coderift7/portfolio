"use client";

import { Globe, Zap, Search, Share2, Bot, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Reveal, StaggerContainer, StaggerItem } from "./Motion";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Zap,
  Search,
  Share2,
  Bot,
  HeartHandshake,
};

export default function Services() {
  return (
    <section id="leistungen" className="bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <div className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Leistungen
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Was ich für Sie tun kann
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Von der Webseite bis zur Automatisierung — digitale Lösungen, die
              Ergebnisse liefern.
            </p>
          </div>
        </Reveal>

        <StaggerContainer
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.1}
        >
          {siteConfig.services.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="group rounded-2xl border border-border bg-white p-7 transition-shadow duration-200 hover:shadow-md"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/[0.07]">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
