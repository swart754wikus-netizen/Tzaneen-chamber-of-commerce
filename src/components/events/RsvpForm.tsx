"use client";

import { useEffect, useState, type FormEvent } from "react";
import { submitRsvp, type ChamberEvent } from "@/lib/events";
import { getPaymentDetails, type PaymentDetails } from "@/lib/paymentDetails";

const fieldClass =
  "w-full rounded-xl border border-brand-primary/15 bg-white px-4 py-3 text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40";

type Status = "idle" | "submitting" | "success" | "error";

export function RsvpForm({ event }: { event: ChamberEvent }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [memberStatus, setMemberStatus] = useState<"member" | "non-member">(
    "member"
  );
  const [headcount, setHeadcount] = useState("1");
  const [status, setStatus] = useState<Status>("idle");
  const [payment, setPayment] = useState<PaymentDetails | null>(null);

  useEffect(() => {
    if (status !== "success" || !event.cost) return;
    getPaymentDetails()
      .then(setPayment)
      .catch(() => {});
  }, [status, event.cost]);

  async function handleSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (!name.trim() || !surname.trim() || !phone.trim() || !email.trim()) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      await submitRsvp(event, {
        name: name.trim(),
        surname: surname.trim(),
        phone: phone.trim(),
        email: email.trim(),
        businessName: businessName.trim(),
        memberStatus,
        headcount: Math.max(1, parseInt(headcount, 10) || 1),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-brand-primary/5 p-8 text-center">
        <p className="font-semibold text-brand-primary">
          Thanks — your RSVP has been received.
        </p>

        {event.cost && (
          <>
            {payment ? (
              <div className="mt-6 rounded-2xl bg-white p-6 text-left shadow-sm">
                <p className="font-semibold text-brand-primary">
                  Payment details — {event.cost}
                </p>
                <dl className="mt-3 space-y-1.5 text-sm text-brand-ink/80">
                  <div className="flex justify-between gap-4">
                    <dt className="text-brand-ink/50">Bank</dt>
                    <dd className="font-medium">{payment.bankName}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-brand-ink/50">Account Holder</dt>
                    <dd className="font-medium">{payment.accountHolder}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-brand-ink/50">Account Number</dt>
                    <dd className="font-medium">{payment.accountNumber}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-brand-ink/50">Branch Code</dt>
                    <dd className="font-medium">{payment.branchCode}</dd>
                  </div>
                  {payment.reference && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-brand-ink/50">Reference</dt>
                      <dd className="font-medium">{payment.reference}</dd>
                    </div>
                  )}
                </dl>
              </div>
            ) : (
              <p className="mt-4 text-sm text-brand-ink/50">Loading payment details…</p>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-brand-primary">
            Name *
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-brand-primary">
            Surname *
          </label>
          <input
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-brand-primary">
            Phone Number *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-brand-primary">
            Email Address *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-brand-primary">
          Business Name
        </label>
        <input
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-brand-primary">
            Are you a member?
          </label>
          <select
            value={memberStatus}
            onChange={(e) =>
              setMemberStatus(e.target.value as "member" | "non-member")
            }
            className={fieldClass}
          >
            <option value="member">Member</option>
            <option value="non-member">Non-member</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-brand-primary">
            How many people (incl. you)?
          </label>
          <input
            type="number"
            min={1}
            value={headcount}
            onChange={(e) => setHeadcount(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      {status === "error" && (
        <p className="text-sm font-medium text-brand-accent-dark" role="alert">
          Something went wrong — please fill in all required fields and try
          again, or call 083 280 9723.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-brand-accent px-4 py-3 font-semibold text-white shadow-md shadow-brand-accent/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accent-dark hover:shadow-lg disabled:translate-y-0 disabled:opacity-60 disabled:shadow-md"
      >
        {status === "submitting" ? "Sending…" : "RSVP"}
      </button>
    </form>
  );
}
