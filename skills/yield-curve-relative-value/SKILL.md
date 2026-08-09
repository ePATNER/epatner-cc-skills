---
name: yield-curve-relative-value
description: Use when designing a relative-value strategy across the interest-rate term structure — steepener/flattener trades betting on how the yield curve's shape changes, or a roll-down/carry trade betting the curve's shape stays stable — a strategy dimension defined by duration and curve-shape risk, distinct from every equity/crypto/commodity strategy archetype already covered in this repo.
---

# Yield Curve Relative Value

Where [[statistical-arbitrage-pairs-trading]] trades the spread between
two related instruments and [[funding-rate-arbitrage]] trades a carry
payment, this strategy family trades the *shape* of the interest-rate
term structure itself — betting on how the spread between short- and
long-maturity yields changes (or stays put), with duration and curve-shape
risk as the defining exposure rather than a single instrument's price.

## Core constructions

- **Steepener**: long a shorter-maturity instrument, short a longer-
  maturity one (or the equivalent via futures/rates products) — profits if
  the spread between long- and short-term yields widens.
- **Flattener**: the reverse position — profits if that spread narrows.
- **Duration-neutral vs. duration-directional construction**: a
  steepener/flattener can be built to have zero net duration exposure
  (isolating the curve-shape bet from a bet on the overall level of
  rates), or to carry directional duration exposure on top of the
  curve-shape view — decide explicitly which is intended, since they have
  different risk profiles even when both are labeled "steepener."
- **Roll-down/carry trades** bet that the curve's shape stays stable over
  the holding period, profiting as a bond's yield "rolls down" a fixed
  curve toward maturity — this is a different bet than a directional
  steepener/flattener view (which bets the curve's shape *changes*); a
  stable-curve assumption is itself the thing being risked.

## What determines whether the trade works

- **A roll-down/carry trade specifically requires the curve shape to
  stay stable over the holding period** — if the curve shifts
  significantly during the trade, the roll-down assumption breaks and the
  trade's economics change; this needs to be monitored as an ongoing
  condition, not assumed to hold for the full intended holding period.
- **The yield spread being captured must exceed realistic transaction
  costs** (bid/ask spreads, commissions) for the trade to be worth
  putting on at all — this is the same discipline as
  [[transaction-cost-slippage-modeling]] applied to rates-specific
  instruments, where spreads and liquidity vary by maturity and
  instrument type.
- **Macro/policy context sets the backdrop for which curve view is
  favored** — central bank rate-cutting/hiking cycles and their expected
  trajectory materially affect whether steepening or flattening is the
  more probable near-term path; this connects to
  [[macro-nowcasting-economic-surprises]] rather than being a
  standalone technical read of the curve's current shape.

## Fit for a small-capital operation

- **Treasury/government bond futures are the standard, most accessible
  instrument for expressing curve views** without needing to hold or
  finance the underlying bonds directly — more practical for limited
  capital than constructing the position from cash bonds.
- **Duration and leverage embedded in rates instruments mean a given
  notional size carries meaningfully different risk than the same
  notional in an equity position** — size using the position's actual
  duration-adjusted risk (see [[position-sizing-risk-management]]), not
  face value, since rates instruments can imply outsized effective
  exposure relative to the capital committed.

## Guardrails

- Don't conflate a steepener/flattener directional view with a roll-down/
  carry trade — they're different bets (curve shape changing vs. curve
  shape staying put) that happen to use similar-looking instrument
  combinations; be explicit about which one is actually being put on.
- Validate any systematic curve strategy against realistic, point-in-time
  historical yield curve data with proper walk-forward discipline (see
  [[purged-cv-backtesting]]) — curve dynamics are regime-dependent (see
  [[regime-detection]]) and a strategy tuned to one rate-cycle phase may
  not transfer to another.
- This is strategy-design methodology, not investment advice; rates
  instruments carry duration, leverage, and liquidity characteristics that
  differ meaningfully from equities and require their own risk
  understanding, not a direct carryover of equity-strategy intuition.
