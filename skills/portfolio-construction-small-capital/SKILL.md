---
name: portfolio-construction-small-capital
description: Use when combining multiple signals, micro-strategies, or instruments into one book with limited capital — deciding how to allocate across them, how much combined exposure is actually safe, and how to think about diversification when running several small strategies rather than one large one.
---

# Portfolio Construction for Small Capital

Running several micro-strategies is a form of diversification, but only if
they're actually uncorrelated and the combined exposure is tracked
honestly. The classic institutional playbook (risk parity, mean-variance
optimization) mostly assumes deep capital and low per-trade friction that
don't hold at small scale — this skill adapts the underlying principle
(balance risk contribution, don't just balance dollar amounts) to a
capital-constrained, multi-micro-strategy setup.

## Core principle: balance risk contribution, not dollar allocation

- **Equal dollar allocation across strategies is not equal risk
  allocation.** A strategy with higher volatility or larger typical
  drawdown contributes disproportionate risk to the combined book even at
  the same dollar size — weight by something like inverse volatility so
  each strategy contributes a comparable share of total risk, not a
  comparable share of capital.
- **Actual diversification benefit comes from strategies with different
  behavior, not just different instruments.** A trend-following strategy
  and a mean-reversion strategy tend to have offsetting characteristics
  (few big winners vs. many small wins) and behave differently across
  market regimes — combining genuinely different strategy types is more
  effective diversification than running the same style across more
  instruments.
- **Verify low correlation empirically, don't assume it from the
  strategy's category label.** Two strategies that are both "market
  neutral" or both "mean reversion" are not automatically uncorrelated —
  check realized correlation of their returns (and specifically their
  drawdowns, which is when correlation matters most) before treating them
  as diversifying.

## Sizing the combined book with limited capital

- **Overlay strategies' capital usage over time, not just their individual
  sizing rules.** Two strategies each sized conservatively on their own can
  still combine into unacceptable total exposure if they tend to be in the
  market at the same time — check actual combined time-in-market and
  worst-case simultaneous exposure, not each strategy's isolated risk
  budget.
- **Strategies that are rarely active simultaneously can be allocated more
  aggressively in combination than the sum of their individual allocations
  would suggest** — if two strategies' capital needs don't overlap in
  practice, treating their allocations as fully additive wastes capital
  efficiency; but this must be verified from actual overlap data, not
  assumed.
- **Rebalance on a defined schedule, not opportunistically.** Regular
  rebalancing across strategies according to pre-set target weights keeps
  any single strategy's recent good/bad run from silently taking over the
  book's risk profile.

## Guardrails

- Don't apply institutional risk-parity or mean-variance machinery
  uncritically — with few strategies, thin data per strategy, and real
  transaction costs at small scale (see
  [[transaction-cost-slippage-modeling]]), a simpler inverse-volatility or
  fixed-weight scheme with a hard total-exposure cap is often more robust
  than an optimizer that will overfit correlation estimates from limited
  data.
- Total exposure across the combined book still needs the same discipline
  as a single strategy's position sizing (see
  [[position-sizing-risk-management]]) — portfolio construction sits on top
  of, not instead of, per-strategy risk controls.
- Correlation between strategies is not stable — it's common for
  previously uncorrelated strategies to become correlated during a broad
  market stress event, exactly when diversification is needed most. Don't
  treat a measured low correlation as permanent.
