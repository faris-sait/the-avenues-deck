import { SectionShell } from "./SectionShell";
import { PaperCard } from "@/components/ui/PaperCard";

export function Recognition() {
  return (
    <SectionShell
      id="recognition"
      eyebrow="Recognition & Credentials"
      index="viii / ix"
      title={
        <>
          Recently recognized.
          <br />
          <span className="italic-display text-gold">Globally credentialed.</span>
        </>
      }
      subtitle={
        <>
          The Avenues is not aspirational. It is recognized — globally
          credentialed by the bodies that matter to the brands and partners
          who choose it.
        </>
      }
    >
      <div className="flex flex-col gap-6 flex-1 min-h-0">
        <div className="grid md:grid-cols-3 gap-5 flex-1 min-h-0">
          <PaperCard className="flex flex-col">
            <p className="eyebrow text-ink/60 mb-4">2024 — 2025</p>
            <p className="display text-2xl md:text-3xl mb-3 leading-tight">
              World Branding Awards
            </p>
            <p className="text-ink/75 text-sm leading-relaxed">
              Winner — Shopping mall category, Kuwait and region.
            </p>
            <div className="rule-ornament text-ink/30 mt-auto pt-5">
              <span className="lozenge" />
            </div>
          </PaperCard>
          <PaperCard className="flex flex-col">
            <p className="eyebrow text-ink/60 mb-4">2025</p>
            <p className="display text-2xl md:text-3xl mb-3 leading-tight">
              LEED Silver
            </p>
            <p className="text-ink/75 text-sm leading-relaxed">
              First mall in Kuwait certified for operations &amp; maintenance.
            </p>
            <div className="rule-ornament text-ink/30 mt-auto pt-5">
              <span className="lozenge" />
            </div>
          </PaperCard>
          <PaperCard className="flex flex-col">
            <p className="eyebrow text-ink/60 mb-4">Pedigree</p>
            <p className="display text-2xl md:text-3xl mb-3 leading-tight">
              Gensler · Mabanee
            </p>
            <p className="text-ink/75 text-sm leading-relaxed">
              Master-architected by Gensler. Owned by Mabanee — sovereign-backed.
            </p>
            <div className="rule-ornament text-ink/30 mt-auto pt-5">
              <span className="lozenge" />
            </div>
          </PaperCard>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 max-w-5xl">
          {[
            { v: "16 yrs", l: "Operating history" },
            { v: "5 phases", l: "Built without operational closure" },
            { v: "30M+", l: "Annual visitors" },
            { v: "1,100+", l: "Tenants" },
          ].map((k) => (
            <div key={k.l} className="border-t border-bone/15 pt-3">
              <p className="figure text-xl md:text-2xl">{k.v}</p>
              <p className="mt-2 mono text-[0.55rem] uppercase tracking-[0.28em] text-bone/55">
                {k.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
