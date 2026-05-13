"use client";
import { useEffect, useState } from "react";

const NAV = [
  { id: "property", label: "Property" },
  { id: "districts", label: "Districts" },
  { id: "prestige", label: "Prestige" },
  { id: "grand-avenue", label: "Grand Avenue" },
  { id: "soku", label: "SoKu" },
  { id: "events", label: "Events" },
  { id: "action", label: "Inquire" },
];

interface Props {
  visible: boolean;
}

export function TopNav({ visible }: Props) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id);
            history.replaceState(null, "", `#${e.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-12 py-5 text-bone backdrop-blur-md bg-ink/40 border-b border-white/5">
        <a href="#reveal" className="display text-lg tracking-wider">
          The Avenues
        </a>
        <ul className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em]">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={`transition-opacity hover:opacity-100 ${
                  active === n.id ? "opacity-100 text-gold" : "opacity-60"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
