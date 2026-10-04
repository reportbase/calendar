/* dial-core.js — THE NAVIGATION DIAL, ONCE. geometry.html and dial-calendar.html load this file and
   keep only what is theirs: the list, the readout, the figure, the notes.

   THE MODEL. A list of N records, a record `index`, and a window round it of span N^reach (the radius
   is a logarithm of scale). The window's half is 2^K units, and one unit is the 45° corner. The gold
   needle is a rate: held at angle a it adds tan(a) · thrust a second to the hyperbolic angle ζ. The
   blue needle is the place reached, θ = gd(ζ) = atan(sinh ζ), and the value is the tangent:
   index = centre + unit · sinh ζ. Letting go springs the gold home and rests the window on the record.
   GEOMETRY.md has the vocabulary.

   THE HANDS. One finger on the dial: a tap changes nothing (the page may use it); a pan aims the gold.
   Two fingers anywhere on the canvas: a pinch sets the radius. Wheel: in and out is the radius
   (pushed away closes it; a trackpad pinch, which arrives with ctrlKey, opens with the fingers), sideways
   is ζ. Keys: ← → push the gold at 45°, ↑ ↓ the radius (to the next detent, if the page has detents).

   THE READING. dial.reading() is the reading as Serial, Parallel and Nowhere writes it: the side (front
   before the corner, back past it), the octave counted out from the corner, the share t within it, and
   g, the sweep (§3.3, §3.5, R170). The radius is not g: it is h, which reading counts as one, and a
   change of it slides the ladder of octaves (Proposition 3.8). drawReading puts the reading under a dial.

   THE DRAWING. A surface redraws only when the page's key changes or the size does, on a back canvas
   copied across in one act, and draws nothing while the canvas has no size. */
