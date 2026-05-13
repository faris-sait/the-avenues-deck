import { SectionShell } from "./SectionShell";
import { Kpi } from "@/components/ui/Kpi";
import { HEADLINE_KPIS, PROPERTY_FACTS } from "@/content/kpis";

export function WhyTheProperty() {
  return (
    <SectionShell
      id="property"
      eyebrow="Why The Avenues"
      title="A four-hour flight from 400 million people."
    >
      <p className="max-w-2xl text-bone/80 text-lg mb-16">
        The Avenues sits at the commercial heart of Kuwait City, served by Kuwait International Airport and connected to the broader GCC luxury market. Within a four-hour flight radius lies a consumer base of roughly 400 million across the Gulf, Levant, and India.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-12 mb-20">
        {HEADLINE_KPIS.map((k) => <Kpi key={k.label} data={k} />)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-12">
        {PROPERTY_FACTS.map((k) => <Kpi key={k.label} data={k} />)}
      </div>
    </SectionShell>
  );
}
