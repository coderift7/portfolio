import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Seite nicht gefunden – Michael Höger",
  description: "Die angeforderte Seite existiert nicht. Zurück zur Startseite von Michael Höger – Webdesign & Digitale Lösungen.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="text-center">
        <p className="font-mono text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Seite nicht gefunden</h1>
        <p className="mt-3 text-muted-foreground">
          Die Seite, die Sie suchen, existiert leider nicht.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}
