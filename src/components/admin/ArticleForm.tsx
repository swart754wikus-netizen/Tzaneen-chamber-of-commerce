"use client";

import { useState, type FormEvent } from "react";
import { createArticle, updateArticle, type Article } from "@/lib/articles";

const fieldClass =
  "w-full rounded-xl border border-brand-primary/15 bg-white px-4 py-2.5 text-brand-ink focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40";

type Props = {
  article?: Article;
  onSaved: () => void;
  onCancel?: () => void;
};

export function ArticleForm({ article, onSaved, onCancel }: Props) {
  const [title, setTitle] = useState(article?.title ?? "");
  const [date, setDate] = useState(
    article?.date ?? new Date().toISOString().slice(0, 10)
  );
  const [body, setBody] = useState(article?.body ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim() || !date || !body.trim()) {
      setError("Please fill in a title, date and the article text.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const input = { title: title.trim(), date, body: body.trim() };
      if (article) {
        await updateArticle(article.id, input);
      } else {
        await createArticle(input);
      }
      onSaved();
    } catch {
      setError("Something went wrong saving this article. Please try again.");
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
          Article Text *
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          className={fieldClass}
        />
      </div>

      {error && <p className="text-sm text-brand-accent-dark">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-dark disabled:opacity-60"
        >
          {saving ? "Saving…" : article ? "Save Changes" : "Publish Article"}
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
