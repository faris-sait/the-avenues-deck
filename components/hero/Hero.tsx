"use client";
import { HeroScene } from "@/components/atmosphere/HeroScene";

/**
 * The cinematic hero — the opening section of the deck. Renders the headline
 * statement over the atmospheric HeroScene, with a link into the tour below.
 */
export function Hero() {
  return (
    <section
      id="reveal"
      className="relative min-h-screen w-full overflow-hidden"
    >
      <HeroScene />

      {/* Main typographic statement */}
      <div className="relative z-10 flex min-h-screen flex-col justify-end pb-24 md:pb-32 px-6 md:px-16">
        <div className="max-w-6xl">
          <h1 className="display text-[clamp(3rem,9vw,9.5rem)] leading-[0.88] text-bone">
            <span className="block">Thirteen million</span>
            <span className="block">
              <span className="text-gold">square feet</span>
              <span className="italic-display text-bone/80"> of</span>
            </span>
            <span className="block italic-display">ambition.</span>
          </h1>

          <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-10 max-w-5xl">
            <p className="text-bone/75 max-w-md text-lg leading-relaxed">
              Twelve districts. One destination. The second-largest mall on Earth,
              shaping how thirty million people a year shop, dine, and gather.
            </p>
            <a
              href="#property"
              className="group inline-flex items-center gap-4 self-start md:self-end"
            >
              <span className="mono text-[0.65rem] uppercase tracking-[0.4em] text-bone/65 group-hover:text-gold transition-colors">
                Begin the tour
              </span>
              <span className="relative block h-px w-16 bg-bone/40 overflow-hidden">
                <span className="absolute inset-0 bg-gold translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              </span>
              <span className="text-gold text-lg leading-none">↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom-left meta */}
      <div className="absolute bottom-8 left-6 md:left-16 z-10 hidden md:block">
        <div className="text-bone/40 mono text-[0.55rem] uppercase tracking-[0.4em]">
          slide 01 / 09
        </div>
      </div>
    </section>
  );
}
