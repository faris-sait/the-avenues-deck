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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
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
      className={`fixed top-0 inset-x-0 z-40 backdrop-blur-md border-b transition-all duration-700 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      } ${scrolled ? "bg-ink/85 border-bone/10" : "bg-ink/55 border-bone/5"}`}
    >
      <div className="mx-auto max-w-[1500px] flex items-center justify-between px-6 md:px-12 py-5 text-bone">
        <a href="#reveal" className="group inline-flex items-center gap-3">
          <span className="lozenge group-hover:rotate-90 transition-transform duration-700" />
          <span className="display text-lg tracking-tight">
            The Avenues
          </span>
          <span className="mono text-[0.55rem] uppercase tracking-[0.4em] text-bone/40 hidden md:inline">
            · Kuwait
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-7 text-[0.65rem] uppercase tracking-[0.35em] mono">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={`relative inline-block py-1 transition-all duration-300 ${
                  active === n.id ? "text-gold" : "text-bone/55 hover:text-bone"
                }`}
              >
                {n.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-500 ${
                    active === n.id ? "w-full" : "w-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#action"
          className="hidden md:inline-flex items-center gap-2 mono text-[0.6rem] uppercase tracking-[0.4em] border border-bone/20 hover:border-gold hover:text-gold transition-colors px-4 py-2"
        >
          Inquire <span aria-hidden>→</span>
        </a>
      </div>
    </nav>
  );
}
