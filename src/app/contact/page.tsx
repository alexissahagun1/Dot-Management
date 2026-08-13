import type { Metadata } from "next";
import { ContactBoard } from "@/components/contact-board";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <ContactBoard skip />;
}
