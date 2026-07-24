export type NavLink = {
  label: string;
  href: string | null; // null = page not built yet in this phase
};

// "New Applications" isn't in this list on purpose — the header's
// "Become a Member" button already links to /apply, matching the
// reference design's separate "Join the Chamber" button rather than a
// nav item. A future "Member Login" link (Phase 2) is a one-line
// addition to this array.
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Directory", href: "/directory" },
  { label: "Invest", href: "/invest" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/articles" },
  { label: "About Us", href: "/about" },
  { label: "COO", href: "/certificate-of-origin" },
  { label: "Awards", href: "/awards" },
  { label: "Contact Us", href: "/contact" },
];
