import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadEvent from "./LeadEvent";

export const metadata: Metadata = {
  title: "Vielen Dank! | Website-Check",
  robots: { index: false, follow: false },
};

export default function WebsiteCheckDanke() {
  return (
    <>
      <LeadEvent />
      <Header />
      <main
        id="main"
        className="flex min-h-[70dvh] items-center bg-background"
      >
        <div className="mx-auto max-w-xl px-5 py-24 text-center sm:px-6">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Ihr Report wird erstellt!
          </h1>

          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
            Sie erhalten Ihren persönlichen Website-Report in Kürze per E-Mail.
            Bitte prüfen Sie auch Ihren Spam-Ordner.
          </p>

          <Link
            href="/"
            className="btn-brand group mt-10 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
