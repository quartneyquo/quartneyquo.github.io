const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

const filename = path.resolve(__dirname, '../src/components/opacaNavigation.ts');
const compiled = new Module(filename, module);
compiled.filename = filename;
compiled.paths = Module._nodeModulePaths(path.dirname(filename));
compiled._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText, filename);
const { createNavigation, SPAWN, APPROACHES, keyboardStep, worldDistance } = compiled.exports;
const nav = createNavigation();

test('all six approach points are connected; routes avoid obstacles in both directions', () => {
  for (const from of [SPAWN, ...APPROACHES]) for (const to of APPROACHES) {
    assert.ok(nav.walkable(to), JSON.stringify(to));
    const route = nav.route(from, to);
    assert.ok(route.length);
    assert.ok(worldDistance(route.at(-1), to) <= 0.51);
    let previous = from;
    for (const point of route) {
      assert.ok(nav.canTraverse(previous, point), JSON.stringify({ previous, point }));
      previous = point;
    }
  }
});

test('blocked and out-of-bounds targets end on reachable terrain', () => {
  for (const target of [{ x: 0, y: 0 }, { x: 100, y: 100 }, { x: 10, y: 17 }, { x: 50, y: 35 }, { x: 93, y: 80 }]) {
    assert.equal(nav.walkable(target), false);
    const route = nav.route(SPAWN, target);
    assert.ok(route.length);
    assert.ok(nav.walkable(route.at(-1)));
    for (let i = 1; i < route.length; i++) assert.ok(nav.canTraverse(route[i - 1], route[i]));
  }
});

test('keyboard speed is equal on cardinal and diagonal movement', () => {
  const right = keyboardStep(SPAWN, 1, 0, 0.016, nav);
  const diagonal = keyboardStep(SPAWN, 1, 1, 0.016, nav);
  assert.ok(Math.abs(worldDistance(SPAWN, right) - worldDistance(SPAWN, diagonal)) < 1e-8);
});

test('keyboard cannot walk through buildings or off the map, even after a long frame', () => {
  for (const [dx, dy] of [[0, -1], [1, 1], [-1, 0], [0, 1]]) {
    let point = SPAWN;
    for (let i = 0; i < 600; i++) {
      const next = keyboardStep(point, dx, dy, 1, nav);
      assert.ok(nav.walkable(next));
      assert.ok(nav.canTraverse(point, next));
      assert.ok(worldDistance(point, next) <= 22 * 0.032 + 1e-8);
      point = next;
    }
  }
});

test('new routes from fractional keyboard positions stay traversable', () => {
  let point = SPAWN;
  for (let i = 0; i < 25; i++) point = keyboardStep(point, 1, 1, 0.016, nav);
  for (const to of APPROACHES) {
    let previous = point;
    for (const waypoint of nav.route(point, to)) {
      assert.ok(nav.canTraverse(previous, waypoint));
      previous = waypoint;
    }
  }
});
