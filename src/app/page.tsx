import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UspBanner from "@/components/UspBanner";
import Services from "@/components/Services";

const Process = dynamic(() => import("@/components/Process"));
const Projects = dynamic(() => import("@/components/Projects"));
const About = dynamic(() => import("@/components/About"));
const Guarantee = dynamic(() => import("@/components/Guarantee"));
const Faq = dynamic(() => import("@/components/Faq"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"));

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <UspBanner />
        <Services />
        <Process />
        <Projects />
        <About />
        <Guarantee />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
