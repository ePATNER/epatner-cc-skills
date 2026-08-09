---
name: market-microstructure-signals
description: Use when building a short-horizon signal from order-book or trade-level data (order-flow imbalance, bid-ask spread dynamics, trade toxicity measures like VPIN) rather than from bar-level price/volume or external text/alternative data — a distinct signal source with its own data requirements, cost sensitivity, and validation concerns.
---

# Market Microstructure Signals

Order-book and trade-level data carries short-horizon predictive
information that bar-level OHLCV data averages away — but it's a distinct
signal source from price-series features (see
[[financial-feature-engineering]]) or external text/alternative data (see
[[news-sentiment-analysis]], [[alternative-data-ingestion]]), with its own
data requirements, cost sensitivity, and validation pitfalls that are easy
to underestimate at small scale.

## What the signal sources are

- **Order-flow imbalance** — the relative pressure of buy vs. sell order
  flow — has a documented, largely monotone (with some concavity at
  extremes) relationship with near-term price movement across multiple
  asset types, translating into an economically meaningful signal under
  reasonable thresholds, not just a statistical curiosity.
- **Trade toxicity measures (e.g. VPIN-style metrics)** estimate how much
  of recent trading reflects informed vs. uninformed flow; spikes in these
  measures have been shown to precede or coincide with significant price
  moves, making them useful as an early-warning input alongside a primary
  signal rather than a standalone predictor.
- **Spread and price-impact dynamics** carry information about current
  liquidity conditions, which matters both as a signal input and directly
  for [[transaction-cost-slippage-modeling]] — the same data that can
  inform a signal is also what should inform the cost model.

## Building and validating these signals

- **This requires order-book or trade-level (tick) data, not bar data** —
  confirm the data source and its granularity/cost are actually available
  and affordable before committing to a microstructure-signal approach;
  this is a heavier data requirement than most other signal sources in this
  repo's skills.
- **Validate with the same leakage-safe rigor as any other signal, at the
  correct time granularity.** Purging and embargoing (see
  [[purged-cv-backtesting]]) matter at least as much here — at short
  horizons, overlapping/autocorrelated observations are the norm, and a
  timestamp or sequencing error is easy to introduce when handling
  tick-level data.
- **Weigh signal freshness against execution cost explicitly.** A genuine
  short-horizon microstructure edge decays fast and can be eaten entirely
  by realistic spread/slippage at small order sizes (see
  [[transaction-cost-slippage-modeling]] and [[small-account-execution]]) —
  this signal family is more cost-sensitive than most, since edges here are
  often small relative to typical retail transaction costs.
- **Report predictability findings in terms of economic feasibility under
  actual fees, not just statistical significance** — a signal that's
  statistically real but doesn't clear realistic transaction costs at the
  intended trade size is not usable, and this checked-feasibility framing
  is standard practice in the current microstructure literature.

## Guardrails

- Don't adopt this signal family without confirming tick/order-book data
  access is realistic for the operation's budget and infrastructure — it's
  a heavier requirement than most other signal sources already covered.
- Treat this as a short-horizon, cost-sensitive signal input, not a
  standalone strategy — pair it with the cost and execution skills before
  concluding it's viable at the intended trade size.
- Crypto market structure specifically is still evolving (institutional
  entry, changing leverage/transparency norms) — a microstructure edge
  measured on historical data from a less mature market phase may not hold
  as that market structure matures.
