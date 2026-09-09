const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const filename = path.resolve(__dirname, '../src/components/watercolorMatte.ts');
const compiled = new Module(filename, module);
compiled._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, filename);
const { clearExteriorPaper } = compiled.exports;

test('exterior paper disappears while enclosed white artwork stays opaque', () => {
  const pixels = new Uint8ClampedArray(7 * 7 * 4).fill(255);
  for (let y = 1; y < 6; y++) for (let x = 1; x < 6; x++) {
    if (x === 1 || x === 5 || y === 1 || y === 5) pixels.set([185, 150, 100, 255], (y * 7 + x) * 4);
  }
  clearExteriorPaper(pixels, 7, 7);
  assert.equal(pixels[3], 0);
  assert.deepEqual([...pixels.slice((3 * 7 + 3) * 4, (3 * 7 + 3) * 4 + 4)], [255, 255, 255, 255]);
  assert.equal(pixels[(1 * 7 + 1) * 4 + 3], 255);
});

test('cream fur and colored pale washes are not treated as neutral white paper', () => {
  const pixels = new Uint8ClampedArray([255, 255, 255, 255, 255, 246, 220, 255, 245, 255, 239, 255]);
  clearExteriorPaper(pixels, 3, 1);
  assert.deepEqual([...pixels], [255, 255, 255, 0, 255, 246, 220, 255, 245, 255, 239, 255]);
});
