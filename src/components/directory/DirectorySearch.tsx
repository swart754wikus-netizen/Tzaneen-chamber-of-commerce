"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { getAllMembers, type DirectoryMember } from "@/lib/directory";
import { isFirebaseConfigured } from "@/lib/firebase";

export function DirectorySearch() {
  const [members, setMembers] = useState<DirectoryMember[]>([]);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (!isFirebaseConfigured) {
      return;
    }
    getAllMembers()
      .then(setMembers)
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(members.map((m) => m.category))).sort(),
    [members]
  );

  const results = useMemo(() => {
    return members.filter((member) => {
      const matchesQuery = member.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      const matchesCategory = category === "All" || member.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [members, query, category]);

  if (!isFirebaseConfigured) {
    return (
      <p className="text-center text-brand-ink/60">
        The directory isn&apos;t set up yet — check back soon.
      </p>
    );
  }

  if (loading) {
    return <p className="text-center text-brand-ink/60">Loading directory…</p>;
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search businesses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-brand-primary/15 bg-white px-4 py-3 text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40 sm:flex-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-brand-primary/15 bg-white px-4 py-3 text-brand-ink focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-4 rounded-2xl border border-brand-primary/10 p-6 shadow-sm"
          >
            {member.logoUrl && (
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                <Image src={member.logoUrl} alt="" fill className="object-contain" />
              </div>
            )}
            <div>
              <p className="font-bold text-brand-primary">{member.name}</p>
              <p className="mt-1 text-sm text-brand-ink/60">{member.category}</p>
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <p className="mt-8 text-center text-brand-ink/60">
          {members.length === 0
            ? "No businesses in the directory yet."
            : "No businesses match your search."}
        </p>
      )}
    </div>
  );
}
