"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { resetConsent } from "@/lib/consent";

export default function Footer() {
  function handleCookieSettings(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    resetConsent();
    window.location.reload();
  }

  return (
    <footer className="border-t border-border/50 bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-6">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. Alle Rechte
          vorbehalten.
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link href="/impressum" className="transition-colors hover:text-primary">
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="transition-colors hover:text-primary"
          >
            Datenschutz
          </Link>
          <button
            onClick={handleCookieSettings}
            className="transition-colors hover:text-primary"
          >
            Cookie-Einstellungen
          </button>
        </div>
      </div>
    </footer>
  );
}
