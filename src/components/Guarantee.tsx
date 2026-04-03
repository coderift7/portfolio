"use client";

import { ShieldCheck } from "lucide-react";
import { Reveal } from "./Motion";

import { siteConfig } from "@/config/site";

export default function Guarantee() {
  const { guarantee } = siteConfig;

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-2xl glass shadow-depth border-primary/10 p-8 text-center sm:p-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 shadow-[0_0_20px_rgba(13,148,136,0.15)]">
              <ShieldCheck className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {guarantee.headline}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {guarantee.text}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
