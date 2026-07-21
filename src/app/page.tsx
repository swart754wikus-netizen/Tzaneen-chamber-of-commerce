import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CallBackRequestForm } from "@/components/home/CallBackRequestForm";

export default function Home() {
  return (
    <>
      {/* Hero / Awards banner — mirrors the old site's homepage hero. Real
          photo (award trophy) still needed; "Nominate Now" currently
          points at a mailto since the real nomination flow/URL isn't
          known yet — flag if that should go somewhere else. */}
      <section className="relative overflow-hidden bg-brand-green-dark text-white">
        <ImagePlaceholder
          variant="dark"
          label="[NEEDS PHOTO: awards ceremony / trophy image]"
          className="absolute inset-0 h-full w-full border-none opacity-40"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Tzaneen Chamber of Commerce
          </h1>
          <p className="mt-4 text-lg text-white/90 sm:text-xl">
            Annual Award Ceremony | 25 March 2026
          </p>
          <a
            href="mailto:admin@tzaneenchamber.org.za?subject=Award%20Nomination"
            className="mt-6 inline-block rounded-md bg-brand-gold px-6 py-3 font-semibold text-brand-green-dark transition-colors hover:bg-brand-gold-dark"
          >
            Nominate Now!
          </a>
        </div>
      </section>

      {/* Tagline + contact strip */}
      <section className="bg-brand-green text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
          <p className="text-lg italic leading-relaxed sm:text-xl">
            &ldquo;We are a dynamic business association that supports local
            businesses and their role in the economic prosperity of Greater
            Tzaneen, through advocacy, networking, representation and
            information sharing.&rdquo;
          </p>

          <div className="mt-8 flex flex-col items-center gap-2 text-sm text-white/90 sm:flex-row sm:justify-center sm:gap-6">
            <a href="tel:+27832809723" className="hover:text-brand-gold">
              083 280 9723
            </a>
            <span aria-hidden className="hidden sm:inline">
              &middot;
            </span>
            <span>Mon &ndash; Fri 09h00 &ndash; 16h00</span>
          </div>
        </div>
      </section>

      {/* Call Back Request */}
      <section className="bg-brand-green-dark text-white">
        <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
          <CallBackRequestForm />
        </div>
      </section>

      {/* Our Members */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-brand-green-dark">
            Our Members
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <ImagePlaceholder
                key={i}
                label="[NEEDS PHOTO: member logo]"
                className="aspect-square rounded-md"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
