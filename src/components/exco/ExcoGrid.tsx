"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllExcoMembers, type ExcoMember } from "@/lib/exco";
import { isFirebaseConfigured } from "@/lib/firebase";

export function ExcoGrid() {
  const [members, setMembers] = useState<ExcoMember[]>([]);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      return;
    }
    getAllExcoMembers()
      .then(setMembers)
      .finally(() => setLoading(false));
  }, []);

  if (!isFirebaseConfigured) {
    return (
      <p className="text-center text-brand-ink/60">
        Exco profiles aren&apos;t set up yet — check back soon.
      </p>
    );
  }

  if (loading) {
    return <p className="text-center text-brand-ink/60">Loading…</p>;
  }

  if (members.length === 0) {
    return (
      <p className="text-center text-brand-ink/60">
        Exco profiles will appear here once added.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <div
          key={member.id}
          className="rounded-2xl border border-brand-primary/10 bg-white p-6 text-center shadow-sm"
        >
          <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full bg-brand-cream">
            {member.photoUrl ? (
              <Image src={member.photoUrl} alt={member.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-brand-primary/30">
                {member.name.charAt(0)}
              </div>
            )}
          </div>
          <p className="mt-4 font-bold text-brand-primary">{member.name}</p>
          <p className="text-sm text-brand-ink/60">{member.title}</p>
        </div>
      ))}
    </div>
  );
}
