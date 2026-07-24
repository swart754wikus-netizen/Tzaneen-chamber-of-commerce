export type NavLink = {
  label: string;
  href: string | null; // null = page not built yet in this phase
};

// Matches the old site's nav (Home / About Us / Articles / COO / New
// Applications / Contact Us) plus Awards from the Phase 1 scope. A future
// "Member Login" link (Phase 2) is a one-line addition to this array.
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Articles", href: "/articles" },
  { label: "COO", href: "/certificate-of-origin" },
  { label: "Awards", href: "/awards" },
  { label: "New Applications", href: "/apply" },
  { label: "Contact Us", href: "/contact" },
];
