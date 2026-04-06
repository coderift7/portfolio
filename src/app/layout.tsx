import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import CookieBanner from "@/components/CookieBanner";
import MetaPixel from "@/components/MetaPixel";

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

const siteUrl = "https://hoeger.dev";

export const metadata: Metadata = {
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
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
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    images: [`${siteUrl}/images/og-image.png`],
  },
  keywords: [
    "Webdesign",
    "Webentwicklung",
    "SEO",
    "KI-Optimierung",
    "Webseite erstellen lassen",
    "Freelancer Webdesign",
    "kleine Unternehmen",
    "Limburg",
    "ChatGPT Optimierung",
  ],
  manifest: "/manifest.json",
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
              sameAs: ["https://hoeger.dev", siteConfig.facebook, siteConfig.instagram],
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
              address: {
                "@type": "PostalAddress",
                streetAddress: "Johann-Boppe-Str. 19",
                addressLocality: "Limburg an der Lahn",
                postalCode: "65549",
                addressRegion: "Hessen",
                addressCountry: "DE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 50.3877,
                longitude: 8.0622,
              },
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
        {/* WebSite Schema — Sitelinks Search Box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Michael Höger – Webdesign & Digitale Lösungen",
              url: siteUrl,
              description: siteConfig.meta.description,
              inLanguage: "de-DE",
              publisher: {
                "@type": "Person",
                name: "Michael Höger",
                url: siteUrl,
              },
            }),
          }}
        />
        {/* FAQPage Schema — Google Rich Results + AI Bots */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: siteConfig.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <CookieBanner />
        <MetaPixel />
      </body>
    </html>
  );
}
