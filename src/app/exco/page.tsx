import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ExcoGrid } from "@/components/exco/ExcoGrid";

export const metadata: Metadata = {
  title: "Executive Committee",
  description: "Meet the Executive Committee of the Tzaneen Chamber of Commerce.",
};

export default function ExcoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Leadership"
        title="Executive Committee"
        description="The volunteers leading the Tzaneen Chamber of Commerce."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <ExcoGrid />
        </div>
      </section>
    </>
  );
}
