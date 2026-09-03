import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArticlesList } from "@/components/articles/ArticlesList";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Updates from the Tzaneen Chamber of Commerce and Greater Tzaneen's business community.",
};

export default function ArticlesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What's happening"
        title="Articles"
        description="Updates from the Tzaneen Chamber of Commerce and Greater Tzaneen's business community."
      />

      <Reveal>
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
            <ArticlesList />
          </div>
        </section>
      </Reveal>
    </>
  );
}
