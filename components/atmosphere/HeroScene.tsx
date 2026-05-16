"use client";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { attemptVideoAutoplay } from "@/lib/video";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// Subscribe to OS-level reduced-motion changes. Module-scoped so its identity
// stays stable across renders and useSyncExternalStore never re-subscribes.
function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/**
 * Cinematic backdrop for the hero. A short reel of The Avenues — its
 * crisscrossing concrete staircases and planted boulevards — plays behind the
 * typography, layered with atmospheric warm blooms, a vignette and grain.
 * Viewers who prefer reduced motion get a still poster frame instead of video.
 */
export function HeroScene() {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  // Browsers only autoplay muted video, and Safari occasionally needs an
  // explicit nudge — force muted on the element and call play() once mounted.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;

    const retryAutoplay = () => attemptVideoAutoplay(video);

    retryAutoplay();
    video.addEventListener("loadedmetadata", retryAutoplay);
    video.addEventListener("canplay", retryAutoplay);
    document.addEventListener("visibilitychange", retryAutoplay);

    return () => {
      video.removeEventListener("loadedmetadata", retryAutoplay);
      video.removeEventListener("canplay", retryAutoplay);
      document.removeEventListener("visibilitychange", retryAutoplay);
    };
  }, [reduceMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden>
      {/* Base layer: a cinematic reel of the mall interior. Reduced-motion
          viewers get the poster frame as a still image instead of the video. */}
      {reduceMotion ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/video/hero-poster.jpg)" }}
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster="/video/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* Midnight cast — dark enough that the typography reads cleanly, light
          enough that the reel stays vivid behind it. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,12,0.30) 0%, rgba(20,12,8,0.20) 40%, rgba(8,8,12,0.55) 100%)",
        }}
      />

      {/* Warm bloom from below — vault lighting. Static: continuously
          animating large soft layers is the costliest thing to composite
          without a GPU, so this rests at a fixed opacity. */}
      <div
        className="absolute inset-x-0 -bottom-1/3 h-[80vh] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(201,169,110,0.45) 0%, rgba(201,169,110,0.18) 28%, rgba(74,28,28,0.12) 55%, transparent 75%)",
        }}
      />

      {/* Secondary cool bloom — top right (static) */}
      <div
        className="absolute right-0 top-0 h-[70vh] w-[60vw] opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 80% 10%, rgba(60,80,130,0.30) 0%, rgba(40,55,95,0.10) 40%, transparent 70%)",
        }}
      />

      {/* Vignette — softer so the footage breathes through the corners */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, transparent 40%, rgba(5,5,8,0.35) 80%, rgba(5,5,8,0.65) 100%)",
        }}
      />

      {/* Grain — matches paper texture across the deck */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
