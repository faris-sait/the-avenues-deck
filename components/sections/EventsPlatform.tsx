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
    >
      <div className="grid flex-1 min-h-0 gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-stretch">
        <div className="min-h-[14rem] lg:min-h-0">
          <PosterTile
            variant="events-plaza"
            caption="Grand Plaza · event-ready volume"
            aspect="fill"
          />
        </div>

        <div className="grid min-h-0 gap-6 lg:grid-rows-[minmax(0,1fr)_auto]">
          <div className="min-h-[12rem] lg:min-h-[10rem]">
            <PosterTile
              variant="events-activation"
              caption="Brand takeover · retail media spine"
              aspect="fill"
            />
          </div>

          <div className="grid gap-5 border-t border-bone/10 pt-5 sm:grid-cols-2">
            <p className="text-bone/78 text-sm leading-relaxed sm:col-span-2">
              With 30M+ annual visitors, The Avenues is positioned as the
              largest always-on platform in the Gulf for experiential marketing
              and live programming.
            </p>
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
              className="inline-flex items-center justify-between gap-3 bg-gold text-ink px-6 py-3 mono text-[0.6rem] uppercase tracking-[0.4em] hover:bg-bone transition-colors"
            >
              Book a venue <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
