"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const STORAGE_KEY = "announcement-dismissed";

function isBannerExcluded(pathname: string) {
  return (
    pathname === "/gruendungsangebot" ||
    pathname === "/gruendungsangebot/" ||
    pathname === "/ki-sichtbarkeit-q" ||
    pathname === "/ki-sichtbarkeit-q/" ||
    /^\/(agb|impressum|datenschutz)(\/.*)?$/.test(pathname)
  );
}

function getStoredDismissal() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "1";
}

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(getStoredDismissal);
  const pathname = usePathname();
  const visible = !isBannerExcluded(pathname) && !dismissed;

  if (!visible) return null;

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setDismissed(true);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-center text-sm font-medium h-10 flex items-center justify-center gap-3 px-12 shadow-md">
      <a
        href="/gruendungsangebot/"
        className="flex items-center gap-2 hover:underline underline-offset-2"
      >
        <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
        <span className="hidden sm:inline">Gründungsangebot: Website zum halben Preis — noch 4 von 5 Plätzen bis 30.06.</span>
        <span className="sm:hidden">Website zum halben Preis — noch 4 Plätze</span>
        <span className="font-bold">→ Mehr erfahren</span>
      </a>
      <button
        onClick={dismiss}
        className="absolute right-3 p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
        aria-label="Banner schließen"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function useAnnouncementVisible() {
  const [dismissed, setDismissed] = useState(getStoredDismissal);
  const pathname = usePathname();

  useEffect(() => {
    const check = () => {
      setDismissed(getStoredDismissal());
    };
    window.addEventListener("storage", check);
    return () => window.removeEventListener("storage", check);
  }, []);

  return !isBannerExcluded(pathname) && !dismissed;
}
