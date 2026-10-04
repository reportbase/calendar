# Demos

Standalone pages, one idea each, pulled out of the draw project's labs and instruments (`draw.html`).
Each opens straight in a browser with no dependencies.

| Page | What it shows | From draw.html |
|---|---|---|
| `breadth-and-density.html` | Each octave (½c to 2c round its corner c) read as a whole sweep: r = 2(s − ½)/(2 − s), the one Möbius map sending ½c, c, 2c to 0, 1, ∞, fair to the facings unasked (r(1/s) = 1/r(s)), g = (2/π)·atan r. Outside, additive: place = n + g, every octave the same width, without end (breadth). Inside, recursive: r has its own octaves, each a sweep again, so a value's address is (n; j₁, j₂, …) (density). Two strips lay the octave by g and by the share. | built here, from Tom's reading of 4 October: "recursive within an octave and additive outside"; "the recursion is the density" |
| `octave-browser.html` | Time back from now, read as *Serial, Parallel and Nowhere* says a situated reader holds a reading: every octal built as R167 builds the reader's own: one octave, two facings, ½c to 2c, split by its own corner c into a front (v in terms of c) and a back (c in terms of v), each half plain proportion of the share. Octals meet at their edges, so corners are 4× apart; the home octal is drawn widest, each beyond it narrower. The reading is (octal, side, t). Leave the home octal and the view carries one octal: h ×4 or ÷4. Held past the edge, it keeps carrying. | built here, from §3.3, R167 and Proposition 3.8 |
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

Notes carried into the pages:

- Read evenly in direction, a shape's readings are tan a whatever the shape: the reach cancels. The circle coming back is by construction; the point is that the addresses carry no shape.
- In the standpoint demo, Π ρ = 1 is telescoping and holds from any standpoint; the content is in the winding and in ΣD.
- The drum counts octaves the way §3.3 of the paper does (octave 0 is the reader's own, from ½ to 2). In `draw.html` the cascade drum and the serial panel disagree at exact powers of two; these demos use the paper's convention throughout.
- In the register demo the bounded rule ("ignore what you cannot span") is worse than railing on a spiky shape: once the held value is out of reach, every later look on the spike is too, and the lag grows to tens of steps. The page shows this rather than the improvement the draw project hoped for.
- Four quadrant entries is necessary for convexity, not sufficient.
