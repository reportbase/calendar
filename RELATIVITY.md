# Special relativity, sorted

A working note beside `demos/one-boost.html`. It records what the page sorts and how the experiments that confirm
special relativity sort, with predictions first.

Tom, 21 Oct 2026: "we've explored these ideas in the calender repos. lets push these ideas there for now, see what falls
out." Then, to the next step, "proceed with both": open the PR, and sort the experiments.

## The sort

Each thing a boost changes is one of four kinds:

- **Address:** a direction or a ratio. It needs no unit, no clock's unit and no convention. Examples are aberration, the
  radar ratio k = √(t₂/t₁) = e^ζ, and relative rapidities.
- **Payload:** what arrives along an address, weighted. Examples are the Doppler factor D and its powers D², D³, D⁴; D² is
  the Jacobian of the address map.
- **Amount:** a number in a clock's, a rod's or a mass's unit. Examples are the proper time √(t₁t₂), a distance, an energy.
- **Convention:** a choice. Here that is Reichenbach's ε, which places a distant event.

The page checks every row live. Two results from it:
- ε never moves the corner (k = 1). It moves only the writer's horizons, the one-way light speeds.
- Velocities are points of hyperbolic space, and mass is the payload carried along them.

## The experiments: predictions

Written at 12:03 MDT on 21 Oct 2026, before any source was opened. Each prediction comes from the sort alone.

**Known beforehand.** The experimental tests of SR are generally held to be independent of the synchronisation
convention. Sources: the Robertson–Mansouri–Sexl test theory (Robertson 1949; Mansouri and Sexl 1977); Zhang 1997,
*Special Relativity and its Experimental Foundations*. What is new here is the sorting, not the independence.

- **X1. Every experiment reads a ratio at one place.** The ratio is one of: a direction, a frequency ratio (a payload
  weight), a ratio of two clocks brought together, or a round trip on one clock. *Killed* if an experiment's published
  result is a lone amount, one not compared within one unit.
- **X2. They sort as follows:**

  | Experiment | Predicted kind |
  |---|---|
  | aberration of starlight (Bradley 1729) | address |
  | Fizeau's moving water (1851) | address (rapidities add) |
  | Michelson–Morley (1887) | round trip, one clock |
  | Kennedy–Thorndike (1932) | round trip, one clock |
  | Ives–Stilwell (1938) | payload: D's transverse value 1/γ, from the mean of the forward and backward shifts |
  | muon lifetimes in flight (Rossi–Hall 1941; Bailey et al. 1977) | clocks compared at one place |
  | Hafele–Keating (1972) | clocks compared at one place |
  | Bertozzi (1964) | an amount ratio, E/mc², against a time of flight |
  | Rømer (1676) | a payload timing |
  | a claimed one-way speed of light (e.g. Greaves et al. 2009) | not one-way |

  *Killed* for any row placed differently once its method is read.
- **X3. No experiment depends on ε.** For the two candidates for one-way readings, Bertozzi's time of flight and Rømer,
  the dependence cancels or is fixed by a round trip in the apparatus (a cable delay calibrated by a pulse and its
  echo). *Killed* if one needs ε = ½ to state its result.
- **X4. γ enters only two ways.** It appears either through D (a payload weight) or as a ratio of proper times on a
  closed path: the twin, the muon at rest against the muon in flight, the clocks flown round and back. It never
  appears as a one-way "dilation" read across a distance. *Killed* if an experiment reads γ across a distance.

## Runs

### Run 1 (21 Oct, 12:09 MDT)

**Method.** A separate agent read each experiment's method; it was not told the predictions. It had full text of the
four critiques of Greaves et al. (arXiv) and Wikipedia's pages for each experiment. It had only a teaching sheet quoting
Bertozzi. It could not reach the primary papers for items 1–9. Where it relied on memory it said so, and those details
are marked "(memory)" below.

