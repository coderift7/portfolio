import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UspBanner from "@/components/UspBanner";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <UspBanner />
        <Services />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
