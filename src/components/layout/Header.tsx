"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/nav";

const socialLabels = ["Facebook", "Instagram", "LinkedIn"];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Slim utility bar — also where a future "Member Login" link
          (Phase 2) will go once auth exists; shown inert for now like the
          other not-yet-built nav items. */}
      <div className="hidden bg-brand-primary-dark text-xs text-white/70 sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
          <div className="flex items-center gap-4">
            <span>Tzaneen Showground, Tzaneen, 0850</span>
            <a href="tel:+27832809723" className="hover:text-brand-accent">
              083 280 9723
            </a>
            <a
              href="mailto:admin@tzaneenchamber.org.za"
              className="hover:text-brand-accent"
            >
              admin@tzaneenchamber.org.za
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span
              className="cursor-default text-white/30"
              title="Member Login — coming in a later phase"
            >
              Member Login
            </span>
            {socialLabels.map((label) => (
              <span
                key={label}
                className="cursor-default text-white/30"
                title={`${label} — profile URL needed`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-brand-primary/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-3 text-brand-primary"
            onClick={() => setMenuOpen(false)}
          >
            {/* Real logo asset (circular Tzaneen Chamber / Sakekamer seal)
                not yet supplied — placeholder mark stands in until it is. */}
            <span
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-brand-primary/40 text-[10px] font-semibold leading-tight"
              title="Logo placeholder — real logo file needed"
            >
              TCC
            </span>
            <span className="whitespace-nowrap text-base font-bold tracking-tight lg:text-lg">
              Tzaneen Chamber of Commerce
            </span>
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-brand-primary sm:hidden"
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

          <nav className="hidden sm:block" aria-label="Primary">
            <ul className="flex items-center gap-4 text-xs font-semibold uppercase lg:gap-6 lg:text-sm">
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
        </div>

        {menuOpen && (
          <nav className="border-t border-brand-primary/10 sm:hidden" aria-label="Primary mobile">
            <ul className="flex flex-col gap-1 px-4 py-3 text-sm font-semibold uppercase tracking-wide">
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
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
