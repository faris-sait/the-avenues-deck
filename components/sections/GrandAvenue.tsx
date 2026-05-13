import { SectionShell } from "./SectionShell";
import { VideoTile } from "@/components/ui/VideoTile";

export function GrandAvenue() {
  return (
    <SectionShell
      id="grand-avenue"
      eyebrow="Grand Avenue"
      title="A European boulevard, climate-controlled."
      tone="cream"
    >
      <div className="grid md:grid-cols-[2fr_1fr] gap-10 items-center mb-12">
        <VideoTile poster="/img/grand-1-poster.jpg" srcMp4="/video/grand-1.mp4" caption="The Circus under ETFE" aspect="video" />
        <div className="space-y-5">
          <p className="text-ink/85 text-lg">
            A 70-meter ETFE dome opens over a stone-paved, tree-lined boulevard. Diners eat under daylight that never fades.
          </p>
          <p className="text-ink/70">
            Designed by Gensler, Grand Avenue redefines what an indoor F&B district can be — a permanent European afternoon, regardless of Kuwait's summer.
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <VideoTile poster="/img/grand-2-poster.jpg" srcMp4="/video/grand-2.mp4" caption="Boulevard" aspect="portrait" />
        <VideoTile poster="/img/grand-3-poster.jpg" srcMp4="/video/grand-3.mp4" caption="Dining" aspect="portrait" />
        <VideoTile poster="/img/grand-4-poster.jpg" srcMp4="/video/grand-4.mp4" caption="ETFE detail" aspect="portrait" />
      </div>
    </SectionShell>
  );
}
