import type { Metadata } from "next";
import { AboutBoard } from "@/components/about-board";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return <AboutBoard priority skip />;
}
