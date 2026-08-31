"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllMembers, type DirectoryMember } from "@/lib/directory";
import { isFirebaseConfigured } from "@/lib/firebase";

export function TrustedByStrip() {
  const [members, setMembers] = useState<DirectoryMember[]>([]);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    getAllMembers()
      .then((all) => setMembers(all.slice(0, 8)))
      .catch(() => {});
  }, []);

  if (members.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-brand-ink/50">
          Trusted by leading businesses
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-center gap-2 rounded-xl border border-brand-primary/10 bg-brand-cream px-4 py-6 text-center"
            >
              {member.logoUrl ? (
                <div className="relative h-8 w-full">
                  <Image
                    src={member.logoUrl}
                    alt={member.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <span className="font-bold text-brand-primary">{member.name}</span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-brand-ink/50">
          <Link
            href="/directory"
            className="font-semibold text-brand-accent-dark hover:text-brand-accent"
          >
            View full directory &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
