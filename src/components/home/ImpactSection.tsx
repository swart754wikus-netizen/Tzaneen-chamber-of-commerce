const goals = [
  "Assist members to utilize business opportunities in a changing environment",
  "Positively influence the business climate for members and the broader business community",
  "Underwrite a healthy business ethic",
  "Underwrite a market-driven economy in cooperation with all role players",
];

export function ImpactSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {/* Condensed from the real About Us content you sent
            (content/old-site-content.md), not invented. */}
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-brand-primary sm:text-3xl">
              Six decades of service
            </h2>
            <p className="mt-4 text-brand-ink/80">
              For more than six decades the Tzaneen Chamber of Commerce
              (Tzaneen Sakekamer) has been the heartbeat of Greater
              Tzaneen&apos;s business community — from a small gathering of
              entrepreneurs in the late 1950s to a fully-fledged, nationally
              recognised chamber. Along the way it has lobbied for better
              infrastructure and market access, supported the growth of
              Tzaneen&apos;s fruit and timber industries, and remained a
              respected partner of local councils.
            </p>
            <p className="mt-4 text-brand-ink/80">
              We&apos;re affiliated with the South African Chamber of
              Commerce and Industry (SACCI) and, since 2025, with Sakeliga —
              giving Greater Tzaneen&apos;s businesses a voice at provincial
              and national level.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-brand-primary sm:text-3xl">
              Our goals
            </h2>
            <ul className="mt-4 space-y-3">
              {goals.map((goal) => (
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
        </div>
      </div>
    </section>
  );
}
