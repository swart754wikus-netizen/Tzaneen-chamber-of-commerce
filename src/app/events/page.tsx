import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { NeedsContent } from "@/components/ui/NeedsContent";
import { getUpcomingEvents, formatEventDate } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events — Tzaneen Chamber of Commerce",
  description: "Upcoming events from the Tzaneen Chamber of Commerce.",
};

export default function EventsPage() {
  const upcomingEvents = getUpcomingEvents();

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Upcoming events"
        description="Network, learn and grow at our upcoming business events."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          {upcomingEvents.length === 0 ? (
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
          ) : (
            <ul className="space-y-4">
              {upcomingEvents.map((event) => (
                <li
                  key={event.name}
                  className="rounded-2xl bg-brand-cream p-6 shadow-sm"
                >
                  <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent-dark">
                    {formatEventDate(event.date)}
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-brand-primary">
                    {event.name}
                  </h2>
                  <p className="mt-2 text-brand-ink/70">
                    {event.description}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10">
            <NeedsContent>
              <p>
                The only event on file is the Annual Award Ceremony (25
                March 2026) — and going by today&apos;s date, that has
                already passed, so it&apos;s not shown as &quot;upcoming&quot;
                above. Please confirm the real date (was it actually a
                different year, or has it just not been updated?) and send
                any other real upcoming events (networking breakfasts,
                workshops, forums).
              </p>
            </NeedsContent>
          </div>
        </div>
      </section>
    </>
  );
}
