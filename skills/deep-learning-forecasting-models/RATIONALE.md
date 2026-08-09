# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides selecting and correctly training a deep learning forecasting
architecture (patch-based transformers, N-BEATS/N-HiTS, non-stationary-aware
transformers, long-sequence variants, small pretrained time-series models)
for a financial series, with an emphasis on matching model complexity to
available data, correct normalization/splitting, and benchmarking against
simple baselines before trusting the result.

## Why included

This is the core modeling category for the stated goal (financial
time-series forecasting to build strategies/micro-strategies). Architecture
choice gets disproportionate attention in the literature and marketing
material; the actual determinant of whether a deep model helps is mundane —
data volume vs. model size, correct non-stationarity handling, and
leakage-free evaluation. The skill is written to front-load those mundane
decisions rather than lead with "which architecture is newest."

## Extent of expected help

Deep sequence models can improve on classical baselines for capturing
nonlinear, regime-dependent patterns in volatility and short-horizon return
structure, particularly when pooling data across related instruments. For a
single small-capital account, the realistic value is most often in
volatility/risk forecasting (which tends to be more persistent and
forecastable than returns) and as one input among several into a strategy,
not as a standalone high-accuracy price predictor — return forecasting at
short horizons remains close to a random walk and claims of high directional
accuracy should be treated with suspicion.

## Key risks / limitations

- Overfitting is the dominant failure mode given how little genuine signal
  financial data contains relative to model capacity; the skill leans
  heavily on regularization, walk-forward validation, and baseline
  comparison for this reason.
- Non-stationarity (regime shifts, changing volatility structure) breaks the
  implicit assumption behind naive global normalization; architectures or
  preprocessing that don't address this degrade silently rather than
  failing loudly.
- Published benchmark results are typically on curated datasets/splits and
  do not reliably transfer to a new instrument or period — re-validation on
  your own point-in-time data is required, not optional.
- This skill covers modeling only; it explicitly does not account for
  transaction costs, slippage, or capacity constraints, all of which can
  erase a model's apparent edge. It is not investment advice or a
  profitability guarantee, and any resulting model needs backtesting under
  realistic costs before capital is put behind it.

## Sources consulted

Recent (2025-2026) research and practitioner writeups on transformer-based
architectures for financial forecasting (PatchTST, Temporal Fusion
Transformer, N-HiTS, non-stationary/de-stationary attention variants,
Informer-style long-sequence attention, lightweight pretrained time-series
foundation models) and on practical pitfalls (non-stationarity, overfitting,
transaction-cost blindness) in applying deep learning to financial
forecasting. Topic areas and general findings are cited for context; no
individual paper's specific performance numbers are endorsed as
reproducible.
