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

## Which way the lens is read

- **Calendar strips:** the list is on the circle and the screen is the line, so `x = s·tan(d)`. Neighbours spread apart toward the edges, as in a rectilinear lens.
- **The dial:** the list is on the line and the screen is the circle, so `θ = atan(Δ/unit)`. Far records crowd toward the horizon, as in a fisheye.
- **The road:** depth on the ground goes to the image plane, so `y = f·h/Z`. This is the pinhole camera, both directions at once.

## Two logarithms, kept apart

- The **radius** is a plain logarithm of scale: `window = N^r`.
- **ζ = asinh(tan θ)** is linear near the apex and `≈ ln(2 tan θ)` far out. The corners are evenly spaced in
  `log tan θ`. In ζ their gaps (0.562, 0.651, 0.682, 0.690, 0.692) only approach ln 2.
