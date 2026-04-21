"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const STORAGE_KEY = "announcement-dismissed";

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/gruendungsangebot" || pathname === "/gruendungsangebot/") {
      setVisible(false);
      return;
    }
    // Legal pages: no marketing banner
    if (/^\/(agb|impressum|datenschutz)(\/.*)?$/.test(pathname)) {
      setVisible(false);
      return;
    }
    const dismissed = localStorage.getItem(STORAGE_KEY);
    setVisible(!dismissed);
  }, [pathname]);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "1");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-center text-sm font-medium h-10 flex items-center justify-center gap-3 px-12 shadow-md">
      <a
        href="/gruendungsangebot/"
        className="flex items-center gap-2 hover:underline underline-offset-2"
      >
        <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
        <span className="hidden sm:inline">Gründungsangebot: Website zum halben Preis — noch 4 von 5 Plätzen im April</span>
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
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const isExcludedPage =
      pathname === "/gruendungsangebot" ||
      pathname === "/gruendungsangebot/" ||
      /^\/(agb|impressum|datenschutz)(\/.*)?$/.test(pathname);

    if (isExcludedPage) {
      setVisible(false);
      return;
    }
    const dismissed = localStorage.getItem(STORAGE_KEY);
    setVisible(!dismissed);

    const check = () => {
      const d = localStorage.getItem(STORAGE_KEY);
      setVisible(!d);
    };
    window.addEventListener("storage", check);
    return () => window.removeEventListener("storage", check);
  }, [pathname]);

  return visible;
}
