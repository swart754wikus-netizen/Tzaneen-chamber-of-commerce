"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAdminAuth } from "@/lib/useAdminAuth";

const adminNav = [
  { label: "Dashboard", href: "/admin" },
  { label: "Events & RSVPs", href: "/admin/events" },
  { label: "Applications", href: "/admin/applications" },
  { label: "Directory", href: "/admin/members" },
  { label: "Exco", href: "/admin/exco" },
  { label: "Articles", href: "/admin/articles" },
  { label: "Documents", href: "/admin/documents" },
];

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAdminAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-brand-ink/60">
        Checking login…
      </div>
    );
  }

  async function handleLogout() {
    if (auth) await signOut(auth);
    router.push("/admin/login");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-primary/10 pb-4">
        <nav className="flex flex-wrap gap-4">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-brand-primary hover:text-brand-accent-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="text-sm font-semibold text-brand-ink/60 hover:text-brand-accent-dark"
        >
          Log Out
        </button>
      </div>

      <div className="mt-8">{children}</div>
    </div>
  );
}
