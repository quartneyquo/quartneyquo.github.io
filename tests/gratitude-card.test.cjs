const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const sourceRoot = path.resolve(__dirname, '../src');
const loaded = new Map();

function loadSource(filename) {
  if (loaded.has(filename)) return loaded.get(filename).exports;
  const compiled = new Module(filename, module);
  compiled.filename = filename;
  compiled.paths = Module._nodeModulePaths(path.dirname(filename));
  loaded.set(filename, compiled);
  const nativeRequire = compiled.require.bind(compiled);
  compiled.require = id => id.startsWith('@/') ? loadSource(path.join(sourceRoot, `${id.slice(2)}.ts`)) : nativeRequire(id);
  compiled._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText, filename);
  return compiled.exports;
}

const { validateGratitudeCard, encodeGratitudeCard, decodeGratitudeCard, gratitudeCardUrl, GRATITUDE_CARD_PATH } = loadSource(path.join(sourceRoot, 'lib/gratitudeCard.ts'));
const card = { recipient: 'Morgan', author: 'Avery', message: 'Thank you for being here.', color: 'maple' };
const rawHash = value => '#card=' + Buffer.from(JSON.stringify(value)).toString('base64url');

test('unicode names, emoji and line breaks survive a shared link', () => {
  const unicode = { ...card, recipient: '지우 🌷', author: 'Françoise', message: '고마워요 🍂\nYou make my world warmer. 🦙', color: 'lavender' };
  const token = encodeGratitudeCard(unicode);
  assert.match(token, /^[A-Za-z0-9_-]+$/);
  assert.deepEqual(decodeGratitudeCard(`#card=${token}`), unicode);
});

test('normalizes names and allows an anonymous sender without requiring an account', () => {
  assert.deepEqual(validateGratitudeCard({ ...card, recipient: ' Morgan ', author: ' ', message: ' Thanks! ' }), { ...card, recipient: 'Morgan', author: 'A grateful little paca', message: 'Thanks!' });
});

test('public links use the deployed recipient page and keep the message in the fragment', () => {
  const url = new URL(gratitudeCardUrl(card));
  assert.equal(url.origin, 'https://courtneyko.com');
  assert.equal(url.pathname, GRATITUDE_CARD_PATH);
  assert.equal(url.search, '');
  assert.deepEqual(decodeGratitudeCard(url.hash), card);
});

test('rejects invalid, truncated, oversized and unsupported card links', () => {
  for (const hash of ['', '#', '#card=', '#card=%', '#card=a', '#card=' + 'a'.repeat(4097), rawHash({ v: 2, ...card }), rawHash({ v: 1, ...card, color: 'unexpected' }), rawHash({ v: 1, ...card, recipient: '' }), rawHash(null)]) {
    assert.throws(() => decodeGratitudeCard(hash), /incomplete or invalid/);
  }
});

test('enforces limits on every decoded field, not just form inputs', () => {
  const invalid = [{ ...card, recipient: ' ' }, { ...card, recipient: 'a'.repeat(41) }, { ...card, author: 'a'.repeat(41) }, { ...card, message: 'a' }, { ...card, message: 'a'.repeat(241) }, { ...card, message: '\u0000hello' }, { ...card, author: 17 }, { ...card, color: 'red' }, null, []];
  for (const value of invalid) assert.throws(() => validateGratitudeCard(value));
  const longest = { recipient: '名'.repeat(40), author: '名'.repeat(40), message: '謝'.repeat(240), color: 'sage' };
  assert.deepEqual(decodeGratitudeCard(`#card=${encodeGratitudeCard(longest)}`), longest);
});

test('keeps user text as data and discards extra payload properties', () => {
  const text = { ...card, message: '<img src=x onerror=alert(1)> Thanks & love!' };
  assert.deepEqual(decodeGratitudeCard(rawHash({ v: 1, ...text, href: 'javascript:alert(1)', pending: false })), text);
});
