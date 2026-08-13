"use client";

import { useEffect, useState } from "react";

export function ScrollCue() {
  const [away, setAway] = useState(false);

  useEffect(() => {
    const onScroll = () => setAway(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={away ? "cue is-away" : "cue"}
      aria-label="Scroll"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.querySelector("[data-board=house]")?.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
        });
      }}
    >
      <span>Scroll</span>
      <i aria-hidden="true" />
    </button>
  );
}
