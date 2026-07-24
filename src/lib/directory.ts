export type DirectoryCategory =
  | "Agriculture"
  | "Financial Services"
  | "Technology & Telecommunications"
  | "Tourism & Hospitality";

export type DirectoryMember = {
  name: string;
  category: DirectoryCategory;
};

// Confirmed real members (you verified these names). Categories are our
// best-effort based on public knowledge of these companies, not chamber-
// supplied data — flag if any is wrong. This is a partial list: only the
// 8 names shown in the reference image are here, not the full ~500-member
// roster the reference implies. Logo image files are also still needed —
// see the NeedsContent note on the Directory page.
export const directoryMembers: DirectoryMember[] = [
  { name: "ZZ2", category: "Agriculture" },
  { name: "Westfalia", category: "Agriculture" },
  { name: "SGK", category: "Agriculture" },
  { name: "TWK Agri", category: "Agriculture" },
  { name: "Agri Technovation", category: "Agriculture" },
  { name: "FNB", category: "Financial Services" },
  { name: "Standard Bank", category: "Financial Services" },
  { name: "Vodacom Business", category: "Technology & Telecommunications" },
];

export const directoryCategories: DirectoryCategory[] = [
  "Agriculture",
  "Financial Services",
  "Technology & Telecommunications",
  "Tourism & Hospitality",
];
