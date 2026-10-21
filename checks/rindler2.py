"""rindler2.py (run 2: R2 at 80 digits, derivative step 10⁻³⁰, threshold 10⁻⁴⁰ as predicted). rindler.py: the held push (RELATIVITY.md, "The held push", R1–R4). Predictions committed before this script.
c = 1. The reader starts at rest at x = 0 with constant rapidity rate a on its own clock τ: ζ = aτ.
Its worldline is integrated from dx/dτ = sinh ζ, dt/dτ = cosh ζ (not taken from the closed form); light from a source
at rest at x_s is found by solving the light-ray equation; D is the derivative of the received source time. mpmath."""
import mpmath as mp
mp.mp.dps = 80
ok = {}
a = mp.mpf('0.7')
def world(tau):                                     # integrate the worldline from the held rapidity rate
    t = mp.quad(lambda s: mp.cosh(a * s), [0, tau]); x = mp.quad(lambda s: mp.sinh(a * s), [0, tau]); return t, x
# R1: the proper acceleration of that worldline is a (|d²X/dτ²| in Minkowski norm), at several τ
def accel(tau):
    h = mp.mpf(10) ** -12
    f = lambda s: world(s)
    (t0, x0), (t1, x1), (t2, x2) = f(tau - h), f(tau), f(tau + h)
    at, ax = (t2 - 2 * t1 + t0) / h ** 2, (x2 - 2 * x1 + x0) / h ** 2
    return mp.sqrt(ax * ax - at * at)
r1 = max(abs(accel(mp.mpf(tau)) - a) for tau in ('0.5', '2', '5'))
ok['R1'] = r1 < mp.mpf(10) ** -6
print('R1 proper acceleration of the held push, worst |α − a|', mp.nstr(r1, 3))
# received source time for a source at rest at x_s: light along +x (source behind) or −x (source ahead)
def received(tau, xs):
    t, x = world(tau)
    return t - (x - xs) if xs < x else t - (xs - x)
def D(tau, xs):                                     # source ticks per reader tick
    h = mp.mpf(10) ** -30
    return (received(tau + h, xs) - received(tau - h, xs)) / (2 * h)
# R2: behind, D = e^(−ζ) whatever the distance
taus = [mp.mpf(v) for v in ('0.5', '1.5', '3', '6')]
r2 = max(abs(D(tau, xs) * mp.e ** (a * tau) - 1) for tau in taus for xs in (mp.mpf(0), mp.mpf(-1), mp.mpf(-10), mp.mpf(-1000)))
ok['R2'] = r2 < mp.mpf(10) ** -40
print('R2 behind: D·e^(ζ) − 1, worst over 4 times × 4 distances', mp.nstr(r2, 3))
# R3: the received source time approaches x_s + 1/a; what is left halves every ln 2/a of the reader's time
r3 = 0
for xs in (mp.mpf(0), mp.mpf(-3), mp.mpf(-50)):
    last = xs + 1 / a
    for tau in taus:
        g1 = last - received(tau, xs); g2 = last - received(tau + mp.log(2) / a, xs)
        r3 = max(r3, abs(g2 / g1 - mp.mpf(1) / 2))
ok['R3'] = r3 < mp.mpf(10) ** -30
print('R3 behind: the gap to x_s + 1/a halves every ln 2/a, worst |ratio − ½|', mp.nstr(r3, 3))
# R4: ahead, no freeze: D = e^(+ζ) while the source is ahead, and the received time grows
xs = mp.mpf(10 ** 6)
r4 = max(abs(D(tau, xs) * mp.e ** (-a * tau) - 1) for tau in taus)
grow = all(received(taus[i + 1], xs) > received(taus[i], xs) + 1 for i in range(len(taus) - 1))
ok['R4'] = r4 < mp.mpf(10) ** -10 and grow
print('R4 ahead: D·e^(−ζ) − 1, worst', mp.nstr(r4, 3), '; received time keeps growing:', grow)
for k in ok: print(k, 'not killed' if ok[k] else 'KILLED')
