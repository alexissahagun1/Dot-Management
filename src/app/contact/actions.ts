"use server";

import { Resend } from "resend";
import { parseContact, validateContact, type ContactState } from "@/lib/contact";
import { site } from "@/lib/content";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function sendBriefing(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = validateContact(parseContact(formData));
  if (!parsed.ok) return { status: "error", message: parsed.message };

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "onboarding@resend.dev";

  if (!apiKey) {
    return {
      status: "error",
      message: `Could not send. Email ${site.email}.`,
    };
  }

  const { name, series, message } = parsed.data;
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: site.email,
    subject: `Briefing: ${name} / ${series}`,
    html: `<p><strong>${escapeHtml(name)}</strong> / ${escapeHtml(series)}</p><p>${escapeHtml(message).replaceAll("\n", "<br>")}</p>`,
    text: `${name} / ${series}\n\n${message}`,
  });

  if (error) {
    return {
      status: "error",
      message: `Could not send. Email ${site.email}.`,
    };
  }

  return { status: "ok" };
}
