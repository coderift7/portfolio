"use client";

import { Bot, Search, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";
import { StaggerContainer, StaggerItem } from "./Motion";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot,
  Search,
  Zap,
};

export default function UspBanner() {
  const { uspBanner } = siteConfig;

  return (
    <section className="border-y border-border bg-primary/[0.02] py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <StaggerContainer staggerDelay={0.12}>
          <StaggerItem>
            <p className="mb-10 text-center text-sm font-semibold uppercase tracking-widest text-primary">
              {uspBanner.headline}
            </p>
          </StaggerItem>
          <div className="grid gap-8 sm:grid-cols-3">
            {uspBanner.items.map((item, i) => {
              const Icon = iconMap[item.icon] || Bot;
              return (
                <StaggerItem key={i}>
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/[0.08]">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
