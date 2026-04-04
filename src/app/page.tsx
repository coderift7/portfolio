import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UspBanner from "@/components/UspBanner";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Guarantee from "@/components/Guarantee";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
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
