"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2 } from "lucide-react";
import Link from "next/link";

const inputClasses =
  "w-full rounded-xl border border-border bg-white dark:bg-slate-800 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-150 focus:border-primary focus:ring-2 focus:ring-primary/15";

export default function WebsiteCheckForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSending(true);

    const form = e.currentTarget;
    let rawUrl = (form.elements.namedItem("url") as HTMLInputElement).value.trim();
    if (rawUrl && !/^https?:\/\//i.test(rawUrl)) {
      rawUrl = `https://${rawUrl}`;
    }

    const data = {
      url: rawUrl,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      tier: "b",
      honeypot: (form.elements.namedItem("_gotcha") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && (json.success || json.status === "queued")) {
        router.push("/website-check/danke");
      } else {
        setError(
          json.error ||
            "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut."
        );
      }
    } catch {
      setError("Verbindungsfehler. Bitte versuchen Sie es später erneut.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="rounded-2xl glass shadow-depth border-white/20 dark:border-white/5 p-6 sm:p-8">
      <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-foreground">
        Jetzt Website prüfen lassen
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="url"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Website-URL *
          </label>
          <input
            type="text"
            id="url"
            name="url"
            required
            placeholder="www.ihre-firma.de"
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            E-Mail *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="ihre@email.de"
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Name (optional)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ihr Name"
            className={inputClasses}
          />
        </div>

        {/* Honeypot — hidden from users, catches bots */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          aria-label="Nicht ausfüllen"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />

        <label className="flex cursor-pointer items-start gap-2">
          <input
            type="checkbox"
            id="privacy"
            required
            className="mt-1 rounded border-border"
          />
          <span className="text-xs text-muted-foreground">
            Ich stimme der{" "}
            <Link href="/datenschutz" className="text-primary underline">
              Datenschutzerklärung
            </Link>{" "}
            zu. *
          </span>
        </label>

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="btn-brand group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold disabled:opacity-60 disabled:cursor-wait"
        >
          {sending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {sending ? "Wird gesendet…" : "Kostenlosen Check starten"}
        </button>
      </form>
    </div>
  );
}
