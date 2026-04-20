import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/config/site";
import CookieBanner from "@/components/CookieBanner";
import MetaPixel from "@/components/MetaPixel";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteUrl } from "@/config/site";

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
        {/* Seitenspezifische JSON-LD-Schemas werden in den jeweiligen page.tsx gerendert, nicht global. */}
      </head>
      <body className="antialiased">
        <AnnouncementBanner />
        <Header />
        {children}
        <Footer />
        <CookieBanner />
        <MetaPixel />
        <Script
          src="https://analytics.hoeger.dev/script.js"
          data-website-id="6145f8bb-9bc3-4576-b0f8-b07216762e0b"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
