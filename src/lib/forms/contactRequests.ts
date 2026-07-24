import { isEmailConfigured, sendAdminNotification } from "@/lib/email";
import { isWhatsAppConfigured, sendWhatsAppNotification } from "@/lib/whatsapp";

function assertNotificationChannelConfigured() {
  if (!isEmailConfigured && !isWhatsAppConfigured) {
    throw new Error("No notification channel is configured yet.");
  }
}

export type CallBackRequestInput = {
  name: string;
  phone: string;
};

// Matches the homepage "Call Back Request" widget on the old site (Name,
// Phone only). No database involved — the submission goes straight to the
// admin via email and/or WhatsApp, whichever is configured.
export async function submitCallBackRequest(input: CallBackRequestInput) {
  assertNotificationChannelConfigured();

  await sendAdminNotification({
    formName: "Call Back Request",
    name: input.name,
    phone: input.phone,
    submittedAt: new Date().toLocaleString(),
  });

  await sendWhatsAppNotification(
    `Call Back Request\n\nName: ${input.name}\nPhone: ${input.phone}`
  );
}

export type ContactPageRequestInput = {
  name: string;
  email: string;
  message: string;
};

// Matches the old site's Contact Us page form (Name, Email, Message).
export async function submitContactPageRequest(
  input: ContactPageRequestInput
) {
  assertNotificationChannelConfigured();

  await sendAdminNotification({
    formName: "Contact Us",
    name: input.name,
    email: input.email,
    message: input.message,
    submittedAt: new Date().toLocaleString(),
  });

  await sendWhatsAppNotification(
    `Contact Us\n\nName: ${input.name}\nEmail: ${input.email}\nMessage: ${input.message}`
  );
}
