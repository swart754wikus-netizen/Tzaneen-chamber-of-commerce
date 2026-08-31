import { PageHeader } from "@/components/layout/PageHeader";
import { EventDetail } from "@/components/events/EventDetail";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <PageHeader eyebrow="Events" title="Event details" />
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <EventDetail eventId={id} />
        </div>
      </section>
    </>
  );
}
