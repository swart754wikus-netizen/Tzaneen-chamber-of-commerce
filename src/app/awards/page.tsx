import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Annual Awards",
  description:
    "Celebrating Greater Tzaneen's businesses at the Tzaneen Chamber of Commerce's Annual Award Ceremony.",
};

export default function AwardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Date to be confirmed"
        title="Annual Award Ceremony"
        description="Celebrating the businesses driving Greater Tzaneen's economy forward."
      />

      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <ImagePlaceholder
              label="[NEEDS PHOTO: awards ceremony]"
              className="aspect-video rounded-3xl"
            />

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:admin@tzaneenchamber.org.za?subject=Award%20Nomination"
                className="rounded-full bg-brand-accent px-7 py-3 font-semibold text-white shadow-md shadow-brand-accent/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accent-dark hover:shadow-lg"
              >
                Nominate Now
              </a>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
