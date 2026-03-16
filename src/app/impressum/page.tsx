import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Impressum – ${siteConfig.name}`,
};

export default function Impressum() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-5 py-24">
        <a href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-accent hover:underline">
          <ArrowLeft className="h-4 w-4" /> Zurück
        </a>
        <h1 className="text-3xl font-bold text-primary">Impressum</h1>
        <div className="mt-8 space-y-6 text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-primary">Angaben gemäß § 5 TMG</h2>
            <p className="mt-2">{siteConfig.name}<br />{siteConfig.email}</p>
          </div>
          <p className="text-sm text-muted-foreground/60">
            Dies ist eine Demo-Webseite. Angaben sind Platzhalter.
          </p>
        </div>
      </div>
    </div>
  );
}
