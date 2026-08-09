---
name: classical-statistical-forecasting
description: Use when forecasting a financial series (price, return, or especially volatility) and deciding whether a classical statistical model (ARIMA/SARIMA, GARCH family, regime-switching/state-space models) is the right tool, on its own or paired with a deep learning model — particularly under limited data, limited compute, or a need for interpretable/auditable forecasts.
---

# Classical Statistical Forecasting

Deep learning is not a strict upgrade over ARIMA/GARCH-family models for
financial forecasting — on short-run linear dynamics and volatility
clustering specifically, classical models are still competitive, cheaper to
run, easier to audit, and need far less data. This skill is about knowing
when the classical tool is the right one, and how to pair it with a
learned model when it isn't enough on its own.

## Model families and what each is actually good at

- **ARIMA/SARIMA.** Short-run linear dynamics in price/return series with
  identifiable autocorrelation structure. Cheap, interpretable, and a
  strong baseline for short-horizon forecasts — treat beating ARIMA as a
  minimum bar for any fancier model on the same series (see
  [[deep-learning-forecasting-models]]).
- **GARCH family (GARCH, EGARCH, HAR).** Volatility clustering and
  persistence. EGARCH specifically captures asymmetric response to shocks
  (volatility rising more after negative surprises than positive ones),
  which a plain GARCH misses. HAR captures the long-memory, multi-horizon
  structure of realized volatility with very little data. GARCH-family
  models remain genuinely strong for relatively stable, well-behaved assets
  and are usually the right first model for a volatility forecast, not a
  fallback.
- **Regime-switching / state-space models.** When the underlying dynamics
  themselves change (bull/bear, high/low-volatility regimes), a single
  fixed-parameter model of either family above will systematically misfit
  across the regime boundary. Use these when regime shifts are the
  dominant source of forecast error, not just added noise.

## Process

1. **Fit the classical model first, always**, even when the eventual plan is
   a deep model — it's cheap, and it's the baseline every fancier model has
   to beat on the exact same data and evaluation split.
2. **Check the residuals, not just the fit.** ARIMA residuals with
   remaining autocorrelation, or GARCH residuals with structure the model
   didn't capture, tell you specifically what a follow-on model needs to
   pick up — this is more useful than treating the classical model as a
   discarded first attempt.
3. **Match complexity to data availability.** With a short history or a
   new/thin instrument, GARCH/HAR-style models produce a usable volatility
   forecast where a deep model would only overfit. Reserve deep learning
   for series with enough history (or enough pooled related series) to
   support it.
4. **Consider a hybrid rather than a horse race.** Recent evidence favors
   combining GARCH-type volatility forecasts with a learned model
   (e.g. as an input feature, or residual-correction on top of the
   classical forecast) over picking one exclusively — this tends to be
   more robust across both calm and turbulent periods than either alone.
5. **Re-fit on a rolling/expanding window**, not once — parameters that fit
   well over one period drift as market conditions change; treat
   re-estimation cadence as a modeling decision, not an afterthought.

## Guardrails

- Don't treat "classical" as synonymous with "worse" — for small
  data/compute budgets and for volatility specifically, GARCH-family models
  are frequently the more robust choice, especially in extreme/turbulent
  periods where standalone deep models are reported to be less reliable.
- Model selection should be decided by walk-forward out-of-sample
  comparison on your own data (see [[purged-cv-backtesting]] once
  available), not by which family is newer or more discussed.
- A good in-sample fit (high R², visually good line) is not evidence of
  forecasting skill — evaluate on genuinely held-out, later-in-time data.
