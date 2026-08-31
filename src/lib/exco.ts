import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";

export type ExcoMember = {
  id: string;
  name: string;
  title: string;
  photoUrl?: string;
  order: number;
};

function assertFirestoreReady() {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase isn't configured yet.");
  }
}

export async function getAllExcoMembers(): Promise<ExcoMember[]> {
  assertFirestoreReady();
  const snapshot = await getDocs(
    query(collection(db!, "excoMembers"), orderBy("order", "asc"))
  );
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as ExcoMember);
}

export async function createExcoMember(input: Omit<ExcoMember, "id">) {
  assertFirestoreReady();
  await addDoc(collection(db!, "excoMembers"), input);
}

export async function updateExcoMember(id: string, input: Omit<ExcoMember, "id">) {
  assertFirestoreReady();
  await updateDoc(doc(db!, "excoMembers", id), input);
}

export async function deleteExcoMember(id: string) {
  assertFirestoreReady();
  await deleteDoc(doc(db!, "excoMembers", id));
}
