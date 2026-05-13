import { SectionShell } from "./SectionShell";
import { PaperCard } from "@/components/ui/PaperCard";

export function Recognition() {
  return (
    <SectionShell
      id="recognition"
      eyebrow="Recognition"
      title="Recently recognized. Globally credentialed."
    >
      <div className="grid md:grid-cols-3 gap-6">
        <PaperCard>
          <p className="uppercase tracking-[0.3em] text-xs text-ink/60 mb-3">2024–25</p>
          <h3 className="display text-2xl mb-3">World Branding Awards</h3>
          <p className="text-ink/75 text-sm">Winner — Shopping mall category, Kuwait and region.</p>
        </PaperCard>
        <PaperCard>
          <p className="uppercase tracking-[0.3em] text-xs text-ink/60 mb-3">2025</p>
          <h3 className="display text-2xl mb-3">LEED Silver</h3>
          <p className="text-ink/75 text-sm">First mall in Kuwait certified for operations and maintenance.</p>
        </PaperCard>
        <PaperCard>
          <p className="uppercase tracking-[0.3em] text-xs text-ink/60 mb-3">Pedigree</p>
          <h3 className="display text-2xl mb-3">Gensler · Mabanee</h3>
          <p className="text-ink/75 text-sm">Master-architected by Gensler. Owned and operated by Mabanee.</p>
        </PaperCard>
      </div>
    </SectionShell>
  );
}
