"use client";

import Link from "next/link";
import { home } from "@/lib/content";

export function HomeCta() {
  return (
    <Link
      className="cta"
      href="/contact"
      transitionTypes={["nav-forward"]}
      onClick={(e) => {
        const board = document.querySelector("[data-board=contact]");
        if (!board) return;
        e.preventDefault();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        board.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      }}
    >
      {home.cta}
    </Link>
  );
}
