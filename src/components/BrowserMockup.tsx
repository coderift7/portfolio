"use client";

import { Globe, Calendar, MessageSquare } from "lucide-react";

const basePath = process.env.__NEXT_ROUTER_BASEPATH || "";

function BrowserFrame({
  color,
  url,
  children,
}: {
  color: string;
  url: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-3 py-2">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-border" />
          <div className="h-2.5 w-2.5 rounded-full bg-border" />
          <div className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
        <div className="flex-1 rounded-md bg-white px-3 py-1 text-[10px] text-muted-foreground">
          {url}
        </div>
      </div>
      {/* Content */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export function SchaeferhofMockup() {
  return (
    <BrowserFrame color="#3B2618" url="aufmschaeferhof.de">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}/images/schaeferhof-preview.png`}
        alt="Vorschau der Webseite aufmschaeferhof.de"
        className="h-full w-full object-cover object-top"
      />
    </BrowserFrame>
  );
}

export function MoverProMockup() {
  return (
    <BrowserFrame color="#0D9488" url="moverpro-umzuege.de">
      <div className="h-full bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        {/* Nav */}
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-bold text-slate-800">
            MoverPro<span className="text-[#0D9488]"> Umzüge</span>
          </div>
          <div className="flex gap-3">
            <div className="h-1.5 w-8 rounded-full bg-slate-200" />
            <div className="h-1.5 w-8 rounded-full bg-slate-200" />
            <div className="h-1.5 w-8 rounded-full bg-slate-200" />
          </div>
        </div>
        {/* Hero */}
        <div className="mt-5 flex gap-4">
          <div className="flex-1">
            <div className="h-2 w-3/4 rounded-full bg-slate-800" />
            <div className="mt-1.5 h-2 w-1/2 rounded-full bg-slate-800" />
            <div className="mt-3 h-1.5 w-full rounded-full bg-slate-300" />
            <div className="mt-1 h-1.5 w-4/5 rounded-full bg-slate-300" />
            <div className="mt-3 flex gap-2">
              <div className="h-5 w-16 rounded-md bg-[#0D9488]" />
              <div className="h-5 w-16 rounded-md border border-slate-200" />
            </div>
          </div>
          <div className="flex h-20 w-24 items-center justify-center rounded-lg bg-[#0D9488]/10">
            <Globe className="h-8 w-8 text-[#0D9488]/40" />
          </div>
        </div>
        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["500+", "4.9★", "Berlin"].map((t) => (
            <div key={t} className="rounded-md bg-white p-2 text-center shadow-sm">
              <div className="text-[10px] font-bold text-[#0D9488]">{t}</div>
              <div className="mt-0.5 h-1 w-full rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

export function ZahnarztMockup() {
  return (
    <BrowserFrame color="#0891B2" url="dr-weber-zahnarzt.de">
      <div className="h-full bg-gradient-to-br from-cyan-50 to-slate-50 p-4">
        {/* Nav */}
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-bold text-slate-800">
            Dr. Weber <span className="text-[#0891B2]">Zahnarztpraxis</span>
          </div>
          <div className="flex gap-3">
            <div className="h-1.5 w-8 rounded-full bg-slate-200" />
            <div className="h-1.5 w-8 rounded-full bg-slate-200" />
          </div>
        </div>
        {/* Hero */}
        <div className="mt-5">
          <div className="h-2 w-2/3 rounded-full bg-slate-800" />
          <div className="mt-1.5 h-2 w-2/5 rounded-full bg-slate-800" />
          <div className="mt-3 h-1.5 w-full rounded-full bg-slate-300" />
          <div className="mt-1 h-1.5 w-3/4 rounded-full bg-slate-300" />
        </div>
        {/* Booking widget */}
        <div className="mt-4 rounded-lg border border-[#0891B2]/20 bg-white p-3 shadow-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#0891B2]" />
            <div className="text-[10px] font-semibold text-slate-700">Online-Terminbuchung</div>
          </div>
          <div className="mt-2 grid grid-cols-5 gap-1">
            {["Mo", "Di", "Mi", "Do", "Fr"].map((d) => (
              <div key={d} className="rounded bg-slate-50 p-1 text-center text-[8px] text-slate-500">{d}</div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-5 gap-1">
            {[false, true, false, true, true].map((avail, i) => (
              <div
                key={i}
                className={`rounded p-1 text-center text-[8px] ${avail ? "bg-[#0891B2]/10 text-[#0891B2] font-medium" : "bg-slate-50 text-slate-300"}`}
              >
                {avail ? "Frei" : "—"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function MalerMockup() {
  return (
    <BrowserFrame color="#F97316" url="malermeister-schulz.de">
      <div className="h-full bg-gradient-to-br from-orange-50 to-slate-50 p-4">
        {/* Nav */}
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-bold text-slate-800">
            Malermeister <span className="text-[#F97316]">Schulz</span>
          </div>
          <div className="flex gap-3">
            <div className="h-1.5 w-8 rounded-full bg-slate-200" />
            <div className="h-1.5 w-8 rounded-full bg-slate-200" />
          </div>
        </div>
        {/* Hero */}
        <div className="mt-5 flex gap-4">
          <div className="flex-1">
            <div className="h-2 w-3/4 rounded-full bg-slate-800" />
            <div className="mt-1.5 h-2 w-1/2 rounded-full bg-slate-800" />
            <div className="mt-3 h-1.5 w-full rounded-full bg-slate-300" />
            <div className="mt-1 h-1.5 w-3/5 rounded-full bg-slate-300" />
          </div>
          {/* Color swatches */}
          <div className="grid grid-cols-2 gap-1">
            <div className="h-8 w-8 rounded-md bg-[#F97316]/70" />
            <div className="h-8 w-8 rounded-md bg-amber-200" />
            <div className="h-8 w-8 rounded-md bg-slate-300" />
            <div className="h-8 w-8 rounded-md bg-emerald-200" />
          </div>
        </div>
        {/* Contact widget */}
        <div className="mt-4 rounded-lg border border-[#F97316]/20 bg-white p-3 shadow-sm">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-[#F97316]" />
            <div className="text-[10px] font-semibold text-slate-700">Anfrage direkt aufs Handy</div>
          </div>
          <div className="mt-2 space-y-1.5">
            <div className="h-4 w-full rounded bg-slate-50" />
            <div className="h-4 w-full rounded bg-slate-50" />
            <div className="h-5 w-20 rounded-md bg-[#F97316]" />
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
