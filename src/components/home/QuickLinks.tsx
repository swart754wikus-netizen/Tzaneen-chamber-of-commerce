import Link from "next/link";

type QuickLink = {
  title: string;
  description: string;
  linkLabel: string;
  href: string | null;
  icon: React.ReactNode;
};

const iconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const links: QuickLink[] = [
  {
    title: "Become a Member",
    description:
      "Join a network representing Greater Tzaneen businesses through advocacy, networking and representation.",
    linkLabel: "Apply now",
    href: "/apply",
    icon: (
      <svg {...iconProps}>
        <path d="M17 20h5v-2a4 4 0 0 0-3-3.87" />
        <path d="M9 20H4v-2a4 4 0 0 1 3-3.87" />
        <circle cx="9" cy="7" r="4" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Certificate of Origin",
    description:
      "Certify your exported goods and unlock preferential trade rates through our accredited COO process.",
    linkLabel: "Read the guide",
    href: "/certificate-of-origin",
    icon: (
      <svg {...iconProps}>
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    title: "Annual Awards",
    description:
      "Celebrating Greater Tzaneen's businesses at our Annual Award Ceremony, 25 March 2026.",
    linkLabel: "See the details",
    href: "/awards",
    icon: (
      <svg {...iconProps}>
        <path d="M8 21h8M12 17v4" />
        <path d="M7 4h10v5a5 5 0 0 1-10 0Z" />
        <path d="M7 5H4a3 3 0 0 0 3 4M17 5h3a3 3 0 0 1-3 4" />
      </svg>
    ),
  },
];

export function QuickLinks() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {links.map((link) => (
            <div
              key={link.title}
              className="rounded-2xl border border-brand-primary/10 p-6 shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                {link.icon}
              </span>
              <h3 className="mt-4 font-bold text-brand-primary">{link.title}</h3>
              <p className="mt-2 text-sm text-brand-ink/70">{link.description}</p>
              {link.href ? (
                link.href.startsWith("/") ? (
                  <Link
                    href={link.href}
                    className="mt-4 inline-block text-sm font-semibold uppercase tracking-wide text-brand-accent-dark hover:text-brand-accent"
                  >
                    {link.linkLabel} &rarr;
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="mt-4 inline-block text-sm font-semibold uppercase tracking-wide text-brand-accent-dark hover:text-brand-accent"
                  >
                    {link.linkLabel} &rarr;
                  </a>
                )
              ) : (
                <span
                  className="mt-4 inline-block text-sm font-semibold uppercase tracking-wide text-brand-ink/30"
                  title="This page hasn't been built yet"
                >
                  {link.linkLabel}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
