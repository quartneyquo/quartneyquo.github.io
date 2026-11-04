const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const filename = path.resolve(__dirname, '../src/lib/gardenGrowth.ts');
const compiled = new Module(filename, module);
compiled.filename = filename;
compiled.paths = Module._nodeModulePaths(path.dirname(filename));
compiled._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, filename);
const { gardenGrowth, canopyLeafPosition } = compiled.exports;

test('loading, zero and invalid counts never unlock community rewards', () => {
  for (const value of [null, 0, -10, NaN, Infinity, -Infinity]) {
    const growth = gardenGrowth(value);
    assert.equal(growth.total, 0);
    assert.equal(growth.canopyScale, 1);
    assert.deepEqual(growth.unlocked, []);
    assert.equal(growth.remaining, 3);
    assert.equal(growth.stage, 'Little beginnings');
  }
});

test('each milestone unlocks at its exact public count and advances the goal', () => {
  const thresholds = [3, 10, 25, 50, 100, 250];
  const stages = ['Taking root', 'Growing together', 'Glowing with gratitude', 'A garden of friends', 'Full of wonder', 'A golden garden'];
  thresholds.forEach((count, i) => {
    const before = gardenGrowth(count - 1);
    assert.equal(before.unlocked.length, i);
    assert.equal(before.remaining, 1);
    assert.equal(before.next.count, count);
    assert.equal(before.stage, stages[i - 1] ?? 'Little beginnings');
    const reached = gardenGrowth(count);
    assert.equal(reached.unlocked.length, i + 1);
    assert.equal(reached.stage, stages[i]);
    assert.equal(reached.next?.count, thresholds[i + 1]);
    assert.equal(reached.remaining, i < 5 ? thresholds[i + 1] - count : 0);
  });
});

test('growth is gradual and bounded without capping the actual community count', () => {
  let previous = gardenGrowth(0);
  for (let count = 1; count <= 250; count++) {
    const current = gardenGrowth(count);
    assert.ok(current.fullness > previous.fullness);
    assert.ok(current.fullness <= 1);
    assert.ok(current.canopyScale > previous.canopyScale);
    previous = current;
  }
  const huge = gardenGrowth(1000000);
  assert.equal(previous.fullness, 1);
  assert.equal(huge.total, 1000000);
  assert.equal(huge.canopyScale, previous.canopyScale);
  assert.equal(huge.remaining, 0);
});

test('the beginning remains sparse and the final milestone fills the canopy', () => {
  assert.equal(gardenGrowth(0).fullness, 0);
  assert.ok(gardenGrowth(1).fullness < 0.05);
  assert.ok(gardenGrowth(10).fullness < 0.2);
  assert.ok(gardenGrowth(100).fullness > 0.5);
  assert.equal(gardenGrowth(250).fullness, 1);
  assert.equal(gardenGrowth(1000).fullness, 1);
});

test('decorative leaves stay in the canopy and keep their positions as it grows', () => {
  const initial = Array.from({ length: 10 }, (_, i) => canopyLeafPosition(i));
  const full = Array.from({ length: 72 }, (_, i) => canopyLeafPosition(i));
  assert.deepEqual(full.slice(0, 10), initial);
  for (const position of full) {
    assert.ok(position.x >= 16 && position.x <= 84);
    assert.ok(position.y >= 10 && position.y <= 50);
    assert.ok(Number.isFinite(position.rotation));
  }
});
