# Security Audit — hoeger.dev
**Datum:** 2026-04-20  
**Stack:** Next.js 16.1.6 (static export), GitHub Pages  
**Scope:** Read-only, kein Deploy

---

## Executive Summary — Risiko-Ampel

| Bereich | Status |
|---|---|
| Formular-Security | GELB — kein CSRF-Token, kein serverseitiges Rate-Limit |
| XSS | GELB — Blog-Content via rehype-sanitize bereinigt, aber remark-html als Dep vorhanden |
| Secrets im Code | GRUEN — keine Hardcodes, .gitignore korrekt |
| Third-Party Scripts | GELB — Umami lädt ohne Consent, Meta Pixel consent-geblockt OK |
| Client-Side Security | GRUEN — kein eval, kein postMessage, localStorage nur für UI-State |
| HTTP-Security-Header | ROT — keinerlei Header gesetzt (GitHub Pages Limitation) |
| Supply Chain | ROT — 4 Vulnerabilities (3x high), Next.js 16.1.6 veraltet |
| Cookie/Consent | GELB — Consent-System funktioniert, aber kein Consent für Umami |

**Gesamtbewertung: GELB** — Keine kritischen Einzelfunde, aber die Kombination aus fehlenden Security-Headern, veralteten Paketen und Consent-Gap bei Umami ergibt erhöhtes Risiko.

---

## Findings

### F-01 — Next.js 16.1.6 enthält mehrere High-CVEs
**Severity: ROT — Kritisch**

Installierte Version: 16.1.6. Laut `npm audit` enthält die Range `16.0.0-beta.0 - 16.2.2` mindestens 5 Advisories:

- `GHSA-mq59-m269-xvcx` — null origin kann CSRF-Schutz bei Server Actions umgehen
- `GHSA-jcc7-9wpm-mj36` — null origin umgeht HMR WebSocket CSRF (Dev-Modus, geringes Produktions-Risiko)
- `GHSA-h27x-g6w4-24gq` — Unbounded postponed resume buffering → DoS
- `GHSA-q4gf-8mx6-v5v3` — DoS via Server Components
- `GHSA-ggv3-7p47-pfv8` — HTTP Request Smuggling in rewrites

Die static-export-Architektur mildert einige Server-Lücken. Die CSRF-Bypass-CVE betrifft Server Actions, die hier nicht verwendet werden. Trotzdem: Update ist ein Non-Brainer.

**Fix:** `npm install next@16.2.4` — non-breaking, Patch-Version.

---

### F-02 — Kein Rate-Limiting auf API-Endpunkten
**Severity: ROT — Kritisch**

Beide Formulare (`/api/contact`, `/api/check`) senden direkt an externe APIs ohne serverseitiges Rate-Limiting. Der Honeypot (`_gotcha`) schützt nur gegen naive Bots. Ein gezielter Angreifer kann:
- Beliebig viele Mails über das Brevo-Konto verschicken (→ Spam-Reputation, Kosten)
- Das `/api/check`-Formular missbrauchen, um automatisierte Analysen gegen Dritte anzustoßen

Das gilt unabhängig davon, ob die API-Route im statischen Export wirklich live ist — wenn ein separater API-Backend-Layer existiert (z.B. über Vercel Functions oder separaten Server), ist das Risiko real.

**Fix:**
```typescript
// Middleware-basiertes Rate-Limit (z.B. upstash/ratelimit oder eigene Redis-Lösung)
// Alternativ: Vercel Edge Config Rate Limiting oder IP-Throttling im Reverse Proxy
// Kurzfristig: Brevo-Sending-Limits im Dashboard setzen (max. X Mails/Stunde)
```

---

### F-03 — Kein CSRF-Token in Formularen
**Severity: GELB — Wichtig**

Weder `Contact.tsx` noch `WebsiteCheckForm.tsx` senden ein CSRF-Token. Da die Site statisch deployed ist und die API-Endpunkte separat laufen, hängt das Risiko von der API-Architektur ab. Wenn der API-Server den `Origin`-Header nicht validiert, sind CSRF-Angriffe möglich (z.B. fremde Seite triggert im Namen eines Nutzers eine Formularabsendung).

