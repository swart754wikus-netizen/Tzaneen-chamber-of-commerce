import Link from "next/link";

const socialLinks = [
  { label: "Facebook", href: null },
  { label: "Instagram", href: "https://www.instagram.com/tzaneenchamber" },
  { label: "LinkedIn", href: null },
];

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Footer() {
  return (
    <footer className="bg-brand-primary-dark text-white">
      <div className="h-1.5 bg-brand-accent" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-4 text-sm text-white/80 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <a href="tel:+27832809723" className="flex items-center gap-2 hover:text-brand-accent">
              <svg {...iconProps} aria-hidden>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
              </svg>
              083 280 9723
            </a>
            <a
              href="mailto:admin@tzaneenchamber.org.za"
              className="flex items-center gap-2 hover:text-brand-accent"
            >
              <svg {...iconProps} aria-hidden>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 6 10-6" />
              </svg>
              admin@tzaneenchamber.org.za
            </a>
            <span className="flex items-center gap-2">
              <svg {...iconProps} aria-hidden>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              Mon–Fri, 08:00–17:00
            </span>
          </div>

          {/* Facebook/LinkedIn profile URLs not yet supplied — those two
              stay inert until provided. */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) =>
              social.href ? (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-brand-accent"
                >
                  {social.label}
                </a>
              ) : (
                <span key={social.label} className="text-white/40" title="Profile URL needed">
                  {social.label}
                </span>
              )
            )}
          </div>
        </div>

        <div className="mt-4 border-t border-white/10 pt-4 text-sm">
          <Link href="/documents" className="text-white/70 hover:text-brand-accent">
            Documents & Constitution
          </Link>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-white/60 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Tzaneen Chamber of Commerce. All
            rights reserved.
          </p>
          <p>
            Powered by{" "}
            <a
              href="https://gls-technologies.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white hover:text-brand-accent"
            >
              GLS Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
