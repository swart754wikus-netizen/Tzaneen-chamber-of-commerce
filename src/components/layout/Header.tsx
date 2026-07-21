"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/nav";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-primary/10 bg-brand-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
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
          <span className="text-lg font-bold tracking-tight">
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
          <ul className="flex items-center gap-7 text-sm font-semibold">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <Link
                    href={link.href}
                    className="text-brand-primary transition-colors hover:text-brand-accent"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <span
                    className="cursor-default text-brand-primary/30"
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
          <ul className="flex flex-col gap-1 px-4 py-3 text-sm font-semibold">
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
    </header>
  );
}
