import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";

export type ChamberDocument = {
  id: string;
  title: string;
  fileUrl: string;
};

function assertFirestoreReady() {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase isn't configured yet.");
  }
}

// "Documents" (e.g. letters) — view-only, not meant to be freely
// downloadable. See /documents/[id] for the view-only embed.
export async function getAllDocuments(): Promise<ChamberDocument[]> {
  assertFirestoreReady();
  const snapshot = await getDocs(
    query(collection(db!, "documents"), orderBy("uploadedAt", "desc"))
  );
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as ChamberDocument);
}

export async function getDocument(id: string): Promise<ChamberDocument | null> {
  assertFirestoreReady();
  const snapshot = await getDoc(doc(db!, "documents", id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as ChamberDocument;
}

export async function createDocument(title: string, fileUrl: string) {
  assertFirestoreReady();
  await addDoc(collection(db!, "documents"), {
    title,
    fileUrl,
    uploadedAt: serverTimestamp(),
  });
}

export async function deleteDocument(id: string) {
  assertFirestoreReady();
  await deleteDoc(doc(db!, "documents", id));
}

// The Constitution — a single normal (downloadable) PDF, separate from the
// view-only documents above since nothing was said about restricting it.
export async function getConstitutionUrl(): Promise<string | null> {
  assertFirestoreReady();
  const snapshot = await getDoc(doc(db!, "settings", "constitution"));
  if (!snapshot.exists()) return null;
  return (snapshot.data().url as string) ?? null;
}

export async function setConstitutionUrl(url: string) {
  assertFirestoreReady();
  await setDoc(doc(db!, "settings", "constitution"), {
    url,
    updatedAt: serverTimestamp(),
  });
}
