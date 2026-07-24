import Image from "next/image";
import Link from "next/link";
import { CallBackRequestForm } from "@/components/home/CallBackRequestForm";
import { ImpactSection } from "@/components/home/ImpactSection";
import { QuickLinks } from "@/components/home/QuickLinks";
import { directoryMembers } from "@/lib/directory";

const foundingYear = 1959;
const yearsServing = new Date().getFullYear() - foundingYear;
// The only date on file for the Annual Award Ceremony (25 Mar 2026) has
// already passed as of today — showing it as "next event" would be
// misleading, so this waits for a real confirmed date instead of
// guessing one.
const nextEvent = {
  name: "Annual Award Ceremony",
  date: "TBC",
};

export default function Home() {
  return (
    <>
      {/* Hero. Photo supplied by the client (aerial view of the Tzaneen
          area) — real photography, not stock/AI. */}
      <section className="relative overflow-hidden bg-brand-primary text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-tzaneen.jpg"
            alt="Aerial view of the Tzaneen area"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary-dark via-brand-primary-dark/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark/80 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-32 sm:px-6 sm:pt-28 sm:pb-40">
          <h1 className="text-4xl font-bold uppercase leading-tight tracking-tight sm:text-6xl">
            Tzaneen Chamber
            <br />
            <span className="text-brand-accent">of Commerce</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            Advocacy, networking and representation for the businesses
            driving Greater Tzaneen&apos;s economy forward.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/apply"
              className="rounded-full bg-brand-accent px-7 py-3 font-semibold text-white transition-colors hover:bg-brand-accent-dark"
            >
              Become a Member
            </Link>
            <a
              href="#call-back"
              className="rounded-full border-2 border-white px-7 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-brand-primary"
            >
              Request a Call Back
            </a>
          </div>
        </div>
      </section>

      {/* Stat bar — overlaps the hero's bottom edge. Years-serving and next
          event are real; member/jobs counts are flagged placeholders, not
          invented figures — send real numbers and they drop straight in. */}
      <div className="relative z-10 mx-auto -mt-14 max-w-6xl px-4 sm:-mt-16 sm:px-6">
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-brand-primary-dark p-6 shadow-xl sm:grid-cols-4 sm:p-8">
          <div className="text-center sm:border-r sm:border-white/10">
            <p className="text-3xl font-bold text-white sm:text-4xl">
              {yearsServing}+
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
              Years serving Greater Tzaneen
            </p>
          </div>
          <div className="text-center sm:border-r sm:border-white/10">
            <p className="text-3xl font-bold text-brand-accent sm:text-4xl">
              [NEEDS CONTENT]
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
              Member businesses
            </p>
          </div>
          <div className="text-center sm:border-r sm:border-white/10">
            <p className="text-3xl font-bold text-brand-accent sm:text-4xl">
              [NEEDS CONTENT]
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
              Jobs supported
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white sm:text-3xl">
              {nextEvent.date}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
              Next event: {nextEvent.name}
            </p>
          </div>
        </div>
      </div>

      <QuickLinks />

      {/* Tagline + contact strip */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-3xl px-4 pt-16 pb-16 sm:px-6">
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

      <ImpactSection />

      {/* Call Back Request */}
      <section id="call-back" className="scroll-mt-20 bg-brand-cream">
        <div className="mx-auto max-w-md px-4 pb-20 sm:px-6">
          <div className="rounded-3xl bg-white p-8 shadow-lg shadow-brand-primary/5">
            <CallBackRequestForm />
          </div>
        </div>
      </section>

      {/* Trusted by — real confirmed member names. No logo image files
          exist yet, so these render as styled text wordmarks rather than
          fabricated/placeholder logo graphics. */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-brand-ink/50">
            Trusted by leading businesses
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {directoryMembers.map((member) => (
              <div
                key={member.name}
                className="flex items-center justify-center rounded-xl border border-brand-primary/10 bg-brand-cream px-4 py-6 text-center"
                title={`Logo file needed for ${member.name}`}
              >
                <span className="font-bold text-brand-primary">
                  {member.name}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-brand-ink/50">
            Real logo files still needed for each — currently shown as text.{" "}
            <Link
              href="/directory"
              className="font-semibold text-brand-accent-dark hover:text-brand-accent"
            >
              View full directory &rarr;
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
