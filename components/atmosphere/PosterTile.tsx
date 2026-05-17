import Image from "next/image";

/**
 * An editorial image tile keyed by `variant` for backward-compatibility.
 * Each variant resolves to official photography of The Avenues from
 * /public/img/districts/* and is framed with corner ticks, a grain layer,
 * and an optional caption to match the deck's paper/architectural plate
 * language.
 */

type Variant =
  | "prestige-concourse"
  | "prestige-maison"
  | "prestige-atelier"
  | "prestige-vitrines"
  | "prestige-watches"
  | "prestige-couture"
  | "grand-circus"
  | "grand-boulevard"
  | "grand-dining"
  | "grand-etfe"
  | "soku-evening"
  | "events-plaza"
  | "events-activation";

interface Plate {
  src: string;
  alt: string;
  /** Tailwind `object-position` keyword to bias the crop. */
  position?: string;
  /** Warm cast applied as an overlay mix-blend layer. */
  tint?: "warm" | "cool" | "amber" | "none";
}

// Each plate biases its `objectPosition` so the most editorially important
// part of the photo (the dome, the storefronts, the people) survives the
// `object-cover` crop at the section's actual tile aspect ratio.
const PLATES: Record<Variant, Plate> = {
  "prestige-concourse": {
    src: "/img/districts/prestige-atrium-official.jpg",
    alt: "The Prestige atrium at The Avenues, Kuwait",
    position: "center 54%",
    tint: "amber",
  },
  "prestige-maison": {
    src: "/img/districts/prestige-lifestyle-official.jpg",
    alt: "Luxury clientele in the Prestige district at The Avenues",
    position: "34% 45%",
    tint: "warm",
  },
  "prestige-atelier": {
    src: "/img/districts/prestige-corridor-official.jpg",
    alt: "Luxury retail corridor in the Prestige district at The Avenues",
    position: "center 50%",
    tint: "warm",
  },
  "prestige-vitrines": {
    src: "/img/districts/prestige-corridor-official.jpg",
    alt: "Luxury retail corridor in the Prestige district at The Avenues",
    position: "center 50%",
    tint: "amber",
  },
  "prestige-watches": {
    src: "/img/districts/prestige-lifestyle-official.jpg",
    alt: "Luxury shopper in the Prestige district at The Avenues",
    position: "34% 45%",
    tint: "warm",
  },
  "prestige-couture": {
    src: "/img/districts/prestige-dome-official.jpg",
    alt: "The glass-domed atrium of the Prestige district at The Avenues",
    position: "center 34%",
    tint: "warm",
  },
  "grand-circus": {
    src: "/img/districts/grand-avenue-dome-official.jpg",
    alt: "The Circus — 70m ETFE dome over Grand Avenue",
    position: "center 48%",
    tint: "warm",
  },
  "grand-boulevard": {
    src: "/img/districts/grand-avenue-gardens-official.jpg",
    alt: "Grand Avenue boulevard at The Avenues",
    position: "center 52%",
    tint: "warm",
  },
  "grand-dining": {
    src: "/img/districts/grand-avenue-gardens-official.jpg",
    alt: "Grand Avenue dining and gardens",
    position: "center 52%",
    tint: "warm",
  },
  "grand-etfe": {
    src: "/img/districts/grand-avenue-dome-official.jpg",
    alt: "The ETFE roof above Grand Avenue",
    position: "center 28%",
    tint: "cool",
  },
  "soku-evening": {
    src: "/img/districts/soku-official.jpg",
    alt: "SoKu district at The Avenues",
    position: "center 52%",
    tint: "cool",
  },
  "events-plaza": {
    src: "/img/districts/grand-plaza-official.jpg",
    alt: "Grand Plaza events venue at The Avenues",
    position: "center 44%",
    tint: "amber",
  },
  "events-activation": {
    src: "/img/districts/events-activation-official.jpg",
    alt: "High-footfall activation corridor at The Avenues",
    position: "center 50%",
    tint: "cool",
  },
};

interface Props {
  variant: Variant;
  caption?: string;
  aspect?: "video" | "square" | "portrait" | "fill";
  priority?: boolean;
  /** Optional `sizes` override. Defaults to a value sized for two-column section grids. */
  sizes?: string;
}

export function PosterTile({
  variant,
  caption,
  aspect = "video",
  priority = false,
  sizes = "(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 100vw",
}: Props) {
  const plate = PLATES[variant];
  const useFill = aspect === "fill";
  const aspectClass = useFill
    ? "flex-1 min-h-0"
    : aspect === "square"
    ? "aspect-square"
    : aspect === "portrait"
    ? "aspect-[3/4]"
    : "aspect-video";

  // A whisper of colour plus a soft bottom scrim — enough to ground the tile
  // in the dark deck without the photo reading muddy.
  const tintLayer =
    plate.tint === "amber"
      ? "linear-gradient(180deg, rgba(201,169,110,0.04) 0%, rgba(74,38,18,0.07) 62%, rgba(8,8,12,0.24) 100%)"
      : plate.tint === "cool"
      ? "linear-gradient(180deg, rgba(40,55,90,0.05) 0%, rgba(8,8,12,0.05) 55%, rgba(8,8,12,0.24) 100%)"
      : plate.tint === "warm"
      ? "linear-gradient(180deg, rgba(245,236,217,0.02) 0%, rgba(74,38,18,0.05) 60%, rgba(8,8,12,0.24) 100%)"
      : "linear-gradient(180deg, transparent 64%, rgba(8,8,12,0.22) 100%)";

  return (
    <figure className={`group ${useFill ? "flex flex-col h-full" : "space-y-3"}`}>
      <div
        className={`${aspectClass} relative overflow-hidden bg-vault ring-1 ring-bone/10`}
      >
        <Image
          src={plate.src}
          alt={plate.alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={90}
          className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.035]"
          style={{ objectPosition: plate.position ?? "center" }}
        />

        {/* Editorial tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: tintLayer }}
        />

        {/* Grain — matches the deck's paper texture vocabulary */}
        <div
          className="absolute inset-0 mix-blend-overlay opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='2'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.45 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        {/* Corner ticks — architectural plate */}
        <Tick className="top-3 left-3" />
        <Tick className="top-3 right-3" rotate={90} />
        <Tick className="bottom-3 right-3" rotate={180} />
        <Tick className="bottom-3 left-3" rotate={270} />
      </div>
      {caption && (
        <figcaption className={`flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] opacity-70 ${useFill ? "mt-3" : ""}`}>
          <span className="lozenge" />
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Tick({ className = "", rotate = 0 }: { className?: string; rotate?: number }) {
  return (
    <svg
      className={`absolute h-3 w-3 text-gold/60 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path d="M 0 0 L 6 0 M 0 0 L 0 6" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
