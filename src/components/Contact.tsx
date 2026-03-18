"use client";

import { useState } from "react";
import { Send, CheckCircle2, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Reveal, slideFromLeft, slideFromRight } from "./Motion";

const inputClasses =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-all duration-150 focus:border-primary focus:ring-2 focus:ring-primary/15";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="kontakt" className="bg-white py-24 lg:py-32">
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

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.07]">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {siteConfig.email}
                  </span>
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
            </div>
          </Reveal>

          {/* Right — Form */}
          <Reveal variants={slideFromRight} delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
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
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                          Name *
                        </label>
                        <input type="text" id="name" required placeholder="Ihr Name" className={inputClasses} />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                          E-Mail *
                        </label>
                        <input type="email" id="email" required placeholder="ihre@email.de" className={inputClasses} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-foreground">
                        Betreff
                      </label>
                      <input type="text" id="subject" placeholder="Worum geht es?" className={inputClasses} />
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                        Nachricht *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        placeholder="Erzählen Sie mir von Ihrem Projekt..."
                        className={inputClasses}
                      />
                    </div>
                    <label className="flex cursor-pointer items-start gap-2">
                      <input type="checkbox" required className="mt-1 rounded border-border" />
                      <span className="text-xs text-muted-foreground">
                        Ich stimme der{" "}
                        <a href="/datenschutz" className="text-primary underline">
                          Datenschutzerklärung
                        </a>{" "}
                        zu. *
                      </span>
                    </label>
                    <button
                      type="submit"
                      className="btn-brand group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold"
                    >
                      <Send className="h-4 w-4" />
                      {siteConfig.contact.cta}
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
