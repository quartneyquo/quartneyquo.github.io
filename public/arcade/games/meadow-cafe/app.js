import { CafeGame, DAYS, FOODS, UPGRADE_COSTS, freshProgress, readProgress, recordResult, buyUpgrade } from './engine.js';

const $ = id => document.getElementById(id);
const SAVE_KEY = 'opaca-meadow-cafe-v1';
let progress;
try { progress = readProgress(localStorage.getItem(SAVE_KEY)); } catch { progress = freshProgress(); }
let day = progress.unlocked, game = null, lastResult = null, lastTime = 0, accumulator = 0, renderTime = 0;
let toastTimer, noticeTimer, audio, helpPaused = false, pointerActive = false;
let savedOkay = true;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reconcile the small scene rather than replacing live buttons on every tick.
// Keeping each keyed control in place preserves touch presses and keyboard focus.
function nodeKey(node) {
  if (node.nodeType !== Node.ELEMENT_NODE) return null;
  for (const name of ['data-table', 'data-guest', 'data-order', 'data-cancel', 'data-serve']) {
    if (node.hasAttribute(name)) return `${name}:${node.getAttribute(name)}`;
  }
  return node.classList[0] ? `${node.tagName}:${node.classList[0]}` : null;
}
function syncChildren(parent, desired) {
  let cursor = parent.firstChild;
  for (const next of [...desired.childNodes]) {
    const key = nodeKey(next);
    let current = cursor;
    if (key) while (current && nodeKey(current) !== key) current = current.nextSibling;
    if (!current || current.nodeType !== next.nodeType || current.nodeName !== next.nodeName || !key && nodeKey(current)) {
      current = next.cloneNode(true); parent.insertBefore(current, cursor);
    } else {
      if (current !== cursor) parent.insertBefore(current, cursor);
      if (current.nodeType === Node.TEXT_NODE) {
        if (current.nodeValue !== next.nodeValue) current.nodeValue = next.nodeValue;
      } else if (current.nodeType === Node.ELEMENT_NODE) {
        for (const attr of [...current.attributes]) if (!next.hasAttribute(attr.name)) current.removeAttribute(attr.name);
        for (const attr of [...next.attributes]) if (current.getAttribute(attr.name) !== attr.value) current.setAttribute(attr.name, attr.value);
        syncChildren(current, next);
      }
    }
    cursor = current.nextSibling;
  }
  while (cursor) { const next = cursor.nextSibling; cursor.remove(); cursor = next; }
}
function setHTML(element, html) {
  const template = document.createElement('template'); template.innerHTML = html;
  syncChildren(element, template.content);
}

