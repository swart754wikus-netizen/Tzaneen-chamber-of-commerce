"use client";

import { useMemo, useState } from "react";
import {
  directoryMembers,
  directoryCategories,
  type DirectoryCategory,
} from "@/lib/directory";

export function DirectorySearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DirectoryCategory | "All">("All");

  const results = useMemo(() => {
    return directoryMembers.filter((member) => {
      const matchesQuery = member.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      const matchesCategory = category === "All" || member.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

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
          onChange={(e) => setCategory(e.target.value as DirectoryCategory | "All")}
          className="rounded-xl border border-brand-primary/15 bg-white px-4 py-3 text-brand-ink focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
        >
          <option value="All">All Categories</option>
          {directoryCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((member) => (
          <div
            key={member.name}
            className="rounded-2xl border border-brand-primary/10 p-6 shadow-sm"
          >
            <p className="font-bold text-brand-primary">{member.name}</p>
            <p className="mt-1 text-sm text-brand-ink/60">{member.category}</p>
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <p className="mt-8 text-center text-brand-ink/60">
          No businesses match your search.
        </p>
      )}
    </div>
  );
}
