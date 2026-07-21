export type NavLink = {
  label: string;
  href: string | null; // null = page not built yet in this phase
};

// Matches the old site's nav (Home / About Us / Articles / COO / New
// Applications / Contact Us) plus Awards from the Phase 1 scope. Only Home
// is built so far — the rest stay listed (so the header shape doesn't need
// to change later) but unlinked until their pages exist. A future
// "Member Login" link (Phase 2) is a one-line addition to this array.
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: null },
  { label: "Articles", href: null },
  { label: "Certificate of Origin", href: null },
  { label: "Awards", href: null },
  { label: "New Applications", href: null },
  { label: "Contact Us", href: null },
];
