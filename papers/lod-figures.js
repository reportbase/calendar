// Every figure the paper cites, from one script. Rules as in demos/level-of-detail.html (draw.html's wdtHold, wdtCarried).
const PI = Math.PI, ND = 360;
const tri = x => 2 * Math.abs(x / (2 * PI) - Math.floor(x / (2 * PI) + 0.5));
const SH = [
  ['clover', a => 1 + 0.4 * Math.cos(3 * a)],
  ['ellipse', a => 1 / Math.sqrt(Math.cos(a) ** 2 + (Math.sin(a) / 0.55) ** 2)],
  ['square', a => 1 / Math.max(Math.abs(Math.cos(a)), Math.abs(Math.sin(a)))],
  ['star', a => 0.55 + 0.6 * (1 - tri(5 * a))],
  ['limaçon', a => 1 + 0.6 * Math.cos(a)],
  ['bean', a => 1 + 0.3 * Math.cos(2 * a) + 0.22 * Math.cos(3 * a) + 0.1 * Math.sin(a)],
  ['ripple on a lobe', a => (1 + 0.35 * Math.cos(3 * a)) * (1 + 0.035 * Math.cos(27 * a))],
];
const out = {};
// ── 1. the octave as a sweep ──
const rOf = s => 2 * (s - 0.5) / (2 - s), sOf = r => (2 * r + 1) / (r + 2), gR = r => (2 / PI) * Math.atan(r);
let flip = 0; for (let i = 1; i < 10000; i++) { const s = 0.5 + 1.5 * i / 10000; flip = Math.max(flip, Math.abs(rOf(s) * rOf(1 / s) - 1)); }
const octN = x => Math.floor((Math.log2(x) + 1) / 2), place = x => { const n = octN(x); return n + gR(rOf(x / 4 ** n)); };
const valueAt = p => { const n = Math.floor(p); return 4 ** n * sOf(Math.tan((p - n) * PI / 2)); };
let rt = 0, mono = true, prev = -1; for (let k = -3000; k < 3000; k++) { const P = k / 157, x = valueAt(P); rt = Math.max(rt, Math.abs(place(x) - P)); if (x < prev) mono = false; prev = x; }
function address(x, depth) { const n = octN(x); let r = rOf(x / 4 ** n); const d = []; for (let i = 0; i < depth; i++) { const j = octN(r); d.push(j); r = rOf(r / 4 ** j); } return [n, ...d]; }
const shareL = s => s < 1 ? s - 0.5 : 1.5 - 1 / s;   // the octave laid by the share, as a place in [0,1]
let gap = 0, at = 0; for (let i = 1; i < 200000; i++) { const s = 0.5 + 1.5 * i / 200000, d = Math.abs(gR(rOf(s)) - shareL(s)); if (d > gap) { gap = d; at = s; } }
out.octave = { ends: [rOf(0.5), rOf(1), rOf(2 - 1e-12) > 1e9], flipErr: flip, placeRoundTrip: rt, monotone: mono, address137: address(1.37, 4), shareVsG: { max: +gap.toFixed(5), at: +at.toFixed(3), mirror: +(1 / at).toFixed(3) },
  octaveGWidths: [0, 1, 2, 3].map(k => +((2 / PI) * (Math.atan(2 ** -k) - Math.atan(2 ** -(k + 1)))).toFixed(4)) };
// marks inside one octave by depth
function marks(depth, J) { const kids = d => { if (!d) return []; const inner = kids(d - 1), o = []; for (let j = -J; j <= J; j++) { o.push(4 ** j, 2 * 4 ** j); for (const q of inner) o.push(4 ** j * sOf(q)); } return o; }; return 1 + kids(depth).filter(r => Math.abs(r - 1) > 1e-12).length; }
out.marks = [0, 1, 2, 3, 4].map(d => marks(d, d >= 4 ? 3 : d >= 3 ? 4 : 7));
// ── 2. level of detail ──
function figure(f, home) { const lr = []; for (let k = 0; k < ND; k++) lr.push(Math.log(f(2 * PI * k / ND)));
  const lo = Math.min(...lr), hi = Math.max(...lr), S = hi - lo; if (home === 'mid') { const mid = (hi + lo) / 2; home = 0; for (let k = 0; k < ND; k++) if (Math.abs(lr[k] - mid) < Math.abs(lr[home] - mid)) home = k; }
  if (home === 'max') home = lr.indexOf(hi); const a = lr[home], u = (a - (hi + lo) / 2) / (S / 2); let far = 0; for (const v of lr) far = Math.max(far, Math.abs(v - a));
  return { lr, S, a, u, far, home, Rstar: 1 / (1 + Math.abs(u)) }; }
