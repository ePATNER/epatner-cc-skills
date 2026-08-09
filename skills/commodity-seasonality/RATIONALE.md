# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides designing a commodity seasonality strategy grounded in physical
supply/demand cycles (agricultural planting/harvest, energy heating/
driving-season demand, industrial inventory cycles), validating that the
hypothesis has an identifiable physical driver rather than being a purely
statistical historical pattern, and futures-specific risk considerations
for a small-capital operation.

## Why included

Found via fresh search after the previous firing logged a dry run
(equity calendar anomalies — day-of-week, January effect — were rejected
as too thin, per current research showing them largely arbitraged away or
inconsistent). Commodity seasonality is deliberately distinguished from
that rejected candidate: it has a physical, real-world basis (a harvest
happens on a schedule regardless of market awareness) rather than a purely
behavioral one, which is a categorically different and more durable claim.
It's also mechanistically distinct from every strategy archetype already
covered — none of the six prior archetypes (reversion, continuation,
carry, short-vol, earnings-drift, forced-fund-flow) are grounded in
physical production/consumption cycles.

## Extent of expected help

Commodity seasonality is a long-practiced, physically-grounded strategy
category, but the skill is explicit that physical grounding doesn't mean
guaranteed strength in any given year — weather, geopolitics, and demand
shocks create real year-to-year variability around the seasonal norm. The
more durable practical value flagged here is diversification: seasonal
commodity signals are reported to be meaningfully uncorrelated with
trend/carry-driven signals, which is useful for a multi-strategy book
specifically because it's a different underlying driver from the
directional/relative-value strategies already covered, not because the
seasonal signal itself is unusually strong.

## Key risks / limitations

- Different commodity classes (agricultural, energy, metals) have
  different physical cycles; the skill explicitly warns against treating
  "commodity seasonality" as one uniform pattern applicable across
  instrument types.
- A statistically-found seasonal pattern without an identifiable physical
  cause is closer in kind to the equity calendar anomalies rejected the
  prior firing — the physical-driver requirement is the bar that
  distinguishes this category, and it should be applied to any specific
  pattern considered, not just asserted once for the category as a whole.
- Futures (the standard instrument for this strategy) carry leverage and
  margin dynamics that change effective risk relative to nominal position
  size, a different consideration than the equity-focused position sizing
  guidance elsewhere in this repo.
- Current (2026) macro commentary describes a more bearish/oversupplied
  backdrop in some commodity markets, which affects the baseline level
  around which seasonal patterns fluctuate — historical seasonal
  strength doesn't automatically carry forward if the structural backdrop
  has shifted.
- This is strategy-design methodology, not investment advice, and does not
  guarantee that any specific commodity's seasonal pattern is currently
  tradeable or will hold in a given year.

## Sources consulted

Recent (2026) writeups on commodity seasonality mechanisms (agricultural
planting/harvest cycles, energy heating/driving-season demand, industrial
metals inventory cycles), commentary specifically distinguishing which
seasonal patterns still hold versus which have weakened, and 2026
commodities market outlook context. Described here in original wording; no
code or text copied from any source.
