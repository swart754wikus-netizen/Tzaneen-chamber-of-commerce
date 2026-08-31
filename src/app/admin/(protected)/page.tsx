import Link from "next/link";

const cards = [
  {
    href: "/admin/events",
    title: "Events & RSVPs",
    description: "Create events, upload photos, view and export RSVPs.",
  },
  {
    href: "/admin/applications",
    title: "Membership Applications",
    description: "View and export new membership applications.",
  },
  {
    href: "/admin/members",
    title: "Directory",
    description: "Add, edit or remove member businesses.",
  },
  {
    href: "/admin/exco",
    title: "Exco",
    description: "Manage Exco members' names, titles and photos.",
  },
  {
    href: "/admin/documents",
    title: "Documents",
    description: "Upload letters (view-only) and the Constitution.",
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-primary">Admin Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-brand-primary/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="font-semibold text-brand-primary">{card.title}</p>
            <p className="mt-1 text-sm text-brand-ink/60">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
