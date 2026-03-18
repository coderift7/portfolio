import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-6">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. Alle Rechte
          vorbehalten.
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link href="/impressum" className="transition-colors hover:text-primary">
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="transition-colors hover:text-primary"
          >
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  );
}
