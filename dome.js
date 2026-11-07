/* dome.js — THE DOME DIAL (7 Nov 2026; Tom: "what about a dome dial?", then "yes"). The horizon dial (dial.js in its
   thumb's mode) with one more degree of freedom: the half-disc becomes the hemisphere of directions, the needle's angle a
   direction. A classic script, beside dial.js; it defines Dome.

   WHERE THE READER STANDS. One thumb, H, above a floor without end, looking down. Home is straight down, the middle of
   the dome; the rim is the horizon, 90° off home, never reached. A direction α off home and turned φ round meets the
   floor at ρ = H · tan α along heading φ (the dial's H · tan θ, in every heading). The dome is drawn as an equal-area disc
   (Lambert's azimuthal map about home, the rim at the disc's edge): equal room on the screen is equal room of directions.

   THE PUSH. A 2-vector ζ: its length is the dial's ζ, its heading the heading. The floor point is H · sinh|ζ| along it, so
   along any heading a steady push walks out by a steady ratio, ln 2 of ζ for each "one in two". Press anywhere on the
   dome and lean: the gold arrow is the lean, a rate; the farther the lean the faster, as tan of its angle (capped at
   the K-th corner, as the dial's); letting go springs it home and the blue stays. ← → ↑ ↓ lean at 45°. h home.

   THE HEAT. Directions per unit of floor, dΩ/dA = cos³α / H²: all of it under home, half at α = 37.5°, a quarter at
   50.5°, none at the rim. Drawn as rings of equal heat. In the equal-area disc the directions are even; it is the floor
   that crowds toward the rim.

   THE THUMB. The wheel, a pinch, + and − change H; the blue keeps its direction and the floor slides under it.

   THE READER'S CELLS. The dome is cut into `rings` rings of equal share × `sectors` turns (the reader's fineness, counted
   as cells only by a writer or a machine). Each cell is painted by what its middle direction meets: `paint(x, y)` gives
   a colour for a floor point, or null for bare floor. Near home a cell is a small patch of floor; far out one cell's
   middle ray stands for a floor without end, so the far cells are a sample, not a picture.

   A page may draw the floor itself (`underlay(ctx, dome)`, in place of the cells), as dome-map.html does with map tiles.

   USE.  const dome = Dome.mount(canvas, { H: 8, paint: (x, y) => …, label: dome => [[[text, colour], …], …] });
         dome.floor() → { x, y, rho, heading, alpha }; dome.setH(h); dome.goTo(x, y); dome.home(); dome.redraw()      */
