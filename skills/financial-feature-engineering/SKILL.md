---
name: financial-feature-engineering
description: Use when turning raw price/volume/event data into model-ready features and labels for a forecasting or trading model — choosing how to make a series stationary without destroying its predictive memory, and how to label outcomes (what counts as a "win") in a way that reflects how a strategy would actually be triggered and exited.
---

# Financial Feature Engineering

Two decisions dominate whether a financial ML model has any chance of
working: how you make the input series stationary (naive differencing
throws away exactly the memory that carries predictive information), and
how you define the label the model is trained to predict (a label that
doesn't reflect real entry/exit mechanics teaches the model to solve the
wrong problem). This skill covers both.

## Making series stationary without losing memory

- **Don't default to integer differencing (returns = diff(price)).** A
  single full difference typically reaches stationarity but discards most
  of the series' memory — information a model could otherwise have used.
- **Use fractional differencing when memory matters.** Apply a non-integer
  differencing order `d` (0 < d < 1) — this is tunable to remove just
  enough memory to pass a stationarity test (e.g. ADF) while retaining as
  much of the original series' information as possible. Search over `d`
  and pick the smallest value that achieves stationarity, rather than
  jumping straight to `d = 1`.
- **Never fit `d` (or any per-instrument parameter) on the full historical
  series including future data.** A documented failure mode is computing an
  "optimal" `d` per ticker using the complete history available today, then
  backtesting as if that same `d` were known at every earlier point in
  time — this bakes look-ahead information (later volatility regimes) into
  the whole backtest. Fit `d` (and refit it) only on data available as of
  each point in time, the same way you'd treat any other trained parameter.

## Labeling: define the outcome the way the strategy would actually see it

- **Prefer the triple-barrier method over a fixed-horizon return label.**
  For each observation, set an upper barrier (take-profit), a lower barrier
  (stop-loss), and a time barrier (max holding period) — usually sized
  relative to the instrument's recent volatility rather than fixed in
  absolute terms — and label the outcome by whichever barrier is touched
  first. A fixed-horizon label ("return over the next N bars") ignores that
  a real strategy would have exited earlier on a stop or a target.
- **Use meta-labeling to separate "should I trade this at all" from "which
  direction."** Layer a secondary model on top of a primary signal (rule-
  based or ML) that predicts whether to act on the primary signal and at
  what size/confidence — this lets you keep a simple, interpretable primary
  signal while still improving precision and controlling position sizing,
  and is particularly suited to combining a cheap/simple signal source with
  a more careful filter.
- **Sample events, not fixed bars, when the underlying activity is
  bursty.** Labeling every fixed-time bar treats quiet and active periods
  as equally informative; event-based sampling (e.g. on volatility spikes,
  volume bursts, or structural breaks) concentrates labels where something
  actually happened.

## Guardrails

- Any feature or label parameter that is "tuned" (fractional-differencing
  order, barrier widths, event thresholds) must be tunable only from
  information available as of that point in time — treat this exactly like
  a model hyperparameter subject to the same walk-forward discipline as the
  model itself (see [[purged-cv-backtesting]] once available).
- A feature set that looks highly predictive in-sample but was built with
  full-history statistics (global mean/std, globally-fit differencing
  order, look-ahead-labeled events) is not evidence of anything — verify
  every feature/label is computable using only data available at that
  timestamp.
- Meta-labeling adds a second model and therefore a second source of
  overfitting risk; validate the meta-model's precision/sizing decisions
  out-of-sample just as rigorously as the primary signal.
