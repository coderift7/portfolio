// src/components/Analytics.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import Script from "next/script";
import { getConsent, type ConsentValue } from "@/lib/consent";

const UMAMI_SRC = "https://analytics.hoeger.dev/script.js";
const UMAMI_WEBSITE_ID = "6145f8bb-9bc3-4576-b0f8-b07216762e0b";

/**
 * Umami Analytics Loader.
 *
 * DSGVO-konform: Laedt das Umami-Script erst, wenn der Nutzer
 * im Cookie-Banner "Akzeptieren" geklickt hat (consent === "granted").
 *
 * Umami ist zwar cookiefrei und self-hosted, verarbeitet aber IP-Fragmente
 * und User-Agents — daher ist ein Consent nach DSGVO sicherer.
 *
 * Hinweis: Einmal geladenes Script wird bei nachtraeglichem Widerruf
 * NICHT entfernt (Browser hat es bereits geladen). Beim naechsten
 * Page-Load wird es bei "denied" nicht mehr nachgeladen.
 */
export default function Analytics() {
  const [consent, setConsentState] = useState<ConsentValue | null>(null);

  const onConsentChange = useCallback((e: Event) => {
    setConsentState((e as CustomEvent).detail as ConsentValue | null);
  }, []);

  useEffect(() => {
    setConsentState(getConsent());
    window.addEventListener("consent-change", onConsentChange);
    return () => window.removeEventListener("consent-change", onConsentChange);
  }, [onConsentChange]);

  if (consent !== "granted") return null;

  return (
    <Script
      src={UMAMI_SRC}
      data-website-id={UMAMI_WEBSITE_ID}
      strategy="afterInteractive"
    />
  );
}
