import { SectionShell } from "./SectionShell";
import { VideoTile } from "@/components/ui/VideoTile";

export function PrestigeLuxury() {
  return (
    <SectionShell
      id="prestige"
      eyebrow="Prestige"
      title="The largest luxury destination in Kuwait."
    >
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <VideoTile poster="/img/prestige-1-poster.jpg" srcMp4="/video/prestige-1.mp4" caption="Concourse" />
        <VideoTile poster="/img/prestige-2-poster.jpg" srcMp4="/video/prestige-2.mp4" caption="Maison flagships" />
        <VideoTile poster="/img/prestige-3-poster.jpg" srcMp4="/video/prestige-3.mp4" caption="Atelier dining" />
      </div>
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
        <p className="text-bone/85 text-lg">
          Prestige is purpose-built for luxury. Tenants benefit from concierge service, dedicated valet, climate-controlled architecture by Gensler, and the longest average dwell time at the property.
        </p>
        <p className="text-bone/85 text-lg">
          For maisons opening their first Kuwait flagship, this is the address. For sponsors, this is where the GCC's highest-net-worth audiences spend their afternoons.
        </p>
      </div>
      <div className="mt-12">
        <a
          href="/prestige"
          className="inline-block text-xs uppercase tracking-[0.3em] text-gold border-b border-gold pb-1 hover:opacity-80"
        >
          Explore the Prestige module →
        </a>
      </div>
    </SectionShell>
  );
}
