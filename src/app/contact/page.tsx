import type { Metadata } from "next";
import { ContactBoard } from "@/components/contact-board";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("contact");

export default function ContactPage() {
  return <ContactBoard skip />;
}
