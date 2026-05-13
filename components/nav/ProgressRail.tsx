"use client";
import { useEffect, useState } from "react";

const RAIL = [
  "reveal",
  "property",
  "districts",
  "prestige",
  "grand-avenue",
  "soku",
  "events",
  "recognition",
  "action",
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
    RAIL.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <ul
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 hidden md:flex transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Section progress"
    >
      {RAIL.map((id) => (
        <li key={id}>
          <a
            href={`#${id}`}
            aria-label={id}
            className={`block w-1.5 h-1.5 rounded-full transition-all ${
              active === id ? "bg-gold scale-150" : "bg-bone/30 hover:bg-bone/60"
            }`}
          />
        </li>
      ))}
    </ul>
  );
}
