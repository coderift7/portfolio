"use client";

import { useState } from "react";

type Branche = {
  id: string;
  label: string;
  accent: string;
  accentName: string;
  claim: string;
  reason: string;
};

const BRANCHEN: Branche[] = [
  {
    id: "handwerk",
    label: "Handwerk",
    accent: "#B8412A",
    accentName: "Vermilion",
    claim: "Warme Erdtöne, nicht kühles Tech-Blau.",
    reason: "Handwerk lebt von Materialität und Tradition. Terracotta und Ocker signalisieren Beständigkeit — ein Elektriker-Portal in Cyan wirkt austauschbar.",
  },
  {
    id: "medizin",
    label: "Medizin & Praxis",
    accent: "#4F6B4E",
    accentName: "Sage",
    claim: "Ruhig, nicht klinisch-weiß.",
    reason: "Vertrauen statt Sterilität. Gedämpftes Grün reduziert Blutdruck bei Patient:innen — Studien aus der Krankenhaus-Architektur zeigen es immer wieder.",
  },
  {
    id: "finanz",
    label: "Finanz & Recht",
    accent: "#2F4B7A",
    accentName: "Ink-Blue",
    claim: "Gedämpftes Tiefblau, nicht Neon-Banking.",
    reason: "Seriosität ohne Einschüchterung. Neon-Blau signalisiert Tech-Startup — für Steuerberater:innen und Kanzleien ein Glaubwürdigkeitsverlust.",
  },
  {
    id: "gastro",
    label: "Gastronomie",
    accent: "#A26F12",
    accentName: "Ochre",
    claim: "Ocker und Bordeaux, nicht Instagram-Pastell.",
    reason: "Appetit wird durch warme, sattierte Töne geweckt. Gastro-Websites in Pastell-Rosa verkaufen Dessert, nicht Abend-Menü.",
  },
];

export default function HeroBranchen() {
  const [active, setActive] = useState<string>("handwerk");
  const current = BRANCHEN.find((b) => b.id === active) ?? BRANCHEN[0];

  return (
    <div className="fp-hero-grid">
      <div>
        <p className="fp-eyebrow mb-6">Leistung · Farbpsychologie für Websites</p>
        <h1 className="fp-display text-[clamp(2.5rem,6vw,5.25rem)] mb-8">
          Farbe ist{" "}
          <span style={{ color: current.accent, transition: "color 0.5s ease" }}>
            Strategie
          </span>
          .
          <br />
          Kein Geschmack.
        </h1>
        <p className="text-lg lg:text-xl leading-relaxed max-w-[52ch] mb-10" style={{ color: "var(--fp-ink-soft)" }}>
          Jede Branche hat ihre eigene Farb-Erwartung. Wer sie bricht, verliert Vertrauen — oder gewinnt Aufmerksamkeit. Beides mit Absicht, nicht per Zufall.
        </p>

        {/* Branchen-Umschalter */}
        <div className="mb-8">
          <p className="fp-eyebrow mb-3">Wähle Ihre Branche</p>
          <div className="flex flex-wrap gap-2">
            {BRANCHEN.map((b) => (
              <button
                key={b.id}
                type="button"
                className="fp-chip"
                aria-pressed={active === b.id}
                onClick={() => setActive(b.id)}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a href="#lead-magnet" className="fp-btn-primary" style={{ background: current.accent }}>
            Color-Briefing gratis laden →
          </a>
          <a href="https://hoeger.dev/#kontakt" className="fp-btn-secondary">
            Kostenlose Erstberatung
          </a>
        </div>
      </div>

      {/* Rechts: Live-Demo-Block */}
      <div>
        <div
          className="p-8 lg:p-10 border"
          style={{
            background: "var(--fp-bone-soft)",
            borderColor: "color-mix(in srgb, var(--fp-ink) 12%, transparent)",
            transition: "background 0.5s ease",
          }}
        >
          <p className="fp-eyebrow mb-5">Live-Beispiel · {current.label}</p>
          <div className="grid grid-cols-[6fr_3fr_1fr] gap-1 h-32 mb-5">
            <div style={{ background: "var(--fp-bone)", border: "1px solid color-mix(in srgb, var(--fp-ink) 8%, transparent)" }} />
            <div style={{ background: "var(--fp-ink)" }} />
            <div style={{ background: current.accent, transition: "background 0.5s ease" }} />
          </div>
          <div className="grid grid-cols-3 gap-1 mb-6 text-[0.62rem] font-mono" style={{ color: "var(--fp-ink-soft)" }}>
            <span>60 % Bone</span>
            <span>30 % Ink</span>
            <span>10 % {current.accentName}</span>
          </div>
          <p className="text-base leading-relaxed mb-3" style={{ color: "var(--fp-ink)" }}>
            <strong style={{ fontWeight: 600 }}>{current.claim}</strong>
          </p>
          <p className="text-[0.92rem] leading-relaxed" style={{ color: "var(--fp-ink-soft)" }}>
            {current.reason}
          </p>
          <div className="mt-5 pt-5 border-t" style={{ borderColor: "color-mix(in srgb, var(--fp-ink) 12%, transparent)" }}>
            <p className="fp-hex">
              Akzent {current.accentName} · <span style={{ color: current.accent, transition: "color 0.5s ease" }}>#{current.accent.slice(1).toUpperCase()}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
