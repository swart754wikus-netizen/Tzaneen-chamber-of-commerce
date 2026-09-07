import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";

export type PaymentDetails = {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  branchCode: string;
  reference: string; // e.g. "Use your name + event as reference"
};

function assertFirestoreReady() {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase isn't configured yet.");
  }
}

export async function getPaymentDetails(): Promise<PaymentDetails | null> {
  assertFirestoreReady();
  const snapshot = await getDoc(doc(db!, "settings", "payment"));
  if (!snapshot.exists()) return null;
  return snapshot.data() as PaymentDetails;
}

export async function setPaymentDetails(input: PaymentDetails) {
  assertFirestoreReady();
  await setDoc(doc(db!, "settings", "payment"), {
    ...input,
    updatedAt: serverTimestamp(),
  });
}
