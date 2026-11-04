import { useId, type CSSProperties } from "react";
import { gardenGrowth, canopyLeafPosition } from "@/lib/gardenGrowth";
import type { LeafColor } from "@/data/gratitudeGarden";
import Leaf from "./Leaf";

// This mask reuses the original painting. Its ground, gate and alpacas stay fixed
// while the canopy and trunk gently expand from the roots.
const treeMask = "M480 26C365 0 262 80 225 123 125 155 119 197 80 240 34 292 74 361 170 374 232 408 344 365 403 350L432 442Q430 482 399 521Q477 539 587 516L545 458 544 356C651 381 749 412 821 369 915 375 957 302 915 260 916 198 825 160 778 133 683 94 649 36 573 46Q523 16 480 26Z";
const autumnColors: LeafColor[] = ["maple", "golden", "maple", "rose", "golden", "sage", "maple", "lavender"];

function Pumpkin({ x, y, scale = 1, pale = false }: { x: number; y: number; scale?: number; pale?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cy="20" rx="25" ry="4" fill="#7e6542" opacity=".12" />
    <path d="M0-12Q-3-23 5-24" stroke="#80784a" strokeWidth="4" strokeLinecap="round" />
    <path d="M2-11Q14-20 22-14" fill="none" stroke="#919b61" strokeWidth="2" strokeLinecap="round" />
    <ellipse cy="4" rx="24" ry="19" fill={pale ? "#f2ddb1" : "#e6a166"} stroke="#ad7952" strokeWidth=".8" />
    <ellipse cy="4" rx="15" ry="19" fill={pale ? "#f9e6c0" : "#edb17a"} stroke="#be8c61" strokeWidth=".8" />
    <ellipse cy="4" rx="6" ry="19" fill={pale ? "#f6e2b7" : "#f1bc86"} stroke="#c8996d" strokeWidth=".7" />
  </g>;
}

function LittleAlpaca({ x, y, scale = 1, fawn = false }: { x: number; y: number; scale?: number; fawn?: boolean }) {
  const wool = fawn ? "#eac799" : "#fff0cf";
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke="#b99770" strokeWidth="1" strokeLinejoin="round">
    <ellipse cx="0" cy="27" rx="32" ry="5" fill="#89724f" stroke="none" opacity=".1" />
    <path d="M-19 9-19 25-13 25-11 10M8 10 9 25 15 25 16 7" fill={wool} />
    <path d="M-21-7Q-34-20-29-3" fill={wool} />
    <path d="M-26-6Q-28-16-17-15Q-10-23-2-17Q5-23 13-16Q24-17 25-6L23 6Q19 15 6 13Q-2 19-11 13Q-27 15-26-6Z" fill={wool} />
    <path d="M10 4 9-28Q9-41 22-41Q35-38 32-25L25 7" fill={wool} />
    <path d="M14-38Q8-62 16-61L22-42M25-42Q27-64 33-57L31-36" fill={wool} />
    <path d="M12-31Q6-41 15-46Q21-52 28-46Q40-47 38-36Q42-27 32-23Q24-18 15-24Z" fill={wool} />
    <circle cx="20" cy="-34" r="1.8" fill="#69503b" stroke="none" /><circle cx="31" cy="-34" r="1.8" fill="#69503b" stroke="none" />
    <path d="m24-29 2 2 2-2M26-27q-2 5-5 1M26-27q2 5 5 1" fill="none" stroke="#836149" strokeWidth="1" />
    <circle cx="16" cy="-29" r="3" fill="#e4b2a2" stroke="none" opacity=".7" /><circle cx="35" cy="-29" r="3" fill="#e4b2a2" stroke="none" opacity=".7" />
    <path d="M10-13Q21-9 30-14" fill="none" stroke={fawn ? "#a19e78" : "#bf876a"} strokeWidth="5" />
  </g>;
}

export default function GardenGrowth({ total }: { total: number | null }) {
  const id = useId().replace(/:/g, "");
  const growth = gardenGrowth(total);
  const has = (key: string) => growth.unlocked.some(m => m.key === key);
  return <div className={`living-garden ${has("golden") ? "is-golden" : ""}`} aria-hidden="true" data-growth-stage={growth.stage}>
    <svg className="growing-canopy" viewBox="0 0 1000 666.667" focusable="false">
      <defs>
        <filter id={`${id}-soft`}><feGaussianBlur stdDeviation="2.5" /></filter>
        <mask id={`${id}-tree`} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="667"><path d={treeMask} fill="white" filter={`url(#${id}-soft)`} /></mask>
        <radialGradient id={`${id}-gold`}><stop stopColor="#f8d77b" stopOpacity=".35" /><stop offset="1" stopColor="#f5d578" stopOpacity="0" /></radialGradient>
      </defs>
      <g className="canopy-growth-transform" style={{ transform: `translate(500px, 514px) scale(${growth.canopyScale}) translate(-500px, -514px)` }}>
        <image href="/holiday/gratitude-garden.png" width="1000" height="666.667" mask={`url(#${id}-tree)`} />
        {has("golden") && <ellipse cx="500" cy="245" rx="440" ry="235" fill={`url(#${id}-gold)`} />}
      </g>
    </svg>
    <div className="canopy-new-leaves" style={{ "--canopy-scale": growth.canopyScale } as CSSProperties}>
      {Array.from({ length: growth.extraLeaves }, (_, i) => {
        const position = canopyLeafPosition(i);
        return <span className="grown-leaf" key={i} style={{ left: `${position.x}%`, top: `${position.y}%`, "--leaf-angle": `${position.rotation}deg`, "--leaf-size": `${13 + (i % 4) * 3}px`, "--bloom-delay": `${Math.min(i, 14) * 40}ms` } as CSSProperties}><Leaf color={has("golden") ? "golden" : autumnColors[i % autumnColors.length]} /></span>;
      })}
    </div>
    <svg className="garden-unlocks" viewBox="0 0 1000 666.667" focusable="false">
      {has("pumpkins") && <g className="garden-unlock" data-decoration="pumpkins"><Pumpkin x={160} y={568} scale={.9} /><Pumpkin x={197} y={581} scale={.6} pale /><Pumpkin x={847} y={568} scale={.8} /><Pumpkin x={878} y={585} scale={.5} /></g>}
      {has("bench") && <g className="garden-unlock" data-decoration="bench" transform="translate(768 478) rotate(-3)" stroke="#a2815d" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="38" cy="56" rx="53" ry="6" fill="#96816a" stroke="none" opacity=".1" />
        <path d="M1 12 2 53M74 12 75 53M-4 40 82 40" strokeWidth="5" />
        <rect x="-8" y="4" width="91" height="12" rx="3" fill="#dbc09b" /><rect x="-7" y="21" width="91" height="10" rx="2" fill="#e7ccaa" />
        <path d="M-11 34 82 34 91 41-13 41Z" fill="#d3af85" /><path d="M14 42 12 55M68 42 71 55" strokeWidth="4" />
        <path d="M2 9 76 9M1 26 77 26" stroke="#ead5b7" strokeWidth="1" />
      </g>}
      {has("lights") && <g className="garden-unlock fairy-lights" data-decoration="lights">
        <path d="M170 251Q325 335 478 263Q641 346 821 259" fill="none" stroke="#a58b5d" strokeWidth="1.4" opacity=".8" />
        {Array.from({ length: 18 }, (_, i) => {
          const right = i >= 9; const t = (i % 9 + .5) / 9;
          const x = right ? 478 + 343 * t : 170 + 308 * t;
          const y = right ? (1-t)**2*263 + 2*(1-t)*t*346+t*t*259 : (1-t)**2*251+2*(1-t)*t*335+t*t*263;
          return <g key={i} className="fairy-bulb" style={{ "--twinkle-delay": `${i * -.3}s` } as CSSProperties}><path d={`M${x} ${y}v6`} stroke="#a68c63" /><circle cx={x} cy={y+8} r="9" fill="#ffe7a5" opacity=".18" /><circle cx={x} cy={y+8} r="3.2" fill="#fff5c6" stroke="#d7b66e" strokeWidth=".5" /></g>;
        })}
      </g>}
      {has("friends") && <g className="garden-unlock" data-decoration="friends"><LittleAlpaca x={244} y={518} scale={.75} /><LittleAlpaca x={735} y={539} scale={.6} fawn /></g>}
      {has("fountain") && <g className="garden-unlock" data-decoration="fountain" transform="translate(529 568)" stroke="#a69d87" strokeWidth="1">
        <ellipse cy="41" rx="43" ry="7" fill="#8d8370" opacity=".12" stroke="none" />
        <path d="M-8 13-10 31-21 35 22 35 11 30 8 13" fill="#d8d2bf" /><path d="M-35 4Q-30 29 0 28 30 28 35 4Z" fill="#d7d1bc" />
        <ellipse cy="4" rx="35" ry="9" fill="#e8e0ca" /><ellipse cy="3" rx="28" ry="5" fill="#b9d0c8" stroke="#97b4ad" />
        <path d="M-6 1-4-22 4-22 6 1" fill="#d2cbb5" /><ellipse cy="-22" rx="15" ry="4" fill="#e6dcc4" />
        <g className="fountain-water" fill="none" stroke="#b8d8d0" strokeWidth="1.6"><path d="M0-24Q-15-43-23-5M0-24Q17-43 24-5M0-24Q-1-40 2-43" /><path d="M-13-21Q-12-3-21 1M13-21Q14-2 21 2" /></g>
      </g>}
      {has("golden") && <g className="garden-unlock golden-sparkles" data-decoration="golden" fill="#fff1b4" stroke="#d8b858" strokeWidth=".5">
        {Array.from({ length: 14 }, (_, i) => { const p = canopyLeafPosition(i * 5); return <path className="fairy-bulb" key={i} style={{ "--twinkle-delay": `${i * -.4}s` } as CSSProperties} transform={`translate(${p.x * 10} ${p.y * 6.667})`} d="M0-6 1.6-1.6 6 0 1.6 1.6 0 6-1.6 1.6-6 0-1.6-1.6Z" />; })}
      </g>}
    </svg>
  </div>;
}
