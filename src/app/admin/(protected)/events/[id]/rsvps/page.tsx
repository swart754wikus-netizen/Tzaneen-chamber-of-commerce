"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import Link from "next/link";
import { getEvent, getRsvps, type ChamberEvent, type Rsvp } from "@/lib/events";
import { downloadCsv } from "@/lib/csvExport";

export default function AdminEventRsvpsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [event, setEvent] = useState<ChamberEvent | null>(null);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getEvent(id), getRsvps(id)]).then(([e, r]) => {
      setEvent(e);
      setRsvps(r);
      setLoading(false);
    });
  }, [id]);

  const totalHeadcount = rsvps.reduce((sum, r) => sum + (r.headcount || 1), 0);

  function handleExport() {
    downloadCsv(
      `rsvps-${event?.title ?? id}`,
      rsvps.map((r) => ({
        Name: r.name,
        Surname: r.surname,
        Phone: r.phone,
        Email: r.email,
        Business: r.businessName,
        "Member Status": r.memberStatus,
        Headcount: String(r.headcount),
        "Submitted At": r.submittedAt,
      }))
    );
  }

  return (
    <div>
      <Link href="/admin/events" className="text-sm font-semibold text-brand-primary hover:text-brand-accent-dark">
        ← Back to Events
      </Link>

      {loading ? (
        <p className="mt-6 text-brand-ink/60">Loading…</p>
      ) : (
        <>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-brand-primary">
                {event?.title ?? "Event"} — RSVPs
              </h1>
              <p className="text-sm text-brand-ink/60">
                {rsvps.length} RSVP{rsvps.length === 1 ? "" : "s"}, {totalHeadcount} total attendee
                {totalHeadcount === 1 ? "" : "s"}
              </p>
            </div>
            <button
              onClick={handleExport}
              disabled={rsvps.length === 0}
              className="rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-accent-dark disabled:opacity-50"
            >
              Download CSV (Excel)
            </button>
          </div>

          {rsvps.length === 0 ? (
            <p className="mt-8 text-brand-ink/60">No RSVPs yet.</p>
          ) : (
            <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-brand-primary/10 text-xs font-semibold uppercase tracking-wide text-brand-ink/50">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Business</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">People</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((r) => (
                    <tr key={r.id} className="border-b border-brand-primary/5">
                      <td className="px-4 py-3">
                        {r.name} {r.surname}
                      </td>
                      <td className="px-4 py-3">{r.phone}</td>
                      <td className="px-4 py-3">{r.email}</td>
                      <td className="px-4 py-3">{r.businessName || "—"}</td>
                      <td className="px-4 py-3 capitalize">{r.memberStatus}</td>
                      <td className="px-4 py-3">{r.headcount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
