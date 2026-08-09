---
name: statistical-arbitrage-pairs-trading
description: Use when designing a mean-reversion strategy between two or more historically linked instruments (pairs trading, basket/cross-sectional stat arb) — testing for cointegration rather than just correlation, sizing the spread trade, and setting the mean-reversion exit/stop rules. This is a concrete strategy family, distinct from the general forecasting/validation/risk skills already in this repo.
---

# Statistical Arbitrage / Pairs Trading

Everything else in this repo is a methodology layer that applies to any
strategy; this skill is one of the actual strategy families those layers
get applied to — a market-neutral bet that the spread between two related
instruments reverts to its historical relationship, rather than a
directional bet on either instrument alone.

## Cointegration, not correlation

- **Test for cointegration explicitly — correlation is not enough.** Two
  instruments can be correlated over a given window by coincidence and
  still have no stable long-run relationship; cointegration means a
  specific linear combination of the two prices is itself stationary
  (has a stable mean/variance that deviations revert to). A cointegrated
  pair that temporarily drifts apart is a materially more reliable
  mean-reversion signal than a merely correlated pair doing the same thing.
- **Re-test cointegration periodically, not once.** A relationship that
  was cointegrated historically can break down (a merger, a structural
  change in one instrument's business, a regime shift) — treat
  cointegration as a property to keep verifying, not a permanent fact
  established at strategy design time.
- **The hedge ratio (how much of each leg to hold) comes from the same
  cointegration estimate** — getting this wrong turns a market-neutral
  spread trade into an unintentional directional bet on whichever
  instrument is over- or under-weighted.

## Trading the spread

- **Enter when the spread deviates beyond a threshold** (commonly expressed
  in standard deviations of the spread's historical distribution) **and
  exit on reversion toward the mean**, not on a fixed profit target
  unrelated to the spread's own statistics.
- **Set a stop based on the cointegration assumption breaking, not just
  the spread widening further.** A spread that keeps widening past normal
  bounds may mean the pair's relationship has genuinely broken down, not
  that a bigger reversion is coming — treat an extreme, sustained deviation
  as a signal to check whether the relationship still holds, not just to
  double down.
- **Remember this is probabilistic, not guaranteed arbitrage.** Unlike
  pure arbitrage with a locked-in profit, statistical arbitrage relies on
  mean reversion working out on average across many trades — individual
  trades can and will lose even when the underlying edge is real.

## Fit for a small-capital, multi-strategy operation

- **Basket/cross-sectional variants exist beyond simple two-instrument
  pairs** (multi-leg baskets, cross-sectional mean reversion across many
  instruments) — these can diversify away some single-pair idiosyncratic
  risk, at the cost of more legs to manage and more transaction costs (see
  [[transaction-cost-slippage-modeling]]).
- **This is naturally market-neutral**, which can pair well in a
  multi-strategy book alongside directional strategies (see
  [[portfolio-construction-small-capital]]) — but market-neutral does not
  mean risk-free; it's neutral to the pair's common direction, not to the
  relationship breaking down.
- **Edges in well-known pairs have compressed significantly** as this
  family of strategies has become widely known and heavily traded by large
  firms — a small operation should expect thinner margins in liquid,
  commonly-traded pairs and weigh whether a less-crowded universe (smaller
  or less obvious pairs) offers a better risk/reward for the extra search
  effort.

## Guardrails

- Don't substitute correlation for cointegration testing — this is the
  single most common conceptual error in pairs trading and the difference
  between a statistically grounded spread trade and a coincidental one.
- Validate the strategy (cointegration test parameters, entry/exit
  thresholds) with the same leakage-safe, multiple-testing-aware rigor as
  any other strategy (see [[purged-cv-backtesting]] and
  [[quant-experiment-tracking]]) — searching over many candidate pairs is
  itself a large number of trials that needs to be tracked and corrected
  for.
- Model realistic transaction costs for both legs (see
  [[transaction-cost-slippage-modeling]]) — a two-(or more-)leg strategy
  pays costs on every leg, which can erode a mean-reversion edge faster
  than a single-instrument strategy with the same nominal edge size.
