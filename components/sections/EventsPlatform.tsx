import { SectionShell } from "./SectionShell";
import { PosterTile } from "@/components/atmosphere/PosterTile";

export function EventsPlatform() {
  return (
    <SectionShell
      id="events"
      eyebrow="Events & Platform"
      index="vii / ix"
      title={
        <>
          Not a building.
          <br />
          <span className="italic-display text-gold">A stage.</span>
        </>
      }
      subtitle={
        <>
          With 30M+ annual visitors, The Avenues is positioned as the largest
          always-on platform in the Gulf for experiential marketing and live
          programming.
        </>
      }
    >
      <div className="flex flex-col gap-6 flex-1 min-h-0">
        {/* Two posters */}
        <div className="grid md:grid-cols-2 gap-6 flex-1 min-h-0">
          <div className="min-h-0">
            <PosterTile variant="events-plaza" caption="Grand Plaza · concert" aspect="fill" />
          </div>
          <div className="min-h-0">
            <PosterTile variant="events-activation" caption="Brand takeover" aspect="fill" />
          </div>
        </div>

        {/* Three columns + CTA */}
        <div className="grid md:grid-cols-[1fr_1fr_1fr_auto] gap-8 items-end border-t border-bone/10 pt-5">
          <div>
            <p className="display text-xl md:text-2xl mb-1">Grand Plaza</p>
            <p className="text-bone/75 text-xs leading-relaxed">
              1,000+ capacity concerts, fashion shows, brand takeovers.
            </p>
          </div>
          <div>
            <p className="display text-xl md:text-2xl mb-1">Cultural moments</p>
            <p className="text-bone/75 text-xs leading-relaxed">
              National holidays, Ramadan, year-round festivals.
            </p>
          </div>
          <div>
            <p className="display text-xl md:text-2xl mb-1">Reach</p>
            <p className="text-bone/75 text-xs leading-relaxed">
              30M+ annual visitors — built-in audience.
            </p>
          </div>
          <a
            href="#action"
            className="inline-flex items-center gap-3 bg-gold text-ink px-6 py-3 mono text-[0.6rem] uppercase tracking-[0.4em] hover:bg-bone transition-colors whitespace-nowrap"
          >
            Book a venue <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </SectionShell>
  );
}
