"use server";

import { Resend } from "resend";
import { parseContact, validateContact, type ContactState } from "@/lib/contact";
import { site } from "@/lib/content";

export async function sendBriefing(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = validateContact(parseContact(formData));
  if (!parsed.ok) return { status: "error", message: parsed.message };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? site.email;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !from) {
    return {
      status: "error",
      message: `Could not send. Email ${site.email}.`,
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: `Briefing: ${parsed.data.name} / ${parsed.data.series}`,
    text: parsed.data.message,
  });

  if (error) {
    return {
      status: "error",
      message: `Could not send. Email ${site.email}.`,
    };
  }

  return { status: "ok" };
}
