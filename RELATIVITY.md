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
