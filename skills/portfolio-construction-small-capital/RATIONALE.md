# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides combining multiple signals/micro-strategies into one book under
limited capital: allocating by risk contribution rather than dollar amount,
verifying diversification empirically rather than assuming it from strategy
labels, checking combined/overlapping exposure across strategies rather
than summing isolated per-strategy risk budgets, and rebalancing on a fixed
schedule.

## Why included

The stated plan is explicitly "new strategies and micro-strategies" (plural)
rather than one strategy — that makes this a distinct, necessary layer on
top of the already-added `position-sizing-risk-management` skill, which
covers sizing a single position/strategy but not how several of them
combine into one book. Getting this wrong (assuming independence that
doesn't hold, or additive sizing that ignores overlap) can silently turn
what looks like diversification into concentrated risk.

## Extent of expected help

Primarily risk control and capital efficiency: correctly balancing risk
contribution across strategies (rather than naive equal-dollar allocation)
and checking real overlap in capital usage can make a fixed amount of
capital support more genuinely diversified exposure than a naive combination
would. It does not create alpha — it determines how efficiently and safely
the alpha from already-validated individual strategies gets combined. The
guidance to avoid over-engineered institutional portfolio optimization
machinery is deliberate: with few strategies and limited data per strategy,
a simpler scheme is more likely to be robust than an optimizer tuned on a
small, noisy correlation estimate.

## Key risks / limitations

- Correlation between strategies is not stable over time and tends to rise
  during broad market stress — exactly when diversification benefit is
  needed most. Any correlation-based allocation should be treated as a
  current estimate, not a permanent property.
- "Strategies rarely active at the same time can be allocated more
  aggressively in combination" is a real capital-efficiency technique but
  is easy to get wrong if the "rarely overlapping" assumption is asserted
  rather than measured from actual historical overlap.
- More sophisticated portfolio optimization (true risk parity, mean-
  variance optimization) can outperform simple heuristics given enough
  strategies and enough clean data, but is also more prone to overfitting
  noisy correlation/covariance estimates when both are limited — the
  simpler default recommended here is a deliberate trade-off for a small
  operation, not a universal claim that simple beats sophisticated.
- This is capital-allocation methodology across strategies, not investment
  advice, and does not replace validating each individual strategy (see
  [[purged-cv-backtesting]]) or sizing it correctly on its own (see
  [[position-sizing-risk-management]]) first.

## Sources consulted

Recent (2026) writeups on multi-strategy capital allocation for retail/
small accounts (combining trend-following and mean-reversion strategies,
overlaying capital usage to check combined exposure, allocating beyond
100% nominal when strategies rarely overlap in practice) and general
2026 commentary on risk-parity-style diversification (balancing risk
contribution rather than dollar allocation). Described here in original
wording; no code or text copied from any source.
