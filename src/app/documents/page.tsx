import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { DocumentsList } from "@/components/documents/DocumentsList";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Documents",
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

      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <DocumentsList />
          </div>
        </section>
      </Reveal>
    </>
  );
}
