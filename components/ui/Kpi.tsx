import type { Kpi as KpiData } from "@/content/kpis";

export function Kpi({ data }: { data: KpiData }) {
  return (
    <div className="border-t border-bone/15 pt-4">
      <div className="display text-4xl md:text-5xl leading-none">{data.value}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] opacity-60">{data.label}</div>
    </div>
  );
}
