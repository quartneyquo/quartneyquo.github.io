export type TrailPoint = { x: number; y: number };
export type TrailStation = TrailPoint & { id: string; exitY: number; approachX?: number };

export const CASE_ANCHORS = ['ai-valley', 'nvidia', 'pearle'] as const;
export function passedStops(stations: TrailStation[], previous: number, current: number) {
  if (current <= previous) return [];
  return stations.filter((station, index) => {
    const threshold = station.y + (index === stations.length - 1 ? 0 : 24);
    return previous < threshold && current >= threshold;
  });
}
export function scrollToTrailY(scroll: number, limit: number, first: number, last: number) {
  const progress = limit > 0 ? Math.max(0,Math.min(1,scroll/limit)) : 0;
  return first + (last-first)*progress;
}
export function caseAnchor(hash: string) {
  if (hash === '#case-studies') return 'ai-valley';
  const id = hash.replace(/^#/, '');
  return CASE_ANCHORS.find(anchor => anchor === id);
}

// Cross the page only in the empty space between sections, never through copy.
export function buildTrail(stations: TrailStation[]): TrailPoint[] {
  if (!stations.length) return [];
  const points: TrailPoint[] = [{ x: stations[0].x, y: stations[0].y }];
  for (let i = 1; i < stations.length; i++) {
    const a = stations[i - 1];
    const b = stations[i];
    const start = Math.min(Math.max(a.y, a.exitY + 16), b.y);
    const end = Math.min(start + 176, b.y);
    points.push({ x: a.x, y: start });
    for (let step = 1; step <= 32; step++) {
      const t = step / 32;
      const ease = t * t * (3 - 2 * t);
      points.push({ x: a.x + ((b.approachX ?? b.x) - a.x) * ease, y: start + (end - start) * t });
    }
    if (b.approachX !== undefined) {
      const turnY = Math.max(end,b.y-48);
      points.push({x:b.approachX,y:turnY});
      for(let step=1;step<=24;step++) {
        const t=step/24, ease=t*t*(3-2*t);
        points.push({x:b.approachX+(b.x-b.approachX)*ease,y:turnY+(b.y-turnY)*t});
      }
    }
    points.push({ x: b.x, y: b.y });
  }
  return points;
}

export function pointOnTrail(points: TrailPoint[], y: number): TrailPoint {
  if (!points.length) return { x: 0, y: 0 };
  if (y <= points[0].y) return points[0];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    if (y > b.y) continue;
    const t = b.y === a.y ? 1 : (y - a.y) / (b.y - a.y);
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
  }
  return points[points.length - 1];
}

export function closestStation(stations: TrailStation[], y: number) {
  return stations.reduce<TrailStation | undefined>((best, point) =>
    !best || Math.abs(point.y - y) < Math.abs(best.y - y) ? point : best, undefined);
}

export function trailOutline(points: TrailPoint[], width: number, irregular = false) {
  if (points.length < 2) return '';
  const samples: TrailPoint[] = [];
  for (let i=1; i<points.length; i++) {
    const a=points[i-1], b=points[i];
    const count=Math.max(1,Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)/10));
    for(let j=0;j<count;j++) samples.push({x:a.x+(b.x-a.x)*j/count,y:a.y+(b.y-a.y)*j/count});
  }
  samples.push(points[points.length-1]);
  const edge = (side: number) => samples.map((p,i) => {
    const a=samples[Math.max(0,i-1)], b=samples[Math.min(samples.length-1,i+1)];
    const length=Math.hypot(b.x-a.x,b.y-a.y)||1;
    const w=width/2+(irregular ? [0,3,-2,4,0,-3,2][i%7] : 0);
    const unit=irregular ? 4 : 2;
    return { x:Math.round((p.x-(b.y-a.y)/length*w*side)/unit)*unit,
      y:Math.round((p.y+(b.x-a.x)/length*w*side)/unit)*unit };
  });
  return [...edge(1),...edge(-1).reverse()].map((p,i)=>`${i?'L':'M'}${p.x},${p.y}`).join(' ')+' Z';
}
