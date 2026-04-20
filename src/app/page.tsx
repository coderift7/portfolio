import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import UspBanner from "@/components/UspBanner";
import Services from "@/components/Services";
import { siteConfig, siteUrl } from "@/config/site";

const Process = dynamic(() => import("@/components/Process"));
const Projects = dynamic(() => import("@/components/Projects"));
const WebsiteCheckTeaser = dynamic(() => import("@/components/WebsiteCheckTeaser"));
const About = dynamic(() => import("@/components/About"));
const Guarantee = dynamic(() => import("@/components/Guarantee"));
const Faq = dynamic(() => import("@/components/Faq"));
const Contact = dynamic(() => import("@/components/Contact"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"));

export default function Home() {
  return (
    <>
      {/* Person Schema — E-E-A-T */}
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
            geo: { "@type": "GeoCoordinates", latitude: 50.3877, longitude: 8.0622 },
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
                itemOffered: { "@type": "Service", name: s.title, description: s.description },
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
            publisher: { "@type": "Person", name: "Michael Höger", url: siteUrl },
          }),
        }}
      />
      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: siteConfig.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
      <main id="main">
        <Hero />
        <UspBanner />
        <Services />
        <Process />
        <Projects />
        <WebsiteCheckTeaser />
        <About />
        <Guarantee />
        <Faq />
        <Contact />
      </main>
      <WhatsAppButton />
    </>
  );
}