**Fix:** API-Route prüft `Origin`/`Referer`-Header gegen eine Allowlist:
```typescript
const allowedOrigins = ['https://hoeger.dev', 'https://www.hoeger.dev'];
if (!allowedOrigins.includes(req.headers.origin ?? '')) {
  return res.status(403).json({ error: 'Forbidden' });
}
```

---

### F-04 — Umami Analytics lädt ohne Consent
**Severity: GELB — Wichtig**

In `layout.tsx` (Zeile 104–108) wird das Umami-Script mit `strategy="afterInteractive"` geladen — **ohne** Prüfung auf Cookie-Consent:

```tsx
<Script
  src="https://analytics.hoeger.dev/script.js"
  data-website-id="6145f8bb-9bc3-4576-b0f8-b07216762e0b"
  strategy="afterInteractive"
/>
```

Umami ist zwar cookielos und DSGVO-freundlicher als GA, aber es überträgt trotzdem IP-Adresse und User-Agent an `analytics.hoeger.dev`. Das ist eine Datenübertragung an einen (selbst betriebenen) Server — DSGVO-relevant, muss in der Datenschutzerklärung geregelt sein und sollte zumindest als technisch notwendig eingestuft oder aus dem Cookie-Banner ausgeklammert werden. Derzeit wird im Cookie-Banner nur Meta Pixel erwähnt.

**Fix (Option A — empfohlen):** Umami als technisch notwendig deklarieren (keine personenbezogenen Daten gespeichert, kein Tracking-Cookie, self-hosted) und explizit in der Datenschutzerklärung benennen.  
**Fix (Option B):** Umami ebenfalls hinter Consent-Gate stellen (wie Meta Pixel).

---

### F-05 — NEXT_PUBLIC_META_PIXEL_ID in .env.local mit echter ID
**Severity: GELB — Wichtig**

Die Datei `.env.local` enthält die echte Pixel-ID `186531548645621`. Das ist kein Secret im eigentlichen Sinne (Pixel-IDs sind ohnehin im Frontend-JS sichtbar), aber:

1. `.env.local` ist korrekt in `.gitignore` eingetragen — kein Commit-Risiko.
2. `NEXT_PUBLIC_*` bündelt den Wert direkt ins Client-Bundle — die ID ist für jeden sichtbar, der den Seitenquelltext liest. Das ist by design, aber explizit dokumentieren.

**Kein Fix nötig**, solange `.gitignore` greift. Zur Klarheit: Pixel-IDs sind kein Secret und müssen nicht versteckt werden.

---

### F-06 — Fehlende HTTP-Security-Header
**Severity: GELB — Wichtig**

`next.config.ts` setzt keinerlei Security-Header (GitHub Pages kann serverseitige Header nicht setzen). Folgende Header fehlen komplett:

| Header | Risiko ohne |
|---|---|
| `Content-Security-Policy` | XSS-Vektoren, unkontrollierter Script-Load |
| `X-Frame-Options` / `frame-ancestors` | Clickjacking |
| `X-Content-Type-Options: nosniff` | MIME-Sniffing |
| `Referrer-Policy` | Leak von URL-Pfaden an externe Domains |
| `Permissions-Policy` | Unnötige Browser-APIs offen |
| `Strict-Transport-Security` | Downgrade-Angriffe |

GitHub Pages setzt HSTS selbst — das ist der einzige automatische Header.

**Fix — Meta-Tags (GitHub-Pages-kompatibel):**
```html
<!-- In layout.tsx <head>: -->
<meta http-equiv="X-Content-Type-Options" content="nosniff" />
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
<!-- X-Frame-Options geht nicht als Meta, aber CSP frame-ancestors geht: -->
<meta http-equiv="Content-Security-Policy" content="frame-ancestors 'none'" />
```

