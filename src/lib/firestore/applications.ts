import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { sendAdminNotification } from "@/lib/email";
import { sendWhatsAppNotification } from "@/lib/whatsapp";

export type MembershipApplicationInput = {
  firstName: string;
  surname: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  vatNumber: string;
};

// Matches the old site's Membership Application form fields as far as
// they were captured (content/old-site-content.md) — the form was cut off
// after "VAT Number" in the screenshots, so there may be one more real
// field to add once the rest of the old form is seen.
export async function submitMembershipApplication(
  input: MembershipApplicationInput
) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured yet.");
  }
  await addDoc(collection(db, "memberApplications"), {
    firstName: input.firstName,
    surname: input.surname,
    companyAddress: input.companyAddress,
    companyPhone: input.companyPhone,
    companyEmail: input.companyEmail,
    vatNumber: input.vatNumber || null,
    submittedAt: serverTimestamp(),
  });

  await sendAdminNotification({
    formName: "New Membership Application",
    firstName: input.firstName,
    surname: input.surname,
    companyAddress: input.companyAddress,
    companyPhone: input.companyPhone,
    companyEmail: input.companyEmail,
    vatNumber: input.vatNumber || "N/A",
    submittedAt: new Date().toLocaleString(),
  });

  await sendWhatsAppNotification(
    `New Membership Application\n\n` +
      `Name: ${input.firstName} ${input.surname}\n` +
      `Company Address: ${input.companyAddress}\n` +
      `Company Phone: ${input.companyPhone}\n` +
      `Company Email: ${input.companyEmail}\n` +
      `VAT Number: ${input.vatNumber || "N/A"}`
  );
}
