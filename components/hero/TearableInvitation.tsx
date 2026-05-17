"use client";
import { useEffect, useRef, useState } from "react";
import { Cloth } from "@/lib/cloth-sim/cloth-sim";

const GRAVITY = 0.42;
const FRICTION = 0.99;
// A coarse grid and few relaxation passes keep the per-frame cost low: this
// overlay covers the whole viewport, so the cloth simulation and the
// full-viewport canvas redraw both scale with the point count.
const ITERATIONS = 2;
const SPACING = 44;
const TEAR_DISTANCE = 200; // ~4.5x SPACING
const TEAR_RADIUS = 75; // drag-tear radius, larger than SPACING
const IDLE_AUTO_REVEAL_MS = 14000;
const MIN_TORN_CONSTRAINTS_TO_REVEAL = 85;
const MIN_INTEGRITY_TO_KEEP_INVITATION = 0.956;
// The torn sheet is a dark cover, continuous with the deck behind it — tearing
// it open reveals the cinematic hero rather than flipping from light to dark.
const PAPER_COLOR = "#08080c";

interface Props {
  onRevealed: () => void;
}

export function TearableInvitation({ onRevealed }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textureRef = useRef<HTMLImageElement | null>(null);
  const [hidden, setHidden] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    // Render at 1x — a transient overlay gains nothing from DPR-scaled
    // pixels, and the per-frame full-viewport redraw is the bottleneck.
    const dpr = 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    // Cover the full viewport with a slight overshoot so torn pieces falling
    // reveal the page behind rather than a strip of empty canvas at the edges.
    const cols = Math.ceil(w / SPACING) + 2;
    const rows = Math.ceil(h / SPACING) + 2;
    const originX = -SPACING;
    const originY = -SPACING;

    const cloth = new Cloth({
      width: cols,
      height: rows,
      spacing: SPACING,
      originX,
      originY,
      tearDistance: TEAR_DISTANCE,
    });

    const img = new Image();
    img.src = "/img/paper-texture.svg";
    img.onload = () => {
      textureRef.current = img;
    };

    let mouseX = -9999;
    let mouseY = -9999;
    let mouseDown = false;
    let lastInteraction = performance.now();
    let totalTornConstraints = 0;

    const revealInvitation = () => {
      if (revealed) return;
      revealed = true;
      setDragging(false);
      setHidden(true);
      onRevealed();
    };

    const hasMeaningfulTear = () =>
      totalTornConstraints >= MIN_TORN_CONSTRAINTS_TO_REVEAL ||
      cloth.integrity() < MIN_INTEGRITY_TO_KEEP_INVITATION;

    const onPointerDown = (e: PointerEvent) => {
      mouseDown = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
      setDragging(true);
      lastInteraction = performance.now();
    };
    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (mouseDown) {
        totalTornConstraints += cloth.tearAt(mouseX, mouseY, TEAR_RADIUS);
        lastInteraction = performance.now();
      }
    };
    const onPointerUp = () => {
      mouseDown = false;

      if (!revealed && hasMeaningfulTear()) {
        revealInvitation();
        return;
      }

      setDragging(false);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("blur", onPointerUp);

    let rafId = 0;
    let revealed = false;

    const tick = () => {
      cloth.step({ gravity: GRAVITY, friction: FRICTION, iterations: ITERATIONS });
      ctx.clearRect(0, 0, w, h);

      // Paint the paper background first; constraints layered on top give the cloth its weave.
      // Where constraints are torn, this background fill is also cleared by clipping.
      ctx.fillStyle = PAPER_COLOR;
      ctx.beginPath();
      for (const c of cloth.constraints) {
        // Build a path through every still-connected segment so we can fill the supported region.
        ctx.moveTo(c.a.x, c.a.y);
        ctx.lineTo(c.b.x, c.b.y);
      }
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = PAPER_COLOR;
      ctx.lineWidth = SPACING * 1.6;
      ctx.stroke();

      // After a long idle period, gracefully fade the whole overlay rather than
      // instantly clearing constraints — gives the viewer a visible transition.
      if (
        !revealed &&
        performance.now() - lastInteraction > IDLE_AUTO_REVEAL_MS
      ) {
        revealInvitation();
      }

      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("blur", onPointerUp);
    };
  }, [onRevealed]);

  return (
    <div
      className={`fixed inset-0 z-50 select-none transition-opacity duration-700 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ touchAction: "none" }}
      role="presentation"
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      />

      {/* Invitation chrome — pointer-events-none so the canvas underneath receives
          the tear gesture. The whole layer fades while the page is being torn. */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
          dragging ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Warm vault bloom rising from the base */}
        <div
          className="absolute inset-x-0 bottom-0 h-[60vh]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(201,169,110,0.12) 0%, rgba(201,169,110,0.04) 38%, transparent 72%)",
          }}
        />
        {/* Cinematic vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 42%, transparent 46%, rgba(5,5,8,0.62) 100%)",
          }}
        />

        {/* Single hairline frame */}
        <div className="absolute inset-6 border border-gold/20 md:inset-10" />

        {/* Eyebrow */}
        <div className="absolute inset-x-0 top-8 flex items-center justify-center gap-3 md:top-12">
          <span className="lozenge" />
          <span className="mono text-[0.6rem] uppercase tracking-[0.38em] text-gold">
            The Avenues · Kuwait
          </span>
        </div>

        {/* Optical-centre composition */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="rule-ornament mx-auto w-full max-w-md">
            <span className="italic-display text-[1.5rem] leading-none md:text-[1.85rem]">
              Invitation
            </span>
          </div>

          <h2 className="display mt-8 text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.95]">
            <span className="block text-bone">A private look</span>
            <span className="italic-display block text-gold">
              inside The Avenues.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-sand/70">
            Twelve districts. One destination. The world&apos;s second-largest
            mall.
          </p>
        </div>

        {/* Tear cue */}
        <div className="absolute inset-x-0 bottom-[14vh] flex flex-col items-center gap-4">
          <span
            className="block h-px w-28"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, rgba(201,169,110,0.5) 0 2px, transparent 2px 6px)",
            }}
          />
          <span className="flex items-center gap-3 mono text-[0.6rem] uppercase tracking-[0.38em] text-gold">
            <span className="lozenge" />
            Tear to enter
            <span className="lozenge" />
          </span>
          <p className="text-[0.7rem] tracking-wider text-sand/40">
            press and drag anywhere to tear the page open
          </p>
        </div>
      </div>

      {/* Skip — the only interactive chrome; a discreet text affordance */}
      <button
        type="button"
        onClick={() => {
          setDragging(false);
          setHidden(true);
          onRevealed();
        }}
        className={`absolute bottom-6 right-6 mono text-[0.58rem] uppercase tracking-[0.34em] text-bone/35 transition-colors duration-300 hover:text-gold md:bottom-10 md:right-10 ${
          dragging ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"
        }`}
      >
        Skip intro
      </button>
    </div>
  );
}
