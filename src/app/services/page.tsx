import type { Metadata } from "next";
import { ServicesBoard } from "@/components/services-board";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("services");

export default function ServicesPage() {
  return <ServicesBoard priority skip />;
}
