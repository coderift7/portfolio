"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useAnnouncementVisible } from "./AnnouncementBanner";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoRotation, setLogoRotation] = useState(0);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const prefix = isHome ? "" : "/";
  const bannerVisible = useAnnouncementVisible();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setLogoRotation(window.scrollY * 0.15);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDropdown = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDesktopDropdown(label);
  };

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setDesktopDropdown(null), 150);
  };

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
      className={`fixed left-0 right-0 z-50 transition-all duration-500 animate-[slideDown_0.5s_ease-out] ${
        bannerVisible ? "top-10" : "top-0"
      } ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl shadow-depth border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:h-[72px]">
        <a href="/" className="flex items-center" aria-label="Zur Startseite">
          <Logo className="h-9 w-auto sm:h-10" iconRotation={logoRotation} />
        </a>

        {/* ── Desktop Nav ── */}
        <nav className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => openDropdown(item.label)}
                onMouseLeave={closeDropdown}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground cursor-pointer"
                  aria-expanded={desktopDropdown === item.label}
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${desktopDropdown === item.label ? "rotate-180" : ""}`} />
                </a>

                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 transition-all duration-200 ${
                    desktopDropdown === item.label
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
                >
                  <div className="min-w-[220px] rounded-xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-lg p-1.5">
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-4 py-2.5 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground hover:bg-muted/50"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.href}
                href={item.href.startsWith("#") ? `${prefix}${item.href}` : item.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                {item.label}
              </a>
            )
          )}
          <ThemeToggle />
          <a
            href={`${prefix}#kontakt`}
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
            {siteConfig.nav.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <div className="flex w-full items-center rounded-lg px-3 py-2.5 text-foreground">
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 cursor-pointer"
                    >
                      {item.label}
                    </a>
                    <button
                      onClick={() => setMobileDropdown(mobileDropdown === item.label ? null : item.label)}
                      className="cursor-pointer p-1"
                      aria-expanded={mobileDropdown === item.label}
                      aria-label="Untermenü öffnen"
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileDropdown === item.label ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  <div
                    className={`grid transition-all duration-200 ease-out ${
                      mobileDropdown === item.label ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-0.5 pl-4 pb-1">
                        {item.children.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-lg px-3 py-2 text-sm text-muted-foreground active:bg-muted"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href.startsWith("#") ? `${prefix}${item.href}` : item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-foreground active:bg-muted"
                >
                  {item.label}
                </a>
              )
            )}
            <a
              href={`${prefix}#kontakt`}
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
