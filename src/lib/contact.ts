export type ContactInput = {
  name: string;
  series: string;
  message: string;
  company: string;
};

export type ContactState =
  | { status: "idle" }
  | { status: "ok" }
  | { status: "error"; message: string };

const LIMITS = { name: 200, series: 200, message: 4000 } as const;

export function parseContact(formData: FormData): ContactInput {
  return {
    name: String(formData.get("name") ?? ""),
    series: String(formData.get("series") ?? ""),
    message: String(formData.get("message") ?? ""),
    company: String(formData.get("company") ?? ""),
  };
}

export function validateContact(
  input: ContactInput,
): { ok: true; data: Omit<ContactInput, "company"> } | { ok: false; message: string } {
  if (input.company.trim() !== "") {
    return { ok: false, message: "Could not send. Email info@dotsportsmanagement.com." };
  }

  const name = input.name.trim();
  const series = input.series.trim();
  const message = input.message.trim();

  if (!name || !series || !message) {
    return { ok: false, message: "Name, category and message are required." };
  }
  if (
    name.length > LIMITS.name ||
    series.length > LIMITS.series ||
    message.length > LIMITS.message
  ) {
    return { ok: false, message: "That briefing is too long. Shorten it and try again." };
  }

  return { ok: true, data: { name, series, message } };
}
