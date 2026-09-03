import { PageHeader } from "@/components/layout/PageHeader";
import { ArticleDetail } from "@/components/articles/ArticleDetail";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <PageHeader eyebrow="Articles" title="Article" />
      <section className="bg-white">
        <ArticleDetail articleId={id} />
      </section>
    </>
  );
}
