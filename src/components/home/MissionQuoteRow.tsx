import { NewsletterSignup } from "@/components/home/NewsletterSignup";

export function MissionQuoteRow() {
  return (
    <section className="bg-brand-primary-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
            Our Mission
          </p>
          {/* Paraphrased from the real goals on the About page, not an
              official quoted mission statement — flag if there's exact
              wording you'd rather use instead. */}
          <p className="mt-3 text-white/85">
            To promote, support and represent business in Greater Tzaneen.
          </p>
        </div>

        <blockquote className="border-l-2 border-brand-accent pl-5 text-white/85">
          &ldquo;We are a dynamic business association that supports local
          businesses and their role in the economic prosperity of Greater
          Tzaneen.&rdquo;
        </blockquote>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
            Stay Informed
          </p>
          <p className="mt-3 text-sm text-white/70">
            Subscribe for the latest news and updates.
          </p>
          <div className="mt-3">
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </section>
  );
}
