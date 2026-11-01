export const GROUND = 144;
export const PLAYER_X = 16;
export const GAME_HEIGHT = 180;
export const BEST_SCORE_KEY = 'opaca-detour-best';

export type RunStatus = 'ready' | 'running' | 'paused' | 'over';
export type Obstacle = { x: number; width: number; height: number; kind: 'mushroom' | 'log' };
export type Run = {
  status: RunStatus;
  y: number;
  velocity: number;
  distance: number;
  score: number;
  elapsed: number;
  nextObstacle: number;
  obstacles: Obstacle[];
};

export function createRun(): Run {
  return { status: 'ready', y: 0, velocity: 0, distance: 0, score: 0, elapsed: 0, nextObstacle: 1.1, obstacles: [] };
}

export function jump(run: Run) {
  if (run.status === 'running' && run.y === 0) run.velocity = -490;
}

// The UI advances this simulation at a fixed 120 Hz, independent of display refresh rate.
export function advanceRun(run: Run, seconds: number, width: number, random = Math.random) {
  if (run.status !== 'running') return;
  const speed = Math.min(225 + run.elapsed * 2, 340) * Math.min(1, Math.max(0.8, width / 600));
  run.elapsed += seconds;
  run.distance += speed * seconds;
  run.score = Math.floor(run.distance / 12);
  run.velocity += 1400 * seconds;
  run.y = Math.min(0, run.y + run.velocity * seconds);
  if (run.y === 0) run.velocity = 0;
  run.nextObstacle -= seconds;
  if (run.nextObstacle <= 0) {
    const kind = random() < 0.72 ? 'mushroom' : 'log';
    run.obstacles.push({ x: width + 30, width: kind === 'mushroom' ? 30 : 39, height: kind === 'mushroom' ? 33 : 24, kind });
    // Even at top speed, there is enough room to land before the next jump.
    run.nextObstacle = 1.55 + random() * 0.8;
  }
  for (const obstacle of run.obstacles) {
    obstacle.x -= speed * seconds;
    // Inset hitboxes keep the wool, ears, and mushroom edges forgiving.
    if (PLAYER_X + 36 > obstacle.x + 5 && PLAYER_X + 8 < obstacle.x + obstacle.width - 5
      && GROUND + run.y - 3 > GROUND - obstacle.height + 6) {
      run.status = 'over';
    }
  }
  run.obstacles = run.obstacles.filter(obstacle => obstacle.x + obstacle.width > -10);
}

export function drawRun(ctx: CanvasRenderingContext2D, run: Run, width: number, reducedMotion: boolean) {
  const rect = (x: number, y: number, w: number, h: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), w, h);
  };
  ctx.clearRect(0, 0, width, GAME_HEIGHT);
  rect(0, 0, width, GAME_HEIGHT, '#ffffff');

  // Sparse clouds and a single ground line echo the browser's classic runner.
  const drift = reducedMotion ? 0 : run.distance * 0.08;
  const cloud = (x: number, y: number) => {
    rect(x + 12, y, 18, 1, '#dadce0');
    rect(x + 8, y + 1, 1, 6, '#dadce0');
    rect(x + 30, y + 1, 1, 6, '#dadce0');
    rect(x, y + 7, 9, 1, '#dadce0');
    rect(x + 30, y + 7, 12, 1, '#dadce0');
    rect(x, y + 8, 1, 5, '#dadce0');
    rect(x + 42, y + 8, 1, 5, '#dadce0');
    rect(x, y + 13, 43, 1, '#dadce0');
  };
  cloud(((width * 0.45 - drift) % (width + 60) + width + 60) % (width + 60) - 30, 30);
  cloud(((width * 0.88 - drift * 0.7) % (width + 60) + width + 60) % (width + 60) - 30, 68);
  rect(0, GROUND, width, 1, '#9aa0a6');
  const groundShift = reducedMotion ? 0 : run.distance;
  for (let i = 0; i < Math.ceil(width / 65) + 2; i++) {
    const x = i * 65 - groundShift % 65;
    rect(x + 14, GROUND + 7 + (i % 2) * 4, 5, 1, '#9aa0a6');
    rect(x + 39, GROUND + 5, 2, 1, '#9aa0a6');
  }

  for (const obstacle of run.obstacles) {
    const x = Math.round(obstacle.x);
    if (obstacle.kind === 'mushroom') {
      rect(x + 9, GROUND - 21, 12, 21, '#5f6368');
      rect(x + 12, GROUND - 21, 6, 18, '#ffffff');
      rect(x + 6, GROUND - 33, 18, 6, '#5f6368');
      rect(x + 3, GROUND - 27, 24, 6, '#5f6368');
      rect(x, GROUND - 21, 30, 6, '#5f6368');
      rect(x + 9, GROUND - 30, 3, 6, '#ffffff');
      rect(x + 21, GROUND - 24, 3, 3, '#ffffff');
      rect(x + 3, GROUND - 21, 3, 3, '#ffffff');
    } else {
      rect(x + 3, GROUND - 24, 33, 24, '#5f6368');
      rect(x, GROUND - 18, 39, 15, '#5f6368');
      rect(x + 27, GROUND - 18, 9, 15, '#ffffff');
      rect(x + 30, GROUND - 12, 3, 6, '#5f6368');
      rect(x + 6, GROUND - 18, 15, 3, '#9aa0a6');
      rect(x + 9, GROUND - 9, 12, 3, '#3c4043');
      rect(x + 6, GROUND - 27, 9, 3, '#5f6368');
    }
  }

  // Opaca: hand-drawn on a two-pixel grid, with a pink scarf and rosy cheek.
  const step = run.status === 'running' && run.y === 0 ? Math.floor(run.elapsed * 10) % 2 : 0;
  const py = GROUND - 48 + Math.round(run.y);
  const pixel = (x: number, y: number, w: number, h: number, color: string) => rect(PLAYER_X + x * 2, py + y * 2, w * 2, h * 2, color);
  const wool = '#ffffff', outline = '#5f6368', shade = '#dadce0', pink = '#c58fa3';
  pixel(1, 12, 4, 4, outline);
  pixel(1, 12, 3, 2, wool);
  pixel(4, 18, 3, 6 - step, outline);
  pixel(14, 18, 3, 5 + step, outline);
  pixel(5, 19, 1, 3 - step, wool);
  pixel(15, 19, 1, 2 + step, wool);
  pixel(3, 12, 15, 7, outline);
  pixel(5, 11, 11, 9, outline);
  pixel(4, 13, 13, 5, wool);
  pixel(6, 12, 9, 7, wool);
  pixel(5, 18, 10, 1, shade);
  pixel(14, 7, 5, 11, outline);
  pixel(15, 7, 3, 11, wool);
  pixel(15, 0, 2, 6, outline);
  pixel(19, 0, 2, 6, outline);
  pixel(16, 1, 1, 3, pink);
  pixel(20, 1, 1, 3, pink);
  pixel(14, 4, 8, 6, outline);
  pixel(15, 3, 5, 7, wool);
  pixel(15, 5, 6, 4, wool);
  pixel(20, 7, 3, 3, outline);
  pixel(20, 7, 3, 2, shade);
  pixel(19, 5, 1, 1, '#3c4043');
  pixel(20, 8, 1, 1, pink);
  pixel(14, 10, 6, 2, pink);
  pixel(13, 11, 2, 4, pink);
  pixel(13, 15, 1, 1, '#5f6368');
}
