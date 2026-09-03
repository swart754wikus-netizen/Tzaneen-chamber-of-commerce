"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, formatArticleDate, type Article } from "@/lib/articles";

export function ArticleDetail({ articleId }: { articleId: string }) {
  const [article, setArticle] = useState<Article | null | undefined>(undefined);

  useEffect(() => {
    getArticle(articleId).then(setArticle).catch(() => setArticle(null));
  }, [articleId]);

  if (article === undefined) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-center text-brand-ink/60">Loading…</p>
      </div>
    );
  }

  if (article === null) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent-dark">
        {formatArticleDate(article.date)}
      </p>
      <h1 className="mt-1 text-2xl font-bold text-brand-primary sm:text-3xl">
        {article.title}
      </h1>
      <div className="mt-6 whitespace-pre-wrap text-brand-ink/80">
        {article.body}
      </div>
      <Link
        href="/articles"
        className="mt-8 inline-block text-sm font-semibold uppercase tracking-wide text-brand-accent-dark hover:text-brand-accent"
      >
        &larr; Back to Articles
      </Link>
    </div>
  );
}
