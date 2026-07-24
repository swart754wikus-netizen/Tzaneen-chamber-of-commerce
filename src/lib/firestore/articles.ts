import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";

export type Article = {
  id: string;
  title: string;
  slug: string;
  date: string;
  body: string;
  imageUrl: string | null;
};

function toArticle(id: string, data: Record<string, unknown>): Article {
  const dateValue = data.date as { toDate?: () => Date } | undefined;
  return {
    id,
    title: (data.title as string) ?? "Untitled",
    slug: (data.slug as string) ?? id,
    date: dateValue?.toDate ? dateValue.toDate().toLocaleDateString() : "",
    body: (data.body as string) ?? "",
    imageUrl: (data.imageUrl as string) ?? null,
  };
}

// No Firebase project exists yet, so these calls fail until one is
// connected — callers get an empty/null result rather than a crash or an
// indefinite hang (checking isFirebaseConfigured up front avoids relying
// on the Firestore SDK to fail fast on its own, which it doesn't always).
export async function getPublishedArticles(): Promise<Article[]> {
  if (!isFirebaseConfigured) return [];
  try {
    const q = query(
      collection(db, "articles"),
      where("published", "==", true),
      orderBy("date", "desc"),
      limit(20)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => toArticle(doc.id, doc.data()));
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!isFirebaseConfigured) return null;
  try {
    const q = query(
      collection(db, "articles"),
      where("slug", "==", slug),
      where("published", "==", true),
      limit(1)
    );
    const snapshot = await getDocs(q);
    const doc = snapshot.docs[0];
    return doc ? toArticle(doc.id, doc.data()) : null;
  } catch {
    return null;
  }
}
