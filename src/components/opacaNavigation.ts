import PF from 'pathfinding';

export type WorldPoint = { x: number; y: number };
export const SPAWN: WorldPoint = { x: 50, y: 55 };
export const APPROACHES: WorldPoint[] = [
  { x: 25, y: 46 }, { x: 48, y: 49 }, { x: 75, y: 49 },
  { x: 22, y: 79 }, { x: 48, y: 79 }, { x: 74, y: 77 },
];

// Square world cells match the landscape's 3:2 aspect ratio; positions are percentages.
const COLS = 151;
const ROWS = 101;
const obstacles = [
  [14, 27, 27, 43], [41, 25, 58, 45], [68, 26, 83, 46],
  [17, 58, 32, 76], [43, 58, 56, 76], [69, 59, 81, 74],
];
const trees = [[33, 29, 5, 6], [92, 49, 5, 8], [15, 66, 4, 7]];
const clearing = [
  [23, 20], [88, 20], [93, 30], [93, 54], [89, 62], [86, 73],
  [81, 80], [69, 88], [58, 92], [18, 91], [8, 78], [7, 36], [18, 31],
];

function inClearing(p: WorldPoint) {
  let inside = false;
  for (let i = 0, j = clearing.length - 1; i < clearing.length; j = i++) {
    const [xi, yi] = clearing[i];
    const [xj, yj] = clearing[j];
    if ((yi > p.y) !== (yj > p.y) && p.x < (xj - xi) * (p.y - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export const worldDistance = (a: WorldPoint, b: WorldPoint) => Math.hypot((a.x - b.x) * 1.5, a.y - b.y);
const toCell = (p: WorldPoint) => [Math.round(p.x * 1.5), Math.round(p.y)] as const;
const toPoint = (x: number, y: number): WorldPoint => ({ x: x / 1.5, y });

export function createNavigation() {
  const grid = new PF.Grid(COLS, ROWS);
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
    const p = toPoint(x, y);
    const blocked = !inClearing(p)
      || obstacles.some(([left, top, right, bottom]) => p.x >= left - 1 && p.x <= right + 1 && p.y >= top - 1 && p.y <= bottom + 1)
      || trees.some(([tx, ty, rx, ry]) => ((p.x - tx) / rx) ** 2 + ((p.y - ty) / ry) ** 2 < 1);
    grid.setWalkableAt(x, y, !blocked);
  }
  // Restrict every input to the spawn's connected component, including blocked clicks.
  const [sx, sy] = toCell(SPAWN);
  const reachable = new Set<number>([sy * COLS + sx]);
  const cells = [grid.getNodeAt(sx, sy)];
  for (let i = 0; i < cells.length; i++) {
    for (const next of grid.getNeighbors(cells[i], PF.DiagonalMovement.OnlyWhenNoObstacles)) {
      const key = next.y * COLS + next.x;
      if (!reachable.has(key)) { reachable.add(key); cells.push(next); }
    }
  }
  const walkable = (p: WorldPoint) => {
    const [x, y] = toCell(p);
    return x >= 0 && x < COLS && y >= 0 && y < ROWS && reachable.has(y * COLS + x);
  };
  const canTraverse = (a: WorldPoint, b: WorldPoint) => {
    const steps = Math.max(1, Math.ceil(worldDistance(a, b) * 4));
    let previous = a;
    for (let i = 1; i <= steps; i++) {
      const p = { x: a.x + (b.x - a.x) * i / steps, y: a.y + (b.y - a.y) * i / steps };
      if (!walkable(p) || !walkable({ x: p.x, y: previous.y }) || !walkable({ x: previous.x, y: p.y })) return false;
      previous = p;
    }
    return true;
  };
  const route = (from: WorldPoint, target: WorldPoint) => {
    if (!walkable(from)) return [];
    const closest = cells.reduce((best, cell) => worldDistance(toPoint(cell.x, cell.y), target) < worldDistance(toPoint(best.x, best.y), target) ? cell : best);
    const [x, y] = toCell(from);
    const finder = new PF.AStarFinder({ allowDiagonal: true, dontCrossCorners: true });
    return PF.Util.compressPath(finder.findPath(x, y, closest.x, closest.y, grid.clone()))
      .map(([cx, cy]) => toPoint(cx, cy));
  };
  return { walkable, canTraverse, route };
}

export function keyboardStep(from: WorldPoint, dx: number, dy: number, seconds: number, nav: ReturnType<typeof createNavigation>) {
  const length = Math.hypot(dx, dy);
  if (!length) return from;
  const distance = 22 * Math.min(seconds, 0.032);
  const target = { x: from.x + dx / length * distance / 1.5, y: from.y + dy / length * distance };
  if (nav.canTraverse(from, target)) return target;
  const horizontal = { x: target.x, y: from.y };
  if (nav.canTraverse(from, horizontal)) return horizontal;
  const vertical = { x: from.x, y: target.y };
  return nav.canTraverse(from, vertical) ? vertical : from;
}