function save() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(progress)); savedOkay = true; }
  catch { savedOkay = false; toast('Your browser couldn’t save progress. You can still play this session.'); }
  $('save-note').textContent = savedOkay ? 'Your meadow, saved on this device' : 'Playing without a saved meadow';
}
function toast(message) {
  $('toast').textContent = message; $('toast').hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { $('toast').hidden = true; }, 3200);
}
function notice(message) {
  $('scene-notice').textContent = message; $('scene-notice').hidden = false;
  clearTimeout(noticeTimer); noticeTimer = setTimeout(() => { $('scene-notice').hidden = true; }, 2300);
}
function sound(kind = 'tap') {
  if (progress.muted) return;
  try {
    audio ||= new (window.AudioContext || window.webkitAudioContext)();
    audio.resume().catch(() => {});
    const frequencies = { tap: [440], ready: [660, 880], coin: [523, 659, 784], serve: [587, 740], finish: [523, 659, 784, 1047], leave: [330, 262] }[kind] || [440];
    frequencies.forEach((frequency, i) => {
      const oscillator = audio.createOscillator(), gain = audio.createGain(), t = audio.currentTime + i * 0.09;
      oscillator.type = 'sine'; oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, t); gain.gain.linearRampToValueAtTime(0.045, t + 0.015); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(t); oscillator.stop(t + 0.2);
    });
  } catch { /* Sound is optional on browsers without Web Audio. */ }
}
function updateSound() {
  $('sound-label').textContent = progress.muted ? 'Sound off' : 'Sound on';
  $('sound-button').setAttribute('aria-label', progress.muted ? 'Turn sound on' : 'Turn sound off');
  $('sound-button').setAttribute('aria-pressed', String(!progress.muted));
  $('sound-icon').style.opacity = progress.muted ? '.45' : '1';
}
function drawDays() {
  $('days-nav').innerHTML = DAYS.map((d, i) => {
    const n = i + 1, record = progress.completed[n], locked = n > progress.unlocked;
    return `<button class="day-tab ${day === n ? 'active' : ''}" data-day="${n}" ${locked || game && !game.finished ? 'disabled' : ''} ${day === n ? 'aria-current="step"' : ''} aria-label="Day ${n}: ${d.name}${locked ? ', locked' : record ? `, ${record.stars} stars` : ''}"><span class="day-number">${String(n).padStart(2, '0')}</span><span>${d.name}</span><span class="day-stars">${locked ? '♧' : record ? '★'.repeat(record.stars) + '☆'.repeat(3 - record.stars) : '—'}</span></button>`;
  }).join('');
}
function animateSprite(el, state, time) {
  const row = { idle: 0, right: 1, left: 2, wave: 3, celebrate: 4, failed: 5 }[state] ?? 0;
  const count = { idle: 6, right: 8, left: 8, wave: 4, celebrate: 5, failed: 8 }[state] ?? 6;
  const fps = state === 'idle' ? 5 : state === 'celebrate' ? 7 : 9;
  const frame = reducedMotion ? 0 : Math.floor(time * fps) % count;
  el.style.backgroundPosition = `${frame / 7 * 100}% ${row / 10 * 100}%`;
}
function tableContent(t, demo = false) {
  const g = t.guest, o = game?.orderAt(t.id), food = g && FOODS[g.food];
  const hasDish = o && (o.status === 'carried' || game.pendingPickup(o.id));
  const reserved = game?.actions().some(a => a.type === 'seat' && a.tableId === t.id);
  let action = 'A seat for a friend', bubble = '', extra = '';
  if (reserved) action = 'Opaca is on the way';
  if (t.state === 'ordering') { action = 'Take order'; bubble = `<span class="bubble-word">Hello!<br>♡</span>`; }
  if (t.state === 'waiting') { action = hasDish ? 'Serve their treat' : o?.status === 'ready' ? 'Pick up at kitchen' : 'A little cooking…'; bubble = `${food.icon}<span>${o?.status === 'carried' ? 'ON TRAY' : 'PLEASE'}</span>`; }
  if (t.state === 'eating') { action = 'Enjoying a little treat'; bubble = '♡'; extra = `<span class="table-food">${food.icon}</span>`; }
  if (t.state === 'bill') { action = 'Collect & clear'; bubble = `✦<span>+${t.payment}</span>`; extra = '<span class="table-food">🍽️</span>'; }
  if (t.state === 'dirty') { action = 'Clear this table'; extra = '<span class="dirty-dishes">🍽️</span>'; }
  if (demo && g) { action = 'Your fluffy regulars'; bubble = '♡'; }
  const patience = g ? Math.max(0, g.patience / g.maxPatience) : 1;
  const waiting = ['ordering', 'waiting'].includes(t.state) && !demo;
  const guestVisible = g && t.state !== 'dirty';
  const label = `Table ${t.id}: ${action}${guestVisible ? `, ${g.name}` : ''}${waiting ? `, patience ${Math.round(patience * 100)} percent` : ''}`;
  return `<button class="table-button ${game?.selectedGuest && t.state === 'empty' && !reserved ? 'available' : ''} ${hasDish ? 'has-dish' : ''}" data-table="${t.id}" data-state="${t.state}" style="left:${t.x}%;top:${t.y}%" aria-label="${label}" ${demo ? 'disabled' : ''}><span class="table-shadow"></span>${guestVisible ? `<img class="table-guest guest-bob" src="assets/guest-${g.style}.webp" alt=""><span class="guest-hearts">${waiting ? patience > .65 ? '♡ ♡ ♡' : patience > .3 ? '♡ ♡' : '♡' : '♡ ♡ ♡'}</span>` : ''}<span class="wood-table"></span>${!g || t.state === 'dirty' ? '<span class="vase">✿</span>' : ''}${extra}<span class="table-num">${t.id}</span>${bubble ? `<span class="table-bubble">${bubble}</span>` : ''}${waiting ? `<span class="patience table-patience ${patience < .3 ? 'low' : ''}"><i style="width:${patience * 100}%"></i></span>` : ''}<span class="table-action">${action}</span></button>`;
}
function demo() {
  $('tables').innerHTML = [
    { id: 1, x: 32, y: 48, state: 'empty', guest: null },
    { id: 2, x: 68, y: 48, state: 'eating', guest: { name: 'Maple', style: 1, food: 1, patience: 1, maxPatience: 1 } },
    { id: 3, x: 32, y: 74, state: 'eating', guest: { name: 'Daisy', style: 2, food: 0, patience: 1, maxPatience: 1 } },
    { id: 4, x: 68, y: 74, state: 'empty', guest: null },
  ].map(t => tableContent(t, true)).join('');
  $('opaca').style.left = '51%'; $('opaca').style.top = '69%';
  $('waiting-guests').innerHTML = '<div class="gate-empty"><span class="empty-flower">✿</span>A few friendly faces<br>will be here soon.</div>';
  $('tray-slots').innerHTML = '<div class="tray-slot">＋</div><div class="tray-slot">＋</div>';
  $('kitchen-orders').innerHTML = ''; $('kitchen-empty').hidden = false; $('welcome-sign').hidden = false;
  $('earnings').textContent = 0; $('goal').textContent = DAYS[day - 1].goal;
  $('goal-fill').style.width = 0; $('clock').textContent = '2:00';
  $('day-label').textContent = `DAY ${String(day).padStart(2, '0')}`; $('day-name').textContent = DAYS[day - 1].name;
  $('start-button').innerHTML = `${progress.completed[day] ? 'Play this day' : 'Open the café'} <span>→</span>`;
  $('pause-button').disabled = true;
}
const tutorialCopy = [
  'Let’s welcome your first guest. Tap the alpaca at the gate.',
  'Lovely! Tap any empty table to give your guest a seat.',
  'Now tap their table to take an order. Opaca will pop it over to the kitchen.',
  'The kitchen is cooking. When the dish says “Pick up”, tap it to fill your tray.',
  'A treat on your tray! Tap the matching table to serve it.',
  'A happy guest! When the coins appear, tap the table to collect and clear.',
];
function render() {
  if (!game) return;
  const g = game;
  const tutorial = g.tutorialStep !== null;
  $('earnings').textContent = g.earnings; $('goal-fill').style.width = `${Math.min(100, g.earnings / g.config.goal * 100)}%`;
  const remaining = Math.max(0, Math.ceil(g.duration - g.elapsed));
  $('clock').textContent = g.elapsed >= g.duration ? 'Closing' : `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, '0')}`;
  $('coach-text').textContent = tutorial ? tutorialCopy[g.tutorialStep] : g.elapsed >= g.duration ? 'The gate is closed. Finish serving your guests and collect their coins.' : g.selectedGuest ? 'A guest is selected. Tap an empty table to welcome them in.' : g.earnings >= g.config.goal ? 'Daily goal reached! Keep serving for more stars and little thank-you tips.' : 'Tap guests, tables, and ready dishes. Opaca will follow your little plan.';
  $('skip-tutorial').hidden = !tutorial;
  $('welcome-sign').hidden = true;
  setHTML($('tables'), g.tables.map(t => tableContent(t)).join(''));
  $('waiting-count').textContent = `${g.waiting.length} / 4`;
  setHTML($('waiting-guests'), g.waiting.length ? g.waiting.map(guest => {
    const ratio = Math.max(0, guest.patience / guest.maxPatience), reserved = g.actions().some(a => a.type === 'seat' && a.guestId === guest.id);
    return `<button class="guest-card ${g.selectedGuest === guest.id ? 'selected' : ''} ${reserved ? 'reserved' : ''}" data-guest="${guest.id}" aria-label="Seat ${guest.name}, patience ${Math.round(ratio * 100)} percent" aria-pressed="${g.selectedGuest === guest.id}" ${reserved ? 'disabled' : ''}><img src="assets/guest-${guest.style}.webp" alt=""><span class="guest-details"><b>${guest.name}</b><small>${reserved ? 'A table is on the way' : g.selectedGuest === guest.id ? 'Choose a free table' : 'A table for one, please'}</small><span class="patience ${ratio < .3 ? 'low' : ''}"><i style="width:${ratio * 100}%"></i></span></span><span class="arrow">${g.selectedGuest === guest.id ? '✓' : '→'}</span></button>`;
  }).join('') : `<div class="gate-empty"><span class="empty-flower">✿</span>${g.elapsed >= g.duration ? 'All tucked in.<br>Finish the last little tasks.' : 'A moment of quiet.<br>More friends will be here soon.'}</div>`);
  $('gate-status').textContent = tutorial ? 'A gentle start · clock paused' : g.elapsed >= g.duration ? 'Closed for today' : 'The meadow is open';
  const orders = g.orders.filter(o => o.status !== 'carried');
  $('kitchen-empty').hidden = orders.length > 0;
  setHTML($('kitchen-orders'), orders.map(o => {
    const food = FOODS[o.food], pending = g.pendingPickup(o.id), fullTime = 3.8 * (1 - g.upgrades.cooking * .15);
    return `<button class="order-card ${o.status === 'ready' ? 'ready' : ''} ${pending ? 'queued' : ''}" data-order="${o.id}" aria-label="${food.name} for table ${o.tableId}: ${pending ? 'pickup queued' : o.status === 'ready' ? 'ready to pick up' : 'cooking'}"><span class="order-food">${food.icon}</span><span class="order-table">TABLE ${o.tableId}</span><span class="order-status">${pending ? 'Queued' : o.status === 'ready' ? 'Pick up' : 'Cooking'}</span>${o.status === 'cooking' ? `<span class="cook-track"><i style="width:${Math.max(0, (1 - o.remaining / fullTime) * 100)}%"></i></span>` : ''}</button>`;
  }).join(''));
  $('tray-count').textContent = `${g.tray.length} / 2`;
  setHTML($('tray-slots'), [0, 1].map(index => {
    const o = g.orders.find(o => o.id === g.tray[index]);
    return o ? `<div class="tray-slot filled"><button data-serve="${o.tableId}" aria-label="Serve ${FOODS[o.food].name} to table ${o.tableId}">${FOODS[o.food].icon}<small>TABLE ${o.tableId} →</small></button></div>` : '<div class="tray-slot">＋</div>';
  }).join(''));
  $('opaca-tray').textContent = g.tray.map(id => FOODS[g.orders.find(o => o.id === id).food].icon).join('');
  const actions = g.actions();
  setHTML($('task-queue'), actions.length ? actions.map(a => `<button class="task-chip ${g.active?.action.id === a.id ? 'active' : ''}" data-cancel="${a.id}" aria-label="Cancel task: ${g.label(a)}">${g.active?.action.id === a.id ? '↝ ' : ''}${g.label(a)}<span>×</span></button>`).join('') : '<span class="empty-tasks">Ready for the next little kindness.</span>');
  $('served-count').textContent = `${g.served} happy ${g.served === 1 ? 'guest' : 'guests'}`;
  $('combo-text').textContent = g.combo >= 3 ? `${g.combo} happy guests in a row · extra tips!` : g.lost ? `${g.lost} ${g.lost === 1 ? 'guest' : 'guests'} left · there’s still time` : 'Small acts of café kindness';
  $('tips-count').textContent = `${g.tips} ✦`;
  $('pause-overlay').hidden = !g.paused || g.finished;
  document.body.classList.toggle('paused', g.paused);
  $('pause-button').textContent = g.paused ? '▷' : 'Ⅱ';
  $('pause-button').setAttribute('aria-label', g.paused ? 'Resume game' : 'Pause game');
}
function processEvents() {
  for (const event of game.drainEvents()) {
    if (['hint', 'leave'].includes(event.type)) toast(event.message);
    if (['ready', 'coin', 'serve', 'leave'].includes(event.type)) sound(event.type);
    if (event.type === 'coin') {
      const t = game.table(event.tableId), el = document.createElement('span');
      el.className = 'float-coin'; el.textContent = `+${event.amount} ✦`; el.style.left = `${t.x}%`; el.style.top = `${t.y}%`;
      $('float-layer').append(el); setTimeout(() => el.remove(), 1500);
    }
    if (event.type === 'tutorial') { progress.tutorialSeen = true; save(); notice('You’ve got this! The café rush starts now.'); }
    if (event.type === 'finish') finish(event.result);
  }
}
function start(selectedDay = day) {
  if (game && !game.finished) return;
  day = selectedDay;
  game = new CafeGame(day, progress.upgrades, day === 1 && !progress.tutorialSeen);
  document.body.classList.add('playing');
  lastResult = null; accumulator = 0; renderTime = 0;
  for (const dialog of document.querySelectorAll('dialog[open]')) dialog.close();
  $('day-label').textContent = `DAY ${String(day).padStart(2, '0')}`; $('day-name').textContent = DAYS[day - 1].name;
  $('goal').textContent = game.config.goal;
  $('start-button').innerHTML = 'Café is open <span>✿</span>'; $('start-button').disabled = true;
  $('pause-button').disabled = false;
  drawDays(); render(); sound('tap');
  document.querySelector('.game-layout').scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
}
function pause(value = !game?.paused) {
  if (!game || game.finished) return;
  game.paused = value; accumulator = 0;
  render();
}
function renderShop() {
  $('wallet').textContent = `${progress.wallet} coins ✦`;
  const upgrades = [
    { key: 'speed', name: 'Nimble little hooves', benefit: 'Opaca walks 18% faster per level', icon: '↝' },
    { key: 'cooking', name: 'A warmer kitchen', benefit: 'Dishes cook 15% faster per level', icon: '☕' },
    { key: 'patience', name: 'Extra meadow charm', benefit: 'Guests wait 16% longer per level', icon: '✿' },
  ];
  $('upgrade-list').innerHTML = upgrades.map(u => {
    const level = progress.upgrades[u.key], cost = UPGRADE_COSTS[level];
    return `<div class="upgrade"><div><b>${u.icon} ${u.name}</b><small>${u.benefit} · ${level}/3</small></div><button data-upgrade="${u.key}" ${level >= 3 || progress.wallet < cost ? 'disabled' : ''} aria-label="Upgrade ${u.name} for ${cost || 0} coins">${level >= 3 ? 'Maxed ♡' : `${cost} ✦`}</button></div>`;
  }).join('');
}
function finish(result) {
  lastResult = result;
  recordResult(progress, result); save(); drawDays();
  $('start-button').disabled = false; $('pause-button').disabled = true;
  $('start-button').innerHTML = 'Open the café <span>→</span>';
  $('result-eyebrow').textContent = result.won ? result.day === 5 ? 'FIVE DAYS. SO MANY HAPPY ALPACAS.' : 'THE MEADOW SAYS THANK YOU' : 'TOMORROW IS ANOTHER LITTLE TRY';
  $('result-title').textContent = result.won ? result.day === 5 ? 'The meadow’s favorite café.' : 'A lovely little day.' : 'A little practice, a little fluff.';
  $('result-stars').textContent = result.won ? '★'.repeat(result.stars) + '☆'.repeat(3 - result.stars) : '♡';
  $('result-description').textContent = result.won ? result.day === 5 ? 'You and Opaca made it through all five days. Revisit the meadow to earn your brightest stars.' : 'The tables are clear and your guests are happy. A new café day is waiting for you.' : `You earned ${result.earnings} of ${game.config.goal} coins. Try serving ready meals first and queue your next steps.`;
  $('result-stats').innerHTML = `<div><b>${result.earnings} ✦</b><small>COINS EARNED</small></div><div><b>${result.served}</b><small>HAPPY GUESTS</small></div><div><b>${result.bestCombo}</b><small>BEST HAPPY STREAK</small></div>`;
  $('shop').hidden = !result.won; renderShop();
  $('next-button').textContent = result.won ? result.day === 5 ? 'Back to my meadow →' : `Open day ${result.day + 1} →` : 'Let’s try again →';
  $('replay-button').hidden = !result.won;
  $('result-dialog').showModal(); sound(result.won ? 'finish' : 'leave');
}
function returnToCafe() {
  if (game && !game.finished) return;
  $('result-dialog').close();
  game = null; day = progress.unlocked;
  document.body.classList.remove('paused'); $('pause-overlay').hidden = true;
  document.body.classList.remove('playing');
  $('coach-text').textContent = progress.completed[5] ? 'Five lovely days together. Revisit a day for more stars, or start a new chapter.' : 'A fresh cup of tea and a new café day. Open the café when you’re ready.';
  $('start-button').disabled = false;
  $('waiting-count').textContent = '0 / 4'; $('tray-count').textContent = '0 / 2'; $('opaca-tray').textContent = '';
  $('served-count').textContent = '0 happy guests'; $('tips-count').textContent = '0 ✦';
  $('combo-text').textContent = 'Small acts of café kindness';
  $('task-queue').innerHTML = '<span class="empty-tasks">A little plan goes a long way.</span>';
  $('gate-status').textContent = 'Ready when you are'; $('skip-tutorial').hidden = true;
  demo(); drawDays();
  if (progress.completed[5]) {
    $('save-note').innerHTML = 'Five days, a happy meadow. <button class="text-button" id="reset-button" style="display:inline;padding:0 6px;margin:0">Start fresh</button>';
  }
}

