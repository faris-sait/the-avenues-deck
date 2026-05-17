import { SectionShell } from "./SectionShell";
import { PosterTile } from "@/components/atmosphere/PosterTile";

export function GrandAvenue() {
  return (
    <SectionShell
      id="grand-avenue"
      eyebrow="Grand Avenue · F&B district"
      index="v / ix"
      tone="cream"
      title={
        <>
          A European boulevard,
          <br />
          <span className="italic-display">climate-controlled.</span>
        </>
      }
      subtitle={
        <>
          A 70-meter ETFE Circus dome opens over a stone-paved, tree-lined
          boulevard — a permanent European afternoon regardless of Kuwait&apos;s
          summer.
        </>
      }
    >
      <div className="grid lg:grid-cols-[1.55fr_1fr] gap-8 flex-1 min-h-0 items-stretch">
        <div className="min-h-0">
          <PosterTile variant="grand-circus" caption="The Circus · 70m ETFE dome" aspect="fill" />
        </div>
        <div className="flex flex-col justify-between gap-6 min-h-0">
          <div>
            <p className="figure text-[clamp(3.5rem,7vw,6rem)] text-ink leading-none">
              70<span className="text-gold">m</span>
            </p>
            <p className="mono text-[0.6rem] uppercase tracking-[0.3em] text-ink/55 mt-3">
              Free-span ETFE dome diameter
            </p>
            <p className="text-ink/75 leading-relaxed text-sm md:text-base mt-5">
              Designed by Gensler, the largest ETFE structure in the region.
              Light transmissive in winter, climate-buffered in summer.
            </p>
          </div>

          <div className="grid gap-5 border-t border-ink/15 pt-5 sm:grid-cols-3">
            <div>
              <p className="eyebrow text-ink/70 mb-2">F&B</p>
              <p className="text-ink/75 text-xs leading-relaxed">
                Highest dinner-hour footfall on property.
              </p>
            </div>
            <div>
              <p className="eyebrow text-ink/70 mb-2">Activation</p>
              <p className="text-ink/75 text-xs leading-relaxed">
                Patio takeovers under live daylight.
              </p>
            </div>
            <div>
              <p className="eyebrow text-ink/70 mb-2">Broadcast</p>
              <p className="text-ink/75 text-xs leading-relaxed">
                Camera-ready architecture, used for fashion broadcasts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
