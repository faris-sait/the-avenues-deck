"use client";
import { useState } from "react";
import Link from "next/link";
import { SectionShell } from "./SectionShell";
import { DISTRICTS } from "@/content/districts";

export function DistrictMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = DISTRICTS.find((d) => d.id === hovered);

  return (
    <SectionShell
      id="districts"
      eyebrow="12 Districts"
      title="Twelve neighborhoods. One destination."
    >
      <div className="grid md:grid-cols-[1.5fr_1fr] gap-12 items-start">
        <svg
          viewBox="0 0 1000 600"
          className="w-full"
          role="img"
          aria-label="Map of the 12 districts of The Avenues"
        >
          {DISTRICTS.map((d) => {
            const isActive = hovered === d.id;
            return (
              <g
                key={d.id}
                onMouseEnter={() => setHovered(d.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(d.id)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
                role="link"
                aria-label={d.name}
                className="cursor-pointer outline-none"
              >
                <rect
                  x={d.shape.x}
                  y={d.shape.y}
                  width={d.shape.w}
                  height={d.shape.h}
                  rx={6}
                  fill={isActive ? "#c9a96e" : "rgba(244,237,228,0.06)"}
                  stroke={isActive ? "#c9a96e" : "rgba(244,237,228,0.25)"}
                  strokeWidth={1}
                  className="transition-colors"
                />
                <text
                  x={d.shape.x + d.shape.w / 2}
                  y={d.shape.y + d.shape.h / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isActive ? "#0a0a0a" : "#f4ede4"}
                  fontSize="14"
                  fontFamily="var(--font-display)"
                  className="pointer-events-none transition-colors"
                >
                  {d.name}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="min-h-64 md:sticky md:top-32">
          {active ? (
            <article>
              <p className="uppercase tracking-[0.3em] text-xs text-gold mb-3">
                {active.name}
              </p>
              <h3 className="display text-3xl mb-4">{active.tagline}</h3>
              <p className="text-bone/80 mb-6">{active.description}</p>
              <ul className="text-bone/70 text-sm space-y-1 mb-6">
                {active.features.map((f) => (
                  <li key={f}>— {f}</li>
                ))}
              </ul>
              {active.id === "prestige" && (
                <Link
                  href="/prestige"
                  className="inline-block text-xs uppercase tracking-[0.3em] text-gold border-b border-gold pb-1 hover:opacity-80"
                >
                  Explore Prestige →
                </Link>
              )}
            </article>
          ) : (
            <p className="text-bone/50 italic">Hover or focus a district to explore.</p>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
