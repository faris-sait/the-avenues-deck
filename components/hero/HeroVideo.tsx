"use client";
import { useRef, useEffect } from "react";
import { attemptVideoAutoplay } from "@/lib/video";

interface Props {
  poster: string;
  srcMp4: string;
  srcWebm?: string;
}

export function HeroVideo({ poster, srcMp4, srcWebm }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const tryPlay = () => attemptVideoAutoplay(v);

    tryPlay();
    v.addEventListener("loadedmetadata", tryPlay);
    v.addEventListener("canplay", tryPlay);
    document.addEventListener("visibilitychange", tryPlay);

    return () => {
      v.removeEventListener("loadedmetadata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", tryPlay);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      {srcWebm && <source src={srcWebm} type="video/webm" />}
      <source src={srcMp4} type="video/mp4" />
    </video>
  );
}
