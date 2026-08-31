import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { EventsList } from "@/components/events/EventsList";

export const metadata: Metadata = {
  title: "Events — Tzaneen Chamber of Commerce",
  description: "Upcoming events from the Tzaneen Chamber of Commerce.",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Upcoming events"
        description="Network, learn and grow at our upcoming business events."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <EventsList />
        </div>
      </section>
    </>
  );
}
