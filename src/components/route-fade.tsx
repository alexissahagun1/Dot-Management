"use client";

import { usePathname } from "next/navigation";

export function RouteFade({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return children;
  return (
    <div className="route-fade" key={pathname}>
      {children}
    </div>
  );
}
