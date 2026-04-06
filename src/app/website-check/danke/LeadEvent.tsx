// src/app/website-check/danke/LeadEvent.tsx
"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export default function LeadEvent() {
  const fired = useRef(false);

  useEffect(() => {
    if (!fired.current && typeof window.fbq === "function") {
      window.fbq("track", "Lead");
      fired.current = true;
    }
  }, []);

  return null;
}
