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

export type DirectoryMember = {
  id: string;
  name: string;
  category: string;
  logoUrl?: string;
};

// Suggested categories shown in the admin form's datalist — not an
// enforced enum, since the admin can type any category she needs.
export const directoryCategorySuggestions = [
  "Agriculture",
  "Financial Services",
  "Technology & Telecommunications",
  "Tourism & Hospitality",
  "Retail & Wholesale",
  "Professional Services",
  "Manufacturing & Industry",
  "Construction & Property",
  "Transport & Logistics",
];

function assertFirestoreReady() {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase isn't configured yet.");
  }
}

export async function getAllMembers(): Promise<DirectoryMember[]> {
  assertFirestoreReady();
  const snapshot = await getDocs(
    query(collection(db!, "members"), orderBy("name", "asc"))
  );
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as DirectoryMember);
}

export async function createMember(input: Omit<DirectoryMember, "id">) {
  assertFirestoreReady();
  await addDoc(collection(db!, "members"), input);
}

export async function updateMember(id: string, input: Omit<DirectoryMember, "id">) {
  assertFirestoreReady();
  await updateDoc(doc(db!, "members", id), input);
}

export async function deleteMember(id: string) {
  assertFirestoreReady();
  await deleteDoc(doc(db!, "members", id));
}
