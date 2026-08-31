"use client";

import { useEffect, useState } from "react";
import { getAllExcoMembers, deleteExcoMember, type ExcoMember } from "@/lib/exco";
import { ExcoMemberForm } from "@/components/admin/ExcoMemberForm";

export default function AdminExcoPage() {
  const [members, setMembers] = useState<ExcoMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  function refresh() {
    getAllExcoMembers()
      .then(setMembers)
      .finally(() => setLoading(false));
  }

  useEffect(refresh, []);

  async function handleDelete(id: string) {
    if (!confirm("Remove this Exco profile? (Use this when someone resigns.)")) return;
    await deleteExcoMember(id);
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-primary">Exco</h1>
        {!creating && (
          <button
            onClick={() => setCreating(true)}
            className="rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-accent-dark"
          >
            + Add Exco Member
          </button>
        )}
      </div>

      {creating && (
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <ExcoMemberForm
            nextOrder={members.length}
            onSaved={() => {
              setCreating(false);
              refresh();
            }}
            onCancel={() => setCreating(false)}
          />
        </div>
      )}

      {loading ? (
        <p className="mt-8 text-brand-ink/60">Loading…</p>
      ) : members.length === 0 ? (
        <p className="mt-8 text-brand-ink/60">No Exco members yet.</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {members.map((member) =>
            editingId === member.id ? (
              <li key={member.id} className="rounded-2xl bg-white p-6 shadow-sm">
                <ExcoMemberForm
                  member={member}
                  nextOrder={members.length}
                  onSaved={() => {
                    setEditingId(null);
                    refresh();
                  }}
                  onCancel={() => setEditingId(null)}
                />
              </li>
            ) : (
              <li
                key={member.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="font-bold text-brand-primary">{member.name}</p>
                  <p className="text-sm text-brand-ink/60">{member.title}</p>
                </div>
                <div className="flex gap-3 text-sm font-semibold">
                  <button
                    onClick={() => setEditingId(member.id)}
                    className="text-brand-primary hover:text-brand-accent-dark"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="text-brand-accent-dark hover:text-brand-accent"
                  >
                    Remove
                  </button>
                </div>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
