---
name: deep-learning-forecasting-models
description: Use when choosing, building, or evaluating a deep learning model for forecasting a financial time series (price, return, volatility, spread) — picking an architecture family, sizing it to the data available, and setting up training so results are trustworthy rather than an artifact of overfitting or a stationarity assumption the data doesn't meet.
---

# Deep Learning Forecasting Models

The architecture choice matters less than most writeups suggest; what
actually decides whether a model is useful is whether it respects how little
signal-to-noise financial data has, and whether the training/evaluation
setup would catch it if the model were just memorizing noise. This skill is
about picking a model family deliberately and building around it correctly,
not about chasing the newest architecture.

## Architecture families and when each earns its complexity

- **Patch-based transformers (PatchTST and similar).** Segment each
  univariate series into overlapping patches used as tokens, with channel
  independence across series. Reasonable default when you have enough
  history per instrument and want a good local-pattern model without
  paying full quadratic attention cost.
- **N-BEATS / N-HiTS family.** Basis-expansion, multi-rate signal sampling,
  hierarchical interpolation for long-horizon forecasts. Strong when you
  need interpretable decomposition (trend/seasonality-like components) and
  a long forecast horizon, without per-series feature engineering.
- **Non-stationary-aware transformers.** Add explicit series stationarization
  plus de-stationary attention rather than assuming the input is already
  stationary. Worth the extra complexity specifically for instruments with
  regime shifts (most financial series), where a model that silently
  assumes stationarity degrades quietly rather than failing loudly.
- **Long-sequence-efficient variants (Informer-style sparse attention).**
  Only reach for these when the sequence length itself is the bottleneck
  (very high-frequency data); for daily/hourly bars at small-capital scale
  this is usually unnecessary complexity.
- **Small/foundation time-series models.** Lightweight pretrained
  forecasters can be a reasonable starting baseline before training
  anything from scratch, especially with limited per-instrument history —
  use them as a baseline to beat, not a default final choice.

## Process

1. **Match model size to data volume, not ambition.** A large transformer
   trained on a few years of daily bars for one instrument will overfit;
   either pool related instruments to get more effective training data, use
   a smaller/simpler model, or use a pretrained foundation model as a
   starting point.
2. **Normalize per-window, not once globally.** Financial series are
   non-stationary — a global mean/std computed once over the full history
   leaks future distributional information into early training windows.
   Z-score (or otherwise normalize) within a rolling window, and prefer
   architectures with explicit stationarization over ones that assume it.
3. **Forecast returns/changes, not levels**, unless there's a specific
   reason to model levels — levels are dominated by a near-random-walk
   component that inflates apparent accuracy without adding tradeable
   information.
4. **Use walk-forward, not random, splits.** A random train/test split
   leaks future information into training via overlapping windows and
   autocorrelation; evaluate the model the way it will actually be used —
   trained on the past, tested on strictly later data it never saw.
5. **Regularize deliberately**: dropout, early stopping on a proper
   walk-forward validation slice, and weight decay. Track validation loss
   divergence from training loss as the primary overfitting signal, not
   just final test-set accuracy.
6. **Benchmark against boring baselines** (naive persistence, a linear
   AR model, a simple moving average) on the same walk-forward splits
   before trusting a deep model's apparent edge — if it doesn't beat the
   boring baseline out-of-sample, the architecture isn't the bottleneck.

## Guardrails

- A model's in-sample or single-split test accuracy is not evidence it will
  make money; profitability requires the forecast to survive realistic
  transaction costs and slippage, which this skill does not model — see
  [[transaction-cost-slippage-modeling]] once available, and always pair
  this with rigorous backtesting (see [[purged-cv-backtesting]]).
- Treat headline benchmark numbers from papers the same way as sentiment
  papers: often optimized on a specific dataset/split that won't transfer.
  Re-validate on your own point-in-time data before trusting an architecture
  choice.
- At small capital, training/inference cost and data availability per
  instrument are real constraints — don't adopt an architecture that needs
  more history or compute than you actually have.
