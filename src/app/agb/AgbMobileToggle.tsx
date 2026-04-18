"use client";

import { useEffect, useState } from "react";
import { FileText, Sparkles } from "lucide-react";

type Mode = "legal" | "plain";

export default function AgbMobileToggle({
  legalSelector,
  plainSelector,
}: {
  legalSelector: string;
  plainSelector: string;
}) {
  const [mode, setMode] = useState<Mode>("plain");

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => {
      const legalEls = document.querySelectorAll<HTMLElement>(legalSelector);
      const plainEls = document.querySelectorAll<HTMLElement>(plainSelector);
      if (mq.matches) {
        legalEls.forEach((el) => (el.style.display = ""));
        plainEls.forEach((el) => (el.style.display = ""));
      } else {
        legalEls.forEach((el) => (el.style.display = mode === "legal" ? "" : "none"));
        plainEls.forEach((el) => (el.style.display = mode === "plain" ? "" : "none"));
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [mode, legalSelector, plainSelector]);

  return (
    <div className="mt-8 md:hidden" role="tablist" aria-label="AGB-Ansicht wählen">
      <div className="inline-flex rounded-full border border-border bg-card p-1 text-sm">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "plain"}
          onClick={() => setMode("plain")}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 transition-colors ${
            mode === "plain"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Klartext
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "legal"}
          onClick={() => setMode("legal")}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 transition-colors ${
            mode === "legal"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
          Rechtsverbindlich
        </button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Auf größeren Bildschirmen stehen beide Fassungen nebeneinander.
      </p>
    </div>
  );
}
