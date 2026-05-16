import Image from "next/image";
import Link from "next/link";
import { SectionShell } from "@/components/sections/SectionShell";
import { PosterTile } from "@/components/atmosphere/PosterTile";
import { Kpi } from "@/components/ui/Kpi";
import type { Kpi as KpiData } from "@/content/kpis";

const PRESTIGE_KPIS: KpiData[] = [
  {
    value: "+38%",
    label: "Avg. spend vs. property baseline",
    source: {
      label: "The Avenues — Official site",
      url: "https://www.the-avenues.com/kuwait/en/about",
    },
  },
  {
    value: "52 min",
    label: "Average dwell time",
    source: {
      label: "The Avenues — Official site",
      url: "https://www.the-avenues.com/kuwait/en/about",
    },
  },
  {
    value: "GCC",
    label: "Highest-net-worth audience reach",
    source: {
      label: "The Avenues (Kuwait) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/The_Avenues_(Kuwait)",
    },
  },
];

export default function PrestigePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-end pb-24 px-6 md:px-16 overflow-hidden bg-[#1a0d0d]">
        {/* Atmospheric backdrop — real Prestige concourse photograph */}
        <div className="absolute inset-0">
          <Image
            src="/img/districts/prestige.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(26,13,13,0.55) 0%, rgba(74,28,28,0.45) 40%, rgba(10,6,6,0.92) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 70% 90%, rgba(201,169,110,0.30) 0%, rgba(74,28,28,0.20) 40%, transparent 75%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0606]/85 via-transparent to-[#1a0d0d]/40" />
        </div>

        <div className="relative z-10 max-w-6xl">
          <p className="eyebrow mb-8 flex items-center gap-3">
            <span className="lozenge" />
            Prestige · Sub-module
          </p>
          <h1 className="display text-[clamp(3rem,9vw,9rem)] leading-[0.88] text-bone mb-10">
            The address
            <br />
            for <span className="italic-display text-gold">luxury</span>
            <br />
            in the Gulf.
          </h1>
          <p className="text-bone/75 text-lg max-w-2xl leading-relaxed">
            A purpose-built concourse for the maisons. Concierge floors,
            dedicated valet, Gensler-designed architecture, and the longest
            average dwell time on the property.
          </p>
        </div>

        <div className="absolute top-24 right-6 md:right-16 mono text-[0.55rem] uppercase tracking-[0.4em] opacity-30 text-bone">
          deep dive · 01 / 04
        </div>
      </section>

      <SectionShell id="audience" eyebrow="Audience" index="02 / 04" title="Who shops Prestige.">
        <p className="max-w-2xl text-bone/85 text-lg mb-14 leading-relaxed">
          A consistent flow of Kuwaiti and GCC high-net-worth households,
          augmented by international visitors from Saudi Arabia, the UAE, and
          Qatar. The deepest spending segments of the property concentrate here.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-12 max-w-4xl">
          {PRESTIGE_KPIS.map((k) => (
            <Kpi key={k.label} data={k} />
          ))}
        </div>
      </SectionShell>

      <SectionShell id="tenants" eyebrow="Tenants" index="03 / 04" title="Maisons in residence.">
        <div className="grid md:grid-cols-3 gap-6">
          <PosterTile variant="prestige-vitrines" caption="Flagship vitrines" />
          <PosterTile variant="prestige-watches" caption="Watch atelier" />
          <PosterTile variant="prestige-couture" caption="Couture floor" />
        </div>
        <p className="mt-12 text-bone/50 text-sm max-w-2xl italic-display">
          Tenant compositions illustrated for editorial context. Flagship slots
          and atelier opportunities currently available.
        </p>
      </SectionShell>

      <SectionShell id="activation" eyebrow="Activation" index="04 / 04" title="Imagined: a maison launch.">
        <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-start">
          <PosterTile variant="events-activation" caption="Step-and-repeat · concept" />
          <div className="space-y-6">
            <p className="text-bone/85 text-lg leading-relaxed">
              A two-week takeover of the Prestige concourse: vitrine refit,
              private salon, evening programming, and a closing event in Grand
              Plaza.
            </p>
            <div className="border-t border-bone/15 pt-5">
              <p className="figure text-4xl text-gold">1.5M+</p>
              <p className="mono text-[0.6rem] uppercase tracking-[0.3em] text-bone/55 mt-3">
                Prestige visitors during the activation window
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <Link
            href="/#action"
            className="inline-flex items-center gap-4 bg-gold text-ink px-8 py-5 mono text-[0.65rem] uppercase tracking-[0.4em] hover:bg-bone transition-colors"
          >
            <span>Inquire about Prestige</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </SectionShell>
    </main>
  );
}
