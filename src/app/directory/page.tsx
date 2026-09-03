import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { DirectorySearch } from "@/components/directory/DirectorySearch";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Business Directory",
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

      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <DirectorySearch />
          </div>
        </section>
      </Reveal>
    </>
  );
}
