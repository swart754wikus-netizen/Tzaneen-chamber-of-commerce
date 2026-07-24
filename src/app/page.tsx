import Image from "next/image";
import Link from "next/link";
import { CallBackRequestForm } from "@/components/home/CallBackRequestForm";
import { ImpactSection } from "@/components/home/ImpactSection";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { MissionQuoteRow } from "@/components/home/MissionQuoteRow";
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

const statIconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
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
            <Link
              href="/directory"
              className="rounded-full border-2 border-white px-7 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-brand-primary"
            >
              Business Directory
            </Link>
          </div>
        </div>
      </section>

      {/* Stat bar — overlaps the hero's bottom edge. Years-serving is real;
          member/jobs counts are flagged placeholders, not invented figures.
          Next event shows TBC — the only date on file already passed. */}
      <div className="relative z-10 mx-auto -mt-14 max-w-6xl px-4 sm:-mt-16 sm:px-6">
        <div className="grid grid-cols-2 gap-6 rounded-2xl bg-brand-primary-dark p-6 shadow-xl sm:grid-cols-4 sm:p-8">
          <div className="flex flex-col items-center text-center sm:border-r sm:border-white/10">
            <svg {...statIconProps} className="text-brand-accent">
              <rect x="3" y="4" width="18" height="17" rx="2" />
              <path d="M3 9h18M8 3v4M16 3v4" />
            </svg>
            <p className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              {yearsServing}+
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
              Years Serving Tzaneen
            </p>
          </div>
          <div className="flex flex-col items-center text-center sm:border-r sm:border-white/10">
            <svg {...statIconProps} className="text-brand-accent">
              <path d="M17 20h5v-2a4 4 0 0 0-3-3.87" />
              <path d="M9 20H4v-2a4 4 0 0 1 3-3.87" />
              <circle cx="9" cy="7" r="4" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <p className="mt-2 text-3xl font-bold text-brand-accent sm:text-4xl">
              [NEEDS CONTENT]
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
              Member Businesses
            </p>
          </div>
          <div className="flex flex-col items-center text-center sm:border-r sm:border-white/10">
            <svg {...statIconProps} className="text-brand-accent">
              <rect x="3" y="7" width="18" height="13" rx="2" />
              <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            <p className="mt-2 text-3xl font-bold text-brand-accent sm:text-4xl">
              [NEEDS CONTENT]
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
              Jobs Supported
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <svg {...statIconProps} className="text-brand-accent">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
            <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              {nextEvent.date}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
              Next Event: {nextEvent.name}
            </p>
          </div>
        </div>
      </div>

      <FeatureGrid />

      <ImpactSection />

      {/* Call Back Request */}
      <section id="call-back" className="scroll-mt-20 bg-brand-cream">
        <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
          <div className="rounded-3xl bg-white p-8 shadow-lg shadow-brand-primary/5">
            <CallBackRequestForm />
          </div>
        </div>
      </section>

      <MissionQuoteRow />

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
