import { SectionShell } from "./SectionShell";
import { VideoTile } from "@/components/ui/VideoTile";

export function EventsPlatform() {
  return (
    <SectionShell
      id="events"
      eyebrow="Events & Platform"
      title="Not a building. A stage."
    >
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <VideoTile poster="/img/events-1-poster.jpg" srcMp4="/video/events-1.mp4" caption="Grand Plaza concert" />
        <VideoTile poster="/img/events-2-poster.jpg" srcMp4="/video/events-2.mp4" caption="Brand activation" />
      </div>
      <div className="grid md:grid-cols-3 gap-12 max-w-5xl">
        <div>
          <h3 className="display text-2xl mb-3">Grand Plaza</h3>
          <p className="text-bone/75 text-sm">
            Open-air-feel arena designed for live programming, fashion shows, and brand takeovers.
          </p>
        </div>
        <div>
          <h3 className="display text-2xl mb-3">Cultural moments</h3>
          <p className="text-bone/75 text-sm">
            National holiday celebrations, Ramadan programming, year-round festivals.
          </p>
        </div>
        <div>
          <h3 className="display text-2xl mb-3">Always-on platform</h3>
          <p className="text-bone/75 text-sm">
            30M+ annual visitors. A built-in audience for product launches and experiential marketing.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
