import { AboutBoard } from "@/components/about-board";
import { ContactBoard } from "@/components/contact-board";
import { HomeBoard } from "@/components/home-board";
import { HouseBoard } from "@/components/house-board";
import { ServicesBoard } from "@/components/services-board";
import { SiteScroll } from "@/components/site-scroll";

export default function HomePage() {
  return (
    <SiteScroll>
      <HomeBoard titleAs="h1" priority />
      <HouseBoard titleAs="h2" />
      <AboutBoard titleAs="h2" />
      <ServicesBoard />
      <ContactBoard titleAs="h2" />
    </SiteScroll>
  );
}
