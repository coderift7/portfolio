"use client";

import { useState } from "react";
import { Send, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Reveal, slideFromLeft, slideFromRight } from "./Motion";
import CalBookingButton from "./CalBookingButton";

const basePath = process.env.__NEXT_ROUTER_BASEPATH || "";

const inputClasses =
  "w-full rounded-xl border border-border bg-white dark:bg-slate-900/80 dark:border-slate-600 px-4 py-3 text-sm text-foreground placeholder:text-slate-500 dark:placeholder:text-slate-400 outline-none transition-all duration-150 focus:border-primary focus:ring-2 focus:ring-primary/15";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSending(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      _gotcha: (form.elements.namedItem("_gotcha") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setSubmitted(true);
      } else {
        setError(json.error || "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.");
      }
    } catch {
      setError("Verbindungsfehler. Bitte versuchen Sie es später erneut.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="kontakt" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          {/* Left */}
          <Reveal variants={slideFromLeft}>
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Kontakt
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {siteConfig.contact.headline}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {siteConfig.contact.subheadline}
              </p>

              {/* Casual photo */}
              <div className="mt-8 mb-8 overflow-hidden rounded-2xl shadow-depth">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}/images/michael-casual.webp`}
                  alt="Michael Höger – persönlicher Ansprechpartner für Webdesign-Projekte"
                  width={597}
                  height={760}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-2xl object-contain"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.07]">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <a href={`mailto:${siteConfig.email}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {siteConfig.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.07]">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <a href={`tel:${siteConfig.phone}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {siteConfig.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.07]">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {siteConfig.location}
                  </span>
                </div>
              </div>

              <CalBookingButton />
            </div>
          </Reveal>

          {/* Right — Form */}
          <Reveal variants={slideFromRight} delay={0.1}>
            <div className="rounded-2xl glass shadow-depth border-white/20 dark:border-white/5 p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10"
                    >
                      <CheckCircle2 className="h-7 w-7 text-primary" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-foreground">
                      Nachricht gesendet!
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {siteConfig.contact.successMessage}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                          Name *
                        </label>
                        <input type="text" id="name" name="name" required placeholder="Vor- und Nachname" className={inputClasses} />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                          E-Mail *
                        </label>
                        <input type="email" id="email" name="email" required placeholder="name@firma.de" className={inputClasses} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-foreground">
                        Betreff
                      </label>
                      <input type="text" id="subject" name="subject" placeholder="Neue Website, Relaunch oder Wartung?" className={inputClasses} />
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                        Nachricht *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        placeholder="Worum geht's? Beschreiben Sie Ihr Projekt kurz in zwei bis drei Sätzen."
                        className={inputClasses}
                      />
                    </div>
                    {/* Honeypot — hidden from users, catches bots */}
                    <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" aria-label="Nicht ausfüllen" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
                    <div className="flex cursor-pointer items-start gap-2">
                      <input type="checkbox" id="privacy-contact" required className="mt-1 rounded border-border" />
                      <label htmlFor="privacy-contact" className="text-xs text-muted-foreground">
                        Ich stimme der{" "}
                        <Link href="/datenschutz/" className="text-primary underline">
                          Datenschutzerklärung
                        </Link>{" "}
                        zu. *
                      </label>
                    </div>
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
                      <Send className="h-4 w-4" />
                      {sending ? "Wird gesendet…" : siteConfig.contact.cta}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
