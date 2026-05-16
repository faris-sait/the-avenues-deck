"use client";
import { useEffect, useRef } from "react";
import { bindVideoAutoplay } from "@/lib/video";

interface Props {
  poster: string;
  srcMp4: string;
  srcWebm?: string;
  caption?: string;
  aspect?: "video" | "square" | "portrait";
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
      { threshold: 0.35 }
    );

    startAutoplaySync();
    obs.observe(v);

    return () => {
      obs.disconnect();
      stopAutoplaySync();
    };
  }, []);

  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "portrait"
      ? "aspect-[3/4]"
      : "aspect-video";

  return (
    <figure className="space-y-3">
      <div className={`${aspectClass} overflow-hidden bg-charcoal`}>
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
        <figcaption className="text-xs uppercase tracking-[0.25em] opacity-50">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
