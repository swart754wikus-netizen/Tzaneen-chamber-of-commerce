const adminPhone = process.env.NEXT_PUBLIC_CALLMEBOT_PHONE;
const apiKey = process.env.NEXT_PUBLIC_CALLMEBOT_APIKEY;

export const isWhatsAppConfigured = Boolean(adminPhone && apiKey);

// Sends an automatic WhatsApp message to the admin via CallMeBot (a free,
// unofficial WhatsApp API — no paid business account needed). Requires the
// admin to message CallMeBot once from her own WhatsApp to get an API key
// (see PLAN.md). Best-effort: never throws, so a failed/unconfigured
// WhatsApp send never blocks or breaks the actual form submission.
export async function sendWhatsAppNotification(message: string) {
  if (!isWhatsAppConfigured) return;

  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${adminPhone}&text=${encodeURIComponent(message)}&apikey=${apiKey}`;
    // no-cors: we can't read the response cross-origin, and don't need to —
    // firing the request is the whole point.
    await fetch(url, { mode: "no-cors" });
  } catch (error) {
    console.error("WhatsApp notification failed to send:", error);
  }
}
