import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { getPaymentDetails } from "@/lib/paymentDetails";
import { sendRsvpPaymentEmail } from "@/lib/email";

export type ChamberEvent = {
  id: string;
  title: string;
  date: string; // ISO date, yyyy-mm-dd
  description: string;
  photoUrl?: string;
  rsvpEnabled: boolean;
  // Free-text cost, e.g. "R150 per person" — left blank means free. When
  // set, a successful RSVP triggers a payment-details email to the
  // attendee (see lib/paymentDetails.ts); when blank, no email is sent.
  cost?: string;
};

export type RsvpInput = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  businessName: string;
  memberStatus: "member" | "non-member";
  headcount: number;
};

export type Rsvp = RsvpInput & {
  id: string;
  submittedAt: string;
};

function assertFirestoreReady() {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase isn't configured yet.");
  }
}

export async function getAllEvents(): Promise<ChamberEvent[]> {
  assertFirestoreReady();
  const snapshot = await getDocs(
    query(collection(db!, "events"), orderBy("date", "asc"))
  );
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as ChamberEvent);
}

export function getUpcomingEvents(events: ChamberEvent[]): ChamberEvent[] {
  const now = new Date();
  return events.filter((event) => new Date(event.date) >= now);
}

export function formatEventDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function getEvent(id: string): Promise<ChamberEvent | null> {
  assertFirestoreReady();
  const snapshot = await getDoc(doc(db!, "events", id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as ChamberEvent;
}

export async function createEvent(input: Omit<ChamberEvent, "id">) {
  assertFirestoreReady();
  await addDoc(collection(db!, "events"), input);
}

export async function updateEvent(id: string, input: Omit<ChamberEvent, "id">) {
  assertFirestoreReady();
  await updateDoc(doc(db!, "events", id), input);
}

export async function deleteEvent(id: string) {
  assertFirestoreReady();
  await deleteDoc(doc(db!, "events", id));
}

// Takes the full event (not just its id) so it can check whether this is a
// paid event and, if so, email the attendee the Chamber's banking details
// after saving the RSVP. That email is best-effort — it never blocks or
// fails the RSVP itself, since the RSVP is already saved by the time it's
// attempted.
export async function submitRsvp(event: ChamberEvent, input: RsvpInput) {
  assertFirestoreReady();
  await addDoc(collection(db!, "events", event.id, "rsvps"), {
    ...input,
    submittedAt: serverTimestamp(),
  });

  if (event.cost) {
    try {
      const payment = await getPaymentDetails();
      if (payment) {
        await sendRsvpPaymentEmail({
          to_email: input.email,
          to_name: `${input.name} ${input.surname}`,
          event_title: event.title,
          event_date: formatEventDate(event.date),
          cost: event.cost,
          bank_name: payment.bankName,
          account_holder: payment.accountHolder,
          account_number: payment.accountNumber,
          branch_code: payment.branchCode,
          reference: payment.reference,
        });
      }
    } catch (error) {
      console.error("Sending RSVP payment email failed:", error);
    }
  }
}

export async function getRsvps(eventId: string): Promise<Rsvp[]> {
  assertFirestoreReady();
  const snapshot = await getDocs(
    query(collection(db!, "events", eventId, "rsvps"), orderBy("submittedAt", "asc"))
  );
  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      submittedAt: data.submittedAt?.toDate
        ? data.submittedAt.toDate().toLocaleString("en-ZA")
        : "",
    } as Rsvp;
  });
}
