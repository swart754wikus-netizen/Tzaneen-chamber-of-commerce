import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { NeedsContent } from "@/components/ui/NeedsContent";
import { FaqAccordion } from "@/components/coo/FaqAccordion";

export const metadata: Metadata = {
  title: "Certificate of Origin — Tzaneen Chamber of Commerce",
  description:
    "Certify your exported goods and unlock preferential trade rates through the Tzaneen Chamber of Commerce's accredited Certificate of Origin process.",
};

const requirements = [
  "A completed CO application form.",
  "Proof of origin of goods (manufacturing invoices, supplier declarations, or production records).",
  "Detailed description of the goods being exported.",
  "Supporting documents as required by the specific type of CO (preferential or non-preferential).",
];

const steps = [
  {
    title: "Preparation",
    detail:
      "Before applying, make sure you have your export invoice, proof of origin, and any other relevant documentation ready.",
  },
  {
    title: "Application submission",
    detail: "Access the CO application platform (eCOO SmartAdmin).",
  },
  {
    title: "Filling out the application",
    detail:
      "Complete the form with accurate shipment details — a comprehensive description of the goods, their origin, and destination.",
  },
  {
    title: "Document upload",
    detail:
      "Upload all supporting documents directly on the platform, making sure they're clear and legible.",
  },
  {
    title: "Review and submission",
    detail:
      "Review your application for accuracy and submit it along with the appropriate fee (R200 for members, R300 for non-members).",
  },
  {
    title: "Chamber review",
    detail:
      "The Chamber's team reviews your application and will contact you promptly if additional information is needed.",
  },
  {
    title: "Issuance of the CO",
    detail:
      "Upon successful verification, your Certificate of Origin is processed and issued.",
  },
];

const faqItems = [
  {
    question: "What is a Certificate of Origin?",
    answer:
      "A Certificate of Origin is more than just a document — it's a passport for goods traversing international borders. It certifies that the products exported from one country are wholly obtained, produced, manufactured, or processed in a specific region.",
  },
  {
    question: "Why do I need a COO?",
    answer:
      "Many countries require a COO for customs clearance to ensure goods meet legal import standards. It can also unlock reduced tariffs under trade agreements, and is sometimes the only way to prove goods meet the origin criteria a market requires.",
  },
  {
    question: "How do I apply for a COO?",
    answer:
      "Prepare your export invoice and proof of origin, then submit your application through eCOO SmartAdmin with a full description of your goods, origin and destination. Upload your supporting documents and submit with the applicable fee — the Chamber reviews your application and issues the CO once verified.",
  },
  {
    question: "Can non-members apply for a COO?",
    answer:
      "Yes — all exporters, whether members or non-members of the Tzaneen Chamber of Commerce, are eligible to apply for a COO. The cost is R200 per application for members and R300 for non-members.",
  },
  {
    question: "How long does it take to process a COO application?",
    answer:
      "Processing is electronic and immediate — applications are typically processed the same day. Once approved, your Certificate of Origin is issued electronically as a digital copy that's widely accepted by customs authorities worldwide.",
  },
];

function ApplyNowButton() {
  return (
    <span
      className="inline-block cursor-default rounded-full border-2 border-dashed border-brand-primary/30 px-7 py-3 font-semibold text-brand-primary/40"
      title="Links to the eCOO SmartAdmin platform — real URL needed from the client"
    >
      Apply Now (link coming soon)
    </span>
  );
}

