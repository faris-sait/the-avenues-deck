"use client";
import { useEffect, useState } from "react";

const RAIL = [
  { id: "reveal", label: "Welcome" },
  { id: "property", label: "Property" },
  { id: "districts", label: "Districts" },
  { id: "prestige", label: "Prestige" },
  { id: "grand-avenue", label: "Grand Avenue" },
  { id: "soku", label: "SoKu" },
  { id: "events", label: "Events" },
  { id: "recognition", label: "Recognition" },
  { id: "action", label: "Inquire" },
];

export function ProgressRail({ visible }: { visible: boolean }) {
  const [active, setActive] = useState("reveal");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    RAIL.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <ul
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-5 transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Section progress"
    >
      {RAIL.map(({ id, label }, idx) => {
        const isActive = active === id;
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-label={label}
              className="group flex items-center justify-end gap-3"
            >
              <span
                className={`mono text-[0.55rem] uppercase tracking-[0.3em] transition-all duration-300 ${
                  isActive
                    ? "text-gold opacity-100 translate-x-0"
                    : "text-bone/40 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
                }`}
              >
                {String(idx + 1).padStart(2, "0")} · {label}
              </span>
              <span
                className={`block h-px transition-all duration-500 ${
                  isActive
                    ? "bg-gold w-8"
                    : "bg-bone/30 w-3 group-hover:w-5 group-hover:bg-bone/60"
                }`}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
