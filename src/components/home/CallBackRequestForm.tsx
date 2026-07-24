"use client";

import { useState, type FormEvent } from "react";
import { submitCallBackRequest } from "@/lib/forms/contactRequests";

type Status = "idle" | "submitting" | "success" | "error";

export function CallBackRequestForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !phone.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in both your name and phone number.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      await submitCallBackRequest({ name: name.trim(), phone: phone.trim() });
      setStatus("success");
      setName("");
      setPhone("");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong sending your request. Please call us directly at 083 280 9723."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-brand-primary/5 p-6 text-center">
        <p className="font-semibold text-brand-primary">
          Thanks — we&apos;ve got your details.
        </p>
        <p className="mt-1 text-sm text-brand-ink/70">
          Someone from the Chamber will call you back soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <h3 className="text-xl font-bold text-brand-primary">
          Request a call back
        </h3>
        <p className="mt-1 text-sm text-brand-ink/60">
          Leave your details and we&apos;ll call you.
        </p>
      </div>

      <div>
        <label htmlFor="callback-name" className="sr-only">
          Name
        </label>
        <input
          id="callback-name"
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-brand-primary/15 bg-white px-4 py-3 text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
        />
      </div>

      <div>
        <label htmlFor="callback-phone" className="sr-only">
          Phone
        </label>
        <input
          id="callback-phone"
          name="phone"
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-xl border border-brand-primary/15 bg-white px-4 py-3 text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
        />
      </div>

      {status === "error" && (
        <p className="text-sm font-medium text-brand-accent-dark" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-brand-accent px-4 py-3 font-semibold text-white transition-colors hover:bg-brand-accent-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
