---
name: transaction-cost-slippage-modeling
description: Use when a backtest needs realistic trading costs before its results can be trusted, or when deciding whether a signal's apparent edge would survive real execution — building a cost model (spread, commission, slippage, market impact) sized correctly for account size and instrument liquidity, not a flat/zero-cost assumption.
---

# Transaction Cost & Slippage Modeling

A backtest with zero or flat-fee costs is not a conservative simplification
— it's a different, easier question than "would this make money." The
dominant cost source also depends heavily on account size: for a small
account it's almost always spread, commission, and execution slippage, not
market impact, which is the mistake to correct for here.

## What actually costs money, by account size

- **Small capital, liquid instruments (the common case here):** the
  bid-ask spread plus commission/fees dominate. A single small order does
  not meaningfully move the price of a liquid instrument, so market-impact
  models built for large institutional orders overstate the relevant cost
  here — don't import a large-fund cost model wholesale.
- **Small capital, illiquid/microcap or thin instruments:** even a small
  order can move the price meaningfully. This is where a market-impact
  term (e.g. a square-root-law-style model, where impact scales with the
  square root of order size relative to typical volume rather than
  linearly) starts to matter — check average daily volume relative to
  intended order size before assuming impact is negligible.
- **High turnover strategies:** costs compound with trade frequency in a
  way that's easy to underestimate when eyeballing a single trade's cost in
  isolation — model cumulative cost drag over the full trading frequency,
  not a per-trade cost in the abstract.

## Building the cost model

1. **Start with a realistic flat/proportional cost floor**: actual
   commission schedule plus the observed bid-ask spread for the instrument
   (not the midpoint price) — a flat-cost model is a reasonable first pass
   for liquid, small-size trading, but must use real spread data, not zero.
2. **Add slippage from execution latency and order type**, not just spread
   — a market order in a fast-moving instrument fills worse than the quote
   seen at signal time; even a small delay between signal and execution
   creates cost that a spread-only model misses.
3. **Add a market-impact term only when order size relative to average
   volume warrants it** (illiquid names, or size growing with account
   growth) — a linear impact assumption underestimates cost for large
   orders and a impact model is needed once impact is non-negligible; for
   genuinely small orders in liquid names this term is close to zero and
   over-modeling it just adds noise.
4. **Re-run the backtest with the cost model applied and compare the
   degradation, not just the after-cost number.** A strategy whose Sharpe
   collapses when realistic costs are added was living on an assumption
   that doesn't hold; a strategy that degrades gracefully is more likely
   to survive live.

## Guardrails

- Never validate a strategy on a zero- or flat-near-zero-cost backtest and
  then assume it will hold up live — this is a well-documented reason
  retail/small-account strategies work in backtest and lose money live.
- Don't apply an institutional market-impact model to small retail-sized
  orders in liquid instruments by default — check whether it's actually the
  relevant cost before adding that complexity.
- Cost sensitivity should be tested as its own parameter sweep (e.g. "what
  cost level would erase this edge") alongside the [[purged-cv-backtesting]]
  validation — a strategy that only works below an unrealistically low cost
  assumption is not a strategy, it's a spreadsheet artifact.
