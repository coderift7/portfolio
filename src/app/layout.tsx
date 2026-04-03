import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = "https://coderift7.github.io/portfolio";

export const metadata: Metadata = {
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  icons: { icon: `${siteUrl}/icon.svg` },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Michael Höger – Webseiten, die Ihnen Kunden bringen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    images: [`${siteUrl}/images/og-image.png`],
  },
  other: {
    "theme-color": "#0D9488",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Theme detection — runs before paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}})()`,
          }}
        />
        {/* Person Schema — E-E-A-T Signal */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Michael Höger",
              jobTitle: "Webdesigner & Entwickler",
              description:
                "Freelancer für Webdesign, SEO und KI-Optimierung. Hilft kleinen Unternehmen, online Kunden zu gewinnen.",
              url: siteUrl,
              email: siteConfig.email,
              telephone: siteConfig.phone,
              image: `${siteUrl}/images/michael-hero.webp`,
              sameAs: [],
              knowsAbout: [
                "Webdesign",
                "Webentwicklung",
                "Suchmaschinenoptimierung",
                "KI-Optimierung",
                "Social Media Marketing",
                "Automatisierung",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Michael Höger – Webdesign & Digitale Lösungen",
              },
            }),
          }}
        />
        {/* ProfessionalService Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Michael Höger – Webdesign & Digitale Lösungen",
              description: siteConfig.meta.description,
              url: siteUrl,
              email: siteConfig.email,
              telephone: siteConfig.phone,
              image: `${siteUrl}/images/og-image.png`,
              priceRange: "€€",
              serviceType: [
                "Webdesign",
                "Webentwicklung",
                "Suchmaschinenoptimierung (SEO)",
                "KI-Optimierung (AEO)",
                "Social Media Marketing",
                "Automatisierungen",
              ],
              areaServed: { "@type": "Country", name: "DE" },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Digitale Dienstleistungen",
                itemListElement: siteConfig.services.map((s, i) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: s.title,
                    description: s.description,
                  },
                  position: i + 1,
                })),
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
