"use client";

import { Globe, Zap, Search, Share2, ShieldCheck, Bot, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Reveal, StaggerContainer, StaggerItem } from "./Motion";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Zap,
  Search,
  Share2,
  ShieldCheck,
  Bot,
  HeartHandshake,
};

export default function Services() {
  return (
    <section id="leistungen" className="bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <div className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Leistungen
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              So werden Sie online gefunden
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Alles aus einer Hand — von der Webseite bis zur ersten
              Kundenanfrage.
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
              <StaggerItem key={i} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-border glass shadow-depth glow-hover bg-background p-7 transition-all duration-300"
                >
                  {/* Animated top border */}
                  <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-100 opacity-0 bg-gradient-to-r from-primary to-secondary transition-opacity duration-300 ease-out group-hover:opacity-100" />
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.07]">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
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
