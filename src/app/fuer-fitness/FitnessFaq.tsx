"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Same markup as components/Faq.tsx, without the Motion wrappers and with
// page-specific content (the shared component reads siteConfig.faq).

export interface FaqItem {
  question: string;
  answer: string;
}

export default function FitnessFaq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-12 space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const triggerId = `fitness-faq-trigger-${i}`;
        const panelId = `fitness-faq-panel-${i}`;
        return (
          <div
            key={triggerId}
            className="glass shadow-depth glow-hover overflow-hidden rounded-2xl transition-all duration-300"
          >
            <button
              id={triggerId}
              type="button"
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
            >
              <p className="px-6 pb-5 text-[15px] leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
