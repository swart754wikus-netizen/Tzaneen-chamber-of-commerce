"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { getArticleBySlug, type Article } from "@/lib/firestore/articles";

export default function ArticleDetailPage() {
  const params = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null | undefined>(undefined);

  useEffect(() => {
    getArticleBySlug(params.slug).then(setArticle);
  }, [params.slug]);

  if (article === undefined) {
    return (
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <p className="text-brand-ink/60">Loading&hellip;</p>
        </div>
      </section>
    );
  }

  if (article === null) {
    return (
      <>
        <PageHeader eyebrow="Articles" title="Not found" />
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <p className="text-brand-ink/70">
              This article doesn&apos;t exist or hasn&apos;t been published.
            </p>
            <Link
              href="/articles"
              className="mt-4 inline-block text-sm font-semibold uppercase tracking-wide text-brand-accent-dark hover:text-brand-accent"
            >
              &larr; Back to Articles
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow={article.date} title={article.title} />
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <div className="whitespace-pre-wrap text-brand-ink/80">
            {article.body}
          </div>
          <Link
            href="/articles"
            className="mt-8 inline-block text-sm font-semibold uppercase tracking-wide text-brand-accent-dark hover:text-brand-accent"
          >
            &larr; Back to Articles
          </Link>
        </div>
      </section>
    </>
  );
}
