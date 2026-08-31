"use client";

import { useEffect, useState } from "react";
import { getAllMembers, deleteMember, type DirectoryMember } from "@/lib/directory";
import { MemberForm } from "@/components/admin/MemberForm";

export default function AdminMembersPage() {
  const [members, setMembers] = useState<DirectoryMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  function refresh() {
    getAllMembers()
      .then(setMembers)
      .finally(() => setLoading(false));
  }

  useEffect(refresh, []);

  async function handleDelete(id: string) {
    if (!confirm("Remove this member from the directory?")) return;
    await deleteMember(id);
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-primary">Directory</h1>
          <p className="text-sm text-brand-ink/60">
            {members.length} member business{members.length === 1 ? "" : "es"} —
            this count is what shows on the homepage.
          </p>
        </div>
        {!creating && (
          <button
            onClick={() => setCreating(true)}
            className="rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-accent-dark"
          >
            + Add Member
          </button>
        )}
      </div>

      {creating && (
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <MemberForm
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
        <p className="mt-8 text-brand-ink/60">No members yet.</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {members.map((member) =>
            editingId === member.id ? (
              <li key={member.id} className="rounded-2xl bg-white p-6 shadow-sm">
                <MemberForm
                  member={member}
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
                  <p className="text-sm text-brand-ink/60">{member.category}</p>
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
