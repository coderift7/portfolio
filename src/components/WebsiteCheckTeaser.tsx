import { ArrowRight, Gauge, Search, ShieldCheck, Accessibility, Smartphone, Scale } from "lucide-react";

const categories = [
  { icon: Gauge, label: "Performance" },
  { icon: Search, label: "SEO" },
  { icon: ShieldCheck, label: "Sicherheit" },
  { icon: Accessibility, label: "Barrierefreiheit" },
  { icon: Smartphone, label: "Mobile" },
  { icon: Scale, label: "Recht" },
];

export default function WebsiteCheckTeaser() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 py-20">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-primary/[0.08] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Wie gut ist Ihre Website wirklich?
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-lg text-slate-300">
          Kostenloser Check in 6 Bereichen — Ergebnis per E-Mail in wenigen Minuten.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6">
          {categories.map((c) => (
            <div key={c.label} className="flex items-center gap-2 text-slate-300">
              <c.icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{c.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="/website-check/"
            className="btn-brand group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold"
          >
            Jetzt kostenlos prüfen
            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
