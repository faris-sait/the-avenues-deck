"use client";
import { useRef, useEffect } from "react";

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
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      poster={poster}
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
