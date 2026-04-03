export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>
      </defs>
      <polygon
        points="24,3 42,13.5 42,34.5 24,45 6,34.5 6,13.5"
        fill="none"
        stroke="url(#logo-grad)"
        strokeWidth="1.5"
      />
      <line x1="24" y1="3" x2="24" y2="21" stroke="#0D9488" strokeWidth="1" opacity="0.45" />
      <line x1="42" y1="13.5" x2="26.6" y2="22.2" stroke="#0D9488" strokeWidth="1" opacity="0.45" />
      <line x1="42" y1="34.5" x2="26.6" y2="25.8" stroke="#0891B2" strokeWidth="1" opacity="0.45" />
      <line x1="24" y1="45" x2="24" y2="27" stroke="#0891B2" strokeWidth="1" opacity="0.45" />
      <line x1="6" y1="34.5" x2="21.4" y2="25.8" stroke="#0891B2" strokeWidth="1" opacity="0.45" />
      <line x1="6" y1="13.5" x2="21.4" y2="22.2" stroke="#0D9488" strokeWidth="1" opacity="0.45" />
      <circle cx="24" cy="24" r="3" fill="url(#logo-grad)" />
      <circle cx="24" cy="3" r="2.2" fill="#0D9488" />
      <circle cx="42" cy="13.5" r="2.2" fill="#0D9488" />
      <circle cx="42" cy="34.5" r="2.2" fill="#0891B2" />
      <circle cx="24" cy="45" r="2.2" fill="#0891B2" />
      <circle cx="6" cy="34.5" r="2.2" fill="#0891B2" />
      <circle cx="6" cy="13.5" r="2.2" fill="#0D9488" />
    </svg>
  );
}

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <LogoIcon className="h-10 w-10 shrink-0" />
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1 text-xl leading-tight tracking-tight">
          <span className="font-light text-neutral-700 dark:text-neutral-300">Michael</span>
          <span className="font-extrabold text-gradient-brand">Höger</span>
        </div>
        <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          IT-Beratung &amp; Webdesign
        </div>
      </div>
    </div>
  );
}
