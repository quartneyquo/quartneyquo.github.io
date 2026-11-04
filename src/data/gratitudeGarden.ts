export const leafStyles = [
  { id: "maple", name: "Maple", color: "#ce794f", pale: "#fae8da", shape: "maple" },
  { id: "golden", name: "Golden", color: "#c39b3e", pale: "#fbf0d4", shape: "oak" },
  { id: "rose", name: "Rose", color: "#b87985", pale: "#f8e8e9", shape: "heart" },
  { id: "sage", name: "Sage", color: "#7e916c", pale: "#ebefdf", shape: "oval" },
  { id: "lavender", name: "Lavender", color: "#9b87ac", pale: "#eee7f3", shape: "point" },
] as const;
export type LeafColor = typeof leafStyles[number]["id"];
export type GardenNote = { id: string; message: string; author: string; color: LeafColor; hearts: number; liked?: boolean; welcome?: boolean; pending?: boolean };
export const welcomeNotes: GardenNote[] = [
  { id: "welcome-1", message: "The people who make ordinary days feel a little like coming home.", author: "Paca", color: "maple", hearts: 0, welcome: true },
  { id: "welcome-2", message: "Warm mugs, fuzzy socks, and absolutely nowhere to hurry.", author: "Paca", color: "golden", hearts: 0, welcome: true },
  { id: "welcome-3", message: "Friends who check in, even when they don’t have the perfect words.", author: "Paca", color: "rose", hearts: 0, welcome: true },
  { id: "welcome-4", message: "A fresh start. Even a very small one.", author: "Paca", color: "sage", hearts: 0, welcome: true },
  { id: "welcome-5", message: "The quiet courage it takes to try again tomorrow.", author: "Paca", color: "lavender", hearts: 0, welcome: true },
  { id: "welcome-6", message: "My favorite person saving me the last slice of pie.", author: "Paca", color: "golden", hearts: 0, welcome: true },
  { id: "welcome-7", message: "Little kindnesses from people I may never meet again.", author: "Paca", color: "rose", hearts: 0, welcome: true },
  { id: "welcome-8", message: "You, for stopping by this little corner of the world.", author: "Paca", color: "maple", hearts: 0, welcome: true },
];
export { GARDEN_MILESTONES as milestones } from "@/lib/gardenGrowth";
export function validateNote(value: unknown): { message: string; author: string; color: LeafColor } | string {
  if (!value || typeof value !== "object") return "Please write a little gratitude first.";
  const v = value as Record<string, unknown>;
  if (typeof v.message !== "string" || typeof v.color !== "string" || (v.author !== undefined && typeof v.author !== "string")) return "Please check your note and try again.";
  const message = v.message.trim();
  const author = (typeof v.author === "string" ? v.author.trim() : "") || "A grateful little paca";
  if (message.length < 2 || message.length > 240) return "Your gratitude needs to be between 2 and 240 characters.";
  if (author.length > 40) return "Please keep your name to 40 characters.";
  if (!leafStyles.some(s => s.id === v.color)) return "Choose one of the five leaf colors.";
  if (/https?:\/\/|www\./i.test(message + " " + author)) return "Keep this little garden link-free, please.";
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(message + author)) return "Please use ordinary text in your note.";
  return { message, author, color: v.color as LeafColor };
}
