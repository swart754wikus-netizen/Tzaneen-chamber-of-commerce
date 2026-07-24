import emailjs from "@emailjs/browser";

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export const isEmailConfigured = Boolean(serviceId && templateId && publicKey);

type NotificationParams = {
  formName: string;
  submittedAt: string;
  [key: string]: string;
};

// Best-effort admin notification for a new form submission. Never throws —
// the Firestore write is the record of truth; a failed/unconfigured email
// should not make the form look like it failed to the person submitting it.
export async function sendAdminNotification(params: NotificationParams) {
  if (!isEmailConfigured) return;

  try {
    await emailjs.send(
      serviceId!,
      templateId!,
      params,
      { publicKey: publicKey! }
    );
  } catch (error) {
    console.error("Admin notification email failed to send:", error);
  }
}
