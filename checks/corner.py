"""corner.py: does OFS's corner play the same role as SR's γβ = 1? (RELATIVITY.md, "The corner, matched", C1–C5.)
Predictions were committed before this script was written. mpmath at 50 digits; run from the repository's root."""
import mpmath as mp
mp.mp.dps = 50
ok = {}
# C1: on E² = (pc)² + (mc²)², h = mc²/E = 1/γ, v = pc/E = β, the reading s = v/h = γβ; the corner at β = 1/√2
worst = 0
for b in [mp.mpf(k) / 997 for k in range(1, 997)]:
    g = 1 / mp.sqrt(1 - b * b); h, v = 1 / g, b
    worst = max(worst, abs(h * h + v * v - 1), abs(v / h - g * b))
bc = 1 / mp.sqrt(2); gc = 1 / mp.sqrt(1 - bc * bc)
ok['C1'] = worst < mp.mpf(10) ** -45 and abs(gc * bc - 1) < mp.mpf(10) ** -45
print('C1 circle and reading, worst', mp.nstr(worst, 3), '; γβ at β = 1/√2:', mp.nstr(gc * bc, 20))
# C2: a boost at fixed m (s = sinh ζ) and a turn at fixed E (s = tan θ) meet at θ = gd(ζ)
gd = lambda z: mp.atan(mp.sinh(z))
w2 = max(abs(mp.tan(gd(z)) - mp.sinh(z)) / mp.sinh(z) for z in [mp.mpf(k) / 50 for k in range(1, 300)])
ok['C2'] = w2 < mp.mpf(10) ** -45
print('C2 tan(gd ζ) = sinh ζ, worst relative', mp.nstr(w2, 3))
# C3: the 1+1 Lorentz group acts on ζ as ζ ↦ ±ζ + a. For s ↦ 1/s we need sinh(±ζ + a)·sinh ζ = 1 for all ζ > 0.
# As ζ → 0⁺ the left side → 0 for any a (sinh(a) finite), so no element works. Shown on a grid of a and both signs:
best = mp.inf
for sgn in (1, -1):
    for a in [mp.mpf(k) / 20 for k in range(-200, 201)]:
        r = max(abs(mp.sinh(sgn * z + a) * mp.sinh(z) - 1) for z in (mp.mpf('0.01'), mp.mpf(1), mp.mpf(3)))
        best = min(best, r)
ok['C3'] = best > mp.mpf('0.5')
print('C3 no boost or reflection gives s ↦ 1/s: least residual over a grid of a, both signs', mp.nstr(best, 4))
# and the mass is invariant, the momentum not: (mc², pc) boosted
m, p, z = mp.mpf(1), mp.mpf(2), mp.mpf('0.7'); E = mp.sqrt(m * m + p * p)
E2, p2 = mp.cosh(z) * E + mp.sinh(z) * p, mp.sinh(z) * E + mp.cosh(z) * p
print('   m² before, after a boost:', mp.nstr(E * E - p * p, 20), mp.nstr(E2 * E2 - p2 * p2, 20), '; pc before, after:', mp.nstr(p, 6), mp.nstr(p2, 6))
# C4: uniform in ζ over [0, Z]: P(s ≤ 1) = asinh(1)/Z, ½ only at Z = 2·asinh 1; uniform in θ: ½ always
Zs = [mp.mpf(1), 2 * mp.asinh(1), mp.mpf(3), mp.mpf(6)]
shares = [min(mp.asinh(1), Z) / Z for Z in Zs]
ok['C4'] = sum(1 for s in shares if abs(s - mp.mpf(1) / 2) < mp.mpf(10) ** -40) == 1
print('C4 P(s ≤ 1) under uniform ζ on [0, Z] for Z =', [mp.nstr(Z, 6) for Z in Zs], ':', [mp.nstr(s, 6) for s in shares])
print('   uniform θ on [0, π/2]: P(s ≤ 1) =', mp.nstr((mp.pi / 4) / (mp.pi / 2), 6))
# C5: the regimes hand over at the corner under either motion: e_N(x) = e_U(1/x), x = pc/mc²
eN = lambda x: (1 + x * x / 2) / mp.sqrt(1 + x * x) - 1
eU = lambda x: (x + 1 / (2 * x)) / mp.sqrt(1 + x * x) - 1
w5 = max(abs(eN(x) - eU(1 / x)) for x in [mp.mpf(10) ** (k / 10) for k in range(-30, 31)])
ok['C5'] = w5 < mp.mpf(10) ** -45 and abs(eN(1) - (mp.sqrt(mp.mpf(9) / 8) - 1)) < mp.mpf(10) ** -45
print('C5 e_N(x) = e_U(1/x), worst', mp.nstr(w5, 3), '; at the corner', mp.nstr(eN(1), 8))
for k in ok: print(k, 'not killed' if ok[k] else 'KILLED')
