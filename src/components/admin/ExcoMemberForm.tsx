"use client";

import { useState, type FormEvent } from "react";
import { createExcoMember, updateExcoMember, type ExcoMember } from "@/lib/exco";
import { uploadFile } from "@/lib/storageUpload";

const fieldClass =
  "w-full rounded-xl border border-brand-primary/15 bg-white px-4 py-2.5 text-brand-ink focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40";

type Props = {
  member?: ExcoMember;
  nextOrder: number;
  onSaved: () => void;
  onCancel?: () => void;
};

export function ExcoMemberForm({ member, nextOrder, onSaved, onCancel }: Props) {
  const [name, setName] = useState(member?.name ?? "");
  const [title, setTitle] = useState(member?.title ?? "");
  const [order, setOrder] = useState(String(member?.order ?? nextOrder));
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !title.trim()) {
      setError("Please fill in a name and title.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      let photoUrl = member?.photoUrl;
      if (photoFile) {
        photoUrl = await uploadFile("exco", photoFile);
      }
      const input = {
        name: name.trim(),
        title: title.trim(),
        order: parseInt(order, 10) || 0,
        ...(photoUrl ? { photoUrl } : {}),
      };
      if (member) {
        await updateExcoMember(member.id, input);
      } else {
        await createExcoMember(input);
      }
      onSaved();
    } catch {
      setError("Something went wrong saving this profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-brand-primary">
          Name *
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-brand-primary">
          Title *
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Chairperson, Treasurer"
          className={fieldClass}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-brand-primary">
          Display Order
        </label>
        <input
          type="number"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className={fieldClass}
        />
        <p className="mt-1 text-xs text-brand-ink/50">Lower numbers show first.</p>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-brand-primary">
          Photo {member?.photoUrl && "(leave blank to keep current photo)"}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
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
          {saving ? "Saving…" : member ? "Save Changes" : "Add"}
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