function hold(F, R, C = Infinity) { if (R <= 0) return { rungs: 1, railed: 0, carried: 0, held: F.lr.map(() => F.a) };
  const sig = F.S / R, reach = (C / 2) * sig; let railed = 0; const ks = new Set();
  const held = F.lr.map(v => { let k = Math.round((v - F.a) / sig), x = k * sig; if (Math.abs(x) > reach) { x = Math.sign(x) * Math.floor(C / 2) * sig; k = Math.round(x / sig); railed++; } ks.add(k); return F.a + x; });
  let ma = 0, mb = 0; for (let i = 0; i < ND; i++) { ma += F.lr[i]; mb += held[i]; } ma /= ND; mb /= ND;
  let ve = 0, vf = 0; for (let i = 0; i < ND; i++) { const fv = F.lr[i] - ma, e = fv - (held[i] - mb); ve += e * e; vf += fv * fv; }
  return { held, rungs: ks.size, railed, carried: vf > 0 ? 1 - ve / vf : 0 }; }
out.lod = SH.map(([name, f]) => { const F = figure(f, 'mid'), X = figure(f, 'max');
  const silentBelow = hold(F, F.Rstar * 0.95).rungs === 1, speakAbove = hold(F, F.Rstar * 1.05).rungs > 1;
  const silentBelowX = hold(X, X.Rstar * 0.95).rungs === 1, speakAboveX = hold(X, X.Rstar * 1.05).rungs > 1;
  return { name, swing: +F.S.toFixed(3), swingOctaves: +(F.S / Math.LN2).toFixed(2), RstarMid: +F.Rstar.toFixed(3), RstarExtreme: +X.Rstar.toFixed(3),
    predictionHolds: silentBelow && speakAbove && silentBelowX && speakAboveX, justPast: +(100 * hold(F, F.Rstar * 1.03).carried).toFixed(0),
    carried: [1, 2, 4, 8, 16, 32, 1024].map(R => +(100 * hold(F, R).carried).toFixed(1)) }; });
// ── 3. railing threshold: predicted C·S/(2·far) against the first R (fine scan) where any look rails ──
out.rail = ['clover', 'square', 'star', 'bean'].map(nm => { const F = figure(SH.find(s => s[0] === nm)[1], 'mid');
  return { name: nm, rows: [8, 16, 32, 64].map(C => { const pred = C * F.S / (2 * F.far); let first = null;
    for (let i = 0; i < 4000; i++) { const R = 0.5 * Math.pow(2, i / 200); if (hold(F, R, C).railed > 0) { first = R; break; } }
    return { C, predicted: +pred.toFixed(2), firstRail: first && +first.toFixed(2), ratio: first && +(first / pred).toFixed(3) }; }) }; });
const Fc = figure(SH[0][1], 'mid'); out.railAt16 = [8, 32, 256].map(C => ({ C, railed: hold(Fc, 16, C).railed, carried: +(100 * hold(Fc, 16, C).carried).toFixed(0) }));
// ── 4. the ripple: when does the ripple itself separate from the lobe? ──
{ const F = figure(SH[6][1], 'mid'); const rip = []; for (let k = 0; k < ND; k++) rip.push(Math.log(1 + 0.035 * Math.cos(27 * 2 * PI * k / ND)));
  const lobe = []; for (let k = 0; k < ND; k++) lobe.push(Math.log(1 + 0.35 * Math.cos(3 * 2 * PI * k / ND)));
  const Sr = Math.max(...rip) - Math.min(...rip);
  const corr = R => { const H = hold(F, R).held; let a = 0, b = 0, c = 0; for (let k = 0; k < ND; k++) { const e = H[k] - F.a - (lobe[k] - (F.a - lobe[F.home] - rip[F.home]) - F.a); }
    // the ripple carried: correlation of (held − the true lobe part) with the ripple
    const res = H.map((h, k) => h - lobe[k]); const mr = res.reduce((x, y) => x + y) / ND, mq = rip.reduce((x, y) => x + y) / ND;
    let sxy = 0, sxx = 0, syy = 0; for (let k = 0; k < ND; k++) { const x = res[k] - mr, y = rip[k] - mq; sxy += x * y; sxx += x * x; syy += y * y; }
    return sxy / Math.sqrt(sxx * syy || 1); };
  out.ripple = { S: +F.S.toFixed(3), Sripple: +Sr.toFixed(4), naive: +(F.S / Sr).toFixed(1), corrByR: [1, 2, 4, 8, 11, 16, 32, 64, 128].map(R => [R, +corr(R).toFixed(2)]) }; }
console.log(JSON.stringify(out, null, 1));
