import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { NeedsContent } from "@/components/ui/NeedsContent";

export const metadata: Metadata = {
  title: "Invest in Tzaneen — Tzaneen Chamber of Commerce",
  description: "Explore investment opportunities in Greater Tzaneen.",
};

const sectors = [
  "Agriculture",
  "Tourism & Hospitality",
  "Retail & Wholesale",
  "Professional Services",
  "Manufacturing & Industry",
  "Technology & Innovation",
  "Construction & Property",
  "Transport & Logistics",
];

export default function InvestPage() {
  return (
    <>
      <PageHeader
        eyebrow="Invest in Tzaneen"
        title="Investment opportunities in Greater Tzaneen"
        description="Explore the sectors driving Greater Tzaneen's economy."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {sectors.map((sector) => (
              <div
                key={sector}
                className="rounded-2xl border border-brand-primary/10 p-5 text-center shadow-sm"
              >
                <p className="font-semibold text-brand-primary">{sector}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <NeedsContent>
              <p>
                These are just general sector categories — there&apos;s no
                real content yet describing actual investment opportunities,
                incentives, or data for each. Send over what you&apos;d like
                featured here (specific opportunities, land/property
                availability, incentive programmes, sector stats) and this
                page gets built out properly instead of being a category
                list.
              </p>
            </NeedsContent>
          </div>
        </div>
      </section>
    </>
  );
}
