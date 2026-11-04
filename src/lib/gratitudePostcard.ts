import type { GardenNote } from "@/data/gratitudeGarden";
import { leafStyles } from "@/data/gratitudeGarden";
export async function createPostcardFile(note: Pick<GardenNote, "message" | "author" | "color">, recipient?: string) {
  const image = new Image(); image.src = recipient ? "/holiday/gratitude-garden-flourishing.png" : "/holiday/gratitude-garden.png";
  await image.decode();
  const canvas = document.createElement("canvas"); canvas.width = 1600; canvas.height = 1000;
  const ctx = canvas.getContext("2d"); if (!ctx) throw new Error("Postcard unavailable");
  const palette = leafStyles.find(s => s.id === note.color) ?? leafStyles[0];
  ctx.fillStyle = "#fffaf2"; ctx.fillRect(0, 0, 1600, 1000);
  ctx.save(); ctx.beginPath(); ctx.rect(35, 35, 760, 930); ctx.clip();
  ctx.drawImage(image, -250, 130, 1280, 854); ctx.restore();
  ctx.strokeStyle = "#dccbb6"; ctx.lineWidth = 2; ctx.strokeRect(24, 24, 1552, 952);
  ctx.setLineDash([5, 10]); ctx.beginPath(); ctx.moveTo(814, 90); ctx.lineTo(814, 910); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = "#6b7154"; ctx.textAlign = "center"; ctx.font = "20px Georgia";
  ctx.fillText(recipient ? "A LITTLE THANK-YOU FOR" : "A LITTLE KEEPSAKE FROM", 1190, 170);
  ctx.fillStyle = "#4b4036"; ctx.font = "43px Georgia"; ctx.fillText(recipient || "Paca’s Gratitude Garden", 1190, 233, 590);
  ctx.fillStyle = palette.color; ctx.font = "72px Georgia"; ctx.fillText("“", 1190, 335);
  ctx.fillStyle = "#4b4036"; ctx.font = "34px Georgia";
  const wrap = (text: string) => {
    const lines: string[] = []; let line = "";
    for (const word of text.trim().split(/\s+/)) {
      const next = line ? `${line} ${word}` : word;
      if (ctx.measureText(next).width <= 580) { line = next; continue; }
      if (line) { lines.push(line); line = ""; }
      for (const char of Array.from(word)) {
        if (ctx.measureText(line + char).width > 580) { lines.push(line); line = char; }
        else line += char;
      }
    }
    if (line) lines.push(line);
    return lines;
  };
  let fontSize = 34; let lines = wrap(note.message);
  while (lines.length * fontSize * 1.4 > 390 && fontSize > 22) {
    fontSize -= 2; ctx.font = `${fontSize}px Georgia`; lines = wrap(note.message);
  }
  const lineHeight = fontSize * 1.4;
  const start = 520 - (lines.length - 1) * lineHeight / 2;
  lines.forEach((text, i) => ctx.fillText(text, 1190, start + i * lineHeight));
  ctx.font = "22px Georgia"; ctx.fillStyle = "#817163";
  ctx.fillText(`— ${note.author}`, 1190, Math.min(810, start + lines.length * lineHeight + 38), 590);
  ctx.font = "italic 25px Georgia"; ctx.fillText(recipient ? "With love, from Paca’s Gratitude Garden." : "Little thanks make a big garden.", 1190, 890, 590);
  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(new Error("Could not create postcard")), "image/png"));
  return new File([blob], recipient ? "a-little-paca-thank-you.png" : "my-paca-gratitude-postcard.png", { type: "image/png" });
}

export function savePostcardFile(file: File) {
  const url = URL.createObjectURL(file); const link = document.createElement("a");
  link.href = url; link.download = file.name; document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

export async function downloadPostcard(note: Pick<GardenNote, "message" | "author" | "color">, recipient?: string) {
  savePostcardFile(await createPostcardFile(note, recipient));
}

export function canSharePostcard(file: File, browser: Partial<Pick<Navigator, "share" | "canShare">>) {
  if (typeof browser.share !== "function" || typeof browser.canShare !== "function") return false;
  try { return browser.canShare({ files: [file] }); }
  catch { return false; }
}
