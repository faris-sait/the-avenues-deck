import Link from "next/link";
import { SectionShell } from "./SectionShell";
import { PosterTile } from "@/components/atmosphere/PosterTile";

export function PrestigeLuxury() {
  return (
    <SectionShell
      id="prestige"
      eyebrow="Prestige · Luxury wing"
      index="iv / ix"
      tone="oxblood"
      title={
        <>
          The address for <span className="italic-display text-gold">luxury</span>
          <br />
          in the Gulf.
        </>
      }
      subtitle={
        <>
          A dedicated concourse with climate-controlled architecture by Gensler,
          concierge service on every floor, and the longest average dwell time
          on the property.
        </>
      }
    >
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 flex-1 min-h-0 items-stretch">
        {/* Hero poster */}
        <div className="min-h-0">
          <PosterTile variant="prestige-concourse" caption="Prestige atrium · double-height arrival" aspect="fill" />
        </div>

        {/* KPI stack */}
        <div className="flex flex-col justify-between gap-6 min-h-0">
          <div className="space-y-6">
            <div className="border-t border-bone/15 pt-4">
              <p className="figure text-4xl md:text-5xl text-gold">+38%</p>
              <p className="mono text-[0.55rem] uppercase tracking-[0.28em] text-bone/55 mt-2">
                Avg. spend vs. property baseline
              </p>
            </div>
            <div className="border-t border-bone/15 pt-4">
              <p className="figure text-4xl md:text-5xl text-gold">52 min</p>
              <p className="mono text-[0.55rem] uppercase tracking-[0.28em] text-bone/55 mt-2">
                Average dwell time — double the property average
              </p>
            </div>
            <div className="border-t border-bone/15 pt-4">
              <p className="figure text-4xl md:text-5xl text-gold">First</p>
              <p className="mono text-[0.55rem] uppercase tracking-[0.28em] text-bone/55 mt-2">
                Kuwait flagship address — for maisons opening here first
              </p>
            </div>
          </div>

          <Link
            href="/prestige"
            className="inline-flex items-center gap-4 group self-start"
          >
            <span className="mono text-[0.65rem] uppercase tracking-[0.4em] text-gold">
              Open the Prestige module
            </span>
            <span className="relative block h-px w-12 bg-gold/40 overflow-hidden">
              <span className="absolute inset-0 bg-gold translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </span>
            <span className="text-gold text-lg leading-none">→</span>
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
