"use client";

import { useState, type FormEvent } from "react";
import { createEvent, updateEvent, type ChamberEvent } from "@/lib/events";
import { uploadFile } from "@/lib/storageUpload";

const fieldClass =
  "w-full rounded-xl border border-brand-primary/15 bg-white px-4 py-2.5 text-brand-ink focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40";

type Props = {
  event?: ChamberEvent;
  onSaved: () => void;
  onCancel?: () => void;
};

export function EventForm({ event, onSaved, onCancel }: Props) {
  const [title, setTitle] = useState(event?.title ?? "");
  const [date, setDate] = useState(event?.date ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [rsvpEnabled, setRsvpEnabled] = useState(event?.rsvpEnabled ?? true);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim() || !date) {
      setError("Please fill in a title and date.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      let photoUrl = event?.photoUrl;
      if (photoFile) {
        photoUrl = await uploadFile("events", photoFile);
      }
      const input = {
        title: title.trim(),
        date,
        description: description.trim(),
        rsvpEnabled,
        ...(photoUrl ? { photoUrl } : {}),
      };
      if (event) {
        await updateEvent(event.id, input);
      } else {
        await createEvent(input);
      }
      onSaved();
    } catch {
      setError("Something went wrong saving this event. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-brand-primary">
          Title *
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={fieldClass}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-brand-primary">
          Date *
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={fieldClass}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-brand-primary">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className={fieldClass}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-brand-primary">
          Photo {event?.photoUrl && "(leave blank to keep current photo)"}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
          className="w-full text-sm"
        />
      </div>
      <label className="flex items-center gap-2 text-sm font-medium text-brand-primary">
        <input
          type="checkbox"
          checked={rsvpEnabled}
          onChange={(e) => setRsvpEnabled(e.target.checked)}
        />
        Allow RSVPs for this event
      </label>

      {error && <p className="text-sm text-brand-accent-dark">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark disabled:opacity-60"
        >
          {saving ? "Saving…" : event ? "Save Changes" : "Create Event"}
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
