/* dial.js — THE DIAL AS A CLASS (7 Nov 2026; Tom: "move the dial into a javacript class so that it an be reused.").
   The navigation dial of geometry.html, lifted out whole so any page can put one over any long list: a gold needle that
   is a rate, a blue needle that is a place, and a radius that sets the window. A classic script (no module, no build),
   so a page loads it with <script src="dial.js"></script>, opened from disk or from the site alike; it defines Dial.

   WHAT IT HOLDS. A list of `count` records, 0 … count − 1 (the writer's: counted, each with its index, the length
   known). A record `index`, a window of span = count^reach records round `centre`, and the hyperbolic angle ζ between
   them: the record is centre + unit · sinh ζ, unit = span / 2 / 2^K (the 45° corner; the window's half is 2^K units).
   The blue needle sits at θ = gd(ζ), so tan θ = sinh ζ is the value. Pressing and dragging sideways turns the gold
   needle; while it is held, ζ grows at tan(gold) · thrust a second; letting go springs the gold home and rests the
   window on the record reached (`recentre`). The wheel or a pinch sets the radius (`reach`), keeping the record.

   THE TURN LAYS HEAT, NOT ADDRESSES (as geometry.html). The turn spent per record is cos²θ against home's: hottest at
   home, ½ at the corner, nothing at the horizon. The band just outside the arc is that heat; `heat()` gives it.

   EACH DIAL IS A THUMB (7 Nov 2026; Tom: "each one of the dials could be a thumb."): the window held evenly round the
   needle is the thumb, H; past it the list is read as ratios. A page with two orders can cross two dials.

   USE.
     const d = Dial.mount(canvas, { count: 1e9, label: i => [[['#' + i, 1]]] });   // a page that is only the dial
   or, sharing a canvas with something else (as geometry.html does): new Dial(opts), then each frame
     d.step(now); d.layout({ cx, cy, R }); d.draw(ctx, now);
   and route the hands to d.press / d.drag / d.release / d.pinchStart / d.pinchTo / d.wheel / d.key / d.keyUp.

   OPTIONS (all optional but count):
     count     the list's length                       index   the record to start on (default 0)
     reach     the radius, 0 … 1 (window = count^reach; default 0.45)
     K         corners from home to the window's edge (default 5)        thrust  ζ a second at a 45° gold (0.4)
     label(i, dial)  the record as lines of parts: [[[text, mag], …], …]; each part is coloured by the step it names,
                     mag records: teal within a unit of the needle, blue within the window, gold out of reach
     sizeText(n)     a count of records as words, for the info line (default: 1.2k, 3.4M …)
     fonts     the lines' sizes in px (default [19, 15])    mono  the font family (default the page's --mono, or monospace)
     colours   { bg, gold, teal, blue, ink, dim }           hint  the first-use hint: false, or its two lines
     onChange(dial)  called when the record, ζ or the radius moves
     info(dial)      the line under the record (default: g, the window, the unit, the heat)

   THE THUMB IN PLACE OF THE COUNT (7 Nov 2026; Tom: "i'm thinking we could use the dial to browse the cauchy horizon.",
   then "proceed"). Give `H` (a thumb, in the list's own units) instead of `count`, and the list has no end: the needle
   turns from home (θ = 0) toward a horizon (θ = 90°) it never reaches, and the record is H · tan θ = H · sinh ζ,
   measured from home with no window and no recentring. One thumb out is the corner; far out, each ln 2 of ζ is one more
   "one in two", so a steady push walks out by a steady ratio. The wheel, a pinch or ↑ ↓ change the thumb, keeping the
   needle where it is: what lies under it slides. ζ stops where a double still holds the record (tan θ = 10^15).        */
