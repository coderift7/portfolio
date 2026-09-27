"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { getConsent, setConsent } from "@/lib/consent";

export default function CookieBanner() {
  const consent = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("consent-change", onStoreChange);
      return () => window.removeEventListener("consent-change", onStoreChange);
    },
    getConsent,
    () => null
  );
  const visible = consent === null;

  function handleAccept() {
    setConsent("granted");
  }

  function handleDecline() {
    setConsent("denied");
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie-Einstellungen"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border/30 bg-slate-900/95 px-4 py-3 backdrop-blur-md sm:p-5"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="pointer-events-none text-sm text-slate-200">
              Mit Ihrer Einwilligung laden wir selbst betriebenes Umami für
              Reichweitenmessung und Meta Pixel für Werbemessung.{" "}
              <Link
                href="/datenschutz/"
                className="pointer-events-auto underline underline-offset-2 transition-colors hover:text-primary"
              >
                Mehr erfahren
              </Link>
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                onClick={handleDecline}
                className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-400 hover:text-white"
              >
                Ablehnen
              </button>
              <button
                onClick={handleAccept}
                className="rounded-lg bg-[#0F766E] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#115E59]"
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
