"use client";

import { useState, type FormEvent } from "react";
import { submitCallBackRequest } from "@/lib/firestore/contactRequests";

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
      <div className="rounded-lg bg-white/10 p-6 text-center">
        <p className="font-semibold">Thanks — we&apos;ve got your details.</p>
        <p className="mt-1 text-sm text-white/80">
          Someone from the Chamber will call you back soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <h3 className="text-xl font-bold uppercase tracking-wide">
        Call Back Request
      </h3>

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
          className="w-full rounded-md border border-white/30 bg-white/95 px-4 py-3 text-black placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-gold"
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
          className="w-full rounded-md border border-white/30 bg-white/95 px-4 py-3 text-black placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-gold"
        />
      </div>

      {status === "error" && (
        <p className="text-sm font-medium text-yellow-100" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-md bg-brand-gold px-4 py-3 font-semibold text-brand-green-dark transition-colors hover:bg-brand-gold-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send »"}
      </button>
    </form>
  );
}
