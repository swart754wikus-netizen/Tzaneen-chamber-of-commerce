import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type CallBackRequestInput = {
  name: string;
  phone: string;
};

// Matches the homepage "Call Back Request" widget on the old site (Name,
// Phone only). The full Contact Us page form (Name, Email, Message) will
// write to the same collection with source "contact_page" when that page
// is built.
export async function submitCallBackRequest(input: CallBackRequestInput) {
  await addDoc(collection(db, "contactRequests"), {
    name: input.name,
    email: null,
    phone: input.phone,
    message: null,
    source: "callback_widget",
    submittedAt: serverTimestamp(),
  });
}
