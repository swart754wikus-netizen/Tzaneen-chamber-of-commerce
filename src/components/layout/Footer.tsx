const socialLinks = [
  { label: "Facebook", href: null },
  { label: "Instagram", href: null },
  { label: "LinkedIn", href: null },
];

export function Footer() {
  return (
    <footer className="bg-brand-primary-dark text-white">
      <div className="h-1.5 bg-brand-accent" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-lg font-semibold">Tzaneen Chamber of Commerce</p>
            <p className="mt-2 text-sm text-white/70">
              Supporting local businesses and the economic prosperity of Greater
              Tzaneen through advocacy, networking, representation and
              information sharing.
            </p>
          </div>

          <div className="text-sm text-white/80">
            <p className="font-semibold text-white">Contact</p>
            <p className="mt-2">
              Phone:{" "}
              <a href="tel:+27832809723" className="hover:text-brand-accent">
                083 280 9723
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:admin@tzaneenchamber.org.za"
                className="hover:text-brand-accent"
              >
                admin@tzaneenchamber.org.za
              </a>
            </p>
            <p className="mt-2">Tzaneen Showground, Tzaneen, 0850</p>
            <p>Mon–Fri 09:00–16:00, Sat–Sun closed</p>
          </div>

          <div className="text-sm text-white/80">
            <p className="font-semibold text-white">Follow us</p>
            {/* Real profile URLs not yet supplied — links intentionally
                inert until provided. */}
            <ul className="mt-2 space-y-1">
              {socialLinks.map((social) => (
                <li key={social.label} className="text-white/40" title="Profile URL needed">
                  {social.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
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
