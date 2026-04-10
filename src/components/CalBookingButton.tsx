"use client";

import { useEffect } from "react";
import { Calendar } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

export default function CalBookingButton() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ embedJsUrl: "https://cal.hoeger.dev/embed/embed.js" });
      cal("ui", {
        styles: { branding: { brandColor: "#0D9488" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
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
