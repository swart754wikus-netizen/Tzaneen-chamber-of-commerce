import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { NeedsContent } from "@/components/ui/NeedsContent";
import { MembershipApplicationForm } from "@/components/apply/MembershipApplicationForm";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";

export const metadata: Metadata = {
  title: "New Membership Application — Tzaneen Chamber of Commerce",
  description: "Apply for membership with the Tzaneen Chamber of Commerce.",
};

export default function ApplyPage() {
  return (
    <>
      <PageHeader
        eyebrow="New Applications"
        title="Membership Application"
        description="Join a network representing Greater Tzaneen businesses through advocacy, networking and representation."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
          <div className="rounded-3xl bg-brand-cream p-8 shadow-sm">
            <MembershipApplicationForm />
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-brand-ink/60">
              Prefer not to fill in a form?
            </p>
            <WhatsAppLink message="Hi, I'd like to apply for membership at the Tzaneen Chamber of Commerce." />
          </div>

          <div className="mt-8 rounded-2xl border-2 border-brand-primary/15 bg-brand-primary/5 p-6 text-sm text-brand-ink/70">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-primary">
              What happens when this goes live
            </p>
            <p>
              When this form is submitted, it will be sent via email to the
              admin once the site is live.
            </p>
          </div>

          <div className="mt-8">
            <NeedsContent>
              <p>
                The old site&apos;s application form had at least one more
                field beyond VAT Number that was cut off in the screenshots
                you sent. Send a screenshot of the rest of that form and
                I&apos;ll add the missing field(s) here.
              </p>
            </NeedsContent>
          </div>
        </div>
      </section>
    </>
  );
}
