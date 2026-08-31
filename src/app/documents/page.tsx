import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { DocumentsList } from "@/components/documents/DocumentsList";

export const metadata: Metadata = {
  title: "Documents — Tzaneen Chamber of Commerce",
  description: "Chamber documents, letters and the Constitution.",
};

export default function DocumentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Documents"
        description="The Chamber's Constitution and official letters."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <DocumentsList />
        </div>
      </section>
    </>
  );
}
