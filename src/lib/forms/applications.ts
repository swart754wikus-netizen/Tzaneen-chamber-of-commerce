import { isEmailConfigured, sendAdminNotification } from "@/lib/email";
import { isWhatsAppConfigured, sendWhatsAppNotification } from "@/lib/whatsapp";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";

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
//
// The submission always goes straight to the admin via email and/or
// WhatsApp, whichever is configured (that's the part that must not
// silently fail). If Firebase is also configured, a copy is additionally
// saved to Firestore so the admin can review/export applications later
// from /admin/applications — but that save is best-effort and never blocks
// or fails the actual submission.
export async function submitMembershipApplication(
  input: MembershipApplicationInput
) {
  if (!isEmailConfigured && !isWhatsAppConfigured) {
    throw new Error("No notification channel is configured yet.");
  }

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

  if (isFirebaseConfigured && db) {
    try {
      await addDoc(collection(db, "applications"), {
        ...input,
        vatNumber: input.vatNumber || "N/A",
        submittedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Saving application to Firestore failed:", error);
    }
  }
}
