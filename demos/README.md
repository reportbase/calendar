# Demos

Standalone pages, one idea each, pulled out of the draw project's labs and instruments (`draw.html`).
Each opens straight in a browser with no dependencies.

| Page | What it shows | From draw.html |
|---|---|---|
| `two-fisheyes.html` | Two views of one array disagree about positions and distances but agree about cross ratios, so one number sends an element across. Break one view's chart and a fourth element catches it. | lab "two fisheyes on one array" (`TWO_FISHEYES_CORE`, `startFisheyes`) |
| `cycle-sheet.html` | Parties with no common unit. One ground explains the readings exactly when every cycle closes; otherwise the readings split into a ground and what goes round. | lab "the cycle sheet" (`startCycle`) |
| `standpoint.html` | Read a closed contour from a point you drag. The winding jumps by whole turns only when the point crosses the contour; ΣD, twice the area, never moves; Π ρ is always 1. | lab "the closure sheet" (`startClosure`) and the four atoms (`fourAtomRead`) |
| `shapes-come-home.html` | Read evenly in direction, every shape gives the circle's readings and the unit circle comes back; read along its outline, the shape shows, mostly at the two ends. | labs "the recovered circle", "open the shapes", "sampling tests"; *Serial, Parallel and Nowhere* §2.4 |
| `three-rulers.html` | One reading v/h on the folded dial (octaves or register cells, odd or even), the unfolded strip (y = g) and the octave-counting drum. | `drawHeadDial`, `drawSerialPanel`, `drawCascadePanel` |
| `register.html` | A reader holding one value reads each new distance as a ratio, one register cell at a time. Odd registers can say "unchanged" (a cell on the corner); even ones cannot and twitch. The checksum walk comes home; a rail costs lag, not closure. | base rule (`baseRuleRead`, `boundedRuleRead`), the register strip, the checksum |
| `convexity.html` | Keep only the tangent's quadrant: a convex loop enters each quarter once. More than four entries proves a dent; four does not prove convexity, and a shallow dent shows why. | the bearing-quadrant leaf paint |
| `unicode.html` | A Unicode browser on the fisheye: blocks on one strip, the code points of the focused block on a two-axis fisheye grid, search by block name or hex, and a panel for the chosen character. | added as is |
| `tns.html` | *Continuous curves on the arc*: the standard number line over 37 bottom views, chosen from the menu: slope charts and waves, the bridge theorem's K_N reconstruction, one to four atoms, v₁ v₂ h, the pointing sphere, the fold, torus vs sphere, the bouquets, the aperture atom, the beam, the sky under boost, radar, the trit, the Wigner turn, three gaps and ?(x). | added as is |
| `replace-the-rings.html` | *Replace the rings*: The sweep lays addresses and never looks at what sits at them: swap the payloads and the addresses and their Cauchy stay put. | added as is |
| `ladder.html` | *From somewhere to nowhere*: A bar of 1 sweeps through home, corner and horizon; the rungs show what the view from nowhere adds, and what each one needs. | added as is |
| `blind-spots.html` | *Where it cannot see*: A still reader holds only addresses (jumps and edges); tap a place and it answers whether it can see it. | added as is |
| `two-readers.html` | *Two models of observation*: One reader circles a shape: kept payloads go stale when the shape changes; bearings held now do not. | added as is |
| `one-boost.html` | *One boost, sorted*: a Lorentz boost of rapidity ζ taken apart into what is an address (aberration, a slide of ζ on ln tan(θ/2); the radar ratio k = e^ζ), a payload (D, D², D⁴, each a power of the address map's Jacobian), an amount (the proper time √(t₁t₂), the distance) and a convention (ε, which γ and β read off the pair depend on). ε = ½ is the only choice that writes the speed odd under k ↦ 1/k; it moves the writer's horizons (the one-way light speeds), never the corner. Moving things: velocity a point of the hyperbolic plane (address, relative rapidities unchanged by any boost), mass the payload, energy an amount. Every row checked live. | new (from wander's address/payload split; Tom, 21 Oct 2026) |
| `two-pushes.html` | *Two pushes, one turn*: the dial in two dimensions with true boosts. Each push is along the reader's own axes; a loop back to rest turns the frame by minus the hyperbolic area its velocity path encloses (Thomas; Gauss–Bonnet at curvature −1), checked live when the velocity returns to rest; pushes along one line never turn. | new (RELATIVITY.md, W1–W4) |

Notes carried into the pages:

- Read evenly in direction, a shape's readings are tan a whatever the shape: the reach cancels. The circle coming back is by construction; the point is that the addresses carry no shape.
- In the standpoint demo, Π ρ = 1 is telescoping and holds from any standpoint; the content is in the winding and in ΣD.
- The drum counts octaves the way §3.3 of the paper does (octave 0 is the reader's own, from ½ to 2). In `draw.html` the cascade drum and the serial panel disagree at exact powers of two; these demos use the paper's convention throughout.
- In the register demo the bounded rule ("ignore what you cannot span") is worse than railing on a spiky shape: once the held value is out of reach, every later look on the spike is too, and the lag grows to tens of steps. The page shows this rather than the improvement the draw project hoped for.
- Four quadrant entries is necessary for convexity, not sufficient.
