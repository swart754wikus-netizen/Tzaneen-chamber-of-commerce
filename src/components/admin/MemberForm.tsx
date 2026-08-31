"use client";

import { useState, type FormEvent } from "react";
import { createMember, updateMember, directoryCategorySuggestions, type DirectoryMember } from "@/lib/directory";
import { uploadFile } from "@/lib/storageUpload";

const fieldClass =
  "w-full rounded-xl border border-brand-primary/15 bg-white px-4 py-2.5 text-brand-ink focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40";

type Props = {
  member?: DirectoryMember;
  onSaved: () => void;
  onCancel?: () => void;
};

export function MemberForm({ member, onSaved, onCancel }: Props) {
  const [name, setName] = useState(member?.name ?? "");
  const [category, setCategory] = useState(member?.category ?? "");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !category.trim()) {
      setError("Please fill in a name and category.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      let logoUrl = member?.logoUrl;
      if (logoFile) {
        logoUrl = await uploadFile("members", logoFile);
      }
      const input = {
        name: name.trim(),
        category: category.trim(),
        ...(logoUrl ? { logoUrl } : {}),
      };
      if (member) {
        await updateMember(member.id, input);
      } else {
        await createMember(input);
      }
      onSaved();
    } catch {
      setError("Something went wrong saving this member. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-brand-primary">
          Business Name *
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-brand-primary">
          Category *
        </label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          list="category-suggestions"
          className={fieldClass}
        />
        <datalist id="category-suggestions">
          {directoryCategorySuggestions.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-brand-primary">
          Logo {member?.logoUrl && "(leave blank to keep current logo)"}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
          className="w-full text-sm"
        />
      </div>

      {error && <p className="text-sm text-brand-accent-dark">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark disabled:opacity-60"
        >
          {saving ? "Saving…" : member ? "Save Changes" : "Add Member"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-brand-primary/20 px-5 py-2.5 text-sm font-semibold text-brand-primary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
