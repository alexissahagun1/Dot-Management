"use client";

import { useActionState } from "react";
import { sendBriefing } from "@/app/contact/actions";
import type { ContactState } from "@/lib/contact";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendBriefing, initial);

  return (
    <form action={action} aria-busy={pending}>
      <label className="hp" aria-hidden="true">
        Company
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
      <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          autoCapitalize="words"
          autoCorrect="off"
          spellCheck={false}
          required
          maxLength={200}
        />
      </label>
      <label>
        <span>Category / series</span>
        <input
          type="text"
          name="series"
          autoComplete="off"
          required
          maxLength={200}
        />
      </label>
      <label>
        <span>Message</span>
        <textarea
          name="message"
          required
          maxLength={4000}
          rows={3}
          enterKeyHint="send"
        />
      </label>
      <button className="go" type="submit" disabled={pending}>
        {pending ? "Sending →" : "Send →"}
      </button>
      {state.status === "ok" ? (
        <p className="status is-ok" role="status">
          Briefing sent.
        </p>
      ) : null}
      {state.status === "error" ? (
        <p className="status is-err" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