(function (root) {
'use strict';
const PI = Math.PI, SQ2 = Math.SQRT2;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

class Dome {
  constructor(o = {}){
    this.H = o.H > 0 ? o.H : 1;
    this.K = o.K || 5;
    this.CAP = Math.atan(2 ** this.K);
    this.ZMAX = Math.asinh(1e15);
    this.thrust = o.thrust || 0.4;
    this.rings = o.rings || 48; this.sectors = o.sectors || 96;
    this.paint = o.paint || (() => null);
    this.label = o.label || null;
    this.decorate = o.decorate || null;
    this.underlay = o.underlay || null;              // (ctx, dome): draws the floor in place of the cells
    this.lay = o.lay === 'inplace' ? 'inplace' : 'area';      // how the dome is laid on the disc (see THE DISC)
    this.pan = o.pan || null;                                   // (dx, dy) in floor units: drags move the floor itself (see PAN)
    this.tap = o.tap || null;                                   // (x, y) in floor units: a tap on the floor
    this.vx = 0; this.vy = 0; this.flingAt = -1; this.trail = [];
    this.fonts = o.fonts || [18, 12, 12];
    this.c = Object.assign({ bg: '#0b0d12', floor: '#161a22', gold: '#e8c86a', teal: '#1D9E75', blue: '#6aa8e8', ink: '#c9c7be', dim: '#7f8590' }, o.colours || {});
    this.hint = o.hint === false ? null : o.hint || ['press and lean to walk out', 'wheel or pinch: the thumb'];
    this.zx = 0; this.zy = 0;                                   // the push, a 2-vector
    this.lx = 0; this.ly = 0;                                   // the lean (the gold), in rate units
    this.held = false; this.leaning = false; this.springAt = -1; this.last = 0; this.touched = false;
    this.box = { cx: 0, cy: 0, R: 1 };
    if (o.at) this.goTo(o.at[0], o.at[1]);
  }

  // ── THE READING ───────────────────────────────────────────────────────────────────────────────
  zeta(){ return Math.hypot(this.zx, this.zy); }
  floor(){                                                     // where the blue meets the floor
    const z = this.zeta(), rho = this.H * Math.sinh(z), h = z ? Math.atan2(this.zy, this.zx) : 0;
    return { x: z ? rho * this.zx / z : 0, y: z ? rho * this.zy / z : 0, rho, heading: h, alpha: Math.atan(Math.sinh(z)) };
  }
  heat(alpha = this.floor().alpha){ return Math.cos(alpha) ** 3; }     // directions per unit of floor, against home's
  setZeta(zx, zy){ const z = Math.hypot(zx, zy); if (z > this.ZMAX) { zx *= this.ZMAX / z; zy *= this.ZMAX / z; } this.zx = zx; this.zy = zy; }
  goTo(x, y){ const r = Math.hypot(x, y); if (!r) return this.home(); const z = Math.asinh(r / this.H); this.setZeta(z * x / r, z * y / r); }
  home(){ this.zx = 0; this.zy = 0; }
  setH(h){ this.H = clamp(h, 1e-6, 1e9); }                     // the blue keeps its direction; the floor slides under it

  // ── THE DISC ─────────────────────────────────────────────────────────────────────────────────
  // 'area' (the default): Lambert's equal-area map of the hemisphere about home, equal room for equal directions.
  // 'inplace' (7 Nov 2026; Tom, of the map dome: "its heavily distorted and does not move very well."): the in-place lay of
  // the floor, s = ρ/H = tan α: r = s/2 within one thumb (the floor in proportion, an undistorted map filling the middle
  // half of the radius) and 1 − 1/(2s) past it, the horizon at the rim; smooth at the thumb. Only past one thumb is the
  // floor squeezed, each doubling of distance half the room of the last.
  rOfAlpha(a){ const R = this.box.R;
    if (this.lay === 'inplace') { const s = Math.tan(a); return R * (s <= 1 ? s / 2 : 1 - 1 / (2 * s)); }
    return R * SQ2 * Math.sin(a / 2); }
  alphaOfR(r){ const u = clamp(r / this.box.R, 0, 1);
    if (this.lay === 'inplace') return Math.atan(u <= 0.5 ? 2 * u : 1 / (2 * Math.max(1e-12, 1 - u)));
    return 2 * Math.asin(clamp(u / SQ2, 0, 1)); }
  toDisc(alpha, phi){ const { cx, cy } = this.box, r = this.rOfAlpha(alpha); return [cx + r * Math.cos(phi), cy - r * Math.sin(phi)]; }
  fromDisc(x, y){                                              // a screen point → (α, φ), or null off the dome
    const { cx, cy, R } = this.box, dx = x - cx, dy = cy - y, r = Math.hypot(dx, dy);
    if (r > R) return null;
    return { alpha: this.alphaOfR(r), phi: Math.atan2(dy, dx) };
  }
  floorOf(x, y){ const p = this.fromDisc(x, y); return p ? this.floorAt(p.alpha, p.phi) : null; }   // a screen point → the floor, from home
  floorAt(alpha, phi){ const rho = this.H * Math.tan(alpha); return [rho * Math.cos(phi), rho * Math.sin(phi)]; }
  ringR(k){ return this.rOfAlpha(Math.acos(clamp(1 - k / this.rings, 0, 1))); }   // equal-share rings: 1 − cos α in steps
  cellAt(alpha, phi){                                          // the cell holding a direction
    const k = Math.min(this.rings - 1, Math.floor((1 - Math.cos(alpha)) * this.rings));
    const s = Math.floor(((phi / (2 * PI)) % 1 + 1) % 1 * this.sectors) % this.sectors;
    return { ring: k, sector: s };
  }
  cellFloorArea(ring){                                         // a writer's measure: how much floor one cell of a ring covers
    if (ring >= this.rings - 1) return Infinity;
    const t0 = Math.tan(this.alphaOfR(this.ringR(ring))) * this.H, t1 = Math.tan(this.alphaOfR(this.ringR(ring + 1))) * this.H;
    return PI / this.sectors * (t1 * t1 - t0 * t0);
  }

  // ── MOTION AND HANDS ─────────────────────────────────────────────────────────────────────────
  liveLean(now){
    if (this.held) return this.leaning ? [this.lx, this.ly] : [0, 0];
    if (this.springAt >= 0) { const t = (now - this.springAt) / 150; if (t >= 1) { this.springAt = -1; return [0, 0]; } const f = Math.pow(1 - t, 3); return [this.lx * f, this.ly * f]; }
    return [0, 0];
  }
  step(now){
    const dt = Math.min(0.05, (now - (this.last || now)) / 1000); this.last = now;
    if (this.pan && this.flingAt >= 0) {                        // a flung floor coasts, slowed in proportion to its speed
      const t = (now - this.flingAt) / 1000, f = Math.exp(-t / 0.325);
      if (f < 0.02) this.flingAt = -1; else this.pan(this.vx * f * dt, this.vy * f * dt);
    }
    if (this.pan && this.held && this._keyLean) {               // the arrows glide the floor, a thumb a second
      const m = Math.hypot(this.lx, this.ly); if (m) this.pan(this.lx / m * this.H * dt, this.ly / m * this.H * dt);
      return;
    }
    if (this.held && this.leaning && !this.pan) {
      const m = Math.hypot(this.lx, this.ly); if (!m) return;
      const rate = Math.tan(Math.min(m, this.CAP)) * this.thrust * dt;   // the lean's angle m, its tangent the rate
      this.setZeta(this.zx + rate * this.lx / m, this.zy + rate * this.ly / m);
    }
  }
  // PAN (the map dome): a drag moves the floor itself, the floor point pressed staying under the finger (whatever the lay,
  // so a press near the horizon carries a long way); let go moving and it coasts; a tap without moving is a tap on the
  // floor. A press past 85° holds nothing, so the horizon is never grabbed.
  press(x, y){ this.touched = true; this.held = true; this.leaning = false; this.springAt = -1; this._x0 = x; this._y0 = y;
    if (this.pan) { this.flingAt = -1; const p = this.fromDisc(x, y); this._grab = p && p.alpha < 85 * PI / 180 ? this.floorAt(p.alpha, p.phi) : null; this.trail = []; } }
  drag(x, y){                                                  // the lean: from where the finger pressed, a quarter of the dome to the K-th corner
    if (!this.held) return;
    if (this.pan) {
      if (!this.leaning && Math.hypot(x - this._x0, y - this._y0) > 6) this.leaning = true;
      if (!this.leaning || !this._grab) return;
      const p = this.fromDisc(x, y); if (!p || p.alpha > 85 * PI / 180) return;
      const f = this.floorAt(p.alpha, p.phi), dx = this._grab[0] - f[0], dy = this._grab[1] - f[1];
      this.pan(dx, dy); this._grab = f;
      const t = performance.now(); this.trail.push([t, dx, dy]); while (this.trail.length && t - this.trail[0][0] > 100) this.trail.shift();
      return;
    }
    const dx = x - this._x0, dy = this._y0 - y, d = Math.hypot(dx, dy);
    if (!this.leaning && d > 6) this.leaning = true;
    if (!this.leaning) return;
    const m = Math.min(d / (this.box.R * 0.5), 1) * this.CAP;
    this.lx = d ? m * dx / d : 0; this.ly = d ? m * dy / d : 0;
  }
  release(){
    if (!this.held) return; this.held = false;
    if (this.pan) {
      if (!this.leaning && this.tap) { const f = this.floorOf(this._x0, this._y0); if (f) this.tap(f[0], f[1]); }
      else if ((this.trail = this.trail.filter(q => performance.now() - q[0] <= 100)).length > 1) {   // the speed of the last tenth of a second, then a coast; a finger held still before letting go throws nothing
        const ms = performance.now() - this.trail[0][0], sx = this.trail.reduce((s, q) => s + q[1], 0), sy = this.trail.reduce((s, q) => s + q[2], 0);
        if (ms > 0) { this.vx = sx / ms * 1000; this.vy = sy / ms * 1000; this.flingAt = performance.now(); }
      }
      this.leaning = false; return;
    }
    if (this.leaning) this.springAt = performance.now(); this.leaning = false; }
  pinchStart(){ this.release(); this._h0 = this.H; }
  pinchTo(ratio){ this.setH(this._h0 * ratio); }
  wheel(e){ this.touched = true; const f = e.deltaMode === 1 ? 16 : 1; if (e.deltaY) this.setH(this.H * 2 ** ((e.ctrlKey ? -e.deltaY / 50 : e.deltaY / 100) * f)); }
  key(e){
    const k = e.key, dir = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[k];
    if (dir) {
      this.touched = true;
      if (!e.repeat) { this.held = true; this.leaning = true; this._keyLean = true; this.flingAt = -1; this.springAt = -1; const m = PI / 4; this.lx = dir[0] * m; this.ly = dir[1] * m; }
      return true;
    }
    if (k === '+' || k === '=' || k === '-' || k === '_') { this.touched = true; this.setH(this.H * (k === '+' || k === '=' ? 2 : 0.5)); return true; }
    if (k === 'h') { this.touched = true; this.home(); return true; }
    return false;
  }
  keyUp(e){ if (/^Arrow/.test(e.key)) { this._keyLean = false; if (this.pan) { this.held = false; this.leaning = false; } else this.release(); return true; } return false; }

  // ── DRAWING ───────────────────────────────────────────────────────────────────────────────────
  layout(box){ this.box = box; }
  stateKey(now){ const l = this.liveLean(now); return [this.zx.toFixed(7), this.zy.toFixed(7), l[0].toFixed(4), l[1].toFixed(4), this.H, this.touched].join(); }
  _mono(){ return (typeof document !== 'undefined' && getComputedStyle(document.body).getPropertyValue('--mono').trim()) || 'monospace'; }
  draw(ctx, now = performance.now()){
    const { cx, cy, R } = this.box, C = this.c, mono = this._mono(), tx = this.box.tx != null ? this.box.tx : cx;
    ctx.save();
    // the cells, each painted by what its middle direction meets on the floor; or the page draws the floor itself
    if (this.underlay) this.underlay(ctx, this);
    else for (let k = 0; k < this.rings; k++) {
      const r0 = this.ringR(k), r1 = this.ringR(k + 1), am = this.alphaOfR((r0 + r1) / 2);
      for (let s = 0; s < this.sectors; s++) {
        const p0 = 2 * PI * s / this.sectors, p1 = 2 * PI * (s + 1) / this.sectors, [fx, fy] = this.floorAt(am, (p0 + p1) / 2);
        ctx.fillStyle = this.paint(fx, fy) || C.floor;
        ctx.beginPath(); ctx.arc(cx, cy, r1 + 0.4, -p1 - 0.002, -p0 + 0.002); ctx.arc(cx, cy, Math.max(0, r0 - 0.4), -p0 + 0.002, -p1 - 0.002, true); ctx.closePath(); ctx.fill();
      }
    }
    if (this.decorate) this.decorate(ctx, this);               // the page's own marks on the floor, under the rings and needles
    // a word on a dark pill, so it reads over the paint
    ctx.font = '11px ' + mono; ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
    const pill = (t, x, y, col) => { const w = ctx.measureText(t).width + 8; x = clamp(x, cx - R + w / 2, cx + R - w / 2);
      ctx.fillStyle = 'rgba(11,13,18,.82)'; ctx.fillRect(x - w / 2, y - 8, w, 16); ctx.fillStyle = col; ctx.fillText(t, x, y); };
    const words = [];
    // the heat: rings where cos³α is ½, ¼, ⅛ (directions per unit of floor, against home's), named down the left
    [[0.5, 'heat ½'], [0.25, 'heat ¼'], [0.125, 'heat ⅛']].forEach(([h, t], i) => {
      const a = Math.acos(Math.cbrt(h)), r = this.rOfAlpha(a), ang = PI + 0.5 - i * 0.28;
      ctx.setLineDash([3, 5]); ctx.strokeStyle = 'rgba(232,200,106,.6)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, 2 * PI); ctx.stroke(); ctx.setLineDash([]);
      words.push([t, cx + r * Math.cos(ang), cy - r * Math.sin(ang), 'rgba(232,200,106,.9)']);
    });
    // the thumb: one thumb out (45°, the corner) solid, then one in 2, 4, 8, named down the right, each a little lower
    [[1, 'one thumb'], [2, 'one in 2'], [4, 'one in 4'], [8, 'one in 8']].forEach(([x, t], i) => {
      const a = Math.atan(x), r = this.rOfAlpha(a), ang = 0.62 - i * 0.24;
      ctx.strokeStyle = x === 1 ? 'rgba(232,200,106,.95)' : 'rgba(232,200,106,.45)'; ctx.lineWidth = x === 1 ? 1.6 : 1;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, 2 * PI); ctx.stroke();
      words.push([t, cx + r * Math.cos(ang), cy - r * Math.sin(ang), x === 1 ? C.gold : 'rgba(232,200,106,.9)']);
    });
    for (const w of words) pill(...w);
    ctx.strokeStyle = 'rgba(201,199,190,.35)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * PI); ctx.stroke();
    ctx.font = '11px ' + mono; ctx.fillStyle = C.dim; ctx.textAlign = 'center'; ctx.fillText('the horizon, all round', cx, cy - R - 12);
    // home, the blue and its needle, the gold lean
    const f = this.floor(), [bx, by] = this.toDisc(f.alpha, f.heading);
    ctx.fillStyle = '#f1efe6'; ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, 2 * PI); ctx.fill();
    if (f.rho > 0) { ctx.strokeStyle = 'rgba(106,168,232,.8)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke(); }
    ctx.fillStyle = C.blue; ctx.strokeStyle = '#0b0d12'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(bx, by, 6, 0, 2 * PI); ctx.fill(); ctx.stroke();
    const [lx, ly] = this.liveLean(now), lm = Math.hypot(lx, ly);
    if (lm > 1e-4) {
      const L = R * 0.5 * lm / this.CAP, ex = bx + L * lx / lm, ey = by - L * ly / lm, ang = Math.atan2(ey - by, ex - bx);
      ctx.strokeStyle = C.gold; ctx.fillStyle = C.gold; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(ex, ey); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - 10 * Math.cos(ang - 0.4), ey - 10 * Math.sin(ang - 0.4)); ctx.lineTo(ex - 10 * Math.cos(ang + 0.4), ey - 10 * Math.sin(ang + 0.4)); ctx.closePath(); ctx.fill();
    }
    // the readout under the dome
    let y = cy + R + 30;
    const lines = this.label ? this.label(this) : [];
    lines.forEach((parts, i) => {
      ctx.font = this.fonts[Math.min(i, this.fonts.length - 1)] + 'px ' + mono; ctx.textAlign = 'left';
      const w = parts.reduce((t, [s]) => t + ctx.measureText(s).width, 0); let x = tx - w / 2;
      for (const [s, col] of parts) { ctx.fillStyle = col || C.ink; ctx.fillText(s, x, y); x += ctx.measureText(s).width; }
      y += this.fonts[Math.min(i, this.fonts.length - 1)] + 5;
    });
    if (this.hint && !this.touched) {
      ctx.font = '13px ' + mono; ctx.textAlign = 'center'; ctx.fillStyle = C.ink; ctx.fillText(this.hint[0], tx, y + 8);
      if (this.hint[1]) { ctx.fillStyle = C.dim; ctx.fillText(this.hint[1], tx, y + 26); }
    }
    ctx.restore();
  }
  belowDome(){ return 30 + this.fonts.reduce((t, px) => t + px + 5, 0) + (this.hint ? 40 : 6); }

  // ── A PAGE THAT IS ONLY THE DOME ─────────────────────────────────────────────────────────────
  static mount(canvas, o = {}){
    const d = new Dome(o), vis = canvas.getContext('2d'), touching = new Map(), offs = [];
    let W = 0, H = 0, D = 0, lastKey = '', force = true, raf = 0, mode = null, spread0 = 1;
    const on = (t, ev, f, opt) => { t.addEventListener(ev, f, opt); offs.push(() => t.removeEventListener(ev, f, opt)); };
    const local = e => { const b = canvas.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };
    const spread = () => { const [a, b] = [...touching.values()]; return Math.max(8, Math.hypot(a.x - b.x, a.y - b.y)); };
    const layout = () => {
      const top = (o.top || 24) + 22, bottom = H - d.belowDome(), R = Math.max(40, Math.min(W / 2 - (W < 520 ? 14 : 60), (bottom - top) / 2));
      d.layout({ cx: W / 2, cy: top + R + Math.max(0, (bottom - top - 2 * R) / 2), R, tx: W / 2 });
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
      d.press(...local(e)); mode = 'dome';
    });
    on(canvas, 'pointermove', e => {
      if (!touching.has(e.pointerId)) return; touching.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (mode === 'pinch' && touching.size === 2) d.pinchTo(spread() / spread0);
      else if (mode === 'dome') d.drag(...local(e));
    });
    const up = e => { touching.delete(e.pointerId); if (mode === 'pinch') { if (touching.size < 2) mode = null; return; } d.release(); mode = null; };
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
root.Dome = Dome;
if (typeof module !== 'undefined' && module.exports) module.exports = Dome;
})(typeof window !== 'undefined' ? window : globalThis);
