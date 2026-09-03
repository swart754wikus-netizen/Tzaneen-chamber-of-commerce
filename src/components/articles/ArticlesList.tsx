"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { isFirebaseConfigured } from "@/lib/firebase";
import { getAllArticles, formatArticleDate, type Article } from "@/lib/articles";

export function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    getAllArticles()
      .then(setArticles)
      .finally(() => setLoading(false));
  }, []);

  if (!isFirebaseConfigured) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-brand-primary/20 bg-brand-primary/5 p-10 text-center">
        <p className="font-semibold text-brand-primary">
          Articles aren&apos;t set up yet
        </p>
        <p className="mt-1 text-sm text-brand-ink/60">
          Check back soon — updates will appear here as the Chamber posts
          them.
        </p>
      </div>
    );
  }

  if (loading) {
    return <p className="text-center text-brand-ink/60">Loading…</p>;
  }

  if (articles.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-brand-primary/20 bg-brand-primary/5 p-10 text-center">
        <p className="font-semibold text-brand-primary">No articles yet</p>
        <p className="mt-1 text-sm text-brand-ink/60">
          Check back soon — updates will appear here as the Chamber posts
          them.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-6">
      {articles.map((article) => (
        <li
          key={article.id}
          className="rounded-2xl bg-brand-cream p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <Link href={`/articles/${article.id}`}>
            <p className="text-sm text-brand-ink/50">
              {formatArticleDate(article.date)}
            </p>
            <h2 className="mt-1 text-xl font-bold text-brand-primary">
              {article.title}
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}
