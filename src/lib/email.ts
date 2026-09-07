import emailjs from "@emailjs/browser";

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const rsvpPaymentTemplateId = process.env.NEXT_PUBLIC_EMAILJS_RSVP_PAYMENT_TEMPLATE_ID;

export const isEmailConfigured = Boolean(serviceId && templateId && publicKey);
export const isRsvpPaymentEmailConfigured = Boolean(
  serviceId && rsvpPaymentTemplateId && publicKey
);

type NotificationParams = {
  formName: string;
  submittedAt: string;
  [key: string]: string;
};

// Best-effort admin notification for a new form submission. Never throws on
// its own — callers check isEmailConfigured / isWhatsAppConfigured together
// before attempting either, so a submission only fails if NO channel is
// configured at all. A single channel failing shouldn't make the whole
// submission look like it failed if the other channel got through.
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

type RsvpPaymentEmailParams = {
  to_email: string;
  to_name: string;
  event_title: string;
  event_date: string;
  cost: string;
  bank_name: string;
  account_holder: string;
  account_number: string;
  branch_code: string;
  reference: string;
};

// Sends the payment-details email to whoever just RSVP'd for a paid event.
// Uses a separate EmailJS template from sendAdminNotification, since this
// one goes to the attendee's own address, not the admin's — never blocks
// or fails the RSVP itself if it doesn't go through.
export async function sendRsvpPaymentEmail(params: RsvpPaymentEmailParams) {
  if (!isRsvpPaymentEmailConfigured) return;

  try {
    await emailjs.send(
      serviceId!,
      rsvpPaymentTemplateId!,
      params,
      { publicKey: publicKey! }
    );
  } catch (error) {
    console.error("RSVP payment email failed to send:", error);
  }
}