| Experiment | What was read, and where | Predicted kind | Scored |
|---|---|---|---|
| Bradley 1729 | the zenith distance of γ Draconis through the year, one zenith sector, one place | address | not killed |
| Fizeau 1851 | fringe shift on reversing the flow; both beams on one closed path through both tubes | address | **killed in its letter:** the reading is a round trip; the address (rapidities composing) is what it confirms, not what it reads |
| Michelson–Morley 1887 | fringe position at 16 azimuths, equal arms, one place | round trip | not killed |
| Kennedy–Thorndike 1932 | photographed fringes over months, unequal arms, one place | round trip | not killed |
| Ives–Stilwell 1938 | on one plate: the forward line, its mirror image (backward) and the undisplaced line; the forward and backward mean against the undisplaced | payload, the mean of the two shifts | not killed (the first-order, convention-sensitive term cancels between the two views) |
| Rossi–Hall 1941 | counting rates at two altitudes (Echo Lake, Denver), momentum selected by absorbers; no clocks | clocks at one place | **killed:** two places, no clocks |
| Bailey et al. 1977 | decays against time since injection on one time base, muons circling | clocks at one place (closed path) | not killed |
| Hafele–Keating 1972 | caesium clocks compared with USNO's before and after, side by side | clocks at one place | not killed |
| Bertozzi 1964 | two pulses on one oscilloscope through cables (cables 1 and 2), 8.4 m of flight; energy from the potential and a calorimeter | amount ratio against a time of flight | kind not killed; see X3 |
| Rømer 1676 | Io's eclipse times on one clock; the intervals longer while receding, shorter approaching | payload timing | kind not killed (the changing intervals are a Doppler of Io's period); see X3 |
| Greaves et al. 2009 | phase at one place as the light path varies, the return carried by a cable of assumed delay | not one-way | not killed (Finkelstein 2010; de Abreu and Guerra; Macdonald and Minguzzi; Klauber) |

**X1** (every experiment reads a ratio at one place): **killed by Rossi–Hall.** It compares counts at two places a
known height apart, a length carried in. Everything it reads is still unitless (a ratio of counts) or an amount in a
rod's unit (the height). No clock is read across the distance.

**X2** (the sorting): **killed for Fizeau and Rossi–Hall,** not killed for the other nine.

**X3** (no experiment depends on ε, the dependence cancelling for Bertozzi and Rømer): **killed for both.**
- In each, what is read at one place is ε-free: two pulses on one screen, eclipse times on one clock. But the published
  speed needs a synchronisation carried in.
- For Bertozzi it is the cable delays. Their calibration is unverified here: the primary paper was not reached, and a
  round-trip calibration was not found. Finkelstein's point against Greaves applies: a known delay "is only meaningful
  if one imagines having synchronized clocks at the two ends".
- For Rømer it is the Jupiter system used as a slowly carried clock (Zhang 1997, pp. 91–94; Karlov 1970), which is
  equivalent to ε = ½.
- The standard statement survives: every prediction SR makes for what is read is ε-free (Zhang 1997; Anderson,
  Vetharaniam and Stedman 1998). What depends on ε is the stated one-way speed, which is a writing.

**X4** (γ enters only through D or a closed path): **not killed in its letter, but incomplete.**
- Rossi–Hall reads neither γ nor a closed path. It reads a decay length in metres against a momentum. Its decay length
  is (p/m)·τ₀ = γβ·τ₀, so the confirmed quantity is the **celerity** γβ = sinh ζ, the dial's tan θ (GEOMETRY.md).
- The celerity needs no synchronisation: a rod's length over the muon's own clock (post hoc, from the standard decay
  law; to check against the paper).
- So there is a third route, and it is the dial's own variable.

**Reading.** Of the four predictions, X2's two misplacements and X1 came from guessing method from memory. X3's kill is
the useful one:
- SR's experiments read convention-free things at one place: directions, frequency ratios, round trips, clocks brought
  together, decay lengths.
- Every one-way speed in the record is a writing: a reading with a synchronisation carried in.
- That is the sort of `one-boost.html` (ε is the writer's choice) found in the experiments themselves.
- Nothing here is new physics: the ε-independence is classical. What the run adds is that each experiment lands in one
  of the page's kinds once its method is read.

**Open.**
- Bertozzi's cable calibration, from the primary paper (Am. J. Phys. 32, 551).
- Rossi–Hall's analysis, to confirm the celerity reading (Phys. Rev. 59, 223).
