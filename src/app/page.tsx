import type { Metadata } from "next";
import { AboutBoard } from "@/components/about-board";
import { ContactBoard } from "@/components/contact-board";
import { HomeBoard } from "@/components/home-board";
import { HouseBoard } from "@/components/house-board";
import { JsonLd } from "@/components/json-ld";
import { LaneBoard } from "@/components/lane-board";
import { ReelBoard } from "@/components/reel-board";
import { ServicesBoard } from "@/components/services-board";
import { SiteScroll } from "@/components/site-scroll";
import { buildPageMetadata, homeJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("home");

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <SiteScroll>
        <HomeBoard titleAs="h1" priority />
        <HouseBoard titleAs="h2" />
        <AboutBoard titleAs="h2" />
        <ReelBoard />
        <LaneBoard />
        <ServicesBoard />
        <ContactBoard titleAs="h2" />
      </SiteScroll>
    </>
  );
}
