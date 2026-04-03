"use client";

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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}/images/moverpro-preview.png`}
        alt="Vorschau der MoverPro Demo-Webseite"
        className="h-full w-full object-cover object-top"
      />
    </BrowserFrame>
  );
}

