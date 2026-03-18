"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Reveal, StaggerContainer, StaggerItem } from "./Motion";
import { MoverProMockup, ZahnarztMockup, MalerMockup } from "./BrowserMockup";

const mockups = [MoverProMockup, ZahnarztMockup, MalerMockup];

export default function Projects() {
  return (
    <section id="projekte" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <div className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Portfolio
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              So könnte Ihre Webseite aussehen
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Diese Demo-Projekte zeigen, was ich für Sie umsetzen kann —
              individuell auf Ihre Branche zugeschnitten.
            </p>
          </div>
        </Reveal>

        <StaggerContainer className="mt-14 grid gap-5 lg:grid-cols-3" staggerDelay={0.12}>
          {siteConfig.projects.map((project, i) => {
            const Mockup = mockups[i];
            const hasUrl = project.url && project.url.length > 0;
            const Wrapper = hasUrl ? "a" : "div";
            const wrapperProps = hasUrl
              ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow duration-200 hover:shadow-lg"
                >
                  {/* Browser Mockup */}
                  <Wrapper {...wrapperProps} className={hasUrl ? "block p-4 pb-0" : "p-4 pb-0"}>
                    {Mockup && <Mockup />}
                  </Wrapper>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                        Demo
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {project.category.replace("Demo-Projekt · ", "")}
                      </span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    {/* Tags + Link */}
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-primary/[0.06] px-3 py-1 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                      {hasUrl && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-secondary"
                        >
                          Live ansehen <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
