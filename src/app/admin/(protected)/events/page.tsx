"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllEvents, deleteEvent, formatEventDate, type ChamberEvent } from "@/lib/events";
import { EventForm } from "@/components/admin/EventForm";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<ChamberEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  function refresh() {
    getAllEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  }

  useEffect(refresh, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this event? This cannot be undone.")) return;
    await deleteEvent(id);
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-primary">Events & RSVPs</h1>
        {!creating && (
          <button
            onClick={() => setCreating(true)}
            className="rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-accent-dark"
          >
            + New Event
          </button>
        )}
      </div>

      {creating && (
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <EventForm
            onSaved={() => {
              setCreating(false);
              refresh();
            }}
            onCancel={() => setCreating(false)}
          />
        </div>
      )}

      {loading ? (
        <p className="mt-8 text-brand-ink/60">Loading…</p>
      ) : events.length === 0 ? (
        <p className="mt-8 text-brand-ink/60">No events yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {events.map((event) =>
            editingId === event.id ? (
              <li key={event.id} className="rounded-2xl bg-white p-6 shadow-sm">
                <EventForm
                  event={event}
                  onSaved={() => {
                    setEditingId(null);
                    refresh();
                  }}
                  onCancel={() => setEditingId(null)}
                />
              </li>
            ) : (
              <li
                key={event.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm"
              >
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent-dark">
                    {formatEventDate(event.date)}
                  </p>
                  <p className="font-bold text-brand-primary">{event.title}</p>
                  <p className="text-sm text-brand-ink/60">
                    {event.rsvpEnabled ? "RSVP open" : "RSVP off"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 text-sm font-semibold">
                  <Link
                    href={`/admin/events/${event.id}/rsvps`}
                    className="text-brand-primary hover:text-brand-accent-dark"
                  >
                    View RSVPs
                  </Link>
                  <button
                    onClick={() => setEditingId(event.id)}
                    className="text-brand-primary hover:text-brand-accent-dark"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-brand-accent-dark hover:text-brand-accent"
                  >
                    Delete
                  </button>
                </div>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
