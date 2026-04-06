# Meta Pixel + Cookie-Consent Integration — Design Spec

**Datum:** 2026-04-06
**Projekt:** hoeger.dev (Portfolio)
**Pfad:** `/Users/michael/Documents/01_AKTUELLE_PROJEKTE/Webseite_Michael/portfolio/`
**Stack:** Next.js 16 + TypeScript + Tailwind 4 + Framer Motion, statischer Export auf VPS

## Zusammenfassung

Meta Pixel Integration mit DSGVO-konformem Cookie-Consent. Pixel wird ausschließlich nach expliziter Einwilligung geladen (Script-Injection nach Consent). Eigenbau-Lösung ohne externe Dependencies.

## Anforderungen

- Meta Pixel PageView auf jeder Seite (nach Consent)
- Lead-Event auf `/website-check/danke`
- Cookie-Banner (Bottom Bar) mit Akzeptieren/Ablehnen
- Widerruf jederzeit über Footer-Link "Cookie-Einstellungen"
- Datenschutzerklärung aktualisieren
- DSGVO-konform: Kein Pixel, kein Cookie ohne Consent
- BFSG/WCAG: Barrierefreier Banner

## Architektur

### Neue Dateien

```
src/
├── components/
│   ├── CookieBanner.tsx      # Banner-UI + Consent-Logik
│   └── MetaPixel.tsx         # Pixel-Injection nach Consent
├── lib/
│   └── consent.ts            # Consent-Helpers (get/set/reset)
```

### Consent-Flow

```
User besucht Seite
  → localStorage prüfen: consent vorhanden?
    → JA + "granted": MetaPixel laden, kein Banner
    → JA + "denied": Kein Pixel, kein Banner
    → NEIN: Banner anzeigen
      → "Akzeptieren": consent="granted" speichern, Pixel injizieren
      → "Ablehnen": consent="denied" speichern, Banner schließen
```

### Consent Storage

```ts
// localStorage Key: "cookie_consent"
// Werte: "granted" | "denied"
// Kein Expiry — gilt bis Widerruf
```

### Integration in Layout

- `CookieBanner` + `MetaPixel` in `layout.tsx` als Client Components
- Beide `"use client"` (brauchen localStorage + DOM-Zugriff)
- Kein Impact auf statischen Export

## Cookie-Banner UI

### Aussehen

- **Position:** Fixed unten, volle Breite
- **Hintergrund:** Dunkles Teal/Slate (`bg-slate-900/95` mit Backdrop-Blur)
- **Text:** Inter, weiß, eine Zeile: "Wir nutzen Meta Pixel zur Messung unserer Werbeanzeigen." + Link zu /datenschutz
- **Buttons:**
  - "Akzeptieren" — Teal/Cyan Primary (CI-Farbe)
  - "Ablehnen" — Ghost/Outline, dezent
- **Animation:** Slide-up mit Framer Motion
- **Responsive:** Auf Mobile stacken Text und Buttons vertikal

### Footer-Link

- Neuer Link im Footer: "Cookie-Einstellungen"
- Klick → localStorage löschen → Banner erscheint wieder

### Barrierefreiheit

- `role="dialog"`, `aria-label="Cookie-Einstellungen"`
- Buttons fokussierbar, Kontrast AAA
- Kein Focus-Trap (User kann weiter scrollen)

## Meta Pixel

### Pixel-Injection

- `MetaPixel.tsx` — Client Component, rendert nur bei `consent === "granted"`
- Injiziert Meta Pixel Base Code via Next.js `<Script>` Component
- Pixel-ID als `NEXT_PUBLIC_META_PIXEL_ID` in `.env.local`
- `.env.example` als Referenz anlegen

### Events

| Event | Wo | Wann |
|-------|-----|------|
| `PageView` | Jede Seite | Nach Consent, bei jedem Seitenaufruf |
| `Lead` | `/website-check/danke` | Einmalig beim Laden der Danke-Seite |

### PageView bei Navigation

- `usePathname()` Hook im MetaPixel Component
- Bei Route-Wechsel → `fbq('track', 'PageView')` erneut feuern
- Client-seitige Navigationen werden getrackt

### Lead-Event

- Auf `/website-check/danke` wird `fbq('track', 'Lead')` gefeuert
- Einmal pro Page-Load, kein Doppel-Tracking

### Kein Pixel ohne Consent

- Component rendert `null` ohne Consent
- Kein `fbq()` Call, kein Script-Tag, kein Cookie

## Datenschutzerklärung Update

### Abschnitt 7 ersetzen

Bisheriger Text ("keine Cookies, keine Tracking-Tools") wird ersetzt durch:

**7. Cookies**
- Technisch notwendiges Cookie (`cookie_consent`) zur Speicherung der Cookie-Einstellungen (localStorage)
- Meta Pixel nur nach ausdrücklicher Einwilligung

**8. Meta Pixel (nur mit Einwilligung)**
- Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)
- Anbieter: Meta Platforms Ireland Limited
- Zweck: Messung der Wirksamkeit von Werbeanzeigen
- Daten: IP-Adresse (gekürzt), Seitenaufrufe, Conversion-Events
- Cookie: `_fbp` (gesetzt von Meta, 90 Tage Laufzeit)
- Widerruf: Jederzeit über "Cookie-Einstellungen" im Footer
- Hinweis auf Meta-Datenschutzrichtlinie + EU-U.S. Data Privacy Framework
- Opt-out-Link zu Meta Ad-Einstellungen

### Nummerierung

Bisherige Abschnitte 8-11 → 9-12

## UTM-Parameter & Custom Conversion

### UTM-Parameter

Konfiguration in der Meta Ad, nicht im Code:

```
https://hoeger.dev/website-check?utm_source=meta&utm_medium=paid&utm_campaign=website-check
```

### Custom Conversion (Meta Business Manager)

- Event: `Lead`
- URL-Regel: URL enthält `/website-check/danke`
- Manuell im Meta Business Manager anlegen
- Kein Code-Aufwand

## Nicht im Scope

- Google Analytics oder andere Tracker
- Serverseitige Conversion API
- UTM-Parsing im Frontend
- Granulare Cookie-Einstellungen (nur ein Pixel)
- Cookiebot / externe Consent-Management-Tools
