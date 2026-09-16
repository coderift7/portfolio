"use client";

import { ExternalLink, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";

const PROFILE_URL =
  "https://www.provenexpert.com/de-de/michael-hoeger-it-beratung-webdesign/";
const PRO_SEAL_SCRIPT_URL = "https://s.provenexpert.net/seals/proseal-v2.js";
const PRO_SEAL_SCRIPT_ID = "proSeal";
const WIDGET_ID = "c66f1176-3a94-4232-9a39-3f10dd04964d";

type LoadStatus = "idle" | "loading" | "loaded" | "error";

interface ProSealConfig {
  widgetId: string;
  language: "de-DE";
  usePageLanguage: false;
  bannerColor: "#097E92";
  textColor: "#FFFFFF";
  showBackPage: false;
  showReviews: true;
  hideDate: true;
  hideName: false;
  googleStars: false;
  displayReviewerLastName: false;
  embeddedSelector: "#proSealWidget";
}

declare global {
  interface Window {
    provenExpert?: {
      proSeal: (config: ProSealConfig) => Promise<void> | void;
    };
  }
}

let scriptLoadPromise: Promise<void> | null = null;

function loadProSealLibrary(): Promise<void> {
  if (window.provenExpert?.proSeal) return Promise.resolve();
  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(
      PRO_SEAL_SCRIPT_ID
    ) as HTMLScriptElement | null;

    // A previous failed load can leave a dead script element behind. Remove it
    // so every retry creates a real new network request.
    existingScript?.remove();

    const script = document.createElement("script");

    const fail = (message: string) => {
      script.remove();
      scriptLoadPromise = null;
      reject(new Error(message));
    };

    const handleLoad = () => {
      if (window.provenExpert?.proSeal) {
        resolve();
      } else {
        fail("ProvenExpert-Bibliothek wurde nicht initialisiert.");
      }
    };

    const handleError = () => {
      fail("ProvenExpert-Skript konnte nicht geladen werden.");
    };

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });

    script.id = PRO_SEAL_SCRIPT_ID;
    script.src = PRO_SEAL_SCRIPT_URL;
    script.defer = true;
    script.setAttribute("nowprocket", "");
    document.head.appendChild(script);
  }).catch((error) => {
    scriptLoadPromise = null;
    throw error;
  });

  return scriptLoadPromise;
}

export default function ProvenExpertSeal() {
  const [status, setStatus] = useState<LoadStatus>("idle");

  async function handleLoadSeal() {
    if (status === "loading" || status === "loaded") return;

    setStatus("loading");

    try {
      await loadProSealLibrary();
      await window.provenExpert?.proSeal({
        widgetId: WIDGET_ID,
        language: "de-DE",
        usePageLanguage: false,
        bannerColor: "#097E92",
        textColor: "#FFFFFF",
        showBackPage: false,
        showReviews: true,
        hideDate: true,
        hideName: false,
        googleStars: false,
        displayReviewerLastName: false,
        embeddedSelector: "#proSealWidget",
      });
      setStatus("loaded");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="bewertungen"
      aria-labelledby="bewertungen-heading"
      className="border-y border-border/50 bg-card py-16 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#097E92] dark:text-[#5EEAD4]">
            Kundenbewertungen
          </span>
          <h2
            id="bewertungen-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Erfahrungen, die Sie nachprüfen können
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Lesen Sie die unabhängige Kundenbewertung zu meiner Arbeit direkt
            auf dem öffentlichen ProvenExpert-Profil.
          </p>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-[#097E92] underline decoration-[#097E92]/30 underline-offset-4 transition-colors hover:text-[#075f70] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#097E92] dark:text-[#5EEAD4] dark:decoration-[#5EEAD4]/40 dark:hover:text-[#99F6E4] dark:focus-visible:outline-[#5EEAD4]"
          >
            Bewertungen auf ProvenExpert
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="flex min-h-[22rem] items-center justify-center rounded-2xl border border-border bg-background p-6 shadow-sm">
          {status !== "loaded" && (
            <div className="max-w-xs text-center">
              <ShieldCheck
                className="mx-auto h-10 w-10 text-[#097E92] dark:text-[#5EEAD4]"
                aria-hidden="true"
              />
              <p className="mt-4 font-semibold text-foreground">
                Offizielles ProvenExpert-Siegel
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Das Siegel wird erst nach Ihrer Zustimmung von ProvenExpert
                geladen. Dabei wird eine Verbindung zu ProvenExpert aufgebaut.
              </p>
              <button
                type="button"
                onClick={handleLoadSeal}
                disabled={status === "loading"}
                aria-controls="proSealWidget"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#097E92] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#075f70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#097E92] dark:focus-visible:outline-[#5EEAD4] disabled:cursor-wait disabled:opacity-70"
              >
                {status === "loading" && (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                )}
                {status === "loading"
                  ? "Siegel wird geladen …"
                  : "ProvenExpert-Siegel laden"}
              </button>
              {status === "error" && (
                <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-300">
                  Das Siegel konnte nicht geladen werden. Das öffentliche Profil
                  ist über den Link daneben weiterhin erreichbar.
                </p>
              )}
            </div>
          )}

          <div
            id="proSealWidget"
            aria-label="Offizielles ProvenExpert-Bewertungssiegel"
            aria-busy={status === "loading"}
            className={status === "loaded" ? "block" : "hidden"}
          />

          <noscript>
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Bewertungen auf ProvenExpert
            </a>
          </noscript>
        </div>
      </div>
    </section>
  );
}
