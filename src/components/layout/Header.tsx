"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/nav";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-primary/10 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-brand-primary"
          onClick={() => setMenuOpen(false)}
        >
          {/* Real logo asset (circular Tzaneen Chamber / Sakekamer seal) not
              yet supplied — placeholder mark stands in until it is. */}
          <span
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-brand-primary/40 text-[10px] font-semibold leading-tight"
            title="Logo placeholder — real logo file needed"
          >
            TCC
          </span>
          <span className="whitespace-nowrap text-base font-bold tracking-tight xl:text-lg">
            Tzaneen Chamber of Commerce
          </span>
        </Link>

        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-4 text-xs font-semibold uppercase xl:gap-5 xl:text-sm">
            {navLinks.map((link) => (
              <li key={link.label} className="whitespace-nowrap">
                {link.href ? (
                  <Link
                    href={link.href}
                    className="border-b-2 border-brand-accent pb-1 text-brand-primary"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <span
                    className="cursor-default pb-1 text-brand-primary/30"
                    title={`${link.label} — coming soon`}
                  >
                    {link.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* A future "Member Login" link (Phase 2) belongs right here, next
            to the CTA button — left out of the visible row for now since
            fitting the full nav plus an inert label made the header
            cramped; it's a one-line addition once auth exists. */}
        <div className="hidden lg:block">
          <a
            href="mailto:admin@tzaneenchamber.org.za?subject=Membership%20Enquiry"
            className="whitespace-nowrap rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-primary-dark xl:px-5 xl:py-2.5 xl:text-sm"
          >
            Become a Member
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-brand-primary lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-brand-primary/10 lg:hidden" aria-label="Primary mobile">
          <ul className="flex flex-col gap-1 px-4 py-3 text-sm font-semibold uppercase">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <Link
                    href={link.href}
                    className="block rounded-lg px-3 py-2 text-brand-primary transition-colors hover:bg-brand-primary/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <span
                    className="block cursor-default rounded-lg px-3 py-2 text-brand-primary/30"
                    title={`${link.label} — coming soon`}
                  >
                    {link.label}
                  </span>
                )}
              </li>
            ))}
            <li className="mt-2 border-t border-brand-primary/10 pt-2">
              <a
                href="mailto:admin@tzaneenchamber.org.za?subject=Membership%20Enquiry"
                className="block rounded-full bg-brand-primary px-4 py-2.5 text-center text-white"
                onClick={() => setMenuOpen(false)}
              >
                Become a Member
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
