const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const filename = path.resolve(__dirname, '../src/components/alpacaRunnerEngine.ts');
const compiled = new Module(filename, module);
compiled._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, filename);
const { createRun, advanceRun, jump, PLAYER_X } = compiled.exports;
const step = 1 / 120;
const tick = (run, duration, width = 720) => {
  for (let i = 0; i < Math.round(duration / step); i++) advanceRun(run, step, width, () => 0.5);
};

test('ready, paused, and finished games do not advance or jump', () => {
  for (const status of ['ready', 'paused', 'over']) {
    const run = { ...createRun(), status };
    const before = structuredClone(run);
    jump(run);
    tick(run, 2);
    assert.deepEqual(run, before);
  }
});

test('jump clears an obstacle, cannot double jump, and lands on the ground', () => {
  const run = { ...createRun(), status: 'running', nextObstacle: 100 };
  jump(run);
  tick(run, 0.25);
  assert.ok(run.y < -65);
  const velocity = run.velocity;
  jump(run);
  assert.equal(run.velocity, velocity);
  run.obstacles.push({ x: PLAYER_X + 25, width: 30, height: 33, kind: 'mushroom' });
  tick(run, 0.2);
  assert.equal(run.status, 'running');
  tick(run, 0.5);
  assert.equal(run.y, 0);
  assert.equal(run.velocity, 0);
});

test('a ground-level collision ends the run and freezes its score', () => {
  const run = { ...createRun(), status: 'running', nextObstacle: 100 };
  run.obstacles.push({ x: PLAYER_X + 25, width: 30, height: 33, kind: 'mushroom' });
  tick(run, step);
  assert.equal(run.status, 'over');
  const score = run.score;
  tick(run, 5);
  assert.equal(run.score, score);
});

test('restart creates a fresh run without leftover obstacles or velocity', () => {
  const old = { ...createRun(), status: 'running' };
  jump(old);
  tick(old, 2);
  const fresh = createRun();
  assert.equal(fresh.score, 0);
  assert.equal(fresh.distance, 0);
  assert.equal(fresh.velocity, 0);
  assert.deepEqual(fresh.obstacles, []);
  assert.notEqual(fresh.obstacles, old.obstacles);
});

test('mobile and desktop obstacles remain jumpable through maximum speed', () => {
  for (const width of [290, 360, 720]) for (const kind of ['mushroom', 'log']) {
    const run = { ...createRun(), status: 'running' };
    let randomCall = 0;
    const random = () => randomCall++ % 2 ? 0 : kind === 'mushroom' ? 0 : 0.99;
    let cleared = 0;
    for (let i = 0; i < 120 * 90; i++) {
      const obstacle = run.obstacles.find(item => item.x + item.width > PLAYER_X + 8);
      const speed = Math.min(225 + run.elapsed * 2, 340) * Math.min(1, Math.max(0.8, width / 600));
      // A player reacting about a quarter-second before the obstacle arrives.
      if (obstacle && obstacle.x - (PLAYER_X + 36) < speed * 0.24 && run.y === 0) {
        jump(run);
        cleared++;
      }
      advanceRun(run, step, width, random);
      assert.equal(run.status, 'running', `collision with ${kind} at width ${width}, time ${run.elapsed}`);
    }
    assert.ok(cleared > 30);
    assert.ok(run.score > 500);
    assert.ok(run.obstacles.length < 5);
  }
});
