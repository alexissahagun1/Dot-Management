"use client";

import { useEffect, useRef } from "react";

export function Clip({
  src,
  poster,
  className,
  label,
}: {
  src: string;
  poster?: string;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.pause();
      return;
    }
    const play = () => {
      void node.play().catch(() => {});
    };
    play();
    node.addEventListener("canplay", play);
    return () => node.removeEventListener("canplay", play);
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={label}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
