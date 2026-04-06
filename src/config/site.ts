import projectsData from "../../content/projects.json";
import faqData from "../../content/faq.json";

export const siteConfig = {
  name: "Michael Höger",
  role: "Webdesign & Digitale Lösungen",
  email: "michael@hoeger.dev",
  phone: "+49 162 9255254",
  location: "Deutschland",
  facebook: "https://www.facebook.com/profile.php?id=61575586966779",
  instagram: "https://www.instagram.com/hoeger_dev/",

  meta: {
    title: "Michael Höger – Webseiten, die Ihnen Kunden bringen",
    description:
      "Webseiten für kleine Unternehmen, die bei Google und KI-Assistenten wie ChatGPT gefunden werden. Kostenlose Erstberatung.",
  },

  hero: {
    greeting: "Hallo, ich bin Michael",
    headline: "Ihre nächsten Kunden\nsuchen Sie gerade.",
    subheadline:
      "Die Frage ist nur: Finden sie Sie — oder Ihre Konkurrenz? Ich baue Webseiten, die bei Google und sogar bei ChatGPT gefunden werden. Damit Anfragen kommen, ohne dass Sie etwas dafür tun müssen.",
    cta: "Kostenlos beraten lassen",
    ctaSecondary: "Beispiele ansehen",
  },

  uspBanner: {
    headline: "Darum bringt Ihre Webseite Ergebnisse",
    items: [
      {
        icon: "Bot",
        title: "Zukunftssicher",
        description:
          "Ihre Webseite wird auch von ChatGPT & Co. gefunden — nicht nur von Google. Das kann fast niemand.",
      },
      {
        icon: "Search",
        title: "Sichtbar ab Tag 1",
        description:
          "Keine Webseite, die keiner findet. Suchmaschinen-Optimierung ist bei mir immer dabei — kein teures Extra.",
      },
      {
        icon: "Zap",
        title: "Anfragen auf Autopilot",
        description:
          "Kundenanfragen landen direkt in Ihrem Postfach oder auf Ihrem Handy. Sie müssen nichts tun.",
      },
    ],
  },

  services: [
    {
      icon: "Globe",
      title: "Ihre neue Webseite",
      description:
        "Eine Webseite, die professionell aussieht, schnell lädt und auf dem Handy genauso gut funktioniert wie am Computer. Kein Technik-Kauderwelsch — ich kümmere mich um alles.",
    },
    {
      icon: "Bot",
      title: "Gefunden werden — auch von KI",
      description:
        "Immer mehr Menschen fragen ChatGPT oder Siri statt Google. Ich sorge dafür, dass Ihr Unternehmen auch dort empfohlen wird. Das bieten die wenigsten.",
    },
    {
      icon: "Search",
      title: "Bei Google nach oben",
      description:
        "Wenn jemand nach Ihrem Angebot sucht, sollte Ihre Webseite erscheinen — nicht die der Konkurrenz. Dafür sorge ich mit gezielter Suchmaschinen-Optimierung.",
    },
    {
      icon: "Zap",
      title: "Weniger Arbeit, mehr Anfragen",
      description:
        "Kontaktformulare, automatische E-Mails, Terminbuchung — ich richte alles so ein, dass Sie sich auf Ihr Kerngeschäft konzentrieren können.",
    },
    {
      icon: "ShieldCheck",
      title: "Barrierefrei & DSGVO-konform",
      description:
        "Seit 2025 ist Barrierefreiheit für viele Webseiten Pflicht (BFSG). Ich setze das von Anfang an um — sauber im Code, nicht als Overlay nachgerüstet. DSGVO und SSL sind selbstverständlich.",
    },
    {
      icon: "HeartHandshake",
      title: "Ein Ansprechpartner für alles",
      description:
        "Kein Callcenter, keine Warteschleife. Sie sprechen immer direkt mit mir. Und wenn etwas nicht passt, finden wir eine Lösung — versprochen.",
    },
  ],

  projects: projectsData.items,

  about: {
    headline: "Kein Agentur-Sprech.\nKeine Warteschleife.",
    text: "Ich bin Michael — Ihr persönlicher Ansprechpartner für alles Digitale. Wenn Sie eine Frage haben, schreiben Sie mir. Wenn etwas geändert werden soll, erledige ich das. Keine Tickets, keine Abteilungen, kein Warten. Und das Beste: Ich sorge dafür, dass Ihre Webseite nicht nur bei Google gefunden wird, sondern auch von KI-Assistenten wie ChatGPT empfohlen wird. Das bieten die wenigsten — und genau das ist Ihr Vorsprung.",
    stats: [
      { value: "14", label: "Tage bis Ihre Seite online ist" },
      { value: "100%", label: "Festpreis — keine versteckten Kosten" },
      { value: "<24h", label: "Antwortzeit — persönlich" },
    ],
  },

  guarantee: {
    headline: "Mein Versprechen an Sie",
    text: "Wenn Sie mit dem Ergebnis nicht zufrieden sind, arbeite ich so lange nach, bis es passt — kostenlos. Ihre Zufriedenheit ist keine Floskel, sondern meine Geschäftsgrundlage.",
  },

  contact: {
    headline: "In 10 Minuten wissen Sie mehr",
    subheadline:
      "Schreiben Sie mir, was Sie vorhaben. Kein Verkaufsgespräch, kein Druck — ich sage Ihnen ehrlich, ob und wie eine Webseite Ihnen helfen kann. Innerhalb von 24 Stunden melde ich mich persönlich.",
    cta: "Nachricht senden",
    successMessage:
      "Vielen Dank für Ihre Nachricht! Ich melde mich persönlich bei Ihnen — spätestens in 24 Stunden.",
  },

  faq: faqData.items,

  nav: [
    { label: "Leistungen", href: "#leistungen" },
    { label: "Projekte", href: "#projekte" },
    { label: "Über mich", href: "#ueber-mich" },
    { label: "FAQ", href: "#faq" },
    { label: "Blog", href: "/blog/" },
    { label: "Kontakt", href: "#kontakt" },
  ],
};
