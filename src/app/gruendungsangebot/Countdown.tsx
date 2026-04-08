"use client";

import { useState, useEffect } from "react";

const DEADLINE = new Date("2026-04-30T23:59:59").getTime();

function pad(n: number) {
  return n < 10 ? "0" + n : String(n);
}

function getTimeLeft() {
  const diff = Math.max(0, DEADLINE - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}

export function HeroCountdown() {
  const [t, setT] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex justify-center gap-1.5 items-baseline">
      {[
        { val: t.days, label: "Tage" },
        { val: t.hours, label: "Std." },
        { val: t.mins, label: "Min." },
        { val: t.secs, label: "Sek." },
      ].map((block, i) => (
        <div key={block.label} className="flex items-baseline gap-1.5">
          {i > 0 && (
            <span className="font-mono text-2xl font-bold text-white/25 pb-[18px]">:</span>
          )}
          <div className="flex flex-col items-center min-w-[52px]">
            <span className="font-mono text-[28px] font-bold text-white bg-white/[0.08] rounded-lg px-3 py-1.5 min-w-[52px] text-center leading-tight">
              {pad(block.val)}
            </span>
            <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider mt-1">
              {block.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function StickyCountdown() {
  const [t, setT] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-sm font-semibold text-red-300">
      {t.days}T {pad(t.hours)}:{pad(t.mins)}:{pad(t.secs)}
    </span>
  );
}
