import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import UspBanner from "@/components/UspBanner";
import Services from "@/components/Services";

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
