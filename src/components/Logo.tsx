export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 72"
      className={className}
      aria-label="Michael Höger – IT-Beratung & Webdesign"
      role="img"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>
        <linearGradient id="logo-textGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>
        <linearGradient id="logo-divGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="60%" stopColor="#0891B2" />
          <stop offset="100%" stopColor="#0891B2" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Hexagon Icon */}
      <g transform="translate(12, 12)">
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
      </g>

      {/* Wordmark */}
      <text
        x="76"
        y="34"
        fontFamily="var(--font-inter), Inter, system-ui, sans-serif"
        fontSize="30"
        fontWeight="300"
        fill="#334155"
      >
        Michael{" "}
      </text>
      <text
        x="175"
        y="34"
        fontFamily="var(--font-inter), Inter, system-ui, sans-serif"
        fontSize="30"
        fontWeight="800"
        fill="url(#logo-textGrad)"
      >
        Höger
      </text>

      {/* Divider line */}
      <rect x="76" y="42" width="200" height="1.5" fill="url(#logo-divGrad)" rx="1" />

      {/* Subtitle */}
      <text
        x="76"
        y="58"
        fontFamily="var(--font-inter), Inter, system-ui, sans-serif"
        fontSize="9.5"
        fontWeight="600"
        fill="#94A3B8"
        letterSpacing="2"
      >
        IT-BERATUNG &amp; WEBDESIGN
      </text>
    </svg>
  );
}
