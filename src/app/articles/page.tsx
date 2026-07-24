"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { getPublishedArticles, type Article } from "@/lib/firestore/articles";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[] | null>(null);

  useEffect(() => {
    getPublishedArticles().then(setArticles);
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="What's happening"
        title="Articles"
        description="Updates from the Tzaneen Chamber of Commerce and Greater Tzaneen's business community."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          {articles === null && (
            <p className="text-brand-ink/60">Loading&hellip;</p>
          )}

          {articles !== null && articles.length === 0 && (
            <div className="rounded-2xl border-2 border-dashed border-brand-primary/20 bg-brand-primary/5 p-10 text-center">
              <p className="font-semibold text-brand-primary">
                No articles yet
              </p>
              <p className="mt-1 text-sm text-brand-ink/60">
                Check back soon — updates will appear here as the Chamber
                posts them.
              </p>
            </div>
          )}

          {articles !== null && articles.length > 0 && (
            <ul className="space-y-6">
              {articles.map((article) => (
                <li
                  key={article.id}
                  className="rounded-2xl bg-brand-cream p-6 shadow-sm"
                >
                  <Link href={`/articles/${article.slug}`}>
                    <p className="text-sm text-brand-ink/50">{article.date}</p>
                    <h2 className="mt-1 text-xl font-bold text-brand-primary">
                      {article.title}
                    </h2>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
