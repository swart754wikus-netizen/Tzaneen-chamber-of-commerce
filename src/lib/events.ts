export type ChamberEvent = {
  name: string;
  date: string; // ISO date
  description: string;
};

// Static content, same pattern as articles.ts — no database. Only one
// real event is known right now; add more here as they're confirmed.
export const events: ChamberEvent[] = [
  {
    name: "Annual Award Ceremony",
    date: "2026-03-25",
    description:
      "Celebrating the businesses driving Greater Tzaneen's economy forward.",
  },
];

export function getUpcomingEvents(): ChamberEvent[] {
  const now = new Date();
  return [...events]
    .filter((event) => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function formatEventDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
