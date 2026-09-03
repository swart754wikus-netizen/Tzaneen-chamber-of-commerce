"use client";

import { useEffect, useState } from "react";
import { getAllArticles, deleteArticle, formatArticleDate, type Article } from "@/lib/articles";
import { ArticleForm } from "@/components/admin/ArticleForm";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  function refresh() {
    getAllArticles()
      .then(setArticles)
      .finally(() => setLoading(false));
  }

  useEffect(refresh, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    await deleteArticle(id);
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-primary">Articles</h1>
        {!creating && (
          <button
            onClick={() => setCreating(true)}
            className="rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-accent-dark"
          >
            + New Article
          </button>
        )}
      </div>

      {creating && (
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <ArticleForm
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
      ) : articles.length === 0 ? (
        <p className="mt-8 text-brand-ink/60">No articles yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {articles.map((article) =>
            editingId === article.id ? (
              <li key={article.id} className="rounded-2xl bg-white p-6 shadow-sm">
                <ArticleForm
                  article={article}
                  onSaved={() => {
                    setEditingId(null);
                    refresh();
                  }}
                  onCancel={() => setEditingId(null)}
                />
              </li>
            ) : (
              <li
                key={article.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm"
              >
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent-dark">
                    {formatArticleDate(article.date)}
                  </p>
                  <p className="font-bold text-brand-primary">{article.title}</p>
                </div>
                <div className="flex flex-wrap gap-3 text-sm font-semibold">
                  <button
                    onClick={() => setEditingId(article.id)}
                    className="text-brand-primary hover:text-brand-accent-dark"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="text-brand-accent-dark hover:text-brand-accent"
                  >
                    Delete
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
