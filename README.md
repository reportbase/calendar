# calendar

A navigation dial for very long lists, and the geometry it is made of. The dial reads a list through a tangent lens: its
needle's angle from the apex is the sweep **g** (0 at home, ½ at the corner, 1 at the horizon), the value is the
tangent, and the radius sets the window as a power of the list's length. The turn lays heat over the list, not
addresses: the needle's turn per record is cos²θ, finest at home and half at the corner (the Cauchy, as a heat map);
the records' own indices are the writer's. The dial is [geometry.html](geometry.html); earlier dials are archived, and
standalone demos of ideas from the wider project follow.

**Live site: https://reportbase.github.io/calendar/** (the index links every page)

Every page is a single HTML file with no build step and no dependencies; the dial pages load `dial.js` from beside
them. Open any of them straight in a browser, locally or on the site.

## The dial

| Page | |
|---|---|
| [geometry.html](https://reportbase.github.io/calendar/geometry.html) | The navigation dial beside its figure: centre, circle, tangent and hyperbola, with g, the flip, the octaves and the shape being expressed as the needle sweeps. |
| [dial-demo.html](https://reportbase.github.io/calendar/dial-demo.html) | The dial reused: `Dial.mount` over 2⁵³ − 1 numbered records, and nothing else. |
| [horizon.html](https://reportbase.github.io/calendar/horizon.html) | The horizon: the dial holding a thumb instead of a count, over a road of posts without end. Within one thumb the posts read in proportion, past it as ratios (one in 2, 4, 8 …); a steady push walks out by a steady ratio and never reaches 90°. The quarter turn's 256 cells are painted by the first post each meets; the writer's count shows how many each covers, without end in the last. |
| [dome.html](https://reportbase.github.io/calendar/dome.html) | The dome: the horizon dial with one more degree of freedom, `dome.js`. One thumb above a floor without end, looking down: home is straight down, the rim the horizon all round; lean to walk out in any heading, in proportion within one thumb and as ratios past it. Lambert's equal-area disc in 48 rings × 96 turns, each cell painted by what its middle direction meets; the heat, cos³α, as dashed rings. |
| [dome-map.html](https://reportbase.github.io/calendar/dome-map.html) | The dome over OpenStreetMap: one thumb above the map, looking down. Out to one thumb the map is in proportion, undistorted, filling the middle half of the radius; past it each doubling of distance gets half the room of the last, the whole world before the rim. Each point reads the tile its footprint earns, streets under you and coarser toward the horizon, from a few dozen tiles. Drag to move the map (it coasts), tap to fly there, wheel or pinch for the thumb. `?lat=&lon=&H=`. |
| [dome-instrument.html](https://reportbase.github.io/calendar/dome-instrument.html) | The dome, played: a pitch spiral. Round is the note (twelve clockwise from the top), out is the octave, the thumb's ring the tonic; every note the same room on the disc (or every octave the same width). Each finger is a voice; snap to a scale or glide; keys a–l play the scale. "Endless" makes every voice a Shepard tone, so round the spiral rises for ever and never arrives: the dial's horizon heard. "Chord" makes a finger a chord on the scale (turning it transposes); "just" tunes to whole-number ratios; "rec" loops what you play. Web Audio. |

### The Dial class — [dial.js](dial.js)

The dial is a class any page can use: a classic script, so `<script src="dial.js"></script>` works from disk or the
site. A page that is only the dial:

```js
const dial = Dial.mount(canvas, {
  count: 1e9,                                   // the list's length: records 0 … count − 1
  index: 0,                                     // where to start
  label: i => [[['#' + Math.round(i), 1]]],     // a record as lines of [text, step] parts, coloured by step
});
dial.goTo(5e8); dial.widen(0.1);                // and read dial.index, dial.heat(), dial.sweep() …
```

A page that shares its canvas with something else (as geometry.html does with its figure) makes `new Dial(opts)`,
calls `layout({ cx, cy, R })`, `step(now)` and `draw(ctx, now)` each frame, and routes the hands to `press`, `drag`,
`release`, `pinchStart`, `pinchTo`, `wheel`, `key` and `keyUp`. The options are listed at the top of dial.js.

Given `H` (a thumb) instead of `count`, the dial has no end: it turns from home toward a horizon it never reaches, the
record is H · tan θ, and the wheel changes the thumb with the needle held still (horizon.html).

## Archived dials — [archive/](archive/)

Earlier dials, kept as they were. Since 7 November 2026 geometry.html is the dial.

| Page | |
|---|---|
| [archive/dial-calendar.html](https://reportbase.github.io/calendar/archive/dial-calendar.html) | The dial as a calendar: the scale rests on second, minute, hour, day, week, month and year, and notes are marks on the arc. |
| [archive/calendar.html](https://reportbase.github.io/calendar/archive/calendar.html) | The fisheye calendar: years, months, days and half hours as strips, with a note per half hour. |
| [archive/dial.html](https://reportbase.github.io/calendar/archive/dial.html) | The minimal dial: a century of milliseconds on one half-disc. |
| [archive/city-dial.html](https://reportbase.github.io/calendar/archive/city-dial.html) | The dial over a road and a city generated from the address, on a list of 2⁵³ − 1 records. |

## Demos — [demos/](demos/)

Standalone pages, one idea each, pulled out of the draw project's labs. See [demos/README.md](demos/README.md).

| Page | |
|---|---|
| [two-fisheyes.html](https://reportbase.github.io/calendar/demos/two-fisheyes.html) | Two views of one array disagree about positions and agree about cross ratios: one number sends an element across. |
| [cycle-sheet.html](https://reportbase.github.io/calendar/demos/cycle-sheet.html) | Parties with no common unit: one ground explains the readings exactly when every cycle closes. |
| [standpoint.html](https://reportbase.github.io/calendar/demos/standpoint.html) | The winding jumps by whole turns as the standpoint crosses the contour; twice the area never moves. |
| [shapes-come-home.html](https://reportbase.github.io/calendar/demos/shapes-come-home.html) | Read evenly in direction, every shape returns the unit circle; read along its outline, the shape shows at its ends. |
| [three-rulers.html](https://reportbase.github.io/calendar/demos/three-rulers.html) | One reading on the folded dial, the unfolded strip (y = g) and the octave-counting drum. |
| [register.html](https://reportbase.github.io/calendar/demos/register.html) | Odd registers can say "unchanged", even ones cannot; the checksum walk, rails and lag. |
| [convexity.html](https://reportbase.github.io/calendar/demos/convexity.html) | Two bits of tangent quadrant: four entries for a convex loop, and the dent two bits cannot see. |
| [unicode.html](https://reportbase.github.io/calendar/demos/unicode.html) | A Unicode browser on the fisheye: a strip of blocks over a grid of code points, with search and a character panel. |
| [tns.html](https://reportbase.github.io/calendar/demos/tns.html) | Continuous curves on the arc: one standard number line over 37 bottom views, from the atom and the bridge theorem to the pointing sphere, the bouquets, the sky under boost, radar, three gaps and ?(x). |
| [replace-the-rings.html](https://reportbase.github.io/calendar/demos/replace-the-rings.html) | The sweep lays addresses and never looks at what sits at them: swap the payloads and the addresses and their Cauchy stay put. |
| [ladder.html](https://reportbase.github.io/calendar/demos/ladder.html) | A bar of 1 sweeps through home, corner and horizon; the rungs show what the view from nowhere adds, and what each one needs. |
| [blind-spots.html](https://reportbase.github.io/calendar/demos/blind-spots.html) | A still reader holds only addresses (jumps and edges); tap a place and it answers whether it can see it. |
| [two-readers.html](https://reportbase.github.io/calendar/demos/two-readers.html) | One reader circles a shape: kept payloads go stale when the shape changes; bearings held now do not. |
| [one-boost.html](https://reportbase.github.io/calendar/demos/one-boost.html) | One Lorentz boost sorted into address, payload, amount and convention: directions move by one Möbius map, the payload's weights are that map's Jacobian, the radar ratio k reads the boost, and γ and β need ε = ½. ε moves the writer's horizons, never the corner; a moving thing's velocity is a point of hyperbolic space (the address), its mass the payload. |
| [two-pushes.html](https://reportbase.github.io/calendar/demos/two-pushes.html) | A two-dimensional SR dial: pushes along the reader's own axes; a loop back to rest turns the frame by minus the velocity loop's hyperbolic area (Thomas precession), checked live. Pushes along one line never turn. |

## Sweeps — [dials/](dials/)

| Page | |
|---|---|
| [fisheye-sweep.html](https://reportbase.github.io/calendar/dials/fisheye-sweep.html) | The situated reader's sweep: proportion from home to the corner, then one step per doubling. |
| [breadth-sweep.html](https://reportbase.github.io/calendar/dials/breadth-sweep.html) | Known breadths with one, two, four or eight facings: quarter circle, semicircle, circle, sphere. |
| [grow-or-slide.html](https://reportbase.github.io/calendar/dials/grow-or-slide.html) | Two things alike in outline; follow the address back to see which grows and which slides. |
| [pivot-and-sweep.html](https://reportbase.github.io/calendar/dials/pivot-and-sweep.html) | The reader as the pivot: a bar of 1 turned from home to the horizon, with g, the flip, and carrying out one octave at a time. |

## Vocabulary

[GEOMETRY.md](GEOMETRY.md) fixes one vocabulary for the comments in these files: geometry names first (angle,
tangent, hyperbola), with the names relativity, cartography and optics use for the same objects in brackets, and the
terms of *Serial, Parallel and Nowhere* (home, corner, horizon, the sweep g, octaves, the flip).

## Running it

- **On the web:** the site above, served by GitHub Pages from the `main` branch.
- **Locally:** clone the repository and open `index.html`, or any page, in a browser. Nothing to install.

To serve the site from a fork: in the repository's **Settings → Pages**, set **Source** to *Deploy from a branch*,
the branch to `main` and the folder to `/ (root)`. The site appears at `https://<owner>.github.io/<repo>/` a minute
or two after each push to `main`.
