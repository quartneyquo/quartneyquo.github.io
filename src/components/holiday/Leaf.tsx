import { useId } from "react";
import { type LeafColor } from "@/data/gratitudeGarden";

// Each silhouette has its own vein structure, so the color choices also feel
// like different leaves collected from the garden.
const leaves: Record<LeafColor, { outline: string; veins: string; stem: string; light: string; mid: string; dark: string }> = {
  maple: {
    outline: "M36 5C38 12 39 16 42 21L50 16 48 30 63 26 59 37 66 41 46 48 40 54 29 54 23 48 7 43 13 37 9 27 24 30 22 16 30 21Z",
    veins: "M34 56 36 13M35 42 18 33M35 41 54 33M35 49 18 43M36 33 29 25M36 30 43 23M35 49 49 44",
    stem: "M34 53Q33 63 29 72", light: "#f3c392", mid: "#d68c58", dark: "#b96640",
  },
  golden: {
    outline: "M36 6C28 4 27 12 30 17 18 11 14 20 23 25 10 21 10 33 20 37 10 38 14 48 26 48 22 55 29 62 35 62 42 60 47 54 43 49 56 49 61 38 49 35 61 29 56 20 46 24 54 14 44 10 41 16 45 10 42 6 36 6Z",
    veins: "M34 63Q39 40 36 13M36 48 23 42M37 36 25 28M37 26 31 20M36 53 45 45M38 39 49 30M38 29 44 22",
    stem: "M34 60Q33 68 28 74", light: "#f5db8f", mid: "#d9b15b", dark: "#b78b3d",
  },
  rose: {
    outline: "M35 18C28 6 14 8 10 20 5 36 21 48 35 62 43 50 60 38 62 24 65 10 46 5 35 18Z",
    veins: "M35 62Q34 42 35 20M34 47Q22 42 16 29M35 38 23 20M35 49Q48 40 54 26M35 39 47 20M35 56 25 48M35 56 44 48",
    stem: "M35 60Q37 68 32 74", light: "#edbdba", mid: "#cb8c94", dark: "#aa677b",
  },
  sage: {
    outline: "M42 6C26 11 11 22 13 37 14 49 24 55 32 62 43 55 58 42 56 28 55 16 47 12 42 6Z",
    veins: "M32 62Q32 39 42 14M33 49 20 38M34 39 23 28M37 29 30 20M33 53 46 42M35 42 50 29M38 30 46 21",
    stem: "M32 59Q31 68 26 74", light: "#c9d3a4", mid: "#96aa7b", dark: "#6f885f",
  },
  lavender: {
    outline: "M37 5 42 14 47 18 46 23 53 27 51 32 56 37 52 41 53 47 46 49 44 56 37 60 32 65 28 59 21 55 20 49 13 45 17 40 13 35 19 31 17 26 24 22 24 16 31 12Z",
    veins: "M32 65Q37 39 37 13M34 53 24 45M35 43 24 33M36 32 29 24M34 56 43 49M36 44 46 36M37 33 44 26",
    stem: "M32 62Q31 69 27 74", light: "#d9c4df", mid: "#b298bf", dark: "#8d759f",
  },
};

export default function Leaf({ color = "maple", className = "" }: { color?: LeafColor; className?: string }) {
  const id = useId().replace(/:/g, "");
  const leaf = leaves[color] ?? leaves.maple;
  return <svg viewBox="0 0 72 80" fill="none" className={`botanical-leaf ${className}`} aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={`${id}-wash`} x1="14" y1="10" x2="55" y2="62" gradientUnits="userSpaceOnUse">
        <stop stopColor={leaf.light} /><stop offset=".52" stopColor={leaf.mid} /><stop offset="1" stopColor={leaf.dark} />
      </linearGradient>
      <pattern id={`${id}-grain`} width="9" height="11" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="3" r=".65" fill="#fff8e8" opacity=".4" /><circle cx="7" cy="7" r=".45" fill={leaf.dark} opacity=".22" /><path d="m3 9 1.5-.5" stroke="#fff8e8" strokeWidth=".5" opacity=".3" />
      </pattern>
      <clipPath id={`${id}-shape`}><path d={leaf.outline} /></clipPath>
    </defs>
    <path d={leaf.stem} stroke={leaf.dark} strokeWidth="1.8" strokeLinecap="round" />
    <path d={leaf.outline} fill={`url(#${id}-wash)`} stroke={leaf.dark} strokeOpacity=".55" strokeWidth=".75" strokeLinejoin="round" />
    <g clipPath={`url(#${id}-shape)`}>
      <path d="M36 0Q27 31 34 65L3 68V0Z" fill="#ffefd5" opacity=".14" />
      <path d="M44 6Q47 33 30 64L65 67V6Z" fill={leaf.dark} opacity=".07" />
      <path d={leaf.outline} fill={`url(#${id}-grain)`} />
    </g>
    <path d={leaf.veins} stroke={leaf.dark} strokeWidth=".8" strokeOpacity=".48" strokeLinecap="round" strokeLinejoin="round" />
    <path d={leaf.veins} transform="translate(-.5,-.4)" stroke="#fff5da" strokeWidth=".65" strokeOpacity=".7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}