(function () {
  'use strict';
  const PI = Math.PI;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const COLORS = { BG: '#0b0d12', GOLD: '#e8c86a', TEAL: '#1D9E75', BLUE: '#6aa8e8', INK: '#c9c7be', DIM: '#7f8590', HI: '#f1efe6' };

  // ── THE MODEL ──────────────────────────────────────────────────────────────────────────────────
  // options: N (the list's length), K (corners to the window's end, 5), index, reach, thrust (0.4),
  // springMs (150), detents ([[name, reach], …] the radius settles on), onSettle (after a settle ends),
  // free (the dial reads ζ itself: letting go keeps the blue where it is, and the radius is a separate
  // setting that leaves ζ alone; for pages where the needle's place is the setting, not a way to a record),
  // quarter (one sweep, 0 to π/2, home at the apex and the horizon along the right: for a reading with no
  // 'which way', a magnitude only. ζ is held at 0 or above, and THE GOLD PULLS THE BLUE TOWARD ITSELF: point
  // ahead of the blue and it sweeps out, behind it and it comes back, at it and it holds, at a rate through
  // the tangent of the angle between them. On a semicircle the gold's angle from the apex is the rate, and
  // left of the apex is the other way; a quarter has no other way, so the rate is taken from the blue.)
  function create(o) {
    const N = o.N, K = o.K ?? 5, CAP = Math.atan(2 ** K), ZMAX = Math.asinh(2 ** K);
    const THRUST = o.thrust ?? 0.4, SPRING_MS = o.springMs ?? 150;
    let last = 0, settleTimer = 0;
    const zc = z => clamp(z, o.quarter ? 0 : -ZMAX, ZMAX);           // the quarter dial has no left side
    const d = {
      N, K, CAP, ZMAX, detents: o.detents || null, quarter: !!o.quarter,
      index: clamp(o.index ?? 0, 0, N - 1), centre: 0, reach: o.reach ?? 0.5, zeta: 0,
      gold: 0, held: false, thrusting: false, springAt: -1, settle: null, pushDir: 0,
      span: () => Math.max(1, Math.pow(N, d.reach)),                 // window = N^r
      unit: (s = d.span()) => s / 2 / 2 ** K,                         // the 45° corner; the window's half is 2^K units
      theta: () => Math.atan(Math.sinh(d.zeta)),                      // θ = gd(ζ)
      sweep: () => Math.abs(d.theta()) / (PI / 2),                    // g: 0 home, ½ the corner, 1 the horizon
      // THE READING, AS Serial, Parallel and Nowhere WRITES IT (§3.3, §3.5): s = v/h = tan θ; the side (front
      // before the corner, back past it); the share, min(v,h)/max(v,h), written as the octave k counted out
      // from the corner and the share t within it, t = 2^(k+1)·share − 1; and g, the sweep. The flip
      // s ↦ 1/s changes only the side; the carry moves one octave out.
      reading() {
        const s = Math.abs(Math.sinh(d.zeta)), g = d.sweep();
        if (s < 1e-12) return { s: 0, g: 0, side: 'home', share: 0 };
        if (Math.abs(s - 1) < 1e-9) return { s: 1, g: 0.5, side: 'corner', share: 1, k: 0, t: 1 };
        const share = s < 1 ? s : 1 / s, x = -Math.log2(share), k = x <= 0 ? 0 : Math.ceil(x) - 1;
        return { s, g, side: s < 1 ? 'front' : 'back', share, k, t: 2 ** (k + 1) * share - 1 };
      },
      read() { d.index = clamp(d.centre + d.unit() * Math.sinh(d.zeta), 0, N - 1); },   // the value is the tangent
      recentre() {                                                    // the window onto the record; ζ keeps what the ends force
        const s = d.span(); d.centre = clamp(d.index, s / 2, N - s / 2);
        d.zeta = clamp(Math.asinh((d.index - d.centre) / d.unit(s)), -ZMAX, ZMAX);
      },
      rezoom() {                                                      // a new radius keeps the record, restates ζ in the new unit
        const s = d.span(), c = clamp(d.centre, s / 2, N - s / 2);
        if (Math.abs(d.index - c) <= s / 2) { d.centre = c; d.zeta = clamp(Math.asinh((d.index - c) / d.unit(s)), -ZMAX, ZMAX); }
        else d.recentre();
      },
      setZeta(z) { d.zeta = zc(z); d.read(); },
      setReach(r) { d.reach = clamp(r, 0, 1); if (!o.free) { d.rezoom(); d.read(); } },
      goTo(i) { d.index = clamp(i, 0, N - 1); d.recentre(); },
      // the gold: held, aimed, let go
      hold() { d.held = true; d.thrusting = false; d.springAt = -1; },
      aim(a) { d.gold = o.quarter ? clamp(a, 0, PI / 2) : clamp(a, -CAP, CAP); },
      push() {                                                        // the rate the gold gives the blue, in tan form
        if (!o.quarter) return Math.tan(d.gold);
        if (d.pushDir) return d.pushDir * 1.5;                        // a key: out or back at a steady rate
        if (d.gold >= PI / 2 - 0.03) return 2.5;                      // along the horizon or below it: all the way out
        if (d.gold <= 0.03) return -2.5;                              // at home or left of it: all the way back
        return Math.tan(clamp(d.gold - d.theta(), -1.45, 1.45));      // between: the gold pulls the blue toward itself
      },
      letGo() { if (d.held) { d.held = false; if (d.thrusting) d.springAt = performance.now(); d.thrusting = false; if (!o.free) d.recentre(); } },
      liveGold(now) {                                                 // the gold as drawn: the hand, or the spring back to the apex
        if (o.quarter && d.held && d.pushDir) return clamp(d.theta() + d.pushDir * 0.6, 0, PI / 2);   // a key, drawn just ahead of or behind the blue
        if (d.held) return d.thrusting ? d.gold : 0;
        if (d.springAt >= 0) { const t = (now - d.springAt) / SPRING_MS; if (t >= 1) { d.springAt = -1; return 0; } return d.gold * Math.pow(1 - t, 3); }
        return 0;
      },
      // the detents: radii the scale rests on
      nearestDetent: (r = d.reach) => d.detents.reduce((b, x) => Math.abs(x[1] - r) < Math.abs(b[1] - r) ? x : b),
      settleTo(r) { d.settle = { from: d.reach, to: r, t0: performance.now() }; },
      settleSoon() { if (!d.detents) return; clearTimeout(settleTimer); settleTimer = setTimeout(() => d.settleTo(d.nearestDetent()[1]), 220); },
      stopSettling() { d.settle = null; clearTimeout(settleTimer); },
      stepDetent(dir) { const i = d.detents.indexOf(d.nearestDetent()); d.settleTo(d.detents[clamp(i + dir, 0, d.detents.length - 1)][1]); },
      tick(now) {                                                     // per frame: the gold turns the blue; a settle runs its course
        const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
        if (d.held && d.thrusting) { d.zeta = zc(d.zeta + d.push() * THRUST * dt); d.read(); }
        if (d.settle) { const t = Math.min(1, (now - d.settle.t0) / 260), e = 1 - Math.pow(1 - t, 3);
          d.reach = d.settle.from + (d.settle.to - d.settle.from) * e; d.rezoom(); d.read();
          if (t >= 1) { d.settle = null; if (o.onSettle) o.onSettle(); } }
      },
    };
    d.centre = d.index; d.rezoom();
    return d;
  }

  // ── THE HANDS ──────────────────────────────────────────────────────────────────────────────────
  // options: hub() → {cx, cy}; claim(x, y) → true when a one-finger press belongs to the page, which
  // then gets press/move/release(x, y); onTap(x, y) for a tap on the dial; claimWheel(x, y, e) → true
  // when the page handles that wheel; wheel {x, y, pinch} gains (defaults 1/2000, 1/400, 1/200);
  // pinchGain (0.25 of the radius per doubling of the fingers); reachStep for ↑ ↓ without detents
  // (0.02); keysOff() → true while the page has the keyboard; tapPx (6).
  function hands(cv, d, o) {
    const TAP_PX = o.tapPx ?? 6, PINCH = o.pinchGain ?? 0.25, WH = Object.assign({ x: 1 / 2000, y: 1 / 400, pinch: 1 / 200 }, o.wheel);
    const local = e => { const b = cv.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };
    const touching = new Map(); let mode = null, pinch = null, x0 = 0, y0 = 0;
    const fingers = () => { const [a, b] = [...touching.values()]; return Math.max(8, Math.hypot(a.x - b.x, a.y - b.y)); };
    const release = (x, y) => { if (mode === 'dial') d.letGo(); else if (mode === 'page' && o.release) o.release(x, y); };
    cv.addEventListener('pointerdown', e => {
      cv.setPointerCapture(e.pointerId); touching.set(e.pointerId, { x: e.clientX, y: e.clientY }); d.stopSettling();
      const [x, y] = local(e);
      if (touching.size === 2) { release(x, y); mode = 'pinch'; pinch = { d0: fingers(), r0: d.reach }; return; }   // two fingers: the radius
      if (touching.size > 2) return;
      if (o.claim && o.claim(x, y)) { mode = 'page'; if (o.press) o.press(x, y); return; }
      mode = 'dial'; x0 = x; y0 = y; d.hold();
    });
    cv.addEventListener('pointermove', e => {
      if (!touching.has(e.pointerId)) return; touching.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const [x, y] = local(e);
      if (mode === 'pinch') { if (touching.size === 2) d.setReach(pinch.r0 + Math.log2(fingers() / pinch.d0) * PINCH); }
      else if (mode === 'page') { if (o.move) o.move(x, y); }
      else if (mode === 'dial' && d.held) {
        if (!d.thrusting && Math.hypot(x - x0, y - y0) > TAP_PX) d.thrusting = true;
        if (d.thrusting) { const { cx, cy } = o.hub(); d.aim(Math.atan2(x - cx, Math.max(0, cy - y))); }
      }
    });
    const up = e => {
      touching.delete(e.pointerId);
      if (mode === 'pinch') { if (touching.size < 2) { pinch = null; mode = null; d.settleSoon(); } return; }
      const [x, y] = local(e);
      if (mode === 'dial' && d.held && !d.thrusting) { d.held = false; mode = null; if (o.onTap) o.onTap(x, y); return; }   // a tap moves nothing
      release(x, y); mode = null;
    };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    cv.addEventListener('wheel', e => {
      const [x, y] = local(e);
      if (o.claimWheel && o.claimWheel(x, y, e)) { e.preventDefault(); return; }
      const f = e.deltaMode === 1 ? 16 : 1; d.stopSettling();
      if (e.deltaX) d.setZeta(d.zeta + e.deltaX * f * WH.x);
      if (e.deltaY) { d.setReach(d.reach + (e.ctrlKey ? -e.deltaY * WH.pinch : e.deltaY * WH.y) * f); d.settleSoon(); }
      e.preventDefault();
    }, { passive: false });
    addEventListener('keydown', e => {
      if (o.keysOff && o.keysOff()) return;
      if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !e.repeat) { mode = 'dial'; d.hold(); d.thrusting = true; d.gold = (e.key === 'ArrowLeft' ? -1 : 1) * PI / 4;
        if (d.quarter) d.pushDir = e.key === 'ArrowLeft' ? -1 : 1; }
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        const dir = e.key === 'ArrowUp' ? 1 : -1;
        if (d.detents) d.stepDetent(dir); else d.setReach(d.reach + dir * (o.reachStep ?? 0.02));
      }
      if (e.key.startsWith('Arrow')) e.preventDefault();
    });
    addEventListener('keyup', e => { if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && mode === 'dial') { d.pushDir = 0; d.letGo(); mode = null; } });
  }

  // ── THE SURFACE: draw only when something moved ────────────────────────────────────────────────
  // render(ctx, W, H, resized) draws in CSS pixels; draw(key) calls it only when key, size or an
  // invalidate() says so.
  function surface(cv, render) {
    const vis = cv.getContext('2d'), back = document.createElement('canvas'), ctx = back.getContext('2d');
    let W = 0, H = 0, D = 0, lastKey = '', force = true;
    addEventListener('resize', () => { force = true; });
    return {
      ctx, invalidate() { force = true; },
      get W() { return W; }, get H() { return H; },
      draw(key) {
        const w = Math.round(cv.clientWidth), h = Math.round(cv.clientHeight), dp = Math.min(2, devicePixelRatio || 1);
        if (!w || !h) return;                                         // a pane with no size yet: draw nothing, remember nothing
        if (Math.abs(w - W) > 1 || Math.abs(h - H) > 1 || dp !== D) { W = w; H = h; D = dp; cv.width = back.width = W * D; cv.height = back.height = H * D; force = true; }
        const k = key + '|' + W + ',' + H;
        if (k === lastKey && !force) return;
        const resized = force; lastKey = k; force = false;
        ctx.setTransform(D, 0, 0, D, 0, 0);
        render(ctx, W, H, resized);
        vis.globalCompositeOperation = 'copy'; vis.drawImage(back, 0, 0);
      },
    };
  }

  // ── THE DIAL DRAWN ─────────────────────────────────────────────────────────────────────────────
  const at = (cx, cy, a, r) => [cx + r * Math.sin(a), cy - r * Math.cos(a)];
  // the horizon line, the rim, the ring at radius `ring` and the octave edges on it, both ways from
  // the corner: doublings past it to 2^K (gold), halvings before it to 2^kmin (teal). label(k, a, x, y)
  // may write beside an edge on the right side.
  function drawRim(ctx, d, o) {
    const { cx, cy, R } = o, rr = o.ring, C = COLORS;
    ctx.lineCap = 'round';
    const q = d.quarter, a0 = q ? -PI / 2 : -PI;                                // a quarter dial: home up, horizon right
    ctx.strokeStyle = 'rgba(201,199,190,.18)'; ctx.lineWidth = 1;                 // the horizon: 90°, never reached
    ctx.beginPath(); ctx.moveTo(q ? cx : cx - R - 14, cy); ctx.lineTo(cx + R + 14, cy); ctx.stroke();
    if (q) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - R - 14); ctx.stroke(); }   // home: 0°, where every sweep starts
    ctx.strokeStyle = 'rgba(232,200,106,.22)'; ctx.beginPath(); ctx.arc(cx, cy, R, a0, 0); ctx.stroke();
    ctx.strokeStyle = C.GOLD; ctx.globalAlpha = 0.55; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, rr, a0, 0); ctx.stroke(); ctx.globalAlpha = 1;
    for (let k = o.kmin ?? -d.K; k <= d.K; k++) for (const sg of q ? [1] : [-1, 1]) {
      const a = sg * Math.atan(2 ** k), [x1, y1] = at(cx, cy, a, rr - 7), [x2, y2] = at(cx, cy, a, rr + 7);
      ctx.strokeStyle = k === 0 ? C.GOLD : k > 0 ? 'rgba(232,200,106,.6)' : 'rgba(29,158,117,.75)'; ctx.lineWidth = k === 0 ? 2 : 1.2;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      if (o.label && sg > 0) o.label(k, a, ...at(cx, cy, a, rr - 24));
    }
  }
  // the gold (a rate), the blue (a place) with a dot at its tip, optionally its drop to the horizon line, and the hub
  function drawNeedles(ctx, d, o) {
    const { cx, cy, R } = o, C = COLORS;
    const needle = (a, col) => { const [x, y] = at(cx, cy, a, R); ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke(); };
    ctx.lineCap = 'round';
    needle(o.gold, C.GOLD);
    if (Math.abs(d.zeta) > 1e-9) {
      const th = d.theta(), [tx, ty] = at(cx, cy, th, R);
      needle(th, C.BLUE);
      if (o.drop) { ctx.setLineDash([4, 5]); ctx.strokeStyle = 'rgba(106,168,232,.55)'; ctx.lineWidth = 1;   // the tip's sideways reach: R · sin θ = R · tanh ζ
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx, cy); ctx.stroke(); ctx.setLineDash([]); }
      ctx.fillStyle = C.BLUE; ctx.beginPath(); ctx.arc(tx, ty, 4, 0, 2 * PI); ctx.fill();
    }
    ctx.fillStyle = C.GOLD; ctx.beginPath(); ctx.arc(cx, cy, 4, 0, 2 * PI); ctx.fill();
  }

  // the reading under the dial, one line: side · octave · t, then g. Front in teal, back in gold.
  function drawReading(ctx, d, o) {
    const r = d.reading(), C = COLORS;
    const text = r.side === 'home' ? 'home · g 0 — pan to sweep'
      : r.side === 'corner' ? 'the corner · octave 0 · share 1 · g ½'
      : r.side + ' · octave ' + r.k + ' · t ' + r.t.toFixed(2) + ' · g ' + r.g.toFixed(3);
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.font = (o.size || 12) + 'px ' + o.font;
    ctx.fillStyle = r.side === 'front' ? C.TEAL : r.side === 'home' ? C.DIM : C.GOLD;
    ctx.fillText(text, o.cx, o.y);
  }

  // runs tick and draw every frame; draw is the page's, and decides for itself whether anything changed
  function run(d, draw) { const step = now => { d.tick(now); draw(now); requestAnimationFrame(step); }; requestAnimationFrame(step); }

  window.Dial = { create, hands, surface, drawRim, drawNeedles, drawReading, run, at, clamp, COLORS };
})();
