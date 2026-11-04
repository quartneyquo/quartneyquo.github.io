import type { CSSProperties } from "react";
import type { LeafColor } from "@/data/gratitudeGarden";
import Leaf from "./Leaf";

const colors: LeafColor[] = ["maple", "golden", "maple", "sage", "golden", "maple"];

/** Fixed to the viewport so the autumn weather follows visitors through the garden. */
export default function WindblownLeaves() {
  return <div className="garden-wind" aria-hidden="true">
    <div className="wind-stream">
      {Array.from({ length: 48 }, (_, index) => {
        const duration = 7.5 + (index % 7) * 1.1;
        return <span key={index} className={`wind-leaf ${index % 5 === 0 ? "wind-leaf-near" : index % 3 === 0 ? "wind-leaf-far" : ""}`} style={{
          "--leaf-left": `${(index * 73) % 130 - 25}%`,
          "--leaf-size": `${16 + (index * 7) % 21}px`,
          "--fall-time": `${duration}s`,
          "--fall-delay": `${-((index * 2.718) % duration)}s`,
          "--tumble-time": `${2.3 + (index % 6) * .43}s`,
          "--tumble-angle": `${(index * 61) % 360}deg`,
        } as CSSProperties}><span className="wind-leaf-tumble"><Leaf color={colors[index % colors.length]} /></span></span>;
      })}
    </div>
  </div>;
}
