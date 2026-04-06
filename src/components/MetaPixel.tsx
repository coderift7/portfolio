// src/components/MetaPixel.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { getConsent, type ConsentValue } from "@/lib/consent";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

export default function MetaPixel() {
  const [consent, setConsentState] = useState<ConsentValue | null>(null);
  const pathname = usePathname();

  const onConsentChange = useCallback((e: Event) => {
    setConsentState((e as CustomEvent).detail as ConsentValue | null);
  }, []);

  useEffect(() => {
    setConsentState(getConsent());
    window.addEventListener("consent-change", onConsentChange);
    return () => window.removeEventListener("consent-change", onConsentChange);
  }, [onConsentChange]);

  // Track PageView on route change
  useEffect(() => {
    if (consent === "granted" && PIXEL_ID && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname, consent]);

  if (consent !== "granted" || !PIXEL_ID) return null;

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      onLoad={() => {
        window.fbq("init", PIXEL_ID);
        window.fbq("track", "PageView");
      }}
    >{`
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    `}</Script>
  );
}
