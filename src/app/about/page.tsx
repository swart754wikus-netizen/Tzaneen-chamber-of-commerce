import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { chamberGoals } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us — Tzaneen Chamber of Commerce",
  description:
    "For more than six decades the Tzaneen Chamber of Commerce has been the heartbeat of Greater Tzaneen's business community.",
};

const forums = [
  "Provincial Government Departments",
  "Local Government Departments",
  "Local Economic Development (LED)",
  "SAPS",
  "Electricity",
  "Greater Tzaneen Economic Development Agency (GTEDA)",
  "Agri-Letaba",
];

const leaders = [
  {
    name: "Hansie Botha",
    note: "Joined the chamber in 1989 and was elected to the executive committee in 2001. One of the longest-serving leaders, having represented the chamber on municipal committees and business forums across multiple terms as president and vice-chair.",
  },
  {
    name: "Conrad Kruger",
    note: "Presided over the chamber's 50th-anniversary celebrations in 2009.",
  },
  {
    name: "Annette Coetzer",
    note: "Around 2016, pledged the chamber's support during the launch of the Greater Tzaneen Municipality's Local Economic Development forum.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Six decades of service to Greater Tzaneen"
        description="From a small gathering of entrepreneurs in the late 1950s to a fully-fledged, nationally recognised chamber."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <div className="space-y-5 text-brand-ink/80">
            <p>
              For more than six decades the Tzaneen Chamber of Commerce
              (Tzaneen Sakekamer) has been the heartbeat of Greater
              Tzaneen&apos;s business community. Its journey from a small
              gathering of entrepreneurs in the late 1950s to a fully-fledged,
              nationally recognised chamber mirrors the growth of the town
              itself. The Tzaneen Chamber of Commerce story begins around
              1959, when local business owners recognized the need for a
              unified organisation to promote commerce and advocate for
              infrastructural improvements.
            </p>
            <p>
              The Chamber&apos;s longevity is undisputed. In May 2009, The
              Tzaneen Chamber of Commerce held a grand 50th Anniversary
              Celebration. Attendees included then-president Conrad Kruger,
              the mayor of Greater Tzaneen and Professor Alwyn Louw of the
              South African Chamber of Commerce and Industry (SACCI),
              underscoring the organization&apos;s provincial and national
              stature.
            </p>
            <p>
              During its early decades the chamber focused on improving basic
              infrastructure — roads, telecommunications and utilities — to
              enable commerce in a predominantly agricultural region. Members
              lobbied for better market access for farmers and supported
              small manufacturers emerging around Tzaneen&apos;s fruit and
              timber industries. The chamber quickly became a respected
              partner of local councils, lending a business perspective to
              municipal planning.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-brand-primary sm:text-3xl">
            Leadership and milestones
          </h2>
          <p className="mt-4 text-brand-ink/80">
            The chamber&apos;s strength lies in its people. Over the years
            dedicated volunteers have served as presidents, vice-chairs and
            committee members, often for decades at a time — bringing unique
            strengths, from networking with provincial government to
            championing new industries like tourism and technology.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {leaders.map((leader) => (
              <div
                key={leader.name}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <p className="font-bold text-brand-primary">{leader.name}</p>
                <p className="mt-2 text-sm text-brand-ink/70">{leader.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-brand-primary sm:text-3xl">
            Partnerships and affiliations
          </h2>
          <div className="mt-4 space-y-5 text-brand-ink/80">
            <p>
              From its earliest years the Tzaneen Chamber of Commerce
              recognised the value of aligning with broader networks. For
              many years it was affiliated with the South African Chamber of
              Commerce and Industry (SACCI) and the Small Business Institute
              (SBI), which gave local businesses a voice on national issues.
            </p>
            <p>
              In 2025 the chamber took a new strategic step by affiliating
              with Sakeliga, an organisation that champions free enterprise
              and property rights in South Africa. This affiliation
              underscores the chamber&apos;s commitment to advocating for an
              enabling environment for businesses — particularly small and
              medium enterprises — in the face of evolving regulatory and
              economic challenges. By aligning with Sakeliga, the chamber
              continues to ensure that the interests of Greater
              Tzaneen&apos;s businesses are represented at provincial and
              national levels.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-brand-primary sm:text-3xl">
            A legacy of service, a vision for the future
          </h2>
          <div className="mt-4 space-y-5 text-brand-ink/80">
            <p>
              The Tzaneen Chamber of Commerce has come a long way since its
              informal beginnings in the late 1950s. It has weathered
              political changes, economic recessions and technological
              revolutions, all while remaining a steadfast advocate for local
              businesses. The chamber&apos;s successes are evident: improved
              infrastructure, thriving agricultural and tourism sectors, and
              generations of entrepreneurs who credit the chamber with
              helping them succeed.
            </p>
            <p>
              The Chamber is a registered non-profit organization and
              Tzaneen&apos;s pivot for the business community. We represent
              businesses and industries in the Greater Tzaneen through
              advocacy and stakeholder engagement, while facilitating growth
              through networking, information sharing and business training.
            </p>
            <p>
              We work to promote Tzaneen as the best city to invest in and do
              business in the Limpopo province — creating a conducive
              environment for regional economic growth and employment
              creation by promoting investment opportunities and cooperation
              with different stakeholders and state institutions.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-brand-primary sm:text-3xl">
            Our goals
          </h2>
          <ul className="mt-4 space-y-3">
            {chamberGoals.map((goal) => (
              <li key={goal} className="flex gap-3 text-brand-ink/80">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent"
                />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-brand-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-brand-primary sm:text-3xl">
            Membership benefits
          </h2>
          <p className="mt-4 text-brand-ink/80">
            We advocate on your behalf in the most important forums of policy
            formation in Greater Tzaneen, including:
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {forums.map((forum) => (
              <li key={forum} className="flex gap-3 text-brand-ink/80">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent"
                />
                <span>{forum}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-3 text-brand-ink/80">
            <p>
              We are actively involved in the development of the Greater
              Tzaneen area through the Integrated Development Plan (IDP)
              programme.
            </p>
            <p>We represent you on national issues through our affiliation to Sakeliga.</p>
            <p>
              We support and create opportunities through networking,
              workshops, information sharing and training.
            </p>
          </div>

          <Link
            href="/apply"
            className="mt-8 inline-block rounded-full bg-brand-primary px-7 py-3 font-semibold text-white transition-colors hover:bg-brand-primary-dark"
          >
            Become a Member
          </Link>
        </div>
      </section>
    </>
  );
}
