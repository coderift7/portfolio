"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoRotation, setLogoRotation] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setLogoRotation(window.scrollY * 0.15);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Skip to content — Accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Zum Inhalt springen
      </a>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-[slideDown_0.5s_ease-out] ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl shadow-depth border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:h-[72px]">
        <a href="#" className="flex items-center">
          <Logo className="h-9 w-auto sm:h-10" iconRotation={logoRotation} />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle />
          <a
            href="#kontakt"
            className="btn-brand ml-3 cursor-pointer rounded-xl px-5 py-2.5 text-sm font-semibold"
          >
            Kontakt
          </a>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="cursor-pointer rounded-lg p-2 text-foreground"
            aria-label="Menü"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — pure CSS transition (Framer Motion breaks touch on Android) */}
      <div
        className={`grid lg:hidden transition-all duration-300 ease-out border-t border-white/10 bg-background/95 backdrop-blur-xl ${
          mobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 px-5 py-4">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-foreground active:bg-muted"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setMobileOpen(false)}
              className="btn-brand mt-2 rounded-xl px-5 py-3 text-center text-sm font-semibold"
            >
              Kontakt
            </a>
          </nav>
        </div>
      </div>
    </header>
    </>
  );
}
