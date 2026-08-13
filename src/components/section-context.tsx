"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

export type Board = "home" | "house" | "about" | "film" | "services" | "contact";

const hrefs: Record<Board, string> = {
  home: "/",
  house: "/",
  about: "/about",
  film: "/about",
  services: "/services",
  contact: "/contact",
};

export function pathBoard(pathname: string): Board {
  if (pathname === "/about") return "about";
  if (pathname === "/services") return "services";
  if (pathname === "/contact") return "contact";
  return "home";
}

const SectionCtx = createContext<{
  board: Board;
  setBoard: (b: Board) => void;
  currentHref: string;
}>({
  board: "home",
  setBoard: () => {},
  currentHref: "/",
});

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setBoard] = useState<Board>("home");
  const board =
    pathname === "/" || pathname === "/about" ? scrolled : pathBoard(pathname);
  const value = useMemo(
    () => ({ board, setBoard, currentHref: hrefs[board] }),
    [board],
  );

  useEffect(() => {
    if (pathname === "/") setBoard("home");
    else if (pathname === "/about") setBoard("about");
  }, [pathname]);

  return <SectionCtx.Provider value={value}>{children}</SectionCtx.Provider>;
}

export function useSection() {
  return useContext(SectionCtx);
}
