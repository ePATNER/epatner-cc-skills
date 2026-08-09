# Rationale

**Status: draft, needs review before merging.**

## What it does

Covers two distinct problems in strategy/model validation: constructing a
train/test split scheme that doesn't leak information (purging overlapping
labels, embargoing post-test observations, preferring combinatorial purged
CV over a single walk-forward path), and correcting reported performance
for how many variants were tried using the Deflated Sharpe Ratio and
Probability of Backtest Overfitting.

## Why included

Every other skill added so far (forecasting models, feature engineering)
produces something that eventually needs validating, and multiple of them
already reference "walk-forward" or "purged CV" as the way to check
results honestly. This skill is that referenced piece, and arguably the
single highest-leverage one for a small operation: it's the difference
between believing a backtest and knowing whether it's real. Given the
explicit goal of building many strategies/micro-strategies, the number of
variants tried will be large by construction — which is exactly the
condition under which naive backtest numbers become most misleading.

## Extent of expected help

This skill doesn't improve forecasting or trading performance directly —
its value is entirely in correctly separating real edges from statistical
noise before capital is put behind them. For an operation deliberately
iterating over many strategies/micro-strategies, this is protective: it's
the mechanism that keeps the search process from converging on the
best-overfit variant instead of the most genuinely robust one. The
practical payoff is fewer strategies shipped that looked great in testing
and lost money live, which matters disproportionately with limited capital
where a handful of bad live outcomes can end the experiment.

## Key risks / limitations

- CPCV is more compute-intensive than a single walk-forward split; at very
  small scale this may need to be balanced against simpler purged
  walk-forward validation as a minimum bar rather than an ideal.
- DSR/PBO correction requires an honest count of trials, which is easy to
  under-report informally (e.g. forgetting exploratory attempts that "didn't
  count"). The skill calls this out explicitly because the correction is
  only as good as the trial log behind it.
- Passing a leakage-safe, deflated-Sharpe-corrected backtest is necessary
  but not sufficient — it says nothing about transaction costs, slippage,
  or live execution risk, which require separate validation.
- This is a statistical validation methodology, not investment advice, and
  a strategy that survives this process is still not a guarantee of future
  profitability.

## Sources consulted

Established quantitative finance methodology on purged and combinatorial
purged cross-validation for time series with overlapping/autocorrelated
labels, and on the Deflated Sharpe Ratio and Probability of Backtest
Overfitting as corrections for selection bias under multiple testing
(as developed in the "Advances in Financial Machine Learning" /
Bailey-López de Prado literature), plus recent (2024-2026) comparative
studies of walk-forward vs. combinatorial purged CV for false-discovery
prevention. Described here in original wording; no code or text copied
from any source.
