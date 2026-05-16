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
const PAPER_COLOR = "#ece1c9";
const PAPER_INK = "#181512";
const PAPER_GOLD = "#8c7340";

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
      <div
        className={`pointer-events-none absolute inset-0 px-6 py-6 transition-opacity duration-200 md:px-10 md:py-10 ${
          dragging ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="absolute left-4 top-4 block h-4 w-4 border-l border-t border-black/20 md:left-8 md:top-8" />
        <span className="absolute right-4 top-4 block h-4 w-4 border-r border-t border-black/20 md:right-8 md:top-8" />
        <span className="absolute bottom-4 left-4 block h-4 w-4 border-b border-l border-black/20 md:bottom-8 md:left-8" />
        <span className="absolute bottom-4 right-4 block h-4 w-4 border-b border-r border-black/20 md:bottom-8 md:right-8" />
        <span className="absolute inset-3 border border-black/8 md:inset-6" />

        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-sm">
              <p
                className="mono text-[0.62rem] uppercase tracking-[0.38em]"
                style={{ color: PAPER_GOLD }}
              >
                The Avenues · Kuwait
              </p>
              <p
                className="mt-4 text-sm leading-relaxed md:text-[0.95rem]"
                style={{ color: "rgba(24, 21, 18, 0.62)" }}
              >
                A tactile invitation into the property story behind Kuwait&apos;s
                most ambitious retail address.
              </p>
            </div>

            <div
              className="hidden items-center gap-4 mono text-[0.58rem] uppercase tracking-[0.35em] md:flex"
              style={{ color: "rgba(24, 21, 18, 0.5)" }}
            >
              <span className="block h-px w-12" style={{ backgroundColor: "rgba(24, 21, 18, 0.18)" }} />
              <span>Slide 00 / 09</span>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center py-16 md:py-20">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
              <div className="rule-ornament mx-auto max-w-xl" style={{ color: PAPER_GOLD }}>
                Invitation
              </div>
              <h2
                className="display mt-8 max-w-5xl text-[clamp(3rem,8vw,8rem)] leading-[0.9]"
                style={{ color: PAPER_INK }}
              >
                A private look
                <span className="block" style={{ color: PAPER_GOLD }}>
                  inside The Avenues.
                </span>
              </h2>
              <p
                className="mt-8 max-w-3xl text-base leading-relaxed md:text-xl"
                style={{ color: "rgba(24, 21, 18, 0.68)" }}
              >
                Twelve districts. One destination. Press and drag anywhere across
                the paper to tear the invitation open and enter the deck.
              </p>
              <div
                className="mt-8 inline-flex items-center gap-4 border px-6 py-4 mono text-[0.72rem] uppercase tracking-[0.38em] md:px-8 md:py-4 md:text-[0.8rem]"
                style={{
                  borderColor: "rgba(24, 21, 18, 0.16)",
                  color: PAPER_INK,
                  backgroundColor: "rgba(255, 255, 255, 0.16)",
                }}
              >
                <span className="lozenge" />
                <span>Press + drag to tear open</span>
              </div>
              <div
                className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mono text-[0.62rem] uppercase tracking-[0.35em]"
                style={{ color: "rgba(24, 21, 18, 0.52)" }}
              >
                <span className="inline-flex items-center gap-3">
                  <span className="lozenge" />
                  13M square feet
                </span>
                <span className="inline-flex items-center gap-3">
                  <span className="lozenge" />
                  12 districts
                </span>
                <span className="inline-flex items-center gap-3">
                  <span className="lozenge" />
                  30M annual visits
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div
              className="inline-flex items-center gap-4 mono text-[0.68rem] uppercase tracking-[0.38em]"
              style={{ color: "rgba(24, 21, 18, 0.58)" }}
            >
              <span className="block h-px w-10" style={{ backgroundColor: "rgba(24, 21, 18, 0.18)" }} />
              <span>Drag anywhere to tear</span>
            </div>
            <p
              className="hidden text-right text-sm leading-relaxed md:block"
              style={{ color: "rgba(24, 21, 18, 0.48)" }}
            >
              Best experienced with sound on after the reveal.
            </p>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setDragging(false);
          setHidden(true);
          onRevealed();
        }}
        className={`absolute bottom-6 right-6 inline-flex items-center gap-3 border px-5 py-3 mono text-[0.62rem] uppercase tracking-[0.34em] transition-colors duration-200 hover:bg-black/5 md:bottom-10 md:right-10 ${
          dragging ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"
        }`}
        style={{
          borderColor: "rgba(24, 21, 18, 0.16)",
          color: PAPER_INK,
          backgroundColor: "rgba(255, 255, 255, 0.18)",
        }}
      >
        <span className="lozenge" />
        Skip intro →
      </button>
    </div>
  );
}
