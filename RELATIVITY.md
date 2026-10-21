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

### Run 2 (21 Oct, 12:35 MDT): the two open items

**Rossi–Hall, from the paper's own words.** Bonizzoni and Giuliani (arXiv:physics/0008012, 2000, §5.2.1) quote Rossi
and Hall 1941, pp. 223–224, directly:
- Their eq. (26) is τ = τ₀/(1 − β²)^½.
- Their eq. (27) is "the 'average range before decay' L … L = βτ = pτ₀/µ, where µ is the mass and p … the momentum".
- They wrote that the experiments "were primarily designed to test the dependence of disintegration probability on
  momentum expressed by equation (27)".
- And at p. 227: "while a quantitative proof of equation (26) is still wanting, its approximate validity may be
  considered as established".

So what they tested was the decay length against momentum, L/τ₀ = p/µ = γβ, the celerity. γ alone (eq. 26) they say
was not proved. X4's third route is the paper's own; it is no longer post hoc. The momentum came from range in
absorbers, and the length from the altitudes: a rod's unit and the muon's own clock, no synchronisation.

**Bertozzi: the calibration still unread.**
- The primary paper (Am. J. Phys. 32, 551) was not reachable here. The full-text mirror the teaching sheet cites
  (spiff.rit.edu) does not resolve, and an Italian teaching sheet (Roma Tre) describes the two pulses and the
  oscilloscope but not the cables.
- So how the delays were matched stays open.
- The convention question does not wait on it. A synchronisation shift t′ = t − κx, with κ = 1 − 2ε and c = 1:
  - moves every one-way speed by v ↦ v/(1 − κv);
  - keeps their order (v < 1 exactly when v′ < c₊′ = 1/(2ε));
  - leaves every round trip unchanged.

  Checked in exact fractions at ε = 1/5, ½, 7/10 and v = 0.1, 0.9, 0.999.
