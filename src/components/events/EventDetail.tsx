"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getEvent, formatEventDate, type ChamberEvent } from "@/lib/events";
import { RsvpForm } from "@/components/events/RsvpForm";

export function EventDetail({ eventId }: { eventId: string }) {
  const [event, setEvent] = useState<ChamberEvent | null | undefined>(
    undefined
  );

  useEffect(() => {
    getEvent(eventId).then(setEvent).catch(() => setEvent(null));
  }, [eventId]);

  if (event === undefined) {
    return <p className="text-center text-brand-ink/60">Loading…</p>;
  }
  if (event === null) {
    notFound();
  }

  return (
    <div>
      {event.photoUrl && (
        <div className="relative mb-6 aspect-video overflow-hidden rounded-2xl">
          <Image src={event.photoUrl} alt={event.title} fill className="object-cover" />
        </div>
      )}
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent-dark">
        {formatEventDate(event.date)}
      </p>
      <h1 className="mt-1 text-2xl font-bold text-brand-primary sm:text-3xl">
        {event.title}
      </h1>
      <p className="mt-4 text-brand-ink/80">{event.description}</p>

      {event.rsvpEnabled && (
        <div className="mt-10 rounded-3xl bg-brand-cream p-8 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-brand-primary">RSVP</h2>
          <RsvpForm eventId={event.id} />
        </div>
      )}
    </div>
  );
}
