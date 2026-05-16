import type { Kpi as KpiData } from "@/content/kpis";

interface Props {
  data: KpiData;
  size?: "sm" | "md" | "lg";
  tone?: "bone" | "ink";
}

export function Kpi({ data, size = "md", tone = "bone" }: Props) {
  const sizeClass =
    size === "lg"
      ? "text-6xl md:text-7xl"
      : size === "sm"
      ? "text-3xl md:text-4xl"
      : "text-5xl md:text-6xl";
  const ruleColor = tone === "ink" ? "border-ink/15" : "border-bone/15";
  const labelColor = tone === "ink" ? "text-ink/55" : "text-bone/55";

  return (
    <div className={`group border-t ${ruleColor} pt-5 relative`}>
      <span className="absolute top-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-700 ease-out" />
      <div className={`figure ${sizeClass}`}>{data.value}</div>
      <div className={`mt-3 mono text-[0.62rem] uppercase tracking-[0.32em] ${labelColor}`}>
        {data.label}
      </div>
    </div>
  );
}
