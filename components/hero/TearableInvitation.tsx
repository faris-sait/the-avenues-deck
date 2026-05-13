"use client";
import { useEffect, useRef, useState } from "react";
import { Cloth } from "@/lib/cloth-sim/cloth-sim";

const GRAVITY = 0.42;
const FRICTION = 0.99;
const ITERATIONS = 4;
const SPACING = 20;            // was 14
const TEAR_DISTANCE = 90;      // was 64 — scaled with SPACING
const TEAR_RADIUS = 34;        // was 24 — scaled with SPACING
const IDLE_AUTO_REVEAL_MS = 14000;
const PAPER_COLOR = "#c9ccd1";
const PAPER_INK = "#2a2d31";

interface Props {
  onRevealed: () => void;
}

export function TearableInvitation({ onRevealed }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textureRef = useRef<HTMLImageElement | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setHidden(true);
      onRevealed();
      return;
    }

    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
    img.src = "/img/paper-texture.jpg";
    img.onload = () => {
      textureRef.current = img;
    };

    let mouseX = -9999;
    let mouseY = -9999;
    let mouseDown = false;
    let lastInteraction = performance.now();

    const onPointerDown = (e: PointerEvent) => {
      mouseDown = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastInteraction = performance.now();
    };
    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (mouseDown) {
        cloth.tearAt(mouseX, mouseY, TEAR_RADIUS);
        lastInteraction = performance.now();
      }
    };
    const onPointerUp = () => {
      mouseDown = false;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

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
        revealed = true;
        setHidden(true);
        onRevealed();
      }

      if (!revealed && cloth.integrity() < 0.35) {
        revealed = true;
        setHidden(true);
        onRevealed();
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
      <canvas ref={canvasRef} className="absolute inset-0 cursor-crosshair" />
      <div className="absolute inset-x-0 top-12 flex justify-center pointer-events-none">
        <p
          className="display text-xs md:text-sm tracking-[0.4em] uppercase"
          style={{ color: PAPER_INK }}
        >
          drag to tear
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          setHidden(true);
          onRevealed();
        }}
        className="absolute bottom-6 right-6 text-xs uppercase tracking-widest underline-offset-4 hover:underline"
        style={{ color: PAPER_INK }}
      >
        Skip intro →
      </button>
    </div>
  );
}
