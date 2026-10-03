# The dial's geometry, and one vocabulary for it

The dial uses a few shapes that physics, cartography and optics each name differently.
In these files' comments, **geometry names come first**, and other fields' names follow in brackets.
`geometry.html` draws the figure live beside the dial.

## The figure

A centre **O**, a unit circle, the tangent line at its apex **A**, and the unit hyperbola that touches
the same line at A.

| Point | Coordinates (along the axis, sideways) | What it is on the dial |
|---|---|---|
| **P** | (cos θ, sin θ) | the blue needle's tip, at angle θ from the apex |
| **T** | (1, tan θ) | where the needle's line meets the tangent: **the value**, in units |
| **H** | (cosh ζ, sinh ζ) | the hyperbola point level with T: ζ is what the gold has pushed |
| **S** | (1, tanh ζ) | where O–H meets the tangent, level with P |

So `sin θ = tanh ζ`, `tan θ = sinh ζ`, `sec θ = cosh ζ`: **θ = gd(ζ)**, the gudermannian.
Each angle is twice the area of its sector: O–A–P on the circle, O–A–H on the hyperbola.

## Names

| Geometry (use this) | Dial | [Special relativity] | [Mercator / maps] | [Optics, other] |
|---|---|---|---|---|
| circular angle θ | blue needle | angle whose sine is v/c | latitude | — |
| hyperbolic angle ζ | what the gold pushes | rapidity | map height, asinh(tan φ) | asinh magnitude |
| tangent, tan θ = sinh ζ | the value ÷ unit | proper velocity γv/c | gnomonic distance | rectilinear lens |
| sine, sin θ = tanh ζ | the needle tip's sideways reach | v/c | — | Klein-disc radius |
| secant, sec θ = cosh ζ | — | Lorentz factor γ | Mercator scale factor | — |
| the horizon, θ = 90° | never reached | speed of light | the pole | vanishing point |
| the corner, tan θ = 1 (45°) | one unit from home | γv = c, v ≈ 0.707c | latitude 45° | — |
| corners tan θ = 2^k | the rungs | — | — | octaves |
| the radius r, window = N^r | the scale | — | — | exponent; log-polar |
| central projection, x = r·tan θ | the lens | — | gnomonic projection | perspective divide; polar sundial |

## g is the sweep (*Serial, Parallel and Nowhere* §3.5, R170)

The needle's angle from the apex is the paper's **sweep**. **g** is that angle as a share of the quarter turn:

    g = θ ÷ 90° = (2/π)·gd(ζ)        s = v/h = tan(90° · g)

| g | on the sweep | s = v/h | on the dial |
|---|---|---|---|
| 0 | **home**: pure horizontal, all h, no breadth expressed | 0 | the apex, the needle at rest |
| ½ | **the corner**, v = h: the near horizon | 1 | 45°, one unit |
| 1 | **the horizon**: pure vertical, the breadth fully expressed | ∞ | 90°, never reached |

**g = 0 is the unit circle; g = 1 (π/2) is the shape fully expressed.** The sweep carries the circle
into the shape. For a shape with h breadth 1 and v breadth b, at turn t = g·π/2:

    P = (cos t, sin t)        the unit circle
    Q = (cos t, b · sin t)    the shape: P with v's breadth expressed

- At g = 0, Q = P = (1, 0): circle and shape coincide, so nothing is expressed.
- At g = 1, Q = (0, b): v's breadth is fully expressed.
- In between, the gap P → Q is (b − 1) · sin t, the bar's own vertical part. Nothing is chosen: the sweep alone sets how much is expressed.

This is Kepler's auxiliary circle construction, with t the eccentric anomaly. Classical mechanics treats that circle as a drawing aid. Reading it as the shape with nothing yet expressed is this work's.
It differs from the mix **m** (§2.1), which weights the whole shape the same in every direction. Here the expression grows with the sweep.

Two consequences, both checked numerically:
- `dial.html`'s lens, `atan(tan a / K)` with K = 4, is the angle of the ray to Q for b = ¼.
- The ray to Q meets the tangent line at b · tan t, which is b times the circle's reading. That is §2.3's Cauchy of scale b, an offset of log₂ b octaves, and on the dial a move of the radius by log₂ b octaves.

`geometry.html` draws P, Q, the gap between them and the arc Q has traced (`[` `]` change b).

| The dial | The paper |
|---|---|
| the hub | the reader, the pivot: v/h = 0/0, no reading of its own |
| the needle's angle θ | the sweep; g = θ ÷ 90° |
| tan θ, the value ÷ unit (T) | the reading s = v/h |
| teal digits, within one unit | the front side: v in terms of h, plain proportion |
| blue digits, corners at 2ᵏ | the back side: h in terms of v, a count of octaves and a share in each |
| corners at 2⁻ᵏ (now marked) | the octave edges before the corner: halvings toward home |
| the mirror in the 45° line (P′, T′) | the flip s ↦ 1/s, which is g ↦ 1 − g |
| the window, N^r | the range of addresses, laid first |

- **g treats the two facings alike:** g(1/s) = 1 − g(s). ζ does not: ζ is the coordinate in which the gold's pushes add, and g is the coordinate in which the flip is a mirror.
- **The share** is min(v, h)/max(v, h). It is 1 at the corner and 0 at both ends. Octave k holds shares from 2⁻⁽ᵏ⁺¹⁾ to 2⁻ᵏ, with t = 2ᵏ⁺¹·share − 1 within it.
- **Orientation:** the dial draws h up the axis and v sideways; the paper draws h across and v up.

## Which way the lens is read

- **Calendar strips:** the list is on the circle and the screen is the line, so `x = s·tan(d)`. Neighbours spread apart toward the edges, as in a rectilinear lens.
- **The dial:** the list is on the line and the screen is the circle, so `θ = atan(Δ/unit)`. Far records crowd toward the horizon, as in a fisheye.
- **The road:** depth on the ground goes to the image plane, so `y = f·h/Z`. This is the pinhole camera, both directions at once.

## Two logarithms, kept apart

- The **radius** is a plain logarithm of scale: `window = N^r`.
- **ζ = asinh(tan θ)** is linear near the apex and `≈ ln(2 tan θ)` far out. The corners are evenly spaced in
  `log tan θ`. In ζ their gaps (0.562, 0.651, 0.682, 0.690, 0.692) only approach ln 2.
