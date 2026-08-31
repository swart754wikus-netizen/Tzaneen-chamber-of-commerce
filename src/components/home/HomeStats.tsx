"use client";

import { useEffect, useState } from "react";
import { isFirebaseConfigured } from "@/lib/firebase";
import { getAllMembers } from "@/lib/directory";
import { getAllEvents, getUpcomingEvents, formatEventDate } from "@/lib/events";

const statIconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function HomeStats({ yearsServing }: { yearsServing: number }) {
  const [memberCount, setMemberCount] = useState<number | null>(null);
  const [nextEvent, setNextEvent] = useState<{ title: string; date: string } | null>(
    null
  );

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    getAllMembers()
      .then((members) => setMemberCount(members.length))
      .catch(() => {});
    getAllEvents()
      .then((events) => {
        const upcoming = getUpcomingEvents(events);
        if (upcoming.length > 0) {
          setNextEvent({ title: upcoming[0].title, date: upcoming[0].date });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6 rounded-2xl bg-brand-primary-dark p-6 shadow-xl sm:grid-cols-4 sm:p-8">
      <div className="flex flex-col items-center text-center sm:border-r sm:border-white/10">
        <svg {...statIconProps} className="text-brand-accent">
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
        <p className="mt-2 text-3xl font-bold text-white sm:text-4xl">
          {yearsServing}+
        </p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
          Years Serving Tzaneen
        </p>
      </div>
      <div className="flex flex-col items-center text-center sm:border-r sm:border-white/10">
        <svg {...statIconProps} className="text-brand-accent">
          <path d="M17 20h5v-2a4 4 0 0 0-3-3.87" />
          <path d="M9 20H4v-2a4 4 0 0 1 3-3.87" />
          <circle cx="9" cy="7" r="4" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <p className="mt-2 text-3xl font-bold text-brand-accent sm:text-4xl">
          {memberCount !== null ? `${memberCount}+` : "—"}
        </p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
          Member Businesses
        </p>
      </div>
      <div className="flex flex-col items-center text-center sm:border-r sm:border-white/10">
        <svg {...statIconProps} className="text-brand-accent">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
        <p className="mt-2 text-3xl font-bold text-brand-accent sm:text-4xl">
          [NEEDS CONTENT]
        </p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
          Jobs Supported
        </p>
      </div>
      <div className="flex flex-col items-center text-center">
        <svg {...statIconProps} className="text-brand-accent">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
        <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          {nextEvent ? formatEventDate(nextEvent.date) : "TBC"}
        </p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
          Next Event{nextEvent ? `: ${nextEvent.title}` : ""}
        </p>
      </div>
    </div>
  );
}
