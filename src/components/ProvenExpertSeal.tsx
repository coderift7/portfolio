import Image from "next/image";

const PROFILE_URL =
  "https://www.provenexpert.com/de-de/michael-hoeger-it-beratung-webdesign/";

export default function ProvenExpertSeal() {
  return (
    <section
      id="bewertungen"
      aria-label="Kundenbewertungen"
      className="flex justify-center px-5 py-16 sm:px-6 sm:py-20"
    >
      <a
        href={PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bewertungen für Michael Höger auf ProvenExpert öffnen"
        className="inline-block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#097E92] dark:focus-visible:outline-[#5EEAD4]"
      >
        <Image
          src="/images/provenexpert-bewertungssiegel-hoeger.png"
          width={180}
          height={216}
          loading="eager"
          alt="ProvenExpert-Bewertungssiegel für Michael Höger mit einer Kundenbewertung, Stand 13. September 2026"
          className="block h-auto w-[180px] max-w-full"
        />
      </a>
    </section>
  );
}
