import { SectionShell } from "@/components/sections/SectionShell";
import { VideoTile } from "@/components/ui/VideoTile";
import { Kpi } from "@/components/ui/Kpi";
import type { Kpi as KpiData } from "@/content/kpis";

const PRESTIGE_KPIS: KpiData[] = [
  {
    value: "Highest",
    label: "Average dwell time on property",
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
  {
    value: "Concierge",
    label: "On-floor service standard",
    source: {
      label: "The Avenues — Official site",
      url: "https://www.the-avenues.com/kuwait/en/about",
    },
  },
];

export default function PrestigePage() {
  return (
    <main className="pt-20">
      <section className="relative min-h-[80vh] flex items-end p-12 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          poster="/img/prestige-hero-poster.jpg"
          src="/video/prestige-hero.mp4"
          muted
          loop
          autoPlay
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="relative">
          <p className="uppercase tracking-[0.3em] text-xs text-gold mb-4">
            Prestige · Luxury wing
          </p>
          <h1 className="display text-6xl md:text-8xl text-bone max-w-3xl leading-[0.95]">
            The address for luxury in the Gulf.
          </h1>
        </div>
      </section>

      <SectionShell id="audience" eyebrow="Audience" title="Who shops Prestige.">
        <p className="max-w-2xl text-bone/85 text-lg mb-12">
          A consistent flow of Kuwaiti and GCC high-net-worth households, augmented by
          international visitors from Saudi Arabia, UAE, and Qatar. The deepest spending segments
          of the property concentrate here.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-12 max-w-3xl">
          {PRESTIGE_KPIS.map((k) => (
            <Kpi key={k.label} data={k} />
          ))}
        </div>
      </SectionShell>

      <SectionShell id="tenants" eyebrow="Tenants" title="Maisons in residence.">
        <div className="grid md:grid-cols-3 gap-6">
          <VideoTile
            poster="/img/prestige-t1-poster.jpg"
            srcMp4="/video/prestige-t1.mp4"
            caption="Flagship vitrines"
          />
          <VideoTile
            poster="/img/prestige-t2-poster.jpg"
            srcMp4="/video/prestige-t2.mp4"
            caption="Watch atelier"
          />
          <VideoTile
            poster="/img/prestige-t3-poster.jpg"
            srcMp4="/video/prestige-t3.mp4"
            caption="Couture floor"
          />
        </div>
        <p className="mt-12 text-bone/60 text-sm max-w-2xl italic">
          Tenant logos used in editorial context only. No endorsement implied.
          Flagship-opportunity slots available.
        </p>
      </SectionShell>

      <SectionShell id="activation" eyebrow="Activation" title="Imagined: a maison launch.">
        <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-center">
          <figure>
            <div className="aspect-video bg-charcoal relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-bone/40 text-xs uppercase tracking-[0.3em]">
                  Concept render placeholder
                </p>
              </div>
            </div>
            <figcaption className="text-xs uppercase tracking-[0.25em] opacity-50 mt-3">
              ⌬ AI-generated · Illustrative concept
            </figcaption>
          </figure>
          <p className="text-bone/85 text-lg">
            A two-week takeover of the Prestige concourse: vitrine refit, private salon, evening
            programming, and a closing event in Grand Plaza. Reach: 1.5M+ Prestige visitors over
            the activation window.
          </p>
        </div>
        <div className="mt-12">
          <a
            href="/#action"
            className="inline-block bg-gold text-ink px-8 py-3 uppercase tracking-[0.3em] text-xs hover:bg-gold/90"
          >
            Inquire about Prestige →
          </a>
        </div>
      </SectionShell>
    </main>
  );
}