(function (root) {
'use strict';
const PI = Math.PI;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const COLOURS = { bg: '#0b0d12', gold: '#e8c86a', teal: '#1D9E75', blue: '#6aa8e8', ink: '#c9c7be', dim: '#7f8590' };
function plainSize(n){                                          // a count of records as words
  if (n < 1) return n.toPrecision(2);
  for (const [u, s] of [[1e12, 'T'], [1e9, 'G'], [1e6, 'M'], [1e3, 'k']])
    if (n >= u) { const v = n / u; return v.toFixed(v >= 100 ? 0 : v >= 10 ? 1 : 2) + s; }
  return n.toFixed(n >= 10 ? 0 : 2).replace(/\.00$/, '');
}

class Dial {
  constructor(o = {}){
    this.thumb = o.H > 0;                                       // the thumb's mode: no count, no end, no window
    if (!this.thumb && !(o.count >= 1)) throw new Error('Dial: count (the list\'s length) or H (a thumb) is needed');
    this.count = this.thumb ? Infinity : o.count;
    this.H = this.thumb ? o.H : 0;
    this.K = o.K || 5;
    this.CAP = Math.atan(2 ** this.K);                          // the gold's widest push: the K-th corner, tan θ = 2^K
    this.ZMAX = this.thumb ? Math.asinh(1e15) : Math.asinh(2 ** this.K);   // the window's end, or as far as a double holds
    this.ZMIN = this.thumb ? 0 : -this.ZMAX;                    // the thumb's mode turns one way from home: a quarter turn
    this.info = o.info === false ? false : o.info || null;   // false: no line under the record
    this.partBoxes = !!o.partBoxes;                             // each part of the record on a box of its own (partAt finds one)
    this.thrust = o.thrust || 0.4;
    this.springMs = 150; this.tapPx = 6;
    this.label = o.label || (i => [[[String(Math.round(i)), 1]]]);
    this.sizeText = o.sizeText || plainSize;
    this.fonts = o.fonts || [19, 15];
    this.mono = o.mono || null;
    this.c = Object.assign({}, COLOURS, o.colours || {});
    this.hint = o.hint === false ? null : Array.isArray(o.hint) ? o.hint : ['press and drag sideways to move', 'wheel or pinch: the window'];
    this.onChange = o.onChange || null;
    this.index = this.thumb ? 0 : clamp(o.index || 0, 0, this.count - 1);
    this.centre = this.index; this.reach = o.reach != null ? o.reach : 0.45; this.zeta = 0;
    this.gold = 0; this.held = false; this.thrusting = false; this.springAt = -1; this.last = 0;
    this.touched = false;                                       // the hint shows until the first touch
    this.box = { cx: 0, cy: 0, R: 1 };
    if (this.thumb && o.index > 0) this.zeta = Math.asinh(o.index / this.H);
    this.recentre();
  }

  // ── THE READING ───────────────────────────────────────────────────────────────────────────────
  span(){ return this.thumb ? 2 * this.H * 2 ** this.K : Math.max(1, Math.pow(this.count, this.reach)); }   // window = count^r
  unit(s = this.span()){ return s / 2 / 2 ** this.K; }             // one unit = the 45° corner (the thumb, in its mode)
  theta(){ return Math.atan(Math.sinh(this.zeta)); }                // θ = gd(ζ)
  sweep(){ return Math.abs(this.theta()) / (PI / 2); }              // g: the sweep as a share of the quarter turn
  heat(){ return Math.cos(this.theta()) ** 2; }                     // the turn per record, against home's
  read(){ if (this.thumb) { this.index = this.H * Math.sinh(this.zeta); this._changed(); return; }
    this.index = clamp(this.centre + this.unit() * Math.sinh(this.zeta), 0, this.count - 1); this._changed(); }
  recentre(){                                                  // the window onto the record; ζ keeps only what the ends force
    if (this.thumb) { this.read(); return; }                     // from home, with no window: nothing to recentre
    const s = this.span(); this.centre = clamp(this.index, s / 2, this.count - s / 2);
    this.zeta = clamp(Math.asinh((this.index - this.centre) / this.unit(s)), -this.ZMAX, this.ZMAX); this._changed();
  }
  rezoom(){                                                    // a new radius keeps the record and restates ζ in the new unit
    const s = this.span(), c = clamp(this.centre, s / 2, this.count - s / 2);
    if (Math.abs(this.index - c) <= s / 2) { this.centre = c; this.zeta = clamp(Math.asinh((this.index - c) / this.unit(s)), -this.ZMAX, this.ZMAX); }
    else this.recentre();
    this.read();
  }
  setZeta(z){ this.zeta = clamp(z, this.ZMIN, this.ZMAX); this.read(); }
  setReach(r){ this.reach = clamp(r, 0, 1); this.rezoom(); }
  setH(h){ this.H = clamp(h, 1e-9, 1e12); this.read(); }        // a new thumb: the needle stays, what is under it slides
  widen(d){ if (this.thumb) this.setH(this.H * 2 ** (d * 25)); else this.setReach(this.reach + d); }
  goTo(i){
    if (this.thumb) { this.setZeta(Math.asinh(Math.max(0, i) / this.H)); return; }
    this.index = clamp(i, 0, this.count - 1); this.recentre();
  }
  _changed(){ if (this.onChange) this.onChange(this); }

  // ── MOTION ────────────────────────────────────────────────────────────────────────────────────
  liveGold(now){                                               // the gold as drawn: the hand, or the spring back to the apex
    if (this.held) return this.thrusting ? this.gold : 0;
    if (this.springAt >= 0) { const t = (now - this.springAt) / this.springMs; if (t >= 1) { this.springAt = -1; return 0; } return this.gold * Math.pow(1 - t, 3); }
    return 0;
  }
  step(now){                                                   // once a frame: the held gold adds ζ through its tangent
    const dt = Math.min(0.05, (now - (this.last || now)) / 1000); this.last = now;
    if (this.held && this.thrusting) this.setZeta(this.zeta + Math.tan(this.gold) * this.thrust * dt);
  }
  stateKey(now){                                               // what the drawing depends on, to skip frames where nothing moved
    return [this.index.toPrecision(12), this.zeta.toFixed(7), this.liveGold(now).toFixed(5), this.reach.toFixed(5), this.H, this.touched].join();
  }

  // ── HANDS (in the canvas's own pixels) ───────────────────────────────────────────────────────
  aim(x, y){ const { cx, cy } = this.box; this.gold = clamp(Math.atan2(x - cx, Math.max(0, cy - y)), -this.CAP, this.CAP); }
  press(x, y){ this.touched = true; this.held = true; this.thrusting = false; this.springAt = -1; this._x0 = x; this._y0 = y; }
  drag(x, y){                                                  // a tap changes nothing; past a few pixels the gold follows
    if (!this.held) return;
    if (!this.thrusting && Math.hypot(x - this._x0, y - this._y0) > this.tapPx) this.thrusting = true;
    if (this.thrusting) this.aim(x, y);
  }
  release(){ if (!this.held) return; this.held = false; if (this.thrusting) this.springAt = performance.now(); this.thrusting = false; this.recentre(); }
  pinchStart(){ this.release(); this._r0 = this.reach; this._h0 = this.H; }
  pinchTo(ratio){ if (this.thumb) this.setH(this._h0 * ratio); else this.setReach(this._r0 + Math.log2(ratio) * 0.25); }   // the fingers' spread over where they began
  wheel(e){                                                    // as city-dial: pushed away closes the radius; a trackpad pinch opens with the fingers
    this.touched = true; const f = e.deltaMode === 1 ? 16 : 1;
    if (e.deltaX) this.setZeta(this.zeta + e.deltaX * f / 2000);
    if (e.deltaY) { const r = (e.ctrlKey ? -e.deltaY / 200 : e.deltaY / 400) * f; if (this.thumb) this.setH(this.H * 2 ** (r * 4)); else this.setReach(this.reach + r); }
  }
  key(e){                                                      // ← → push the gold at 45° · ↑ ↓ the radius · h home; true if taken
    const k = e.key;
    if (k === 'ArrowLeft' || k === 'ArrowRight') {
      this.touched = true;
      if (!e.repeat) { this.held = true; this.thrusting = true; this.springAt = -1; this.gold = (k === 'ArrowLeft' ? -1 : 1) * PI / 4; }
      return true;
    }
    if (k === 'ArrowUp' || k === 'ArrowDown') { this.touched = true; this.widen(k === 'ArrowUp' ? 0.02 : -0.02); return true; }
    if (k === 'h') { this.touched = true; if (this.thumb) this.setZeta(0); else this.recentre(); return true; }
    return false;
  }
  keyUp(e){ if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { this.release(); return true; } return false; }

  // ── DRAWING ───────────────────────────────────────────────────────────────────────────────────
  layout(box){ this.box = box; }                               // { cx, cy, R, tx? }: the hub, the arc's radius, the text's middle
  band(mag){ const s = this.span(); return mag <= this.unit(s) ? this.c.teal : mag <= s / 2 ? this.c.blue : this.c.gold; }
  _font(ctx){ return this.mono || (typeof document !== 'undefined' && getComputedStyle(document.body).getPropertyValue('--mono').trim()) || 'monospace'; }
  _needle(ctx, cx, cy, a, r, colour, width){
    ctx.strokeStyle = colour; ctx.lineWidth = width;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r * Math.sin(a), cy - r * Math.cos(a)); ctx.stroke();
  }
  _line(ctx, parts, cx, y, px){
    const gap = this.partBoxes ? 16 : 0, w = parts.reduce((t, [s]) => t + ctx.measureText(s).width, 0) + gap * Math.max(0, parts.length - 1);
    let x = cx - w / 2;
    for (const part of parts) {
      const [s, mag, col] = part, pw = ctx.measureText(s).width;
      if (this.partBoxes) {                                    // each part on a box of its own, which a click can find
        const box = { x: x - 5, y: y - px * 0.95, w: pw + 10, h: px * 1.3, part };
        ctx.fillStyle = part[3] || 'rgba(255,255,255,.07)'; ctx.strokeStyle = 'rgba(232,200,106,.25)'; ctx.lineWidth = 1;
        ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(box.x, box.y, box.w, box.h, 5); else ctx.rect(box.x, box.y, box.w, box.h); ctx.fill(); ctx.stroke();
        this._boxes.push(box);
      }
      ctx.fillStyle = col || this.band(mag); ctx.fillText(s, x, y); x += pw + gap;
    }
  }
  partAt(x, y){ for (const b of this._boxes || []) if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) return b.part; return null; }
  setSpan(s){ this.setReach(Math.log(Math.max(1, s)) / Math.log(this.count)); }   // a window of s records
  draw(ctx, now = performance.now()){
    const { cx, cy, R } = this.box, tx = this.box.tx != null ? this.box.tx : cx, C = this.c, K = this.K, mono = this._font(ctx), g = this.liveGold(now);
    ctx.save();
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(201,199,190,.18)'; ctx.lineWidth = 1;                 // the horizon: 90°, never reached
    ctx.beginPath(); ctx.moveTo(cx - (this.thumb ? 14 : R + 14), cy); ctx.lineTo(cx + R + 14, cy); ctx.stroke();
    ctx.strokeStyle = 'rgba(232,200,106,.22)'; ctx.beginPath(); ctx.arc(cx, cy, R, this.thumb ? -PI / 2 : -PI, 0); ctx.stroke();
    // THE HEAT: the turn per record, cos²θ, shaded just outside the arc; full at home, half at the corner, none at the horizon
    ctx.lineCap = 'butt'; ctx.lineWidth = 9;
    const lo = this.thumb ? 0 : -PI / 2, n = this.thumb ? 60 : 120;      // the thumb's mode: home to the horizon only
    for (let i = 0; i < n; i++) {
      const a0 = lo + (PI / 2 - lo) * i / n, a1 = a0 + (PI / 2 - lo) / n, h = Math.cos((a0 + a1) / 2) ** 2;
      ctx.strokeStyle = 'rgba(232,200,106,' + (0.04 + 0.62 * h).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(cx, cy, R + 9, a0 - PI / 2, a1 - PI / 2 + 0.002); ctx.stroke();
    }
    ctx.lineCap = 'round';
    ctx.font = '11px ' + mono; ctx.fillStyle = C.dim; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    if (this.thumb) { ctx.textAlign = 'left'; ctx.fillText('heat 1', cx + 6, cy - R - 20); ctx.textAlign = 'center'; }
    else ctx.fillText('heat 1', cx, cy - R - 20);
    for (const sg of this.thumb ? [1] : [-1, 1]) ctx.fillText('½', cx + sg * (R + 24) * Math.SQRT1_2, cy - (R + 24) * Math.SQRT1_2);
    if (this.thumb) ctx.fillText('horizon', cx + R + 10, cy - 8);
    const rr = this.thumb ? R * 0.45 : Math.max(8, R * this.reach);                // the rung: where the radius is
    ctx.strokeStyle = C.gold; ctx.globalAlpha = 0.55; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, rr, this.thumb ? -PI / 2 : -PI, 0); ctx.stroke(); ctx.globalAlpha = 1;
    // the edges both ways from the corner: tan θ = 2, 4 … 2^K (gold) and ½, ¼ … 2^−K (teal); the flip carries each onto its mirror
    for (let k = -K; k <= K; k++) for (const sg of this.thumb ? [1] : [-1, 1]) {
      const a = sg * Math.atan(2 ** k), sx = Math.sin(a), sy = Math.cos(a);
      ctx.strokeStyle = k === 0 ? C.gold : k > 0 ? 'rgba(232,200,106,.6)' : 'rgba(29,158,117,.75)'; ctx.lineWidth = k === 0 ? 2 : 1.2;
      ctx.beginPath(); ctx.moveTo(cx + (rr - 7) * sx, cy - (rr - 7) * sy); ctx.lineTo(cx + (rr + 7) * sx, cy - (rr + 7) * sy); ctx.stroke();
    }
    this._needle(ctx, cx, cy, g, R, C.gold, 2.5);                                 // the gold: a rate
    if (Math.abs(this.zeta) > 1e-9) {                                             // the blue: a place, θ = gd(ζ)
      const th = this.theta(), tx = cx + R * Math.sin(th), ty = cy - R * Math.cos(th);
      this._needle(ctx, cx, cy, th, R, C.blue, 2.5);
      ctx.setLineDash([4, 5]); ctx.strokeStyle = 'rgba(106,168,232,.55)'; ctx.lineWidth = 1;   // the tip's sideways reach: R · sin θ = R · tanh ζ
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx, cy); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = C.blue; ctx.beginPath(); ctx.arc(tx, ty, 4, 0, 2 * PI); ctx.fill();
    }
    ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(cx, cy, 4, 0, 2 * PI); ctx.fill();
    const lines = this.label(this.index, this) || [], s = this.span();
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    let y = cy + 30;
    this._boxes = [];
    lines.forEach((parts, i) => {
      const px = this.fonts[Math.min(i, this.fonts.length - 1)];
      ctx.font = px + 'px ' + mono; this._line(ctx, parts, tx, y, px); y += px + (this.partBoxes ? 9 : 3);
    });
    ctx.font = '12px ' + mono; ctx.fillStyle = C.dim; ctx.textAlign = 'center';
    if (this.info !== false) ctx.fillText(this.info ? this.info(this) : 'g ' + this.sweep().toFixed(3) + ' · window ' + this.sizeText(s) + ' · unit ' + this.sizeText(this.unit(s)) + ' · heat ' + this.heat().toFixed(3), tx, y + 3);
    if (this.hint && !this.touched) {                                             // the hint, until the first touch
      const hy = this.thumb ? y + 28 : cy - R * 0.74;                             // the thumb's mode: under the readout, clear of the ring
      ctx.font = '13px ' + mono; ctx.fillStyle = C.ink;
      ctx.fillText(this.hint[0], tx, hy);
      if (this.hint[1]) { ctx.fillStyle = C.dim; ctx.fillText(this.hint[1], tx, hy + 18); }
    }
    ctx.restore();
  }
  // the room the drawing takes under the hub, for a page laying the dial out
  belowHub(){ return 30 + this.fonts.reduce((t, px) => t + px + 3, 0) + 20 + (this.thumb && this.hint ? 40 : 0); }

  // ── A PAGE THAT IS ONLY THE DIAL ─────────────────────────────────────────────────────────────
  // The dial fills the canvas, takes its hands and keys, and draws itself each frame something moved. Returns the
  // Dial; .unmount() takes the listeners off again.
  static mount(canvas, o = {}){
    const d = new Dial(o), vis = canvas.getContext('2d'), touching = new Map(), offs = [];
    let W = 0, H = 0, D = 0, lastKey = '', force = true, raf = 0, mode = null, spread0 = 1;
    const on = (t, ev, f, opt) => { t.addEventListener(ev, f, opt); offs.push(() => t.removeEventListener(ev, f, opt)); };
    const local = e => { const b = canvas.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };
    const spread = () => { const [a, b] = [...touching.values()]; return Math.max(8, Math.hypot(a.x - b.x, a.y - b.y)); };
    const layout = () => {
      const top = o.top || 24, cy = H - d.belowHub();
      if (d.thumb) {                                             // a quarter turn: the hub on the left, the quarter filling the room
        const pad = 16, lab = Math.min(90, W * 0.18), R = Math.max(40, Math.min(W - 2 * pad - lab, cy - top));
        d.layout({ cx: pad + Math.max(0, (W - 2 * pad - lab - R) / 2), cy: cy - Math.max(0, cy - top - R) / 2, R, tx: W / 2 });
        return;
      }
      const R = Math.max(40, Math.min(W * 0.44, cy - top));
      d.layout({ cx: W / 2, cy: cy - Math.max(0, cy - top - R) / 2, R });
    };
    const frame = now => {
      d.step(now);
      const w = Math.round(canvas.clientWidth), h = Math.round(canvas.clientHeight), dpr = Math.min(2, devicePixelRatio || 1);
      if (w && h) {
        if (w !== W || h !== H || dpr !== D) { W = w; H = h; D = dpr; canvas.width = W * D; canvas.height = H * D; layout(); force = true; }
        const key = d.stateKey(now);
        if (key !== lastKey || force) {
          lastKey = key; force = false;
          vis.setTransform(D, 0, 0, D, 0, 0); vis.fillStyle = d.c.bg; vis.fillRect(0, 0, W, H);
          d.draw(vis, now);
          if (o.afterDraw) o.afterDraw(vis, d);
        }
      }
      raf = requestAnimationFrame(frame);
    };
    on(canvas, 'pointerdown', e => {
      canvas.setPointerCapture(e.pointerId); touching.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (touching.size === 2) { d.pinchStart(); spread0 = spread(); mode = 'pinch'; return; }
      if (touching.size > 2) return;
      const [x, y] = local(e), part = o.onPart && d.partAt(x, y);
      if (part) { o.onPart(part, d); d.touched = true; mode = null; return; }   // a click on a part of the record is the page's
      d.press(x, y); mode = 'dial';
    });
    on(canvas, 'pointermove', e => {
      if (!touching.has(e.pointerId)) return; touching.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (mode === 'pinch' && touching.size === 2) d.pinchTo(spread() / spread0);
      else if (mode === 'dial') d.drag(...local(e));
    });
    const up = e => { touching.delete(e.pointerId);
      if (mode === 'pinch') { if (touching.size < 2) mode = null; return; }
      d.release(); mode = null; };
    on(canvas, 'pointerup', up); on(canvas, 'pointercancel', up);
    on(canvas, 'wheel', e => { d.wheel(e); e.preventDefault(); }, { passive: false });
    if (o.keys !== false) {
      on(root, 'keydown', e => { if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return; if (d.key(e)) e.preventDefault(); });
      on(root, 'keyup', e => { if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return; d.keyUp(e); });
    }
    on(root, 'resize', () => { force = true; });
    d.redraw = () => { force = true; };
    d.unmount = () => { cancelAnimationFrame(raf); offs.forEach(f => f()); };
    raf = requestAnimationFrame(frame);
    return d;
  }
}
Dial.clamp = clamp;
Dial.plainSize = plainSize;
root.Dial = Dial;
if (typeof module !== 'undefined' && module.exports) module.exports = Dial;
})(typeof window !== 'undefined' ? window : globalThis);
