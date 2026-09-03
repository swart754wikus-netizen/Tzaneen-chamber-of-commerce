import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { EventsCalendar } from "@/components/events/EventsCalendar";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming events from the Tzaneen Chamber of Commerce.",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Events calendar"
        description="Browse by month to see what's on at the Chamber."
      />

      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <EventsCalendar />
          </div>
        </section>
      </Reveal>
    </>
  );
}
