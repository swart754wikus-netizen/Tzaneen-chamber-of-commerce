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

export type ChamberEvent = {
  id: string;
  title: string;
  date: string; // ISO date, yyyy-mm-dd
  description: string;
  photoUrl?: string;
  rsvpEnabled: boolean;
  // Free-text cost, e.g. "R150 per person" — left blank means free. When
  // set, the RSVP confirmation screen shows the Chamber's banking details
  // (see lib/paymentDetails.ts, and RsvpForm's success state); when
  // blank, nothing payment-related is shown.
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

// Takes the full event (not just its id), though currently only its id is
// used here — kept this way since RsvpForm already has the full event on
// hand and it matches the shape callers use elsewhere in this file.
export async function submitRsvp(event: ChamberEvent, input: RsvpInput) {
  assertFirestoreReady();
  await addDoc(collection(db!, "events", event.id, "rsvps"), {
    ...input,
    submittedAt: serverTimestamp(),
  });
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
