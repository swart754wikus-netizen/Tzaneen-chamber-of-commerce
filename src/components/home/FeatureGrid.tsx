import Link from "next/link";

const iconProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const panels = [
  {
    title: "Directory",
    description: "Find trusted local businesses and Chamber members.",
    href: "/directory",
    linkLabel: "Browse Directory",
    icon: (
      <svg {...iconProps}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    ),
  },
  {
    title: "Invest",
    description: "Explore investment opportunities in Greater Tzaneen.",
    href: "/invest",
    linkLabel: "Explore Opportunities",
    icon: (
      <svg {...iconProps}>
        <path d="M3 17 9 11 13 15 21 7" />
        <path d="M15 7h6v6" />
      </svg>
    ),
  },
  {
    title: "Events",
    description: "Network, learn and grow at our business events.",
    href: "/events",
    linkLabel: "View Events",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </svg>
    ),
  },
  {
    title: "News",
    description: "Updates from the Chamber and the business community.",
    href: "/articles",
    linkLabel: "Read News",
    icon: (
      <svg {...iconProps}>
        <path d="M4 4h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
        <path d="M8 9h6M8 13h6M8 17h3" />
      </svg>
    ),
  },
];

export function FeatureGrid() {
  return (
    <section className="bg-brand-primary-dark">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {panels.map((panel) => (
          <Link
            key={panel.title}
            href={panel.href}
            className="group relative flex aspect-[4/3] flex-col items-center justify-center gap-3 overflow-hidden text-center text-white"
          >
            {/* [NEEDS PHOTO] — real photography for each panel still
                needed; a plain tinted background stands in for now
                (border-only, no overlapping placeholder text). */}
            <div
              aria-hidden
              className="absolute inset-0 border border-dashed border-white/15 bg-brand-primary opacity-90 transition-opacity group-hover:opacity-100"
            />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-accent text-brand-accent">
              {panel.icon}
            </div>
            <h3 className="relative text-lg font-bold uppercase tracking-wide">
              {panel.title}
            </h3>
            <p className="relative max-w-[16rem] px-4 text-sm text-white/80">
              {panel.description}
            </p>
            <span className="relative text-xs font-semibold uppercase tracking-wide text-brand-accent">
              {panel.linkLabel} &rarr;
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
