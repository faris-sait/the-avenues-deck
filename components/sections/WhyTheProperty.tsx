import { SectionShell } from "./SectionShell";
import { HEADLINE_KPIS, PROPERTY_FACTS } from "@/content/kpis";

export function WhyTheProperty() {
  const [hero, ...rest] = HEADLINE_KPIS;
  // Combine remaining headline KPIs (5) with one property fact for a single
  // 6-cell strip across the bottom.
  const strip = [...rest, PROPERTY_FACTS[0]];

  return (
    <SectionShell
      id="property"
      eyebrow="Why The Avenues"
      index="ii / ix"
      title={
        <>
          A <span className="italic-display text-gold">four-hour flight</span>
          <br />
          from four hundred million people.
        </>
      }
      subtitle={
        <>
          The Avenues sits at the commercial heart of Kuwait City — within a
          four-hour flight radius lies a consumer base of roughly 400 million
          across the Gulf, the Levant, and India.
        </>
      }
    >
      {/* Hero stat + supporting copy */}
      <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 items-end mb-8 flex-1 min-h-0">
        <div className="border-t border-bone/15 pt-5">
          <span className="block h-px w-24 bg-gold -mt-5 mb-5" />
          <div className="figure text-[clamp(4rem,11vw,9rem)] leading-[0.82]">
            1.2M<span className="text-gold align-baseline">m²</span>
          </div>
          <p className="mt-4 mono text-[0.6rem] uppercase tracking-[0.3em] text-bone/55">
            {hero.label}
          </p>
        </div>
        <div className="space-y-4 max-w-md">
          <p className="text-bone/80 text-base md:text-lg leading-relaxed">
            More built area than Vatican City. More retail than any single
            North-American mall. The product of a sixteen-year build cycle in{" "}
            <span className="text-gold">five phases</span>, with no
            interruption to live operations.
          </p>
          <p className="italic-display text-bone/55 text-base md:text-lg leading-snug">
            «&nbsp;The most ambitious mixed-use mall ever delivered in the
            Gulf.&nbsp;»
            <br />
            <span className="mono text-[0.55rem] uppercase tracking-[0.3em] not-italic text-bone/40">
              — Gensler · master architect
            </span>
          </p>
        </div>
      </div>

      {/* 6-cell KPI strip */}
      <div className="mt-auto grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-6">
        {strip.map((k) => (
          <div key={k.label} className="border-t border-bone/15 pt-4">
            <div className="figure text-2xl md:text-3xl">{k.value}</div>
            <div className="mt-2 mono text-[0.55rem] uppercase tracking-[0.28em] text-bone/55">
              {k.label}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
