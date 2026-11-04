import { gratitudeCardEmail, type GratitudeCard } from "@/lib/gratitudeCard";

const encoder = new TextEncoder();
const PNG_SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10];

function base64(bytes: Uint8Array) {
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 8192) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
  }
  return btoa(binary);
}

function mimeBody(bytes: Uint8Array) {
  return base64(bytes).match(/.{1,76}/g)?.join("\r\n") ?? "";
}

function mimeSubject(subject: string) {
  // Fold UTF-8 encoded words without splitting a character (RFC 2047).
  const words: string[] = [];
  let chunk = "";
  for (const character of subject) {
    if (encoder.encode(chunk + character).length > 42) {
      words.push(`=?UTF-8?B?${base64(encoder.encode(chunk))}?=`);
      chunk = "";
    }
    chunk += character;
  }
  if (chunk) words.push(`=?UTF-8?B?${base64(encoder.encode(chunk))}?=`);
  return words.join("\r\n ");
}

/** A local email file with actual image bytes attached, never just an image URL. */
export async function createGratitudeEmailFile(card: GratitudeCard, image: File) {
  if (image.type !== "image/png" || image.size > 8 * 1024 * 1024) throw new Error("Please prepare a postcard PNG first.");
  const png = new Uint8Array(await image.arrayBuffer());
  if (!PNG_SIGNATURE.every((byte, index) => png[index] === byte)) throw new Error("The postcard image is incomplete. Please try again.");
  const draft = gratitudeCardEmail(card);
  const boundary = `paca_${crypto.randomUUID()}`;
  const contents = [
    `Subject: ${mimeSubject(draft.subject)}`,
    "To:",
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
    // A compose hint for clients that support it; other clients open a message.
    "X-Unsent: 1",
    "Content-Type: multipart/mixed;",
    ` boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    mimeBody(encoder.encode(draft.body)),
    `--${boundary}`,
    'Content-Type: image/png; name="paca-gratitude-postcard.png"',
    "Content-Transfer-Encoding: base64",
    'Content-Disposition: attachment; filename="paca-gratitude-postcard.png"',
    "",
    mimeBody(png),
    `--${boundary}--`,
    "",
  ].join("\r\n");
  // Sender and recipient addresses are deliberately chosen in the mail app.
  return new File([contents], "paca-gratitude-email.eml", { type: "message/rfc822" });
}
