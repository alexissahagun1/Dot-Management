import type { Metadata } from "next";
import { AboutBoard } from "@/components/about-board";
import { HouseBoard } from "@/components/house-board";
import { LaneBoard } from "@/components/lane-board";
import { ReelBoard } from "@/components/reel-board";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("about");

export default function AboutPage() {
  return (
    <>
      <HouseBoard titleAs="h1" skip />
      <AboutBoard titleAs="h2" priority />
      <ReelBoard />
      <LaneBoard />
    </>
  );
}
