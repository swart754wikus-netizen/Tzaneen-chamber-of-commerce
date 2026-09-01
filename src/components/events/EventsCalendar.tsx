"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { isFirebaseConfigured } from "@/lib/firebase";
import { getAllEvents, type ChamberEvent } from "@/lib/events";

const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthFormatter = new Intl.DateTimeFormat("en-ZA", { month: "long", year: "numeric" });

function dateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function EventsCalendar() {
  const [events, setEvents] = useState<ChamberEvent[]>([]);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    getAllEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, ChamberEvent[]>();
    for (const event of events) {
      const list = map.get(event.date) ?? [];
      list.push(event);
      map.set(event.date, list);
    }
    return map;
  }, [events]);

  const eventsThisMonth = useMemo(() => {
    return events
      .filter((event) => {
        const d = new Date(event.date);
        return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [events, viewYear, viewMonth]);

  function goToMonth(delta: number) {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  }

  if (!isFirebaseConfigured) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-brand-primary/20 bg-brand-primary/5 p-10 text-center">
        <p className="font-semibold text-brand-primary">
          The events calendar isn&apos;t set up yet
        </p>
        <p className="mt-1 text-sm text-brand-ink/60">
          See{" "}
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

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  // Monday-first offset (getDay(): 0=Sun..6=Sat).
  const leadingBlanks = (firstOfMonth.getDay() + 6) % 7;
  const cells: (number | null)[] = [
    ...Array(leadingBlanks).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => goToMonth(-1)}
          aria-label="Previous month"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-primary/15 text-brand-primary hover:bg-brand-primary/5"
        >
          &larr;
        </button>
        <h2 className="text-lg font-bold text-brand-primary">
          {monthFormatter.format(new Date(viewYear, viewMonth, 1))}
        </h2>
        <button
          onClick={() => goToMonth(1)}
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-primary/15 text-brand-primary hover:bg-brand-primary/5"
        >
          &rarr;
        </button>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase text-brand-ink/50">
        {weekdayLabels.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`blank-${i}`} />;
          const key = dateKey(viewYear, viewMonth, day);
          const hasEvents = eventsByDay.has(key);
          const isToday =
            day === today.getDate() &&
            viewMonth === today.getMonth() &&
            viewYear === today.getFullYear();
          return (
            <div
              key={key}
              className={`flex aspect-square flex-col items-center justify-center rounded-lg text-sm ${
                hasEvents
                  ? "bg-brand-accent/15 font-semibold text-brand-accent-dark"
                  : "text-brand-ink/70"
              } ${isToday ? "ring-2 ring-brand-primary" : ""}`}
            >
              {day}
              {hasEvents && (
                <span aria-hidden className="mt-0.5 h-1 w-1 rounded-full bg-brand-accent-dark" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-ink/50">
          Events in {monthFormatter.format(new Date(viewYear, viewMonth, 1))}
        </h3>

        {eventsThisMonth.length === 0 ? (
          <p className="mt-4 text-brand-ink/60">No events this month.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {eventsThisMonth.map((event) => (
              <li key={event.id} className="rounded-2xl bg-brand-cream p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent-dark">
                  {new Date(event.date).toLocaleDateString("en-ZA", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </p>
                <h4 className="mt-1 text-xl font-bold text-brand-primary">{event.title}</h4>
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
        )}
      </div>
    </div>
  );
}
