"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Reveal, StaggerContainer, StaggerItem } from "./Motion";

export default function Projects() {
  return (
    <section id="projekte" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <div className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Portfolio
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Ausgewählte Projekte
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Ein Auszug meiner Arbeiten. Jedes Projekt ist individuell auf den
              Kunden zugeschnitten.
            </p>
          </div>
        </Reveal>

        <StaggerContainer className="mt-14 grid gap-5 lg:grid-cols-3" staggerDelay={0.12}>
          {siteConfig.projects.map((project, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow duration-200 hover:shadow-lg"
              >
                {/* Color bar top */}
                <div
                  className="h-2"
                  style={{ backgroundColor: project.color }}
                />

                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {project.category}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
