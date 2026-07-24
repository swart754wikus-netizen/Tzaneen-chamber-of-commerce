export type Article = {
  slug: string;
  title: string;
  date: string; // ISO date, e.g. "2026-07-24" — used for sorting and display
  body: string;
};

// Static content — no database. To publish a new update, send the text
// over and it gets added here as a new entry, then deployed like any
// other change to the site.
export const articles: Article[] = [];

export function getPublishedArticles(): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | null {
  return articles.find((article) => article.slug === slug) ?? null;
}

export function formatArticleDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
