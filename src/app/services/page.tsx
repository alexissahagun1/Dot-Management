import type { Metadata } from "next";
import { ServicesBoard } from "@/components/services-board";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return <ServicesBoard priority skip />;
}
