# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides when and how to use classical statistical forecasting models
(ARIMA/SARIMA for price/return dynamics, GARCH-family for volatility,
regime-switching/state-space models for regime shifts), how to read model
residuals to inform a follow-on model, and when to prefer a hybrid of
classical + learned models over picking one exclusively.

## Why included

The `deep-learning-forecasting-models` skill (already added) explicitly
treats classical models as the baseline every deep model must beat — this
skill is the other half of that comparison, and stands on its own as a
first, cheap, interpretable forecasting layer that's appropriate before
(or instead of) reaching for a deep model. For a small-capital operation,
being able to get a usable, well-understood volatility or short-horizon
forecast without needing a lot of data or compute is directly useful, not
just a stepping stone.

## Extent of expected help

Primarily useful for: (1) a fast, cheap baseline forecast to sanity-check
and benchmark any fancier model against, (2) volatility forecasting
specifically, where GARCH-family models remain genuinely competitive with
or better than deep learning for stable/well-behaved instruments and
short/medium data histories, and (3) residual diagnostics that tell you
what structure a follow-on model actually needs to capture, rather than
guessing at architecture. Less useful as a standalone tool once genuine
regime-dependent nonlinearity dominates the series — that's the point at
which pairing with (or switching to) a learned model or regime-switching
approach becomes worthwhile.

## Key risks / limitations

- A good in-sample fit is not forecasting skill; these models are as prone
  to being over-trusted on stale data as any ML model if not re-estimated
  and validated out-of-sample on a rolling basis.
- Fixed-parameter classical models systematically misfit across regime
  changes — using one blindly through a regime break degrades forecast
  quality without any obvious warning sign in the fit statistics.
- Comparative performance between classical and deep approaches is
  data/instrument-dependent and contested in the literature; treat this
  skill's guidance as a starting heuristic to validate on your own data,
  not a settled ranking.
- This is forecasting methodology only — it says nothing about position
  sizing, transaction costs, or realistic tradeable edge, and should not be
  read as investment advice or a profitability claim.

## Sources consulted

Recent (2025-2026) comparative studies of ARIMA/SARIMA/GARCH/EGARCH against
machine learning and deep learning approaches for financial price and
volatility forecasting, and research on hybrid GARCH + deep learning
volatility models. Topic areas and general directional findings are cited
for context; specific reported performance numbers are not endorsed as
reproducible on arbitrary data.
