"use client";
import { useEffect, useRef, useState } from "react";
import { bindVideoAutoplay } from "@/lib/video";

const HERO_VIDEO_SRC = "/video/hero.mp4";
const HERO_VIDEO_FALLBACK_SRC = "/video/hero-sd.mp4";

/**
 * Cinematic backdrop for the hero. A short reel of The Avenues — its
 * crisscrossing concrete staircases and planted boulevards — plays behind the
 * typography, layered with atmospheric warm blooms, a vignette and grain.
 */
export function HeroScene() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState(HERO_VIDEO_SRC);

  // Some desktop browsers defer muted autoplay until the media is ready or the
  // user touches the page. Keep retrying on those browser lifecycle events.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const fallbackToSd = () => {
      if (videoSrc === HERO_VIDEO_FALLBACK_SRC) return;
      setVideoSrc(HERO_VIDEO_FALLBACK_SRC);
    };

    const stallCheck = window.setTimeout(() => {
      if (video.currentTime > 0) return;
      fallbackToSd();
    }, 4000);

    const stopAutoplaySync = bindVideoAutoplay(video);
    video.addEventListener("error", fallbackToSd);
    video.addEventListener("stalled", fallbackToSd);

    return () => {
      window.clearTimeout(stallCheck);
      stopAutoplaySync();
      video.removeEventListener("error", fallbackToSd);
      video.removeEventListener("stalled", fallbackToSd);
    };
  }, [videoSrc]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/video/hero-poster.jpg"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

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
