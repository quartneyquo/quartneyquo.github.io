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

const { validateGratitudeCard, encodeGratitudeCard, decodeGratitudeCard, gratitudeCardEmail, gratitudeCardImageShare, gratitudeCardFingerprint, gratitudeCardUrl, GRATITUDE_CARD_PATH } = loadSource(path.join(sourceRoot, 'lib/gratitudeCard.ts'));
const { canSharePostcard } = loadSource(path.join(sourceRoot, 'lib/gratitudePostcard.ts'));
const { File } = require('node:buffer');
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

test('growth receipts survive links while legacy cards still open', () => {
  const connected = { ...card, growthId: 'fdaafc83-476a-44df-88a7-cb3ff402e40a' };
  assert.deepEqual(decodeGratitudeCard(`#card=${encodeGratitudeCard(connected)}`), connected);
  assert.deepEqual(decodeGratitudeCard(`#card=${encodeGratitudeCard(card)}`), card);
  assert.throws(() => validateGratitudeCard({ ...card, growthId: 'invalid' }));
});

test('only a stable digest is needed to register a card; retries do not change it', async () => {
  const digest = await gratitudeCardFingerprint(card);
  assert.match(digest, /^[a-f0-9]{64}$/);
  assert.equal(await gratitudeCardFingerprint({ ...card, growthId: 'fdaafc83-476a-44df-88a7-cb3ff402e40a' }), digest);
  assert.notEqual(await gratitudeCardFingerprint({ ...card, recipient: 'Sam' }), digest);
});

test('email drafts preserve Unicode, the message, and the tree contribution link', () => {
  const connected = { ...card, recipient: '지우 & Morgan', message: 'Thanks for tea & good company! 🍂\nYou make my day.', growthId: 'fdaafc83-476a-44df-88a7-cb3ff402e40a' };
  const draft = gratitudeCardEmail(connected);
  const mailto = new URL(draft.href);
  assert.equal(mailto.protocol, 'mailto:');
  assert.equal(mailto.pathname, '', 'the recipient is chosen in the email app');
  assert.equal(mailto.searchParams.get('subject'), draft.subject);
  assert.equal(mailto.searchParams.get('body'), draft.body);
  assert.ok(draft.body.includes(connected.message.replace(/\n/g, '\r\n')));
  assert.ok(draft.body.includes(gratitudeCardUrl(connected)));
});

test('email draft subject cannot inject headers or recipients', () => {
  const draft = gratitudeCardEmail({ ...card, recipient: 'Morgan\nBcc: nobody' });
  assert.ok(!/[\r\n]/.test(draft.subject));
  const parameters = new URL(draft.href).searchParams;
  assert.deepEqual([...parameters.keys()], ['subject', 'body']);
});

test('image sharing passes a PNG attachment and the complete growth link to the email app', () => {
  const connected = { ...card, growthId: 'fdaafc83-476a-44df-88a7-cb3ff402e40a' };
  const file = new File([new Uint8Array([137, 80, 78, 71])], 'postcard.png', { type: 'image/png' });
  const shared = gratitudeCardImageShare(connected, file);
  assert.deepEqual(shared.files, [file]);
  assert.equal(shared.files[0].type, 'image/png');
  assert.equal(shared.title, gratitudeCardEmail(connected).subject);
  assert.ok(shared.text.includes(gratitudeCardUrl(connected)));
  assert.ok(shared.text.includes(card.message));
  assert.throws(() => gratitudeCardImageShare(card, new File([], 'empty.png', { type: 'image/png' })));
  assert.throws(() => gratitudeCardImageShare(card, new File(['text'], 'link.txt', { type: 'text/plain' })));
});

test('attachment support is checked separately from link sharing and safely falls back', () => {
  const file = new File(['image'], 'postcard.png', { type: 'image/png' });
  assert.equal(canSharePostcard(file, {}), false);
  assert.equal(canSharePostcard(file, { share() {} }), false);
  assert.equal(canSharePostcard(file, { share() {}, canShare: () => false }), false);
  assert.equal(canSharePostcard(file, { share() {}, canShare: () => { throw new Error('blocked'); } }), false);
  assert.equal(canSharePostcard(file, { share() {}, canShare(data) {
    assert.deepEqual(Object.keys(data), ['files']);
    assert.deepEqual(data.files, [file]);
    return true;
  } }), true);
});
