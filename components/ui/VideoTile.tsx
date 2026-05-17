"use client";
import { useEffect, useRef } from "react";
import { bindVideoAutoplay } from "@/lib/video";

interface Props {
  poster: string;
  srcMp4: string;
  srcWebm?: string;
  caption?: string;
  aspect?: "video" | "square" | "portrait" | "fill";
}

export function VideoTile({ poster, srcMp4, srcWebm, caption, aspect = "video" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    let stopAutoplaySync = () => {};
    const startAutoplaySync = () => {
      stopAutoplaySync();
      stopAutoplaySync = bindVideoAutoplay(v);
    };

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          startAutoplaySync();
          return;
        }

        stopAutoplaySync();
        v.pause();
      },
      { threshold: 0.1 }
    );

    startAutoplaySync();
    obs.observe(v);

    return () => {
      obs.disconnect();
      stopAutoplaySync();
    };
  }, []);

  const useFill = aspect === "fill";
  const aspectClass = useFill
    ? "flex-1 min-h-0"
    : aspect === "square"
    ? "aspect-square"
    : aspect === "portrait"
    ? "aspect-[3/4]"
    : "aspect-video";

  return (
    <figure className={useFill ? "flex h-full flex-col" : "space-y-3"}>
      <div className={`${aspectClass} overflow-hidden bg-charcoal ${useFill ? "ring-1 ring-bone/10" : ""}`}>
        <video
          ref={ref}
          className="h-full w-full object-cover"
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          {srcWebm && <source src={srcWebm} type="video/webm" />}
          <source src={srcMp4} type="video/mp4" />
        </video>
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
