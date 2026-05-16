import { SectionShell } from "./SectionShell";
import { PosterTile } from "@/components/atmosphere/PosterTile";

export function SoKuYouth() {
  return (
    <SectionShell
      id="soku"
      eyebrow="SoKu · Youth & streetwear"
      index="vi / ix"
      tone="vault"
      title={
        <>
          Kuwait&apos;s <span className="italic-display text-gold">SoHo.</span>
        </>
      }
      subtitle={
        <>
          Streetwear, lifestyle tech, and youth fashion. SoKu is where Kuwait&apos;s
          under-30 audience comes for the brands that move first — and where
          activations targeting Gen-Z and younger millennials in the GCC find
          the highest evening footfall on property.
        </>
      }
    >
      <div className="grid md:grid-cols-12 gap-6 flex-1 min-h-0 items-stretch">
        <div className="md:col-span-7 min-h-0">
          <PosterTile variant="soku-evening" caption="SoKu · 21:00 KWT" aspect="fill" />
        </div>
        <div className="md:col-span-5 flex flex-col justify-between gap-6 min-h-0">
          <div className="space-y-6">
            <p className="figure text-6xl text-gold leading-none">21:00</p>
            <p className="mono text-[0.6rem] uppercase tracking-[0.3em] text-bone/55">
              Peak hour · evening
            </p>
            <p className="text-bone/80 leading-relaxed">
              SoKu peaks long after the rest of the property has slowed — the
              perfect window for product drops, micro-events, and influencer
              activations.
            </p>
          </div>
          <div className="border-t border-bone/15 pt-5">
            <p className="mono text-[0.6rem] uppercase tracking-[0.3em] text-bone/55 mb-3">
              Tenant categories
            </p>
            <ul className="grid grid-cols-2 gap-y-2 text-bone/75 text-sm">
              <li className="flex items-center gap-2"><span className="text-gold">◆</span> Streetwear</li>
              <li className="flex items-center gap-2"><span className="text-gold">◆</span> Sneakers</li>
              <li className="flex items-center gap-2"><span className="text-gold">◆</span> Lifestyle tech</li>
              <li className="flex items-center gap-2"><span className="text-gold">◆</span> Local labels</li>
              <li className="flex items-center gap-2"><span className="text-gold">◆</span> Skate / surf</li>
              <li className="flex items-center gap-2"><span className="text-gold">◆</span> K-pop & anime</li>
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
