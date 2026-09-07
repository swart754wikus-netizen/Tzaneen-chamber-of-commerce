"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  getPaymentDetails,
  setPaymentDetails,
  type PaymentDetails,
} from "@/lib/paymentDetails";

const fieldClass =
  "w-full rounded-xl border border-brand-primary/15 bg-white px-4 py-2.5 text-brand-ink focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40";

const emptyDetails: PaymentDetails = {
  bankName: "",
  accountHolder: "",
  accountNumber: "",
  branchCode: "",
  reference: "",
};

export default function AdminPaymentDetailsPage() {
  const [details, setDetails] = useState<PaymentDetails>(emptyDetails);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getPaymentDetails()
      .then((existing) => {
        if (existing) setDetails(existing);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await setPaymentDetails(details);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  function update(field: keyof PaymentDetails, value: string) {
    setDetails((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-primary">Payment Details</h1>
      <p className="mt-1 max-w-xl text-sm text-brand-ink/60">
        These banking details are used only for paid events. When an event
        has a cost set, anyone who RSVPs gets these details emailed to
        them automatically — they&apos;re never shown on the website
        itself.
      </p>

      {loading ? (
        <p className="mt-8 text-brand-ink/60">Loading…</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-primary">
              Bank Name
            </label>
            <input
              value={details.bankName}
              onChange={(e) => update("bankName", e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-primary">
              Account Holder
            </label>
            <input
              value={details.accountHolder}
              onChange={(e) => update("accountHolder", e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-primary">
              Account Number
            </label>
            <input
              value={details.accountNumber}
              onChange={(e) => update("accountNumber", e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-primary">
              Branch Code
            </label>
            <input
              value={details.branchCode}
              onChange={(e) => update("branchCode", e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-primary">
              Reference note
            </label>
            <input
              value={details.reference}
              onChange={(e) => update("reference", e.target.value)}
              placeholder="e.g. Use your name and the event as reference"
              className={fieldClass}
            />
          </div>

          {saved && (
            <p className="text-sm font-medium text-brand-accent-dark">Saved.</p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-accent-dark disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Payment Details"}
          </button>
        </form>
      )}
    </div>
  );
}
