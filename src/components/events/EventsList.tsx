"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { isFirebaseConfigured } from "@/lib/firebase";
import {
  getAllEvents,
  getUpcomingEvents,
  formatEventDate,
  type ChamberEvent,
} from "@/lib/events";

export function EventsList() {
  const [events, setEvents] = useState<ChamberEvent[]>([]);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      return;
    }
    getAllEvents()
      .then(setEvents)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (!isFirebaseConfigured) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-brand-primary/20 bg-brand-primary/5 p-10 text-center">
        <p className="font-semibold text-brand-primary">
          Events aren&apos;t set up yet
        </p>
        <p className="mt-1 text-sm text-brand-ink/60">
          Once the admin area is connected, upcoming events will appear
          here. See{" "}
          <a
            href="mailto:admin@tzaneenchamber.org.za"
            className="font-semibold text-brand-accent-dark hover:text-brand-accent"
          >
            admin@tzaneenchamber.org.za
          </a>{" "}
          for what&apos;s next in the meantime.
        </p>
      </div>
    );
  }

  if (loading) {
    return <p className="text-center text-brand-ink/60">Loading events…</p>;
  }

  if (error) {
    return (
      <p className="text-center text-brand-ink/60">
        Couldn&apos;t load events right now — please try again shortly.
      </p>
    );
  }

  const upcoming = getUpcomingEvents(events);

  if (upcoming.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-brand-primary/20 bg-brand-primary/5 p-10 text-center">
        <p className="font-semibold text-brand-primary">
          No upcoming events right now
        </p>
        <p className="mt-1 text-sm text-brand-ink/60">
          Check back soon, or see{" "}
          <a
            href="mailto:admin@tzaneenchamber.org.za"
            className="font-semibold text-brand-accent-dark hover:text-brand-accent"
          >
            admin@tzaneenchamber.org.za
          </a>{" "}
          for what&apos;s next.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {upcoming.map((event) => (
        <li key={event.id} className="rounded-2xl bg-brand-cream p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent-dark">
            {formatEventDate(event.date)}
          </p>
          <h2 className="mt-1 text-xl font-bold text-brand-primary">
            {event.title}
          </h2>
          <p className="mt-2 text-brand-ink/70">{event.description}</p>
          <Link
            href={`/events/${event.id}`}
            className="mt-4 inline-block text-sm font-semibold text-brand-accent-dark hover:text-brand-accent"
          >
            {event.rsvpEnabled ? "View details & RSVP →" : "View details →"}
          </Link>
        </li>
      ))}
    </ul>
  );
}
