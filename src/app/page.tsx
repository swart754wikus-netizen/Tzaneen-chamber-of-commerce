import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CallBackRequestForm } from "@/components/home/CallBackRequestForm";

export default function Home() {
  return (
    <>
      {/* Hero / Awards banner. Real photo (award trophy) still needed;
          "Nominate Now" currently points at a mailto since the real
          nomination flow/URL isn't known yet — flag if that should go
          somewhere else. */}
      <section className="bg-brand-primary text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
              Annual Award Ceremony &middot; 25 March 2026
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Tzaneen Chamber of Commerce
            </h1>
            <p className="mt-4 max-w-md text-white/80">
              Advocacy, networking and representation for the businesses
              driving Greater Tzaneen&apos;s economy forward.
            </p>
            <a
              href="mailto:admin@tzaneenchamber.org.za?subject=Award%20Nomination"
              className="mt-8 inline-block rounded-full bg-brand-accent px-7 py-3 font-semibold text-white transition-colors hover:bg-brand-accent-dark"
            >
              Nominate Now
            </a>
          </div>

          <ImagePlaceholder
            variant="dark"
            label="[NEEDS PHOTO: awards ceremony / trophy image]"
            className="aspect-4/3 rounded-3xl shadow-xl md:aspect-square"
          />
        </div>
      </section>

      {/* Tagline + contact strip */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <blockquote className="border-l-4 border-brand-accent pl-6 text-xl leading-relaxed text-brand-ink sm:text-2xl">
            &ldquo;We are a dynamic business association that supports local
            businesses and their role in the economic prosperity of Greater
            Tzaneen, through advocacy, networking, representation and
            information sharing.&rdquo;
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="tel:+27832809723"
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-primary shadow-sm transition-colors hover:text-brand-accent"
            >
              083 280 9723
            </a>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-primary shadow-sm">
              Mon &ndash; Fri, 09h00 &ndash; 16h00
            </span>
          </div>
        </div>
      </section>

      {/* Call Back Request */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-md px-4 pb-20 sm:px-6">
          <div className="rounded-3xl bg-white p-8 shadow-lg shadow-brand-primary/5">
            <CallBackRequestForm />
          </div>
        </div>
      </section>

      {/* Our Members */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-brand-primary sm:text-3xl">
            Our Members
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <ImagePlaceholder
                key={i}
                label="[NEEDS PHOTO: member logo]"
                className="aspect-square rounded-2xl shadow-sm transition-shadow hover:shadow-md"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
