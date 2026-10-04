# The Sweep All the Way Down

## Level of detail, and the recursive nature of the sweep from 0 to π/2

*Tom Brinkman, with Claude. Working paper, 4 October 2026. A companion to* Serial, Parallel and Nowhere *(SPN, the
version of 3 October), in situation 3 only. Every number below is produced by one script,
[`lod-figures.js`](lod-figures.js) (`node papers/lod-figures.js`), and every idea has a page in this repository that
can be swept by hand (Appendix).*

*Marks used throughout, as in SPN:* **Proved** *— follows from the definitions and the stated premises;* **Measured**
*— computed by the script, with what was held fixed;* **Proposal** *— offered, not ruled, and open to Tom's ruling.*

---

## Abstract

The sweep is a reading turned from home to the horizon: g from 0 to 1, or the angle θ = (π/2)·g from 0 to π/2, with
the corner at g = ½, θ = π/4, where v = h. This paper reports two things that turn out to be one.

The first is that **every octave is itself a sweep**. Take one octave with two facings, ½c to 2c around a corner c
(SPN R167). There is exactly one projective map that sends its edge ½c to home, its corner c to the corner and its edge 2c to the
horizon. Under that map the octave reads as a whole sweep from 0 to π/2 of its own, with a front, a corner and a back.
That inner sweep has octaves of its own, and so on without end. Between octaves the readings add: the place of a
reading is n + g, a whole count of octaves plus a sweep within one. Within an octave they recurse: an address is
(n; j₁, j₂, …). The sweep therefore holds infinite **breadth**, in the outer octaves, and infinite **nesting**, in
the inner sweeps (Tom's word was density; the name is pending, §11). One rule is used at every level. The map
respects the flip at every level, and inside any octave the sweep and the plain proportional share never differ by
more than 0.011 of the octave.

The second is that **level of detail is a sweep**. Hold a figure on a ladder of rungs of step σ about a home look. The
rung span R = swing/step is a v/h reading like any other, so it has a g. At g = 0 every look is held at home, and every
figure is the circle of its home. The square starts out as a circle. As g rises the held figure stays silent until
R* = 1/(1+|u|), where u is home's place in the swing. That is the corner exactly when home is at mid-swing. Past R*
it speaks, and as g → 1 it becomes the figure. This was measured on seven shapes: the prediction holds for all seven,
both at mid-swing and at the extreme. A register of C cells adds a second edge. Railing begins exactly at
R_rail = (C+1)·S/(2·far). This is the budget of SPN's Proposition 3.8 seen in one figure: reach traded against
resolution.

Read together, level of detail is the nesting seen from inside one octave. Turning up the detail is going one sweep
deeper.

---

## 1. The sweep

*Tom: "g=0, no breadth expressed, g=1 breadth is fully expressed. but [0,1] could be expressed as [0,PI/2] if you
include the periodicity." (SPN §3.5, R170.)*

Situation 3 is a reader with a home, a known unit h, and a horizon. A reading is the pair (h, v), or the ratio
s = v/h ∈ [0, ∞]. The sweep is

    g = (2/π)·atan(s) ∈ [0, 1],        θ = (π/2)·g = atan(s) ∈ [0, π/2].

g and θ are one quantity in two units. [0, 1] is the sweep laid flat, and [0, π/2] is the same sweep with the
turning kept. Home is g = 0, the corner is g = ½ (s = 1, θ = π/4), and the horizon is g = 1. The **flip** s ↦ 1/s
sends g ↦ 1 − g. It swaps the front side (s < 1, v as a share of h) with the back side (s > 1, h as a share of v),
and it leaves only the corner in place.

**Two curves meet at the corner.** In the (h, v) square the arc h² + v² = 1 carries g: a point on it is a turning. The
square's two outer edges, max(h, v) = 1, carry the **share** min(v, h)/max(v, h) of SPN Corollary 3.5(b): a point on
them is a proportion. Both are unit curves, and both run from home to the horizon. They touch at exactly one point, the
square's corner (1, 1), and that point is the corner of the reading. This is the first sign of a pattern that runs through the paper.
The share is proportional, the sweep turns, and the two agree at the corners.

Situations 1 and 2 have no home, no corner and no sweep (SPN §2.1, R140). Nothing below applies to them.

---

## 2. Every octave is a sweep

*Tom: "each octave has a front and a back, and the corner splits them. so the 0 to PI/2 or this g sweep is just this.
so my thought is that each octave itself is another 0 to pI/2 sweep. so its recursive within an octive and additive
outside the octave."*

### 2.1 The octave map

SPN R167 gives one octave with two facings: from ½c to 2c, with its corner c in the middle. The front facing
½c → c reads v in terms of c, and the back facing c → 2c reads c in terms of v. In units of the corner, with
s = v/c, the octave is s ∈ [½, 2].

**Proposition 2.1 (the octave map).** *Premise: the reading inside an octave is a projective (fractional-linear)
function of s, of the same kind as v/h itself. Then there is exactly one such map sending ½, 1, 2 to 0, 1, ∞:*

    r(s) = 2(s − ½)/(2 − s),        s(r) = (2r + 1)/(r + 2).

**Proved.** A fractional-linear map is fixed by the images of three distinct points. This is the classical three-point
property of the Möbius group, or equivalently the preservation of the cross ratio. Checking: r(½) = 0, r(1) = 2·½/1 = 1, and r → ∞ as s → 2. The
inverse follows by solving r(2 − s) = 2s − 1. ∎

r is again a v/h reading: 0 at the octave's home edge, 1 at its corner, ∞ at its horizon edge. So the octave has a
sweep of its own,

    g_inner = (2/π)·atan(r(s)),

which runs from 0 to 1 across the octave, with ½ at c.

*On "forced".* The review from the other session put this correctly. The map is forced **given** the projective
premise. Without that premise other monotone maps send ½, 1, 2 to 0, 1, ∞; a power of the cross ratio would do. The premise is that the inner reading is the same
kind of thing as the outer one, a ratio of two magnitudes. That is what "the octave is a sweep" means, so the premise
is the claim, stated once.

**Proposition 2.2 (the flip holds at every level).** r(1/s) = 1/r(s), so g_inner(1/s) = 1 − g_inner(s).

**Proved.** r(1/s) = (2/s − 1)/(2 − 1/s) = (2 − s)/(2s − 1) = 1/r(s). ∎

So the octave's own front and back are swapped by the same flip that swaps the outer front and back. The facings
nest with the sweep. **Measured:** the largest |r(s)·r(1/s) − 1| over 10⁴ samples of [½, 2] is 1.8 × 10⁻¹³.

### 2.2 Proportional in the share, a sweep in the address

Inside one octave there are two ways to lay the readings on [0, 1].

- **By the share.** The front facing is laid at s − ½, from 0 to ½. The back facing is laid at 1½ − 1/s, from ½ to 1.
  This is plain proportion in each facing, as SPN R163 asks ("within each doubling, proportion again").
- **By the sweep.** Each reading is laid at g_inner(s).

**Measured.** The two lays never differ by more than **0.0108** of the octave. The largest gap is at s = 1.534, and
again at its flip, s = 0.652. They agree exactly at both edges and at the corner.

So the recursion does not overrule proportion. Inside every octave the reading is proportional to within about one
percent. The nested sweep is what lets the address name **which** octave, and which octave inside that, with no
breadth assumed. Our earlier figure of 0.1 for this gap, given in conversation, was wrong: it compared r with t. The
other session caught the mistake, and 0.0108 is the corrected value.

### 2.3 How much of the sweep each octave gets

In an evenly spread world the share of readings in octave k on one facing is the g-width of that octave:
(2/π)(atan 2⁻ᵏ − atan 2⁻⁽ᵏ⁺¹⁾). **Measured:** 0.2048, 0.1392, 0.0768, 0.0394 for k = 0 to 3, as in SPN §3.3. The
reader's own octave takes the most. Each octave further out takes about half as much as the one before.

---

## 3. Breadth and nesting

*Tom: "the recursion is the density, because the sweep can represent infinite breadth and infinte density. the
infinite breadth is outer octaves and the infinite density is the inner recursive octaves."*

### 3.1 Breadth: octaves add

Lay the octaves with two facings end to end, with corners at 4ⁿ for every whole n. Octave n runs from ½·4ⁿ to 2·4ⁿ,
and each octave's back edge is the next octave's front edge. The **place** of a reading s is

    P(s) = n + g_inner(s / 4ⁿ),        n = ⌊(log₂ s + 1)/2⌋.

**Proposition 3.1 (place is continuous and strictly increasing).** **Proved.** Within an octave, P is a sum of
increasing maps. At the shared edge s = 2·4ⁿ = ½·4ⁿ⁺¹, the place from below tends to n + 1, because r → ∞ and
g_inner → 1. The place from above is (n + 1) + 0, because r = 0. ∎

**Measured:** the round trip P(s(P)) differs from P by at most 2.8 × 10⁻¹⁶ over P ∈ [−19, 19], and s(P) is monotone.

Breadth is the integer part. It is unbounded both ways, toward home (n → −∞) and toward the horizon (n → +∞). These
are SPN R77's two infinities, matched.

### 3.2 Nesting: octaves recurse

The inner reading r = r(s/4ⁿ) is a v/h reading on [0, ∞]. So it has octaves of its own, with corners at 4ʲ for every
whole j, and the same map applies inside each of them:

    s  →  n, r₁ = r(s/4ⁿ)  →  j₁, r₂ = r(r₁/4^{j₁})  →  j₂, r₃ = …

The **address** of a reading is (n; j₁, j₂, j₃, …). **Measured:** s = 1.37 has address (0; 1, −1, 0, 1). It lies in
the reader's own octave. Inside that it lies one octave toward that octave's horizon, then one toward home, then in
the home octave, then one toward the horizon again.

Three things follow, and they are the content of Tom's insight.

1. **One rule at every level.** No level differs from any other. The same map, the same flip, the same front, corner
   and back apply. A level is defined only by which octave was entered to reach it.
2. **Every level has breadth too.** Each jᵢ ranges over all of ℤ, not over a finite set of children. An inner sweep is
   as wide as the outer one. Nesting is breadth inside breadth.
3. **The edges are horizons.** Seen from inside an octave its edges are at r = 0 and r = ∞. They are the inner
   sweep's home and horizon, which can be approached and never reached at that level (SPN §3.7, the corner a horizon).
   Leaving an octave is not crossing a wall. It is a change of level.

### 3.3 How fast the marks fill in

**Measured,** as an illustration only. Count the distinct marks (corners and octave edges) laid inside one octave down to
depth d, with |j| ≤ J at each level: 1, 30, 479, 1636, 5597 for d = 0 to 4 (J = 7, 7, 7, 4, 3). J is cut down at the
deeper levels to keep the count finite. These figures show that the marks multiply and that they stay distinct. They
are not a growth law.

---

## 4. What is proportional

*Tom: "in situation 3 … each sweep consists of a frontside, which is proportional and a backside. the backside consists
of octaves, which are just sweeps themselves, with the front side being proportinal and the backside being octaves,
continuing recursivvely."*

That framing is right, and SPN supports it with two refinements.

- **The front side is proportional by right** (SPN R158). Before the corner v is a share of the known h, so plain
  proportion is defined there and any reader may use it. Past the corner it is undefined, because v's breadth is
  unknown. What remains defined is which octave a reading is in, and a share within that octave.
- **So octaves are forced on the back and optional on the front.** On the back side the octave count is the only
  defined reading. On the front side the reader may also read by octaves, halvings toward home. That reading is fair to
  both facings (R162, R167) and finer near home, where plain proportion with n addresses loses everything finer than
  h/n (SPN §3.3).
- **Inside every octave, proportion again** (R163). §2.2 makes this exact: in the share, each octave is proportional.
  In the address, it is a sweep, and the two lays differ by at most 0.011.

The short form, which the other session can use as it stands: **proportional in the share, a sweep in the address.**
Tom's recursive framing is the address. The front side's proportion is the share. They describe the same readings,
which differ by at most 1.1%.

---

## 5. Level of detail is a sweep

*Tom: "notice that what we are describing is level of detail, draw.html has labs that show how level of detail emerges
as you sweep from 0 to PI/2."*

### 5.1 The set-up

The set-up follows draw.html's labs *rung by rung*, *where the detail turns* and *where the geometry goes*. A **figure**
is a closed outline r(a) seen from its centre, and each look a has a reading ℓ(a) = ln r(a). The figure's **swing** is
S = max ℓ − min ℓ. Choose a **home** look, with reading ℓ₀. Its place in the swing is

    u = (ℓ₀ − mid)/(S/2) ∈ [−1, 1],    mid = (max ℓ + min ℓ)/2,

so u = 0 is home at mid-swing and u = ±1 is home at an extreme. The look farthest from home is
far = max |ℓ − ℓ₀| = (S/2)(1 + |u|).

A **register** with rung step σ holds each look at the nearest rung counted from home:

    held(a) = ℓ₀ + σ·round((ℓ(a) − ℓ₀)/σ).

The **rung span** R = S/σ is the number of steps that fit across the swing. It is a ratio of two magnitudes, so it is
a v/h reading with a sweep g = (2/π)·atan R. Turning R from 0 to ∞ turns g from 0 to 1. **Carried** is
1 − (residual variance)/(figure variance), with both variances taken about their means. It is 0 for a held figure
that is flat. It is 1 for a held figure that is exact. It is negative when the held figure is a worse picture than a
flat one.

### 5.2 Every figure starts as the circle of its home

**Proposition 5.1 (g = 0 is the unit curve).** **Proved.** As R → 0, σ → ∞, so every round(·) is 0 and every look is
held at ℓ₀. The held figure is the circle of radius r(home). ∎

This is the content of Tom's remark that "a square starts out as a circle". No shape is special here: every figure
starts as the circle. SPN already says it in the sweep's own terms: "g = 0 is the unit circle" (Tom, R168). Level of
detail is the breadth of the figure being expressed, starting from nothing expressed.

### 5.3 Where the figure starts to speak

**Proposition 5.2 (the speaking corner).** The held figure is silent (every look held at home) if and only if
R < R* = 1/(1 + |u|), apart from ties at the half-step.

**Proved.** Every look is held at home exactly when |ℓ − ℓ₀| < σ/2 for every look, that is, when far < σ/2.
Substituting far = (S/2)(1 + |u|) and σ = S/R gives (S/2)(1 + |u|) < S/(2R), which is R < 1/(1 + |u|). ∎

So R* ∈ [½, 1], and g* = (2/π)·atan R* ∈ [0.295, ½]:

- **with home at mid-swing (u = 0), R* = 1 and g* = ½.** The figure first speaks exactly at the corner of the sweep.
- **with home at an extreme (|u| = 1), R* = ½,** and it speaks earlier, at g* ≈ 0.295, because the far look is a full
  swing away.

*Caution, from draw.html.* R* is a corner of a **derived** relation, swing over step. It is not the corner of the
shape's own v/h, the place where an outline's radius equals the home radius. The two coincide only by the choice of
units, and they should not be confused. What the proposition shows is that the derived relation has a sweep of its
own, and that the detail begins at that sweep's corner. This is what §2 predicts for any v/h reading.

### 5.4 Level of detail is the nesting seen from inside

Put §2 and §5 side by side. The rung span R is a v/h reading. Its octaves are R ∈ [½, 2], [2, 8], [8, 32], …, each a
×4 octave with two facings around a corner 4ⁿ. In those terms:

- **R below R*** (every octave n < 0, and the front facing of octave 0 when home is at mid-swing): silence. Every figure is the circle.
- **R* in octave 0:** the first rung appears at its corner when home is at mid-swing, and in its front facing when home is at an extreme.
- **each octave after that:** the step is a quarter of what it was, and the held figure carries most of what was
  left. The table below shows this.

Turning up the detail is moving out one octave in the breadth of R. Seen from the figure, each of those octaves is a
finer register nested in the one before. **Proposal:** level of detail is the nesting of §3 read from inside one
figure, and it is not a separate idea.

---

## 6. Measurements

*Held fixed:* 360 looks evenly spaced in direction. Home is the look nearest mid-swing unless stated. The register has
no cell limit (C = ∞) unless stated. Seven shapes are used. The clover is 1 + 0.4 cos 3a. The ellipse has aspect 0.55.
The square is the unit square. The star is a five-point star from 0.55 to 1.15. The limaçon is 1 + 0.6 cos a. The bean
is a three-term sum. The ripple on a lobe is (1 + 0.35 cos 3a)(1 + 0.035 cos 27a).

### 6.1 The speaking corner holds on every shape

**Measured.** For every shape, with home both at mid-swing and at the swing's maximum, the held figure is silent at
0.95·R* and speaks at 1.05·R*. R* at the extreme is 0.500 for all seven shapes, as Proposition 5.2 requires.

| shape | swing S | in octaves (S/ln 2) | R* (mid) | carried just past, at 1.03·R* | carried at R = 1, 2, 4, 8, 16, 32, 1024 (%) |
|---|---|---|---|---|---|
| clover | 0.847 | 1.22 | 0.999 | 0 | 0.8, 87.0, 96.5, 99.1, 99.8, 99.9, 100 |
| ellipse | 0.598 | 0.86 | 0.985 | +10 | 5.9, 86.7, 96.4, 99.0, 99.7, 99.9, 100 |
| square | 0.347 | 0.50 | 0.985 | −34 | −31.6, 80.9, 94.9, 98.6, 99.6, 99.9, 100 |
| star | 0.738 | 1.06 | 0.984 | +3 | 2.3, 74.6, 93.6, 98.4, 99.6, 99.9, 100 |
| limaçon | 1.386 | 2.00 | 0.992 | −1 | 5.1, 86.6, 96.4, 99.0, 99.7, 99.9, 100 |
| bean | 1.145 | 1.65 | 0.996 | −4 | −3.7, 61.7, 94.2, 97.9, 99.5, 99.9, 100 |
| ripple on a lobe | 0.801 | 1.16 | 1.000 | +1 | −0.6, 82.3, 95.2, 98.9, 99.7, 99.9, 100 |

R* at mid-swing is a little under 1, between 0.984 and 1.000. This is because the sampled home is the look **nearest**
mid-swing, not mid-swing exactly, so |u| is small but not zero.

What the table shows:

- **The shape arrives by the octave after the corner.** At R = 2, the corner's own horizon edge, every shape carries
  62 to 87%. By R = 8 every shape carries 98 to 99%. Most of the figure is expressed within one octave of R past the
  corner. The rest is a long tail, the back side, and it halves with each octave.
- **The first word can be wrong.** Just past R* the held figure can be a worse picture than the circle. The square
  carries −34%. Negative values at R = 1 mean the same thing.
- **The square has the smallest swing,** half an octave, ln √2. It is the closest of the seven shapes to its own
  circle, which is why it "starts out as a circle" so visibly.

### 6.2 A hypothesis that failed

We expected sharp shapes (square, star) to overshoot more than smooth ones just past the corner. **Measured: not
supported.** The square goes most negative (−34), but the star is +3. The smooth limaçon and bean are both slightly
negative, and the smooth ellipse is the most positive (+10). Sharpness does not order these values. They depend on
where the first rung boundary happens to cut the outline. The hypothesis is dropped.

### 6.3 A detail inside a detail

The ripple on a lobe is a nested figure: a fine ripple of swing about 0.07 riding on a lobe of total swing 0.80. A
naive estimate puts the ripple's own speaking point at S/S_ripple ≈ 11.4. **Measured:** the correlation between the
held ripple (held figure minus held lobe) and the true ripple, by R:

| R | 1 | 2 | 4 | 8 | 11 | 16 | 32 | 64 | 128 |
|---|---|---|---|---|---|---|---|---|---|
| correlation | .04 | .22 | .33 | .70 | .76 | .88 | .96 | .99 | 1.00 |

The ripple does not appear at a corner. It rises gradually over about five octaves of R. This is because the lobe
moves the ripple across rung boundaries, so some of the ripple is caught long before its own swing equals a step. The
nested feature has its own sweep, but its edge is blurred by the outer one. A claim of "one corner per feature" cannot
be read off this curve after the fact. It needs a threshold fixed in advance (§10).

---

## 7. Reach against resolution

A register cannot hold every rung. Give it C cells, so that it reaches at most (C/2)·σ either side of home and holds
anything beyond that on its last rung (**railing**). The cell count is the dial's radius in the level-of-detail page.

**Proposition 7.1 (where railing starts).** For even C, some look rails if and only if R ≥ R_rail = (C+1)·S/(2·far).

**Proved.** The far look rails when its rung index round(far/σ) exceeds C/2. For even C that is round(far/σ) ≥ C/2 + 1,
which is far/σ ≥ (C+1)/2. With σ = S/R this becomes R ≥ (C+1)·S/(2·far). ∎

**Measured.** On a fine scan of R, the first R at which any look rails matches (C+1)·S/(2·far) for the clover, square,
star and bean at C = 8, 16, 32 and 64. Its ratio to the naive C·S/(2·far) is 1.126, 1.065, 1.033 and 1.018, which is
(C+1)/C to the scan's resolution. For the clover at R = 16, with home at mid-swing, C = 8 rails 222 of 360 looks and carries 83%,
while C = 32 and C = 256 rail none and carry 100%.

So a register has two edges on one sweep. **R*, below which it says nothing, is set by the figure. R_rail, above which
it cannot reach, is set by the register.** Between them the figure is expressed. Raising the resolution (R) with C
fixed spends reach. This is SPN Proposition 3.8's budget seen in one figure: with a fixed count of addresses, more
octaves at one end means fewer at the other. As in SPN, the budget is a **premise**, a fixed C, and not a law of the
geometry. A larger register moves the rail outward.

---

## 8. Every shape starts as the circle

*Tom: "its interesting that a square starts out as a circle."*

Proposition 5.1 says why. At g = 0 nothing of the figure's breadth is expressed, and the only shape with no breadth
expressed is the circle of home. In the sweep's terms the circle is not one shape among many. It is the g = 0 member
of every family of shapes.

§1 opens a question this paper does not answer. **There are two unit curves.** The sweep's is the arc
h² + v² = 1, and the share's is the square max(h, v) = 1. They meet only at the corner. Level of detail as defined in
§5 rounds in ln r and starts every figure from a **circle**. If the figure were instead held in the share, as a
proportion of home with each facing laid flat, it is plausible that every figure would start from the **square**, and
that a circle would "start out as a square". **Open**, not measured: would a share-held register start every figure
from the square, and would its speaking corner sit where Proposition 5.2 puts it? §2.2 gives a reason to expect the
two to stay close, since inside one octave the share and the sweep differ by at most 0.011. It is not a proof.

---

## 9. The dial

The dial in this repository is built for this geometry ([`dial-core.js`](../dial-core.js)). Two of its modes matter here.

- **Semicircle**: two facings. The blue needle is the reading, and the gold is the push. The gold's angle from the
  apex is the **rate**: tan(gold) records per unit of time, with its sign giving the direction. The semicircle is right for a
  list, which has a "which way".
- **Quarter, 0 to π/2**: a magnitude, with no "which way". *Tom: "why do you use the semi-circle, is this not 0 to
  PI/2?"* A rung span has no sign, so the level-of-detail page uses the quarter. The gold **pulls** the blue: the push
  is tan(gold − θ), clamped, so the blue follows the gold. Holding the gold at either end, π/2 or 0, drives the blue
  fully out or fully back. The first quarter dial used the semicircle's rule, which locked once the gold reached π/2.
  It was corrected on Tom's report.

In the level-of-detail page the dial's sweep is g of R, from 0 to 1024. The radius (the pinch) sets the register's
cells, C = 2^(1 + 11·r). The rim carries a white tick at R* and a red tick at R_rail. So one hand turns the detail and the
other spends reach, and both edges of §7 can be seen moving on the rim.

---

## 10. Limits, and what to test

- **The octave map is forced only under its premise** (§2.1). A test of the nesting against data should state the
  projective premise and test it, not assume it.
- **Hold tests to one octave first.** The other session's caution: compare the share and the sweep on ½ ≤ s ≤ 2,
  where both are defined and §2.2's bound applies, before claiming anything across octaves.
- **"One corner per feature" needs pre-registration.** §6.3 shows a gradual rise. Before a nested feature's onset is
  claimed, fix the threshold (for example, correlation 0.5 or 0.9) and the predicted R, and then measure.
  **Candidate:** a feature of swing S_f on a figure of swing S reaches correlation 0.9 within one octave of
  R = S/S_f. On the ripple that predicts R ∈ [5.7, 22.8]. The measured correlation crosses 0.7 inside that range, at R ≈ 8, but
  crosses 0.9 only between R = 16 and 32, near the range's upper edge or past it. The verdict depends on the
  threshold, which is why the threshold must be fixed before measuring.
- **The railing formula is proved** (§7). It is a check on an implementation, not a finding about shapes.
- **The overshoot hypothesis is dropped** (§6.2).
- **Seven shapes, one sampling.** Every LOD figure uses 360 evenly spaced looks and outlines that are star-shaped
  about their centre. Other samplings, such as along the outline (see *shapes-come-home*), were not tried.
- The labs named in the other session's review (CRY, grain, RNG) are hooks for that session's work. They are not
  claimed here.

---

## 11. Names, pending Tom's ruling

Two names are used provisionally. Neither is ruled.

1. **Nesting or density.** Tom's word is *density*: "the infinite density is the inner recursive octaves". The
   proposal is *nesting*, because SPN already uses density-like language for how readings spread over the sweep (an
   evenly spread world, §2.3), and the inner octaves are levels rather than a spread. Tom decides.
2. **The ×4 unit.** "One octave with two facings" (SPN R167) is exact but long. The browser page calls it an *octal*.
   The proposal is to keep *octave with two facings* in prose and use *octal* in the dial. Tom decides.

---

## Appendix. Pages and the script

| What | Where |
|---|---|
| Every figure in this paper | [`papers/lod-figures.js`](lod-figures.js); run `node papers/lod-figures.js`, which prints JSON |
| Breadth (n + g) and nesting, with the share and g laid side by side | [`demos/breadth-and-density.html`](../demos/breadth-and-density.html) |
| Octals with front, corner and back, carried one at a time | [`demos/octave-browser.html`](../demos/octave-browser.html) |
| Level of detail on the quarter dial: R*, the rail, seven shapes | [`demos/level-of-detail.html`](../demos/level-of-detail.html) |
| The dial itself, with the rung and the (side, octave, t) reading | [`geometry.html`](../geometry.html), [`dial-core.js`](../dial-core.js) |
| Source of the LOD rules (wdtHold, wdtCarried) | draw.html, labs *rung by rung*, *where the detail turns*, *where the geometry goes* |
