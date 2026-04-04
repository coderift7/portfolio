"use client";

const basePath = process.env.__NEXT_ROUTER_BASEPATH || "";

function DeviceMockup({
  desktopSrc,
  mobileSrc,
  desktopAlt,
  mobileAlt,
}: {
  desktopSrc: string;
  mobileSrc: string;
  desktopAlt: string;
  mobileAlt: string;
}) {
  return (
    <div className="relative flex items-end gap-3 px-2 pt-4 pb-2">
      {/* Laptop */}
      <div className="flex-1">
        {/* Screen */}
        <div className="overflow-hidden rounded-t-lg border-2 border-slate-600 dark:border-slate-500 bg-black">
          <div className="aspect-[16/10] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}${desktopSrc}`}
              alt={desktopAlt}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
        {/* Base */}
        <div className="mx-[-4%] h-3 rounded-b-lg bg-gradient-to-b from-slate-500 to-slate-600 dark:from-slate-500 dark:to-slate-600">
          <div className="mx-auto h-1.5 w-16 rounded-b bg-slate-400/50" />
        </div>
      </div>

      {/* Phone */}
      <div className="w-[22%] shrink-0">
        <div className="overflow-hidden rounded-xl border-2 border-slate-600 dark:border-slate-500 bg-black p-0.5">
          {/* Notch */}
          <div className="mx-auto mb-0.5 h-1 w-8 rounded-full bg-slate-600 dark:bg-slate-500" />
          {/* Screen */}
          <div className="aspect-[9/19.5] overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}${mobileSrc}`}
              alt={mobileAlt}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SchaeferhofMockup() {
  return (
    <DeviceMockup
      desktopSrc="/images/schaeferhof-desktop.png"
      mobileSrc="/images/schaeferhof-mobile.png"
      desktopAlt="Auf'm Schäferhof — Desktop-Ansicht"
      mobileAlt="Auf'm Schäferhof — Mobile-Ansicht"
    />
  );
}

export function MoverProMockup() {
  return (
    <DeviceMockup
      desktopSrc="/images/moverpro-desktop.png"
      mobileSrc="/images/moverpro-mobile.png"
      desktopAlt="MoverPro Umzüge — Desktop-Ansicht"
      mobileAlt="MoverPro Umzüge — Mobile-Ansicht"
    />
  );
}
