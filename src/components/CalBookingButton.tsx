"use client";

import { useEffect } from "react";
import { Calendar } from "lucide-react";

const CAL_ORIGIN = "https://cal.hoeger.dev";

export default function CalBookingButton() {
  useEffect(() => {
    if (document.querySelector("#cal-embed-loader")) return;

    // Inject the official Cal.com embed loader as inline script
    const loader = document.createElement("script");
    loader.id = "cal-embed-loader";
    loader.textContent = `
      (function (C, A, L) {
        var p = function (a, ar) { a.q.push(ar); };
        var d = C.document;
        C.Cal = C.Cal || function () {
          var cal = C.Cal;
          var ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            var api = function () { p(api, arguments); };
            var namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") { cal.ns[namespace] = api; p(api, ar); }
            else { p(cal, ar); }
            return;
          }
          p(cal, ar);
        };
      })(window, "${CAL_ORIGIN}/embed/embed.js", "init");
      Cal("init", {origin: "${CAL_ORIGIN}"});
      Cal("ui", {
        styles: {branding: {brandColor: "#0D9488"}},
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    `;
    document.head.appendChild(loader);
  }, []);

  return (
    <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/[0.04] p-5">
      <p className="mb-3 text-sm font-medium text-foreground">
        Lieber direkt sprechen?
      </p>
      <button
        data-cal-link="michael/kennenlernen"
        data-cal-config='{"layout":"month_view"}'
        className="btn-brand group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold"
      >
        <Calendar className="h-4 w-4" />
        Kostenloses Kennenlernen buchen
      </button>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        15 Minuten · unverbindlich · per Video
      </p>
    </div>
  );
}
