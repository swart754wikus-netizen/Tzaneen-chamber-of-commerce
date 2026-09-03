import Image from "next/image";
import Link from "next/link";
import { CallBackRequestForm } from "@/components/home/CallBackRequestForm";
import { ImpactSection } from "@/components/home/ImpactSection";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { MissionQuoteRow } from "@/components/home/MissionQuoteRow";
import { HomeStats } from "@/components/home/HomeStats";
import { TrustedByStrip } from "@/components/home/TrustedByStrip";
import { Reveal } from "@/components/ui/Reveal";

const foundingYear = 1959;
const yearsServing = new Date().getFullYear() - foundingYear;

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
              className="rounded-full bg-brand-accent px-7 py-3 font-semibold text-white shadow-lg shadow-brand-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accent-dark hover:shadow-xl hover:shadow-brand-accent/30"
            >
              Become a Member
            </Link>
            <Link
              href="/directory"
              className="rounded-full border-2 border-white px-7 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-brand-primary"
            >
              Business Directory
            </Link>
          </div>
        </div>
      </section>

      {/* Stat bar — overlaps the hero's bottom edge. Years-serving is real;
          member count and next event are pulled live from Firestore once
          the admin area is set up (see HomeStats). Jobs Supported is still
          a genuinely unknown figure, not something Firestore can derive. */}
      <div className="relative z-10 mx-auto -mb-0.5 -mt-14 max-w-6xl px-4 sm:-mt-16 sm:px-6">
        <HomeStats yearsServing={yearsServing} />
      </div>

      <Reveal>
        <FeatureGrid />
      </Reveal>

      <Reveal>
        <ImpactSection />
      </Reveal>

      {/* Call Back Request */}
      <Reveal>
        <section id="call-back" className="scroll-mt-20 bg-brand-cream">
          <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
            <div className="rounded-3xl bg-white p-8 shadow-lg shadow-brand-primary/5">
              <CallBackRequestForm />
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <MissionQuoteRow />
      </Reveal>

      <Reveal>
        <TrustedByStrip />
      </Reveal>
    </>
  );
}
