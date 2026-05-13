"use client";
import { useEffect, useRef, useState } from "react";
import { Cloth } from "@/lib/cloth-sim/cloth-sim";

const GRAVITY = 0.45;
const FRICTION = 0.99;
const ITERATIONS = 4;
const SPACING = 14;
const TEAR_DISTANCE = 64;
const TEAR_RADIUS = 24;
const IDLE_AUTO_REVEAL_MS = 4000;

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

    const cols = Math.floor((w * 0.55) / SPACING);
    const rows = Math.floor((h * 0.6) / SPACING);
    const originX = (w - cols * SPACING) / 2;
    const originY = h * 0.08;

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

      if (
        !revealed &&
        performance.now() - lastInteraction > IDLE_AUTO_REVEAL_MS
      ) {
        cloth.tearAt(
          originX + (cols * SPACING) / 2,
          originY + (rows * SPACING) / 2,
          w
        );
      }

      for (const c of cloth.constraints) {
        ctx.beginPath();
        ctx.moveTo(c.a.x, c.a.y);
        ctx.lineTo(c.b.x, c.b.y);
        ctx.strokeStyle = "rgba(236, 228, 214, 0.95)";
        ctx.lineWidth = SPACING * 0.9;
        ctx.stroke();
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
      className={`fixed inset-0 z-50 transition-opacity duration-700 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="presentation"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-x-0 top-[10vh] flex justify-center pointer-events-none">
        <p className="display text-bone/80 text-sm tracking-[0.3em] uppercase">
          drag to tear
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          setHidden(true);
          onRevealed();
        }}
        className="absolute bottom-6 right-6 text-xs uppercase tracking-widest text-bone/50 hover:text-bone/90 underline-offset-4 hover:underline"
      >
        Skip intro →
      </button>
    </div>
  );
}