export default function CertificateOfOriginPage() {
  return (
    <>
      <PageHeader
        eyebrow="Certificate of Origin"
        title="Your guide to the COO application process"
        description="A Certificate of Origin affirms the birthplace of your exported goods — the Tzaneen Chamber of Commerce is accredited to issue them."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <p className="text-brand-ink/80">
            In the realm of international trade, the Certificate of Origin
            (COO) stands as a pivotal document, affirming the birthplace of
            exported goods. As the Tzaneen Chamber of Commerce, we take pride
            in our role of issuing these certificates, ensuring local
            businesses seamlessly navigate the complex tapestry of global
            trade.
          </p>
          <div className="mt-6">
            <ApplyNowButton />
          </div>
        </div>
      </section>

      <section className="bg-brand-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-brand-primary sm:text-3xl">
            Understanding the Certificate of Origin
          </h2>
          <p className="mt-4 text-brand-ink/80">
            A Certificate of Origin is more than just a document; it&apos;s a
            passport for goods traversing international borders. It certifies
            that products exported from one country are wholly obtained,
            produced, manufactured, or processed in a specific region. This
            verification matters for a few reasons:
          </p>
          <ol className="mt-4 space-y-3">
            {[
              {
                title: "Trade Compliance",
                detail:
                  "Many countries require a COO for customs clearance, ensuring goods meet the legal standards for importation.",
              },
              {
                title: "Tariff Reductions",
                detail:
                  "Under various trade agreements, goods from certain countries are eligible for reduced tariffs — a COO can unlock these preferential rates.",
              },
              {
                title: "Market Access",
                detail:
                  "Some markets are only accessible if goods meet specific origin criteria, which the COO proves.",
              },
            ].map((reason, i) => (
              <li key={reason.title} className="flex gap-3 text-brand-ink/80">
                <span className="font-bold text-brand-accent-dark">
                  {i + 1}.
                </span>
                <span>
                  <strong className="text-brand-primary">{reason.title}</strong>
                  : {reason.detail}
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-6 text-brand-ink/80">
            There are two primary types of Certificates of Origin:{" "}
            <strong className="text-brand-primary">Non-Preferential COOs</strong>{" "}
            (used for general export purposes, no tariff benefit) and{" "}
            <strong className="text-brand-primary">Preferential COOs</strong>{" "}
            (issued under specific trade agreements like SADC or the EU,
            allowing reduced tariffs or exemptions).
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-brand-primary sm:text-3xl">
            The role of Tzaneen Chamber of Commerce
          </h2>
          <p className="mt-4 text-brand-ink/80">
            Our accreditation and authority to issue Certificates of Origin
            place us at a unique vantage point to support the local business
            community in international trade. Our role encompasses:
          </p>
          <ul className="mt-4 space-y-3">
            {[
              {
                title: "Verification and Authentication",
                detail:
                  "We rigorously verify the information provided by exporters to ensure compliance with international trade regulations.",
              },
              {
                title: "Guidance and Support",
                detail:
                  "Our experienced team offers guidance and support, helping businesses understand the nuances of CO requirements.",
              },
              {
                title: "Advocacy and Representation",
                detail:
                  "We represent the interests of local businesses, advocating for policies and practices that facilitate smoother, more efficient trade.",
              },
            ].map((role) => (
              <li key={role.title} className="flex gap-3 text-brand-ink/80">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent"
                />
                <span>
                  <strong className="text-brand-primary">{role.title}</strong>
                  : {role.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-brand-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-brand-primary sm:text-3xl">
            Pricing
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-brand-primary">R200</p>
              <p className="mt-1 text-sm text-brand-ink/70">Per application, for members</p>
            </div>
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-brand-primary">R300</p>
              <p className="mt-1 text-sm text-brand-ink/70">Per application, for non-members</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-brand-primary sm:text-3xl">
            Eligibility and requirements
          </h2>
          <p className="mt-4 text-brand-ink/80">
            All exporters, whether members or non-members of the Tzaneen
            Chamber of Commerce, are eligible to apply for a COO. You&apos;ll
            need:
          </p>
          <ul className="mt-4 space-y-3">
            {requirements.map((req) => (
              <li key={req} className="flex gap-3 text-brand-ink/80">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent"
                />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-brand-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-brand-primary sm:text-3xl">
            Step-by-step application process
          </h2>
          <ol className="mt-6 space-y-4">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-brand-primary">{step.title}</p>
                  <p className="text-sm text-brand-ink/70">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <p className="font-semibold text-brand-primary">
              Processing time &amp; delivery
            </p>
            <p className="mt-2 text-sm text-brand-ink/70">
              Processing is electronic and immediate — same day. Upon
              approval, your Certificate of Origin is issued electronically as
              a digital copy, widely accepted by customs authorities
              worldwide.
            </p>
          </div>

          <div className="mt-6">
            <ApplyNowButton />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-brand-primary sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-6">
            <FaqAccordion items={faqItems} />
          </div>

          <div className="mt-10">
            <NeedsContent>
              <p>
                The eCOO SmartAdmin application link isn&apos;t known yet —
                send it over and the &quot;Apply Now&quot; buttons on this
                page go live immediately.
              </p>
            </NeedsContent>
          </div>
        </div>
      </section>
    </>
  );
}
