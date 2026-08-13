"use client";

import { useEffect } from "react";
import { useSection, type Board } from "@/components/section-context";

export function SiteScroll({ children }: { children: React.ReactNode }) {
  return <main id="content" className="site-scroll">{children}</main>;
}

export function useChromeBoard() {
  const { setBoard } = useSection();

  useEffect(() => {
    const pick = () => {
      const nodes = [...document.querySelectorAll<HTMLElement>("[data-board]")];
      if (nodes.length === 0) return;
      const y = 64;
      let current = nodes[0];
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= y) current = node;
      }
      const name = current.getAttribute("data-board") as Board | null;
      if (name) setBoard(name);
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [setBoard]);
}
