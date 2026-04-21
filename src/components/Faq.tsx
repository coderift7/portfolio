"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal, StaggerContainer, StaggerItem } from "./Motion";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Häufige Fragen
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Gut zu wissen
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Die wichtigsten Fragen — ehrlich beantwortet.
            </p>
          </div>
        </Reveal>

        <StaggerContainer className="mt-12 space-y-3" staggerDelay={0.08}>
          {siteConfig.faq.map((item, i) => {
            const isOpen = openIndex === i;
            const triggerId = `faq-trigger-${i}`;
            const panelId = `faq-panel-${i}`;
            return (
              <StaggerItem key={i}>
                <div className="glass shadow-depth glow-hover overflow-hidden rounded-2xl transition-all duration-300">
                  <button
                    id={triggerId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="pr-4 text-base font-semibold text-foreground">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    hidden={!isOpen}
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-[15px] leading-relaxed text-muted-foreground">
                        {item.answer}
                      </p>
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