Für vollständige CSP empfiehlt sich ein Migration auf Vercel (setzt Header server-side) oder ein Custom-Domain-Proxy (Cloudflare) mit Page Rules.

---

### F-07 — remark-html als installierte Dependency, aber nicht verwendet
**Severity: GRUEN — Nice-to-have**

`package.json` listet `remark-html: ^16.0.1` als Dependency. Im Quellcode (`src/`) wird es **nirgends importiert** — das Blog nutzt die sicherere Pipeline `remark → rehype → rehype-sanitize → rehype-stringify`. `remark-html` rendert ohne Sanitization, falls es versehentlich eingesetzt wird.

**Fix:** `npm uninstall remark-html` — reduziert Angriffsfläche und Bundle-Größe.

---

### F-08 — Blog-Content via dangerouslySetInnerHTML — Absicherung vorhanden, aber Pfad prüfen
**Severity: GRUEN — Nice-to-have**

`src/app/blog/[slug]/page.tsx:155` rendert `post.content` mit `dangerouslySetInnerHTML`. Die Sanitization erfolgt in `src/lib/blog.ts` über `rehype-sanitize` mit Default-Schema (blockt `<script>`, `on*`-Attribute, gefährliche URLs). Das ist korrekt implementiert.

Einziges verbleibendes Risiko: Blog-Posts liegen als `.md`-Dateien im `content/`-Verzeichnis. Falls jemals ein CMS (Decap ist als Dev-Dependency vorhanden) externe Autoren erlaubt, könnte Markdown mit eingebetteten HTML-Kommentaren oder Data-URIs durchschlüpfen.

**Fix:** `rehype-sanitize` mit explizitem Schema statt Default, das `data:` URLs in `href`/`src` blockiert:
```typescript
import { defaultSchema } from 'rehype-sanitize';
const schema = { ...defaultSchema, protocols: { href: ['https', 'http', 'mailto'], src: ['https', 'http'] } };
.use(rehypeSanitize, schema)
```

---

### F-09 — LeadEvent feuert fbq ohne Consent-Check
**Severity: GELB — Wichtig**

`src/app/website-check/danke/LeadEvent.tsx` feuert `fbq("track", "Lead")` direkt im `useEffect`, ohne den Consent-Status zu prüfen:

```tsx
if (!fired.current && typeof window.fbq === "function") {
  window.fbq("track", "Lead");
}
```

Da `window.fbq` nur vorhanden ist wenn Meta Pixel geladen wurde (und Pixel nur bei `consent === "granted"` lädt), ist der Schutz **indirekt** vorhanden. Aber: Wenn Pixel aus einem anderen Weg geladen wird (Browser-Extension, A/B-Test), könnte fbq vorhanden sein ohne echten Consent.

**Fix:** Expliziten Consent-Check einfügen:
```tsx
import { getConsent } from "@/lib/consent";
if (!fired.current && getConsent() === 'granted' && typeof window.fbq === "function") {
```

---

### F-10 — WhatsApp-Telefonnummer im Klartext im Bundle
**Severity: GRUEN — Nice-to-have**

`src/components/WhatsAppButton.tsx:8` enthält `https://wa.me/491629255254` hardcodiert. Das ist für eine Freelance-Kontaktseite intentional, aber die Nummer landet im öffentlich zugänglichen JS-Bundle und ist für Harvesting-Bots trivial auslesbar.

**Kein kritischer Fix nötig.** Wer die Nummer schützen möchte, kann sie in die `siteConfig` auslagern und mit `noindex`-Hinweis auf Bot-Harvesting-Schutz verzichten (realistisch wirkungslos).

---

## OWASP Top 10 2021 — Kurz-Check

