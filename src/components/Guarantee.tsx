"use client";

import { ShieldCheck } from "lucide-react";
import { Reveal } from "./Motion";

import { siteConfig } from "@/config/site";

export default function Guarantee() {
  const { guarantee } = siteConfig;

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-2xl border border-accent/15 bg-accent/[0.03] p-8 text-center sm:p-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
              <ShieldCheck className="h-7 w-7 text-accent" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
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
