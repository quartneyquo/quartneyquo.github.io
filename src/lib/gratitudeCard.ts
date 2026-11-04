import { leafStyles, type LeafColor } from "@/data/gratitudeGarden";

export const GRATITUDE_CARD_PATH = "/paca-village/holiday/gratitude-garden/thanks/";
const PUBLIC_ORIGIN = "https://courtneyko.com";
const MAX_TOKEN_LENGTH = 4096;

export type GratitudeCard = {
  recipient: string;
  message: string;
  author: string;
  color: LeafColor;
  growthId?: string;
};

export function validateGratitudeCard(value: unknown): GratitudeCard {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Please check your card and try again.");
  const input = value as Record<string, unknown>;
  const read = (field: string, min: number, max: number, label: string) => {
    if (typeof input[field] !== "string") throw new Error(`Please add ${label}.`);
    const text = input[field].trim();
    if (text.length < min || text.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(text)) {
      throw new Error(`Please keep ${label} between ${min} and ${max} characters.`);
    }
    return text;
  };
  const recipient = read("recipient", 1, 40, "their name");
  const message = read("message", 2, 240, "your message");
  const author = read("author", 0, 40, "your name") || "A grateful little paca";
  if (!leafStyles.some(leaf => leaf.id === input.color)) throw new Error("Choose a leaf for your card.");
  if (input.growthId !== undefined && (typeof input.growthId !== "string" || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(input.growthId))) throw new Error("Please check your card link.");
  return { recipient, message, author, color: input.color as LeafColor, ...(input.growthId ? { growthId: input.growthId as string } : {}) };
}

export async function gratitudeCardFingerprint(card: GratitudeCard) {
  // Only a digest goes to the garden service, never the names or message.
  const { recipient, message, author, color } = validateGratitudeCard(card);
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(encodeGratitudeCard({ recipient, message, author, color })));
  return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, "0")).join("");
}

export function encodeGratitudeCard(value: GratitudeCard) {
  const card = validateGratitudeCard(value);
  const bytes = new TextEncoder().encode(JSON.stringify({ v: 1, ...card }));
  return btoa(Array.from(bytes, byte => String.fromCharCode(byte)).join(""))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeGratitudeCard(hash: string): GratitudeCard {
  const match = /^#card=([A-Za-z0-9_-]+)$/.exec(hash);
  if (!match || match[1].length > MAX_TOKEN_LENGTH) throw new Error("This card link is incomplete or invalid.");
  try {
    const token = match[1].replace(/-/g, "+").replace(/_/g, "/");
    const bytes = Uint8Array.from(atob(token), char => char.charCodeAt(0));
    const value = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    if (value?.v !== 1) throw new Error("Unsupported card");
    return validateGratitudeCard(value);
  } catch {
    throw new Error("This card link is incomplete or invalid.");
  }
}

export function gratitudeCardUrl(card: GratitudeCard) {
  // A production origin makes links created in the local preview usable by recipients.
  // The fragment stays out of HTTP requests; it is readable by anyone with the link.
  return `${PUBLIC_ORIGIN}${GRATITUDE_CARD_PATH}#card=${encodeGratitudeCard(card)}`;
}
