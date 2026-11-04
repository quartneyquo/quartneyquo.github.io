import { type CSSProperties } from "react";
import { gardenGrowth, canopyLeafPosition } from "@/lib/gardenGrowth";

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

function AlpacaFriend({ x, y, width, column }: { x: number; y: number; width: number; column: 0 | 1 | 2 }) {
  // Each transparent watercolor character occupies one column of the sprite sheet.
  return <svg x={x} y={y} width={width} height={width * 680 / 512} viewBox={`${column * 512} 200 512 680`} overflow="hidden" focusable="false">
    <image href="/holiday/alpaca-friends-watercolor.png" width="1536" height="1024" />
  </svg>;
}

export default function GardenGrowth({ total }: { total: number | null }) {
  const growth = gardenGrowth(total);
  const has = (key: string) => growth.unlocked.some(m => m.key === key);
  return <div className={`living-garden ${has("golden") ? "is-golden" : ""}`} aria-hidden="true" data-growth-stage={growth.stage}>
    <img className="garden-flourishing-art" src="/holiday/gratitude-garden-flourishing.png" alt="" width="1536" height="1024" decoding="async" style={{ opacity: growth.fullness }} />
    <svg className="garden-unlocks" viewBox="0 0 1000 666.667" focusable="false">
      {has("pumpkins") && <g className="garden-unlock" data-decoration="pumpkins"><Pumpkin x={160} y={568} scale={.9} /><Pumpkin x={197} y={581} scale={.6} pale /><Pumpkin x={847} y={568} scale={.8} /><Pumpkin x={878} y={585} scale={.5} /></g>}
      {has("bench") && <g className="garden-unlock" data-decoration="bench" transform="translate(820 478) rotate(-3)" stroke="#a2815d" strokeLinecap="round" strokeLinejoin="round">
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
      {has("friends") && <g className="garden-unlock" data-decoration="friends"><AlpacaFriend x={192} y={395} width={88} column={0} /><AlpacaFriend x={415} y={470} width={80} column={1} /><AlpacaFriend x={720} y={405} width={96} column={2} /></g>}
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
