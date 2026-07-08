---
name: position-sizing-risk-management
description: Use when deciding how much capital to put behind a signal or strategy — sizing individual positions, capping total exposure across concurrent positions, and setting rules for cutting size during a drawdown — for an account where a small number of bad outcomes could end the operation, not just dent it.
---

# Position Sizing & Risk Management

A validated edge (see [[purged-cv-backtesting]]) still loses money if it's
sized wrong. Sizing is not an afterthought bolted onto a strategy — for a
small account, it's frequently the deciding factor in whether a genuine
edge survives long enough to compound, or gets wiped out by variance before
it has a chance to.

## Sizing an individual position

- **Kelly criterion gives the growth-optimal fraction, but full Kelly is
  too aggressive for real use.** It requires known, stable edge and payoff
  ratios — both are estimated with error in practice — and full Kelly
  sizing produces large, uncomfortable drawdowns even when the edge estimate
  is exactly right.
- **Use fractional Kelly, not full Kelly.** Half-Kelly captures roughly
  three-quarters of the optimal growth rate while cutting drawdown risk
  substantially; quarter-Kelly is more appropriate with limited calibration
  data (rule of thumb: stay conservative — quarter-Kelly or smaller — until
  there's a meaningful sample of realized trades, on the order of dozens,
  behind the edge estimate).
- **Fixed-fractional risk (e.g. 0.5-2% of capital per trade) is a simpler,
  more robust default** than trying to estimate Kelly inputs precisely,
  especially early on with limited data — it caps the damage from any
  single bad trade without requiring a trustworthy edge/payoff estimate.
- **Adjust size to current volatility, not a static amount.** Size
  positions so that a fixed dollar/percentage risk corresponds to a
  volatility-scaled stop distance (e.g. ATR-based) — this keeps risk-per-
  trade roughly constant as an instrument's volatility regime changes,
  rather than letting exposure balloon in a suddenly-calm market or shrink
  precisely when opportunity is highest.

## Managing risk across the whole book

- **Cap total portfolio heat, not just per-trade risk.** Track total
  capital at risk across all concurrent open positions and keep it within
  a bounded range (a common heuristic is roughly 4-8% of capital at risk
  across all open positions combined) — several small, individually-safe
  positions can still combine into an outsized correlated loss if they move
  together.
- **Account for correlation between concurrent positions explicitly** —
  portfolio heat calculated naively (summing independent per-trade risk)
  understates real risk when positions are correlated, which is the normal
  case for related instruments or a market-wide shock.
- **Reduce size mechanically during a drawdown, don't rely on discretion in
  the moment.** Pre-commit to a rule (e.g. cut size at a defined drawdown
  threshold, pause new entries past a deeper one) — the goal during a
  drawdown is survival, not doubling down to recover losses quickly, and a
  rule decided in advance is more reliable than a decision made under
  stress.
- **Track risk of ruin, not just expected return.** Estimate the
  probability of hitting an account-ending drawdown given the current
  sizing rule, edge estimate, and its uncertainty — this is the number that
  actually matters for whether the operation survives long enough for a
  real edge to compound, more than expected annual return does.

## Guardrails

- Never size a new strategy using full-Kelly math on a backtested edge
  estimate — backtested edge and payoff ratios carry real estimation
  error, and Kelly sizing is known to be fragile to exactly that error.
- Sizing rules should be decided before the strategy is live, as part of
  the strategy's specification, not adjusted ad hoc after seeing early
  results.
- This skill sizes positions given an edge; it doesn't validate whether the
  edge is real (see [[purged-cv-backtesting]]) or account for what it costs
  to trade it (see [[transaction-cost-slippage-modeling]]) — all three are
  needed together before allocating real capital.
