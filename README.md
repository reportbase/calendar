# calendar

A navigation dial for very long lists, and the geometry it is made of. The dial reads a list through a tangent lens: its
needle's angle from the apex is the sweep **g** (0 at home, ½ at the corner, 1 at the horizon), the value is the
tangent, and the radius sets the window as a power of the list's length. The pages here are the dial, its geometry,
a calendar built on it, and standalone demos of ideas from the wider project.

**Live site: https://reportbase.github.io/calendar/** (the index links every page)

Every page is a single self-contained HTML file with no build step and no dependencies. Open any of them straight
in a browser, locally or on the site.

## The dial

| Page | |
|---|---|
| [geometry.html](https://reportbase.github.io/calendar/geometry.html) | The navigation dial beside its figure: centre, circle, tangent and hyperbola, with g, the flip, the octaves and the shape being expressed as the needle sweeps. |
| [dial-calendar.html](https://reportbase.github.io/calendar/dial-calendar.html) | The dial as a calendar: the scale rests on second, minute, hour, day, week, month and year, and notes are marks on the arc. |
| [calendar.html](https://reportbase.github.io/calendar/calendar.html) | The fisheye calendar: years, months, days and half hours as strips, with a note per half hour. |
| [dial.html](https://reportbase.github.io/calendar/dial.html) | The minimal dial: a century of milliseconds on one half-disc. |
| [city-dial.html](https://reportbase.github.io/calendar/city-dial.html) | The dial over a road and a city generated from the address, on a list of 2⁵³ − 1 records. |

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
