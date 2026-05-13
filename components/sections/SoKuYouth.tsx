import { SectionShell } from "./SectionShell";
import { VideoTile } from "@/components/ui/VideoTile";

export function SoKuYouth() {
  return (
    <SectionShell
      id="soku"
      eyebrow="SoKu"
      title="Kuwait's SoHo."
    >
      <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-center">
        <div className="space-y-5">
          <p className="text-bone/85 text-lg">
            Streetwear, lifestyle tech, and youth fashion. SoKu is where Kuwait's under-30 audience comes for the brands that move first.
          </p>
          <p className="text-bone/70">
            For activations targeting Gen-Z and younger millennials in the GCC, SoKu has the highest evening footfall in the property.
          </p>
        </div>
        <VideoTile poster="/img/soku-1-poster.jpg" srcMp4="/video/soku-1.mp4" caption="Evening" />
      </div>
    </SectionShell>
  );
}
