import { PageHeader } from "@/components/layout/PageHeader";
import { DocumentViewer } from "@/components/documents/DocumentViewer";

export default async function DocumentViewerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <PageHeader eyebrow="Documents" title="Document" />
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <DocumentViewer documentId={id} />
        </div>
      </section>
    </>
  );
}
