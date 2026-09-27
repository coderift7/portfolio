"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2 } from "lucide-react";
import Link from "next/link";

const inputClasses =
  "w-full rounded-xl border border-border bg-white dark:bg-slate-800 px-4 py-3 text-sm text-foreground placeholder:text-slate-500 dark:placeholder:text-slate-400 outline-none transition-all duration-150 focus:border-primary focus:ring-2 focus:ring-primary/15 aria-[invalid=true]:border-red-600";

type FieldName = "url" | "email" | "privacy";
type FieldErrors = Partial<Record<FieldName, string>>;

const MESSAGES = {
  urlEmpty: "Bitte tragen Sie die Adresse Ihrer Website ein.",
  urlInvalid:
    "Das sieht nicht nach einer Website-Adresse aus. Beispiel: www.ihr-studio.de",
  emailEmpty:
    "Bitte tragen Sie Ihre E-Mail-Adresse ein, damit ich Ihnen den Report schicken kann.",
  emailInvalid:
    "Diese E-Mail-Adresse scheint unvollständig zu sein. Beispiel: name@beispiel.de",
  privacyMissing:
    "Bitte bestätigen Sie die Datenschutzerklärung, damit ich den Check durchführen darf.",
  rateLimited:
    "Gerade kommen viele Anfragen an. Bitte versuchen Sie es in einer Stunde noch einmal.",
  serverError:
    "Das hat gerade nicht geklappt. Bitte versuchen Sie es später noch einmal oder schreiben Sie mir direkt an michael@hoeger.dev.",
} as const;

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed && !/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

function isValidUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return (
      (parsed.protocol === "http:" || parsed.protocol === "https:") &&
      parsed.hostname.includes(".")
    );
  } catch {
    return false;
  }
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export default function FitnessCheckForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [sending, setSending] = useState(false);

  const urlRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const privacyRef = useRef<HTMLInputElement>(null);

  function focusFirstError(fieldErrors: FieldErrors) {
    const order: [FieldName, React.RefObject<HTMLInputElement | null>][] = [
      ["url", urlRef],
      ["email", emailRef],
      ["privacy", privacyRef],
    ];
    for (const [name, ref] of order) {
      if (fieldErrors[name]) {
        ref.current?.focus();
        return;
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError("");

    const form = e.currentTarget;
    const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement;

    const rawUrl = field("url").value;
    const url = normalizeUrl(rawUrl);
    const email = field("email").value.trim();
    const name = field("name").value.trim();
    const privacy = field("privacy").checked;
    const honeypot = field("_gotcha").value;

    const fieldErrors: FieldErrors = {};
    if (!rawUrl.trim()) fieldErrors.url = MESSAGES.urlEmpty;
    else if (!isValidUrl(url)) fieldErrors.url = MESSAGES.urlInvalid;
    if (!email) fieldErrors.email = MESSAGES.emailEmpty;
    else if (!isValidEmail(email)) fieldErrors.email = MESSAGES.emailInvalid;
    if (!privacy) fieldErrors.privacy = MESSAGES.privacyMissing;

    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      focusFirstError(fieldErrors);
      return;
    }

    setSending(true);
    try {
      // Payload is identical to /website-check/.
      const checkRes = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, email, name, tier: "b", honeypot }),
      });
      const checkJson = await checkRes.json().catch(() => ({}));
      const checkOk =
        checkRes.ok && (checkJson.success || checkJson.status === "queued");

      if (!checkOk) {
        setSubmitError(
          checkRes.status === 429 ? MESSAGES.rateLimited : MESSAGES.serverError
        );
        return;
      }

      router.push("/website-check/danke");
    } catch {
      setSubmitError(MESSAGES.serverError);
    } finally {
      setSending(false);
    }
  }

  const errorCount = Object.keys(errors).length;

  return (
    <div className="rounded-2xl glass shadow-depth border-white/20 dark:border-white/5 p-6 sm:p-8">
      <h2
        id="check-heading"
        className="mb-2 text-center text-2xl font-bold tracking-tight text-foreground"
      >
        Kostenlosen Website-Check anfordern
      </h2>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Felder mit * sind Pflichtfelder.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby="check-heading"
        className="space-y-5"
      >
        {errorCount > 0 && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300"
          >
            {errorCount === 1
              ? "Bitte prüfen Sie ein Feld."
              : `Bitte prüfen Sie ${errorCount} Felder.`}
          </p>
        )}

        <div>
          <label
            htmlFor="url"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Ihre Website-Adresse *{" "}
            <span className="font-normal text-muted-foreground">(Pflicht)</span>
          </label>
          <input
            ref={urlRef}
            type="text"
            id="url"
            name="url"
            required
            aria-required="true"
            autoComplete="url"
            inputMode="url"
            placeholder="www.ihr-studio.de"
            aria-invalid={errors.url ? true : undefined}
            aria-describedby={errors.url ? "url-error url-hint" : "url-hint"}
            className={inputClasses}
          />
          <p id="url-hint" className="mt-1 text-xs text-muted-foreground">
            Ohne www geht es auch.
          </p>
          {errors.url && (
            <p id="url-error" className="mt-1 text-sm text-red-700 dark:text-red-300">
              {errors.url}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Ihre E-Mail-Adresse *{" "}
            <span className="font-normal text-muted-foreground">(Pflicht)</span>
          </label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            name="email"
            required
            aria-required="true"
            autoComplete="email"
            placeholder="name@beispiel.de"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error email-hint" : "email-hint"}
            className={inputClasses}
          />
          <p id="email-hint" className="mt-1 text-xs text-muted-foreground">
            Dorthin schicke ich den Report.
          </p>
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-700 dark:text-red-300">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Ihr Name{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Vorname Nachname"
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
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />

        <div>
          <div className="flex items-start gap-3">
            <input
              ref={privacyRef}
              type="checkbox"
              id="privacy"
              name="privacy"
              required
              aria-required="true"
              aria-invalid={errors.privacy ? true : undefined}
              aria-describedby={errors.privacy ? "privacy-error" : undefined}
              className="mt-1 h-4 w-4 shrink-0 rounded border-border"
            />
            <label htmlFor="privacy" className="text-sm text-muted-foreground">
              Ich habe die{" "}
              <Link href="/datenschutz/#website-check" className="text-teal-700 underline dark:text-primary">
                Datenschutzerklärung
              </Link>{" "}
              gelesen und stimme der Verarbeitung meiner Angaben für den
              Website-Check zu. *
            </label>
          </div>
          {errors.privacy && (
            <p id="privacy-error" className="mt-1 text-sm text-red-700 dark:text-red-300">
              {errors.privacy}
            </p>
          )}
        </div>

        {submitError && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300"
          >
            {submitError}
          </p>
        )}

        <p aria-live="polite" className="sr-only">
          {sending ? "Ihre Anfrage wird gesendet." : ""}
        </p>

        <button
          type="submit"
          disabled={sending}
          className="btn-brand group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold disabled:opacity-60 disabled:cursor-wait"
        >
          {sending ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
          {sending ? "Wird gesendet …" : "Kostenlosen Website-Check anfordern"}
        </button>
      </form>
    </div>
  );
}
