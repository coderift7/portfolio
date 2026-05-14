"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getConsent, type ConsentValue } from "@/lib/consent";

declare global {
  interface Window {
    umami?: { track: (event: string) => void };
  }
}

const THRESHOLDS = [25, 50, 75, 100] as const;

export default function ScrollTracker() {
  const pathname = usePathname();
  const firedRef = useRef<Set<number>>(new Set());
  const rafRef = useRef<number | null>(null);
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  const onConsentChange = useCallback((event: Event) => {
    setConsent((event as CustomEvent).detail as ConsentValue | null);
  }, []);

  useEffect(() => {
    setConsent(getConsent());
    window.addEventListener("consent-change", onConsentChange);
    return () => window.removeEventListener("consent-change", onConsentChange);
  }, [onConsentChange]);

  useEffect(() => {
    firedRef.current = new Set();
  }, [pathname]);

  useEffect(() => {
    if (consent !== "granted") return;

    const checkScrollDepth = () => {
      rafRef.current = null;

      const root = document.documentElement;
      const scrollableHeight = Math.max(root.scrollHeight - window.innerHeight, 1);
      const scrollDepth = Math.min(
        100,
        ((window.scrollY + window.innerHeight) / (scrollableHeight + window.innerHeight)) * 100,
      );

      for (const threshold of THRESHOLDS) {
        if (scrollDepth >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold);
          window.umami?.track(`scroll-${threshold}`);
        }
      }
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(checkScrollDepth);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [consent, pathname]);

  return null;
}
