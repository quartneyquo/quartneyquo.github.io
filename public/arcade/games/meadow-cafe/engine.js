export const DAYS = [
  { name: 'A fresh start', goal: 130, interval: 10.5, patience: 44 },
  { name: 'The breakfast club', goal: 170, interval: 9, patience: 39 },
  { name: 'Blossom brunch', goal: 210, interval: 7.8, patience: 35 },
  { name: 'A meadow gathering', goal: 240, interval: 6.8, patience: 32 },
  { name: 'The grand picnic', goal: 270, interval: 6, patience: 29 },
];
export const FOODS = [
  { name: 'Berry tart', icon: '🥧', price: 20, color: '#b96d79' },
  { name: 'Meadow tea', icon: '🍵', price: 17, color: '#789074' },
  { name: 'Honey toast', icon: '🍞', price: 19, color: '#d2a466' },
];
export const GUEST_NAMES = ['Clover', 'Maple', 'Daisy', 'Cocoa'];
export const TABLE_POSITIONS = [{ x: 32, y: 48 }, { x: 68, y: 48 }, { x: 32, y: 74 }, { x: 68, y: 74 }];
export const UPGRADE_COSTS = [60, 100, 145];
export function freshProgress() {
  return { version: 1, unlocked: 1, wallet: 0, completed: {}, upgrades: { speed: 0, cooking: 0, patience: 0 }, tutorialSeen: false, muted: true };
}
const integer = (v, fallback, max) => Number.isFinite(v) ? Math.max(0, Math.min(max, Math.floor(v))) : fallback;
export function readProgress(raw) {
  try {
    const data = JSON.parse(raw);
    if (!data || data.version !== 1) return freshProgress();
    const p = freshProgress();
    p.unlocked = Math.max(1, integer(data.unlocked, 1, 5));
    p.wallet = integer(data.wallet, 0, 100000);
    p.tutorialSeen = data.tutorialSeen === true;
    p.muted = data.muted !== false;
    for (const key of Object.keys(p.upgrades)) p.upgrades[key] = integer(data.upgrades?.[key], 0, 3);
    for (let day = 1; day <= 5; day++) {
      const result = data.completed?.[day];
      if (result && result.stars >= 1) p.completed[day] = { stars: integer(result.stars, 1, 3), earnings: integer(result.earnings, 0, 10000) };
    }
    return p;
  } catch { return freshProgress(); }
}
export function recordResult(progress, result) {
  if (!result.won) return progress;
  const previous = progress.completed[result.day] || { stars: 0, earnings: 0 };
  progress.wallet += Math.max(0, result.earnings - previous.earnings);
  progress.completed[result.day] = { stars: Math.max(previous.stars, result.stars), earnings: Math.max(previous.earnings, result.earnings) };
  progress.unlocked = Math.max(progress.unlocked, Math.min(5, result.day + 1));
  return progress;
}
export function buyUpgrade(progress, key) {
  if (!Object.hasOwn(progress.upgrades, key)) return false;
  const level = progress.upgrades[key], cost = UPGRADE_COSTS[level];
  if (level >= 3 || progress.wallet < cost) return false;
  progress.wallet -= cost;
  progress.upgrades[key]++;
  return true;
}
export class CafeGame {
  constructor(day = 1, upgrades = {}, tutorial = false, seed = day * 9137) {
    this.day = Math.max(1, Math.min(5, day));
    this.config = DAYS[this.day - 1];
    this.upgrades = { speed: 0, cooking: 0, patience: 0, ...upgrades };
    this.seed = seed >>> 0;
    this.elapsed = 0;
    this.animationTime = 0;
    this.duration = 120;
    this.paused = false;
    this.finished = false;
    this.tutorialStep = tutorial ? 0 : null;
    this.nextArrival = this.config.interval;
    this.counter = 0;
    this.arrived = 0;
    this.served = 0;
    this.lost = 0;
    this.earnings = 0;
    this.tips = 0;
    this.combo = 0;
    this.bestCombo = 0;
    this.events = [];
    this.waiting = [];
    this.orders = [];
    this.tray = [];
    this.queue = [];
    this.active = null;
    this.selectedGuest = null;
    this.opaca = { x: 50, y: 84, facing: 1, walking: false };
    this.tables = TABLE_POSITIONS.map((pos, i) => ({ id: i + 1, ...pos, state: 'empty', guest: null }));
    this.arrive();
  }
  random() {
    this.seed = (Math.imul(1664525, this.seed) + 1013904223) >>> 0;
    return this.seed / 4294967296;
  }
  emit(type, message, detail = {}) { this.events.push({ type, message, ...detail }); }
  drainEvents() { return this.events.splice(0); }
  patience() { return this.config.patience * (1 + this.upgrades.patience * 0.16); }
  arrive() {
    const style = Math.floor(this.random() * 4), maxPatience = this.patience();
    const guest = { id: ++this.counter, style, name: GUEST_NAMES[style], patience: maxPatience, maxPatience, quality: 1, food: Math.floor(this.random() * FOODS.length) };
    this.arrived++;
    if (this.waiting.length >= 4) { this.lost++; this.combo = 0; this.emit('leave', 'The gate was full — a guest wandered off.'); return; }
    this.waiting.push(guest);
    this.emit('arrive', `${guest.name} is at the gate.`);
  }
  selectGuest(id) {
    if (!this.waiting.some(g => g.id === id) || this.paused || this.finished) return false;
    if (this.actions().some(a => a.type === 'seat' && a.guestId === id)) return false;
    this.selectedGuest = id;
    if (this.tutorialStep === 0) this.tutorialStep = 1;
    return true;
  }
  skipTutorial() { this.tutorialStep = null; this.emit('tutorial', 'You’re ready for the café rush!'); }
  actions() { return this.active ? [this.active.action, ...this.queue] : this.queue; }
  orderAt(tableId) { return this.orders.find(o => o.tableId === tableId); }
  table(id) { return this.tables.find(t => t.id === id); }
  label(action) {
    const n = action.tableId;
    return ({ seat: `Seat → ${n}`, order: `Order → ${n}`, pickup: `Pick up → ${n}`, serve: `Serve → ${n}`, clear: `Collect → ${n}` })[action.type];
  }
  pendingPickup(orderId) { return this.actions().some(a => a.type === 'pickup' && a.orderId === orderId); }
  clickTable(id) {
    const t = this.table(id);
    if (!t || this.paused || this.finished) return false;
    if (t.state === 'empty') {
      if (!this.selectedGuest) { this.emit('hint', 'Choose a guest at the gate, then tap a free table.'); return false; }
      const success = this.enqueue({ type: 'seat', tableId: id, guestId: this.selectedGuest });
      if (success) this.selectedGuest = null;
      return success;
    }
    if (t.state === 'ordering') return this.enqueue({ type: 'order', tableId: id, guestId: t.guest.id });
    if (t.state === 'bill' || t.state === 'dirty') return this.enqueue({ type: 'clear', tableId: id, guestId: t.guest?.id });
    if (t.state === 'waiting') {
      const order = this.orderAt(id);
      if (order && (order.status === 'carried' || this.pendingPickup(order.id))) return this.enqueue({ type: 'serve', tableId: id, guestId: t.guest.id, orderId: order.id });
      this.emit('hint', order?.status === 'ready' ? `Pick up table ${id}’s dish at the kitchen first.` : `Table ${id}’s food is cooking. Visit another guest!`);
    } else this.emit('hint', `Table ${id} is enjoying their meal.`);
    return false;
  }
  clickOrder(id) {
    const order = this.orders.find(o => o.id === id);
    if (!order || this.paused || this.finished) return false;
    if (order.status !== 'ready') { this.emit('hint', order.status === 'carried' ? 'This dish is already on your tray.' : 'The kitchen is still preparing this dish.'); return false; }
    return this.enqueue({ type: 'pickup', orderId: id, tableId: order.tableId, guestId: order.guestId });
  }
  enqueue(action) {
    if (this.paused || this.finished) return false;
    if (this.actions().length >= 6) { this.emit('hint', 'Six tasks queued. Let Opaca catch up!'); return false; }
    if (this.actions().some(a => a.type === action.type && (a.orderId ? a.orderId === action.orderId : a.tableId === action.tableId))) return false;
    if (action.type === 'seat' && this.actions().some(a => a.type === 'seat' && (a.tableId === action.tableId || a.guestId === action.guestId))) {
      this.emit('hint', 'That guest or table already has a seating task.'); return false;
    }
    action.id = ++this.counter;
    this.queue.push(action);
    return true;
  }
  cancel(id) {
    if (this.paused || this.finished) return false;
    if (this.active?.action.id === id) { this.active = null; this.opaca.walking = false; return true; }
    const before = this.queue.length;
    this.queue = this.queue.filter(a => a.id !== id);
    return this.queue.length !== before;
  }
  valid(action) {
    const t = this.table(action.tableId), o = this.orders.find(o => o.id === action.orderId);
    if (!t) return false;
    if (action.type === 'seat') return t.state === 'empty' && this.waiting.some(g => g.id === action.guestId);
    if (action.type === 'clear') return ['bill', 'dirty'].includes(t.state) && t.guest?.id === action.guestId;
    if (t.guest?.id !== action.guestId) return false;
    if (action.type === 'order') return t.state === 'ordering';
    if (action.type === 'pickup') return t.state === 'waiting' && o?.status === 'ready' && this.tray.length < 2;
    if (action.type === 'serve') return t.state === 'waiting' && o?.status === 'carried' && this.tray.includes(o.id);
    return false;
  }
  target(action, phase = 0) {
    if (action.type === 'seat' && phase === 0) return { x: 15, y: 52 };
    if (action.type === 'pickup') return { x: 50, y: 33 };
    const t = this.table(action.tableId);
    return { x: t.x + (t.x < 50 ? 12 : -12), y: t.y + 7 };
  }
  complete(action) {
    const t = this.table(action.tableId);
    if (action.type === 'seat') {
      t.guest = this.waiting.find(g => g.id === action.guestId);
      this.waiting = this.waiting.filter(g => g.id !== action.guestId);
      t.guest.quality = Math.min(t.guest.quality, t.guest.patience / t.guest.maxPatience);
      t.guest.patience = t.guest.maxPatience;
      t.state = 'ordering';
      if (this.tutorialStep === 1) this.tutorialStep = 2;
      this.emit('seat', `${t.guest.name} is seated at table ${t.id}.`);
    } else if (action.type === 'order') {
      const order = { id: ++this.counter, tableId: t.id, guestId: t.guest.id, food: t.guest.food, status: 'cooking', remaining: 3.8 * (1 - this.upgrades.cooking * 0.15) };
      t.guest.quality = Math.min(t.guest.quality, t.guest.patience / t.guest.maxPatience);
      t.guest.patience = t.guest.maxPatience;
      this.orders.push(order);
      t.state = 'waiting';
      if (this.tutorialStep === 2) this.tutorialStep = 3;
      this.emit('order', `Table ${t.id} ordered ${FOODS[order.food].name.toLowerCase()}.`);
    } else if (action.type === 'pickup') {
      const o = this.orders.find(o => o.id === action.orderId);
      o.status = 'carried';
      this.tray.push(o.id);
      if (this.tutorialStep === 3) this.tutorialStep = 4;
      this.emit('pickup', `Table ${t.id}’s dish is on your tray.`);
    } else if (action.type === 'serve') {
      this.orders = this.orders.filter(o => o.id !== action.orderId);
      this.tray = this.tray.filter(id => id !== action.orderId);
      t.state = 'eating';
      t.eatRemaining = 4;
      t.guest.quality = Math.min(t.guest.quality, t.guest.patience / t.guest.maxPatience);
      this.served++;
      this.combo = t.guest.quality > 0.45 ? this.combo + 1 : 0;
      this.bestCombo = Math.max(this.bestCombo, this.combo);
      t.tip = Math.round(t.guest.quality * 7) + Math.min(3, Math.floor(this.combo / 3));
      t.payment = FOODS[t.guest.food].price + t.tip;
      if (this.tutorialStep === 4) this.tutorialStep = 5;
      this.emit('serve', `A happy alpaca! ${this.combo >= 3 ? `${this.combo} in a row.` : 'Bon appétit.'}`, { tableId: t.id });
    } else if (action.type === 'clear') {
      if (t.state === 'bill') { this.earnings += t.payment; this.tips += t.tip; this.emit('coin', `+${t.payment} coins · table ${t.id}`, { tableId: t.id, amount: t.payment }); }
      else this.emit('clean', `Table ${t.id} is ready for a fresh start.`);
      t.state = 'empty'; t.guest = null; t.payment = 0;
      if (this.tutorialStep === 5) this.skipTutorial();
    }
  }
  departTable(t) {
    const id = t.guest.id;
    this.lost++; this.combo = 0;
    t.state = 'dirty';
    this.orders = this.orders.filter(o => o.guestId !== id);
    this.tray = this.tray.filter(id => this.orders.some(o => o.id === id));
    this.emit('leave', `Table ${t.id} got tired of waiting. Clear the table to welcome someone new.`);
  }
  step(dt) {
    if (this.paused || this.finished || !Number.isFinite(dt) || dt <= 0) return;
    this.animationTime += dt;
    const tutorial = this.tutorialStep !== null;
    if (!tutorial) {
      this.elapsed += dt;
      while (this.nextArrival < this.duration && this.elapsed >= this.nextArrival) {
        this.arrive(); this.nextArrival += this.config.interval * (0.92 + this.random() * 0.16);
      }
      this.waiting = this.waiting.filter(g => {
        g.patience -= dt;
        if (g.patience > 0) return true;
        this.lost++; this.combo = 0;
        if (this.selectedGuest === g.id) this.selectedGuest = null;
        this.emit('leave', `${g.name} left the gate. Catch the next guest!`);
        return false;
      });
    }
    const cooking = this.orders.find(o => o.status === 'cooking');
    if (cooking) {
      cooking.remaining -= dt;
      if (cooking.remaining <= 0) { cooking.status = 'ready'; this.emit('ready', `Table ${cooking.tableId}’s dish is ready!`); }
    }
    for (const t of this.tables) {
      if (['ordering', 'waiting'].includes(t.state) && !tutorial) {
        t.guest.patience -= dt;
        if (t.guest.patience <= 0) this.departTable(t);
      }
      if (t.state === 'eating') {
        t.eatRemaining -= dt;
        if (t.eatRemaining <= 0) { t.state = 'bill'; this.emit('bill', `Table ${t.id} is ready to pay.`); }
      }
    }
    if (this.active && !this.valid(this.active.action)) {
      this.emit('hint', this.active.action.type === 'pickup' && this.tray.length >= 2 ? 'Your tray is full. Serve a dish, then pick this one up.' : 'A task changed — Opaca skipped it.');
      this.active = null;
    }
    while (!this.active && this.queue.length) {
      const action = this.queue.shift();
      if (this.valid(action)) this.active = { action, phase: 0, target: this.target(action), workRemaining: 0.35 };
      else this.emit('hint', action.type === 'pickup' && this.tray.length >= 2 ? 'Your tray is full. Serve a dish, then try again.' : 'A task changed — Opaca skipped it.');
    }
    this.opaca.walking = false;
    if (this.active) {
      const { target } = this.active;
      const dx = target.x - this.opaca.x, dy = target.y - this.opaca.y;
      const distance = Math.hypot(dx, dy), travel = 33 * (1 + this.upgrades.speed * 0.18) * dt;
      if (distance > travel) {
        this.opaca.x += dx / distance * travel; this.opaca.y += dy / distance * travel;
        if (Math.abs(dx) > 0.1) this.opaca.facing = dx >= 0 ? 1 : -1;
        this.opaca.walking = true;
      } else {
        this.opaca.x = target.x; this.opaca.y = target.y;
        this.active.workRemaining -= dt;
        if (this.active.workRemaining <= 0) {
          if (this.active.action.type === 'seat' && this.active.phase === 0) {
            this.active.phase = 1; this.active.target = this.target(this.active.action, 1); this.active.workRemaining = 0.35;
          } else { const action = this.active.action; this.active = null; this.complete(action); }
        }
      }
    }
    if (!tutorial && this.elapsed >= this.duration && !this.waiting.length && this.tables.every(t => ['empty', 'dirty'].includes(t.state))) {
      this.finished = true; this.active = null; this.queue = []; this.opaca.walking = false;
      const won = this.earnings >= this.config.goal, ratio = this.served / Math.max(1, this.arrived);
      const stars = won ? (ratio >= 0.9 && this.earnings >= this.config.goal * 1.4 ? 3 : ratio >= 0.7 && this.earnings >= this.config.goal * 1.15 ? 2 : 1) : 0;
      this.result = { day: this.day, won, stars, earnings: this.earnings, tips: this.tips, served: this.served, lost: this.lost, arrived: this.arrived, bestCombo: this.bestCombo };
      this.emit('finish', won ? 'A lovely day in the meadow!' : 'Every café has a learning day.', { result: this.result });
    }
  }
}
