"use client";

import { useState, useEffect } from "react";

const DEADLINE = new Date("2026-04-30T23:59:59").getTime();

function pad(n: number) {
  return n < 10 ? "0" + n : String(n);
}

type TimeLeft = {
  days: number;
  hours: number;
  mins: number;
  secs: number;
};

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, DEADLINE - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}

export function HeroCountdown() {
  const [t, setT] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setT(getTimeLeft());
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const blocks = [
    { val: t?.days ?? 0, label: "Tage" },
    { val: t?.hours ?? 0, label: "Std." },
    { val: t?.mins ?? 0, label: "Min." },
    { val: t?.secs ?? 0, label: "Sek." },
  ];

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Verbleibende Zeit bis Angebotsende"
      className="flex justify-center gap-1.5 items-baseline"
    >
      {blocks.map((block, i) => (
        <div key={block.label} className="flex items-baseline gap-1.5">
          {i > 0 && (
            <span className="font-mono text-2xl font-bold text-white/25 pb-[18px]" aria-hidden="true">:</span>
          )}
          <div className="flex flex-col items-center min-w-[52px]">
            <span
              suppressHydrationWarning
              className="font-mono text-[28px] font-bold text-white bg-white/[0.08] rounded-lg px-3 py-1.5 min-w-[52px] text-center leading-tight"
            >
              {t === null ? "--" : pad(block.val)}
            </span>
            <span className="text-[9px] font-medium text-slate-300 uppercase tracking-wider mt-1">
              {block.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function StickyCountdown() {
  const [t, setT] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setT(getTimeLeft());
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Verbleibende Zeit bis Angebotsende"
      suppressHydrationWarning
      className="font-mono text-sm font-semibold text-red-300"
    >
      {t === null ? "--T --:--:--" : `${t.days}T ${pad(t.hours)}:${pad(t.mins)}:${pad(t.secs)}`}
    </span>
  );
}
