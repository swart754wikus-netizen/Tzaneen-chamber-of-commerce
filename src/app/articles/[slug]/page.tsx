import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { articles, getArticleBySlug, formatArticleDate } from "@/lib/articles";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return {
    title: article
      ? `${article.title} — Tzaneen Chamber of Commerce`
      : "Article not found — Tzaneen Chamber of Commerce",
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
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
      <PageHeader
        eyebrow={formatArticleDate(article.date)}
        title={article.title}
      />
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
