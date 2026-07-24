import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { NeedsContent } from "@/components/ui/NeedsContent";

export const metadata: Metadata = {
  title: "Annual Awards — Tzaneen Chamber of Commerce",
  description:
    "Celebrating Greater Tzaneen's businesses at the Tzaneen Chamber of Commerce's Annual Award Ceremony, 25 March 2026.",
};

export default function AwardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="25 March 2026"
        title="Annual Award Ceremony"
        description="Celebrating the businesses driving Greater Tzaneen's economy forward."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <ImagePlaceholder
            label="[NEEDS PHOTO: awards ceremony]"
            className="aspect-video rounded-3xl"
          />

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:admin@tzaneenchamber.org.za?subject=Award%20Nomination"
              className="rounded-full bg-brand-accent px-7 py-3 font-semibold text-white transition-colors hover:bg-brand-accent-dark"
            >
              Nominate Now
            </a>
          </div>

          <div className="mt-10">
            <NeedsContent>
              <p className="mb-2">
                The old site only has a homepage banner for the awards — no
                category list, judging criteria, entry process, or past
                winners were available to pull from. Send these over and
                they&apos;ll replace this note:
              </p>
              <ul className="list-inside list-disc space-y-1">
                <li>Award categories</li>
                <li>Judging criteria / how nominations are decided</li>
                <li>How the nomination process actually works (form, deadline, etc.)</li>
                <li>Past winners or ceremony highlights, if you want them featured</li>
                <li>
                  <strong>The date itself</strong> — 25 March 2026 has
                  already passed as of today. Please confirm the real
                  upcoming date so this page isn&apos;t advertising a past
                  event.
                </li>
              </ul>
            </NeedsContent>
          </div>
        </div>
      </section>
    </>
  );
}
