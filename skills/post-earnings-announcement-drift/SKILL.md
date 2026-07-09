---
name: post-earnings-announcement-drift
description: Use when designing a strategy that trades in the direction of an earnings surprise and holds through the drift that follows (post-earnings-announcement drift, PEAD) — a fifth, event-driven strategy archetype alongside statistical-arbitrage-pairs-trading, trend-following-momentum, funding-rate-arbitrage, and options-income-strategies, with the specific and well-documented transaction-cost trap this strategy falls into at small-cap/illiquid scale.
---

# Post-Earnings-Announcement Drift (PEAD)

Where the strategy archetypes already covered bet on a price relationship,
a trend, a structural payment, or realized volatility, this one bets on a
specific, well-documented behavioral effect: prices continue to drift in
the direction of an earnings surprise for weeks to months afterward,
consistent with investors underreacting to the news rather than pricing it
in immediately.

## Core construction

- **Measure the earnings surprise magnitude** (actual result vs.
  consensus estimate, commonly standardized as a surprise quantile/decile
  across the universe) rather than just a binary beat/miss — drift
  direction and magnitude are both related to how large the surprise was,
  not just its sign.
- **Enter in the direction of the surprise and hold for a defined
  window**, sized to backtested drift persistence for the instrument
  class in question — this is a holding-period strategy, not a
  same-day event trade; the edge specifically comes from the weeks-to-
  months-long drift, not the initial announcement-day reaction.
- **A long-short construction** (long the largest positive-surprise
  names, short the largest negative-surprise names, e.g. top vs. bottom
  surprise decile) captures the effect market-neutrally, analogous to the
  decile construction in [[cross-sectional-equity-factor-investing]] —
  earnings surprise can be treated as one more cross-sectional ranking
  factor, using the same infrastructure.

## The core implementation trap: illiquid names look best and cost the most

- **Reported drift returns are larger in small-cap/illiquid names than in
  liquid ones** — a well-documented pattern attributed to slower investor
  attention and information processing in less-followed stocks. This makes
  the strategy look most attractive exactly where it's hardest to trade
  cheaply.
- **Transaction costs in illiquid names have been shown to consume the
  large majority (commonly cited in the 70-100% range) of the paper
  profit** from this effect — the apparent edge in the most attractive-
  looking names is, in the median case, mostly or entirely a transaction-
  cost illusion once realistically modeled (see
  [[transaction-cost-slippage-modeling]]).
- **This is not a reason to avoid the strategy, but a reason to model costs
  before selecting the universe** — screen candidate names by realistic net
  return after costs, not by gross backtested drift, and expect the
  liquid-name version of this strategy to have a smaller, more genuinely
  capturable edge than the illiquid-name version's paper numbers suggest.
- **The effect's magnitude has reportedly declined over time in developed
  markets**, plausibly as more capital has focused on exploiting it —
  treat historical drift magnitudes as an upper bound to validate against
  recent data, not a stable constant to plan around.

## Guardrails

- Never size or select a PEAD universe based on gross historical drift
  alone — net-of-cost validation on your own point-in-time data (see
  [[purged-cv-backtesting]]) is what determines whether a given
  liquidity tier is actually tradeable, and the answer plausibly differs
  by instrument class and account size.
- Earnings-surprise data itself needs point-in-time discipline (see
  [[alternative-data-ingestion]]) — using a consensus estimate that was
  later revised, or an earnings date/time that doesn't reflect what was
  actually known at the time, reintroduces look-ahead bias into what
  looks like a simple event-based signal.
- This is strategy-design methodology, not investment advice; published
  academic returns for this anomaly are gross figures from specific
  samples and periods, not a forecast of net, tradeable returns for any
  reader's specific implementation.
