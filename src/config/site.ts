export const siteConfig = {
  name: "Michael Höger",
  role: "Webdesign & Digitale Lösungen",
  email: "hallo@michaelhoeger.de",
  phone: "+49 123 456 789",
  location: "Deutschland",

  meta: {
    title: "Michael Höger – Webseiten, die von Google UND KI gefunden werden",
    description:
      "Professionelle Webseiten, optimiert für Google und KI-Chatbots. SEO, Automatisierungen und Social Media für kleine Unternehmen. Kostenlose Erstberatung.",
  },

  hero: {
    greeting: "Hallo, ich bin Michael",
    headline: "Webseiten, die von Google\nUND KI gefunden werden.",
    subheadline:
      "95% aller Webseiten sind unsichtbar für ChatGPT, Perplexity & Co. Ich baue Webseiten, die nicht nur bei Google ranken — sondern auch von KI-Assistenten empfohlen werden.",
    cta: "Kostenlose Erstberatung",
    ctaSecondary: "Meine Arbeiten",
  },

  // USP Banner — shown between hero and services
  uspBanner: {
    headline: "Was die meisten Webdesigner nicht können",
    items: [
      {
        icon: "Bot",
        title: "KI-optimiert",
        description:
          "Ihre Webseite wird von ChatGPT, Perplexity und Google Gemini gefunden und empfohlen.",
      },
      {
        icon: "Search",
        title: "SEO ab Tag 1",
        description:
          "Schema Markup, lokale SEO und technische Optimierung — nicht als Addon, sondern Standard.",
      },
      {
        icon: "Zap",
        title: "Automatisiert",
        description:
          "Anfragen landen automatisch in Ihrem Postfach. Kein manuelles Nachfassen nötig.",
      },
    ],
  },

  services: [
    {
      icon: "Globe",
      title: "Webdesign & Entwicklung",
      description:
        "Moderne, blitzschnelle Webseiten, die auf allen Geräten perfekt aussehen. Branchenspezifisch, SEO-optimiert, KI-ready.",
    },
    {
      icon: "Bot",
      title: "KI-Optimierung",
      description:
        "Ihre Webseite wird für KI-Chatbots aufbereitet: llms.txt, strukturierte Daten und konversationeller Content. Die Zukunft der Sichtbarkeit.",
    },
    {
      icon: "Search",
      title: "SEO & Google",
      description:
        "Gefunden werden, wenn Kunden suchen. Lokale SEO, Google Business, Schema Markup und Content-Strategie.",
    },
    {
      icon: "Zap",
      title: "Automatisierungen",
      description:
        "Formulare, E-Mails, Buchungen, WhatsApp-Benachrichtigungen — wiederkehrende Aufgaben laufen von selbst.",
    },
    {
      icon: "Share2",
      title: "Social Media",
      description:
        "Professionelle Präsenz auf den richtigen Plattformen. Strategie, Content-Erstellung und Betreuung.",
    },
    {
      icon: "HeartHandshake",
      title: "Persönliche Betreuung",
      description:
        "Kein Callcenter, kein Ticket-System. Sie sprechen immer direkt mit mir — schnell, verbindlich, auf Augenhöhe.",
    },
  ],

  projects: [
    {
      title: "MoverPro Umzüge",
      category: "Webdesign + KI-SEO",
      description:
        "Umzugsunternehmen-Webseite mit KI-Optimierung. Wird von ChatGPT bei der Frage 'Umzugsunternehmen in Berlin' als Ergebnis berücksichtigt — dank llms.txt und FAQ-Schema.",
      tags: ["Next.js", "KI-SEO", "Schema Markup", "llms.txt"],
      color: "#2563EB",
    },
    {
      title: "Zahnarztpraxis Dr. Weber",
      category: "Webdesign + Local SEO",
      description:
        "Praxis-Webseite mit Online-Terminbuchung, lokaler SEO und Google Business Optimierung. 40% mehr Terminanfragen in 3 Monaten.",
      tags: ["WordPress", "Booking", "Local SEO"],
      color: "#059669",
    },
    {
      title: "Malermeister Schulz",
      category: "Webdesign + Automatisierung",
      description:
        "Handwerker-Webseite mit automatischer Angebotsanfrage. Kundenanfragen werden per E-Mail UND WhatsApp weitergeleitet — kein Lead geht verloren.",
      tags: ["Next.js", "Automation", "WhatsApp"],
      color: "#D97706",
    },
  ],

  about: {
    headline: "Digital denken, persönlich handeln.",
    text: "Ich bin Michael — Webdesigner und Digitalberater. Ich helfe kleinen Unternehmen und Selbstständigen, online sichtbar zu werden und Kunden zu gewinnen. Mein Vorteil: Ich optimiere Webseiten nicht nur für Google, sondern auch für die neue Generation von KI-Assistenten. Keine komplizierten Prozesse, keine leeren Versprechen — Lösungen, die funktionieren.",
    stats: [
      { value: "20+", label: "Projekte umgesetzt" },
      { value: "100%", label: "Kundenzufriedenheit" },
      { value: "<48h", label: "Antwortzeit" },
    ],
  },

  contact: {
    headline: "Lassen Sie uns sprechen",
    subheadline:
      "Kostenlose Erstberatung — unverbindlich und persönlich. Schreiben Sie mir, was Sie brauchen, und ich melde mich innerhalb von 48 Stunden mit konkreten Ideen.",
    cta: "Nachricht senden",
    successMessage: "Vielen Dank! Ich melde mich in Kürze bei Ihnen.",
  },

  nav: [
    { label: "Leistungen", href: "#leistungen" },
    { label: "Projekte", href: "#projekte" },
    { label: "Über mich", href: "#ueber-mich" },
    { label: "Kontakt", href: "#kontakt" },
  ],
};
