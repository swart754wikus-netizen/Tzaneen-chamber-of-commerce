"use client";

import { useState, type FormEvent } from "react";
import { isEmailConfigured, sendAdminNotification } from "@/lib/email";

type Status = "idle" | "submitting" | "success" | "error";

// Reuses the existing EmailJS notification (same as the other forms) to
// tell the admin someone wants to subscribe, rather than standing up a
// dedicated email-marketing service (Mailchimp etc.) — that's a real,
// separate cost/tool decision this doesn't make on its own. The admin
// adds subscribers to a real mailing list manually for now.
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;

    if (!isEmailConfigured) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      await sendAdminNotification({
        formName: "Newsletter Signup",
        email: email.trim(),
        submittedAt: new Date().toLocaleString(),
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="text-sm text-white/90">Thanks — you&apos;re on the list.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-brand-accent focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="whitespace-nowrap rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-xs text-brand-accent sm:absolute sm:mt-10">
          Sign-ups aren&apos;t connected yet — check back soon.
        </p>
      )}
    </form>
  );
}
