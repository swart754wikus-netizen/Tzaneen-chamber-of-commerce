import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { NeedsContent } from "@/components/ui/NeedsContent";
import { DirectorySearch } from "@/components/directory/DirectorySearch";

export const metadata: Metadata = {
  title: "Business Directory — Tzaneen Chamber of Commerce",
  description: "Find trusted local businesses and Chamber members in Tzaneen.",
};

export default function DirectoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Business Directory"
        title="Find businesses in Tzaneen"
        description="Search our directory of Chamber member businesses."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <DirectorySearch />

          <div className="mt-10">
            <NeedsContent>
              <p>
                This is a partial list — only the 8 member names you
                confirmed are real. To build out the full directory, send:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>The rest of your member business list</li>
                <li>Logo files for each (no stock/placeholder logos used)</li>
                <li>
                  Contact details / category corrections — the categories
                  shown are my best guess from public knowledge of these
                  companies, not chamber-supplied data
                </li>
              </ul>
            </NeedsContent>
          </div>
        </div>
      </section>
    </>
  );
}