- So Bertozzi's ordinal result is a reading, whatever the cables: no electron outran light along the same path. Its
  numbers, the speeds and the curve of E against v, carry the synchronisation in, whatever the calibration was. A
  matched pair of cables is itself a synchronisation (Finkelstein's point).
- The X3 kill stands.

**Where the record now stands.**
- X1 killed (Rossi–Hall, two places).
- X2 killed for Fizeau and Rossi–Hall.
- X3 killed for Bertozzi's and Rømer's numbers, not their order.
- X4 not killed: there are three routes, D, closed paths and the celerity.

What is read at one place, or as an order, is always convention-free. A one-way number is always a writing.

## SR and OFS: the same mathematics in two roles (a research note)

Tom asked: "so why SR something special, it just the same math as OFS?" Claude answered that the mathematics is shared and
what is special is that nature realises it, with a measured c. ChatGPT (via Tom) sharpened this: the question is whether
one mathematical structure serves two roles, a geometry for organising readings and a geometry for physical
relationships. This note keeps what is established apart from what is proposed. It is not part of OFS.

**Established mathematics (classical):**
- The gudermannian joins the circle and the hyperbola: θ = gd(ζ), tan θ = sinh ζ, sin θ = tanh ζ.
- Collinear rapidities add. Velocity space is hyperbolic (Varićak 1910).
- Lorentz transformations act on the celestial sphere as Möbius maps, PSL(2, ℂ) (Penrose 1959; Terrell 1959). On the
  reading line the turns and rescalings are PSL(2, ℝ).
- At γβ = 1: β = 1/√2, γ = √2, pc = mc², ζ = asinh 1 ≈ 0.8814. This is exact.
- A uniform sky boosted is a spherical Cauchy (Kato and McCullagh 2020).

**Proposed, each needing its own argument:**
- *That OFS's corner and SR's γβ = 1 play the same structural role.* The equality of the numbers is exact. That the
  reciprocal's fixed point (OFS) and the momentum–mass balance (SR) are one thing still has to be argued, by a matching
  of what each divides by what.
- *That SR's horizon is OFS's horizon, with c the bridge carried in.* c is an amount, measured; OFS's horizon has no
  value. That light realises the reader's horizon is an interpretation.
- *That SR carries the address/payload split without naming it.* This would need a precise map, row by row, from SR's
  quantities to the four kinds. `demos/one-boost.html` is a first one, for one boost.
- *That the sky's Cauchy is OFS's Cauchy.* Not automatically. The uniform sky lives on S²; OFS's turn on a circle. They
  match on a great circle, and in the stereographic chart for a circle sky. A sphere sky's single signed coordinate is
  not Cauchy (quartiles ±1/√3; wander's `plans/archive-gems.md`, C1). The measure and the projection have to be matched
  case by case.

**Where they differ:**
- OFS reaches its horizon in a bounded quarter turn; SR composes in an unbounded rapidity, so its horizon takes
  infinite pushing.
- OFS's horizon carries no value; SR's carries c.
- One reader's group commutes; the Lorentz group does not (the Wigner turn).
- SR has dynamics, which in this sort are payload and amounts.

**The question carried forward.** Should a reader compose its sweeps additively in an unbounded parameter, as rapidity
does and as the calendar dial does, rather than in a bounded angle? This is a concrete bridge between the two
frameworks, and it stays out of the current OFS paper.

**The possibility worth testing** is not that SR is secretly OFS. It is that the same mathematics, used for both the
reading and the thing read, can hide a distinction OFS names. The test is whether naming it adds explanatory power, and
one-boost's ε result (the convention is the writer's, never the reader's) is the first candidate.

## The corner, matched

Tom: "proceed", on the note's first open item: does OFS's corner play the same role as SR's γβ = 1, argued by matching
what each divides by what?

**Known beforehand** (wander, `plans/emc-plan.md`):
- E² = (pc)² + (mc²)² is the unit circle in the one unit E, with h = mc²/E = 1/γ and v = pc/E = β.
- Newton's form and the ultra-relativistic form are exchanges of each other, e_N(x) = e_U(1/x).
- They hand over at the corner pc = mc², both √(9/8) − 1 = 6.07% high.

**Predictions** (written at 13:18 MDT, before the checks):
- **C1. The reading.** On that circle the reading is s = v/h = pc/mc² = γβ, the celerity, which is the dial's tan θ. The
  corner s = 1 is β = 1/√2 for every mass.
- **C2. Two motions, one quarter circle.** A boost at fixed m moves along the readings with ζ, s = sinh ζ. A turn at
  fixed E moves along the same readings with θ, s = tan θ: it changes the split of E between mass and momentum, which is
  another particle, not another frame. The two meet at every reading through θ = gd(ζ). The calendar dial is this
  change of parameter.
- **C3. The exchange is not a symmetry of SR.** No element of the 1+1 Lorentz group, parity and time reversal
  included, maps s to 1/s for every s:
  - a boost is ζ ↦ ζ + a;
  - a reflection is ζ ↦ −ζ, which gives s ↦ −s;
  - mc² is invariant and pc is not.

  So SR's corner is the reciprocal's fixed point of a reading, but not the fixed point of a symmetry the reader cannot
  detect, which it is in OFS. *Killed* if some element maps s ↦ 1/s.
- **C4. Under additive composition the corner is not the median.** Readings taken uniformly in ζ over [0, Z] put
  P(s ≤ 1) = asinh(1)/Z. That is ½ only at Z = 2·asinh 1 ≈ 1.7627, so the median moves with the reach. Readings
  uniform in θ over the quarter turn keep the median at the corner whatever happens (OFS Proposition 5(d)). *Killed*
  if the ζ-uniform median sits at s = 1 for more than one Z.
- **C5. What survives.** The corner's role as where the two regimes hand over (EMC P3) holds under either motion, since
  it is a fact about the reading s, not about the measure.

So the predicted answer is half a match. The same reading has the same fixed point under the exchange, and the
regimes swap there. But the corner's role as a median, and as a symmetry of the reader's ignorance, belongs to OFS's
uniform turn, not to SR's boosts.

### Run (21 Oct, 13:19 MDT), `checks/corner.py` (output `checks/corner.out`), mpmath at 50 digits

Nothing killed.

| | Result |
|---|---|
| C1 | h² + v² = 1 and v/h = γβ to 10⁻⁵⁰ over β ∈ (0, 1); γβ = 1 at β = 1/√2 exactly |
| C2 | tan(gd ζ) = sinh ζ to 2·10⁻⁴⁹: the boost and the turn meet at every reading |
| C3 | no boost or reflection gives s ↦ 1/s; the least residual over a ∈ [−10, 10], both signs, is 2.6. The mass is unchanged by a boost (m² = 1 before and after) and the momentum is not (pc 2 → 4.21) |
| C4 | uniform in ζ on [0, Z]: P(s ≤ 1) = 0.881, 0.500, 0.294, 0.147 at Z = 1, 2·asinh 1, 3, 6; uniform in θ: 0.5 |
| C5 | e_N(x) = e_U(1/x) to 7·10⁻⁴⁹; both 0.0606602 at the corner |

**Answer: half a match, and the half that differs is the useful part.**
- **What matches.** OFS's corner and SR's γβ = 1 are the same reading's fixed point under the exchange. The reading is
  the celerity pc/mc², and the regimes hand over there (Newton near, massless far).
- **What does not.**
  - In OFS the exchange is a symmetry the reader cannot detect, part of its ignorance, and with the uniform turn the
    corner is also the median. In SR the exchange swaps an invariant (mass) for a frame's quantity (momentum), so it
    is no symmetry of the theory.
  - SR's own motion, the boost, composes additively in ζ. Under it the corner is the median only for one reach of the
    window.
  - The turn that keeps the corner at the median is a turn at fixed energy. It changes which particle, not which frame.
- **So the two roles ChatGPT asked about are separable, and differ.** One quarter circle of readings is traversed by two
  motions: SR's boost, uniform in ζ, and OFS's turn, uniform in θ. The gudermannian, which the calendar dial runs on,
  is the change between them. The corner is common to both. Its standing as a median belongs to the turn alone.

**For the question carried forward** (should a reader compose additively in ζ?):
- The dial does, and gains a horizon that is never reached and additive pushes.
- It pays for that: its corner is no longer the median of a uniform sweep. A dial whose window reaches 2^K (rungs to
  tan θ = 2^K) has the corner as the median of uniform pushes only if its reach is Z = 2·asinh 1. At K = 5,
  Z = asinh 32 ≈ 4.16, and the share of pushes inside the corner is 0.212.
- That is a design trade, not a flaw. Neither motion is wrong; they answer different questions.
