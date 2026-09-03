import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Tzaneen Chamber of Commerce.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Get in touch" title="Contact Us" />

      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-brand-primary">
              Send us a message
            </h2>
            <div className="mt-6 rounded-3xl bg-brand-cream p-8 shadow-sm">
              <ContactForm />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-primary">Details</h2>
            <dl className="mt-6 space-y-6 text-brand-ink/80">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-brand-ink/50">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a href="tel:+27832809723" className="hover:text-brand-accent-dark">
                    083 280 9723
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-brand-ink/50">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href="mailto:admin@tzaneenchamber.org.za"
                    className="hover:text-brand-accent-dark"
                  >
                    admin@tzaneenchamber.org.za
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-brand-ink/50">
                  Hours
                </dt>
                <dd className="mt-1">Mon &ndash; Fri, 08:00 &ndash; 17:00</dd>
                <dd>Sat &ndash; Sun, closed</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
