"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { DISTRICTS } from "@/content/districts";

export function DistrictMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeId, setActiveId] = useState(DISTRICTS[2].id);
  const active = DISTRICTS.find((d) => d.id === (hovered ?? activeId)) ?? DISTRICTS[2];

  return (
    <SectionShell
      id="districts"
      eyebrow="Twelve Districts"
      index="iii / ix"
      title={
        <>
          Twelve neighborhoods.
          <br />
          <span className="italic-display text-gold">One destination.</span>
        </>
      }
      subtitle={
        <>
          The Avenues is master-planned as twelve distinct districts — each with
          its own architecture, tenant mix, and atmosphere — woven together
          beneath a single ETFE roof. Tap or hover any district to preview.
        </>
      }
    >
      <div className="grid lg:grid-cols-[1.7fr_1fr] gap-10 lg:gap-14 items-start">
        {/* Architectural plan */}
        <figure className="relative">
          <div className="flex items-center justify-between mb-4">
            <p className="mono text-[0.55rem] uppercase tracking-[0.4em] text-bone/40">
              Plan · figure 01
            </p>
            <p className="mono text-[0.55rem] uppercase tracking-[0.4em] text-bone/40">
              not to scale
            </p>
          </div>

          <svg
            viewBox="0 0 1040 440"
            className="w-full"
            role="img"
            aria-label="Plan of the 12 districts of The Avenues, Kuwait"
          >
            <defs>
              <pattern
                id="hatch"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(245,236,217,0.04)" strokeWidth="1" />
              </pattern>
              <linearGradient id="active-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d4b87f" />
                <stop offset="100%" stopColor="#9a8254" />
              </linearGradient>
            </defs>

            {/* Plot border */}
            <rect
              x="20"
              y="40"
              width="1000"
              height="380"
              fill="url(#hatch)"
              stroke="rgba(245,236,217,0.10)"
              strokeWidth="0.6"
              strokeDasharray="2 5"
            />

            {/* Tier labels */}
            <text x="36" y="65" fill="rgba(201,169,110,0.55)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="2">
              TIER · NORTH
            </text>
            <text x="36" y="225" fill="rgba(201,169,110,0.55)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="2">
              TIER · SOUTH
            </text>

            {/* Avenue spine between the two tiers */}
            <line
              x1="50"
              y1="220"
              x2="990"
              y2="220"
              stroke="rgba(201,169,110,0.18)"
              strokeWidth="0.6"
              strokeDasharray="4 4"
            />

            {/* North arrow */}
            <g transform="translate(1000, 70)">
              <circle cx="0" cy="0" r="14" fill="none" stroke="rgba(201,169,110,0.5)" strokeWidth="0.6" />
              <path d="M 0 -10 L 4 8 L 0 4 L -4 8 Z" fill="rgba(201,169,110,0.9)" />
              <text y="26" textAnchor="middle" fill="rgba(245,236,217,0.55)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="2">
                N
              </text>
            </g>

            {/* District cells */}
            {DISTRICTS.map((d, i) => {
              const isActive = hovered === d.id || (!hovered && d.id === active.id);
              return (
                <g
                  key={d.id}
                  onMouseEnter={() => setHovered(d.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => {
                    setActiveId(d.id);
                    setHovered(d.id);
                  }}
                  onBlur={() => setHovered(null)}
                  onClick={() => setActiveId(d.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={d.name}
                  className="cursor-pointer outline-none"
                >
                  <rect
                    x={d.shape.x}
                    y={d.shape.y}
                    width={d.shape.w}
                    height={d.shape.h}
                    fill={isActive ? "url(#active-fill)" : "rgba(245,236,217,0.04)"}
                    stroke={isActive ? "#c9a96e" : "rgba(245,236,217,0.22)"}
                    strokeWidth={isActive ? 1.2 : 0.7}
                    className="transition-all"
                  />
                  {/* Subtle inner outline */}
                  <rect
                    x={d.shape.x + 4}
                    y={d.shape.y + 4}
                    width={d.shape.w - 8}
                    height={d.shape.h - 8}
                    fill="none"
                    stroke={isActive ? "rgba(8,8,12,0.30)" : "rgba(245,236,217,0.07)"}
                    strokeWidth="0.4"
                  />
                  {/* Index numeral */}
                  <text
                    x={d.shape.x + 10}
                    y={d.shape.y + 18}
                    fill={isActive ? "rgba(8,8,12,0.65)" : "rgba(201,169,110,0.55)"}
                    fontSize="8.5"
                    fontFamily="var(--font-mono)"
                    letterSpacing="1.5"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </text>
                  {/* District name */}
                  <text
                    x={d.shape.x + d.shape.w / 2}
                    y={d.shape.y + d.shape.h / 2 + 4}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isActive ? "#08080c" : "#f5ecd9"}
                    fontSize="13"
                    fontFamily="var(--font-display)"
                    style={{
                      fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 0',
                      letterSpacing: "-0.01em",
                    }}
                    className="pointer-events-none transition-colors"
                  >
                    {d.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </figure>

        {/* Detail panel */}
        <div className="lg:sticky lg:top-32 min-h-[24rem]">
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-bone/15 pt-6"
            >
              <div className="flex items-baseline justify-between mb-6">
                <p className="eyebrow">{active.name}</p>
                <p className="mono text-[0.55rem] uppercase tracking-[0.4em] text-bone/40">
                  District {String(DISTRICTS.findIndex((d) => d.id === active.id) + 1).padStart(2, "0")}
                </p>
              </div>
              <h3 className="display text-3xl md:text-4xl leading-tight mb-6">
                {active.tagline}
              </h3>
              <p className="text-bone/80 mb-8 leading-relaxed">
                {active.description}
              </p>
              <ul className="mb-8 space-y-2">
                {active.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-bone/70 text-sm">
                    <span className="text-gold mt-1.5">┄</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {active.id === "prestige" && (
                <Link
                  href="/prestige"
                  className="inline-flex items-center gap-3 group"
                >
                  <span className="mono text-[0.6rem] uppercase tracking-[0.4em] text-gold">
                    Open the prestige module
                  </span>
                  <span className="block h-px w-10 bg-gold group-hover:w-20 transition-all duration-500" />
                </Link>
              )}
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
}