| Nr. | Kategorie | Status | Anmerkung |
|---|---|---|---|
| A01 | Broken Access Control | N/A | Static Site, keine geschützten Ressourcen |
| A02 | Cryptographic Failures | GRUEN | HTTPS via GitHub Pages, keine Secrets im Code |
| A03 | Injection | GELB | Formular-Inputs nicht serverseitig validiert (kein API-Code im Repo sichtbar), Blog-HTML sanitized |
| A04 | Insecure Design | GRUEN | Honeypot vorhanden, Consent-System implementiert |
| A05 | Security Misconfiguration | GELB | Fehlende HTTP-Header (F-06), veraltetes Next.js (F-01) |
| A06 | Vulnerable Components | ROT | 3x high in npm audit (Next.js, flatted, picomatch) |
| A07 | ID & Auth Failures | N/A | Keine Authentifizierung |
| A08 | Software & Data Integrity | GELB | Kein SRI für externe Scripts (Umami, fbevents.js), package-lock.json vorhanden mit Integrity-Hashes |
| A09 | Logging & Monitoring Failures | GELB | Kein Monitoring für API-Abuse erkennbar |
| A10 | SSRF | N/A | Kein Server-Code im Repo |

---

## SRI — Subresource Integrity für externe Scripts

Externe Domains die eingebunden werden:
- `connect.facebook.net` — fbevents.js (kein SRI möglich bei dynamischer URL)
- `analytics.hoeger.dev` — Umami (selbst gehostet, SRI umsetzbar)
- `fonts.googleapis.com` / `fonts.gstatic.com` — via Next.js Font Optimierung (automatisch lokal gebündelt — kein Risiko)

**Fix für Umami** — SRI-Hash generieren und im Script-Tag setzen:
```bash
curl -s https://analytics.hoeger.dev/script.js | openssl dgst -sha384 -binary | openssl base64 -A
# → sri-hash eintragen in crossOrigin + integrity Attribut
```

---

## Empfohlene HTTP-Header (Meta-Tag-Variante für GitHub Pages)

```tsx
// In src/app/layout.tsx, innerhalb <head>:
<meta http-equiv="X-Content-Type-Options" content="nosniff" />
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
<meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
// frame-ancestors nur via CSP Meta-Tag (kein X-Frame-Options als Meta):
<meta http-equiv="Content-Security-Policy" content="frame-ancestors 'none'" />
```

Hinweis: `X-Frame-Options` als Meta-Tag wird von modernen Browsern ignoriert. Die CSP `frame-ancestors`-Direktive ist der korrekte Weg und funktioniert auch als Meta-Tag.

---

## Dependency-Risiken Top 5

| Paket | Installiert | Problem | Fix |
|---|---|---|---|
| `next` | 16.1.6 | 5 CVEs (High) — CSRF-Bypass, DoS, HTTP-Smuggling | `npm install next@16.2.4` |
| `flatted` | <=3.4.1 | Prototype Pollution via parse() | Transitiv — fix via `npm audit fix` |
| `picomatch` | <=2.3.1 | ReDoS + Method Injection | Transitiv — fix via `npm audit fix` |
| `brace-expansion` | <1.1.13 | Moderate — undefined behavior | Transitiv — fix via `npm audit fix` |
| `remark-html` | 16.0.1 | Nicht verwendet, rendert unsanitized HTML falls versehentlich eingesetzt | `npm uninstall remark-html` |

---

## Was gut gemacht ist

- Honeypot (`_gotcha`) in beiden Formularen korrekt implementiert (aria-hidden, opacity-0, kein tabIndex)
- Meta Pixel korrekt hinter Consent-Gate (`consent === "granted"` vor Script-Load)
- `rehype-sanitize` in der Blog-Pipeline — XSS aus Markdown-Content ausgeschlossen
- `dangerouslySetInnerHTML` nur für JSON-LD aus statischen Konstanten (sicher) und sanitized Blog-Content
- `.gitignore` enthält `.env*` — kein Secret-Leak-Risiko
- `package-lock.json` mit vollständigen Integrity-Hashes (lockfileVersion 3)
- Datenschutz-Checkbox in beiden Formularen als required-Feld
- `role="alert"` auf Fehlermeldungen (a11y korrekt)
- Privacy-Checkbox in WebsiteCheckForm hat kein `htmlFor` — allerdings ist der Input in einem `<label>` eingebettet, was funktioniert
