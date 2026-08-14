"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

export type Board =
  | "home"
  | "house"
  | "about"
  | "film"
  | "reel"
  | "lane"
  | "services"
  | "contact";

const hrefs: Record<Board, string> = {
  home: "/",
  house: "/about",
  about: "/about",
  film: "/about",
  reel: "/about",
  lane: "/about",
  services: "/services",
  contact: "/contact",
};

export function pathBoard(pathname: string): Board {
  if (pathname === "/about") return "house";
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
  const [section, setSection] = useState(() => ({
    pathname,
    board: pathBoard(pathname),
  }));
  const board =
    section.pathname === pathname ? section.board : pathBoard(pathname);
  const setBoard = useCallback(
    (next: Board) => setSection({ pathname, board: next }),
    [pathname],
  );
  const value = useMemo(
    () => ({ board, setBoard, currentHref: hrefs[board] }),
    [board, setBoard],
  );

  return <SectionCtx.Provider value={value}>{children}</SectionCtx.Provider>;
}

export function useSection() {
  return useContext(SectionCtx);
}
