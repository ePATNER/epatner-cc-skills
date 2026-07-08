---
name: trend-following-momentum
description: Use when designing a strategy that bets on trend continuation rather than mean reversion — time-series momentum, moving-average crossovers, or breakout systems — including the regime/filter logic needed to avoid whipsaw in choppy, non-trending markets. This is a concrete strategy family, the directional counterpart to statistical-arbitrage-pairs-trading.
---

# Trend Following / Momentum

Where [[statistical-arbitrage-pairs-trading]] bets on reversion to a
historical relationship, this strategy family bets the opposite way: that
a move already underway is more likely to continue than reverse. It's one
of the oldest and most extensively documented systematic strategy families
(the basis of most managed-futures/CTA funds), and its single most common
practical failure mode — whipsaw in non-trending markets — is well
understood and specifically guardable against.

## Core signal construction

- **Time-series momentum** (an asset's own recent return predicting its
  near-future return, independent of other assets) is the academically
  documented core of the effect, distinct from cross-sectional momentum
  (ranking assets against each other) — decide explicitly which form the
  strategy is using, since they behave differently and need different
  data.
- **Moving-average crossovers and breakout systems** are the common
  practical implementations — a fast/slow moving-average cross, or price
  breaking out of a recent range, used as a trend-onset trigger. Multiple
  lookback horizons (short, medium, long) are commonly blended, since
  different horizons capture different trend durations and none dominates
  in all conditions.
- **This is naturally a directional, not market-neutral, strategy** — size
  and risk-manage accordingly (see [[position-sizing-risk-management]]),
  and note it can pair well in a multi-strategy book specifically because
  it tends to behave differently from mean-reversion strategies like
  pairs trading (see [[portfolio-construction-small-capital]]).

## Guarding against the core failure mode: whipsaw

- **A trend signal without a regime/chop filter will whipsaw in range-bound
  markets** — repeated buy/sell/buy/sell signals that each lose a little as
  price oscillates without a sustained trend. This is the single most
  common and well-documented practical failure of momentum strategies, not
  an edge case.
- **Confirm trend signals with an independent filter before acting on
  them** — a broader trend-direction filter (don't take a bullish breakout
  against a downtrending broader market), a volatility/regime filter (see
  [[regime-detection]] — recognize a choppy regime before trading breakouts
  in it), or a volume filter (a breakout on weak volume is more likely to
  be noise than genuine participation).
- **Accept that some whipsaw is unavoidable, not a sign the strategy is
  broken.** Trend-following strategies structurally have a lower win rate
  with a few large wins offsetting many small losses — evaluate on that
  basis (expectancy, not win rate) rather than expecting most individual
  signals to be right.

## Guardrails

- Don't tune the moving-average/breakout parameters to maximize historical
  fit without accounting for how many parameter combinations were tried
  (see [[quant-experiment-tracking]] and [[purged-cv-backtesting]]) —
  momentum strategies have a lot of tunable knobs (lookback lengths, filter
  thresholds) and are easy to overfit to a specific historical period.
- Validate with walk-forward, regime-aware evaluation specifically —
  because performance is known to concentrate in trending periods and
  disappear (or lose) in choppy ones, a backtest confined to one regime
  type is especially misleading here (see [[regime-detection]]).
- Trend-following performance and correlation to other strategies is not
  stable across market environments; treat its diversification value in a
  multi-strategy book (see [[portfolio-construction-small-capital]]) as
  something to re-verify, not assume permanently.