$('start-button').addEventListener('click', () => start());
$('pause-button').addEventListener('click', () => pause());
$('resume-button').addEventListener('click', () => pause(false));
$('sound-button').addEventListener('click', () => { progress.muted = !progress.muted; updateSound(); save(); sound('tap'); });
$('help-button').addEventListener('click', () => {
  helpPaused = !!game && !game.finished && !game.paused;
  if (helpPaused) pause(true);
  $('help-dialog').showModal();
});
$('help-dialog').addEventListener('close', () => { if (helpPaused) pause(false); helpPaused = false; });
$('skip-tutorial').addEventListener('click', () => { if (!game) return; game.skipTutorial(); processEvents(); render(); });
$('tables').addEventListener('click', event => {
  const target = event.target.closest('[data-table]'); if (!target || !game) return;
  if (game.clickTable(Number(target.dataset.table))) sound(); processEvents(); render();
});
$('waiting-guests').addEventListener('click', event => {
  const target = event.target.closest('[data-guest]'); if (!target || !game) return;
  if (game.selectGuest(Number(target.dataset.guest))) sound(); render();
});
$('kitchen-orders').addEventListener('click', event => {
  const target = event.target.closest('[data-order]'); if (!target || !game) return;
  if (game.clickOrder(Number(target.dataset.order))) sound(); processEvents(); render();
});
$('tray-slots').addEventListener('click', event => {
  const target = event.target.closest('[data-serve]'); if (!target || !game) return;
  if (game.clickTable(Number(target.dataset.serve))) sound(); processEvents(); render();
});
$('task-queue').addEventListener('click', event => {
  const target = event.target.closest('[data-cancel]'); if (!target || !game) return;
  game.cancel(Number(target.dataset.cancel)); render();
});
$('days-nav').addEventListener('click', event => {
  const target = event.target.closest('[data-day]'); if (!target || game && !game.finished) return;
  day = Number(target.dataset.day);
  game = null; demo(); drawDays();
});
$('upgrade-list').addEventListener('click', event => {
  const target = event.target.closest('[data-upgrade]'); if (!target) return;
  if (buyUpgrade(progress, target.dataset.upgrade)) { save(); renderShop(); sound('coin'); }
});
$('next-button').addEventListener('click', () => {
  $('result-dialog').close();
  if (lastResult?.won && lastResult.day === 5) returnToCafe();
  else start(lastResult?.won ? lastResult.day + 1 : day);
});
$('replay-button').addEventListener('click', () => { $('result-dialog').close(); start(day); });
$('back-button').addEventListener('click', returnToCafe);
document.addEventListener('click', event => {
  if (event.target.closest('[data-close]')) event.target.closest('dialog').close();
  if (event.target.closest('#reset-button')) $('reset-dialog').showModal();
});
$('confirm-reset').addEventListener('click', () => {
  const muted = progress.muted; progress = freshProgress(); progress.muted = muted; save();
  $('reset-dialog').close(); returnToCafe();
});
$('result-dialog').addEventListener('cancel', event => { event.preventDefault(); returnToCafe(); });
document.addEventListener('keydown', event => {
  if (event.code === 'Space' && !event.repeat && game && !game.finished && !document.querySelector('dialog[open]') && !['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A'].includes(document.activeElement.tagName)) { event.preventDefault(); pause(); }
});
document.addEventListener('visibilitychange', () => {
  lastTime = 0; accumulator = 0;
  if (document.hidden && game && !game.finished && !game.paused) pause(true);
  // Returning to the tab keeps the game paused until the player resumes.
});
// Avoid changing any pressed control's label until its click arrives.
document.addEventListener('pointerdown', () => { pointerActive = true; });
document.addEventListener('pointerup', () => { pointerActive = false; });
document.addEventListener('pointercancel', () => { pointerActive = false; });
function tick(time) {
  const dt = lastTime ? Math.min(.25, (time - lastTime) / 1000) : 0;
  lastTime = time;
  if (!document.hidden && game && !game.finished) {
    accumulator += game.paused ? 0 : dt;
    while (accumulator >= 1 / 60) { game.step(1 / 60); accumulator -= 1 / 60; }
    processEvents();
    renderTime += dt;
    if (renderTime >= .12 && !pointerActive) {
      render(); renderTime = 0;
    }
    $('opaca').style.left = `${game.opaca.x}%`; $('opaca').style.top = `${game.opaca.y}%`;
    animateSprite($('opaca-sprite'), game.opaca.walking ? game.opaca.facing > 0 ? 'right' : 'left' : 'idle', game.animationTime);
  } else if (!game) animateSprite($('opaca-sprite'), 'idle', time / 1000);
  if ($('result-dialog').open) animateSprite($('result-sprite'), lastResult?.won ? 'celebrate' : 'failed', time / 1000);
  requestAnimationFrame(tick);
}
updateSound(); drawDays(); demo();
if (Object.keys(progress.completed).length) $('save-note').textContent = 'Your meadow, saved on this device';
if (progress.completed[5]) returnToCafe();
requestAnimationFrame(tick);
