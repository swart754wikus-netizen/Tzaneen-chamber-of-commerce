"use client";

import { useState, type FormEvent } from "react";
import { submitMembershipApplication } from "@/lib/firestore/applications";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-brand-primary/15 bg-white px-4 py-3 text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40";

export function MembershipApplicationForm() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !firstName.trim() ||
      !surname.trim() ||
      !companyAddress.trim() ||
      !companyPhone.trim() ||
      !companyEmail.trim()
    ) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      await submitMembershipApplication({
        firstName: firstName.trim(),
        surname: surname.trim(),
        companyAddress: companyAddress.trim(),
        companyPhone: companyPhone.trim(),
        companyEmail: companyEmail.trim(),
        vatNumber: vatNumber.trim(),
      });
      setStatus("success");
      setFirstName("");
      setSurname("");
      setCompanyAddress("");
      setCompanyPhone("");
      setCompanyEmail("");
      setVatNumber("");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong sending your application. Please call us directly at 083 280 9723."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-brand-primary/5 p-8 text-center">
        <p className="font-semibold text-brand-primary">
          Thanks — we&apos;ve received your application.
        </p>
        <p className="mt-1 text-sm text-brand-ink/70">
          Someone from the Chamber will follow up with you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-brand-primary">
            Name *
          </label>
          <input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="surname" className="mb-1 block text-sm font-medium text-brand-primary">
            Surname *
          </label>
          <input
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="companyAddress" className="mb-1 block text-sm font-medium text-brand-primary">
          Company Address *
        </label>
        <input
          id="companyAddress"
          value={companyAddress}
          onChange={(e) => setCompanyAddress(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="companyPhone" className="mb-1 block text-sm font-medium text-brand-primary">
            Company Telephone Number *
          </label>
          <input
            id="companyPhone"
            type="tel"
            value={companyPhone}
            onChange={(e) => setCompanyPhone(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="companyEmail" className="mb-1 block text-sm font-medium text-brand-primary">
            Company Email *
          </label>
          <input
            id="companyEmail"
            type="email"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="vatNumber" className="mb-1 block text-sm font-medium text-brand-primary">
          VAT Number (if applicable)
        </label>
        <input
          id="vatNumber"
          value={vatNumber}
          onChange={(e) => setVatNumber(e.target.value)}
          className={fieldClass}
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
        {status === "submitting" ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
