import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";

export type Article = {
  id: string;
  title: string;
  date: string; // ISO date, e.g. "2026-07-24" — used for sorting and display
  body: string;
};

function assertFirestoreReady() {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase isn't configured yet.");
  }
}

export async function getAllArticles(): Promise<Article[]> {
  assertFirestoreReady();
  const snapshot = await getDocs(
    query(collection(db!, "articles"), orderBy("date", "desc"))
  );
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Article);
}

export async function getArticle(id: string): Promise<Article | null> {
  assertFirestoreReady();
  const snapshot = await getDoc(doc(db!, "articles", id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Article;
}

export async function createArticle(input: Omit<Article, "id">) {
  assertFirestoreReady();
  await addDoc(collection(db!, "articles"), input);
}

export async function updateArticle(id: string, input: Omit<Article, "id">) {
  assertFirestoreReady();
  await updateDoc(doc(db!, "articles", id), input);
}

export async function deleteArticle(id: string) {
  assertFirestoreReady();
  await deleteDoc(doc(db!, "articles", id));
}

export function formatArticleDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
