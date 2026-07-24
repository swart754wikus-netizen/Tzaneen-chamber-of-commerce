import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";

export type CallBackRequestInput = {
  name: string;
  phone: string;
};

// Matches the homepage "Call Back Request" widget on the old site (Name,
// Phone only).
export async function submitCallBackRequest(input: CallBackRequestInput) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured yet.");
  }
  await addDoc(collection(db, "contactRequests"), {
    name: input.name,
    email: null,
    phone: input.phone,
    message: null,
    source: "callback_widget",
    submittedAt: serverTimestamp(),
  });
}

export type ContactPageRequestInput = {
  name: string;
  email: string;
  message: string;
};

// Matches the old site's Contact Us page form (Name, Email, Message).
// Writes to the same collection as the call-back widget, tagged by source.
export async function submitContactPageRequest(
  input: ContactPageRequestInput
) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured yet.");
  }
  await addDoc(collection(db, "contactRequests"), {
    name: input.name,
    email: input.email,
    phone: null,
    message: input.message,
    source: "contact_page",
    submittedAt: serverTimestamp(),
  });
}
