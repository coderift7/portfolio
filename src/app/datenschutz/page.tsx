import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Datenschutz – ${siteConfig.name}`,
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-5 py-24">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Zurück
        </Link>
        <h1 className="text-3xl font-bold text-primary">Datenschutzerklärung</h1>
        <div className="mt-8 space-y-6 text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-primary">1. Verantwortlicher</h2>
            <p className="mt-2">{siteConfig.name}<br />{siteConfig.email}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-primary">2. Datenerhebung</h2>
            <p className="mt-2">Bei Nutzung des Kontaktformulars werden Ihre Angaben zur Bearbeitung der Anfrage gespeichert.</p>
          </div>
          <p className="text-sm text-muted-foreground/60">
            Dies ist eine Demo. Keine rechtsgültige Datenschutzerklärung.
          </p>
        </div>
      </div>
    </div>
  );
}
